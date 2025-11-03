import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function UserFilters({ search, onSearchChange }: UserFiltersProps) {
  return (
    <TextField
      fullWidth
      placeholder="Buscar por nome ou e-mail..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-focused': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'white',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
      inputProps={{
        'aria-label': 'Buscar usuários',
      }}
    />
  );
}
