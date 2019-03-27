export const requiredValidator = (value) => {
    if (value === undefined || value === null) {
        return false;
    }
    else if (value === '' || value.length === 0) {
        return false;
    }
    return true;
};
