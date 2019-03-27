import Polyglot from 'node-polyglot';
if (!window.polyglot) {
    window.polyglot = new Polyglot({
        allowMissing: true,
        interpolation: { prefix: '{{', suffix: '}}' }
    });
    // tslint:disable-next-line:no-console
    console.log('polyglot is init');
}
export function translate(key, params) {
    if (key && typeof key === 'string') {
        return window.polyglot.t(key, params);
    }
    return '';
}
export function loadTranslations(translations) {
    window.polyglot.extend(translations);
}
export function translateMulti(value, params) {
    if (value && value.replace && value.indexOf('%') >= 0) {
        return value.replace(/%(\w+)%/g, (match, key) => {
            return translate(key, params);
        });
    }
    if (value && value.toUpperCase && value.toUpperCase() === value) {
        return translate(value, params);
    }
    return value;
}
export function getCurrentLanguage() {
    return window.yooCurrentLanguage;
}
export function setCurrentLanguage(l) {
    window.yooCurrentLanguage = l;
}
export function isCurrentLanguageChinese() {
    return ['zhs'].indexOf(getCurrentLanguage()) >= 0;
}
