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
        required: true
    },

    email: {
        type: String, 
        required: true
    },
    verificationToken: {
        type: String
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isLoggedIn: {
        type: Boolean,
        default: false
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