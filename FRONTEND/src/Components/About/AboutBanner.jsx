import { ArrowRight, Quote, GraduationCap,Target, Eye } from 'lucide-react';
import Work from '../../Image/work4.jpg';
import { motion } from "motion/react";

const AboutBanner = () => {

  return (
    <motion.div className="mx-4 mt-8 mb-12 md:mx-8" 
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.0fr_1.2fr]">

        
        


       
        <div className="flex flex-col justify-center">

          <h4 className="mb-2 font-semibold text-amber-500">
            WHO WE ARE
          </h4>

          <h2 className="text-3xl font-bold text-blue-950">
            Shaping Engineering, Building the Future
          </h2>

          <p className="mt-6 leading-relaxed text-gray-500">
            The Faculty of Engineering is one of the leading faculties dedicated to providing world-class engineering education, cutting-edge research, and innovation solutions to real-world challenges
          </p>

          <p className='mt-5 text-gray-500'>
            We empowe students with technical skills, creativity, and leadership to create a lasting impact in the society and drive sustainable development
          </p>

          <div className="mt-6">

            <button className="w-full justify-center flex md:items-center md:w-fit gap-3  lg:items-center lg:w-fitrounded-lg hover:cursor-pointer bg-blue-950 px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800">
              Student Portal
              <ArrowRight className="h-5 w-5" />
            </button>

          </div>

        </div>


        
            <div className="rounded-lg border border-gray-200 p-6 shadow-sm">

                <div className='flex items-center gap-3 mt-3 p-6 rounded-sm bg-blue-50'>

                    <div  className='bg-blue-200 rounded-full p-4 text-blue-950'>
                        <Target className='z-80 opacity-100'/>
                    </div>
                        
                    <div>
                        <h3 className='text-blue-700 mb-3 font-bold'>Our Mission</h3>
                        <p className='text-gray-500'>To nurture engineering who will lead with knowledge, integrity, and innovation to build a sustainable future.</p>
                    </div>
                </div>

            <div className="flex gap-3">

               <div className='flex items-center gap-3 mt-3 p-6 rounded-sm bg-blue-50'>
                    <div className='bg-blue-200 rounded-full p-4 text-blue-950' >
                        <Eye />
                    </div>
                    <div>
                        <h3 className='text-blue-700 mb-3 font-bold'>Our Vision</h3>
                        <p className='text-gray-500'>To be a leading faculty of engineering recognized for academic execellence, research impact, and social ontribution</p>
                    </div>
               </div>

            </div>

        </div>

        <div className="relative">

          <img
            className="h-80 w-full rounded-lg object-cover shadow-md"
            src={Work}
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

      </div>

      

    </motion.div>
  );
};

export default AboutBanner;