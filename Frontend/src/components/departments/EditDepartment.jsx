// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'

// const EditDepartment = () => {
//     const {id}=useParams();
//     const [department,setDepartment] = useState([])


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDepartment({ ...department, [name]: value });
//       };
// const handleSubmit=()=>{

// } 

//     useEffect(() => {
//         const fetchDepartments = async () => {
          
//           setDepLoading(true);
//           try {
//             const response = await axios.get(`http://localhost:5000/api/department/&{id}`, {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             });
            
    
//             if (response.data.success) {
          
//               setDepartment(response.data.department);
//             }
//           } catch (e) {
//             if (e.response && !e.response.data.success) {
//               alert(e.response.data.error);
//             }
//           }finally{
//             setDepLoading(false)
//           }
//         };
    
//         fetchDepartments();
//       }, []);
//   return (
//     <div className="flex justify-center mt-10">
//       <div className="max-w-3xl bg-white p-8 rounded-md shadow-md w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Department</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label
//               htmlFor="dep_name"
//               className="text-sm font-medium text-gray-600 block mb-2"
//             >
//               Department Name
//             </label>
//             <input
//               type="text"
//               name="dep_name"
//               placeholder="Enter department name"
//               className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//               value={department.dep_name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="description"
//               className="text-sm font-medium text-gray-600 block mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Enter department description"
//               className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//               value={department.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
//           >
//             Edit Department
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditDepartment




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    dep_name: '',
    description: '',
  });
  const [depLoading, setDepLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department.dep_name || !department.description) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      }
    } catch (e) {
      if (e.response) {
        setError(e.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
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
  }, [id]);

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-3xl bg-white p-8 rounded-md shadow-md w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Department</h2>
        {error && <div className="text-red-500">{error}</div>}
        {depLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="dep_name"
                className="text-sm font-medium text-gray-600 block mb-2"
              >
                Department Name
              </label>
              <input
                type="text"
                name="dep_name"
                placeholder="Enter department name"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={department.dep_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-600 block mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter department description"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={department.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
            >
              Edit Department
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDepartment;
