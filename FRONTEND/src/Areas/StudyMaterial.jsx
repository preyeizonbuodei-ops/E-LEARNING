import { useParams } from "react-router-dom";
import departments from "../Departments/departmentData";

const StudyMaterial = () => {
    const { departmentId, areaId, topicId, materialId } = useParams();

    const department = departments.find(
        (dept) => dept.id === departmentId
    );

    const area = department.majorArea.find(
        (area) => area.id === areaId
    );

    const topic = area.topics.find(
        (topic) => topic.id === topicId
    );

    console.log("departmentId:", departmentId);
    console.log("areaId:", areaId);
    console.log("topicId:", topicId);
    console.log("materialId:", materialId);

    console.log("department:", department);
    console.log("area:", area);
    console.log("topic:", topic);
    console.log("topicId from URL:", topicId);
    console.log("available topics:", area.topics);
    const material = topic.materials.find(
        (material) => material.id === materialId
    );

    return (
        <div>
            <h1>{material.title}</h1>
            <p>{material.type}</p>

            <a href={material.url}>
                Open Material
            </a>
        </div>
    );
};

export default StudyMaterial;