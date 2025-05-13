"use client";

import { useState } from 'react';
import Calendar from '@/components/Calendar/Calendar';
import TransactionList from '@/components/Transactions/TransactionList';
import ExpenseForm from '@/components/ExpenseForm/ExpenseForm';
import { useExpenseContext } from '@/context/ExpenseContent';

export default function Home() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    duplicateExpense,
    clearAllExpenses,
    totalAmount
  } = useExpenseContext();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(prevDate => {
      const date = new Date(prevDate);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevDate => {
      const date = new Date(prevDate);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  return (
    <main className="container mx-auto px-4 pb-12">
      {/* Header */}
      <header className="relative p-6 mb-8 text-center overflow-hidden rounded-b-3xl bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-1">Trakost</h1>
          <p className="text-blue-100">Plan your finances visually</p>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Form and Transactions (1/3) */}
        <div className="lg:w-1/3 space-y-6">
          <ExpenseForm
            addExpense={addExpense}
            totalAmount={totalAmount}
            clearAll={clearAllExpenses}
          />

          <TransactionList
            expenses={expenses}
            onDelete={deleteExpense}
            onDuplicate={duplicateExpense}
          />
        </div>

        {/* Right Column: Calendar (2/3) */}
        <div className="lg:w-2/3">
          <Calendar
            expenses={expenses}
            currentMonth={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>
      </div>

      {/* <footer className="mt-12 text-center text-gray-500 text-sm p-4">
        <p>Trakost &copy; {new Date().getFullYear()} | Your financial data is stored locally in your browser</p>
      </footer> */}
    </main>
  );
}