import { motion } from "motion/react";
import { ArrowRight, BookOpenText, Monitor, CloudDownload, CalendarDays, NotebookPen, ScrollText, MonitorPlay, GraduationCap} from 'lucide-react';
import { NavLink } from "react-router-dom";



const Resource = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      transition={{ duration: 0.5 }}
      // whileHover={{ y: -14 }}
      className="grid mr-1 ml-1 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 lg:mr-15 lg:ml-15 md:mr-10 md:ml-10 mt-8" >
    
    <motion.div 
    transition={{duration: 0.2 }}
    whileHover={{ y: -8 }}
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer  transition duration-300">
      <div>
        <BookOpenText className="size-15 bg-blue-200 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Library</h1>
        <p className="text-gray-500 ">Access Books, journals, databases, and digital resources</p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/me/courses">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

  

    <motion.div 
      transition={{duration: 0.2 }}
      whileHover={{ y: -8 }}
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer">
      <div>
        <CloudDownload className="size-15 bg-blue-200 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Downloads</h1>
        <p className="text-gray-500 ">Froms, guides, and important documents for students.</p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/me/learning-materials">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer">
      <div>
        <CalendarDays className="size-15 bg-blue-200 text-amber-500 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Academic Calendar</h1>
        <p className="text-gray-500 ">Important dates, examination schedules and academic events.</p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/me">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>
    
    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer">
      <div>
        <NotebookPen className="size-15 bg-blue-200 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Lecture Notes</h1>
        <p className="text-gray-500 ">Access deparment lecture notes and teaching materials</p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/me/courses">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer">
      <div>
        <ScrollText className="size-15 bg-blue-200 text-amber-500 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Research Publications</h1>
        <p className="text-gray-500 ">Browse faculty and student research publications. </p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/research">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer">
      <div>
        <MonitorPlay className="size-15 bg-blue-200 text-amber-500 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Learning Videos</h1>
        <p className="text-gray-500 ">Educational videos, tutorials, and recorded lectures</p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/me/learning-materials">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>
    
     <motion.div 
      transition={{duration: 0.5 }}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      
    className="flex gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] p-3 rounded-lg hover:cursor-pointer">
      <div>
        <GraduationCap className="size-15 bg-blue-200 text-amber-500 rounded-full p-3"/>
       </div>

      <div>
        <h1 className="font-bold mb-3">Student Guidelindes</h1>
        <p className="text-gray-500 "> Policies, handbooks, and guidelines for students</p>
        <NavLink className="flex mt-3 gap-5 items-center text-amber-500" to="/me/courses">Learn More <ArrowRight /> </NavLink>
      </div>

    </motion.div>

    </motion.div>
    
  );
};

export default Resource