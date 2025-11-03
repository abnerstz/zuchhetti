import { memo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = memo(function ErrorState({
  title = 'Erro ao carregar dados',
  description = 'Não foi possível carregar as informações. Por favor, tente novamente.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
          mb: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 60, color: '#ef4444' }} />
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: '#ef4444',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
        {description}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 4px 14px 0 rgba(245, 87, 108, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
              boxShadow: '0 6px 20px 0 rgba(245, 87, 108, 0.5)',
            },
          }}
        >
          Tentar Novamente
        </Button>
      )}
    </Box>
  );
});
