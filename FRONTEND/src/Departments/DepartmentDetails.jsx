import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AreaDetails from "../Areas/AreaDetails";
import departments from "./departmentData";
import { ArrowLeft } from "lucide-react";

const DepartmentDetails = () => {
    const { departmentId } = useParams();

    const department = departments.find(
        (dept) => dept.id === departmentId
    );

    if (!department) {
        return (
            <div className="flex min-h-screen items-center justify-center px-5">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Department not found
                </h1>
            </div>
        );
    }

    return (
        <>
            
            <section>
                <div className="relative min-h-[85vh] sm:min-h-screen w-full overflow-hidden">

                    {/* BACKGROUND IMAGE */}
                    <img
                        src={department.image}
                        alt={department.name}
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                
                    <div className="
                        absolute
                        inset-0
                        bg-linear-to-r
                        from-black
                        via-black/70
                        to-black/30
                    "></div>

                  
                    <div className="relative z-30">
                        <Navbar />
                    </div>

                   
                    <header
                        className="
                            relative
                            z-20
                            flex
                            min-h-[calc(85vh-80px)]
                            sm:min-h-[calc(100vh-80px)]
                            flex-col
                            justify-center
                            px-5
                            sm:px-8
                            md:px-12
                            lg:px-20
                            text-white
                        "
                    >

                        
                        <a
                            href="/department"
                            className="
                                flex
                                items-center
                                gap-2
                                text-gray-300
                                hover:text-white
                                transition
                                duration-300
                                w-fit
                                mb-4
                                text-sm
                                sm:text-base
                            "
                        >
                            <ArrowLeft size={18} />
                            Back to Department
                        </a>

                       
                        <h1
                            className="
                                font-bold
                                text-3xl
                                sm:text-4xl
                                md:text-5xl
                                lg:text-6xl
                                xl:text-7xl
                                leading-tight
                                max-w-4xl
                            "
                        >
                            {department.name}
                        </h1>

                        
                        <p
                            className="
                                mt-4
                                text-sm
                                sm:text-base
                                md:text-lg
                                text-gray-200
                                leading-7
                                max-w-xl
                            "
                        >
                            {department.description}
                        </p>

                    </header>
                </div>
            </section>


          
            <main
                className="
                    shadow-[0_2px_12px_rgba(0,0,0,0.12)]
                    mx-4
                    sm:mx-6
                    md:mx-10
                    lg:mx-16
                    xl:mx-26
                    mt-6
                    sm:mt-8
                    p-5
                    sm:p-7
                    lg:p-8
                    rounded-lg
                "
            >

                <h1
                    className="
                        text-2xl
                        sm:text-3xl
                        font-semibold
                        mb-4
                    "
                >
                    About {department.name}
                </h1>

                <p
                    className="
                        leading-7
                        sm:leading-8
                        text-gray-400
                        mb-4
                        text-sm
                        sm:text-base
                    "
                >
                    {department.description}
                </p>

                <p
                    className="
                        text-gray-500
                        leading-7
                        text-sm
                        sm:text-base
                    "
                >
                    <span
                        className="
                            font-bold
                            text-base
                            sm:text-lg
                            text-black
                        "
                    >
                        History Of {department.name}:
                    </span>{" "}
                    {department.history}
                </p>

                <a
                    className="
                        inline-block
                        mt-3
                        text-blue-500
                        hover:text-blue-700
                        transition
                    "
                    href="#"
                >
                    Read more...
                </a>

            </main>


           
            <section className="mt-8 sm:mt-10">

                <h1
                    className="
                        text-2xl
                        sm:text-3xl
                        font-semibold
                        mx-4
                        sm:mx-6
                        md:mx-10
                        lg:mx-16
                        xl:mx-23
                        mb-5
                    "
                >
                    Major Areas
                </h1>

                {/* THIS DISPLAYS THE AREAS */}
                <AreaDetails department={department} />

            </section>
        </>
    );
};

export default DepartmentDetails;