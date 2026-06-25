import React from "react";

export default function LogoSVG(props) {
  return (
    <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${!props.pale ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-md shadow-emerald-100 dark:shadow-emerald-900':'bg-slate-100 dark:bg-slate-800'} ${props.className}`}>
      <svg
        xmlns="http://w3.org"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="w-6 h-6 text-white transform -rotate-12"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28M11.25 7.5l3 3m2.25-4.5l3 3"
        />
      </svg>
      <span className="absolute top-2 right-2 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
    </div>
  );
}
