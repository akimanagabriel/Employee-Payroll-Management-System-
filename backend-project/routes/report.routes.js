const express = require("express");
const reportRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const db = require("../config/db");

// ============ REPORTS ============
reportRouter.get("/api/reports/monthly-payroll", verifyToken, (req, res) => {
  const sql = `SELECT e.firstName, e.lastName, e.position, d.departmentName, s.netSalary, s.month
                 FROM Salary s
                 JOIN Employee e ON s.employeeNumber = e.employeeNumber
                 JOIN Department d ON e.departmentCode = d.departmentCode
                 ORDER BY s.month DESC, e.lastName`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = reportRouter;
