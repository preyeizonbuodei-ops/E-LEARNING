const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseType: {
        type: String,
        enum: ["semester", "general"],
        required: true
    },

    department: {
        type: String,
        trim: true,
        required: function () {
            return this.courseType === "semester";
        }
    },

    level: {
        type: String,
        required: function () {
            return this.courseType === "semester";
        }
    },

    courseTitle: {
        type: String,
        required: true,
        trim: true
    },

    courseCode: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: true
    },

    semester: {
        type: String,
        enum: ["first", "second"],
        required: function () {
            return this.courseType === "semester";
        }
    },

    description: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model("Course", courseSchema);