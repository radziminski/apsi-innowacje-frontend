import React from 'react';
import CreateIdeaForm from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import styled from 'styled-components';
import { Asterisk } from '~/components/forms/Asterisk/Asterisk';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateIdeaPage = (props: { className?: string }): JSX.Element => {
  return (
    <DashboardContent
      title="Zgłoś pomysł"
      subTitle="Oto formularz zgłoszeniowy. Wypełnij i wyślij."
      icon={<MdOutlineDashboardCustomize size={28} />}>
      <div className={props.className}>
        <ToastContainer />
        <div className={'required-field-info'}>
          <span>
            <Asterisk /> - Pole wymagane
          </span>
        </div>
        <CreateIdeaForm />
      </div>
    </DashboardContent>
  );
};

export default styled(CreateIdeaPage)`
  .Toastify__toast-container--top-right {
    top: 9rem;
  }
`;
