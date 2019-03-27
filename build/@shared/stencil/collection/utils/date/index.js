import { format, parse, toDate as _toDate, isValid, addYears, addMonths, addWeeks, addDays, addHours, addMinutes, addSeconds, subYears, subMonths, subWeeks, subDays, subHours, subMinutes, subSeconds, eachDayOfInterval, isAfter, isBefore, startOfYear, startOfMonth, startOfWeek, startOfDay, endOfYear, endOfMonth, endOfWeek, endOfDay, setHours, setMinutes, setSeconds, setMilliseconds, formatDistance, differenceInMilliseconds, differenceInCalendarDays, differenceInMinutes, getDate, getDaysInMonth, getTime, getYear as _getYear, getMonth as _getMonth, getDay as _getDay, getHours as _getHours, getMinutes as _getMinutes, compareAsc as _compareAsc, startOfMinute as _startOfMinute, formatDistance as _formatDistance, parseISO as _parseISO } from 'date-fns/esm';
import { enGB, enUS, fr, de, es, nl, /*pl,*/ it, ru, zhCN, /*zhTW,*/ pt, ptBR, /*ko,*/ ja, uk, he, /*ar, cs, th, tr, bg,*/ el /*sk, sl*/ } from 'date-fns/esm/locale';
import { getCurrentLanguage } from '../translate';
import { isString } from 'lodash-es';
let locales = {
    en: enGB,
    us: enUS,
    fr,
    de,
    es,
    nl,
    pl: enGB,
    it,
    ru,
    zhs: zhCN,
    zht: enGB,
    kr: enGB,
    ja,
    ua: uk,
    he,
    ar: enGB,
    cz: enGB,
    th: enGB,
    tr: enGB,
    bg: enGB,
    gr: el,
    sl: enGB,
    sk: enGB,
    pt,
    br: ptBR
};
/**
 * Convert the given argument to an instance of Date
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations
 * If the function cannot parse the string, it returns Invalid Date.
 * @param value the value to convert
 * @param options optional Options object
 * @returns
 */
export function toDate(value) {
    return _toDate(parseISO(value));
}
export function dateParse(dateString, formatString, baseDate, options) {
    return parse(dateString, formatString, baseDate || new Date(), Object.assign({}, (options || {}), { awareOfUnicodeTokens: true }));
}
export function parseISO(value) {
    if (isString(value)) {
        return _parseISO(value);
    }
    return value;
}
/**
 * Return the formatted date string in the given format. Uses the current language locale
 * @param date the original date
 * @param formatStr the string of tokens
 * @returns the formatted date string
 */
export function dateFormat(date, formatStr) {
    if (formatStr === 'L') {
        formatStr = 'dd/MM/YYYY';
    }
    else if (formatStr === 'Ld') {
        formatStr = 'YYYY-MM-dd HH:mm';
    }
    else if (formatStr === 'L LT') {
        formatStr = 'dd/MM/YYYY HH:mm';
    }
    else if (formatStr === 'Pp') {
        formatStr = 'dd/MM/YYYY h:mm a';
    }
    else if (formatStr === 'LT') {
        formatStr = 'HH:mm';
    }
    else if (formatStr === 'LTP') {
        formatStr = 'h:mm a';
    }
    else if (formatStr === 'D') {
        formatStr = 'd MMM';
    }
    else if (formatStr === 'DM') {
        formatStr = 'dd/MM';
    }
    return format(toDate(date), formatStr, {
        locale: locales[getCurrentLanguage()],
        awareOfUnicodeTokens: true
    });
}
export function getDateOfMonth(date) {
    return getDate(date);
}
/**
 * Get the day of the week of the given date.
 * @param date
 * @returns the day of week 1-7
 */
export function day(date) {
    return _getDay(toDate(date));
}
export function dateIsValid(date) {
    return isValid(parseISO(date));
}
export function isDateAfter(dateA, dateB) {
    return isAfter(toDate(dateA), toDate(dateB));
}
export function isDateBefore(dateA, dateB) {
    return isBefore(toDate(dateA), toDate(dateB));
}
export function setDateHours(date, quantity) {
    return setHours(parseISO(date), quantity);
}
export function setDateMinutes(date, quantity) {
    return setMinutes(parseISO(date), quantity);
}
export function setDateSeconds(date, quantity) {
    return setSeconds(parseISO(date), quantity);
}
export function setDateMilliseconds(date, quantity) {
    return setMilliseconds(parseISO(date), quantity);
}
export function dateAdd(date, type, amount) {
    date = toDate(date || new Date());
    switch (type.toLowerCase()) {
        case 'years':
        case 'year':
        case 'y':
            return addYears(date, amount);
        case 'months':
        case 'month':
        case 'm':
            return addMonths(date, amount);
        case 'weeks':
        case 'week':
        case 'w':
            return addWeeks(date, amount);
        case 'days':
        case 'day':
        case 'd':
            return addDays(date, amount);
        case 'hours':
        case 'hour':
        case 'h':
            return addHours(date, amount);
        case 'minutes':
        case 'minute':
        case 'mm':
            return addMinutes(date, amount);
        case 'seconds':
        case 'second':
        case 's':
            return addSeconds(date, amount);
        default:
            throw new Error('type ' + type + ' not supported');
    }
}
export function dateSub(date, type, amount) {
    date = toDate(date || new Date());
    switch (type.toLowerCase()) {
        case 'years':
        case 'year':
        case 'y':
            return subYears(date, amount);
        case 'months':
        case 'month':
        case 'm':
            return subMonths(date, amount);
        case 'weeks':
        case 'week':
        case 'w':
            return subWeeks(date, amount);
        case 'days':
        case 'day':
        case 'd':
            return subDays(date, amount);
        case 'hours':
        case 'hour':
        case 'h':
            return subHours(date, amount);
        case 'minutes':
        case 'minute':
        case 'mm':
            return subMinutes(date, amount);
        case 'seconds':
        case 'second':
        case 's':
            return subSeconds(date, amount);
        default:
            throw new Error('type ' + type + ' not supported');
    }
}
export function weekdaysShort() {
    const now = new Date();
    let days = eachDayOfInterval({ start: startOfWeek(now, { locale: locales[getCurrentLanguage()] }), end: endOfWeek(now, { locale: locales[getCurrentLanguage()] }) });
    return days.map(d => format(d, 'eeeeee', { locale: locales[getCurrentLanguage()], awareOfUnicodeTokens: true }));
}
export function startOf(date, type) {
    date = toDate(date || new Date());
    switch (type.toLowerCase()) {
        case 'years':
        case 'year':
        case 'y':
            return startOfYear(date);
        case 'months':
        case 'month':
        case 'm':
            return startOfMonth(date);
        case 'weeks':
        case 'week':
        case 'w':
            return startOfWeek(date, { locale: locales[getCurrentLanguage()] });
        case 'days':
        case 'day':
        case 'd':
            return startOfDay(date);
    }
}
export function endOf(date, type) {
    date = toDate(date || new Date());
    switch (type.toLowerCase()) {
        case 'years':
        case 'year':
        case 'y':
            return endOfYear(date);
        case 'months':
        case 'month':
        case 'm':
            return endOfMonth(date);
        case 'weeks':
        case 'week':
        case 'w':
            return endOfWeek(date, { locale: locales[getCurrentLanguage()] });
        case 'days':
        case 'day':
        case 'd':
            return endOfDay(date);
    }
}
export function fromNow(date, options) {
    options = options || {};
    options.addSuffix = true;
    return formatDistance(toDate(date), new Date(), Object.assign({}, (options || {}), { awareOfUnicodeTokens: true, locale: locales[getCurrentLanguage()] }));
}
export function utc(date) {
    date = date || new Date();
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
export function unix(date) {
    date = date || new Date();
    return getTime(date);
}
export function getUTCOffset(date) {
    return date.getTimezoneOffset(); // not sure === moment(date).utcOffset()
}
export function dateDiff(dateA, dateB) {
    return differenceInMilliseconds(toDate(dateA), toDate(dateB));
}
export function dateDiffInMinutes(dateA, dateB) {
    return differenceInMinutes(toDate(dateA), toDate(dateB));
}
export function dateDiffInCalendarDays(dateA, dateB) {
    return differenceInCalendarDays(toDate(dateA), toDate(dateB));
}
export function daysInMonth(date) {
    return getDaysInMonth(toDate(date));
}
export function getYear(date) {
    return _getYear(toDate(date));
}
export function getMonth(date) {
    return _getMonth(toDate(date));
}
export function getHours(date) {
    return _getHours(toDate(date));
}
export function getMinutes(date) {
    return _getMinutes(toDate(date));
}
export function toYears(milliseconds) {
    return toMonths(milliseconds) / 12;
}
export function toMonths(milliseconds) {
    return toWeeks(milliseconds) / 4;
}
export function toWeeks(milliseconds) {
    return toDays(milliseconds) / 7;
}
export function toDays(milliseconds) {
    return toHours(milliseconds) / 24;
}
export function toHours(milliseconds) {
    return toMinutes(milliseconds) / 60;
}
export function toMinutes(milliseconds) {
    return toSeconds(milliseconds) / 60;
}
export function toSeconds(milliseconds) {
    return milliseconds / 1000;
}
export function isToday(date) {
    return dateFormat(date, 'DD MM YY') === dateFormat(new Date(), 'DD MM YY');
}
export function isTomorrow(date) {
    return dateFormat(date, 'DD MM YY') === dateFormat(dateAdd(new Date(), 'days', 1), 'DD MM YY');
}
export function isYesterday(date) {
    return dateFormat(date, 'DD MM YY') === dateFormat(dateAdd(new Date(), 'days', -1), 'DD MM YY');
}
export function compareAsc(dateLeft, dateRight) {
    return _compareAsc(toDate(dateLeft), toDate(dateRight));
}
export function startOfMinute(date) {
    return _startOfMinute(toDate(date));
}
export function formatDistanceFromNow(date, options = {}) {
    return _formatDistance(toDate(date), new Date(), Object.assign(options, { locale: locales[getCurrentLanguage()] }));
}
// Custom Functions
export function isSameDate(dateToCompare, date) {
    return dateFormat(dateToCompare, 'DD MM YY') === dateFormat(date, 'DD MM YY');
}
export function roundDateHours(newDate) {
    let newDateMinutes = getMinutes(newDate);
    if (!(newDateMinutes % 5 === 0)) {
        if (newDateMinutes > 30) {
            // round up to next hour
            newDate = dateAdd(newDate, 'h', 1);
            newDate = dateSub(newDate, 'mm', newDateMinutes);
        }
        else {
            newDate = dateSub(newDate, 'mm', newDateMinutes);
        }
    }
    return newDate;
}
export function roundToNearestMinutes(date, interval) {
    let roundedMinutes = Math.ceil(getMinutes(date) / interval) * interval;
    return setMinutes(startOfMinute(date), roundedMinutes);
}
export function getRoundedMinutes(value) {
    let minutes = getMinutes(value);
    if (minutes % 5 === 0) {
        let minutesToDisplay = minutes.toString();
        if (minutes < 10) {
            // Add a 0 in front e.g. 04, 06
            minutesToDisplay = `0${minutesToDisplay}`;
            return minutesToDisplay;
        }
        return minutes;
    }
    let roundedDate = roundToNearestMinutes(value, 5);
    return getMinutes(roundedDate);
}
export function resetTime(date) {
    date = setDateHours(date, 0);
    date = setDateMinutes(date, 0);
    date = setDateSeconds(date, 0);
    date = setDateMilliseconds(date, 0);
    return date;
}
export function getPeriodOfDay() {
    let now = new Date();
    if (now.getHours() >= 0 && now.getHours() < 12) {
        return 'MORNING';
    }
    else if (now.getHours() <= 17) {
        return 'AFTERNOON';
    }
    else {
        return 'EVENING';
    }
}
export function getFormattedCountDownToDisplay(numberSeconds) {
    const NUMBER_SECONDS_HOUR = 3600;
    const NUMBER_SECONDS_MINUTE = 60;
    let minutes = Math.floor((numberSeconds % NUMBER_SECONDS_HOUR) / NUMBER_SECONDS_MINUTE);
    let seconds = Math.floor((numberSeconds % NUMBER_SECONDS_HOUR) % NUMBER_SECONDS_MINUTE);
    let dseconds = seconds > 0 && seconds < 10 && minutes > 0 ? `0${seconds}s` : seconds > 0 ? `${seconds}s` : '';
    let dminutes = minutes > 0 ? (minutes > 1 ? `${minutes}mins` : `${minutes}min`) : '';
    return `${dminutes}${dseconds}`;
}
export function requestInterval(fn, delay) {
    let requestAnimFrame = (() => {
        return (window.requestAnimationFrame ||
            (callback => {
                window.setTimeout(callback, 1000 / 60);
            }));
    })(), start = new Date().getTime(), handle = {};
    function loop() {
        handle['value'] = requestAnimFrame(loop);
        let current = new Date().getTime(), delta = current - start;
        if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
        }
    }
    handle['value'] = requestAnimFrame(loop);
    return handle;
}
