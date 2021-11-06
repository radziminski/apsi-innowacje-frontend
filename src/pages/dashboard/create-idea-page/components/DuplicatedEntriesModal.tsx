import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';

const DuplicatedEntriesModalBase = (props: { className?: string; filename: string | undefined }) => {
  return (
    <Center className={props.className}>
      <div>Jeden z dodanych plików już istnieje: {props.filename || ''}</div>
      {/*<button>Ok</button>*/}
    </Center>
  );
};

export const DuplicatedEntriesModal = styled(DuplicatedEntriesModalBase)`
  width: 50%;
  height: 20%;
`;
