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

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 rounded bg-teal-500 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>
      <button className="px-3 rounded py-1 bg-blue-500 text-white" onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}>Edit</button>
      <button className="px-3 rounded py-1 bg-yellow-500 text-white" onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}>salary</button>
      <button className="px-3 rounded py-1 bg-gray-500 text-white" onClick={() => navigate(`/admin-dashboard/employee/leaves/${id}`)}>leave</button>
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
    name: "Employee Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Profile",
    selector: (row) => row.profileImage,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px",
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
   
    width: "160px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];



// Employee for salary

export const getEmployees = async (id) => {
  let employees;

  try {
    const response = await axios.get(`https://ems-server-i6vf.onrender.com/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (e) {
    if (e.response && !e.response.data.success) {
      alert(e.response.data.error);
    }
  }
  return employees;
};
