import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js"
import connection from "./db/db.js"
import departmentRoute from "./routes/department.js"
import employeeRoute from "./routes/employee.js"
import salaryRouter from "./routes/salary.js"
import leaveRouter from "./routes/leave.js"
import settingRouter from "./routes/setting.js"
import dashboardRouter from "./routes/dashboard.js"








connection()
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))
app.use("/api/auth",authRouter)
app.use("/api/department",departmentRoute)
app.use("/api/employee",employeeRoute)
app.use("/api/salary",salaryRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/setting",settingRouter)
app.use("/api/dashboard",dashboardRouter)






const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`server is running on port ${ port}`)
})

