import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Alert, Box, Stack, Typography } from '@mui/material/';

import { exerciseOptions, fetchData } from '../utils/fetchData';

import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {

  const[currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const exercisesPerPage= 9;

  const indexOfLastEx= currentPage*exercisesPerPage;
  const indexOfFirstEx= indexOfLastEx-exercisesPerPage;
  const currentEx= exercises.slice(indexOfFirstEx, indexOfLastEx);


  const paginate = (e, value ) => {
    setCurrentPage(value);

    window.scrollTo({top:1800, behavior: 'smooth'})

  }

  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart, exercises]);

  useEffect(() =>{
    const fetchExerciseData = async () => {
      try {
        setError('');
        let exercisesData = [];

        if(bodyPart === 'all') {
          exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        }
        else{
          exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        }

        setExercises(exercisesData);
      } catch {
        setExercises([]);
        setError('Exercises are temporarily unavailable. Please try again later.');
      }
    }
  fetchExerciseData();
  }
     , [bodyPart, setExercises]);

  return (
    <Box id="exercises"
      component="section"
      className="exercise-results"
    >

      <Typography variant="h3" className="results-heading">
        Showing Results
      </Typography>
      {error && <Alert severity="warning" sx={{ mb: 4 }}>{error}</Alert>}
      <Stack direction="row" sx={{ gap: { xs: 2.5, md: 3 } }}
        flexWrap="wrap" justifyContent="center">
        {currentEx.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}

      </Stack>
      <Stack mt={{ xs: 6, md: 8 }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
          color="standard"
          shape="rounded"
          defaultPage={1}
          count={Math.ceil(exercises.length / exercisesPerPage)}
          page={currentPage}
          onChange={paginate}
          //materialUI for info on this
          />
        )}

      </Stack>
    </Box>
  )
}

export default Exercises
