import { isArray } from 'lodash-es';
export function getMultiphotosValidator(options) {
    return (values) => {
        if (!options.required) {
            return true;
        }
        else if (!values) {
            return false;
        }
        else if (options.min && options.min > values.length) {
            return false;
        }
        else if (options.max && options.max < values.length) {
            return false;
        }
        else if (options.isImageRecognition && !(options.extraData && options.extraData.imageRecognitionResults)) {
            return false;
        }
        else {
            let validation = true;
            if (isArray(values)) {
                values.forEach(value => {
                    if (value === null) {
                        validation = false;
                    }
                });
            }
            else {
                if (values === null || values === '') {
                    validation = false;
                }
            }
            return validation;
        }
    };
}
