import React from 'react';
import { ExpenseWithCalculations } from '../../types';
import { formatCurrency } from '../../utils/dateUtils';
import { getCategoryStyles } from '../../utils/categoryUtils';

interface CalendarEventProps {
    event: ExpenseWithCalculations;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
    const categoryStyle = getCategoryStyles(event.category);

    return (
        <div
            className={`
        rounded-lg p-2 text-xs shadow-sm border-l-4 
        ${categoryStyle.borderColor} ${categoryStyle.lightBgColor}
        transform transition-transform duration-150 hover:translate-x-0.5
      `}
            title={event.name}
        >
            <div className="font-semibold truncate">{event.name}</div>
            <div className="flex justify-between items-center mt-1">
                <span className="font-medium">{formatCurrency(event.dailyAmount)}</span>
                <span className="text-gray-500">/day</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
                {formatCurrency(event.amount)} over {event.totalDays} days
            </div>
        </div>
    );
};

export default CalendarEvent;