import Link from 'next/link';

import Icon from '@/components/Icon';
import CataloguePhoto from '@/components/CataloguePhoto';
import { productCategories } from '@/lib/products';

export default function ProductCategoryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {productCategories.map((category) => (
        <Link key={category.slug} href={category.href} className="group overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-signal">
          <CataloguePhoto src={category.image.src} alt={category.image.alt} icon={category.icon} />
          <div className="p-6">
            <h3 className="text-xl">{category.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{category.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-medium text-pine">
              Explore category <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
