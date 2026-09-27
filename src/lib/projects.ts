import type { ServiceSlug } from '@/lib/site';

/**
 * Portfolio entries. Clients are described by sector rather than named -
 * only add a client name or logo once that client has agreed in writing.
 */
export interface Project {
  title: string;
  description: string;
  category: ServiceSlug;
  categoryLabel: string;
  /** Stable key for the card. */
  seed: string;
  image: string;
  imageAlt: string;
  imageCredit?: { author: string; sourceUrl: string; licence: string; licenceUrl: string; note?: string };
  /** CSS object-position for the crop, e.g. '50% 15%' to keep the top of a portrait photo. */
  imagePosition?: string;
}

export const projects: Project[] = [
  {
    title: 'Avaya IP Office consolidation for a multi-branch retail group',
    description:
      'Separate branch phone systems merged onto one Avaya IP Office platform, with a shared dial plan, short-code dialling between branches and central voicemail.',
    category: 'pbx',
    categoryLabel: 'PBX solutions · Avaya',
    seed: 'nexa-pbx-1',
    image: '/portfolio/avaya-j159-ip-phone.jpg',
    imageAlt: 'Avaya J159 IP desk phone',
    imageCredit: {
      author: 'Nielsoncaetanosalmeron',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Avaya_IX_J159_VoIP_phone_at_a_Publix_supermarket.jpg',
      licence: 'CC BY 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: 'cropped',
    },
  },
  {
    title: 'Mitel MiVoice Business rollout for a Dubai hotel',
    description:
      'Guest-room and back-of-house telephony on Mitel MiVoice Business, integrated with the property management system for check-in, room status and wake-up calls.',
    category: 'pbx',
    categoryLabel: 'PBX solutions · Mitel',
    seed: 'nexa-pbx-2',
    image: 'https://images.unsplash.com/photo-1668706936367-2bef7e0e38db?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Hotel room bedside table with a telephone and lamp',
  },
  {
    title: 'Zoom Phone migration for a consulting firm',
    description:
      'Desk phones retired in favour of Zoom Phone across office, laptop and mobile, connected to a UAE-licensed carrier through Bring Your Own Carrier trunks.',
    category: 'pbx',
    categoryLabel: 'PBX solutions · Zoom Phone',
    seed: 'nexa-pbx-3',
    image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Headset beside a laptop for remote calling',
  },
  {
    title: 'Avaya to Genesys Cloud contact centre migration',
    description:
      'Customer service queues moved from an ageing on-premise Avaya contact centre to Genesys Cloud CX, with agents cut over team by team to avoid a big-bang switch.',
    category: 'pbx',
    categoryLabel: 'PBX solutions · Genesys',
    seed: 'nexa-pbx-4',
    image: 'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Contact centre agents wearing headsets in an office',
  },
  {
    title: 'Avaya Aura support takeover for a healthcare provider',
    description:
      'An undocumented Avaya Aura estate brought under contract: configuration audited and written up, firmware backlog cleared and server alarms routed to our monitoring.',
    category: 'maintenance',
    categoryLabel: 'Maintenance · Avaya',
    seed: 'nexa-mnt-1',
    image: 'https://images.unsplash.com/photo-1680992046615-065f58bcb4d8?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Rack of server and network equipment',
  },
  {
    title: 'Mitel MiVoice Office 400 support for a logistics company',
    description:
      'Priority support across warehouse and office sites, with scheduled preventive visits, handset replacement and after-hours cover for the dispatch line.',
    category: 'maintenance',
    categoryLabel: 'Maintenance · Mitel',
    seed: 'nexa-mnt-2',
    image: 'https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Forklift in a large logistics warehouse',
  },
  {
    title: 'Genesys Cloud CX omnichannel desk for a financial services firm',
    description:
      'Voice, WhatsApp and web chat routed into one agent desktop, bilingual Arabic and English IVR built in Architect, and CRM screen-pop on every inbound interaction.',
    category: 'software',
    categoryLabel: 'Software · Genesys',
    seed: 'nexa-sw-1',
    image: 'https://images.unsplash.com/photo-1766066014237-00645c74e9c6?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Customer service agent wearing a headset at a computer',
  },
  {
    title: 'Call reporting dashboard for a property management company',
    description:
      'Call records from Zoom Phone and a legacy Avaya site pulled into one dashboard, replacing a weekly spreadsheet with live missed-call and answer-time reporting.',
    category: 'software',
    categoryLabel: 'Software · Zoom Phone, Avaya',
    seed: 'nexa-sw-2',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Analytics graphs on a laptop screen',
  },
  {
    title: 'Bilingual corporate website for a facilities management company',
    description:
      'Arabic and English site rebuilt with right-to-left layouts done properly, service pages per sector and enquiry forms routed to the right sales team.',
    category: 'web-design',
    categoryLabel: 'Web design',
    seed: 'nexa-web-1',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Wireframe sketches of website layouts',
  },
  {
    title: 'Campaign landing page for a cloud telephony launch',
    description:
      'Single-page site for a Zoom Phone offer, built for paid search traffic with call tracking and form analytics in place before the campaign went live.',
    category: 'web-design',
    categoryLabel: 'Web design',
    seed: 'nexa-web-2',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop',
    imageAlt: 'Laptop showing campaign performance charts',
  },
];
