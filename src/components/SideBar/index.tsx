import React, { useRef, useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

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
  const { isTab, isMobile } = useDevice();
  const ref = useRef(null);

  useOutsideClick(ref, () => isOpened && setIsOpened(false));

  return (
    <>
      <Container isOpened={isOpened || !isTab} ref={ref}>
        <Box padding={isTab ? '0 1.5rem' : '0 3rem'} marginBottom="4rem">
          <Logo />
        </Box>
        <Nav />

        {isMobile && (
          <Box position="absolute" right="2rem" top="3.8rem">
            <button onClick={() => setIsOpened(false)}>
              <IoMdClose size={32} />
            </button>
          </Box>
        )}
      </Container>

      {isTab && (
        <>
          <Box zIndex={Z_INDEX.modalMiddle} position="fixed" left="3rem" top="2.5rem" borderRadius="12px">
            <button onClick={() => setIsOpened(true)}>
              <IoMdMenu size={48} />
            </button>
          </Box>
          <ModalOverlay isVisible={isOpened} onClick={() => setIsOpened(true)} />
        </>
      )}
    </>
  );
};

export default SideBar;
