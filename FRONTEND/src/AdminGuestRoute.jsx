
import { Navigate, Outlet } from "react-router-dom";
import { AdminRegister } from "./Store/AdminStore";

const AdminGuestRoute = () => {
    const {
        admin,
        isAuthenticated,
        isCheckingAuth
    } = AdminRegister();

    if (isCheckingAuth) {
        return <div>Checking admin authentication...</div>;
    }

    if (isAuthenticated && admin?.role === "Admin") {
        return <Navigate to="/admin-dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminGuestRoute;
