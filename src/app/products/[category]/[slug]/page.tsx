import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import CataloguePhoto from '@/components/CataloguePhoto';
import TopicArtwork from '@/components/TopicArtwork';
import { getProduct, getProductCategory, productHref, productIcon, productQuoteHref, products } from '@/lib/products';

type Props = { params: { category: string; slug: string } };

export function generateStaticParams() {
  return products.map((product) => ({ category: product.category, slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.category, params.slug);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  return { title: `${product.name} | Products`, description: product.summary, alternates: { canonical: productHref(product) } };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProduct(params.category, params.slug);
  const category = getProductCategory(params.category);
  if (!product || !category) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug)
    .sort((a, b) => Number(b.productType === product.productType) - Number(a.productType === product.productType)).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={category.title} title={product.name} lead={product.summary}>
        <Button href={productQuoteHref(product)} variant="accent" icon="ArrowRight">Request a Quote</Button>
        <Button href={category.href} variant="outlineDark">Explore category</Button>
      </PageHero>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: category.title, href: category.href }, { label: product.name }]} />
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <p className="eyebrow">{product.brand} · {product.kind === 'enquiry' ? 'Enquiry guide' : product.model}</p>
            <h2 className="mt-3 text-3xl">Overview</h2>
            <p className="mt-5 text-ink-soft">{product.overview}</p>
            {product.kind === 'enquiry' ? (
              <p className="mt-5 rounded-card border border-line bg-mist p-5 text-sm text-ink-soft">This guide describes requirements to discuss. It does not represent a stocked model or a confirmed configuration. Exact equipment, availability, warranty and pricing are agreed in your quotation.</p>
            ) : (
              <p className="mt-5 rounded-card border border-line bg-mist p-5 text-sm text-ink-soft"><strong className="text-pine">{product.specificationScope}:</strong> {product.configurationNote}</p>
            )}

            <h2 className="mt-12 text-2xl">{product.kind === 'enquiry' ? 'Specification checklist' : 'Specifications'}</h2>
            <div className="mt-5 overflow-hidden rounded-card border border-line">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <caption className="sr-only">{product.name}: {product.kind === 'enquiry' ? 'requirements to confirm for a quotation' : product.specificationScope}</caption>
                <thead className="bg-pine text-paper"><tr><th scope="col" className="w-[34%] px-4 py-4 font-display font-medium">Specification</th><th scope="col" className="px-4 py-4 font-display font-medium">{product.kind === 'enquiry' ? 'Requirement to agree' : 'Detail'}</th></tr></thead>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={`${spec.label}-${index}`} className="border-t border-line odd:bg-white even:bg-mist/60">
                      <th scope="row" className="break-words px-4 py-4 align-top font-medium text-pine">{spec.label}</th>
                      <td className="break-words px-4 py-4 align-top leading-relaxed text-ink-soft">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {product.kind === 'model' && (
              <div className="mt-6 text-sm text-ink-soft">
                <h3 className="font-display text-base">Manufacturer references</h3>
                <ul className="mt-3 space-y-2">{product.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-pine">{source.title}</a> · checked {source.checkedOn}</li>)}</ul>
              </div>
            )}
            <h2 className="mt-12 text-2xl">Typical use cases</h2>
            <ul className="mt-5 space-y-3 text-ink-soft">{product.useCases.map((useCase) => <li key={useCase} className="flex items-start gap-3"><Icon name="Check" size={18} className="mt-1 shrink-0 text-signal-deep" /><span>{useCase}</span></li>)}</ul>
          </div>

          <aside className="overflow-hidden rounded-card border border-line bg-white" aria-label="Quotation details">
            <div className="relative flex h-52 items-center justify-center border-b border-line bg-mist">
              {product.image ? <div className="w-full"><CataloguePhoto src={product.image.src} alt={product.image.alt} large /></div> : <div className="w-full"><TopicArtwork icon={productIcon(product)} label={product.productType} brand={product.brand === 'Brand to be selected' ? undefined : product.brand} large /></div>}
            </div>
            {product.image?.attribution && <p className="px-6 pt-4 text-xs text-ink-soft">{product.image.attributionUrl ? <a href={product.image.attributionUrl} target="_blank" rel="noopener noreferrer" className="underline">{product.image.attribution}</a> : product.image.attribution}</p>}
            <div className="p-6 sm:p-8">
              <p className="eyebrow">Request pricing</p>
              <h2 className="mt-3 text-2xl">Tell us what you need</h2>
              <p className="mt-4 text-sm text-ink-soft">Include quantities, your intended use, existing equipment and preferred timeline. Your enquiry will include {product.name.toLowerCase()}.</p>
              {product.cameraTier && <p className="mt-4 text-sm text-ink-soft">Camera brief: <strong className="text-pine">{product.cameraTier}</strong>. The final specification and price depend on the selected equipment.</p>}
              <Button href={productQuoteHref(product)} className="mt-6 w-full" icon="ArrowRight">Request a Quote</Button>
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">Model selection and compatibility are confirmed before ordering.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-3xl">Related products</h2><Link href={category.href} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-pine underline decoration-line underline-offset-4">View all {category.title.toLowerCase()}<Icon name="ArrowRight" size={16} /></Link></div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div>
        </div>
      </section>
    </>
  );
}
