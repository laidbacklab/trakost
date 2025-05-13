import React from 'react';
import { ExpenseCategory } from '@/types';

interface FormInputsProps {
    formData: {
        name: string;
        startDate: string;
        endDate: string;
        category: ExpenseCategory | '';
        amount: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    formError?: string;
}

const FormInputs: React.FC<FormInputsProps> = ({ formData, handleChange, formError }) => {
    return (
        <>
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
        </>
    );
};

export default FormInputs;