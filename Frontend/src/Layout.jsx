import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from './Components/SideBar/SideBar'
import Header from './Components/Header/Header'
import AppRoutes from './Routes/App.routes'
import { useSelector } from 'react-redux'

function Layout() {
    // console.log("(Layout accessed...")
    const [isOpen, setOpen] = useState(false)
    const { role } = useSelector(state => state.auth)
    if (!role) {
        // console.log("❌ No role found! Redirecting to login...");
        return <Navigate to="/login" replace />;
    }
    
    

    return (
      <div className='flex gap-6 h-screen overflow-auto'>
        {/* {console.log("Rendering App Component")} */}
          <SideBar role={getRole} isOpen={isOpen}/>
          <div className="content relative flex flex-col gap-3 px-[32px] w-full ">
              <Header open={toggleSidbare} />
              <div className="page-content w-full  overflow-x-hidden overflow-y-scroll no-scrollbar">
                  <Outlet />
              </div>
          </div>
      </div>
    )
}

export default Layout