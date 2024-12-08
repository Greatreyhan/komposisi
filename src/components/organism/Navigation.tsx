import React from 'react'
import Logo from '../molecules/Logo';
import { MdOutlineMenu, MdOutlineSearch } from "react-icons/md";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Button from '../atoms/Button';
import LinkUrl from '../atoms/LinkUrl';
import Hyperlink from '../atoms/Hyperlink';

interface NavigationProps {
    className?: string;
  }

const Navigation: React.FC<NavigationProps> = ({className}) => {
    return (
        <nav className={`bg-base-light w-full ${className}`}>
            <div className="px-8 mx-auto max-w-7xl">
                <div className="flex items-center justify-between h-16">

                    {/* Left */}
                    <div className=" flex items-center">

                        {/* Logo */}
                        <Logo className='w-5' url='/' src='/src/assets/logo.png' />
                        <h1 className='text-xl font-semibold ml-2'>Komposisi.</h1>
                    </div>

                    {/* Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline ml-10 space-x-4">
                            <LinkUrl to="/components" variant='ghost'>Home</LinkUrl>
                            <LinkUrl to="/elements" variant='ghost'>Docs</LinkUrl>
                            <LinkUrl to="/templates" variant='ghost'>Color</LinkUrl>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex">
                        <div className="flex items-center ml-4 md:ml-6">
                            <Button variant='ghost'><MdOutlineSearch className='text-2xl' /></Button>
                        </div>
                        <div className='px-2 border-l flex items-center'>
                            <Hyperlink url={'#'} variant='ghost'><FaGithub className='text-2xl' /></Hyperlink>
                            <Hyperlink url={'#'} variant='ghost'><FaLinkedin className='text-2xl' /></Hyperlink>
                            <Hyperlink url={'#'} variant='ghost'><FaInstagram className='text-2xl' /></Hyperlink>
                        </div>
                    </div>

                    {/* Hidden: Burger-menu */}
                    <div className="flex -mr-2 md:hidden">
                        <Button variant='ghost'><MdOutlineMenu className='text-3xl' /></Button>
                    </div>

                </div>
            </div>
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <LinkUrl to="/" variant='ghost' className='block text-start'>Test</LinkUrl>
                    <LinkUrl to="/" variant='ghost' className='block text-start'>Test</LinkUrl>
                    <LinkUrl to="/" variant='ghost' className='block text-start'>Test</LinkUrl>
                </div>
            </div>

            <hr className='w-11/12 mx-auto' />
        </nav>
    )
}

export default Navigation