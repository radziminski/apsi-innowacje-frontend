import React, { ReactNode } from 'react';
import { Container } from './parts';
import SectionTitle from '../SectionTitle';

interface Props {
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
}
export const DashboardContent: React.FC<Props> = ({ title, subTitle, icon, children }) => {
  return (
    <Container>
      {title && <SectionTitle title={title} subTitle={subTitle} icon={icon} />}
      {children}
    </Container>
  );
};

export default DashboardContent;
