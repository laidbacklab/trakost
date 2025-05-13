/**
 * Service for handling expense data operations with the backend API
 */

import { ExpenseData } from '@/types';

// Base URL for the API
const API_URL = '/api/expenses';

/**
 * Fetch all expenses from the API
 */
export const fetchExpenses = async (): Promise<ExpenseData[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch expenses: ${response.status}`);
        }
        const data = await response.json();
        return data.expenses;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

/**
 * Create a new expense
 */
export const createExpense = async (expense: Omit<ExpenseData, 'id'>): Promise<ExpenseData> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        if (!response.ok) {
            throw new Error(`Failed to create expense: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
};

/**
 * Update an existing expense
 */
export const updateExpense = async (id: string, expense: Partial<ExpenseData>): Promise<ExpenseData> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        if (!response.ok) {
            throw new Error(`Failed to update expense: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

/**
 * Delete an expense
 */
export const deleteExpense = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete expense: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

/**
 * Get a specific expense by ID
 */
export const getExpenseById = async (id: string): Promise<ExpenseData> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to get expense: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting expense:', error);
        throw error;
    }
};