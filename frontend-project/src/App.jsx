import React, { useState, useEffect } from "react";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

// Main App
function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  
  // Theme state management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  // Apply the theme to the <html> document root
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate
              to="/"
              replace
            />
          ) : (
            <Login
              onLogin={() => {
                setIsAuthenticated(true);
                navigate("/");
              }}
            />
          )
        }
      />

      <Route
        path="*"
        element={
          isAuthenticated ? (
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800 relative transition-colors duration-300">
              <Navbar 
                setIsAuthenticated={setIsAuthenticated} 
                theme={theme} 
                setTheme={setTheme} 
              />

              <div className="container mx-auto py-6">
                <AppRoutes />
              </div>
            </div>
          ) : (
            <Navigate
              to="/login"
              replace
            />
          )
        }
      />
    </Routes>
  );
}

export default MainApp;
