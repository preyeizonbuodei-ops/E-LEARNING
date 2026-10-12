const express = require("express");

const { AdminRegister, adminVerifyVerificationCode, AdminLogOut, AdminLogIn } = require("../authControllers/adminRegister");
const { ValidateAdminToken } = require('../middlewares/ValidateAdminToken');
const { AdminCheckAuth } = require("../authControllers/Admin/AdminCheckAuth");
const { authorizedAdminRoles } = require("../middlewares/RoleControl");
const { CreateLesson, GetCourses,  GetLessons} = require('../authControllers/CoursesUser/LessonController');
const { CreateCourse } = require("../authControllers/Admin/CourseController");
const { CreateTopic, GetTopics } = require("../authControllers/Admin/TopicController");
const { GetAdminRefreshToken } = require("../authControllers/adminRegister");
const { CreateDepartment, getDepartments } = require("../authControllers/Admin/DepartmentController/DepartmentController");
const { createMajorArea, getMajorAreas, getMajorAreaById } = require("../authControllers/Admin/DepartmentController/MajorAreaController");
const { createMajorAreaTopic, getAllMajorAreaTopics, getMajorAreaTopicById } = require("../authControllers/Admin/DepartmentController/MajorTopicController");
const adminRouter = express.Router();


// Admin Routes
adminRouter.post('/create-course',  ValidateAdminToken, authorizedAdminRoles("Admin"), CreateCourse)
adminRouter.post('/create-lesson', ValidateAdminToken, authorizedAdminRoles("Admin"), CreateLesson )
adminRouter.get('/get-lesson', ValidateAdminToken, authorizedAdminRoles("Admin"), GetLessons)
adminRouter.get('/get-courses', ValidateAdminToken, authorizedAdminRoles("Admin"), GetCourses)
adminRouter.post('/lessons/:lessonId/topics', ValidateAdminToken, authorizedAdminRoles("Admin"), CreateTopic)
adminRouter.get("/lessons/:lessonId/topics", ValidateAdminToken, authorizedAdminRoles("Admin"), GetTopics)

// Department Routes
adminRouter.post("/create-department", CreateDepartment)
adminRouter.get("/get-department", getDepartments)
adminRouter.post("/create-major-area", createMajorArea)
adminRouter.get("/get-major-area", getMajorAreas)
adminRouter.get("/major-area/:majorAreaId", getMajorAreaById)
// adminRouter.post("/major-area/:departmentId", CreateDepartment)

// Major Topic Route
adminRouter.post("/create-major-area-topic", createMajorAreaTopic)
adminRouter.get("/get-major-area-topic", getAllMajorAreaTopics)
adminRouter.get("/get-major-area-topic/:majorTopicId", getMajorAreaTopicById)

// Admin Control Routes
adminRouter.post("/register", AdminRegister)
adminRouter.patch("/admin-verify-email", adminVerifyVerificationCode )
adminRouter.post("/login", AdminLogIn);
adminRouter.post("/logout", ValidateAdminToken,  AdminLogOut);
adminRouter.get("/admin-check-auth", ValidateAdminToken, AdminCheckAuth)
adminRouter.post("/admin-refresh-token", GetAdminRefreshToken);


module.exports = adminRouter