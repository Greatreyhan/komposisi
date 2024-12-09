import React from 'react';

interface DetailLayoutProps {
  className?: string;
  Navigation?: React.ReactNode;
  Sidebar?: React.ReactNode;
  Content?: React.ReactNode;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  className = '',
  Navigation,
  Content,
}) => {
  return (
    <div className={`detail-layout ${className}`}>
      {Navigation && <div className='fixed w-full z-50 shadow-xl shadow-base-light'>{Navigation}</div>}
      <div className="w-full pt-8">
        {Content && <div className='flex-1 h-screen p-10'>{Content}</div>}
      </div>
    </div>
  );
};

export default DetailLayout;
