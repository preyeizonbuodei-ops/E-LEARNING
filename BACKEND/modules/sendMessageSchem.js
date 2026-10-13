const mongoose = require('mongoose');

const sendMessageSchema = new mongoose.Schema({
    name: {
        trim: true,
        required: true,
    },

    email: {
        required: true,
    },

    subject: {
        required: true,
        trim: true
    },

    message: {
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("UserEmail", sendMessageSchema)