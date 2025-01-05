import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import  {addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave}  from '../controller/leaveController.js';



const router=express.Router()

router.post("/add",authMiddleware,addLeave)
router.get("/view/:id",authMiddleware,getLeave)
router.get("/",authMiddleware,getLeaves)
router.get("/detail/:id",authMiddleware,getLeaveDetail)
router.put("/:id",authMiddleware,updateLeave)











export default router