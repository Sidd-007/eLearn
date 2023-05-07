import review from '../assets/review.jpg'
import Image from 'next/image'

const Reviews = () => {
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
            <div className='grid grid-cols-3 gap-4 mb-20'>
                <div className='flex flex-col border-2 border-purple-500 w-4/5 bg-white rounded-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>

                    <div className=" overflow-hidden p-4 text-lg font-semibold">
                        Great Place
                    </div>

                    <div className="p-4 my-auto pb-12  flex  ">
                        <div>
                            <Image className="w-10 h-10 object-cover rounded-full" src={review}
                                alt="" />
                        </div>
                        <div className='w-1/2 ml-4'>
                            <h1 className="text-sm font-medium text-gray-700">Browse top class courses by browsing our category which will be more easy for you</h1>
                        </div>
                    </div>
                    <div className="p-4 mx-14 pb-12  flex  ">
                        <div>
                            <Image className="w-10 h-10 object-cover rounded-full" src={review}
                                alt="" />
                        </div>

                        <div className='flex flex-col ml-4'>
                            <span className='font-bold '>
                                Kyle Mayers
                            </span>
                            <div>
                                <svg width="57" height="9" viewBox="0 0 57 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.74028 3.0653L5.96864 2.66255L4.72914 0.151043C4.67949 0.0504893 4.58291 0.00012207 4.48633 0.00012207L4.48669 7.22484L6.96533 8.52807C7.16409 8.63242 7.39607 8.46381 7.35816 8.24266L6.88482 5.48203L8.8903 3.52709C9.05115 3.3704 8.96233 3.09762 8.74028 3.0653V3.0653Z" fill="#FFB820" />
                                    <path d="M6.30258 5.29289C6.30258 5.29289 6.73007 7.78472 6.73151 7.79302C6.73007 7.79284 4.52095 7.23339 4.48647 7.22472C4.48611 7.22454 2.0071 8.52795 2.0071 8.52795C1.80834 8.6323 1.57636 8.46368 1.61427 8.24254L2.08761 5.48191L0.0821319 3.52697C-0.0787184 3.37027 0.0101013 3.0975 0.23215 3.06518L3.00379 2.66242L4.2433 0.150921C4.29294 0.0503673 4.38952 0 4.48611 0L5.60881 3.15743L8.11923 3.52228L6.30258 5.29289Z" fill="#FFD06A" />
                                    <path d="M32.7403 3.0653L29.9686 2.66255L28.7291 0.151043C28.6795 0.0504893 28.5829 0.00012207 28.4863 0.00012207L28.4867 7.22484L30.9653 8.52807C31.1641 8.63242 31.3961 8.46381 31.3582 8.24266L30.8848 5.48203L32.8903 3.52709C33.0511 3.3704 32.9623 3.09762 32.7403 3.0653V3.0653Z" fill="#FFB820" />
                                    <path d="M30.3026 5.29289C30.3026 5.29289 30.7301 7.78472 30.7315 7.79302C30.7301 7.79284 28.5209 7.23339 28.4865 7.22472C28.4861 7.22454 26.0071 8.52795 26.0071 8.52795C25.8083 8.6323 25.5764 8.46368 25.6143 8.24254L26.0876 5.48191L24.0821 3.52697C23.9213 3.37027 24.0101 3.0975 24.2322 3.06518L27.0038 2.66242L28.2433 0.150921C28.2929 0.0503673 28.3895 0 28.4861 0L29.6088 3.15743L32.1192 3.52228L30.3026 5.29289Z" fill="#FFD06A" />
                                    <path d="M20.7403 3.0653L17.9686 2.66255L16.7291 0.151043C16.6795 0.0504893 16.5829 0.00012207 16.4863 0.00012207L16.4867 7.22484L18.9653 8.52807C19.1641 8.63242 19.3961 8.46381 19.3582 8.24266L18.8848 5.48203L20.8903 3.52709C21.0511 3.3704 20.9623 3.09762 20.7403 3.0653V3.0653Z" fill="#FFB820" />
                                    <path d="M18.3026 5.29289C18.3026 5.29289 18.7301 7.78472 18.7315 7.79302C18.7301 7.79284 16.5209 7.23339 16.4865 7.22472C16.4861 7.22454 14.0071 8.52795 14.0071 8.52795C13.8083 8.6323 13.5764 8.46368 13.6143 8.24254L14.0876 5.48191L12.0821 3.52697C11.9213 3.37027 12.0101 3.0975 12.2322 3.06518L15.0038 2.66242L16.2433 0.150921C16.2929 0.0503673 16.3895 0 16.4861 0L17.6088 3.15743L20.1192 3.52228L18.3026 5.29289Z" fill="#FFD06A" />
                                    <path d="M44.7403 3.0653L41.9686 2.66255L40.7291 0.151043C40.6795 0.0504893 40.5829 0.00012207 40.4863 0.00012207L40.4867 7.22484L42.9653 8.52807C43.1641 8.63242 43.3961 8.46381 43.3582 8.24266L42.8848 5.48203L44.8903 3.52709C45.0511 3.3704 44.9623 3.09762 44.7403 3.0653V3.0653Z" fill="#FFB820" />
                                    <path d="M42.3026 5.29289C42.3026 5.29289 42.7301 7.78472 42.7315 7.79302C42.7301 7.79284 40.5209 7.23339 40.4865 7.22472C40.4861 7.22454 38.0071 8.52795 38.0071 8.52795C37.8083 8.6323 37.5764 8.46368 37.6143 8.24254L38.0876 5.48191L36.0821 3.52697C35.9213 3.37027 36.0101 3.0975 36.2322 3.06518L39.0038 2.66242L40.2433 0.150921C40.2929 0.0503673 40.3895 0 40.4861 0L41.6088 3.15743L44.1192 3.52228L42.3026 5.29289Z" fill="#FFD06A" />
                                    <path d="M56.7403 3.0653L53.9686 2.66255L52.7291 0.151043C52.6795 0.0504893 52.5829 0.00012207 52.4863 0.00012207L52.4867 7.22484L54.9653 8.52807C55.1641 8.63242 55.3961 8.46381 55.3582 8.24266L54.8848 5.48203L56.8903 3.52709C57.0511 3.3704 56.9623 3.09762 56.7403 3.0653V3.0653Z" fill="#FFB820" />
                                    <path d="M54.3026 5.29289C54.3026 5.29289 54.7301 7.78472 54.7315 7.79302C54.7301 7.79284 52.5209 7.23339 52.4865 7.22472C52.4861 7.22454 50.0071 8.52795 50.0071 8.52795C49.8083 8.6323 49.5764 8.46368 49.6143 8.24254L50.0876 5.48191L48.0821 3.52697C47.9213 3.37027 48.0101 3.0975 48.2322 3.06518L51.0038 2.66242L52.2433 0.150921C52.2929 0.0503673 52.3895 0 52.4861 0L53.6088 3.15743L56.1192 3.52228L54.3026 5.29289Z" fill="#FFD06A" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reviews