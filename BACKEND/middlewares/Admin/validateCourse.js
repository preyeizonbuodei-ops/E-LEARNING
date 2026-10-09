const joi = require("joi");

exports.ValidateCourse = joi.object({

    courseType: joi.string()
        .valid("semester", "general")
        .required()
        .messages({
            "string.empty": "Course type is required",
            "any.required": "Course type is required"
        }),

    courseScope: joi.string()
        .valid("shared", "department")
        .when("courseType", {
            is: "semester",
            then: joi.required(),
            otherwise: joi.optional()
        }),

    department: joi.string()
        .allow("")
        .when("courseScope", {
            is: "department",
            then: joi.required(),
            otherwise: joi.optional()
        }),

    level: joi.string()
        .when("courseType", {
            is: "semester",
            then: joi.required(),
            otherwise: joi.optional()
        }),

    semester: joi.string()
        .valid("first", "second")
        .when("courseType", {
            is: "semester",
            then: joi.required(),
            otherwise: joi.optional()
        }),

    courseTitle: joi.string()
        .required(),

    courseCode: joi.string()
        .required(),

    description: joi.string()
        .allow("")
        .optional()
});