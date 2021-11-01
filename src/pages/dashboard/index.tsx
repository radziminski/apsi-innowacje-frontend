import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getExamplePagePath } from '~/constants/paths';
import ExamplePage from './example-page';
import DashboardLayout from './layout';

export const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Switch>
        <Route path={getExamplePagePath()} component={ExamplePage} />
        {/* Rest of dashboard routes here */}
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
