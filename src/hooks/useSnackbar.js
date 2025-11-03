import { useState } from 'react';

export default function useSnackbar() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const show = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const hide = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return { snackbar, show, hide };
}
