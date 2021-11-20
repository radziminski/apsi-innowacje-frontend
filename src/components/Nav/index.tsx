import React from 'react';
import {
  MdOutlineDashboardCustomize,
  MdOutlineRateReview,
  MdOutlineDashboard,
  MdLogout,
  MdOutlineAccountCircle
} from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

import {
  getIdeasPath,
  getCreateIdeaPath,
  getInspirationsPagePath,
  getVotingPath,
  getAccountDetailsPath
} from '~/constants/paths';
import { COLORS } from '~/styles/variables';
import Box, { FlexBox } from '../Box';
import NavItem from '../NavItem';
import { Pill } from './parts';
import { useDispatch } from 'react-redux';
import { logout } from '~/store/slices/CreateUserSlice';

const ICON_SIZE = 22;

const NAV_LINKS = [
  {
    icon: <MdOutlineDashboard size={ICON_SIZE} />,
    to: getIdeasPath(),
    label: 'Pomysły'
  },
  {
    icon: <MdOutlineDashboardCustomize size={ICON_SIZE} />,
    to: getCreateIdeaPath(),
    label: 'Nowy pomysł'
  },
  {
    icon: <MdOutlineRateReview size={ICON_SIZE} />,
    to: getVotingPath(),
    label: 'Głosowanie'
  },
  {
    icon: <BiMessageDetail size={ICON_SIZE} />,
    to: getInspirationsPagePath(),
    label: 'Inspiracje'
  }
];

export const Nav: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isInAccountPage = location.pathname.startsWith(getAccountDetailsPath());

  const getLocationOffset = () => {
    if (isInAccountPage) {
      return 5.4;
    }
    return Math.max(
      NAV_LINKS.findIndex(link => location.pathname.startsWith(link.to)),
      0
    );
  };

  return (
    <FlexBox flexDirection="column" as="nav" padding="0 3.5rem" position="relative" height="100%">
      <FlexBox as="ul" flexDirection="column" color={COLORS.gray}>
        {NAV_LINKS.map(link => (
          <Box as="li" paddingY="1.25rem" key={link.label}>
            <NavItem {...link} isActive={location.pathname.startsWith(link.to)} />
          </Box>
        ))}
      </FlexBox>

      <Pill offset={9 + getLocationOffset() * 64} />

      <Box paddingBottom="3rem" borderBottom={`1px solid ${COLORS.gray}`} opacity={0.5} />
      <Box marginTop="3rem" color={COLORS.gray}>
        <Box paddingY="1.25rem">
          <NavItem
            to={getAccountDetailsPath()}
            icon={<MdOutlineAccountCircle size={ICON_SIZE} />}
            isActive={isInAccountPage}
            label="Dane użytkownika"
          />
        </Box>
        <Box paddingY="1.25rem">
          <NavItem onClick={() => dispatch(logout())} icon={<MdLogout size={ICON_SIZE} />} label="Wyloguj" />
        </Box>
      </Box>
    </FlexBox>
  );
};

export default Nav;
