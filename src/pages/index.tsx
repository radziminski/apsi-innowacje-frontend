import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getDashboardPath, getLoginPath, getRootPath } from '~/constants/paths';
import DashboardRoutes from './dashboard';
import NotFoundPage from './not-found';
import LoginPage from './login';

export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={getRootPath()} exact>
        <Redirect to={getLoginPath()} />
      </Route>
      <Route path={getLoginPath()} component={LoginPage} />
      <Route path={getDashboardPath()} component={DashboardRoutes} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoutes;
