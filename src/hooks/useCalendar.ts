import { ExpenseData, ExpenseWithCalculations } from '../types';
import { calculateDailyAmount, isDateInRange } from '../utils/dateUtils';

export const useCalendar = (expenses: ExpenseData[], currentMonth: Date) => {
    // Current month details
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Calculate calendar grid data
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });

    // Get current date for highlighting today
    const today = new Date();

    // Check if a specific day is today
    const isToday = (day: number): boolean => {
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    // Get events for a specific day
    const getEventsForDay = (day: number): ExpenseWithCalculations[] => {
        const date = new Date(year, month, day);

        return expenses
            .filter(expense => isDateInRange(date, new Date(expense.startDate), new Date(expense.endDate)))
            .map(expense => {
                const { dailyAmount, totalDays } = calculateDailyAmount(
                    expense.amount,
                    new Date(expense.startDate),
                    new Date(expense.endDate)
                );

                return {
                    ...expense,
                    dailyAmount,
                    totalDays,
                };
            });
    };

    // Calculate total amount for a specific day
    const getDailyTotal = (day: number): number => {
        const events = getEventsForDay(day);
        return events.reduce((sum, event) => sum + event.dailyAmount, 0);
    };

    return {
        year,
        month,
        monthName,
        firstDayOfMonth,
        daysInMonth,
        isToday,
        getEventsForDay,
        getDailyTotal,
    };
};