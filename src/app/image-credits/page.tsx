import type { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Image credits',
  description: 'Attribution and licence information for photography used on the Nexa Connect website.',
  alternates: { canonical: '/image-credits' },
};

export default function ImageCreditsPage() {
  const phonePhoto = projects.find((project) => project.seed === 'nexa-pbx-1')?.imageCredit;

  return (
    <>
      <PageHero eyebrow="About this site" title="Image credits" lead="Attribution and licence details for third-party photography used on Nexa Connect." />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Image credits' }]} />
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl">Portfolio phone image</h2>
          {phonePhoto && (
            <p className="mt-5 leading-relaxed text-ink-soft">
              The Avaya J159 IP desk phone image is by{' '}
              <a href={phonePhoto.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-pine underline underline-offset-4">{phonePhoto.author}</a>
              {' '}on Wikimedia Commons, under the{' '}
              <a href={phonePhoto.licenceUrl} target="_blank" rel="noopener noreferrer" className="text-pine underline underline-offset-4">{phonePhoto.licence} licence</a>.
              {' '}The image was {phonePhoto.note} for the portfolio card. The photographer does not endorse Nexa Connect.
            </p>
          )}
          <p className="mt-8 text-sm leading-relaxed text-ink-soft">Catalogue and solution images were created for Nexa Connect as generic illustrations. They do not depict a specific quoted model, installed system or vendor interface.</p>
        </div>
      </section>
    </>
  );
}
