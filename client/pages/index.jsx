
import Category from '@/components/Category'
import Reviews from '@/components/Reviews'
import { Raleway, Poppins } from '@next/font/google'
import Image from 'next/image'
import mypic from '../assets/c.jpg'

const raleway = Raleway({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default function Home() {
    return (
        <div className={poppins.className}>
            <section className='mb-40'>
                <div className="bg-[#F6F5EE]">
                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56  md:px-10 lg:px-32 dark:text-gray-900">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-900">Learn <span className='text-[#4540E1]'>Easily</span>  anywhere and anytime</h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Provides you with the latest online learning system and material
                            that help your knowledge growing.</p>
                        <div className="flex flex-wrap justify-center">
                            <button className="inline-flex text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none text-sm">Browse Courses</button>

                        </div>
                    </div>
                </div>
                <div className="w-5/6 mx-auto mb-12  rounded-lg shadow-md -mt-20 p-8 bg-[#F1F1FC]">
                    <div className="flex justify-center space-x-20 items-center">
                        <div class=" bg-[#F9EA72] shadow-2xl shadow-[#f9e9729c]  rounded-xl px-6 py-4 w-1/6 flex justify-center items-center flex-col">
                            <h4 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900">120K</h4>
                            <p className="leading-normal  text-gray-700">Total Students</p>
                        </div>
                        <div className=" bg-[#F9EA72] shadow-2xl shadow-[#f9e9729c]  rounded-xl px-6 py-4 w-1/6 flex justify-center items-center flex-col">
                            <h4 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900">32K</h4>
                            <p className="leading-normal text-gray-700">Active Educators</p>
                        </div>
                        <div className=" bg-[#F9EA72] shadow-2xl shadow-[#f9e9729c] rounded-xl px-6 py-4 w-1/6 flex justify-center items-center flex-col">
                            <h4 className="mb-3 text-2xl font-semibold tracking-tight text-gray-900">140K</h4>
                            <p className="leading-normal text-gray-700">Total Courses</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='max-w-7xl mx-auto '>
                <Category />
            </section>
            <div className='bg-[#ECEEF9]'>

                <section className='max-w-7xl mx-auto p-8 '>
                    <div className='flex  justify-between mb-20'>

                        <div className='flex flex-col'>
                            <span className='text-2xl font-bold'>
                                Popular courses for you
                            </span>
                            <span className='text-lg text-[#A5A1A0] font-medium'>
                                Get the best course with the best prices with world-class tutors.
                            </span>
                        </div>
                        <div className='p-4 font-medium flex justify-center items-center  max-w-fit text-lg rounded-lg border-2 px-6 cursor-pointer transition-all text-[#4540E1] hover:text-white ease-in-out duration-200 border-[#4540e11f] hover:bg-[#4540E1]'>
                            <span className=''>
                                See All
                            </span>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mb-20'>
                        <div className='flex flex-col bg-white rounded-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>

                            <div className="max-h-140 overflow-hidden p-4">
                                <Image className="w-full h-auto rounded-lg" src={mypic}
                                    alt="" />
                            </div>
                            <div className='p-4'>

                                <div className='p-2 max-w-fit rounded-lg border-2 text-sm px-4 cursor-pointer transition-all text-[#4540E1]  ease-in-out duration-200 border-[#4540e11f] bg-[#ECEEF9]'>
                                    <span className=' font-medium '>
                                        Web Developement
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 my-auto pb-12 ">
                                <h1 className="text-xl font-semibold text-gray-700">Learn Web Developement in 30 days</h1>
                            </div>
                            <div className='p-4 inline-flex justify-between flex-wrap'>
                                <p className="text-md font-medium text-gray-400 mt-5">
                                    by Mr. WebDev
                                </p>
                                <div className='flex flex-wrap'>
                                    <div className='mt-3'>

                                        <svg width="35" height="35" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="65.5" cy="65.5" r="65.5" fill="#FCE6EE" />
                                            <path d="M65.5002 24.1633C42.8634 24.1633 24.5088 42.518 24.5088 65.1548C24.5088 87.7916 42.8634 106.146 65.5002 106.146C88.137 106.146 106.492 87.7916 106.492 65.1548C106.492 42.518 88.137 24.1633 65.5002 24.1633ZM65.5002 99.1923C46.7064 99.1923 31.4627 83.9486 31.4627 65.1548C31.4627 46.3609 46.7064 31.1172 65.5002 31.1172C84.2941 31.1172 99.5378 46.3609 99.5378 65.1548C99.5378 83.9486 84.2941 99.1923 65.5002 99.1923ZM69.8647 63.032L67.5406 62.4922V50.2039C71.0176 50.6797 73.1678 52.8573 73.5338 55.5291C73.5796 55.8951 73.8907 56.1604 74.2567 56.1604H78.3649C78.795 56.1604 79.1335 55.7853 79.0969 55.3552C78.5388 49.6549 73.8449 45.9949 67.5772 45.3636V42.3716C67.5772 41.969 67.2479 41.6396 66.8453 41.6396H64.2741C63.8715 41.6396 63.5422 41.969 63.5422 42.3716V45.391C57.064 46.0224 51.995 49.6 51.995 56.2794C51.995 62.4647 56.5516 65.4476 61.337 66.5913L63.5971 67.1677V80.2246C59.5528 79.6848 57.2836 77.5254 56.817 74.6157C56.7621 74.268 56.451 74.0118 56.0942 74.0118H51.8669C51.4369 74.0118 51.0983 74.3778 51.1349 74.8079C51.5467 79.8403 55.3622 84.4701 63.5056 85.0649V87.938C63.5056 88.3405 63.8349 88.6699 64.2375 88.6699H66.8361C67.2387 88.6699 67.5681 88.3405 67.5681 87.9288L67.5498 85.0283C74.7142 84.397 79.8381 80.5632 79.8381 73.6824C79.8289 67.3324 75.7938 64.496 69.8647 63.032ZM63.5879 61.5497C63.0755 61.4033 62.6455 61.2661 62.2154 61.0922C59.1228 59.9759 57.6862 58.1734 57.6862 55.8493C57.6862 52.5279 60.2024 50.6339 63.5879 50.2039V61.5497ZM67.5406 80.2521V68.0187C67.8243 68.101 68.0805 68.1651 68.3458 68.22C72.6737 69.5376 74.1286 71.3675 74.1286 74.1765C74.1286 77.7541 71.4385 79.9044 67.5406 80.2521Z" fill="#E9BDB7" />
                                        </svg>
                                    </div>
                                    <span className='ml-2 mt-4'>
                                        $15.6
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className='max-w-7xl mx-auto  mt-40'>
                <Reviews />
            </section>
        </div>
    )
}
