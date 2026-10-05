import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Worship, Composition & Sound',
  description:
    'Explore the musical journey of Godson Pius: original gospel releases, choral leadership, and brass musicianship as a Tuba player in the Rwanda Territorial Band.',
  alternates: {
    canonical: '/music',
  },
  openGraph: {
    title: 'Worship, Composition & Sound — Godson Pius',
    description:
      'Original gospel releases, choral arrangements, and brass musicianship by Godson Pius.',
    url: 'https://godsonpius.com/music',
    type: 'music.song',
    images: [
      {
        url: '/profPic.png',
        width: 1200,
        height: 630,
        alt: 'Music and Brass Musicianship by Godson Pius',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Worship, Composition & Sound — Godson Pius',
    description:
      'Original gospel releases and brass musicianship as a Tuba player by Godson Pius.',
    images: ['/profPic.png'],
  },
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
