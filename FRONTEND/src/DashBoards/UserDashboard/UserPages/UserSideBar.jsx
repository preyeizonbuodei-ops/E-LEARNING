import { useAuthStore } from '../../../Store/AuthStore' 
import {
    File,
    GraduationCap,
    Home,
    LogOutIcon,
    Settings,
    User,
    Book,
    House,
    ChartBarIncreasing,

} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const UserSideBar = () => {
    const Logout = useAuthStore((state) => state.Logout);
  return (
    <>

        <aside className="sticky top-0 h-screen overflow-y-auto bg-blue-950 text-white">

                <div className="flex items-center gap-3 p-3 mb-3 shadow-[0_2px_12px_rgba(0,0,0,0.20)]">

                    <GraduationCap className="size-10 text-blue-500" />

                    <div>
                        <h1 className="font-semibold">
                            E-Learning
                        </h1>

                        <p className="text-sm text-gray-300">
                            Admin
                        </p>
                    </div>

                </div>

                <div className="flex flex-col gap-2 px-3">

                    <NavLink
                        to="/me"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <Home />
                        <h1>Dashboard</h1>
                    </NavLink>

                    <NavLink
                        to="/me/courses"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <Book />
                        <h1>My Courses</h1>
                    </NavLink>

                    <NavLink
                        to="/me/learning-materials"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <File  />
                        <h1>Learning Materials</h1>
                    </NavLink>

                    <NavLink
                        to="/me/department"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <House  />
                        <h1>Department</h1>
                    </NavLink>


                    <NavLink
                        to="/me/resources"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <ChartBarIncreasing  />
                        <h1>Resources</h1>
                    </NavLink>

                    <NavLink
                        to="/me/user"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <User  />
                        <h1>Profile</h1>
                    </NavLink>

                    <NavLink
                        to="/me/setting"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <Settings  />
                        <h1>Setting</h1>
                    </NavLink>

                    <div >
                        
                        <NavLink onClick={Logout} className="flex items-center gap-3 rounded py-3 px-3 hover:bg-white hover:text-black hover:cursor-pointer" to='/login'><LogOutIcon />  Logout</NavLink>
                    </div>

                </div>
            </aside>
            
    
    </>
  )
}

export default UserSideBar