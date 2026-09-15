
import Logo from '../../../Image/FBLOGO.jpg'
import { Home, NotebookPen, BookCheck, Megaphone, Save, Settings, } from 'lucide-react';
import { NavLink } from "react-router-dom";



const Sidebar = () => {
  return (
    <>
        
        {/* SideBar Content */}
        <div className="w-60 h-screen bg-red-500">
          {/* sideBar Header */}
          <div className="flex  mb-9 pt-3 border ">
            <img className="w-9 h-9" src={Logo} alt="" />
            <div className="leading-4 ml-2 ">
              <h1 className="text-[15px] font-bold">Faculty Of Engineering</h1>
              <p className="text-[10px]">Innovate. Engineer Impact</p>
            </div>
          </div>


          {/* SideBar Links */}
          <div className="">
            <div className=" flex items-center gap-5  py-2 mr-4">
                <Home />
                <NavLink to="">Dashboard</NavLink>
            </div>

            <div className="flex items-center gap-5 py-2 mr-4">
                <BookCheck />
                <NavLink to="courses">Courses</NavLink>
            </div>

            <div className="flex items-center gap-5  py-2 mr-4">
                <NotebookPen />
                <NavLink to="courses">Assignment</NavLink>
            </div>

            <div className="flex items-center gap-5 py-2 mr-4">
                <Megaphone />
                <NavLink to="courses">Announcement</NavLink>
            </div>

            <div className="flex items-center gap-5 py-2 mr-4">
                <Save />
                <NavLink to="courses">Saved Materials</NavLink>
            </div>

            <div className="flex items-center gap-5 py-2 mr-4">
                <Settings />
                <NavLink to="courses">Settings</NavLink>
            </div>
          </div>
        </div> 

    </>
  )
}

export default Sidebar