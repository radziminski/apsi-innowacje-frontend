import React from 'react';
import { QueryClient, QueryClientProvider as OriginalQueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const QueryClientProvider: React.FC = ({ children }) => {
  return <OriginalQueryClientProvider client={queryClient}>{children}</OriginalQueryClientProvider>;
};
