import { useEffect, useState } from 'react'
import review from '../assets/review.jpg'
import Image from 'next/image'
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, [])

    const loadReviews = async () => {
        try {
            const { data } = await axios.get('/api/reviews')
            setReviews(data);
        } catch (error) {
            console.log(error)
            toast.error("Failed to Fetch reviews")
        }
    }
    // console.log(reviews)
    return (
        <div className='bg-[#FAFAFC]'>
            <div className='flex  justify-between mb-20'>

                <div className='flex flex-col'>
                    <span className='text-3xl font-bold'>
                        What our students are
                    </span>
                    <span className="text-3xl font-bold">
                        saying about us.
                    </span>

                </div>
                <div className="w-1/3">
                    <span className='text-sm text-[#A5A1A0] font-medium'>
                        Browse top class courses by browsing our category which will be more easy for you. Lorem
                    </span>
                </div>

            </div>
            <div className='grid grid-cols-3 gap-2 mb-20'>
                {reviews && reviews.map((review) => (
                    <div className='flex flex-col border-2 border-purple-500 w-4/5 bg-white rounded-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200' key={review._id}>

                        <div className=" overflow-hidden p-4 text-lg font-semibold">
                            {review.title}
                        </div>

                        <div className="p-4 my-auto pb-12  flex  ">
                            <div className='w-1/2 '>
                                <h1 className="text-sm font-medium text-gray-700">{review.courseFeedback}</h1>
                            </div>
                        </div>
                        <div className="p-4  pb-12  flex  ">
                            <div>
                                <img className="w-10 h-10 object-cover rounded-full" src={review.user.picture}
                                    alt={review.user.name} />
                            </div>

                            <div className='flex flex-col'>
                                <span className='font-bold  ml-3'>
                                    {review.user.name}
                                </span>
                                <div className='ml-3 flex'>
                                    {[...Array(review.rating)].map((_, index) => (
                                        <svg width="9" height="9" viewBox="0 0 9 9" className={index > 0 ? 'ml-1 mt-1' : 'mt-1'} fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.74028 3.06518L5.96864 2.66243L4.72914 0.150921C4.67949 0.0503672 4.58291 0 4.48633 0L4.48669 7.22472L6.96533 8.52795C7.16409 8.6323 7.39607 8.46369 7.35816 8.24254L6.88482 5.48191L8.8903 3.52697C9.05115 3.37028 8.96233 3.0975 8.74028 3.06518Z" fill="#FFB820" />
                                            <path d="M6.30258 5.29289C6.30258 5.29289 6.73007 7.78472 6.73151 7.79302C6.73151 7.79302 4.52095 7.23339 4.48647 7.22472L2.0071 8.52795C1.80834 8.6323 1.57636 8.46368 1.61427 8.24254L2.08761 5.48191L0.0821319 3.52697C-0.0787184 3.37027 0.0101013 3.0975 0.23215 3.06518L3.00379 2.66242L4.2433 0.150921C4.29294 0.0503673 4.38952 0 4.48611 0L5.60881 3.15743L8.11923 3.52228L6.30258 5.29289Z" fill="#FFD06A" />
                                        </svg>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Reviews