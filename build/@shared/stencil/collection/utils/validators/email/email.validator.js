export function getEmailValidator(options) {
    return (email) => {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
        if (email === null || !email) {
            if (options && options.required) {
                return false;
            }
            else {
                return null;
            }
        }
        if (!email) {
            return false;
        }
        if (email.length <= 5 || !EMAIL_REGEXP.test(email)) {
            return false;
        }
        return true;
    };
}
