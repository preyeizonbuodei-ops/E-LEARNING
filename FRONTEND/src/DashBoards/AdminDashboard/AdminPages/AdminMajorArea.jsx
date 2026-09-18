import departments from "../../../Departments/departmentData";
import { Building2, Plus, BoxIcon } from "lucide-react";
const AdminMajorArea = () => {

    const department = departments.find(
        (majorarea) => majorarea.id
    );

    const Areas = department.majorArea;

    return (
        <>
            
        
            <main className="p-4">
                <section className='ml-3 md:flex md:justify-between md:mt-4 md:mr-3 md:ml-3'>
                <div>
                    <h1 className='font-bold text-blue-950'>Admin Dashboard</h1>
                    <p className='text-gray-400 text-[13px]'>Manage departments, major areas, topics, and learning materials</p>
                </div>
                    
                <div>
                    <button className='items-center flex py-2 px-3 bg-blue-700 md:py-1 md:px-6 text-white rounded-lg'><Plus /> Add Major Area </button>
                </div>
            </section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {Areas.map((area) => (
                        <div
                            key={area.name}
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <img
                                    className="h-40 w-full object-cover"
                                    src={area.image}
                                    alt={area.name}
                                />

                                <div className="px-3 pt-4">
                                    <h1 className="font-bold text-blue-950 text-[18px]">
                                        {area.name}
                                    </h1>

                                    <p className="text-[12px] text-gray-500 mt-2">
                                        {area.description}
                                    </p>
                                </div>

                                <div className="flex gap-2 justify-between px-3 py-4">
                                    <button className="rounded hover:bg-blue-700 cursor-pointer bg-blue-600 px-3 py-1 text-sm text-white">
                                        Edit
                                    </button>

                                    <button className="rounded hover:bg-red-700 cursor-pointer bg-red-600 px-3 py-1 text-sm text-white">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </main>
    </>
    );
};

export default AdminMajorArea;