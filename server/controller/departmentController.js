import Department from '../models/Department.js'

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body
    const newDepartment = new Department({
      dep_name,
      description,
    })

    await newDepartment.save()
    return res.status(200).json({ success: true, depatment: newDepartment })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'add department server error' })
  }
}

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()

    return res.status(200).json({ success: true, departments })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'add department server error' })
  }
}

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params
    const department = await Department.findById({ _id: id })
    return res.status(200).json({ success: true, department })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'get department server error' })
  }
}

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params
    const { dep_name, description } = req.body 
    
    const existingDepartment = await Department.findById(id)
    if (!existingDepartment) {
      return res
        .status(404)
        .json({ success: false, error: 'Department not found' })
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name, description }, 
      { new: true }, 
    )

    return res.status(200).json({
      success: true,
      department: updatedDepartment, 
    })
  } catch (error) {
    
    console.error('Error updating department:', error)

    return res.status(500).json({
      success: false,
      error: 'Edit department server error',
    })
  }
}

const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find()

    return res.status(200).json({ success: true, departments })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'add department server error' })
  }
}


// const deleteDepartment=async()=>{
//     try {
//         const { id } = req.params
//         const { dep_name, description } = req.body 
        
//         const existingDepartment = await Department.findById(id)
//         if (!existingDepartment) {
//           return res
//             .status(404)
//             .json({ success: false, error: 'Department not found' })
//         }
    
//         const deleteDepartment = await Department.findByIdAndDelete(
//           id
//         )
    
//         return res.status(200).json({
//           success: true,
//           deleteDepartment
//         })
//       } catch (error) {
        
    
//         return res.status(500).json({
//           success: false,
//           error: 'delete department server error',
//         })
//       }

// }


// const deleteDepartment = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       // Find and delete the department
//       const deleteDepartment = await Department.findById(id);
//       await deleteDepartment.deleteOne()
  
//       // If the department doesn't exist
//       if (!deleteDepartment) {
//         return res
//           .status(404)
//           .json({ success: false, error: 'Department not found' });
//       }
  
//       // Successful deletion
//       return res.status(200).json({
//         success: true,
//         message: 'Department deleted successfully',
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         error: 'Server error while deleting department',
//       });
//     }
//   };
  
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the department exists
    const department = await Department.findById(id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: 'Department not found' });
    }

    // Delete the department
    await department.deleteOne();

    // Successful deletion
    return res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error while deleting department',
    });
  }
};


export {
  addDepartment,
  getDepartments,
  editDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment
}
