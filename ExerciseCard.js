import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const ExerciseCard = ({ exercise }) => (
  <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
    <Box className="exercise-card-body">
    <Stack direction="row" spacing={1}>
      <Box component="span" className="exercise-tag">
        {exercise.bodyPart}
      </Box>
      <Box component="span" className="exercise-tag">
        {exercise.target}
      </Box>
    </Stack>
    <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} mt={1.5}>
      <Typography color="#101B18" fontWeight={800} sx={{ fontSize: { lg: '19px', xs: '18px' }, lineHeight: 1.2 }} textTransform="capitalize">
        {exercise.name}
      </Typography>
      <ArrowForwardRoundedIcon className="exercise-arrow" />
    </Stack>
    </Box>
  </Link>
);

export default ExerciseCard;
