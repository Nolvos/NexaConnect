import CTABand from '@/components/CTABand';
import Button from '@/components/Button';
import HomeHero from '@/components/HomeHero';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import ServiceConnector from '@/components/ServiceConnector';
import StatCounter from '@/components/StatCounter';
import { services } from '@/lib/site';
import type { IconName } from '@/components/Icon';
import { productCategories } from '@/lib/products';

const valueProps: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'Layers',
    title: 'One provider, whole stack',
    body: 'Phones, network, software and website under one agreement, so nobody can point at the other vendor when something breaks.',
  },
  {
    icon: 'Headset',
    title: 'Support that knows your setup',
    body: 'Your configuration, extensions and history are on file. You never start a call by explaining your own network.',
  },
  {
    icon: 'Clock',
    title: 'Response times in writing',
    body: 'Every support tier states what we respond within. Pick the level that matches how much downtime actually costs you.',
  },
  {
    icon: 'ClipboardList',
    title: 'Yours to keep',
    body: 'Documentation, diagrams and credentials are handed over at the end of every project. No lock-in by obscurity.',
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="border-b border-line bg-mist py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Hardware for your next move" title="Build on the right equipment" lead="From a single upgrade to a complete site, explore the hardware and specifications that fit your requirements." />
            <Button href="/products" variant="outline" icon="ArrowRight" className="shrink-0 self-start sm:self-auto">Explore products</Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => <ServiceCard key={category.slug} href={category.href} title={category.title} blurb={category.description} icon={category.icon} image={category.image} />)}
          </div>
          <p className="mt-6 text-sm text-ink-soft">Tell us your quantity, requirements and timeline. Model selection, availability and pricing are confirmed with your quotation.</p>
        </div>
      </section>

      <section className="bg-pine-deep py-16 sm:py-20">
        <div className="container-page grid gap-9 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow-on-dark">Enterprise solutions</p>
            <h2 className="mt-3 text-3xl text-paper sm:text-4xl">Connect the systems behind every conversation</h2>
            <p className="mt-5 max-w-prose text-paper/70">Explore Avaya enterprise communications, Verint workforce solutions and call accounting. Plan integrations, upgrades and support around your current environment.</p>
          </div>
          <div className="space-y-6 lg:pl-8">
            <ul className="space-y-3 text-paper">
              {([
                { name: 'Avaya CM, System Manager, AES & legacy ACR', icon: 'PhoneCall' },
                { name: 'Verint WFM & Workforce Optimization', icon: 'CalendarClock' },
                { name: 'Call accounting & RingMaster requirements', icon: 'FileChartColumn' },
              ] as const).map((item) => <li key={item.name} className="flex items-center gap-3 border-b border-line-dark pb-3"><Icon name={item.icon} className="shrink-0 text-signal" size={20} />{item.name}</li>)}
            </ul>
            <Button href="/solutions" variant="accent" icon="ArrowRight">Explore solutions</Button>
          </div>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Four services that hold each other up"
            lead="Most clients start with one and end up with two or three, because the phone system, the network under it and the software on top are the same problem wearing different hats."
          />

          <div className="mt-14">
            {/* Echo of the hero motif: one rail, four nodes, one pulse. */}
            <ServiceConnector />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08} className="h-full">
                  <ServiceCard href={s.href} title={s.title} blurb={s.blurb} icon={s.icon} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Trust bar ---------------- */}
      <section className="border-y border-line bg-mist py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          {/* Priority response matches the 24-7 Priority tier on the maintenance page. */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <StatCounter value={4} label="Platforms supported" />
            <StatCounter value={30} suffix="min" label="Priority response" />
            <StatCounter value={24} suffix="/7" label="Priority support line" />
          </div>

          <div>
            <p className="eyebrow">Systems we work with</p>
            {/* Platform names only - add official partner badges once partner status is
                confirmed in writing. */}
            <div className="mt-4 flex flex-wrap gap-2.5">
              {['Avaya', 'Mitel', 'Zoom Phone', 'Genesys Cloud CX'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-control border border-line bg-white px-3.5 py-2.5 font-display text-sm text-pine"
                >
                  <Icon name="ShieldCheck" size={15} className="text-signal-deep" />
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-[0.875rem] text-ink-soft">
              <Icon name="MapPin" size={15} className="text-signal-deep" />
              On-site coverage across the UAE · remote support anywhere
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Nexa Connect"
            title={
              <>
                Fewer vendors.
                <br />
                Fewer things falling between them
              </>
            }
          />

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {valueProps.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07} className="flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-line bg-mist">
                  <Icon name={v.icon} size={20} className="text-signal-deep" />
                </span>
                <div>
                  <h3 className="font-display text-[1.0625rem] font-semibold text-pine">
                    {v.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ink-soft">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section removed until clients approve real quotes in writing -
          components/TestimonialCard.tsx is ready when they do. */}

      <CTABand
        title="Tell us what's not working"
        lead="Describe the setup you have now and what it's costing you. We'll come back with an approach and a number. No obligation."
        action="Request a quote"
      />
    </>
  );
}
