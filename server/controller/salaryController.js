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



const getSalary=async(req,res)=>{

    try{
        const {id}=req.params;
        const salary=await Salary.find({employeeId:id}).populate('employeeId','employeeId')

        return res.status(200).json({success:false,error:"salary get setver error"})

    }catch(error){
        return res
      .status(500)
      .json({ success: false, message: 'salary added server error' })
    }

}

export { addSalary,getSalary }
