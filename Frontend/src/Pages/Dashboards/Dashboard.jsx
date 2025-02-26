import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar'
import Header from '../../Components/Header/Header'
import { useSelector } from 'react-redux';

function Dashboard() {
  console.log("Dashboard Component Rendered");
  const [isOpen, setOpen] = useState(false)
  const { role, user } = useSelector(state => state.auth)
  console.log("Role Debug:");
    console.log(" - User:", user)
    console.log(" - Role:", role);

  const toggleSidbare = () => {
      console.log("menu is open")
      setOpen(!isOpen)
      console.log("check siOpen state: ", isOpen)
  }

  return (
    <div className='flex gap-6 h-screen overflow-auto min-w-[320px] max-w-7xl m-auto'>
        {console.log("Rendering App Component")}
          <SideBar role={role} open={isOpen} toggleSidbare={toggleSidbare}/>
          <div className="content relative flex flex-col gap-3 px-[32px] w-full max-md:px-4">
              <Header open={toggleSidbare}/>
              <div className="page-content w-full h-full overflow-x-hidden overflow-y-scroll no-scrollbar">
                  <Outlet />
              </div>
          </div>
      </div>
  )
}

export default Dashboard