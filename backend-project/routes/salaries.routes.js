const express = require("express");
const salariesRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const db = require("../config/db");

// ============ SALARY CRUD (Full CRUD) ============
salariesRouter.post("/api/salaries", verifyToken, (req, res) => {
  const { employeeNumber, grossSalary, totalDeduction, netSalary, month } =
    req.body;
  const sql =
    "INSERT INTO Salary (employeeNumber, grossSalary, totalDeduction, netSalary, month) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [employeeNumber, grossSalary, totalDeduction, netSalary, month],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Salary record added successfully" });
    },
  );
});

salariesRouter.get("/api/salaries", verifyToken, (req, res) => {
  const sql = `SELECT s.*, e.firstName, e.lastName, e.position, d.departmentName 
                 FROM Salary s
                 JOIN Employee e ON s.employeeNumber = e.employeeNumber
                 LEFT JOIN Department d ON e.departmentCode = d.departmentCode
                 ORDER BY s.month DESC`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

salariesRouter.put("/api/salaries/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { grossSalary, totalDeduction, netSalary, month } = req.body;
  const sql =
    "UPDATE Salary SET grossSalary=?, totalDeduction=?, netSalary=?, month=? WHERE salaryId=?";

  db.query(
    sql,
    [grossSalary, totalDeduction, netSalary, month, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Salary updated successfully" });
    },
  );
});

salariesRouter.delete("/api/salaries/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Salary WHERE salaryId=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Salary deleted successfully" });
  });
});

module.exports = salariesRouter;
