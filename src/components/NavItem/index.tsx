import React from 'react';
import { Link } from 'react-router-dom';
import { FONT_WEIGHTS } from '~/styles/variables';
import Box from '../Box';
import { Heading3 } from '../Text';
import { Container } from './parts';

interface Props {
  label: string;
  to: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const NavItem: React.FC<Props> = ({ label, to, icon, isActive }) => {
  return (
    <Link key={label} to={to}>
      <Container isActive={isActive}>
        {icon}
        <Box marginRight="1rem" />
        <Heading3 fontSize="1.1rem" fontWeight={FONT_WEIGHTS.medium}>
          {label}
        </Heading3>
      </Container>
    </Link>
  );
};

export default NavItem;
