import axios from "axios";

export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get("https://ems-server-i6vf.onrender.com/api/department/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (e) {
    if (e.response && !e.response.data.success) {
      alert(e.response.data.error);
    }
  }
  return departments;
};

import { useNavigate } from "react-router-dom";

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleView=(id)=>{
    navigate(`/admin-dashboard/leaves/${id}`)
  }

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 rounded py-1 bg-teal-600 text-white"
        onClick={() => handleView(id)}
      >
        View
      </button>
     
    </div>
  );
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "100px",
  },
  {
    name: "Employee Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "180px",
  },
   {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "160px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "200px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "150px",
  },
  {
    name: "Status",
    selector: (row) => row.status,

    width: "160px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];



