import { useState, useEffect } from 'react';
import { ExpenseData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<ExpenseData[]>([]);

    // Load expenses from localStorage on component mount
    useEffect(() => {
        const savedExpenses = localStorage.getItem('moneycanvas_expenses');
        if (savedExpenses) {
            try {
                setExpenses(JSON.parse(savedExpenses));
            } catch (error) {
                console.error('Failed to parse saved expenses:', error);
            }
        }
    }, []);

    // Save expenses to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('moneycanvas_expenses', JSON.stringify(expenses));
    }, [expenses]);

    // Calculate total amount of all expenses
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Add a new expense
    const addExpense = (expense: Omit<ExpenseData, 'id'>) => {
        const newExpense: ExpenseData = {
            id: uuidv4(),
            ...expense,
        };
        setExpenses(prev => [...prev, newExpense]);
    };

    // Delete an expense by ID
    const deleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(expense => expense.id !== id));
    };

    // Duplicate an expense
    const duplicateExpense = (id: string) => {
        const expenseToDuplicate = expenses.find(expense => expense.id === id);
        if (expenseToDuplicate) {
            const duplicatedExpense: ExpenseData = {
                ...expenseToDuplicate,
                id: uuidv4(),
            };
            setExpenses(prev => [...prev, duplicatedExpense]);
        }
    };

    // Clear all expenses (with confirmation)
    const clearAllExpenses = () => {
        if (window.confirm('Are you sure you want to delete all expenses?')) {
            setExpenses([]);
        }
    };

    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    return {
        expenses: sortedExpenses,
        addExpense,
        deleteExpense,
        duplicateExpense,
        clearAllExpenses,
        totalAmount,
    };
};