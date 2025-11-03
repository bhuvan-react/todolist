import { useState } from 'react';
import { Collapse, Box, Typography, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import TodoItem from './TodoItem';

export default function TodoList({ title, todos, onEdit, onDelete }) {
  const [open, setOpen] = useState(title === 'In Progress');

  if (todos.length === 0) return null;

  return (
    <Box mb={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="grey.100"
        borderRadius={2}
        onClick={() => setOpen(!open)}
        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.200' } }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title} ({todos.length})
        </Typography>
        <IconButton size="small">{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>
      <Collapse in={open}>
        <Box mt={1}>
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
