import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterStatus } from '../store';

export default function FilterBar() {
  const dispatch = useDispatch();
  const todos = useSelector(s => s.todos);
  const filterStatus = useSelector(s => s.filterStatus);

  const total = todos.length;
  const completed = todos.filter(t => t.status === 'Completed').length;
  const incomplete = total - completed;

  const filters = [
    { value: 'All', label: `ALL (${total})` },
    { value: 'Completed', label: `COMPLETED (${completed})` },
    { value: 'Incomplete', label: `INCOMPLETE (${incomplete})` },
  ];

  return (
    <ToggleButtonGroup
      value={filterStatus}
      exclusive
      onChange={(_, v) => v && dispatch(setFilterStatus(v))}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mb: 3,
        '& .MuiToggleButton-root': {
          flex: { xs: '1 1 100%', sm: '1 1 30%' },
          minWidth: 0,
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 12px',
          border: '1px solid #d0d0d0',
          fontSize: { xs: '0.875rem', sm: '1rem' },
        },
        '& .Mui-selected': {
          backgroundColor: '#034EA2 !important',
          color: 'white !important',
          borderColor: '#034EA2',
          '&:hover': { backgroundColor: '#023e8a !important' },
        },
      }}
    >
      {filters.map(f => (
        <ToggleButton key={f.value} value={f.value}>
          {f.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
