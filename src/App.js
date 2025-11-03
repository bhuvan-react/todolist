import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Fab, IconButton,
  Snackbar, Alert, Box
} from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import useTodos from './hooks/useTodos';
import useSnackbar from './hooks/useSnackbar';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import AddEditForm from './components/AddEditForm';

export default function App() {
  const [screen, setScreen] = useState('main');
  const [editingTodo, setEditingTodo] = useState(null);
  const { grouped, actions } = useTodos();
  const { snackbar, show, hide } = useSnackbar();

  const goToAdd = () => { setEditingTodo(null); setScreen('form'); };
  const goToEdit = (t) => { setEditingTodo(t); setScreen('form'); };
  const goBack = () => setScreen('main');

  const handleSubmit = (title, desc, status) => {
    if (editingTodo) {
      actions.update(editingTodo.id, { title, description: desc, status });
      show('Task updated successfully!');
    } else {
      actions.add(title, desc);
      show('Task added successfully!');
    }
    goBack();
  };

  const handleDelete = (id) => {
    actions.remove(id);
    show('Task deleted!', 'success');
  };

  if (screen === 'form') {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={goBack}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {editingTodo ? 'Edit Task' : 'Add Task'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ mt: 3, px: 2 }}>
          <AddEditForm todo={editingTodo} onSubmit={handleSubmit} onCancel={goBack} />
        </Container>
        <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={hide}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={hide} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            TO-DO APP
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 3 }}>
          <SearchBar />
          <FilterBar />
        </Box>

        <TodoList title="In Progress" todos={grouped['In Progress']} onEdit={goToEdit} onDelete={handleDelete} />
        <TodoList title="Pending" todos={grouped['Pending']} onEdit={goToEdit} onDelete={handleDelete} />
        <TodoList title="Completed" todos={grouped['Completed']} onEdit={goToEdit} onDelete={handleDelete} />
      </Container>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={goToAdd}>
        <Add />
      </Fab>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={hide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={hide} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
