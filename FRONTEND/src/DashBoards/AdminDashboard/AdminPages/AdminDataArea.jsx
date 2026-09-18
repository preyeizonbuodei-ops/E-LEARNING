import { BoxIcon, Building2, File, List, Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AdminDataArea = () => {
  return (
    <>
        <section className='ml-3 md:flex md:justify-between md:mt-4 md:mr-3 md:ml-3'>
            <div>
                <h1 className='font-bold text-blue-950'>Admin Dashboard</h1>
                <p className='text-gray-400 text-[13px]'>Manage departments, major areas, topics, and learning materials</p>
            </div>
                
            <NavLink className='items-center flex py-2 px-3 bg-blue-700 md:py-1 md:px-6 text-white rounded-lg' to="/admin/create-course">
                <Plus /> Add Department
            </NavLink>
        </section>

        <main className='grid mr-2 m-2 gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <div className='border border-blue-800 p-4 bg-blue-800/10 flex gap-3 rounded-lg hover:cursor-pointer hover:translate-0.5 transtion duration-300' >
                <Building2 className='bg-blue-800 p-2 rounded-lg size-13 text-white' />
                <div>
                    <p>Department</p>
                    <h3 className='font-bold text-[20px]'>6</h3>
                    <p>Total department in the system</p>
                </div>
            </div>

            <div className='border border-green-800 p-4 bg-green-800/10 flex gap-3 rounded-lg hover:cursor-pointer hover:translate-0.5 transtion duration-300'>
                <BoxIcon className='bg-green-800 p-2 rounded-lg size-13 text-white' />
                <div>
                    <p>Major Areas</p>
                    <h3 className='font-bold text-[20px]'>18</h3>
                    <p>Total major Areas in all departments</p>
                </div>
            </div>

            <div className='border border-amber-800 p-4 bg-amber-800/10 flex gap-3 rounded-lg hover:cursor-pointer hover:translate-0.5 transtion duration-300'>
                <Building2 className='bg-amber-800 p-2 rounded-lg size-13 text-white' />
                <div>
                    <p>Topics</p>
                    <h3 className='font-bold text-[20px]'>72</h3>
                    <p>Total topics across all major areas</p>
                </div>
            </div>

            <div className='border border-red-800 p-4 bg-red-800/10 flex gap-3 rounded-lg hover:cursor-pointer hover:translate-0.5 transtion duration-300'>
                <Building2 className='bg-red-800 p-2 rounded-lg size-13 text-white' />
                <div>
                    <p>Materials</p>
                    <h3 className='font-bold text-[20px]'>156</h3>
                    <p>Total learning materials (PDFs, Videos, Links)</p>
                </div>
            </div>
        </main>
    </>
  )
}

export default AdminDataArea