import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import BmiCalculator from './BmiCalculator';

const renderCalculator = () => render(
  <ThemeProvider theme={createTheme()}>
    <BmiCalculator />
  </ThemeProvider>
);

test('calculates BMI and shows the healthy weight range', () => {
  renderCalculator();

  fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '180' } });
  fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '75' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate bmi/i }));

  expect(screen.getByText('23.1')).toBeInTheDocument();
  expect(screen.getByText('Healthy weight')).toBeInTheDocument();
  expect(screen.getByText(/59.9–80.7 kg/i)).toBeInTheDocument();
});

test('rejects non-positive measurements and can clear the form', () => {
  renderCalculator();

  fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '0' } });
  fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '75' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate bmi/i }));

  expect(screen.getByRole('alert')).toHaveTextContent(/greater than zero/i);
  fireEvent.click(screen.getByRole('button', { name: /clear/i }));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByLabelText(/height/i)).toHaveValue(null);
});
