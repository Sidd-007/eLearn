import InstructorRoute from "@/components/routes/InstructorRoute"
import { Raleway } from '@next/font/google'
import axios from "axios"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import Resizer from "react-image-file-resizer"

const raleway = Raleway({ subsets: ['latin'] })

const CreateCourse = () => {

    const router = useRouter()
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: 9.99,
        uploading: false,
        paid: true,
        category: '',
        tags: [],
        loading: false,
    })

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

    const handleCourseSubmit = async (e) => {
        e.preventDefault();

        try {
            setValues({ ...values, loading: true });
            const { data } = await axios.post('/api/course', {
                ...values, image
            })
            toast.success('Cool!! Now you can add Lessons')
            setValues({ ...values, loading: false });
            router.push('/instructor')
        } catch (error) {
            console.log(error)
            setValues({ ...values, loading: false });
            // toast.error(error.response.data)
        }
    }

    const handleTagInput = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const tag = event.target.value.trim();
            if (tag) {
                setValues((prevValues) => ({
                    ...prevValues,
                    tags: [...prevValues.tags, tag],
                }));
                event.target.value = '';
            }
        }
    };
    const handleTagDelete = (tag) => {
        setValues((prevValues) => ({
            ...prevValues,
            tags: prevValues.tags.filter((t) => t !== tag),
        }));
    };

    const children = []

    for (let i = 9.99; i <= 99.99; i++) {
        children.push(<option key={i.toFixed(2)}>Rs {i.toFixed(2)}</option>)
    }




    return (
        <InstructorRoute>
            <div>
                <div className={raleway.className}>
                    <div className="mt-8 xl:p-1 p-8 mb-12 flex items-center justify-center ">
                        <form onSubmit={handleCourseSubmit} className="xl:w-1/3 w-11/12   shadow-2xl  rounded-lg items-center">
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
                                                onChange={(event) =>
                                                    setValues((prevState) => ({
                                                        ...prevState,
                                                        price: event.target.value
                                                    }))
                                                }
                                                class="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5">
                                                <option disabled value="">
                                                    Choose a Price
                                                </option>
                                                <option value="9.99">Rs 9.99</option>
                                                <option value="19.99">Rs 19.99</option>
                                                <option value="29.99">Rs 29.99</option>
                                                <option value="39.99">Rs 39.99</option>
                                                <option value="49.99">Rs 49.99</option>
                                                <option value="59.99">Rs 59.99</option>
                                                <option value="69.99">Rs 69.99</option>
                                                <option value="79.99">Rs 79.99</option>
                                                <option value="89.99">Rs 89.99</option>
                                                <option value="99.99">Rs 99.99</option>
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
                                    <span className="mb-2 text-sm text-gray-400 italic">write a tag then press "enter"</span>
                                    <div className="flex justify-center">
                                        <input type="text"
                                            placeholder="Enter Tags"
                                            name="name"
                                            onKeyDown={handleTagInput}
                                            className="p-2.5 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                                    </div>
                                </div>
                                <div className="flex">
                                    {values.tags.map((tag, index) => (
                                        <div className="">
                                            <div className="flex bg-gray-200 ml-2 p-1 rounded-md text-[#4540E1] items-center">
                                                <span key={index} className=" text-sm" >
                                                    {tag}
                                                </span>
                                                <svg onClick={() => handleTagDelete(tag)} className="ml-1 cursor-pointer" width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM14.3 14.3C14.2075 14.3927 14.0976 14.4663 13.9766 14.5164C13.8557 14.5666 13.726 14.5924 13.595 14.5924C13.464 14.5924 13.3343 14.5666 13.2134 14.5164C13.0924 14.4663 12.9825 14.3927 12.89 14.3L10 11.41L7.11 14.3C6.92302 14.487 6.66943 14.592 6.405 14.592C6.14057 14.592 5.88698 14.487 5.7 14.3C5.51302 14.113 5.40798 13.8594 5.40798 13.595C5.40798 13.4641 5.43377 13.3344 5.48387 13.2135C5.53398 13.0925 5.60742 12.9826 5.7 12.89L8.59 10L5.7 7.11C5.51302 6.92302 5.40798 6.66943 5.40798 6.405C5.40798 6.14057 5.51302 5.88698 5.7 5.7C5.88698 5.51302 6.14057 5.40798 6.405 5.40798C6.66943 5.40798 6.92302 5.51302 7.11 5.7L10 8.59L12.89 5.7C12.9826 5.60742 13.0925 5.53398 13.2135 5.48387C13.3344 5.43377 13.4641 5.40798 13.595 5.40798C13.7259 5.40798 13.8556 5.43377 13.9765 5.48387C14.0975 5.53398 14.2074 5.60742 14.3 5.7C14.3926 5.79258 14.466 5.90249 14.5161 6.02346C14.5662 6.14442 14.592 6.27407 14.592 6.405C14.592 6.53593 14.5662 6.66558 14.5161 6.78654C14.466 6.90751 14.3926 7.01742 14.3 7.11L11.41 10L14.3 12.89C14.68 13.27 14.68 13.91 14.3 14.3Z" fill="#FF5353" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full mb-2 mt-10">
                                    <div className='flex mb-2 '>
                                        <span class="block  text-[16px]  font-medium text-gray-900 ">Course Images:</span>
                                        {preview && (
                                            <div className='ml-2 flex '>
                                                <img id="blah" src={preview} className='rounded-full w-6 h-6 bg-contain' alt="" />
                                                <svg onClick={handleImageRemove} fill="red" height="10px" width="10px" version="1.1" id="Capa_1"
                                                    viewBox="0 0 283.194 283.194" >
                                                    <g>
                                                        <path d="M141.597,32.222c-60.31,0-109.375,49.065-109.375,109.375s49.065,109.375,109.375,109.375s109.375-49.065,109.375-109.375
		S201.907,32.222,141.597,32.222z M50.222,141.597c0-50.385,40.991-91.375,91.375-91.375c22.268,0,42.697,8.01,58.567,21.296
		L71.517,200.164C58.232,184.293,50.222,163.865,50.222,141.597z M141.597,232.972c-21.648,0-41.558-7.572-57.232-20.2
		L212.772,84.366c12.628,15.674,20.2,35.583,20.2,57.231C232.972,191.982,191.981,232.972,141.597,232.972z"/>
                                                        <path d="M141.597,0C63.52,0,0,63.52,0,141.597s63.52,141.597,141.597,141.597s141.597-63.52,141.597-141.597S219.674,0,141.597,0z
		 M141.597,265.194C73.445,265.194,18,209.749,18,141.597S73.445,18,141.597,18s123.597,55.445,123.597,123.597
		S209.749,265.194,141.597,265.194z"/>
                                                    </g>
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
                                        disabled={values.loading || values.uploading}
                                        loading={values.loading}
                                        type="submit"
                                        className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer">
                                        {values.loading ? 'Saving...' : 'Save & Continue'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </InstructorRoute>
    )
}
export default CreateCourse