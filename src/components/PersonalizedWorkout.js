// src/components/PersonalizedWorkout.js
import React, { useState, useEffect } from 'react';
import { 
  TextField, MenuItem, Button, Grid, Box, Typography, CircularProgress, 
  Paper, Fade, Alert 
} from '@mui/material';
import WorkoutPlan from './WorkoutPlan';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../App.css';
import PageTitle from './PageTitle';

const goals = ['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness', 'Flexibility'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const workoutFrequencies = [1, 2, 3, 4, 5, 6, 7];

const PersonalizedWorkout = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    goals: '',
    level: '',
    workoutsPerWeek: ''
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Grab the API key from your .env
  const [apiKey] = useState(process.env.REACT_APP_OPEN_AI_API_KEY);

  useEffect(() => {
    if (apiKey) {
      console.log("API key found in environment variables (PersonalizedWorkout).");
    } else {
      console.log("No API key found in environment variables (PersonalizedWorkout).");
    }
  }, [apiKey]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formIsValid = () => {
    return (
      formData.weight &&
      formData.height &&
      formData.age &&
      formData.gender &&
      formData.goals &&
      formData.level &&
      formData.workoutsPerWeek
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `
        Create a detailed personalized workout plan based on the following information:
        - Weight: ${formData.weight} kg
        - Height: ${formData.height} cm
        - Age: ${formData.age}
        - Gender: ${formData.gender}
        - Fitness Goal: ${formData.goals}
        - Fitness Level: ${formData.level}
        - Workouts Per Week: ${formData.workoutsPerWeek}

        Please create a workout schedule for each day of the week. For each workout day, include 5-8 exercises with:
        - Exercise name
        - Number of sets
        - Number of reps or duration
        - Recommended weights or resistance (if applicable)
        - Rest period between sets

        Format the response as a JSON object with days of the week as keys, 
        and an array of exercise objects as values. For rest days, 
        include an array with a single object indicating it's a rest day.
        Example:
        {
          "Monday": [
            {"exercise": "Squats", "sets": 3, "reps": 12, "weights": "60kg", "rest": "60s"},
            ...
          ],
          "Tuesday": [
            {"exercise": "Rest Day", "sets": "-", "reps": "-", "weights": "-", "rest": "Full Day"}
          ],
          ...
        }
      `;

      console.log("Sending request to OpenAI API for personalized workout...");

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
          messages: [
            {
              role: 'system',
              content: 'You are a professional fitness trainer and nutritionist.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate workout plan');
      }

      console.log("Response received from OpenAI API.");

      const planContent = data.choices[0].message.content;
      let parsedPlan;

      try {
        // Attempt to strip markdown code fences, if present
        const jsonMatch = planContent.match(/```json\s*([\s\S]*?)\s*```/) 
          || planContent.match(/```\s*([\s\S]*?)\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1] : planContent;

        console.log("Attempting to parse JSON response...");
        parsedPlan = JSON.parse(jsonString);
      } catch (parseError) {
        console.error('Error parsing AI response as JSON:', parseError);
        try {
          parsedPlan = JSON.parse(planContent);
        } catch (fallbackError) {
          throw new Error('Unable to parse workout plan response. Please try again.');
        }
      }

      setWorkoutPlan(parsedPlan);
    } catch (err) {
      console.error('Error generating workout plan:', err);
      setError(err.message || 'Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (workoutPlan) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Your Personalized Workout Plan', 14, 22);
      doc.setFontSize(12);

      let yPosition = 40;
      const pageHeight = doc.internal.pageSize.height;

      Object.entries(workoutPlan).forEach(([day, exercises], index) => {
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        doc.text(`${day}:`, 14, yPosition);
        yPosition += 10;

        if (exercises.length > 0) {
          const tableData = exercises.map(ex => [
            ex.exercise, ex.sets, ex.reps, ex.weights, ex.rest
          ]);

          doc.autoTable({
            startY: yPosition,
            head: [['Exercise', 'Sets', 'Reps', 'Weights', 'Rest']],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 8 },
            margin: { top: 45 + index * 10 },
            pageBreak: 'auto',
          });

          yPosition = doc.lastAutoTable.finalY + 15;
        } else {
          doc.text('Rest day', 14, yPosition);
          yPosition += 15;
        }
      });

      doc.save('workout_plan.pdf');
    }
  };

  return (
    <Box sx={{ padding: 3, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <PageTitle title="Personalized Workout Planner" />

      <Paper
        elevation={3}
        sx={{
          maxWidth: 1000,
          margin: '0 auto 40px',
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              variant="outlined"
            >
              {goals.map((goal) => (
                <MenuItem key={goal} value={goal}>
                  {goal}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              variant="outlined"
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Workouts per Week"
              name="workoutsPerWeek"
              value={formData.workoutsPerWeek}
              onChange={handleChange}
              variant="outlined"
            >
              {workoutFrequencies.map((freq) => (
                <MenuItem key={freq} value={freq}>
                  {freq}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#173F36',
                  '&:hover': { backgroundColor: '#101B18' },
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '30px',
                }}
                onClick={handleSubmit}
                disabled={isLoading || !formIsValid()}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Generate Workout Plan'}
              </Button>

              {workoutPlan && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#173F36',
                    color: '#173F36',
                    '&:hover': { borderColor: '#101B18', color: '#101B18' },
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '30px',
                  }}
                  onClick={handleDownload}
                >
                  Download Workout Plan (PDF)
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert
          severity="error"
          sx={{
            maxWidth: 1000,
            margin: '0 auto 20px',
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {isLoading && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          mt={6} 
          mb={6}
        >
          <CircularProgress size={60} sx={{ color: '#173F36' }} />
          <Typography variant="h6" mt={3} fontWeight={500}>
            Crafting your personalized workout plan...
          </Typography>
          <Typography variant="body1" mt={1} color="text.secondary">
            Our AI trainer is analyzing your data to create the perfect plan for your goals.
          </Typography>
        </Box>
      )}

      {workoutPlan && !isLoading && (
        <Fade in={!!workoutPlan}>
          <Box mt={4}>
            <WorkoutPlan plan={workoutPlan} />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default PersonalizedWorkout;
