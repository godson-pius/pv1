import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing & Perspectives',
  description:
    'In-depth technical essays, teardowns, and perspectives by Godson Pius on edge AI architectures, multilingual messaging (Gabvia), offline-first systems, and entrepreneurial engineering across Africa.',
  alternates: {
    canonical: '/articles',
  },
  openGraph: {
    title: 'Writing & Perspectives — Godson Pius',
    description:
      'In-depth technical essays on edge AI architectures, multilingual messaging, offline-first systems, and entrepreneurial engineering.',
    url: 'https://godsonpius.com/articles',
    type: 'website',
    images: [
      {
        url: '/profPic.png',
        width: 1200,
        height: 630,
        alt: 'Writing & Perspectives by Godson Pius',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing & Perspectives — Godson Pius',
    description:
      'In-depth technical essays on edge AI architectures, multilingual messaging, and engineering leadership by Godson Pius.',
    images: ['/profPic.png'],
  },
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
