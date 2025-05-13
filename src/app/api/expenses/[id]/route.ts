import { NextRequest, NextResponse } from 'next/server';
import { findExpenseById, updateExpense, deleteExpense } from '../shared-db';
import { Expense } from '../shared-db';

// GET /api/expenses/[id] - Get a specific expense
export async function GET(
    _request: NextRequest,
    { params }: { params: { [key: string]: string } }
) {
    const id = params.id;

    const expense = findExpenseById(id);

    if (!expense) {
        return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json(expense);
}

// PATCH /api/expenses/[id] - Update a specific expense
export async function PATCH(
    request: NextRequest,
    { params }: { params: { [key: string]: string } }
) {
    try {
        const id = params.id;
        const data: Partial<Expense> = await request.json();

        const updatedExpense = updateExpense(id, {
            ...data,
            amount:
                typeof data.amount === 'string'
                    ? parseFloat(data.amount)
                    : data.amount,
        });

        if (!updatedExpense) {
            return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
        }

        return NextResponse.json(updatedExpense);
    } catch (error) {
        console.error('Update expense failed:', error);
        return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
    }
}

// DELETE /api/expenses/[id] - Delete a specific expense
export async function DELETE(
    _request: NextRequest,
    { params }: { params: { [key: string]: string } }
) {
    const id = params.id;

    const deleted = deleteExpense(id);

    if (!deleted) {
        return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Expense deleted successfully' }, { status: 200 });
}