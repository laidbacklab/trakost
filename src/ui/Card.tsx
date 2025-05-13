import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  icon,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && (
        <div className={`flex items-center mb-4 pb-2 border-b border-gray-200 ${headerClassName}`}>
          {icon && <span className="mr-2">{icon}</span>}
          <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};

export default Card;