import AdminRoute from "@/components/routes/AdminRoute"
import { useState } from "react"
import { Raleway } from '@next/font/google'


const raleway = Raleway({ subsets: ['latin'] })

const CreateCourse = () => {

    const [values, setValues] = useState({
        name: '',
        description: ' ',
        price: '9.99',
        uploading: false,
        paid: true,
        category: '',
        loading: false,
    })

    const [preview, setPreview] = useState('')

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        // setPreview(window.URL.createObjectURL(e.target.files[0]))

    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values)
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
                                        {/* <div className='ml-2'>
                                    <img id="blah" src="" className='rounded-full w-16 h-16 bg-contain' alt="" />
                                </div> */}
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
                                        className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer">
                                        {values.loading ? 'Saving...' : 'Save & Continue'}
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