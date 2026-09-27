import type { MetadataRoute } from 'next';

import { services, site } from '@/lib/site';
import { productCategories, products, productHref } from '@/lib/products';
import { solutions } from '@/lib/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/about', '/portfolio', '/contact', '/image-credits', '/products', '/solutions', ...services.map((s) => s.href),
    ...productCategories.map((category) => category.href), ...products.map(productHref), ...solutions.map((solution) => `/solutions/${solution.slug}`)];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
