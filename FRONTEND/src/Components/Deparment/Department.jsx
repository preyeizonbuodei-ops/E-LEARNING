import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

const Department = ({ image: Icon, department}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      transition={{ duration: 0.5 }}
      className="group flex cursor-pointer flex-col text-center items-center"
    >
      <Icon
        className="h-12 w-12 text-blue-950 transition-transform duration-300 "
      />

      <p className="mt-4 font-bold text-[13px] leading-4 text-gray-500">
        {department}
      </p>

      <NavLink className='mt-4 text-blue-500' to={'/departments/mechanical-engineering'}>View more...</NavLink>

  </motion.div>
  );
};

export default Department;