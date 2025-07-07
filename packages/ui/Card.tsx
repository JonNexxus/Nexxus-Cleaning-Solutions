import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hover?: boolean;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  clickable?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'sm',
  border = true,
  hover = false,
  variant = 'default',
  header,
  footer,
  title,
  subtitle,
  image,
  imageAlt,
  clickable = false,
  onClick,
  loading = false,
}) => {
  const baseClasses = 'rounded-lg overflow-hidden transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const variantClasses = {
    default: 'bg-white',
    outlined: 'bg-white border-2',
    elevated: 'bg-white shadow-lg',
    filled: 'bg-gray-50',
  };

  const borderClasses = border && variant !== 'outlined' ? 'border border-gray-200' : '';
  const hoverClasses = hover || clickable 
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
    : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${hoverClasses} ${className}`;

  const handleClick = () => {
    if (clickable && onClick && !loading) {
      onClick();
    }
  };

  if (loading) {
    return (
      <div className={classes}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes} onClick={handleClick}>
      {/* Image */}
      {image && (
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={imageAlt || 'Card image'}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header */}
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {header}
        </div>
      )}

      {/* Title and Subtitle */}
      {(title || subtitle) && (
        <div className={`${padding !== 'none' ? 'px-6 py-4' : 'p-4'} ${children ? 'border-b border-gray-100' : ''}`}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      {children && (
        <div className={padding === 'none' ? '' : 'px-6 py-4'}>
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

// Additional Card Components
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`px-6 py-4 border-b border-gray-200 bg-gray-50 ${className}`}>
    {children}
  </div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);
