import { motion } from "motion/react";
import { ArrowRight, Settings, RobotArm, School, Zap, Fuel, FlaskConical} from 'lucide-react';
import { NavLink } from "react-router-dom";



const ResearchDepartment = () => {
  return (
    <>
      <div className="font-bold text-left mt-5 ml-16">
        <p className="text-amber-500">Explore</p>
        <h1  className="relative mt-0 mb-1 w-fit text-left font-bold ">OUR ENGINEERING DEPARTMENTS</h1>
      </div>

      <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      transition={{ duration: 0.5 }}
      // whileHover={{ y: -14 }}
      className="grid mr-2 ml-2 grid-cols-2 lg:grid-cols-6 md:grid-cols-6 gap-2 sm:mr-15 sm:ml-15 mt-1" >
    
    <motion.div 
    transition={{duration: 0.2 }}
    whileHover={{ y: -8 }}
    className="flex flex-col bg-amber-300 text-white border-amber-500 border items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      
      
      <div className="pt-4 pb-1 ">
        <Settings className="size-15  rounded-full p-3"/>
       </div>

      <div className="flex flex-col items-center ">
        <h1 className="font-bold mb-3">Mechanical Enineering</h1>
        <NavLink className="flex mt-1 gap-5 text-taupe-50 items-center text-amber-500" to="/">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.2 }}
      whileHover={{ y: -8 }}
    className="flex flex-col  bg-cyan-500 text-white border items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      <div className="pt-4 pb-1">
        <RobotArm className="size-15  text-white rounded-full p-3"/>
       </div>

      <div className="flex flex-col items-center text-center">
        <h1 className="font-bold mb-1">Mechantronics Enineering</h1>
        <NavLink className="flex mt-1 gap-5 items-center text-white" to="/">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.2 }}
      whileHover={{ y: -8 }}
    className="flex flex-col bg-green-500 border-green-500 border items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      <div className="pt-4 pb-1">
        <School className="size-15 text-white rounded-full p-3"/>
       </div>

      <div flex flex-col items-center>
        <h1 className="font-bold mb-1 text-white">Civil Engineering</h1>
        <NavLink className="flex mt-1 text-white gap-5 items-center border-green-500" to="/">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      
    className="flex flex-col bg-orange-500 text-white border-orange-500 border items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      <div className="pt-4 pb-1">
        <Zap className="size-15  text-white rounded-full p-3"/>
       </div>

      <div className="flex flex-col items-center text-center">
        <h1 className="font-bold mb-1 text-white">Electrical Electronics Engineering</h1>
        <NavLink className="flex mt-1 gap-5 items-center text-white" to="/">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>
    
    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      
    className="flex flex-col bg-blue-950 text-white border-blue-950 border items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      <div className="pt-4 pb-1">
        <Fuel className="size-15 text-white rounded-full p-3"/>
       </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bold mb-1 text-center text-white">Petroleum Engineering</h1>
        <NavLink className="flex mt-1 gap-5 items-center text-white" to="/">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      
    className="flex flex-col bg-green-500 text-white border-green-500 border-2 items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      <div className="pt-4 pb-4">
        <FlaskConical className="size-15  text-white rounded-full p-3"/>
       </div>

      <div className="flex flex-col items-center">
        <h1 className="font-bold mb-1 text-white">Chemical Engineering</h1>
        <NavLink className="flex mt-1 gap-5 items-center text-white" to="/">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>
    

    </motion.div>
    
    
    </>
    
  );
};

export default ResearchDepartment;