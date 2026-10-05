import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://godsonpius.com'

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/articles', '/music'],
      disallow: ['/dashboard', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
