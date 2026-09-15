const joi = require('joi');

exports.ValidateAdmin = joi.object({

    username: joi.string()
        .required()
        .min(5)
        .max(59)
        .message({
            "string.empty": "Username is required",
            "string.min": "Username must be more than 5 characters",
            "string.max": "Username must not be grater or longer than 59 characters",
            "any.required": "username is required",
        }),

    email: joi.string()
        .required()
        .email()
        .allow(".com", ".net")
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid emial",
            "any.empty": "Email must not be empty",
        }),

    password: joi.string()
        .required()
        .min(5)
        .messages({
            "string.empty": "Password is required",
            "string.password": "please enter a strong password",
            "string.min": "Please password must be stronger than 5 characters",
        }),

    confirmPassword: joi.string()
        .valid(joi.ref("password"))
        .messages({
            "any.only": "Passwords do not match",
            "string.empty": "Please confirm your password",
            "any.required": "Please confirm your password",
        }),
})
        