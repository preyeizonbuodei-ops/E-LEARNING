import { Route, Routes } from "react-router-dom";
import { useAuthStore } from './Store/AuthStore'
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

import "./App.css";
import AdminMajorArea from "./DashBoards/AdminDashboard/AdminPages/AdminMajorArea";
import Topics from "./DashBoards/AdminDashboard/AdminPages/Topics";


// USER ROUTE

import UserLanding from './DashBoards/UserDashboard/UserPages/UserLanding'
import UserDashBoard from "./DashBoards/UserDashboard/UserPages/UserDashBoard";
import Courses from "./DashBoards/UserDashboard/UserPages/Courses";
import CreateCourse from "./DashBoards/AdminDashboard/AdminPageForms/CreateCourseForm";
import { useEffect } from "react";


function App() {

    const currentLoggedInUser = useAuthStore(
         (state) => state.getCurrentUser
    )

    useEffect(() => {
        currentLoggedInUser();
    },[currentLoggedInUser])
    return (
        <Routes>

            {/* ==================== WEBSITE ==================== */}

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


            {/* ==================== AUTH ==================== */}

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

            <Route
                path="/admin"
                element={<AdminSidebar />}
            >
                {/* /admin */}
                <Route
                    index
                    element={<AdminDefault />}
                />

                {/* /admin/departments */}
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
            
            {/* Student routess */}
            
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


            {/* ====================  student ==================== */}
            
            <Route
                path="/me"
                element={<UserDashBoard />}
            >
                {/* /User */}
                <Route
                    index
                    element={<UserLanding />}
                />

               <Route
                    path="/me/courses"
                    element={<Courses />}
                />
                
            </Route>            

        </Routes>
    );
}

export default App;