
const Joi = require("joi");

const departmentValidation = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),

    description: Joi.string().trim().min(10).max(1000).required(),

    history: Joi.string().trim().min(10).max(5000).required(),

    image: Joi.string().trim().allow("").optional(),
});

module.exports = departmentValidation;
