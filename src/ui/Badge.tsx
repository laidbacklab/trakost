import React from 'react';
import { ExpenseCategory } from '@/types';
import { getCategoryStyles, getCategoryDisplayName } from '@/utils/categoryUtils';

interface BadgeProps {
    category: ExpenseCategory;
    size?: 'sm' | 'md';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({ category, size = 'sm', className = '' }) => {
    const styles = getCategoryStyles(category);

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
    };

    return (
        <span
            className={`
        rounded-full font-medium inline-block
        ${styles.bgColor} ${styles.textColor}
        ${sizeClasses[size]}
        ${className}
      `}
        >
            {getCategoryDisplayName(category)}
        </span>
    );
};

export default Badge;