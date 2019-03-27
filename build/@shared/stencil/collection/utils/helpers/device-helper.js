import MobileDetect from 'mobile-detect';
const md = new MobileDetect(window.navigator.userAgent);
export function getGrade() {
    return md.mobileGrade();
}
export function getOS() {
    return md.os();
}
export function getDeviceType() {
    return md.phone() || md.tablet() || 'web';
}
