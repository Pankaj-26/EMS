import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const Navbar = () => {
    const {user,logout}=useAuth()
  return (
    <div className="flex justify-between items-center  bg-teal-600 px-6 shadow-md">
        <p className='py-3'>Welcome {user.name}</p>
        <button className="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded hover:bg-blue-800 transition" onClick={logout}>Logout</button>

    </div>
  )
}

export default Navbar


