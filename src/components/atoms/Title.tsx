import React, { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  variantStyles?: 'normal';
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  children,
  variant = 'h1',
  variantStyles = 'normal',
  className = '',
}) => {
  // Define text sizes based on the variant
  const textSizeMap = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    p: 'text-md',
  };

  // Define variant styles
  const StyleList = {
    normal: `font-medium`,
  };

  // Determine the HTML element based on the variant
  const Tag = variant as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${textSizeMap[variant]} ${StyleList[variantStyles]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Title;