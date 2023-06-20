
import Category from '@/components/Category'
import Reviews from '@/components/Reviews'
import axios from 'axios'
import Link from 'next/link'


export default function Home({ courses }) {


    console.log(courses)
    function calculateAverageRating(reviews) {
        if (reviews.length === 0) {
            return "No rating";
        }

        const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = sumOfRatings / reviews.length;
        const roundedAverageRating = averageRating.toFixed(1);

        return roundedAverageRating;
    }
    return (
        <div className="font-poppins">
            <section className='mb-40'>
                <div className="bg-[#F6F5EE]">
                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56  md:px-10 lg:px-32 dark:text-gray-900">
                        <h1 className="text-5xl  font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-900">Learn <span className='text-[#4540E1]'>Easily</span>  anywhere and anytime</h1>
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
                        <Link href="/courses" className=' font-medium flex justify-center items-center  w-fit text-lg rounded-lg border-2 px-5 cursor-pointer transition-all text-[#4540E1] hover:text-white ease-in-out duration-200 border-[#4540e11f] hover:bg-[#4540E1]'>
                            <span className=''>
                                See All
                            </span>
                        </Link>
                    </div>
                    <div className='grid grid-cols-3 gap-4 mb-20 auto-rows-auto'>
                        {courses.slice(0, 6).map((course) => (
                            <div className='flex flex-col bg-white rounded-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200 h-full'>
                                <div key={course._id}>
                                    <Link href={`/course/${course.slug}`}>
                                        <div className="h-64 w-full overflow-hidden p-4">
                                            <img className="w-full h-full rounded-lg" src={course.image?.Location} alt="" />
                                        </div>

                                    </Link>
                                    <div className='px-4 flex justify-between items-center'>
                                        <div className='p-2 max-w-fit rounded-lg border-2 text-sm px-4 cursor-pointer transition-all text-[#4540E1]  ease-in-out duration-200 border-[#4540e11f] bg-[#ECEEF9]'>
                                            <span className=' font-medium '>
                                                {course.category}
                                            </span>
                                        </div>
                                        {course.paid ? (<div className=''>
                                            <span className='ml-2 mt-4 text-red-500 font-semibold bg-red-200 p-2 border-2 rounded-xl border-[#ff00001f]'>
                                                Rs {course.price}
                                            </span>
                                        </div>) : (<div className=''>
                                            <span className='ml-2 mt-4  font-semibold bg-green-200 p-2 border-2 rounded-xl text-green-500 border-[#00ff371f]'>
                                                Free
                                            </span>
                                        </div>)}
                                    </div>
                                    <div className="p-4 flex justify-between ">
                                        <h1 className="text-lg font-semibold text-gray-700">{course.name}</h1>
                                    </div>
                                    <div className="p-4">
                                        Instructor: {course.instructor.name}
                                    </div>
                                    <div className="p-4 flex justify-between mb-auto">
                                        <h1 className="text-lg font-semibold text-gray-700 flex ">{course.lessons.length} <span className="ml-2"> Lessons</span></h1>
                                    </div>
                                    <div className="p-4 flex">
                                        Rating: {calculateAverageRating(course.reviews)}
                                    </div>
                                    <div className="p-4 flex -ml-2">
                                        {course && course.tags && course.tags.map((tag, index) => (
                                            <div className="flex bg-gray-200 text-sm  ml-2 p-1 rounded-md text-[#4540E1] items-center" key={index}>
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Average Rating */}
                                </div>

                            </div>
                        ))}
                    </div>
                </section>

            </div>
            <section className='max-w-7xl mx-auto  mt-40'>
                <Reviews />
            </section>
        </div>
    )
}

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`)

    return {
        props: {
            courses: data,
        }
    }
}