import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

jest.mock('../../Firebase', () => ({
  signInWithEmail: jest.fn(),
  signInWithGoogle: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

test('switches to the complete sign-up form instead of hiding the password input', () => {
  const onSwitchToSignUp = jest.fn();
  render(<Login onSwitchToSignUp={onSwitchToSignUp} />);

  expect(document.querySelector('input[name="password"]')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /don't have an account/i }));

  expect(onSwitchToSignUp).toHaveBeenCalledTimes(1);
});
