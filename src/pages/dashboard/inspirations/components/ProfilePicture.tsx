import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FlexBox } from '~/components/Box';

export const ProfilePicture = () => {
  return (
    <FlexBox className={'profile-picture'}>
      <CgProfile size={35} />
    </FlexBox>
  );
};
