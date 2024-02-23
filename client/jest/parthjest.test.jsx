import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../profile/index';
import '@testing-library/jest-dom/extend-expect';

test('renders profile', () => {
  render(<Profile />);
  expect(screen.getByText('Profile')).toBeInTheDocument();
}
);