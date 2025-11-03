import { useState, useMemo, useCallback } from 'react';
import { Container, Box, Typography, Button, Paper, TablePagination, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UserTable } from '@/components/users/UserTable';
import { UserFormDialog } from '@/components/users/UserFormDialog';
import { DeleteConfirmDialog } from '@/components/users/DeleteConfirmDialog';
import { UserFilters } from '@/components/users/UserFilters';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks/useUsers';
import { useDebounce } from '@/hooks/useDebounce';
import { User, SortField, SortOrder } from '@/types/user.types';
import { UserFormData } from '@/schemas/user.schema';
import { sortUsers, filterUsersBySearch, paginateUsers } from '@/lib/utils';
import { PAGINATION, DEBOUNCE_DELAY } from '@/lib/constants';

export function Users() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(PAGINATION.DEFAULT_PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const { data: users = [], isLoading, isError, refetch } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const processedUsers = useMemo(() => {
    let result = [...users];

    if (debouncedSearch) {
      result = filterUsersBySearch(result, debouncedSearch);
    }

    result = sortUsers(result, sortField, sortOrder);

    return result;
  }, [users, debouncedSearch, sortField, sortOrder]);

  const paginatedUsers = useMemo(() => {
    return paginateUsers(processedUsers, page + 1, rowsPerPage);
  }, [processedUsers, page, rowsPerPage]);

  const handleSort = useCallback((field: SortField) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        return prevField;
      } else {
        setSortOrder('asc');
        return field;
      }
    });
  }, []);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleOpenCreate = useCallback(() => {
    setSelectedUser(null);
    setFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setFormOpen(true);
  }, []);

  const handleOpenDelete = useCallback((user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormOpen(false);
    setSelectedUser(null);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setDeleteOpen(false);
    setSelectedUser(null);
  }, []);

  const handleSubmitForm = useCallback(
    async (data: UserFormData) => {
      if (selectedUser) {
        await updateMutation.mutateAsync({ id: selectedUser.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      handleCloseForm();
    },
    [selectedUser, updateMutation, createMutation, handleCloseForm]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (selectedUser) {
      await deleteMutation.mutateAsync(selectedUser.id);
      handleCloseDelete();
    }
  }, [selectedUser, deleteMutation, handleCloseDelete]);

  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(to bottom, #0f0f23 0%, #1a1a2e 100%)'
            : 'linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            Gerenciamento de Usuários
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
            Visualize, adicione, edite e exclua usuários do sistema
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)',
                },
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9, fontWeight: 500 }}>
                Total de Usuários
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {processedUsers.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)',
                },
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9, fontWeight: 500 }}>
                Usuários Ativos
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {processedUsers.filter((u) => u.status === 'active').length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)',
                },
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9, fontWeight: 500 }}>
                Usuários Inativos
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {processedUsers.filter((u) => u.status === 'inactive').length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                    : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)',
                },
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9, fontWeight: 500 }}>
                Página Atual
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {page + 1}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Search and Add Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            background: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'white',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <UserFilters search={search} onSearchChange={setSearch} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenCreate}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                    boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.5)',
                  },
                }}
              >
                Novo Usuário
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <UserTable
          users={paginatedUsers}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          isLoading={isLoading}
          isError={isError}
          onRetry={handleRetry}
        />

        {!isLoading && !isError && processedUsers.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              background: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'white',
            }}
          >
            <TablePagination
              component="div"
              count={processedUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={PAGINATION.PAGE_SIZE_OPTIONS}
              labelRowsPerPage="Itens por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
              }
              sx={{
                '& .MuiTablePagination-toolbar': {
                  py: 2,
                },
              }}
            />
          </Paper>
        )}
      </Container>

      <UserFormDialog
        open={formOpen}
        user={selectedUser}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        user={selectedUser}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
}
