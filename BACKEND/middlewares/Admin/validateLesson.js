const joi = require('joi');

exports.ValidateLesson = joi.object({

    courseId: joi.string()
        .required(),

    title: joi.string()
        .required(),

    lessonNumber: joi.number()
        .required(),

    videoUrl: joi.string()
        .optional(),

    material: joi.string()
        .optional(),

    content: joi.string()
        .optional()

});