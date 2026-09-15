import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HeroBannerImage from '../assets/images/hero-performance-v2.png';

const HeroBanner = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '680px', md: '760px' },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#101B18',
        backgroundImage: `url(${HeroBannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: { xs: '68% center', md: 'center' },
        px: { xs: 3, sm: 6, md: 8, lg: 10 },
        pt: { xs: 10, md: 6 },
        overflow: 'hidden',
        color: '#F7F5EF',
        clipPath: { md: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 3% 100%, 0 96%)' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: { xs: '520px', md: '640px' },
          mt: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3.4rem', sm: '4.7rem', md: '6rem' },
            fontFamily: 'Impact, "Arial Narrow", "Helvetica Neue Condensed", sans-serif',
            fontWeight: 900,
            lineHeight: 0.91,
            letterSpacing: '-0.045em',
            textTransform: 'uppercase',
            mb: 3,
            color: '#F7F5EF',
            textShadow: '0 3px 28px rgba(0, 0, 0, 0.32)',
          }}
        >
          Push, Persevere,<br />And <Box component="span" sx={{ color: '#C9FF3D' }}>Achieve</Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(247,245,239,0.78)',
            mb: 4,
            maxWidth: '420px',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.65,
          }}
        >
          Discover the most effective exercises tailored just for you
        </Typography>
        <Button
          variant="contained"
          href="#exercises"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            backgroundColor: '#C9FF3D',
            color: '#101B18',
            px: 3.5,
            py: 1.5,
            fontSize: '0.95rem',
            fontWeight: 800,
            clipPath: 'polygon(0 0, 92% 0, 100% 28%, 100% 100%, 8% 100%, 0 72%)',
            '&:hover': {
              backgroundColor: '#DDFF85',
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 28px rgba(201, 255, 61, 0.18)',
            },
            transition: 'all 0.22s ease',
          }}
        >
          Explore Exercises
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 7 }}>
          <Box sx={{ width: 46, height: 2, background: '#C9FF3D' }} />
          <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(247,245,239,0.7)' }}>
            Stronger people. Brighter tomorrows.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
