import { Device } from '@ionic-native/device';
import { isFullScreenFalse } from '../ionic/overlays';
export function isAnimationsDisabled() {
    return false;
}
export function isIonic() {
    return window.DesignSystem && window.DesignSystem.config && window.DesignSystem.config._isIonic;
}
export function setIsIonic(value) {
    if (window.DesignSystem && window.DesignSystem.config) {
        window.DesignSystem.config._isIonic = value;
    }
}
export function isWeb() {
    return window.DesignSystem && window.DesignSystem.config && window.DesignSystem.config._isWeb;
}
export function setIsWeb(value) {
    if (window.DesignSystem && window.DesignSystem.config) {
        window.DesignSystem.config._isWeb = value;
    }
}
export function isCordova() {
    return !!(typeof window !== 'undefined' && window && window.cordova);
}
export function isIOS() {
    return testUserAgent(window, /iPad|iPhone|iPod/i);
}
export function isIOS9() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        let v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        let major = parseInt(v[1], 10);
        return major <= 9;
    }
    return false;
}
export function isAndroid() {
    return !isIOS();
}
export function isChrome() {
    return window && !!window.chrome;
}
export function isSafari() {
    return window && window.navigator && window.navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent.indexOf('CriOS') === -1 && navigator.userAgent.indexOf('FxiOS') === -1;
}
export function isWKWebView() {
    return isCordova() && window.Ionic && window.Ionic.WebView; //isIOS() && (<any>window).webkit;
}
export function isElectron() {
    return testUserAgent(window, /electron/) || (typeof window !== 'undefined' && window.process && window.process.type === 'renderer');
}
export function isPixel() {
    return Device.model.startsWith('Pixel');
}
export function isXiaoMi() {
    if (Device && Device.manufacturer) {
        return Device.manufacturer === 'Xiaomi';
    }
    return false;
}
export function isPixelOne() {
    return Device.model === 'Pixel';
}
export function getProtocol() {
    let protocol = isCordova() || isElectron() ? 'https:' : window.location.protocol;
    return protocol;
}
export function isIphoneX() {
    return isFullScreenFalse() || (isCordova() && Device && Device.model && (Device.model.startsWith('iPhone10,3') || Device.model.startsWith('iPhone10,6') || Device.model.startsWith('iPhone11,2') || Device.model.startsWith('iPhone11,4') || Device.model.startsWith('iPhone11,6') || Device.model.startsWith('iPhone11,8')));
}
export function isIphoneSE() {
    return isCordova() && Device && Device.model && Device.model.startsWith('iPhone8,4');
}
export function isIphone5() {
    return isCordova() && Device && Device.model && (Device.model.startsWith('iPhone5,2') || Device.model.startsWith('iPhone6,1') || Device.model.startsWith('iPhone6,2') || Device.model.startsWith('iPhone5,1'));
}
export function isIE() {
    return typeof window !== 'undefined' && window && window.navigator && window.navigator.userAgent && (window.navigator.userAgent.search('MSIE ') >= 0 || window.navigator.userAgent.search('Edge') >= 0);
}
export function isIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
}
export function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
}
export function isSamsung() {
    if (isCordova() && Device && Device.model) {
        let modelRegex = new RegExp('SM-');
        return modelRegex.test(Device.model) ? true : false;
    }
    return false;
}
export function isZebraScanner() {
    if (isCordova()) {
        return (Device.manufacturer && Device.manufacturer.toLowerCase().includes('zebra')) || (Device.manufacturer && Device.manufacturer.toLowerCase().includes('motorola solutions'));
    }
    else {
        return false;
    }
}
export function isSurface() {
    return window && window.navigator && window.navigator.platform && window.navigator.platform.toLowerCase().startsWith('win') && window.navigator.maxTouchPoints > 1;
}
export function testUserAgent(win, expr) {
    return expr.test(win.navigator.userAgent);
}
export function isCapacitorNative() {
    const win = window;
    const capacitor = win['Capacitor'];
    return !!(capacitor && capacitor.isNative);
}
export function isTablet() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return smallest > 460 && smallest < 1025 && (largest > 780 && largest < 1400);
}
export function isPhablet() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return smallest > 390 && smallest < 520 && (largest > 620 && largest < 800);
}
export function setupConfig(customConfig, collection) {
    const win = window;
    const lib = win[collection];
    if (lib && lib.config && lib.config.constructor.name !== 'Object') {
        return;
    }
    win[collection] = win[collection] || {};
    win[collection].config = Object.assign({}, win[collection].config, customConfig);
    return win[collection].config;
}
