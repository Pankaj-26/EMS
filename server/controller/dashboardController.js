import Department from "../models/Department.js"
import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js";
import Salary from "../models/Salary.js";


const getSummary=async(req,res)=>{
    try{

        const totalEmployees=await Employee.countDocuments()

        const totalDepartments=await Department.countDocuments();

        const totalSalaries=await Employee.aggregate([{$group:{_id:null,totalSalary:{$sum:{ $toDouble: "$salary" }}}}])

        

        const empAppliedForLeave=await Leave.distinct('employeeId');

        const leaveStatus=await Leave.aggregate([{$group:{_id:"$status",count:{$sum:1}}}])

        const leaveSummary={
            appliedFor:empAppliedForLeave.length,
            approved:leaveStatus.find(e=>e._id==='Approved')?.count||0,
            rejected:leaveStatus.find(e=>e._id==='Rejected')?.count||0,
            pending:leaveStatus.find(e=>e._id==='Pending')?.count||0,
            
        }

        return res.status(200).json({success:true,
            totalEmployees,
            totalDepartments,
            totalSalary:totalSalaries.length > 0 ? totalSalaries[0].totalSalary : 0,
            leaveSummary

        })

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success:false,error:"dashboard summary error"})

    }

}

export {getSummary}