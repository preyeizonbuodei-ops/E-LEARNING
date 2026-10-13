const User = require("../modules/registerSchema");
const mongoose = require("mongoose");
const { ValidateUser, ValidateChangePassword } = require("../middlewares/validate");
const bcrypt = require("bcrypt");
const { DoHash } = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const transport = require("../middlewares/sendMail")
const { hmacProcess }  = require('../utils/hashing'); 
const Admin = require("../modules/adminSchema");

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

exports.verifyVerificationCode = async (req, res) => {
    try {

        const { email, verificationCode } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

        if (existingUser.isVerified) {
            return res.status(409).json({
                success: false,
                message: "You are already a verified user"
            });
        }

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

        if (Date.now() > existingUser.verificationTokenExpiresAt) {
            return res.status(400).json({
                success: false,
                message: "Validation expired"
            });
        }

        // User is now verified and automatically logged in
        existingUser.isVerified = true;
        existingUser.isLoggedIn = true;
        existingUser.verificationToken = undefined;
        existingUser.verificationTokenExpiresAt = undefined;


 

        const token = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        res.cookie("authorization", `Bearer ${token}`, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000
        });




        const refreshToken = jwt.sign(
            {
                id: existingUser._id,
                role: existingUser.role,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "4d"
            }
        );


        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 4 * 24 * 60 * 60 * 1000
        });


        await existingUser.save();


        // Prepare user response
        const user = existingUser.toObject();

        delete user.password;
        delete user.confirmPassword;
        delete user.verificationToken;
        delete user.verificationTokenExpiresAt;


        return res.status(200).json({
            success: true,
            user: user,
            message: "Logged in successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};



exports.Login = async (req, res) => {
    try {

        // Takes the required input fields for login
        const { email, password } = req.body;


        // Find user using email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        // Compare passwords
        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }


        // User must verify account before login
        if (!user.isVerified) {
            return res.status(409).json({
                success: false,
                message: "Please verify your account before login"
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
                isVerified: user.isVerified
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );


        res.cookie("authorization", `Bearer ${token}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 60 * 60 * 1000
        });


        const refreshToken = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "4d"
            }
        );


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000
        });


        // Update login status
        user.isLoggedIn = true;

        await user.save();


        // Prepare user response
        const sentUser = user.toObject();

        delete sentUser.password;
        delete sentUser.confirmPassword;


        return res.status(200).json({
            success: true,
            user: sentUser,
            message: "Logged in successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong during login"
        });
    }
};



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


        // Update login status
        existingUser.isLoggedIn = false;

        await existingUser.save();


        // Clear access token
        res.clearCookie("authorization", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });


        // Clear refresh token
        res.clearCookie("refreshToken", {
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

       
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const checking =  ValidateChangePassword.validate( { oldPassword, newPassword });

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
        res.status(200).json({ success: true, message: `Verification Successful` })

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

exports.getRefreshToken = async (req, res) => {
    try {
         
        //  Get refresh token from cookie
        const { refreshToken } = req.cookies;


        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No refresh token was found"
            });
        }

        //  Verify refresh token
        const decodedUser = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
        );
        console.log("DECODED USER:", decodedUser);

        // Create a new access token
        const newAccessToken = jwt.sign(
            {
                id: decodedUser.id,
                role: decodedUser.role,
                email: decodedUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        //  Store the new access token in the authorization cookie
        res.cookie("authorization", `Bearer ${newAccessToken}`, {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
            mmaxAge: 1 * 60 * 60 * 1000
        });

        //  Send response
        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [students, admins] = await Promise.all([
      User.find()
        .select(
          "username email level department matricNumber role isVerified isLoggedIn lastLogin createdAt updatedAt"
        )
        .lean(),

      Admin.find()
        .select(
          "username email role isVerified isLoggedIn lastLoggedIn createdAt updatedAt"
        )
        .lean(),
    ]);

    // Identify each account type
    const formattedStudents = students.map((student) => ({
      ...student,
      accountType: "Student",
      lastLogin: student.lastLogin,
    }));

    const formattedAdmins = admins.map((admin) => ({
      ...admin,
      accountType: "Admin",
      lastLogin: admin.lastLoggedIn,
    }));

    // Combine both account types and sort by registration date
    const allUsers = [...formattedStudents, ...formattedAdmins].sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

    return res.status(200).json({
      success: true,
      totalUsers: allUsers.length,
      totalStudents: students.length,
      totalAdmins: admins.length,
      users: allUsers,
    });
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      username,
      email,
      level,
      department,
      matricNumber,
    } = req.body;

    const updates = {};

    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (level !== undefined) updates.level = level;
    if (department !== undefined) updates.department = department;
    if (matricNumber !== undefined) {
      updates.matricNumber = matricNumber;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select(
      "username email level department matricNumber role isVerified isLoggedIn lastLogin createdAt updatedAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};