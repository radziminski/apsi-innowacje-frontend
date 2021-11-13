import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router';
import { getLoginPath } from '~/constants/paths';
import useAuthorizationInterceptor from '~/hooks/useAuthorizationInterceptor';
import { useSelector } from '~/store/hooks';
import { getMe, logout } from '~/store/slices/CreateUserSlice';
import LoadingOverlay from '../LoadingOverlay';

export const ProtectedRoute: React.FC<RouteProps> = props => {
  const { isAuthenticated, isLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = useCallback(() => {
    dispatch(logout());
    history.push(getLoginPath());
  }, [history]);

  useEffect(() => {
    if (isAuthenticated === null) dispatch(getMe());
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isLoading && isAuthenticated === false) history.push(getLoginPath());
  }, [isAuthenticated, isLoading]);

  useAuthorizationInterceptor(onLogout);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
