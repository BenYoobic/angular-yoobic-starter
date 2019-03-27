(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/common'), require('@shared/stencil'), require('localforage-cordovasqlitedriver'), require('localforage'), require('rxjs'), require('lodash-es'), require('@angular/core'), require('postscribe'), require('@ionic-native/geolocation/ngx'), require('@ionic-native/network/ngx')) :
    typeof define === 'function' && define.amd ? define('common', ['exports', '@angular/common/http', '@angular/common', '@shared/stencil', 'localforage-cordovasqlitedriver', 'localforage', 'rxjs', 'lodash-es', '@angular/core', 'postscribe', '@ionic-native/geolocation/ngx', '@ionic-native/network/ngx'], factory) :
    (factory((global.common = {}),global.ng.common.http,global.ng.common,global.DesignSystem,global.dovaSQLiteDriver,global.localForage,global.rxjs,global['lodash-es'],global.ng.core,global.postscribe,global.Geolocation,global.Network));
}(this, (function (exports,http,common,stencil,cordovaSQLiteDriver,localForage,rxjs,lodashEs,core,postscribe,ngx,ngx$1) { 'use strict';

    postscribe = postscribe && postscribe.hasOwnProperty('default') ? postscribe['default'] : postscribe;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CORECONFIG_CONSTANTS = new core.InjectionToken('CoreConfigConstants');
    var CoreConfig = /** @class */ (function () {
        function CoreConfig(platformId, config) {
            this.platformId = platformId;
            this.configConstants = {};
            this.configConstants = config;
        }
        /**
         * @return {?}
         */
        CoreConfig.prototype.setStencil = /**
         * @return {?}
         */
            function () {
                stencil.setIsWeb(this.isWeb());
                stencil.setIsIonic(this.isIonic());
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isWeb = /**
         * @return {?}
         */
            function () {
                return this.configConstants.configIsWeb;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIonic = /**
         * @return {?}
         */
            function () {
                return this.configConstants.configIsIonic2;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isCordova = /**
         * @return {?}
         */
            function () {
                return stencil.isCordova();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isCapacitorNative = /**
         * @return {?}
         */
            function () {
                return stencil.isCapacitorNative();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isHybrid = /**
         * @return {?}
         */
            function () {
                return this.isCordova() || this.isCapacitorNative();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isElectron = /**
         * @return {?}
         */
            function () {
                return stencil.isElectron();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isFirefox = /**
         * @return {?}
         */
            function () {
                return stencil.isFirefox();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIE = /**
         * @return {?}
         */
            function () {
                return stencil.isIE();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIE11 = /**
         * @return {?}
         */
            function () {
                return stencil.isIE11();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isUniversal = /**
         * @return {?}
         */
            function () {
                return common.isPlatformServer(this.platformId);
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getPlatform = /**
         * @return {?}
         */
            function () {
                return this.configConstants.configPlatform;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getPlatformClean = /**
         * @return {?}
         */
            function () {
                return this.getPlatform()
                    .toLowerCase()
                    .replace('ionic', 'mobile');
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIOS = /**
         * @return {?}
         */
            function () {
                return stencil.isIOS();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIOS9 = /**
         * @return {?}
         */
            function () {
                return stencil.isIOS9();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIphoneX = /**
         * @return {?}
         */
            function () {
                return stencil.isIphoneX();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIphone5 = /**
         * @return {?}
         */
            function () {
                return stencil.isIphone5();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isIphoneSE = /**
         * @return {?}
         */
            function () {
                return stencil.isIphoneSE();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isAndroid = /**
         * @return {?}
         */
            function () {
                return stencil.isAndroid();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isWKWebView = /**
         * @return {?}
         */
            function () {
                return stencil.isWKWebView();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isTablet = /**
         * @return {?}
         */
            function () {
                return stencil.isTablet();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isPhablet = /**
         * @return {?}
         */
            function () {
                return stencil.isPhablet();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isSamsung = /**
         * @return {?}
         */
            function () {
                return stencil.isSamsung();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isZebraScanner = /**
         * @return {?}
         */
            function () {
                return stencil.isZebraScanner();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isSurface = /**
         * @return {?}
         */
            function () {
                return stencil.isSurface();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isLocalhost = /**
         * @return {?}
         */
            function () {
                return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
            };
        /**
         * @param {?=} cleanLocation
         * @return {?}
         */
        CoreConfig.prototype.reload = /**
         * @param {?=} cleanLocation
         * @return {?}
         */
            function (cleanLocation) {
                if (cleanLocation === void 0) {
                    cleanLocation = false;
                }
                if (this.isElectron()) ;
                else if (location && (( /** @type {?} */(location))).reload) {
                    location.reload();
                    if (cleanLocation) {
                        location.replace(location.origin);
                    }
                }
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isFullScreenEnabled = /**
         * @return {?}
         */
            function () {
                if (this.isUniversal()) {
                    return false;
                }
                return (( /** @type {?} */(document))).fullscreenEnabled || (( /** @type {?} */(document))).webkitFullscreenEnabled || (( /** @type {?} */(document))).mozFullScreenEnabled || (( /** @type {?} */(document))).msFullscreenEnabled;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.isFullScreen = /**
         * @return {?}
         */
            function () {
                if (this.isUniversal()) {
                    return false;
                }
                if ((( /** @type {?} */(document))).fullscreenElement || (( /** @type {?} */(document))).webkitFullscreenElement || (( /** @type {?} */(document))).mozFullScreenElement || (( /** @type {?} */(document))).msFullscreenElement) {
                    return true;
                }
                return false;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.requestFullScreen = /**
         * @return {?}
         */
            function () {
                if (this.isUniversal()) {
                    return;
                }
                if (document && document.body) {
                    /** @type {?} */
                    var i = document.body;
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
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.exitFullScreen = /**
         * @return {?}
         */
            function () {
                if (this.isUniversal()) {
                    return;
                }
                if (document) {
                    if ((( /** @type {?} */(document))).exitFullscreen) {
                        (( /** @type {?} */(document))).exitFullscreen();
                    }
                    else if ((( /** @type {?} */(document))).webkitExitFullscreen) {
                        (( /** @type {?} */(document))).webkitExitFullscreen();
                    }
                    else if ((( /** @type {?} */(document))).mozCancelFullScreen) {
                        (( /** @type {?} */(document))).mozCancelFullScreen();
                    }
                    else if ((( /** @type {?} */(document))).msExitFullscreen) {
                        (( /** @type {?} */(document))).msExitFullscreen();
                    }
                }
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getProtocol = /**
         * @return {?}
         */
            function () {
                return stencil.getProtocol();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getMode = /**
         * @return {?}
         */
            function () {
                return this.configConstants.configMode;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        CoreConfig.prototype.getKey = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return this.configConstants[key];
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getAppId = /**
         * @return {?}
         */
            function () {
                return window['BuildInfo'] ? window['BuildInfo'].basePackageName : window.location.hostname;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getAppVersion = /**
         * @return {?}
         */
            function () {
                return this.configConstants.appVersion;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getAppName = /**
         * @return {?}
         */
            function () {
                return this.configConstants.appName;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getFullAppName = /**
         * @return {?}
         */
            function () {
                return this.getAppName() + '-' + this.getPlatformClean() + '-' + this.getAppVersion();
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getWebUrl = /**
         * @return {?}
         */
            function () {
                return this.configConstants.webUrl;
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getCssPublicUrl = /**
         * @return {?}
         */
            function () {
                //https://storage.googleapis.com/yoobic-mobile-apps/6.0.222-1/operations/mobile/styles.f3f4a35e34aff00b5977.css
                return 'https://storage.googleapis.com/yoobic-mobile-apps/' + this.getAppVersion() + '/' + this.getAppName() + '/' + this.getPlatformClean() + '/';
            };
        /**
         * @return {?}
         */
        CoreConfig.prototype.getSyncedCollections = /**
         * @return {?}
         */
            function () {
                return this.configConstants.syncedCollections;
            };
        CoreConfig.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CoreConfig.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
                { type: undefined, decorators: [{ type: core.Inject, args: [CORECONFIG_CONSTANTS,] }] }
            ];
        };
        return CoreConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Position = /** @class */ (function () {
        function Position(loc) {
            var _a;
            if (typeof loc === 'string') {
                _a = __read(loc.split(',').map(parseFloat), 2), this.latitude = _a[0], this.longitude = _a[1];
            }
            else if (Position.isPosition(loc)) {
                this.latitude = loc.latitude;
                this.longitude = loc.longitude;
                this.accuracy = loc.accuracy;
            }
            else {
                this.latitude = (( /** @type {?} */(loc))).lat;
                this.longitude = (( /** @type {?} */(loc))).lng;
            }
        }
        /**
         * @param {?} p
         * @return {?}
         */
        Position.isPosition = /**
         * @param {?} p
         * @return {?}
         */
            function (p) {
                return p instanceof Position || (lodashEs.isNumber(p.latitude) && lodashEs.isNumber(p.longitude));
            };
        /**
         * @param {?=} reversed
         * @return {?}
         */
        Position.prototype.toGeoLoc = /**
         * @param {?=} reversed
         * @return {?}
         */
            function (reversed) {
                if (reversed === void 0) {
                    reversed = false;
                }
                return reversed ? [this.longitude, this.latitude] : [this.latitude, this.longitude];
            };
        /**
         * @return {?}
         */
        Position.prototype.toJson = /**
         * @return {?}
         */
            function () {
                return { latitude: this.latitude, longitude: this.longitude };
            };
        /**
         * @return {?}
         */
        Position.prototype.toStringLoc = /**
         * @return {?}
         */
            function () {
                return this.latitude + ',' + this.longitude;
            };
        return Position;
    }());
    var GeoLocation = /** @class */ (function () {
        function GeoLocation(geolocation, coreConfig) {
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
        GeoLocation.prototype.getDistance = /**
         * @param {?} lat1
         * @param {?} lon1
         * @param {?} lat2
         * @param {?} lon2
         * @param {?=} unit
         * @return {?}
         */
            function (lat1, lon1, lat2, lon2, unit) {
                if (unit === void 0) {
                    unit = 'K';
                }
                /** @type {?} */
                var radlat1 = (Math.PI * lat1) / 180;
                /** @type {?} */
                var radlat2 = (Math.PI * lat2) / 180;
                /** @type {?} */
                var theta = lon1 - lon2;
                /** @type {?} */
                var radtheta = (Math.PI * theta) / 180;
                /** @type {?} */
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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
            };
        /**
         * @param {?=} forceRefresh
         * @return {?}
         */
        GeoLocation.prototype.getLocation = /**
         * @param {?=} forceRefresh
         * @return {?}
         */
            function (forceRefresh) {
                var _this = this;
                if (forceRefresh === void 0) {
                    forceRefresh = false;
                }
                if (this.coreConfig.isCordova()) {
                    return this.geolocation
                        .getCurrentPosition({
                        enableHighAccuracy: true,
                        maximumAge: 90000,
                        timeout: this.timeout
                    })
                        .then(( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) { return new Position(value.coords); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) { return _this.defaultPosition; }));
                }
                else if (navigator && navigator.geolocation) {
                    return new Promise(( /**
                     * @param {?} resolve
                     * @param {?} reject
                     * @return {?}
                     */function (resolve, reject) {
                        if (!forceRefresh && _this.cache && (!_this.cacheTimestamp || stencil.dateDiffInMinutes(new Date(), _this.cacheTimestamp) > 15)) {
                            resolve(_this.cache);
                        }
                        else {
                            navigator.geolocation.getCurrentPosition(( /**
                             * @param {?} pos
                             * @return {?}
                             */function (pos) {
                                _this.cache = new Position(pos.coords);
                                _this.cacheTimestamp = new Date();
                                resolve(_this.cache);
                            }), ( /**
                             * @param {?} err
                             * @return {?}
                             */function (err) {
                                _this.cache = _this.defaultPosition;
                                _this.cacheTimestamp = new Date();
                                resolve(_this.defaultPosition);
                            }), { enableHighAccuracy: false, timeout: 10 * 1000, maximumAge: 10 * 60 * 1000 });
                        }
                    }));
                }
                else {
                    return Promise.resolve(null);
                }
            };
        GeoLocation.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        GeoLocation.ctorParameters = function () {
            return [
                { type: ngx.Geolocation },
                { type: CoreConfig }
            ];
        };
        return GeoLocation;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Log = /** @class */ (function () {
        function Log(coreConfig) {
            this.coreConfig = coreConfig;
        }
        /**
         * @param {?=} message
         * @param {...?} optionalParams
         * @return {?}
         */
        Log.prototype.log = /**
         * @param {?=} message
         * @param {...?} optionalParams
         * @return {?}
         */
            function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                var _a;
                if (this.coreConfig.getMode() === 'dev') {
                    (_a = window['console']).log.apply(_a, __spread([message], optionalParams));
                }
            };
        /**
         * @param {?=} message
         * @param {...?} optionalParams
         * @return {?}
         */
        Log.prototype.forceLog = /**
         * @param {?=} message
         * @param {...?} optionalParams
         * @return {?}
         */
            function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                var _a;
                (_a = window['console']).log.apply(_a, __spread([message], optionalParams));
            };
        /**
         * @param {?=} message
         * @param {...?} optionalParams
         * @return {?}
         */
        Log.prototype.error = /**
         * @param {?=} message
         * @param {...?} optionalParams
         * @return {?}
         */
            function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                var _a;
                if (this.coreConfig.getMode() === 'dev') {
                    (_a = window['console']).error.apply(_a, __spread([message], optionalParams));
                }
            };
        /**
         * @param {?} message
         * @return {?}
         */
        Log.prototype.alert = /**
         * @param {?} message
         * @return {?}
         */
            function (message) {
                window['alert'](message);
            };
        Log.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Log.ctorParameters = function () {
            return [
                { type: CoreConfig }
            ];
        };
        return Log;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //https://github.com/ionic-team/ionic-storage/blob/master/src/storage.ts
    var LocalForageService = /** @class */ (function () {
        function LocalForageService(coreConfig, log) {
            this.coreConfig = coreConfig;
            this.log = log;
            this.init().then(( /**
             * @return {?}
             */function () { }), ( /**
             * @param {?} err
             * @return {?}
             */function (err) { }));
        }
        /**
         * @return {?}
         */
        LocalForageService.prototype.init = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.coreConfig.isCordova()) {
                    try {
                        return localForage.defineDriver(cordovaSQLiteDriver).then(( /**
                         * @return {?}
                         */function () {
                            return localForage.setDriver
                                .bind(localForage)([cordovaSQLiteDriver._driver, localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE])
                                .then(( /**
                         * @return {?}
                         */function () {
                                _this.log.log('setDriver:' + localForage.driver.bind(localForage)());
                                return Promise.resolve();
                            }));
                        }));
                    }
                    catch (err) {
                        this.log.error(err);
                        return Promise.resolve();
                    }
                }
                else if (localForage.supports(localForage.WEBSQL)) {
                    //!this.coreConfig.isFirefox() && !this.coreConfig.isIE()) {
                    return localForage.setDriver.bind(localForage)(localForage.WEBSQL);
                }
                return Promise.resolve();
            };
        /**
         * @template T
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        LocalForageService.prototype.set = /**
         * @template T
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                return localForage.setItem.bind(localForage)(key, value);
            };
        /**
         * @template T
         * @param {?} key
         * @return {?}
         */
        LocalForageService.prototype.get = /**
         * @template T
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return localForage.getItem.bind(localForage)(key);
            };
        /**
         * @param {?} key
         * @return {?}
         */
        LocalForageService.prototype.remove = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return localForage.removeItem.bind(localForage)(key);
            };
        /**
         * @return {?}
         */
        LocalForageService.prototype.clear = /**
         * @return {?}
         */
            function () {
                return localForage.clear.bind(localForage)();
            };
        LocalForageService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalForageService.ctorParameters = function () {
            return [
                { type: CoreConfig },
                { type: Log }
            ];
        };
        return LocalForageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocalStorage = /** @class */ (function () {
        function LocalStorage(coreConfig) {
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
        LocalStorage.prototype.set = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                try {
                    this.localStorage[key] = value;
                }
                catch (e) { }
            };
        /**
         * @param {?} key
         * @return {?}
         */
        LocalStorage.prototype.get = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return this.localStorage[key] || false;
            };
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        LocalStorage.prototype.setObject = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                this.localStorage[key] = JSON.stringify(value);
            };
        /**
         * @param {?} key
         * @return {?}
         */
        LocalStorage.prototype.getObject = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (this.localStorage[key]) {
                    return JSON.parse(this.localStorage[key]);
                }
                else {
                    return null;
                }
            };
        /**
         * @param {?} key
         * @return {?}
         */
        LocalStorage.prototype.remove = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (!this.coreConfig.isUniversal()) {
                    this.localStorage.removeItem(key);
                }
                else {
                    delete this.localStorage[key];
                }
            };
        /**
         * @return {?}
         */
        LocalStorage.prototype.clear = /**
         * @return {?}
         */
            function () {
                if (!this.coreConfig.isUniversal()) {
                    /** @type {?} */
                    var server = this.get('SERVER');
                    this.localStorage.clear();
                    if (server) {
                        this.set('SERVER', server);
                    }
                }
                else {
                    this.localStorage = {};
                }
            };
        LocalStorage.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalStorage.ctorParameters = function () {
            return [
                { type: CoreConfig }
            ];
        };
        return LocalStorage;
    }());

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
        return ( /**
         * @param {?} target
         * @param {?} decoratedPropertyName
         * @return {?}
         */function (target, decoratedPropertyName) {
            /** @type {?} */
            var options = Object.assign({}, { storageKey: storageKey || decoratedPropertyName });
            /** @type {?} */
            var _value;
            if (useAsync) {
                localForage.getItem(options.storageKey).then(( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) {
                    _value = v;
                    if (callback) {
                        callback(v);
                    }
                }), ( /**
                 * @return {?}
                 */function () { }));
            }
            else {
                if (typeof window !== 'undefined') {
                    if (localStorage.getItem(options.storageKey) && isValidJson(localStorage.getItem(options.storageKey))) {
                        _value = JSON.parse(( /** @type {?} */(localStorage.getItem(options.storageKey))));
                    }
                    else {
                        _value = null;
                    }
                }
            }
            /** @type {?} */
            var _isInitialised = false;
            /** @type {?} */
            var propertyObj = {
                get: ( /**
                 * @return {?}
                 */function () {
                    _isInitialised = true;
                    return _value;
                }),
                set: ( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
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
                                localForage.setItem(options.storageKey, value).catch(( /**
                                 * @return {?}
                                 */function () { }));
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
    var Network = /** @class */ (function () {
        function Network(coreConfig, networkNative) {
            var _this = this;
            this.coreConfig = coreConfig;
            this.networkNative = networkNative;
            this._isForcedOffline = false;
            this._isOffline = false;
            this._supportedConnections = ['wifi', 'ethernet', '4g', '3g'];
            this._connectionChange = new rxjs.Subject();
            if (this.coreConfig.isCordova()) {
                /** @type {?} */
                var connection = this.networkNative.type;
                if (lodashEs.isUndefined(connection)) {
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
                this._onConnectSubscription = ( /** @type {?} */(this.networkNative.onConnect().subscribe(( /**
                 * @return {?}
                 */function () {
                    _this._isOffline = false;
                    _this.emit();
                }))));
                this._onDisconnectSubscription = ( /** @type {?} */(this.networkNative.onDisconnect().subscribe(( /**
                 * @return {?}
                 */function () {
                    _this._isOffline = true;
                    _this.emit();
                }))));
            }
            else if (!this.coreConfig.isUniversal()) {
                this.onlineListener = ( /**
                 * @return {?}
                 */function () {
                    _this._isOffline = false;
                    _this.emit();
                });
                this.offlineListener = ( /**
                 * @return {?}
                 */function () {
                    _this._isOffline = true;
                    _this.emit();
                });
                window.addEventListener('online', this.onlineListener);
                window.addEventListener('offline', this.offlineListener);
            }
        }
        /**
         * @return {?}
         */
        Network.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this._onConnectSubscription) {
                    this._onConnectSubscription.unsubscribe();
                }
                if (this._onDisconnectSubscription) {
                    this._onDisconnectSubscription.unsubscribe();
                }
                window.removeEventListener('online', this.onlineListener);
                window.removeEventListener('offline', this.offlineListener);
            };
        Object.defineProperty(Network.prototype, "connectionChange$", {
            get: /**
             * @return {?}
             */ function () {
                return this._connectionChange.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        Network.prototype.isOffline = /**
         * @return {?}
         */
            function () {
                return this._isForcedOffline || this._isOffline;
            };
        /**
         * @return {?}
         */
        Network.prototype.isForcedOffline = /**
         * @return {?}
         */
            function () {
                return this._isForcedOffline;
            };
        /**
         * @return {?}
         */
        Network.prototype.getConnection = /**
         * @return {?}
         */
            function () {
                return this.networkNative.type;
            };
        /**
         * @return {?}
         */
        Network.prototype.emit = /**
         * @return {?}
         */
            function () {
                this._connectionChange.next(this._isForcedOffline || this._isOffline);
            };
        /**
         * @param {?} offline
         * @param {?=} emit
         * @return {?}
         */
        Network.prototype.forceOffline = /**
         * @param {?} offline
         * @param {?=} emit
         * @return {?}
         */
            function (offline, emit) {
                if (emit === void 0) {
                    emit = true;
                }
                this._isForcedOffline = offline;
                if (emit) {
                    this.emit();
                }
            };
        Network.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Network.ctorParameters = function () {
            return [
                { type: CoreConfig },
                { type: ngx$1.Network }
            ];
        };
        __decorate([
            Persistent(),
            __metadata("design:type", Boolean)
        ], Network.prototype, "_isForcedOffline", void 0);
        return Network;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PromiseService = /** @class */ (function () {
        function PromiseService() {
            var _this = this;
            this.retryOnFailure = ( /**
             * @param {?} functionToRetry
             * @param {?=} timesToRetry
             * @param {?=} delay
             * @return {?}
             */function (functionToRetry, timesToRetry, delay) {
                if (timesToRetry === void 0) {
                    timesToRetry = 3;
                }
                if (delay === void 0) {
                    delay = 300;
                }
                /** @type {?} */
                var retryCount = timesToRetry;
                /** @type {?} */
                var failureReason;
                /** @type {?} */
                var functionToIterate = ( /**
                 * @param {...?} args
                 * @return {?}
                 */function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (retryCount < 1) {
                        return Promise.reject(failureReason);
                    }
                    else {
                        retryCount--;
                        return functionToRetry.apply(void 0, __spread(args)).catch(( /**
                         * @param {?} err
                         * @return {?}
                         */function (err) {
                            failureReason = err;
                            return _this.wait(delay).then(( /**
                             * @return {?}
                             */function () { return functionToIterate.apply(void 0, __spread(args)); }));
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
        PromiseService.prototype.wait = /**
         * @param {?} duration
         * @return {?}
         */
            function (duration) {
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    setTimeout(resolve, duration);
                }));
            };
        /**
         * @param {?} ms
         * @param {?} promise
         * @return {?}
         */
        PromiseService.prototype.promiseTimeout = /**
         * @param {?} ms
         * @param {?} promise
         * @return {?}
         */
            function (ms, promise) {
                // Create a promise that rejects in <ms> milliseconds
                /** @type {?} */
                var timeout = new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    /** @type {?} */
                    var id = setTimeout(( /**
                     * @return {?}
                     */function () {
                        clearTimeout(id);
                        reject('Timed out in ' + ms + 'ms.');
                    }), ms);
                }));
                // Returns a race between our timeout and the passed in promise
                return Promise.race([promise, timeout]);
            };
        /**
         * @param {?} promises
         * @return {?}
         */
        PromiseService.prototype.sequential = /**
         * @param {?} promises
         * @return {?}
         */
            function (promises) {
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    if (!promises || promises.length === 0) {
                        //throw new Error('First argument need to be an array of Promises');
                        return resolve([]);
                    }
                    /** @type {?} */
                    var count = 0;
                    /** @type {?} */
                    var results = [];
                    /** @type {?} */
                    var iterateeFunc = ( /**
                     * @param {?} previousPromise
                     * @param {?} currentPromise
                     * @return {?}
                     */function (previousPromise, currentPromise) {
                        return previousPromise
                            .then(( /**
                     * @param {?} result
                     * @return {?}
                     */function (result) {
                            if (count++ !== 0) {
                                results = results.concat(result);
                            }
                            return currentPromise(result, results, count);
                        }))
                            .catch(( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) {
                            return reject(err);
                        }));
                    });
                    promises = promises.concat(( /**
                     * @return {?}
                     */function () { return Promise.resolve(); }));
                    promises.reduce(iterateeFunc, Promise.resolve(false)).then(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        resolve(results);
                    }));
                }));
                // let p = Promise.resolve();
                // return promises.reduce((pacc, fn) => {
                //     return pacc = pacc.then(fn);
                // }, p);
            };
        PromiseService.decorators = [
            { type: core.Injectable }
        ];
        return PromiseService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Utils = /** @class */ (function () {
        function Utils(coreConfig) {
            this.coreConfig = coreConfig;
        }
        /**
         * @param {?} url
         * @return {?}
         */
        Utils.prototype.loadScript = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                var _this = this;
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    if (_this.coreConfig.isUniversal()) {
                        resolve(true);
                    }
                    else {
                        /** @type {?} */
                        var element = document.getElementsByTagName('head')[0];
                        /** @type {?} */
                        var html = "<script async type=text/javascript src=" + url + "></script>";
                        postscribe(element, html, {
                            done: ( /**
                             * @return {?}
                             */function () {
                                resolve(true);
                            })
                        });
                    }
                }));
            };
        /**
         * @param {?} key
         * @param {?=} url
         * @return {?}
         */
        Utils.prototype.getUrlParameterByName = /**
         * @param {?} key
         * @param {?=} url
         * @return {?}
         */
            function (key, url) {
                if (!url) {
                    url = window.location.href;
                }
                key = key.replace(/[\[\]]/g, '\\$&');
                /** @type {?} */
                var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
                /** @type {?} */
                var results = regex.exec(url);
                if (!results) {
                    return null;
                }
                if (!results[2]) {
                    return '';
                }
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            };
        /**
         * @param {?} key
         * @param {?} url
         * @return {?}
         */
        Utils.prototype.removeParameterFromUrl = /**
         * @param {?} key
         * @param {?} url
         * @return {?}
         */
            function (key, url) {
                /** @type {?} */
                var rtn = url.split('?')[0];
                /** @type {?} */
                var param;
                /** @type {?} */
                var paramsArr = [];
                /** @type {?} */
                var queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
                if (queryString !== '') {
                    paramsArr = queryString.split('&');
                    for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
                        param = paramsArr[i].split('=')[0];
                        if (param === key) {
                            paramsArr.splice(i, 1);
                        }
                    }
                    rtn = rtn + '?' + paramsArr.join('&');
                }
                return rtn;
            };
        Utils.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Utils.ctorParameters = function () {
            return [
                { type: CoreConfig }
            ];
        };
        return Utils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CommonModule = /** @class */ (function () {
        function CommonModule() {
        }
        /**
         * @param {?=} configuredProviders
         * @return {?}
         */
        CommonModule.forRoot = /**
         * @param {?=} configuredProviders
         * @return {?}
         */
            function (configuredProviders) {
                if (configuredProviders === void 0) {
                    configuredProviders = [];
                }
                return {
                    ngModule: CommonModule,
                    providers: __spread(configuredProviders, [CoreConfig, GeoLocation, LocalForageService, LocalStorage, Log, Network, PromiseService, Utils, ngx.Geolocation, ngx$1.Network])
                };
            };
        CommonModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [common.CommonModule, http.HttpClientModule],
                        exports: [common.CommonModule, http.HttpClientModule]
                    },] }
        ];
        return CommonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} baseCtors
     * @return {?}
     */
    function MixIn(baseCtors) {
        return ( /**
         * @param {?} derivedCtor
         * @return {?}
         */function (derivedCtor) {
            baseCtors.forEach(( /**
             * @param {?} baseCtor
             * @return {?}
             */function (baseCtor) {
                /** @type {?} */
                var fieldCollector = {};
                baseCtor.apply(fieldCollector);
                Object.getOwnPropertyNames(fieldCollector).forEach(( /**
                 * @param {?} name
                 * @return {?}
                 */function (name) {
                    derivedCtor.prototype[name] = fieldCollector[name];
                }));
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(( /**
                 * @param {?} name
                 * @return {?}
                 */function (name) {
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
    function AutoUnsubscribe(blackList) {
        if (blackList === void 0) {
            blackList = [];
        }
        return ( /**
         * @param {?} constructor
         * @return {?}
         */function (constructor) {
            /** @type {?} */
            var original = constructor.prototype.ngOnDestroy;
            constructor.prototype.ngOnDestroy = ( /**
             * @return {?}
             */function () {
                for (var prop in this) {
                    /** @type {?} */
                    var property = this[prop];
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
    var Colors = /** @class */ (function () {
        function Colors() {
        }
        /**
         * @param {?} hex
         * @param {?=} opacity
         * @return {?}
         */
        Colors.hexToRgb = /**
         * @param {?} hex
         * @param {?=} opacity
         * @return {?}
         */
            function (hex, opacity) {
                if (opacity === void 0) {
                    opacity = 1;
                }
                /** @type {?} */
                var bigint = parseInt(hex.replace('#', ''), 16);
                /** @type {?} */
                var r = (bigint >> 16) & 255;
                /** @type {?} */
                var g = (bigint >> 8) & 255;
                /** @type {?} */
                var b = bigint & 255;
                return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            };
        /**
         * @return {?}
         */
        Colors.getKeys = /**
         * @return {?}
         */
            function () {
                return ['success', 'danger', 'black', 'warning', 'stable'];
            };
        /**
         * @param {?} color
         * @param {?=} defaultValue
         * @return {?}
         */
        Colors.getCssColor = /**
         * @param {?} color
         * @param {?=} defaultValue
         * @return {?}
         */
            function (color, defaultValue) {
                if (document) {
                    /** @type {?} */
                    var retVal = getComputedStyle(document.body).getPropertyValue('--' + color) || defaultValue || Colors[color.replace('-color', '')];
                    retVal = (retVal || '').trim();
                    return retVal;
                }
                return defaultValue || Colors[color];
            };
        /**
         * @param {?} color
         * @param {?} amount
         * @return {?}
         */
        Colors.lightenDarkenColor = /**
         * @param {?} color
         * @param {?} amount
         * @return {?}
         */
            function (color, amount) {
                /** @type {?} */
                var usePound = false;
                if (color[0] === '#') {
                    color = color.slice(1);
                    usePound = true;
                }
                /** @type {?} */
                var num = parseInt(color, 16);
                /** @type {?} */
                var r = (num >> 16) + amount;
                if (r > 255) {
                    r = 255;
                }
                else if (r < 0) {
                    r = 0;
                }
                /** @type {?} */
                var b = ((num >> 8) & 0x00ff) + amount;
                if (b > 255) {
                    b = 255;
                }
                else if (b < 0) {
                    b = 0;
                }
                /** @type {?} */
                var g = (num & 0x0000ff) + amount;
                if (g > 255) {
                    g = 255;
                }
                else if (g < 0) {
                    g = 0;
                }
                return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
            };
        /**
         * @return {?}
         */
        Colors.toggleDarkTheme = /**
         * @return {?}
         */
            function () {
                Colors.setDarkTheme(!Colors.isDarkTheme());
            };
        /**
         * @return {?}
         */
        Colors.isDarkTheme = /**
         * @return {?}
         */
            function () {
                return Colors._isDarkTheme;
            };
        /**
         * @param {?} enabled
         * @return {?}
         */
        Colors.setDarkTheme = /**
         * @param {?} enabled
         * @return {?}
         */
            function (enabled) {
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
            };
        /**
         * @return {?}
         */
        Colors.toggleBigFonts = /**
         * @return {?}
         */
            function () {
                Colors.setBigFonts(!Colors.isBigFonts());
            };
        /**
         * @return {?}
         */
        Colors.isBigFonts = /**
         * @return {?}
         */
            function () {
                return Colors._isBigFonts;
            };
        /**
         * @param {?} enabled
         * @return {?}
         */
        Colors.setBigFonts = /**
         * @param {?} enabled
         * @return {?}
         */
            function (enabled) {
                Colors._isBigFonts = enabled;
                if (document) {
                    if (enabled) {
                        document.documentElement.classList.add('big-fonts');
                    }
                    else {
                        document.documentElement.classList.remove('big-fonts');
                    }
                }
            };
        Colors._isDarkTheme = false;
        Colors._isBigFonts = false;
        Colors.success = Colors.getCssColor('success');
        Colors.danger = Colors.getCssColor('danger');
        Colors.warning = Colors.getCssColor('warning');
        Colors.black = Colors.getCssColor('black');
        Colors.light = Colors.getCssColor('light');
        Colors.stable = Colors.getCssColor('stable');
        return Colors;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.CommonModule = CommonModule;
    exports.MixIn = MixIn;
    exports.Persistent = Persistent;
    exports.AutoUnsubscribe = AutoUnsubscribe;
    exports.Colors = Colors;
    exports.CORECONFIG_CONSTANTS = CORECONFIG_CONSTANTS;
    exports.CoreConfig = CoreConfig;
    exports.Position = Position;
    exports.GeoLocation = GeoLocation;
    exports.LocalForageService = LocalForageService;
    exports.LocalStorage = LocalStorage;
    exports.Log = Log;
    exports.Network = Network;
    exports.PromiseService = PromiseService;
    exports.Utils = Utils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=common.umd.js.map