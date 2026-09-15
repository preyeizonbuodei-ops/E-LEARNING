import Engineering from '../Image/FB1.jpg'
import Navbar from '../Components/Navbar'
import { motion } from "motion/react";
import { Award, ShieldLock, Lightbulb, Users, Rocket } from 'lucide-react';
import Data from '../Components/Data';
import AboutBanner from '../Components/About/AboutBanner';
import Aboutaction from '../Components/About/Aboutaction';
import Footer from '../Components/Foot'

const About = () => {
  return (
    <div>
        <>
          <div className="relative h-screen w-full overflow-hidden">

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
                <div className="relative z-20 flex h-[calc(100vh-80px)] items-center">
                    <motion.div className="ml-10 max-w-xl text-white md:ml-20"
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

                        <h1 className="text-5xl font-bold leading-tight">
                            About Us
                            <br />
                            <span className="text-amber-500">
                                Think Engineering
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-200">
                            Pioneering innovation and developing solutions for a better
                            tomorrow through excellence in engineering education and research.
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
        < Data />
        <AboutBanner />
        
        <div className='grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mr-8 ml-8 '>
            <div className='px-4 border-b pb-5 border-b-gray-300 mg:border-r lg:border-r mg:border-gray-300 lg:border-gray-300'>
                <Aboutaction 
                image={Award}
                heading="Excellence"
                p1="We strive for the highest" 
                p2="Standards in all we do"/>
            </div>

            <div className='px-4 border-b pb-5 border-b-gray-300 mg:border-r lg:border-r mg:border-gray-300 lg:border-gray-300'>
                <Aboutaction 
                image={Lightbulb}
                heading="Innovation" 
                p1="We embrace creativity to"
                p2="drive solutions"/>
            </div>

            <div className='px-4 border-b pb-5 border-b-gray-300 mg:border-r lg:border-r mg:border-gray-300 lg:border-gray-300'>
                <Aboutaction 
                image={ShieldLock}
                heading="Integrity"
                p1="We uphold honesty," 
                p2="transparency, and respect"/>
            </div>

            <div className='px-4 border-b pb-5 border-b-gray-300 mg:border-r lg:border-r mg:border-gray-300 lg:border-gray-300'>
                <Aboutaction 
                image={Users}
                heading="Collaboration"
                p1="We work together to achieve" 
                p2="greater impact"/>
            </div>

            <div className='px-4 pb-5 border-b border-b-gray-300 mg:border-r lg:border-r mg:border-gray-300 lg:border-gray-300'>
                <Aboutaction 
                image={Rocket}
                heading="Sustainability"
                p1="We are committed to building" 
                p2="a better future"/>
            </div>
            
        </div>

        <Footer />
    </div>
  )
}

export default About