import React from 'react';

interface DashboardLayoutProps {
  className?: string;
  Navigation?: React.ReactNode;
  Sidebar?: React.ReactNode;
  Content?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  className = '',
  Navigation,
  Sidebar,
  Content,
}) => {
  return (
    <div className={`dashboard-layout ${className}`}>
      {Navigation && <div className='fixed w-full z-50 shadow-xl shadow-base-light'>{Navigation}</div>}
      <div className="flex w-full pt-8">
        {Sidebar && <div className='fixed hidden md:block left-0 h-screen'>{Sidebar}</div>}
        <div className='w-0 md:w-2/12'></div>
        {Content && <div className='flex-1 h-screen p-10'>{Content}</div>}
      </div>
    </div>
  );
};

export default DashboardLayout;
