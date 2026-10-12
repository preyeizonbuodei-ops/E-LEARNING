import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/admin";
const DEPARTMENT_URL = "http://localhost:8000/api/v1/admin";

axios.defaults.withCredentials = true;

export const useAdminMajorAreaStore = create((set) => ({
    majorAreas: [],
    departments: [],
    isLoading: false,
    error: null,

    // Get departments for the admin dropdown
    getDepartments: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(
                `${DEPARTMENT_URL}/get-department`
            );

            set({
                departments: response.data.departments,
                isLoading: false,
            });

            return response.data.departments;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Failed to retrieve departments",
            });

            throw error;
        }
    },

    // Create a major area
    createMajorArea: async (majorAreaData) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${API_URL}/create-major-area`,
                majorAreaData
            );

            set((state) => ({
                majorAreas: [
                    ...state.majorAreas,
                    response.data.majorArea,
                ],
                isLoading: false,
            }));

            return response.data;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Failed to create major area",
            });

            throw error;
        }
    },

    // Get major areas, optionally filtered by department
    getMajorAreas: async (departmentId) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(`${API_URL}/major-areas`, {
                params: departmentId ? { departmentId } : {},
            });

            set({
                majorAreas: response.data.majorAreas,
                isLoading: false,
            });

            return response.data.majorAreas;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Failed to retrieve major areas",
            });

            throw error;
        }
    },
}));