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
  const { isTab } = useDevice();

  useEffect(() => {
    if (isTab) {
      if (isOpened) {
        if (window.scrollY < 250) {
          // hack for showing whole detail
          window.scrollBy({
            top: 250,
            left: 0,
            behavior: 'smooth'
          });
        }
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'visible';
      }
    } else {
      if (isOpened) {
        if (window.scrollY < 140) {
          // hack for showing whole detail
          window.scrollBy({
            top: 140,
            left: 0,
            behavior: 'smooth'
          });
        }
      }

      return () => {
        document.body.style.overflowY = 'visible';
      };
    }
  }, [isOpened]);

  return <FlexBox className={className}>{children}</FlexBox>;
};

export const FixedMenuWrapper = styled(FixedMenuWrapperBase)`
  scroll-behavior: smooth;
  top: 0;
  bottom: 0;
  position: fixed;
  width: 100%;
  min-height: 100vh;

  // min-height: 100vh;
  > div {
    overflow-y: scroll;
  }
`;
