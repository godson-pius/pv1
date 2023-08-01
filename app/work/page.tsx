import Aside from "@/components/Aside"
import Work from "@/components/Work"

const page = () => {
    return (
        <main className='w-full flex mt-32 gap-5'>
            <Aside />
            <Work />
        </main>
    )
}

export default page