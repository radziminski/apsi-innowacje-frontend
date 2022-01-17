import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  getAccountDetailsPath,
  getCreateIdeaPath,
  getIdeasPath,
  getInspirationsPagePath,
  getVotingPath
} from '~/constants/paths';
import DashboardLayout from './layout';
import CreateIdeaPage from './create-idea/CreateIdeaPage';
import { InspirationsPage } from '~/pages/dashboard/inspirations/InspirationsPage';
import IdeasPage from './ideas';
import VotingPage from './voting';
import AccountDetailsPage from './account-details';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const DashboardRoutes: React.FC = (props: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <DashboardLayout>
      <div className={props.className}>
        <ToastContainer newestOnTop />
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
      </div>
    </DashboardLayout>
  );
};

export default styled(DashboardRoutes)`
  .Toastify__toast-container--top-right {
    top: 9rem;
  }
`;
