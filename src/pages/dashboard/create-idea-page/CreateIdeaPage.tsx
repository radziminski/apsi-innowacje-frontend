import React from 'react';
import { Header } from '~/components/Header';
import { Heading3 } from '~/components/Text';
import CreateIdeaForm from '~/pages/dashboard/create-idea-page/components/CreateIdeaForm';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';
import { Asterisk } from '~/components/forms/Asterisk/Asterisk';

const CreateIdeaPage = (props: { className?: string }): JSX.Element => {
  return (
    <div className={props.className}>
      <Header text={'Zgłoś pomysł'} />
      <div>
        <Heading3>Oto formularz zgłoszeniowy. Sobie wypełnij i wyślij.</Heading3>
      </div>
      <div className={'required-field-info'}>
        <Asterisk /> - Pole wymagane
      </div>
      <CreateIdeaForm />
    </div>
  );
};

export default styled(CreateIdeaPage)`
  margin: ${MARGINS.medium};
  margin-top: ${MARGINS.big};
  > div:first-of-type {
    margin: ${MARGINS.small};
    margin-top: ${MARGINS.big};
  }
  .required-field-info {
    margin: 15px 0 10px 30px;
  }
`;
