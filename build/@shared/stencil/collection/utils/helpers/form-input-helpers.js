import { FormFieldType } from '../../interfaces';
import { getReducedValidator, getReducedAsyncValidator } from '../validators';
import { isPresent, querySelectorDeep, querySelectorAllDeep, getActiveElementShadow } from './common-helpers';
import { dateIsValid, toDate, dateFormat, dateAdd, dateSub } from '../date';
import { isCordova, isIOS, isAndroid } from '../config';
let inputBlur = true;
export function setValidator(inputElement, type, validateInput = true) {
    let _validator = getReducedValidator(inputElement.validators);
    let _asyncValidator = getReducedAsyncValidator(inputElement.asyncValidators);
    inputElement._validator = _validator;
    inputElement._asyncValidator = _asyncValidator;
    //we call this to validate the initial value - should only be called if there is an initial value
    if ((inputElement.value || type === FormFieldType.checklist) && validateInput) {
        validate(inputElement, type === FormFieldType.checklist);
    }
}
export function parseNumber(value) {
    let isTypingNumber = value.endsWith('.');
    if (isTypingNumber) {
        return value;
    }
    let val = parseFloat(value);
    return isNaN(val) ? value : val;
}
export function parseStringToNumber(value) {
    let matchedString = /^\-?\d*((\.|\,)\d*)?/.exec(value);
    let val;
    if (matchedString && Array.isArray(matchedString) && matchedString[0].length > 0) {
        val = matchedString[0];
    }
    else {
        val = '';
    }
    return val;
}
function clearContainer(container) {
    container.classList.remove('invalid');
    container.classList.remove('valid');
}
function clearInvalidMessage(inputElement) {
    if (querySelectorDeep(inputElement.host, '.invalid-message')) {
        querySelectorDeep(inputElement.host, '.invalid-message').classList.remove('invalid');
    }
}
function clearDecorator(inputElement, borderContainerSelector = '.input-container') {
    setTimeout(() => {
        clearFocused(inputElement, borderContainerSelector);
        let container = querySelectorDeep(inputElement.host, borderContainerSelector);
        let iconContainer = querySelectorDeep(inputElement.host, '.valid-icon');
        if (container) {
            clearContainer(container);
            if (iconContainer) {
                iconContainer.classList.remove('valid');
            }
        }
        clearInvalidMessage(inputElement);
    }, 150);
}
function focusIcons(inputElement, borderContainerSelector = '.input-container') {
    clearInvalidMessage(inputElement);
    if (querySelectorDeep(inputElement.host, borderContainerSelector)) {
        querySelectorDeep(inputElement.host, borderContainerSelector).classList.add('focused');
    }
    if (querySelectorDeep(inputElement.host, '.valid-icon')) {
        querySelectorDeep(inputElement.host, '.valid-icon').classList.remove('valid');
    }
    let iconContainers = querySelectorAllDeep(inputElement.host, '.icon-suffix-focus');
    if (iconContainers[0]) {
        iconContainers[0].classList.add('focused');
    }
    if (iconContainers[1]) {
        iconContainers[1].classList.add('focused');
    }
}
function convertTimeToDate(timestr) {
    let currentDate = new Date();
    let time = timestr.split(':');
    currentDate.setHours(time[0]);
    currentDate.setMinutes(time[1]);
    return currentDate;
}
export function convertValueForInputType(v, type) {
    switch (type) {
        case FormFieldType.number:
        case FormFieldType.range: {
            return parseNumber(v);
        }
        case FormFieldType.date:
        case FormFieldType.datetime: {
            if (!isPresent(v)) {
                return null;
            }
            return dateIsValid(v) ? toDate(v).toISOString() : null;
        }
        case FormFieldType.time: {
            if (!isPresent(v)) {
                return null;
            }
            // When using native date picker we don't need to convert this value
            if (!isCordova()) {
                v = convertTimeToDate(v);
            }
            return dateIsValid(v) ? toDate(v).toISOString() : v;
        }
        default:
            return v;
    }
}
export function getTimeDisplayValue(value, is24Hour) {
    if (!isPresent(value)) {
        return null;
    }
    else {
        return dateIsValid(value) ? (is24Hour ? dateFormat(value, 'HH:mm') : dateFormat(value, 'h:mm a')) : value;
    }
}
export function formatMinMaxDate(minDate, maxDate) {
    if (isIOS()) {
        minDate = minDate ? minDate : dateSub(null, 'years', 100);
        maxDate = maxDate ? maxDate : dateAdd(null, 'years', 100);
    }
    else if (isAndroid()) {
        // Needs to be a millisecond precision unix timestamp (number)
        minDate = minDate ? new Date(minDate).getTime() : dateSub(null, 'years', 100).getTime();
        maxDate = maxDate ? new Date(maxDate).getTime() : dateAdd(null, 'years', 100).getTime();
    }
    return { minDate, maxDate };
}
export function blurActiveElement(event) {
    if (event && event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
        // The HTML input is focused so we need to blur it for the date picker to appear
        let activeElement = getActiveElementShadow();
        if (activeElement.tagName === 'INPUT') {
            activeElement.blur();
        }
    }
}
export function onValidityChanged(ev, inputElement) {
    ev.stopPropagation();
    inputElement.validity = ev.detail;
}
export function onFocus(ev, inputElement) {
    let inputEl = inputElement.host ? inputElement.host.querySelector('input') : null;
    if (inputEl) {
        inputEl.focus();
    }
    if (ev && ev.target && ev.target.value) {
        inputElement.iconClicked.emit(ev.target.value);
    }
}
export function onInputFocused(ev, inputElement, borderContainerSelector = '.input-container', type = 'text') {
    inputElement.inputFocused.emit(inputElement);
    focusIcons(inputElement, borderContainerSelector);
}
export function onInputBlurred(ev, inputElement, borderContainerSelector = '.input-container', type = 'text', validation = { valid: true, invalid: true }) {
    inputBlur = true;
    inputElement.inputBlurred.emit(ev);
    let isValue = inputElement.value || inputElement.value === 0;
    setTimeout(() => {
        if (inputBlur) {
            clearFocused(inputElement, borderContainerSelector);
            if (validation) {
                let container = querySelectorDeep(inputElement.host, borderContainerSelector);
                let iconContainer = querySelectorDeep(inputElement.host, '.valid-icon');
                if (container) {
                    clearContainer(container);
                    if (iconContainer) {
                        iconContainer.classList.remove('valid');
                    }
                    if (isValue && !inputElement.validity && type !== 'text') {
                        if (validation.invalid) {
                            container.classList.add('invalid');
                            if (querySelectorDeep(inputElement.host, '.invalid-message')) {
                                querySelectorDeep(inputElement.host, '.invalid-message').classList.add('invalid');
                            }
                        }
                    }
                    else if (isValue && (inputElement.validity || inputElement.borderColor) && type !== 'text') {
                        if (validation.valid) {
                            container.classList.add('valid');
                            if (iconContainer) {
                                iconContainer.classList.add('valid');
                            }
                        }
                    }
                }
            }
        }
    }, 150);
}
function clearFocused(inputElement, borderContainerSelector) {
    let iconContainers = querySelectorAllDeep(inputElement.host, '.icon-suffix-focus');
    if (querySelectorDeep(inputElement.host, borderContainerSelector)) {
        querySelectorDeep(inputElement.host, borderContainerSelector).classList.remove('focused');
    }
    if (iconContainers[0]) {
        iconContainers[0].classList.remove('focused');
    }
    if (iconContainers[1]) {
        iconContainers[1].classList.remove('focused');
    }
}
export function onInputClear(ev, inputElement, borderContainerSelector = '.input-container') {
    setValueAndValidateInput(null, inputElement, true);
    if (inputElement && inputElement.iconClicked) {
        inputElement.iconClicked.emit('clear');
    }
    inputBlur = false;
    clearDecorator(inputElement, borderContainerSelector);
}
export function onIconClicked(icon, inputElement, isCordovaAndroid) {
    inputElement.iconClicked.emit(icon);
    let input = querySelectorDeep(inputElement.host, 'input');
    input.focus();
    inputBlur = false;
    if (isCordovaAndroid) {
        setTimeout(() => {
            Keyboard.show();
        }, 400);
    }
}
export async function validate(inputElement, forceNullValidation = false) {
    if (inputElement.validate && typeof inputElement.validate === 'function') {
        return inputElement.validate();
    }
    if (inputElement._validator) {
        let currentValidity = true;
        let externalLinkedElement = null;
        if (!isNullOrUndefined(inputElement.value) || (inputElement.validators && inputElement.validators.every(v => v.name === 'required')) || forceNullValidation) {
            if (inputElement.externalValidators && inputElement.externalValidators[0]) {
                externalLinkedElement = await getExternalElement(inputElement, inputElement.externalValidators[0].externalFieldName);
                inputElement = setInputElementValidatorOptions(inputElement, externalLinkedElement);
                setValidator(inputElement, null, false);
            }
            currentValidity = inputElement._validator(inputElement.value);
        }
        if (inputElement.validity !== currentValidity) {
            inputElement.validity = currentValidity; // update the validity
            inputElement.validityChanged.emit(currentValidity);
        }
        if (externalLinkedElement) {
            externalLinkedElement = setInputElementValidatorOptions(externalLinkedElement, inputElement);
            setValidator(externalLinkedElement, null, false);
            let externalElementValidity = externalLinkedElement._validator(externalLinkedElement.value);
            externalLinkedElement.validity = externalElementValidity;
            externalLinkedElement.validityChanged.emit(externalElementValidity);
        }
    }
}
export function setValueAndValidateInput(value, inputElement, forceNullValidation = false, validateInput = true) {
    inputElement.value = value;
    if (validateInput) {
        validate(inputElement, forceNullValidation);
    }
    if (inputElement.inputChanged) {
        inputElement.inputChanged.emit(inputElement.value);
    }
}
export function taskStyle(finished) {
    let icon = 'yo-circle';
    let taskClass = '';
    let breakText = '';
    if (finished) {
        if (finished.value) {
            icon = 'yo-check';
            taskClass = 'success';
        }
        else if (!finished.value) {
            icon = 'yo-cross';
            taskClass = 'danger';
        }
        breakText = 'break-text';
    }
    return { icon: icon, style: taskClass, breakText: breakText };
}
export function getFormBottomPosition(formDynamic) {
    let formDynamicToolbar = formDynamic ? (formDynamic.shadowRoot || formDynamic).querySelector('.slide-container > .toolbar') : null;
    let slideContainer = formDynamic ? (formDynamic.shadowRoot || formDynamic).querySelector('.slide-container') : null;
    let formDynamicBottom = formDynamic ? (formDynamicToolbar ? formDynamicToolbar.getBoundingClientRect().top : slideContainer ? slideContainer.getBoundingClientRect().bottom : 0) : 0;
    return formDynamicBottom;
}
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
export function setInputElementValidatorOptions(inputElement, externalElement) {
    let externalValue;
    if (externalElement) {
        externalValue = externalElement.value;
    }
    inputElement.validators = inputElement.validators.map(v => {
        let validator = v;
        if (validator.name !== 'required') {
            validator.options.externalValue = externalValue;
        }
        return validator;
    });
    return inputElement;
}
async function getExternalElement(inputElement, externalFieldName) {
    let externalElement;
    let formInputContainer = inputElement ? inputElement.inputContainer : undefined;
    let formContainer = formInputContainer ? formInputContainer.parentElement.parentElement : undefined;
    if (inputElement && inputElement.contentParent && formContainer) {
        let externalElementHost = querySelectorDeep(formContainer, `[attr-name=f-${externalFieldName}]`);
        externalElement = await externalElementHost.getElement();
    }
    return externalElement;
}
