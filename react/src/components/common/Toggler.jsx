import React from "react";

export default function Toggler(props) {
  return (
    <button
      onClick={props.onClick}
      className={
        "relative flex flex-col justify-between z-50 w-8 h-6 cursor-pointer group select-none bg-transparent border-none outline-none " +
        props.className
      }
      aria-label="Toggle menu"
    >
      <span
        className={`w-full h-1 bg-slate-800 rounded-full transition-all duration-300 ease-in-out origin-center dark:bg-white
          ${props.isOpen ? "rotate-45 translate-y-2.5" : ""}`}
      ></span>

      <span
        className={`w-full h-1 bg-slate-800 rounded-full transition-all duration-200 ease-in-out dark:bg-white
          ${props.isOpen ? "opacity-0 scale-0" : ""}`}
      ></span>

      <span
        className={`w-full h-1 bg-slate-800 rounded-full transition-all duration-300 ease-in-out origin-center dark:bg-white
          ${props.isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
      ></span>
    </button>
  );
}
