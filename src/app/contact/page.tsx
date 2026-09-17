import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you need: PBX, support, software or web. Phone, email, WhatsApp, or send an enquiry and we will come back to you.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what's not working"
        lead="Describe your setup and what it's costing you. We'll come back with an approach and a number, and say so if we're not the right fit."
      />

      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* ---------------- Form ---------------- */}
          <Reveal>
            <h2 className="sr-only">Enquiry form</h2>
            <ContactForm />
          </Reveal>

          {/* ---------------- Details ---------------- */}
          <Reveal delay={0.08} className="space-y-6">
            <div className="rounded-card border border-line bg-white p-7 shadow-card">
              <h2 className="font-display text-xl font-semibold text-pine">Reach us directly</h2>
              {/* All values come from lib/site.ts. */}
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={`tel:${contact.tel}`}
                    className="group flex min-h-[44px] items-center gap-3.5 text-[0.9375rem] text-ink transition-colors hover:text-pine"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-mist transition-colors group-hover:bg-signal/12">
                      <Icon name="Phone" size={18} className="text-signal-deep" />
                    </span>
                    <span>
                      <span className="block font-mono">{contact.phoneDisplay}</span>
                      <span className="block text-[0.8125rem] text-ink-soft">Call us</span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[44px] items-center gap-3.5 text-[0.9375rem] text-ink transition-colors hover:text-pine"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-mist transition-colors group-hover:bg-signal/12">
                      <Icon name="MessageCircle" size={18} className="text-signal-deep" />
                    </span>
                    <span>
                      <span className="block">WhatsApp</span>
                      <span className="block text-[0.8125rem] text-ink-soft">
                        Quickest for a short question
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex min-h-[44px] items-center gap-3.5 text-[0.9375rem] text-ink transition-colors hover:text-pine"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-mist transition-colors group-hover:bg-signal/12">
                      <Icon name="Mail" size={18} className="text-signal-deep" />
                    </span>
                    <span>
                      <span className="block break-all">{contact.email}</span>
                      <span className="block text-[0.8125rem] text-ink-soft">Email us</span>
                    </span>
                  </a>
                </li>

                <li className="flex gap-3.5 pt-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-mist">
                    <Icon name="MapPin" size={18} className="text-signal-deep" />
                  </span>
                  <address className="not-italic text-[0.9375rem] leading-relaxed text-ink">
                    {contact.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </li>
              </ul>
            </div>

            {/* ---------------- Hours ---------------- */}
            <div className="rounded-card border border-line bg-white p-7 shadow-card">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-pine">
                <Icon name="Clock" size={19} className="text-signal-deep" />
                Business hours
              </h2>
              <dl className="mt-5 space-y-2.5">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 text-[0.9375rem]">
                    <dt className="text-ink-soft">{h.days}</dt>
                    <dd className="font-mono text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 flex items-start gap-2 border-t border-line pt-5 text-[0.875rem] text-ink-soft">
                <Icon name="BellRing" size={15} className="mt-0.5 shrink-0 text-signal-deep" />
                {contact.emergencyNote}
              </p>
            </div>

            {/* ---------------- Map ---------------- */}
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
              <iframe
                src={contact.mapEmbedUrl}
                title={`Map showing ${contact.addressLines.join(', ')}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[16/10] w-full border-0 bg-mist"
              />
              <a
                href={contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-2 border-t border-line px-7 text-[0.875rem] font-medium text-pine transition-colors hover:text-signal-deep"
              >
                <Icon name="MapPin" size={16} className="shrink-0 text-signal-deep" />
                Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
