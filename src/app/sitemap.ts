import type { MetadataRoute } from 'next';

import { services, site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/about', '/portfolio', '/contact', ...services.map((s) => s.href)];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
