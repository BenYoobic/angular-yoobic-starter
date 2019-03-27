export function getTelValidator(options) {
    return (tel) => {
        let TEL_REGEXP = /^[0-9+()\-]+$/;
        if (tel === null || !tel) {
            if (options && options.required) {
                return false;
            }
            else {
                return null;
            }
        }
        if (!tel) {
            return false;
        }
        if (!TEL_REGEXP.test(tel)) {
            return false;
        }
        return true;
    };
}
