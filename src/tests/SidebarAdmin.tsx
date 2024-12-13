import React from 'react'
import LinkUrl from '../components/atoms/LinkUrl';
import List from '../components/molecules/List';

interface SidebarAdminProps {
    className?: string;
  }

const SidebarAdmin: React.FC<SidebarAdminProps> = ({className}) => {
    return (
        <div className={`bg-base-light border-r overflow-y-auto h-screen ${className}`}>
            <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="h-full w-full">

                    <nav className="mt-16 px-6 pb-8">
                        <List>
                            <List.Item variant='ghost' className='text-start pl-2 py-2 border-none hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Dashboard</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 py-2 border-none hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Add</LinkUrl></List.Item>
                            <List.Item variant='ghost' className='text-start pl-2 py-2 border-none hover:no-underline'><LinkUrl className='text-sm font-medium text-opacity-80 hover:text-opacity-100' to='/dashboard' variant='ghost'>Edit</LinkUrl></List.Item>
                        </List>
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default SidebarAdmin