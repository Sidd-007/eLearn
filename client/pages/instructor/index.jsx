import axios from "axios";
import { useEffect, useState } from "react"
import { Raleway } from '@next/font/google'
import { MdOutlineUnpublished, MdOutlinePublishedWithChanges } from 'react-icons/md'
import Link from "next/link";
import NoCourse from "@/components/NoCourse";
const raleway = Raleway({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const Instructor = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses()
    }, []);

    const loadCourses = async () => {
        const { data } = await axios.get(`/api/instructor-courses`);
        setCourses(data);
    }
    console.log(courses)
    return (
        <div className={raleway.className} >
            <div className="max-w-full xl:mx-10 xl:p-20">
                {courses.length > 0 ? (<div>
                    <div className='grid xl:grid-cols-3 md:grid-cols-2  xl:gap-4 md:gap-10 mb-20'>
                        {courses && courses.map((course, index) => (
                            <div key={course._id} className='flex flex-col bg-white rounded-lg shadow-lg xl:mt-0 md:mt-0 mb-10 hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200 max-w-[360px] h-auto '>
                                <Link href={`/instructor/course/view/${course.slug}`}>
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
                                    <Link href={`/instructor/course/view/${course.slug}`} className="text-lg font-semibold text-gray-700">{course.name}</Link>
                                </div>
                                <div className="p-4 flex justify-between ">
                                    <h1 className="text-lg font-semibold text-gray-700 flex ">{course.lessons.length} <span className="ml-2"> Lessons</span></h1>
                                </div>
                                <div className="p-4 text-sm mb-auto">
                                    {course.published ? (
                                        <div className="flex items-center text-[16px] font-semibold">Published:
                                            <div className="ml-1">
                                                <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 0C11.2311 0 8.52431 0.821086 6.22202 2.35943C3.91973 3.89777 2.12532 6.08427 1.06569 8.64243C0.00606596 11.2006 -0.271181 14.0155 0.269012 16.7313C0.809205 19.447 2.14258 21.9416 4.10051 23.8995C6.05845 25.8574 8.55301 27.1908 11.2687 27.731C13.9845 28.2712 16.7994 27.9939 19.3576 26.9343C21.9157 25.8747 24.1022 24.0803 25.6406 21.778C27.1789 19.4757 28 16.7689 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0ZM12 19.59L7.00001 14.59L8.59001 13L12 16.41L19.41 9L21.006 10.586L12 19.59Z" fill="#3FFF5E" />
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-[16px] font-semibold">Published:
                                            <div className="ml-1">
                                                <svg width="16" height="16" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.125 2.925C13.225 -0.975 6.825 -0.975 2.925 2.925C-0.975 6.825 -0.975 13.225 2.925 17.125C6.825 21.025 13.125 21.025 17.025 17.125C20.925 13.225 21.025 6.825 17.125 2.925ZM12.825 14.225L10.025 11.425L7.225 14.225L5.825 12.825L8.625 10.025L5.825 7.225L7.225 5.825L10.025 8.625L12.825 5.825L14.225 7.225L11.425 10.025L14.225 12.825L12.825 14.225Z" fill="#FF4242" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className=" mt-2">
                                        {course.lessons.length < 3 ? (
                                            <p>
                                                At least 3 lessons are required to publish a course
                                            </p>
                                        ) : course.published ? (
                                            <p>Your Course is live in the marketplace</p>
                                        ) : (
                                            <p>Your course is ready to be published</p>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4 flex -ml-2">
                                    {course && course.tags && course.tags.map((tag, index) => (
                                        <div className="flex bg-gray-200 text-sm  ml-2 p-1 rounded-md text-[#4540E1] items-center" key={index}>
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                ) : (
                    <div className="flex justify-center items-center flex-col">
                        <span>It Looks Like you haven't created any Course yet.</span>
                        <Link href="/instructor/course/create" class="rounded mt-6 px-5 py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
                            <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span class="relative">Create Course</span>
                        </Link>
                    </div>
                )}


            </div>
        </div>
    )
}
export default Instructor