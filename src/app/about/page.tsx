import type { Metadata } from 'next';
import Image from 'next/image';

import CTABand from '@/components/CTABand';
import CheckList from '@/components/CheckList';
import Icon, { type IconName } from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Nexa Connect is, how we work, and the Avaya, Mitel, Zoom Phone and Genesys platforms behind the phone systems, contact centres and software we deliver.',
};

/*
 * CONTENT RULE FOR THIS PAGE - read before editing.
 * Certifications, partner tiers and team members are the easiest things on a
 * site to overstate and the most damaging to get wrong. Only add one you can
 * evidence: a certificate number, a partner portal listing, a named employee
 * who has agreed to appear.
 */

const values: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'Handshake',
    title: 'Say the unprofitable thing',
    body: 'If a configuration change fixes it, we say so, even when the quote for a replacement would have been larger.',
  },
  {
    icon: 'ClipboardList',
    title: 'Leave documentation behind',
    body: 'Diagrams, credentials and admin guides are handed over on every project. Being hard to replace is not a business model.',
  },
  {
    icon: 'Clock',
    title: 'Commit to a number',
    body: 'Response times go in the agreement. A promise you cannot measure is not a promise.',
  },
];

/* Platforms only. Add vendor partner tiers here once they're confirmed in writing. */
const platforms = [
  'Avaya IP Office and Avaya Aura',
  'Mitel MiVoice Office 400 and MiVoice Business',
  'Zoom Phone, including Bring Your Own Carrier',
  'Genesys Cloud CX contact centre',
  'CRM and helpdesk integrations for all of the above',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="One team for the systems your business talks through"
        lead="Nexa Connect installs and maintains business phone systems, and builds the software and websites around them, so the whole stack has one owner."
      />

      {/* ---------------- Story ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Started with phone systems. Kept getting asked about everything else"
            />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              <p>
                Nexa Connect began as a telephony business in Dubai: installing, configuring and
                looking after Avaya and Mitel phone systems for companies that needed calls to land
                in the right place, first time. As clients moved to the cloud, Zoom Phone and
                Genesys Cloud CX followed.
              </p>
              <p>
                Clients kept asking the same follow-up question. Could we also fix the network
                underneath, connect the phone system to the CRM, or rebuild the website that had
                stopped bringing in enquiries. Saying yes turned out to be better for them than
                sending them to a third party who would need everything explained again.
              </p>
              <p>
                Today the four services run as one practice. The engineer who knows your dial plan
                is in the same team as the developer building your integration, which is the whole
                point.
              </p>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card border border-line shadow-card">
              {/* Stock photo (Unsplash) - swap for a photo of your own team or comms room when available. */}
              <div className="relative aspect-[4/5] bg-mist">
                <Image
                  src="https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?w=1000&q=80&auto=format&fit=crop"
                  alt="Network cables neatly patched into a switch in a comms room"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-pine-deep/30 mix-blend-multiply" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- How we work ---------------- */}
      <section className="border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we hold to"
            title="Three things we don't negotiate on"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                    <Icon name={v.icon} size={21} className="text-signal-deep" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-semibold text-pine">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Platforms ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Platforms"
              title="The systems our engineers work on every week"
              lead="On-premise, cloud and contact centre. Ask for a reference from a client running the same platform as you, and we'll put you in touch."
            />
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-card border border-line bg-white p-7 shadow-card">
              <p className="eyebrow">What we install and support</p>
              <CheckList items={platforms} className="mt-4" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team section removed until team members agree to appear with real photos. */}

      <CTABand
        title="Rather just talk to someone?"
        lead="Skip the form. Call and describe what's going on, and you'll get an engineer, not a script."
        action="Get in touch"
      />
    </>
  );
}
