
import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:8000/api/v1/users";

axios.defaults.withCredentials = true;

const useSavedMaterialStore = create((set) => ({
    // State
    savedMaterials: [],
    loading: false,
    saving: false,
    deleting: false,
    error: null,
    message: null,

    // Save a material
    saveMaterial: async (materialData) => {
        set({
            saving: true,
            error: null,
            message: null,
        });

        try {
            const response = await axios.post(
                `${API_URL}/save-material`,
                materialData
            );

            set((state) => {
                const savedMaterial = response.data.savedMaterial;

                // Avoid adding a duplicate if the API returns an existing item.
                const alreadyExists = savedMaterial
                    ? state.savedMaterials.some(
                          (material) =>
                              material._id === savedMaterial._id
                      )
                    : false;

                return {
                    savedMaterials:
                        savedMaterial && !alreadyExists
                            ? [savedMaterial, ...state.savedMaterials]
                            : state.savedMaterials,
                    saving: false,
                    message:
                        response.data.message ||
                        "Material saved successfully.",
                };
            });

            return {
                success: true,
                data: response.data.savedMaterial,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to save material.";

            set({
                saving: false,
                error: errorMessage,
            });

            return {
                success: false,
                message: errorMessage,
            };
        }
    },

    // Get the logged-in student's saved materials
    getSavedMaterials: async () => {
        set({
            loading: true,
            error: null,
        });

        try {
            const response = await axios.get(
                `${API_URL}/saved-material`
            );

            const savedMaterials =
                response.data.savedMaterials || [];

            set({
                savedMaterials,
                loading: false,
                error: null,
            });

            return {
                success: true,
                data: savedMaterials,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to fetch saved materials.";

            set({
                loading: false,
                error: errorMessage,
            });

            return {
                success: false,
                message: errorMessage,
            };
        }
    },

    // Delete a saved material
    deleteSavedMaterial: async (materialId) => {
        set({
            deleting: true,
            error: null,
            message: null,
        });

        try {
            const response = await axios.delete(
                `${API_URL}/saved-material/${materialId}`,
                {
                    data: { savedMaterialId },
                }
            );

            set((state) => ({
                savedMaterials: state.savedMaterials.filter(
                    (material) =>
                        material._id !== savedMaterialId
                ),
                deleting: false,
                message:
                    response.data.message ||
                    "Material removed successfully.",
            }));

            return { success: true };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to remove saved material.";

            set({
                deleting: false,
                error: errorMessage,
            });

            return {
                success: false,
                message: errorMessage,
            };
        }
    },

    // Clear status messages
    clearStatus: () =>
        set({
            error: null,
            message: null,
        }),
}));

export default useSavedMaterialStore;
