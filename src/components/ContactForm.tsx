'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { serviceOptions } from '@/lib/site';
import type { EnquiryContext } from '@/lib/enquiry';

type Field = 'name' | 'company' | 'email' | 'phone' | 'service' | 'message';
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const empty: Record<Field, string> = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

/** Validated on blur and again on submit - never on every keystroke. */
function validate(field: Field, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case 'name':
      return v ? undefined : 'Tell us who to reply to.';
    case 'company':
      return v ? undefined : 'Add your company name.';
    case 'email':
      if (!v) return 'We need an email address to reply.';
      return EMAIL.test(v) ? undefined : 'That does not look like a valid email address.';
    case 'service':
      return v ? undefined : 'Pick the service closest to what you need.';
    case 'message':
      if (!v) return 'A sentence or two is plenty.';
      return v.length >= 10 ? undefined : 'A little more detail would help us route this.';
    default:
      return undefined;
  }
}

const inputBase =
  'w-full min-h-[3rem] rounded-control border bg-white px-3.5 py-3 text-[0.9375rem] text-ink ' +
  'placeholder:text-ink-soft/60 transition-colors duration-200 ' +
  'focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/30';

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-display text-sm font-medium text-pine">
      {children}
      {optional ? (
        <span className="ml-1.5 font-body text-[0.8125rem] font-normal text-ink-soft">
          (optional)
        </span>
      ) : (
        <span className="ml-1 text-signal-deep" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="flex items-center gap-1.5 overflow-hidden pt-1.5 text-[0.8125rem] text-pine"
        >
          {/* Icon as well as colour - the error is never signalled by colour alone. */}
          <Icon name="AlertCircle" size={14} className="shrink-0 text-signal-deep" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function ContactForm({ initialContext = null }: { initialContext?: EnquiryContext | null }) {
  const [context, setContext] = useState(initialContext);
  const initialValues = { ...empty, service: initialContext?.service ?? '', message: initialContext?.message ?? '' };
  const [values, setValues] = useState<Record<Field, string>>(initialValues);
  const [delivered, setDelivered] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  /** Server-supplied failure text, e.g. the rate-limit message. */
  const [failure, setFailure] = useState<string | null>(null);
  /**
   * Honeypot. Hidden from real users and from screen readers, so anything that
   * arrives with it filled in is a bot - the server drops those silently.
   */
  const [trap, setTrap] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const reduced = useReducedMotion();

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    // Clear an existing error as soon as the user starts fixing it.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const blur = (field: Field) => () =>
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const next: Errors = {};
    (Object.keys(empty) as Field[]).forEach((f) => {
      const err = validate(f, values[f]);
      if (err) next[f] = err;
    });
    setErrors(next);

    const firstInvalid = (Object.keys(next) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    setFailure(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: trap, ...(context ? { context: context.selection } : {}) }),
      });

      if (res.ok) {
        const data = await res.json();
        setDelivered(data.delivered !== false);
        setStatus('sent');
        return;
      }

      /* Prefer the server's wording - it explains a rate limit far better. */
      const data = await res.json().catch(() => null);
      if (data?.errors && typeof data.errors === 'object') {
        const fieldErrors: Errors = {};
        (Object.keys(empty) as Field[]).forEach((field) => {
          if (typeof data.errors[field] === 'string') fieldErrors[field] = data.errors[field];
        });
        setErrors(fieldErrors);
        const field = (Object.keys(fieldErrors) as Field[])[0];
        if (field) formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      }
      setFailure(typeof data?.error === 'string' ? data.error : typeof data?.errors?.context === 'string' ? data.errors.context : null);
      setStatus('failed');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        role="status"
        className="rounded-card border border-line bg-white p-8 text-center shadow-card"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-signal/12">
          <Icon name="CheckCircle2" size={24} className="text-signal-deep" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-pine">{delivered ? 'Enquiry received' : 'Development enquiry recorded'}</h3>
        <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
          {delivered ? 'Thanks, we have your details. Someone from the team will get back to you.' : 'The enquiry was logged locally. No email was sent.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialValues);
            setContext(initialContext);
            setErrors({});
            setFailure(null);
            setStatus('idle');
          }}
          className="mt-6 min-h-[44px] font-display text-sm font-medium text-pine underline decoration-signal decoration-2 underline-offset-4"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-card border border-line bg-white p-6 shadow-card sm:p-8"
    >
      {context && (
        <div className="mb-6 rounded-control border border-line bg-mist p-4">
          <p className="eyebrow">Your enquiry</p>
          <p className="mt-2 font-display font-semibold text-pine">{context.label}</p>
          <p className="mt-1 text-sm text-ink-soft">This selection will be included with your message.</p>
          <button type="button" className="mt-2 min-h-[44px] text-sm font-medium text-pine underline underline-offset-4" onClick={() => {
            setContext(null);
            setValues((current) => ({ ...current, message: current.message === context.message ? '' : current.message }));
          }}>Remove selection</button>
        </div>
      )}
      <p className="mb-6 text-[0.8125rem] text-ink-soft">
        Fields marked <span className="text-signal-deep">*</span> are required.
      </p>

      {/*
        Honeypot. Moved off-screen rather than `display:none` so form-filling
        bots still find it, and hidden from assistive tech + keyboard order so
        no real user can reach it by accident.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Do not fill this in</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(inputBase, errors.name ? 'border-signal-deep' : 'border-line')}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
            onBlur={blur('company')}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={cn(inputBase, errors.company ? 'border-signal-deep' : 'border-line')}
          />
          <FieldError id="company-error" message={errors.company} />
        </div>

        <div>
          <Label htmlFor="email">Work email</Label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(inputBase, errors.email ? 'border-signal-deep' : 'border-line')}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <Label htmlFor="phone" optional>
            Phone
          </Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            className={cn(inputBase, 'border-line')}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="service">What do you need?</Label>
          {/*
            The native select arrow sits hard against the right edge and differs
            per browser, so it is suppressed and replaced with our own chevron -
            inset to match the field padding, and in the brand green.
          */}
          <div className="relative">
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={set('service')}
              onBlur={blur('service')}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'service-error' : undefined}
              className={cn(
                inputBase,
                'appearance-none pr-11',
                errors.service ? 'border-signal-deep' : 'border-line',
              )}
            >
              <option value="">Select a service…</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={18}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-signal-deep"
            />
          </div>
          <FieldError id="service-error" message={errors.service} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">How can we help?</Label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={set('message')}
            onBlur={blur('message')}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : 'message-hint'}
            className={cn(inputBase, 'resize-y', errors.message ? 'border-signal-deep' : 'border-line')}
          />
          {!errors.message && (
            <p id="message-hint" className="pt-1.5 text-[0.8125rem] text-ink-soft">
              Whatever you already know: site count, current system, rough timeline.
            </p>
          )}
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'sending'}
        icon={status === 'sending' ? undefined : 'Send'}
        className="mt-7 w-full sm:w-auto"
      >
        {status === 'sending' ? (
          <span className="inline-flex items-center gap-2">
            <Icon name="RefreshCw" size={17} className="animate-spin" />
            Sending…
          </span>
        ) : (
          'Send enquiry'
        )}
      </Button>

      <AnimatePresence>
        {status === 'failed' && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2 text-[0.875rem] text-pine"
          >
            <Icon name="AlertCircle" size={16} className="mt-0.5 shrink-0 text-signal-deep" />
            {failure ??
              "That didn't go through. Try again, or email us directly and we'll pick it up from there."}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
