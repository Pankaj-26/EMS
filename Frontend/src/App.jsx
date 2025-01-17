import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import Add from "./components/salary/Add";
import ViewSalary from "./components/salary/ViewSalary";
import SummaryCard from "./components/EmployeeDashboard.jsx/SummaryCard";
import List from "./components/leave/List";
import AddLeave from "./components/leave/AddLeave";
import Setting from "./components/EmployeeDashboard.jsx/Setting";
import Table from "./components/leave/Table";
import LeaveDetail from "./components/leave/LeaveDetail";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect the root path */}
        <Route path="/" element={<Navigate to="admin-dashboard" />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin Dashboard routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
              
            </PrivateRoute>
          }
        >
            {/* Nested child routes */}
            <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
            {/* Employee-specific routes */}
          <Route path="employees/:id" element={<View />} />
      
        <Route path="employees/edit/:id" element={<Edit />} />
        <Route path="salary/add" element={<Add />} />
        <Route path="employees/salary/:id" element={<ViewSalary />} />
        <Route path="leaves" element={<Table />} />
        <Route path={`leaves/:id`} element={<LeaveDetail />} />
        <Route path={"employee/leaves/:id"} element={<List />} />
        <Route path={"setting"} element={<Setting />} />
        </Route>

      
        
     
        {/* Employee Dashboard routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoute>
          }
        >
          {/* Nested child routes */}
          <Route index element={<SummaryCard />} />
          <Route path="/employee-dashboard/profile/:id" element={<View />} />
          <Route path="/employee-dashboard/leaves/:id" element={<List />} />
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
          <Route path="/employee-dashboard/setting" element={<Setting />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
