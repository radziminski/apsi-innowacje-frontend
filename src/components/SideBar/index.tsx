import React, { useRef, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';

import useDevice from '~/hooks/useDevice';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { Z_INDEX } from '~/styles/variables';
import Box from '../Box';
import Logo from '../Logo';
import { ModalOverlay } from '../ModalOverlay';
import Nav from '../Nav';
import { Container } from './parts';

export const SideBar: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean | null>(false);
  const { isTab } = useDevice();
  const ref = useRef(null);

  useOutsideClick(ref, () => isOpened && setIsOpened(false));

  return (
    <>
      <Container isOpened={isOpened || !isTab} ref={ref}>
        <Box padding="0 3rem" marginBottom="4rem">
          <Logo />
        </Box>
        <Nav />
      </Container>

      {isTab && (
        <>
          <Box zIndex={Z_INDEX.modalMiddle} position="fixed" left="3rem" top="4rem" borderRadius="12px">
            <button onClick={() => setIsOpened(true)}>
              <IoMdMenu size={48} />
            </button>
          </Box>
          <ModalOverlay isVisible={isOpened} />
        </>
      )}
    </>
  );
};

export default SideBar;
