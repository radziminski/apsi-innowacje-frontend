import React, { useCallback } from 'react';
import { Center } from '~/components/Box';
import useLogin from '~/queries/useLogin';

export const LoginPage: React.FC = () => {
  const { login, isError, isLoading } = useLogin();

  // example how TO NOT IMPLEMENT login form
  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;

    const username: string = form[0].value;
    const password: string = form[1].value;

    login({ username, password });
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
