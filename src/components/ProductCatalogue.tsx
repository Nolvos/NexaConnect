'use client';

import { useId, useState } from 'react';

import Icon from '@/components/Icon';
import ProductCard from '@/components/ProductCard';
import { filterProducts, productCategories, type Product, type ProductCategorySlug, type ProductFilters } from '@/lib/products';

const controlClass = 'min-h-[48px] w-full rounded-button border border-line bg-white px-3 py-2 text-sm text-ink transition-colors hover:border-signal';
const resetClass = 'min-h-[44px] rounded-button border border-line px-4 font-display text-sm font-medium text-pine transition-colors hover:border-signal hover:bg-mist';

function defaults(category?: ProductCategorySlug): ProductFilters {
  return { search: '', category: category ?? 'all', brand: 'all', productType: 'all', feature: 'all', cameraTier: 'all' };
}

export default function ProductCatalogue({ products, category }: { products: Product[]; category?: ProductCategorySlug }) {
  const prefix = useId();
  const [filters, setFilters] = useState<ProductFilters>(() => defaults(category));
  const scoped = products.filter((product) => filters.category === 'all' || product.category === filters.category);
  const brands = Array.from(new Set(scoped.map((product) => product.brand))).sort();
  const types = Array.from(new Set(scoped.map((product) => product.productType))).sort();
  const features = Array.from(new Set(scoped.flatMap((product) => product.features))).sort();
  const shown = filterProducts(products, filters);
  const canShowCameraTiers = filters.category === 'all' || filters.category === 'surveillance';
  const hasFilters = Object.entries(filters).some(([key, value]) => value !== defaults(category)[key as keyof ProductFilters]);

  function update(key: keyof ProductFilters, value: string) {
    setFilters((current) => key === 'category'
      ? { ...defaults(), search: current.search, category: value }
      : { ...current, [key]: value });
  }

  function select(key: keyof ProductFilters, label: string, options: Array<{ value: string; label: string }>, allLabel: string) {
    return (
      <div>
        <label htmlFor={`${prefix}-${key}`} className="mb-2 block text-sm font-medium text-pine">{label}</label>
        <select id={`${prefix}-${key}`} value={filters[key]} onChange={(event) => update(key, event.target.value)} className={controlClass}>
          <option value="all">{allLabel}</option>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div>
      <div role="search" aria-label="Search and filter products" className="rounded-card border border-line bg-mist p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor={`${prefix}-search`} className="mb-2 block text-sm font-medium text-pine">Search products and requirements</label>
            <div className="relative">
              <Icon name="Search" size={18} className="pointer-events-none absolute left-3 top-4 text-ink-soft" />
              <input id={`${prefix}-search`} type="search" value={filters.search} onChange={(event) => update('search', event.target.value)} placeholder="Try Dell, PoE, RAM or outdoor" className={`${controlClass} pl-10`} autoComplete="off" />
            </div>
          </div>
          <button type="button" onClick={() => setFilters(defaults(category))} disabled={!hasFilters} className={`${resetClass} disabled:cursor-default disabled:opacity-50`}>Reset filters</button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!category && select('category', 'Category', productCategories.map((item) => ({ value: item.slug, label: item.title })), 'All categories')}
          {select('brand', 'Brand preference', brands.map((brand) => ({ value: brand, label: brand })), 'All brands / undecided')}
          {select('productType', 'Product type', types.map((type) => ({ value: type, label: type })), 'All product types')}
          {select('feature', 'Requirement', features.map((feature) => ({ value: feature, label: feature })), 'All requirements')}
          {canShowCameraTiers && select('cameraTier', 'Camera budget tier', ['Budget-friendly', 'Business', 'Premium'].map((tier) => ({ value: tier, label: tier })), 'All tiers / other products')}
        </div>
      </div>
      <p className="mt-6 text-sm text-ink-soft" role="status" aria-live="polite" aria-atomic="true">Showing {shown.length} {shown.length === 1 ? 'result' : 'results'}{hasFilters ? ' matching your filters' : ''}.</p>
      {shown.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((product) => <ProductCard key={`${product.category}/${product.slug}`} product={product} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-card border border-line bg-white px-6 py-12 text-center">
          <Icon name="Search" size={32} className="mx-auto text-signal-deep" />
          <h3 className="mt-4 text-xl">No matching products</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink-soft">Try a broader search or reset the filters to explore the available enquiry guides.</p>
          <button type="button" onClick={() => setFilters(defaults(category))} className={`mt-6 ${resetClass}`}>Reset filters</button>
        </div>
      )}
    </div>
  );
}
