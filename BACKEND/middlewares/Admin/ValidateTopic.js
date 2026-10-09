const Joi = require("joi");

const TopicValidation = Joi.object({
    lessonId: Joi.string()
        .required()
        .messages({
            "string.empty": "Lesson ID is required",
            "any.required": "Lesson ID is required"
        }),

    topicNumber: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Topic number must be a number",
            "number.integer": "Topic number must be an integer",
            "number.positive": "Topic number must be greater than 0",
            "any.required": "Topic number is required"
        }),

    title: Joi.string()
        .trim()
        .min(2)
        .required()
        .messages({
            "string.empty": "Topic title is required",
            "string.min": "Topic title must be at least 2 characters",
            "any.required": "Topic title is required"
        }),

    content: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Topic content is required",
            "any.required": "Topic content is required"
        }),

    examples: Joi.string()
        .trim()
        .allow("")
        .optional(),

    videos: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .trim()
                    .required(),

                url: Joi.string()
                    .uri()
                    .required()
            })
        )
        .optional(),

    materials: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .trim()
                    .required(),

                url: Joi.string()
                    .uri()
                    .required()
            })
        )
        .optional(),

    resources: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .trim()
                    .required(),

                url: Joi.string()
                    .uri()
                    .required()
            })
        )
        .optional()
});

module.exports = TopicValidation;