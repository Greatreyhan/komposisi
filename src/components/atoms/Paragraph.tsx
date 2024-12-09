import React, { ReactNode } from 'react';

interface ParagraphProps {
  children: ReactNode;
  variant?: 'normal';
  max?: number;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  variant = 'normal',
  max = 1000,
  className = '',
}) => {
  // Define variant styles
  const StyleList = {
    normal: `font-medium`,
  };

  // Convert children to string and truncate if necessary
  const text = typeof children === 'string' ? children : '';
  const truncatedText = text.length > max ? `${text.slice(0, max)}...` : text;

  return (
    <p className={`${StyleList[variant]} ${className}`}>
      {truncatedText}
    </p>
  );
};

export default Paragraph;