const express = require('express');
const User = require('../modules/registerSchema');
const { ValidateComment } = require('../middlewares/validate');
const Comment = require('../modules/comment');

exports.CreateComment = async( req, res ) => {
    try {
        const { comment } = req.body;

    
        const newComment = await Comment.create({
            comment,
            user: req.user._id
        })

        await newComment.save()
        res.status(200).json({success: true, message: "your comment was sent successfuly" })

    } catch (error) {
        console.log(error)
    }
}

exports.GetAllComments = async( req, res ) => {
    try {
        
        const getAllComments = await Comment.find();

        return res.status(200).json({ success: true, message: `${getAllComments}` })

    } catch (error) {
        console.log(error)
    }
}


exports.GetOneCommnet = async( req, res ) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        res.status(200).json({ success: true, message: comment })
    } catch (error) {
        console.log(error)
    }
}

exports.UpdateComment = async ( req, res ) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndUpdate(id, req.body); 

        if(!comment) {
            return res.status(404).json({ success: false, message: `no comment found ${id}` })
        }

        res.status(200).json({ success: true, message: "Comment Updated successfuly" })
    } catch (error) {
        console.log(error)
    }
}

exports.DeleteComment = async(req, res) => {
    try {
        const deleteComment = await Comment.fineByIdAndDelete(id);

        if(!deleteComment) {
            return res.status(404).json( {success: false, message: "This comment has been deleted" })
        };

        res.status(200).josn({ success: true, message: `deleted successfuly`})
        
    } catch (error) {
        console.log(error)
    }
}