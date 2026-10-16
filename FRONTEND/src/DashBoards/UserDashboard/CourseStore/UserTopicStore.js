import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/users";

axios.defaults.withCredentials = true;

const useTopicStore = create(() => ({
    getTopics: async (lessonId) => {
        try {
            const response = await axios.get(
                `${API_URL}/lessons/${lessonId}/topics`
            );

            

            return response.data;
        } catch (error) {
            console.log(
                "GET TOPICS ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    getTopicById: async (topicId) => {
        try {
            const response = await axios.get(
                `${API_URL}/topics/${topicId}`
            );

            return response.data;
        } catch (error) {
            console.error(
                "GET TOPIC BY ID ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    }
}));

export default useTopicStore;