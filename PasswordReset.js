import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from '@mui/material';
import { sendPasswordResetEmail } from '../../Firebase'; // Adjust import path

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Reset Your Password
          </Typography>
          {message && <Typography color="success">{message}</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Password Reset Email
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PasswordReset;
