import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  onClick,
  icon,
}) => {
  const variants = {
    primary: `bg-primary hover:bg-primary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2`,
    secondary: `bg-secondary hover:bg-secondary-dark text-base-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2`,
    ghost: `bg-transparent text-primary`,
  };

  const sizes = {
    small: `py-1 px-2 text-sm`,
    medium: `py-2 px-4 text-base`,
    large: `py-3 px-6 text-lg`,
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center space-x-2
        transition ease-in duration-200
        font-semibold text-center
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {icon && <span className="icon mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
