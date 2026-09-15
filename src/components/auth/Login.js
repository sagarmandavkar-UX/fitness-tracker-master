import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography, InputAdornment, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithEmail, signInWithGoogle, sendPasswordResetEmail } from '../../Firebase';

const Login = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetMessage, setResetMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      setError("Incorrect email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError("Something went wrong with Google sign-in. Please try again.");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setShowResetForm(true);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setResetMessage(null);
    try {
      await sendPasswordResetEmail(resetEmail);
      setResetMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setResetMessage(null);
      setError(error.message || "Failed to send password reset email. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            {showResetForm ? 'Reset Password' : 'Login'}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {resetMessage && <Typography color="success">{resetMessage}</Typography>}
          {!showResetForm ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={handlePasswordVisibilityToggle}
                        sx={{ minWidth: 0 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{ mb: 2 }}
              >
                Sign in with Google
              </Button>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component="button" type="button" variant="body2" onClick={onSwitchToSignUp}>
                  Don't have an account? Sign up
                </Link>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component="button" type="button" variant="body2" onClick={handleForgotPassword}>
                  Forgot password?
                </Link>
              </Box>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="reset-email"
                label="Email Address"
                name="reset-email"
                autoComplete="email"
                autoFocus
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Send Reset Email
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowResetForm(false)}
                sx={{ mb: 2 }}
              >
                Back to Login
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
