const mongoose = require("mongoose");

const majorAreaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        history: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
            trim: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate major-area names within the same department.
majorAreaSchema.index(
    { name: 1, department: 1 },
    { unique: true }
);

module.exports = mongoose.model("MajorArea", majorAreaSchema);