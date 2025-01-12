import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../components/dashboard/AdminSideBar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
 
 
  return (
  <div className="flex">
   <div className="fixed w-64 h-full bg-gray-800 text-white shadow-md">

   </div>
   <AdminSideBar/>
    <div 
    className="ml-64 flex-1 text-white left-0 top-0 h-screen shadow-lg" >
      <Navbar/>
     <Outlet/>
      </div>
     </div>
     );
};

export default AdminDashboard;



