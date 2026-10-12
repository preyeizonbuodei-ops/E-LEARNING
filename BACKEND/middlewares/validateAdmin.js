
const Joi = require("joi");

const ValidateAdmin = Joi.object({
    username: Joi.string()
        .trim()
        .min(5)
        .max(59)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min": "Username must be at least 5 characters",
            "string.max": "Username must not exceed 59 characters",
            "any.required": "Username is required",
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(8)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "any.required": "Password is required",
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "string.empty": "Please confirm your password",
            "any.only": "Passwords do not match",
            "any.required": "Please confirm your password",
        }),
});

exports.ValidateAdmin = ValidateAdmin;
