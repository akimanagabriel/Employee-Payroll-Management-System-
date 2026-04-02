const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const db = require("../config/db");

const departmentRouter = express.Router();

// ============ DEPARTMENT CRUD ============
departmentRouter.post("/api/departments", verifyToken, (req, res) => {
  const { departmentCode, departmentName, grossSalary } = req.body;
  const sql =
    "INSERT INTO Department (departmentCode, departmentName, grossSalary) VALUES (?, ?, ?)";

  db.query(
    sql,
    [departmentCode, departmentName, grossSalary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Department added successfully" });
    },
  );
});

departmentRouter.get("/api/departments", verifyToken, (req, res) => {
  db.query("SELECT * FROM Department", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = departmentRouter;
