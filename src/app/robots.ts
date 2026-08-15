import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Trailing /* only matched sub-paths, leaving /admin and /auth
          // themselves crawlable. Match the bare path and everything under it.
          '/admin',
          '/admin/',
          '/api/',
          '/auth',
          '/auth/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
