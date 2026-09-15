const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    comment: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Comment", CommentSchema)