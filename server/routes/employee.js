import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import {addEmployee,upload,getEmployees,getEmployee,updateEmployee} from "../controller/employeeController.js"


const router=express.Router()

router.post("/add",authMiddleware,upload.single("image"),addEmployee)
router.get("/",authMiddleware,getEmployees)
router.get("/:id",authMiddleware,getEmployee)
// router.get("/:id",authMiddleware,getDepartment)
router.put("/:id",authMiddleware,updateEmployee)
// router.delete("/:id",authMiddleware,deleteDepartment)






export default router