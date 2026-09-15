import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider, Button, Container, Paper, Typography } from '@mui/material';
import PricingCard from "./components/PricingCard";
import "./assets/css/PricingApp.css";
import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import PersonalizedWorkout from './components/PersonalizedWorkout';
import ChatPage from './components/ChatPage';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from './components/PageTitle';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectMonthly, setSelectMonthly] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#C9FF3D',
        light: '#DDFF85',
        dark: '#9ED51C',
      },
      background: {
        default: '#101B18',
        paper: '#173F36',
      },
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(247, 245, 239, 0.72)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 2,
            padding: '10px 20px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#173F36',
        light: '#2E6356',
        dark: '#101B18',
      },
      background: {
        default: '#F7F5EF',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#101B18',
        secondary: '#52615C',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 2,
            padding: '10px 20px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box className="App">
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/contact" element={<ContactUs darkMode={darkMode} />} />
          <Route path="/personalized-workout" element={<PersonalizedWorkout />} />
          <Route path="/chat" element={<ChatPage darkMode={darkMode} />} />
          <Route path="/pricing" element={
            <Box sx={{ 
              padding: 4, 
              backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(248, 249, 250, 0.8)',
              minHeight: 'calc(100vh - 200px)'
            }}>
              <Container maxWidth="lg">
                <PageTitle title="Pricing Strategy Concept" />
                <Paper 
                  elevation={3} 
                  sx={{
                    p: 4,
                    mb: 5,
                    borderRadius: 3,
                    maxWidth: '800px',
                    margin: '0 auto',
                    backgroundColor: darkMode ? 'rgba(30,30,30,0.9)' : 'white',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                      This page demonstrates a possible freemium packaging strategy for PulseForm. Pricing and conversion actions are illustrative and are not connected to a live payment account.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                      <Button
                        variant={selectMonthly ? "contained" : "outlined"}
                        onClick={() => setSelectMonthly(true)}
                        sx={{
                          borderRadius: '30px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          backgroundColor: selectMonthly ? '#173F36' : 'transparent',
                          color: selectMonthly ? 'white' : '#173F36',
                          borderColor: '#173F36',
                          '&:hover': {
                            backgroundColor: selectMonthly ? '#101B18' : 'rgba(220, 20, 20, 0.1)',
                            transform: selectMonthly ? 'translateY(-2px)' : 'none',
                            boxShadow: selectMonthly ? '0 4px 12px rgba(220, 20, 20, 0.3)' : 'none'
                          }
                        }}
                      >
                        Monthly
                      </Button>
                      <Button
                        variant={!selectMonthly ? "contained" : "outlined"}
                        onClick={() => setSelectMonthly(false)}
                        sx={{
                          borderRadius: '30px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          backgroundColor: !selectMonthly ? '#173F36' : 'transparent',
                          color: !selectMonthly ? 'white' : '#173F36',
                          borderColor: '#173F36',
                          '&:hover': {
                            backgroundColor: !selectMonthly ? '#101B18' : 'rgba(220, 20, 20, 0.1)',
                            transform: !selectMonthly ? 'translateY(-2px)' : 'none',
                            boxShadow: !selectMonthly ? '0 4px 12px rgba(220, 20, 20, 0.3)' : 'none'
                          }
                        }}
                      >
                        Yearly
                      </Button>
                    </Box>
                  </Box>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PricingCard
                    title="Premium Plan"
                    price={selectMonthly ? "$1" : "$10.99"}
                    monthlyPrice="$1"
                    annualPrice="$10.99"
                    storage="Unlimited access to workout poses and exercise videos (access to 100+ workout exercises)"
                    users="Unlimited access to workout planner"
                    sendUp="Unlimited chats with AI chatbot"
                    isMonthly={selectMonthly}
                    isLoggedIn={isLoggedIn}
                  />
                </Box>
              </Container>
            </Box>
          } />
        </Routes>
        {location.pathname !== '/chat' && (
          <Footer darkMode={darkMode} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
