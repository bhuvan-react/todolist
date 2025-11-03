import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store';

export default function SearchBar() {
  const dispatch = useDispatch();

  return (
    <TextField
      placeholder="Search tasks..."
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: 'action.active' }} />
          </InputAdornment>
        ),
      }}
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
    />
  );
}
