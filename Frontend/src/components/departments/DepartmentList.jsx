


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [depLoading, setDepLoading] = useState(false);
  const [departments, setDepartments] = useState([]); 
  const [filteredDepartments, setFilteredDepartments] = useState([]); 

  // Function to delete a department
  const departmentDelete = (_id) => {
    
    fetchDepartments();

   
  };
  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("https://ems-server-i6vf.onrender.com/api/department/", {
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

  // Fetch departments from API on component mount
  useEffect(() => {
    

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
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-700">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="px-4 py-0.5 border text-black"
              placeholder="Search by department name"
              onChange={filterDepartments} // Trigger filter on input change
            />
            <Link
              to="/admin-dashboard/add-department"
               className="px-6 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
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



// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]); 
//   const [filteredDepartments, setFilteredDepartments] = useState([]); 

//   // Function to delete a department
//   const departmentDelete = (_id) => {
//     fetchDepartments();
//   };

//   const fetchDepartments = async () => {
//     setDepLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/department/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.data.success) {
//         let sno = 1;
//         const data = response.data.departments.map((dep) => ({
//           _id: dep._id,
//           sno: sno++,
//           dep_name: dep.dep_name,
//           action: <DepartmentButtons _id={dep._id} departmentDelete={departmentDelete} />,
//         }));
//         setDepartments(data);
//         setFilteredDepartments(data); 
//       }
//     } catch (e) {
//       if (e.response && !e.response.data.success) {
//         alert(e.response.data.error);
//       }
//     } finally {
//       setDepLoading(false);
//     }
//   };

//   // Fetch departments from API on component mount
//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   // Filter departments based on the search query
//   const filterDepartments = (e) => {
//     const query = e.target.value.toLowerCase();
//     const filtered = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(query)
//     );
//     setFilteredDepartments(filtered); // Update filtered departments
//   };

//   return (
//     <>
//       {depLoading ? (
//         <div className="flex justify-center items-center h-96">
//           <div className="text-lg font-medium">Loading...</div>
//         </div>
//       ) : (
//         <div className="p-6 bg-gray-100 min-h-screen">
//           <div className="text-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-700">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center bg-white p-4 rounded shadow-md">
//             <input
//               type="text"
//               className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Search by department name"
//               onChange={filterDepartments} // Trigger filter on input change
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-6 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-6 bg-white p-4 rounded shadow-md">
//             <DataTable columns={columns} data={filteredDepartments} pagination />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentList;
