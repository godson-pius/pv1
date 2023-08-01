import About from '@/components/About'
import Aside from '@/components/Aside'
import Resume from '@/components/Resume'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='w-full flex mt-32 gap-5'>
        <Aside />
        <About />
    </main>
  )
}
