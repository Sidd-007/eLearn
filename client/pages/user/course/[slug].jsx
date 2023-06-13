import Loader from "@/components/Loader";
import { Context } from "@/context";
import axios from "axios";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactPlayer from "react-player";

const UserCourse = () => {

    const [loading, setLoading] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [course, setCourse] = useState({});
    const [activeLesson, setActiveLesson] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [checkReview, setCheckReview] = useState(false);

    const [reviewForm, setReviewForm] = useState({
        title: '',
        courseFeedback: '',
        instructorFeedback: '',
        rating: '',
    });

    const handleLessonClick = (lessonId) => {
        setActiveLesson(lessonId);
    };

    const router = useRouter();
    const { slug } = router.query;
    const { state: { user }, } = useContext(Context)

    useEffect(() => {
        if (slug) loadCourse();
    }, [slug])

    const loadCourse = async () => {
        try {
            const { data } = await axios.get(`/api/course/${slug}`)
            setCourse(data)

        } catch (error) {
            console.log(error)
        }
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleReview = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.get(`/api/course-review-check/${slug}`);
            console.log(data)
            if (data?.hasPostedReview) {
                toast("You have Already Submitted a review for this course")
                setShowReviewModal(false)
                setCheckReview(true);
            } else {
                const response = await axios.post(`/api/course-review/${slug}`, reviewForm);
                
                setShowReviewModal(false)
                toast("Hurray!! You have Successfully Submitted Review for this Course")
                setReviewForm({
                    title: '',
                    courseFeedback: '',
                    instructorFeedback: '',
                    rating: '',
                });
                setCheckReview(false);
            }

        } catch (error) {
            console.log(error);
        }
    };


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


    // console.log(course)
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
                            <div className="shadow-[5px_5px_0px_0px_rgba(40,43,217,0.636)] border-2 rounded-md  border-blue-500 w-full ml-16 p-4">
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
                        <div onClick={() => setShowReviewModal(true)} className="inline-flex items-center cursor-pointer  border-2 border-gray-900 font-semibold rounded-full py-2 px-5 hover:bg-[#4540E1] hover:text-gray-50 transition-all ease-in-out duration-100 focus:outline-none   text-base mt-4 md:mt-0">Feeback Form
                        </div>
                        {showReviewModal ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative 2xl:mt-0 mt-36 2xl:mb-0 md:mt-36 mb-8 mx-auto 2xl:w-[600px] md:w-[600px] w-[300px]">
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between py-2 px-6 mt-2 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="md:text-lg  text-lg 2xl:text-xl font-semibold">
                                                    Feeback Form
                                                </h3>
                                                <button
                                                    className="bg-red-500 rounded-md text-white background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowReviewModal(false)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                            <div className="relative p-6  flex items-center justify-center flex-col">
                                                <form onSubmit={handleReview}>
                                                    <div>
                                                        <div className="w-full mb-2 mt-2">
                                                            <span className="mb-1 text-sm">Title: </span>
                                                            <div className="flex justify-center">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Title"
                                                                    name="title"
                                                                    value={reviewForm.title}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    className="px-3 w-full rounded py-2 text-gray-700 placeholder:text-gray-400 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] focus:outline-none" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full mb-2 mt-4">
                                                        <div className="flex flex-col justify-center">
                                                            <span className=" text-sm">Course Feeback: </span>
                                                            <textarea
                                                                name="courseFeedback"
                                                                rows="4"
                                                                maxLength={25}
                                                                value={reviewForm.courseFeedback}
                                                                onChange={handleInputChange}
                                                                className="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-400 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Course..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full mb-2 mt-4">
                                                        <div className="flex flex-col justify-center">
                                                            <span className="mb-1 text-sm">Instructor Feedback: </span>
                                                            <textarea
                                                                name="instructorFeedback"
                                                                rows="4"
                                                                value={reviewForm.instructorFeedback}
                                                                onChange={handleInputChange}
                                                                className="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-400 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Instructor..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full mb-2 mt-4">
                                                        <div className="flex flex-col justify-center">
                                                            <span className="mb-1 text-sm">Course Rating: </span>
                                                            <select
                                                                name="rating"
                                                                value={reviewForm.rating}
                                                                onChange={handleInputChange}
                                                                className="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5"
                                                            >
                                                                <option disabled value="">
                                                                    Choose a Rating
                                                                </option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-start mt-8">
                                                        <button
                                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </button>

                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : (null)}
                    </div>
                </div>
            ) : <><Loader /></>
            }
        </div >
    )
}
export default UserCourse