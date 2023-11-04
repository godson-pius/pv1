import { Luckiest_Guy, Pacifico } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { FiGithub, FiLink2, FiPocket } from 'react-icons/fi'
const luckiest = Luckiest_Guy({ subsets: ['latin'], weight: ['400'] })

const Work = () => {
    return (
        <main className='bg-white dark:bg-slate-700 w-full h-[36rem] rounded-3xl mt-2 p-7 md:p-14 overflow-hidden overflow-y-auto lg:overflow-y-hidden hover:overflow-y-auto hover:shadow-lg duration-700'>
            <div className='flex gap-4 items-center'>
                <h1 className={`capitalize font-bold text-4xl flex items-center gap-3 ${luckiest.className}`}>Portfolio <span className="text-5xl"></span></h1>
                <hr className="w-[50rem]" />
            </div>

            <div className="grid lg:grid-cols-3 gap-5 mt-5">
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/factapp.png'} width={10000} height={2} alt='Fact App' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://strangefacts.netlify.app'} target='_blank' className="font-bold text-lg">Fact Application</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/facts'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>


                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/nadice.png'} width={10000} height={2} alt='nadice' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://nadiceoilltd.com/'} target='_blank' className="font-bold text-lg">Nadice Oil Limited</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/nadice'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>


                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/podpis.png'} width={10000} height={2} alt='podpis' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://podpis.worldbraintechnology.com'} target='_blank' className="font-bold text-lg">Podpis Application</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/podpis'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>
                
                
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/asu.png'} width={10000} height={2} alt='asu' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://anambrastateunion1.org.uk'} target='_blank' className="font-bold text-lg">Anambra State Union Uk</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/asu'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>
                
                
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/elephantpack.png'} width={10000} height={2} alt='elephantpack' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://elephantpacksindltd.com'} target='_blank' className="font-bold text-lg">Elephant Pack Industries</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/elephantpack'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>
                
                
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/gentlecrypto.png'} width={10000} height={2} alt='gentlecrypto' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://gentlecrypto.io'} target='_blank' className="font-bold text-lg">Elephant Pack Industries</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/gentlecrypto'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>
                
                
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/mrdata.png'} width={10000} height={2} alt='mrdata' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://mrdata.netlify.app'} target='_blank' className="font-bold text-lg">Mr Data</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/mrdata'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>
                
                
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/web3.png'} width={10000} height={2} alt='web3' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://github.com/godson-pius/web3-contact'} target='_blank' className="font-bold text-lg">Web3 Contact</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/web3-contact'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>
               
               
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <Image className='hover:scale-150 transition duration-500 rounded-lg mb-4' src={'/graciewrites.png'} width={10000} height={2} alt='graciewrites' />

                    <div className="flex justify-between items-center">
                        <div className="top mt-2 flex items-center gap-2 hover:translate-y-1 transition duration-700 hover:-skew-x-6">
                            <FiLink2 size={22} />
                            <Link href={'https://gracieblog.netlify.app'} target='_blank' className="font-bold text-lg">Gracie Blog</Link>
                        </div>

                        <Link href={'https://github.com/godson-pius/gracie-writes'} target='_blank'>
                            <FiGithub className='ring-2 ring-black p-1 rounded-full' size={30} />
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Work