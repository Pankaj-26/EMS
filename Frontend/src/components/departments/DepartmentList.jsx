import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
const DepartmentList = () => {
  const [depLoading, setDepLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
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
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons />,
          }));
          setDepartments(data);
        }
      } catch (e) {
        if (e.response && !e.response.data.success) {
          alert(e.response.data.error);
        }
      }finally{
        setDepLoading(false)
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="px-4 py-0.5 border"
              placeholder="Search by department name"
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add Department
            </Link>
          </div>
          <div>
            <DataTable columns={columns} data={departments} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
