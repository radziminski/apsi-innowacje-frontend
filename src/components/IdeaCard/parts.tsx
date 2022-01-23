import styled from 'styled-components';
import React, { useState } from 'react';
import Box, { FlexBox } from '~/components/Box';
import { FiSettings } from 'react-icons/fi';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormRow } from '~/components/forms/FormRow';
import { FormTextInput } from '~/components/forms/FormTextInput';
import { FormComponentProps } from '~/components/forms';
import { Button } from '~/components/Button';
import apiClient, { RatingSettingDto, RatingSettingDtoUserRoleEnum } from '~/api-client';
import Loader from '~/components/Loader';
import { toast } from 'react-toastify';

export const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.2s;
  padding: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

interface RatingSettingsProps {
  ideaId: number;
  className?: string;
}

export interface RatingSettingsFormSchema {
  [RatingSettingDtoUserRoleEnum.Student]: number;
  [RatingSettingDtoUserRoleEnum.Employee]: number;
  [RatingSettingDtoUserRoleEnum.Committee]: number;
  [RatingSettingDtoUserRoleEnum.Admin]: number;
}

const schema = yup
  .object({
    [RatingSettingDtoUserRoleEnum.Student]: yup
      .number()
      .positive('Proszę wpisać dodatnią wartosć.')
      .integer('Proszę wpisać liczbę.')
      .required('Proszę wpisać dodatnią wartosć.')
      .max(10, 'Maksymalnie 10')
      .typeError('Proszę wpisać dodatnią wartość.'),
    [RatingSettingDtoUserRoleEnum.Employee]: yup
      .number()
      .positive('Proszę wpisać dodatnią wartosć.')
      .integer('Proszę wpisać liczbę.')
      .required('Proszę wpisać dodatnią wartosć.')
      .max(10, 'Maksymalnie 10')

      .typeError('Proszę wpisać dodatnią wartość.'),
    [RatingSettingDtoUserRoleEnum.Committee]: yup
      .number()
      .positive('Proszę wpisać dodatnią wartosć.')
      .integer('Proszę wpisać liczbę.')
      .required('Proszę wpisać dodatnią wartosć.')
      .max(10, 'Maksymalnie 10')

      .typeError('Proszę wpisać dodatnią wartość.'),
    [RatingSettingDtoUserRoleEnum.Admin]: yup
      .number()
      .positive('Proszę wpisać dodatnią wartosć.')
      .integer('Proszę wpisać liczbę.')
      .required('Proszę wpisać dodatnią wartosć.')
      .max(10, 'Maksymalnie 10')
      .typeError('Proszę wpisać dodatnią wartość.')
  })
  .required();

const NumberInput = (props: FormComponentProps) => {
  return <FormTextInput {...props} type={'number'} />;
};

export const RatingSettings = styled((props: RatingSettingsProps) => {
  const [ratingSettingWindowOpen, setRatingSettingWindowOpen] = useState(false);
  const [ratingSettings, setRatingSettings] = useState<RatingSettingDto[] | null>(null);
  const [ratingSettingsError, setRatingSettingsError] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const handleSettingsClick = React.useCallback(async () => {
    if (!ratingSettingWindowOpen) {
      if (ratingSettings === null) {
        try {
          const ratingSettingsResponse = await apiClient.getRatingSettingsByIdeaIdUsingGET(props.ideaId);
          if (ratingSettingsResponse.status === 200) {
            const ratingSettingsData = ratingSettingsResponse.data;
            setRatingSettings(ratingSettingsData);
            setRatingSettingsError(false);
          } else {
            setRatingSettingsError(true);
          }
        } catch (e) {
          setRatingSettingsError(true);
        }
      }
    }
    setRatingSettingWindowOpen(!ratingSettingWindowOpen);
  }, [ratingSettingWindowOpen]);

  const onSubmit = React.useCallback(
    async (data: RatingSettingsFormSchema) => {
      if (ratingSettings) {
        // eslint-disable-next-line no-console
        console.log(data);

        const formData: RatingSettingDto[] = Object.keys(data).reduce((array, role) => {
          const singleRatingSetting = ratingSettings.filter(
            set => set.userRole === RatingSettingDtoUserRoleEnum[role]
          )[0];
          return [
            ...array,
            {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              id: singleRatingSetting.id!,
              ideaId: props.ideaId,
              userRole: RatingSettingDtoUserRoleEnum[role],
              weight: data[role]
            }
          ];
        }, [] as RatingSettingDto[]);
        try {
          const response = await apiClient.updateExistingRatingSettingsByIdeaIdUsingPUT(props.ideaId, formData);
          if ([200, 201].includes(response.status)) {
            toast.success('Ustawienie zapisane.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          } else {
            toast.error('Wystąpił problem podczas zapisywania ustawień.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          }
        } catch (e) {
          toast.error('Wystąpił problem podczas zapisywania ustawień.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
      }
    },
    [ratingSettings, props.ideaId]
  );

  const cancelRatingSettings = React.useCallback(() => {
    methods.reset();
    setRatingSettingWindowOpen(false);
  }, []);

  return (
    <div className={props.className}>
      <Box
        as="button"
        transform="scale(1.2)"
        paddingLeft="0.5rem"
        onClick={handleSettingsClick}
        // ref={ref => (ratingSettingsButton.current = ref)}
        // data-tip
        // data-event="click"
        // data-iscapture="true"
        // data-scroll-hide="false">
      >
        <FiSettings />
      </Box>
      {ratingSettingWindowOpen && (
        <FlexBox className={'rating-settings__modal'}>
          {ratingSettingsError ? (
            <div>Nie udało się pobrać konfiguracji ocen</div>
          ) : ratingSettings === null ? (
            <Loader />
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {[
                  {
                    label: 'Waga dla roli Student:',
                    formId: RatingSettingDtoUserRoleEnum.Student,
                    defaultValue: ratingSettings.filter(set => set.userRole === RatingSettingDtoUserRoleEnum.Student)[0]
                      .weight
                  },
                  {
                    label: 'Waga dla roli Wykładowca:',
                    formId: RatingSettingDtoUserRoleEnum.Employee,
                    defaultValue: ratingSettings.filter(
                      set => set.userRole === RatingSettingDtoUserRoleEnum.Employee
                    )[0].weight
                  },
                  {
                    label: 'Waga dla roli Komisja:',
                    formId: RatingSettingDtoUserRoleEnum.Committee,
                    defaultValue: ratingSettings.filter(
                      set => set.userRole === RatingSettingDtoUserRoleEnum.Committee
                    )[0].weight
                  },
                  {
                    label: 'Waga dla roli Admin:',
                    formId: RatingSettingDtoUserRoleEnum.Admin,
                    defaultValue: ratingSettings.filter(set => set.userRole === RatingSettingDtoUserRoleEnum.Admin)[0]
                      .weight
                  }
                ].map(el => {
                  return (
                    <FormRow
                      key={JSON.stringify(el)}
                      inputWidth={'100px'}
                      label={el.label}
                      labelWidth={'120px'}
                      formId={el.formId}
                      customFormComponent={<NumberInput />}
                      defaultValue={el.defaultValue}
                      required
                    />
                  );
                })}
                <FlexBox className={'rating-settings__modal__buttons'}>
                  <Button type={'button'} text={'Anuluj'} onClick={cancelRatingSettings} />
                  <Button type={'submit'} text={'Ustaw'} primary />
                </FlexBox>
              </form>
            </FormProvider>
          )}
        </FlexBox>
      )}
    </div>
  );
})`
  .rating-settings__modal {
    flex-direction: column;
    z-index: ${({ theme }) => theme.zIndex.modalBack};
    position: absolute;
    border: 1px solid ${({ theme }) => theme.colors.primary}5A;
    background-color: white;
    border-radius: ${({ theme }) => theme.borderRadiuses.small};
    padding: ${({ theme }) => theme.spacing.xs};
    // transform: translateX(-1rem);
    right: 4.5rem;

    animation: appear 0.5s;
    @keyframes appear {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    form {
      input {
        border-radius: 10px;
      }
      .rating-settings__modal__buttons {
        justify-content: space-around;
      }
      button {
        padding: ${({ theme }) => theme.spacing.xs};
        min-width: 100px;
      }
    }
  }
`;
