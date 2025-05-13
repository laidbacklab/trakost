// types/expense.ts or inline here
export type Expense = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    category: string;
    amount: number;
    createdAt: string;
    updatedAt?: string; // optional, added when updated
};

// Shared in-memory database
export let expenses: Expense[] = [];

// Reset the expenses array (useful for testing)
export function resetExpenses(): void {
    expenses = [];
}

// Find an expense by ID
export function findExpenseById(id: string): Expense | undefined {
    return expenses.find(expense => expense.id === id);
}

// Add an expense
export function addExpense(expense: Expense): Expense {
    expenses.push(expense);
    return expense;
}

// Update an existing expense
export function updateExpense(id: string, data: Partial<Expense>): Expense | null {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index === -1) return null;

    expenses[index] = {
        ...expenses[index],
        ...data,
        updatedAt: new Date().toISOString(),
    };

    return expenses[index];
}

// Delete an expense
export function deleteExpense(id: string): boolean {
    const initialLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== id);
    return expenses.length !== initialLength;
}
