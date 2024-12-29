import axios from "axios";


export const fetchDepartments = async () => {

    let departments
   
    try {
      const response = await axios.get("http://localhost:5000/api/department/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
       departments=response.data.departments
      }
    } catch (e) {
      if (e.response && !e.response.data.success) {
        alert(e.response.data.error);
      }
    } 
    return departments;
  };



import { useNavigate } from "react-router-dom";

export const EmployeeButtons = ({ _id, }) => {
  const navigate = useNavigate();



  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-500 text-white"
      
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white"
      >
        salary
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white"
      >
        leave
      </button>
    </div>
  );
};



export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Employee Name",
    selector: (row) => row.name,
    sortable: true,
    width:"90px"
  },
  {
    name: "Profile",
    selector: (row) => row.profileImage,
    width:"120px"

    
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:"130px"
    
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width:"100px"

  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:"true"
  },
];