import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSideBar from "../components/dashboard/AdminSideBar";
import Navbar from "../components/dashboard/Navbar";

const AdminDashboard = () => {
 
 
  return (
  <div className="flex">
   
    <AdminSideBar/>
    <div className="flex-1 ml-64 text-white bg-teal-600" >
      <Navbar/>
      <AdminSideBar/>
      </div>
     </div>);
};

export default AdminDashboard;



