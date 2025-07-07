# Contributing to ProjectX

Thank you for your interest in contributing to ProjectX! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **Bug Reports** - Help us identify and fix issues
- **Feature Requests** - Suggest new features or improvements
- **Code Contributions** - Submit bug fixes or new features
- **Documentation** - Improve or add to our documentation
- **Testing** - Help improve test coverage
- **Design** - UI/UX improvements and suggestions

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

- Node.js 18+ installed
- npm 8+ installed
- Git installed and configured
- A GitHub account
- Basic knowledge of TypeScript, React, and Next.js

### Setting Up Your Development Environment

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/projectx.git
   cd projectx
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/projectx.git
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

5. **Start Development Servers**
   ```bash
   npm run dev
   ```

6. **Run Tests**
   ```bash
   npm run test
   ```

## 📝 Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `test/` - Test improvements
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

Examples:
```bash
git checkout -b feature/user-profile-page
git checkout -b fix/login-validation-error
git checkout -b docs/api-documentation
```

### Making Changes

1. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow our coding standards (see below)
   - Write or update tests as needed
   - Update documentation if necessary

3. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add user profile page"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to GitHub and create a PR from your fork
   - Fill out the PR template completely
   - Link any related issues

## 📋 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type - use specific types or `unknown`
- Use strict mode settings

```typescript
// Good
interface UserProfile {
  id: string
  email: string
  name?: string
}

// Avoid
const user: any = getUserData()
```

### React Component Guidelines

- Use functional components with hooks
- Follow the component structure pattern
- Use proper prop typing
- Implement proper error boundaries

```tsx
// Component structure
import React from 'react'

interface ComponentProps {
  title: string
  onAction?: () => void
}

/**
 * Component description
 */
export const Component: React.FC<ComponentProps> = ({ 
  title, 
  onAction 
}) => {
  // Hooks
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {
    onAction?.()
  }

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  )
}
```

### CSS/Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic class names for custom CSS
- Maintain consistent spacing and colors

```tsx
// Good
<div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// Avoid inline styles
<div style={{ padding: '24px', backgroundColor: 'white' }}>
```

### File Organization

```
src/
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom hooks
├── lib/                # Utilities and configurations
├── types/              # Type definitions
└── __tests__/          # Test files
```

## 🧪 Testing Guidelines

### Writing Tests

- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

```typescript
describe('Button Component', () => {
  it('should render with correct text', () => {
    // Arrange
    const buttonText = 'Click me'
    
    // Act
    render(<Button>{buttonText}</Button>)
    
    // Assert
    expect(screen.getByRole('button')).toHaveTextContent(buttonText)
  })

  it('should call onClick handler when clicked', () => {
    // Arrange
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    // Act
    fireEvent.click(screen.getByRole('button'))
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Test Types

1. **Unit Tests** - Test individual components/functions
2. **Integration Tests** - Test component interactions
3. **E2E Tests** - Test complete user workflows (optional)

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test Button.test.tsx
```

## 📖 Documentation Guidelines

### Code Documentation

- Add JSDoc comments to all functions and components
- Include parameter descriptions and return types
- Provide usage examples

```typescript
/**
 * Formats a date string for display
 * 
 * @param date - The date to format
 * @param format - The desired format ('short' | 'long')
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * formatDate('2023-12-25', 'short') // '12/25/23'
 * formatDate('2023-12-25', 'long')  // 'December 25, 2023'
 * ```
 */
export const formatDate = (date: string, format: 'short' | 'long'): string => {
  // Implementation
}
```

### README Updates

- Update README.md if you add new features
- Include setup instructions for new dependencies
- Add examples for new functionality

## 🔍 Code Review Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No console.log statements left in code
- [ ] TypeScript types are properly defined
- [ ] Accessibility considerations addressed

### Pull Request Guidelines

1. **Title Format**
   ```
   type(scope): description
   
   Examples:
   feat(auth): add password reset functionality
   fix(ui): resolve button alignment issue
   docs(readme): update installation instructions
   ```

2. **Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring

   ## Testing
   - [ ] Tests added/updated
   - [ ] All tests passing
   - [ ] Manual testing completed

   ## Screenshots (if applicable)
   Add screenshots for UI changes

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   ```

### Review Criteria

Reviewers will check for:

- **Functionality** - Does the code work as intended?
- **Code Quality** - Is the code clean and maintainable?
- **Performance** - Are there any performance implications?
- **Security** - Are there any security concerns?
- **Testing** - Is the code properly tested?
- **Documentation** - Is the code well documented?

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues to avoid duplicates
2. Try to reproduce the bug consistently
3. Test with the latest version

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 96, Firefox 95]
- Node.js version: [e.g., 18.0.0]
- Project version: [e.g., 1.0.0]

**Screenshots**
Add screenshots if applicable

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
Clear description of the proposed feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Mockups, examples, or references
```

## 🏷️ Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples
```bash
feat(auth): add OAuth login support
fix(ui): resolve mobile navigation issue
docs(api): update authentication endpoints
test(components): add Button component tests
chore(deps): update dependencies to latest versions
```

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Release notes prepared

## 🤔 Questions and Support

### Getting Help

- **Documentation** - Check our README and docs first
- **Issues** - Search existing issues for similar problems
- **Discussions** - Use GitHub Discussions for questions
- **Discord** - Join our community Discord (if available)

### Contact

- **Maintainers** - Tag @maintainers in issues
- **Security Issues** - Email security@projectx.com
- **General Questions** - Create a GitHub Discussion

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, nationality
- Personal appearance, race, religion
- Sexual identity and orientation

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Personal attacks or political arguments
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Report unacceptable behavior to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

## 🎉 Recognition

### Contributors

We recognize contributors in several ways:

- **README Contributors Section** - Listed in project README
- **Release Notes** - Mentioned in release announcements
- **Hall of Fame** - Special recognition for significant contributions

### Contribution Types

We recognize various types of contributions:

- 💻 Code
- 📖 Documentation
- 🐛 Bug Reports
- 💡 Ideas
- 🎨 Design
- 🧪 Testing
- 🌍 Translation
- 📢 Outreach

## 📚 Resources

### Learning Resources

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### Tools

- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [GitHub Desktop](https://desktop.github.com/) - Git GUI
- [Postman](https://www.postman.com/) - API testing
- [Figma](https://www.figma.com/) - Design collaboration

---

Thank you for contributing to ProjectX! Your efforts help make this project better for everyone. 🚀
