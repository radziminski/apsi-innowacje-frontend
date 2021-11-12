import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Center } from '~/components/Box';
import { getDashboardPath } from '~/constants/paths';
import { useSelector } from '~/store/hooks';
import { login } from '~/store/slices/CreateUserSlice';

export const LoginPage: React.FC = () => {
  const { isLoading, isAuthenticated, isError } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) history.push(getDashboardPath());
  }, [isAuthenticated]);

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;

    const username: string = form[0].value;
    const password: string = form[1].value;

    dispatch(login({ username, password }));
  }, []);

  return (
    <Center height="100vh" flexDirection="column">
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit"> SEND </button>
        {isError && <h5>ERROR!!!</h5>}
        {isLoading && <h5>Loading....</h5>}
      </form>
    </Center>
  );
};

export default LoginPage;
