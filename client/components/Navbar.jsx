import React, { useState, useRef, useEffect, useContext } from 'react';
import { Raleway } from '@next/font/google'
// import Link from 'next/Link'
import Link from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Context } from '@/context';
import toast from 'react-hot-toast';

const raleway = Raleway({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

function Header() {

    const router = useRouter();

    const { state, dispatch } = useContext(Context)

    const { user } = state;


    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const trigger = useRef(null);
    const mobileNav = useRef(null);

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!mobileNav.current || !trigger.current) return;
            if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!mobileNavOpen || keyCode !== 27) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem('user')
        const { data } = await axios.get('/api/logout')
        toast.success(data.message)
        setMobileNavOpen(!mobileNavOpen)
        router.push('/login')

    }

    return (
        <div className={raleway.className}>
            <header className="relative w-full z-30 shadow-md shadow-[#4540e129]">
                <div className="max-w-full xl:mx-24 px-4 sm:px-6">
                    <div className="flex  items-center justify-between h-20">

                        {/* Site branding */}
                        <div className="flex-shrink-0 mr-4">
                            {/* Logo */}
                            <Link href="/" className="block" aria-label="Cruip">
                                <svg width="97" height="132" viewBox="0 0 297 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.016 52.384C30.176 52.384 33.728 53.248 36.672 54.976C39.616 56.64 41.856 58.944 43.392 61.888C44.992 64.768 45.792 68.064 45.792 71.776C45.792 72.48 45.76 73.216 45.696 73.984C45.632 74.688 45.504 75.328 45.312 75.904H16.704C16.768 82.816 17.984 87.808 20.352 90.88C22.784 93.888 26.368 95.392 31.104 95.392C34.304 95.392 36.896 94.88 38.88 93.856C40.864 92.832 42.72 91.328 44.448 89.344L45.408 90.208C43.424 93.728 40.768 96.48 37.44 98.464C34.176 100.448 30.24 101.44 25.632 101.44C21.088 101.44 17.056 100.48 13.536 98.56C10.016 96.576 7.264 93.76 5.28 90.112C3.296 86.464 2.304 82.112 2.304 77.056C2.304 71.808 3.456 67.36 5.76 63.712C8.064 60 11.008 57.184 14.592 55.264C18.24 53.344 22.048 52.384 26.016 52.384ZM25.728 54.304C23.872 54.304 22.272 54.88 20.928 56.032C19.648 57.12 18.624 59.104 17.856 61.984C17.152 64.8 16.768 68.8 16.704 73.984H33.12C33.76 67.008 33.504 61.984 32.352 58.912C31.2 55.84 28.992 54.304 25.728 54.304Z" fill="#4540E1" />
                                    <path d="M50.7683 100V99.04L52.7843 98.272C54.1283 97.76 54.9603 97.152 55.2803 96.448C55.6643 95.68 55.8563 94.656 55.8563 93.376V43.264C55.8563 41.984 55.6643 40.96 55.2803 40.192C54.8963 39.424 54.0643 38.816 52.7843 38.368L50.7683 37.6V36.64H75.2483V37.6L73.5203 38.368C72.3043 38.816 71.4723 39.456 71.0243 40.288C70.5763 41.056 70.3523 42.08 70.3523 43.36V98.08H85.1363C87.5043 98.08 89.2323 97.504 90.3203 96.352C91.4723 95.2 92.5603 93.536 93.5843 91.36L97.3283 83.296H98.2883L97.4243 100H50.7683ZM126.516 52.384C130.676 52.384 134.228 53.248 137.172 54.976C140.116 56.64 142.356 58.944 143.892 61.888C145.492 64.768 146.292 68.064 146.292 71.776C146.292 72.48 146.26 73.216 146.196 73.984C146.132 74.688 146.004 75.328 145.812 75.904H117.204C117.268 82.816 118.484 87.808 120.852 90.88C123.284 93.888 126.868 95.392 131.604 95.392C134.804 95.392 137.396 94.88 139.38 93.856C141.364 92.832 143.22 91.328 144.948 89.344L145.908 90.208C143.924 93.728 141.268 96.48 137.94 98.464C134.676 100.448 130.74 101.44 126.132 101.44C121.588 101.44 117.556 100.48 114.036 98.56C110.516 96.576 107.764 93.76 105.78 90.112C103.796 86.464 102.804 82.112 102.804 77.056C102.804 71.808 103.956 67.36 106.26 63.712C108.564 60 111.508 57.184 115.092 55.264C118.74 53.344 122.548 52.384 126.516 52.384ZM126.228 54.304C124.372 54.304 122.772 54.88 121.428 56.032C120.148 57.12 119.124 59.104 118.356 61.984C117.652 64.8 117.268 68.8 117.204 73.984H133.62C134.26 67.008 134.004 61.984 132.852 58.912C131.7 55.84 129.492 54.304 126.228 54.304ZM164.717 101.44C161.005 101.44 157.869 100.384 155.309 98.272C152.813 96.16 151.565 93.12 151.565 89.152C151.565 86.144 153.101 83.392 156.173 80.896C159.245 78.336 164.077 76.416 170.669 75.136C171.693 74.944 172.845 74.752 174.125 74.56C175.405 74.304 176.749 74.048 178.157 73.792V66.208C178.157 61.856 177.613 58.816 176.525 57.088C175.501 55.296 173.869 54.4 171.629 54.4C170.093 54.4 168.877 54.912 167.981 55.936C167.085 56.896 166.509 58.592 166.253 61.024L166.061 62.08C165.933 64.832 165.261 66.848 164.045 68.128C162.829 69.408 161.325 70.048 159.533 70.048C157.869 70.048 156.493 69.536 155.405 68.512C154.317 67.488 153.773 66.112 153.773 64.384C153.773 61.76 154.669 59.552 156.461 57.76C158.317 55.968 160.749 54.624 163.757 53.728C166.765 52.832 170.029 52.384 173.549 52.384C179.245 52.384 183.629 53.792 186.701 56.608C189.837 59.36 191.405 63.872 191.405 70.144V91.36C191.405 94.24 192.749 95.68 195.437 95.68H197.549L198.413 96.448C197.197 97.984 195.853 99.168 194.381 100C192.973 100.832 190.957 101.248 188.333 101.248C185.517 101.248 183.277 100.608 181.613 99.328C180.013 97.984 178.957 96.224 178.445 94.048C176.525 96.096 174.541 97.856 172.493 99.328C170.509 100.736 167.917 101.44 164.717 101.44ZM170.573 95.584C171.853 95.584 173.037 95.296 174.125 94.72C175.277 94.08 176.621 93.12 178.157 91.84V75.712C177.517 75.84 176.877 75.968 176.237 76.096C175.597 76.224 174.861 76.352 174.029 76.48C171.085 77.248 168.717 78.56 166.925 80.416C165.197 82.208 164.333 84.64 164.333 87.712C164.333 90.336 164.941 92.32 166.157 93.664C167.373 94.944 168.845 95.584 170.573 95.584ZM200.201 100V99.04L201.641 98.656C202.921 98.272 203.785 97.696 204.233 96.928C204.745 96.16 205.001 95.168 205.001 93.952V63.904C205.001 62.496 204.745 61.472 204.233 60.832C203.785 60.128 202.921 59.648 201.641 59.392L200.201 59.008V58.048L216.713 52.48L217.673 53.44L218.537 61.696V62.464C219.433 60.672 220.585 59.04 221.993 57.568C223.465 56.032 225.065 54.784 226.793 53.824C228.585 52.864 230.345 52.384 232.073 52.384C234.505 52.384 236.361 53.056 237.641 54.4C238.921 55.744 239.561 57.44 239.561 59.488C239.561 61.664 238.921 63.36 237.641 64.576C236.425 65.728 234.953 66.304 233.225 66.304C230.537 66.304 228.169 64.96 226.121 62.272L225.929 62.08C225.289 61.184 224.553 60.704 223.721 60.64C222.889 60.512 222.121 60.896 221.417 61.792C220.777 62.368 220.233 63.072 219.785 63.904C219.401 64.672 219.017 65.568 218.633 66.592V93.376C218.633 95.936 219.753 97.536 221.993 98.176L225.065 99.04V100H200.201ZM242.576 100V99.04L243.92 98.656C246.16 98.016 247.28 96.448 247.28 93.952V63.904C247.28 62.496 247.056 61.472 246.608 60.832C246.16 60.128 245.296 59.648 244.016 59.392L242.576 59.008V58.048L258.992 52.48L259.952 53.44L260.72 59.2C262.96 57.216 265.488 55.584 268.304 54.304C271.12 53.024 273.904 52.384 276.656 52.384C280.88 52.384 284.112 53.536 286.352 55.84C288.656 58.144 289.808 61.664 289.808 66.4V94.048C289.808 96.544 291.024 98.112 293.456 98.752L294.32 99.04V100H271.664V99.04L272.912 98.656C275.152 97.952 276.272 96.384 276.272 93.952V63.328C276.272 59.232 274.224 57.184 270.128 57.184C267.312 57.184 264.24 58.592 260.912 61.408V94.048C260.912 96.544 262.032 98.112 264.272 98.752L265.136 99.04V100H242.576Z" fill="#222222" />
                                </svg>

                            </Link>
                        </div>

                        {/* Desktop navigation */}
                        <nav className="hidden xl:ml-24 md:flex md:flex-grow">
                            {/* Desktop menu spans */}
                            <ul className="flex flex-grow justify-end flex-wrap items-center">
                                <Link href="/" className="relative cursor-pointer group mr-7 font-[500] hover:text-[#4540E1] hover:scale-125 transition-all ease-in-out duration-200">
                                    <li className={router.pathname == "/" ? "text-[#4540E1] font-[900]" : "font-[600]"}>
                                        <span>Home</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px]  bg-[#4540E1] transition-all group-hover:w-full"></span>
                                    </li>
                                </Link>
                                {user && user.role && user.role.includes("Instructor") ? (<Link href="/instructor" className="relative cursor-pointer group mr-7 font-[500] hover:text-[#4540E1] hover:scale-125 transition-all ease-in-out duration-200 ">
                                    <li className={router.pathname == "/instructor" ? "text-[#4540E1] font-[900]" : "font-[600]"}>
                                        <span>My Courses</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px]  bg-[#4540E1] transition-all group-hover:w-full"></span>
                                    </li>
                                </Link>) : (<Link href="/courses" className="relative cursor-pointer group mr-7 font-[500] hover:text-[#4540E1] hover:scale-125 transition-all ease-in-out duration-200 ">
                                    <li className={router.pathname == "/courses" ? "text-[#4540E1] font-[900]" : "font-[600]"}>
                                        <span>Courses</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px]  bg-[#4540E1] transition-all group-hover:w-full"></span>
                                    </li>
                                </Link>)}
                                
                                {user && user.role && user.role.includes("Instructor") ? (<Link href="/instructor/course/create" className="relative cursor-pointer group mr-7 font-[500] hover:text-[#4540E1] hover:scale-125 transition-all ease-in-out duration-200 ">
                                    <li className={router.pathname == "/instructor/course/create" ? "text-[#4540E1] font-[900]" : "font-[600]"}>
                                        <span>Create Course</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px]  bg-[#4540E1] transition-all group-hover:w-full"></span>
                                    </li>
                                </Link>) : null}


                                {user && user.role && user.role.includes("Admin") ? (<Link href="/instructor" className="relative cursor-pointer group mr-7 font-[500] hover:text-[#4540E1] hover:scale-125 transition-all ease-in-out duration-200 ">
                                    <li className={router.pathname == "/instructor" ? "text-[#4540E1] font-[900]" : "font-[600]"}>
                                        <span>My Courses</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px]  bg-[#4540E1] transition-all group-hover:w-full"></span>
                                    </li>
                                </Link>) : null}
                                
                                {user && user.role && user.role.includes("Admin") ? (<Link href="/admin/instructors" className="relative cursor-pointer group mr-7 font-[500] hover:text-[#4540E1] hover:scale-125 transition-all ease-in-out duration-200 ">
                                    <li className={router.pathname == "/admin/instructors" ? "text-[#4540E1] font-[900]" : "font-[600]"}>
                                        <span>Instructors</span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-[2px]  bg-[#4540E1] transition-all group-hover:w-full"></span>
                                    </li>
                                </Link>) : null}
                                

                                {/* 1st level: hover */}

                            </ul>

                            {user === null && (
                                <>
                                    <ul className="flex flex-grow justify-end flex-wrap items-center">
                                        <Link href='/login' className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none font-semibold rounded text-base mt-4 md:mt-0">Sign in

                                        </Link>
                                        <Link href='/register' className="inline-flex items-center  border-2 border-gray-900 font-semibold rounded-full py-1 px-5 hover:bg-[#4540E1] hover:text-gray-50 transition-all ease-in-out duration-100 focus:outline-none   text-base mt-4 md:mt-0">Register

                                        </Link>

                                    </ul>

                                </>
                            )}
                            {user !== null && (
                                <ul className="flex flex-grow justify-end flex-wrap items-center">
                                    <Link href='/profile'>
                                        <img class="inline object-cover w-12 h-12 mr-2 rounded-full" src={user.picture} alt="Profile image" />
                                    </Link>
                                    <button onClick={logout} className="inline-flex ml-2 items-center  border-2 border-gray-900 font-semibold rounded-full py-1 px-5 hover:bg-[#4540E1] hover:text-gray-50 transition-all ease-in-out duration-100 focus:outline-none   text-base mt-4 md:mt-0">Logout
                                    </button>
                                </ul>
                            )}

                        </nav>

                        {/* Mobile menu */}
                        <div className="md:hidden">

                            {/* Hamburger button */}
                            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                                <span className="sr-only">Menu</span>
                                <svg className="w-6 h-6 fill-current text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="4" width="24" height="2" rx="1" />
                                    <rect y="11" width="24" height="2" rx="1" />
                                    <rect y="18" width="24" height="2" rx="1" />
                                </svg>
                            </button>

                            {/*Mobile navigation */}
                            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 }}>
                                <ul className="bg-gray-100 px-4 py-2">
                                    {user === null && (
                                        <>
                                            <li>
                                                <Link href='/login' onClick={() => setMobileNavOpen(!mobileNavOpen)} className="flex text-gray-700 font-[600] hover:text-gray-900 py-2">Sign in</Link>
                                            </li>
                                            <li>
                                                <Link href='/register' onClick={() => setMobileNavOpen(!mobileNavOpen)} className="flex text-gray-700 font-[600] hover:text-gray-900 py-2">Register</Link>
                                            </li>
                                        </>
                                    )}
                                    {user !== null && (
                                        <>
                                            <li>
                                                <Link href='/profile' onClick={() => setMobileNavOpen(!mobileNavOpen)} className="flex text-gray-700 font-[600] hover:text-gray-900 py-2">Profile</Link>
                                            </li>
                                            <li>
                                                <button onClick={logout} className="flex text-gray-700 font-[600] hover:text-gray-900 py-2">Logout</button>
                                            </li>
                                        </>
                                    )}

                                </ul>
                            </nav>

                        </div>

                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
