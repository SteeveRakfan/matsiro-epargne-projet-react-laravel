import React from "react";

export default function Input1(props) {
  return (
    <fieldset
      className="border border-emerald-600 rounded-lg ps-3 pb-2 w-full has-focus:bg-emerald-50 transition"
    >
      <legend className="text-[.8rem] text-emerald-600 font-semibold">
        <label htmlFor={props.name}>{props.title}</label>
      </legend>
      <div className="flex gap-1 items-center">
        {props.icon}
        <input
          type={props?.type ?? "text"}
          id={props.name}
          className="text-sm w-full pe-3"
          onChange={props.onChange}
        />
      </div>
    </fieldset>
  );
}
