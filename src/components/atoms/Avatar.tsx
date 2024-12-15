import React, { ReactNode } from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  status?: 'online' | 'offline' | 'busy' | null;
  statusPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  children?: ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  rounded = 'full',
  status = null,
  statusPosition = 'bottom-right',
  className = '',
  children,
}) => {
  const sizes = {
    small: 'h-8 w-8',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
  };

  const roundness = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
  };

  const statusPositions = {
    'top-left': {
      none: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      small: 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
      medium: 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
      large: 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
      full: 'top-0 left-0 -translate-x-1/5 -translate-y-1/5',
    },
    'top-right': {
      none: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
      small: 'top-0 right-0 translate-x-1/3 -translate-y-1/3',
      medium: 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
      large: 'top-0 right-0 translate-x-1/4 -translate-y-1/4',
      full: 'top-0 right-0 translate-x-1/5 -translate-y-1/5',
    },
    'bottom-left': {
      none: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
      small: 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3',
      medium: 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
      large: 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4',
      full: 'bottom-0 left-0 -translate-x-1/5 translate-y-1/5',
    },
    'bottom-right': {
      none: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      small: 'bottom-0 right-0 translate-x-1/3 translate-y-1/3',
      medium: 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
      large: 'bottom-0 right-0 translate-x-1/4 translate-y-1/4',
      full: 'bottom-0 right-0 translate-x-1/5 translate-y-1/5',
    },
  };

  return (
    <div className={`relative inline-block ${sizes[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`object-cover ${roundness[rounded]} ${sizes[size]}`}
      />
      {status && (
        <span
          className={`absolute w-4 h-4 border-2 border-white ${statusColors[status]} ${statusPositions[statusPosition][rounded]} rounded-full`}
        ></span>
      )}
      {children}
    </div>
  );
};

export default Avatar;
