import React from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import IdeasList from '~/components/IdeasList';

export const IdeasPage: React.FC = () => {
  return (
    <DashboardContent title="Pomysły na innowacje" icon={<MdOutlineDashboard size={28} />}>
      <IdeasList />
    </DashboardContent>
  );
};

export default IdeasPage;
