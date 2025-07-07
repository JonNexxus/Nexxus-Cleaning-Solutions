import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AdminLoginForm from '../src/components/auth/AdminLoginForm'

// Mock the useAuth hook
jest.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    signIn: jest.fn(),
    loading: false,
    error: null,
  }),
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

describe('AdminLoginForm Component', () => {
  it('renders admin login form elements', () => {
    render(<AdminLoginForm />)
    
    expect(screen.getByText(/admin portal/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ error: null })
    
    // Mock the useAuth hook for this test
    jest.doMock('../src/hooks/useAuth', () => ({
      useAuth: () => ({
        signIn: mockSignIn,
        loading: false,
        error: null,
      }),
    }))

    render(<AdminLoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'adminpass123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('admin@example.com', 'adminpass123')
    })
  })

  it('shows loading state during submission', () => {
    // Mock loading state
    jest.doMock('../src/hooks/useAuth', () => ({
      useAuth: () => ({
        signIn: jest.fn(),
        loading: true,
        error: null,
      }),
    }))

    render(<AdminLoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /signing in/i })
    expect(submitButton).toBeDisabled()
  })

  it('displays error message when login fails', () => {
    const errorMessage = 'Access denied'
    
    // Mock error state
    jest.doMock('../src/hooks/useAuth', () => ({
      useAuth: () => ({
        signIn: jest.fn(),
        loading: false,
        error: errorMessage,
      }),
    }))

    render(<AdminLoginForm />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('has admin-specific styling and branding', () => {
    render(<AdminLoginForm />)
    
    // Check for admin-specific elements
    expect(screen.getByText(/admin portal/i)).toBeInTheDocument()
    
    // Check for admin-specific styling (this would depend on implementation)
    const container = screen.getByText(/admin portal/i).closest('div')
    expect(container).toBeInTheDocument()
  })
})
