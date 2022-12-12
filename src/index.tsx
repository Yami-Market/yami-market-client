import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';
import router from './router';
import store, { persistor } from './store/configureStore';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <CssBaseline />
            <HelmetProvider>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                classes={{
                  containerRoot: 'snackbar-container-root'
                }}
                autoHideDuration={2500}
              >
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </SnackbarProvider>
            </HelmetProvider>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
