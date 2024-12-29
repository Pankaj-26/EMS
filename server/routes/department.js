import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import {addDepartment, getDepartments,editDepartment,getDepartment,updateDepartment,deleteDepartment} from "../controller/departmentController.js"


const router=express.Router()

router.post("/add",authMiddleware,addDepartment)
router.get("/",authMiddleware,getDepartments)
router.get("/:id",authMiddleware,editDepartment)
router.get("/:id",authMiddleware,getDepartment)
router.put("/:id",authMiddleware,updateDepartment)
router.delete("/:id",authMiddleware,deleteDepartment)






export default router