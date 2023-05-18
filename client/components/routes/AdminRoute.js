import { Context } from "@/context"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Loader from "../Loader"


const AdminRoute = ({ children }) => {
    const [ok, setOk] = useState(false)
    const { state: { user }, } = useContext(Context)
    // console.log(user)
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const { data } = await axios.get('/api/current-admin')
                // console.log(data)
                if (data.ok) setOk(true)
            } catch (error) {
                console.log(error)
                setOk(false)
            }
        }
        fetchAdmin();
    }, [])
    return (
        <div><>{children}</>
        </div>

    )
}
export default AdminRoute