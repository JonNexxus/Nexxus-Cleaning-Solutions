# Nexxus UI Components

A comprehensive React UI component library built with TypeScript and Tailwind CSS. This package provides a collection of reusable, accessible, and customizable components for building the Nexxus Cleaning Solutions platform.

## Installation

```bash
npm install @nexxus/ui
```

## Components

### Button

A versatile button component with multiple variants, sizes, and states.

```tsx
import { Button } from '@nexxus/ui';

<Button variant="primary" size="md" onClick={() => console.log('clicked')}>
  Click me
</Button>

// With loading state
<Button loading={true} variant="primary">
  Loading...
</Button>

// With icons
<Button 
  leftIcon={<Icon />} 
  rightIcon={<Icon />}
  variant="outline"
>
  Button with icons
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'success' | 'warning'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode

### Input

A flexible input component with validation, icons, and multiple variants.

```tsx
import { Input } from '@nexxus/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>

// With icons
<Input
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  placeholder="Search..."
/>

// Different variants
<Input variant="filled" placeholder="Filled input" />
<Input variant="flushed" placeholder="Flushed input" />
```

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time'
- `variant`: 'default' | 'filled' | 'flushed'
- `size`: 'sm' | 'md' | 'lg'
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `error`: string
- `helperText`: string

### Modal

A flexible modal component with animations and accessibility features.

```tsx
import { Modal } from '@nexxus/ui';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
  animation="scale"
>
  <p>Modal content goes here</p>
</Modal>

// With footer
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirm}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
- `variant`: 'default' | 'centered' | 'drawer'
- `animation`: 'fade' | 'scale' | 'slide'
- `closeOnBackdropClick`: boolean
- `closeOnEscape`: boolean

### Card

A versatile card component for displaying content with optional headers, footers, and images.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@nexxus/ui';

<Card
  title="Card Title"
  subtitle="Card subtitle"
  image="/path/to/image.jpg"
  clickable
  onClick={() => console.log('Card clicked')}
>
  <p>Card content goes here</p>
</Card>

// Using sub-components
<Card>
  <CardHeader>
    <h3>Custom Header</h3>
  </CardHeader>
  <CardBody>
    <p>Card content</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Props:**
- `variant`: 'default' | 'outlined' | 'elevated' | 'filled'
- `padding`: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `shadow`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `hover`: boolean
- `clickable`: boolean
- `loading`: boolean

### Loading

Multiple loading components for different use cases.

```tsx
import { Loading, LoadingButton, LoadingOverlay, LoadingSkeleton } from '@nexxus/ui';

// Basic spinner
<Loading size="md" color="primary" text="Loading..." />

// Different variants
<Loading variant="dots" />
<Loading variant="bars" />
<Loading variant="pulse" />
<Loading variant="ring" />

// Full screen loading
<Loading fullScreen overlay text="Please wait..." />

// Loading button
<LoadingButton loading={isLoading}>
  Save Changes
</LoadingButton>

// Loading overlay
<LoadingOverlay loading={isLoading} text="Saving...">
  <div>Content that gets overlaid</div>
</LoadingOverlay>

// Skeleton loader
<LoadingSkeleton lines={3} />
```

**Props:**
- `variant`: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'primary' | 'secondary' | 'white' | 'gray' | 'success' | 'warning' | 'danger'
- `fullScreen`: boolean
- `overlay`: boolean

### Toast

Toast notifications with multiple types and positions.

```tsx
import { Toast, ToastContainer, useToast } from '@nexxus/ui';

// Using the hook
const { toasts, addToast, removeToast, success, error, warning, info } = useToast();

// Show different types of toasts
success('Operation completed successfully!');
error('Something went wrong');
warning('Please check your input');
info('New update available');

// Custom toast
addToast({
  title: 'Custom Toast',
  message: 'This is a custom toast message',
  type: 'info',
  duration: 3000,
  position: 'top-right'
});

// Toast container (place in your app root)
<ToastContainer 
  toasts={toasts} 
  onRemove={removeToast}
  position="top-right"
/>
```

**Props:**
- `type`: 'success' | 'error' | 'warning' | 'info'
- `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
- `duration`: number (milliseconds)
- `showCloseButton`: boolean

### Dropdown

Flexible dropdown and select components.

```tsx
import { Dropdown, Select } from '@nexxus/ui';

// Basic dropdown
<Dropdown
  trigger={<Button>Open Menu</Button>}
  items={[
    { id: '1', label: 'Option 1', value: 'opt1' },
    { id: '2', label: 'Option 2', value: 'opt2', icon: <Icon /> },
    { id: '3', label: 'Divider', divider: true },
    { id: '4', label: 'Disabled', value: 'opt4', disabled: true }
  ]}
  onSelect={(item) => console.log(item)}
  placement="bottom-start"
/>

// Select dropdown
<Select
  label="Choose an option"
  value={selectedValue}
  onChange={setSelectedValue}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ]}
  placeholder="Select an option"
  error={error}
/>
```

**Props:**
- `placement`: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
- `closeOnSelect`: boolean
- `size`: 'sm' | 'md' | 'lg' (Select only)

## Styling

All components are built with Tailwind CSS and follow a consistent design system. You can customize the appearance by:

1. **Using className prop**: All components accept a `className` prop for custom styling
2. **CSS variables**: Override CSS custom properties for theme customization
3. **Tailwind configuration**: Extend your Tailwind config to match your design system

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## TypeScript Support

This package is written in TypeScript and provides full type definitions for all components and their props.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
