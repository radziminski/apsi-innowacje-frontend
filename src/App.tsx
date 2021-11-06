import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AppRoutes from './pages';
import { QueryClientProvider } from './queries/QueryClientProvider';
import { GlobalStyles } from './styles/global';
import { defaultTheme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider>
        <BrowserRouter>
          <GlobalStyles />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
