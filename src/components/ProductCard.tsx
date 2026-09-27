import Link from 'next/link';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import CataloguePhoto from '@/components/CataloguePhoto';
import TopicArtwork from '@/components/TopicArtwork';
import { getProductCategory, productHref, productIcon, productQuoteHref, type Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const category = getProductCategory(product.category)!;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white">
      <div className="relative border-b border-line">
        {product.image ? (
          <CataloguePhoto src={product.image.src} alt={product.image.alt} />
        ) : (
          <TopicArtwork icon={productIcon(product)} label={product.productType} brand={product.brand === 'Brand to be selected' ? undefined : product.brand} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">{category.title}</p>
          {product.cameraTier && <span className="rounded-full bg-mist px-2 py-1 text-xs font-medium text-pine">{product.cameraTier}</span>}
        </div>
        <h3 className="mt-3 text-xl leading-snug">
          <Link href={productHref(product)} className="underline decoration-transparent underline-offset-4 hover:decoration-signal">{product.name}</Link>
        </h3>
        <p className="mt-2 text-xs text-ink-soft">{product.brand} · {product.kind === 'enquiry' ? 'Enquiry guide' : product.model}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.summary}</p>
        <ul className="mt-5 space-y-2 text-sm text-ink-soft" aria-label={product.kind === 'enquiry' ? 'Key requirements' : 'Key specifications'}>
          {product.keyFacts.map((fact) => <li key={fact} className="flex items-start gap-2"><Icon name="Check" size={16} className="mt-1 shrink-0 text-signal-deep" /><span>{fact}</span></li>)}
        </ul>
        <div className="mt-auto pt-6">
          <p className="mb-3 font-mono text-xs text-ink-soft">Request pricing</p>
          <Button href={productQuoteHref(product)} className="w-full" icon="ArrowRight">Request a Quote<span className="sr-only"> for {product.name}</span></Button>
          <Link href={productHref(product)} className="mt-2 flex min-h-[44px] items-center justify-center text-sm font-medium text-pine underline decoration-line underline-offset-4 hover:decoration-pine">View details<span className="sr-only"> for {product.name}</span></Link>
        </div>
      </div>
    </article>
  );
}
