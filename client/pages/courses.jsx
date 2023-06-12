import { Context } from "@/context"
import axios from "axios"
import Link from "next/link"
import { useContext } from "react"

const Courses = ({ courses }) => {

    const { state: { user } } = useContext(Context)
    console.log(courses);
    return (
        <div className="flex flex-col justify-center items-center mt-14">
            {(user && user.role && user.role.includes("Admin")) || (user && user.role && user.role.includes("Instructor")) || (user && user.role && user.role.includes("Pending Verification")) ? (null) : (
                <Link href='/become-instructor' class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
                    <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                    <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                    <span class="relative z-20 flex items-center text-sm">
                        <svg class="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Become Intructor
                    </span>
                </Link>
            )}
            <div className='grid grid-cols-3 gap-10 mb-20 mt-10'>
                {courses && courses.map((course, index) => (
                    <div key={index}>
                        <div className='flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200 max-w-[360px]'>
                            <Link href={`/instructor/course/view/${course.slug}`}>
                                <div className="max-h-140 overflow-hidden p-4">
                                    <img className="w-full h-auto rounded-lg" src={course.image?.Location} alt="" />
                                </div>

                            </Link>
                            <div className='px-4 flex justify-between items-center'>
                                <div className='p-2 max-w-fit rounded-lg border-2 text-sm px-4 cursor-pointer transition-all text-[#4540E1]  ease-in-out duration-200 border-[#4540e11f] bg-[#ECEEF9]'>
                                    <span className=' font-medium '>
                                        {course.category}
                                    </span>
                                </div>
                                {course.paid ? (<div className=''>
                                    <span className='ml-2 mt-4 text-white font-semibold bg-red-200 p-2 border-2 rounded-xl border-[#ff00001f]'>
                                        Rs {course.price}
                                    </span>
                                </div>) : (<div className=''>
                                    <span className='ml-2 mt-4  font-semibold bg-green-200 p-2 border-2 rounded-xl text-green-800 border-[#00ff371f]'>
                                        Free
                                    </span>
                                </div>)}
                            </div>
                            <div className="p-4 flex justify-between ">
                                <h1 className="text-lg font-semibold text-gray-700">{course.name}</h1>
                            </div>
                            <div className="p-4 flex justify-between ">
                                <h1 className="text-lg font-semibold text-gray-700 flex ">{course.lessons.length} <span className="ml-2"> Lessons</span></h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`)

    return {
        props: {
            courses: data,
        }
    }
}

export default Courses