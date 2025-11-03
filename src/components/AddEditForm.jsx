import { Box, TextField, MenuItem, Button, Stack, Typography, Chip } from '@mui/material';

export default function AddEditForm({ todo, onSubmit, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const title = data.get('title').trim();
    const description = data.get('description').trim();
    const status = data.get('status') || 'Pending'; // Always get from form
    if (title && description) {
      onSubmit(title, description, status);
    }
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending', color: '#ccc' },
    { value: 'In Progress', label: 'In Progress', color: '#f39c12' },
    { value: 'Completed', label: 'Completed', color: '#4caf50' },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth={400} mx="auto" p={2}>
      <Stack spacing={3}>
        <TextField name="title" label="Title" defaultValue={todo?.title} required fullWidth variant="outlined" />
        <TextField
          name="description"
          label="Description"
          defaultValue={todo?.description}
          multiline
          rows={3}
          required
          fullWidth
          variant="outlined"
        />
        
        {/* Always show status dropdown */}
        <TextField
          name="status"
          select
          label="Status"
          defaultValue={todo?.status || 'Pending'}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: option.color,
                  }}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {option.label}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </TextField>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={onCancel} variant="outlined" size="medium">
            Cancel
          </Button>
          <Button type="submit" variant="contained" size="medium" color="primary">
            {todo ? 'Update' : 'ADD'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
