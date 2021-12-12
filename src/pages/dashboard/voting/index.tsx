import React from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export const VotingPage: React.FC = () => {
  return (
    <DashboardContent title="Głosowanie na pomysły" icon={<MdOutlineRateReview size={28} />}>
      <SunEditor />
    </DashboardContent>
  );
};

export default VotingPage;
