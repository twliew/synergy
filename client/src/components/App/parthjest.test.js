import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import Profile from '../Profile';

describe('Login component', () => {
    test('renders login button correctly', () => {
        render(<Login />);
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
