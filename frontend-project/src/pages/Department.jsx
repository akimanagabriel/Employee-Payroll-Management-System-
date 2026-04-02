import React, { useState, useEffect } from "react";
import API from "../utils/axios.config";
import toast from "react-hot-toast";
import { Building2, Plus, Search } from "lucide-react";

// Department Component
function Department() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    departmentCode: "",
    departmentName: "",
    grossSalary: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await API.get("/departments");
    setDepartments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/departments", form);
      toast.success("Department added");
      fetchDepartments();
      setForm({ departmentCode: "", departmentName: "", grossSalary: "" });
    } catch (err) {
      toast.error("Error adding department");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Departments</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage company divisions and base salaries.</p>
        </div>
      </div>

      <div className="card space-y-6">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-4">
          <Building2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          Add Department
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department Code</label>
            <input
              type="text"
              placeholder="e.g. ENG"
              value={form.departmentCode}
              onChange={(e) => setForm({ ...form, departmentCode: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department Name</label>
            <input
              type="text"
              placeholder="e.g. Engineering"
              value={form.departmentName}
              onChange={(e) => setForm({ ...form, departmentName: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Salary (RWF)</label>
            <input
              type="number"
              placeholder="e.g. 500000"
              value={form.grossSalary}
              onChange={(e) => setForm({ ...form, grossSalary: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div className="md:col-span-3 pt-2">
            <button type="submit" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Department
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-header">Code</th>
                <th className="table-header">Name</th>
                <th className="table-header text-right">Base Gross Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {departments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                      <p>No departments found.</p>
                      <p className="text-sm mt-1">Get started by creating one above.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                departments.map((d) => (
                  <tr key={d.departmentCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="table-cell font-medium text-slate-900 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/30 w-32">{d.departmentCode}</td>
                    <td className="table-cell font-medium text-slate-800 dark:text-slate-200">{d.departmentName}</td>
                    <td className="table-cell text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      {Number(d.grossSalary).toLocaleString()} RWF
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

export default Department;
