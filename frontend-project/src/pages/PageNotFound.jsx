import React from "react";
import { Link } from "react-router-dom";
import { Ghost, ArrowLeft } from "lucide-react";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-12 max-w-md border border-slate-100 dark:border-slate-700 flex flex-col items-center">
        <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
          <Ghost className="w-12 h-12 text-indigo-500 dark:text-indigo-400 animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-4">Page Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
          Oops! The page you are looking for seems to have mysteriously vanished into the ether.
        </p>

        <Link
          to="/"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
