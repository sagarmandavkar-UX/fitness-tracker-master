import React, { useState } from 'react';
import { Alert, Box, Button, Container, Divider, Fade, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '../assets/images/Logo-v2.png';

const footerLinks = [
  ['Home', '/'],
  ['Chat', '/chat'],
  ['Personalized Workout', '/personalized-workout'],
  ['Pricing', '/pricing'],
  ['Contact Us', '/contact'],
];

const programs = ['Strength Training', 'Weight Loss', 'Mobility & Flexibility', 'General Fitness'];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    window.setTimeout(() => setSubscribed(false), 5000);
  };

  const headingStyle = {
    mb: 2.5,
    color: '#F7F5EF',
    fontSize: '14px',
    fontWeight: 800,
    letterSpacing: '0.03em',
  };

  return (
    <Box component="footer" sx={{ mt: 0, bgcolor: '#101B18', color: '#F7F5EF', pt: { xs: 7, md: 9 }, pb: 3, borderTop: '1px solid rgba(201,255,61,0.22)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 7 }}>
          <Grid item xs={12} md={4}>
            <Box className="brand-lockup" sx={{ mb: 2.5 }}>
              <img src={Logo} alt="" className="brand-mark" />
              <Typography component="span" className="brand-name">Fitness<br /><strong>Freak</strong></Typography>
            </Box>
            <Typography sx={{ maxWidth: 330, color: 'rgba(247,245,239,0.64)', fontSize: '14px', lineHeight: 1.7 }}>
              Real guidance. Lasting progress. Discover exercises, create personalized workouts, and build a healthier, stronger you.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mt: 2.5 }}>
              {[
                ['linkedin', 'https://www.linkedin.com/in/vatsal-shah0914/', <LinkedInIcon />],
                ['instagram', 'https://www.instagram.com/fitness_freak_/?hl=en', <InstagramIcon />],
                ['youtube', 'https://www.youtube.com/@fitnessfreak3075', <YouTubeIcon />],
              ].map(([label, href, icon]) => (
                <IconButton key={label} aria-label={label} component="a" href={href} target="_blank" rel="noopener noreferrer" sx={{ color: '#C9FF3D', '&:hover': { color: '#F7F5EF', bgcolor: 'rgba(255,255,255,0.06)' } }}>
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={headingStyle}>Quick Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.35 }}>
              {footerLinks.map(([label, to]) => (
                <RouterLink key={label} to={to} className="footer-link" style={{ color: 'rgba(247,245,239,0.62)', textDecoration: 'none', fontSize: '13px' }}>
                  {label}
                </RouterLink>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography sx={headingStyle}>Our Programs</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.35 }}>
              {programs.map((program) => (
                <Typography key={program} sx={{ color: 'rgba(247,245,239,0.62)', fontSize: '13px' }}>{program}</Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography sx={headingStyle}>Join Our Newsletter</Typography>
            <Typography sx={{ color: 'rgba(247,245,239,0.62)', fontSize: '13px', lineHeight: 1.6, mb: 2.5 }}>
              Get fitness tips, workout ideas, and wellness insights delivered to your inbox.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1 }}>
              <TextField
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                type="email"
                required
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '2px', color: '#F7F5EF', height: 46, '& fieldset': { borderColor: 'rgba(247,245,239,0.44)' }, '&:hover fieldset': { borderColor: '#C9FF3D' } },
                  '& input::placeholder': { color: 'rgba(247,245,239,0.54)', opacity: 1 },
                }}
              />
              <Button type="submit" sx={{ minWidth: 116, bgcolor: '#C9FF3D', color: '#101B18', fontWeight: 800, clipPath: 'polygon(0 0, 88% 0, 100% 28%, 100% 100%, 12% 100%, 0 72%)', '&:hover': { bgcolor: '#DDFF85' } }}>
                Subscribe
              </Button>
            </Box>
            {subscribed && <Fade in><Alert severity="success" sx={{ mt: 2 }}>Thanks for subscribing!</Alert></Fade>}
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(201,255,61,0.2)' }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
          <Typography sx={{ color: 'rgba(247,245,239,0.5)', fontSize: '12px' }}>©{currentYear} Fitness Freak. All rights reserved.</Typography>
          <Typography sx={{ color: 'rgba(247,245,239,0.5)', fontSize: '12px', letterSpacing: '0.04em' }}>Stronger people. Brighter tomorrows.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
