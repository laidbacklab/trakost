import React, { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'primary',
  size = 'md',
  tooltip,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none';
  
  const variantStyles = {
    primary: 'text-blue-500 hover:bg-blue-100',
    secondary: 'text-gray-500 hover:bg-gray-100',
    danger: 'text-red-500 hover:bg-red-100',
    ghost: 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
  };
  
  const sizeStyles = {
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2'
  };
  
  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
        ${tooltip ? 'relative group' : ''}
      `}
      title={tooltip}
      {...props}
    >
      {icon}
      
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-2 whitespace-nowrap pointer-events-none">
          {tooltip}
        </div>
      )}
    </button>
  );
};

export default IconButton;