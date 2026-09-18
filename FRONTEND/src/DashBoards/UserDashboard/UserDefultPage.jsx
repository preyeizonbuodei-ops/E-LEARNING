import React from 'react'
import UserSideBar from './UserPages/UserSideBar'

const UserDefult = () => {
  return (
    <>
        <div className="grid min-h-screen grid-cols-[250px_minmax(0,1fr)]">
            <UserSideBar/>

            <main className="min-w-0 bg-gray-100">
                <h1>We Are the World</h1>
            </main>
        </div>
        
    </>
  )
}

export default UserDefult