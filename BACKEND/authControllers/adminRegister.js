const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const crypto = require ('crypto')
const {ValidateAdmin}  = require('../middlewares/validateAdmin');
const  Admin = require('../modules/adminSchema');
const bcrypt = require('bcrypt');
// const { ValidateChangePassword } = require('../middlewares/validate');
const transport = require('../middlewares/sendMail');
const { hmacProcess } = require('../utils/hashing');



exports.AdminRegister = async( req, res ) => {
    try {

        
        // accepts inputs from the user
        const { email, username, password, role, confirmPassword, adminKey,  isLoggedIn, isVerified, lastLoggedIn, key } = req.body;

        // validate the users inputs
        const { error } = ValidateAdmin.validate( {email, username, password, confirmPassword } );

        if(error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        };

        // check if there is an already existingUser
        const existingUser = await Admin.findOne( {email});

        if(existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" })
        };

        const ADMIN_KEY = process.env.ADMIN_KEY;

        ;
        if(adminKey !== ADMIN_KEY) {
            return res.status(400).json({ success: false, message: "invalid admin registeration key" })
        }

        // checks if the password and the confirmPassword matches
        if(password !== confirmPassword) {
            return res.status(409).json({ success: false, message: "password dosen't match" });
        };

        // hash the password passed by the user to save in the database
        const hashedPassword = await bcrypt.hash(password, 12);

        // Creates a verification Code to send to to the email
        const  verificationCode  = Math.floor(100000 + Math.random() * 900000).toString();

        const verificationCodeExpiresAt = Date.now() + 24 * 60 *60 *1000;

        const newAdmin = new Admin ({
            username,
            password: hashedPassword,
            email,
            role,
            isVerified,
            isLoggedIn,
            lastLoggedIn,
            verificationCode,
            key,
            verificationCodeExpiresAt
        });

        // sends the verification mail to the provided email by the user.
        const sendMail = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: newAdmin.email,
            subject: "Email Verification Code",
            html: `<h1>${verificationCode}</h1>`
        })
        
        // Check if the mail was successfully sent.
        if(sendMail.accepted[0] === newAdmin.email) {
            const hashedCodeValue = hmacProcess(verificationCode, process.env.HMAC_VERIFICATION_CODE_SECRET)
            newAdmin.verificationCode = hashedCodeValue;

        }


        // saves the new user
        await newAdmin.save()
        res.status(201).json({ success: true, message: "Your Account has been created successfully, Check Email for verification code" })
    } catch (error) {
        console.log(error)
    }

}


exports.adminVerifyVerificationCode = async( req, res ) => {

    try {
        const { email, sentCode } = req.body;
        console.log("VERIFY BODY:", req.body);
        console.log("EMAIL:", email);

        const existingAdmin = await Admin.findOne({ email });

        if(!existingAdmin) {
            return res.status(400).json({ success: false, messasge: "No User found" });
        };

        // checks if the user is aready a verified user
        if(existingAdmin.isVerified) {
            return res.status(409).json({ success: false, message: "You are already a verified User" })
        }

        // hash the sent code the user sends
        const hashedCodeValue = hmacProcess(
            String(sentCode).trim(), 
            process.env.HMAC_VERIFICATION_CODE_SECRET);

        // check if code the user sent matches with the stored Value
        if(hashedCodeValue !== existingAdmin.verificationCode) {
            return res.status(400).json({ success: false, message: " Incorrect Verification Code " });
        };

        // if the token has expired
        if(Date.now() > existingAdmin.verificationCodeExpiresAt) {
            return res.status(400).json({ sucess: false, message: "Verification Code Expired" })
        }

        const adminPasskey = crypto.randomBytes(12).toString('hex');

        

        const sendPasskey = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingAdmin.email,
            subject: "admin Passkey",
            html: `<h2>  Please keep this key secure and don't share to third party </h2>`,
            html: `<h2> ${adminPasskey} </h2>`
        })

        if(sendPasskey.accepted[0] === existingAdmin.email) {
            const hashedPasskey = hmacProcess(adminPasskey, process.env.HMAC_VERIFICATION_CODE_SECRET)
            existingAdmin.key = hashedPasskey;
        }

        existingAdmin.isVerified = true;
        await existingAdmin.save();
        

        return res.status(200).json({
            success: true,
            admin: existingAdmin,
            message: "Email verified successfully. Admin passkey has been sent to your email."
        });
    } catch (error) {
        console.log(error)
    }
}

exports.AdminLogIn = async ( req, res ) => {
    try {

        const { email, password, adminKey } = req.body

        const existingAdmin = await Admin.findOne({ email })

        if(!existingAdmin) {
            return res.status(404).json({ success: false, message: "No Admin found, try again" });
        };

        if(existingAdmin.isLoggedIn) {
            return res.status(409).json({ success: false, message: "You are already Logged in" })
        };

        if(!existingAdmin.isVerified) {
            return res.status(409).json({ success: false, message: "Verify your Account" })
        }

        const compare = await bcrypt.compare(password, existingAdmin.password)

        if(!compare) {
            return res.status(400).json({ success: false, message: "incorrect password" })
        }

    const hashingAdminKey = hmacProcess(String(adminKey).trim(), process.env.HMAC_VERIFICATION_CODE_SECRET);

    if(hashingAdminKey !== existingAdmin.key) {
        return res.status(400).json({ success: false, message: "incorrect Key" })
    };

    const adminToken =  jwt.sign(
        {
        id: existingAdmin._id,
        email: existingAdmin.email,
        role: existingAdmin.role
    }, process.env.JWT_SECRET,
    {
        expiresIn: "4h"
    })
    
    res.cookie("adminAuthorization", `Bearer ${adminToken}`, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === "production",
        maxAge: 4 * 60 * 60 * 1000

    })

    existingAdmin.isLoggedIn = true,
    await existingAdmin.save();

    const loggedInAdmin = existingAdmin.toObject();

    delete loggedInAdmin.password,
    delete loggedInAdmin.adminKey

    res.status(200).json({ success: true, admin: loggedInAdmin, message: "logged in successfully" })
  } catch(error) {
    console.log(error)
  }
}

exports.AdminLogOut = async ( req, res ) => {
    try {
        const adminId = req.admin.id

        const existingAdmin = await  Admin.findById(adminId);

        if(!existingAdmin) {
            return res.status(404).json({ success: false, message: "No Account found" })
        }

        if(!existingAdmin.isLoggedIn) {
            return res.status(400).json({ success: false, message: "You are not loggedin" })
        }
        
        existingAdmin.isLoggedIn = false;
        

        await existingAdmin.save();

        res.clearCookie("adminAuthorization", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        })

        res.status(200).json({ success: true, message: "Logged Out successfully" })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired admin token"
        });
    }
}