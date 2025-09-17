/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://touchwood.com.au',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/auth/*'],
      },
    ],
    additionalSitemaps: [
      'https://touchwood.com.au/sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*', '/auth/*'],
  changefreq: 'weekly',
  priority: 0.7,
}
