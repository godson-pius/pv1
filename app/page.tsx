import About from '@/components/About'
import Aside from '@/components/Aside'
import Loader from '@/components/Loader'
import Resume from '@/components/Resume'
import Image from 'next/image'
import pageanim from '@/animations/pageanim.json';
import { useEffect, useState } from 'react'

export default function Home() {

  return (
    <>
      <main className='w-full flex mt-32 gap-5'>
        <Aside />
        <Loader animationData={pageanim}>
          <About />
        </Loader>
      </main>

    </>
  )
}
