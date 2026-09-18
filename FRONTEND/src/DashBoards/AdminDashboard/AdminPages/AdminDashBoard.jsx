import { Outlet } from "react-router-dom"
import Sidebar from "./AdminSidebar"
import { Sidebar } from "lucide-react"




const AdminDashBoard = () => {
  return (
    <>
        <div>
            
            <aside>
              
              <Sidebar
/>          </aside>


            <main>
              <Outlet />
            </main>
        </div>
    </>
  )
}

export default AdminDashBoard