import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/admin";

axios.defaults.withCredentials = true;

const useLessonStore = create(() => ({
    createLesson: async (lessonData) => {
        try {
            const response = await axios.post(
                `${API_URL}/create-lesson`,
                lessonData
            );

            console.log("CREATE LESSON RESPONSE:", response.data);

            return response.data;

        } catch (error) {
            console.log(
                "CREATE LESSON ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    getLessons: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/get-lesson`
            );

            console.log("GET LESSONS RESPONSE:", response.data);

            return response.data;

        } catch (error) {
            console.log(
                "GET LESSONS ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    }
}));

export default useLessonStore;