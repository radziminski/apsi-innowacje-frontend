import React from 'react';
import Header from '~/components/Header';
import { Heading3 } from '~/components/Text';
import CreateIdeaForm from '~/pages/dashboard/create-idea-page/components/CreateIdeaForm';
import styled from 'styled-components';

const CreateIdeaPage = (props: { className?: string }): JSX.Element => {
  return (
    <div className={props.className}>
      <Header text={'Zgłoś pomysł'} />
      <Heading3>Oto formularz zgłoszeniowy. Sobie wypełnij i wyślij.</Heading3>
      <CreateIdeaForm />
    </div>
  );
};

export default styled(CreateIdeaPage)`
  margin: 15px;
`;
