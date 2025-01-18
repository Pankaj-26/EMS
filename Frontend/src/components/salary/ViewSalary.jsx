import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewSalary = () => {

  const [salaries,setSalaries]=useState(null);
  const [filtered,setFiltered]=useState(null);

  const {id}=useParams();
  let sno=1;

const fetchSalaries=async()=>{

  try{
    const response=await axios.get(`https://ems-server-i6vf.onrender.com/api/salary/view/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data.salary)
    if(response.data.success){
     
      setSalaries(response.data.salary);
      setFiltered(response.data.salary);
    }
  }catch(error){
    if(error.response&& !error.response.data.success){
      alert(error.message)
    }

  }

}

useEffect(()=>{
  fetchSalaries()
},[])

const filterSalaries = (e) => {
  if (!salaries) return;
  const searchTerm = e.target.value.toLowerCase();
  const filteredRecords = salaries.filter((leave) =>
    leave.employeeId.toLowerCase().includes(searchTerm)
  );
  setFiltered(filteredRecords);
};



  return (
    <>
    {filtered===null?(
      <div>Loading....</div>
    ):(

      <div >
        <div className='overflow-x-auto p-5 '>
        <div className='text-center'>
          <h2 className='text-2xl  font-bold'>Salary history</h2>
        </div>
        <div className='flex justify-end my-3'>
         
        </div>
        {filtered && filtered.length>0?(
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
              <tr>
                <th  className='px-6 py-3'>S.N0</th>
                <th  className='px-6 py-3'>Emp Id</th>
                <th  className='px-6 py-3'>Salary</th>
                <th  className='px-6 py-3'>Allowance</th>
                <th  className='px-6 py-3'>Deduction</th>
                <th  className='px-6 py-3'>Total</th>
                <th className='px-6 py-3'>Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((salary)=>(
                <tr key={salary.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td className='px-6 py-3'>{sno++}</td>
                  <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                  <td className='px-6 py-3'>{salary.basicSalary}</td>
                  <td className='px-6 py-3'>{salary.allowances}</td>
                  <td className='px-6 py-3'>{salary.deductions}</td>
                  <td className='px-6 py-3'>{salary.netSalary}</td>
                  <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ): <div>No Record</div> }

      </div>
      </div>

    )}

    </>
  )
}

export default ViewSalary



