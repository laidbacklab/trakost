export interface ExpenseData {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    category: ExpenseCategory;
    amount: number;
}

export interface ExpenseWithCalculations extends ExpenseData {
    dailyAmount: number;
    totalDays: number;
}

export type ExpenseCategory =
    | 'food'
    | 'rent'
    | 'transport'
    | 'entertainment'
    | 'utilities'
    | 'other';

export interface CalendarDayEvent {
    id: string;
    name: string;
    category: ExpenseCategory;
    amount: number;
    dailyAmount: number;
    totalDays: number;
}

export type CategoryStyle = {
    bgColor: string;
    textColor: string;
    borderColor: string;
    lightBgColor: string;
};

export type CategoryStyleMap = {
    [key in ExpenseCategory]: CategoryStyle;
};