import React, { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'normal';
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'normal',
  className = '',
}) => {


  // Define variant styles
  const StyleList = {
    normal: `font-medium`,
  };

  // Determine the HTML element based on the variant
  return (
    <p className={`${StyleList[variant]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;