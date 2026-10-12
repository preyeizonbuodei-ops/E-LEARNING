const mongoose = require("mongoose");

const majorAreaTopicSchema = new mongoose.Schema(
    {
        majorArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MajorArea",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        examples: {
            type: String,
            default: "",
        },
        videos: [
            {
                title: {
                    type: String,
                    trim: true,
                },
                url: {
                    type: String,
                    trim: true,
                },
            },
        ],
        materials: [
            {
                title: {
                    type: String,
                    trim: true,
                },
                url: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

majorAreaTopicSchema.index(
    { majorArea: 1, title: 1 },
    { unique: true }
);

module.exports = mongoose.model("MajorAreaTopic", majorAreaTopicSchema);