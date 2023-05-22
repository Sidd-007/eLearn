import InstructorRoute from "@/components/routes/InstructorRoute";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlinePublishedWithChanges } from "react-icons/md";


const CourseView = () => {

    const [course, setCourse] = useState({});

    const router = useRouter();

    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug])

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/course/${slug}`)

        setCourse(data);
    }
    console.log(course)
    return (
        <div>
            {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
            {course && course ? (
                <div className="max-w-full mx-24 px-4 sm:px-6 mt-10">
                    {/* {user.name} */}
                    <div className="flex">
                        <div className="flex flex-col items-center">
                            <div className="w-[480px] h-32 shadow-xl">
                                <img src={course.image?.Location} className='' />
                            </div>
                            <div className="flex mt-40 items-center">
                                <FiEdit3 title="Edit" className="text-[30px] cursor-pointer text-red-400" />
                                <MdOutlinePublishedWithChanges title="Publish" className="ml-16 cursor-pointer text-[30px] text-green-400" />
                            </div>
                        </div>
                        <div className="mx-10">
                            <div>
                                <span className="text-5xl -mt-2">{course.name}</span>
                            </div>
                            <div>
                                <span>{course.description}</span>
                            </div>
                        </div>
                    </div>
                </div>

            ) : <></>}
        </div>
    )
}
export default CourseView 