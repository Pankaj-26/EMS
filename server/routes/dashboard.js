import express from 'express';
import { getSummary } from '../controller/dashboardController.js';
import authMiddleware from "../middleware/authMiddleware.js"

const router=express.Router();

router.get("/summary",authMiddleware,getSummary)

export default router