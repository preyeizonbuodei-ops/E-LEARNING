import Engineering from '../Image/lab3.jpg'
import Navbar from '../Components/Navbar'
import { motion } from "motion/react";
import { ArrowRight, Settings } from 'lucide-react';
import Data from '../Components/Data';
import DepartmentProperty from '../Components/Deparment/DepartmentProperty';
import { NavLink } from 'react-router-dom';
import Foot from '../Components/Foot';


const Department = () => {
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
                <div className="relative z-20 flex h-[calc(100vh-10px)] items-center">
                    <motion.div className="ml-10 max-w-xl text-white md:ml-20"
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

                        <h1 className="text-5xl font-bold leading-tight">
                            DEPARTMENTS
                            <br />
                        </h1>

                        <p className="mt-6 text-lg text-gray-200">
                            Explore our diverse departments, each dedicated to excellence in education, research, and innovation accross various engineering discipline
                        </p>

                        <div className=" mt-6
                                flex
                                flex-col
                                gap-3

                                sm:flex-row
                                sm:gap-3">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-col mr-9 md:flex md:gap-3 lg:flex lg:gap-3 "
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
        <DepartmentProperty />
        <Foot />
    </div>

    
    
  )
}

export default Department