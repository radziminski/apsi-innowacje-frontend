import React, { useCallback } from 'react';
import { Route, RouteProps, useHistory } from 'react-router';
import { getLoginPath } from '~/constants/paths';
import useAuthorizationInterceptor from '~/hooks/useAuthorizationInterceptor';

export const ProtectedRoute: React.FC<RouteProps> = props => {
  const history = useHistory();

  const onLogout = useCallback(() => {
    history.push(getLoginPath());
  }, [history]);

  useAuthorizationInterceptor(onLogout);

  return <Route {...props} />;
};

export default ProtectedRoute;
