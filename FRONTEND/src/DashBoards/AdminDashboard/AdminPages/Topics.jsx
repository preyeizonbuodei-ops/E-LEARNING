import departments from "../../../Departments/departmentData";
import { Plus } from "lucide-react";

const Topics = () => {
    return (
        <>
            <section className="ml-3 md:flex md:justify-between md:mt-4 md:mr-3">
                <div>
                    <h1 className="font-bold text-blue-950">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-400 text-[13px]">
                        Manage departments, major areas, topics, and learning
                        materials
                    </p>
                </div>

                <div className="flex justifity-center items-center gap-3">
                    <div className="border border-blue-700">
                            <input  type="search" />
                        <button className="bg-blue-500 px-3 text-white" type="submit">
                            Search
                        </button>
                        
                    </div>
                    

                    <button className="items-center flex gap-2 py-2 px-3 bg-blue-700 md:py-1 md:px-6 text-white rounded-lg">
                        <Plus size={18} />
                        Add Topic
                    </button>
                </div>
            </section>

            <main className="mt-6 mx-3 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b text-left text-sm text-gray-500">
                            <th className="p-3">Topics</th>
                            <th className="p-3">Major Area</th>
                            <th className="p-3">Department</th>
                            <th className="p-3">Materials</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.map((department) =>
                            department.majorArea.map((area) =>
                                area.topics.map((topic) => (
                                    <tr
                                        key={topic.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3 font-medium text-blue-950">
                                            {topic.name}
                                        </td>

                                        <td className="p-3 text-gray-600">
                                            {area.name}
                                        </td>

                                        <td className="p-3 text-gray-600">
                                            {department.name}
                                        </td>

                                        <td className="p-3 text-gray-600">
                                            {topic.materials?.length || 0}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <button className="rounded hover:bg-blue-700 cursor-pointer bg-blue-600 px-3 py-1 text-sm text-white">
                                                    Edit
                                                </button>

                                                <button className="rounded hover:bg-red-700 cursor-pointer bg-red-600 px-3 py-1 text-sm text-white">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default Topics;