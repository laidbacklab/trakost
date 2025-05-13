import React from 'react';
import { ExpenseData } from '../../types';
import { formatCurrency, formatDateShort, getDurationText } from '../../utils/dateUtils';
import { getCategoryDisplayName, getCategoryStyles } from '@/utils/categoryUtils';

interface TransactionItemProps {
    expense: ExpenseData;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ expense, onDelete, onDuplicate }) => {
    const categoryStyles = getCategoryStyles(expense.category);

    return (
        <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150">
            <td className="p-3">
                <div className="font-medium">{expense.name}</div>
                <div className="text-xs mt-1">
                    <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyles.bgColor} ${categoryStyles.textColor}`}
                    >
                        {getCategoryDisplayName(expense.category)}
                    </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {formatDateShort(expense.startDate)} - {formatDateShort(expense.endDate)}
                </div>
            </td>
            <td className="p-3">
                <div className="font-semibold">{formatCurrency(expense.amount)}</div>
                <div className="text-xs text-gray-500">
                    {getDurationText(expense.startDate, expense.endDate)}
                </div>
            </td>
            <td className="p-3 text-right">
                <button
                    onClick={() => onDuplicate(expense.id)}
                    className="text-blue-500 p-1.5 rounded-full hover:bg-blue-100 transition-colors mr-1"
                    title="Duplicate"
                >
                    <i className="fas fa-copy"></i>
                </button>
                <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-500 p-1.5 rounded-full hover:bg-red-100 transition-colors"
                    title="Delete"
                >
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    );
};

export default TransactionItem;