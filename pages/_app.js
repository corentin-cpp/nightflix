import '../styles/globals.css'
import Header from '../components/Header'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/context/AuthProvider'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  )
}