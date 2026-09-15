import { motion } from "motion/react";
import {
    ArrowRight,
    Settings,
    RobotArm,
    School,
    Zap,
    Fuel,
    FlaskConical
} from "lucide-react";
import { NavLink } from "react-router-dom";

const DepartmentProperty = () => {
    return (
        <>
            {/* Heading */}
            <div className="font-bold text-center mt-5">
                <h1
                    className="
                        relative mx-auto
                        mt-12 mb-6
                        w-fit
                        text-center
                        text-xl md:text-2xl
                        font-bold
                        after:absolute
                        after:-bottom-2
                        after:left-0
                        after:h-[2px]
                        after:w-full
                        after:bg-amber-500
                    "
                >
                    OUR DEPARTMENTS
                </h1>
            </div>


            {/* Department Cards */}
            <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-5
                    mx-5
                    md:mx-10
                    lg:mx-15
                    mt-5
                "
            >

                {/* Mechanical Engineering */}
                <motion.div
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -8 }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        shadow-[0_0_20px_rgba(0,0,0,0.20)]
                        p-3
                        rounded-lg
                        hover:cursor-pointer
                        transition
                        duration-300
                    "
                >
                    <div className="shrink-0">
                        <Settings className="size-15 bg-blue-200 rounded-full p-3" />
                    </div>

                    <div>
                        <h1 className="font-bold mb-3">
                            Mechanical Engineering
                        </h1>

                        <p className="text-gray-500">
                            Design, analyze, and build mechanical systems and
                            machines for various applications
                        </p>

                        <NavLink
                            className="flex mt-3 gap-3 items-center text-amber-500"
                            to="/departments/mechanical-engineering"
                        >
                            Learn More
                            <ArrowRight className="size-5" />
                        </NavLink>
                    </div>
                </motion.div>


                {/* Mechatronics Engineering */}
                <motion.div
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -8 }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        shadow-[0_0_20px_rgba(0,0,0,0.20)]
                        p-3
                        rounded-lg
                        hover:cursor-pointer
                    "
                >
                    <div className="shrink-0">
                        <RobotArm className="size-15 bg-blue-200 text-amber-500 rounded-full p-3" />
                    </div>

                    <div>
                        <h1 className="font-bold mb-3">
                            Mechatronics Engineering
                        </h1>

                        <p className="text-gray-500">
                            Combining mechanical, electrical, and computer
                            engineering to create intelligent systems
                        </p>

                        <NavLink
                            className="flex mt-3 gap-3 items-center text-amber-500"
                            to="/departments/mechatronics-engineering"
                        >
                            Learn More
                            <ArrowRight className="size-5" />
                        </NavLink>
                    </div>
                </motion.div>


                {/* Civil Engineering */}
                <motion.div
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -8 }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        shadow-[0_0_20px_rgba(0,0,0,0.20)]
                        p-3
                        rounded-lg
                        hover:cursor-pointer
                    "
                >
                    <div className="shrink-0">
                        <School className="size-15 bg-blue-200 rounded-full p-3" />
                    </div>

                    <div>
                        <h1 className="font-bold mb-3">
                            Civil Engineering
                        </h1>

                        <p className="text-gray-500">
                            Building sustainable infrastructure and shaping
                            the world around us for better communities.
                        </p>

                        <NavLink
                            className="flex mt-3 gap-3 items-center text-amber-500"
                            to="/departments/civil-engineering"
                        >
                            Learn More
                            <ArrowRight className="size-5" />
                        </NavLink>
                    </div>
                </motion.div>


                {/* Electrical Engineering */}
                <motion.div
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        shadow-[0_0_20px_rgba(0,0,0,0.20)]
                        p-3
                        rounded-lg
                        hover:cursor-pointer
                    "
                >
                    <div className="shrink-0">
                        <Zap className="size-15 bg-blue-200 text-amber-500 rounded-full p-3" />
                    </div>

                    <div>
                        <h1 className="font-bold mb-3">
                            Electrical Electronics Engineering
                        </h1>

                        <p className="text-gray-500">
                            Powering innovations and smart technologies for a
                            connected future
                        </p>

                        <NavLink
                            className="flex mt-3 gap-3 items-center text-amber-500"
                            to="/departments/electrical-engineering"
                        >
                            Learn More
                            <ArrowRight className="size-5" />
                        </NavLink>
                    </div>
                </motion.div>


                {/* Petroleum Engineering */}
                <motion.div
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        shadow-[0_0_20px_rgba(0,0,0,0.20)]
                        p-3
                        rounded-lg
                        hover:cursor-pointer
                    "
                >
                    <div className="shrink-0">
                        <Fuel className="size-15 bg-blue-200 rounded-full p-3" />
                    </div>

                    <div>
                        <h1 className="font-bold mb-3">
                            Petroleum Engineering
                        </h1>

                        <p className="text-gray-500">
                            Energy exploration and production solutions for
                            sustainable resource management
                        </p>

                        <NavLink
                            className="flex mt-3 gap-3 items-center text-amber-500"
                            to="/departments/petroleum-engineering"
                        >
                            Learn More
                            <ArrowRight className="size-5" />
                        </NavLink>
                    </div>
                </motion.div>


                {/* Chemical Engineering */}
                <motion.div
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    initial={{ opacity: 0, y: 70 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        shadow-[0_0_20px_rgba(0,0,0,0.20)]
                        p-3
                        rounded-lg
                        hover:cursor-pointer
                    "
                >
                    <div className="shrink-0">
                        <FlaskConical className="size-15 bg-blue-200 text-amber-500 rounded-full p-3" />
                    </div>

                    <div>
                        <h1 className="font-bold mb-3">
                            Chemical Engineering
                        </h1>

                        <p className="text-gray-500">
                            Transforming materials and processing for a better
                            life through chemical innovation
                        </p>

                        <NavLink
                            className="flex mt-3 gap-3 items-center text-amber-500"
                            to="/departments/chemical-engineering"
                        >
                            Learn More
                            <ArrowRight className="size-5" />
                        </NavLink>
                    </div>
                </motion.div>

            </motion.div>
        </>
    );
};

export default DepartmentProperty;