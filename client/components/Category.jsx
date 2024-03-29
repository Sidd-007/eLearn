import Link from "next/link"

const Category = ({ categoryCounts }) => {


    // console.log(categoryCounts);
    return (
        <div>
            <div className='flex justify-between p-4'>
                <div className='flex flex-col'>
                    <span className='xl:text-2xl md:text-xl text-lg font-bold'>
                        Explore courses by category
                    </span>
                    <span className='xl:text-lg md:text-lg text-sm mt-1 text-[#A5A1A0] font-medium'>
                        Browse top class courses by browsing our category which will be more easy for you.
                    </span>
                </div>
            </div>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-4 mt-4 mb-20'>
                <div className='bg-[#ffffffd6] p-4 group hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>
                    <div className='flex p-2'>
                        <div className='bg-[#E9F8FF] group-hover:fill-white  flex justify-center items-center p-8 rounded-md'>
                            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.9913 0.107235C-1.93472 0.107235 0.0464077 -2.66447 0.0464076 19.9748C0.0464074 43.1019 -1.57856 39.8424 19.9913 39.8424C42.1844 39.8424 39.9362 42.6584 39.9362 19.9748C39.9362 -2.04361 41.9173 0.107235 19.9913 0.107235ZM19.9913 36.472C0.684326 36.472 3.42992 38.7337 3.42992 19.9748C3.42992 1.21592 1.56009 3.47763 19.9913 3.47763C38.9567 3.47763 36.5527 1.5707 36.5527 19.9748C36.5527 37.6472 38.7119 36.472 19.9913 36.472Z" fill="#6DABDD" />
                                <path d="M30.4956 7C29.5886 7 28.673 7.36447 27.9862 8.05111L14.2211 21.6103L13.5441 22.2546C12.7304 22.4065 11.9547 22.8057 11.3396 23.4749C10.437 24.4621 10.259 25.6694 9.9162 26.9656C9.57229 28.263 9.13616 29.7078 8.0849 31.3046L7 33H9.00055C13.2468 33 16.048 30.9705 17.4769 29.5419L17.5094 29.5093C18.1625 28.839 18.527 27.9961 18.6626 27.1359L19.2051 26.6272L32.9703 13.068V13.0344C33.6297 12.3728 34 11.4768 34 10.5427C34 9.60869 33.6297 8.71271 32.9703 8.05111C32.2835 7.36447 31.4026 7 30.4956 7ZM30.4956 9.13584C30.8341 9.13584 31.1563 9.2877 31.4449 9.57624C32.0253 10.1566 32.0253 10.9278 31.4449 11.5092L21.6461 21.2035L19.6803 19.2369L29.5116 9.57624C29.8002 9.28879 30.156 9.13584 30.4956 9.13584ZM18.1191 20.7631L20.086 22.7286L18.4587 24.3221L16.4918 22.3555L18.1191 20.7631ZM14.3925 24.3547C14.9393 24.372 15.5316 24.5835 15.9862 24.999C16.8292 25.7692 16.8498 27.1175 15.9515 28.0156C15.0109 28.9561 13.3412 30.1688 10.9002 30.6266C11.421 29.4865 11.7855 28.4224 12.0187 27.5416C12.3789 26.1814 12.6458 25.2485 12.9344 24.9307C13.3119 24.5206 13.8457 24.3373 14.3925 24.3547Z" fill="#6DABDD" />
                            </svg>
                        </div>
                        <div className='ml-4 flex flex-col justify-between'>
                            <Link href="/category/Design & Developement" className='font-bold'>
                                Design & <br /> Developement
                            </Link>
                            <span className='text-[#AFAFAF]'>
                                25+ courses available
                            </span>
                        </div>
                    </div>
                </div>
                <div className='bg-[#ffffffd6] p-4 group hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>
                    <div className='flex p-2'>
                        <div className='bg-[#F1F1FC] group-hover:fill-white  flex justify-center items-center p-8 rounded-md'>
                            <svg width="26" height="23" className='' viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1295 21.9911C20.6023 22.5035 21.4151 22.5061 21.8451 21.9572C22.8471 20.6781 23.661 19.2356 24.2555 17.6805C25.008 15.712 25.3942 13.6017 25.3918 11.4709C25.3942 9.34009 25.008 7.2298 24.2555 5.26125C23.6612 3.70666 22.8477 2.26468 21.8462 0.985894C21.4157 0.436221 20.6018 0.438782 20.1283 0.951889V0.951889C19.7049 1.41073 19.7102 2.1147 20.0948 2.60653C20.9394 3.68669 21.6257 4.90418 22.1273 6.21649C22.7641 7.88222 23.0908 9.66789 23.0887 11.4709C23.0914 13.2741 22.7652 15.0602 22.1288 16.7263C21.6273 18.0396 20.9408 19.258 20.0958 20.3389C19.7118 20.83 19.7067 21.5329 20.1295 21.9911V21.9911Z" fill="#4540E1" />
                                <path d="M20.7853 11.4709C20.7871 12.9461 20.5199 14.4071 19.9989 15.77C19.6361 16.7193 19.1552 17.6079 18.5711 18.4119C18.1606 18.9767 17.345 18.9738 16.8715 18.4607V18.4607C16.4481 18.0019 16.4564 17.2991 16.8176 16.7898C17.2461 16.1857 17.6006 15.5219 17.8708 14.8148C18.2759 13.7547 18.4837 12.6183 18.4823 11.4709C18.4823 9.4701 17.8605 7.62574 16.8158 6.15175C16.455 5.64267 16.4475 4.9405 16.8706 4.48193V4.48193C17.3446 3.96832 18.161 3.9654 18.5718 4.53083C19.1556 5.33453 19.6363 6.22283 19.9989 7.17172C20.5199 8.53463 20.7871 9.99567 20.7853 11.4709ZM13.8185 1.48751C13.8182 1.25269 13.7568 1.02273 13.6413 0.824051C13.5257 0.625376 13.3609 0.466051 13.1655 0.364386C12.9702 0.262721 12.7524 0.22284 12.5371 0.24933C12.3218 0.275819 12.1177 0.367601 11.9484 0.51413L6.50621 5.23127H1.15154C0.846134 5.23127 0.553235 5.36275 0.337279 5.59678C0.121323 5.83081 0 6.14822 0 6.47919V16.4625C0 16.7935 0.121323 17.1109 0.337279 17.345C0.553235 17.579 0.846134 17.7105 1.15154 17.7105H6.50621L11.9484 22.4276C12.1177 22.5741 12.3218 22.6659 12.5371 22.6924C12.7524 22.7189 12.9702 22.679 13.1655 22.5774C13.3609 22.4757 13.5257 22.3164 13.6413 22.1177C13.7568 21.919 13.8182 21.6891 13.8185 21.4542V1.48751ZM7.62782 7.45257L11.5154 4.08318V18.8586L7.62782 15.4892C7.42398 15.3119 7.17058 15.2151 6.90925 15.2146H2.30308V7.72711H6.90925C7.17058 7.7266 7.42398 7.62979 7.62782 7.45257Z" fill="#4540E1" />
                            </svg>
                        </div>
                        <div className='ml-4 flex flex-col justify-between'>
                            <Link href="/category/Marketing & Communication" className='font-bold'>
                                Marketing & <br /> Communication
                            </Link>
                            <span className='text-[#AFAFAF]'>
                                30+ courses available
                            </span>
                        </div>
                    </div>
                </div>
                <div className='bg-[#ffffffd6] p-4 group hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>
                    <div className='flex p-2'>
                        <div className='bg-[#FFF4EF] group-hover:fill-white  flex justify-center items-center p-8 rounded-md'>
                            <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.38158 4.50366C10.8322 4.50366 12.0067 5.67794 12.0067 7.12816V21.3755C12.0067 22.0716 11.7302 22.7391 11.2378 23.2313C10.7455 23.7235 10.0778 24 9.38158 24H2.62516C1.92893 24 1.26121 23.7235 0.768892 23.2313C0.276579 22.7391 0 22.0716 0 21.3755V7.12816C0 5.67794 1.17607 4.50366 2.62516 4.50366H9.38158ZM9.38158 6.75323H2.62516C2.5257 6.75323 2.43031 6.79274 2.35998 6.86305C2.28965 6.93336 2.25014 7.02873 2.25014 7.12816V21.3755C2.25014 21.5825 2.41815 21.7504 2.62516 21.7504H9.38158C9.48104 21.7504 9.57643 21.7109 9.64676 21.6406C9.71709 21.5703 9.7566 21.4749 9.7566 21.3755V7.12816C9.7566 7.02873 9.71709 6.93336 9.64676 6.86305C9.57643 6.79274 9.48104 6.75323 9.38158 6.75323ZM6.37839 17.9966C6.66344 17.9967 6.93784 18.105 7.14613 18.2995C7.35442 18.4941 7.48107 18.7604 7.5005 19.0447C7.51993 19.3291 7.43068 19.6102 7.2508 19.8312C7.07091 20.0523 6.81379 20.1969 6.5314 20.2357L6.37839 20.2462H5.62835C5.34126 20.2491 5.06393 20.1422 4.85312 19.9474C4.64232 19.7525 4.514 19.4844 4.49445 19.1981C4.47489 18.9117 4.56558 18.6287 4.74793 18.407C4.93029 18.1853 5.19052 18.0417 5.47534 18.0056L5.62835 17.9966H6.37839ZM28.8753 17.2468C29.1603 17.2469 29.4347 17.3551 29.643 17.5497C29.8513 17.7442 29.978 18.0106 29.9974 18.2949C30.0168 18.5792 29.9276 18.8603 29.7477 19.0814C29.5678 19.3024 29.3107 19.447 29.0283 19.4858L28.8768 19.4963L13.5008 19.4933V17.2438H28.8768L28.8753 17.2468ZM24.3765 0C25.8256 0 27.0017 1.17578 27.0017 2.62451V13.8724C27.0017 14.5685 26.7251 15.236 26.2328 15.7282C25.7405 16.2204 25.0727 16.4969 24.3765 16.4969H13.5008V14.2473H24.3765C24.476 14.2473 24.5713 14.2078 24.6417 14.1375C24.712 14.0672 24.7515 13.9718 24.7515 13.8724V2.62451C24.7515 2.52507 24.712 2.42971 24.6417 2.35939C24.5713 2.28908 24.476 2.24958 24.3765 2.24958H5.62535C5.52588 2.24958 5.43049 2.28908 5.36016 2.35939C5.28983 2.42971 5.25032 2.52507 5.25032 2.62451L5.24882 2.99794H3.00018V2.62451C3.00018 1.17578 4.17626 0 5.62535 0H24.3765Z" fill="#F7BF90" />
                            </svg>
                        </div>
                        <div className='ml-4 flex flex-col justify-between'>
                            <Link href="/category/Digital Marketing" className='font-bold'>
                                Digital <br /> Marketing
                            </Link>
                            <span className='text-[#AFAFAF]'>
                                30+ courses available
                            </span>
                        </div>
                    </div>
                </div>

                <div className='bg-[#ffffffd6] mt-10 p-4 group hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>
                    <div className='flex p-2'>
                        <div className='bg-[#FDF0ED] group-hover:fill-white  flex justify-center items-center p-8 rounded-md'>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9935 0.0804261C-1.45104 0.0804261 0.0348059 -1.99835 0.0348057 14.9811C0.0348056 32.3264 -1.18392 29.8818 14.9935 29.8818C31.6383 29.8818 29.9521 31.9938 29.9521 14.9811C29.9521 -1.53271 31.438 0.0804261 14.9935 0.0804261ZM14.9935 27.354C0.513246 27.354 2.57244 29.0503 2.57244 14.9811C2.57244 0.911938 1.17006 2.60822 14.9935 2.60822C29.2176 2.60822 27.4145 1.17802 27.4145 14.9811C27.4145 28.2354 29.0339 27.354 14.9935 27.354Z" fill="#E0968D" />
                                <path d="M17 18.9933V9.12686C17.2017 5.37475 21.6963 4.56051 21.995 9.12686V18.9933C22.1802 22.3817 17.1172 23.5784 17 18.9933Z" stroke="#E0948C" strokeWidth="2" />
                                <path d="M9 20.9329V14.1497C9.16138 11.5701 12.757 11.0103 12.996 14.1497V20.9329C13.1442 23.2624 9.09376 24.0852 9 20.9329Z" stroke="#E0948C" strokeWidth="2" />
                            </svg>


                        </div>
                        <div className='ml-4 flex flex-col justify-between'>
                            <Link href="/category/Business & Consulting" className='font-bold'>
                                Business & <br /> Consulting
                            </Link>
                            <span className='text-[#AFAFAF]'>
                                25+ courses available
                            </span>
                        </div>
                    </div>
                </div>
                <div className='bg-[#ffffffd6] mt-10 p-4 group hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>
                    <div className='flex p-2'>
                        <div className='bg-[#FBF0FD] group-hover:fill-white  flex justify-center items-center p-8 rounded-md'>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9935 0.0804261C-1.45104 0.0804261 0.0348059 -1.99835 0.0348057 14.9811C0.0348056 32.3264 -1.18392 29.8818 14.9935 29.8818C31.6383 29.8818 29.9521 31.9938 29.9521 14.9811C29.9521 -1.53271 31.438 0.0804261 14.9935 0.0804261ZM14.9935 27.354C0.513246 27.354 2.57244 29.0503 2.57244 14.9811C2.57244 0.911938 1.17006 2.60822 14.9935 2.60822C29.2176 2.60822 27.4145 1.17802 27.4145 14.9811C27.4145 28.2354 29.0339 27.354 14.9935 27.354ZM16.5862 14.2095L15.7381 14.0132V9.54635C17.0069 9.71931 17.7915 10.5109 17.9251 11.4821C17.9418 11.6152 18.0553 11.7116 18.1889 11.7116H19.6881C19.845 11.7116 19.9686 11.5752 19.9552 11.4189C19.7515 9.34679 18.0386 8.01637 15.7514 7.78687V6.69925C15.7514 6.55291 15.6312 6.43317 15.4843 6.43317H14.546C14.3991 6.43317 14.2789 6.55291 14.2789 6.69925V7.79685C11.9149 8.02635 10.0651 9.32683 10.0651 11.7548C10.0651 14.0033 11.7279 15.0875 13.4742 15.5033L14.299 15.7128V20.4591C12.8231 20.2629 11.9951 19.4779 11.8248 18.4202C11.8047 18.2939 11.6912 18.2007 11.561 18.2007H10.0184C9.86145 18.2007 9.73791 18.3338 9.75126 18.4901C9.90152 20.3194 11.2939 22.0024 14.2656 22.2186V23.263C14.2656 23.4093 14.3858 23.529 14.5327 23.529H15.481C15.6279 23.529 15.7481 23.4093 15.7481 23.2596L15.7414 22.2053C18.3558 21.9758 20.2257 20.5822 20.2257 18.081C20.2223 15.7727 18.7498 14.7416 16.5862 14.2095ZM14.2956 13.6706C14.1086 13.6174 13.9517 13.5675 13.7948 13.5043C12.6662 13.0986 12.142 12.4433 12.142 11.5985C12.142 10.3912 13.0602 9.70268 14.2956 9.54635V13.6706ZM15.7381 20.4691V16.0222C15.8416 16.0521 15.9351 16.0754 16.0319 16.0953C17.6112 16.5743 18.1421 17.2395 18.1421 18.2606C18.1421 19.5611 17.1605 20.3427 15.7381 20.4691Z" fill="#B86DBF" />
                            </svg>

                        </div>
                        <div className='ml-4 flex flex-col justify-between'>
                            <Link href="/category/Finance Management" className='font-bold'>
                                Finance  <br /> Management
                            </Link>
                            <span className='text-[#AFAFAF]'>
                                30+ courses available
                            </span>
                        </div>
                    </div>
                </div>
                <div className='bg-[#ffffffd6] mt-10 p-4 group hover:shadow-xl cursor-pointer transition-all ease-in-out duration-200'>
                    <div className='flex p-2'>
                        <div className='bg-[#F0FCF6] group-hover:fill-white  flex justify-center items-center p-8 rounded-md'>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.4999 30C24.489 30 26.3967 29.2098 27.8032 27.8033C29.2097 26.3968 29.9999 24.4891 29.9999 22.5C29.9999 20.5109 29.2097 18.6032 27.8032 17.1967C26.3967 15.7902 24.489 15 22.4999 15C20.5108 15 18.6031 15.7902 17.1966 17.1967C15.7901 18.6032 14.9999 20.5109 14.9999 22.5C14.9999 24.4891 15.7901 26.3968 17.1966 27.8033C18.6031 29.2098 20.5108 30 22.4999 30ZM26.0978 20.3721L23.237 25.1421C23.1113 25.3517 22.9395 25.5298 22.7346 25.663C22.5297 25.7962 22.2971 25.8808 22.0545 25.9106C21.812 25.9403 21.5658 25.9144 21.3348 25.8347C21.1038 25.755 20.894 25.6237 20.7213 25.4507L19.0628 23.7943C18.8616 23.5931 18.7485 23.3202 18.7485 23.0357C18.7485 22.7512 18.8616 22.4783 19.0628 22.2771C19.2639 22.076 19.5368 21.9629 19.8213 21.9629C20.1058 21.9629 20.3787 22.076 20.5799 22.2771L21.752 23.4514L24.2592 19.2707C24.3315 19.15 24.4269 19.0447 24.5399 18.9608C24.6529 18.877 24.7813 18.8162 24.9178 18.782C25.0543 18.7478 25.1963 18.7408 25.3355 18.7614C25.4747 18.782 25.6085 18.8298 25.7292 18.9021C25.8499 18.9745 25.9552 19.0699 26.0391 19.1829C26.1229 19.2959 26.1837 19.4243 26.2179 19.5608C26.2521 19.6973 26.2591 19.8392 26.2385 19.9784C26.2179 20.1176 26.1701 20.2514 26.0978 20.3721ZM19.2856 6.42857C19.2856 8.13354 18.6083 9.76867 17.4027 10.9743C16.1971 12.1798 14.562 12.8571 12.857 12.8571C11.1521 12.8571 9.51694 12.1798 8.31135 10.9743C7.10576 9.76867 6.42847 8.13354 6.42847 6.42857C6.42847 4.72361 7.10576 3.08848 8.31135 1.88289C9.51694 0.677294 11.1521 0 12.857 0C14.562 0 16.1971 0.677294 17.4027 1.88289C18.6083 3.08848 19.2856 4.72361 19.2856 6.42857ZM12.857 10.7143C13.9937 10.7143 15.0838 10.2628 15.8875 9.45903C16.6912 8.6553 17.1428 7.56521 17.1428 6.42857C17.1428 5.29193 16.6912 4.20184 15.8875 3.39811C15.0838 2.59439 13.9937 2.14286 12.857 2.14286C11.7204 2.14286 10.6303 2.59439 9.82658 3.39811C9.02285 4.20184 8.57132 5.29193 8.57132 6.42857C8.57132 7.56521 9.02285 8.6553 9.82658 9.45903C10.6303 10.2628 11.7204 10.7143 12.857 10.7143Z" fill="#81C7A1" />
                                <path d="M3.92571 19.9971C2.47286 21.45 2.145 23.0357 2.14286 23.5629L0.336535 24.8128C0.134691 24.5112 0 24.1087 0 23.5714C0 21.4286 2.14286 15 12.8571 15C14.0657 15 15.165 15.0814 16.1657 15.2293C15.5057 15.8036 14.9271 16.4657 14.4429 17.1964C13.9436 17.1621 13.4143 17.1429 12.8571 17.1429C7.95214 17.1429 5.32286 18.6 3.92571 19.9971Z" fill="#81C7A1" />
                            </svg>
                        </div>
                        <div className='ml-4 flex flex-col justify-between'>
                            <Link href="/category/Self Developement" className='font-bold'>
                                Self <br /> Development
                            </Link>
                            <span className='text-[#AFAFAF]'>
                                30+ courses available
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/course-category-count`)

    return {
        props: {
            categoryCounts: data,
        }
    }
}


export default Category