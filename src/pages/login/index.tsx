/* eslint-disable */
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDashboardPath } from '~/constants/paths';
import { useSelector } from '~/store/hooks';
import { login } from '~/store/slices/CreateUserSlice';
import { LoginLayout } from './layout';
import { LoginForm, formData } from './components/LoginForm';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import Logo from '~/components/Logo';
import { COLORS } from '~/styles/variables';
import { defaultTheme } from '~/styles/theme';

const Page: React.FC = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) history.push(getDashboardPath());
  }, [isAuthenticated]);

  const onSubmit = useCallback((data: formData) => {
    dispatch(login(data));
  }, []);

  return (
    <LoginLayout>
      <Center height="100%">
        <Center
          flexDirection="column"
          backgroundColor={COLORS.white}
          borderRadius="16px"
          padding={defaultTheme.margins.medium}>
          <Logo />
          <LoginForm onSubmit={onSubmit} />
        </Center>
      </Center>
    </LoginLayout>
  );
};

export default styled(Page)`
  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 60%;
    max-width: 60%;
  }
`;
