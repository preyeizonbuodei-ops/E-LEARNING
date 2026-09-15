import { UsersRound, UserPen, School,FlaskConical } from 'lucide-react';
import { motion } from "motion/react";
function Data() {
  return (
    <>
        <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className='relative z-20 -mt-12 mx-5 md:mx-10 lg:mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg bg-white p-6 md:p-8 shadow-[0_0_20px_rgba(0,0,0,0.20)]'>
            <div className="students flex gap-3 justify-center items-center
            " >
                <div className='text-2xl'><UsersRound /></div>
                <div>
                    <h1 className='font-bold'>2,000+</h1>
                    <span className='font-light'>Students</span>
                </div>
            </div>
            <div className="lecturers flex gap-3 justify-center items-center ">
                <div className='text-amber-500 text-2xl'><UserPen /></div>
                <div>
                    <h1 className='font-bold '>50+</h1>
                    <span className='font-light'>Lecturers</span>
                </div>
            </div>
            <div className="deparments flex gap-3 justify-center items-center">
                <div className='text-2xl'><School /></div>
                <div>
                    <h1 className='font-bold'>6</h1>
                    <span className='font-light'>Departments</span>
                </div>
            </div>

            <div className="lebs flex gap-3 justify-center items-center ">
                <div className='text-amber-500 text-2xl'><FlaskConical /></div>
                <div>
                    <h1 className='font-bold'>10+</h1>
                    <span className='font-light'>Laboratories</span>
                </div>
            </div>
        </motion.div>
        
    </>
  )
}

export default Data