import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const LeaveDetail = () => {

const [leave,setLeave]=useState(null)
    const { id } = useParams();
const navigate=useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
            setLeave(response.data.leave);
        }
      } catch (e) {
        if (e.response && !e.response.data.success) {
          alert(e.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);


const changeStatus=async(id,status)=>{

    try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`,{status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
           navigate("/admin-dashboard/leaves")
        }
      } catch (e) {
        if (e.response && !e.response.data.success) {
          alert(e.response.data.error);
        }
      }

}



    
  return (
  
<>
      {leave ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border w-40 h-40 object-cover shadow-md"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <p className="font-semibold">Name:</p>
                <p className="text-gray-600">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">Employee ID:</p>
                <p className="text-gray-600">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">Leave Type:</p>
                <p className="text-gray-600">{leave.leaveType}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">Reason:</p>
                <p className="text-gray-600">{leave.reason}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">Department:</p>
                <p className="text-gray-600">{leave.employeeId.department.dep_name}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">Start Date:</p>
                <p className="text-gray-600">{new Date(leave.startDate).toDateString()}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="font-semibold">End Date:</p>
                <p className="text-gray-600">{new Date(leave.endDate).toDateString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="font-semibold text-lg">
              {leave.status === "Pending" ? "Action Required:" : "Status:"}
            </p>
            {leave.status === "Pending" ? (
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={() => changeStatus(leave._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => changeStatus(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="mt-4 text-gray-600 font-medium">{leave.status}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">Loading...</div>
      )}
    </>
  )
}

export default LeaveDetail