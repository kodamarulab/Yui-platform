// Shared form field with accessible label.
// src/components/FormField.tsx
type FormFieldProps = {
  defaultValue?: string;
  label: string;
  name: string;
  options?: string[];
  textarea?: boolean;
  type?: string;
};

export function FormField({ defaultValue, label, name, options, textarea, type = "text" }: FormFieldProps) {
  const inputClass =
    "mt-2 w-full rounded-xl border border-teal-900/20 bg-white px-4 py-3 text-lg text-teal-950 outline-none ring-teal-500 transition focus:ring-2";

  return (
    <label className="block text-base font-bold text-teal-950">
      {label}
      {options ? (
        <select className={inputClass} defaultValue={defaultValue ?? ""} name={name}>
          <option disabled value="">
            選択してください
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea className={`${inputClass} min-h-36`} defaultValue={defaultValue} name={name} />
      ) : (
        <input className={inputClass} defaultValue={defaultValue} name={name} type={type} />
      )}
    </label>
  );
}
