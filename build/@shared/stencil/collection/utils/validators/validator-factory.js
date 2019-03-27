import { getEmailValidator } from './email/email.validator';
import { getTelValidator } from './tel/tel.validator';
import { requiredValidator } from './required/required.validator';
import { getNumberValidator } from './number/number.validator';
import { getMultiphotosValidator } from './multiphotos/multiphotos.validator';
import { getChecklistValidator } from './checklist/checklist.validator';
import { getDateValidator } from './date/date.validator';
export const VALIDATORS = {
    email: 'email',
    tel: 'tel',
    number: 'number',
    text: 'text',
    password: 'password',
    multiphotos: 'multiphotos',
    checklist: 'checklist',
    required: 'required',
    date: 'date',
    datetime: 'datetime-local',
    time: 'time'
};
export function validatorFactory(entry) {
    switch (entry.name) {
        case VALIDATORS.email:
            return getEmailValidator(entry.options);
        case VALIDATORS.tel:
            return getTelValidator(entry.options);
        case VALIDATORS.number:
            return getNumberValidator(entry.options);
        case VALIDATORS.multiphotos:
            return getMultiphotosValidator(entry.options);
        case VALIDATORS.checklist:
            return getChecklistValidator(entry.options);
        case VALIDATORS.required:
        case VALIDATORS.text:
        case VALIDATORS.password:
            return requiredValidator;
        case VALIDATORS.date:
            return getDateValidator(entry.options, false);
        case VALIDATORS.datetime:
        case VALIDATORS.time:
            return getDateValidator(entry.options, true);
        default:
            return null;
    }
}
function isValidEntry(entry) {
    return entry && entry.name && typeof entry.name === 'string' && validatorFactory(entry) ? true : false;
}
export function getValidator(validator) {
    return isValidEntry(validator) ? validatorFactory(validator) : validator;
}
export function combineValidators(x, y) {
    return (a) => x(a) && y(a);
}
export function getReducedValidator(validators) {
    return (validators || []).map(item => getValidator(item)).reduce(combineValidators, (a) => true);
}
