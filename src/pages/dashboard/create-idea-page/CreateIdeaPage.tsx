import React from 'react';
import { Header } from '~/components/Header';
import { Heading3 } from '~/components/Text';
import CreateIdeaForm from '~/pages/dashboard/create-idea-page/components/CreateIdeaForm';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';

const CreateIdeaPage = (props: { className?: string }): JSX.Element => {
  return (
    <div className={props.className}>
      <Header text={'Zgłoś pomysł'} />
      <div>
        <Heading3>Oto formularz zgłoszeniowy. Sobie wypełnij i wyślij.</Heading3>
      </div>
      <CreateIdeaForm />
    </div>
  );
};

export default styled(CreateIdeaPage)`
  margin: ${MARGINS.medium};
  > div {
    margin: ${MARGINS.small};
  }
`;
