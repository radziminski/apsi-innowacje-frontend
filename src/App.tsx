import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AppRoutes from './pages';
import { GlobalStyles } from './styles/global';
import { defaultTheme } from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Provider store={store}>
          <GlobalStyles />
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
