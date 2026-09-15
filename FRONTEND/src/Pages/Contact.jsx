import Engineering from '../Image/FB3.jpg'
import Navbar from '../Components/Navbar'
import { motion } from "motion/react";
import { Award, ShieldLock, Lightbulb, Users, Rocket } from 'lucide-react';
import Data from '../Components/Data';
// import Callabout from '../Components/About/AboutBanner';
import Foot from '../Components/Foot'
import Contactform from '../Components/Contact/Contactform';
import ContactMessage from '../Components/Contact/ContactMesage';




const Contact = () => {
  return (
    <div>
        <>
          <div className="relative h-screen w-full overflow-hidden ">

                {/* Background image */}
                <img
                    src={Engineering}
                    alt="engineering faculty"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>

                {/* Navbar */}
                <div className="relative z-30">
                    <Navbar />
                </div>

                {/* Hero content */}
                <div className="relative z-20 flex h-[calc(100vh)] items-center">
                    <motion.div className="ml-10 max-w-xl text-white md:ml-20"
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

                        <h1 className="text-5xl font-bold leading-tight">
                            CONTACT US
                        </h1>

                        <p className="mt-6 text-lg text-gray-200">
                            We are here to help, Reach out to us for inquiries support, or more information about our programs and services
                        </p>

                        <div className="flex gap-1.5">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex gap-3"
                                >
                                <p>
                                    The Faculty of Engineering is committed to execellence in education, research, and innovation. WE empower future engineers to solve global challenges and create sustainable solutions
                                </p>
                            </motion.div>

                            
                        </div>

                    </motion.div>
                </div>

            </div>
        </>
        <Data />
        <Contactform />
        <ContactMessage />
        <Foot />
    </div>
  )
}

export default Contact