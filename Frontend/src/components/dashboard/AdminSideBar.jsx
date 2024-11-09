import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers} from 'react-icons/fa'
const AdminSideBar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-gray-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center'>Employee MS</h3>

        </div>
        <div>
            <NavLink to="/admin-dashboard" className={({isActive})=>`${isActive?"bg-teal-500":""} flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                <FaTachometerAlt/>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard" className='flex items-ceter space-x-4 block py-2.5 px-4 rouded'>
                <FaUsers/>
                <span>Employees</span>
            </NavLink>
            <NavLink to="/admin-dashboard" className='flex items-ceter space-x-4 block py-2.5 px-4 rouded'>
                <FaBuilding/>
                <span>Department</span>
            </NavLink>
            <NavLink to="/admin-dashboard" className='flex items-ceter space-x-4 block py-2.5 px-4 rouded'>
                <FaCalendarAlt/>
                <span>Leave</span>
            </NavLink>
            <NavLink to="/admin-dashboard" className='flex items-ceter space-x-4 block py-2.5 px-4 rouded'>
                <FaMoneyBillWave/>
                <span>Salary</span>
            </NavLink>
            <NavLink to="/admin-dashboard" className='flex items-ceter space-x-4 block py-2.5 px-4 rouded'>
                <FaCogs/>
                <span>Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSideBar