import { useMemo, memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User, SortField, SortOrder } from '@/types/user.types';
import { getStatusColor, formatStatus } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

interface UserTableProps {
  users: User[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export const UserTable = memo(function UserTable({
  users,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
  isLoading,
  isError,
  onRetry,
}: UserTableProps) {
  const columns: { field: SortField; label: string; sortable: boolean }[] = useMemo(
    () => [
      { field: 'id', label: 'ID', sortable: true },
      { field: 'name', label: 'Nome', sortable: true },
      { field: 'email', label: 'E-mail', sortable: true },
      { field: 'status', label: 'Status', sortable: true },
    ],
    []
  );

  if (isError) {
    return (
      <Paper>
        <ErrorState onRetry={onRetry} />
      </Paper>
    );
  }

  if (!isLoading && users.length === 0) {
    return (
      <Paper>
        <EmptyState
          title="Nenhum usuário encontrado"
          description="Não há usuários cadastrados ou nenhum resultado corresponde aos filtros aplicados."
        />
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        overflowX: 'auto',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'white',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="tabela de usuários">
        <TableHead>
          <TableRow
            sx={{
              background: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.field}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  py: 2,
                }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortField === column.field}
                    direction={sortField === column.field ? sortOrder : 'asc'}
                    onClick={() => onSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
            <TableCell
              align="right"
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'text.secondary',
                py: 2,
              }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <LoadingSkeleton rows={5} columns={5} />
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(102, 126, 234, 0.1)'
                        : 'rgba(102, 126, 234, 0.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>#{user.id}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={formatStatus(user.status)}
                    color={getStatusColor(user.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 1,
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Tooltip title="Editar" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onEdit(user)}
                        aria-label={`Editar usuário ${user.name}`}
                        sx={{
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(102, 126, 234, 0.2)'
                              : 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          '&:hover': {
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(102, 126, 234, 0.3)'
                                : 'rgba(102, 126, 234, 0.2)',
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onDelete(user)}
                        aria-label={`Excluir usuário ${user.name}`}
                        sx={{
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(239, 68, 68, 0.2)'
                              : 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          '&:hover': {
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(239, 68, 68, 0.3)'
                                : 'rgba(239, 68, 68, 0.2)',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
