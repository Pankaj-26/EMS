
import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"


const addLeave=async(req,res)=>{
    try {
        const {
        userId,
          leaveType,
          startDate,
          endDate,
          reason,
        } = req.body
    
        const employee=await Employee.findOne({userId})
       
        const newLeave = new Leave({
            employeeId:employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        })
    
        await newLeave.save()
    
        return res
          .status(200)
          .json({ success: true, message: 'Leave added successfully' })
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: 'leave added server error' })
      }

}


const getLeave=async(req,res)=>{

    
    try{
        const {id}=req.params;
        const employee=await Employee.findOne({userId:id});

        const leaves=await Leave.find({employeeId: employee._id})

// if (!leaves.length) {
//   return res.status(404).json({ success: false, message: "No Leaves found" });
// }

        return res.status(200).json({ success: true,  leaves });

    }catch(error){
       return res.status(500).json({ success: false, message: "Server error" });

}

}

export {getLeave,addLeave}