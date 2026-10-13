
import { motion } from "motion/react";
import { ArrowRight, Settings } from "lucide-react";

import Engineering from "../Image/lab3.jpg";
import Navbar from "../Components/Navbar";
import Data from "../Components/Data";
import Foot from "../Components/Foot";
import DepartmentComponent from "./DepartmentComponent";




const Department = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-screen w-full overflow-hidden">
                <img
                    src={Engineering}
                    alt="Engineering faculty"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />

                <div className="relative z-30">
                    <Navbar />
                </div>

                <div className="relative z-20 flex h-[calc(100vh-10px)] items-center">
                    <motion.div
                        className="ml-10 max-w-xl text-white md:ml-20"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.2, once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl font-bold leading-tight">
                            DEPARTMENTS
                        </h1>

                        <p className="mt-6 text-lg text-gray-200">
                            Explore our diverse departments, each dedicated
                            to excellence in education, research, and
                            innovation across various engineering disciplines.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mr-9 flex flex-col md:flex-row md:gap-3"
                            >
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("departments-list")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                    className="mt-8 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition duration-500 hover:cursor-pointer hover:bg-blue-700"
                                >
                                    Explore Departments
                                </button>

                                <button
                                    onClick={() => navigate("/register")}
                                    className="mt-8 flex cursor-pointer gap-3 rounded-lg border px-6 py-3 font-semibold text-white transition duration-300 hover:translate-x-2"
                                >
                                    Register Now <ArrowRight />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Data />

            <section>
                <DepartmentComponent />
            </section>

            <Foot />
        </div>
    );
};

export default Department;