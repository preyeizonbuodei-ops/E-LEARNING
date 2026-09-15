import library from '../Image/library.jpg'
import { ArrowRight } from 'lucide-react';
import { motion } from "motion/react";
import Navbar from '../Components/Navbar';
import Data from '../Components/Data';
import Resource from '../Components/Resources/ResourceItems';
import Foot from '../Components/Foot';


const Resources = () => {
  return (
    <div>
        <>
          <div className="relative h-screen w-full overflow-hidden">

                {/* Background image */}
                <img
                    src={library}
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
                <div className="relative z-20 flex h-[calc(100vh-10px)] items-center">
                    <motion.div className="ml-10 max-w-xl text-white md:ml-20"
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

                        <h1 className="text-5xl font-bold leading-tight">
                            RESOURCES
                            <br />
                        </h1>

                        <p className="mt-6 text-lg text-gray-200">
                            Access a wide range of resources to support your learning, research, and academic success
                        </p>

                        <div className="flex gap-1.5 flex-col w-full md:flex md:gap-1.5 lg:flex lg:gap-1.5">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="
                                mt-6
                                flex
                                flex-col
                                gap-3
                                mr-10
                                sm:flex-row
                                sm:gap-3
                            "
                                >
                                <button className="mt-8 rounded-lg hover:cursor-pointer hover:bg-blue-700 transform duration-500 bg-amber-500 px-6 py-3 font-semibold text-white">
                                    Explore Programs
                                </button>

                                <button className="mt-8 flex gap-6 cursor-pointer transition duration-300 rounded-lg    border px-6 py-3 font-semibold text-white hover:translate-x-2">
                                    Register Now <ArrowRight />
                                </button>
                            </motion.div>

                            
                        </div>

                    </motion.div>
                </div>

            </div>
        </>
        < Data />
        <Resource />
        <Foot />


    </div>
  )
}

export default Resources