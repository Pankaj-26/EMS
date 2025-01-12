import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons,columns } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
const EmployeeeList = () => {

 const [depLoading, setDepLoading] = useState(false);
  const [employees, setEmployees] = useState([]); 
  const [filteredEmployees, setFilteredEmployees] = useState([]); 


 

  useEffect(() => {
    const fetchEmployees = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        

      console.log(response.data.employees)
        if (response.data.success) {
          let sno = 1;
        
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name:emp.userId.name,
            dob:new Date(emp.dob).toDateString(),
            profileImage: <img className='rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`} alt="" />  ,
            action: (<EmployeeButtons id={emp._id}/>),
          }));
       
          setEmployees(data);
         
          setFilteredEmployees(data); // Initially, show all Employees
        }
        
      } catch (e) {
        if (e.response && !e.response.data.success) {
          alert(e.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchEmployees();
  }, []);



const handleFilter = (e) => {
  const searchValue = e.target.value.toLowerCase();
  
  const records = employees.filter((emp) => 
    emp.name.toLowerCase().includes(searchValue)
  );
  
  setFilteredEmployees(records);
};



  return (
    <div className="p-8 bg-white rounded-lg shadow-md"> 
           <div className="text-center text-black">
    <h3 className="text-2xl font-bold">Manage Employees</h3>
  </div>
  <div className="flex justify-between text-black items-center">
    <input
      type="text"
      className="px-4 py-0.5 border"
      placeholder="Search by department name"
      onChange={handleFilter}
    />
    <Link
      to="/admin-dashboard/add-employee"
      className="px-4 py-1 bg-teal-600 rounded text-white"
    >
      Add Employee
    </Link>
  </div>
  <DataTable  columns={columns} data={filteredEmployees} pagination />
  </div>


  )
}

export default EmployeeeList
