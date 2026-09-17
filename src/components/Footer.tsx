import Link from 'next/link';

import Icon from '@/components/Icon';
import { contact, services, site } from '@/lib/site';

const company = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex py-1.5 text-[0.9375rem] text-paper/70 transition-colors hover:text-paper"
    >
      {children}
      <span className="absolute -bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-200 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-pine-deep text-paper">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8 lg:py-20">
        <div>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path
              d="M5 18.5 L13 6.5 L21 18.5"
              stroke="#3FA679"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M5 18.5 L21 18.5" stroke="#3FA679" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="13" cy="6.5" r="2.75" fill="#3FA679" />
            <circle cx="5" cy="18.5" r="2.25" fill="#3FA679" fillOpacity="0.75" />
            <circle cx="21" cy="18.5" r="2.25" fill="#3FA679" fillOpacity="0.75" />
          </svg>
          <p className="mt-4 font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-paper/70">
            {site.tagline}
          </p>
        </div>

        <div>
          <h2 className="eyebrow-on-dark">Services</h2>
          <ul className="mt-4 flex flex-col">
            {services.map((s) => (
              <li key={s.slug}>
                <FooterLink href={s.href}>{s.title}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow-on-dark">Company</h2>
          <ul className="mt-4 flex flex-col">
            {company.map((c) => (
              <li key={c.href}>
                <FooterLink href={c.href}>{c.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow-on-dark">Get in touch</h2>
          {/* All values come from lib/site.ts. */}
          <ul className="mt-4 space-y-3 text-[0.9375rem] text-paper/70">
            <li>
              <a
                href={`tel:${contact.tel}`}
                className="inline-flex items-center gap-2.5 py-1 font-mono transition-colors hover:text-signal"
              >
                <Icon name="Phone" size={16} className="text-signal" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2.5 py-1 transition-colors hover:text-signal"
              >
                <Icon name="Mail" size={16} className="text-signal" />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="MapPin" size={16} className="mt-1 shrink-0 text-signal" />
              <span>
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.8125rem] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.75rem]">{contact.emergencyNote}</p>
        </div>
      </div>
    </footer>
  );
}
