import axios from "axios";
import { useRouter } from "next/router"
import { Raleway } from '@next/font/google'
import ReactPlayer from "react-player";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import { toast } from "react-hot-toast";

const raleway = Raleway({ subsets: ['latin'] })
const SingleCourse = ({ course }) => {
    const [enrolled, setEnrolled] = useState({});
    const [loading, setLoading] = useState(false);
    const { state: { user } } = useContext(Context)

    useEffect(() => {
        if (user && course) checkEnrollment();
    }, [user, course]);

    const checkEnrollment = async () => {
        const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
        console.log("CHECK ENROLLMENT", data);
        setEnrolled(data);
    };
    const router = useRouter();


    const { slug } = router.query;


    const handlePaidEnrollment = async () => {
        try {
            setLoading(true);
            if (!user) router.push("/login");

            if (enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`);

            const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);

            // Add Razor Pay
            
            
        } catch (err) {
            toast("Enrollment failed, try again.");
            console.log(err);
            setLoading(false);
        }
    }

    const handleFreeEnrollment = async (e) => {
        e.preventDefault();
        try {
            // check if user is logged in
            if (!user) router.push("/login");
            // check if already enrolled
            if (enrolled.status)
                return router.push(`/user/course/${enrolled.course.slug}`);
            setLoading(true);
            const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
            toast(data.message);
            setLoading(false);
            router.push(`/user/course/${data.course.slug}`);
        } catch (err) {
            toast("Enrollment failed. Try again.");
            console.log(err);
            setLoading(false);
        }
    }
    // console.log(course)
    return (
        <div className={raleway.className}>
            {course && course ? (
                <div className="max-w-full mx-24 px-4 sm:px-6 mt-10">
                    {/* {user.name} */}
                    <div className="flex">
                        <div className="flex flex-col items-center">
                            <div className="w-[480px] h-32  ">
                                <img src={course.image?.Location} className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 bg-white rounded-xl' />
                            </div>
                            <div className="flex mt-48 items-center cursor-pointer" >
                                <button onClick={course.paid ? handlePaidEnrollment : handleFreeEnrollment} class="rounded px-5 py-2.5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300">
                                    <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <span class="relative font-semibold">{user ? enrolled.status ? "Go to course" : "Enroll" : "Login To Enroll"}</span>
                                </button>
                            </div>
                        </div>
                        <div className="mx-10 mt-3">
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

export async function getServerSideProps({ query }) {
    const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)

    return {
        props: {
            course: data,
        }
    }
}
export default SingleCourse

