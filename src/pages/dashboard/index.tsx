import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  getCreateIdeaPath,
  getInspirationsPagePath,
  getIdeasPath,
  getVotingPath,
  getAccountDetailsPath
} from '~/constants/paths';
import DashboardLayout from './layout';
import CreateIdeaPage from './create-idea/CreateIdeaPage';
import { InspirationsPage } from '~/pages/dashboard/inspirations/InspirationsPage';
import IdeasPage from './ideas';
import VotingPage from './voting';
import AccountDetailsPage from './account-details';

export const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout>
      <Switch>
        <Route path={getIdeasPath()} component={IdeasPage} />
        <Route path={getCreateIdeaPath()} component={CreateIdeaPage} />
        <Route path={getVotingPath()} component={VotingPage} />
        <Route path={getInspirationsPagePath()} component={InspirationsPage} />
        <Route path={getAccountDetailsPath()} component={AccountDetailsPage} />
        <Route>
          <Redirect to={getIdeasPath()} />
        </Route>
        {/* Rest of dashboard routes here */}
      </Switch>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
