# Testing Guide for ProjectX

This document provides comprehensive information about testing in the ProjectX monorepo.

## Overview

ProjectX uses Jest as the primary testing framework with React Testing Library for component testing. The testing setup is configured to work across all packages in the monorepo.

## Testing Stack

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/user-event**: User interaction simulation

## Project Structure

```
projectx/
├── jest.config.js          # Root Jest configuration
├── jest.setup.js           # Global test setup
├── apps/
│   ├── web/
│   │   └── __tests__/      # Web app tests
│   └── admin/
│       └── __tests__/      # Admin app tests
└── packages/
    └── ui/
        └── __tests__/      # UI component tests
```

## Running Tests

### All Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Package-Specific Tests
```bash
# UI components only
cd packages/ui && npm test

# Web app only
cd apps/web && npm test

# Admin app only
cd apps/admin && npm test
```

## Writing Tests

### Component Testing

#### Basic Component Test
```typescript
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '../Button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

#### Testing User Interactions
```typescript
import { fireEvent, waitFor } from '@testing-library/react'

it('handles click events', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

#### Testing Async Operations
```typescript
it('submits form with valid data', async () => {
  const mockSubmit = jest.fn()
  render(<LoginForm onSubmit={mockSubmit} />)
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  })
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com'
    })
  })
})
```

### Mocking

#### Mocking Hooks
```typescript
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
    loading: false,
  }),
}))
```

#### Mocking Next.js Router
```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))
```

#### Mocking Supabase
```typescript
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signIn: jest.fn(),
      signOut: jest.fn(),
    },
  })),
}))
```

## Test Organization

### File Naming
- Test files should be named `*.test.tsx` or `*.test.ts`
- Place tests in `__tests__` directories
- Mirror the source file structure in test directories

### Test Structure
```typescript
describe('ComponentName', () => {
  // Setup and teardown
  beforeEach(() => {
    // Reset mocks, setup test data
  })

  describe('rendering', () => {
    it('renders correctly with default props', () => {
      // Test default rendering
    })

    it('renders correctly with custom props', () => {
      // Test with different props
    })
  })

  describe('interactions', () => {
    it('handles user interactions', () => {
      // Test user interactions
    })
  })

  describe('edge cases', () => {
    it('handles error states', () => {
      // Test error handling
    })
  })
})
```

## Coverage Requirements

The project maintains the following coverage thresholds:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Best Practices

### 1. Test Behavior, Not Implementation
```typescript
// ❌ Testing implementation details
expect(component.state.isLoading).toBe(true)

// ✅ Testing behavior
expect(screen.getByText('Loading...')).toBeInTheDocument()
```

### 2. Use Semantic Queries
```typescript
// ❌ Fragile selectors
screen.getByTestId('submit-button')

// ✅ Semantic queries
screen.getByRole('button', { name: /submit/i })
```

### 3. Test Accessibility
```typescript
it('is accessible', () => {
  render(<Button>Click me</Button>)
  
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument()
  expect(button).not.toHaveAttribute('aria-disabled', 'true')
})
```

### 4. Mock External Dependencies
```typescript
// Mock API calls
jest.mock('../api/users', () => ({
  fetchUsers: jest.fn().mockResolvedValue([]),
}))
```

### 5. Clean Up After Tests
```typescript
afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})
```

## Debugging Tests

### Running Single Test
```bash
npm test -- --testNamePattern="Button Component"
```

### Verbose Output
```bash
npm test -- --verbose
```

### Debug Mode
```bash
npm test -- --detectOpenHandles --forceExit
```

## Continuous Integration

Tests are automatically run on:
- Pull requests
- Pushes to main branch
- Before deployments

### GitHub Actions Example
```yaml
- name: Run tests
  run: npm run test:coverage
  
- name: Upload coverage
  uses: codecov/codecov-action@v1
```

## Common Testing Patterns

### Testing Forms
```typescript
describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />)
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })
})
```

### Testing API Integration
```typescript
describe('UserList', () => {
  it('displays users from API', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }]
    jest.mocked(fetchUsers).mockResolvedValue(mockUsers)
    
    render(<UserList />)
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })
})
```

### Testing Error States
```typescript
describe('DataComponent', () => {
  it('handles API errors gracefully', async () => {
    jest.mocked(fetchData).mockRejectedValue(new Error('API Error'))
    
    render(<DataComponent />)
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout or check for unresolved promises
2. **Module not found**: Check Jest moduleNameMapping configuration
3. **React hooks errors**: Ensure components are properly wrapped in test providers
4. **Async tests failing**: Use `waitFor` for async operations

### Getting Help

- Check existing test examples in the codebase
- Review Jest and React Testing Library documentation
- Ask team members for guidance on complex testing scenarios
