import { ReactNode } from "react";

interface BadgeProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  className?: string;
  icon?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = 'medium',
  className = '',
  icon,
}) => {
  const variants = {
    primary: `bg-primary text-base-white`,
    secondary: `bg-secondary text-base-white`,
    success: `bg-green-500 text-base-white`,
    warning: `bg-yellow-500 text-base-black`,
    error: `bg-red-500 text-base-white`,
  };

  const sizes = {
    small: `text-xs px-2 py-1`,
    medium: `text-sm px-3 py-1.5`,
    large: `text-base px-4 py-2`,
  };

  const roundness = {
    none: `rounded-none`,
    small: `rounded-sm`,
    medium: `rounded-md`,
    large: `rounded-lg`,
    full: `rounded-full`,
  };

  return (
    <span
      className={`
        inline-flex items-center
        font-semibold whitespace-nowrap
        ${variants[variant]} ${sizes[size]} ${roundness[rounded]} ${className}
      `}
    >
      {icon && <span className="icon mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
