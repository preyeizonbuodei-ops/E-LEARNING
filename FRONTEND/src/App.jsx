import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./Store/AuthStore";
import { useEffect } from "react";
import { AdminRegister as adminCheck } from "./Store/AdminStore";

import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Department from "./Pages/Department";
import Research from "./Pages/Research";
import Resources from "./Pages/Resources";
import News from "./Pages/News & Events";
import Contact from "./Pages/Contact";

import UserRegister from "./Pages/UserRegister";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import ChangePassword from "./Pages/ChangePassword";
import ForgetPasswordVerification from "./Pages/ForgetPassword";
import ForgetPasswordSend from "./Pages/ForgetPasswordSend";
import ResetPassword from "./Pages/ResetPassword";

import DepartmentDetails from "./Departments/DepartmentDetails";
import AreaDetails from "./Areas/AreaDetails";
import StudyMaterial from "./Areas/StudyMaterial";

// ADMIN
import AdminSidebar from "./DashBoards/AdminDashboard/AdminPages/AdminSidebar";
import AdminDefault from "./DashBoards/AdminDashboard/AdminPages/AdminDefault";
import AdminDepartment from "./DashBoards/AdminDashboard/AdminPages/Department";
import AdminMajorArea from "./DashBoards/AdminDashboard/AdminPages/AdminMajorArea";
import Topics from "./DashBoards/AdminDashboard/AdminPages/Topics";
import CreateCourse from "./DashBoards/AdminDashboard/AdminPageForms/CreateCourseForm";
import AdminLogin from "./Pages/AdminRegisters/AdminLogin";
import AdminRegister from "./Pages/AdminRegisters/AdminRegister";
import AdminVerifyEmail from "./Pages/AdminRegisters/AdminVerifyEmail";
import CreateLessonForm from "./DashBoards/AdminDashboard/AdminPageForms/CreateLesson";
import CreateTopicForm from "./DashBoards/AdminDashboard/AdminPageForms/CreateTopic"



// USER
import UserLanding from "./DashBoards/UserDashboard/UserPages/UserLanding";
import UserDashBoard from "./DashBoards/UserDashboard/UserPages/UserDashBoard";
import Courses from "./DashBoards/UserDashboard/UserPages/Courses";
import Lessons from "./DashBoards/UserDashboard/UserPages/Component/LessonPage";
import TopicsPage from "./DashBoards/UserDashboard/UserPages/Component/TopicPage"
import TopicDetails from "./DashBoards/UserDashboard/UserPages/Component/TopicIdPage";                                                          


// ROUTE PROTECTION
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRote";
import AdminGuestRoute from "./AdminGuestRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

import "./App.css";


function App() {
    const checkAuth = useAuthStore(
        (state) => state.checkAuth
    );

    useEffect(() => {
        checkAuth();
    }, []);

    const AdminCheckAuth = adminCheck(
        (state) => state.AdminCheckAuth
    );

    useEffect(() => {
        AdminCheckAuth();
    }, []);

    return (
        <Routes>

            {/* ==================== PUBLIC ==================== */}

            <Route
                path="/"
                element={
                    <>
                        <Navbar />
                        <Home />
                    </>
                }
            />

            <Route
                path="/about"
                element={
                    <>
                        <Navbar />
                        <About />
                    </>
                }
            />

            <Route
                path="/department"
                element={
                    <>
                        <Navbar />
                        <Department />
                    </>
                }
            />

            <Route
                path="/news"
                element={
                    <>
                        <Navbar />
                        <News />
                    </>
                }
            />

            <Route
                path="/resources"
                element={
                    <>
                        <Navbar />
                        <Resources />
                    </>
                }
            />

            <Route
                path="/research"
                element={
                    <>
                        <Navbar />
                        <Research />
                    </>
                }
            />

            <Route
                path="/contact"
                element={
                    <>
                        <Navbar />
                        <Contact />
                    </>
                }
            />

            {/* ==================== GUEST ROUTES ==================== */}

            <Route element={<GuestRoute />}>

                <Route
                    path="/register"
                    element={
                        <>
                            <Navbar />
                            <UserRegister />
                        </>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <>
                            <Navbar />
                            <Login />
                        </>
                    }
                />

                <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                />

                <Route
                    path="/change-password"
                    element={<ChangePassword />}
                />

                <Route
                    path="/verify-forget-password"
                    element={<ForgetPasswordVerification />}
                />

                <Route
                    path="/forget-password"
                    element={<ForgetPasswordSend />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

            </Route>

            {/* ==================== DEPARTMENTS ==================== */}

            <Route
                path="/departments/:departmentId"
                element={<DepartmentDetails />}
            />

            <Route
                path="/areas/:departmentId/:areaId"
                element={<AreaDetails />}
            />

            <Route
                path="/departments/:departmentId/:areaId/:topicId/:materialId"
                element={<StudyMaterial />}
            />

            {/* ==================== ADMIN ==================== */}

            <Route element={<AdminProtectedRoute />}>

                <Route
                    path="/admin-dashboard"
                    element={<AdminSidebar />}
                >
                    <Route
                        index
                        element={<AdminDefault />}
                    />

                    <Route
                        path="departments"
                        element={<AdminDepartment />}
                    />

                    <Route
                        path="major-areas"
                        element={<AdminMajorArea />}
                    />

                    <Route
                        path="topics"
                        element={<Topics />}
                    />

                </Route>

                <Route
                    path="/admin/create-course"
                    element={<CreateCourse />}
                />

                <Route
                    path="/admin/create-lesson"
                    element={<CreateLessonForm />}
                />

                <Route
                    path="/admin/create-topic"
                    element={<CreateTopicForm />}
                />

            </Route>

            {/* ==================== ADMIN GUEST ==================== */}

            <Route element={<AdminGuestRoute />}>

                <Route
                    path="/admin-register"
                    element={<AdminRegister />}
                />

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin-verify-email"
                    element={<AdminVerifyEmail />}
                />

            </Route>

            {/* ==================== STUDENT ==================== */}

            <Route element={<ProtectedRoute />}>

                {/* USER DASHBOARD LAYOUT */}
                <Route element={<UserDashBoard />}>

                    <Route
                        path="/me"
                        element={<UserLanding />}
                    />

                    <Route
                        path="/me/courses"
                        element={<Courses />}
                    />

                    {/* COURSE LESSONS */}
                    <Route
                        path="/courses/:courseId/lesson"
                        element={<Lessons />}
                    />

                    <Route
                        path="/lessons/:lessonId/topics"
                        element={<TopicsPage />}
                    />

                    <Route
                        path="/topics/:topicId"
                        element={<TopicDetails />}
                    />

                    {/* LESSON TOPICS */}
                    {/* We will add this after creating Topics */}

                </Route>

            </Route>

        </Routes>
    );
}

export default App;