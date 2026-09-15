const express = require("express");
const router = require("../authRouters/routes");
const User = require("../modules/registerSchema");
const mongoose = require("mongoose");
const { ValidateUser, ValidateChangePassword } = require("../middlewares/validate");
const bcrypt = require("bcrypt");
const { DoHash } = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const transport = require("../middlewares/sendMail")
const { hmacProcess }  = require('../utils/hashing') 

exports.Register = async (req, res) => {
    try {
        // takes the user inputs
        console.log(req.body);
        const { username, email, password, confirmPassword, matricNumber, level, department, role, lastLogin, isLoggedIn } = req.body;

        // checks if the user inputs are correct
        const  { error } = ValidateUser.validate( {username, email, password, confirmPassword, matricNumber, level, department } );

        if(error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }
        
        // checks if the passwords match
        if(confirmPassword !== password) {
            return res.status(400).json({ success: false, message: "password din't match" });
        }


        // checks if the there is an already exsiting user with the same email
        const check = await User.findOne({ email });

        if (check) {
            return res.status(409).json({
            success: false,
            message: "email already exists. Try another email."
        });
        
    }
        // hashing the password to be stored on the database
        const hashedPassword = await DoHash(password, 10);

            const verificationToken  = Math.floor(100000 + Math.random() * 900000).toString();

            const verificationTokenExpiresAt = Date.now() + 24 * 60 *60 *1000;

        // gives the payload to be saved on the database
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            level, 
            department, 
            matricNumber, 
            role, 
            isLoggedIn,
            lastLogin,
            verificationToken,
            verificationTokenExpiresAt
        })     
    


            const info = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: newUser.email,
            subject: "verification Code",
            html: "<h1>" + verificationToken + "<h1>"
        })

            if(info.accepted[0] === newUser.email) {
                const hashedCodeValue = hmacProcess(verificationToken, process.env.HMAC_VERIFICATION_CODE_SECRET);
                newUser.verificationToken = hashedCodeValue;

            
            }
            await newUser.save() 
            
            res.status(201).json({ success: true, message: `Succesful` })
            
    
    } catch (error) {
        console.log(error);
    

    }
}

exports.verifyVerificationCode = async( req, res ) => {
    try {

        
        
        const { email, verificationCode } = req.body;

        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({ success: false, message: "User not found with this email" });
        };

        if(existingUser.isVerified){
            return res.status(409).json({ success: false, message: "You are already a verified user" });
        };

        const hashedCodeValue = hmacProcess(
            String(verificationCode).trim(),
            process.env.HMAC_VERIFICATION_CODE_SECRET
        );

        if (hashedCodeValue !== existingUser.verificationToken) {
            return res.status(400).json({
                success: false,
                message: "Incorrect verification token"
            });
        }

        if(Date.now() > existingUser.verificationTokenExpiresAt) {
            return res.status(400).json({ success: false, message: "Validation expired" });
        }
        

        existingUser.isVerified = true;

        const token = jwt.sign(
            {id: existingUser._id,
                role: existingUser.role,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("authorization",  `Bearer ${token}`, {
            httpOnly: true,
            sameSite:"Strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        existingUser.isLoggedIn = true;
        existingUser.isVerified = true;
        existingUser.verificationToken = undefined;
        existingUser.verificationTokenExpiresAt = undefined;

        await existingUser.save()
        console.log(existingUser)
        res.status(200).json({ success: true, message: `Logged in successfuly:  this is your token: ${token}`  })
            console.log(`This is your token: ${token}`);

    } catch (error) {
        console.log(error)
    }

    
}


exports.Login = async (req, res) => {
    try {
        
        // takes the required input fields for login 
        const { email, password } = req.body;

        // checks if a user exist using the email
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        };

        // compare the password the user used to create the account and the one he's using to login if they match
        const compare = await bcrypt.compare(password, user.password);

        if(!compare) {
            return res.status(400).json({ success: false, message: "incorrect password" })
        };

        if(!user.isVerified) {
            return res.status(409).json({ success: true, message: "please verity your account before login" })
        }
        
        if(user.isLoggedIn) {
            return res.status(409).json({ success: false, message: "you are already logged In" })
        }
        
        // generate a token for the loged-in user
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role, 
                isVerified: user.isVerified 
            },

                process.env.JWT_SECRET) 
            { 
                expiresIn: "1h"

            };

            res.cookie( "authorization", "Bearer " + token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            });

            user.isLoggedIn = true;
            await user.save();

            res.status(200).json({ success: true, message: `Logged in successfuly:  this is your token: ${token}`  })
            console.log(`This is your token: ${token}`);

    } catch (error) {
        console.log(error);
    }
}

exports.Logout = async (req, res) => {
    try {

        const userId = req.user.id;

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!existingUser.isLoggedIn) {
            return res.status(400).json({
                success: false,
                message: "You are not logged in"
            });
        }

        existingUser.isLoggedIn = false;

        await existingUser.save();

        res.clearCookie("authorization", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "You have logged out successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong during logout"
        });
    }
};


exports.ChangePassword = async( req, res ) => {
    try {

        console.log("REQ.USER:", req.user);
        console.log("REQ.ID:", req._id);
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const checking = await ValidateChangePassword.validate( { oldPassword, newPassword });

        if (checking.error) {
            return res.status(400).json({
                success: false,
                message: checking.error.details[0].message
            });
        }
        
        const existingUser = await User.findById(userId).select(" +password ");

        if(!existingUser) {
            return res.status(404). json({ success: false, message: "No user was found" })
        };

        if(!existingUser.isVerified){
            return res.status(403).json({ success: false, message: "You are not a verified user" })
        };

        
        const result = await bcrypt.compare(oldPassword, existingUser.password)
        if(!result){
            return res.status(401).json({ success: false, message: "invalid credentials" })
        }
        
        const hashedPassword = await DoHash(newPassword, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        res.status(200).json({ success: true, message: "Password updated successfuly" });


         

    } catch (error) {
        console.log(error)
    }
}

exports.ForgotPasswordEmail = async( req, res ) => {

    try {
        
        const { email }= req.body;

        const existingUser = await User.findOne({ email });

        if(!existingUser){
            return res.status(404).json({ success: false, message: `No User found with this email` })
        };

        if(!existingUser.isVerified){
            return res.status(403).json({ success: false, message: "You are not a verifeid user" });
        };

        const forgotPasswordCode  = Math.floor(100000 + Math.random() * 900000).toString();

        const forgotPasswordCodeExpiresAt = Date.now() + 24 * 60 *60 *1000;

        //send the email
        const sendingMail = await transport.sendMail({
            from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to: existingUser.email,
            subject: "Forgot Passord Code",
            html: "<h1>" + forgotPasswordCode + "</h1>"
        })

        if(sendingMail.accepted[0] === existingUser.email) {
            const hashedValue = hmacProcess(forgotPasswordCode, process.env.HMAC_VERIFICATION_CODE_SECRET);
            
            existingUser.forgotPasswordCode = hashedValue;
            existingUser.forgotPasswordCodeExpiresAt = forgotPasswordCodeExpiresAt;

            const verificationToken = jwt.sign({
                user_Id: existingUser._id,
                purpose: "forget-password-user"
            }, process.env.JWT_SECRET , {
                expiresIn: "1h"
            })

            res.cookie("forget-password-user", verificationToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 1 * 60 * 60 * 1000 
            })

            await existingUser.save();
            res.status(200).json({ success: true, message: "Check Email For Reset Password" })
        }
       
    
    } catch (error) {
       console.log(error); 
       return res.status(500).json({ success: false, message: "Something went wrong while sending the reset password code"})
    }

}

exports.VerifyForgotPasswordCode = async( req, res ) => {

    try {
         
        const { providedCodeValue } = req.body;

    
        const verificationToken = req.cookies["forget-password-user"];

        if(!verificationToken) {
            return res.status(401).json({ success: false, message: "Token Expired" })
        }

        const decoded = jwt.verify(
            verificationToken,
            process.env.JWT_SECRET
        );

        if (decoded.purpose !== "forget-password-user") {
            return res.status(403).json({
            success: false,
            message: "Invalid verification session"
        });
    }
        const existingUser = await User.findById(decoded.user_Id);
       
        if(!existingUser){
            return res.status(404).json({ success: false, message: `User not found with this email` })
        };

        if(!existingUser.isVerified){
            return res.status(403).json({ success: false, message: "You are not a verified User" })
        };
        
        
        const hashedCodeValue = hmacProcess(
            String(providedCodeValue).trim(),
            process.env.HMAC_VERIFICATION_CODE_SECRET
        );

        if (hashedCodeValue !== existingUser.forgotPasswordCode) {
            return res.status(400).json({
                success: false,
                message: "Incorrect verification token"
            });
        }

        if(Date.now() > existingUser.forgotPasswordCodeExpiresAt){
            return res.status(400).json({ success: false, message: "Expirerd code" })
        };

        const resetToken = jwt.sign({
            id: existingUser._id,
            purpose: "reset-password"
        }, process.env.JWT_SECRET, 
        {
            expiresIn: '1h'
        })

        res.cookie("reset-password", resetToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 60 * 60 * 1000 
        })

        await existingUser.save();
        res.status(200).json({ success: true, message: `Verification Successful, here is your Token ${resetToken}` })

    } catch (error) {
        console.log(error)
    }

}

exports.ResetPassword = async( req, res ) => {
    try {
        const { password, confirmPassword } = req.body
        const resetToken = req.cookies["reset-password"];

        if(!resetToken) {
            return res.status(401).json({ sccess: false, message: "Token Season Expired" })
        }

        
        
        const decoded = jwt.verify(
            resetToken,
            process.env.JWT_SECRET
        );

        const existingUser = await User.findById(decoded.id);

        if(!existingUser) {
            return res.status(404).json({ success: false, message: "User not found with this email" })
        }

        if(decoded.purpose !== "reset-password") {
            return res.status(403).json({
                success: false,
                message: "Invalid reset token"
            });
        }

        if(password !== confirmPassword) {
            return res.status(409).json({ success: false, message: "Password don't match" })
        }

        const hashePassword = await DoHash(password, 10);


        existingUser.password = hashePassword;
        await existingUser.save();

        res.clearCookie("password-reset",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"

            
        })
        res.status(200).json({ success: true, message: "Password updated successfully" })
    } catch (error) {
        console.log(error)
    }
}