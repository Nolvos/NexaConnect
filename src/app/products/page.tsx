import type { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import ProductCatalogue from '@/components/ProductCatalogue';
import ProductCategoryCards from '@/components/ProductCategoryCards';
import SectionHeading from '@/components/SectionHeading';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Products | Networking, Servers, Cameras & Components',
  description: 'Explore networking, Dell and HPE server requirements, security cameras and computer components. Define your configuration and request a quotation from Nexa Connect.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="The right hardware starts with the right requirements" lead="Explore networking, servers, surveillance and computer components. Tell us what you need to connect, run or protect, and start a configuration enquiry.">
        <Button href="#catalogue" variant="accent" icon="ArrowRight">Browse products</Button>
        <Button href="/contact" variant="outlineDark">Discuss your requirements</Button>
      </PageHero>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      <section className="bg-paper py-16 sm:py-20" aria-labelledby="categories-title">
        <div className="container-page">
          <h2 id="categories-title" className="mb-8 text-2xl">Explore by category</h2>
          <ProductCategoryCards />
        </div>
      </section>
      <section id="catalogue" className="border-t border-line bg-paper py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Product catalogue" title="Build your equipment brief" lead="These enquiry guides describe the requirements to agree for a quotation. Exact models, specifications, availability, pricing and warranty are confirmed for your request." />
          <div className="mt-10"><ProductCatalogue products={products} /></div>
        </div>
      </section>
    </>
  );
}
