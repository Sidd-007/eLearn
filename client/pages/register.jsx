/* eslint-disable react-hooks/rules-of-hooks */
import Loader from '@/components/Loader'
import { Context } from '@/context'
import { Raleway } from '@next/font/google'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import toast from 'react-hot-toast';

const raleway = Raleway({ subsets: ['latin'] })

const register = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(Context)
    const { user } = state

    const [name, setName] = useState('')
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [progressBar, setProgressBar] = useState(0)

    useEffect(() => {
        if (user !== null)
            router.push('/')
    }, [user])

    // console.log(image)

    const handleImage = (e) => {
        setImage(e.target.files[0])
        // blah.src = URL.createObjectURL(e.target.files[0])

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.table({ name, password, email})

        try {
            if(password.length < 6)
            {
                toast.error("Password length should be more that 6")
            }

            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', "FireGram");
            formData.append('cloud_name', 'firegram')
            const res = await axios.post("https://api.cloudinary.com/v1_1/firegram/image/upload", formData, {
                onUploadProgress: e => {
                    setProgressBar(Math.round(100 * e.loaded) / e.total)
                }
            })
            const imageUrl = res.data.secure_url;
            // console.log(res)

            setLoading(true)
            const { data } = await axios.post(`/api/register`, {
                name,
                email,
                password,
                imageUrl,
            })
            toast.success("Successfully registered. Please Login")
            setLoading(false)
            router.push('/login')
            Cookies.add("user");
        } catch (error) {
            // toast.error(error.response.data)
            setLoading(false)
        }
    }

    return (
        <div className={raleway.className}>
            <div className="mt-8 mb-20 xl:p-1 p-8 flex items-center justify-center ">
                <form onSubmit={handleSubmit} className="xl:w-1/3 w-11/12   shadow-2xl  rounded-lg items-center">
                    <h2 className="xl:text-4xl text-3xl  text-center text-gray-700  mb-4 mt-10 font-semibold">Create your Account!</h2>
                    <div className="px-12 pb-10">
                        <div className="w-full mb-2 mt-10">
                            <div className="flex justify-center">
                                <input type="text"
                                    placeholder="Name"
                                    value={name}
                                    autocomplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    name="name" className="px-8 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                            </div>
                        </div>
                        <div className="w-full mb-2 mt-10">
                            <div className="flex justify-center">
                                <input type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    autocomplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email" className="px-8 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                            </div>
                        </div>
                        <div className="w-full mb-2 mt-10">
                            <div className="flex justify-center">
                                <input type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-8 w-full rounded py-2 text-gray-700 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] focus:outline-none" />
                            </div>
                        </div>
                        <div className="w-full mb-2 mt-10">
                            <div className='flex mb-2 '>
                                <span class="block  text-[16px]  font-medium text-gray-900 ">Profile Picture :</span>
                                {/* <div className='ml-2'>
                                    <img id="blah" src="" className='rounded-full w-16 h-16 bg-contain' alt="" />
                                </div> */}
                            </div>
                            <div className="flex  justify-around">
                                <input
                                    class="relative m-0 block w-1/2 min-w-0 flex-auto rounded border border-solid border-neutral-300  bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700  transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100  file:px-3 file:py-[0.32rem] file:text-neutral-700  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:bg-[#4540e129] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                                    type="file" onChange={handleImage} />
                            </div>
                            <div className='h-1 w-full bg-gray-300'>
                                <div
                                    style={{ width: `${progressBar}%` }}
                                    className={`h-full ${progressBar < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit" className="w-1/2 mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer" disabled={!name || !email || !password || loading}> {loading ? <Loader /> : "Sign Up"}
                            </button>
                        </div>
                        <div className="flex justify-center  mt-10">
                            <label className="mr-2 text-gray-800" >Already have an account? </label>
                            <Link href="/login"
                                className=" text-[#1EC28B] cursor-pointer font-semibold transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                            >
                                Sign In
                            </Link>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default register