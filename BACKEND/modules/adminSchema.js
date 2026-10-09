const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    
    confirmPassword: {
        type: String, 
    },

    email: {
        type: String, 
        required: true
    },
    verificationToken: {
        type: String
    },

    key: {
        type: String,
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },

    isLoggedIn: {
        type: Boolean,
        default: false
    },

    lastLoggedIn: {
        type: "Date",
        default: Date.now,
    },

    role: {
        type: String,
        default: 'Admin'
    },

    verificationCode:{
        type: "String",
    },

    verifyVerificationCode: {
        type: String,
    },

    verificationCodeExpiresAt: {
        type: "Date"
    },

    verificationValue: {
        type: String
    },
    verificationValueValidation: {
        type: String
    },


    resetPasswordValue: String,
    resetPasswordValueExpiresAt: Date,
    newPass: String
}, {timestamps: true})

module.exports = mongoose.model("Admin", adminSchema)