import Loader from "@/components/Loader";
import InstructorRoute from "@/components/routes/InstructorRoute";
import axios from "axios";
import { Raleway } from '@next/font/google'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlinePublishedWithChanges, MdOutlineUnpublished } from "react-icons/md";
import ReactPlayer from "react-player";

const raleway = Raleway({ subsets: ['latin'] })

const CourseView = () => {

    const [showModal, setShowModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progressBar, setProgressBar] = useState(0)
    const [studentCount, setStudentCount] = useState(0)


    const [course, setCourse] = useState({});

    const [values, setValues] = useState({
        title: "",
        content: "",
        video: {},
    });

    const router = useRouter();

    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug])
    useEffect(() => {
       course && loadStudentCount();
    }, [course])

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/course/${slug}`)

        setCourse(data);
    }

    const loadStudentCount = async () => {
        const { data } = await axios.get(`/api/instructor/student-count`, {
            courseId: course._id
        })

        setStudentCount(data.length);
    }

    const handleAddLessons = async (e) => {
        e.preventDefault();

        try {

            setUploading(true);
            const { data } = await axios.post(`/api/course/lesson/${slug}/${course.instructor._id}`, values)
            // console.log(data);

            setValues({ ...values, title: "", content: "", video: {} });
            setUploading(false);
            setCourse(data)
            toast.success("Lesson Added")
            setProgressBar(0)
            setShowModal(false)
        } catch (error) {
            console.log(error)
            toast.error("Lesson Adding Failed")
        }

        // console.log(values);
    }

    const handleVideo = async (e) => {
        try {
            const file = e.target.files[0];
            setUploading(true);
            const videoData = new FormData()
            videoData.append('video', file);
            const { data } = await axios.post(`/api/course/video-upload/${course.instructor._id}`, videoData, {
                onUploadProgress: e => {
                    setProgressBar(Math.round(100 * e.loaded) / e.total)
                }
            })
            // console.log(data);

            setValues({ ...values, video: data });
            setUploading(false);
        } catch (error) {
            console.log(error)
            toast.error("Video Upload Failed")
        }
    }

    const handleVideoRemove = async () => {
        try {
            setUploading(true)
            // console.log(values.video)
            const { data } = await axios.post(`/api/course/remove-video/${course.instructor._id}`, values.video)

            console.log(data);
            setValues({ ...values, video: {} })
            setProgressBar(0)
            setUploading(false)

        } catch (error) {
            console.log(error)
            toast.error("Video Remove Failed")
        }
    }

    const handlePublish = async () => {
        try {
            let answer = window.confirm(
                "Once you publish your course, it will be live in the marketplace for students to enroll."
            );
            if (!answer) return;
            const { data } = await axios.put(`/api/course/publish/${course._id}`);
            toast.success("Congrats. Your course is now live in marketplace!");
            router.push('/instructor')
            setCourse(data);
        } catch (error) {
            console.log(error)
            toast.error("Course publish failed. Try again");
        }
    };

    const handleUnpublish = async () => {
        try {
            let answer = window.confirm(
                "Once you unpublish your course, it will not appear in the marketplace for students to enroll."
            );
            if (!answer) return;
            const { data } = await axios.put(`/api/course/unpublish/${course._id}`);
            toast.success("Your course is now removed from the marketplace!");
            router.push('/instructor')
            setCourse(data);
        } catch (error) {
            console.log(error)
            toast.error("Course unpublish failed. Try again");
        }
    };

    return (
        <div className={raleway.className}>
            {course && course ? (
                <div className="max-w-full mx-24 px-4 sm:px-6 mt-10">
                    {/* {user.name} */}
                    <div className="flex">
                        <div className="flex flex-col items-center">
                            <div className="w-[480px] h-32  ">
                                <img src={course.image?.Location} className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[480px]  object-cover p-4 bg-white rounded-xl' />
                            </div>
                            <div className="flex mt-48 items-center cursor-pointer" >
                                <div onClick={() => router.push(`/instructor/course/edit/${slug}`)} className="bg-red-400 flex p-2 justify-center items-center rounded-lg">
                                    <span className="text-white font-semibold">
                                        Edit
                                    </span>
                                    <FiEdit3 title="Edit" className="text-[18px] ml-2 cursor-pointer text-white" />
                                </div>
                                <div className="flex">
                                    {course && course.lessons && course.lessons.length >= 3 ? course.published ? (
                                        <div className="bg-red-400 flex p-2 justify-center items-center rounded-lg ml-16 cursor-pointer">
                                            <span className="text-white font-semibold">
                                                Unpublish
                                            </span>
                                            <MdOutlineUnpublished onClick={handleUnpublish} title="Publish" className="text-[18px] ml-2 cursor-pointer text-white" />
                                        </div>
                                    ) : (
                                        <div className="bg-green-400 flex p-2 justify-center items-center rounded-lg ml-16 cursor-pointer">
                                            <span className="text-white font-semibold">
                                                Publish
                                            </span>
                                            <MdOutlinePublishedWithChanges onClick={handlePublish} title="Publish" className="text-[18px] ml-2 cursor-pointer text-white" />
                                        </div>
                                    ) : (
                                        null
                                    )}
                                </div>

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
                                <div><strong className="text-lg">Description:-</strong> <br />
                                    <span className="">
                                        {course.description}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 flex">
                                <div><strong className="text-lg">Enrolled Students:-</strong>
                                    <span className="ml-2">
                                        {studentCount}
                                    </span>
                                </div>
                            </div>

                            <div className="2xl:mt-6  mt-8 2xl:mb-0 mb-8">
                                <button onClick={() => setShowModal(true)} class="rounded px-5 py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
                                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <span class="relative">Add Lessons</span>
                                </button>
                                {course && course.lessons && course.lessons.length < 3 ? (<div className="mt-3">{`Upload ${3 - course.lessons.length} video to Publish the course`}</div>) : (null)}
                                {showModal ? (
                                    <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                        >
                                            <div className="relative 2xl:mt-0 mt-36 2xl:mb-0 md:mt-36 mb-8 mx-auto 2xl:w-[600px] md:w-[600px] w-[300px]">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div className="flex items-start justify-between py-2 px-6 mt-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3 className="md:text-lg  text-lg 2xl:text-xl font-semibold">
                                                            Add Lessons
                                                        </h3>
                                                        <button
                                                            className="bg-red-500 rounded-md text-white background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                    <div className="relative p-6  flex items-center justify-center flex-col">
                                                        <form onSubmit={handleAddLessons}>
                                                            <div>
                                                                <span>Title:</span>
                                                                <div className="w-full mb-2 mt-2">
                                                                    <div className="flex justify-center">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Title"
                                                                            name="title"
                                                                            value={values.title}
                                                                            required
                                                                            autocomplete="off"
                                                                            onChange={(e) => setValues({ ...values, title: e.target.value })}
                                                                            className="px-3 w-full rounded py-2 text-gray-700 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] focus:outline-none" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <textarea
                                                                    name="description"
                                                                    rows="4"
                                                                    value={values.content}
                                                                    onChange={(e) => setValues({ ...values, content: e.target.value })}
                                                                    class="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Content..."
                                                                />
                                                            </div>
                                                            <div className="w-full mb-2 mt-4">
                                                                <div className="flex items-center  justify-around">
                                                                    <input
                                                                        class="relative m-0 block w-1/2 min-w-0 flex-auto rounded border border-solid border-neutral-300  bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700  transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100  file:px-3 file:py-[0.32rem] file:text-neutral-700  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:bg-[#4540e129] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                                                                        type="file" accept="video/*" hidden onChange={handleVideo}
                                                                    />
                                                                </div>
                                                                <div className='h-1 w-full bg-gray-300'>
                                                                    <div
                                                                        style={{ width: `${progressBar}%` }}
                                                                        className={`h-full ${progressBar < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
                                                                    </div>
                                                                </div>

                                                                {!uploading && values.video.Location && (
                                                                    <div className="mt-2 flex justify-center items-center">
                                                                        <ReactPlayer
                                                                            url={values.video.Location}
                                                                            width='310px'
                                                                            height='140px'
                                                                            controls
                                                                        />
                                                                        <svg className="ml-2 cursor-pointer" onClick={handleVideoRemove} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM14.3 14.3C14.2075 14.3927 14.0976 14.4663 13.9766 14.5164C13.8557 14.5666 13.726 14.5924 13.595 14.5924C13.464 14.5924 13.3343 14.5666 13.2134 14.5164C13.0924 14.4663 12.9825 14.3927 12.89 14.3L10 11.41L7.11 14.3C6.92302 14.487 6.66943 14.592 6.405 14.592C6.14057 14.592 5.88698 14.487 5.7 14.3C5.51302 14.113 5.40798 13.8594 5.40798 13.595C5.40798 13.4641 5.43377 13.3344 5.48387 13.2135C5.53398 13.0925 5.60742 12.9826 5.7 12.89L8.59 10L5.7 7.11C5.51302 6.92302 5.40798 6.66943 5.40798 6.405C5.40798 6.14057 5.51302 5.88698 5.7 5.7C5.88698 5.51302 6.14057 5.40798 6.405 5.40798C6.66943 5.40798 6.92302 5.51302 7.11 5.7L10 8.59L12.89 5.7C12.9826 5.60742 13.0925 5.53398 13.2135 5.48387C13.3344 5.43377 13.4641 5.40798 13.595 5.40798C13.7259 5.40798 13.8556 5.43377 13.9765 5.48387C14.0975 5.53398 14.2074 5.60742 14.3 5.7C14.3926 5.79258 14.466 5.90249 14.5161 6.02346C14.5662 6.14442 14.592 6.27407 14.592 6.405C14.592 6.53593 14.5662 6.66558 14.5161 6.78654C14.466 6.90751 14.3926 7.01742 14.3 7.11L11.41 10L14.3 12.89C14.68 13.27 14.68 13.91 14.3 14.3Z" fill="#FF5353" />
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex items-center justify-start mt-8">
                                                                <button
                                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    type="submit"
                                                                >
                                                                    {uploading ? <Loader /> : "Add"}
                                                                </button>

                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                            </div>

                            <div className="mt-8">
                                <span className="text-xl font-medium">
                                    {course && course.lessons && course.lessons.length} Lessons
                                </span>
                                <div className="mt-4">
                                    {course && course.lessons && course.lessons.map((lesson, index) => (
                                        <div className=" flex justify-between items-center bg-white shadow-md p-4 mt-2 mb-8" key={index}>
                                            <div className="flex items-center cursor-pointer ">
                                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.5455 0H1.45455C0.654545 0 0 0.672 0 1.49333V10.4533C0 11.2747 0.654545 11.9467 1.45455 11.9467H5.09091V12.6933C5.09091 13.104 5.41818 13.44 5.81818 13.44H10.1818C10.5818 13.44 10.9091 13.104 10.9091 12.6933V11.9467H14.5455C15.3455 11.9467 15.9927 11.2747 15.9927 10.4533L16 1.49333C16 0.672 15.3455 0 14.5455 0ZM13.8182 10.4533H2.18182C1.78182 10.4533 1.45455 10.1173 1.45455 9.70667V2.24C1.45455 1.82933 1.78182 1.49333 2.18182 1.49333H13.8182C14.2182 1.49333 14.5455 1.82933 14.5455 2.24V9.70667C14.5455 10.1173 14.2182 10.4533 13.8182 10.4533Z" fill="black" />
                                                    <path d="M9.86476 5.4871C9.97801 5.54431 10.0727 5.62972 10.1388 5.73417C10.2049 5.83862 10.2398 5.95818 10.2398 6.08003C10.2398 6.20188 10.2049 6.32144 10.1388 6.42589C10.0727 6.53034 9.97801 6.61574 9.86476 6.67295L6.84373 8.23356C6.35728 8.48489 5.75977 8.15785 5.75977 7.64086V4.51942C5.75977 4.00199 6.35728 3.67517 6.84373 3.92627L9.86476 5.4871Z" fill="black" />
                                                </svg>
                                                <span className="ml-3 font-semibold">{lesson.title}</span>
                                            </div>
                                            <div className="p-1" onClick={() => setShowVideoModal(true)}>
                                                <span className="bg-blue-400 text-white p-2 rounded-md cursor-pointer font-medium">
                                                    watch
                                                </span>
                                            </div>
                                            {showVideoModal ? (
                                                <>
                                                    <div
                                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                    >
                                                        <div className="relative 2xl:mt-0 mt-36 2xl:mb-0 md:mt-36 mb-8 mx-auto 2xl:w-[600px] md:w-[600px] w-[300px]">
                                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                                <div className="flex items-start justify-between py-2 px-6 mt-2 border-b border-solid border-slate-200 rounded-t">
                                                                    <h3 className="md:text-lg  text-lg 2xl:text-xl font-semibold">
                                                                        Watch Video Here
                                                                    </h3>
                                                                    <button
                                                                        className="bg-red-500 rounded-md text-white background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button"
                                                                        onClick={() => setShowVideoModal(false)}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                                <div className="relative p-6  flex items-center justify-center flex-col">
                                                                    {
                                                                        <div>
                                                                            <ReactPlayer
                                                                                url={lesson.video?.Location}
                                                                                width='310px'
                                                                                height='140px'
                                                                                controls
                                                                            />
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                </>
                                            ) : null}

                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <></>
            }
        </div >
    )
}
export default CourseView 