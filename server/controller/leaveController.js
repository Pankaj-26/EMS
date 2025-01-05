import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body

    const employee = await Employee.findOne({ userId })

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
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

// const getLeave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let leaves=await Leave.findOne({employeeId:id})

//     if(!leaves){
//       const employee = await Employee.findOne({ userId: id })

//        leaves = await Leave.find({ employeeId: employee._id })
//     }
    


//     return res.status(200).json({ success: true, leaves })
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Server error' })
//   }
// }

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch leaves directly associated with the employeeId
    let leaves = await Leave.find({ employeeId: id }).populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name profileImage" },
        { path: "department", select: "dep_name" },
      ],
    });

    // If no leaves are found, look for the Employee by userId and fetch leaves for their _id
    if (leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        leaves = await Leave.find({ employeeId: employee._id }).populate({
          path: "employeeId",
          populate: [
            { path: "userId", select: "name profileImage" },
            { path: "department", select: "dep_name" },
          ],
        });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error in getLeave:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: "dep_name",
        },
        {
          path: "userId",
          select: 'name',
        },
      ],
    })

    return res.status(200).json({ success: true, leaves })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getLeaveDetail = async (req, res) => {

  const {id}=req.params;
  try {
    const leave = await Leave.findById({_id:id}).populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: "dep_name",
        },
        {
          path: "userId",
          select: 'name profileImage',
        },
      ],
    })

    return res.status(200).json({ success: true, leave })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}


const updateLeave=async(req,res)=>{
  
  try {
    const { id } = req.params
    const leave = await Leave.findByIdAndUpdate({ _id: id },{status:req.body.status})

   if(!leave){
    return res.status(404).json({ success: false, message: 'leave not found' })
   }

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Leave update Server error' })
  }
}



export { getLeave, addLeave, getLeaves,getLeaveDetail,updateLeave }
