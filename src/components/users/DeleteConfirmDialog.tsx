import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { User } from '@/types/user.types';

interface DeleteConfirmDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const CONFIRM_DELAY = 1000; // 1 segundo

export function DeleteConfirmDialog({
  open,
  user,
  onClose,
  onConfirm,
  isLoading,
}: DeleteConfirmDialogProps) {
  const [canConfirm, setCanConfirm] = useState(false);

  useEffect(() => {
    if (open) {
      setCanConfirm(false);
      const timer = setTimeout(() => {
        setCanConfirm(true);
      }, CONFIRM_DELAY);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(26, 26, 46, 0.95)' : 'white',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <DialogTitle
        id="delete-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 1,
          fontSize: '1.25rem',
          fontWeight: 700,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'rgba(245, 87, 108, 0.1)',
          }}
        >
          <WarningAmberIcon sx={{ color: '#f5576c' }} />
        </Box>
        Confirmar Exclusão
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <DialogContentText id="delete-dialog-description" sx={{ fontSize: '1rem' }}>
          Tem certeza que deseja excluir o usuário <strong>{user?.name}</strong>? Esta ação não pode
          ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={!canConfirm || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 4px 14px 0 rgba(245, 87, 108, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
              boxShadow: '0 6px 20px 0 rgba(245, 87, 108, 0.5)',
            },
            '&:disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {isLoading ? 'Excluindo...' : canConfirm ? 'Excluir' : 'Aguarde...'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
