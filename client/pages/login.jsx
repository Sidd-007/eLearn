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
                                type="submit" className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer" disabled={!email || !password || loading}> {loading ? <Loader /> : "Login"}
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