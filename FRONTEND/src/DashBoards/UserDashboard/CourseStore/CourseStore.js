import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/user";

axios.defaults.withCredentials = true;

const createCourseStore = create(() => ({
    addcourse: async (
        courseType,
        department,
        level,
        courseTitle,
        courseCode,
        semester,
        description
    ) => {
        try {
            const response = await axios.post(
                `${API_URL}/create-course`,
                {
                    courseType,
                    department,
                    level,
                    courseTitle,
                    courseCode,
                    semester,
                    description
                }
            );

            console.log("BACKEND RESPONSE:", response.data);

            return response.data;

        } catch (error) {
            console.log("CREATE COURSE ERROR:", error.response?.data || error);

            throw error;
        }
    }
}));

export default createCourseStore;