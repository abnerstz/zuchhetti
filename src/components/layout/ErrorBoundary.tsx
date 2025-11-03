import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Container, Paper, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 500,
              }}
            >
              <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Ops! Algo deu errado
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Ocorreu um erro inesperado na aplicação. Por favor, tente recarregar a página.
              </Typography>
              {import.meta.env.DEV && this.state.error && (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mt: 2,
                    mb: 2,
                    textAlign: 'left',
                    bgcolor: 'grey.50',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  >
                    {this.state.error.message}
                  </Typography>
                </Paper>
              )}
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReset}
                size="large"
              >
                Recarregar Página
              </Button>
            </Paper>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
