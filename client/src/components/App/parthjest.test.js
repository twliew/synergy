import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import Profile from '../Profile';
import Search from '../People/Search';
import Matches from '../Matches';

// Mocking firebase/auth module
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: {} })),
    })),
}));

describe('Login component', () => {
    test('renders login button correctly', () => {
        render(
            <Router> {/* Wrap your component with Router */}
                <Login />
            </Router>
        );
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });
});

describe('Profile component', () => {
    test('renders Interests and Hobbies on page correctly', () => {
        render(<Profile />);
        expect(screen.getByText('Interests/Hobbies')).toBeInTheDocument();
    });

    test('renders add social media button correctly', () => {
        render(<Profile />);
        expect(screen.getByRole('button', { name: 'Add Social Media' })).toBeInTheDocument();
    });

    test('renders cancel button when add social media button is clicked', async () => {
        render(<Profile />);
        const addSocialMediaButton = screen.getByRole('button', { name: 'Add Social Media' });
        fireEvent.click(addSocialMediaButton);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
        });
    });

    test('renders add hobby button when edit interests button is clicked', async () => {
        render(<Profile />);
        const editInterestsButton = screen.getByRole('button', { name: 'Edit Interests' });
        fireEvent.click(editInterestsButton);
        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Add Hobby' })).toBeInTheDocument();
        });
    });
});

describe('Search component', () => {
    test('renders search button', () => {
        // Mock props
        const allHobbies = [
            { id: 1, hobby_name: 'Reading' },
            { id: 2, hobby_name: 'Gaming' },
            { id: 3, hobby_name: 'Cooking' },
        ];
        const onSearchMock = jest.fn();
        const onUndoSearchMock = jest.fn();
        render(
            <Search
                allHobbies={allHobbies}
                onSearch={onSearchMock}
                onUndoSearch={onUndoSearchMock}
            />
        );
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    test('renders undo search button', () => {
        // Mock props
        const allHobbies = [
            { id: 1, hobby_name: 'Reading' },
            { id: 2, hobby_name: 'Gaming' },
            { id: 3, hobby_name: 'Cooking' },
        ];
        const onSearchMock = jest.fn();
        const onUndoSearchMock = jest.fn();
        render(
            <Search
                allHobbies={allHobbies}
                onSearch={onSearchMock}
                onUndoSearch={onUndoSearchMock}
            />
        );
        expect(screen.getByRole('button', { name: 'Undo Search/Refresh' })).toBeInTheDocument();
    });

    test('renders Select Hobbies text', () => {
        const allHobbies = [
            { id: 1, hobby_name: 'Reading' },
            { id: 2, hobby_name: 'Gaming' },
            { id: 3, hobby_name: 'Cooking' },
        ];
        const onSearchMock = jest.fn();
        const onUndoSearchMock = jest.fn();
        render(
            <Search
                allHobbies={allHobbies}
                onSearch={onSearchMock}
                onUndoSearch={onUndoSearchMock}
            />
        );
        expect(screen.getByText('Select Hobbies:')).toBeInTheDocument();
    });
});

//Sprint 3
const mockedUserProfiles = [
  {
    id: 1,
    username: 'testUser1',
    email: 'testuser1@example.com',
    age: 25,
    bio: 'Lorem ipsum dolor sit amet',
    hobbies: 'Reading, Cooking',
    social_media: 'Twitter, Instagram'
  },
  {
    id: 2,
    username: 'testUser2',
    email: 'testuser2@example.com',
    age: 30,
    bio: 'Consectetur adipiscing elit',
    hobbies: 'Gaming, Photography',
    social_media: 'Facebook, LinkedIn'
  }
];

describe('Matches component', () => {
  beforeEach(() => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockedUserProfiles),
    });
  });

  test('renders user cards correctly', async () => {
    render(<Matches />);
    
    // Wait for the component to finish rendering with the mock data
    await waitFor(() => {
      expect(screen.getByText('Username: testUser1')).toBeInTheDocument();
      expect(screen.getByText('Username: testUser2')).toBeInTheDocument();
    });
  });

  test('renders "Remove Like" button correctly within user card', async () => {
    render(<Matches />);
    
    // Wait for the component to finish rendering with the mock data
    await waitFor(() => {
      // Check if the "Remove Like" button is present within the user card
      const userCard = screen.getByText('Username: testUser1').closest('.user-card');
      expect(userCard).toBeInTheDocument(); // Assert user card is present
      expect(userCard).toHaveTextContent('Remove Like'); // Assert "Remove Like" button is present within the user card
    });
  });
});
