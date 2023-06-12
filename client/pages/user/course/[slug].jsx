import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const UserCourse = () => {

    const [loading, setLoading] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [course, setCourse] = useState({});
    const [activeLesson, setActiveLesson] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);

    const handleLessonClick = (lessonId) => {
        setActiveLesson(lessonId);
    };

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug) loadCourse();
    }, [slug])

    const loadCourse = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/course/${slug}`)
            setCourse(data)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const storedLessonId = localStorage.getItem('activeLessonId');

        if (storedLessonId && course && course.lessons && course.lessons.some((lesson) => lesson._id === storedLessonId)) {
            setActiveLesson(storedLessonId);
            setInitialLoad(false);
        } else if (initialLoad && course.lessons && course.lessons.length > 0) {
            setActiveLesson(course.lessons[0]._id);
            setInitialLoad(false);
        }
    }, [course, initialLoad]);

    useEffect(() => {
        localStorage.setItem('activeLessonId', activeLesson);
    }, [activeLesson]);


    console.log(course)
    return (
        <div className="font-poppins">
            {loading ? (<Loader />) : (null)}
            {course && course ? (
                <div className="max-w-full mx-24 px-4 sm:px-6 mt-10">
                    <div className="flex">
                        <div className="flex flex-col items-center">
                            <div className="w-[480px] h-32">
                                <img src={course.image?.Location} className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] object-cover p-4 bg-white rounded-xl' />
                            </div>
                        </div>
                        <div className="mx-10">
                            <div>
                                <span className="text-4xl font-semibold">{course.name}</span>
                                <div className="mt-2 flex -ml-2">
                                    {course && course.tags && course.tags.map((tag, index) => (
                                        <div className="flex bg-gray-200 text-sm  ml-2 p-1 rounded-md text-[#4540E1] items-center" key={index}>
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col">
                                <div><span className="text-md">Instructor: </span>
                                    <strong className="ml-2 test-lg">
                                        {course?.instructor?.name}
                                    </strong>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col">
                                <div><span className="text-md">Description: </span>
                                    <span className=" font-medium text-lg">
                                        {course.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-48">
                        <span className="text-xl font-medium">
                            {course && course.lessons && course.lessons.length} Lessons
                        </span>
                        <div className="mt-4 flex justify-between mb-32">
                            <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md  w-fit flex flex-col justify-between p-4">

                                {course && course.lessons && course.lessons.map((lesson, index) => (
                                    <div
                                        className={`flex justify-center  items-center bg-white shadow-md p-2 mt-2 mb-8`}
                                        key={lesson._id}
                                    >
                                        <button
                                            onClick={() => handleLessonClick(lesson._id)}
                                            className={`${activeLesson === lesson._id ? 'bg-blue-100' : ''
                                                }`}
                                        >
                                            {lesson.title}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="shadow-[5px_5px_0px_0px_rgba(40,43,217)] border-2 rounded-md  border-blue-500 w-full ml-16 p-4">
                                {activeLesson &&
                                    course.lessons &&
                                    course.lessons.map((lesson) =>
                                        lesson._id === activeLesson ? (
                                            <div key={lesson._id}>
                                                <div className="flex justify-center items-center text-xl">
                                                    <span>
                                                        {lesson.content}
                                                    </span>
                                                </div>
                                                {lesson && lesson.video?.Location ? (<div className="mt-8  flex justify-center items-center ">
                                                    <div className="bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                                        <ReactPlayer
                                                            url={lesson.video?.Location}
                                                            className="w-full"
                                                            loop
                                                            controls
                                                        />
                                                    </div>
                                                </div>) : (null)}
                                            </div>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-20 mb-20">
                        <div className="inline-flex items-center cursor-pointer  border-2 border-gray-900 font-semibold rounded-full py-2 px-5 hover:bg-[#4540E1] hover:text-gray-50 transition-all ease-in-out duration-100 focus:outline-none   text-base mt-4 md:mt-0">Feeback Form
                        </div>
                    </div>
                </div>
            ) : <><Loader /></>
            }
        </div >
    )
}
export default UserCourse