import Loader from "@/components/Loader"
import UserRoute from "@/components/routes/UserRoute"
import { Context } from "@/context"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"


const Profile = () => {
    const { state: { user }, } = useContext(Context)
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/user-courses`)
            setCourses(data);
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error("Failed to Fetch Enrolled Courses")
        }
    }
    // console.log(courses.length)

    return (
        <UserRoute>
            <div>
                <div className="font-poppins mb-20">
                    {user &&
                        (
                            <div className="max-w-8xl mb-20 xl:mx-24 mx-3 px-4 mt-10 sm:px-6">
                                {/* {user.name} */}
                                <div className="flex xl:flex-row md:flex-col flex-col">
                                    <div className="flex flex-col mb-20 items-center">
                                        <div className="xl:w-[480px] md:w-[480px] w-[300px] h-32  ">
                                            <img src={user.picture} className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 bg-white rounded-xl' />
                                        </div>
                                    </div>
                                    <div className="xl:mx-16 md:mx-10 xl:mt-0 md:mt-28 mt-8">
                                        <div>
                                            <span className="text-5xl">{user.name}</span>
                                        </div>
                                        <div className="mt-3">
                                            <span>Email: {user.email}</span>
                                        </div>

                                    </div>
                                </div>
                                {loading ? (
                                        <div className="mt-44 mb-20 ">
                                            <Loader />
                                        </div>
                                ) : (
                                    <div className="mt-40">
                                        <div className="font-semibold mb-8">
                                            <span className="text-xl">Enrolled Courses: </span>
                                        </div>
                                        <div className='grid xl:grid-cols-3 md:grid-cols-2  gap-4 mb-20 auto-rows-auto'>
                                            {courses.length > 0 && courses.map((course) => (
                                                <div className='flex flex-col bg-white rounded-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200 h-full'>
                                                    <div key={course._id}>
                                                        <Link href={`/user/course/${course.slug}`}>
                                                            <div className="h-64 w-full overflow-hidden p-4">
                                                                <img className="w-full h-full rounded-lg" src={course.image?.Location} alt="" />
                                                            </div>
                                                        </Link>
                                                        <div className='px-4 flex justify-between items-center'>
                                                            <div className='p-2 max-w-fit rounded-lg border-2 text-sm px-4 cursor-pointer transition-all text-[#4540E1]  ease-in-out duration-200 border-[#4540e11f] bg-[#ECEEF9]'>
                                                                <span className=' font-medium '>
                                                                    {course.category}
                                                                </span>
                                                            </div>
                                                            {course.paid ? (<div className=''>
                                                                <span className='ml-2 mt-4 text-red-500 font-semibold bg-red-200 p-2 border-2 rounded-xl border-[#ff00001f]'>
                                                                    Rs {course.price}
                                                                </span>
                                                            </div>) : (<div className=''>
                                                                <span className='ml-2 mt-4  font-semibold bg-green-200 p-2 border-2 rounded-xl text-green-500 border-[#00ff371f]'>
                                                                    Free
                                                                </span>
                                                            </div>)}
                                                        </div>
                                                        <div className="p-4 flex justify-between ">
                                                            <h1 className="text-lg font-semibold text-gray-700">{course.name}</h1>
                                                        </div>
                                                        <div className="p-4">
                                                            Instructor: {course.instructor.name}
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </UserRoute>

    )
}
export default Profile