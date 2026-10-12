
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 59,
        },

        password: {
            type: String,
            required: true,
        },

        // Used to confirm the password during registration.
        // Do not rely on this field after registration.
        confirmPassword: {
            type: String,
            select: false,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        key: {
            type: String,
            select: false,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        isLoggedIn: {
            type: Boolean,
            default: false,
        },

        lastLoggedIn: {
            type: Date,
            default: Date.now,
        },

        role: {
            type: String,
            enum: ["Admin"],
            default: "Admin",
        },

        verificationToken: {
            type: String,
            select: false,
        },

        verificationTokenExpiresAt: {
            type: Date,
            select: false,
        },

        // Retained for compatibility with your existing auth features.
        verifyVerificationCode: {
            type: String,
            select: false,
        },

        verificationValue: {
            type: String,
            select: false,
        },

        verificationValueValidation: {
            type: String,
            select: false,
        },

        resetPasswordValue: {
            type: String,
            select: false,
        },

        resetPasswordValueExpiresAt: {
            type: Date,
            select: false,
        },

        newPass: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminSchema);
