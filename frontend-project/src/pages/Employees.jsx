import React, { useState, useEffect } from "react";
import API from "../utils/axios.config";
import toast from "react-hot-toast";
import { UserPlus, Search } from "lucide-react";

// Employee Component
function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    employeeNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    position: "",
    telephone: "",
    gender: "M",
    hiredDate: "",
    departmentCode: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
    // update the employee number to be like: EMP001, EMP002, etc
    setForm({
      ...form,
      employeeNumber: `EMP${String(res.data.length + 1).padStart(4, "0")}`,
    });
  };

  const fetchDepartments = async () => {
    const res = await API.get("/departments");
    setDepartments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", form);
      toast.success("Employee added successfully");
      fetchEmployees();
    } catch (err) {
      toast.error("Error adding employee");
    } finally {
      setForm({
        employeeNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        position: "",
        telephone: "",
        gender: "M",
        hiredDate: "",
        departmentCode: "",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Employees</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your workforce efficiently.</p>
        </div>
      </div>

      <div className="card space-y-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-4">
          <UserPlus className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          Add New Employee
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Emp Number</label>
            <input
              type="text"
              placeholder="Employee Number"
              value={form.employeeNumber}
              onChange={(e) => setForm({ ...form, employeeNumber: e.target.value })}
              className="input-field bg-slate-50 dark:bg-slate-800/80"
              required
              readOnly
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">First Name</label>
            <input
              type="text"
              placeholder="e.g. Jane"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="input-field"
              required
              name="firstName"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Last Name</label>
            <input
              type="text"
              placeholder="e.g. Doe"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="input-field"
              required
              name="lastName"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Address</label>
            <input
              type="text"
              placeholder="City, Region"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="input-field"
              name="country"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Position</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="input-field"
              name="occupation"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Telephone</label>
            <input
              type="tel"
              placeholder="+250 780 000 000"
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className="input-field"
              name="telephone"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="input-field"
              name="gender"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hired Date</label>
            <input
              type="date"
              value={form.hiredDate}
              onChange={(e) => setForm({ ...form, hiredDate: e.target.value })}
              className="input-field"
              name="hiredDate"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department</label>
            <select
              value={form.departmentCode}
              onChange={(e) =>
                setForm({
                  ...form,
                  departmentCode: e.target.value,
                  // use current department code as initial code
                  employeeNumber: `${e.target.value}${String(employees.length + 1).padStart(4, "0")}`,
                })
              }
              className="input-field"
              required
              name="department"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.departmentCode} value={d.departmentCode}>
                  {d.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3 pt-2">
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Save Employee
            </button>
          </div>
        </form>
      </div>

      {/* all employees */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-header">Emp #</th>
                <th className="table-header">Name</th>
                <th className="table-header">Position</th>
                <th className="table-header">Department</th>
                <th className="table-header">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                      <p>No employees found.</p>
                      <p className="text-sm mt-1">Add an employee to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.employeeNumber} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="table-cell font-medium text-slate-900 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/30">{emp.employeeNumber}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                          {emp.firstName?.[0]}{emp.lastName?.[0]}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-200">{emp.firstName} {emp.lastName}</span>
                      </div>
                    </td>
                    <td className="table-cell">{emp.position || "-"}</td>
                    <td className="table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                        {emp.departmentName || "Unassigned"}
                      </span>
                    </td>
                    <td className="table-cell">{emp.telephone || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;
