import { isNumber } from 'lodash-es';
export function getNumberValidator(options) {
    return (val) => {
        let externalValidity = options.externalValidation ? false : true;
        let inputValidity = true;
        if (options.externalValidation) {
            if (val === null || undefined || (options.externalValue === null || undefined)) {
                externalValidity = false;
            }
            else {
                switch (options.rule) {
                    case 'higher':
                        externalValidity = val > options.externalValue;
                        break;
                    case 'equal':
                        externalValidity = val === options.externalValue;
                        break;
                    case 'lower':
                        externalValidity = val < options.externalValue;
                        break;
                }
            }
        }
        if (val === null || (!val && val !== 0)) {
            if (options && options.required) {
                inputValidity = false;
            }
            else {
                inputValidity = null;
            }
        }
        else if (typeof val !== 'number') {
            inputValidity = false;
        }
        else if (isNumber(options.min) && isNumber(options.max)) {
            inputValidity = val < options.min || val > options.max ? false : true;
        }
        else if (isNumber(options.min)) {
            inputValidity = val < options.min ? false : true;
        }
        else if (isNumber(options.max)) {
            inputValidity = val > options.max ? false : true;
        }
        return inputValidity && externalValidity;
    };
}
