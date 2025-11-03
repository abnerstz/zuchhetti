import { AppBar, Toolbar, Typography, IconButton, Box, Chip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import { useTheme } from '@/contexts';

export function Header() {
  const { setMode, getEffectiveTheme } = useTheme();
  const effectiveTheme = getEffectiveTheme();

  const handleThemeToggle = () => {
    setMode(effectiveTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mr: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <PeopleIcon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              Gestão de Usuários
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.7rem' }}>
              Sistema de gerenciamento completo
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label="Admin"
            size="small"
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              backdropFilter: 'blur(10px)',
            }}
          />
          <IconButton
            onClick={handleThemeToggle}
            aria-label={`Alterar para tema ${effectiveTheme === 'light' ? 'escuro' : 'claro'}`}
            title={`Alterar para tema ${effectiveTheme === 'light' ? 'escuro' : 'claro'}`}
            sx={{
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {effectiveTheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
