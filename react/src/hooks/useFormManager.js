import { useState } from "react";

export function useFormManager(initialFields, initialFormState) {
  const [fields, setFields] = useState(initialFields);
  const [form, setForm] = useState(initialFormState);
    
  //Met à jour form
  const handleInputChange = (fieldName, value) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  //Change champ "options" de field
  const updateFieldOptions = (fieldName, options) => {
    setFields((prev) =>
      prev.map((f) => (f.name !== fieldName ? f : { ...f, options })),
    );
  };
  // Détermine si un champ doit être affiché selon son groupe
  const shouldRenderField = (field) => {
    if (field.group && !field.groupLeader) {
      const leader = fields.find(
        (f) => f.group === field.group && f.groupLeader,
      );
      if (leader && !form[leader.name]) return false;
    }
    return true;
  };

  return {
    form,
    fields,
    handleInputChange,
    updateFieldOptions,
    shouldRenderField,
    setForm,
  };
}
