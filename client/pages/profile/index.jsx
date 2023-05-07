import UserRoute from "@/components/routes/UserRoute"
import { Context } from "@/context"
import Image from "next/image"
import { useContext } from "react"


const Profile = () => {
    const { state: { user }, } = useContext(Context)
    console.log(user)



    // const { name, email, picture } = user;/

    return (
        <UserRoute>
            <div>
                <div>
                    
                    {user &&
                        (
                            <div className="max-w-full mx-24 px-4 sm:px-6">
                                {/* {user.name} */}
                                <div className="flex ">
                                    <div className="w-[480px] h-32 shadow-xl">
                                        <img src={user.picture} className='' />
                                    </div>
                                    <div className="mx-20">
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