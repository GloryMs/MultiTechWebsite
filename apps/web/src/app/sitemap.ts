import type { MetadataRoute } from 'next';

const BASE_URL = 'https://multitech.com.sa';
const LOCALES = ['ar', 'en'] as const;

const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/partners', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/media', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
