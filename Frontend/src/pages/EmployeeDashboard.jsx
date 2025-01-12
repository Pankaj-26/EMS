import React from "react";
import EmployeeSidebar from "../components/EmployeeDashboard.jsx/EmployeeSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  return (
    <div className="flex ">
      <EmployeeSidebar />
      <div className="flex-1 ml-64 text-white ">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
