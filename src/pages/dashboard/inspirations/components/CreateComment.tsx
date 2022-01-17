import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '~/components/Button';
import { FormTextArea } from '~/components/forms/FormTextArea';
import apiClient, { CreatePostDto } from '~/api-client';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { toast } from 'react-toastify';
import Loader from '~/components/Loader';

const schema = yup
  .object({
    comment: yup.string().required('Proszę wpisać komentarz.')
  })
  .required();

interface CommentSchema {
  comment: string;
}

interface CreateCommentProps {
  inspirationId: number;
  onCommentAdd?: () => void;
  className?: string;
}

const CommentPendingMsg = () => {
  return (
    <FlexBox>
      <span>
        Komentarz jest zapisywany... <Loader size={20} borderSize={2} />
      </span>
    </FlexBox>
  );
};

export const CreateComment = styled((props: CreateCommentProps) => {
  const commentPendingToast = React.useRef<React.ReactText | null>(null);
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const toastError = () => {
    toast.error('Wystąpił problem podczas dodawania komentarza i nie został on zapisany.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };
  const handleUserKeyPress = React.useCallback((event: KeyboardEvent) => {
    if (event.code === 'Enter' && event.ctrlKey) {
      // eslint-disable-next-line no-console
      console.log('Enter');
      methods.handleSubmit(onSubmit)();
    }
  }, []);

  const onSubmit = React.useCallback(
    async (data: CommentSchema) => {
      commentPendingToast.current = toast.info(<CommentPendingMsg />, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      if (currentUser && currentUser.id) {
        // setIsLoading(true);
        const formData = {
          text: data.comment,
          postId: props.inspirationId
        } as CreatePostDto;
        try {
          const response: AxiosResponse<number> = await apiClient.postCreatePostAnswerPost(formData);
          if ([200, 201].includes(response.status)) {
            if (commentPendingToast.current) {
              toast.dismiss(commentPendingToast.current);
            }
            toast.success('Komentarz został dodany.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            methods.reset();
            props.onCommentAdd && props.onCommentAdd();
          } else {
            if (commentPendingToast.current) {
              toast.dismiss(commentPendingToast.current);
            }
            toastError();
          }
        } catch (e) {
          if (commentPendingToast.current) {
            toast.dismiss(commentPendingToast.current);
          }
          toastError();
        }
        return;
      }
    },
    [props.inspirationId, props.onCommentAdd, currentUser]
  );
  return (
    <FormProvider {...methods}>
      <FlexBox className={props.className}>
        <Paragraph>Dodaj komentarz:</Paragraph>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FlexBox className={'create-comment__form-container'}>
            <FormTextArea id={'comment'} rows={1} onKeyPress={handleUserKeyPress} />
            <Button text={'Dodaj'} type={'submit'} primary />
          </FlexBox>
        </form>
      </FlexBox>
    </FormProvider>
  );
})`
  flex-direction: column;
  // box-shadow: 0 0 0.15rem #00000082;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  padding: 5px;
  margin: ${({ theme }) => theme.spacing.s} 0;
  form {
    width: 100%;
  }
  .create-comment__form-container {
    flex-direction: column;
  }
  textarea {
    margin: 5px 0;
    width: 100%;
  }
  button {
    align-self: flex-end;
    padding: 0.7rem ${({ theme }) => theme.spacing.m};
  }
`;
