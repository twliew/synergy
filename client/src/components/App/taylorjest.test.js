import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';
import Profile from '../Profile';
import HomePage from '../HomePage';

// Mocking firebase/auth module
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })),
  })),
}));

describe('Registration component', () => {
    //sprint 1
    test('renders Register button correctly', () => {
      render(<Register />);
      expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    //sprint 1
    test('renders Social Media on page correctly', () => {
      render(<Profile />);
      expect(screen.getByText('Social Media')).toBeInTheDocument();
    });

  //   //sprint 2 commented this test out as we are changing the registration fields
  //   test('availability dropdown render and functionality in register component', async () => {
  //     render(<Register />);

  //     const availDropdown = screen.getByRole('combobox', { name: 'Availability' });
  //     fireEvent.mouseDown(availDropdown);

  //     await screen.findByRole('option', { name: 'Available' });

  //     const optionAvailable = screen.getByRole('option', { name: 'Available' });
  //     fireEvent.click(optionAvailable);

  //     expect(optionAvailable).toHaveAttribute('aria-selected', 'true');
  //   });
  });

describe('Profile component', () => {
  //sprint 1
    test('renders cancel button when edit interests button is clicked', async () => {
      render(<Profile />);
      const editInterestsButton = screen.getByRole('button', { name: 'Edit Interests' });
      fireEvent.click(editInterestsButton);
      await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      });
    });

    //sprint 1
    test('renders Save Interests button when edit interests button is clicked', async () => {
      render(<Profile />);
      const editInterestsButton = screen.getByRole('button', { name: 'Edit Interests' });
      fireEvent.click(editInterestsButton);
      await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Save Interests' })).toBeInTheDocument();
      });
    });

    //sprint 2
    test('availability dropdown list render and functionality', async () => {
      render(<Profile />);

      const availDropdown = screen.getByRole('combobox', { name: 'Availability' });
      fireEvent.mouseDown(availDropdown);

      //wait for options to load
      await screen.findByRole('option', { name: 'Available' });

      const optionAvailable = screen.getByRole('option', { name: 'Available' });
      fireEvent.click(optionAvailable);

      expect(optionAvailable).toHaveAttribute('aria-selected', 'true');
    });
    
    //sprint 2
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ express: JSON.stringify({ likeCount: 10 }) }),
    ok: true,
  })
);

//Sprint 3
describe('HomePage component', () => {
  test('renders welcome message correctly', () => {
      render(<HomePage />);
      expect(screen.getByText('Welcome to Synergy!')).toBeInTheDocument();
  });

  test('renders summary correctly', () => {
      render(<HomePage />);
      expect(screen.getByText(/Synergy aims to provide a platform where university students/)).toBeInTheDocument();
  });

  test('renders "What does it do?" button initially', () => {
      render(<HomePage />);
      expect(screen.getByRole('button', { name: 'What does it do?' })).toBeInTheDocument();
  });
  test('renders detailed information when "What does it do?" button is clicked', async () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'What does it do?' }));
    await act(async () => {
      expect(screen.getByText('Overhead Bar')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('People')).toBeInTheDocument();
      expect(screen.getByText('Matches')).toBeInTheDocument();
    });
  });

  test('hides detailed information when "Show Less" button is clicked', async () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'What does it do?' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show Less' }));
    await act(async () => {
      expect(screen.queryByText('Overhead Bar')).toBeNull();
      expect(screen.queryByText('Logout')).toBeNull();
      expect(screen.queryByText('Profile')).toBeNull();
      expect(screen.queryByText('People')).toBeNull();
      expect(screen.queryByText('Matches')).toBeNull();
    });
  });
});
  