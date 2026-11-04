import { CalendarConfig } from '../types/template.js';

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const WEEKDAYS_SUN_START = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const WEEKDAYS_MON_START = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  // month is 1 to 12
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12.`);
  }
  const daysMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysMap[month - 1];
}

/**
 * Returns index (0 to 6) of the first day of the month based on chosen week start ('sun' or 'mon')
 */
export function getStartingDayIndex(year: number, month: number, weekStart: 'sun' | 'mon' = 'sun'): number {
  // JavaScript Date month is 0-indexed (0 = Jan, 11 = Dec)
  // getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
  const date = new Date(year, month - 1, 1);
  const dayOfWeek = date.getDay();

  if (weekStart === 'sun') {
    return dayOfWeek;
  } else {
    // Monday start: Sun(0) becomes 6, Mon(1) becomes 0, etc.
    return (dayOfWeek + 6) % 7;
  }
}

export interface CalendarDayCell {
  day: number | null; // null represents empty slot before 1st or after month end
  isHighlighted: boolean;
  highlightLabel?: string;
  highlightStyle?: 'heart' | 'circle' | 'star' | 'badge';
  highlightColor?: string;
}

export interface CalendarGridData {
  monthName: string;
  year: number;
  weekdays: readonly string[];
  weeks: CalendarDayCell[][];
  totalDays: number;
}

export function generateCalendarGrid(config: CalendarConfig): CalendarGridData {
  const { year, month, weekStart = 'sun', highlightedDates = [] } = config;
  const totalDays = getDaysInMonth(year, month);
  const startDayIndex = getStartingDayIndex(year, month, weekStart);
  const weekdays = weekStart === 'sun' ? WEEKDAYS_SUN_START : WEEKDAYS_MON_START;

  // Build a lookup for highlighted dates
  const highlightMap = new Map<number, (typeof highlightedDates)[0]>();
  for (const h of highlightedDates) {
    highlightMap.set(h.day, h);
  }

  const cells: CalendarDayCell[] = [];

  // Pad beginning
  for (let i = 0; i < startDayIndex; i++) {
    cells.push({ day: null, isHighlighted: false });
  }

  // Add month days
  for (let d = 1; d <= totalDays; d++) {
    const highlight = highlightMap.get(d);
    cells.push({
      day: d,
      isHighlighted: Boolean(highlight),
      highlightLabel: highlight?.label,
      highlightStyle: highlight?.style || 'heart',
      highlightColor: highlight?.color,
    });
  }

  // Pad end to complete the final week row
  while (cells.length % 7 !== 0) {
    cells.push({ day: null, isHighlighted: false });
  }

  // Split into rows of 7
  const weeks: CalendarDayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return {
    monthName: MONTH_NAMES[month - 1] || 'January',
    year,
    weekdays,
    weeks,
    totalDays,
  };
}
