// src/assets/components/Button.tsx
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...rest
}) => {
  const baseStyles =
    'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200';

  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-700 text-white'
      : 'bg-gray-500 hover:bg-gray-700 text-white';

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
