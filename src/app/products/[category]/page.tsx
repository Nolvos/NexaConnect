import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import ProductCatalogue from '@/components/ProductCatalogue';
import { getProductCategory, productCategories, products } from '@/lib/products';

type Props = { params: { category: string } };

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getProductCategory(params.category);
  if (!category) return { title: 'Category not found', robots: { index: false } };
  return {
    title: `${category.title} | Products`,
    description: `${category.description} Explore requirements and request a quotation from Nexa Connect.`,
    alternates: { canonical: category.href },
  };
}

export default function ProductCategoryPage({ params }: Props) {
  const category = getProductCategory(params.category);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.category === category.slug);
  return (
    <>
      <PageHero eyebrow="Products" title={category.title} lead={category.description}>
        <Button href={`/contact?category=${category.slug}`} variant="accent" icon="ArrowRight">Request a Quote</Button>
        <Button href="/products" variant="outlineDark">All products</Button>
      </PageHero>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: category.title }]} />
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl sm:text-3xl">Explore {category.title.toLowerCase()}</h2>
          <p className="mt-4 max-w-3xl text-ink-soft">Use these enquiry guides to define your requirements. Exact models, configurations, compatibility, pricing, availability and warranty are confirmed in the quotation.</p>
          {category.slug === 'servers' && <p className="mt-4 max-w-3xl rounded-card border border-line bg-mist p-5 text-sm text-ink-soft">Dell and HPE are manufacturer preferences for your enquiry. A server model&apos;s supported options are different from the components and licences included in a quoted configuration. Share your existing server details when requesting an upgrade.</p>}
          {category.slug === 'surveillance' && <p className="mt-4 max-w-3xl rounded-card border border-line bg-mist p-5 text-sm text-ink-soft">Budget-friendly, Business and Premium describe the scope of your camera brief. They are not fixed price bands or verified feature bundles. Camera and recorder compatibility is checked against the selected equipment.</p>}
          <div className="mt-10"><ProductCatalogue products={categoryProducts} category={category.slug} /></div>
        </div>
      </section>
    </>
  );
}
