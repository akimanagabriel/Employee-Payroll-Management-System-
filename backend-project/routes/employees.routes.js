const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const db = require("../config/db");

const employeeRouter = express.Router();

// ============ EMPLOYEE CRUD ============
employeeRouter.post("/api/employees", verifyToken, (req, res) => {
  const {
    employeeNumber,
    firstName,
    lastName,
    address,
    position,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  } = req.body;

  const sql = `INSERT INTO Employee (employeeNumber, firstName, lastName, address, position, telephone, gender, hiredDate, departmentCode) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      employeeNumber,
      firstName,
      lastName,
      address,
      position,
      telephone,
      gender,
      hiredDate,
      departmentCode,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        success: true,
        message: "Employee added successfully",
        id: result.insertId,
      });
    },
  );
});

employeeRouter.get("/api/employees", verifyToken, (req, res) => {
  const sql = `SELECT e.*, d.departmentName, d.grossSalary 
                 FROM Employee e 
                 LEFT JOIN Department d ON e.departmentCode = d.departmentCode ORDER BY e.created_at desc`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = employeeRouter;
