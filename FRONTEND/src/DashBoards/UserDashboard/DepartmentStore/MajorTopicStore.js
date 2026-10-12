import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/admin";

export const useAdminMajorAreaTopicStore = create((set) => ({
    majorAreaTopics: [],
    majorAreaTopic: null,
    loading: false,
    error: null,

    createMajorAreaTopic: async (topicData) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.post(
                `${API_URL}/create-major-area-topic`,
                topicData,
                { withCredentials: true }
            );

            set((state) => ({
                majorAreaTopics: [
                    response.data.topic,
                    ...state.majorAreaTopics,
                ],
                loading: false,
            }));

            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to create topic",
                loading: false,
            });

            throw error;
        }
    },

    getAllMajorAreaTopics: async () => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(
                `${API_URL}/get-major-area-topic`,
                { withCredentials: true }
            );

            set({
                majorAreaTopics: response.data.topics,
                loading: false,
            });

            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to get topics",
                loading: false,
            });

            throw error;
        }
    },

    getMajorAreaTopicById: async (majorTopicId) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(
                `${API_URL}/get-major-area-topic/${majorTopicId}`,
                { withCredentials: true }
            );

            set({
                majorAreaTopic: response.data.topic,
                loading: false,
            });

            return response.data;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to get topic",
                loading: false,
            });

            throw error;
        }
    },
}));