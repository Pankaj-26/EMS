
import React, { useEffect, useState } from "react";
import { LeaveButtons, columns } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://ems-server-i6vf.onrender.com/api/leave/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;

        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data); 
      }
    } catch (e) {
      if (e.response && !e.response.data.success) {
        alert(e.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByEmpId = (e) => {
    const value = e.target.value.toLowerCase();
    console.log("Input value:", value);
    console.log("Leaves:", leaves);

    if (!value) {
      setFilteredLeaves(leaves);
      console.log("Resetting filteredLeaves to full data.");
      return;
    }

    const filtered = leaves.filter((leave) =>
      leave.employeeId?.toLowerCase().includes(value)
    );

    console.log("Filtered data:", filtered);
    setFilteredLeaves(filtered);
  };


  const filterByButton = (status) => {
    if (!status) {
      setFilteredLeaves(leaves);
      return;
    }
  
    const filtered = leaves.filter((leave) =>
      leave.status?.toLowerCase() === status.toLowerCase()
    );
  
    setFilteredLeaves(filtered);
  };
  

 

  return (

    <>
  {leaves ? (
    <div className="p-8 bg-white rounded-lg shadow-md h-screen">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-800">Manage Leaves</h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative text-black w-1/3">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search by Employee Id"
            onChange={filterByEmpId}
          />
        </div>

        <div className="space-x-4">
          <button
            className="px-5 py-2 bg-teal-600 text-white font-medium rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => filterByButton("Rejected")}
          >
            Rejected
          </button>
          <button
            className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => filterByButton("Approved")}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredLeaves || []} // Ensure fallback to an empty array
          pagination
          className="shadow-md rounded-lg border"
        />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <span className="text-lg font-semibold text-gray-600">Loading...</span>
    </div>
  )}
</>

  );
};

export default Table;
