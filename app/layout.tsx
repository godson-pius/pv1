import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

const font = Space_Grotesk({ subsets: ['latin'], display: 'swap' })

const siteUrl = 'https://godsonpius.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Godson Pius — Founder, Full-Stack Developer & Product Builder',
    template: '%s | Godson Pius',
  },
  description:
    'Godson Pius (Godson Azubuike): founder of Gabvia and Medmask, lead developer at World Brain Technology with 8+ years of experience engineering high-impact tech ventures, edge AI systems, and music.',
  applicationName: 'Godson Pius Portfolio',
  authors: [{ name: 'Godson Pius', url: siteUrl }],
  creator: 'Godson Pius',
  publisher: 'World Brain Technology Limited',
  keywords: [
    'Godson Pius',
    'Godson Azubuike',
    'Full-Stack Developer',
    'Founder',
    'Software Engineer',
    'Product Builder',
    'Gabvia',
    'Medmask',
    'VunaLink',
    'World Brain Technology',
    'African Tech Entrepreneurs',
    'ALU Rwanda',
    'Edge AI',
    'Next.js Developer',
    'React Native Developer',
    'IoT Architecture',
    'Brass Musician',
    'Tuba Player',
    'Gospel Worship Vocalist',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/profPic.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/profPic.png'],
    apple: [
      { url: '/profPic.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Godson Pius — Founder, Full-Stack Developer & Product Builder',
    description:
      'Founder of Gabvia & Medmask, lead developer at World Brain Technology with 8+ years of experience engineering high-impact tech ventures, edge AI systems, and music.',
    siteName: 'Godson Pius',
    images: [
      {
        url: '/profPic.png',
        width: 1200,
        height: 630,
        alt: 'Godson Pius — Founder, Full-Stack Developer & Product Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Godson Pius — Founder, Full-Stack Developer & Product Builder',
    description:
      'Founder of Gabvia & Medmask, lead developer at World Brain Technology with 8+ years of experience engineering high-impact ventures, edge AI systems, and music.',
    images: ['/profPic.png'],
    creator: '@godsonpius',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Godson Pius',
      alternateName: 'Godson Azubuike',
      url: siteUrl,
      image: `${siteUrl}/profPic.png`,
      jobTitle: 'Founder, Full-Stack Developer & Product Builder',
      description:
        'Founder of Gabvia and Medmask, lead developer at World Brain Technology with 8+ years of experience engineering edge AI, fintech, health, agriculture and IoT products.',
      worksFor: [
        {
          '@type': 'Organization',
          name: 'World Brain Technology Limited',
        },
        {
          '@type': 'Organization',
          name: 'Gabvia',
          url: 'https://gabvia.app',
        },
        {
          '@type': 'Organization',
          name: 'Medmask',
        },
      ],
      knowsAbout: [
        'Full-Stack Web & Mobile Development',
        'System Architecture',
        'Edge AI and Machine Learning',
        'Internet of Things (IoT)',
        'African Tech Ecosystems',
        'Entrepreneurship',
        'Tuba Performance & Choral Composition',
      ],
      sameAs: [
        'https://github.com/godson-pius',
        'https://gabvia.app',
        'https://linktr.ee/godsonpius',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Godson Pius',
      description:
        'Official portfolio, essays, and musical releases of Godson Pius (Godson Azubuike).',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  )
}
