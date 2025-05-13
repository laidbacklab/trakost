import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { expenses, addExpense, deleteExpense, updateExpense } from './shared-db';

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
        const newExpense = addExpense({
            id: uuidv4(),
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            category: data.category,
            amount: parseFloat(data.amount),
            createdAt: new Date().toISOString()
        });

        return NextResponse.json(newExpense, { status: 201 });
    } catch (error) {
        console.error('Create expense failed:', error);
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

        const deleted = deleteExpense(id);

        if (!deleted) {
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
        console.error('Delete expense failed:', error);
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
        const updatedExpense = updateExpense(id, {
            ...data,
            amount: data.amount !== undefined ? parseFloat(data.amount) : undefined
        });

        if (!updatedExpense) {
            return NextResponse.json(
                { error: 'Expense not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedExpense, { status: 200 });
    } catch (error) {
        console.error('Put expense failed:', error);
        return NextResponse.json(
            { error: 'Failed to update expense' },
            { status: 500 }
        );
    }
}