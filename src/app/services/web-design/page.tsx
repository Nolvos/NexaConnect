import type { Metadata } from 'next';

import Button from '@/components/Button';
import CTABand from '@/components/CTABand';
import CheckList from '@/components/CheckList';
import Icon, { type IconName } from '@/components/Icon';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import Steps from '@/components/Steps';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Web design',
  description:
    'New builds, redesigns, e-commerce and landing pages. Sites that load fast, read clearly and turn visitors into enquiries.',
};

const offerings: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'LayoutTemplate',
    title: 'New builds',
    body: 'A first proper website, built on something you can update yourself without calling us for a phone number change.',
  },
  {
    icon: 'RefreshCw',
    title: 'Redesigns',
    body: 'Your content and rankings kept, the layout and speed fixed. Usually the cheaper route if the copy is already good.',
  },
  {
    icon: 'ShoppingCart',
    title: 'E-commerce',
    body: 'Product, checkout and payment set up properly, with stock and invoicing wired to whatever you already run.',
  },
  {
    icon: 'Rocket',
    title: 'Landing pages',
    body: 'Single-purpose pages for a campaign or launch, built to be measured so you know whether the spend worked.',
  },
];

const process = [
  {
    title: 'Discovery',
    body: 'Who visits, what they need in the first ten seconds, and what counts as a result: an enquiry, a call, a sale. Everything after this is judged against that answer.',
  },
  {
    title: 'Wireframes',
    body: 'Structure and hierarchy in grey boxes first. Arguing about layout is much cheaper before anyone has picked a colour.',
  },
  {
    title: 'Design',
    body: 'Visual design applied to the agreed structure, shown on mobile and desktop together rather than desktop-first with mobile promised later.',
  },
  {
    title: 'Build',
    body: 'Built responsive, accessible and fast, with a content editor your team can actually operate. Reviewed on a staging URL before anything goes live.',
  },
  {
    title: 'Launch',
    body: 'Redirects mapped, analytics and forms tested end to end, then a check-in a few weeks later to see what the numbers say.',
  },
];

export default function WebDesignPage() {
  const webProjects = projects.filter((p) => p.category === 'web-design');

  return (
    <>
      <PageHero
        eyebrow="Web design"
        title="A site that loads fast and asks for the enquiry"
        lead="New builds, redesigns, e-commerce and campaign pages, designed around what your visitors came to do, then built to stay quick once the site is full of real content."
      >
        <Button href="/contact" variant="accent" icon="ArrowRight">
          Request a proposal
        </Button>
        <Button href="/portfolio" variant="outlineDark">
          See the work
        </Button>
      </PageHero>

      {/* ---------------- Offerings ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we offer"
            title="Four starting points"
            lead="Which one you need usually becomes obvious in the first conversation, and it is often the cheaper one."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-control bg-mist">
                    <Icon name={o.icon} size={20} className="text-signal-deep" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.0625rem] font-semibold text-pine">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="How a site gets built"
                title="Five stages, in order"
                lead="You approve each one before the next starts, so nothing arrives as a surprise at launch."
              />

              <Reveal delay={0.1} className="mt-8">
                <div className="rounded-card border border-line bg-white p-6 shadow-card">
                  <p className="eyebrow">Built in every time</p>
                  <CheckList
                    className="mt-4"
                    items={[
                      'Responsive from 320px up',
                      'Keyboard accessible, with real focus states',
                      'Fast on a mid-range phone, not just your laptop',
                      'Analytics and form tracking wired before launch',
                    ]}
                  />
                </div>
              </Reveal>
            </div>

            <Steps steps={process} />
          </div>
        </div>
      </section>

      {/* ---------------- Portfolio ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent web projects"
            lead="A couple of recent builds. Ask and we'll share links to live sites with the client's permission."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {webProjects.map((p, i) => (
              <Reveal key={p.seed} delay={i * 0.08} className="h-full">
                <ProjectCard
                  title={p.title}
                  description={p.description}
                  category={p.categoryLabel}
                  image={p.image}
                  imageAlt={p.imageAlt}
                  imagePosition={p.imagePosition}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <Button href="/portfolio" variant="outline" icon="ArrowRight">
              See all work
            </Button>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Request a proposal"
        lead="Send us your current site and what you wish it did. We'll come back with an approach, a timeline and a fixed price."
        action="Request a proposal"
      />
    </>
  );
}
