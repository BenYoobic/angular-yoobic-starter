import { HttpClientModule } from '@angular/common/http';
import { isPlatformServer, CommonModule } from '@angular/common';
import { setIsWeb, setIsIonic, isIOS, isCordova, isCapacitorNative, isElectron, isFirefox, isIE, isIE11, isIOS9, isIphoneX, isIphone5, isIphoneSE, isAndroid, isWKWebView, isSamsung, isZebraScanner, isTablet, isPhablet, isSurface, getProtocol, dateDiffInMinutes } from '@shared/stencil';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { _driver } from 'localforage-cordovasqlitedriver';
import { __decorate, __metadata } from 'tslib';
import * as localForage from 'localforage';
import { getItem, setItem, defineDriver, setDriver, INDEXEDDB, WEBSQL, LOCALSTORAGE, driver, supports, removeItem, clear } from 'localforage';
import { Subject } from 'rxjs';
import { isNumber, isUndefined } from 'lodash-es';
import { Injectable, Inject, PLATFORM_ID, InjectionToken, NgModule } from '@angular/core';
import postscribe from 'postscribe';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CORECONFIG_CONSTANTS = new InjectionToken('CoreConfigConstants');
class CoreConfig {
    /**
     * @param {?} platformId
     * @param {?} config
     */
    constructor(platformId, config) {
        this.platformId = platformId;
        this.configConstants = {};
        this.configConstants = config;
    }
    /**
     * @return {?}
     */
    setStencil() {
        setIsWeb(this.isWeb());
        setIsIonic(this.isIonic());
    }
    /**
     * @return {?}
     */
    isWeb() {
        return this.configConstants.configIsWeb;
    }
    /**
     * @return {?}
     */
    isIonic() {
        return this.configConstants.configIsIonic2;
    }
    /**
     * @return {?}
     */
    isCordova() {
        return isCordova();
    }
    /**
     * @return {?}
     */
    isCapacitorNative() {
        return isCapacitorNative();
    }
    /**
     * @return {?}
     */
    isHybrid() {
        return this.isCordova() || this.isCapacitorNative();
    }
    /**
     * @return {?}
     */
    isElectron() {
        return isElectron();
    }
    /**
     * @return {?}
     */
    isFirefox() {
        return isFirefox();
    }
    /**
     * @return {?}
     */
    isIE() {
        return isIE();
    }
    /**
     * @return {?}
     */
    isIE11() {
        return isIE11();
    }
    /**
     * @return {?}
     */
    isUniversal() {
        return isPlatformServer(this.platformId);
    }
    /**
     * @return {?}
     */
    getPlatform() {
        return this.configConstants.configPlatform;
    }
    /**
     * @return {?}
     */
    getPlatformClean() {
        return this.getPlatform()
            .toLowerCase()
            .replace('ionic', 'mobile');
    }
    /**
     * @return {?}
     */
    isIOS() {
        return isIOS();
    }
    /**
     * @return {?}
     */
    isIOS9() {
        return isIOS9();
    }
    /**
     * @return {?}
     */
    isIphoneX() {
        return isIphoneX();
    }
    /**
     * @return {?}
     */
    isIphone5() {
        return isIphone5();
    }
    /**
     * @return {?}
     */
    isIphoneSE() {
        return isIphoneSE();
    }
    /**
     * @return {?}
     */
    isAndroid() {
        return isAndroid();
    }
    /**
     * @return {?}
     */
    isWKWebView() {
        return isWKWebView();
    }
    /**
     * @return {?}
     */
    isTablet() {
        return isTablet();
    }
    /**
     * @return {?}
     */
    isPhablet() {
        return isPhablet();
    }
    /**
     * @return {?}
     */
    isSamsung() {
        return isSamsung();
    }
    /**
     * @return {?}
     */
    isZebraScanner() {
        return isZebraScanner();
    }
    /**
     * @return {?}
     */
    isSurface() {
        return isSurface();
    }
    /**
     * @return {?}
     */
    isLocalhost() {
        return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    }
    /**
     * @param {?=} cleanLocation
     * @return {?}
     */
    reload(cleanLocation = false) {
        if (this.isElectron()) ;
        else if (location && ((/** @type {?} */ (location))).reload) {
            location.reload();
            if (cleanLocation) {
                location.replace(location.origin);
            }
        }
    }
    /**
     * @return {?}
     */
    isFullScreenEnabled() {
        if (this.isUniversal()) {
            return false;
        }
        return ((/** @type {?} */ (document))).fullscreenEnabled || ((/** @type {?} */ (document))).webkitFullscreenEnabled || ((/** @type {?} */ (document))).mozFullScreenEnabled || ((/** @type {?} */ (document))).msFullscreenEnabled;
    }
    /**
     * @return {?}
     */
    isFullScreen() {
        if (this.isUniversal()) {
            return false;
        }
        if (((/** @type {?} */ (document))).fullscreenElement || ((/** @type {?} */ (document))).webkitFullscreenElement || ((/** @type {?} */ (document))).mozFullScreenElement || ((/** @type {?} */ (document))).msFullscreenElement) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    requestFullScreen() {
        if (this.isUniversal()) {
            return;
        }
        if (document && document.body) {
            /** @type {?} */
            let i = document.body;
            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            }
            else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            }
            else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            }
            else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
        }
    }
    /**
     * @return {?}
     */
    exitFullScreen() {
        if (this.isUniversal()) {
            return;
        }
        if (document) {
            if (((/** @type {?} */ (document))).exitFullscreen) {
                ((/** @type {?} */ (document))).exitFullscreen();
            }
            else if (((/** @type {?} */ (document))).webkitExitFullscreen) {
                ((/** @type {?} */ (document))).webkitExitFullscreen();
            }
            else if (((/** @type {?} */ (document))).mozCancelFullScreen) {
                ((/** @type {?} */ (document))).mozCancelFullScreen();
            }
            else if (((/** @type {?} */ (document))).msExitFullscreen) {
                ((/** @type {?} */ (document))).msExitFullscreen();
            }
        }
    }
    /**
     * @return {?}
     */
    getProtocol() {
        return getProtocol();
    }
    /**
     * @return {?}
     */
    getMode() {
        return this.configConstants.configMode;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getKey(key) {
        return this.configConstants[key];
    }
    /**
     * @return {?}
     */
    getAppId() {
        return window['BuildInfo'] ? window['BuildInfo'].basePackageName : window.location.hostname;
    }
    /**
     * @return {?}
     */
    getAppVersion() {
        return this.configConstants.appVersion;
    }
    /**
     * @return {?}
     */
    getAppName() {
        return this.configConstants.appName;
    }
    /**
     * @return {?}
     */
    getFullAppName() {
        return this.getAppName() + '-' + this.getPlatformClean() + '-' + this.getAppVersion();
    }
    /**
     * @return {?}
     */
    getWebUrl() {
        return this.configConstants.webUrl;
    }
    /**
     * @return {?}
     */
    getCssPublicUrl() {
        //https://storage.googleapis.com/yoobic-mobile-apps/6.0.222-1/operations/mobile/styles.f3f4a35e34aff00b5977.css
        return 'https://storage.googleapis.com/yoobic-mobile-apps/' + this.getAppVersion() + '/' + this.getAppName() + '/' + this.getPlatformClean() + '/';
    }
    /**
     * @return {?}
     */
    getSyncedCollections() {
        return this.configConstants.syncedCollections;
    }
}
CoreConfig.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CoreConfig.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [CORECONFIG_CONSTANTS,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Position {
    /**
     * @param {?} p
     * @return {?}
     */
    static isPosition(p) {
        return p instanceof Position || (isNumber(p.latitude) && isNumber(p.longitude));
    }
    /**
     * @param {?} loc
     */
    constructor(loc) {
        if (typeof loc === 'string') {
            [this.latitude, this.longitude] = loc.split(',').map(parseFloat);
        }
        else if (Position.isPosition(loc)) {
            this.latitude = loc.latitude;
            this.longitude = loc.longitude;
            this.accuracy = loc.accuracy;
        }
        else {
            this.latitude = ((/** @type {?} */ (loc))).lat;
            this.longitude = ((/** @type {?} */ (loc))).lng;
        }
    }
    /**
     * @param {?=} reversed
     * @return {?}
     */
    toGeoLoc(reversed = false) {
        return reversed ? [this.longitude, this.latitude] : [this.latitude, this.longitude];
    }
    /**
     * @return {?}
     */
    toJson() {
        return { latitude: this.latitude, longitude: this.longitude };
    }
    /**
     * @return {?}
     */
    toStringLoc() {
        return this.latitude + ',' + this.longitude;
    }
}
class GeoLocation {
    /**
     * @param {?} geolocation
     * @param {?} coreConfig
     */
    constructor(geolocation, coreConfig) {
        this.geolocation = geolocation;
        this.coreConfig = coreConfig;
        this.defaultPosition = new Position({ latitude: 51.53162, longitude: -0.2376447 });
        this.timeout = 30000;
    }
    /**
     * @param {?} lat1
     * @param {?} lon1
     * @param {?} lat2
     * @param {?} lon2
     * @param {?=} unit
     * @return {?}
     */
    getDistance(lat1, lon1, lat2, lon2, unit = 'K') {
        /** @type {?} */
        let radlat1 = (Math.PI * lat1) / 180;
        /** @type {?} */
        let radlat2 = (Math.PI * lat2) / 180;
        /** @type {?} */
        let theta = lon1 - lon2;
        /** @type {?} */
        let radtheta = (Math.PI * theta) / 180;
        /** @type {?} */
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === 'K') {
            dist = dist * 1.609344;
        }
        if (unit === 'N') {
            dist = dist * 0.8684;
        }
        return dist;
    }
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    getLocation(forceRefresh = false) {
        if (this.coreConfig.isCordova()) {
            return this.geolocation
                .getCurrentPosition({
                enableHighAccuracy: true,
                maximumAge: 90000,
                timeout: this.timeout
            })
                .then((/**
             * @param {?} value
             * @return {?}
             */
            value => new Position(value.coords)), (/**
             * @param {?} err
             * @return {?}
             */
            err => this.defaultPosition));
        }
        else if (navigator && navigator.geolocation) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                if (!forceRefresh && this.cache && (!this.cacheTimestamp || dateDiffInMinutes(new Date(), this.cacheTimestamp) > 15)) {
                    resolve(this.cache);
                }
                else {
                    navigator.geolocation.getCurrentPosition((/**
                     * @param {?} pos
                     * @return {?}
                     */
                    pos => {
                        this.cache = new Position(pos.coords);
                        this.cacheTimestamp = new Date();
                        resolve(this.cache);
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        this.cache = this.defaultPosition;
                        this.cacheTimestamp = new Date();
                        resolve(this.defaultPosition);
                    }), { enableHighAccuracy: false, timeout: 10 * 1000, maximumAge: 10 * 60 * 1000 });
                }
            }));
        }
        else {
            return Promise.resolve(null);
        }
    }
}
GeoLocation.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GeoLocation.ctorParameters = () => [
    { type: Geolocation },
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Log {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    log(message, ...optionalParams) {
        if (this.coreConfig.getMode() === 'dev') {
            window['console'].log(message, ...optionalParams);
        }
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    forceLog(message, ...optionalParams) {
        window['console'].log(message, ...optionalParams);
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    error(message, ...optionalParams) {
        if (this.coreConfig.getMode() === 'dev') {
            window['console'].error(message, ...optionalParams);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    alert(message) {
        window['alert'](message);
    }
}
Log.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Log.ctorParameters = () => [
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//https://github.com/ionic-team/ionic-storage/blob/master/src/storage.ts
class LocalForageService {
    /**
     * @param {?} coreConfig
     * @param {?} log
     */
    constructor(coreConfig, log) {
        this.coreConfig = coreConfig;
        this.log = log;
        this.init().then((/**
         * @return {?}
         */
        () => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => { }));
    }
    /**
     * @return {?}
     */
    init() {
        if (this.coreConfig.isCordova()) {
            try {
                return defineDriver(cordovaSQLiteDriver).then((/**
                 * @return {?}
                 */
                () => {
                    return setDriver
                        .bind(localForage)([_driver, INDEXEDDB, WEBSQL, LOCALSTORAGE])
                        .then((/**
                     * @return {?}
                     */
                    () => {
                        this.log.log('setDriver:' + driver.bind(localForage)());
                        return Promise.resolve();
                    }));
                }));
            }
            catch (err) {
                this.log.error(err);
                return Promise.resolve();
            }
        }
        else if (supports(WEBSQL)) {
            //!this.coreConfig.isFirefox() && !this.coreConfig.isIE()) {
            return setDriver.bind(localForage)(WEBSQL);
        }
        return Promise.resolve();
    }
    /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        return setItem.bind(localForage)(key, value);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return getItem.bind(localForage)(key);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        return removeItem.bind(localForage)(key);
    }
    /**
     * @return {?}
     */
    clear() {
        return clear.bind(localForage)();
    }
}
LocalForageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalForageService.ctorParameters = () => [
    { type: CoreConfig },
    { type: Log }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocalStorage {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
        if (!coreConfig.isUniversal()) {
            if (typeof localStorage === 'undefined') {
                throw new Error('Current browser does not support Local Storage');
            }
            this.localStorage = localStorage;
        }
        else {
            this.localStorage = {};
        }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        try {
            this.localStorage[key] = value;
        }
        catch (e) { }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.localStorage[key] || false;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setObject(key, value) {
        this.localStorage[key] = JSON.stringify(value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getObject(key) {
        if (this.localStorage[key]) {
            return JSON.parse(this.localStorage[key]);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        if (!this.coreConfig.isUniversal()) {
            this.localStorage.removeItem(key);
        }
        else {
            delete this.localStorage[key];
        }
    }
    /**
     * @return {?}
     */
    clear() {
        if (!this.coreConfig.isUniversal()) {
            /** @type {?} */
            let server = this.get('SERVER');
            this.localStorage.clear();
            if (server) {
                this.set('SERVER', server);
            }
        }
        else {
            this.localStorage = {};
        }
    }
}
LocalStorage.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalStorage.ctorParameters = () => [
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} storageKey
 * @param {?=} useAsync
 * @param {?=} callback
 * @param {?=} forceReplace
 * @return {?}
 */
function Persistent(storageKey, useAsync, callback, forceReplace) {
    /**
     * @param {?} str
     * @return {?}
     */
    function isValidJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    return (/**
     * @param {?} target
     * @param {?} decoratedPropertyName
     * @return {?}
     */
    (target, decoratedPropertyName) => {
        /** @type {?} */
        let options = Object.assign({}, { storageKey: storageKey || decoratedPropertyName });
        /** @type {?} */
        let _value;
        if (useAsync) {
            getItem(options.storageKey).then((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                _value = v;
                if (callback) {
                    callback(v);
                }
            }), (/**
             * @return {?}
             */
            () => { }));
        }
        else {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem(options.storageKey) && isValidJson(localStorage.getItem(options.storageKey))) {
                    _value = JSON.parse((/** @type {?} */ (localStorage.getItem(options.storageKey))));
                }
                else {
                    _value = null;
                }
            }
        }
        /** @type {?} */
        let _isInitialised = false;
        /** @type {?} */
        let propertyObj = {
            get: (/**
             * @return {?}
             */
            function () {
                _isInitialised = true;
                return _value;
            }),
            set: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!_isInitialised) {
                    _isInitialised = true;
                    if (forceReplace !== true) {
                        return;
                    }
                }
                if (typeof value !== 'undefined') {
                    _value = value;
                    try {
                        if (useAsync) {
                            setItem(options.storageKey, value).catch((/**
                             * @return {?}
                             */
                            () => { }));
                        }
                        else {
                            localStorage.setItem(options.storageKey, JSON.stringify(value));
                        }
                    }
                    catch (e) { }
                }
            }),
            enumerable: false
        };
        Object.defineProperty(target, decoratedPropertyName, propertyObj);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Network$1 {
    /**
     * @param {?} coreConfig
     * @param {?} networkNative
     */
    constructor(coreConfig, networkNative) {
        this.coreConfig = coreConfig;
        this.networkNative = networkNative;
        this._isForcedOffline = false;
        this._isOffline = false;
        this._supportedConnections = ['wifi', 'ethernet', '4g', '3g'];
        this._connectionChange = new Subject();
        if (this.coreConfig.isCordova()) {
            /** @type {?} */
            let connection = this.networkNative.type;
            if (isUndefined(connection)) {
                this._isOffline = !navigator.onLine;
            }
            else {
                this._isOffline = this._supportedConnections.indexOf(connection) < 0;
            }
        }
        else if (this.coreConfig.isUniversal()) {
            this._isOffline = false;
        }
        else {
            this._isOffline = !navigator.onLine;
        }
        this.emit();
        if (this.coreConfig.isCordova()) {
            this._onConnectSubscription = (/** @type {?} */ (this.networkNative.onConnect().subscribe((/**
             * @return {?}
             */
            () => {
                this._isOffline = false;
                this.emit();
            }))));
            this._onDisconnectSubscription = (/** @type {?} */ (this.networkNative.onDisconnect().subscribe((/**
             * @return {?}
             */
            () => {
                this._isOffline = true;
                this.emit();
            }))));
        }
        else if (!this.coreConfig.isUniversal()) {
            this.onlineListener = (/**
             * @return {?}
             */
            () => {
                this._isOffline = false;
                this.emit();
            });
            this.offlineListener = (/**
             * @return {?}
             */
            () => {
                this._isOffline = true;
                this.emit();
            });
            window.addEventListener('online', this.onlineListener);
            window.addEventListener('offline', this.offlineListener);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._onConnectSubscription) {
            this._onConnectSubscription.unsubscribe();
        }
        if (this._onDisconnectSubscription) {
            this._onDisconnectSubscription.unsubscribe();
        }
        window.removeEventListener('online', this.onlineListener);
        window.removeEventListener('offline', this.offlineListener);
    }
    /**
     * @return {?}
     */
    get connectionChange$() {
        return this._connectionChange.asObservable();
    }
    /**
     * @return {?}
     */
    isOffline() {
        return this._isForcedOffline || this._isOffline;
    }
    /**
     * @return {?}
     */
    isForcedOffline() {
        return this._isForcedOffline;
    }
    /**
     * @return {?}
     */
    getConnection() {
        return this.networkNative.type;
    }
    /**
     * @return {?}
     */
    emit() {
        this._connectionChange.next(this._isForcedOffline || this._isOffline);
    }
    /**
     * @param {?} offline
     * @param {?=} emit
     * @return {?}
     */
    forceOffline(offline, emit = true) {
        this._isForcedOffline = offline;
        if (emit) {
            this.emit();
        }
    }
}
Network$1.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Network$1.ctorParameters = () => [
    { type: CoreConfig },
    { type: Network }
];
__decorate([
    Persistent(),
    __metadata("design:type", Boolean)
], Network$1.prototype, "_isForcedOffline", void 0);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PromiseService {
    constructor() {
        this.retryOnFailure = (/**
         * @param {?} functionToRetry
         * @param {?=} timesToRetry
         * @param {?=} delay
         * @return {?}
         */
        (functionToRetry, timesToRetry = 3, delay = 300) => {
            /** @type {?} */
            let retryCount = timesToRetry;
            /** @type {?} */
            let failureReason;
            /** @type {?} */
            let functionToIterate = (/**
             * @param {...?} args
             * @return {?}
             */
            (...args) => {
                if (retryCount < 1) {
                    return Promise.reject(failureReason);
                }
                else {
                    retryCount--;
                    return functionToRetry(...args).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        failureReason = err;
                        return this.wait(delay).then((/**
                         * @return {?}
                         */
                        () => functionToIterate(...args)));
                    }));
                }
            });
            return functionToIterate;
        });
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    wait(duration) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout(resolve, duration);
        }));
    }
    /**
     * @param {?} ms
     * @param {?} promise
     * @return {?}
     */
    promiseTimeout(ms, promise) {
        // Create a promise that rejects in <ms> milliseconds
        /** @type {?} */
        let timeout = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            let id = setTimeout((/**
             * @return {?}
             */
            () => {
                clearTimeout(id);
                reject('Timed out in ' + ms + 'ms.');
            }), ms);
        }));
        // Returns a race between our timeout and the passed in promise
        return Promise.race([promise, timeout]);
    }
    /**
     * @param {?} promises
     * @return {?}
     */
    sequential(promises) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (!promises || promises.length === 0) {
                //throw new Error('First argument need to be an array of Promises');
                return resolve([]);
            }
            /** @type {?} */
            let count = 0;
            /** @type {?} */
            let results = [];
            /** @type {?} */
            const iterateeFunc = (/**
             * @param {?} previousPromise
             * @param {?} currentPromise
             * @return {?}
             */
            (previousPromise, currentPromise) => {
                return previousPromise
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    if (count++ !== 0) {
                        results = results.concat(result);
                    }
                    return currentPromise(result, results, count);
                }))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    return reject(err);
                }));
            });
            promises = promises.concat((/**
             * @return {?}
             */
            () => Promise.resolve()));
            promises.reduce(iterateeFunc, Promise.resolve(false)).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                resolve(results);
            }));
        }));
        // let p = Promise.resolve();
        // return promises.reduce((pacc, fn) => {
        //     return pacc = pacc.then(fn);
        // }, p);
    }
}
PromiseService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Utils {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    loadScript(url) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (this.coreConfig.isUniversal()) {
                resolve(true);
            }
            else {
                /** @type {?} */
                let element = document.getElementsByTagName('head')[0];
                /** @type {?} */
                let html = `<script async type=text/javascript src=${url}></script>`;
                postscribe(element, html, {
                    done: (/**
                     * @return {?}
                     */
                    () => {
                        resolve(true);
                    })
                });
            }
        }));
    }
    /**
     * @param {?} key
     * @param {?=} url
     * @return {?}
     */
    getUrlParameterByName(key, url) {
        if (!url) {
            url = window.location.href;
        }
        key = key.replace(/[\[\]]/g, '\\$&');
        /** @type {?} */
        const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
        /** @type {?} */
        let results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    /**
     * @param {?} key
     * @param {?} url
     * @return {?}
     */
    removeParameterFromUrl(key, url) {
        /** @type {?} */
        let rtn = url.split('?')[0];
        /** @type {?} */
        let param;
        /** @type {?} */
        let paramsArr = [];
        /** @type {?} */
        let queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    }
}
Utils.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Utils.ctorParameters = () => [
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CommonModule$1 {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: CommonModule$1,
            providers: [...configuredProviders, CoreConfig, GeoLocation, LocalForageService, LocalStorage, Log, Network$1, PromiseService, Utils, Geolocation, Network]
        };
    }
}
CommonModule$1.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule, HttpClientModule],
                exports: [CommonModule, HttpClientModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} baseCtors
 * @return {?}
 */
function MixIn(baseCtors) {
    return (/**
     * @param {?} derivedCtor
     * @return {?}
     */
    function (derivedCtor) {
        baseCtors.forEach((/**
         * @param {?} baseCtor
         * @return {?}
         */
        baseCtor => {
            /** @type {?} */
            const fieldCollector = {};
            baseCtor.apply(fieldCollector);
            Object.getOwnPropertyNames(fieldCollector).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => {
                derivedCtor.prototype[name] = fieldCollector[name];
            }));
            Object.getOwnPropertyNames(baseCtor.prototype).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => {
                if (name !== 'constructor') {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                }
            }));
        }));
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} blackList
 * @return {?}
 */
function AutoUnsubscribe(blackList = []) {
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        const original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = (/**
         * @return {?}
         */
        function () {
            for (let prop in this) {
                /** @type {?} */
                const property = this[prop];
                if (blackList.indexOf(prop) < 0) {
                    if (property && typeof property.unsubscribe === 'function') {
                        property.unsubscribe();
                    }
                }
            }
            if (original && typeof original === 'function') {
                original.apply(this, arguments);
            }
        });
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Colors {
    /**
     * @param {?} hex
     * @param {?=} opacity
     * @return {?}
     */
    static hexToRgb(hex, opacity = 1) {
        /** @type {?} */
        let bigint = parseInt(hex.replace('#', ''), 16);
        /** @type {?} */
        let r = (bigint >> 16) & 255;
        /** @type {?} */
        let g = (bigint >> 8) & 255;
        /** @type {?} */
        let b = bigint & 255;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    }
    /**
     * @return {?}
     */
    static getKeys() {
        return ['success', 'danger', 'black', 'warning', 'stable'];
    }
    /**
     * @param {?} color
     * @param {?=} defaultValue
     * @return {?}
     */
    static getCssColor(color, defaultValue) {
        if (document) {
            /** @type {?} */
            let retVal = getComputedStyle(document.body).getPropertyValue('--' + color) || defaultValue || Colors[color.replace('-color', '')];
            retVal = (retVal || '').trim();
            return retVal;
        }
        return defaultValue || Colors[color];
    }
    /**
     * @param {?} color
     * @param {?} amount
     * @return {?}
     */
    static lightenDarkenColor(color, amount) {
        /** @type {?} */
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }
        /** @type {?} */
        let num = parseInt(color, 16);
        /** @type {?} */
        let r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        /** @type {?} */
        let b = ((num >> 8) & 0x00ff) + amount;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        /** @type {?} */
        let g = (num & 0x0000ff) + amount;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
    /**
     * @return {?}
     */
    static toggleDarkTheme() {
        Colors.setDarkTheme(!Colors.isDarkTheme());
    }
    /**
     * @return {?}
     */
    static isDarkTheme() {
        return Colors._isDarkTheme;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    static setDarkTheme(enabled) {
        Colors._isDarkTheme = enabled;
        if (document) {
            if (enabled) {
                document.documentElement.classList.add('dark-theme');
            }
            else {
                document.documentElement.classList.remove('dark-theme');
            }
            Colors.success = Colors.getCssColor('success');
            Colors.danger = Colors.getCssColor('danger');
            Colors.warning = Colors.getCssColor('warning');
            Colors.black = Colors.getCssColor('black');
            Colors.light = Colors.getCssColor('light');
            Colors.stable = Colors.getCssColor('stable');
            //Colors.text = Colors.getCssColor('always-text-color');
        }
    }
    /**
     * @return {?}
     */
    static toggleBigFonts() {
        Colors.setBigFonts(!Colors.isBigFonts());
    }
    /**
     * @return {?}
     */
    static isBigFonts() {
        return Colors._isBigFonts;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    static setBigFonts(enabled) {
        Colors._isBigFonts = enabled;
        if (document) {
            if (enabled) {
                document.documentElement.classList.add('big-fonts');
            }
            else {
                document.documentElement.classList.remove('big-fonts');
            }
        }
    }
}
Colors._isDarkTheme = false;
Colors._isBigFonts = false;
Colors.success = Colors.getCssColor('success');
Colors.danger = Colors.getCssColor('danger');
Colors.warning = Colors.getCssColor('warning');
Colors.black = Colors.getCssColor('black');
Colors.light = Colors.getCssColor('light');
Colors.stable = Colors.getCssColor('stable');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CommonModule$1 as CommonModule, MixIn, Persistent, AutoUnsubscribe, Colors, CORECONFIG_CONSTANTS, CoreConfig, Position, GeoLocation, LocalForageService, LocalStorage, Log, Network$1 as Network, PromiseService, Utils };

//# sourceMappingURL=common.js.map