import React from 'react';
import { Header } from '~/components/Header';
import { Heading3 } from '~/components/Text';
import CreateIdeaForm from '~/pages/dashboard/create-idea-page/components/CreateIdeaForm';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';
import { Provider } from 'react-redux';
import { store } from '~/store/store';

const CreateIdeaPage = (props: { className?: string }): JSX.Element => {
  return (
    <Provider store={store}>
      <div className={props.className}>
        <Header text={'Zgłoś pomysł'} />
        <div>
          <Heading3>Oto formularz zgłoszeniowy. Sobie wypełnij i wyślij.</Heading3>
        </div>
        <CreateIdeaForm />
      </div>
    </Provider>
  );
};

export default styled(CreateIdeaPage)`
  margin: ${MARGINS.medium};
  margin-top: ${MARGINS.big};
  > div {
    margin: ${MARGINS.small};
    margin-top: ${MARGINS.big};
  }
`;
