import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';

const HorizontalScrollbar = ({ data, setBodyPart, bodyPart, isBodyParts }) => {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box position="relative" width="100%" overflow="hidden">
      <Box
        ref={scrollContainer}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '16px 48px 16px 0',
          gap: '10px',
        }}
      >
        {data.map((item) => (
          <Box key={item.id || item} sx={{ flex: '0 0 auto' }}>
            {isBodyParts ? (
              <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
            ) : (
              <ExerciseCard exercise={item} />
            )}
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll('left')}
        sx={{
          display: 'none',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#173F36',
          width: 38,
          height: 38,
          '&:hover': { backgroundColor: '#101B18' },
        }}
      >
        <ArrowBackIos sx={{ color: '#C9FF3D', fontSize: 15 }} />
      </IconButton>

      <IconButton
        onClick={() => scroll('right')}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#173F36',
          width: 38,
          height: 38,
          '&:hover': { backgroundColor: '#101B18' },
        }}
      >
        <ArrowForwardIos sx={{ color: '#C9FF3D', fontSize: 15 }} />
      </IconButton>
    </Box>
  );
};

export default HorizontalScrollbar;
