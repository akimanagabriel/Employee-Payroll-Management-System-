import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Employee from "../pages/Employees";
import Department from "../pages/Department";
import Salary from "../pages/Salary";
import Reports from "../pages/Reports";
import PageNotFound from "../pages/PageNotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/employee" />}
      />
      <Route
        path="/employee"
        element={<Employee />}
      />
      <Route
        path="/department"
        element={<Department />}
      />
      <Route
        path="/salary"
        element={<Salary />}
      />
      <Route
        path="/reports"
        element={<Reports />}
      />

      {/* page not found */}
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;
