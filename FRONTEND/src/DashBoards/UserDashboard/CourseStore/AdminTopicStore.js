
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

            return response.data;
        } catch (error) {
            console.log("CREATE TOPIC ERROR:", error.response?.data || error);
            throw error;
        }
    },

    getTopics: async (lessonId) => {
        try {
            const response = await axios.get(
                `${API_URL}/lessons/${lessonId}/topics`
            );

            return response.data;
        } catch (error) {
            console.log("GET TOPICS ERROR:", error.response?.data || error);
            throw error;
        }
    },

    updateTopic: async (topicId, topicData) => {
        try {
            const response = await axios.patch(
                `${API_URL}/topics/${topicId}`,
                topicData
            );

            return response.data;
        } catch (error) {
            console.log("UPDATE TOPIC ERROR:", error.response?.data || error);
            throw error;
        }
    },

    deleteTopic: async (topicId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/topics/${topicId}`
            );

            return response.data;
        } catch (error) {
            console.log("DELETE TOPIC ERROR:", error.response?.data || error);
            throw error;
        }
    }
}));

export default useTopicStore;
