import Employee from '../models/Employee.js'
import Salary from '../models/Salary.js'

const addSalary = async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
    } = req.body

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) + parseInt(deductions)

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    })

    await newSalary.save()

    return res
      .status(200)
      .json({ success: true, message: 'salary added successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'salary added server error' })
  }
}

// const getSalary = async (req, res) => {
//   try {
//     const { id } = req.params
//     let salary = await Salary.find({ employeeId: id }).populate(
//       'employeeId',
//       'employeeId',
//     )

//     if (!salaries) {
//       const employee = await Employee.findOne({ userId: id })
//       salary = await Salary.find({ employeeId: employee._id }).populate(
//         'employeeId',
//         'employeeId',
//       )
//     }

//     if (!salaries.length) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'No salaries found' })
//     }

//     return res.status(200).json({ success: true, salary: salaries })
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Server error' })
//   }
// }


const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    // Find salaries by employeeId (id)
    let salary = await Salary.find({ employeeId: id }).populate(
      'employeeId',
      'employeeId'
    );

    // If no salaries found for the given employeeId, check by userId
    if (!salary.length) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        salary = await Salary.find({ employeeId: employee._id }).populate(
          'employeeId',
          'employeeId'
        );
      }
    }

    // If still no salaries found, return a 404 error
    // if (!salary.length) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: 'No salaries found' });
    // }

    // Return the salary data
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error('Error in getSalary:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { addSalary, getSalary }
