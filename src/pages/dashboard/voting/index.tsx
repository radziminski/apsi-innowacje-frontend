import React from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';

export const VotingPage: React.FC = () => {
  return (
    <DashboardContent title="Głosowanie na pomysły" icon={<MdOutlineRateReview size={28} />}>
      Coming soon...
    </DashboardContent>
  );
};

export default VotingPage;
