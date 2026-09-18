const express = require('express');
const User = require ('../modules/registerSchema')

exports.GetCurrentUser = async( req, res ) => {
    try {
        const currentLoggedin = await User.findById(req.user.id)

        if(!currentLoggedin) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, user: currentLoggedin })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}