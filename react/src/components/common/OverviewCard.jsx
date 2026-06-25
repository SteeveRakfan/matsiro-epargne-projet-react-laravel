import React from "react";
import Card from "./Card";

export default function OverviewCard({ title, value, className, label, children }) {
  return (
    <Card
      className={`inline-block bg-gray-100! dark:bg-slate-900! border border-slate-50 dark:border-slate-800 relative ${className}`}
      title={label}
    >
      <h3 className="">{title}</h3>
      <p className="text-2xl">{value}</p>
      {children}
    </Card>
  );
}
