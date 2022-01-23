import React from 'react';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import Box, { Card, FlexBox } from '~/components/Box';
import useDevice from '~/hooks/useDevice';
import { DesktopDecisionsGrid } from '~/pages/dashboard/decisions/grids/DesktopDecisionsGrid';
import { MobileDecisionsGrid } from '~/pages/dashboard/decisions/grids/MobileDecisionsGrid';
import { customSelectStyles, SelectOption } from '~/components/forms';
import AsyncSelect from 'react-select/async';
import apiClient, { SubjectDto } from '~/api-client';
import { subjectDTOAudienceToSelectText } from '~/utils/utils';
import { CustomSubjectSelectOption } from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';
import { useSelector } from '~/store/hooks';
import { IdeaDto } from '~/api-client/java/api';
import { useDispatch } from 'react-redux';
import { getIdeasBySubject } from '~/store/slices/CreateDecisionsIdeasSlice';

const getFilteredOptions = (fetchedOptions: SelectOption[], inputValue: string) => {
  return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export const DecisionsPage = styled((props: { className?: string }) => {
  const { isTab, isWideTab, isMobile } = useDevice();
  const [selectedSubject, setSelectedSubject] = React.useState<SelectOption | null>(null);
  const [ideas, setIdeas] = React.useState<IdeaDto[] | null>(null);
  const { ideasBySubject } = useSelector(state => state.decisionsIdeas);
  const dispath = useDispatch();
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

  const onSelectSubject = React.useCallback(
    (option: SelectOption | null) => {
      setSelectedSubject(option);
    },
    [ideasBySubject]
  );

  React.useEffect(() => {
    if (selectedSubject === null) {
      setIdeas(null);
    } else {
      const allIdeas = ideasBySubject[parseInt(selectedSubject.value)];
      if (allIdeas) {
        const filteredIdeas = ideasBySubject[parseInt(selectedSubject.value)].filter(
          idea => idea.subjectId === parseInt(selectedSubject.value)
        );
        if (filteredIdeas) {
          if (filteredIdeas.length > 0) {
            setIdeas(filteredIdeas);
          } else {
            setIdeas([]);
          }
        }
      } else {
        dispath(getIdeasBySubject(parseInt(selectedSubject.value)));
        setIdeas(null);
      }
    }
  }, [ideasBySubject, selectedSubject]);

  return (
    <DashboardContent
      title="Podejmowanie decyzji"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={'W tym panelu możesz akceptować bądź odrzucać pomysły ocenione przez komisję.'}>
      <div className={props.className}>
        <FlexBox className="select-category">
          <span>Wybierz kategorię pomysłów: </span>
          <Box width={'300px'}>
            <AsyncSelect
              loadOptions={fetchSubjects}
              cacheOptions
              defaultOptions
              styles={customSelectStyles(false)}
              noOptionsMessage={() => 'Brak kategorii'}
              loadingMessage={() => 'Ładowanie kategoriinpm...'}
              components={{ Option: CustomSubjectSelectOption }}
              onChange={onSelectSubject}
              placeholder={'Wybierz...'}
            />
          </Box>
        </FlexBox>
        <Box paddingBottom={'1rem'} />
        {selectedSubject && <Paragraph fontWeight={500}>{`Pomysły w kategorii "${selectedSubject.label}":`}</Paragraph>}
        {ideas && (
          <Card>
            {(isWideTab && !isTab) || isMobile ? (
              <MobileDecisionsGrid ideas={ideas} />
            ) : (
              <DesktopDecisionsGrid ideas={ideas} />
            )}
          </Card>
        )}
      </div>
    </DashboardContent>
  );
})`
  .select-category {
    align-items: center;
    width: 600px;
    max-width: 100%;
    justify-content: flex-start;
    span {
      margin-right: 0.5rem;
    }
  }
`;
