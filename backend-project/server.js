const express = require("express");
const cors = require("cors");

require("dotenv").config();
const morgan = require("morgan");
const db = require("./config/db");

const authRouter = require("./routes/auth.routes");
const employeeRouter = require("./routes/employees.routes");
const departmentRouter = require("./routes/departments.routes");
const salariesRouter = require("./routes/salaries.routes");
const reportRouter = require("./routes/report.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

// routes
app.use(authRouter);
app.use(employeeRouter);
app.use(departmentRouter);
app.use(salariesRouter);
app.use(reportRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  // connect db
  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to EPMS database");
  });
});
