import React, { Suspense } from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import 'suneditor/dist/css/suneditor.min.css';
import { CenteredLoader } from '~/components/Loader';

export const VotingPage: React.FC = () => {
  const SunEditor = React.lazy(() => import('suneditor-react'));

  return (
    <DashboardContent title="Głosowanie na pomysły" icon={<MdOutlineRateReview size={28} />}>
      <Suspense fallback={<CenteredLoader />}>
        <SunEditor />
      </Suspense>
    </DashboardContent>
  );
};

export default VotingPage;
