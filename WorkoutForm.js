import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const WorkoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    goals: '',
    gender: '',
    level: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="weight"
        label="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="height"
        label="Height (cm)"
        value={formData.height}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="age"
        label="Age"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Goals</InputLabel>
        <Select
          name="goals"
          value={formData.goals}
          onChange={handleChange}
        >
          <MenuItem value="weight loss">Weight Loss</MenuItem>
          <MenuItem value="muscle gain">Muscle Gain</MenuItem>
          <MenuItem value="endurance">Endurance</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Level</InputLabel>
        <Select
          name="level"
          value={formData.level}
          onChange={handleChange}
        >
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Get Workout Plan
      </Button>
    </form>
  );
};

export default WorkoutForm;
