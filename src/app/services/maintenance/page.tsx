import type { Metadata } from 'next';

import Button from '@/components/Button';
import CTABand from '@/components/CTABand';
import CheckList from '@/components/CheckList';
import Icon, { type IconName } from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Maintenance & support',
  description:
    'Support tiers with stated response times for PBX, network, software and monitoring, plus preventive work that stops faults before they reach your staff.',
};

/*
 * Response times are contractual commitments - keep them in line with the
 * SLA schedule in the support agreement.
 */
const tiers = [
  {
    name: 'Basic',
    summary: 'Cover for businesses that can absorb a short wait.',
    response: '8 business hours',
    hours: 'Business hours, weekdays',
    features: [
      'Remote diagnosis and fixes',
      'Phone and email support',
      'Security and firmware updates applied on a scheduled cycle',
      'On-site visits billed as needed',
    ],
    featured: false,
  },
  {
    name: 'Standard',
    summary: 'The usual choice where phones are how revenue arrives.',
    response: '4 hours',
    hours: 'Extended hours, weekdays and Saturday',
    features: [
      'Everything in Basic',
      'Proactive monitoring with alerting',
      'Scheduled preventive visits',
      'On-site response included for covered faults',
      'Named engineer familiar with your setup',
    ],
    featured: false,
  },
  {
    name: '24-7 Priority',
    summary: 'For operations where downtime is measured in lost orders.',
    response: '30 minutes',
    hours: '24 hours, 7 days',
    features: [
      'Everything in Standard',
      'Round-the-clock line, including public holidays',
      'Priority queue position on every ticket',
      'Quarterly service review',
      'Documented escalation path with names and numbers',
    ],
    featured: true,
  },
];

const covered: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'Phone',
    title: 'Phone systems',
    body: 'PBX platform, handsets, call routing, voicemail and trunks, whether we installed it or inherited it.',
  },
  {
    icon: 'Network',
    title: 'Network',
    body: 'Switching, routing, Wi-Fi, firewalls and the QoS settings that keep voice traffic clean.',
  },
  {
    icon: 'RefreshCw',
    title: 'Software updates',
    body: 'Firmware and platform patches tested and applied on a schedule, not the day something breaks.',
  },
  {
    icon: 'Activity',
    title: 'Monitoring',
    body: 'Availability and call-quality checks that page us before your staff notice a problem.',
  },
];

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance & support"
        title="Keep it running, with a response time you can hold us to"
        lead="Phones, network and software covered under one agreement. Pick the tier that matches what an hour of downtime actually costs you."
      >
        <Button href="/contact" variant="accent" icon="ArrowRight">
          Request a maintenance quote
        </Button>
      </PageHero>

      {/* ---------------- Tiers ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Support tiers"
            title="Three levels. The difference is how fast we move"
            lead="Everything is cumulative, so each tier includes the one before it. Response times are the maximum we commit to, written into the agreement rather than implied."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    'flex h-full flex-col rounded-card border p-7 shadow-card',
                    tier.featured
                      ? 'border-pine bg-pine text-paper'
                      : 'border-line bg-white',
                  )}
                >
                  <h3
                    className={cn(
                      'font-display text-xl font-semibold',
                      tier.featured ? 'text-paper' : 'text-pine',
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      'mt-2 text-[0.9375rem] leading-relaxed',
                      tier.featured ? 'text-paper/70' : 'text-ink-soft',
                    )}
                  >
                    {tier.summary}
                  </p>

                  <div
                    className={cn(
                      'mt-6 rounded-control border px-4 py-3.5',
                      tier.featured ? 'border-signal/30 bg-pine-deep/40' : 'border-line bg-mist',
                    )}
                  >
                    <p
                      className={cn(
                        'font-mono text-[0.625rem] uppercase tracking-label',
                        tier.featured ? 'text-signal' : 'text-signal-deep',
                      )}
                    >
                      Response within
                    </p>
                    <p
                      className={cn(
                        'mt-1 font-display text-lg font-semibold',
                        tier.featured ? 'text-paper' : 'text-pine',
                      )}
                    >
                      {tier.response}
                    </p>
                    <p
                      className={cn(
                        'mt-1 flex items-center gap-1.5 text-[0.8125rem]',
                        tier.featured ? 'text-paper/60' : 'text-ink-soft',
                      )}
                    >
                      <Icon name="Clock" size={13} />
                      {tier.hours}
                    </p>
                  </div>

                  <CheckList
                    items={tier.features}
                    tone={tier.featured ? 'dark' : 'light'}
                    className="mt-6 flex-1"
                  />

                  <div className="mt-7">
                    <Button
                      href="/contact"
                      variant={tier.featured ? 'accent' : 'outline'}
                      className="w-full"
                    >
                      Request a quote
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- What's covered ---------------- */}
      <section className="border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's covered"
            title="One agreement across the whole stack"
            lead="Splitting phones, network and software across three suppliers is how a fault becomes a week of everyone blaming each other."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {covered.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                    <Icon name={c.icon} size={20} className="text-signal-deep" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-semibold text-pine">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Preventive vs reactive ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="Preventive and reactive, plainly"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                  <Icon name="ShieldCheck" size={21} className="text-signal-deep" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-pine">
                  Preventive: before it breaks
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Scheduled work you never see the results of, which is the point. Firmware kept
                  current, backups verified by restoring them, certificates renewed before they
                  expire, hardware replaced while it is still merely old.
                </p>
                <CheckList
                  className="mt-6"
                  items={[
                    'Patch and firmware cycles agreed in advance',
                    'Backup restores tested, not just backups taken',
                    'Capacity and call-quality trends reviewed',
                    'Ageing hardware flagged before it fails',
                  ]}
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                  <Icon name="LifeBuoy" size={21} className="text-signal-deep" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-pine">
                  Reactive: when it does
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Something will still break eventually. What matters then is how quickly you reach
                  someone who already knows your setup, and whether they can act without asking
                  permission from three other departments.
                </p>
                <CheckList
                  className="mt-6"
                  items={[
                    'One number, answered by an engineer',
                    'Your configuration already on file',
                    'Remote fix first, on-site where remote will not do',
                    'Written follow-up on what failed and why',
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Get a maintenance quote"
        lead="Tell us what you're running and how many sites. We'll come back with a tier recommendation and a price, including an honest note if you're already covered well enough elsewhere."
        action="Get a maintenance quote"
      />
    </>
  );
}
