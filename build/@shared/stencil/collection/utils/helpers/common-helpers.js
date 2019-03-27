import { Clipboard } from '@ionic-native/clipboard';
import postscribe from 'postscribe';
import { isString } from 'lodash-es';
import { ResizeObserver } from './resize-helpers';
import { translate } from '../translate';
import { getProtocol, isWKWebView, isCordova, isWeb, isIphoneX, isIOS, isAndroid } from '../config';
import { setAnimation, animations } from '../anim';
let loading;
let isModalDismissing = false;
export function loadScript(url) {
    return new Promise((resolve, reject) => {
        let element = document.getElementsByTagName('head')[0];
        let html = `<script async type=text/javascript src=${url}></script>`;
        postscribe(element, html, {
            done: () => {
                resolve(true);
            },
            error: e => {
                reject(e);
            }
        });
    });
}
export function cleanupWKWebViewImagePath(value) {
    if (isWKWebView()) {
        return window.Ionic.WebView.convertFileSrc(value);
    }
    return value;
}
export function getScreenWidth() {
    if (window && window.innerWidth) {
        return window.innerWidth;
    }
    return null;
}
export function getScreenHeight() {
    if (window && window.innerHeight) {
        return window.innerHeight;
    }
    return null;
}
export function replaceSuffix(url, newSuffix) {
    if (url && url.split && url.replace) {
        let splitArr = url.split('.');
        let suffix = splitArr[splitArr.length - 1];
        if (suffix) {
            return url.replace('.' + suffix, newSuffix);
        }
        else {
            return url;
        }
    }
    return url;
}
export function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
}
export function debounce(func, wait = 500, immediate = false) {
    let timeout;
    return function (...args) {
        let context = this;
        let later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}
export function resizeObserve(target, callback) {
    let ro = new ResizeObserver(entries => {
        for (const entry of entries) {
            const { left, top, width, height } = entry.contentRect;
            callback(entry.target, width, height, left, top, entry);
        }
    });
    ro.observe(target);
    return ro;
}
export function intersectionObserve(target, callback, options) {
    let io = new IntersectionObserver(callback, options);
    io.observe(target);
    return io;
}
export function execHandlerAndStopEvent(event, handler) {
    event.stopPropagation();
    if (handler) {
        handler();
    }
}
export function isBlank(obj) {
    return obj === undefined || obj === null;
}
export function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
export function getSizeModal(host, maxHeight, customName) {
    let body = findParent(host, '.modal-body');
    let customTag = findParent(host, customName);
    let ionModal = findParent(host, '.modal-wrapper');
    if (customTag) {
        maxHeight = Math.min(maxHeight, customTag.clientHeight);
    }
    else if (body) {
        maxHeight = Math.min(maxHeight, body.clientHeight);
    }
    else {
        if (ionModal) {
            maxHeight = Math.min(maxHeight, ionModal.clientHeight);
        }
        maxHeight = decreaseMaxHeights(maxHeight, 'yoo-ion-header', document);
    }
    return maxHeight;
}
export function decreaseMaxHeight(maxHeight, name, html) {
    let comp = querySelectorDeep(html, name);
    if (comp) {
        maxHeight -= comp.clientHeight;
    }
    return maxHeight;
}
export function decreaseMaxHeights(maxHeight, name, html) {
    let comps = querySelectorAllDeep(html, name);
    let maxHeightComp = 0;
    if (comps) {
        comps.forEach(comp => {
            maxHeightComp = Math.max(maxHeightComp, comp.clientHeight);
        });
    }
    maxHeight -= maxHeightComp;
    return maxHeight;
}
export function showModal(component, options, cssClass, enterAnimation, leaveAnimation, showBackdrop = false, displayFullscreenButton = true, host = null) {
    return new Promise(async (resolve, reject) => {
        if (loading) {
            return resolve(null);
        }
        setLoading(true);
        let modalController = document.querySelector('yoo-ion-modal-controller');
        await modalController.componentOnReady();
        let modal = await modalController.create({
            component,
            cssClass,
            componentProps: options || {},
            enterAnimation,
            leaveAnimation,
            showBackdrop,
            displayFullscreenButton,
            host
        });
        modal.onDidDismiss(ret => {
            resolve(ret);
        });
        modal.present().then(() => {
            setLoading(false);
            if (component instanceof HTMLElement) {
                component.isAnimationFinished = true;
            }
        });
    });
}
export function closeModal(result) {
    if (!isModalDismissing) {
        isModalDismissing = true;
        let ctrl = document.querySelector('yoo-ion-modal-controller');
        ctrl.dismiss(result).then(() => {
            isModalDismissing = false;
        });
    }
}
export async function showAlert(header, buttonText = [translate('CANCEL'), translate('CONFIRM')], subHeader, message, cssClass) {
    return new Promise((resolve, reject) => {
        if (loading) {
            return resolve(null);
        }
        setLoading(true);
        let alertController = document.querySelector('yoo-ion-alert-controller');
        alertController.componentOnReady().then(() => {
            alertController
                .create({
                header: header,
                // subHeader: subHeader,
                message: message,
                buttons: [
                    {
                        text: buttonText[0],
                        cancel: true,
                        cssClass: 'danger',
                        handler: () => {
                            resolve(false);
                        }
                    },
                    ...(buttonText.length > 1
                        ? [
                            {
                                text: buttonText[1],
                                handler: () => {
                                    resolve(true);
                                }
                            }
                        ]
                        : [])
                ],
                cssClass: cssClass
            })
                .then(alert => {
                alert.present().then(() => {
                    setLoading(false);
                });
            });
        });
    });
}
export async function showRename(header, subHeader, message, value, cssClass) {
    return new Promise((resolve, reject) => {
        if (loading) {
            return resolve(null);
        }
        setLoading(true);
        let alertController = document.querySelector('yoo-ion-alert-controller');
        alertController.componentOnReady().then(() => {
            alertController
                .create({
                header: header,
                //subHeader: subHeader,
                message: message,
                rename: true,
                renameValue: value,
                buttons: [
                    {
                        text: translate('CANCEL'),
                        cancel: true,
                        cssClass: 'danger',
                        handler: () => {
                            resolve(null);
                        }
                    },
                    {
                        text: translate('OK'),
                        handler: ret => {
                            resolve(ret.newName);
                        }
                    }
                ],
                cssClass: cssClass
            })
                .then(alert => {
                alert.present().then(() => {
                    setLoading(false);
                });
            });
        });
    });
}
export async function showToast(entry) {
    return new Promise((resolve, reject) => {
        if (loading) {
            return resolve(null);
        }
        setLoading(true);
        let toastController = document.querySelector('yoo-ion-toast-controller');
        toastController.componentOnReady().then(() => {
            toastController.create(entry).then(toast => {
                toast.present().then(() => {
                    setLoading(false);
                    resolve(toast);
                });
            });
        });
    });
}
export async function showActionSheet(buttons, cssClass = 'danger') {
    return new Promise((resolve, reject) => {
        if (loading) {
            return resolve(null);
        }
        setLoading(true);
        let actionSheetController = document.querySelector('yoo-ion-action-sheet-controller');
        actionSheetController.componentOnReady().then(() => {
            actionSheetController
                .create({
                buttons: buttons,
                cssClass: cssClass
            })
                .then(actionSheet => {
                actionSheet.onDidDismiss(ret => {
                    resolve(ret);
                });
                actionSheet.present().then(() => {
                    setLoading(false);
                });
            });
        });
    });
}
export async function showImageModal(src, description, isBackBtn) {
    let photoEditor = document.createElement('yoo-photo-editor');
    photoEditor.readonly = true;
    photoEditor.isModal = true;
    photoEditor.src = src;
    photoEditor.description = description;
    if (isBackBtn) {
        photoEditor.isBackBtn = true;
    }
    return showModal(photoEditor);
}
export async function showImagePhotoEditorsModal(items, index) {
    let photoEditors = document.createElement('yoo-photo-editors');
    photoEditors.isReadonly = true;
    photoEditors.index = index || 0;
    photoEditors.items = items;
    return showModal(photoEditors);
}
export function disableKeyboardResize(keyboard) {
    if (isCordova() && !isAndroid()) {
        keyboard.setResizeMode('none');
    }
}
export function enableKeyboardResize(keyboard) {
    if (isCordova() && !isAndroid()) {
        keyboard.setResizeMode('native');
    }
}
export async function getBoxViewingSession(boxId) {
    let boxController = document.querySelector('yoo-box-controller');
    await boxController.componentOnReady();
    if (boxController.createViewingSession) {
        let session = await boxController.createViewingSession(boxId);
        return session;
    }
    return Promise.resolve(null);
}
export function getSession() {
    let app = document.querySelector('yoo-app');
    if (app.getSession) {
        return app.getSession();
    }
    return {};
}
export function getConfig() {
    let app = document.querySelector('yoo-app');
    if (app.getConfig) {
        return app.getConfig();
    }
    return {};
}
export function getAppContext(includeMobilePlatform = false) {
    let root = document.querySelector('app-root');
    let classes = {};
    if (root && root.classList) {
        root.classList.forEach(value => {
            if (value !== 'ion-page') {
                classes[value] = true;
            }
        });
    }
    if (isIphoneX()) {
        classes['iphone-x'] = true;
    }
    if (includeMobilePlatform && isCordova()) {
        classes['ios'] = isIOS();
        classes['android'] = isAndroid();
    }
    return classes;
}
export function isOffline() {
    let app = document.querySelector('yoo-app');
    return app.isOffline || false;
}
export function isDarkTheme() {
    let app = document.querySelector('yoo-app');
    return app.isDarkTheme || false;
}
export function getNextValueInArray(array, value) {
    if (array && array.length > 1) {
        let currentIndex = array.indexOf(value);
        if (currentIndex >= 0) {
            if (currentIndex === array.length - 1) {
                return array[0];
            }
            else {
                return array[currentIndex + 1];
            }
        }
    }
}
export function lockSwipes(ionSlides, shouldLock) {
    if (ionSlides) {
        ionSlides.lockSwipes(shouldLock);
    }
}
export function findParent(element, tagName = 'yoo-form-dynamic') {
    if (element && element.tagName === tagName.toUpperCase()) {
        return element;
    }
    else if (element && element.closest) {
        const rep = element.closest(tagName);
        if (rep) {
            return rep;
        }
        else {
            const root = element.getRootNode ? element.getRootNode() : undefined;
            if (root && root.host) {
                return findParent(root.host, tagName);
            }
            else {
                return null;
            }
        }
    }
    else {
        return null;
    }
}
////
export function getActiveElementShadow() {
    let activeElement = document.activeElement;
    while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
}
export function querySelectorAllDeep(elementHost, selector) {
    return _querySelectorDeep(elementHost, selector, true);
}
export function querySelectorDeep(elementHost, selector) {
    return _querySelectorDeep(elementHost, selector, false);
}
export function lifecycleEvents(modalEvent, usersElement, LIFECYCLE_MAP) {
    const el = usersElement;
    const name = LIFECYCLE_MAP[modalEvent.type];
    if (el && name) {
        const event = new CustomEvent(name, {
            bubbles: false,
            cancelable: false,
            detail: modalEvent.detail
        });
        el.dispatchEvent(event);
    }
}
export function copyToClipboard(text) {
    if (isCordova()) {
        Clipboard.copy(text);
    }
    else {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '-99999px';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
export function hideShowTabbar(ev, tabbarElement, isTabbarHidden) {
    if (isWeb()) {
        return true;
    }
    else {
        if (ev.detail === true && !isTabbarHidden) {
            setAnimation(animations.slideVertical, tabbarElement, { open: false, up: true });
            return true;
        }
        if (ev.detail === false && isTabbarHidden) {
            setAnimation(animations.slideVertical, tabbarElement, { open: true, up: true });
            return false;
        }
        return isTabbarHidden;
    }
}
function _querySelectorDeep(elementHost, selector, findMany) {
    let lightElement = elementHost.querySelector(selector);
    // if (document.head.attachShadow) {
    if (!lightElement) {
        if (!findMany && lightElement) {
            return lightElement;
        }
        const splitSelector = selector.replace(/\s*([,>+~]+)\s*/g, '$1').split(' ');
        const possibleElementsIndex = splitSelector.length - 1;
        const possibleElements = collectAllElementsDeep(elementHost, splitSelector[possibleElementsIndex]);
        const findElements = findMatchingElement(elementHost, splitSelector, possibleElementsIndex);
        if (findMany) {
            return possibleElements.filter(findElements);
        }
        else {
            return possibleElements.find(findElements);
        }
    }
    else {
        if (!findMany) {
            return lightElement;
        }
        else {
            return elementHost.querySelectorAll(selector);
        }
    }
}
function findMatchingElement(elementHost, splitSelector, possibleElementsIndex) {
    return element => {
        let position = possibleElementsIndex;
        let parent = element;
        let foundElement = false;
        while (parent) {
            const foundMatch = parent.matches(splitSelector[position]);
            if (foundMatch && position === 0) {
                foundElement = true;
                break;
            }
            if (foundMatch) {
                position--;
            }
            parent = findParentOrHost(elementHost, parent);
        }
        return foundElement;
    };
}
function findParentOrHost(elementHost, element) {
    const parentNode = element.parentNode;
    return parentNode && parentNode.host ? parentNode.host : parentNode === elementHost ? null : parentNode;
}
function collectAllElementsDeep(elementHost, selector = null) {
    const allElements = [];
    const findAllElements = function (nodes) {
        for (let i = 0, el; (el = nodes[i]); ++i) {
            allElements.push(el);
            // If the element has a shadow root, dig deeper.
            if (el.shadowRoot && el.shadowRoot !== null) {
                findAllElements(el.shadowRoot.querySelectorAll('*'));
            }
        }
    };
    if (elementHost.shadowRoot && elementHost.shadowRoot !== null) {
        findAllElements(elementHost.shadowRoot.querySelectorAll('*'));
    }
    return selector ? allElements.filter(el => el.matches(selector)) : allElements;
}
function setLoading(state) {
    if (state) {
        loading = true;
    }
    else {
        setTimeout(() => {
            loading = false;
        }, 300);
    }
}
export class Cloudinary {
    constructor(src) {
        this.baseLayer = {};
        this.layers = [];
        this.src = src;
    }
    getUrl() {
        let src = this.src;
        if (this.src && this.src.indexOf('file:') >= 0 && isWKWebView()) {
            return cleanupWKWebViewImagePath(this.src);
        }
        if (!src.includes('res.cloudinary.com')) {
            return this.src;
        }
        if (src.replace && this.protocol) {
            src = src.replace('http:', this.protocol);
        }
        let baseLayer = Object.keys(this.baseLayer)
            .map(key => this.baseLayer[key])
            .filter(item => !!item)
            .join(',');
        let layers = [baseLayer, ...this.layers.map(layer => layer.toString())];
        let position = src.indexOf('upload/');
        if (position > 0) {
            position += 7;
            src = [src.slice(0, position), layers && layers.length > 0 ? layers.join('/') + '/' : '', src.slice(position)].join('');
        }
        return src;
        // let paths: Array<string> = src.split('/');
        // paths.splice(paths.length - 2, 0, ...layers);
        // return paths.join('/');
    }
    setProtocol(protocol) {
        this.protocol = protocol;
        return this;
    }
    width(width, pixelRatio = 1) {
        this.baseLayer['width'] = 'w_' + Math.floor(width * pixelRatio);
        return this;
    }
    height(height, pixelRatio = 1) {
        this.baseLayer['height'] = 'h_' + Math.floor(height * pixelRatio);
        return this;
    }
    blur(level) {
        this.baseLayer['blur'] = 'e_blur:' + level;
        return this;
    }
    opacity(level) {
        this.baseLayer['opacity'] = 'o_' + level;
        return this;
    }
    gravity(type) {
        this.baseLayer['gravityFace'] = 'g_' + type;
        return this;
    }
    zoom(level) {
        this.baseLayer['zoom'] = 'z_' + level;
        return this;
    }
    brightness(level) {
        this.baseLayer['brightness'] = 'e_brightness:' + Math.abs(level);
        return this;
    }
    crop(mode = 'fill') {
        this.baseLayer['crop'] = 'c_' + mode;
        return this;
    }
    quality(mode) {
        this.baseLayer['quality'] = 'q_auto:' + mode;
        return this;
    }
    videoCodec(type = 'auto') {
        this.baseLayer['videoCodec'] = 'vc_' + type;
        return this;
    }
    format(format) {
        this.baseLayer['format'] = 'f_' + format;
        if (format !== 'auto') {
            this.src = this.src.substr(0, this.src.lastIndexOf('.')) + '.' + format;
        }
        return this;
    }
    flag(name) {
        this.baseLayer['flag'] = 'fl_' + name;
        return this;
    }
    addLayer(layer) {
        this.layers.push(layer);
        return this;
    }
}
export class CloudinaryGradientLayer {
    constructor(axis, direction, backgroundColor) {
        this.direction = 0; // (-1, 1)
        this.axis = axis;
        this.direction = direction;
        this.backgroundColor = backgroundColor;
    }
    toString() {
        let output = ['e_gradient_fade'];
        if (this.axis) {
            output.push([this.axis, this.direction].join('_'));
        }
        if (this.backgroundColor) {
            output.push(['b_rgb', this.backgroundColor].join(':'));
        }
        return output.join(',');
    }
}
export function cloudinary(value, width, height, blur, opacity, trackFaces, brightness, pad, isVideoParam, noRatio) {
    let ratio = (window && window.devicePixelRatio ? window.devicePixelRatio : 1) || 1;
    if (!isString(value)) {
        return value;
    }
    if (value && value.indexOf('file:') >= 0 && isWKWebView()) {
        value = cleanupWKWebViewImagePath(value);
        return value;
    }
    ratio = isVideoParam || noRatio ? 1 : ratio;
    let cl = new Cloudinary(value);
    cl.setProtocol(getProtocol());
    if (width) {
        cl.width(width, ratio);
    }
    if (height) {
        cl.height(height, ratio);
    }
    if (blur) {
        cl.blur(blur);
    }
    if (opacity) {
        cl.opacity(opacity);
    }
    if (trackFaces) {
        cl.crop('faces').zoom(0.7);
    }
    if (Math.abs(brightness) > 0) {
        cl.brightness(brightness);
    }
    let isPad = false;
    if (pad) {
        isPad = pad === true;
    }
    if (isVideoParam) {
        cl.format('mp4');
    }
    else {
        if (isPad) {
            cl.crop('pad');
        }
        else {
            cl.crop('fill');
        }
        cl.quality('low')
            .format('auto')
            .flag('lossy');
    }
    return cl.getUrl();
}
export function isCloudinaryLink(url) {
    return url && url.includes && url.includes('res.cloudinary');
}
export function isFile(file) {
    let retVal = file && file.constructor && (file.constructor.name === 'File' || file.constructor.name === 'Blob' || file.toString() === '[object File]' || file.toString() === '[object Blob]');
    return retVal;
}
