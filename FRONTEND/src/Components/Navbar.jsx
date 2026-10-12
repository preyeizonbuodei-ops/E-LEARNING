
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../Image/FBLOGO.jpg";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    const navStyle = ({ isActive }) =>
        `relative py-2 ${
            isActive
                ? "text-amber-500 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-amber-500 transition duration-500"
                : "text-white hover:text-blue-400 transition duration-500"
        }`;

    const departmentNavStyle = ({ isActive }) => {
        const departmentActive =
            pathname === "/department" ||
            pathname.startsWith("/departments/");

        return `relative py-2 ${
            isActive || departmentActive
                ? "text-amber-500 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-amber-500 transition duration-500"
                : "text-white hover:text-blue-400 transition duration-500"
        }`;
    };

    return (
        <div className="fixed inset-0 z-50 h-20 w-full bg-blue-950 text-white">
            {/* NAVBAR */}
            <div className="flex h-20 w-full items-center justify-between px-5 md:px-8 lg:px-12">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="NUESA logo"
                        className="h-11 w-11 rounded-2xl"
                    />

                    <div>
                        <h2 className="text-sm">FACULTY OF</h2>
                        <span className="text-sm font-bold sm:text-base">
                            ENGINEERING
                        </span>
                    </div>
                </div>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-4 lg:flex">
                    <NavLink to="/" end className={navStyle}>
                        Home
                    </NavLink>

                    <NavLink to="/about" className={navStyle}>
                        About
                    </NavLink>

                    <NavLink to="/department" className={departmentNavStyle}>
                        Department
                    </NavLink>

                    <NavLink to="/resources" className={navStyle}>
                        Resources
                    </NavLink>

                    <NavLink to="/research" className={navStyle}>
                        Research
                    </NavLink>

                    <NavLink to="/contact" className={navStyle}>
                        Contact
                    </NavLink>

                    <NavLink to="/news" className={navStyle}>
                        News
                    </NavLink>
                </div>

                {/* DESKTOP ACTIONS */}
                <div className="hidden items-center gap-3 md:flex">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-32 rounded-lg border border-white/30 bg-white/10 px-3 py-2 outline-none placeholder:text-gray-300 lg:w-40"
                    />

                    <NavLink
                        to="/register"
                        className="rounded-lg bg-amber-500 px-4 py-2 font-semibold transition duration-300 hover:bg-blue-700 lg:px-6 lg:py-3"
                    >
                        Student Portal
                    </NavLink>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="absolute left-0 top-20 w-full bg-black/95 px-6 py-6 lg:hidden">
                    <div className="flex flex-col gap-5">
                        <NavLink
                            to="/"
                            end
                            className={navStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={navStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/department"
                            className={departmentNavStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            Department
                        </NavLink>

                        <NavLink
                            to="/resources"
                            className={navStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            Resources
                        </NavLink>

                        <NavLink
                            to="/research"
                            className={navStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            Research
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={navStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </NavLink>

                        <NavLink
                            to="/news"
                            className={navStyle}
                            onClick={() => setMenuOpen(false)}
                        >
                            News
                        </NavLink>

                        {/* MOBILE SEARCH */}
                        <input
                            type="search"
                            placeholder="Search..."
                            className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 outline-none placeholder:text-gray-300"
                        />

                        {/* MOBILE PORTAL */}
                        <NavLink
                            to="/register"
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg bg-amber-500 px-6 py-3 text-center font-semibold transition duration-300 hover:bg-blue-700"
                        >
                            Student Portal
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
