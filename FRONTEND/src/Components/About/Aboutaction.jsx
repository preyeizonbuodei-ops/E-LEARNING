import { motion } from "motion/react";

const Aboutaction = ({ image: Icon, heading, p1, p2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: 0}}
      transition={{ duration: 0.5 }}
      className="group flex cursor-pointer flex-col items-center justify-center text-center"
    >
      <Icon
        className="h-18 w-18 rounded-full p-3 transition-transform duration-300 "
      />

      <h1 className="font-bold">
        {heading}
      </h1>

      <p>{p1}</p>
      <p>{p2}</p>
    </motion.div>
  );
};

export default Aboutaction;