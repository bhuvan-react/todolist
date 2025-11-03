import { Card, CardContent, Typography, Chip, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { formatDate } from '../utils/formatDate';

const statusColors = {
  Pending: 'default',
  'In Progress': 'warning',
  Completed: 'success',
};

export default function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <Card sx={{ mb: 2, transition: '0.2s', '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ py: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Box flex={1} minWidth={0}>
            <Box display="flex" alignItems="center" gap={1} mb={1} flexWrap="wrap">
              <Chip
                label={todo.status}
                size="small"
                color={statusColors[todo.status]}
                sx={{ height: 24, fontSize: '0.75rem' }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                noWrap
                sx={{
                  textDecoration: todo.status === 'Completed' ? 'line-through' : 'none',
                  opacity: todo.status === 'Completed' ? 0.6 : 1,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                {todo.title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              {todo.description}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              {formatDate(todo.date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" onClick={() => onEdit(todo)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => onDelete(todo.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
