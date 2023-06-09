import InstructorRoute from "@/components/routes/InstructorRoute"
import { Raleway } from '@next/font/google'
import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import Resizer from "react-image-file-resizer"

const raleway = Raleway({ subsets: ['latin'] })

const EditCourse = () => {


    const router = useRouter()
    const { slug } = router.query;

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: 9.99,
        uploading: false,
        paid: true,
        category: '',
        loading: false,
    })

    useEffect(() => {
        loadCourse();
    }, [])

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/course/${slug}`)
        setValues(data);
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
                let { data } = await axios.post('/api/course/upload-image', {
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
            const res = await axios.post('/api/course/remove-image', { image })
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
            const { data } = await axios.put(`/api/course/${slug}`, {
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




    return (
        <InstructorRoute>
            <div>
                {values && (
                    <div className={raleway.className}>
                        <div className="mt-8 xl:p-1 p-8 mb-12 flex items-center justify-center ">
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
                    </div>
                )}
            </div>
        </InstructorRoute>
    )
}
export default EditCourse