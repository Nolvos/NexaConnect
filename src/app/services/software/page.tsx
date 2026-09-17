import type { Metadata } from 'next';

import Button from '@/components/Button';
import CTABand from '@/components/CTABand';
import CheckList from '@/components/CheckList';
import Icon, { type IconName } from '@/components/Icon';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Steps from '@/components/Steps';

export const metadata: Metadata = {
  title: 'Software solutions',
  description:
    'Custom applications, system integrations and process automation, built around how your business already works, then supported after launch.',
};

const categories: Array<{ icon: IconName; title: string; body: string; points: string[] }> = [
  {
    icon: 'Blocks',
    title: 'Custom applications',
    body: 'When the off-the-shelf option would need so much bending that you may as well build the thing properly.',
    points: [
      'Internal tools and admin portals',
      'Customer-facing portals and booking',
      'Reporting and dashboards',
      'Mobile-friendly by default',
    ],
  },
  {
    icon: 'Plug',
    title: 'Integrations',
    body: 'Getting the systems you already pay for to talk to each other, instead of talking through a person with a spreadsheet.',
    points: [
      'CRM, ERP and helpdesk connections',
      'Phone system to customer records',
      'Payment, accounting and invoicing links',
      'API design where none exists yet',
    ],
  },
  {
    icon: 'Workflow',
    title: 'Automation',
    body: 'Removing the recurring manual step that everyone has quietly accepted as part of the job.',
    points: [
      'Scheduled jobs and data syncs',
      'Document and report generation',
      'Approval and notification flows',
      'Alerting when something needs a human',
    ],
  },
];

const process = [
  {
    title: 'Discovery',
    body: 'We sit with the people who do the work and watch the current process, including the workarounds. The workarounds are usually where the requirement actually is.',
  },
  {
    title: 'Scoping',
    body: 'A written scope with what is in, what is explicitly out, and a cost. If the honest answer is that a configuration change to your existing system solves it, we say so.',
  },
  {
    title: 'Build',
    body: 'Delivered in reviewable increments so you see working software early, not a demo three months in that turns out to have missed the point.',
  },
  {
    title: 'Deploy',
    body: 'Staged rollout with your data migrated and verified, and the people who will use it trained before it becomes the only option.',
  },
  {
    title: 'Support',
    body: 'Fixes, changes and hosting under the same maintenance agreement as the rest of your stack. Source code and documentation are yours.',
  },
];

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Software solutions"
        title="Software that fits your process instead of replacing it"
        lead="Custom applications, integrations and automation, scoped honestly, built in the open, and supported by the same team that runs your phones and network."
      >
        <Button href="/contact" variant="accent" icon="ArrowRight">
          Discuss your project
        </Button>
      </PageHero>

      {/* ---------------- Categories ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we build"
            title="Three kinds of work, one conversation"
            lead="Most projects start as one of these and turn out to need a bit of another. Scoping it as a whole from the start is cheaper than discovering it halfway through."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                    <Icon name={c.icon} size={21} className="text-signal-deep" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-pine">{c.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{c.body}</p>
                  <CheckList items={c.points} className="mt-6 flex-1" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="relative overflow-hidden bg-pine-deep py-20 sm:py-28">
        <div className="pine-grid absolute inset-0" aria-hidden="true" />
        <div className="container-page relative">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="How a project runs"
                tone="dark"
                title="Five stages, in order"
                lead="Each one ends with something you can read and approve. Nothing moves to the next stage on a verbal maybe."
              />
            </div>

            <Steps steps={process} tone="dark" />
          </div>
        </div>
      </section>

      {/* ---------------- Working principles ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="No lock-in by obscurity"
          />

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {[
              {
                icon: 'GitBranch' as IconName,
                title: 'Your code, your repository',
                body: 'Source, deployment config and documentation live somewhere you own. If you ever want another team to take it on, they can.',
              },
              {
                icon: 'Database' as IconName,
                title: 'Your data stays exportable',
                body: 'No proprietary format that makes leaving expensive. Export paths are built in, not bolted on when you ask.',
              },
              {
                icon: 'Users' as IconName,
                title: 'Built with the people using it',
                body: 'The staff who will live in the software review it during the build, not at handover when changes cost the most.',
              },
              {
                icon: 'LifeBuoy' as IconName,
                title: 'Supported like everything else',
                body: 'Once live, it sits under the same maintenance agreement as your phones and network. One contract, one number.',
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-line bg-mist">
                  <Icon name={p.icon} size={20} className="text-signal-deep" />
                </span>
                <div>
                  <h3 className="font-display text-[1.0625rem] font-semibold text-pine">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Discuss your project"
        lead="Describe the process that's costing you time. We'll tell you whether it needs software at all, and if it does, roughly what it takes."
        action="Discuss your project"
      />
    </>
  );
}
