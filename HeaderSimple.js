// src/components/HeaderSimple.js

import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderSimple = ({ links }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {links.map((link) => (
          <Button color="inherit" key={link.label} component={Link} to={link.link}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export { HeaderSimple };
