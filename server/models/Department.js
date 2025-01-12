import mongoose from "mongoose";
import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";



const departmentSchema=new mongoose.Schema({
    dep_name:{type:String,required:true},
    description:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},


})



departmentSchema.pre(
    "deleteOne",
    { document: true, query: false },
    async function (next) {
      try {
        const departmentId = this._id; // Document reference
        
        // Find all employees linked to this department
        const employees = await Employee.find({ department: departmentId });
        const empIds = employees.map((emp) => emp._id);
  
        // Cascade delete related data
        await Employee.deleteMany({ department: departmentId });
       
  
        await Leave.deleteMany({ employeeId: { $in: empIds } });
        
        await Salary.deleteMany({ employeeId: { $in: empIds } });
       
  
        next();
      } catch (error) {
        console.error("Error in department pre-delete middleware:", error);
        next(error);
      }
    }
  );

const Department=mongoose.model("Department", departmentSchema)

export default Department;