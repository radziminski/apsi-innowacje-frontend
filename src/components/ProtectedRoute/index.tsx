import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router';
import { getLoginPath } from '~/constants/paths';
import useAuthorizationInterceptor from '~/hooks/useAuthorizationInterceptor';
import { logout } from '~/store/slices/CreateUserSlice';
import LoadingOverlay from '../LoadingOverlay';

export const ProtectedRoute: React.FC<RouteProps & { condition: boolean; fallbackPath: string; isLoading: boolean }> =
  props => {
    const { condition, fallbackPath, isLoading, ...rest } = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = useCallback(() => {
      dispatch(logout());
      history.push(getLoginPath());
    }, [history]);

    useAuthorizationInterceptor(onLogout);

    useEffect(() => {
      if (!isLoading && !condition) history.push(fallbackPath);
    }, [condition, isLoading]);

    if (isLoading) {
      return <LoadingOverlay />;
    }

    return condition ? <Route {...rest} /> : null;
  };

export default ProtectedRoute;
