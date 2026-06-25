import React from "react";

export default function Button1(props) {
  return (
    <button title={props.title} onClick={props.onClick} className={`cursor-pointer hover:bg-emerald-500 transition p-3 rounded-sm text-white font-bold bg-emerald-600 w-full max-w-40 text-sm ${props.className}`}>
      {props.children}
    </button>
  );
}
