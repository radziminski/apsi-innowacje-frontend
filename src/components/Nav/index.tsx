import React from 'react';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { COLORS, FONT_WEIGHTS } from '~/styles/variables';
import Box, { FlexBox } from '../Box';
import { Heading3 } from '../Text';

const ICON_SIZE = 16;

const NAV_LINKS = [
  {
    icon: <MdOutlineDashboardCustomize size={ICON_SIZE} />,
    to: '/',
    label: 'Pomysły'
  },
  {
    icon: <MdOutlineDashboardCustomize size={ICON_SIZE} />,
    to: '/',
    label: 'Nowy pomysł'
  },
  {
    icon: <MdOutlineDashboardCustomize size={ICON_SIZE} />,
    to: '/',
    label: 'Pomysły'
  }
];

export const Nav: React.FC = () => {
  return (
    <FlexBox as="nav" flexDirection="column" color={COLORS.gray}>
      {NAV_LINKS.map(link => (
        <Link key={link.label} to={link.to}>
          <FlexBox alignItems="center" marginBottom="1rem" cursor="pointer">
            {link.icon}
            <Box marginRight="0.75rem" />
            <Heading3 fontSize="0.75rem" fontWeight={FONT_WEIGHTS.medium}>
              {link.label}
            </Heading3>
          </FlexBox>
        </Link>
      ))}
    </FlexBox>
  );
};

export default Nav;
