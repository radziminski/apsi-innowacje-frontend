import React, { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getDashboardPath, getLoginPath, getRootPath } from '~/constants/paths';
import DashboardRoutes from './dashboard';
import NotFoundPage from './not-found';
import LoginPage from './login';
import ProtectedRoute from '~/components/ProtectedRoute';
import { getMe, logout } from '~/store/slices/CreateUserSlice';
import { useSelector } from '~/store/hooks';
import { useDispatch } from 'react-redux';
import useAuthorizationInterceptor from '~/hooks/useAuthorizationInterceptor';
import { useHistory } from 'react-router';
import LoadingOverlay from '~/components/LoadingOverlay';

export const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, isUserAuthenticating } = useSelector(state => state.user);
  const history = useHistory();

  const onLogout = useCallback(() => {
    dispatch(logout());
    history.push(getLoginPath());
  }, [history]);

  useAuthorizationInterceptor(onLogout);
  const userIsLogingIn = isLoading && isUserAuthenticating;

  useEffect(() => {
    if (isAuthenticated === null) dispatch(getMe());
  }, [isAuthenticated]);

  return isLoading && !userIsLogingIn && !isAuthenticated ? (
    <LoadingOverlay />
  ) : (
    <Switch>
      <Route path={getRootPath()} exact>
        <Redirect to={getLoginPath()} />
      </Route>
      <Route path={getLoginPath()} component={LoginPage} />
      <ProtectedRoute
        path={getDashboardPath()}
        component={DashboardRoutes}
        condition={isAuthenticated !== false}
        fallbackPath={getLoginPath()}
        isLoading={isLoading}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoutes;
