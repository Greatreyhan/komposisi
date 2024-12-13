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
            {src ?
                <img
                    className={`w-full h-full object-cover ${variantStyles[variant]}`}
                    src={src}
                    alt={alt}
                />
            :
            <div className='bg-base-light border border-base-light w-full h-full flex justify-center items-center'><span className='text-2xl font-bold text-opacity-40 text-base-dark'>{alt}</span></div>
            }

        </div>
    );
};

export default Image;