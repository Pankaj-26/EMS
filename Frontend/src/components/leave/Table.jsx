
import React, { useEffect, useState } from "react";
import { LeaveButtons, columns } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave/", {
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
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="px-4 py-0.5 border"
              placeholder="Search by Employee Id"
              onChange={filterByEmpId}
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"  onClick={()=>filterByButton("Pending")}>
                Pending
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700" onClick={()=>filterByButton("Rejected")} >
                Rejected
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"  onClick={()=>filterByButton("Approved")}>
                Approved
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable
              columns={columns}
              data={filteredLeaves || []} // Ensure fallback to an empty array
              pagination
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Table;
