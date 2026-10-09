import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/users";

axios.defaults.withCredentials = true;

const LessonStore = create(() => ({
    getLesson: async (courseId) => {
        try {
            const response = await axios.get(
                `${API_URL}/courses/${courseId}/lesson`
            );

            console.log("LESSON RESPONSE:", response.data);

            return response.data;
        } catch (error) {
            console.log(
                "GET LESSON ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    }
}));

export default LessonStore;