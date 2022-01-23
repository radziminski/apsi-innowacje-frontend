import React from 'react';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import { Card, FlexBox } from '~/components/Box';
import useDevice from '~/hooks/useDevice';
import { DesktopDecisionsGrid } from '~/pages/dashboard/decisions/grids/DesktopDecisionsGrid';
import { MobileDecisionsGrid } from '~/pages/dashboard/decisions/grids/MobileDecisionsGrid';
import { customSelectStyles, SelectOption } from '~/components/forms';
import AsyncSelect from 'react-select/async';
import apiClient, { SubjectDto } from '~/api-client';
import { subjectDTOAudienceToSelectText } from '~/utils/utils';
import { CustomSubjectSelectOption } from '~/pages/dashboard/create-idea/components/CreateIdeaForm';

const getFilteredOptions = (fetchedOptions: SelectOption[], inputValue: string) => {
  return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const DecisionsPage = () => {
  const { isTab, isWideTab, isMobile } = useDevice();

  const fetchSubjects = React.useCallback(async (inputValue: string) => {
    const fetchedSubjects: SubjectDto[] = (await apiClient.getAllSubjectsUsingGET()).data;

    const fetchedOptions = fetchedSubjects.map(subject => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: `${subject.id!}`,
      label: subject.name ?? 'Nieznany',
      details: subjectDTOAudienceToSelectText(subject.audience)
    }));
    return new Promise(resolve => resolve(getFilteredOptions(fetchedOptions, inputValue)));
  }, []);

  return (
    <DashboardContent
      title="Podejmowanie decyzji"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={'W tym panelu możesz akceptować bądź odrzucać pomysły ocenione przez komisję.'}>
      <div>
        <FlexBox alignItems={'center'}>
          <span>Wybierz kategorię (TODO): </span>
          <AsyncSelect
            loadOptions={fetchSubjects}
            cacheOptions
            defaultOptions
            styles={customSelectStyles(false)}
            noOptionsMessage={() => 'Brak opcji'}
            loadingMessage={() => 'Ładowanie opcji...'}
            components={{ Option: CustomSubjectSelectOption }}
          />
        </FlexBox>
        <Card>{(isWideTab && !isTab) || isMobile ? <MobileDecisionsGrid /> : <DesktopDecisionsGrid />}</Card>
      </div>
    </DashboardContent>
  );
};
