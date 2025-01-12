

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa';

const AdminSideBar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-lg">
      {/* Header */}
      <div className="bg-gray-700 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-xl font-semibold">Employee MS</h3>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 space-y-2">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-600" : "hover:bg-gray-700"} flex items-center space-x-4 py-3 px-6 rounded transition`
          }
          end
        >
          <FaTachometerAlt className="text-lg" />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-600" : "hover:bg-gray-700"} flex items-center space-x-4 py-3 px-6 rounded transition`
          }
        >
          <FaUsers className="text-lg" />
          <span className="text-sm font-medium">Employees</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-600" : "hover:bg-gray-700"} flex items-center space-x-4 py-3 px-6 rounded transition`
          }
        >
          <FaBuilding className="text-lg" />
          <span className="text-sm font-medium">Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-600" : "hover:bg-gray-700"} flex items-center space-x-4 py-3 px-6 rounded transition`
          }
        >
          <FaCalendarAlt className="text-lg" />
          <span className="text-sm font-medium">Leave</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-600" : "hover:bg-gray-700"} flex items-center space-x-4 py-3 px-6 rounded transition`
          }
        >
          <FaMoneyBillWave className="text-lg" />
          <span className="text-sm font-medium">Salary</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? "bg-blue-600" : "hover:bg-gray-700"} flex items-center space-x-4 py-3 px-6 rounded transition`
          }
        >
          <FaCogs className="text-lg" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSideBar;
