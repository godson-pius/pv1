import Aside from "@/components/Aside"
import Resume from "@/components/Resume"

const page = () => {
    return (
        <main className='w-full flex mt-32 gap-5'>
            <Aside />
            <Resume />
        </main>
    )
}

export default page