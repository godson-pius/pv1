'use client'

import Navbar from '@/components/Navbar'
import ExpoHero from '@/components/ExpoHero'
import ExpoBentoProjects from '@/components/ExpoBentoProjects'
import ExpoMusicPreview from '@/components/ExpoMusicPreview'
import ExpoArticlesPreview from '@/components/ExpoArticlesPreview'
import Contact from '@/components/Contact'
import {
  ExpoAbout,
  ExpoStack,
  ExpoJourney,
  ExpoNow,
  ExpoBeyond,
} from '@/components/Sections'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <ExpoHero />
        <ExpoAbout />
        <ExpoBentoProjects />
        <ExpoStack />
        <ExpoMusicPreview />
        <ExpoArticlesPreview />
        <ExpoJourney />
        <ExpoNow />
        <ExpoBeyond />
        <Contact />
      </main>
    </div>
  )
}
