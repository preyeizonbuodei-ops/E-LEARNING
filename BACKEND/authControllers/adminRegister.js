const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const {ValidateAdmin}  = require('../middlewares/validateAdmin');
const  Admin = require('../modules/adminSchema');
const bcrypt = require('bcrypt');
const { ValidateChangePassword } = require('../middlewares/validate');
const transport = require('../middlewares/sendMail');
const { hmacProcess } = require('../utils/hashing');



exports.AdminLoginIn = async( req,res ) => {
    try {
        // accepts inputs from the user
        const { email, username, password, confirmPassword } = req.body;

        // validate the users inputs
        const { error } = await ValidateAdmin.validate( email, username, password, confirmPassword );

        if(error) {
            return res.status(401).json({ success: true, message: "Invalid Credentials" })
        };

        // check if there is an already existingUser
        const existingUser = await Admin.findOne( {email});

        if(existingUser) {
            return res.status(409).jsom({ success: false, message: "User already exists with this email" })
        };

        // checks if the password and the confirmPassword matches
        if(password !== confirmPassword) {
            return res.status(409).json({ success: false, message: "password dosen't match" });
        };

        // hash the password passed by the user to save in the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Creates a verification Code to send to to the email
        const verificationCode  = Math.floor(100000 + Math.random() * 900000).toString();
        
        // sets an expirery time for the code
        const verificationCodeExpiresAt = Date.now() + 24 * 60 *60 *1000;

        const newUser = new Admin ({
            username,
            password: hashedPassword,
            email,
            role,
            isVerified,
            verificationCode,
            verificationCodeExpiresAt
        });

        // sends the verification mail to the provided email by the user.
        const sendMail = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: newUser.email,
            subject: "Email Verification Code",
            html: `<h1>${verificationCode}</h1>`
        })
        
        // Check if the mail was successfully sent.
        if(sendMail.accepted[0] === newUser.email) {
            const hashedCodeValue = hmacProcess(verificationCode, process.env.HMAC_VERIFICATION_CODE_SECRET)
            const verificationCode = hashedCodeValue;

        }

        // saves the new user
        await newUser.save()
        res.status(201).json({ success: true, message: "Your Account has been created successfully, Check Email for verification code" })
    } catch (error) {
        console.log(error)
    }

}


exports.verifyVerificationCode = async( req, res ) => {

    try {
        const { email, sentCode } = req.body;

        const existingUser = await Admin.findOne({ email });
        if(!existingUser) {
            return res.status(400).json({ success: false, messasge: "No User found" });
        };

        // checks if the user is aready a verified user
        if(existingUser.isVerified) {
            return res.status(409).json({ success: false, message: "You are already a verified User" })
        }

        // hash the sent code the user sends
        const hashedCodeValue = hmacProcess(
            String(sentCode).trim(), 
            process.env.HMAC_VERIFICATION_CODE_SECRET);

        // check if code the user sent matches with the stored Value
        if(hashedCodeValue !== verificatonCode) {
            return res.status(400).json({ success: false, message: " Incorrect Verification Code " });
        };

        // if the token has expired
        if(Date.now() > existingUser.verificationCodeExpiresAt) {
            return res.status(400).json({ sucess: false, message: "Verification Code Expired" })
        }

        // creates a token for the user
        const token = await jwt.sign({
            id: existingUser._id,
            email: exisingUser.email
        }, 
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // sends the cookie to the user
        res.cookie("authorization", `Bearer ${token}`, {
            htmlOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1  * 24 * 60 * 60 * 1000
        });

        // saves the user
        await existingUser.save();
        res.status(200).json({ success: true, message: `Your accoun has been verified. here is your token ${token}` });
        console.log(`here is your token ${token}`)

        existingUser.isVerified = true;
        existingUser.isLoggedIn = true;
        existingUser.verificationCode = undefined;
        existingUser.verificationCodeExpiresAt = undefined;

    } catch (error) {
        console.log(error)
    }
}

exports.ChangePassword = async ( req, res ) => {
    try {
        
        const { oldPassword, newPassword } = req.body;

        

    } catch (error) {
        console.log(error)
    }
}