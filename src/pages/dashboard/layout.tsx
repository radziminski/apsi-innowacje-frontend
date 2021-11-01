import React from 'react';

export const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div>
      <div>SIDEBAR HERE</div>
      <div>
        CONTENT HERE
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
