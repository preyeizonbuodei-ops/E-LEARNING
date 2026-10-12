import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Settings } from "lucide-react";

import Engineering from "../Image/lab3.jpg";
import Navbar from "../Components/Navbar";
import Data from "../Components/Data";
import Foot from "../Components/Foot";
import { useUserDepartmentStore } from "../DashBoards/UserDashboard/DepartmentStore/UserDepartmentStore";


const Department = () => {
    const navigate = useNavigate();

    const {
        departments,
        isLoading,
        error,
        getDepartments,
    } = useUserDepartmentStore();

    useEffect(() => {
        getDepartments().catch(() => {});
    }, [getDepartments]);

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

            {/* Departments from the backend */}
            <section
                id="departments-list"
                className="bg-gray-50 px-6 py-16 md:px-16"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-blue-950 md:text-4xl">
                            Our Engineering Departments
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Discover our departments and explore their
                            major areas of study.
                        </p>
                    </div>

                    {isLoading && (
                        <p className="py-10 text-center text-gray-600">
                            Loading departments...
                        </p>
                    )}

                    {!isLoading && error && (
                        <div className="py-10 text-center">
                            <p className="text-red-600">{error}</p>

                            <button
                                onClick={() =>
                                    getDepartments().catch(() => {})
                                }
                                className="mt-4 rounded-lg bg-blue-950 px-5 py-2 text-white"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {!isLoading && !error && departments.length === 0 && (
                        <p className="py-10 text-center text-gray-600">
                            No departments are available yet.
                        </p>
                    )}

                    {!isLoading && !error && departments.length > 0 && (
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {departments.map((department) => (
                                <motion.article
                                    key={department._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <img
                                        src={
                                            department.image || Engineering
                                        }
                                        alt={department.name}
                                        className="h-52 w-full object-cover"
                                    />

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-blue-950">
                                            {department.name}
                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {department.description}
                                        </p>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/departments/${department._id}`
                                                )
                                            }
                                            className="mt-5 flex items-center gap-2 font-semibold text-blue-950 transition hover:text-amber-600"
                                        >
                                            Explore Department
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Foot />
        </div>
    );
};

export default Department;