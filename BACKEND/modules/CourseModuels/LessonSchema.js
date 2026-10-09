const mongoose = require("mongoose");

const LessonSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    lessonNumber: {
        type: Number,
        required: true
    },

    videoUrl: {
        type: String,
       
    },

    material: {
        type: String
    },

    content: {
        type: String
    }
});

module.exports = mongoose.model("Lesson", LessonSchema);