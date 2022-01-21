import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDashboardPath } from '~/constants/paths';
import { useSelector } from '~/store/hooks';
import { login } from '~/store/slices/CreateUserSlice';
import { LoginLayout } from './layout';
import { LoginForm, LoginFormData } from './components/LoginForm';
import { Center } from '~/components/Box';
import Logo from '~/components/Logo';
import { COLORS } from '~/styles/variables';
import { defaultTheme } from '~/styles/theme';

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) history.push(getDashboardPath());
  }, [isAuthenticated]);

  const onSubmit = useCallback((data: LoginFormData) => {
    dispatch(login(data));
  }, []);

  return (
    <LoginLayout>
      <Center height="100%">
        <Center
          flexDirection="column"
          backgroundColor={COLORS.white}
          borderRadius="16px"
          padding={defaultTheme.spacing.m}>
          <Logo />
          <LoginForm onSubmit={onSubmit} />
        </Center>
      </Center>
    </LoginLayout>
  );
};

export default LoginPage;
