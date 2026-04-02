const express = require("express");
const authRouter = express.Router();
const { JWT_SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

// ============ AUTHENTICATION ============
authRouter.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Default admin account
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username: "admin", role: "HR" }, JWT_SECRET, {
      expiresIn: "8h",
    });
    return res.json({ success: true, token, message: "Login successful" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

module.exports = authRouter;
