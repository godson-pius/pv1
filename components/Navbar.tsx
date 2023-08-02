'use client'

import { Luckiest_Guy, Pacifico } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
const luckiest = Luckiest_Guy({ subsets: ['latin'], weight: ['400'] })
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] })
import { FiBriefcase, FiFileText, FiHome, FiMessageCircle, FiMusic } from 'react-icons/fi'

const Navbar = () => {
    const pathname = usePathname()

    const active = (currentPath: string) => {
        return pathname == currentPath ? 'bg-gradient-to-r from-[#FF9C1A] to-[#EC1B09] text-white' : 'bg-[#E1E8EF] text-black'
    }
    return (
        <>
            <main>
                <section className="w-full flex justify-between">
                    <h1 className={`text-3xl ${pacifico.className}`}>Godson <span className='text-orange-500'>Azubuike</span></h1>
                    <div className="theme bg-[#EBF2FA] w-10 h-10 rounded-full flex justify-center items-center border-2 border-gray-200 dark:border-gray-500 cursor-pointer">
                        <span className='text-2xl hover:animate-pulse hover:-skew-y-6 transition duration-500 hover:scale-125'>🕶️</span>
                        {/* <span className='text-2xl'>👓</span> */}
                    </div>
                </section>

                <nav className="border-2 border-gray-200 dark:border-gray-500 p-5 w-[26rem] flex items-center gap-5 rounded-2xl float-right mt-14">
                    <Link href={'/'} className={`w-96 h-14 rounded-2xl cursor-pointer hover:shadow-lg duration-700 items-center flex flex-col justify-center ${active('/')}`}>
                        <FiHome size={20} />
                        <p className="text-xs capitalize">Home</p>
                    </Link>

                    <Link href={'/skills'} className={`w-96 h-14 rounded-2xl cursor-pointer hover:shadow-lg duration-700 items-center flex flex-col justify-center ${active('/skills')}`}>
                        <FiFileText size={20} />
                        <p className="text-xs capitalize">Skills</p>
                    </Link>

                    <Link href={'/work'} className={`w-96 h-14 rounded-2xl cursor-pointer hover:shadow-lg duration-700 items-center flex flex-col justify-center ${active('/work')}`}>
                        <FiBriefcase size={20} />
                        <p className="text-xs capitalize">Work</p>
                    </Link>

                    <Link href={'/music'} className={`w-96 h-14 rounded-2xl cursor-pointer hover:shadow-lg duration-700 items-center flex flex-col justify-center ${active('/music')}`}>
                        <FiMusic size={20} />
                        <p className="text-xs capitalize">Music</p>
                    </Link>

                    <Link href={'/contact'} className={`w-96 h-14 rounded-2xl cursor-pointer hover:shadow-lg duration-700 items-center flex flex-col justify-center ${active('/contact')}`}>
                        <FiMessageCircle size={20} />
                        <p className="text-xs capitalize">Contact</p>
                    </Link>
                </nav>
            </main>
        </>
    )
}

export default Navbar