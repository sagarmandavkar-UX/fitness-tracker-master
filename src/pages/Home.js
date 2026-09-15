import React, { useState } from 'react';
import { Box } from '@mui/material';
import Exercises from '../components/Exercises';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import BmiCalculator from '../components/BmiCalculator'; // Adjust the import path as necessary

const Home = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);

  return (
    <Box> 
      <HeroBanner />
      <SearchExercises 
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
      <BmiCalculator /> {/* Move the BMI Calculator here */}
    </Box>
  )
}

export default Home;
