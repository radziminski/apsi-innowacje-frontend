import React from 'react';
import styled from 'styled-components';
import { Button } from '~/components/Button';
import { FlexBox } from '~/components/Box';
import { Modal } from '~/components/Modal';
import { SubjectRequestPendingModal } from '~/pages/dashboard/subjects/components/SubjectRequestPendingModal';
import { RequestStatus } from '~/constants/constants';
import { Heading3 } from '~/components/Text';
import { FormRow } from '~/components/forms/FormRow';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import apiClient, { SubjectDto, SubjectDtoAudienceEnum, UserDto, UserRole } from '~/api-client';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { components } from 'react-select';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { getSubjects } from '~/store/slices/CreateIdeasSlice';

interface CreateSubjectModalProps {
  closeSelf: () => void;
  className?: string;
}

interface CreateSubjectFormSchema {
  name: string;
  audience: SelectOption;
  committee: SelectOption[];
}

const schema = yup.object({
  name: yup.string().required('Proszę podać tytuł'),
  audience: yup.object().required('Proszę wybrać grupę docelową'),
  committee: yup
    .array()
    .min(1, 'Proszę wybrać przynajmniej jednego członka komisji.')
    .required('Proszę wybrać przynajmniej jednego członka komisji.')
});

export interface SelectOption {
  label: string;
  value: string;
}

export const CustomCommitteeSelectOption = ({ innerRef, innerProps, ...restProps }) => {
  return (
    <div ref={innerRef} {...innerProps}>
      <components.Option {...innerProps} {...restProps} getStyles={() => restProps.getStyles('option', restProps)}>
        <span>{restProps.data.label}</span>
      </components.Option>
      {restProps.value !== restProps.options[restProps.options.length - 1].value && (
        <div style={{ borderBottom: 'solid 1px rgba(0, 0, 0, 0.2)', height: '1px', margin: '0 5px' }} />
      )}
    </div>
  );
};

export const CreateSubjectModal = styled((props: CreateSubjectModalProps) => {
  const [requestStatus, setRequestStatus] = React.useState<RequestStatus | undefined>(undefined);

  const dispatch = useDispatch();

  const audienceOptions = [
    {
      label: 'Studenci',
      value: SubjectDtoAudienceEnum.Student
    },
    {
      label: 'Wykładowcy',
      value: SubjectDtoAudienceEnum.Employee
    },
    {
      label: 'Komisja',
      value: SubjectDtoAudienceEnum.Committee
    }
  ];

  const fetchUsers = React.useCallback(async (): Promise<SelectOption[]> => {
    try {
      const response = await apiClient.usersUsersGet('', 0, 10000);
      if (response.status === 200) {
        const fetchedUsers: UserDto[] = response.data;
        return fetchedUsers
          .filter(user => user.id !== undefined && user.firstName !== undefined && user.lastName !== undefined)
          .filter(user => user.userRole && user.userRole === UserRole.Committee)
          .map(user => ({
            value: `${user.id}`,
            label: `${user.firstName} ${user.lastName}`
          }));
      } else {
        toast.error('Wystąpił problem podczas pobierania członków komisji');
        return [];
      }
    } catch (e) {
      toast.error('Wystąpił problem podczas pobierania członków komisji');
    }
    return [];
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: CreateSubjectFormSchema) => {
    const formData = {
      name: data.name,
      audience: data.audience.value,
      committeeMembers: data.committee.map(option => parseInt(option.value)),
      done: false
    } as SubjectDto;
    // eslint-disable-next-line no-console
    console.log(formData);
    setRequestStatus('pending');
    try {
      const response: AxiosResponse<number> = await apiClient.saveSubjectUsingPOST(formData);
      if ([200, 201].includes(response.status)) {
        toast.success('Temat został zapisany.');
        setRequestStatus('success');
        dispatch(getSubjects());
        props.closeSelf();
      } else {
        setRequestStatus('error');
        toast.error('Wystąpił błąd podczas zapisywania tematu.');
      }
    } catch (e) {
      setRequestStatus('error');
      toast.error('Wystąpił błąd podczas zapisywania tematu.');
    }
    return;
  };
  return (
    <Modal
      content={
        <FlexBox className={props.className}>
          {requestStatus && requestStatus === 'pending' && <SubjectRequestPendingModal />}
          <FormProvider {...methods}>
            <div className={'form-container'}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FlexBox flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>
                  <FlexBox flexDirection={'column'}>
                    <Heading3 fontSize="1.4rem" fontWeight={500}>
                      Stwórz temat
                    </Heading3>
                    <FormRow
                      type={'text'}
                      label={'Tytuł'}
                      formId={'name'}
                      inputWidth={'80%'}
                      labelWidth={'20%'}
                      placeholder={'Wpisz tytuł'}
                      maxLength="100"
                      required
                    />
                    <FormRow
                      type={'select'}
                      label={'Grupa docelowa'}
                      formId={'audience'}
                      inputWidth={'80%'}
                      labelWidth={'20%'}
                      placeholder={'Wybierz grupę docelową'}
                      required
                      options={audienceOptions}
                      maxMenuHeight={200}
                    />
                    <FormRow
                      label={'Komisja'}
                      formId={'committee'}
                      type={'async-select'}
                      inputWidth={'80%'}
                      labelWidth={'20%'}
                      placeholder={'Wybierz komisję'}
                      fetchOptions={fetchUsers}
                      required
                      isMulti
                      closeMenuOnSelect={false}
                      maxMenuHeight={150}
                      components={{ Option: CustomCommitteeSelectOption }}
                    />
                  </FlexBox>
                  <FlexBox className={'create-subject__buttons'}>
                    <Button text={'Anuluj'} type={'button'} onClick={props.closeSelf} />
                    <Button text={'Wyślij'} type={'submit'} primary />
                  </FlexBox>
                </FlexBox>
              </form>
            </div>
          </FormProvider>
        </FlexBox>
      }
    />
  );
})`
  width: 600px;
  max-width: 80vw;
  overflow: hidden;
  height: 400px;
  .create-subject__buttons {
    width: 100%;
    justify-content: flex-end;
    align-self: flex-end;
  }

  form {
    height: 100%;
  }

  .form-container {
    width: 100%;
  }
`;
