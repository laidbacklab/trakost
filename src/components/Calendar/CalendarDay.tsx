import React from 'react';
import { ExpenseWithCalculations } from '../../types';
import CalendarEvent from './CalendarEvent';
import { formatCurrency } from '@/utils/currencyUtils';

interface CalendarDayProps {
    day: number;
    isToday: boolean;
    events: ExpenseWithCalculations[];
    dailyTotal: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, isToday, events, dailyTotal }) => {
    return (
        <div
            className={`
        rounded-lg min-h-[140px] border p-3 pt-10 
        transition-all duration-200 hover:shadow-md relative
        ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white'}
      `}
        >
            {/* Day number indicator */}
            <div
                className={`
          absolute top-2 right-2 h-7 w-7 flex items-center justify-center 
          rounded-full font-bold text-sm
          ${isToday ? 'bg-blue-500 text-white' : 'text-gray-700'}
        `}
            >
                {day}
            </div>

            {/* Events for this day */}
            <div className="space-y-2 overflow-y-auto max-h-[calc(100%-2.5rem)]">
                {events.map((event) => (
                    <CalendarEvent key={event.id} event={event} />
                ))}
            </div>

            {/* Daily total */}
            {dailyTotal > 0 && (
                <div className="mt-2 pt-2 border-t border-dashed border-gray-200 text-xs">
                    <div className="flex justify-between font-medium">
                        <span>Daily Total:</span>
                        <span className="text-blue-600">{formatCurrency(dailyTotal)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarDay;