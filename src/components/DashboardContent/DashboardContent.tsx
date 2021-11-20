import React, { ReactNode } from 'react';
import useDevice from '~/hooks/useDevice';
import { FlexBox } from '../Box';
import SectionTitle from '../SectionTitle';

interface Props {
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
}
export const DashboardContent: React.FC<Props> = ({ title, subTitle, icon, children }) => {
  const { isTab } = useDevice();
  return (
    <FlexBox position="relative" padding={isTab ? '3rem 2rem' : '4rem 3.5rem'} flexDirection="column">
      {title && <SectionTitle title={title} subTitle={subTitle} icon={icon} />}
      {children}
    </FlexBox>
  );
};

export default DashboardContent;
