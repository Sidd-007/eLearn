import InstructorRoute from "@/components/routes/InstructorRoute"
import { Raleway } from '@next/font/google'
import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import Resizer from "react-image-file-resizer"
import ReactPlayer from "react-player"
const raleway = Raleway({ subsets: ['latin'] })

const EditCourse = () => {


    const router = useRouter()
    const { slug } = router.query;
    const [showModal, setShowModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progressBar, setProgressBar] = useState(0)

    const [current, setCurrent] = useState({})

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: 9.99,
        uploading: false,
        paid: true,
        category: '',
        loading: false,
        lessons: []
    })

    useEffect(() => {
        loadCourse();
    }, [])

    const loadCourse = async () => {
        const { data } = await axios.get(`https://elearn-backend.onrender.com/api/course/${slug}`)
        if (data) setValues(data);
    }

    const [image, setImage] = useState({});
    const [preview, setPreview] = useState('')

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file))
        setValues({ ...values, loading: true });

        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post(`https://elearn-backend.onrender.com/api/course/upload-image`, {
                    image: uri
                });

                toast.success("Image Uploaded, You can Remove Image if you want");
                setImage(data)
                setValues({ ...values, loading: false });


            } catch (error) {
                console.log(error)
                setValues({ ...values, loading: false });
                toast.error('Image Upload Failed, Try Later!!!')
            }
        })
    }
    const handleImageRemove = async () => {
        // console.log("Remove Image")
        try {
            setValues({ ...values, loading: true });
            const res = await axios.post(`https://elearn-backend.onrender.com/api/course/remove-image`, { image })
            setImage({})
            setPreview('')
            setValues({ ...values, loading: false });
        } catch (error) {
            console.log(error)
            setValues({ ...values, loading: false });
            toast.error('Image Upload Failed, Try Later!!!')
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // setValues({ ...values, loading: true });
            const { data } = await axios.put(`https://elearn-backend.onrender.com/api/course/${slug}`, {
                ...values, image
            })
            toast.success('Course Updated')
            // setValues({ ...values, loading: false });
            router.push('/instructor')
        } catch (error) {
            console.log(error)
            setValues({ ...values, loading: false });
            toast.error(error.response.data)
        }
    }

    const children = []

    for (let i = 9.99; i <= 99.99; i++) {
        children.push(<option key={i.toFixed(2)}>Rs {i.toFixed(2)}</option>)
    }

    const handleDrag = (e, index) => {
        e.dataTransfer.setData("itemIndex", index);
        // console.log("ON Drag: ", index);
    }

    const handleDrop = async (e, index) => {
        // console.log("ON Drop: ", index);
        const movingItemIndex = e.dataTransfer.getData("itemIndex");
        const targetItemIndex = index;

        let allLessons = values.lessons;

        let movingItem = allLessons[movingItemIndex];
        allLessons.splice(movingItemIndex, 1);
        allLessons.splice(targetItemIndex, 0, movingItem)

        setValues({ ...values, lessons: [...allLessons] })

        const { data } = await axios.put(`https://elearn-backend.onrender.com/api/course/${slug}`, {
            ...values, image
        })
        toast.success('Lesson Rearranged')
    }

    const handleDelete = async (index) => {
        const answer = window.confirm("Are you really wanted to delete this Lesson?")
        if (!answer) return;
        let allLessons = values.lessons;
        const removed = allLessons.splice(index, 1);

        setValues({ ...values, lessons: allLessons });

        const { data } = await axios.put(`https://elearn-backend.onrender.com/api/course/${slug}/${removed[0]._id}`);
        console.log("Lessons Deleted: ", data)
    }

    // console.log(current)
    const handleUpdateLessons = async (e) => {

        // console.log("Update Lessons")
        e.preventDefault();

        const { data } = await axios.post(`https://elearn-backend.onrender.com/api/course/lesson/${values._id}/${current._id}`, current);


        setShowLessonModal(false)

        if (data?.ok) {
            setValues((prevValues) => {
                const updatedLessons = prevValues.lessons.map((lesson) => {
                    if (lesson._id === current._id) {
                        return current;
                    }
                    return lesson;
                });

                return { ...prevValues, lessons: updatedLessons };
            });

            toast.success("Lesson Updated");
        }
    }
    const handleVideo = async () => {
        if (current.video && current.video.Location) {
            const res = await axios.post(`https://elearn-backend.onrender.com/api/course/remove-video/${values.instructor._id}`, current.video)
        }

        const file = e.target.files[0];
        setUploading(true);

        const videoData = new FormData();
        videoData.append("video", file);
        videoData.append("courseId", values._id)

        const { data } = await axios.post(`https://elearn-backend.onrender.com/api/course/video-upload/${values.instructor._id}`, videoData, {
            onUploadProgress: e => {
                setProgressBar(Math.round(100 * e.loaded) / e.total)
            }
        })

        setCurrent({ ...current, video: data });
        setUploading(false);
    }

    return (
        <InstructorRoute>
            <div>
                {values && (
                    <div className={raleway.className}>
                        <div className="mt-8 xl:p-1 p-8 mb-12 flex flex-col items-center justify-center ">
                            <form onSubmit={handleSubmit} className="xl:w-1/3 w-11/12   shadow-2xl  rounded-lg items-center">
                                <h2 className="xl:text-4xl text-3xl  text-center text-gray-700  mb-4 mt-10 font-semibold">Edit Course!</h2>
                                <div className="px-12 pb-10">
                                    <div className="w-full mb-2 mt-10">
                                        <div className="flex justify-center">
                                            <input type="text"
                                                placeholder="Enter Course Name"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                className="p-2.5 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                                        </div>
                                    </div>
                                    <div className="w-full mb-2 mt-10">
                                        <div className="flex justify-center">
                                            <textarea
                                                name="description"
                                                rows="4"
                                                onChange={handleChange}
                                                value={values.description}
                                                class="resize-none block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Course Description..." />
                                        </div>
                                    </div>
                                    <div className="w-full mb-2 mt-10">
                                        <div className="flex justify-center">
                                            <select
                                                value={values.paid}
                                                onChange={(e) =>
                                                    setValues({ ...values, paid: e.target.value === 'true', price: 0 })}
                                                class="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5">
                                                <option value={true} >Paid</option>
                                                <option value={false}>Free</option>
                                            </select>
                                        </div>
                                    </div>

                                    {values.paid &&
                                        <div className="w-full mb-2 mt-10">
                                            <div className="flex justify-center">
                                                <select
                                                    defaultValue={9.99}
                                                    onChange={(v) => setValues({ ...values, price: v })}
                                                    class="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5">
                                                    {children}
                                                </select>
                                            </div>
                                        </div>
                                    }
                                    <div className="w-full mb-2 mt-10">
                                        <div className="flex justify-center">
                                            <select
                                                value={values.category}
                                                onChange={(event) =>
                                                    setValues((prevState) => ({
                                                        ...prevState,
                                                        category: event.target.value
                                                    }))
                                                }
                                                className="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5"
                                            >
                                                <option disabled value="">
                                                    Choose a category
                                                </option>
                                                <option value="Design & Developement">Design & Developement</option>
                                                <option value="Marketing & Communication">Marketing & Communication</option>
                                                <option value="Digital Marketing">Digital Marketing</option>
                                                <option value="Business & Consulting">Business & Consulting</option>
                                                <option value="Finance Management">Finance Management</option>
                                                <option value="Self Development">Self Development</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full mb-2 mt-10">
                                        <div className='flex mb-2 '>
                                            <span class="block  text-[16px]  font-medium text-gray-900 ">Course Images:</span>

                                            {values.image && (
                                                <div className='ml-2 flex '>
                                                    <img id="blah" src={values.image?.Location} className='rounded-full w-6 h-6 bg-contain' alt="" />
                                                    <svg className=" cursor-pointer" onClick={handleImageRemove} width="12px" height="12px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM14.3 14.3C14.2075 14.3927 14.0976 14.4663 13.9766 14.5164C13.8557 14.5666 13.726 14.5924 13.595 14.5924C13.464 14.5924 13.3343 14.5666 13.2134 14.5164C13.0924 14.4663 12.9825 14.3927 12.89 14.3L10 11.41L7.11 14.3C6.92302 14.487 6.66943 14.592 6.405 14.592C6.14057 14.592 5.88698 14.487 5.7 14.3C5.51302 14.113 5.40798 13.8594 5.40798 13.595C5.40798 13.4641 5.43377 13.3344 5.48387 13.2135C5.53398 13.0925 5.60742 12.9826 5.7 12.89L8.59 10L5.7 7.11C5.51302 6.92302 5.40798 6.66943 5.40798 6.405C5.40798 6.14057 5.51302 5.88698 5.7 5.7C5.88698 5.51302 6.14057 5.40798 6.405 5.40798C6.66943 5.40798 6.92302 5.51302 7.11 5.7L10 8.59L12.89 5.7C12.9826 5.60742 13.0925 5.53398 13.2135 5.48387C13.3344 5.43377 13.4641 5.40798 13.595 5.40798C13.7259 5.40798 13.8556 5.43377 13.9765 5.48387C14.0975 5.53398 14.2074 5.60742 14.3 5.7C14.3926 5.79258 14.466 5.90249 14.5161 6.02346C14.5662 6.14442 14.592 6.27407 14.592 6.405C14.592 6.53593 14.5662 6.66558 14.5161 6.78654C14.466 6.90751 14.3926 7.01742 14.3 7.11L11.41 10L14.3 12.89C14.68 13.27 14.68 13.91 14.3 14.3Z" fill="#FF5353" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex  justify-around">
                                            <input
                                                class="relative m-0 block w-1/2 min-w-0 flex-auto rounded border border-solid border-neutral-300  bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700  transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100  file:px-3 file:py-[0.32rem] file:text-neutral-700  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:bg-[#4540e129] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                                                type="file" onChange={handleImage} />
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={values.loading || values.uploading}
                                            loading={values.loading}
                                            className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer">
                                            {values.loading ? 'Saving...' : 'Save & Continue'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="mt-8 mx-[510px]">
                            <span className="text-xl font-medium">
                                {values && values.lessons && values.lessons.length} Lessons
                            </span>
                            <div className="mt-4">
                                {values && values.lessons && values.lessons.map((lesson, index) => (
                                    <div onClick={() => setCurrent(lesson)} className=" flex justify-between items-center  bg-white shadow-md p-4 mt-2 mb-8" onDragOver={(e) => e.preventDefault()}
                                        key={index}>
                                        <div draggable onDragStart={(e) => handleDrag(e, index)} onClick={() => setShowLessonModal(true)} onDrop={(e) => handleDrop(e, index)} className="flex items-center cursor-pointer" >
                                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5455 0H1.45455C0.654545 0 0 0.672 0 1.49333V10.4533C0 11.2747 0.654545 11.9467 1.45455 11.9467H5.09091V12.6933C5.09091 13.104 5.41818 13.44 5.81818 13.44H10.1818C10.5818 13.44 10.9091 13.104 10.9091 12.6933V11.9467H14.5455C15.3455 11.9467 15.9927 11.2747 15.9927 10.4533L16 1.49333C16 0.672 15.3455 0 14.5455 0ZM13.8182 10.4533H2.18182C1.78182 10.4533 1.45455 10.1173 1.45455 9.70667V2.24C1.45455 1.82933 1.78182 1.49333 2.18182 1.49333H13.8182C14.2182 1.49333 14.5455 1.82933 14.5455 2.24V9.70667C14.5455 10.1173 14.2182 10.4533 13.8182 10.4533Z" fill="black" />
                                                <path d="M9.86476 5.4871C9.97801 5.54431 10.0727 5.62972 10.1388 5.73417C10.2049 5.83862 10.2398 5.95818 10.2398 6.08003C10.2398 6.20188 10.2049 6.32144 10.1388 6.42589C10.0727 6.53034 9.97801 6.61574 9.86476 6.67295L6.84373 8.23356C6.35728 8.48489 5.75977 8.15785 5.75977 7.64086V4.51942C5.75977 4.00199 6.35728 3.67517 6.84373 3.92627L9.86476 5.4871Z" fill="black" />
                                            </svg>
                                            <span className="ml-3 font-semibold" >{lesson.title}</span>
                                        </div>
                                        <div className="" onClick={() => handleDelete(index)}>
                                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#FF5858" />
                                            </svg>
                                        </div>
                                        {showLessonModal ? (
                                            <div>
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
                                                                        onClick={() => setShowLessonModal(false)}
                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                                <div className="relative p-6  flex items-center justify-center flex-col">
                                                                    {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
                                                                    <form onSubmit={handleUpdateLessons}>
                                                                        <div>
                                                                            <span>Title:</span>
                                                                            <div className="w-full mb-2 mt-2">
                                                                                <div className="flex justify-center">
                                                                                    <input
                                                                                        name="title"
                                                                                        type="text"
                                                                                        onChange={(e) => setCurrent((prevCurrent) => ({ ...prevCurrent, title: e.target.value }))}
                                                                                        value={current.title}
                                                                                        placeholder="Title"
                                                                                        className="px-8 w-full rounded py-2 text-gray-700 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] focus:outline-none" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <textarea
                                                                                name="description"
                                                                                rows="4"
                                                                                onChange={(e) => setCurrent({ ...current, content: e.target.value })}
                                                                                value={current.content}
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
                                                                            {!uploading && current.video && current.video.Location && (
                                                                                <div className="mt-2 flex justify-center items-center">
                                                                                    <ReactPlayer
                                                                                        url={current.video.Location}
                                                                                        width='310px'
                                                                                        height='140px'
                                                                                        controls
                                                                                    />

                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex items-center justify-between mt-8">
                                                                            <span>
                                                                                Preview
                                                                            </span>
                                                                            <label
                                                                                class="flex items-center cursor-pointer"
                                                                            >
                                                                                <div class="relative">
                                                                                    <label class="relative inline-flex items-center cursor-pointer">
                                                                                        <input type="checkbox" className="float-right mt-2"
                                                                                            disabled={uploading}
                                                                                            checked={current.free_preview}
                                                                                            // onChange={(v) => setFree_preview(v)}
                                                                                            name="free_preview"
                                                                                            onChange={(v) => setCurrent({ ...current, fre_preview: v })} />
                                                                                    </label>
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                        <div className="flex items-center justify-center mt-8">
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
                                            </div>

                                        ) : null}

                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>
                )}
            </div>
        </InstructorRoute>
    )
}
export default EditCourse