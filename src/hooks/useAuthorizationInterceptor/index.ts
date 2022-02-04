import React, { useEffect } from 'react';
import { TOKEN_EXPIRATION_STORAGE_KEY } from '~/constants/constants';
import { TOKEN_STORAGE_KEY } from '~/constants/constants';
import axios from 'axios';
import { useSelector } from '~/store/hooks';

export const getAuthTokensFromStorage = () => ({
  token: localStorage.getItem(TOKEN_STORAGE_KEY),
  expirationToken: localStorage.getItem(TOKEN_EXPIRATION_STORAGE_KEY)
});

export const clearAuthTokensInStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRATION_STORAGE_KEY);
};

export const setAuthTokensInStorage = (token: string, expirationToken: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TOKEN_EXPIRATION_STORAGE_KEY, expirationToken);
};

const useAuthorizationInterceptor = (onLogout?: () => void) => {
  const { token, expirationToken } = getAuthTokensFromStorage();
  const tokenExpirationDate = expirationToken && new Date(expirationToken);
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interceptorFn = React.useRef<any>(null);

  useEffect(() => {
    if (interceptorFn.current !== null) {
      axios.interceptors.request.eject(interceptorFn.current);
      interceptorFn.current = null;
    }
    interceptorFn.current = axios.interceptors.request.use(
      req => {
        if (!currentUser && isAuthenticated === false) {
          return req;
        }
        if (!token) {
          onLogout && onLogout();
          throw new axios.Cancel('User is not signed in.');
        }

        if (tokenExpirationDate && Date.now() - tokenExpirationDate.getTime() > 0) {
          onLogout && onLogout();
          throw new axios.Cancel('User was logged out.');
        }

        if (!axios.isCancel(req) && req) {
          const authHeader = `Bearer ${token}`;

          if (!req.headers) req.headers = {};

          req.headers['Authorization'] = authHeader;
        }

        return req;
      },
      () => {
        if (interceptorFn.current !== null) {
          axios.interceptors.request.eject(interceptorFn.current);
        }
      }
    );
  }, [currentUser, isAuthenticated]);
};

export default useAuthorizationInterceptor;
