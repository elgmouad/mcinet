import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from './Protected.route'

import { ROLE_PERMISSIONS, ROLE_NAMES, ROLES } from '../Components/Utilities/role.permissions'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboards/Dashboard'
import Statistic from '../Pages/Statisctic/Statisctic'
import ListMissions from '../Pages/Mission/ListMissions'
import NewMission from '../Pages/Mission/NewMission'
import ListControl from '../Pages/Mission/Control/listControl'
import NewControl from '../Pages/Mission/Control/newControl'
import ListEnterprise from '../Pages/Enterprise/ListEnterprise'
import AddEnterprise from '../Pages/Enterprise/AddEnterprise'
import Unauthorized from '../Pages/unauthorized/unauthorized'
import CarsList from '../Pages/Cars/CarsList'
import ProfilePage from '../Pages/Profile/ProfilePage'


function AppRoutes() {
  const {role, user} = useSelector( state => state.auth)
  console.log("App Rout accessed...")
  return (
    <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}


        {/* Routes without protection */}
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Statistic />} />

          <Route path="orderMissions" >
            <Route path="listMissionOrders" element={<ListMissions role={role} user={user} />} />
            <Route path="addMissionOrders" element={<NewMission />} />

            <Route path="control">
              <Route path="list" element={<ListControl role={role} user={user} />} />
              <Route path="add" element={<NewControl />} />
            </Route>
          </Route>
          
          <Route path="entreprise" >
            <Route path="list" element={<ListEnterprise role={role} />} />
            <Route path="add" element={<AddEnterprise />} />
          </Route>

          <Route path="voitures" element={<CarsList />} />

          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        
        {/* Routes with protections */}
        {/* <Route element={<ProtectedRoute feature="dashboard" reqPermission="canViewDashboard" />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Statistic />} />
            <Route path="orderMissions">
              <Route path="listMissionOrders" feature="listMission" reqPermission="canViewMissionOrders" element={<ListMissions />} />
              <Route path="addMissionOrders" element={<NewMission />} />
            </Route>
            <Route path="voitures" element={<CarsList />} />
          </Route>
        </Route> */}

{/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute feature="dashboard" reqPermission="canViewDashboard">
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/orderMissions/listMissionOrders" 
          element={
            <ProtectedRoute feature="listMission" reqPermission="canViewMissionOrders">
              <ListMissions />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/orderMissions/addMissionOrders" 
          element={
            <ProtectedRoute feature="addOrderMission" reqPermission="canCreateMissionOrders">
              <NewMission />
            </ProtectedRoute>
          } 
        />

      <Route element={<ProtectedRoute />}>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route> */}

    </Routes>

  )
}

export default AppRoutes