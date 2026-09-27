import type { Metadata } from 'next';

import CTABand from '@/components/CTABand';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import PortfolioGrid from '@/components/PortfolioGrid';
import SectionHeading from '@/components/SectionHeading';
import { projects } from '@/lib/projects';
import { solutions } from '@/lib/solutions';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore the Nexa Connect project portfolio and enterprise solution capabilities across Avaya, Verint and call accounting.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects and enterprise capabilities"
        lead="Browse project examples and enterprise solutions together. Each card is labelled so you can distinguish delivered work from a capability we can discuss for your environment."
      />

      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]} />

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Nexa Connect portfolio" title="Work and expertise, one view" lead="Filter the gallery to explore delivered projects or solution capabilities. Project examples describe work by sector; solution cards describe services available for discussion." className="mb-10" />
          <PortfolioGrid projects={projects} solutions={solutions} />
          <div className="mt-10 border-t border-line pt-8">
            <Button href="/solutions" variant="outline" icon="ArrowRight">Explore solution details</Button>
          </div>
        </div>
      </section>

      <CTABand
        title="Want to see something closer to your situation?"
        lead="Tell us your sector and site count and we'll walk you through the most comparable project we've delivered."
        action="Get in touch"
      />
    </>
  );
}
