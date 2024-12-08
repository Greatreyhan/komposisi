import React from 'react';
import LinkUrl from '../atoms/LinkUrl';

interface LogoProps {
  url: string; // The URL the logo links to
  src: string; // The source of the logo image
  alt?: string; // The alt text for the logo
  className?: string; // Optional custom class names
}

const Logo: React.FC<LogoProps> = ({ url, src, alt, className = '' }) => {
  return (
    <LinkUrl variant='ghost' to={url} >
      <img className={`${className}`} src={src} alt={alt} />
    </LinkUrl>
  );
};

export default Logo;
