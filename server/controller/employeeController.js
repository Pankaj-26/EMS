import Employee from '../models/Employee.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import Department from '../models/Department.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body

    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: 'user already exist' })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashpassword,
      role,
      profileImage: req.file ? req.file.filename : '',
    })

    const savedUser = await newUser.save()

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      department,
      salary,
    })

    await newEmployee.save()
    return res.status(200).json({ success: true, message: 'employee created' })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'server error in employee' })
  }
}

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', { password: 0 })
      .populate('department')

    return res.status(200).json({ success: true, employees })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'add employees server error' })
  }
}

const getEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const employee = await Employee.findById({ _id: id })
      .populate('userId', { password: 0 })
      .populate('department')

    return res.status(200).json({ success: true, employee })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'add employees server error' })
  }
}

// const updateEmployee = async (req,res) => {
//   try {
//     const { id } = req.params
//     const { name, maritalStatus, designation, department, salary } = req.body

//     const employee = await Employee.findById({ _id: id })

//     if (!employee) {
//       return res
//         .status(400)
//         .json({ success: false, error: ' employees not found' })
//     }

//     const user = await User.findById({ _id: employee.userId })

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, error: ' employees not found' })
//     }

//     const updateUser = await User.findByIdAndUpdate(
//       { _id: employee.userId },
//       { name },
//     )

//     const updateEmployee = await Employee.findByIdAndUpdate(
//       { _id: id },
//       maritalStatus,
//       designation,
//       salary,
//       department,
//     )

//     if (updateUser || updateEmployee) {
//       return res
//         .status(400)
//         .json({ success: false, error: ' document not found' })
//     }
//     return res.status(200).json({ success: true, message: 'employee updated' })
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, error: 'updated employees server error' })
//   }
// }

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID from the URL
    const { name, maritalStatus, designation, department, salary } = req.body; // Updated data

    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    // Find and update the associated user
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    await User.findByIdAndUpdate(employee.userId, { name });

    // Update the employee details
    await Employee.findByIdAndUpdate(id, {
      maritalStatus,
      designation,
      department,
      salary,
    });

    return res.status(200).json({ success: true, message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error.message); // Log the error for debugging
    return res.status(500).json({ success: false, error: 'Server error while updating employee' });
  }
};


export { addEmployee, upload, getEmployees, getEmployee, updateEmployee }
