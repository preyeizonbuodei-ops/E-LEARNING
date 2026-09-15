const joi = require("joi");

exports.ValidateUser = joi.object({

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

    department: joi.string()
        .required()
        .messages({
            "string.empty": "Please enter a department",
            "any.empty": "Please enter a department",
        }),

    level: joi.number()
        .required()
        .messages({
            "number.empty": "Please enter a level",
            "any.empty": "Please enter a level",
        }),

    matricNumber: joi.string()
    .pattern(/^[A-Z]{3}\/\d{2}\/(MCE|CVE|PGE|EEE|MEE|CME)\/\d{5}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Matric number must be in the format FUO/23/MCE/22934",
    }),

})   

exports.ValidateChangePassword = joi.object({
    oldPassword: joi.string()
        .required()
        .min(5)
        .messages({
            "string.empty": "Password is required",
            "string.password": "please enter a strong password",
            "string.min": "Please password must be stronger than 5 characters",
        }),

    newPassword: joi.string()
        .required()
        .min(5)
        .messages({
            "any.only": "Passwords do not match",
            "string.empty": "Please confirm your password",
        
        }),
})

exports.ValidateComment = joi.object({
    username: joi.string()
    .required()
    .messages({
        "string.empty": "Username is required"
    }),

    comment: joi.string()
    .required()
    .messages({
        "string.empty": "Cannot submit an empty comment"
    })
})