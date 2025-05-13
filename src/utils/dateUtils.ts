/**
 * Formats a date as MM/DD/YYYY
 */
export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString();
};

/**
 * Formats a date in short format MM/DD/YY
 */
export const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
};

/**
 * Formats currency as $X.XX
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculates daily amount and total days for an expense
 */
export const calculateDailyAmount = (
  totalAmount: number,
  startDate: Date,
  endDate: Date
) => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const dailyAmount = totalAmount / Math.max(1, totalDays);
  
  return { dailyAmount, totalDays };
};

/**
 * Check if a date falls within a range (inclusive)
 */
export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  // Reset time component to compare dates only
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  
  const s = new Date(startDate);
  s.setHours(0, 0, 0, 0);
  
  const e = new Date(endDate);
  e.setHours(0, 0, 0, 0);
  
  return d >= s && d <= e;
};

/**
 * Generate a human-readable duration text
 */
export const getDurationText = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  if (days === 1) {
    return "Single day";
  } else if (days === 7) {
    return "1 week";
  } else if (days >= 28 && days <= 31) {
    return "1 month";
  } else if (days >= 365 && days <= 366) {
    return "1 year";
  } else {
    return `${days} days`;
  }
};