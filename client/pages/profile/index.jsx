import UserRoute from "@/components/routes/UserRoute"
import { Context } from "@/context"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"


const Profile = () => {
    const { state: { user }, } = useContext(Context)
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        try {
            const { data } = await axios.get(`https://elearn-backend.onrender.com/api/user-courses`)
            setCourses(data);
        } catch (error) {
            console.log(error)
            toast.error("Failed to Fetch Enrolled Courses")
        }
    }
    console.log(courses)

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
                                        {user ? (
                                            <div>
                                                <div className="mt-6 text-lg font-semibold">
                                                    <span>Enrolled Courses: </span>
                                                </div>
                                                <div>
                                                    {courses && courses.map((course) => (
                                                        <div key={course._id}>
                                                            <div className="flex flex-col bg-white shadow-md p-4 w-full mt-2 mb-8">
                                                                <div className="flex flex-col  cursor-pointer ">
                                                                    <img src={course.image ? course.image?.Location : "/course.png"} alt={course.name} className="w-24" />
                                                                    <div className="flex justify-center font-medium text-lg flex-col mt-2">
                                                                        <span>
                                                                            {course.name}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between mt-4">
                                                                        <div className="flex flex-col">
                                                                            <span>
                                                                                {course.lessons.length} Lessons
                                                                            </span>
                                                                            <span>
                                                                                By {course.instructor.name}
                                                                            </span>
                                                                        </div>
                                                                        <Link href={`/user/course/${course.slug}`} class="rounded px-2  py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
                                                                            <span class="absolute right-0 w-6 h-20 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                                                            <span class="relative text-sm font-semibold">Go to course</span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (null)}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </UserRoute>

    )
}
export default Profile