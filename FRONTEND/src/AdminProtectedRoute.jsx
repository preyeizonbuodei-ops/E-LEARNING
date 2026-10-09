import { Navigate, Outlet } from "react-router-dom";
import { AdminRegister } from "./Store/AdminStore";

const AdminProtectedRoute = () => {
    const {
        admin,
        isAuthenticated: isAdminAuthenticated,
        isCheckingAuth: isCheckingAdmin
    } = AdminRegister();

    if (isCheckingAdmin) {
        return <p>Checking authentication...</p>;
    }

    if (
        isAdminAuthenticated &&
        admin?.role === "Admin"
    ) {
        return <Outlet />;
    }

    return <Navigate to="/admin-login" replace />;
};

export default AdminProtectedRoute;