import {
    Box,
    File,
    GraduationCap,
    Home,
    LogOutIcon,
    List,
    Settings,
    Users2,
    BellIcon,
    School,
    House,
    Book,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";
const AdminSidebar = () => {
    return (
        <div className="grid min-h-screen grid-cols-[250px_minmax(0,1fr)]">

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
                        to="/admin-dashboard"
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
                        to="/admin-dashboard/departments"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <Book />
                        <h1>Departments</h1>
                    </NavLink>

                    <NavLink
                        to="/admin-dashboard/major-areas"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <File  />
                        <h1>Major Areas</h1>
                    </NavLink>

                    <NavLink
                        to="/admin-dashboard/topics"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded py-3 px-3 transition duration-500 ${
                                isActive
                                    ? "bg-white text-black"
                                    : "hover:bg-white hover:text-black"
                            }`
                        }
                    >
                        <House  />
                        <h1>
                            Topics
                        </h1>
                    </NavLink>


                    <div className="flex items-center gap-3 rounded py-3 px-3 hover:bg-white hover:text-black">
                        <File />
                        <h1>Resources</h1>
                    </div>

                    <div className="flex items-center gap-3 rounded py-3 px-3 hover:bg-white hover:text-black">
                        <Users2 />
                        <h1>Users</h1>
                    </div>

                    <div className="flex items-center gap-3 rounded py-3 px-3 hover:bg-white hover:text-black">
                        <Settings />
                        <h1>Settings</h1>
                    </div>

                    <div className="flex items-center gap-3 rounded py-3 px-3 hover:bg-white hover:text-black">
                        <LogOutIcon />
                        <h1>Logout</h1>
                    </div>

                </div>
            </aside>

            <main className="min-w-0 bg-gray-100">

                <nav className="flex items-center justify-end gap-3 p-3 pr-6 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]">

                    <BellIcon />

                    <p className="rounded-full bg-blue-950 px-3 py-2 text-white">
                        Ad
                    </p>

                    <p className="text-gray-500">
                        Admin
                    </p>

                </nav>

                <div className="p-6">
                    <Outlet />
                </div>

            </main>

        </div>
    );
};

export default AdminSidebar;