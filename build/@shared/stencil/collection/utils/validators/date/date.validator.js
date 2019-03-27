import { compareAsc, isSameDate } from '../../date';
export function getDateValidator(options, withTime) {
    return (val) => {
        if (val === null || val === undefined || !val) {
            if (options.required || (options.rule === 'lower' && options.externalValue)) {
                return false;
            }
            else {
                return true;
            }
        }
        if (options.externalValue) {
            if (!withTime && isSameDate(val, options.externalValue)) {
                return true;
            }
            if (options.rule === 'higher') {
                return compareAsc(val, options.externalValue) >= 0;
            }
            else if (options.rule === 'equal') {
                return compareAsc(val, options.externalValue) === 0;
            }
            else if (options.rule === 'lower') {
                return compareAsc(val, options.externalValue) <= 0;
            }
        }
        return true;
    };
}
