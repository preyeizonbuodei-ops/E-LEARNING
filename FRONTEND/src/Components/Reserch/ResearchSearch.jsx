import { useState } from 'react';
import Image from '../../Image/robot1.jpg';
import { motion } from "motion/react";

const ResearchSearch = () => {

  const [activeArea, setActiveArea] = useState("All Areas");

  const Searches = [
    "Robotics",
    "Machine Learning",
    "Structural Analysis",
    "Oil & Gas",
    "Process Engineering"
  ];

  return (
    <div className="mx-5 md:mx-10 lg:mx-15">

      {/* SEARCH AREA */}
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative min-h-[260px] overflow-hidden rounded-lg"
      >

        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={Image}
          alt="Research"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent"></div>

        <div className="relative z-20 flex min-h-[260px] items-center px-5 py-8 md:px-8 lg:px-10">

          <div className="max-w-2xl text-white">

            <p className="text-blue-500">
              Discover Research Here
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Find Research That Inspires You
            </h1>

            <p className="mt-2 mb-5 text-sm text-gray-200 sm:text-base">
              Search through thousands of research papers across all departments.
            </p>

            <div className="flex w-full max-w-xl overflow-hidden rounded-lg outline outline-blue-500">

              <input
                type="search"
                placeholder="Search research..."
                className="min-w-0 flex-1 bg-white px-3 py-2 text-black outline-none"
              />

              <button
                className="
                  bg-blue-600
                  px-4
                  py-2
                  text-white
                  transition
                  duration-500
                  hover:bg-amber-500
                "
              >
                Search
              </button>

            </div>

          </div>

        </div>

      </motion.div>


      {/* RESEARCH AREAS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          mt-5
          rounded-lg
          bg-white
          p-5
          shadow-[0_0_15px_rgba(0,0,0,0.12)]
        "
      >

        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Research Areas
          </h2>

          <p className="text-sm text-gray-500">
            Explore our popular research areas
          </p>
        </div>


        {/* RESEARCH BUTTONS */}
        <div className="flex flex-wrap gap-3">

          {Searches.map((item) => (

            <button
              key={item}
              onClick={() => setActiveArea(item)}
              className={`w-full
                sm:w-fit
                sm:grid
                sm:grid-cols-3
                rounded-lg
                border
                px-4
                py-2
                text-sm
                transition
                duration-300
                ${
                  activeArea === item
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </motion.div>

    </div>
  );
};

export default ResearchSearch;