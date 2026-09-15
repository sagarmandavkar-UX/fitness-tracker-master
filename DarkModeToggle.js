import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { styled } from '@mui/system';

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff', // Dark grey for dark mode, white for light mode
  borderRadius: '50%',
  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#f0f0f0', // Darker grey for dark mode, light grey for light mode
  },
}));

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <ToggleButton onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <Brightness7 sx={{ color: '#fff' }} /> : <Brightness4 />}
    </ToggleButton>
  );
};

export default DarkModeToggle;
