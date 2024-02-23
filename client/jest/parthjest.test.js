import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SocialMedia from '../src/components/Profile/SocialMedia';

jest.mock('react-router-dom', () => ({
  // Mock any necessary components from react-router-dom if used
}));

jest.mock('localStorage', () => ({
  getItem: jest.fn().mockReturnValue('test-username'), // Mock username retrieval
  setItem: jest.fn()
}));

jest.mock('./api/profile', () => ({
  // Mock API calls for fetching, adding, editing, and deleting social media
}));

test('renders the initial social media list', async () => {
  render(<SocialMedia />);

  const socialMediaHeading = await screen.findByText('Social Media');
  expect(socialMediaHeading).toBeInTheDocument();

  // Add more assertions to verify initial rendering, such as empty list if no data
});

test('fetches social media from the API when username is available', async () => {
  render(<SocialMedia />);

  // Simulate username retrieval from localStorage
  await Promise.resolve(); // Wait for component to fetch data

  const mockFetchSocialMedia = jest.fn();
  fetchSocialMedia.mockImplementation(mockFetchSocialMedia);

  expect(mockFetchSocialMedia).toHaveBeenCalledTimes(1);
  expect(mockFetchSocialMedia).toHaveBeenCalledWith(`/api/profile/test-username/social-media`);
});

