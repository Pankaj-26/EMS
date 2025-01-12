import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {

  const[summary,setSummary]=useState(null)

useEffect(()=>{
const fetchSummary=async()=>{
  try{
    const summary=await axios.get('http://localhost:5000/api/dashboard/summary',{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    setSummary(summary.data)

  }catch(error){
    if(error.response){
      alert(error.response.data.error)
    }
console.log(error.message)
  }
}
fetchSummary()
},[])

console.log(summary)


if(!summary){
  return <div>Loading...</div>
}


  return (
    <div className="p-8  rounded-lg   ">
     <div className="flex flex-col p-8 overflow-hidden w-full h-full rounded-lg shadow-lg bg-gradient-to-r from-teal-100 to-teal-200">
     <h3 className="text-4xl font-semibold text-gray-800 mb-10">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 m-4">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-gradient-to-r from-teal-500 to-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-gray-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalary}
          color="bg-yellow-600"
        />
      </div>
      <div className="mt-12 text-gray-800 mb-10">
        <h4>Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 m-4">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-gradient-to-r from-teal-500 to-teal-600"
          />{" "}
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
             color="bg-gradient-to-r from-green-500 to-green-600"
          />{" "}
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />{" "}
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
     </div>
    </div>




  

  );
};

export default AdminSummary;
