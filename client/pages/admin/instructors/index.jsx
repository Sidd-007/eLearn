import axios from "axios";
import { useEffect, useState } from "react"

const Instructors = () => {

    const [instructors, setInstructors] = useState({});
    const [application, setApplication] = useState({});
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    useEffect(() => {
        loadInstructors()
    }, []);

    const loadInstructors = async () => {
        const { data } = await axios.get("/api/admin/all-instructors");
        setInstructors(data);
    }

    const handleApplication = async (instructorID) => {

        const { data } = await axios.get(`/api/admin/instructor-application/${instructorID}`)
        setApplication(data);
        // console.log(application)

    }

    console.log(instructors);

    return (
        <div>

            <div>
                <section class="container px-4 mx-auto mt-10 mb-20">
                    <div class="flex flex-col">
                        <div class="mx-[72px]">
                            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div class="overflow-hidden border border-gray-400  md:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200 ">
                                        <thead class="bg-blue-100 ">
                                            <tr>
                                                <th scope="col" class="py-3.5 px-4 text-md font-medium text-left rtl:text-right text-gray-800 ">
                                                    <div class="flex items-center gap-x-3">
                                                        <button class="flex items-center gap-x-2">
                                                            <span>No.</span>
                                                        </button>
                                                    </div>
                                                </th>

                                                <th scope="col" class="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-800 ">
                                                    Date
                                                </th>

                                                <th scope="col" class="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-800">
                                                    Status
                                                </th>

                                                <th scope="col" class="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-800">
                                                    Instructor
                                                </th>
                                                <th scope="col" class="px-4 py-3.5 text-md font-medium text-left rtl:text-right text-gray-800">
                                                    Application
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            {Array.isArray(instructors) && instructors.length > 0 ? (
                                                instructors.map((instructor, index) => (
                                                    <tr key={instructor._id}>
                                                        <td class="px-4 py-4 text-sm font-medium text-gray-700whitespace-nowrap">
                                                            <div class="inline-flex items-center gap-x-3">
                                                                <span>{index + 1}</span>
                                                            </div>
                                                        </td>
                                                        <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{new Date(instructor.createdAt).toLocaleString()}</td>
                                                        <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            {instructor.role.includes("Pending Verification") ? (<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 ">
                                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6.5 1L3.75 3.75M1 6.5L3.75 3.75M1 1L3.75 3.75M6.5 6.5L3.75 3.75" stroke="#FF3737" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>

                                                                <h2 class="text-sm font-normal">{instructor.role}</h2>
                                                            </div>) : (<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <h2 class="text-sm font-normal">{instructor.role}</h2>
                                                            </div>)}
                                                        </td>
                                                        <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                            <div class="flex items-center gap-x-2">
                                                                <img class="object-cover w-8 h-8 rounded-full" src={instructor.picture} alt="" />
                                                                <div>
                                                                    <h2 class="text-sm font-medium text-gray-800  ">{instructor.name}</h2>
                                                                    <p class="text-xs font-normal text-gray-600 ">{instructor.email}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div class="flex items-center gap-x-6">
                                                                <button onClick={() => handleApplication(instructor._id)} class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white">
                                                                    <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                                                    <span class="relative">View</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No instructors found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {showApplicationModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative 2xl:mt-0 mt-36 2xl:mb-0 md:mt-36 mb-8 mx-auto 2xl:w-[600px] md:w-[600px] w-[300px]">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between py-2 px-6 mt-2 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="md:text-lg  text-lg 2xl:text-xl font-semibold">
                                            Instructor Application
                                        </h3>
                                        <button
                                            className="bg-red-500 rounded-md text-white background-transparent font-bold uppercase px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowApplicationModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <div className="relative p-6  flex items-center justify-center flex-col">
                                        Hii
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>

        </div>
    )
}
export default Instructors