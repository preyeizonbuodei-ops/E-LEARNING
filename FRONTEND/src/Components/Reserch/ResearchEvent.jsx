import { BookCheck, User, Trophy, ChartNoAxesCombined,FlaskConical, Globe } from 'lucide-react';
import { motion } from "motion/react";

function ResearchEvents() {
  return (
    <>
        <motion.div className='w-full mr-4 flex-wrap ml-2 grid grid-cols-3 gap-3 flex lg:grid-cols-5 md:grid-cols-5 mt-3 mb-9 pt-2 pb-2 sm:mr-15 sm:ml-15 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.20)]'>

            <div className="students flex gap-3 justify-center items-center
            border-r border-r-gray-400 " >
                <div className='text-2xl text-blue-700 
                '><BookCheck /></div>
                <div className='border-r-red-900'>
                    <h1 className='font-bold'>2,000+</h1>
                    <span className='font-light'>Research Publications</span>
                </div>
            </div>

            <div className="lecturers flex gap-3 justify-center border-r border-r-gray-400 items-center ">
                <div className='text-blue-700 text-2xl w-8 shrink-0'><User /></div>
                <div>
                    <h1 className='font-bold '>680+</h1>
                    <span className='font-light'>Resarch Projects</span>
                </div>
            </div>

            <div className="deparments flex gap-3 justify-center items-center border-r border-r-gray-400 ">
                <div className='text-2xl text-blue-700 w-8 shrink-0'><Trophy /></div>
                <div>
                    <h1 className='font-bold'>6</h1>
                    <span className='font-light'>Patents Fields</span>
                </div>
            </div>

            <div className="lebs flex gap-3 justify-center items-center border-r border-r-gray-400 ">
                <div className='text-blue-700 text-2xl w-8 shrink-0'><ChartNoAxesCombined /></div>
                <div>
                    <h1 className='font-bold'>10+</h1>
                    <span className='font-light'>
                        Active Researchers
                    </span>
                </div>
            </div>

            <div className="lebs flex gap-3 justify-center items-center ">
                <div className='text-blue-700 text-2xl w-8 shrink-0'><Globe /></div>
                <div>
                    <h1 className='font-bold'>10+</h1>
                    <span className='font-light'>Industry Collaborations</span>
                </div>
            </div>
        </motion.div>
        
    </>
  )
}

export default ResearchEvents