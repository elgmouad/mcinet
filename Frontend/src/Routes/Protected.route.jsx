import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { hasPermission, ROLE_PERMISSIONS, ROLE_PRIMARY_ROUTE, ROLE_TO_ID } from "../Components/Utilities/role.permissions";

export const ProtectedRoute = ({ feature, reqPermission}) => {
    console.log("(Protected Rout accessed...")
    const { isAuthenticated, user, role} = useSelector(state => state.auth);

    console.log("ProtectedRoute Debug:");
    console.log(" - isAuthenticated:", isAuthenticated);
    console.log(" - User:", user)
    console.log(" - Role:", role);
    // console.log(" - Permissions:", permissions);
    console.log("\n")
    // console.log(" - LocalStorage:", user, userRole);
    
    if(!isAuthenticated ) {
        console.log("❌ User not authenticated! Redirecting to login...");
        return <Navigate to="/login" replace/>
    }
    console.log("✅ User not authenticated! Redirecting to login...");
    
    // const entries = Object.entries(permissions)
    // for(const entry of entries) {
    //     console.log("⏭⏭ Redirecting to ", entry[0]);
    //     if(entry[1].length > 0) {
    //         return <Navigate to={entry[0]} replace/>
    //     }
    // }
    // console.log("🔄 Testing the entries: ",entries)


    if (reqPermission && feature) {
        const isAuthorized = hasPermission(role, feature, reqPermission);
        if (!isAuthorized) {
            console.log("❌ No required permissions! Redirecting to unauthorized...");
            return <Navigate to="/unauthorized" replace />;
        }
    }

    if (!feature) {
        const roleId = ROLE_TO_ID[role];
        const primaryRoute = ROLE_PRIMARY_ROUTE[roleId] || "/dashboard";
        console.log("➡️ Redirecting user to primary route:", primaryRoute);
        return <Navigate to={primaryRoute} replace />;
    }
    console.log("✅ User lacks permissions! Redirecting...")

    return <Outlet />
}