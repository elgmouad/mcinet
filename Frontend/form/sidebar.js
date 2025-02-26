import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaBox, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import icone  from './assets/icone.png';

const Sidebar = () => {
    return (
      <div className="w-64 bg-blue-700 text-white h-full flex flex-col">
      <div className="p-4 flex items-center">
        <img src={icone} alt="Logo" className="h-12 w-12 mr-3" />
        <span className="text-2xl font-bold">MCINET</span>
      </div>
        <nav className="flex-1">
          <ul>
            <li className="flex items-center py-2 px-4 hover:bg-blue-500">
              <FaHome className="mr-2" /> 
              <Link to="/">{axios || 'Dashboard'}</Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-500">
              <FaBox className="mr-2" /> 
              <Link to="/products">Products</Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-500">
              <FaCalendarAlt className="mr-2" /> 
              <Link to="/calendar">Calendar</Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-500">
              <FaUserFriends className="mr-2" /> 
              <Link to="/suppliers">Suppliers</Link>
            </li>
            <li className="flex items-center py-2 px-4 hover:bg-blue-500">
              <FaFileAlt className="mr-2" /> 
              <Link to="/reports">Reports</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  

 
export default Sidebar;
