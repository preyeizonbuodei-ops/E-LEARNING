
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 6,
        max: 20,
        required: true,
    },

    email: {
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

    level: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    matricNumber: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "Student"
    },

    lastLogin: {
        type: Date,
        default: Date.now
    },


    isLoggedIn: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    
    forgotPasswordCode: String,
    forgotPasswordCodeExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);


