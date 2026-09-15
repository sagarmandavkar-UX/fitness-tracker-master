import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Activity, Dumbbell, Grid2X2, HeartPulse, PersonStanding } from 'lucide-react';

const iconForBodyPart = (item) => {
  if (item === 'all') return Grid2X2;
  if (item === 'cardio') return HeartPulse;
  if (item === 'waist') return Activity;
  if (item.includes('leg')) return PersonStanding;
  return Dumbbell;
};

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const Icon = iconForBodyPart(item);

  return (
  <Stack
    component="button"
    type="button"
    direction="row"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={{
      border: bodyPart === item ? '1px solid #173F36' : '1px solid rgba(16,27,24,0.12)',
      background: bodyPart === item ? '#173F36' : 'rgba(255,255,255,0.45)',
      color: bodyPart === item ? '#C9FF3D' : '#101B18',
      borderRadius: '2px',
      minWidth: '150px',
      height: '58px',
      px: 2,
      cursor: 'pointer',
      gap: 1.25,
      '&:hover': {
        borderColor: '#173F36',
        transform: 'translateY(-2px)',
      }
    }}
    onClick={() => {
      setBodyPart(item);
      document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }}
  >
    <Box component={Icon} size={19} strokeWidth={1.8} aria-hidden="true" />
    <Typography fontSize="14px" fontWeight={700} color="inherit" textTransform="capitalize">
      {item}
    </Typography>
  </Stack>
  );
};

export default BodyPart;
