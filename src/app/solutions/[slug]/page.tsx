import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import CheckList from '@/components/CheckList';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import SolutionCard from '@/components/SolutionCard';
import CataloguePhoto from '@/components/CataloguePhoto';
import { getSolution, solutions } from '@/lib/solutions';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) return { title: 'Solution not found' };
  return { title: solution.name, description: solution.summary, alternates: { canonical: `/solutions/${solution.slug}` } };
}

export default function SolutionPage({ params }: PageProps) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();
  const enquiryHref = `/contact?solution=${encodeURIComponent(solution.slug)}`;
  const related = solutions.filter((item) => item.slug !== solution.slug && item.family === solution.family).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={solution.family} title={solution.name} lead={solution.summary}>
        <Button href={enquiryHref} variant="accent" icon="ArrowRight" className="h-auto min-h-12 py-3">Discuss Your Requirements</Button>
      </PageHero>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: solution.shortName }]} />
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <p className="eyebrow">Solution overview</p>
            <h2 className="mt-3 text-display-sm">{solution.shortName}</h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">{solution.overview}</p>
            <h3 className="mt-9 text-xl">Key capabilities</h3>
            <CheckList items={solution.capabilities} className="mt-4" />
          </div>
          <aside className="self-start rounded-card border border-line bg-mist p-6" aria-label="Lifecycle and scope">
            <div className="-mx-6 -mt-6 mb-6 overflow-hidden rounded-t-card border-b border-line"><CataloguePhoto src={solution.image.src} alt={solution.image.alt} /></div>
            <Icon name={solution.lifecycle.legacy ? 'RefreshCw' : 'ClipboardList'} className="text-signal-deep" size={26} />
            <h2 className="mt-4 text-lg">{solution.lifecycle.label}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{solution.lifecycle.detail}</p>
            <p className="mt-4 border-t border-line pt-4 text-sm text-ink-soft">Include your installed versions and current support arrangements in the enquiry.</p>
          </aside>
        </div>
      </section>
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div><p className="eyebrow">Where it fits</p><h2 className="mt-3 text-2xl">Business use cases</h2><CheckList items={solution.useCases} className="mt-5" /></div>
          <div><p className="eyebrow">Before implementation</p><h2 className="mt-3 text-2xl">Integration considerations</h2><CheckList items={solution.integration} className="mt-5" /></div>
        </div>
      </section>
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div><p className="eyebrow">Plan the work</p><h2 className="mt-3 text-2xl">Service scope</h2><CheckList items={solution.serviceScope} className="mt-5" /><p className="mt-5 text-sm text-ink-soft">Final deliverables, access requirements and support terms are agreed after discovery.</p></div>
          <div>
            <p className="eyebrow">Product documentation</p>
            <h2 className="mt-3 text-2xl">Manufacturer references</h2>
            <ul className="mt-5 space-y-3">
              {solution.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-pine underline decoration-line underline-offset-4 hover:decoration-signal">{source.title}<Icon name="ArrowUpRight" size={15} className="shrink-0" /><span className="sr-only"> (opens in a new tab)</span></a></li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-soft">Reviewed {solution.sources[0].checkedOn}. Refer to the vendor’s release documentation for the proposed configuration.</p>
          </div>
        </div>
      </section>
      <section className="bg-pine py-16 sm:py-20">
        <div className="container-page flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl"><h2 className="text-display-sm text-paper">Let’s discuss your requirements</h2><p className="mt-4 text-paper/75">Share your environment and priorities. Your enquiry will include {solution.shortName}.</p></div>
          <Button href={enquiryHref} variant="accent" icon="ArrowRight" className="h-auto min-h-12 self-start py-3 lg:shrink-0">Discuss Your Requirements</Button>
        </div>
      </section>
      {related.length > 0 && <section className="bg-mist py-16 sm:py-20"><div className="container-page"><h2 className="text-2xl">Related solutions</h2><div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <SolutionCard key={item.slug} solution={item} />)}</div></div></section>}
    </>
  );
}
