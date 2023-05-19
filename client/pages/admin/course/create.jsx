import AdminRoute from "@/components/routes/AdminRoute"
import { useState } from "react"
import { Raleway } from '@next/font/google'
import Resizer from "react-image-file-resizer"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/router"

const raleway = Raleway({ subsets: ['latin'] })

const CreateCourse = () => {

    const router  = useRouter()
    const [values, setValues] = useState({
        name: '',
        description: ' ',
        price: '9.99',
        uploading: false,
        paid: true,
        category: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values)

        const { data } = await axios.post('/api/course', {
            ...values, image
        })

        try {
            const { data } = await axios.post('/api/course', {
                ...values, image
            })
            toast.success('Cool!! Now you can add Lessons')
            router.push('/admin')
        } catch (error) {
            console.log(error)
            // setValues({ ...values, loading: false });
            toast.error(error.response.data)
        }
    }

    const children = []

    for (let i = 9.99; i <= 99.99; i++) {
        children.push(<option key={i.toFixed(2)}>Rs {i.toFixed(2)}</option>)
    }




    return (
        <AdminRoute>
            <div>
                <div className={raleway.className}>
                    <div className="mt-8 xl:p-1 p-8 mb-12 flex items-center justify-center ">
                        <form onSubmit={handleSubmit} className="xl:w-1/3 w-11/12   shadow-2xl  rounded-lg items-center">
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
                                            onChange={v =>
                                                setValues({ ...values, paid: !values.paid })}
                                            class="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5">
                                            <option value={true} >Paid</option>
                                            <option value={false} selected>Free</option>
                                        </select>
                                    </div>
                                </div>

                                {values.paid &&
                                    <div className="w-full mb-2 mt-10">
                                        <div className="flex justify-center">
                                            <select
                                                onChange={v =>
                                                    setValues({ ...values, price: v })}
                                                class="bg-gray-50 border-[2px] focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4540E1] focus:border-[#4540E1] block w-full p-2.5">
                                                {children}
                                            </select>
                                        </div>
                                    </div>
                                }
                                <div className="w-full mb-2 mt-10">
                                    <div className="flex justify-center">
                                        <input type="text"
                                            placeholder="Enter Course Category"
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            className="p-2.5 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                                    </div>
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
                                        onClick={handleSubmit}
                                        className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer">
                                        Save & Continue
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminRoute>
    )
}
export default CreateCourse