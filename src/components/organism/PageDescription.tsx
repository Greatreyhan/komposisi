import React from 'react';
import Breadcumb from '../molecules/Breadcumb';
import Title from '../atoms/Title';
import Paragraph from '../atoms/Paragraph';
interface PageDescriptionProps {
    description: string;
    name: string;
    type: string;
  }
const PageDescription: React.FC<PageDescriptionProps> = ({description,name,type}) => {
    return (
        <div>
            {/* Bread Crumb Navigation */}
            <Breadcumb className='text-opacity-80 text-primary-dark' navigator={[type?.toUpperCase() ?? "", name?.toUpperCase() ?? ""]} />
            <Title variant='h1' className='font-black mt-2'>Details {name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : ""}</Title>
            <Paragraph className='mt-4 w-8/12 text-primary-dark text-opacity-70'>{description}</Paragraph>
            
        </div>
    );
};

export default PageDescription;
