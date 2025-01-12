import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (e) {
      if (e.response && !e.response.data.success) {
        setError(e.response.data.error);
      } else {
        setError("server error");
      }
    }
  };

  return (
    // <div className="flex flex-col items-center h-screen justify-center space-y-6">
    //   <h2 className="text-3xl text-blue-700">Employee Management System</h2>
    //   <div className="border shadow p-6 w-80 bg-white">
    //     <h2 className="text-2xl font-bold mb-4">Login</h2>
    //     {error && <p className="text-red-500">{error}</p>}
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="email">Email</label>
    //         <input
    //           type="email"
    //           placeholder="Enter Email"
    //           className="w-full px-3 py-2 border"
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           type="password"
    //           placeholder="Enter Password"
    //           className="w-full px-3 py-2 border"
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4 flex items-center justify-between">
    //         <label className="inline-flex item-center">
    //           <input type="checkbox" className="form-checkbox" />
    //           <span className="ml-2 text-gray-700">Remember me</span>
    //         </label>
    //         <a href="#" className="text-teal-600">
    //           Forget Password?
    //         </a>
    //       </div>
    //       <div>
    //         <button
    //           type="submit"
    //           className="w-full bg-teal-600 text-white py-2"
    //         >
    //           Login
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div className="flex items-center justify-center h-screen bg-gray-300">
    <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Employee Management System</h2>
  
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
  
        <div className="flex items-center justify-between mb-6">
          <label className="inline-flex items-center text-sm text-gray-700">
            <input type="checkbox" className="form-checkbox text-teal-600" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="text-teal-600 text-sm">Forgot Password?</a>
        </div>
  
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  

  );
};

export default Login;
