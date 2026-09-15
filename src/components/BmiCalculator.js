import React, { useState } from 'react';
import './BmiCalculator.css';
import { Box, Typography } from '@mui/material';
import BmiImage from '../assets/images/bmi-editorial-v2.png';

function BmiCalculator() {
    const [heightValue, setHeightValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculateBmi = (event) => {
        event.preventDefault();
        const height = Number(heightValue);
        const weight = Number(weightValue);

        if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
            setResult(null);
            setError('Enter a height and weight greater than zero.');
            return;
        }

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        let message = 'Obese';

        if (bmi < 18.5) {
            message = 'Underweight';
        } else if (bmi < 25) {
            message = 'Healthy weight';
        } else if (bmi < 30) {
            message = 'Overweight';
        }

        setError('');
        setResult({
            bmi: bmi.toFixed(1),
            message,
            healthyMinimum: (18.5 * heightInMeters * heightInMeters).toFixed(1),
            healthyMaximum: (24.9 * heightInMeters * heightInMeters).toFixed(1),
        });
    };

    const clearCalculator = () => {
        setHeightValue('');
        setWeightValue('');
        setResult(null);
        setError('');
    };

    return (
        <Box component="section" className="bmi-container">
            <Box className="bmi-story">
                <img src={BmiImage} alt="Athlete reflecting after a workout" />
                <Box className="bmi-story-copy">
                    <Typography component="h2" className="bmi-story-title">
                        Know your numbers,<br /><span>a healthier you</span><br />starts here
                    </Typography>
                    <Typography variant="body1">
                        Calculate your BMI and get a clearer starting point for your fitness journey.
                    </Typography>
                </Box>
            </Box>
            <Box component="form" className="bmi-calculator" onSubmit={calculateBmi} noValidate>
                <Typography variant="h2" component="h2">BMI Calculator</Typography>
                <Typography className="bmi-description">
                    Enter your details to calculate your Body Mass Index (BMI).
                </Typography>
                <Box className="bmi-form-grid">
                <Box className="bmi-fields">
                <div className="input-container">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        min="1"
                        inputMode="decimal"
                        value={weightValue}
                        onChange={(e) => setWeightValue(e.target.value)}
                        placeholder="70"
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="height">Height (cm)</label>
                    <input
                        type="number"
                        id="height"
                        min="1"
                        inputMode="decimal"
                        value={heightValue}
                        onChange={(e) => setHeightValue(e.target.value)}
                        placeholder="175"
                    />
                </div>
                <div className="bmi-actions">
                    <button type="submit" className="calculate-btn">Calculate BMI</button>
                    {(result || error) && (
                        <button type="button" className="clear-btn" onClick={clearCalculator}>Clear</button>
                    )}
                </div>
                {error && <p className="bmi-error" role="alert">{error}</p>}
                </Box>
                {result && (
                    <div className="result" aria-live="polite">
                        <p className="result-label">Your BMI</p>
                        <Box className="result-score-row">
                            <span className="bmi-value">{result.bmi}</span>
                            <span className="bmi-message">{result.message}</span>
                        </Box>
                        <p className="healthy-range">
                            A healthy weight range for your height is <strong>{result.healthyMinimum}–{result.healthyMaximum} kg</strong>.
                        </p>
                    </div>
                )}
                {!result && !error && (
                    <div className="result result-empty" aria-hidden="true">
                        <p className="result-label">Your BMI</p>
                        <span className="bmi-value">—</span>
                        <p className="healthy-range">Your result and healthy range will appear here.</p>
                    </div>
                )}
                </Box>
            </Box>
        </Box>
    );
}

export default BmiCalculator;
