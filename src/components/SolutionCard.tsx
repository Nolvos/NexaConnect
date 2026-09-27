import Link from 'next/link';

import Icon from '@/components/Icon';
import CataloguePhoto from '@/components/CataloguePhoto';
import type { EnterpriseSolution } from '@/lib/solutions';

export default function SolutionCard({ solution }: { solution: EnterpriseSolution }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
      <div className="relative border-b border-line">
        <CataloguePhoto src={solution.image.src} alt={solution.image.alt} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">Solution · {solution.family}{solution.lifecycle.legacy && ' · Legacy'}</p>
        <h3 className="mt-2 text-lg">
          <Link href={`/solutions/${solution.slug}`} className="underline-offset-4 hover:underline">{solution.shortName}</Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.9375rem] text-ink-soft">{solution.summary}</p>
        <Link href={`/solutions/${solution.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 self-start font-display text-sm font-medium text-pine hover:text-signal-deep">
          Explore solution <span className="sr-only">: {solution.shortName}</span><Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </article>
  );
}
