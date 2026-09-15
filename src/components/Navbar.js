import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Stack, AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { scroller } from 'react-scroll';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../assets/images/Logo-v2.png';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { auth } from '../Firebase';
import '../assets/css/Navbar.css'

const Navbar = ({ darkMode, setDarkMode, onManageSubscription }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShowModal(false); // Hide the modal when the user logs in
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate('/');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const handleExercisesClick = () => {
    navigate('/');
    setTimeout(() => {
      scroller.scrollTo('exercises', {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }, 100);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLoginClick = () => {
    setShowSignUpForm(false);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowModal(true);
  };

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Chat', link: '/chat' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
    { text: 'Pricing', link: '/pricing' },
    { text: 'Contact Us', link: '/contact' },
  ];

  const menuItemStyle = (isDrawer, path, text) => ({
    textDecoration: 'none',
    cursor: 'pointer',
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontWeight: isActive(path) && text !== 'Exercises' ? 700 : 500,
    fontSize: '14px',
    backgroundColor: 'transparent',
    color: isDrawer ? '#101B18' : isActive(path) ? '#C9FF3D' : '#F7F5EF',
    borderRadius: '2px',
    padding: '10px 6px',
    margin: '0 8px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  });

  const renderMenuItems = (isDrawer) =>
    menuItems.map((item) => (
      <ListItem
        button={isDrawer}
        key={item.text}
        onClick={isDrawer ? null : null}
        sx={{ padding: isDrawer ? '8px 16px' : 'unset' }}
      >
        {item.text === 'Exercises' && !isDrawer ? (
          <div
            onClick={user ? handleExercisesClick : handleSignUpClick}
            style={menuItemStyle(isDrawer, item.link, item.text)}
            className="nav-link"
          >
            {item.text}
          </div>
        ) : (
          <RouterLink
            to={user ? item.link : '#'}
            style={menuItemStyle(isDrawer, item.link, item.text)}
            onClick={user ? null : handleSignUpClick}
            className="nav-link"
          >
            {item.text}
          </RouterLink>
        )}
      </ListItem>
    ));
    
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(16, 27, 24, 0.96)',
          backdropFilter: 'blur(14px)',
          color: '#F7F5EF',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(201, 255, 61, 0.16)',
          borderRadius: 0,
          padding: '0',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: { xs: '68px', md: '76px' }, px: { xs: 2, md: 5, lg: 7 } }}>
          <RouterLink to="/" className="brand-lockup" aria-label="Fitness Freak home">
            <img src={Logo} alt="" className="brand-mark" />
            <Typography component="span" className="brand-name">
              Fitness<br /><strong>Freak</strong>
            </Typography>
          </RouterLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {renderMenuItems(false)}
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode(!darkMode)}
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: '#C9FF3D', mr: 1, border: '1px solid rgba(201,255,61,0.25)', width: 38, height: 38 }}
            >
              {darkMode ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
            </IconButton>
            {!user ? (
              <>
                <Button
                  onClick={handleLoginClick}
                  variant="text"
                  sx={{ 
                    display: { xs: 'none', sm: 'inline-flex' },
                    color: '#F7F5EF', 
                    borderRadius: '2px', 
                    marginRight: '10px', 
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignUpClick}
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#C9FF3D', 
                    color: '#101B18', 
                    borderRadius: '2px', 
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px',
                    fontWeight: 800,
                    clipPath: 'polygon(0 0, 88% 0, 100% 30%, 100% 100%, 12% 100%, 0 70%)',
                    '&:hover': {
                      backgroundColor: '#DDFF85',
                    }
                  }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    padding: '8px 16px',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#fff',
                    marginRight: '10px',
                  }}
                >
                  Welcome, {getFirstName(user.displayName || user.email)}
                </Box>
                <Button
                  onClick={onManageSubscription}
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#101B18', 
                    borderRadius: '20px', 
                    fontFamily: 'Roboto, sans-serif',
                    marginRight: '10px',
                    '&:hover': {
                      backgroundColor: '#173F36',
                    }
                  }}
                >
                  Manage Subscription
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{ 
                    color: '#fff', 
                    borderColor: '#fff', 
                    borderRadius: '20px', 
                    fontFamily: 'Roboto, sans-serif',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer}
              sx={{ display: { xs: 'flex', md: 'none' }, justifySelf: 'flex-end', color: '#F7F5EF' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#F7F5EF',
            height: '100%',
          }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {renderMenuItems(true)}
            <ListItem>
              <Button
                fullWidth
                startIcon={darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                onClick={() => setDarkMode(!darkMode)}
                sx={{ mt: 1, justifyContent: 'flex-start', color: '#173F36' }}
              >
                {darkMode ? 'Light mode' : 'Dark mode'}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000,
          paddingTop: '0px',
        }}>
          <div style={{
            backgroundColor: '#F7F5EF',
            padding: '12px',
            borderRadius: '4px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: 'calc(100% - 120px)',
            overflowY: 'auto',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.34)',
            position: 'relative',
            marginTop: '60px',
          }}>
            <span style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#aaa',
              cursor: 'pointer',
            }} onClick={() => setShowModal(false)}>
              &times;
            </span>
            {showSignUpForm 
              ? <SignUp onSwitchToLogin={() => setShowSignUpForm(false)} /> 
              : <Login onSwitchToSignUp={() => setShowSignUpForm(true)} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
