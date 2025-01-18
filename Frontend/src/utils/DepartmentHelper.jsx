
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DepartmentButtons = ({ _id, departmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `https://ems-server-i6vf.onrender.com/api/department/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          console.log(`Department with ID ${_id} deleted successfully.`);
          departmentDelete(); // Call the prop function to update state
        } else {
          console.error("Failed to delete department:", response.data.error);
        }
      } catch (e) {
        if (e.response && e.response.data.error) {
          alert(e.response.data.error);
        } else {
          console.error("Error during delete:", e);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 rounded py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 rounded py-1 bg-red-500 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};



