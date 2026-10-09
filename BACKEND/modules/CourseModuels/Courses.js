const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    courseType: {
        type: String,
        enum: ["semester", "general"],
        required: true
    },

    courseScope: {
        type: String,
        enum: ["shared", "department"],
        required: function () {
            return this.courseType === "semester";
        }
    },

    department: {
        type: String,
        trim: true,
        required: function () {
            return (
                this.courseType === "semester" &&
                this.courseScope === "department"
            );
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


courseSchema.index(
    { courseCode: 1, department: 1 },
    {
        unique: true,
        partialFilterExpression: {
            courseScope: "department"
        }
    }
);

module.exports = mongoose.model("Course", courseSchema);