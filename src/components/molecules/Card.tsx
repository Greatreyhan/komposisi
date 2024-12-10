import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../atoms/Title';
import Image from '../atoms/Image';

interface CardProps {
    className?: string;
    to: string;
    src?: string;
    alt?: string;
    title?: string;
    subtitle?: string;
  }
  

const Card : React.FC<CardProps> = ({className, to, src, alt, title, subtitle}) => {
  return (
    <Link to={to} className={`hover:bg-stone-100 flex flex-col md:w-3/12 w-5/12 rounded-2xl p-2 hover:text-amber-800 ${className}`}>
        <Image alt={alt} src={src} variant='rounded' className='w-full h-32' />
        <div className='mt-4 p-1'>
            <Title variant='h4' variantStyles='normal' >{title}</Title>
            <Title variant='p' variantStyles='normal' className='text-xs text-base-dark text-opacity-70 font-medium mt-1'>{subtitle}</Title>
        </div>
    </Link>
  )
}

export default Card