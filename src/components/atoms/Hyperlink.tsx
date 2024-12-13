import React, { ReactNode } from 'react';

interface HyperlinkProps {
  children: ReactNode;
  url: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  target?: 'self' | 'tab';
  className?: string;
}

const Hyperlink: React.FC<HyperlinkProps> = ({ 
  children, 
  url,
  target= "self",
  variant = 'primary', 
  className = '', 
}) => {
  // Define variant styles
  const variants = {
    primary: `bg-primary hover:bg-primary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 `,
    secondary: `bg-secondary hover:bg-secondary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 `,
    ghost: `bg-transparent text-primary hover:underline `,
  };

  return (
    <a
      href={url}
      target={target}
      className={`
        py-1.5 px-2
        font-semibold text-center text-base
        transition ease-in duration-200 
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </a>
  );
};

export default Hyperlink;
