import { CategoryStyleMap, ExpenseCategory } from '../types';

export const CATEGORY_STYLES: CategoryStyleMap = {
    food: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-500',
        lightBgColor: 'bg-green-50',
    },
    rent: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-500',
        lightBgColor: 'bg-red-50',
    },
    transport: {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-500',
        lightBgColor: 'bg-yellow-50',
    },
    entertainment: {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-500',
        lightBgColor: 'bg-blue-50',
    },
    utilities: {
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-500',
        lightBgColor: 'bg-purple-50',
    },
    other: {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-500',
        lightBgColor: 'bg-gray-50',
    },
};

export const getCategoryStyles = (category: ExpenseCategory) => {
    return CATEGORY_STYLES[category] || CATEGORY_STYLES.other;
};

export const CATEGORY_DISPLAY_NAMES: Record<ExpenseCategory, string> = {
    food: 'Food & Dining',
    rent: 'Housing & Rent',
    transport: 'Transportation',
    entertainment: 'Entertainment',
    utilities: 'Utilities',
    other: 'Other Expenses',
};

export const getCategoryDisplayName = (category: ExpenseCategory): string => {
    return CATEGORY_DISPLAY_NAMES[category] || category;
};