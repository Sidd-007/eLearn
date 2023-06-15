import Loader from "@/components/Loader";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CategoryCourse = ({ courses }) => {

    const [categoryCourses, setCategoryCourses] = useState([]);
    const [loading, setLoading] = useState(false)

    const router = useRouter();


    const { slug } = router.query;

    console.log()
    useEffect(() => {
        setLoading(true)
        getCoursesByCategory(courses, slug);
        setLoading(false)
    }, []);

    function getCoursesByCategory(courses, slug) {
        const filteredCourses = courses.filter(course => course.category === slug);
        setCategoryCourses(filteredCourses);
    }

    // getCoursesByCategory(courses, slug);
    console.log(categoryCourses);

    return (
        <div>
            <div className='mx-28 mt-10'>
                {loading ? <Loader /> : (<div className="grid grid-cols-3 gap-28 mb-20 ">
                    {categoryCourses && categoryCourses.map((course, index) => (
                        <div key={index}>
                            <div className='flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200 max-w-[360px]'>
                                <Link href={`/course/${course.slug}`}>
                                    <div className="max-h-140 overflow-hidden p-4">
                                        <img className="w-full h-auto rounded-lg" src={course.image?.Location} alt="" />
                                    </div>

                                </Link>
                                <div className='px-4 flex justify-between items-center'>
                                    <div className='py-1 max-w-fit rounded-lg border-2 text-sm px-2 cursor-pointer transition-all text-[#4540E1]  ease-in-out duration-200 border-[#4540e11f] bg-[#ECEEF9]'>
                                        <span className=' font-medium '>
                                            {course.category}
                                        </span>
                                    </div>
                                    {course.paid ? (<div className=''>
                                        <span className='ml-2 mt-4 text-white font-semibold bg-red-200 px-2 py-1 border-2 rounded-xl border-[#ff00001f]'>
                                            Rs {course.price}
                                        </span>
                                    </div>) : (<div className=''>
                                        <span className='ml-2 mt-4  font-semibold bg-green-200 px-2 py-1 border-2 rounded-xl text-green-800 border-[#00ff371f]'>
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
                </div>)}

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

export default CategoryCourse