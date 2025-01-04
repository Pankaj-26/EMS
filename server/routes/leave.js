import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import  {addLeave,getLeave}  from '../controller/leaveController.js';



const router=express.Router()

router.post("/add",authMiddleware,addLeave)
router.get("/view/:id",authMiddleware,getLeave)








export default router