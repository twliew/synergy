import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from './index';

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
