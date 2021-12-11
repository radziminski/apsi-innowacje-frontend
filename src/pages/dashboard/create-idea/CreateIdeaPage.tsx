import React from 'react';
import CreateIdeaForm from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import styled from 'styled-components';
import { SPACING } from '~/styles/variables';
import { Asterisk } from '~/components/forms/Asterisk/Asterisk';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const CreateIdeaPage = (): JSX.Element => {
  return (
    <DashboardContent
      title="Zgłoś pomysł"
      subTitle="Oto formularz zgłoszeniowy. Wypełnij i wyślij."
      icon={<MdOutlineDashboardCustomize size={28} />}>
      <div className={'required-field-info'}>
        <span>
          <Asterisk /> - Pole wymagane
        </span>
      </div>
      <CreateIdeaForm />
    </DashboardContent>
  );
};

export default styled(CreateIdeaPage)`
  > div:first-of-type {
    margin-top: ${SPACING.l};
  }
  h3 {
    margin-bottom: ${SPACING.m};
  }
  .required-field-info {
    margin: 15px 0 10px 30px;
    @media ${({ theme }) => theme.mediaQueries.mobile} {
      margin: 15px 0 10px 10px;
    }
    font-weight: 400;
  }
`;
