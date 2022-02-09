import React from 'react';
import CreateIdeaForm from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import { Asterisk } from '~/components/forms/Asterisk/Asterisk';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

const CreateIdeaPage = (): JSX.Element => {
  return (
    <DashboardContent
      title="Zgłoś pomysł"
      subTitle="Oto formularz zgłoszeniowy pomysłu, który będzie oceniony przez komisję."
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

export default CreateIdeaPage;
