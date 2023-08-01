import { Luckiest_Guy, Pacifico } from 'next/font/google'
import { FiDroplet } from 'react-icons/fi'
const luckiest = Luckiest_Guy({ subsets: ['latin'], weight: ['400'] })
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] })

export default function About() {
    return (
        <main className='bg-white w-full h-[36rem] rounded-3xl mt-2 p-14 overflow-hidden hover:overflow-y-scroll hover:shadow-lg duration-700'>
            <h1 className={`capitalize font-bold text-4xl flex items-center gap-3 ${luckiest.className}`}>About Me <span className="text-6xl"></span></h1>
            <p className="mt-4">Hello there! I'm thrilled to welcome you to my portfolio. I am a passionate and versatile mern-stack developer with a keen interest in exploring the latest cutting-edge technologies. My journey in the world of development has been nothing short of exhilarating, and I constantly strive to enhance my skills and embrace emerging trends in the industry.</p>

            <hr className="my-6 mx-20" />

            <h1 className="uppercase font-bold text-2xl flex items-center gap-2 my-6">What i do</h1>

            <div className="grid grid-cols-2 gap-7">
                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <div className="top mb-1">
                        <FiDroplet />
                        <h6 className="font-bold text-2xl">Web Development</h6>
                    </div>

                    <p className="text-sm">As a developer, I find myself most captivated by the power and flexibility of NEXT.js. I'm always eager to dive into new projects that leverage NEXT.js and discover innovative ways to create fast, scalable, and user-friendly applications.</p>
                </div>

                <div className="bg-[#F2F7FC] p-5 rounded-xl">
                    <div className="top mb-1">
                        <FiDroplet />
                        <h6 className="font-bold text-2xl">App Development</h6>
                    </div>

                    <p className="text-sm">With a focus on user-centric design and cutting-edge technologies, I thrive on building intuitive and efficient apps that make a positive impact on people's lives. Let's turn ideas into reality and shape the future together.</p>
                </div>

                <div className="bg-[#F2F7FC] p-5 rounded-xl">
                    <div className="top mb-1">
                        <FiDroplet />
                        <h6 className="font-bold text-2xl">Blockchain Development</h6>
                    </div>

                    <p className="text-sm">As a developer, I find myself most captivated by the power and flexibility of NEXT.js. I'm always eager to dive into new projects that leverage NEXT.js and discover innovative ways to create fast, scalable, and user-friendly applications.</p>
                </div>

                <div className="bg-[#FFEBD1] p-5 rounded-xl">
                    <div className="top mb-1">
                        <FiDroplet />
                        <h6 className="font-bold text-2xl">Mentorship</h6>
                    </div>

                    <p className="text-sm">I have also found great joy in sharing my knowledge with others. Being a technical mentor allows me to give back to the community that has supported me throughout my career. </p>
                </div>
            </div>
        </main>
    )
}