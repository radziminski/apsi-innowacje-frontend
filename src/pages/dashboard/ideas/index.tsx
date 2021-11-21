import React from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';

export const IdeasPage: React.FC = () => {
  return (
    <DashboardContent title="Pomysły na innowacje" icon={<MdOutlineDashboard size={28} />}>
      s
    </DashboardContent>
  );
};

export default IdeasPage;
