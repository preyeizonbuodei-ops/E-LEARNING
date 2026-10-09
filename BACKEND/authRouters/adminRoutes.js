const express = require("express");

const { AdminRegister, adminVerifyVerificationCode, AdminLogOut, AdminLogIn } = require("../authControllers/adminRegister");
const { ValidateAdminToken } = require('../middlewares/ValidateAdminToken');
const { AdminCheckAuth } = require("../authControllers/Admin/AdminCheckAuth");
const { authorizedAdminRoles } = require("../middlewares/RoleControl");
const { CreateLesson, GetCourses,  GetLessons} = require('../authControllers/CoursesUser/LessonController');
const { CreateCourse } = require("../authControllers/Admin/CourseController");
const { CreateTopic, GetTopics } = require("../authControllers/Admin/TopicController");


const adminRouter = express.Router();


// Admin Routes
adminRouter.post('/create-course',  ValidateAdminToken, authorizedAdminRoles("Admin"), CreateCourse)
adminRouter.post('/create-lesson', ValidateAdminToken, authorizedAdminRoles("Admin"), CreateLesson )
adminRouter.get('/get-lesson', ValidateAdminToken, authorizedAdminRoles("Admin"), GetLessons)
adminRouter.get('/get-courses', ValidateAdminToken, authorizedAdminRoles("Admin"), GetCourses)
adminRouter.post('/lessons/:lessonId/topics', ValidateAdminToken, authorizedAdminRoles("Admin"), CreateTopic)
adminRouter.get("/lessons/:lessonId/topics", ValidateAdminToken, authorizedAdminRoles("Admin"), GetTopics)
// Admin Control Routes
adminRouter.post("/register", AdminRegister);
adminRouter.patch("/admin-verify-email", adminVerifyVerificationCode )
adminRouter.post("/login", AdminLogIn);
adminRouter.post("/logout", ValidateAdminToken,  AdminLogOut);
adminRouter.get("/admin-check-auth", ValidateAdminToken, AdminCheckAuth)


module.exports = adminRouter