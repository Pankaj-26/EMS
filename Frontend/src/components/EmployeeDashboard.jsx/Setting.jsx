import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [setting,setSetting]=useState({
    "userId": user._id,
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  })

  const [error,setError]=useState(null)

const handleChange=(e)=>{
    e.preventDefault();

    const {name,value}=e.target;

    setSetting({...setting,[name]:value})
    

}


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(setting.newPassword!==setting.confirmPassword){
        setError("Password not matched")
    }else{
    try {
      const response = await axios.put(
        "http://localhost:5000/api/setting/change-password",
        setting,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees ");
        setError("")
      }
    } catch (e) {
      if (e.response && !e.response.data.success) {
        setError(e.response.data.error);
      } else {
        setError("server error");
      }
    }
}
  };

  return (
    <div className="flex items-center  justify-center space-y-6 text-black">
     
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border"
              onChange={handleChange}
              required
            />
          </div>
         
          <div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-teal-500"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
