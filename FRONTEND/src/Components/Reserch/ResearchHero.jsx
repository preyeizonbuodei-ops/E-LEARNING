import { NavLink } from 'react-router-dom'
import image1 from '../../Image/lab1.jpg'
import image2 from '../../Image/lab2.jpg'
import image3 from '../../Image/lab3.jpg'
import image4 from '../../Image/work4.jpg'
import { ArrowRight } from 'lucide-react';
import { motion } from "motion/react";

const ResearchHero = () => {
  return (
    <>

        <div>
            <div>
                <h1 className='pl-15 text-[25px] font-bold'>Recent Key Research Publication</h1>
            </div>
        </div>

        <motion.div className="w-full grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-4 sm:mr-15 sm:ml-15 mb-3"
                     initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

            <div className='bg-blue-950 text-white rounded-t-lg'>
                {/* image folder */}
                <div>
                    <div className=''>
                    <img className='h-40 w-full rounded-t-lg object-cover inset-0' src={image1} alt="first logo" />
                    <p className='bg-amber-500 py-1 px-5 text-center font-bold'>Mechanical Engineering</p>

                </div>
                    {/* Content Containe */}
                    <div>
                        <div className='px-5'>
                            <h1 className='font-bold mb-1'>Design Optimization Of Heat Exchange Using AI Algorithms</h1>
                            <p className='text-gray-300'>A. Mohammed T. Yusuf, et. al.
                                2025 + Journal Of Mechanical Engineering
                            </p>
                        </div>

                        {/* Call to Action */}
                        <div className='pl-5'>
                            <NavLink className='flex gap-9 w-40 my-5 py-2 bg-blue-500 rounded-lg pl-4 hover:bg-blue-800 transition duration:300'>View Paper <ArrowRight /> </NavLink>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='bg-blue-950 text-white rounded-t-lg'>
                {/* image folder */}
                <div>
                    <img className='h-40 w-full object-cover' src={image2} alt="first logo rounded-t-lg" />
                    <p className='bg-amber-500 py-1 px-5 text-center font-bold'>Mechanical Engineering</p>
                </div>

                {/* Content Containe */}
                <div>
                    <div className='px-5'>
                        <h1 className='font-bold mb-1'>Design Optimization Of Heat Exchange Using AI        Algorithms</h1>
                        <p className='text-gray-300'>A. Mohammed T. Yusuf, et. al.
                            2025 + Journal Of Mechanical Engineering
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className='pl-5'>
                        <NavLink className='flex gap-9 w-40 my-5 py-2 bg-blue-500 rounded-lg pl-4 hover:bg-blue-800 transition duration:300'>View Paper <ArrowRight /> </NavLink>
                    </div>
                </div>
            </div>

            <div className='bg-blue-950 text-white rounded-t-4'>
                {/* image folder */}
                <div>
                    <img className='h-40 w-full object-cover' src={image3} alt="first logo rounded-t-lg" />
                    <p className='bg-amber-500 py-1 px-5 text-center font-bold'>Mechanical Engineering</p>
                </div>

                {/* Content Containe */}
                <div>
                    <div className='px-5'>
                        <h1 className='font-bold mb-1'>Design Optimization Of Heat Exchange Using AI Algorithms</h1>
                        <p className='text-gray-300'>A. Mohammed T. Yusuf, et. al.
                            2025 + Journal Of Mechanical Engineering
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className='pl-5'>
                        <NavLink className='flex gap-9 w-40 my-5 py-2 bg-blue-500 rounded-lg pl-4 hover:bg-blue-800 transition duration:300'>View Paper <ArrowRight /> </NavLink>
                    </div>
                </div>
            </div>

            <div className='bg-blue-950 text-white rounded-t-lg'>
                {/* image folder */}
                <div className='font-bold mb-1'>
                    <img className='h-40 w-full object-cover' src={image4} alt="first logo rounded-t-lg" />
                    <p className='bg-amber-500 py-1 px-5 text-center font-bold'>Mechanical Engineering</p>
                </div>

                {/* Content Containe */}
                <div>
                    <div className='px-5'>
                        <h1 className='font-bold mb-1'>Design Optimization Of Heat Exchange Using AI Algorithms</h1>
                        <p className='text-gray-300'>A. Mohammed T. Yusuf, et. al.
                            2025 + Journal Of Mechanical Engineering
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className='pl-5'>
                        <NavLink className='flex gap-9 w-40 my-5 py-2 bg-blue-500 rounded-lg pl-4 hover:bg-blue-800 transition duration:300'>View Paper <ArrowRight /> </NavLink>
                    </div>
                </div>
            </div>
        </motion.div>
    </>
  )
}

export default ResearchHero