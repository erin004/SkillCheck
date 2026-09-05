function FormField({ label, name, value, onChange, error, type = "text", placeholder, as = "input", options }) {
  const fieldId = `field-${name}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>

      {as === "select" ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          className={`rounded-md border bg-surface px-3 py-2.5 text-[15px] text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-forest/30 ${
            error ? "border-brick" : "border-line"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`rounded-md border bg-surface px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus:ring-2 focus:ring-forest/30 ${
            error ? "border-brick" : "border-line"
          }`}
        />
      )}

      {error ? (
        <p className="text-sm text-brick">{error}</p>
      ) : null}
    </div>
  );
}

export default FormField;
