import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from './expenses/shared-db';

// This is a simulated database - in a real app, you'd use a proper database
// For now, we'll store everything in memory as a demonstration
export let expenses: Expense[] = [];

// GET /api/expenses - Fetch all expenses
export async function GET() {
    return NextResponse.json({ expenses });
}

// POST /api/expenses - Create a new expense
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.startDate || !data.endDate || !data.category || data.amount === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create new expense with ID
        const newExpense = {
            id: uuidv4(),
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            category: data.category,
            amount: parseFloat(data.amount),
            createdAt: new Date().toISOString()
        };

        // Add to our "database"
        expenses.push(newExpense);

        return NextResponse.json(newExpense, { status: 201 });
    } catch (error) {
        console.error('Failed to create:', error);
        return NextResponse.json(
            { error: 'Failed to create expense' },
            { status: 500 }
        );
    }
}

// DELETE /api/expenses?id=123 - Delete an expense
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Expense ID is required' },
                { status: 400 }
            );
        }

        const initialLength = expenses.length;
        expenses = expenses.filter(expense => expense.id !== id);

        if (expenses.length === initialLength) {
            return NextResponse.json(
                { error: 'Expense not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Expense deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Failed to delete expense:', error);
        return NextResponse.json(
            { error: 'Failed to delete expense' },
            { status: 500 }
        );
    }
}

// PUT /api/expenses?id=123 - Update an expense
export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Expense ID is required' },
                { status: 400 }
            );
        }

        const data = await request.json();
        const expenseIndex = expenses.findIndex(expense => expense.id === id);

        if (expenseIndex === -1) {
            return NextResponse.json(
                { error: 'Expense not found' },
                { status: 404 }
            );
        }

        // Update the expense
        expenses[expenseIndex] = {
            ...expenses[expenseIndex],
            ...data,
            amount: data.amount !== undefined ? parseFloat(data.amount) : expenses[expenseIndex].amount,
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json(expenses[expenseIndex], { status: 200 });
    } catch (error) {
        console.error('Failed to update expense:', error);
        return NextResponse.json(
            { error: 'Failed to update expense' },
            { status: 500 }
        );
    }
}