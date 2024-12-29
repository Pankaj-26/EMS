


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [depLoading, setDepLoading] = useState(false);
  const [departments, setDepartments] = useState([]); // Full department list
  const [filteredDepartments, setFilteredDepartments] = useState([]); // Filtered department list

  // Function to delete a department
  const departmentDelete = (_id) => {
    setDepartments(prevDepartments =>
      prevDepartments.filter(department => department._id !== _id)
    );
  };

  // Fetch departments from API on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/department/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons _id={dep._id} departmentDelete={departmentDelete} />,
          }));
          setDepartments(data);
          setFilteredDepartments(data); // Initially, show all departments
        }
      } catch (e) {
        if (e.response && !e.response.data.success) {
          alert(e.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Filter departments based on the search query
  const filterDepartments = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(query)
    );
    setFilteredDepartments(filtered); // Update filtered departments
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="px-4 py-0.5 border"
              placeholder="Search by department name"
              onChange={filterDepartments} // Trigger filter on input change
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
