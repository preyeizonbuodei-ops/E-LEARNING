
const Joi = require("joi");

exports.ValidateCourse = Joi.object({
    courseType: Joi.string()
        .valid("semester", "general")
        .required()
        .messages({
            "string.empty": "Course type is required",
            "any.required": "Course type is required"
        }),

    courseScope: Joi.string()
        .valid("shared", "department")
        .when("courseType", {
            is: "semester",
            then: Joi.required(),
            otherwise: Joi.optional()
        }),

    department: Joi.string()
        .trim()
        .allow("")
        .when("courseScope", {
            is: "department",
            then: Joi.required(),
            otherwise: Joi.optional()
        }),

    level: Joi.string()
        .when("courseType", {
            is: "semester",
            then: Joi.required(),
            otherwise: Joi.optional()
        }),

    semester: Joi.string()
        .valid("first", "second")
        .when("courseType", {
            is: "semester",
            then: Joi.required(),
            otherwise: Joi.optional()
        }),

    courseTitle: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Course title is required",
            "any.required": "Course title is required"
        }),

    courseCode: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Course code is required",
            "any.required": "Course code is required"
        }),

    description: Joi.string()
        .allow("")
        .optional()
});
