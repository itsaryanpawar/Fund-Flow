// src/assets/components/Input.tsx
import React from 'react';

/**
 * Props for the Input component
 * - Extends all native <input> attributes
 * - Adds custom props: label, error, className
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  className?: string;
}

/**
 * Reusable Input with label + optional error styling
 */
const Input: React.FC<InputProps> = ({
  label,
  error = false,
  className = '',
  ...rest
}) => {
  return (
    <div className={`input-group ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...rest}
        className={`
          mt-1 block w-full rounded-md border py-2 px-3 text-gray-700
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `.trim()}
      />
    </div>
  );
};

export default Input;