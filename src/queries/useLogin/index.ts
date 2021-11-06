import { setAuthTokensInStorage } from './../../hooks/useAuthorizationInterceptor/index';
import { QueryKey } from './../types';
import apiClient from '~/api-client';
import { useMutation, useQueryClient } from 'react-query';

const useLogin = () => {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    data: user,
    ...restMutation
  } = useMutation(
    async (credentials: { username: string; password: string }) => {
      const response = await apiClient.authAuthenticatePost(credentials);

      const { token, tokenExpirationDate, ...restResponse } = response.data;
      setAuthTokensInStorage(token ?? '', tokenExpirationDate ?? '');

      return restResponse;
    },
    {
      onSuccess: data => {
        queryClient.setQueryData(QueryKey.User, () => data);
      }
    }
  );

  return { login, user, ...restMutation };
};

export default useLogin;
