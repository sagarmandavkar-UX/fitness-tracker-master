import React from 'react';
import { Typography, Box } from '@mui/material';

const PageTitle = ({ title, color = '#173F36' }) => {
  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mb: 4
      }}
    >
      <Typography 
        variant="h2" 
        align="center"
        sx={{ 
          fontWeight: 700, 
          fontFamily: '"Inter", sans-serif',
          color: color,
          fontSize: { xs: '2rem', md: '3rem' },
          position: 'relative',
          display: 'inline-block',
          marginLeft: 'auto',
          marginRight: 'auto',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '4px',
            width: '80px',
            backgroundColor: color,
            borderRadius: '2px'
          }
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle; 