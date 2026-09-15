import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { exerciseOptions, fetchData } from '../utils/fetchData';

import HorizontalScrollbar from './HorizontalScrollbar';
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {

  const [search, setSearch] = useState('')

  const [bodyParts, setBodyParts] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        setBodyParts(['all', ...bodyPartsData]);
      } catch {
        setBodyParts(['all']);
        setError('Exercise filters are temporarily unavailable. You can still use the BMI calculator below.');
      }
    }

    fetchExercisesData();
  }, [])
  const handleSearch = async () => {
    if (search) {
      try {
        setError('');
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

        const searchedExercises = exercisesData.filter((exercise) =>
          exercise.name.toLowerCase().includes(search)
          || exercise.target.toLowerCase().includes(search)
          || exercise.equipment.toLowerCase().includes(search)
          || exercise.bodyPart.toLowerCase().includes(search));
        setSearch('');
        setExercises(searchedExercises);
      } catch {
        setError('Exercise search is temporarily unavailable. Please try again later.');
      }

    }
  }
  return (
    <Stack
      component="section"
      className="exercise-discovery"
      alignItems="stretch"
      justifyContent="center"
    >
      <Box className="section-heading-row">
        <Typography component="h2" className="editorial-heading">
          Must-Try Exercises for Everyone
        </Typography>
        <Typography className="section-intro">
          Find exercises that fit your goals, your body, and your lifestyle.
        </Typography>
      </Box>
      <Box component="form" onSubmit={(event) => { event.preventDefault(); handleSearch(); }} className="exercise-search-form">
        <TextField
          sx={{
            input: {
              fontWeight: 500,
              border: 'none',
              fontSize: '15px',
            },
            flex: 1,
            backgroundColor: '#fff',
            '& .MuiOutlinedInput-root': {
              borderRadius: '2px',
              height: '58px',
              '& fieldset': { borderColor: 'rgba(16,27,24,0.2)' },
              '&:hover fieldset': { borderColor: '#173F36' },
              '&.Mui-focused fieldset': { borderColor: '#173F36', borderWidth: '2px' },
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search exercises (e.g. push up, yoga, squat...)"
          type="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchRoundedIcon sx={{ color: '#173F36' }} /></InputAdornment>
            ),
          }}
        />
        <Button className="search-btn" type="submit"
          sx={{
            bgcolor: '#173F36',
            color: '#F7F5EF',
            textTransform: 'none',
            width: { xs: '100%', sm: '150px' },
            fontSize: '15px',
            fontWeight: 800,
            height: '58px',
            clipPath: 'polygon(0 0, 90% 0, 100% 28%, 100% 100%, 10% 100%, 0 72%)',
            '&:hover': { bgcolor: '#101B18', color: '#C9FF3D' },
          }}
        >
          Search
        </Button>
      </Box>
      {error && <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <HorizontalScrollbar data={bodyParts}
          bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
      </Box>
    </Stack>

  )
}

export default SearchExercises
