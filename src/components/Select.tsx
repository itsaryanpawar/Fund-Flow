// src/assets/components/Select.tsx
import React from 'react';

/** Shape of each option */
export interface Option {
  value: string;
  label: string;
}

/** Props for the Select component */
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  placeholder?: string;
  error?: boolean;
  className?: string;
}

/**
 * Reusable Select with label + optional placeholder & error styling
 */
const Select: React.FC<SelectProps> = ({
  label,
  options,
  placeholder,
  error = false,
  className = '',
  ...rest
}) => {
  return (
    <div className={`input-group ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        {...rest}
        className={`
          mt-1 block w-full rounded-md border py-2 px-3 text-gray-700
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `.trim()}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;