import React from 'react';

interface ImageProps {
    src?: string;
    alt?: string; 
    variant?: 'rounded' | 'circle' | 'thumbnail'; 
    className?: string;
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    variant = 'thumbnail', 
    className = '',
}) => {

    const variantStyles = {
        rounded: `rounded-lg`,
        circle: `rounded-full`,
        thumbnail: `rounded-md`,
    };

    return (
        <div className={`bg-base-light border border-base-light ${className} ${variantStyles[variant]}`}>
            <img
                className={`w-full h-full object-cover ${variantStyles[variant]}`}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Image;