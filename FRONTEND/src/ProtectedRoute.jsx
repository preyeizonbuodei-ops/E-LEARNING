import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./Store/AuthStore";

const ProtectedRoute = () => {

    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    const isCheckingAuth = useAuthStore(
        (state) => state.isCheckingAuth
    );

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;