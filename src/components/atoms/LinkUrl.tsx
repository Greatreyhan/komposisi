import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkUrlProps {
  children: ReactNode;
  to: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const LinkUrl: React.FC<LinkUrlProps> = ({ 
  children, 
  to, 
  variant = 'primary', // Default to 'primary'
  className = ""
}) => {
  // Define variant classes
  const variants = {
    primary: `bg-primary hover:bg-primary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 py-2 px-4 
`,
    secondary: `bg-secondary hover:bg-secondary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 py-2 px-4 
`,
    ghost: `bg-transparent text-primary hover:underline`, 
  };

  return (
    <Link
      to={to}
      className={`
        font-semibold text-center text-base
        transition ease-in duration-200 
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </Link>
  );
};

export default LinkUrl;
