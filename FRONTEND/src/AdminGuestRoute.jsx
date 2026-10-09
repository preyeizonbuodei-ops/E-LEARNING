import { Navigate, Outlet } from "react-router-dom";
import { AdminRegister } from "./Store/AdminStore";


const AdminGuestRoute = () => {

        const isAuthenticated = AdminRegister(
            (state) => state.isAuthenticated
        )

        const isCheckingAuth = AdminRegister(
            (state) => state.isCheckingAuth
        )

        if(isCheckingAuth) {
            return <div>Loading....</div>
        }

        if(isAuthenticated) {
            return <Navigate to="/admin-dashboard" replace/>
        }

        return <Outlet />;
}

export default AdminGuestRoute;