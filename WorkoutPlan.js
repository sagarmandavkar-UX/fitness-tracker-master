import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const WorkoutPlan = ({ plan }) => {
  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto' }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          fontWeight: 700, 
          color: '#173F36',
          mb: 4,
          textAlign: 'center' 
        }}
      >
        Your Personalized Workout Plan
      </Typography>
      
      {Object.keys(plan).map((day) => (
        <TableContainer 
          component={Paper} 
          key={day} 
          sx={{ 
            mb: 4, 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Box 
            sx={{ 
              bgcolor: '#173F36', 
              color: 'white', 
              p: 2,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
              }}
            >
              {day}
            </Typography>
          </Box>
          
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Exercise</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Sets</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reps</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Weights</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Rest Between Sets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plan[day].length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">Rest Day</TableCell>
                </TableRow>
              ) : (
                plan[day].map((exercise, index) => (
                  <TableRow 
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: 'rgba(0,0,0,0.02)' },
                      '&:hover': { bgcolor: 'rgba(220,20,20,0.05)' },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{exercise.exercise}</TableCell>
                    <TableCell>{exercise.sets}</TableCell>
                    <TableCell>{exercise.reps}</TableCell>
                    <TableCell>{exercise.weights}</TableCell>
                    <TableCell>{exercise.rest}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Box>
  );
};

export default WorkoutPlan;
