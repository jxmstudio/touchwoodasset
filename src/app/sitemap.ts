import { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { listings } from '@/data/listings'
import { storageUnits } from '@/data/storage-units'
import { carparkBays } from '@/data/carparks'
import { SITE_URL } from '@/lib/site'

const BASE_URL = SITE_URL

type Entry = MetadataRoute.Sitemap[number]

const staticPages: Array<{
  path: string
  changeFrequency: Entry['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/listings', changeFrequency: 'daily', priority: 0.9 },
  { path: '/carparks', changeFrequency: 'daily', priority: 0.9 },
  { path: '/the-archive', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/property-review', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/landlords', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/prime-hosting', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sellers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/valuation', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/inspection', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/service-comparison', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/legal/returns', changeFrequency: 'yearly', priority: 0.3 },
]

// Suburb landing pages. Keep in sync with src/app/locations/[suburb]/page.tsx.
const locationSlugs = ['east-melbourne', 'south-melbourne', 'melbourne-cbd', 'st-kilda']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const listingRoutes: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${BASE_URL}/listings/${listing.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const storageRoutes: MetadataRoute.Sitemap = storageUnits.map((unit) => ({
    url: `${BASE_URL}/the-archive/${unit.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    // Available units are the ones worth crawl budget.
    priority: unit.status === 'AVAILABLE' ? 0.7 : 0.4,
  }))

  // Car park bays were missing from the sitemap entirely.
  const carparkRoutes: MetadataRoute.Sitemap = carparkBays.map((bay) => ({
    url: `${BASE_URL}/carparks/${bay.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: bay.status === 'AVAILABLE' ? 0.7 : 0.4,
  }))

  const locationRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/locations`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...locationSlugs.map((slug) => ({
      url: `${BASE_URL}/locations/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...listingRoutes,
    ...carparkRoutes,
    ...storageRoutes,
    ...articleRoutes,
  ]
}
