import React from "react";

// 🌟 Correction : Ajout de 'value' dans les destructured props
export default function Input2({ field, required, onChange, value }) {
  const fieldClass =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:text-white dark:bg-slate-900 text-gray-800 shadow-sm";

  let inputElement = null;

  if (field.date) {
    inputElement = (
      <input
        onChange={onChange}
        type="date"
        id={field.name}
        name={field.name}
        value={value || ""} // 🌟 Ajouté
        className={fieldClass}
        required={required}
      />
    );
  } else if (field.number) {
    inputElement = (
      <input
        onChange={onChange}
        type="number"
        id={field.name}
        name={field.name}
        value={value ?? ""} // 🌟 Ajouté (?? évite les bugs si la valeur vaut 0)
        className={fieldClass}
        min={0}
        placeholder={`${field.label}...`}
        required={required}
      />
    );
  } else if (field.textarea) {
    inputElement = (
      <textarea
        onChange={onChange}
        id={field.name}
        name={field.name}
        value={value || ""} // 🌟 Ajouté
        className={`resize-none h-24 ${fieldClass}`}
        placeholder={`${field.label}...`}
        required={required}
      ></textarea>
    );
  } else if (field.select) {
    inputElement = (
      <select
        onChange={onChange}
        id={field.name}
        name={field.name}
        value={
          value || field.options?.[0]?.value || field.options?.[0]?.id || ""
        } // 🌟 Remplacement de defaultValue par value pour un contrôle total
        className={fieldClass}
        required={required}
      >
        {field.options?.map((option, index) => (
          <option key={index} value={option?.value || option?.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  } else if (field.checkbox) {
    inputElement = (
      <input
        onChange={onChange}
        type="checkbox"
        id={field.name}
        name={field.name}
        checked={!!value} // 🌟 Correction critique : checked à la place de value
        className="h-4 w-4 rounded border-gray-300 text-blue-600"
        required={required}
      />
    );
  } else {
    inputElement = (
      <input
        onChange={onChange}
        type="text"
        id={field.name}
        name={field.name}
        value={value || ""} // 🌟 Ajouté
        className={fieldClass}
        placeholder={`${field.label}...`}
        required={required}
      />
    );
  }

  if (field.checkbox) {
    return (
      <div className="flex items-center gap-3 py-1 md:col-span-2">
        {inputElement}
        <label
          htmlFor={field.name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
        >
          {field.label}
        </label>
      </div>
    );
  }

  const isFullWidth = field.textarea || field.name === "title";

  return (
    <div
      className={`flex flex-col w-full ${isFullWidth ? "md:col-span-2" : ""}`}
    >
      <label
        htmlFor={field.name}
        className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider"
      >
        {field.label}
      </label>
      {inputElement}
    </div>
  );
}
