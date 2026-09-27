import { getProduct, getProductCategory } from '@/lib/products';
import { getSolution } from '@/lib/solutions';

/** Only catalogue identifiers travel from the browser; labels are resolved again on the server. */
export interface EnquirySelection {
  category?: string;
  product?: string;
  solution?: string;
}

export interface EnquiryContext {
  selection: EnquirySelection;
  label: string;
  href: string;
  service: 'products' | 'enterprise';
  message: string;
}

export function resolveEnquiry(selection: EnquirySelection): EnquiryContext | null {
  const { category, product, solution } = selection;
  if (solution) {
    if (category || product) return null;
    const offering = getSolution(solution);
    if (!offering) return null;
    return {
      selection: { solution: offering.slug },
      label: offering.name,
      href: `/solutions/${offering.slug}`,
      service: 'enterprise',
      message: `I'd like to discuss ${offering.name}.\n\nCurrent setup and version:\nRequirements:\nPreferred timeline:`,
    };
  }
  if (!category) return null;
  const group = getProductCategory(category);
  if (!group) return null;
  const item = product ? getProduct(category, product) : undefined;
  if (product && !item) return null;
  const label = item ? `${item.name} — ${group.title}` : group.title;
  return {
    selection: item ? { category: group.slug, product: item.slug } : { category: group.slug },
    label,
    href: item ? `/products/${group.slug}/${item.slug}` : `/products/${group.slug}`,
    service: 'products',
    message: `I'd like a quote for ${item?.name ?? group.title}.\n\nQuantity:\nRequired specifications or existing equipment:\nPreferred timeline:`,
  };
}

/** Reject unknown keys, arrays, oversized identifiers and arbitrary display text. */
export function parseEnquirySelection(value: unknown): EnquirySelection | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries = Object.entries(value);
  if (!entries.length || entries.some(([key, item]) =>
    !['category', 'product', 'solution'].includes(key) ||
    typeof item !== 'string' || !/^[a-z0-9-]{1,100}$/.test(item)
  )) return null;
  return value as EnquirySelection;
}
