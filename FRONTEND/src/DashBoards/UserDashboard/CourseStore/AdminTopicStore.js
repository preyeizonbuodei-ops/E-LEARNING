import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/admin";

axios.defaults.withCredentials = true;

const useTopicStore = create(() => ({
    createTopic: async (lessonId, topicData) => {
        try {
            const response = await axios.post(
                `${API_URL}/lessons/${lessonId}/topics`,
                topicData
            );

            console.log("CREATE TOPIC RESPONSE:", response.data);

            return response.data;
        } catch (error) {
            console.log(
                "CREATE TOPIC ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    },

    getTopics: async (lessonId) => {
        try {
            const response = await axios.get(
                `${API_URL}/lessons/${lessonId}/topics`
            );

            console.log("GET TOPICS RESPONSE:", response.data);

            return response.data;
        } catch (error) {
            console.log(
                "GET TOPICS ERROR:",
                error.response?.data || error
            );

            throw error;
        }
    }
}));

export default useTopicStore;