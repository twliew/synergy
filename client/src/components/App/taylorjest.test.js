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

    test('availability dropdown render and functionality in register component', async () => {
      render(<Register />);

      const availDropdown = screen.getByRole('combobox', { name: 'Availability' });
      fireEvent.mouseDown(availDropdown);

      await screen.findByRole('option', { name: 'Available' });

      const optionAvailable = screen.getByRole('option', { name: 'Available' });
      fireEvent.click(optionAvailable);

      expect(optionAvailable).toHaveAttribute('aria-selected', 'true');
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

    test('availability dropdown list render and functionality', async () => {
      render(<Profile />);

      const availDropdown = screen.getByRole('combobox', { name: 'Availability' });
      fireEvent.mouseDown(availDropdown);

      //wait for options to laod
      await screen.findByRole('option', { name: 'Available' });

      const optionAvailable = screen.getByRole('option', { name: 'Available' });
      fireEvent.click(optionAvailable);

      expect(optionAvailable).toHaveAttribute('aria-selected', 'true');
    });

    test('mood dropdown list render and functionality', async () => {
      render(<Profile />);

      const moodDropdown = screen.getByRole('combobox', { name: 'Current Mood' });
      fireEvent.mouseDown(moodDropdown);

      //wait for options to load
      await screen.findByRole('option', { name: 'Lonely' });

      const optionMood = screen.getByRole('option', { name: 'Lonely' });
      fireEvent.click(optionMood);

      expect(optionMood).toHaveAttribute('aria-selected', 'true');
    });
});
  
