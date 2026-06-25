import React from "react";

export default function Info1({ title, className, children }) {
  return (
    <div
      className={`inline-block rounded-3xl overflow-hidden text-sm text-gray-700 dark:text-gray-300 ring ring-gray-200 dark:ring-slate-800 ${className}`}
    >
      <div className="whitespace-break-spaces bg-gray-100 dark:bg-slate-900 px-4 p-2">❗{title}</div>
      <div className="p-2">{children}</div>
    </div>
  );
}
