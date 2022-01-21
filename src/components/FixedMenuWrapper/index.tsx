import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import React, { useEffect } from 'react';
import useDevice from '~/hooks/useDevice';

interface FixedMenuWrapperProps {
  isOpened?: boolean;
  className?: string;
}

const FixedMenuWrapperBase = (props: React.PropsWithChildren<FixedMenuWrapperProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpened, className, children } = props;
  const { isWideTab } = useDevice();

  useEffect(() => {
    if (isWideTab) {
      if (isOpened) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'visible';
      }
    }
    return () => {
      document.body.style.overflowY = 'visible';
    };
  }, [isOpened, isWideTab]);

  return <FlexBox className={className}>{children}</FlexBox>;
};

export const FixedMenuWrapper = styled(FixedMenuWrapperBase)`
  scroll-behavior: smooth;
  top: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  max-height: 100%;

  > div {
    overflow-y: scroll;
  }
`;
