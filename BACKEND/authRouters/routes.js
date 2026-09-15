const express = require("express");
const { Register, Login, Logout, verifyVerificationCode, ChangePassword, ForgotPasswordEmail, VerifyForgotPasswordCode, ResetPassword } = require("../authControllers/register");
// const { AdminLogOut, AdminLogIn } = require("../authControllers/adminRegister")
const { ValidateToken } = require("../middlewares/validateToken");
const { CreateComment, GetAllComments, GetOneCommnet, UpdateComment, DeleteComment} = require("../authControllers/commentController");
const { ConnectNews } = require("../authControllers/NewsController");


const router = express.Router();
// Admin Control Routes
// router.post("/adminRegister", AdminRegister);
// router.post("/adminLogin", AdminLogIn);
// router.post("/adminlogout",  ValidateToken,  AdminLogOut);

// user Control Routes
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", ValidateToken, Logout);

// Email Routes


router.patch("/verify-verification-code", verifyVerificationCode);
router.patch("/change-password", ValidateToken, ChangePassword);
router.patch("/forgot-password",  ForgotPasswordEmail);
router.patch("/verify-forgot-password", VerifyForgotPasswordCode);
router.patch("/reset-password", ResetPassword);

//Role Based Routes
router.get("/admin", ValidateToken, (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to admin page" });
})

router.get("/class-rep", ValidateToken, (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to class-rep page" });
})

router.get("/me", ValidateToken, (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to student page" });
})

// router.post("/createVenue", ValidateToken, CreteVenue);
// router.get("/getAllVenues", ValidateToken, GetAllVenues);
// router.get("/getOneVenue", ValidateToken, GetOneVenue);
// router.put("updateVenue", ValidateToken, UpdateVenue);
// router.delete("/deleteVenue", DeleteVenue);


// comment routes
router.post("/comment", ValidateToken, CreateComment);
router.get("/all-comment", ValidateToken, GetAllComments);
router.get("/get-one-commnet/:id", ValidateToken, GetOneCommnet);
router.put("/update-comment/:id", ValidateToken, UpdateComment);
router.delete("/delete-comment/:id", ValidateToken, DeleteComment);

router.get("/get-news", ConnectNews);
// router.get("/getOneNews", ValidateToken, GetOneNews);


// router.get("/pastQuestions", ValidateToken, GetPastQuestions);
// router.post("/uploadPastQuestion", ValidateToken, UploadPastQuestions);


module.exports = router;