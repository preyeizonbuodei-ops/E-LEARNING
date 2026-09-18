const joi = require('joi');

exports.ValidateCourse = joi.object({
    
    courseType: joi.string()
    .messages({
        "string.empty": "Course type is required"
    }),

    department: joi.string().when("courseType", {
        is: "semester",
        then: joi.required(),
        otherwise: joi.optional()
    }),

    level: joi.string().when("courseType", {
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
    
    courseTitle: joi.string().when("courseType", {
        is: "semester",
        then: joi.required(),
        otherwise: joi.optional()
    }),

    courseCode: joi.string().when("courseType", {
        is: "semester",
        then: joi.required(),
        otherwise: joi.optional()
    }),

    description: joi.string()
    .allow("")
    .optional()
})