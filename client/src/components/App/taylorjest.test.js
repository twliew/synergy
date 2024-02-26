import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';
import Profile from '../Profile';

describe('Registration component', () => {
    test('renders Register button correctly', () => {
      render(<Register />);
      expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('renders Social Media on page correctly', () => {
      render(<Profile />);
      expect(screen.getByText('Social Media')).toBeInTheDocument();
    });
  });

describe('Profile component', () => {
    test('renders cancel button when edit interests button is clicked', async () => {
      render(<Profile />);
      const editInterestsButton = screen.getByRole('button', { name: 'Edit Interests' });
      fireEvent.click(editInterestsButton);
      await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      });
    });
    
    test('renders Save Interests button when edit interests button is clicked', async () => {
      render(<Profile />);
      const editInterestsButton = screen.getByRole('button', { name: 'Edit Interests' });
      fireEvent.click(editInterestsButton);
      await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Save Interests' })).toBeInTheDocument();
      });
    });
});
  
