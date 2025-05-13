/**
 * Format a number as currency
 * @param amount The amount to format
 * @param currency The currency code (default: USD)
 * @param locale The locale (default: en-US)
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Parse a currency string to a number
 * @param value The currency string to parse
 */
export const parseCurrencyValue = (value: string): number => {
  // Remove currency symbol and commas
  const cleanValue = value.replace(/[$,]/g, '');
  return parseFloat(cleanValue);
};

/**
 * Validate a currency input string
 * @param value The currency string to validate
 */
export const isValidCurrencyFormat = (value: string): boolean => {
  const currencyRegex = /^\$?(\d+(\.\d{1,2})?)$/;
  return currencyRegex.test(value);
};

/**
 * Calculate a percentage of an amount
 * @param amount The base amount
 * @param percentage The percentage to calculate
 */
export const calculatePercentage = (amount: number, percentage: number): number => {
  return (amount * percentage) / 100;
};

/**
 * Calculate total from an array of amounts
 * @param amounts Array of amounts to sum
 */
export const sumAmounts = (amounts: number[]): number => {
  return amounts.reduce((total, amount) => total + amount, 0);
};

/**
 * Format a large number with abbreviated suffixes (K, M, B)
 * @param amount The number to format
 */
export const formatLargeNumber = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K`;
  }
  return amount.toString();
};