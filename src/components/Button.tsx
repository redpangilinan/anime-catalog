import React, { ButtonHTMLAttributes } from 'react';

// Define the prop types for the Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Additional props specific to your Button component can be defined here
  // For example, you can add a `variant` prop to specify different button styles
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...rest
}) => {
  // CSS classes for different button variants
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
  };

  return (
    <button
      className={`px-4 py-2 rounded ${variantClasses[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
