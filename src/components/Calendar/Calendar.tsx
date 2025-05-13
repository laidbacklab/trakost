import React from 'react';
import { ExpenseData } from '../../types';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarDay from './CalendarDay';

interface CalendarProps {
    expenses: ExpenseData[];
    currentMonth: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
    expenses,
    currentMonth,
    onPrevMonth,
    onNextMonth
}) => {
    const {
        year,
        monthName,
        firstDayOfMonth,
        daysInMonth,
        isToday,
        getEventsForDay,
        getDailyTotal
    } = useCalendar(expenses, currentMonth);

    // Generate array of empty cells for days before the first of the month
    const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => (
        <div key={`empty-${i}`} className="bg-gray-50 rounded-lg min-h-[140px]"></div>
    ));

    // Generate array for all days in the month
    const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return (
            <CalendarDay
                key={`day-${day}`}
                day={day}
                isToday={isToday(day)}
                events={getEventsForDay(day)}
                dailyTotal={getDailyTotal(day)}
            />
        );
    });

    // Create array of day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onPrevMonth}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center"
                >
                    <i className="fas fa-chevron-left mr-1"></i> Previous
                </button>

                <h2 className="text-2xl font-bold text-blue-600 relative px-4 py-1">
                    <span className="relative z-10">{monthName} {year}</span>
                    <span className="absolute inset-0 bg-blue-100 opacity-50 rounded-lg transform -skew-x-6"></span>
                </h2>

                <button
                    onClick={onNextMonth}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center"
                >
                    Next <i className="fas fa-chevron-right ml-1"></i>
                </button>
            </div>

            {/* Calendar header */}
            <div className="grid grid-cols-7 gap-3 mb-3">
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="p-2 text-center font-semibold bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg text-blue-700 truncate"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-3 flex-grow">
                {emptyCells}
                {dayCells}
            </div>
        </div>
    );
};

export default Calendar;