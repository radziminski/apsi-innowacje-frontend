import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { getDashboardPath, getLoginPath } from '~/constants/paths';
import DashboardRoutes from './dashboard';
import LoginPage from './login';

export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={getLoginPath()} component={LoginPage} />
      <Route path={getDashboardPath()} component={DashboardRoutes} />
    </Switch>
  );
};

export default AppRoutes;
