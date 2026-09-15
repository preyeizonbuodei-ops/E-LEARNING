import library from "../Image/researching.jpg";
import { motion } from "motion/react";
import Navbar from "../Components/Navbar";
import ResearchDepartment from "../Components/Reserch/ResearchDepartment";
import ResearchEvents from "../Components/Reserch/ResearchEvent";
import ResearchImpact from "../Components/Reserch/ResearchImpact";
import ResearchHero from "../Components/Reserch/ResearchHero";
import ResearchSearch from "../Components/Reserch/ResearchSearch";
import Foot from "../Components/Foot";

const Research = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO */}
      <div className="relative min-h-screen w-full overflow-hidden">

        {/* Background image */}
        <img
          src={library}
          alt="engineering faculty"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />

        {/* Navbar */}
        <div className="relative z-30 w-full">
          <Navbar />
        </div>

        {/* Hero content */}
        <div className="
          relative z-20
          flex min-h-screen items-center
          px-5
          sm:px-8
          md:px-12
          lg:px-20
        ">
          <motion.div
            className="
              w-full
              max-w-xl
              text-white
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >

            <p className="text-sm font-semibold text-amber-500 sm:text-base">
              RESEARCH AND INNOVATION
            </p>

            <h1 className="
              mt-2
              text-3xl
              font-bold
              leading-tight
              sm:text-4xl
              md:text-5xl
            ">
              DRIVING RESEARCH.
              <br />
              Shaping the Future
            </h1>

            <p className="
              mr-9
              mt-5
              mb-5
              text-sm
              leading-relaxed
              text-gray-200
              sm:text-base
              md:text-lg
            ">
              Exploring cutting-edge research and innovations across our
              departments. Advancing knowledge, solving real-world problems,
              and building tomorrow's world.
            </p>

            {/* Search */}
            <div className="
              flex
              flex-col
              gap-3
              sm:flex-row
            ">
              <input
                className="
                  w-full
                  rounded-sm
                  border
                  border-amber-500
                  bg-black/30
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-300
                  sm:px-6
                  sm:text-base
                "
                type="search"
                placeholder="Search research papers, authors, topics..."
              />

              <button
                className="
                  w-full
                  rounded-sm
                  border
                  border-amber-500
                  bg-blue-700
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  duration-500
                  hover:cursor-pointer
                  hover:bg-amber-500
                  sm:w-auto
                "
              >
                Search
              </button>
            </div>

          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full">
        <ResearchDepartment />

        <ResearchEvents />

        <ResearchImpact />

        <ResearchHero />

        <ResearchSearch />

        <Foot />
      </div>

    </div>
  );
};

export default Research;