import axios from "axios";
import { create } from "zustand";

const API_URL = "https://studstore-fullstackstudstore-backend.onrender.com/api/v1/users";

axios.defaults.withCredentials = true;

// Normalize topic IDs whether they are strings or populated objects.
const getTopicId = (material) => {
    const topicId = material?.topicId;
    return String(topicId?._id || topicId || "");
};

const useSavedMaterialStore = create((set, get) => ({
    // State
    savedMaterials: [],
    loading: false,

    saving: false,
    savingMaterialUrl: null,

    deleting: false,
    error: null,
    message: null,

    // Check whether a material is saved for a particular topic.
    isMaterialSaved: (url, topicId) => {
        if (!url || !topicId) return false;

        return get().savedMaterials.some(
            (material) =>
                material.url === url &&
                getTopicId(material) === String(topicId)
        );
    },

    // Save one material.
    saveMaterial: async (materialData) => {
        const materialUrl = materialData?.url;
        const topicId = materialData?.topicId;

        if (!materialUrl || !topicId) {
            return {
                success: false,
                message: "Material URL and topic ID are required.",
            };
        }

        // Prevent duplicate requests for an already-saved material.
        if (get().isMaterialSaved(materialUrl, topicId)) {
            return {
                success: true,
                message: "This material is already saved.",
            };
        }

        set({
            saving: true,
            savingMaterialUrl: materialUrl,
            error: null,
            message: null,
        });

        try {
            const response = await axios.post(
                `${API_URL}/save-material`,
                materialData
            );

            const savedMaterial = response.data.savedMaterial;

            // Update the local state immediately after a successful request.
            if (savedMaterial) {
                set((state) => {
                    const alreadyExists = state.savedMaterials.some(
                        (material) =>
                            material.url === savedMaterial.url &&
                            getTopicId(material) === getTopicId(savedMaterial)
                    );

                    return {
                        savedMaterials: alreadyExists
                            ? state.savedMaterials
                            : [savedMaterial, ...state.savedMaterials],
                    };
                });
            }

            set({
                saving: false,
                savingMaterialUrl: null,
                message:
                    response.data.message || "Material saved successfully.",
            });

            // Fetch the latest saved records from the backend.
            const refreshResult = await get().getSavedMaterials();

            // If refreshing fails, retain the record added locally above.
            if (!refreshResult.success) {
                console.warn(
                    "Material was saved, but refreshing the saved list failed:",
                    refreshResult.message
                );
            }

            return {
                success: true,
                data: savedMaterial,
                message:
                    response.data.message || "Material saved successfully.",
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Failed to save material.";

            set({
                saving: false,
                savingMaterialUrl: null,
                error: errorMessage,
            });

            return {
                success: false,
                message: errorMessage,
            };
        }
    },

    // Fetch the logged-in student's saved materials.
    getSavedMaterials: async () => {
        set({
            loading: true,
            error: null,
        });

        try {
            const response = await axios.get(
                `${API_URL}/saved-material`
            );

            const savedMaterials = Array.isArray(
                response.data.savedMaterials
            )
                ? response.data.savedMaterials
                : [];

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
                error.message ||
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

    // Delete one saved material.
    deleteSavedMaterial: async (materialId) => {
        if (!materialId) {
            return {
                success: false,
                message: "Material ID is required.",
            };
        }

        set({
            deleting: true,
            error: null,
            message: null,
        });

        try {
            const response = await axios.delete(
                `${API_URL}/saved-material/${materialId}`
            );

            set((state) => ({
                savedMaterials: state.savedMaterials.filter(
                    (material) => material._id !== materialId
                ),
                deleting: false,
                message:
                    response.data.message || "Material removed successfully.",
            }));

            return {
                success: true,
                message:
                    response.data.message || "Material removed successfully.",
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
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

    // Clear status messages.
    clearStatus: () =>
        set({
            error: null,
            message: null,
        }),
}));

export default useSavedMaterialStore;