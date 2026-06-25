// components/common/DynamicFormModal.jsx
import Modal from "./Modal";
import Input2 from "./Input2";
import Button1 from "./Button1";

export default function DynamicFormModal({
  isShown,
  onClose,
  title,
  fields,
  form,
  onChange,
  shouldRenderField,
  onSubmit,
  children,
}) {
  return (
    <Modal isShown={isShown} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-800 mb-6 dark:text-gray-200">
          {title}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[60vh] overflow-y-auto px-1 py-2">
            {fields.map((field, index) => {
              if (!shouldRenderField(field)) return null;
              return (
                <Input2
                  field={field}
                  key={index}
                  required={!field.notRequired}
                  onChange={(e) => {
                    const val =
                      e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value;
                    onChange(field.name, val);
                  }}
                  value={form[field.name]}
                />
              );
            })}
            {children}
          </div>
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3">
            <Button1
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700! dark:text-gray-300! hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-500"
            >
              Cancel
            </Button1>
            <Button1 type="submit">Save</Button1>
          </div>
          {/* {JSON.stringify(form)} */}
        </form>
      </div>
    </Modal>
  );
}
