import React from 'react';
import LinkUrl from '../atoms/LinkUrl';

interface BreadcumbProps {
    navigator: string[];
    className?: string; 
    variation?: 'default' | 'light' | 'dark'; // Define possible variations
}

const Breadcumb: React.FC<BreadcumbProps> = ({ navigator, variation = 'default', className = '' }) => {
    // Define base styles
    const baseStyles = 'flex items-center space-x-2';
    
    // Define variation styles
    const variationStyles = {
        default: 'text-base-dark hover:underline',
        light: 'text-gray-800 hover:text-blue-500',
        dark: 'text-white hover:text-gray-300',
    };

    return (
        <div className={`${baseStyles} ${className}`}>
            {navigator.map((item, index) => {
                // Construct the URL based on the current index
                const url = `/${navigator.slice(0, index + 1).join('/').toLowerCase()}`;
                
                return (
                    <React.Fragment key={index}>
                        <LinkUrl variant='ghost' to={url} className={variationStyles[variation]}>
                            {item}
                        </LinkUrl>
                        {index < navigator.length - 1 && <span className="text-gray-500">/</span>}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcumb;