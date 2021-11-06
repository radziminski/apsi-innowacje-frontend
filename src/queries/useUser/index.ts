import { LoggedUserDto } from './../../api-client/dotnet/api';
import { QueryKey } from './../types';
import { useQuery } from 'react-query';

const useUser = () => {
  const { data: user, ...restMutation } = useQuery<LoggedUserDto>(QueryKey.User, () => {
    // TODO - Get user from api
    return {};
  });

  return { user, ...restMutation };
};

export default useUser;
