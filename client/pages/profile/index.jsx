import UserRoute from "@/components/routes/UserRoute"
import { Context } from "@/context"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"


const Profile = () => {
    const { state: { user }, } = useContext(Context)
    console.log(user)



    // const { name, email, picture } = user;/

    return (
        <UserRoute>
            <div>
                <div className="">
                    {user &&
                        (
                            <div className="max-w-full mx-24 px-4 mt-10 sm:px-6">
                                {/* {user.name} */}
                                <div className="flex ">
                                    <div className="flex flex-col items-center">
                                        <div className="w-[480px] h-32 shadow-xl">
                                            <img src={user.picture} className='' />
                                        </div>
                                    </div>
                                    <div className="mx-16">
                                        <div>
                                            <span className="text-5xl">{user.name}</span>
                                        </div>
                                        <div>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </UserRoute>

    )
}
export default Profile