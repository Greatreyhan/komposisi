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
      <div className="flex w-full pt-16">
        {Sidebar && <div className='fixed left-0 h-screen'>{Sidebar}</div>}
        {Content && <>{Content}</>}
      </div>
    </div>
  );
};

export default DashboardLayout;
