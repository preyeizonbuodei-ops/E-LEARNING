
import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/admin";

axios.defaults.withCredentials = true;

const useLessonStore = create(() => ({
    // Create a lesson
    createLesson: async (lessonData) => {
        try {
            const response = await axios.post(
                `${API_URL}/create-lesson`,
                lessonData
            );

            
            return response.data;
        } catch (error) {
            console.log(
                "CREATE LESSON ERROR:",
                error.response?.data || error
            );
            throw error;
        }
    },

    // Get all lessons
    getLessons: async () => {
        try {
            const response = await axios.get(`${API_URL}/get-lesson`);

            console.log("GET LESSONS RESPONSE:", response.data);
            return response.data;
        } catch (error) {
            console.log(
                "GET LESSONS ERROR:",
                error.response?.data || error
            );
            throw error;
        }
    },

    // Get lessons belonging to a specific course
    getLessonsByCourse: async (courseId) => {
        try {
            const response = await axios.get(
                `${API_URL}/courses/${courseId}/lessons`
            );

            
            return response.data;
        } catch (error) {
            console.log(
                "GET LESSONS BY COURSE ERROR:",
                error.response?.data || error
            );
            throw error;
        }
    },

    // Update a lesson
    updateLesson: async (lessonId, lessonData) => {
        try {
            const response = await axios.patch(
                `${API_URL}/update-lesson/${lessonId}`,
                lessonData
            );

            
            return response.data;
        } catch (error) {
            console.log(
                "UPDATE LESSON ERROR:",
                error.response?.data || error
            );
            throw error;
        }
    },

    // Delete a lesson
    deleteLesson: async (lessonId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/delete-lesson/${lessonId}`
            );

            
            return response.data;
        } catch (error) {
            console.log(
                "DELETE LESSON ERROR:",
                error.response?.data || error
            );
            throw error;
        }
    }
}));

export default useLessonStore;
