import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '../src/components/auth/LoginForm'

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

describe('LoginForm Component', () => {
  it('renders login form elements', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const mockSignIn = jest.fn()
    
    // Mock the useAuth hook for this test
    jest.doMock('../src/hooks/useAuth', () => ({
      useAuth: () => ({
        signIn: mockSignIn,
        loading: false,
        error: null,
      }),
    }))

    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
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

    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /signing in/i })
    expect(submitButton).toBeDisabled()
  })

  it('displays error message when login fails', () => {
    const errorMessage = 'Invalid credentials'
    
    // Mock error state
    jest.doMock('../src/hooks/useAuth', () => ({
      useAuth: () => ({
        signIn: jest.fn(),
        loading: false,
        error: errorMessage,
      }),
    }))

    render(<LoginForm />)
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
