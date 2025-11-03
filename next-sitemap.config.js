/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://touchwoodasset.com',
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
    additionalSitemaps: ['https://touchwoodasset.com/sitemap.xml'],
  },
  exclude: ['/admin/*', '/api/*', '/auth/*'],
  changefreq: 'weekly',
  priority: 0.7,
}
