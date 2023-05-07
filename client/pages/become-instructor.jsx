import UserRoute from "@/components/routes/UserRoute"
import { Context } from "@/context"
import axios from "axios"
import { useContext, useState } from "react"
import { toast } from "react-toastify"



const BecomeInstructor = () => {

    const [loading, setLoading] = useState(false)
    const { state: { user } } = useContext(Context)

    const becomeInstructor = () => [
        // console.log("Become")
        setLoading(true),
        axios.post("/api/make-instructor").then((res) => {
            console.log(res);
            window.location.href = res.data;
        }).catch((err) => {
            console.log(err.response.status)
            toast.error("Failed")
            setLoading(false)
        })
    ]

    return (
        <UserRoute>

            <div className="flex flex-col justify-center items-center">
                <div className="text-4xl mt-4 xl:ml-6"><span>Become Instructor</span></div>
                <div className="mt-10">
                    <button class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300" onClick={becomeInstructor} disabled={user && user.role && user.role.includes("Instructor")}>
                        <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span class="relative">Button Text</span>
                    </button>
                </div>
            </div>
        </UserRoute>
    )
}
export default BecomeInstructor