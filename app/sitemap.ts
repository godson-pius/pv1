import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://godsonpius.com'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: now,
    },
  ]
}
