import { Outlet } from "react-router-dom";
import UserSideBar from "./UserSideBar";

const UserDashBoard = () => {
    return (
        <div className="grid min-h-screen grid-cols-[250px_minmax(0,1fr)]">
            <UserSideBar />

            <main className="min-w-0 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default UserDashBoard;