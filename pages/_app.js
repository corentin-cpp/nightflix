import '../styles/globals.css'
import Header from '../components/Header'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}