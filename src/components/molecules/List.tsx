import React, { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  className?: string;
}

interface ListItemProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const List: React.FC<ListProps> & { Item: React.FC<ListItemProps> } = ({ children, className = '' }) => {
  return <ul className={className}>{children}</ul>;
};

const ListItem: React.FC<ListItemProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  // Variant styles
  const variants: Record<'primary' | 'secondary' | 'ghost', string> = {
    primary: 'bg-primary hover:bg-primary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    secondary: 'bg-secondary hover:bg-secondary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    ghost: 'bg-transparent text-primary hover:underline',
  };

  // Ensure `variant` is a valid key
  const variantClass = variants[variant];

  return (
    <li
      className={`border-l py-0.5 font-semibold text-center text-base transition ease-in duration-200 ${variantClass} ${className}`}
    >
      {children}
    </li>
  );
};

// Attach ListItem as a static property of List
List.Item = ListItem;

export default List;
