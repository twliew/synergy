import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
    it('calls onLogin prop function when form is submitted with valid data', async () => {
        const mockOnLogin = jest.fn();
        render(<Login onLogin={mockOnLogin} />);
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testpassword' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));
        await screen.findByText('Login');
        expect(mockOnLogin).toHaveBeenCalledTimes(1);
    });
});
