/* eslint-disable react-hooks/rules-of-hooks */
import Loader from '@/components/Loader'
import { Context } from '@/context'
import { Raleway } from '@next/font/google'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const raleway = Raleway({ subsets: ['latin'] })

const login = () => {

    const router  = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { state, dispatch } = useContext(Context)
    const { user } = state

    useEffect(() => {
        if(user !== null)
            router.push('/')
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.table({ name, password, email})

        try {
            setLoading(true)
            const { data } = await axios.post(`/api/login`, {
                email,
                password,
            })
            dispatch({
                type:"LOGIN",
                payload: data,
            })
            window.localStorage.setItem("user", JSON.stringify(data))
            router.push("/");
            toast.success("Welcome Back!!")
            // setLoading(false)
        } catch (error) {
            toast.error(error.response.data)
            setLoading(false)
        }
    }

    return (
        <div className={raleway.className}>
            <div className="mt-8 xl:p-1 p-8 mb-12 flex items-center justify-center ">
                <form onSubmit={handleSubmit} className="xl:w-1/3 w-11/12   shadow-2xl  rounded-lg items-center">
                    <h2 className="xl:text-4xl text-3xl  text-center text-gray-700  mb-4 mt-10 font-semibold">Welcome Back!</h2>
                    <div className="px-12 pb-10">
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
                                    autocomplete="off"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-8 w-full rounded py-2 text-gray-700 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit" className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer" disabled={!email || !password || loading}> {loading ? (
                                    <div className="flex justify-center items-center">
                                    <svg aria-hidden="true" width="25" height="25" className="inline mr-2 text-gray-200 animate-spin  fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                ) : ("Login")}
                            </button>
                        </div>
                        <div className="flex flex-col xl:flex-row md:flex-row items-center justify-center mt-10">
                            <label className="mr-2 text-sm xl:text-lg md:text-lg text-gray-800" >Doesn't have an account? </label>
                            <Link href="/register"
                                className=" text-[#1EC28B] text-sm xl:text-lg md:text-lg cursor-pointer font-semibold  transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                            >
                                Sign Up
                            </Link>
                        </div>
                        <div className="flex justify-center mt-10">
                            <Link href="/forgot-password" className="cursor:pointer font-semibold text-red-700  transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" >Forgot Password? </Link>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default login