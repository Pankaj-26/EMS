// import React, { useEffect, useState } from "react";
// import { fetchDepartments } from "../../utils/EmployeeHelper";
// import axios from "axios";

// const AddEmployee = () => {
// const [departments,setDepartments]=useState([])
// const [formData,setFormData]=useState({})


// const handleChange=(e)=>{
//     const {name,value,files}=e.target;

//     if(name==='image'){
//         setFormData(prev=>({...prev, [name]:files[0]}))
//     }else{
//     setFormData(prev=>({...prev, [name]:value}))
//     }
// }


// useEffect(()=>{
//     const getDepartments = async () => {
//         try {
//           const departments = await fetchDepartments();
//           setDepartments(departments); 
//         } catch (error) {
//           console.error("Error fetching departments:", error);
//         }
//       };
//       getDepartments();
// },[])


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataObj=new FormData()
//     Object.keys(formData).forEach((key)=>{
//         formDataObj.append(key, formData[key])
//     })
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/employee/add",
//         formDataObj,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         navigate("/admin-dashboard/employees");
//       }
//     } catch (e) {
//       if (e.response && !e.response.data.success) {
//         alert(e.response.data.error);
//       }
//     }
//   };


//   return (
//     <div className="max-w--4xl  mx-auto bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Add new employee</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//             onChange={handleChange}
//               type="text"
//               name="name"
              
//               placeholder="Enter Name"
//               className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//             onChange={handleChange}
//               type="text"
//               name="email"
//               placeholder="Enter email"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Employee Id
//             </label>
//             <input
//             onChange={handleChange}
//               type="text"
//               name="employeeid"
//               placeholder="Enter EmpId"
//               className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Date of Birth
//             </label>
//             <input
//             onChange={handleChange}
//               type="date"
//               name="dob"
//               placeholder="Enter dob"
//               className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               {" "}
//               Gender
//             </label>
//             <select
//             onChange={handleChange}
//               name="gender"
//               className="text-black mt-1 p-2 block w-full border border-gray-300  "
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>

//               <option value="female">Female</option>

//               <option value="others">Others</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text -sm font-medium text-gray-700">
//               Marital Status
//             </label>
//             <select
//             onChange={handleChange}
//               name="maritalStatus"
//               placeholder="Marital Status"
//               className="mt-1 p-2 block w-full border border-gray-700 text-black"
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="single">Single</option>
//               <option value="married">Married</option>
//             </select>
//           </div>

//           {/* designation */}

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Designation
//             </label>
//             <input
//             onChange={handleChange}
//               type="text"
//               name="designation"
//               placeholder="Designation"
//               className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Department</label>
//             <select
//             onChange={handleChange}
//               name="department"
//               className="mt-1 p-2 block w-full border text-black border-gray-300 rounded-md"
             
//             >
//               <option value="">Select Department</option>
//               {departments.map((dep)=>(
//                 <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Salary
//             </label>
//             <input
//             onChange={handleChange}
//               type="number"
//               name="salary"
//               className="mt-1 p-2 block w-full text-black border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//             onChange={handleChange}
//               type="password"
//               name="password"
//               placeholder="*******"
              
//               className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text -sm font-medium text-gray-700">
//               Role
//             </label>
//             <select
//             onChange={handleChange}
//               name="role"
//               placeholder="role"
//               className="mt-1 p-2 block w-full border border-gray-700 text-black"
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="employee">Employee</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Upload Image
//             </label>
//             <input
//             onChange={handleChange}
//               type="file"
//               name="image"
//               accept="image/*"
//               placeholder="upload image"
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             />
//           </div>

//         </div>
        
//         <button
//             type="submit"
//             className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded"
//           >
//             Add Employee
//           </button>
//       </form>
//     </div>
//   );
// };

// export default AddEmployee;



import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file && !file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Fetch departments from the API
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

  // Handle form submission
  const handleSubmit = async (e) => {
   

    e.preventDefault();

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    for (let [key, value] of formDataObj.entries()) {
      console.log(`${key}: ${value}`);
  }
   
      
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        formDataObj,
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
    <div className="max-w-4xl mx-auto  bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter Name"
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter Email"
              className="mt-1 p-2 text-black block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              onChange={handleChange}
              type="text"
              name="employeeId"
              placeholder="Enter Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              onChange={handleChange}
              type="date"
              name="dob"
              placeholder="Enter Date of Birth"
              className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              onChange={handleChange}
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              onChange={handleChange}
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
              placeholder="Enter Designation"
              className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              onChange={handleChange}
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

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              onChange={handleChange}
              type="number"
              name="salary"
              placeholder="Enter Salary"
              className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter Password"
              className="mt-1 text-black p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              onChange={handleChange}
              name="role"
              className="mt-1 p-2 block w-full border border-gray-300 text-black rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              onChange={handleChange}
              type="file"
              name="image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
