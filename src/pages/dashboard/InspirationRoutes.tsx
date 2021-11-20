import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InspirationPage } from '~/pages/dashboard/inspiration-page/InspirationPage';
import { getInspirationDetailsPagePath, getInspirationsPagePath } from '~/constants/paths';
import { InspirationDetailsPage } from '~/pages/dashboard/inspiration-details-page/InspirationDetailsPage';

export const InspirationRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={getInspirationsPagePath()} component={InspirationPage} />
      <Route path={getInspirationDetailsPagePath()} component={InspirationDetailsPage} />
    </Switch>
  );
};

export default InspirationRoutes;
