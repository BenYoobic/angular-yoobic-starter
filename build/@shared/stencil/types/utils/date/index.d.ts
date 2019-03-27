export declare type ValidDate = Date | string | number;
export declare type CalendarDisplayMode = 'month' | 'week';
/**
 * Convert the given argument to an instance of Date
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations
 * If the function cannot parse the string, it returns Invalid Date.
 * @param value the value to convert
 * @param options optional Options object
 * @returns
 */
export declare function toDate(value: ValidDate): Date;
export declare function dateParse(dateString: string, formatString: string, baseDate?: any, options?: any): Date;
export declare function parseISO(value: ValidDate): number | Date;
/**
 * Return the formatted date string in the given format. Uses the current language locale
 * @param date the original date
 * @param formatStr the string of tokens
 * @returns the formatted date string
 */
export declare function dateFormat(date: ValidDate, formatStr: string): string;
export declare function getDateOfMonth(date: any): number;
/**
 * Get the day of the week of the given date.
 * @param date
 * @returns the day of week 1-7
 */
export declare function day(date: ValidDate): number;
export declare function dateIsValid(date: any): boolean;
export declare function isDateAfter(dateA: any, dateB: any): boolean;
export declare function isDateBefore(dateA: any, dateB: any): boolean;
export declare function setDateHours(date: any, quantity: number): Date;
export declare function setDateMinutes(date: any, quantity: number): Date;
export declare function setDateSeconds(date: any, quantity: number): Date;
export declare function setDateMilliseconds(date: any, quantity: number): Date;
export declare function dateAdd(date: ValidDate, type: string, amount: number): Date;
export declare function dateSub(date: ValidDate, type: string, amount: number): Date;
export declare function weekdaysShort(): Array<string>;
export declare function startOf(date: ValidDate, type: string): Date;
export declare function endOf(date: ValidDate, type: string): Date;
export declare function fromNow(date: ValidDate, options?: any): string;
export declare function utc(date?: Date): Date;
export declare function unix(date?: any): number;
export declare function getUTCOffset(date: Date): number;
export declare function dateDiff(dateA: any, dateB: any): number;
export declare function dateDiffInMinutes(dateA: any, dateB: any): number;
export declare function dateDiffInCalendarDays(dateA: any, dateB: any): number;
export declare function daysInMonth(date: ValidDate): number;
export declare function getYear(date: ValidDate): number;
export declare function getMonth(date: ValidDate): number;
export declare function getHours(date: ValidDate): number;
export declare function getMinutes(date: ValidDate): number;
export declare function toYears(milliseconds: number): number;
export declare function toMonths(milliseconds: number): number;
export declare function toWeeks(milliseconds: number): number;
export declare function toDays(milliseconds: number): number;
export declare function toHours(milliseconds: number): number;
export declare function toMinutes(milliseconds: number): number;
export declare function toSeconds(milliseconds: number): number;
export declare function isToday(date: Date): boolean;
export declare function isTomorrow(date: Date): boolean;
export declare function isYesterday(date: Date): boolean;
export declare function compareAsc(dateLeft: ValidDate, dateRight: ValidDate): number;
export declare function startOfMinute(date: ValidDate): Date;
export declare function formatDistanceFromNow(date: ValidDate, options?: any): string;
export declare function isSameDate(dateToCompare: Date, date: Date): boolean;
export declare function roundDateHours(newDate: Date): Date;
export declare function roundToNearestMinutes(date: ValidDate, interval: number): Date;
export declare function getRoundedMinutes(value: any): string | number;
export declare function resetTime(date: ValidDate): Date;
export declare function getPeriodOfDay(): string;
export declare function getFormattedCountDownToDisplay(numberSeconds: number): string;
export declare function requestInterval(fn: any, delay: any): any;
