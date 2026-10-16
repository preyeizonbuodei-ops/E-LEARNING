import { NavLink, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    File,
    Lightbulb,
    GraduationCap,
    BookAlert,
} from "lucide-react";

import { motion } from "motion/react";
import Engineering from "../Image/BG.jpg"; 
import Footer from "../Components/Foot";
import Navbar from "../Components/Navbar";
import TopicArea from "./TopicArea";
// import StudyMaterial from "./StudyMaterial";


const AreaDetails = ({ department }) => {
    const { departmentId, areaId } = useParams();

    if (department) {
        return (
            <>
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-5
                        px-4
                        sm:px-6
                        lg:px-10
                        xl:px-20
                        mt-2
                        mb-18
                    "
                >
                    {department.majorArea.map((area) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeOut",
                                }}
                                key={area.id}
                                className="
                                    shadow-[0_2px_12px_rgba(0,0,0,0.12)]
                                    rounded-lg
                                    overflow-hidden
                                    hover:shadow-lg
                                    transition
                                    duration-300
                                "
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2">

                                    {/* TEXT */}
                                    <div className="flex flex-col justify-center p-4 sm:p-5">

                                        {area.Icon && (
                                            <area.Icon
                                                size={30}
                                                className="text-blue-500 mb-2"
                                            />
                                        )}

                                        <h1 className="font-bold text-xl sm:text-2xl lg:text-[28px] py-1">
                                            {area.name}
                                        </h1>

                                        <p className="text-gray-500 text-sm mt-2 leading-6">
                                            {area.description}
                                        </p>

                                        <NavLink
                                            to={`/areas/${department.id}/${area.id}`}
                                            className="
                                                mt-3
                                                text-blue-500
                                                py-1
                                                rounded-sm
                                                flex
                                                gap-2
                                                w-fit
                                                items-center
                                                hover:text-blue-700
                                                transition
                                                duration-300
                                            "
                                        >
                                            Read More
                                            <ArrowRight size={18} />
                                        </NavLink>
                                    </div>

                                    {/* IMAGE */}
                                    <div className="h-56 md:h-full min-h-55">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={area.image}
                                            alt={area.name}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* CTA */}
                <div className="relative min-h-55 sm:min-h-45 mb-3 w-full overflow-hidden">

                    <img
                        src={Engineering}
                        alt="Engineering"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-black/40"></div>

                    <div
                        className="
                            relative
                            z-20
                            min-h-55
                            sm:min-h-45
                            flex
                            flex-col
                            sm:flex-row
                            items-center
                            justify-center
                            sm:justify-around
                            gap-6
                            px-5
                            py-8
                            text-white
                        "
                    >

                        {/* CTA TEXT */}
                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                justify-center
                                items-center
                                text-center
                                sm:text-left
                                gap-3
                            "
                        >
                            <GraduationCap
                                className="
                                    size-14
                                    sm:size-15
                                    shrink-0
                                    bg-blue-500
                                    rounded-full
                                    p-2
                                "
                            />

                            <div>
                                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl">
                                    Build Your Future With Engineering
                                </h1>

                                <p className="text-sm sm:text-base text-gray-300 mt-1">
                                    Join a community of innovators, problem
                                    solvers and change makers.
                                </p>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div>
                            <button
                                className="
                                    border
                                    border-white/60
                                    px-4
                                    sm:px-6
                                    py-2
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    text-sm
                                    sm:text-base
                                    hover:bg-white
                                    hover:text-black
                                    transition
                                    duration-300
                                "
                            >
                                Explore Our Programs
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    // FIND DEPARTMENT
    const selectedDepartment = departments.find(
        (dept) => dept.id === departmentId
    );

    if (!selectedDepartment) {
        return (
            <div className="p-5 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Department not found
                </h1>
            </div>
        );
    }

    // FIND AREA
    const area = selectedDepartment.majorArea.find(
        (item) => item.id === areaId
    );
   

    if (!area) {
        return (
            <div className="p-5 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Area not found
                </h1>
            </div>
        );
    }


    
    return (
        <>
            {/* HERO */}
            <section
                className="
                    relative
                    min-h-105
                    sm:min-h-110
                    lg:min-h-120
                    w-full
                    overflow-hidden
                    pt-20
                "
            >

                <img
                    src={area.image}
                    alt={area.name}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                    "
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/30"></div>

                {/* NAVBAR */}
                <div className="relative z-30">
                    <Navbar />
                </div>

                {/* HERO CONTENT */}
                <div
                    className="
                        relative
                        z-20
                        flex
                        items-center
                        min-h-85
                        sm:min-h-90
                        lg:min-h-95
                        px-5
                        sm:px-8
                        lg:px-12
                        text-white
                    "
                >
                    <div className="max-w-4xl">

                        {/* BACK */}
                        <NavLink
                            to={`/departments/${departmentId}`}
                            className="
                                flex
                                items-center
                                gap-2
                                text-gray-300
                                hover:text-white
                                text-sm
                                sm:text-base
                                mb-4
                                w-fit
                            "
                        >
                            <ArrowLeft size={18} />
                            Back to Department
                        </NavLink>

                        {/* DEPARTMENT NAME */}
                        <h2
                            className="
                                font-semibold
                                text-sm
                                sm:text-base
                                lg:text-lg
                                text-blue-300
                                mb-2
                            "
                        >
                            {selectedDepartment.name}
                        </h2>

                        {/* AREA NAME */}
                        <h1
                            className="
                                font-bold
                                text-3xl
                                sm:text-4xl
                                md:text-5xl
                                lg:text-6xl
                                leading-tight
                            "
                        >
                            {area.name}
                        </h1>

                        <p
                            className="
                                mt-3
                                text-sm
                                sm:text-base
                                lg:text-lg
                                text-gray-200
                                max-w-2xl
                                leading-7
                            "
                        >
                            Explore {area.name} Engineering, intelligent
                            systems, and modern automation technology for the
                            future.
                        </p>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section
                className="
                    px-4
                    sm:px-6
                    lg:px-10
                    mt-6
                    mb-10
                "
            >
                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-[1fr_2fr_1fr]
                        gap-5
                    "
                >

                    {/* ABOUT */}
                    <div className="bg-blue-100 rounded-lg p-5 sm:p-6">

                        <div className="flex gap-3 items-center mb-4">

                            <File
                                className="
                                    size-11
                                    sm:size-12
                                    shrink-0
                                    text-white
                                    rounded-full
                                    bg-blue-500
                                    p-3
                                "
                            />

                            <h1 className="font-bold text-lg">
                                About This Area
                            </h1>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {area.description}
                        </p>
                    </div>


                    {/* IMAGE + INNOVATION */}
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                        "
                    >

                        {/* IMAGE */}
                        <div className="h-55 sm:h-60 lg:h-full">

                            <img
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    rounded-lg
                                "
                                src={area.image}
                                alt={area.name}
                            />

                        </div>


                        {/* INNOVATION */}
                        <div
                            className="
                                bg-gray-100
                                rounded-lg
                                p-5
                                sm:p-6
                                min-h-55
                                sm:min-h-60
                            "
                        >

                            <Lightbulb className="text-blue-500 size-7 mb-4" />

                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">

                                Innovation in{" "}

                                <span className="font-semibold text-gray-900">
                                    {area.name}
                                </span>{" "}

                                builds a smarter, safer and more efficient
                                future.

                            </p>

                        </div>
                    </div>


                    {/* WHY CHOOSE */}
                    <div className="border rounded-lg p-5 sm:p-6">

                        <div className="flex items-center gap-3 mb-5">

                            <GraduationCap className="text-blue-500 size-7 shrink-0" />

                            <h3 className="font-bold">
                                Why Choose This Area?
                            </h3>

                        </div>


                        {/* BENEFIT 1 */}
                        <div className="flex gap-3 items-start mb-4">

                            <Check className="text-blue-500 size-5 shrink-0" />

                            <p className="text-sm text-gray-700">
                                Hands-On learning with modern tools
                            </p>

                        </div>


                        {/* BENEFIT 2 */}
                        <div className="flex gap-3 items-start mb-4">

                            <Check className="text-blue-500 size-5 shrink-0" />

                            <p className="text-sm text-gray-700">
                                Industry Relevant Skills
                            </p>

                        </div>


                        {/* BENEFIT 3 */}
                        <div className="flex gap-3 items-start mb-4">

                            <Check className="text-blue-500 size-5 shrink-0" />

                            <p className="text-sm text-gray-700">
                                High Demand in global industries
                            </p>

                        </div>


                        {/* BENEFIT 4 */}
                        <div className="flex gap-3 items-start">

                            <Check className="text-blue-500 size-5 shrink-0" />

                            <p className="text-sm text-gray-700">
                                Research and innovation opportunities
                            </p>

                        </div>

                    </div>

                </div>

                
            </section>

            <section>
                <div className="mb-9">
                    <div className="flex justify-content ml-10  items-center gap-3">
                        <BookAlert className="
                                    size-11
                                    sm:size-12
                                    shrink-0
                                    text-white
                                    rounded-full
                                    bg-blue-500
                                    p-3
                                    
                             " />
                        <div>
                            <h2 className="font-bold">Topics</h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">Explore the key topics within this major area</p>
                        </div>
                    </div>

                    <TopicArea />
                    {/* <StudyMaterial /> */}
                </div>
            </section>
        </>
    );
};

export default AreaDetails;