import Loader from "@/components/Loader";
import { Context } from "@/context";
import { Raleway } from "@next/font/google";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast";



const raleway = Raleway({ subsets: ['latin'] })

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { state: { user } } = useContext(Context)

    const router = useRouter();

    useEffect(() => {
        if (user !== null) router.push("/")
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`https://elearn-backend.onrender.com/api/forgot-password`, { email })
            setSuccess(true);

            toast("Check your email for a Secret Code")
            setLoading(false)


        } catch (err) {
            setLoading(false)
            toast(err.response.data)
        }
    }


    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const { data } = await axios.post(`https://elearn-backend.onrender.com/api/reset-password`, {
                email,
                code,
                newPassword,
            })
            setEmail("")
            setCode("")
            setNewPassword("")
            setLoading(false)

            toast("Great! Now login with new password")

            router.push("/login")
        } catch (error) {
            setLoading(false)
            toast(error.response.data)
        }
    }
 
    return (
        <div>
            <div className={raleway.className}>
                <div className="mt-8 mb-8 xl:p-1 p-8 flex items-center justify-center ">
                    <form onSubmit={success ? handleResetPassword : handleSubmit} className="xl:w-1/3 w-11/12   shadow-2xl  rounded-lg items-center">
                        <h2 className="xl:text-4xl text-3xl  text-center text-gray-700  mb-4 mt-10 font-semibold">Forgot Password</h2>
                        <div className="px-12 pb-10">
                            <div className="w-full mb-2 mt-10">
                                <div className="flex justify-center">
                                    <input type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email" className="px-8 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                                </div>
                            </div>
                            {success && <><div><div className="w-full mb-2 mt-10">
                                <div className="flex justify-center">
                                    <input type="Text"
                                        placeholder="Email Code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        name="email" className="px-8 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                                </div>
                            </div>
                                <div className="w-full mb-2 mt-10">
                                    <div className="flex justify-center">
                                        <input type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            name="email" className="px-8 w-full placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none items-center" />
                                    </div>
                                </div>
                            </div>
                            </>}
                            <div className="flex justify-center">
                                <button
                                    type="submit" className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer" disabled={loading || !email}> {loading ? <Loader /> : "Send Email"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword