import React from 'react';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'success' | 'warning' | 'danger';
  text?: string;
  className?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring';
  fullScreen?: boolean;
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className = '',
  variant = 'spinner',
  fullScreen = false,
  overlay = false,
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gray: 'text-gray-400',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const renderSpinner = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderDots = () => {
    const dotSize = size === 'xs' ? 'h-1 w-1' : size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : size === 'lg' ? 'h-3 w-3' : 'h-4 w-4';
    return (
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${dotSize} ${colorClasses[color].replace('text-', 'bg-')} rounded-full animate-pulse`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    );
  };

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} ${colorClasses[color].replace('text-', 'bg-')} rounded-full animate-pulse`} />
  );

  const renderBars = () => {
    const barHeight = size === 'xs' ? 'h-3' : size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : size === 'lg' ? 'h-8' : 'h-10';
    return (
      <div className="flex items-end space-x-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1 ${barHeight} ${colorClasses[color].replace('text-', 'bg-')} animate-pulse`}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1.2s',
            }}
          />
        ))}
      </div>
    );
  };

  const renderRing = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className={`absolute inset-0 rounded-full border-2 border-gray-200`} />
      <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-current ${colorClasses[color]} animate-spin`} />
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      case 'ring':
        return renderRing();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className="flex flex-col items-center">
      {renderVariant()}
      {text && (
        <p className={`mt-3 ${textSizeClasses[size]} ${colorClasses[color]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${overlay ? 'bg-white bg-opacity-80' : 'bg-white'} ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {content}
    </div>
  );
};

// Additional Loading Components
export const LoadingButton: React.FC<{
  loading?: boolean;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ loading = false, children, size = 'sm', className = '' }) => (
  <div className={`flex items-center ${className}`}>
    {loading && <Loading size={size} variant="spinner" className="mr-2" />}
    {children}
  </div>
);

export const LoadingOverlay: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  text?: string;
  className?: string;
}> = ({ loading, children, text, className = '' }) => (
  <div className={`relative ${className}`}>
    {children}
    {loading && (
      <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
        <Loading text={text} />
      </div>
    )}
  </div>
);

export const LoadingSkeleton: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-200 rounded mb-2 ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      />
    ))}
  </div>
);
