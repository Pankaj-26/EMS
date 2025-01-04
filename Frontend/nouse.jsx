// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";
// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]);
// const [filteredDepartments, setFilteredDepartments]=useState([]);
//   const departmentDelete = (_id) => {
//     setDepartments(prevDepartments =>
//       prevDepartments.filter(department => department._id !== _id)
//     );
//   };


//   useEffect(() => {
//     const fetchDepartments = async () => {
      
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
        

//         if (response.data.success) {
//           let sno = 1;
//           const data = await response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: <DepartmentButtons _id={dep._id} departmentDelete={departmentDelete} />,
//           }));
//           setDepartments(data);
//           filteredDepartments(data)
//         }
//       } catch (e) {
//         if (e.response && !e.response.data.success) {
//           alert(e.response.data.error);
//         }
//       }finally{
//         setDepLoading(false)
//       }
//     };

//     fetchDepartments();
//   }, []);



// const filterDepartments=(e)=>{

//   const record=departments.filter((dep)=>{
//     dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())

//   })
//   setFilteredDepartments(record);
// }


//   return (
//     <>
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="p-5">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               onChange={(e)=>filterDepartments(e)}
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable columns={columns} data={departments} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentList;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);

//   const departmentDelete = (_id) => {
//     setDepartments((prevDepartments) =>
//       prevDepartments.filter((department) => department._id !== _id)
//     );
//   };

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: <DepartmentButtons _id={dep._id} departmentDelete={departmentDelete} />,
//           }));
//           setDepartments(data);
//           setFilteredDepartments(data); // Fix here
//         }
//       } catch (e) {
//         if (e.response && !e.response.data.success) {
//           alert(e.response.data.error);
//         }
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const filterDepartments = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     const record = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(searchValue) // Fix here
//     );
//     setFilteredDepartments(record);
//   };

//   return (
//     <>
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="p-5">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               onChange={filterDepartments} // Pass function reference directly
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             {/* Use filteredDepartments instead of departments */}
//             <DataTable columns={columns} data={filteredDepartments} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentList;


// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState (false);
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);

//   const departmentDelete = (_id) => {
//     setDepartments((prevDepartments) => {
//       const updatedDepartments = prevDepartments.filter(
//         (department) => department._id !== _id
//       );
//       setFilteredDepartments((prevFiltered) =>
//         prevFiltered.filter((department) => department._id !== _id)
//       );
//       return updatedDepartments;
//     });
//   };

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: <DepartmentButtons _id={dep._id} departmentDelete={departmentDelete} />,
//           }));
//           setDepartments(data);
//           setFilteredDepartments(data); // Initialize both states
//         }
//       } catch (e) {
//         if (e.response && !e.response.data.success) {
//           alert(e.response.data.error);
//         }
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const filterDepartments = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     const record = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(searchValue)
//     );
//     setFilteredDepartments(record);
//   };

//   return (
//     <>
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="p-5">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               onChange={filterDepartments}
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable columns={columns} data={filteredDepartments} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentList;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);

//   const departmentDelete = (_id) => {
//     console.log("Deleting department with ID:", _id); // Debugging

//     // Update departments
//     const updatedDepartments = departments.filter(
//       (department) => department._id !== _id
//     );
//     setDepartments(updatedDepartments);

//     // Update filteredDepartments
//     const updatedFilteredDepartments = filteredDepartments.filter(
//       (department) => department._id !== _id
//     );
//     setFilteredDepartments(updatedFilteredDepartments);

//     // Log new states for debugging
//     console.log("Updated departments:", updatedDepartments);
//     console.log("Updated filteredDepartments:", updatedFilteredDepartments);
//   };

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: (
//               <DepartmentButtons
//                 _id={dep._id}
//                 departmentDelete={departmentDelete}
//               />
//             ),
//           }));
//           setDepartments(data);
//           setFilteredDepartments(data); // Initialize both states
//         }
//       } catch (e) {
//         if (e.response && !e.response.data.success) {
//           alert(e.response.data.error);
//         }
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const filterDepartments = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     const record = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(searchValue)
//     );
//     setFilteredDepartments(record);
//   };

//   return (
//     <>
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="p-5">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               onChange={filterDepartments}
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable columns={columns} data={filteredDepartments} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DepartmentList;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);

  // const departmentDelete = (_id) => {
  //   const updatedDepartments = departments.filter(
  //     (department) => department._id !== _id
  //   );

  //   const updatedFilteredDepartments = filteredDepartments.filter(
  //     (department) => department._id !== _id
  //   );

  //   setDepartments(updatedDepartments);
  //   setFilteredDepartments(updatedFilteredDepartments);
  // };
//   const departmentDelete = (_id) => {
//     const updatedDepartments = departments.filter(
//       (department) => department._id !== _id
//     );
  
//     const updatedFilteredDepartments = filteredDepartments.filter(
//       (department) => department._id !== _id
//     );
  
//     setDepartments(updatedDepartments);
//     setFilteredDepartments(updatedFilteredDepartments); // This ensures that the UI updates instantly
//   };
  

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: (
//               <DepartmentButtons
//                 _id={dep._id}
//                 departmentDelete={departmentDelete} // Pass delete function
//               />
//             ),
//           }));
//           setDepartments(data);
//           setFilteredDepartments(data);
//         }
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const filterDepartments = (e) => {
//     const query = e.target.value.toLowerCase();
//     const filtered = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(query)
//     );
//     setFilteredDepartments(filtered);
//   };

//   return (
//     <div className="p-5">
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               onChange={filterDepartments}
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable
//               columns={columns}
//               data={filteredDepartments} // Use filteredDepartments here
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [filteredDepartments, setFilteredDepartments] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // Store search query

//   const departmentDelete = (_id) => {
//     const updatedDepartments = departments.filter(
//       (department) => department._id !== _id
//     );

//     const updatedFilteredDepartments = filteredDepartments.filter(
//       (department) => department._id !== _id
//     );

//     setDepartments(updatedDepartments);
//     setFilteredDepartments(updatedFilteredDepartments); // Update filtered departments as well
//   };

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: (
//               <DepartmentButtons
//                 _id={dep._id}
//                 departmentDelete={departmentDelete} // Pass delete function
//               />
//             ),
//           }));
//           setDepartments(data);
//           setFilteredDepartments(data); // Initialize filtered departments with all departments
//         }
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Filter departments based on search query
//   const filterDepartments = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query); // Store search query

//     const filtered = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(query)
//     );
//     setFilteredDepartments(filtered);
//   };

//   return (
//     <div className="p-5">
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               value={searchQuery} // Bind search query to input value
//               onChange={filterDepartments}
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable
//               columns={columns}
//               data={filteredDepartments} // Use filteredDepartments for data
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]); // Store all departments
//   const [filteredDepartments, setFilteredDepartments] = useState([]); // Store filtered departments
//   const [searchQuery, setSearchQuery] = useState(""); // Track the search query

//   // Function to delete a department
//   const departmentDelete = (_id) => {
//     // Update both the full department list and the filtered list after deletion
//     const updatedDepartments = departments.filter(
//       (department) => department._id !== _id
//     );

//     // Update the filtered list based on the search query
//     if (searchQuery) {
//       const updatedFilteredDepartments = updatedDepartments.filter((department) =>
//         department.dep_name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredDepartments(updatedFilteredDepartments);
//     } else {
//       setFilteredDepartments(updatedDepartments); // If no search, show all departments
//     }

//     setDepartments(updatedDepartments); // Update the full departments list
//   };

//   // Fetch departments from the API
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setDepLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5000/api/department/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data.success) {
//           let sno = 1;
//           const data = response.data.departments.map((dep) => ({
//             _id: dep._id,
//             sno: sno++,
//             dep_name: dep.dep_name,
//             action: (
//               <DepartmentButtons
//                 _id={dep._id}
//                 departmentDelete={departmentDelete} // Pass delete function
//               />
//             ),
//           }));

//           setDepartments(data); // Set all departments
//           setFilteredDepartments(data); // Initialize filtered departments
//         }
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setDepLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []); // Empty dependency array ensures this runs once when component mounts

//   // Filter departments based on search query
//   const filterDepartments = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query); // Update search query

//     // Filter departments based on the search query
//     const filtered = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(query)
//     );

//     setFilteredDepartments(filtered); // Update filtered departments
//   };

//   // Use filteredDepartments to render the DataTable
//   return (
//     <div className="p-5">
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               value={searchQuery} // Bind search query to input value
//               onChange={filterDepartments} // Update filtered list on search
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable
//               columns={columns}
//               data={filteredDepartments} // Always use filteredDepartments for the data
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
// import axios from "axios";

// const DepartmentList = () => {
//   const [depLoading, setDepLoading] = useState(false);
//   const [departments, setDepartments] = useState([]); // Full list of departments
//   const [filteredDepartments, setFilteredDepartments] = useState([]); // List of filtered departments
//   const [searchQuery, setSearchQuery] = useState(""); // Search query to filter departments

//   // Fetch the department list from the backend
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
//           action: (
//             <DepartmentButtons
//               _id={dep._id}
//               departmentDelete={departmentDelete} // Pass delete function
//             />
//           ),
//         }));

//         setDepartments(data); // Set the full list
//         setFilteredDepartments(data); // Initialize the filtered list with all departments
//       }
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//     } finally {
//       setDepLoading(false);
//     }
//   };

//   // Delete a department
//   const departmentDelete = (_id) => {
//     // Remove the department from both lists
//     const updatedDepartments = departments.filter((dep) => dep._id !== _id);

//     // Filter the updated list to match the current search query
//     const updatedFilteredDepartments = updatedDepartments.filter((department) =>
//       department.dep_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Update state
//     setDepartments(updatedDepartments); // Update full department list
//     setFilteredDepartments(updatedFilteredDepartments); // Update filtered department list
//   };

//   // Filter departments based on the search query
//   const filterDepartments = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query); // Update search query

//     // Filter based on search query
//     const filtered = departments.filter((dep) =>
//       dep.dep_name.toLowerCase().includes(query)
//     );

//     setFilteredDepartments(filtered); // Update filtered departments
//   };

//   // Fetch departments once when the component is mounted
//   useEffect(() => {
//     fetchDepartments();
//   }, []); // Empty dependency array ensures this runs only once

//   return (
//     <div className="p-5">
//       {depLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <div className="text-center">
//             <h3 className="text-2xl font-bold">Manage Departments</h3>
//           </div>
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               className="px-4 py-0.5 border"
//               placeholder="Search by department name"
//               value={searchQuery}
//               onChange={filterDepartments} // Update filtered list on search
//             />
//             <Link
//               to="/admin-dashboard/add-department"
//               className="px-4 py-1 bg-teal-600 rounded text-white"
//             >
//               Add Department
//             </Link>
//           </div>
//           <div className="mt-5">
//             <DataTable
//               columns={columns}
//               data={filteredDepartments} // Use filtered departments
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;




























"add leaves component"  


// import React, { useState } from 'react'
// import { useAuth } from '../../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const AddLeave = () => {
// const {user}=useAuth()
// const navigate =useNavigate()
// const [leave,setLeave]=useState({
// userId:user._id
// })

//     const handleChange=(e)=>{

//         const {name,value}=e.target;
//         setLeave((prev)=>({...prev, [name]:value}))

//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault()

//         console.log(leave)
//               try {
//                 const response = await axios.post(
//                   'http://localhost:5000/api/leave/add',leave,
//                   {
//                     headers: {
//                       Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                   }
//                 );

//                 if (response.data.success) {
//                  navigate("/employee-dashboard/leaves")
//                 }
//               } catch (e) {
//                 if (e.response && !e.response.data.success) {
//                   alert(e.response.data.error);
//                 }
//               }
//             };

//   return (
//     <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md text-black'>
//         <h2 className='text-2xl font-bold mb-6' >Request for leave</h2>
//         <form  onSubmit={handleSubmit}>
//             <div className='flex flex-col space-y-4'>
//                 <div>
//                     <label >Leave Type</label>
//                     <select name="leaveType"onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' id="">

// <option value="">Select Department</option>
// <option value="Sick Leave">Sick Leave</option>
// <option value="Casual Leave">Casual Leave  </option>
// <option value="Annual Leave">Annual Leave</option>

//                     </select>
//                 </div>
//                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                     <div>
//                         <label className='block text-sm font-medium text-gray-700'>From Date</label>
//                         <input type="date" name='startDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
//                     </div>
//                     {/* to date */}
//                     <div>
//                 <label className='block text-sm font-medium text-gray-700' >To Date</label>
//                 <input type="date" name='endDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
//                     </div>
//                 </div>
//                  {/* description */}
//                  <div>
//                     <label className='block text-em font-medium text-gray-700'>Description</label>
//                     <textarea name="reason" onChange={handleChange} className='w-full border border-gray-300' placeholder='Reason' id=""></textarea>
//                  </div>
//             </div>
//             <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Leave</button>
//         </form>

//     </div>
//   )
// }

// export default AddLeave