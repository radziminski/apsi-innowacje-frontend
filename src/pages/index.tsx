import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getDashboardPath, getLoginPath, getRootPath } from '~/constants/paths';
import DashboardRoutes from './dashboard';
import NotFoundPage from './not-found';
import LoginPage from './login';
import ProtectedRoute from '~/components/ProtectedRoute';
import { getMe } from '~/store/slices/CreateUserSlice';
import { useSelector } from '~/store/hooks';
import { useDispatch } from 'react-redux';

export const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated === null) dispatch(getMe());
  }, [isAuthenticated]);

  return (
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
