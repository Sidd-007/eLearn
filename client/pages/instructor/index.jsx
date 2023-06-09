import axios from "axios";
import { useEffect, useState } from "react"
import { Raleway } from '@next/font/google'
import { MdOutlineUnpublished, MdOutlinePublishedWithChanges } from 'react-icons/md'
import Link from "next/link";
const raleway = Raleway({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const Instructor = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses()
    }, []);

    const loadCourses = async () => {
        const { data } = await axios.get("/api/instructor-courses");
        setCourses(data);
    }
    console.log(courses)
    return (
        <div className={raleway.className} >
            <div className="max-w-full xl:mx-4 p-20">

                <div className='grid grid-cols-3 gap-4 mb-20'>
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
                                            {course.price}
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
                                <div className="p-4 text-sm">
                                    {course.published ? (
                                        <div className="flex items-center text-xl">Published: <MdOutlinePublishedWithChanges className="ml-2 text-[16px] text-green-400" /></div>
                                    ) : (
                                        <div className="flex items-center text-[16px] font-semibold">Published: <MdOutlineUnpublished className="ml-2 text-[16px] text-red-400" /></div>
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Instructor