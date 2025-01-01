import axios from "axios";

export const fetchDepartments = async () => {
  let departments;

  try {
    const response = await axios.get("http://localhost:5000/api/department/", {
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
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/employees/${id}`)}
      >
        View
      </button>
      <button className="px-3 py-1 bg-blue-500 text-white" onClick={() => navigate(`/employees/edit/${id}`)}>Edit</button>
      <button className="px-3 py-1 bg-yellow-500 text-white" onClick={() => navigate(`/employees/salary/${id}`)}>salary</button>
      <button className="px-3 py-1 bg-gray-500 text-white">leave</button>
    </div>
  );
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "50px",
  },
  {
    name: "Employee Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Profile",
    selector: (row) => row.profileImage,
    width: "100px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "140px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
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
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
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