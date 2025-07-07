# ProjectX - SaaS Boilerplate

A modern, full-stack SaaS boilerplate built with Next.js, TypeScript, Tailwind CSS, and Supabase. This monorepo includes a main web application, admin dashboard, and shared UI components.

## 🚀 Features

- **🏗️ Monorepo Architecture**: TurboRepo for efficient development and builds
- **⚡ Next.js 14**: App Router, Server Components, and TypeScript
- **🎨 Tailwind CSS**: Utility-first CSS framework with custom design system
- **🔐 Authentication**: Complete auth system with Supabase
- **🛡️ Role-Based Access**: User and admin role management
- **📱 Responsive Design**: Mobile-first responsive components
- **🧪 Testing**: Jest and React Testing Library setup
- **📦 Shared Components**: Reusable UI component library
- **🔧 Developer Experience**: ESLint, TypeScript, and hot reload

## 📁 Project Structure

```
projectx/
├── apps/
│   ├── web/                    # Main web application (Port 3000)
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── components/    # App-specific components
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   └── lib/           # Utilities and configurations
│   │   └── __tests__/         # Application tests
│   └── admin/                  # Admin dashboard (Port 3001)
│       ├── src/
│       │   ├── app/           # Admin pages
│       │   ├── components/    # Admin-specific components
│       │   └── lib/           # Admin utilities
│       └── __tests__/         # Admin tests
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.tsx
│   └── config/                 # Shared configurations
│       ├── tailwind.config.js
│       ├── eslint-config.js
│       └── tsconfig.json
├── supabase/
│   └── schema.sql             # Database schema
├── jest.config.js             # Root Jest configuration
├── turbo.json                 # TurboRepo configuration
└── package.json               # Root package.json
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

### Development Tools
- **TurboRepo** - Monorepo build system
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/projectx.git
   cd projectx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up the database**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL script from `supabase/schema.sql` in your Supabase SQL editor

5. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Web app: http://localhost:3000
   - Admin app: http://localhost:3001

## 📚 Available Scripts

### Root Level Commands

```bash
# Start all applications in development mode
npm run dev

# Build all applications
npm run build

# Run tests across all packages
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Lint all packages
npm run lint

# Type check all packages
npm run type-check

# Clean all build artifacts
npm run clean
```

### Individual App Commands

```bash
# Web application
cd apps/web
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run test       # Run tests

# Admin application
cd apps/admin
npm run dev        # Start development server (port 3001)
npm run build      # Build for production
npm run start      # Start production server
npm run test       # Run tests

# UI Package
cd packages/ui
npm run test       # Run component tests
npm run lint       # Lint components
```

## 🔐 Authentication

The boilerplate includes a complete authentication system:

### Features
- User registration with email confirmation
- Login/logout functionality
- Protected routes with middleware
- Role-based access control (User/Admin)
- Profile management

### Usage

```tsx
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>
  
  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## 🎨 UI Components

The shared UI package includes pre-built components:

### Available Components

- **Button** - Multiple variants and sizes
- **Input** - Form inputs with validation
- **Modal** - Accessible modal dialogs
- **Card** - Content containers
- **Loading** - Loading spinners
- **Toast** - Notification system
- **Dropdown** - Dropdown menus

### Usage

```tsx
import { Button, Input, Modal } from '@projectx/ui'

function MyForm() {
  return (
    <form>
      <Input 
        label="Email" 
        type="email" 
        required 
      />
      <Button 
        variant="primary" 
        size="lg" 
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
```

## 🧪 Testing

The project includes comprehensive testing setup:

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for specific package
cd packages/ui && npm test
```

### Writing Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy**

### Manual Deployment

```bash
# Build all applications
npm run build

# Start production servers
npm run start
```

## 🔧 Configuration

### Tailwind CSS

The project uses a shared Tailwind configuration in `packages/config/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
}
```

### TypeScript

Path aliases are configured for easy imports:

```typescript
// Instead of ../../packages/ui/Button
import { Button } from '@/ui/Button'

// Instead of ../../../lib/utils
import { utils } from '@/lib/utils'
```

## 📖 API Documentation

### Supabase Schema

The database includes the following tables:

- **auth.users** - User authentication (managed by Supabase)
- **profiles** - User profile information
- **roles** - User roles and permissions

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

```sql
-- Users can only view and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new components
- Use conventional commit messages
- Ensure all tests pass before submitting PR

## 🐛 Troubleshooting

### Common Issues

**1. Environment Variables Not Loading**
```bash
# Make sure .env.local exists in both root and app directories
cp .env.example .env.local
cp .env.example apps/web/.env.local
cp .env.example apps/admin/.env.local
```

**2. Supabase Connection Issues**
- Verify your Supabase URL and anon key
- Check if your Supabase project is active
- Ensure RLS policies are set up correctly

**3. Build Errors**
```bash
# Clear all build caches
npm run clean
rm -rf node_modules
npm install
```

**4. Test Failures**
```bash
# Update test snapshots
npm run test -- --updateSnapshot

# Run tests in verbose mode
npm run test -- --verbose
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework
- [TurboRepo](https://turbo.build/) - The build system for JavaScript and TypeScript codebases

## 📞 Support

If you have any questions or need help, please:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [GitHub issues](https://github.com/YOUR-USERNAME/projectx/issues)
3. Create a new issue if needed

---

**Happy coding! 🚀**
