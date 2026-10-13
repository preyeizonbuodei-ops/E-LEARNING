
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
    <div className="min-h-screen w-full overflow-x-clip">
      {/* HERO */}
      <section className="relative isolate flex min-h-[650px] w-full flex-col sm:min-h-[700px] lg:min-h-[750px]">
        {/* Background image */}
        <img
          src={library}
          alt="Engineering faculty research"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        {/* Background overlay */}
        <div className="absolute inset-0 -z-10 bg-black/65" />

        {/* Navbar */}
        <div className="relative z-10 w-full">
          <Navbar />
        </div>

        {/* Hero content */}
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12">
          <motion.div
            className="w-full max-w-3xl text-white"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400 sm:text-sm md:text-base">
              Research and Innovation
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Driving Research.
              <span className="mt-1 block text-amber-400">
                Shaping the Future
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base md:text-lg">
              Exploring cutting-edge research and innovations across our
              departments. Advancing knowledge, solving real-world problems,
              and building tomorrow&apos;s world.
            </p>

            {/* Search */}
            <form
              className="mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="search"
                placeholder="Search research papers, authors, topics..."
                aria-label="Search research papers, authors, and topics"
                className="min-w-0 flex-1 rounded-md border border-white/40 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 sm:text-base"
              />

              <button
                type="submit"
                className="w-full rounded-md bg-amber-500 px-7 py-3.5 font-semibold text-black transition-colors hover:bg-amber-400 sm:w-auto"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <main className="w-full min-w-0">
        <section className="w-full py-8 sm:py-12 lg:py-16">
          <ResearchDepartment />
        </section>

        <section className="w-full py-8 sm:py-12 lg:py-16">
          <ResearchEvents />
        </section>

        <section className="w-full py-8 sm:py-12 lg:py-16">
          <ResearchImpact />
        </section>

        <section className="w-full py-8 sm:py-12 lg:py-16">
          <ResearchHero />
        </section>

        <section className="w-full py-8 sm:py-12 lg:py-16">
          <ResearchSearch />
        </section>
      </main>

      <Foot />
    </div>
  );
};

export default Research;
