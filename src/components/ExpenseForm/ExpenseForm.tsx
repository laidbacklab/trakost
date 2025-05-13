import React, { useState } from 'react';
import { ExpenseCategory, ExpenseData } from '../../types';
import { formatCurrency } from '../../utils/dateUtils';

interface ExpenseFormProps {
    addExpense: (expense: Omit<ExpenseData, 'id'>) => void;
    totalAmount: number;
    clearAll: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense, totalAmount, clearAll }) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const [formData, setFormData] = useState({
        name: '',
        startDate: formatDateForInput(today),
        endDate: formatDateForInput(tomorrow),
        category: '' as ExpenseCategory,
        amount: '',
    });

    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        // Validate amount format
        const amountRegex = /^\$?(\d+(\.\d{1,2})?)$/;
        if (!amountRegex.test(formData.amount)) {
            setFormError('Please enter amount in format: $0.00');
            return false;
        }

        // Validate dates
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        if (startDate > endDate) {
            setFormError('End date must be after start date');
            return false;
        }

        setFormError('');
        return true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Parse amount to remove $ and convert to number
        const amount = parseFloat(formData.amount.replace('$', ''));

        // Add expense
        addExpense({
            name: formData.name,
            startDate: formData.startDate,
            endDate: formData.endDate,
            category: formData.category as ExpenseCategory,
            amount,
        });

        // Reset form (keeping dates)
        setFormData(prev => ({
            name: '',
            startDate: prev.startDate,
            endDate: prev.endDate,
            category: '' as ExpenseCategory,
            amount: '',
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <i className="fas fa-plus-circle mr-2"></i> New Expense
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                        required
                        className="w-full p-3 pl-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <i className="fas fa-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <input
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full p-3 pl-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <i className="fas fa-calendar-day absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <div className="relative flex-1">
                        <input
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="w-full p-3 pl-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <i className="fas fa-calendar-check absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full p-3 pl-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all appearance-none"
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="food">Food & Dining</option>
                            <option value="rent">Housing & Rent</option>
                            <option value="transport">Transportation</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="utilities">Utilities</option>
                            <option value="other">Other Expenses</option>
                        </select>
                        <i className="fas fa-folder absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>

                    <div className="relative flex-1">
                        <input
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Amount ($0.00)"
                            required
                            className="w-full p-3 pl-10 bg-white bg-opacity-70 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <i className="fas fa-dollar-sign absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>

                {formError && (
                    <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg flex items-center">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {formError}
                    </p>
                )}

                <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                        >
                            <i className="fas fa-plus mr-1"></i> Add
                        </button>
                        <button
                            type="button"
                            onClick={clearAll}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                        >
                            <i className="fas fa-trash-alt mr-1"></i> Clear All
                        </button>
                    </div>

                    <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center font-semibold text-blue-700 border border-blue-100">
                        <i className="fas fa-coins mr-2"></i>
                        <span>Total: {formatCurrency(totalAmount)}</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;