import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from './index';

// Mocking firebase/auth module
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })),
  })),
}));

describe('Registration component', () => {
    test('renders Save Changes button correctly', () => {
      render(<Profile />);
      expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });

    test('renders words on page correctly', () => {
      render(<Profile />);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
  });