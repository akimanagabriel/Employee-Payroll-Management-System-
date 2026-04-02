import React, { useState, useEffect } from "react";
import API from "../utils/axios.config";
import { FileBarChart, Calendar, Search } from "lucide-react";

// Reports Component
function Reports() {
  const [report, setReport] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    const res = await API.get("/reports/monthly-payroll");
    setReport(res.data);
  };

  const filteredReport = filterMonth
    ? report.filter((r) => r.month.startsWith(filterMonth))
    : report;

  // Calculate totals
  const totalPayroll = filteredReport.reduce((acc, r) => acc + Number(r.netSalary), 0);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Monthly Payroll Report</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review department and employee payroll summaries.</p>
        </div>
      </div>

      <div className="card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Filter by Month
          </label>
          <input
            type="month"
            onChange={(e) => setFilterMonth(e.target.value)}
            className="input-field max-w-[200px]"
            placeholder="Filter by month"
          />
        </div>
        
        {filterMonth && (
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-4 min-w-[250px] shadow-sm">
            <h4 className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">Total Net Payroll</h4>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {totalPayroll.toLocaleString()} <span className="text-lg text-slate-500 dark:text-slate-400 font-medium">RWF</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
          <FileBarChart className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-700 dark:text-slate-200">Payroll Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Department / Role</th>
                <th className="table-header text-right">Net Salary</th>
                <th className="table-header">Month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filteredReport.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                      <p>No reports found for the selected filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReport.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold">
                          {r.firstName?.[0]}{r.lastName?.[0]}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-200">{r.firstName} {r.lastName}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <span className="text-slate-800 dark:text-slate-300">{r.departmentName}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{r.position}</span>
                      </div>
                    </td>
                    <td className="table-cell text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {Number(r.netSalary).toLocaleString()} RWF
                    </td>
                    <td className="table-cell text-slate-500 dark:text-slate-400">
                      {new Date(r.month).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
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

export default Reports;
