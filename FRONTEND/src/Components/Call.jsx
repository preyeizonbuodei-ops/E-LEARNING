import { ArrowRight, Quote, GraduationCap } from 'lucide-react';
import nuesa from '../Image/FB2.jpg';
import Dean from '../Image/dean.jpg';
import { motion } from "motion/react";
import { NavLink } from 'react-router-dom';

const Call = () => {

  return (
    <motion.div className="mx-4 mt-8 mb-12 md:mx-8" 
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1.2fr_0.8fr]">

        
        <div className="relative">

          <img
            className="h-80 w-full rounded-lg object-cover shadow-md"
            src={nuesa}
            alt="Faculty of Engineering"
          />

          
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-lg bg-blue-950 px-5 py-4 text-white shadow-lg">

            <GraduationCap className="h-8 w-8 shrink-0 text-white" />

            <div className="font-semibold leading-relaxed">
              <p>Excellence</p>
              <p>Innovation</p>
              <p>Impact</p>

              <div className="mt-2 h-1 w-8 bg-amber-500"></div>
            </div>

          </div>

        </div>


       
        <div className="flex flex-col justify-center">

          <h4 className="mb-2 font-semibold text-amber-500">
            WELCOME TO THE
          </h4>

          <h2 className="text-3xl font-bold text-blue-950">
            Faculty of Engineering
          </h2>

          <p className="mt-6 leading-relaxed text-gray-500">
            We are committed to providing world-class education,
            cutting-edge research, and innovative solutions to
            real-world challenges. Our programs are designed to
            equip students with the technical skills, creativity,
            and leadership needed to make a lasting impact.
          </p>

          <div className="mt-6">

              <NavLink to='/about' className="flex items-center gap-3 rounded-lg hover:cursor-pointer bg-blue-950 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800">Learn More About Us <ArrowRight className="h-5 w-5" /></NavLink>

          </div>

        </div>


        
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm">

          <h4 className="mb-5 font-bold text-blue-950">
            Dean's Message
          </h4>

          <div className="flex gap-3">

            <Quote className="h-8 w-8 shrink-0 text-amber-500" />

            <p className="text-sm leading-relaxed text-gray-500">
              Our mission is to nurture engineers who will lead
              with knowledge, integrity, and innovation to build
              a sustainable future.
            </p>

          </div>

        
          <div className="mt-6 flex items-center gap-3">

            <img
              className="h-10 w-10 rounded-full object-cover"
              src={Dean}
              alt="Dean"
            />

            <p className="text-sm font-semibold">
              Prof. Samuel Agari

              <span className="block font-normal text-gray-500">
                Dean, Faculty of Engineering
              </span>
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default Call;