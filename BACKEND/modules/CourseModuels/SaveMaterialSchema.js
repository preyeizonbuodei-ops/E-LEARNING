
const mongoose = require("mongoose");

const SavedMaterialSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        resourceType: {
            type: String,
            enum: ["material", "video", "resource"],
            default: "material",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent a student from saving the same URL
// for the same topic more than once.
SavedMaterialSchema.index(
    {
        studentId: 1,
        topicId: 1,
        url: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "SavedMaterial",
    SavedMaterialSchema
);
