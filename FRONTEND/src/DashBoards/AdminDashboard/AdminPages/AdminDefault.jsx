import { Pen, Plus, Trash } from "lucide-react";
import { useState } from "react";

import departments from "../../../Departments/departmentData";
import AdminData from '../AdminPages/AdminDataArea'

const AdminMainContent = () => {
    const [active, setActive] = useState("mechatronics-engineering");

    const selectedDepartment =
        departments.find(
            (department) => department.id === active
        ) || departments[0];

    const totalTopics = selectedDepartment.majorArea.reduce(
        (total, area) => total + area.topics.length,
        0
    );

    return (

        <>

          <AdminData />
            <aside className="grid grid-cols-[1fr_4fr] gap-6 bg-gray-50 min-h-screen p-5">

                {/* LEFT */}
                <div className="bg-white rounded-xl p-5 h-fit border border-gray-100 shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h1 className="font-bold text-gray-800">
                                Departments
                            </h1>

                            <p className="text-[11px] text-gray-400 mt-1">
                                Select a department
                            </p>
                        </div>

                        <a
                            className="text-blue-500 text-xs font-medium hover:text-blue-700"
                            href="#"
                        >
                            View all
                        </a>
                    </div>

                    {departments.map((department) => {

                        const departmentTopics =
                            department.majorArea.reduce(
                                (total, area) =>
                                    total + area.topics.length,
                                0
                            );

                        return (
                            <div
                                key={department.id}
                                onClick={() => setActive(department.id)}
                                className={`mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                                    active === department.id
                                        ? "bg-blue-50 border-blue-200"
                                        : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                                }`}
                            >
                                <h2
                                    className={`font-semibold text-[13px] ${
                                        active === department.id
                                            ? "text-blue-600"
                                            : "text-gray-800"
                                    }`}
                                >
                                    {department.name}
                                </h2>

                                <div className="flex gap-4 mt-1">
                                    <p className="text-[10px] text-gray-500">
                                        {department.majorArea.length} major areas
                                    </p>

                                    <p className="text-[10px] text-gray-500">
                                        {departmentTopics} topics
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>


                    
                {/* RIGHT */}
                <main>
                     
                    {/* Department information */}
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">

                        <div className="flex items-center gap-5">

                            <img
                                className="h-28 w-52 rounded-lg object-cover"
                                src={selectedDepartment.image}
                                alt={selectedDepartment.name}
                            />

                            <div className="flex-1">
                                <h1 className="font-bold text-xl text-gray-800 mb-2">
                                    {selectedDepartment.name}
                                </h1>

                                <p className="text-gray-500 text-xs leading-5 max-w-2xl">
                                    {selectedDepartment.description}
                                </p>

                                <div className="flex gap-5 mt-3">
                                    <span className="text-[11px] text-gray-500">
                                        {selectedDepartment.majorArea.length} Major Areas
                                    </span>

                                    <span className="text-[11px] text-gray-500">
                                        {totalTopics} Topics
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">

                                <button className="flex items-center justify-center text-[10px] border border-blue-500 text-blue-500 rounded-lg px-5 py-2 gap-2 hover:bg-blue-500 hover:text-white transition">
                                    <Pen className="size-3.5" />
                                    Edit
                                </button>

                                <button className="flex items-center justify-center text-[10px] border border-red-500 text-red-500 rounded-lg px-5 py-2 gap-2 hover:bg-red-500 hover:text-white transition">
                                    <Trash className="size-3.5" />
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                    
                    {/* Major Areas heading */}
                    <div className="flex justify-between items-center mt-7 mb-4">

                        <div>
                            <h1 className="font-bold text-gray-800">
                                Major Areas
                            </h1>

                            <p className="text-[11px] text-gray-400 mt-1">
                                Manage the major areas in this department
                            </p>
                        </div>

                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg px-4 py-2 transition">
                            <Plus className="size-4" />
                            Add major area
                        </button>

                    </div>

                    
                    {/* Major Areas */}
                    <div className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-3 gap-4">

                        {selectedDepartment.majorArea.map((majorarea) => (

                            <div
                                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                                key={majorarea.id}
                            >

                                {/* Image */}
                                <div className="relative">

                                    <img
                                        className="h-36 w-full object-cover"
                                        src={majorarea.image}
                                        alt={majorarea.name}
                                    />

                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                                        <p className="text-[10px] font-medium text-gray-600">
                                            {majorarea.topics.length} topics
                                        </p>
                                    </div>

                                </div>


                                {/* Content */}
                                <div className="p-4">

                                    <h2 className="font-bold text-sm text-gray-800 mb-2">
                                        {majorarea.name}
                                    </h2>

                                    <p className="text-[11px] text-gray-500 leading-5 line-clamp-3 min-h-[60px]">
                                        {majorarea.description}
                                    </p>


                                    {/* Actions */}
                                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">

                                        <button className="flex-1 flex items-center justify-center text-[10px] font-medium border border-blue-500 text-blue-500 rounded-lg py-2 gap-2 hover:bg-blue-500 hover:text-white transition">
                                            <Pen className="size-3.5" />
                                            Edit
                                        </button>

                                        <button className="flex-1 flex items-center justify-center text-[10px] font-medium border border-red-500 text-red-500 rounded-lg py-2 gap-2 hover:bg-red-500 hover:text-white transition">
                                            <Trash className="size-3.5" />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </main>

            </aside>
        </>
    );
};

export default AdminMainContent;