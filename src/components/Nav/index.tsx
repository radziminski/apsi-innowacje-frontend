import React from 'react';
import {
  MdOutlineDashboardCustomize,
  MdOutlineRateReview,
  MdOutlineDashboard,
  MdLogout,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

import { getIdeasPath, getCreateIdeaPath, getInspirationsPath, getVotingPath } from '~/constants/paths';
import { COLORS } from '~/styles/variables';
import Box, { FlexBox } from '../Box';
import NavItem from '../NavItem';
import { Pill } from './parts';

const ICON_SIZE = 16;

const NAV_LINKS = [
  {
    icon: <MdOutlineDashboard size={ICON_SIZE} />,
    to: getIdeasPath(),
    label: 'Pomysły',
  },
  {
    icon: <MdOutlineDashboardCustomize size={ICON_SIZE} />,
    to: getCreateIdeaPath(),
    label: 'Nowy pomysł',
  },
  {
    icon: <MdOutlineRateReview size={ICON_SIZE} />,
    to: getVotingPath(),
    label: 'Głosowanie',
  },
  {
    icon: <BiMessageDetail size={ICON_SIZE} />,
    to: getInspirationsPath(),
    label: 'Inspiracje',
  },
];

export const Nav: React.FC = () => {
  const location = useLocation();

  const getLocationOffset = () => {
    return NAV_LINKS.findIndex((link) => location.pathname.startsWith(link.to));
  };

  return (
    <FlexBox flexDirection="column" as="nav" padding="0 2.5rem" position="relative" height="100%">
      <FlexBox as="ul" flexDirection="column" color={COLORS.gray}>
        {NAV_LINKS.map((link) => (
          <Box as="li" paddingY="0.75rem" key={link.label}>
            <NavItem {...link} isActive={location.pathname.startsWith(link.to)} />
          </Box>
        ))}
      </FlexBox>

      <Pill offset={5 + getLocationOffset() * 40} />

      <Box paddingBottom="2.5rem" borderBottom={`1px solid ${COLORS.gray}`} opacity={0.5} />
      <Box marginTop="3rem" color={COLORS.gray}>
        <Box paddingY="0.75rem">
          <NavItem to="" icon={<MdOutlineAccountCircle size={ICON_SIZE} />} label="Dane użytkownika" />
        </Box>
        <Box paddingY="0.75rem">
          <NavItem to="" icon={<MdLogout size={ICON_SIZE} />} label="Wyloguj" />
        </Box>
      </Box>
    </FlexBox>
  );
};

export default Nav;
