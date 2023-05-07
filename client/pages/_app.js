import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import { Raleway } from '@next/font/google'
import Footer from '@/components/Footer'
import { Provider } from '@/context'

const raleway = Raleway({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
    return (
        <Provider>
            <div className='flex flex-col min-h-screen'>
                <div className={raleway.className}>
                    <ToastContainer  />
                </div>
                <Navbar />
                <div className='mb-auto'>
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
        </Provider>
    )
}
