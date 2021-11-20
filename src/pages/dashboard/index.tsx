import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getCreateIdeaPath, getExamplePagePath, getInspirationsPagePath } from '~/constants/paths';
import ExamplePage from './example-page';
import DashboardLayout from './layout';
import CreateIdeaPage from './create-idea-page/CreateIdeaPage';
import InspirationRoutes from '~/pages/dashboard/InspirationRoutes';

export const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Switch>
        <Route path={getExamplePagePath()} component={ExamplePage} />
        <Route path={getCreateIdeaPath()} component={CreateIdeaPage} />
        <Route path={getInspirationsPagePath()} component={InspirationRoutes} />
        {/* Rest of dashboard routes here */}
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
