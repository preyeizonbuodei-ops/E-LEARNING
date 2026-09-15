import departments from "../Departments/departmentData";
import { useParams } from "react-router-dom";
import { ArrowRight, BookOpenText } from "lucide-react";
const TopicArea = () => {
    const { departmentId, areaId } = useParams();

    const department = departments.find(
        (dept) => dept.id === departmentId
    );

    const area = department.majorArea.find(
        (area) => area.id === areaId
    );

    const topics = area.topics;

    return (
        <>
        <div className="mr-3 ml-3 md:mr-23 md:ml-23 mt-2">
            <div className="flex flex-wrap justify-between">
                <p className="text-gray-600 font-bold">Contents</p>
                 <a className="text-blue-500 flex gap-3 items-center" href="#">See More <ArrowRight className="size-4"/> </a>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 w-full  md:gap-3 mt-3">
                {topics.slice(0,4).map((topic) => (
                    <h1 className=" shadow-[0_2px_12px_rgba(0,0,0,0.14)] py-6  rounded-lg text-gray-800  flex flex-col justify-center items-center lg:flex gap-3 lg:items-center lg:justify-center " key={topic.id}><BookOpenText className="text-blue-500 size-9 lg:size-12"/> {topic.title} <a className="text-blue-500 font-small text-[14px] flex items-center gap-3" href="/departments/${department.id}/${area.id}/${topic.id}/${material.id}">Study <ArrowRight className="size-4"/> </a> </h1>
                 ))} 
                 
            </div>
        </div>
            
        </>
    );
};

export default TopicArea;