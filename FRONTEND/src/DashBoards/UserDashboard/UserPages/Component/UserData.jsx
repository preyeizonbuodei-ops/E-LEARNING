import { BellRing, BoxIcon, Building2, File, List, Plus } from 'lucide-react';
import { useAuthStore } from '../../../../Store/AuthStore'
const UserData = () => {

  const { user } = useAuthStore();
  return (
    <>
     <div>
        <section className='ml-3 md:flex md:justify-between md:mt-4 md:mr-3 md:ml-3 z-20'>
            <div>
                <h1 className='font-bold text-blue-950'>Admin Dashboard</h1>
                <p className='text-gray-400 text-[13px]'>Manage departments, major areas, topics, and learning materials</p>
            </div>
                
            <div className=' flex justify-center items-center gap-3'>
                <BellRing />
                <h1>{user?.username}</h1>
                <p>student</p>
            </div>
        </section>
     </div>
    </>
  )
}

export default UserData