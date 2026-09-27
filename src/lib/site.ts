import type { IconName } from '@/components/Icon';

/**
 * Single source of truth for navigation, service metadata and contact details.
 *
 * CONTENT RULE: nothing in this file may contain an invented statistic, client
 * name, certification or credential. Anything not yet supplied by the business
 * is written as a bracketed placeholder (e.g. "[X]+") so it is obvious at a
 * glance what still needs replacing before launch.
 */

export const site = {
  name: 'Nexa Connect',
  tagline: 'Hardware, business communication and software, connected end to end.',
  description:
    'Explore networking, servers, surveillance and computer hardware alongside enterprise communications, workforce solutions and custom software from Nexa Connect.',
  /* TODO: replace with the production domain before deploying. */
  url: 'https://nexaconnect.vercel.com',
} as const;

export type ServiceSlug = 'pbx' | 'maintenance' | 'software' | 'web-design';

export interface Service {
  slug: ServiceSlug;
  href: string;
  title: string;
  /** Used in nav dropdowns and cards - one line, benefit-led. */
  blurb: string;
  icon: IconName;
}

export const services: Service[] = [
  {
    slug: 'pbx',
    href: '/services/pbx',
    title: 'PBX solutions',
    blurb: 'Avaya, Mitel, Zoom Phone and Genesys, sized and installed for how your team actually calls.',
    icon: 'Phone',
  },
  {
    slug: 'maintenance',
    href: '/services/maintenance',
    title: 'Maintenance & support',
    blurb: 'Keep phones, network and software running, with a response time you can hold us to.',
    icon: 'Wrench',
  },
  {
    slug: 'software',
    href: '/services/software',
    title: 'Software solutions',
    blurb: 'Custom apps, integrations and automation that fit your process instead of replacing it.',
    icon: 'Code',
  },
  {
    slug: 'web-design',
    href: '/services/web-design',
    title: 'Web design',
    blurb: 'Websites that load fast, read clearly and turn visitors into enquiries.',
    icon: 'Palette',
  },
];

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/pbx', children: services },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * `tel` / `whatsapp` must be digits only for the link to work.
 * Hours are Gulf Standard Time (GMT+4).
 */
export const contact = {
  phoneDisplay: '+971 52 512 6700',
  tel: '+971525126700',
  whatsapp: '971525126700',
  email: 'Rafik.alhalabi.1994@gmail.com',
  addressLines: ['Alwan Tower', 'IMPZ, Dubai', 'United Arab Emirates'],
  /** Keyless Google Maps embed, centred on the office. */
  mapEmbedUrl:
    'https://www.google.com/maps?q=25.0366825,55.2024415&hl=en&z=17&output=embed',
  /** "Open in Google Maps" / directions link. */
  mapLink: 'https://www.google.com/maps/place/Alwan+Residence/@25.036499,55.2024689,17z/data=!4m6!3m5!1s0x3e5f6d9432dce107:0xd10aa09574e951ad!8m2!3d25.0366825!4d55.2024415!16s%2Fg%2F11j7vm_fc5?hl=en',
  hours: [
    { days: 'Monday to Friday', time: '08:30 - 17:30' },
    { days: 'Saturday', time: '09:00 - 13:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
  emergencyNote: 'Priority support customers have a 24-7 line, issued at onboarding.',
} as const;

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'products', label: 'Hardware & product quotations' },
  { value: 'enterprise', label: 'Enterprise solutions' },
  { value: 'other', label: 'Something else' },
];
