import type { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import CTABand from '@/components/CTABand';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import SolutionCard from '@/components/SolutionCard';
import { solutionFamilies, solutions } from '@/lib/solutions';

export const metadata: Metadata = {
  title: 'Enterprise solutions: Avaya, Verint & call accounting',
  description: 'Explore Avaya CM, SMGR, AES and legacy ACR, Verint WFM and WFO, and call accounting including Soft-ex RingMaster. Discuss implementation, integration and migration requirements.',
  alternates: { canonical: '/solutions' },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Enterprise solutions" title="Connect your people, platforms and operations" lead="Avaya enterprise communications, Verint workforce tools and call accounting. Explore the capabilities, then build a scope around your versions, integrations and business priorities.">
        <Button href="#avaya" variant="accent" icon="ArrowRight">Explore solutions</Button>
        <Button href="/portfolio" variant="outlineDark">View portfolio</Button>
      </PageHero>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} />
      <div className="container-page py-8">
        <nav aria-label="Solution families" className="flex flex-wrap gap-3">
          {solutionFamilies.map((family) => <Button key={family.id} href={`#${family.id}`} variant="outline">{family.name}</Button>)}
        </nav>
      </div>
      {solutionFamilies.map((family, index) => (
        <section key={family.id} id={family.id} aria-labelledby={`${family.id}-title`} className={index % 2 === 0 ? 'bg-mist py-16 sm:py-20' : 'bg-paper py-16 sm:py-20'}>
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow">Solutions portfolio</p>
              <h2 id={`${family.id}-title`} className="mt-3 text-display-sm">{family.name}</h2>
              <p className="mt-4 text-ink-soft">{family.description}</p>
            </div>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.filter((solution) => solution.family === family.name).map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}
            </div>
          </div>
        </section>
      ))}
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Start with your environment" title="A scope that fits the installed system" lead="Share your platform versions, site or agent count, current integrations and the change you need. We assess compatibility and licensing before proposing the work." />
          <div className="rounded-card border border-line bg-mist p-6 text-sm leading-relaxed text-ink-soft">
            <p>These entries describe solution capabilities and services available for discussion. The proposed work, maintenance arrangements and vendor entitlements are confirmed for each engagement.</p>
            <p className="mt-3">Existing Avaya Contact Recorder installations receive a separate lifecycle and migration review.</p>
          </div>
        </div>
      </section>
      <CTABand title="What does your environment need next?" lead="Tell us about a new implementation, an integration issue or a planned migration." action="Discuss Your Requirements" />
    </>
  );
}
