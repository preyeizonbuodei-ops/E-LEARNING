import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSideBar from "./UserSideBar";

const UserDashBoard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">

            <UserSideBar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <main className="min-w-0 bg-gray-100 p-4 pt-20 sm:p-6 sm:pt-20 lg:p-6">
                <Outlet />
            </main>

        </div>
    );
};

export default UserDashBoard;