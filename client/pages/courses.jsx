import { Context } from "@/context"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { toast } from "react-hot-toast"

const Courses = ({ courses }) => {

    const router = useRouter();
    const { state: { user } } = useContext(Context)
    const handleBecomeInstructor = () => {
        if(user)
        {
            router.push("/become-instructor")
        } else {
            toast.error("You Need to Login to Become Instructor")
            router.push("/login")
        }
    }
    // console.log(courses);
    return (
        <div className="flex flex-col justify-center items-center mt-14">
            {(user && user.role && user.role.includes("Admin")) || (user && user.role && user.role.includes("Instructor")) || (user && user.role && user.role.includes("Pending Verification")) ? (null) : (
                <button onClick={handleBecomeInstructor} class="box-border relative z-10 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                    <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                    <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                    <span class="relative z-20 flex items-center text-sm">
                        <svg class="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Become Instructor
                    </span>
                </button>
            )}
            <div className='grid xl:grid-cols-3 md:grid-cols-2  xl:gap-28 md:gap-10 mb-20 mt-10 auto-rows-auto'>
                {courses && courses.map((course, index) => (
                    // <div key={index}>
                        <div key={course._id} className='flex flex-col bg-white rounded-lg shadow-lg xl:mt-0 md:mt-0 mb-10 hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200 max-w-[360px] h-full '>
                            <Link href={`/course/${course.slug}`}>
                                <div className="h-56 w-full overflow-hidden p-4">
                                    <img className="w-full h-full rounded-lg" src={course.image?.Location} alt="" />
                                </div>
                            </Link>
                            <div className='px-4 flex justify-between items-center'>
                                <div className='py-1 max-w-fit rounded-lg border-2 text-sm px-2 cursor-pointer transition-all text-[#4540E1]  ease-in-out duration-200 border-[#4540e11f] bg-[#ECEEF9]'>
                                    <span className=' font-medium '>
                                        {course.category}
                                    </span>
                                </div>
                                {course.paid ? (<div className=''>
                                    <span className='ml-2 mt-4 text-red-500 font-semibold bg-red-200 px-2 py-1 border-2 rounded-xl border-[#ff00001f]'>
                                        Rs {course.price}
                                    </span>
                                </div>) : (<div className=''>
                                    <span className='ml-2 mt-4  font-semibold bg-green-200 px-2 py-1 border-2 rounded-xl text-green-500 border-[#00ff371f]'>
                                        Free
                                    </span>
                                </div>)}
                            </div>
                            <div className="p-4 flex justify-between ">
                                <Link href={`/course/${course.slug}`} className="text-lg font-semibold text-gray-700">{course.name}</Link>
                            </div>
                            <div className="p-4 flex justify-between mb-auto">
                                <h1 className="text-lg font-semibold text-gray-700 flex ">{course.lessons.length} <span className="ml-2"> Lessons</span></h1>
                            </div>
                            <div className="p-4 flex -ml-2">
                                {course && course.tags && course.tags.map((tag, index) => (
                                    <div className="flex bg-gray-200 text-sm  ml-2 p-1 rounded-md text-[#4540E1] items-center" key={index}>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    // </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const { data } = await axios.get(`https://elearn-backend.onrender.com/api/courses`)

    return {
        props: {
            courses: data,
        }
    }
}

export default Courses