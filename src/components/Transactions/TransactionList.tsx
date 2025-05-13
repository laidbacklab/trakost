import React from 'react';
import { ExpenseData } from '../../types';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
    expenses: ExpenseData[];
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ expenses, onDelete, onDuplicate }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-[calc(100vh-28rem)]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                    <i className="fas fa-list mr-2"></i> Transactions
                </h2>
                <div className="text-sm text-gray-500">{expenses.length} items</div>
            </div>

            <div className="overflow-y-auto flex-grow rounded-lg border border-gray-100">
                {expenses.length > 0 ? (
                    <table className="w-full">
                        <thead className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm z-10">
                            <tr className="text-gray-600">
                                <th className="p-3 text-left">Item</th>
                                <th className="p-3 text-left">Amount</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <TransactionItem
                                    key={expense.id}
                                    expense={expense}
                                    onDelete={onDelete}
                                    onDuplicate={onDuplicate}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                            <i className="fas fa-receipt text-gray-300 text-4xl mb-2"></i>
                            <p>No items added yet</p>
                            <p className="text-sm text-gray-400">Add your first expense to get started</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;