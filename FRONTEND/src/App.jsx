
import { Route, Routes } from 'react-router-dom'
import  Home  from './Pages/Home';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Department from './Pages/Department';
import Research from './Pages/Research';
import Resources from './Pages/Resources'
import News from './Pages/News & Events';
import Contact from './Pages/Contact'
import './App.css'
import UserDashboard from './DashBoards/UserDashboard/UserDashboard';
import UserRegister from './Pages/UserRegister';
import Login from './Pages/Login';
import VerifyEmail from './Pages/VerifyEmail';
import ChangePassword from './Pages/ChangePassword';
import ForgetPasswordVerification from './Pages/ForgetPassword';
import ForgetPasswordSend from './Pages/ForgetPasswordSend';
import ResetPassword from './Pages/ResetPassword';
import DepartmentDetails from './Departments/DepartmentDetails';
import AreaDetails from './Areas/AreaDetails';
import StudyMaterial from './Areas/StudyMaterial';



function App() {
  

  return (

    <>
        <Routes>
          <Route path = '/' element = {
                                      <>
                                      <Navbar />  
                                      <Home /> 
                                      </>} 
                                      />
          <Route path = '/about' element = {
                                        <> 
                                        <Navbar /> 
                                        <About /> 
                                        </>}
                                         />
          <Route path = '/department' element = {
                                      <>
                                      <Navbar /> 
                                      <Department /> 
                                      </>} 
                                      />
          <Route path = '/news' element = 
                                      {
                                      <> 
                                      <Navbar />
                                      <News /> 
                                      </>} 
                                      />
          <Route path = '/resources' element = {
                                      <> 
                                      <Navbar />
                                      <Resources />
                                       </>} 
                                       />
          <Route path = '/research' element = {
                                      <>
                                      <Navbar />
                                      <Research /> 
                                      </>} 
                                      />
          <Route path = '/contact' element = {
                                            <>
                                            <Navbar />
                                            <Contact />
                                            </>} 
                                            />
          <Route path = '/user-dashboard' element = { <UserDashboard />} />
          <Route path = '/register' element = { 
                                                <> 
                                                <Navbar /> 
                                                <UserRegister /> 
                                                </>} 
                                                />
          <Route path = '/login' element = {
                                          <> 
                                          <Navbar /> 
                                          <Login /> 
                                          </> } 
                                          /> 
          <Route path = '/verify-email' element = {<VerifyEmail />} />
          <Route path = '/dashboard' element = {<UserDashboard />} />
          <Route path = '/change-password' element = {<ChangePassword />} />
          <Route path = '/verify-forget-password' element = {<ForgetPasswordVerification />} />
          <Route path = '/forget-password' element = {<ForgetPasswordSend />} />
          <Route path = '/reset-password' element = {<ResetPassword />} />
          <Route path="/departments/:departmentId" element={<DepartmentDetails />} />
          <Route path="/areas/:departmentId/:areaId" element={<AreaDetails />} />
          <Route path="/departments/:departmentId/:areaId/:topicId/:materialId" element={<StudyMaterial />}/>
           
       
        </Routes>

      
    </>
  )
}

export default App
