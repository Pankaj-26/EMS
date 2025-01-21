import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name:"",
    maritalStaus:"",
    designation:"",
    salary:0,
    department:""
  });
 const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();

  const {id}=useParams()


    useEffect(() => {
      const getDepartments = async () => {
        try {
          const departments = await fetchDepartments();
          setDepartments(departments);
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };
      getDepartments();
    }, []);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch departments from the API
  useEffect(() => {
    const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `https://ems-server-i6vf.onrender.com/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (response.data.success) {
            const employee=response.data.employee
           
            setEmployee((prev) => ({ ...prev, name: employee.userId.name, maritalStatus:employee.maritalStatus,
                designation:employee.designation,
                salary:employee.salary,
                department:employee.department.dep_name
              }));
          }
        } catch (e) {
          if (e.response && !e.response.data.success) {
            alert(e.response.data.error);
          }
        }
      };
      fetchEmployee();
  
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
   

    e.preventDefault();
      
    try {
      const response = await axios.put(
        `https://ems-server-i6vf.onrender.com/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data && response.data.success) {
        alert("Employee added successfully!");
        navigate("/admin-dashboard/employees");
      } else {
        alert(response.data?.error || "Unexpected error occurred.");
      }
    } catch (e) {
      console.error("Error submitting form:", e);
      alert(
        e.response?.data?.error ||
        "Unable to connect to the server. Please try again."
      );
    }
  };

  return (
<>
{departments && employee?(  <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit  Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={employee.name}
              placeholder="Enter Name"
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            />
          </div>

      

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              onChange={handleChange}
              value={employee.maritalStatus}
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              onChange={handleChange}
              type="text"
              name="designation"
              value={employee.designation}
              placeholder="Enter Designation"
              className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>


          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              onChange={handleChange}
              type="number"
              value={employee.salary}
              name="salary"
              placeholder="Enter Salary"
              className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          
          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              onChange={handleChange}
              name="department"
              value={employee.department}
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
</div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded"
        >
          Edit Employee
        </button>
      </form>
    </div>): <div>Loading...</div> }
</>


  
  );
};

export default Edit;
