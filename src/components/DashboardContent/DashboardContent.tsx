import React, { ReactNode } from 'react';
import { FlexBox } from '../Box';
import SectionTitle from '../SectionTitle';

interface Props {
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
}
export const DashboardContent: React.FC<Props> = ({ title, subTitle, icon, children }) => {
  return (
    <FlexBox position="relative" padding="4rem 3.5rem" flexDirection="column">
      {title && <SectionTitle title={title} subTitle={subTitle} icon={icon} />}
      {children}
    </FlexBox>
  );
};

export default DashboardContent;
