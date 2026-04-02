import React, { useState, useEffect } from "react";
import API from "../utils/axios.config";
import toast from "react-hot-toast";
import { Wallet, Banknote, Search, Pencil, Trash2 } from "lucide-react";

// Salary Component (Full CRUD)
function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeNumber: "",
    grossSalary: "",
    totalDeduction: "",
    netSalary: "",
    month: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  const fetchSalaries = async () => {
    const res = await API.get("/salaries");
    setSalaries(res.data);
  };

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const calculateNet = (gross, deduction) => {
    return (Number(gross) - Number(deduction)).toFixed(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const netSalary = calculateNet(form.grossSalary, form.totalDeduction);
    try {
      if (editing) {
        await API.put(`/salaries/${editing}`, { ...form, netSalary });
        toast.success("Salary updated");
      } else {
        await API.post("/salaries", { ...form, netSalary });
        toast.success("Salary added");
      }
      fetchSalaries();
      setForm({
        employeeNumber: "",
        grossSalary: "",
        totalDeduction: "",
        netSalary: "",
        month: "",
      });
      setEditing(null);
    } catch (err) {
      toast.error("Error saving salary");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this salary record?")) {
      await API.delete(`/salaries/${id}`);
      toast.success("Salary deleted");
      fetchSalaries();
    }
  };

  const handleEdit = (salary) => {
    setEditing(salary.salaryId);
    setForm({
      employeeNumber: salary.employeeNumber,
      grossSalary: salary.grossSalary,
      totalDeduction: salary.totalDeduction,
      netSalary: salary.netSalary,
      month: salary.month.split("T")[0],
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Salary Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Process payroll and track compensations.</p>
        </div>
      </div>

      <div className="card space-y-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-4">
          <Banknote className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          {editing ? "Edit Salary Record" : "Add Salary Record"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Employee</label>
            <select
              value={form.employeeNumber}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setForm({
                  ...form,
                  employeeNumber: selectedValue,
                  // update the gross salary based on the one assigned to employee's department
                  grossSalary:
                    employees.find((emp) => emp.employeeNumber === selectedValue)
                      ?.grossSalary || "",
                });
              }}
              className="input-field"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.employeeNumber} value={emp.employeeNumber}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Salary</label>
            <input
              type="number"
              placeholder="e.g. 500000"
              value={form.grossSalary}
              onChange={(e) => setForm({ ...form, grossSalary: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Deduction</label>
            <input
              type="number"
              placeholder="e.g. 50000"
              value={form.totalDeduction}
              onChange={(e) => setForm({ ...form, totalDeduction: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Month</label>
            <input
              type="month"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="lg:col-span-4 pt-2 flex items-center gap-3">
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
              <Wallet className="w-4 h-4" /> {editing ? "Update" : "Add"} Salary
            </button>
            {editing && (
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all w-full sm:w-auto border border-transparent dark:border-slate-700"
                onClick={() => {
                  setEditing(null);
                  setForm({
                    employeeNumber: "",
                    grossSalary: "",
                    totalDeduction: "",
                    netSalary: "",
                    month: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-header">Employee</th>
                <th className="table-header">Department / Role</th>
                <th className="table-header text-right">Gross</th>
                <th className="table-header text-right">Deduction</th>
                <th className="table-header text-right">Net Salary</th>
                <th className="table-header">Month</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {salaries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                      <p>No payroll records found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                salaries.map((s) => (
                  <tr key={s.salaryId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="table-cell">
                      <span className="font-medium text-slate-900 dark:text-slate-200">{s.firstName} {s.lastName}</span>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <span className="text-slate-800 dark:text-slate-300">{s.departmentName}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{s.position}</span>
                      </div>
                    </td>
                    <td className="table-cell text-right text-slate-700 dark:text-slate-300">{Number(s.grossSalary).toLocaleString()}</td>
                    <td className="table-cell text-right text-rose-500 dark:text-rose-400">-{Number(s.totalDeduction).toLocaleString()}</td>
                    <td className="table-cell text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {Number(s.netSalary).toLocaleString()} RWF
                    </td>
                    <td className="table-cell text-slate-500 dark:text-slate-400">
                      {new Date(s.month).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                    </td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.salaryId)}
                          className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
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

export default Salary;
