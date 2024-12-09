import React, { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>; // Callback for click events
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}) => {
  // Define variant styles
  const variants = {
    primary: `bg-primary hover:bg-primary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 `,
    secondary: `bg-secondary hover:bg-secondary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 `,
    ghost: `bg-transparent text-primary `,
  };

  return (
    <button
      onClick={onClick} // Pass the callback function
      className={`
        py-1.5 px-4 
        font-semibold text-center text-base
        transition ease-in duration-200 
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
