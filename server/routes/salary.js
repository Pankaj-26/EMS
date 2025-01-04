import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalary } from '../controller/salaryController.js'

const router = express.Router()

router.post('/add', authMiddleware, addSalary)
router.get('/view/:id', authMiddleware, getSalary)

export default router
