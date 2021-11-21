import React from 'react';
import { Link } from 'react-router-dom';
import { FONT_WEIGHTS } from '~/styles/variables';
import Box from '../Box';
import { Heading3 } from '../Text';
import { Container } from './parts';

interface Props {
  label: string;
  to?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<Props> = ({ label, to, icon, isActive, onClick }) => {
  const content = (
    <Container as={onClick && !to ? 'button' : 'div'} isActive={isActive} onClick={onClick}>
      {icon}
      <Box marginRight="1rem" />
      <Heading3 fontSize="1.1rem" fontWeight={FONT_WEIGHTS.medium}>
        {label}
      </Heading3>
    </Container>
  );

  if (to)
    return (
      <Link key={label} to={to}>
        {content}
      </Link>
    );

  return content;
};

export default NavItem;
