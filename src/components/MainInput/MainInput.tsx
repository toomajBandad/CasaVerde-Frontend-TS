import React from "react";

interface MainInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function MainInput({
  type = "text",
  placeholder = "",
  className = "",
  required = false,
  label,
  error,
  ...rest
}: MainInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`border rounded px-3 py-2 w-full bg-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-gray-100 
                    placeholder-gray-400 text-gray-900
                    ${error ? "border-red-500" : "border-gray-300"} 
                    ${className}`}
        {...rest} // <-- register props spread safely
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
