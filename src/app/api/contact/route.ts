import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { check, clientIp, type RateLimitRule } from '@/lib/rateLimit';
import { contact, serviceOptions } from '@/lib/site';
import { parseEnquirySelection, resolveEnquiry } from '@/lib/enquiry';

/**
 * Contact form endpoint - validates the enquiry, rate limits it, and emails it
 * to the sales inbox via Resend.
 *
 * REQUIRED ENV (see .env.example):
 *   RESEND_API_KEY     from resend.com/api-keys
 *   CONTACT_TO_EMAIL   optional - defaults to `contact.email` in lib/site.ts
 *   CONTACT_FROM_EMAIL optional - defaults to Resend's shared sender, which can
 *                      only deliver to the address that owns the Resend account.
 *                      Point this at your own verified domain before launch.
 *
 * Without RESEND_API_KEY: in development the enquiry is logged to the terminal
 * and reported as logged locally so the UI can be exercised; in production the
 * request fails loudly rather than silently swallowing a real lead.
 */

/* Nodemailer-free, but still needs Node APIs - do not move to the edge runtime. */
export const runtime = 'nodejs';

interface Payload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  context?: unknown;
  /** Honeypot - see below. Real users never see this field. */
  website?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Longest value accepted per field, to cap the size of anything we forward. */
const MAX: Record<string, number> = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  service: 40,
  message: 5000,
  website: 200,
};

/**
 * Two windows, both per IP: a short one that stops a burst, and a daily cap
 * that stops a slow drip. A genuine enquirer sending a follow-up never hits
 * either.
 */
const RULES: RateLimitRule[] = [
  { limit: 3, windowMs: 10 * 60 * 1000 },
  { limit: 10, windowMs: 24 * 60 * 60 * 1000 },
];

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

/** Escape before interpolating user input into the HTML body of the email. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Strip CR/LF from anything that goes into a header (subject, reply-to) so a
 * crafted value cannot inject extra headers.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function serviceLabel(value: string): string {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  /* Rate limit first: cheapest possible rejection, before any parsing. */
  const limit = check(`contact:${clientIp(request)}`, RULES);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many enquiries from this connection. Try again later, or call us directly.',
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body) ||
      Object.keys(MAX).some((field) => body[field as keyof Payload] !== undefined && typeof body[field as keyof Payload] !== 'string')) {
    return NextResponse.json({ ok: false, error: 'Please send text values for the enquiry fields.' }, { status: 400 });
  }

  /*
   * Honeypot: a field hidden from real users but visible to naive bots that
   * fill every input they find. Anything that fills it gets a success response
   * so the bot has no signal to retry against - but nothing is sent.
   */
  if (body.website?.trim()) {
    // eslint-disable-next-line no-console
    console.warn('[contact] honeypot triggered - enquiry discarded');
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = 'Required.';
  if (!body.company?.trim()) errors.company = 'Required.';
  if (!body.email?.trim()) errors.email = 'Required.';
  else if (!EMAIL.test(body.email.trim())) errors.email = 'Enter a valid email address.';
  if (!body.service?.trim()) errors.service = 'Required.';
  else if (!serviceOptions.some((option) => option.value === body.service?.trim())) errors.service = 'Select a valid service.';
  if (!body.message?.trim()) errors.message = 'Required.';
  else if (body.message.trim().length < 10) errors.message = 'Please add a little more detail.';

  const selection = body.context === undefined ? null : parseEnquirySelection(body.context);
  const context = selection ? resolveEnquiry(selection) : null;
  if (body.context !== undefined && !context) errors.context = 'The selected offering is not recognised. Please select it again.';

  for (const [field, max] of Object.entries(MAX)) {
    const value = body[field as keyof Payload];
    if (typeof value === 'string' && value.length > max) {
      errors[field] = `Please keep this under ${max} characters.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry = {
    name: body.name!.trim(),
    company: body.company!.trim(),
    email: body.email!.trim(),
    phone: body.phone?.trim() || null,
    service: serviceLabel(body.service!.trim()),
    message: body.message!.trim(),
    context,
    at: new Date().toISOString(),
  };

  const subject = headerSafe(`New enquiry: ${context?.label ?? enquiry.service} - ${enquiry.company}`);

  const text = [
    `Name:    ${enquiry.name}`,
    `Company: ${enquiry.company}`,
    `Email:   ${enquiry.email}`,
    `Phone:   ${enquiry.phone ?? '-'}`,
    `Service: ${enquiry.service}`,
    ...(context ? [`Selection: ${context.label}`, `Catalogue page: ${context.href}`, `Selection IDs: ${JSON.stringify(context.selection)}`] : []),
    '',
    enquiry.message,
    '',
    `Received ${enquiry.at}`,
  ].join('\n');

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#12211B;line-height:1.6">
      <h2 style="margin:0 0 16px;color:#1B4332;font-size:18px">New website enquiry</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Name</td><td><strong>${esc(enquiry.name)}</strong></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Company</td><td>${esc(enquiry.company)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Email</td><td><a href="mailto:${esc(enquiry.email)}">${esc(enquiry.email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Phone</td><td>${enquiry.phone ? `<a href="tel:${esc(enquiry.phone)}">${esc(enquiry.phone)}</a>` : '-'}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Service</td><td>${esc(enquiry.service)}</td></tr>
        ${context ? `<tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Selection</td><td>${esc(context.label)}</td></tr><tr><td style="padding:4px 16px 4px 0;color:#4A5C53">Catalogue page</td><td>${esc(context.href)}</td></tr>` : ''}
      </table>
      <p style="margin:20px 0 6px;color:#4A5C53;font-size:13px">Message</p>
      <div style="white-space:pre-wrap;border-left:3px solid #3FA679;padding:8px 0 8px 14px;font-size:14px">${esc(enquiry.message)}</div>
      <p style="margin-top:24px;color:#4A5C53;font-size:12px">Sent from the Nexa Connect website - reply directly to reach the sender.</p>
    </div>
  `;

  if (!resend) {
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line no-console
      console.error('[contact] RESEND_API_KEY is not set - enquiry NOT delivered:', enquiry);
      return NextResponse.json(
        { ok: false, error: 'Email is not configured on the server.' },
        { status: 500 },
      );
    }
    // eslint-disable-next-line no-console
    console.warn('[contact] No RESEND_API_KEY - enquiry logged only (dev):\n' + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Nexa Connect <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL || contact.email],
      replyTo: headerSafe(enquiry.email),
      subject,
      text,
      html,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[contact] Resend rejected the message:', error, enquiry);
      return NextResponse.json(
        { ok: false, error: 'We could not send that just now.' },
        { status: 502 },
      );
    }
  } catch (cause) {
    // eslint-disable-next-line no-console
    console.error('[contact] Unexpected send failure:', cause, enquiry);
    return NextResponse.json(
      { ok: false, error: 'We could not send that just now.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
