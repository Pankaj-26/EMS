import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,

    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  

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

    setSalary((prev) => ({ ...prev, [name]: value }));
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add/`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data && response.data.success) {
        alert("Salary added successfully!");
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

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  return (
    <>
      {departments  ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  onChange={handleDepartment}
                  name="department"
                 
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

              {/* Employee */}
              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  onChange={handleChange}
                  name="employeeId"
                  className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="basicSalary"
                  placeholder="Enter basic Salary"
                  className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowance
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="allowances"
                  placeholder="allowances"
                  className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* deduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="deductions"
                  placeholder="deductions"
                  className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PayDate
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="payDate"
                  placeholder="pay Date"
                  className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Add;
