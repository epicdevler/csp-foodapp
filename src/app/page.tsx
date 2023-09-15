import Image from 'next/image'
import {Footer} from "@/components/Footer";
import Navbar from '@/components/Navbar';

export default function Home() {
  return (

    <>
    <header className="h-screen bg-[url('/food_2.jpg')] bg-center bg-cover bg-no-repeat">
      <div className="h-full" style={{backgroundColor: "rgba(0, 0, 0, 0.45)"}}>
      <Navbar />
      </div>

    </header>
    <Footer/>
    </>
  )
}
