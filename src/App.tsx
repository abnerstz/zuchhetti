import { useMemo, lazy, Suspense } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  CircularProgress,
} from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { Header } from '@/components/layout/Header';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider, useTheme } from '@/contexts';

const Users = lazy(() => import('@/pages/Users').then((module) => ({ default: module.Users })));

function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <CircularProgress size={48} />
    </Box>
  );
}

function AppContent() {
  const { getEffectiveTheme } = useTheme();
  const effectiveTheme = getEffectiveTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: effectiveTheme,
          primary: {
            main: '#2196f3',
          },
          secondary: {
            main: '#f50057',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [effectiveTheme]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <Users />
      </Suspense>
      <Toaster
        position="top-right"
        expand={false}
        closeButton
        theme={effectiveTheme}
        toastOptions={{
          style: {
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
            padding: '16px',
            paddingRight: '40px',
            fontSize: '14px',
            fontWeight: '500',
          },
          className: 'toast-custom',
          duration: 4000,
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
