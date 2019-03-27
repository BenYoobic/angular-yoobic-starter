import { startCase } from 'lodash-es';
export function getUserDisplayName(user) {
    if (user) {
        let displayName = user.username;
        if (user.firstName && user.lastName) {
            displayName = startCase(user.firstName.toString().toLowerCase()) + ' ' + startCase(user.lastName.toString().toLowerCase());
        }
        else if (user.email) {
            displayName = user.email;
        }
        return displayName;
    }
    return '';
}
export function convertItem(value) {
    return { _id: value };
}
