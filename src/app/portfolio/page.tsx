import type { Metadata } from 'next';

import CTABand from '@/components/CTABand';
import PageHero from '@/components/PageHero';
import PortfolioGrid from '@/components/PortfolioGrid';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Phone system rollouts, support contracts, custom software and websites. Work across all four Nexa Connect services.',
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work across all four services"
        lead="Avaya, Mitel, Zoom Phone and Genesys deployments, support contracts, custom software and websites. Clients are described by sector; references are available on request."
      />

      <section className="bg-paper py-20 sm:py-28">
        <div className="container-page">
          <PortfolioGrid projects={projects} />

          {/* Required by the CC BY 4.0 licence of the Avaya photo. */}
          <p className="mt-12 text-[0.75rem] leading-relaxed text-ink-soft">
            Avaya J159 photo:{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:Avaya_IX_J159_VoIP_phone_at_a_Publix_supermarket.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-pine"
            >
              Nielsoncaetanosalmeron
            </a>
            ,{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-pine"
            >
              CC BY 4.0
            </a>
            , cropped.
          </p>
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
