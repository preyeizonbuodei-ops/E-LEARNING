import { Route } from "react-router-dom";
import AdminSidebar from "../AdminPages/AdminSidebar";
import AdminDefault from "../AdminPages/AdminDefault";
import Department from "../AdminPages/Department";

const AdminRoutes = () => {
    return (
        <>
            <Route path="/admin" element={<AdminSidebar />}>
                <Route index element={<AdminDefault />} />

                <Route
                    path="departments"
                    element={<Department />}
                />
            </Route>
        </>
    );
};

export default AdminRoutes;