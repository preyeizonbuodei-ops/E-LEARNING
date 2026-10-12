const Joi = require("joi");

const majorAreaTopicValidation = Joi.object({
    majorArea: Joi.string()
        .hex()
        .length(24)
        .required(),

    title: Joi.string()
        .trim()
        .required(),

    description: Joi.string()
        .trim()
        .required(),

    content: Joi.string()
        .required(),

    examples: Joi.string()
        .allow("")
        .optional(),

    videos: Joi.array()
        .items(
            Joi.object({
                title: Joi.string().trim().optional(),
                url: Joi.string().uri().optional(),
            })
        )
        .optional(),

    materials: Joi.array()
        .items(
            Joi.object({
                title: Joi.string().trim().optional(),
                url: Joi.string().uri().optional(),
            })
        )
        .optional(),
});

module.exports = majorAreaTopicValidation;