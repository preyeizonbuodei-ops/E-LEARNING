const express = require("express");
const { Register, Login, Logout, verifyVerificationCode, ChangePassword, ForgotPasswordEmail, VerifyForgotPasswordCode, ResetPassword, getRefreshToken } = require("../authControllers/register");
const { ValidateToken } = require("../middlewares/validateToken");
const { CreateComment, GetAllComments, GetOneCommnet, UpdateComment, DeleteComment} = require("../authControllers/commentController");
const { ConnectNews } = require("../authControllers/NewsController");
const { GetCourses, GetCourseById } = require("../authControllers/CoursesUser/GetCourses");
const { GetCurrentUser } = require("../authControllers/GetCurrentUser");
const { Getlesson } = require("../authControllers/CoursesUser/GetLesson");
const { checkAuth } = require("../authControllers/CheckAuth");
const { authorizedUserRoles,} = require("../middlewares/RoleControl");
const { GetTopics } = require("../authControllers/Admin/TopicController");  
const { GetTopicById } = require("../authControllers/CoursesUser/TopicContent");

const router = express.Router();


// user Control Routes
router.get("/check-auth", ValidateToken, checkAuth)
router.get("/me", ValidateToken, authorizedUserRoles("Student"), GetCurrentUser);
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", ValidateToken, Logout);
router.post("/refresh-token", getRefreshToken);

// Courses Routes
router.get( "/get-courses", ValidateToken, authorizedUserRoles("Student"), GetCourses);

router.get( "/courses/:courseId", ValidateToken, authorizedUserRoles("Student"),  GetCourseById);

router.get( "/courses/:courseId/lesson", ValidateToken, authorizedUserRoles("Student"), Getlesson);

router.get("/lessons/:lessonId/topics", ValidateToken, authorizedUserRoles("Student"), GetTopics)

router.get("/topics/:topicId", ValidateToken, authorizedUserRoles("Student"), GetTopicById)

// Email Routes
router.patch("/verify-verification-code", verifyVerificationCode);
router.patch("/change-password", ValidateToken, ChangePassword);
router.patch("/forgot-password",  ForgotPasswordEmail);
router.patch("/verify-forgot-password", VerifyForgotPasswordCode);
router.patch("/reset-password", ResetPassword);



// comment routes

router.post("/comment", ValidateToken, authorizedUserRoles("Student"), CreateComment);
router.get("/all-comment", ValidateToken, authorizedUserRoles("Student"), GetAllComments);
router.get("/get-one-commnet/:id", ValidateToken, authorizedUserRoles("Student"), GetOneCommnet);
router.put("/update-comment/:id", ValidateToken, authorizedUserRoles("Student"), UpdateComment);
router.delete("/delete-comment/:id", ValidateToken, authorizedUserRoles("Student"), DeleteComment);

router.get("/get-news", ValidateToken, authorizedUserRoles("Studnet"), ConnectNews);


module.exports = router;