import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { JwtHelperService } from '@auth0/angular-jwt';
import { read as read$1, utils, write, SSF } from 'xlsx';
import saveAs from 'file-saver';
import { parse } from 'papaparse';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push } from '@ionic-native/push/ngx';
import { LocalStorage, CoreConfig, Persistent, LocalForageService, PromiseService, Log, GeoLocation, Position, Network, Colors, CommonModule } from '@shared/common';
import { Translate, TranslateModule } from '@shared/translate';
import { isPresent, getUUID, dateFormat, dateAdd, MOBILE_FORM_FIELDS_ALL, FormFieldType, isImageFile, isNumberField, isBooleanField, isPhotoField, isMultiPhotosField, isPhotoOrMultiPhotosField, isVideoField, isDateTimeField, isIntervalField, isMultipleField, isColoredField, isFile, isBase64, isFileUri, read, getExtension, changeExtension, getMaxSize, toPng, isValid, isImage, isVideo, isAudio, isDocument, getType, getMimeType, getIcon, getVideoPoster, b64toBlob, blobToFile, b64ToFile, saveBase64AsImageFile, resizeBase64Image, getBase64MimeType, getBase64Extension, resizeImage, getNativeDirectory, resolveFilePath, fixImageOrientation, moveToImageDirectory, moveToImageDirectoryBase, fileNativeWriteFile, fileNativeCheckFile, fixAbsolutePath, getCloudinaryUrl, getLocalFilePath, getLocalFileName, saveToLocalFile, cleanFileName, getUrlWithAnnotations, showPdfOnDevice, downloadFileToDevice, openBlob, afterOpenBlob, toDate, utc, startOf, cacheFile, isNullOrUndefined, ICondition, IConditionalField, ITenant, ILocationType, IUser, IUserSettings, ISimpleUser, IRoles, INotification, dateParse, fromNow, IMissionDescription, IScoring, downloadFile, IGroup, getUTCOffset, isBlank, IAggregateLog, IAlgorithm, IAutorenewConfig, IBackup, ICatalog, IChartDefinition, IDashboard, IFile, IFolder, IFileOrFolder, IKpi, IIMapping, IOperation, IProduct, IPublicApiToken, ISlide, ITableau, ITagGroup, ITag, ITodo, ITodoTask, ITodoTaskSimple, ITranslation, IWorkplaceGroups, IWorkplacePost } from '@shared/stencil';
import { __extends, __decorate, __metadata, __spread, __assign } from 'tslib';
import { Injectable, EventEmitter, Injector, Pipe, NgModule } from '@angular/core';
import { Observable, of, throwError, from, combineLatest, forkJoin, Subscription, Subject, ReplaySubject, timer } from 'rxjs';
import { catchError, map, concatMap, mergeMap, flatMap, filter as filter$1, take, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { keys, cloneDeep, compact, uniq, union, isArray, isObject, isString, map as map$1, pull, assign, isEmpty, get, findIndex, uniqBy, set, flatten, forEach, concat, remove, isEqual, intersection, orderBy, startCase, pick, without, filter, merge, some, every, isNumber, range, sortBy, difference, find, isDate, isNaN, capitalize, isFunction } from 'lodash-es';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Config = /** @class */ (function () {
    function Config(localStorage, coreConfig, translate) {
        this.localStorage = localStorage;
        this.coreConfig = coreConfig;
        this.translate = translate;
    }
    Object.defineProperty(Config.prototype, "servers", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var servers = [
                { _id: 'prod', name: 'Production', url: Config.PROD_URL },
                { _id: 'sandbox', name: 'Sandbox', url: Config.SANDBOX_URL },
                { _id: 'demo', name: 'Demo', url: Config.DEMO_URL },
                { _id: 'demofresh', name: 'Demo Fresh', url: Config.DEMO_FRESH_URL },
                { _id: 'staging', name: 'Staging', url: Config.STAGING_URL },
                { _id: 'dev', name: 'Development', url: Config.DEV_URL },
                { _id: 'dev1', name: 'Development 1', url: Config.DEV1_URL },
                { _id: 'trial', name: 'Trial', url: Config.TRIAL_URL },
                { _id: 'e2e', name: 'E2E', url: Config.E2E_URL }
            ];
            if (!this.coreConfig.isUniversal() || location.hostname === 'localhost') {
                servers.push({ _id: 'localhost', name: 'Localhost', url: Config.LOCALHOST_URL });
                servers.push({ _id: 'testpen', name: 'Testpen', url: Config.TESTPEN_URL });
            }
            if (this.isTestpen) {
                servers = [{ _id: 'testpen', name: 'Testpen', url: Config.TESTPEN_URL }];
            }
            if (this.isSandbox) {
                servers = [{ _id: 'sandbox', name: 'Sandbox', url: Config.SANDBOX_URL }];
            }
            return servers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "serverUrl", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isTestpen) {
                return Config.TESTPEN_URL;
            }
            if (this.isSandbox) {
                return Config.SANDBOX_URL;
            }
            /** @type {?} */
            var defaultServer;
            if (this.server && this.server !== '') {
                defaultServer = this.server;
            }
            else {
                defaultServer = Config.PROD_URL; //Config.DEV_URL;
            }
            this.server = this.localStorage.get('SERVER') || defaultServer;
            return this.server;
        },
        set: /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            this.localStorage.set('SERVER', url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "serverName", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var server = this.servers.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.url === _this.serverUrl; }));
            if (server && server.length === 1) {
                return server[0].name;
            }
            return this.translate.get('CUSTOM');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "apiUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl + 'api/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "publicApiUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl + 'public/api/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "uploadUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'ImageContainers/cloudinary/upload';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "uploadProxyUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'cloudinary/uploadProxyImage';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "zapierInstagramUrl", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var url = this.serverUrl;
            switch (url) {
                case Config.PROD_URL:
                    return Config.ZAPIER_INSTAGRAM_PROD_URL;
                default:
                    return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isTestpen", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.coreConfig.isUniversal() && (location.hostname === 'testpen-dashboard.yoobic.com' || location.hostname === 'testpen-mobile.yoobic.com' || this.server === Config.TESTPEN_URL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isSandbox", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.coreConfig.isUniversal() && (location.hostname === 'dashboard-sandbox.yoobic.com' || location.hostname === 'operations-sandbox.yoobic.com' || location.hostname === 'operations-mobile-sandbox.yoobic.com');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isE2E", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl === Config.E2E_URL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isProduction", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl === Config.PROD_URL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "isDemo", {
        get: /**
         * @return {?}
         */
        function () {
            return this.serverUrl === Config.DEMO_URL || this.serverUrl === Config.DEMO_FRESH_URL;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Config.prototype.getCurrentConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var items = this.servers.map((/**
         * @param {?} server
         * @return {?}
         */
        function (server) { return ({
            title: server.name,
            url: server.url,
            _id: server._id,
            icon: 'yo-servers'
        }); }));
        /** @type {?} */
        var custom = {
            title: this.translate.get('CUSTOM'),
            url: null,
            _id: 'custom',
            icon: 'yo-edit'
        };
        /** @type {?} */
        var selections = items.filter((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.url === _this.serverUrl; }));
        /** @type {?} */
        var initialSelection;
        if (selections.length <= 0) {
            custom.url = this.serverUrl;
            initialSelection = custom;
        }
        else {
            initialSelection = selections[0];
        }
        items.unshift(custom);
        return { items: items, initialSelection: initialSelection, custom: custom };
    };
    Config.PROD_URL = 'https://api.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //private static CHINA_PROD_URL = 'https://china.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    Config.SANDBOX_URL = 'https://api-sandbox.yoobic.com/'; //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    //https://yoobic-loopback-prod-v3.herokuapp.com/'; // 'https://api.yoobic.com/'
    Config.STAGING_URL = 'https://yoobic-loopback-staging-v3.herokuapp.com/';
    Config.DEMO_URL = 'https://api-demo.yoobic.com/';
    Config.DEMO_FRESH_URL = 'https://yoobic-loopback-demo-fresh.herokuapp.com/';
    Config.DEV_URL = 'https://yoobic-loopback-dev-v3.herokuapp.com/';
    Config.DEV1_URL = 'https://yoobic-loopback-dev1-v3.herokuapp.com/';
    Config.LOCALHOST_URL = 'https://localhost:3000/';
    Config.TESTPEN_URL = 'https://testpen.yoobic.com/';
    Config.TRIAL_URL = 'https://yoobic-loopback-trial.herokuapp.com/';
    Config.E2E_URL = 'https://yoobic-loopback-e2e.herokuapp.com/';
    Config.IMAGE_URL = 'https://upload.yoobic.com/api/'; // 'https://images.yoobic.com/api/ImageContainers/cloudinary/upload'; //'https://192.168.1.88:3000/api/ImageContainers/cloudinary/upload'//'http://localhost:3000/api/ImageContainers/cloudinary/upload'; //
    // 'https://images.yoobic.com/api/ImageContainers/cloudinary/upload'; //'https://192.168.1.88:3000/api/ImageContainers/cloudinary/upload'//'http://localhost:3000/api/ImageContainers/cloudinary/upload'; //
    Config.ZAPIER_INSTAGRAM_PROD_URL = 'https://etl.yoobic.com/flows/zapier_instagram_start';
    Config.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Config.ctorParameters = function () { return [
        { type: LocalStorage },
        { type: CoreConfig },
        { type: Translate }
    ]; };
    return Config;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Session = /** @class */ (function () {
    function Session(localForage, config) {
        this.localForage = localForage;
        this.config = config;
        this.openedChannels = [];
        this.selectedMissionDescription = null;
        this.selectedLocation = null;
    }
    Object.defineProperty(Session.prototype, "apiUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.apiUrl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} clearUser
     * @return {?}
     */
    Session.prototype.clear = /**
     * @param {?=} clearUser
     * @return {?}
     */
    function (clearUser) {
        if (clearUser === void 0) { clearUser = true; }
        if (clearUser) {
            this.token = '';
            this.user = null;
            this.userId = null;
            this.tenant = null;
            this.currencies = [];
            this.groups = [];
            this.roles = [];
            this.hideWalkthrough = false;
            this.localPendingBadges = {};
            this.debugEvent = false;
        }
        return Promise.resolve();
    };
    Session.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Session.ctorParameters = function () { return [
        { type: LocalForageService },
        { type: Config }
    ]; };
    __decorate([
        Persistent('login.hideWalkthrough'),
        __metadata("design:type", Boolean)
    ], Session.prototype, "hideWalkthrough", void 0);
    __decorate([
        Persistent('badges'),
        __metadata("design:type", Object)
    ], Session.prototype, "localPendingBadges", void 0);
    __decorate([
        Persistent('debugEvent'),
        __metadata("design:type", Boolean)
    ], Session.prototype, "debugEvent", void 0);
    return Session;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var LoadingBarEventType = {
    PROGRESS: 0,
    VISIBLE: 1,
};
LoadingBarEventType[LoadingBarEventType.PROGRESS] = 'PROGRESS';
LoadingBarEventType[LoadingBarEventType.VISIBLE] = 'VISIBLE';
var LoadingBarEvent = /** @class */ (function () {
    function LoadingBarEvent(type, value) {
        this.type = type;
        this.value = value;
    }
    return LoadingBarEvent;
}());
var LoadingBar = /** @class */ (function () {
    function LoadingBar() {
        var _this = this;
        this.interval = 500; // in milliseconds
        this._progress = 0;
        this._visible = true;
        this._intervalCounterId = 0;
        this.observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this.subscriber = subscriber;
        }));
    }
    Object.defineProperty(LoadingBar.prototype, "progress", {
        get: /**
         * @return {?}
         */
        function () {
            return this._progress;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isPresent(value)) {
                if (value > 0) {
                    this.visible = true;
                }
                this._progress = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingBar.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isPresent(value)) {
                this._visible = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} onCompleted
     * @return {?}
     */
    LoadingBar.prototype.start = /**
     * @param {?=} onCompleted
     * @return {?}
     */
    function (onCompleted) {
        var _this = this;
        if (onCompleted === void 0) { onCompleted = null; }
        if (!this.isStarting) {
            this.isStarting = true;
            this.complete();
            this.visible = true;
            this._intervalCounterId = setInterval((/**
             * @return {?}
             */
            function () {
                _this.progress++;
                if (_this.progress === 100) {
                    _this.complete();
                }
            }), this.interval);
            this.isStarting = false;
        }
    };
    /**
     * @return {?}
     */
    LoadingBar.prototype.complete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
        this.progress = 100;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.visible = false;
            _this.progress = 0;
        }), 250);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    LoadingBar.prototype.emitEvent = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.subscriber) {
            this.subscriber.next(event);
        }
    };
    LoadingBar.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoadingBar.ctorParameters = function () { return []; };
    return LoadingBar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* beautify ignore:end */
var Requestor = /** @class */ (function () {
    function Requestor(http, session, config, loadingBar, coreConfig) {
        this.http = http;
        this.session = session;
        this.config = config;
        this.loadingBar = loadingBar;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    Requestor.prototype.fetch = /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (url, options) {
        var _this = this;
        if (options.body && typeof options.body === 'object') {
            options.body = JSON.stringify(options.body);
        }
        if (options.noHeader !== true) {
            options.headers = this.buildFetchHeaders();
        }
        delete options.noHeader;
        this.slimbarStart();
        return fetch(url, options)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.slimbarComplete();
            return res;
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        }));
    };
    /**
     * @param {?} url
     * @param {?} body
     * @param {?=} token
     * @param {?=} withCount
     * @param {?=} isTempToken
     * @param {?=} looseCount
     * @param {?=} partialUrl
     * @return {?}
     */
    Requestor.prototype.post = /**
     * @param {?} url
     * @param {?} body
     * @param {?=} token
     * @param {?=} withCount
     * @param {?=} isTempToken
     * @param {?=} looseCount
     * @param {?=} partialUrl
     * @return {?}
     */
    function (url, body, token, withCount, isTempToken, looseCount, partialUrl) {
        var _this = this;
        if (withCount === void 0) { withCount = false; }
        if (isTempToken === void 0) { isTempToken = false; }
        if (looseCount === void 0) { looseCount = false; }
        if (partialUrl === void 0) { partialUrl = false; }
        this.slimbarStart();
        if (partialUrl) {
            url = this.config.apiUrl + url;
        }
        return this.http
            .post(url, body ? JSON.stringify(body) : '', {
            headers: this.buildHeaders(withCount, token, null, isTempToken, false, looseCount),
            observe: 'response'
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.slimbarComplete();
            _this.updateToken(res);
            if (res['_body'] === '') {
                return {};
            }
            return _this.formatResponse(res, withCount);
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })));
    };
    /**
     * @param {?} url
     * @param {?} body
     * @param {?=} token
     * @param {?=} withCount
     * @param {?=} isTempToken
     * @param {?=} looseCount
     * @param {?=} partialUrl
     * @return {?}
     */
    Requestor.prototype.patch = /**
     * @param {?} url
     * @param {?} body
     * @param {?=} token
     * @param {?=} withCount
     * @param {?=} isTempToken
     * @param {?=} looseCount
     * @param {?=} partialUrl
     * @return {?}
     */
    function (url, body, token, withCount, isTempToken, looseCount, partialUrl) {
        var _this = this;
        if (withCount === void 0) { withCount = false; }
        if (isTempToken === void 0) { isTempToken = false; }
        if (looseCount === void 0) { looseCount = false; }
        if (partialUrl === void 0) { partialUrl = false; }
        this.slimbarStart();
        if (partialUrl) {
            url = this.config.apiUrl + url;
        }
        return this.http
            .patch(url, body ? JSON.stringify(body) : '', {
            headers: this.buildHeaders(withCount, token, null, isTempToken, false, looseCount),
            observe: 'response'
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.slimbarComplete();
            _this.updateToken(res);
            if (res['_body'] === '') {
                return {};
            }
            return _this.formatResponse(res, withCount);
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })));
    };
    /**
     * @param {?} url
     * @param {?} body
     * @param {?=} blob
     * @param {?=} includeToken
     * @return {?}
     */
    Requestor.prototype.postRaw = /**
     * @param {?} url
     * @param {?} body
     * @param {?=} blob
     * @param {?=} includeToken
     * @return {?}
     */
    function (url, body, blob, includeToken) {
        var _this = this;
        this.slimbarStart();
        return this.http
            .post(url, body ? JSON.stringify(body) : '', {
            headers: this.buildHeaders(false, null, null, null, !includeToken),
            responseType: (/** @type {?} */ ((blob ? 'arraybuffer' : 'json'))),
            observe: 'response'
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.slimbarComplete();
            return res;
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })));
    };
    /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    Requestor.prototype.postMultiPart = /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    function (url, data) {
        var _this = this;
        this.slimbarStart();
        /** @type {?} */
        var formData = new FormData();
        keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            formData.append(key, data[key]);
        }));
        /** @type {?} */
        var headers = new HttpHeaders();
        return this.http
            .post(url, formData, { headers: headers, observe: 'response', responseType: 'text' })
            .pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            _this.slimbarComplete();
            return ret.body;
        })))
            .pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            throw e;
        })));
    };
    /**
     * @param {?} url
     * @param {?} file
     * @return {?}
     */
    Requestor.prototype.postFile = /**
     * @param {?} url
     * @param {?} file
     * @return {?}
     */
    function (url, file) {
        var _this = this;
        this.slimbarStart();
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            /** @type {?} */
            var formData = new FormData();
            formData.append('file', file, file.name);
            /** @type {?} */
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (/**
             * @return {?}
             */
            function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(xhr.response ? JSON.parse(xhr.response) : '');
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                    _this.slimbarComplete();
                }
            });
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + _this.session.token);
            xhr.setRequestHeader('X-Application-Id', _this.coreConfig.getAppId());
            xhr.setRequestHeader('Yoobic-Client-Version', _this.coreConfig.getAppVersion());
            xhr.send(formData);
        }));
    };
    /**
     * @param {?} url
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} params
     * @param {?=} suppressToken
     * @return {?}
     */
    Requestor.prototype.get = /**
     * @param {?} url
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} params
     * @param {?=} suppressToken
     * @return {?}
     */
    function (url, withCount, token, params, suppressToken) {
        var _this = this;
        if (withCount === void 0) { withCount = false; }
        this.slimbarStart();
        /** @type {?} */
        var httpParams = new HttpParams();
        if (params && params.length > 0) {
            params.forEach((/**
             * @param {?} p
             * @return {?}
             */
            function (p) {
                httpParams = httpParams.set(p.name, p.value);
            }));
        }
        return this.http
            .get(url, {
            headers: this.buildHeaders(withCount, token, null, null, suppressToken),
            params: httpParams,
            observe: 'response'
        })
            .pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })), map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.slimbarComplete();
            _this.updateToken(res);
            return _this.formatResponse(res, withCount);
        })));
    };
    /**
     * @param {?} url
     * @return {?}
     */
    Requestor.prototype.getBinaryContent = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        this.slimbarStart();
        return this.http
            .get(url, { responseType: 'arraybuffer' })
            .pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            _this.slimbarComplete();
            return retVal;
        })))
            .pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })));
    };
    /**
     * @param {?} url
     * @param {?} body
     * @return {?}
     */
    Requestor.prototype.put = /**
     * @param {?} url
     * @param {?} body
     * @return {?}
     */
    function (url, body) {
        var _this = this;
        this.slimbarStart();
        return this.http
            .put(url, body ? JSON.stringify(body) : null, {
            headers: this.buildHeaders(),
            observe: 'response'
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.updateToken(res);
            _this.slimbarComplete();
            return res.body;
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })));
    };
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    Requestor.prototype.delete = /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    function (url, body) {
        var _this = this;
        this.slimbarStart();
        return this.http
            .request('delete', url, {
            headers: this.buildHeaders(),
            observe: 'response',
            body: body
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.updateToken(res);
            _this.slimbarComplete();
            return res.body;
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        })));
    };
    /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    Requestor.prototype.downloadFile = /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (filename, mediaType, url, options) {
        var _this = this;
        this.slimbarStart();
        return this.fetch(url, options)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res && res.blob ? res.blob() : null;
        }))
            .then((/**
         * @param {?} blob
         * @return {?}
         */
        function (blob) {
            if (blob) {
                ((/** @type {?} */ (saveAs)))(blob, filename);
            }
            _this.slimbarComplete();
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.slimbarComplete();
            return _this.errorHandler(e, url);
        }));
    };
    /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    Requestor.prototype.saveBlob = /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    function (blob, filename) {
        ((/** @type {?} */ (saveAs)))(blob, filename);
    };
    /**
     * @param {?} array
     * @param {?} filename
     * @return {?}
     */
    Requestor.prototype.saveArrayBuffer = /**
     * @param {?} array
     * @param {?} filename
     * @return {?}
     */
    function (array, filename) {
        /** @type {?} */
        var blob = new Blob([new Uint8Array(array)]);
        ((/** @type {?} */ (saveAs)))(blob, filename);
    };
    /**
     * @return {?}
     */
    Requestor.prototype.getFilenameSuffix = /**
     * @return {?}
     */
    function () {
        return '_' + new Date().toISOString().replace('.', '_');
    };
    /**
     * @private
     * @param {?} e
     * @param {?} url
     * @return {?}
     */
    Requestor.prototype.errorHandler = /**
     * @private
     * @param {?} e
     * @param {?} url
     * @return {?}
     */
    function (e, url) {
        /** @type {?} */
        var isInvalidCredentials = false;
        if (e && e.status === 401 && url && url.indexOf(this.config.serverUrl) >= 0 && e.error && e.error.error && (e.error.error.name === 'InvalidCredentials' || e.error.error.name === 'OnlySsoLoginAllowed' || e.error.error.message === 'Only SSO login allowed')) {
            isInvalidCredentials = true;
        }
        if (e.status === 401 && url && url.indexOf(this.config.serverUrl) >= 0 && !isInvalidCredentials && url.indexOf('getCampaignScore') < 0 && e.error && e.error.error && e.error.error.name && e.error.error.name.toUpperCase() === 'LOGOUT') {
            Requestor.unauthorizedEmitter.emit(e);
        }
        else if (e.status === 413) {
            Requestor.payloadTooBigEmitter.emit(e);
        }
        else if (e.status === 404) {
            return of(new HttpResponse((/** @type {?} */ ({ body: {}, status: 404 }))));
        } //else {
        throw e;
        //}
        //return Observable.of(e);
    };
    /**
     * @private
     * @param {?} res
     * @param {?=} withCount
     * @return {?}
     */
    Requestor.prototype.formatResponse = /**
     * @private
     * @param {?} res
     * @param {?=} withCount
     * @return {?}
     */
    function (res, withCount) {
        if (withCount === void 0) { withCount = false; }
        return withCount
            ? {
                data: res.body,
                count: +(res.headers.get('x-total-count') || res.headers.get('X-Total-Count') || res.headers.get('x-loose-count') || res.headers.get('X-Loose-Count')) || 0
            }
            : res.body;
    };
    /**
     * @private
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} contentType
     * @param {?=} isTempToken
     * @param {?=} suppressToken
     * @param {?=} looseCount
     * @return {?}
     */
    Requestor.prototype.buildHeaders = /**
     * @private
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} contentType
     * @param {?=} isTempToken
     * @param {?=} suppressToken
     * @param {?=} looseCount
     * @return {?}
     */
    function (withCount, token, contentType, isTempToken, suppressToken, looseCount) {
        if (withCount === void 0) { withCount = false; }
        /** @type {?} */
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', contentType || 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('X-Application-Id', this.coreConfig.getAppId());
        headers = headers.set('Yoobic-Client-Version', this.coreConfig.getAppVersion());
        if (withCount) {
            if (looseCount) {
                headers = headers.set('x-loose-count', 'true');
            }
            headers = headers.set('x-total-count', 'true');
        }
        else {
            headers = headers.set('x-loose-count', 'true');
        }
        if (suppressToken !== true) {
            if (token) {
                if (isTempToken) {
                    headers = headers.set('token', token);
                }
                else {
                    headers = headers.set('Authorization', 'Bearer ' + token);
                }
            }
            else if (this.session.token) {
                headers = headers.set('Authorization', 'Bearer ' + this.session.token);
            }
        }
        return headers;
    };
    /**
     * @private
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} contentType
     * @param {?=} isTempToken
     * @param {?=} suppressToken
     * @param {?=} looseCount
     * @return {?}
     */
    Requestor.prototype.buildFetchHeaders = /**
     * @private
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} contentType
     * @param {?=} isTempToken
     * @param {?=} suppressToken
     * @param {?=} looseCount
     * @return {?}
     */
    function (withCount, token, contentType, isTempToken, suppressToken, looseCount) {
        if (withCount === void 0) { withCount = false; }
        try {
            if (!this.coreConfig.isIE11() && Headers) {
                /** @type {?} */
                var headers = new Headers();
                headers.append('Content-Type', contentType || 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('X-Application-Id', this.coreConfig.getAppId());
                headers.append('Yoobic-Client-Version', this.coreConfig.getAppVersion());
                if (withCount) {
                    if (looseCount) {
                        headers.append('x-loose-count', 'true');
                    }
                    headers.append('x-total-count', 'true');
                }
                if (suppressToken !== true) {
                    if (token) {
                        if (isTempToken) {
                            headers.append('token', token);
                        }
                        else {
                            headers.append('Authorization', 'Bearer ' + token);
                        }
                    }
                    else if (this.session.token) {
                        headers.append('Authorization', 'Bearer ' + this.session.token);
                    }
                }
                return headers;
            }
        }
        catch (err) { }
        return this.buildFetchHeadersFallback(withCount, token, contentType, isTempToken, suppressToken, looseCount);
    };
    /**
     * @private
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} contentType
     * @param {?=} isTempToken
     * @param {?=} suppressToken
     * @param {?=} looseCount
     * @return {?}
     */
    Requestor.prototype.buildFetchHeadersFallback = /**
     * @private
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} contentType
     * @param {?=} isTempToken
     * @param {?=} suppressToken
     * @param {?=} looseCount
     * @return {?}
     */
    function (withCount, token, contentType, isTempToken, suppressToken, looseCount) {
        if (withCount === void 0) { withCount = false; }
        /** @type {?} */
        var headers = {};
        headers['Content-Type'] = [contentType || 'application/json'];
        headers['Accept'] = ['application/json'];
        headers['X-Application-Id'] = [this.coreConfig.getAppId()];
        headers['Yoobic-Client-Version'] = [this.coreConfig.getAppVersion()];
        if (withCount) {
            if (looseCount) {
                headers['x-loose-count'] = ['true'];
            }
            headers['x-total-count'] = ['true'];
        }
        if (suppressToken !== true) {
            if (token) {
                if (isTempToken) {
                    headers['token'] = [token];
                }
                else {
                    headers['Authorization'] = ['Bearer ' + token];
                }
            }
            else if (this.session.token) {
                headers['Authorization'] = ['Bearer ' + this.session.token];
            }
        }
        return headers;
    };
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    Requestor.prototype.updateToken = /**
     * @private
     * @param {?} res
     * @return {?}
     */
    function (res) {
        if (res && res.url && res.url.indexOf(this.config.serverUrl) >= 0 && res.headers && res.headers.get('authorization')) {
            this.session.token = res.headers.get('authorization');
        }
    };
    /**
     * @private
     * @return {?}
     */
    Requestor.prototype.slimbarStart = /**
     * @private
     * @return {?}
     */
    function () {
        this.loadingBar.start();
    };
    /**
     * @private
     * @return {?}
     */
    Requestor.prototype.slimbarComplete = /**
     * @private
     * @return {?}
     */
    function () {
        this.loadingBar.complete();
    };
    Requestor.unauthorizedEmitter = new EventEmitter();
    Requestor.payloadTooBigEmitter = new EventEmitter();
    Requestor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Requestor.ctorParameters = function () { return [
        { type: HttpClient },
        { type: Session },
        { type: Config },
        { type: LoadingBar },
        { type: CoreConfig }
    ]; };
    return Requestor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Algorithms = /** @class */ (function () {
    function Algorithms(config, rq) {
        this.config = config;
        this.rq = rq;
    }
    /**
     * @param {?} imageUrl
     * @param {?} algorithmId
     * @return {?}
     */
    Algorithms.prototype.process = /**
     * @param {?} imageUrl
     * @param {?} algorithmId
     * @return {?}
     */
    function (imageUrl, algorithmId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrl, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    };
    /**
     * @param {?} imageUrls
     * @param {?} algorithmId
     * @return {?}
     */
    Algorithms.prototype.processMultiple = /**
     * @param {?} imageUrls
     * @param {?} algorithmId
     * @return {?}
     */
    function (imageUrls, algorithmId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrls, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    };
    Algorithms.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Algorithms.ctorParameters = function () { return [
        { type: Config },
        { type: Requestor }
    ]; };
    return Algorithms;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CACHE_KEYS = {
    chart: 'chart',
    missiondescriptions: 'missiondescriptions',
    missiondatas: 'missiondatas',
    missionhistory: 'missionhistory',
    missionprogress: 'missionprogress',
    missions: 'missions',
    missionservices: 'missionservices',
    addresses: 'addresses',
    healthscore: 'healthscore',
    database: 'database'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Cache = /** @class */ (function () {
    function Cache(localForage, promise, log) {
        this.localForage = localForage;
        this.promise = promise;
        this.log = log;
    }
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @param {?} item
     * @return {?}
     */
    Cache.prototype.add = /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @param {?} item
     * @return {?}
     */
    function (cacheKey, entryKey, item) {
        var _this = this;
        return this.localForage
            .get(cacheKey)
            .then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            if (entryKey) {
                data[entryKey] = item;
            }
            return _this.localForage.set(cacheKey, data);
        }))
            .then((/**
         * @return {?}
         */
        function () { return item; }));
    };
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    Cache.prototype.get = /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    function (cacheKey, entryKey) {
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            return data[entryKey] || {};
        })));
    };
    /**
     * @param {?} cacheKey
     * @return {?}
     */
    Cache.prototype.getAll = /**
     * @param {?} cacheKey
     * @return {?}
     */
    function (cacheKey) {
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            /** @type {?} */
            var retVal = [];
            keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (data[key]) {
                    retVal.push(data[key]);
                }
            }));
            return retVal;
        }));
    };
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    Cache.prototype.remove = /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    function (cacheKey, entryKey) {
        var _this = this;
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            delete data[entryKey];
            return _this.localForage.set(cacheKey, data);
        })));
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Cache.prototype.getDatabaseCacheKey = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        return CACHE_KEYS.database + '.' + collectionName;
    };
    /**
     * @template T
     * @param {?} collectionName
     * @return {?}
     */
    Cache.prototype.getDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return data || [];
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @return {?}
     */
    Cache.prototype.setDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @return {?}
     */
    function (collectionName, items) {
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.set(cacheKey, items);
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @param {?=} idField
     * @param {?=} deletedKeys
     * @return {?}
     */
    Cache.prototype.updateDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @param {?=} idField
     * @param {?=} deletedKeys
     * @return {?}
     */
    function (collectionName, items, idField, deletedKeys) {
        var _this = this;
        if (idField === void 0) { idField = '_id'; }
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || [];
            if (items && items.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return items.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) { return r[idField] === d[idField]; })) < 0; }));
            }
            data = __spread(data, items);
            if (deletedKeys && deletedKeys.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return deletedKeys.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) { return r[idField] === d[idField]; })) < 0; }));
            }
            _this.log.log('Syncing Database - Syncing ' + collectionName + ' done : ' + data.length + ' entities locally');
            return _this.localForage.set(cacheKey, data);
        }));
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Cache.prototype.clearDatabaseCollection = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        this.log.log('Syncing Database - Clearing ' + collectionName);
        return this.localForage.remove(cacheKey);
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} patch
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.upsertInDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} patch
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, entity, patch, idField) {
        var _this = this;
        if (patch === void 0) { patch = false; }
        if (idField === void 0) { idField = '_id'; }
        entity[idField] = entity[idField] || Cache.OFFLINE_PREFIX + getUUID();
        return this.getByIdFromDatabaseCollection(collectionName, entity[idField]).then((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && patch) {
                entity = __assign({}, retVal, ((/** @type {?} */ (entity))));
            }
            return _this.updateDatabaseCollection(collectionName, [entity], idField).then((/**
             * @return {?}
             */
            function () {
                return entity;
            }));
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.removeFromDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, id, idField) {
        var _this = this;
        if (idField === void 0) { idField = '_id'; }
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[idField] !== id; }));
            return _this.setDatabaseCollection(collectionName, data);
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?} newEntity
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.replaceFromDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?} newEntity
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, id, newEntity, idField) {
        var _this = this;
        if (idField === void 0) { idField = '_id'; }
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[idField] !== id; }));
            data = __spread(data, [newEntity]);
            return _this.setDatabaseCollection(collectionName, data);
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.getByIdFromDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, id, idField) {
        if (idField === void 0) { idField = '_id'; }
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var retVal = data.find((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[idField] === id; }));
            return retVal;
        }));
    };
    Cache.OFFLINE_PREFIX = 'offline_';
    Cache.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Cache.ctorParameters = function () { return [
        { type: LocalForageService },
        { type: PromiseService },
        { type: Log }
    ]; };
    return Cache;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IModel = /** @class */ (function () {
    function IModel(className) {
        this.className = className;
        this.searchableFields = new Array();
        this.mappingFields = new Map();
        this._formFields = new Array();
        this.appearance = new Map();
    }
    Object.defineProperty(IModel.prototype, "formFields", {
        get: /**
         * @return {?}
         */
        function () {
            return cloneDeep(this._formFields);
        },
        set: /**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            this._formFields = f;
        },
        enumerable: true,
        configurable: true
    });
    return IModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CONDITION_TYPES = ['field', 'tags', 'groups'];
/** @type {?} */
var CONDITION_ALL_OPERATORS = ['equals', 'notequals', 'in', 'notin', 'greaterthan', 'lessthan'];
/** @type {?} */
var SIMPLE_FIELD_TYPES = ['text', 'email', 'number', 'date', 'tel', 'time', 'range', 'starrating'];
/** @type {?} */
var WITH_VALUES_FIELD_TYPES = ['checkbox', 'toggle', 'select', 'selectmulti', 'selectbuttons', 'selectbuttonsmulti', 'autocomplete'];
/** @type {?} */
var ROLES = [
    'dashboard',
    'admin',
    'manager',
    'team',
    'teamplus',
    'creator',
    'service',
    'supervisor',
    'quora',
    'kiosk',
    'score',
    'nochat',
    'anonymous',
    'stat',
    'todo',
    'serviceuser',
    'polluser',
    'newsuser',
    'newscreator',
    'documentsuser',
    'calendaruser',
    'store',
    'clientadmin',
    'missionanalysis',
    'missionviewer',
    'followup',
    'followupnouser',
    'profilenoedit',
    'workplace',
    'trial',
    'videocall',
    'academy',
    'pharmaone',
    'instagram',
    'taskuser',
    'taskcreator',
    'bi',
    'storeinsights',
    'healthscore',
    'visit',
    'imagereco',
    'productbatch',
    'taskassign',
    'scandit'
];
/** @type {?} */
var ROLES_ASK = ['manager', 'creator', 'quora', 'academy', 'academyplus'];
/** @type {?} */
var ROLES_CONDITIONS = {
    isAdmin: { type: 'roles', operator: 'in', group: ['admin'] },
    isClientAdmin: { type: 'roles', operator: 'in', group: ['clientadmin'] },
    isAdminOrClientAdmin: { type: 'roles', operator: 'in', group: ['admin', 'clientadmin'] },
    isNotAdmin: { type: 'roles', operator: 'nin', group: ['admin'] },
    isNeitherAdminNorClientAdmin: { type: 'roles', operator: 'nin', group: ['admin', 'clientadmin'] },
    isManager: { type: 'roles', operator: 'in', group: ['manager'] },
    isNotManager: { type: 'roles', operator: 'nin', group: ['manager', 'admin'] },
    isTeam: { type: 'roles', operator: 'in', group: ['team'] },
    isWorkplace: { type: 'roles', operator: 'in', group: ['admin', 'workplace'] },
    hasTodoOrScore: { type: 'roles', operator: 'in', group: ['todo', 'score'] },
    hasTodo: { type: 'roles', operator: 'in', group: ['todo'] },
    hasScore: { type: 'roles', operator: 'in', group: ['score'] },
    hasService: { type: 'roles', operator: 'in', group: ['admin', 'service'] },
    hasProductBatch: { type: 'roles', operator: 'in', group: ['admin', 'productbatch'] },
    hasMemoAssign: { type: 'roles', operator: 'in', group: ['admin', 'taskassign'] }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@name Models
 * \@angularType service
 * \@description A powerful service which gets the model for a collection or class. The model could include form fields, searchable fields and mapping fields which are useful for generating forms or filters related to the collection or class.
 */
var Models = /** @class */ (function () {
    function Models() {
    }
    /**
     * @param {?} className
     * @param {?} fieldName
     * @return {?}
     */
    Models.addSearchableField = /**
     * @param {?} className
     * @param {?} fieldName
     * @return {?}
     */
    function (className, fieldName) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.searchableFields.push(fieldName);
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} fieldName
     * @param {?} order
     * @return {?}
     */
    Models.addMappingField = /**
     * @param {?} className
     * @param {?} fieldName
     * @param {?} order
     * @return {?}
     */
    function (className, fieldName, order) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.mappingFields.set(order, fieldName);
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} entityListItemProperty
     * @param {?} appearance
     * @return {?}
     */
    Models.addAppearance = /**
     * @param {?} className
     * @param {?} entityListItemProperty
     * @param {?} appearance
     * @return {?}
     */
    function (className, entityListItemProperty, appearance) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.appearance.set(entityListItemProperty, appearance);
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} field
     * @return {?}
     */
    Models.addFormField = /**
     * @param {?} className
     * @param {?} field
     * @return {?}
     */
    function (className, field) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        /** @type {?} */
        var formFields = model.formFields;
        formFields = formFields.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name !== field.name; }));
        formFields.push(field);
        model.formFields = formFields;
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} baseClassName
     * @param {?} target
     * @return {?}
     */
    Models.addBaseModel = /**
     * @param {?} className
     * @param {?} baseClassName
     * @param {?} target
     * @return {?}
     */
    function (className, baseClassName, target) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        /** @type {?} */
        var base = this.createOrGetModel(baseClassName);
        /** @type {?} */
        var formFields = model.formFields || [];
        /** @type {?} */
        var baseFields = [];
        if (base.formFields) {
            base.formFields.map((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                if (formFields.findIndex((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name === field.name; })) < 0) {
                    baseFields.push(cloneDeep(field));
                }
            }));
        }
        model.formFields = compact(union(baseFields, formFields));
        model.searchableFields = uniq(union(cloneDeep(base.searchableFields), model.searchableFields));
        model.type = target;
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} collectionName
     * @param {?} fields
     * @param {?} include
     * @param {?} searchSubquery
     * @param {?} feathersService
     * @param {?} target
     * @param {?=} isCustom
     * @param {?=} detailComponent
     * @param {?=} icon
     * @return {?}
     */
    Models.setCollectionName = /**
     * @param {?} className
     * @param {?} collectionName
     * @param {?} fields
     * @param {?} include
     * @param {?} searchSubquery
     * @param {?} feathersService
     * @param {?} target
     * @param {?=} isCustom
     * @param {?=} detailComponent
     * @param {?=} icon
     * @return {?}
     */
    function (className, collectionName, fields, include, searchSubquery, feathersService, target, isCustom, detailComponent, icon) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.collectionName = collectionName;
        model.fields = fields;
        model.include = include;
        model.searchSubquery = searchSubquery;
        model.type = target;
        model.feathersService = feathersService;
        model.isCustom = isCustom;
        model.detailComponent = detailComponent;
        model.icon = icon;
        if (model.collectionName && model.collectionName !== 'tenants') {
            model.include = model.include || [];
            if (model.include.indexOf('_tenant') < 0) {
                model.include.push('_tenant');
            }
            if (model.fields && model.fields.length > 1) {
                model.fields.push('_tenant.name');
                model.fields.push('_tenant.title');
                model.fields.push('_tenant.icon');
            }
        }
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @return {?}
     */
    Models.clearCollectionName = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        Models._models.delete(className);
    };
    /**
     * @param {?} className
     * @return {?}
     */
    Models.getModel = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        /** @type {?} */
        var retVal;
        if (isString(className) === true) {
            retVal = this.createOrGetModel((/** @type {?} */ (className)));
        }
        else {
            Models._models.forEach((/**
             * @param {?} m
             * @return {?}
             */
            function (m) {
                if (m.type && m.type === className) {
                    retVal = m;
                }
            }));
        }
        return retVal;
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Models.getModelByCollectionName = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var model;
        Models._models.forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            if (m.collectionName === collectionName) {
                model = m;
            }
        }));
        if (!model && collectionName && collectionName.endsWith('_store')) {
            /** @type {?} */
            var name_1 = collectionName.replace('_store', '');
            if (name_1 === 'missiondescription') {
                name_1 += 's';
            }
            return Models.getModelByCollectionName(name_1);
        }
        return model;
    };
    /**
     * @param {?} collectionName
     * @param {?=} advancedFiltersFields
     * @param {?=} campaignFields
     * @param {?=} isAdmin
     * @return {?}
     */
    Models.getFilterableFields = /**
     * @param {?} collectionName
     * @param {?=} advancedFiltersFields
     * @param {?=} campaignFields
     * @param {?=} isAdmin
     * @return {?}
     */
    function (collectionName, advancedFiltersFields, campaignFields, isAdmin) {
        if (isAdmin === void 0) { isAdmin = false; }
        /** @type {?} */
        var fields = [];
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model && model.formFields) {
            fields = cloneDeep(model.formFields);
        }
        if (model && model.isCustom && fields) {
            fields.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                f.filterable = f.searchable;
                f.sortable = f.type === FormFieldType.date || f.type === FormFieldType.datetime || f.type === FormFieldType.number;
                if (f.type === FormFieldType.location) {
                    f.filterName = f.name + 'Ref';
                }
            }));
        }
        if (advancedFiltersFields && advancedFiltersFields.length > 0) {
            advancedFiltersFields.forEach((/**
             * @param {?} af
             * @return {?}
             */
            function (af) {
                /** @type {?} */
                var index = findIndex(fields, (/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name === af.name; }));
                if (index < 0) {
                    fields.push(af);
                }
                else {
                    fields[index] = __assign({}, fields[index], af);
                }
            }));
        }
        if (campaignFields) {
            campaignFields = cloneDeep(campaignFields);
            campaignFields.forEach((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                c.name += '.value';
                c.filterable = true;
                //c.sortable = true;
            }));
            fields = fields.concat(campaignFields);
        }
        /** @type {?} */
        var tenantIndex = findIndex(fields, (/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === '_tenant'; }));
        if (tenantIndex >= 0 && !isAdmin) {
            fields[tenantIndex].filterable = false;
        }
        /** @type {?} */
        var finalFields = [];
        fields.forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            finalFields.push(f);
            if (f.collectionName && f.collectionName !== collectionName && f.filterable === true && f.showSubQueryFilters === true) {
                Models.getModelByCollectionName(f.collectionName).formFields.forEach((/**
                 * @param {?} subfield
                 * @return {?}
                 */
                function (subfield) {
                    subfield = cloneDeep(subfield);
                    delete subfield.advanced;
                    subfield.filterable = true;
                    subfield.icon = 'yo-tag';
                    //this is used in the chanel collection where we want to override the subQuery defined in the user interface
                    //this even allow us to filter on any subfield of a user to look for channel
                    if (f.subQuery) {
                        subfield.subQuery = subfield.subQuery || f.subQuery;
                        if (!subfield.sessionValues) {
                            subfield.collectionName = subfield.collectionName || f.collectionName;
                        }
                    }
                    if (subfield.subQuery) {
                        if (f.subQueryOverride) {
                            subfield.subQuery = f.subQueryOverride;
                        }
                        subfield.isSubQuery = true;
                        subfield.name = subfield.collectionName + '_' + subfield.name;
                        finalFields.push(subfield);
                    }
                }));
            }
        }));
        return finalFields;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.getFieldName = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var fieldName = field.name + (field.columnDefinition && field.columnDefinition.name ? '.' + field.columnDefinition.name : '');
        if (field.columnDefinition && field.columnDefinition.forceName) {
            fieldName = field.columnDefinition.name;
        }
        return fieldName;
    };
    /**
     * @param {?} field
     * @param {?} translate
     * @return {?}
     */
    Models.getFieldTitle = /**
     * @param {?} field
     * @param {?} translate
     * @return {?}
     */
    function (field, translate) {
        /** @type {?} */
        var fieldTitle = field.title || field.name;
        fieldTitle = translate.polyglot(fieldTitle);
        return fieldTitle;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isBooleanField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isBooleanField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isNumberField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isNumberField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isPhotoField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isPhotoField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isMultiPhotosField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isMultiPhotosField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isPhotoOrMultiPhotosField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isPhotoOrMultiPhotosField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isVideoField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isVideoField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isDateTimeField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isDateTimeField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isIntervalField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isIntervalField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isChartableAutoFieldNoPhoto = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return Models.isChartableAutoField(field, false);
    };
    /**
     * @param {?} field
     * @param {?=} includePhoto
     * @return {?}
     */
    Models.isChartableAutoField = /**
     * @param {?} field
     * @param {?=} includePhoto
     * @return {?}
     */
    function (field, includePhoto) {
        if (includePhoto === void 0) { includePhoto = true; }
        switch (field.type) {
            case FormFieldType.checkbox:
            case FormFieldType.toggle:
            case FormFieldType.select:
            case FormFieldType.selectmulti:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.starrating:
            case FormFieldType.number:
            case FormFieldType.range:
            case FormFieldType.ranking:
            case FormFieldType.formula:
                return true;
            case FormFieldType.photo:
            case FormFieldType.multiphotos:
                return includePhoto;
            case FormFieldType.autocomplete:
                return !field.collectionName || Models.getModel(field.collectionName).isCustom !== true;
        }
        return false;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isMultipleField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isMultipleField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isColoredField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isColoredField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.getFieldOperator = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        if (field.type === 'fieldselector') {
            return [{ title: 'in', _id: 'inq' }];
        }
        else if (Models.isBooleanField(field)) {
            return [{ title: 'equals', _id: 'eq' }, { title: 'notequals', _id: 'neq' }];
        }
        else if (Models.isPhotoField(field)) {
            return [{ title: 'exists', _id: 'exists' }];
        }
        else if (Models.isIntervalField(field) || Models.isDateTimeField(field)) {
            return [{ title: 'greaterthan', _id: 'gte', interval: true }, { title: 'between', _id: 'between', interval: true }, { title: 'lessthan', _id: 'lte', interval: true }, { title: 'equals', _id: 'eq', interval: true }];
        }
        else if (field.type === FormFieldType.autocomplete || field.type === FormFieldType.location) {
            return [{ title: 'in', _id: 'inq' }, { title: 'notin', _id: 'nin' }, { title: 'all', _id: 'all' }];
        }
        else {
            return [{ title: 'like', _id: 'like' }, { title: 'notlike', _id: 'nlike' }, { title: 'equals', _id: 'eq' }, { title: 'notequals', _id: 'neq' }];
        }
    };
    // public static getFormFieldFromMobileField(type) {
    //     switch (type) {
    //         case FormFieldType.photo:
    //         case FormFieldType.signature:
    //         case FormFieldType.image:
    //         case FormFieldType.barcode:
    //         case FormFieldType.video:
    //         case FormFieldType.audio:
    //         case FormFieldType.document:
    //             return FormFieldType.photo;
    //         case FormFieldType.date:
    //             return FormFieldType.date;
    //         default:
    //             return FormFieldType[type] || FormFieldType.text;
    //     }
    // }
    // public static getFormFieldFromMobileField(type) {
    //     switch (type) {
    //         case FormFieldType.photo:
    //         case FormFieldType.signature:
    //         case FormFieldType.image:
    //         case FormFieldType.barcode:
    //         case FormFieldType.video:
    //         case FormFieldType.audio:
    //         case FormFieldType.document:
    //             return FormFieldType.photo;
    //         case FormFieldType.date:
    //             return FormFieldType.date;
    //         default:
    //             return FormFieldType[type] || FormFieldType.text;
    //     }
    // }
    /**
     * @param {?} type
     * @return {?}
     */
    Models.getMobileFieldIcon = 
    // public static getFormFieldFromMobileField(type) {
    //     switch (type) {
    //         case FormFieldType.photo:
    //         case FormFieldType.signature:
    //         case FormFieldType.image:
    //         case FormFieldType.barcode:
    //         case FormFieldType.video:
    //         case FormFieldType.audio:
    //         case FormFieldType.document:
    //             return FormFieldType.photo;
    //         case FormFieldType.date:
    //             return FormFieldType.date;
    //         default:
    //             return FormFieldType[type] || FormFieldType.text;
    //     }
    // }
    /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var fields = [].concat(MOBILE_FORM_FIELDS_ALL).filter((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return field.type === type; }));
        if (fields && fields.length > 0) {
            return fields[0].icon;
        }
        return '';
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} excludedFields
     * @return {?}
     */
    Models.exportWhere = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} excludedFields
     * @return {?}
     */
    function (collectionName, filters, excludedFields) {
        if (excludedFields === void 0) { excludedFields = []; }
        /** @type {?} */
        var retVal = filters.map((/**
         * @param {?} fs
         * @return {?}
         */
        function (fs) {
            /** @type {?} */
            var simplifiedFilters = [];
            fs.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                if ((!f.subQuery || f.collectionName === collectionName) && (!excludedFields || excludedFields.indexOf(f.field) < 0)) {
                    //&& !f.isFieldSelector
                    /** @type {?} */
                    var filter$$1 = Models.exportFilterField(f);
                    if (filter$$1 && !isEmpty(filter$$1)) {
                        simplifiedFilters.push(filter$$1);
                    }
                }
            }));
            if (simplifiedFilters.length === 0) {
                return null;
            }
            else if (simplifiedFilters.length === 1) {
                return simplifiedFilters[0];
            }
            else {
                return { and: simplifiedFilters };
            }
        }));
        if (retVal) {
            pull(retVal, null);
        }
        if (retVal && retVal.length === 1) {
            return retVal[0];
        }
        else if (retVal && retVal.length > 0) {
            return { or: retVal };
        }
        return null;
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    Models.exportSubQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    function (collectionName, filters, isAggregationQuery) {
        var _this = this;
        /** @type {?} */
        var retVal = [];
        if (filters && isArray(filters) && ((/** @type {?} */ (filters))).length > 0) {
            ((/** @type {?} */ (filters))).forEach((/**
             * @param {?} fs
             * @return {?}
             */
            function (fs) {
                fs.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) {
                    if (f.subQuery && f.collectionName !== collectionName) {
                        retVal.push({
                            collectionName: _this.fixCollectionName(f.collectionName, isAggregationQuery),
                            where: Models.exportFilterField(f),
                            field: f.subQuery.field,
                            values: f.subQuery.values,
                            leftJoin: f.subQuery.leftJoin
                        });
                    }
                }));
            }));
        }
        return retVal.length === 1 ? retVal[0] : retVal.length > 1 ? retVal : null;
    };
    /**
     * @param {?} collectionName
     * @param {?} search
     * @return {?}
     */
    Models.exportSearch = /**
     * @param {?} collectionName
     * @param {?} search
     * @return {?}
     */
    function (collectionName, search) {
        if (search && search.match && search.match(/^[0-9a-fA-F]{24}$/)) {
            return { _id: search };
        }
        else {
            /** @type {?} */
            var retVal = Models.getModelByCollectionName(collectionName).searchableFields.map((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                /** @type {?} */
                var filter$$1 = {};
                if (field === '_id' && collectionName !== 'groups') {
                    filter$$1[field] = search;
                }
                else {
                    filter$$1[field] = { like: search, options: 'i' };
                }
                return filter$$1;
            }));
            if (retVal.length === 1) {
                return retVal[0];
            }
            else if (retVal.length > 0) {
                return { or: retVal };
            }
            return null;
        }
    };
    /**
     * @param {?} collectionName
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    Models.fixCollectionName = /**
     * @param {?} collectionName
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    function (collectionName, isAggregationQuery) {
        switch (collectionName) {
            case 'missiondescriptions':
                return isAggregationQuery ? 'missiondescription' : collectionName;
            case 'groups':
                return isAggregationQuery ? 'group' : collectionName;
            case 'feedsComments':
                return isAggregationQuery ? 'feedsComment' : collectionName;
            case 'users':
                return 'user';
            default:
                return collectionName;
        }
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Models.getPublicCollectionName = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        switch (collectionName) {
            case 'locations':
                return 'stores';
            case 'user':
            case 'users':
                return 'users';
            case 'locationtypes':
                return 'store-types';
            case 'missiondescriptions':
                return 'campaigns';
            case 'feeds':
                return 'news';
            default:
                return collectionName;
        }
    };
    /**
     * @param {?} params
     * @return {?}
     */
    Models.getPhotoFromParams = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            var row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            var f = params.colDef.field.replace('.value', '');
            /** @type {?} */
            var photo = Models.extractPhoto(row[f], row, {}, f);
            return photo;
        }
        return null;
    };
    // get photos for multiphoto component
    // get photos for multiphoto component
    /**
     * @param {?} params
     * @return {?}
     */
    Models.getPhotosFromParams = 
    // get photos for multiphoto component
    /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            var row_1 = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            var f_1 = params.colDef.field.replace('.value', '');
            // field name
            /** @type {?} */
            var photos_1 = [];
            if (row_1 && f_1 && row_1[f_1] && row_1[f_1].value && isArray(row_1[f_1].value)) {
                row_1[f_1].value.forEach((/**
                 * @param {?} v
                 * @param {?} multiIndex
                 * @return {?}
                 */
                function (v, multiIndex) {
                    photos_1.push(Models.extractPhoto(v, row_1, {}, f_1, FormFieldType.multiphotos, null, multiIndex));
                }));
            }
            return photos_1;
        }
        return null;
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Models.getEmptyUrl = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        switch (collectionName) {
            case 'dashboards':
            case 'dashboard':
                return 'dashboard.svg';
            case 'missions':
            case 'mission':
                return 'mission.svg';
            case 'missiondescriptions':
            case 'missiondescription':
            case 'campaign':
                return 'campaign.svg';
            case 'photos':
            case 'photo':
                return 'photo.svg';
            case 'feeds':
            case 'feed':
                return 'feed.svg';
            case 'files':
            case 'file':
                return 'file.svg';
            case 'locations':
            case 'location':
                return 'location.svg';
            case 'notes':
            case 'note':
                return 'note.svg';
            case 'users':
            case 'user':
                return 'user.svg';
        }
        return 'empty.svg';
    };
    /**
     * @param {?} data
     * @param {?} missiondata
     * @param {?} field
     * @param {?} name
     * @param {?=} type
     * @param {?=} hideUser
     * @param {?=} multiIndex
     * @return {?}
     */
    Models.extractPhoto = /**
     * @param {?} data
     * @param {?} missiondata
     * @param {?} field
     * @param {?} name
     * @param {?=} type
     * @param {?=} hideUser
     * @param {?=} multiIndex
     * @return {?}
     */
    function (data, missiondata, field, name, type, hideUser, multiIndex) {
        if (hideUser === void 0) { hideUser = false; }
        /** @type {?} */
        var photo = {};
        if (data || (field && field.type === 'image' && field.image && field.image._downloadURL)) {
            if (data && data.value && ((data.value.indexOf && data.value.indexOf('http') === 0) || isImageFile(data.value)) && (!type || !data.fieldType || data.fieldType === type)) {
                photo = {
                    value: data.value,
                    comments: data.comments,
                    tags: data.tags,
                    flagged: data.flagged,
                    edit: data.edit,
                    stitch: data.stitch,
                    editBy: data.editBy,
                    editWidth: data.editWidth,
                    editHeight: data.editHeight,
                    texts: data.texts,
                    svgData: data.svgData
                };
            }
            else if (data && ((data.indexOf && data.indexOf('http') === 0) || isImageFile(data))) {
                if (type && type === FormFieldType.multiphotos) {
                    /** @type {?} */
                    var fieldData = get(missiondata, field.name || name);
                    /** @type {?} */
                    var extraData = fieldData && ((/** @type {?} */ (fieldData))).extraData ? ((/** @type {?} */ (fieldData))).extraData : {};
                    photo = {
                        value: data,
                        tags: extraData[multiIndex] ? extraData[multiIndex].tags : null,
                        flagged: extraData[multiIndex] ? extraData[multiIndex].flagged : null,
                        edit: extraData[multiIndex] ? extraData[multiIndex].edit : null,
                        stitch: extraData[multiIndex] ? extraData[multiIndex].stitch : null,
                        editBy: extraData[multiIndex] ? extraData[multiIndex].editBy : null,
                        editWidth: extraData[multiIndex] ? extraData[multiIndex].editWidth : null,
                        editHeight: extraData[multiIndex] ? extraData[multiIndex].editHeight : null,
                        texts: extraData[multiIndex] ? extraData[multiIndex].texts : [],
                        svgData: extraData[multiIndex] ? extraData[multiIndex].svgData : null,
                        isMulti: true
                    };
                }
                else {
                    photo = { value: data };
                }
            }
            else if (field && field.type === 'image' && field.image && field.image._downloadURL) {
                photo = {
                    name: field.name || name,
                    title: field.title,
                    value: field.image._downloadURL,
                    isImage: true
                };
            }
            if (!isEmpty(photo)) {
                if (!field || field.type !== 'image') {
                    assign(photo, {
                        title: field.title,
                        name: field.name || name,
                        multiIndex: multiIndex,
                        _id: missiondata._id + ' _' + (field.name || name),
                        missiondescriptionRef: missiondata.missiondescriptionRef,
                        missiondescription: missiondata.missiondescription,
                        missiondata: missiondata,
                        missiondataRef: missiondata._id,
                        mission: missiondata.mission,
                        missionRef: missiondata.missionRef,
                        userRef: missiondata.userRef,
                        userDisplayname: hideUser ? '' : missiondata.userDisplayname,
                        address: missiondata.address,
                        location: missiondata.location,
                        validated: missiondata.validated,
                        _acl: missiondata._acl
                    });
                }
                if (field.isImageRecognition && photo.stitch) {
                    photo.value = photo.stitch;
                }
                return photo;
            }
        }
        return null;
    };
    /*
         Return the transform to extract the fields from a mission description
     */
    /*
           Return the transform to extract the fields from a mission description
       */
    /**
     * @param {?=} types
     * @return {?}
     */
    Models.getFieldTransform = /*
           Return the transform to extract the fields from a mission description
       */
    /**
     * @param {?=} types
     * @return {?}
     */
    function (types) {
        if (types === void 0) { types = []; }
        /**
         * @param {?} res
         * @return {?}
         */
        function getFieldTransformInternal(res) {
            if (res.data && res.data.forEach) {
                /** @type {?} */
                var fields_1 = [];
                res.data.forEach((/**
                 * @param {?} missiondescription
                 * @return {?}
                 */
                function (missiondescription) {
                    /** @type {?} */
                    var missionFields = Models.getFields(missiondescription, types);
                    missionFields = missionFields.map((/**
                     * @param {?} field
                     * @return {?}
                     */
                    function (field) {
                        return assign(field, {
                            _id: field.name,
                            name: field.name + '.value',
                            operators: Models.getFieldOperator(field),
                            slideTitle: missiondescription.title
                        });
                    }));
                    fields_1 = fields_1.concat(missionFields);
                }));
                res.data = fields_1;
            }
            return res;
        }
        return getFieldTransformInternal;
    };
    /*
          Return the list of slide items fields from a mission description (mobile type)
      */
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Models.getFields = /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (missiondescription, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        return Models.getFieldsFromSlides(missiondescription.slides, types, excludedTypes);
    };
    /*
          Return the list of slide items fields from an array of slides (mobile type)
      */
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Models.getFieldsFromSlides = /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (slides, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        /** @type {?} */
        var fields = [];
        if (slides) {
            slides.forEach((/**
             * @param {?} slide
             * @param {?} index
             * @return {?}
             */
            function (slide, index) {
                if (slide.items) {
                    slide.items.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        item.slideTitle = slide.title;
                        if (!types || types.length === 0 || types.indexOf(item.type) >= 0) {
                            if (!excludedTypes || excludedTypes.length === 0 || excludedTypes.indexOf(item.type) < 0) {
                                item.slideIndex = index;
                                fields.push(item);
                            }
                        }
                    }));
                }
            }));
        }
        return fields;
    };
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    Models.exportFilterField = /**
     * @private
     * @param {?} f
     * @return {?}
     */
    function (f) {
        /** @type {?} */
        var filter$$1 = {};
        if (isArray(f.value) && f.value.length === 0) {
            return filter$$1;
        }
        if (f.handleUndefined && isPresent(f.value) && isArray(f.value)) {
            if (f.value.indexOf(undefined) < 0 && f.value.indexOf('undefined') < 0) {
                filter$$1[f.field] = {};
                filter$$1[f.field][f.operator._id] = f.value;
            }
            else {
                /** @type {?} */
                var def = filter$$1;
                def[f.field] = {};
                def[f.field][f.operator._id] = map$1(f.value, (/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    return v === undefined || v === 'undefined' ? null : v;
                }));
            }
        }
        else {
            filter$$1[f.field] = {};
            if (f.type === FormFieldType.address && f.value && (isArray(f.value) || isArray(f.value._geoloc))) {
                filter$$1[f.field] = {
                    nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: f.value && f.value._geoloc ? f.value._geoloc : f.value
                        },
                        $maxDistance: f.radius * 1000 || 40000
                    }
                };
            }
            else if (f.operator._id === 'nearSphere' && f.value && (isArray(f.value) || isArray(f.value._geoloc))) {
                filter$$1[f.field] = {
                    nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: f.value && f.value._geoloc ? f.value._geoloc : f.value
                        },
                        $maxDistance: f.max || 40000
                    }
                };
            }
            else if (f.type === FormFieldType.date && f.operator._id === 'eq') {
                filter$$1[f.field]['between'] = [f.value, dateFormat(dateAdd(f.value, 'days', 1), 'YYYY-MM-dd')];
            }
            else if (isPresent(f.value)) {
                /** @type {?} */
                var value = isArray(f.value) && isObject(f.value[0]) ? map$1(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
                if (f.operator && f.operator._id === 'eq') {
                    filter$$1[f.field] = value;
                    // } else if (f.operator && f.operator._id === 'between' && isArray(f.value) && f.value.length > 1) {
                    //     filter[f.field] = { 'gte': f.value[0], 'lt': f.value[1] };
                }
                else {
                    filter$$1[f.field][f.operator._id] = value;
                }
            }
            if (f.operator && (f.operator._id === 'like' || f.operator._id === 'nlike')) {
                filter$$1[f.field].options = 'i';
            }
        }
        return filter$$1;
    };
    /**
     * @private
     * @param {?} className
     * @param {?=} override
     * @return {?}
     */
    Models.createOrGetModel = /**
     * @private
     * @param {?} className
     * @param {?=} override
     * @return {?}
     */
    function (className, override) {
        Models._models = Models._models || new Map();
        if (Models._models.has(className) && override !== true) {
            return Models._models.get(className);
        }
        else {
            /** @type {?} */
            var model = new IModel(className);
            Models._models.set(className, model);
            return model;
        }
    };
    /**
     * @private
     * @param {?} className
     * @param {?} model
     * @return {?}
     */
    Models.updateModel = /**
     * @private
     * @param {?} className
     * @param {?} model
     * @return {?}
     */
    function (className, model) {
        /** @type {?} */
        var formFields = model.formFields || [];
        if (formFields.findIndex((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === '_tenant'; })) < 0 && model.collectionName && model.collectionName !== 'tenants') {
            formFields.push({
                required: true,
                name: '_tenant',
                title: 'TENANT',
                type: FormFieldType.autocomplete,
                condition: [ROLES_CONDITIONS.isAdmin],
                collectionName: 'tenants',
                multiple: false,
                columnDefinition: { name: 'name' },
                suppressExport: true,
                visible: false
            });
        }
        model.formFields = formFields;
        Models._models.set(className, model);
    };
    Models._models = new Map();
    Models.decorators = [
        { type: Injectable }
    ];
    return Models;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Smartloc = /** @class */ (function () {
    function Smartloc(session, geoLoc, config, rq) {
        this.session = session;
        this.geoLoc = geoLoc;
        this.config = config;
        this.rq = rq;
    }
    Object.defineProperty(Smartloc.prototype, "defaultPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this.geoLoc.defaultPosition;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    Smartloc.prototype.getLocation = /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.hasRole('store') && !this.hasRole('admin')) {
            /** @type {?} */
            var promise = void 0;
            if (this.session.user && this.session.user.location && this.session.user.location._geoloc) {
                promise = Promise.resolve(this.session.user.location);
            }
            else if (this.session.user && this.session.user.locationRef) {
                promise = this.getLocationEntity(this.session.user.locationRef); //, ['_id', 'title', '_geoloc', 'address']
            }
            else if (this.session.user && this.session.user.address && this.session.user.address._geoloc) {
                promise = Promise.resolve(this.session.user.address);
            }
            if (promise) {
                return promise.then((/**
                 * @param {?} loc
                 * @return {?}
                 */
                function (loc) {
                    if (loc && loc._geoloc && loc._geoloc.length > 1) {
                        _this.session.user.location = loc;
                        /** @type {?} */
                        var position = new Position({ latitude: loc._geoloc[1], longitude: loc._geoloc[0] });
                        return position;
                    }
                    return null;
                }));
            }
        }
        return this.geoLoc.getLocation(forceRefresh);
    };
    /**
     * @param {?} lat1
     * @param {?} lon1
     * @param {?} lat2
     * @param {?} lon2
     * @param {?=} unit
     * @return {?}
     */
    Smartloc.prototype.getDistance = /**
     * @param {?} lat1
     * @param {?} lon1
     * @param {?} lat2
     * @param {?} lon2
     * @param {?=} unit
     * @return {?}
     */
    function (lat1, lon1, lat2, lon2, unit) {
        if (unit === void 0) { unit = 'K'; }
        return this.geoLoc.getDistance(lat1, lon1, lat2, lon2, unit);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    Smartloc.prototype.getLocationEntity = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var url = this.config.apiUrl + 'locations' + '/' + id;
        return this.rq.get(url).toPromise();
    };
    /**
     * @param {?} role
     * @return {?}
     */
    Smartloc.prototype.hasRole = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    };
    Smartloc.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Smartloc.ctorParameters = function () { return [
        { type: Session },
        { type: GeoLocation },
        { type: Config },
        { type: Requestor }
    ]; };
    return Smartloc;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} b
 * @return {?}
 */
function normalizeBounds(b) {
    return b ? (typeof b === 'string' ? b : b.southwest.lat + ',' + b.southwest.lng + '|' + b.northeast.lat + ',' + b.northeast.lng) : '';
}
/**
 * @param {?} p
 * @return {?}
 */
function normalizeLocation(p) {
    return p ? (typeof p === 'string' ? p : p.toStringLoc()) : '';
}
/**
 * @param {?} p
 * @return {?}
 */
function pipeJoin(p) {
    return p ? (typeof p === 'string' ? p : p.join('|')) : '';
}
/**
 * @template T
 * @param {?} o
 * @return {?}
 */
function normalizeObservable(o) {
    return o instanceof Observable ? o : from(Promise.resolve(o));
}
var Googlemaps = /** @class */ (function () {
    function Googlemaps(rq, geo, config, injector, network, cache) {
        this.rq = rq;
        this.geo = geo;
        this.config = config;
        this.injector = injector;
        this.network = network;
        this.cache = cache;
        this.translate = this.injector.get(Translate);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    Googlemaps.prototype.autocompleteFromSync = /**
     * @param {?} input
     * @param {?} location
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    function (input, location, offset, radius, language, types, components, query) {
        if (offset === void 0) { offset = input.length; }
        if (radius === void 0) { radius = 100000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (query === void 0) { query = false; }
        return this._autocomplete({
            input: input,
            offset: offset,
            location: normalizeLocation(location),
            radius: radius,
            language: language,
            types: types,
            components: components
        }, query);
    };
    /**
     * @param {?} input
     * @param {?=} offset
     * @param {?=} location
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    Googlemaps.prototype.autocompleteLocationObserver = /**
     * @param {?} input
     * @param {?=} offset
     * @param {?=} location
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    function (input, offset, location, radius, language, types, components, query) {
        var _this = this;
        if (offset === void 0) { offset = input.length; }
        if (location === void 0) { location = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (query === void 0) { query = false; }
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                input: input,
                offset: offset,
                location: normalizeLocation(loc),
                radius: radius,
                language: language,
                types: types,
                components: components
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._autocomplete(i, query); })));
    };
    /**
     * @param {?} inputO
     * @param {?=} offsetO
     * @param {?=} locationO
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    Googlemaps.prototype.autocompleteMultiObserver = /**
     * @param {?} inputO
     * @param {?=} offsetO
     * @param {?=} locationO
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    function (inputO, offsetO, locationO, radius, language, types, components, query) {
        var _this = this;
        if (offsetO === void 0) { offsetO = inputO.pipe(map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.length; }))); }
        if (locationO === void 0) { locationO = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (query === void 0) { query = false; }
        return combineLatest(inputO, offsetO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._autocomplete(i, query); })));
    };
    /**
     * @param {?} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    Googlemaps.prototype.nearbySearchFromSync = /**
     * @param {?} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    function (location, radius, keyword, language, name, minprice, maxprice, opennow, rankby, type, types) {
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._nearbySearch({
            location: normalizeLocation(location),
            radius: radius,
            keyword: keyword,
            language: language,
            name: pipeJoin(name),
            minprice: minprice,
            maxprice: maxprice,
            opennow: opennow,
            rankby: rankby,
            type: type,
            types: pipeJoin(types)
        });
    };
    /**
     * @param {?} next_page_token
     * @return {?}
     */
    Googlemaps.prototype.nearbySearchNextResults = /**
     * @param {?} next_page_token
     * @return {?}
     */
    function (next_page_token) {
        return this._nextSearchResults(next_page_token);
    };
    /**
     * @param {?=} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    Googlemaps.prototype.nearbySearchLocationObserver = /**
     * @param {?=} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    function (location, radius, keyword, language, name, minprice, maxprice, opennow, rankby, type, types) {
        var _this = this;
        if (location === void 0) { location = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                location: normalizeLocation(loc),
                radius: radius,
                keyword: keyword,
                language: language,
                name: pipeJoin(name),
                minprice: minprice,
                maxprice: maxprice,
                opennow: opennow,
                rankby: rankby,
                type: type,
                types: pipeJoin(types)
            };
        })), concatMap((/**
         * @param {?} input
         * @return {?}
         */
        function (input) { return _this._nearbySearch(input); })));
    };
    /**
     * @param {?=} locationO
     * @param {?=} keywordO
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} nameO
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    Googlemaps.prototype.nearbySearchMultiObserver = /**
     * @param {?=} locationO
     * @param {?=} keywordO
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} nameO
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    function (locationO, keywordO, radius, language, nameO, minprice, maxprice, opennow, rankby, type, types) {
        var _this = this;
        if (locationO === void 0) { locationO = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return combineLatest(keywordO, nameO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._nearbySearch(i); })));
    };
    /**
     * @param {?=} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    Googlemaps.prototype.geocodeFromSync = /**
     * @param {?=} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    function (address, components, bounds, language, region) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._geocode({
            address: address,
            components: pipeJoin(components),
            bounds: normalizeBounds(bounds),
            language: language,
            region: region
        });
    };
    /**
     * @param {?} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    Googlemaps.prototype.geocodeAddressObserver = /**
     * @param {?} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    function (address, components, bounds, language, region) {
        var _this = this;
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return address.pipe(map((/**
         * @param {?} addr
         * @return {?}
         */
        function (addr) {
            return {
                address: addr,
                components: pipeJoin(components),
                bounds: normalizeBounds(bounds),
                language: language,
                region: region
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._geocode(i); })));
    };
    /**
     * @param {?} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodeFromSyncLocation = /**
     * @param {?} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (latlng, language, result_type, location_type) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._reverseGeocode({
            latlng: normalizeLocation(latlng),
            language: language,
            result_type: result_type,
            location_type: location_type
        });
    };
    /**
     * @param {?=} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodeLatLngObserver = /**
     * @param {?=} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (latlng, language, result_type, location_type) {
        var _this = this;
        if (latlng === void 0) { latlng = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return normalizeObservable(latlng).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                latlng: normalizeLocation(loc),
                language: language,
                result_type: result_type,
                location_type: location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._reverseGeocode(i); })));
    };
    /**
     * @param {?} place_id
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodeFromSyncPlaceID = /**
     * @param {?} place_id
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (place_id, language, result_type, location_type) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._reverseGeocode({
            place_id: place_id,
            language: language,
            result_type: result_type,
            location_type: location_type
        }).pipe(map((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results[0]; })));
    };
    /**
     * @param {?} place_idO
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodePlaceIDObserver = /**
     * @param {?} place_idO
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (place_idO, language, result_type, location_type) {
        var _this = this;
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return place_idO.pipe(map((/**
         * @param {?} place_id
         * @return {?}
         */
        function (place_id) {
            return {
                place_id: place_id,
                language: language,
                result_type: result_type,
                location_type: location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._reverseGeocode(i); })), map((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results[0]; })));
    };
    /**
     * @param {?=} input
     * @param {?=} location
     * @param {?=} language
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} types
     * @param {?=} components
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    Googlemaps.prototype.placePredictionsLocationObserver = /**
     * @param {?=} input
     * @param {?=} location
     * @param {?=} language
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} types
     * @param {?=} components
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    function (input, location, language, offset, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        var _this = this;
        if (location === void 0) { location = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (offset === void 0) { offset = input.length; }
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                input: input,
                offset: offset,
                location: normalizeLocation(loc),
                radius: radius,
                language: language,
                types: types,
                components: components,
                address: address,
                search: search,
                type: type,
                limit: limit,
                nearbyRadius: nearbyRadius,
                skipName: skipName,
                debug: debug
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._placePredictions(i); })));
    };
    /**
     * @param {?} location
     * @param {?=} input
     * @param {?=} language
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} types
     * @param {?=} components
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    Googlemaps.prototype.placePredictionsFromSync = /**
     * @param {?} location
     * @param {?=} input
     * @param {?=} language
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} types
     * @param {?=} components
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    function (location, input, language, offset, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (offset === void 0) { offset = input.length; }
        return this._placePredictions({
            input: input,
            offset: offset,
            location: normalizeLocation(location),
            radius: radius,
            language: language,
            types: types,
            components: components,
            address: address,
            search: search,
            type: type,
            limit: limit,
            nearbyRadius: nearbyRadius,
            skipName: skipName,
            debug: debug
        });
    };
    /**
     * @param {?} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} types
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    Googlemaps.prototype.nearbyPlaceCodesFromSync = /**
     * @param {?} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} types
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    function (location, radius, keyword, language, name, minprice, maxprice, opennow, rankby, types, address, search, type, limit, nearbyRadius, skipName, debug) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._nearbyPlaceCodes({
            location: normalizeLocation(location),
            radius: radius,
            keyword: keyword,
            language: language,
            name: name,
            minprice: minprice,
            maxprice: maxprice,
            opennow: opennow,
            rankby: rankby,
            types: types,
            address: address,
            search: search,
            type: type,
            limit: limit,
            nearbyRadius: nearbyRadius,
            skipName: skipName,
            debug: debug
        });
    };
    /**
     * @param {?} address
     * @param {?=} language
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    Googlemaps.prototype.resolveAddressLocation = /**
     * @param {?} address
     * @param {?=} language
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    function (address, language, search, type, limit, nearbyRadius, skipName, debug) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._resolveAddressLocation({
            address: address,
            language: language,
            search: search,
            type: type,
            limit: limit,
            nearbyRadius: nearbyRadius,
            skipName: skipName,
            debug: debug
        });
    };
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    Googlemaps.prototype.getCurrentAddresses = /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.network.isOffline()) {
            return this.cache.get(CACHE_KEYS.addresses, CACHE_KEYS.addresses).toPromise();
        }
        else {
            return this.geo
                .getLocation(forceRefresh)
                .then((/**
             * @param {?} p
             * @return {?}
             */
            function (p) {
                return _this.reverseGeocodeFromSyncLocation(p).toPromise();
            }))
                .then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                /** @type {?} */
                var retVal = [];
                if (res && res.length > 0) {
                    retVal = res.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        /** @type {?} */
                        var position = new Position(d.geometry.location);
                        return {
                            address: d.formatted_address,
                            _id: d.id || d.formatted_address,
                            _geoloc: position.toGeoLoc(true),
                            coords: position.toJson()
                        };
                    }));
                }
                _this.cache.add(CACHE_KEYS.addresses, CACHE_KEYS.addresses, retVal);
                return retVal;
            }));
        }
    };
    Object.defineProperty(Googlemaps.prototype, "apiUrl", {
        // public getStreetView(lat: number, lng: number) {
        //   let url= this.apiUrl+'streetView?'
        // }
        get: 
        // public getStreetView(lat: number, lng: number) {
        //   let url= this.apiUrl+'streetView?'
        // }
        /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiUrl + 'GoogleMaps/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} input
     * @param {?} query
     * @return {?}
     */
    Googlemaps.prototype._autocomplete = /**
     * @private
     * @param {?} input
     * @param {?} query
     * @return {?}
     */
    function (input, query) {
        return this.rq.post(this.apiUrl + "place/autocomplete?query=" + query, input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res.predictions;
        })));
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._placePredictions = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'place/predictions', input);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._nearbyPlaceCodes = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'place/nearby-place-codes', input);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._resolveAddressLocation = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'resolve-address-location', input);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._nearbySearch = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'place/nearby', input);
    };
    /**
     * @private
     * @param {?} next_page_token
     * @return {?}
     */
    Googlemaps.prototype._nextSearchResults = /**
     * @private
     * @param {?} next_page_token
     * @return {?}
     */
    function (next_page_token) {
        return this.rq.post(this.apiUrl + 'place/nearby', { next_page_token: next_page_token });
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._geocode = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res.results;
        })));
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._reverseGeocode = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'reverse-geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (isString(res)) {
                res = JSON.parse(res);
            }
            return uniqBy(res.results, (/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.formatted_address; }));
        })));
    };
    Googlemaps.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Googlemaps.ctorParameters = function () { return [
        { type: Requestor },
        { type: Smartloc },
        { type: Config },
        { type: Injector },
        { type: Network },
        { type: Cache }
    ]; };
    return Googlemaps;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Workplace = /** @class */ (function () {
    function Workplace(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    Object.defineProperty(Workplace.prototype, "apiUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiUrl + 'workplace/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Workplace.prototype.getAllGroups = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.apiUrl + 'getGroups';
        return this.rq
            .post(url, {
            query: {
                limit: 20,
                fields: 'icon, name, cover, description'
            }
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            res.data.forEach((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return (g._id = g.id); }));
            return res;
        })));
    };
    /**
     * @param {?} groupIds
     * @param {?} options
     * @return {?}
     */
    Workplace.prototype.postOnGroup = /**
     * @param {?} groupIds
     * @param {?} options
     * @return {?}
     */
    function (groupIds, options) {
        /** @type {?} */
        var url = this.apiUrl + 'post';
        return this.rq.post(url, {
            groupIds: groupIds,
            options: options
        });
    };
    Workplace.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Workplace.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config }
    ]; };
    return Workplace;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Files = /** @class */ (function () {
    function Files(rq, coreConfig, log, config) {
        this.rq = rq;
        this.coreConfig = coreConfig;
        this.log = log;
        this.config = config;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isFile = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isFile(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isBase64 = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isBase64(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isFileUri = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isFileUri(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isImageFile = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isImageFile(file);
    };
    /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    Files.prototype.read = /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    function (nativeFile, type, encoding) {
        if (type === void 0) { type = 'blob'; }
        return read((/** @type {?} */ (nativeFile)), type, encoding);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.getExtension = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return getExtension(file);
    };
    /**
     * @param {?} filename
     * @param {?} extension
     * @return {?}
     */
    Files.prototype.changeExtension = /**
     * @param {?} filename
     * @param {?} extension
     * @return {?}
     */
    function (filename, extension) {
        return changeExtension(filename, extension);
    };
    /**
     * @param {?} extension
     * @return {?}
     */
    Files.prototype.getMaxSize = /**
     * @param {?} extension
     * @return {?}
     */
    function (extension) {
        return getMaxSize(extension);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Files.prototype.toPng = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return toPng(value);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isValid = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isValid((/** @type {?} */ (file)));
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isImage = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isImage(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isVideo = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isVideo(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isAudio = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isAudio(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.isDocument = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return isDocument(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.getType = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return getType(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.getMimeType = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return getMimeType(file);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Files.prototype.getIcon = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return getIcon(file);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Files.prototype.getVideoPoster = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return getVideoPoster(value);
    };
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    Files.prototype.b64toBlob = /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    function (b64Data, contentType, sliceSize) {
        if (contentType === void 0) { contentType = null; }
        if (sliceSize === void 0) { sliceSize = 512; }
        return b64toBlob(b64Data, contentType, sliceSize);
    };
    /**
     * @param {?} blob
     * @return {?}
     */
    Files.prototype.blobToFile = /**
     * @param {?} blob
     * @return {?}
     */
    function (blob) {
        return blobToFile(blob);
    };
    /**
     * @param {?} data
     * @param {?} file
     * @return {?}
     */
    Files.prototype.b64ToFile = /**
     * @param {?} data
     * @param {?} file
     * @return {?}
     */
    function (data, file) {
        return b64ToFile(data, (/** @type {?} */ (file)));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Files.prototype.saveBase64AsImageFile = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return saveBase64AsImageFile(data);
    };
    /**
     * @param {?} base64
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    Files.prototype.resizeBase64Image = /**
     * @param {?} base64
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    function (base64, maxWidth, maxHeight) {
        return resizeBase64Image(base64, maxWidth, maxHeight);
    };
    /**
     * @param {?} base64
     * @return {?}
     */
    Files.prototype.getBase64MimeType = /**
     * @param {?} base64
     * @return {?}
     */
    function (base64) {
        return getBase64MimeType(base64);
    };
    /**
     * @param {?} base64
     * @return {?}
     */
    Files.prototype.getBase64Extension = /**
     * @param {?} base64
     * @return {?}
     */
    function (base64) {
        return getBase64Extension(base64);
    };
    /**
     * @param {?} file
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    Files.prototype.resizeImage = /**
     * @param {?} file
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    function (file, maxWidth, maxHeight) {
        return resizeImage((/** @type {?} */ (file)), maxWidth, maxHeight);
    };
    /**
     * @param {?} subfolder
     * @return {?}
     */
    Files.prototype.getNativeDirectory = /**
     * @param {?} subfolder
     * @return {?}
     */
    function (subfolder) {
        return getNativeDirectory(subfolder);
    };
    /**
     * @param {?} filePath
     * @return {?}
     */
    Files.prototype.resolveFilePath = /**
     * @param {?} filePath
     * @return {?}
     */
    function (filePath) {
        return resolveFilePath(filePath);
    };
    /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    Files.prototype.fixImageOrientation = /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    function (path, fileName) {
        return fixImageOrientation(path, fileName);
    };
    //should only be called in cordova
    //should only be called in cordova
    /**
     * @param {?} originalFilePath
     * @param {?=} disableOrientationFix
     * @return {?}
     */
    Files.prototype.moveToImageDirectory = 
    //should only be called in cordova
    /**
     * @param {?} originalFilePath
     * @param {?=} disableOrientationFix
     * @return {?}
     */
    function (originalFilePath, disableOrientationFix) {
        if (disableOrientationFix === void 0) { disableOrientationFix = false; }
        return moveToImageDirectory(originalFilePath, disableOrientationFix);
    };
    /**
     * @param {?} fileDirPath
     * @param {?} fileEntry
     * @param {?} newName
     * @param {?} originalFilePath
     * @return {?}
     */
    Files.prototype.moveToImageDirectoryBase = /**
     * @param {?} fileDirPath
     * @param {?} fileEntry
     * @param {?} newName
     * @param {?} originalFilePath
     * @return {?}
     */
    function (fileDirPath, fileEntry, newName, originalFilePath) {
        return moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
    };
    /**
     * @param {?} path
     * @param {?} fileName
     * @param {?} text
     * @param {?} options
     * @return {?}
     */
    Files.prototype.fileNativeWriteFile = /**
     * @param {?} path
     * @param {?} fileName
     * @param {?} text
     * @param {?} options
     * @return {?}
     */
    function (path, fileName, text, options) {
        return fileNativeWriteFile(path, fileName, text, options);
    };
    /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    Files.prototype.fileNativeCheckFile = /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    function (path, fileName) {
        return fileNativeCheckFile(path, fileName);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Files.prototype.fixAbsolutePath = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return fixAbsolutePath(data);
    };
    /**
     * @param {?} retVal
     * @return {?}
     */
    Files.prototype.getCloudinaryUrl = /**
     * @param {?} retVal
     * @return {?}
     */
    function (retVal) {
        return getCloudinaryUrl(retVal);
    };
    /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    Files.prototype.downloadFile = /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (filename, mediaType, url, options) {
        return this.rq.downloadFile(filename, mediaType, url, options);
    };
    /**
     * @return {?}
     */
    Files.prototype.getLocalFilePath = /**
     * @return {?}
     */
    function () {
        return getLocalFilePath();
    };
    /**
     * @param {?} fileName
     * @return {?}
     */
    Files.prototype.getLocalFileName = /**
     * @param {?} fileName
     * @return {?}
     */
    function (fileName) {
        return getLocalFileName(fileName);
    };
    /**
     * @param {?} blob
     * @param {?} fileName
     * @return {?}
     */
    Files.prototype.saveToLocalFile = /**
     * @param {?} blob
     * @param {?} fileName
     * @return {?}
     */
    function (blob, fileName) {
        return saveToLocalFile(blob, fileName);
    };
    /**
     * @param {?} src
     * @param {?=} photo
     * @return {?}
     */
    Files.prototype.getUrlWithAnnotations = /**
     * @param {?} src
     * @param {?=} photo
     * @return {?}
     */
    function (src, photo) {
        return getUrlWithAnnotations(src, photo);
    };
    /**
     * @param {?} fileName
     * @return {?}
     */
    Files.prototype.cleanFileName = /**
     * @param {?} fileName
     * @return {?}
     */
    function (fileName) {
        return cleanFileName(fileName);
    };
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    Files.prototype.downloadFileToDevice = /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function (source, target) {
        return downloadFileToDevice(source, target);
    };
    /**
     * @param {?} filePath
     * @param {?=} fileName
     * @return {?}
     */
    Files.prototype.showPdfOnDevice = /**
     * @param {?} filePath
     * @param {?=} fileName
     * @return {?}
     */
    function (filePath, fileName) {
        if (fileName === void 0) { fileName = null; }
        return showPdfOnDevice(filePath, fileName);
    };
    /**
     * @param {?} photoUrl
     * @return {?}
     */
    Files.prototype.uploadProxy = /**
     * @param {?} photoUrl
     * @return {?}
     */
    function (photoUrl) {
        var _this = this;
        /** @type {?} */
        var url = this.config.uploadProxyUrl;
        return this.rq.post(url, { url: photoUrl }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return _this.getCloudinaryUrl({ cloudinary: retVal });
        })));
    };
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    Files.prototype.exportToFile = /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    function (content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        var blob = new Blob([content], {
            type: type
        });
        return this.rq.saveBlob(blob, filename);
    };
    /**
     * @param {?} blob
     * @param {?} fileName
     * @param {?} mimeType
     * @return {?}
     */
    Files.prototype.openBlob = /**
     * @param {?} blob
     * @param {?} fileName
     * @param {?} mimeType
     * @return {?}
     */
    function (blob, fileName, mimeType) {
        return openBlob(blob, fileName, mimeType);
    };
    /**
     * @param {?} filePath
     * @param {?} mimeType
     * @return {?}
     */
    Files.prototype.afterOpenBlob = /**
     * @param {?} filePath
     * @param {?} mimeType
     * @return {?}
     */
    function (filePath, mimeType) {
        return afterOpenBlob(filePath, mimeType);
    };
    /**
     * @return {?}
     */
    Files.prototype._requestExternalStoragePermission = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (_this.coreConfig.isAndroid() && _this.coreConfig.isCordova()) {
                /** @type {?} */
                var permissions_1 = ((/** @type {?} */ (window.cordova.plugins))).permissions;
                permissions_1.hasPermission(permissions_1.READ_EXTERNAL_STORAGE, (/**
                 * @param {?} initialStatus
                 * @return {?}
                 */
                function (initialStatus) {
                    if (!initialStatus.hasPermission) {
                        /** @type {?} */
                        var errorCallback_1 = (/**
                         * @return {?}
                         */
                        function () {
                            _this.log.error('Storage permission is not turned on');
                            reject(false);
                        });
                        permissions_1.requestPermission(permissions_1.READ_EXTERNAL_STORAGE, (/**
                         * @param {?} status
                         * @return {?}
                         */
                        function (status) {
                            if (!status.hasPermission) {
                                errorCallback_1();
                            }
                            else {
                                resolve(true);
                            }
                        }), errorCallback_1);
                    }
                    else {
                        resolve(true);
                    }
                }));
            }
            else {
                resolve(true);
            }
        }));
    };
    Files.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Files.ctorParameters = function () { return [
        { type: Requestor },
        { type: CoreConfig },
        { type: Log },
        { type: Config }
    ]; };
    return Files;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Box = /** @class */ (function () {
    function Box(config, rq, coreConfig) {
        this.config = config;
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} documentUrl
     * @return {?}
     */
    Box.prototype.upload = /**
     * @param {?} documentUrl
     * @return {?}
     */
    function (documentUrl) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/uploadToBox';
        return this.rq.post(url, { params: { documentUrl: documentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data) {
                return retVal.data.id;
            }
            return null;
        })));
    };
    /**
     * @param {?} boxId
     * @return {?}
     */
    Box.prototype.createViewingSession = /**
     * @param {?} boxId
     * @return {?}
     */
    function (boxId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/createViewingSessionBox';
        return this.rq.post(url, { params: { boxId: boxId } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data) {
                return retVal.data;
            }
            return null;
        })));
    };
    /**
     * @param {?} contentUrl
     * @return {?}
     */
    Box.prototype.getViewingContent = /**
     * @param {?} contentUrl
     * @return {?}
     */
    function (contentUrl) {
        var _this = this;
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getViewingContentBox';
        return this.rq.post(url, { params: { contentUrl: contentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data) {
                /** @type {?} */
                var content = retVal.data;
                /** @type {?} */
                var headIndex = content.indexOf('<head>') + 6;
                /** @type {?} */
                var overwriteStyle = '<style type="text/css">';
                overwriteStyle += '.controls-center .scroll-previous-btn, .controls-center .scroll-next-btn, .controls-right .zoom-in-btn, .controls-right .zoom-out-btn, .controls-right {';
                overwriteStyle += '  display: initial !important;';
                overwriteStyle += '}';
                overwriteStyle += '.fullscreen-btn {';
                overwriteStyle += '  display: none !important;';
                overwriteStyle += '}';
                overwriteStyle += '</style>';
                /** @type {?} */
                var protocol = _this.coreConfig.getProtocol();
                content = [content.slice(0, headIndex), overwriteStyle, content.slice(headIndex)].join('');
                content = content.replace(new RegExp('href="//', 'g'), 'href="' + protocol + '//');
                content = content.replace(new RegExp('src="//', 'g'), 'src="' + protocol + '//');
                return content;
            }
            return null;
        })));
    };
    Box.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Box.ctorParameters = function () { return [
        { type: Config },
        { type: Requestor },
        { type: CoreConfig }
    ]; };
    return Box;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Unsplash = /** @class */ (function () {
    function Unsplash(rq, coreConfig) {
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    Unsplash.prototype.getAll = /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    function (search, skip, limit) {
        /** @type {?} */
        var url;
        if (search) {
            url = 'https://api.unsplash.com/search/photos?client_id=' + this.coreConfig.getKey('unsplashAccessKey');
            url += '&query=' + search;
            url += '&page=' + (skip / limit + 1);
            url += '&per_page=' + limit;
        }
        else {
            url = 'https://api.unsplash.com/photos?page=1&per_page=20&client_id=' + this.coreConfig.getKey('unsplashAccessKey');
        }
        return this.rq.get(url, null, null, null, true).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            //{
            //count: search ? ret.total : 100,
            //data:
            return (search ? ret.results : ret).map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return ({
                _id: r.id,
                title: r.description,
                value: r.urls.raw,
                thumb: r.urls.thumb
            }); }));
            //};
        })));
    };
    Unsplash.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Unsplash.ctorParameters = function () { return [
        { type: Requestor },
        { type: CoreConfig }
    ]; };
    return Unsplash;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ResponseObject = /** @class */ (function () {
    function ResponseObject() {
    }
    return ResponseObject;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//, groupBy, flatMap, reduce
var Broker = /** @class */ (function () {
    function Broker(rq, box, googlemaps, workplace, session, files, promise, coreConfig, log, network, transfer, localForage, config, injector, cache, geoloc, translate, unsplash) {
        this.rq = rq;
        this.box = box;
        this.googlemaps = googlemaps;
        this.workplace = workplace;
        this.session = session;
        this.files = files;
        this.promise = promise;
        this.coreConfig = coreConfig;
        this.log = log;
        this.network = network;
        this.transfer = transfer;
        this.localForage = localForage;
        this.config = config;
        this.injector = injector;
        this.cache = cache;
        this.geoloc = geoloc;
        this.translate = translate;
        this.unsplash = unsplash;
        this.init();
    }
    /**
     * @return {?}
     */
    Broker.prototype.init = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    Broker.prototype.getApiUrl = /**
     * @return {?}
     */
    function () {
        return this.config.apiUrl;
    };
    /**
     * @return {?}
     */
    Broker.prototype.getServerUrl = /**
     * @return {?}
     */
    function () {
        return this.config.serverUrl;
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Broker.prototype.getCollectionName = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            return 'custommodelinstances';
        }
        return collectionName;
    };
    /**
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} idAttributeName
     * @return {?}
     */
    Broker.prototype.getById = /**
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} idAttributeName
     * @return {?}
     */
    function (collectionName, id, fields, include, idAttributeName) {
        /** @type {?} */
        var query = this.getQuery(collectionName, fields, include);
        delete query.limit;
        delete query.skip;
        delete query.order;
        delete query.subQuery;
        if (this.network.isOffline()) {
            return from(this.cache.getByIdFromDatabaseCollection(collectionName, id, idAttributeName));
        }
        else if (!idAttributeName || idAttributeName === '_id') {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(query));
            return this.rq.get(url);
        }
        else {
            /** @type {?} */
            var filters = [[{ field: idAttributeName, operator: { _id: 'eq' }, value: id }]];
            return this.getAll(collectionName, fields, include, null, filters).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res.data && res.data.length > 0) {
                    return res.data[0];
                }
                return null;
            })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.create = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName);
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline()) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.rq.post(url, entity);
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.update = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else if (collectionName === 'groups') {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName);
            this.updateCustomModel(collectionName, entity);
            return this.rq.put(url, entity);
        }
        else {
            if (entity._id) {
                return this.patch(collectionName, entity);
            }
            else {
                return this.create(collectionName, entity);
            }
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} fields
     * @return {?}
     */
    Broker.prototype.save = /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} fields
     * @return {?}
     */
    function (collectionName, entity, fields) {
        var _this = this;
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.upsert(collectionName, entity).pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.getById(collectionName, res._id, fields); })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.patch = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        if (!entity || !entity._id) {
            throw new Error('Cant patch an empty entity or an entity without an id');
        }
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity, true));
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + entity._id;
            return this.rq.patch(url, entity);
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} previousEntity
     * @param {?=} skipAcl
     * @return {?}
     */
    Broker.prototype.upsert = /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} previousEntity
     * @param {?=} skipAcl
     * @return {?}
     */
    function (collectionName, entity, previousEntity, skipAcl) {
        var _this = this;
        if (!skipAcl) {
            this.setAcl(entity, ((/** @type {?} */ (entity))).group, false, collectionName);
        }
        this.incrementTags(collectionName, entity).subscribe((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var suffixs = collectionName === 'missiondatas' ? ['.value', '.edit', '.value.fieldValue'] : ['._downloadURL', '.edit'];
        /** @type {?} */
        var hasFiles = this._hasFiles(entity, suffixs);
        if (this.network.isOffline() || !hasFiles) {
            return this.update(collectionName, entity);
        }
        else {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.uploadEntityFiles(entity, suffixs).then((/**
                 * @return {?}
                 */
                function () {
                    _this.update(collectionName, entity).subscribe((/**
                     * @param {?} ret
                     * @return {?}
                     */
                    function (ret) {
                        if (ret._downloadURL && _this.files.isDocument(ret._downloadURL)) {
                            _this.box.upload(ret._downloadURL).subscribe((/**
                             * @param {?} boxId
                             * @return {?}
                             */
                            function (boxId) {
                                if (boxId) {
                                    ret.boxId = boxId;
                                }
                                _this.update(collectionName, ret).subscribe((/**
                                 * @param {?} retval
                                 * @return {?}
                                 */
                                function (retval) {
                                    observer.next(retval);
                                    observer.complete();
                                }));
                            }));
                        }
                        else {
                            observer.next(ret);
                            observer.complete();
                        }
                    }));
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) { }));
            }));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entities
     * @return {?}
     */
    Broker.prototype.upsertAll = /**
     * @param {?} collectionName
     * @param {?} entities
     * @return {?}
     */
    function (collectionName, entities) {
        var _this = this;
        /** @type {?} */
        var obs = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return _this.upsert(collectionName, entity); }));
        return forkJoin(obs);
    };
    /**
     * @param {?} entity
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @param {?=} promisesOnly
     * @param {?=} totalOffset
     * @return {?}
     */
    Broker.prototype.uploadEntityFiles = /**
     * @param {?} entity
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @param {?=} promisesOnly
     * @param {?=} totalOffset
     * @return {?}
     */
    function (entity, suffixs, progressEmitter, tags, promisesOnly, totalOffset) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        if (promisesOnly === void 0) { promisesOnly = false; }
        if (totalOffset === void 0) { totalOffset = 0; }
        /** @type {?} */
        var properties = this._getFileProperties(entity, suffixs);
        /** @type {?} */
        var count = 0;
        /** @type {?} */
        var promises = properties.map((/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            /** @type {?} */
            var promise;
            /** @type {?} */
            var file = get(entity, prop);
            promise = ((/**
             * @param {?} offsetIndex
             * @param {?} total
             * @return {?}
             */
            function (offsetIndex, total) {
                return (/**
                 * @return {?}
                 */
                function () {
                    return _this.prepareUpload(file)
                        .then((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        return _this.upload(f, progressEmitter, offsetIndex, total, tags, totalOffset);
                    }))
                        .then((/**
                     * @param {?} url
                     * @return {?}
                     */
                    function (url) {
                        set(entity, prop, url);
                    }))
                        .catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return Promise.reject(err); }));
                });
            }))(count, properties.length);
            count += 1;
            return promise;
        }));
        if (promisesOnly) {
            return promises.length > 0 ? promises : (/** @type {?} */ ([(/**
                 * @return {?}
                 */
                function () { return Promise.resolve('empty'); })]));
        }
        return this.promise.sequential(promises);
    };
    /**
     * @param {?} entities
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @return {?}
     */
    Broker.prototype.uploadEntitiesFiles = /**
     * @param {?} entities
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @return {?}
     */
    function (entities, suffixs, progressEmitter, tags) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        /** @type {?} */
        var promises = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            return (/**
             * @return {?}
             */
            function () { return _this.uploadEntityFiles(entity, suffixs, progressEmitter, tags, false); });
        }));
        return this.promise.sequential(promises);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Broker.prototype.prepareUpload = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        return this.files._requestExternalStoragePermission().then((/**
         * @return {?}
         */
        function () {
            if (_this.files.isBase64(file)) {
                return Promise.resolve(_this.files.b64toBlob(file));
            }
            else if (_this.files.isFileUri(file)) {
                return _this.files.resolveFilePath((/** @type {?} */ (file)));
            }
            else {
                return Promise.resolve(file);
            }
        }));
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.updateAll = /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, query, entity) {
        /** @type {?} */
        var rawQuery = assign({}, query.where);
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        if (entity.group) {
            entity['_acl.groups.r'] = entity.group;
        }
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/update?where=' + encodeURIComponent(JSON.stringify(rawQuery));
        return this.rq.post(url, entity);
    };
    /**
     * @param {?} entity
     * @param {?=} group
     * @param {?=} addWrite
     * @param {?=} collectionName
     * @param {?=} users
     * @return {?}
     */
    Broker.prototype.setAcl = /**
     * @param {?} entity
     * @param {?=} group
     * @param {?=} addWrite
     * @param {?=} collectionName
     * @param {?=} users
     * @return {?}
     */
    function (entity, group, addWrite, collectionName, users) {
        if (addWrite === void 0) { addWrite = false; }
        //entity._acl = entity._acl || { groups: { r: ['admin'], w: ['admin', 'manager'] } };
        entity._acl = entity._acl || { groups: { r: [], w: [] } };
        entity._acl.creator = entity._acl && entity._acl.creator ? entity._acl.creator : this.session.user ? this.session.user._id : null;
        entity._acl.groups = entity._acl && entity._acl.groups ? entity._acl.groups : {};
        if (group) {
            entity._acl.groups.r = uniq([].concat(group).concat(entity._acl.groups.r));
        }
        entity._acl.groups.r = compact(entity._acl.groups.r);
        //entity._acl.groups.w = compact(uniq(['admin', 'manager'].concat(entity._acl.groups.w || [])));
        entity._acl.groups.w = compact(uniq([].concat(entity._acl.groups.w || [])));
        if (collectionName === 'translations' && group) {
            entity._acl.groups.r = uniq([].concat(group));
            entity._acl.groups.w = uniq([].concat(group));
        }
        if (addWrite && group) {
            entity._acl.groups.w = compact(uniq([].concat(group).concat(entity._acl.groups.w)));
        }
        if (users && users.length > 0) {
            //entity._acl.users = { r: users, w: users };
            entity._acl.groups.r = entity._acl.groups.r.concat(users);
        }
    };
    /**
     * @return {?}
     */
    Broker.prototype.getCurrentGroups = /**
     * @return {?}
     */
    function () {
        if (this.session.roles.indexOf('admin') < 0) {
            return this.session.groups;
        }
        else {
            return ['debug_v2'];
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.updateCustomModel = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            entity._modelName = collectionName;
            if (entity.location && entity.location._id) {
                entity.locationRef = entity.location._id;
            }
        }
    };
    /**
     * @param {?} file
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @param {?=} tags
     * @param {?=} totalOffset
     * @return {?}
     */
    Broker.prototype.upload = /**
     * @param {?} file
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @param {?=} tags
     * @param {?=} totalOffset
     * @return {?}
     */
    function (file, progressEmitter, offsetIndex, total, tags, totalOffset) {
        var _this = this;
        if (offsetIndex === void 0) { offsetIndex = 0; }
        if (total === void 0) { total = 1; }
        if (tags === void 0) { tags = []; }
        if (totalOffset === void 0) { totalOffset = 0; }
        tags = concat([this.session.userId], tags);
        //check for file created from base64 if we can send them through cordova transfert plugin.
        if (this.coreConfig.isCordova() && file.nativeURL) {
            /** @type {?} */
            var fileTransfer = this.transfer.create();
            if (progressEmitter) {
                fileTransfer.onProgress((/**
                 * @param {?} ev
                 * @return {?}
                 */
                function (ev) {
                    if (ev.lengthComputable) {
                        /** @type {?} */
                        var percentage = ((ev.loaded / ev.total) * 100) / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
                        progressEmitter.next(percentage);
                    }
                }));
            }
            return fileTransfer
                .upload(file.nativeURL, this.config.uploadUrl, {
                fileKey: 'file',
                fileName: file.name,
                chunkedMode: false,
                params: { tags: tags }
            })
                .then((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                /** @type {?} */
                var retVal = JSON.parse(result.response);
                return _this.files.getCloudinaryUrl(retVal);
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                /** @type {?} */
                var fileError = err && err.message ? err.message : 'File Error';
                return Promise.reject(fileError);
            }));
        }
        else {
            /** @type {?} */
            var fileUploader_1 = this.getFileUploader(null);
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                fileUploader_1.onBuildItemForm = (/**
                 * @param {?} fileItem
                 * @param {?} form
                 * @return {?}
                 */
                function (fileItem, form) {
                    form.append('tags', JSON.stringify(tags));
                });
                fileUploader_1.onCompleteItem = (/**
                 * @param {?} item
                 * @param {?} response
                 * @param {?} status
                 * @param {?} headers
                 * @return {?}
                 */
                function (item, response, status, headers) {
                    _this.log.log('upload finish');
                    fileUploader_1.clearQueue();
                    if (status === 200) {
                        /** @type {?} */
                        var retVal = JSON.parse(response);
                        resolve(_this.files.getCloudinaryUrl(retVal));
                    }
                    else {
                        reject(response ? JSON.parse(response) : 'error');
                    }
                });
                if (progressEmitter) {
                    fileUploader_1.onProgressItem = (/**
                     * @param {?} item
                     * @param {?} progress
                     * @return {?}
                     */
                    function (item, progress) {
                        /** @type {?} */
                        var percentage = progress / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
                        progressEmitter.next(percentage);
                    });
                }
                fileUploader_1.addToQueue([file]);
                fileUploader_1.queue[0].alias = 'undefined';
                //fileItem.alias = 'undefined';
                _this.log.log('upload begin');
                fileUploader_1.uploadAll();
            }));
        }
    };
    /**
     * @param {?} data
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @return {?}
     */
    Broker.prototype.uploadData = /**
     * @param {?} data
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @return {?}
     */
    function (data, progressEmitter, offsetIndex, total) {
        if (offsetIndex === void 0) { offsetIndex = 0; }
        if (total === void 0) { total = 1; }
        /** @type {?} */
        var file = this.files.b64toBlob(data);
        return this.upload(file, progressEmitter, offsetIndex, total);
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.incrementTags = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        if (entity.tags && entity.tags.length > 0) {
            entity.tags = uniq(compact([].concat(entity.tags)));
            if (entity.tags.length > 0 && !this.network.isOffline()) {
                /** @type {?} */
                var url = this.config.apiUrl + 'tags/incrementTags';
                return this.rq.post(url, {
                    params: {
                        collectionName: Models.fixCollectionName(collectionName),
                        tags: entity.tags,
                        groups: [].concat(entity.group || entity._acl.groups.r),
                        entity: entity
                    }
                });
            }
        }
        return of(null);
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Broker.prototype.updateTags = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var url = this.config.apiUrl + 'tags/updateTags';
        return this.rq.post(url, { params: { collection: collectionName } });
    };
    /**
     * @return {?}
     */
    Broker.prototype.createAllTags = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.config.apiUrl + 'businessLogic/createAllTags';
        return this.rq.post(url, { params: {} });
    };
    /**
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    Broker.prototype.delete = /**
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    function (collectionName, id) {
        if (this.isOfflineId(id)) {
            return from(this.cache.removeFromDatabaseCollection(collectionName, id));
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + encodeURIComponent(id);
            return this.rq.delete(url);
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    Broker.prototype.deleteAll = /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    function (collectionName, query) {
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName);
        /** @type {?} */
        var rawQuery = assign({}, query.where || { _id: { exists: true } });
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        return this.rq.delete(url, rawQuery);
    };
    /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    Broker.prototype.getQuery = /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    function (collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter) {
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model) {
            fields = fields && fields.length > 0 ? fields : model.fields;
            include = include || model.include;
            if (model && model.isCustom) {
                if (!filters || (isArray(filters) && ((/** @type {?} */ (filters))).length < 1)) {
                    filters = [[]];
                }
                if (isArray(filters)) {
                    filters = cloneDeep(filters);
                    ((/** @type {?} */ (filters))).forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        f.push({ field: '_modelName', operator: { _id: 'eq' }, value: model.collectionName });
                    }));
                }
            }
        }
        /** @type {?} */
        var query = {};
        if (skip && skip > 0) {
            query.skip = skip;
        }
        if (limit && limit > 0) {
            query.limit = limit;
        }
        if (sorts && sorts.length > 0) {
            query.order = sorts.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return isString(s) || (s.colId && s.sort); })).map((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return (isString(s) ? s : s.colId + ' ' + (s.sort ? s.sort.toUpperCase() : 'ASC')); }));
        }
        else if (sorts && sorts.length === 0) {
            query.order = [];
        }
        else {
            query.order = ['_lmt DESC'];
        }
        /** @type {?} */
        var searchWhere = null;
        /** @type {?} */
        var filterWhere = null;
        if (search && model && !model.searchSubquery) {
            searchWhere = Models.exportSearch(collectionName, search);
        }
        if (filters && isArray(filters) && ((/** @type {?} */ (filters))).length > 0) {
            filterWhere = Models.exportWhere(collectionName, (/** @type {?} */ (filters)));
        }
        else if (filters && !isArray(filters) && isObject(filters)) {
            filterWhere = filters;
        }
        if (searchWhere && filterWhere) {
            query.where = { and: [searchWhere, filterWhere] };
        }
        else if (searchWhere) {
            query.where = searchWhere;
        }
        else if (filterWhere) {
            query.where = filterWhere;
        }
        if (customFilter && query.where) {
            query.where = { and: [query.where, customFilter] };
        }
        else if (customFilter) {
            query.where = customFilter;
        }
        if (fields && fields.length > 0) {
            query.fields = fields;
        }
        if (!isEmpty(include)) {
            query.include = include;
        }
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        var filterSubquery = Models.exportSubQuery(collectionName, filters);
        if (filterSubquery) {
            if (query.subQuery) {
                query.subQuery = [].concat(query.subQuery, filterSubquery);
            }
            else {
                query.subQuery = filterSubquery;
            }
        }
        //this is mainly used in the channel model because we want to filter on users properties
        if (search && model && model.searchSubquery) {
            searchWhere = Models.exportSearch(model.searchSubquery.collectionName, search);
            if (!query.subQuery) {
                query.subQuery = {
                    collectionName: model.searchSubquery.collectionName,
                    field: model.searchSubquery.field,
                    values: model.searchSubquery.values,
                    where: searchWhere
                };
            }
            else if (query.subQuery && !isArray(query.subQuery) && ((/** @type {?} */ (query.subQuery))).where) {
                ((/** @type {?} */ (query.subQuery))).where = { and: [searchWhere, ((/** @type {?} */ (query.subQuery))).where] };
            }
        }
        return query;
    };
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} noOffline
     * @return {?}
     */
    Broker.prototype.getCount = /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} noOffline
     * @return {?}
     */
    function (collectionName, search, filters, subQuery, customFilter, noOffline) {
        var _this = this;
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (noOffline === void 0) { noOffline = false; }
        if (this.network.isOffline()) {
            return this.getAllOffline(collectionName, false, search, filters, null, null, null, customFilter, false).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                return { count: ret.count, data: [] };
            })));
        }
        else {
            /** @type {?} */
            var query = this.getQuery(collectionName, null, null, search, filters, null, null, null, subQuery, customFilter);
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/count';
            //?where=' + encodeURIComponent(JSON.stringify(query.where || {}));
            /** @type {?} */
            var finalQuery = {};
            if (query.where) {
                finalQuery.where = query.where;
            }
            if (query.subQuery) {
                finalQuery.subQuery = query.subQuery;
            }
            /** @type {?} */
            var finalRes_1;
            return this.rq
                .post(url, finalQuery)
                .pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                finalRes_1 = res;
                if (noOffline) {
                    return of([]);
                }
                else {
                    return from(_this.getAllOffline(collectionName, true, search, filters, null, null, null, customFilter));
                }
            })))
                .pipe(map((/**
             * @param {?} offlineRes
             * @return {?}
             */
            function (offlineRes) {
                /** @type {?} */
                var count = finalRes_1 || 0;
                if (offlineRes && offlineRes.count > 0) {
                    count += offlineRes.count;
                }
                return { count: count, data: [] };
            })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} cacheId
     * @param {?=} looseCount
     * @param {?=} noCount
     * @param {?=} noOffline
     * @return {?}
     */
    Broker.prototype.getAll = /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} cacheId
     * @param {?=} looseCount
     * @param {?=} noCount
     * @param {?=} noOffline
     * @return {?}
     */
    function (collectionName, fields, include, search, filters, sorts, skip, limit, tag, subQuery, customFilter, cacheId, looseCount, noCount, noOffline) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (looseCount === void 0) { looseCount = null; }
        if (noCount === void 0) { noCount = false; }
        if (noOffline === void 0) { noOffline = false; }
        if (collectionName === 'googlemaps') {
            return this.getAllGoogleMaps(search);
        }
        if (collectionName.indexOf('workplace_') >= 0) {
            return this.getAllWorkplace(collectionName, search);
        }
        if (collectionName === 'unsplash') {
            return this.getAllUnsplash(search, skip, limit);
        }
        if (tag === true) {
            return this.getAllTags(collectionName, search, filters, skip, limit);
        }
        else {
            /** @type {?} */
            var query = this.getQuery(collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter);
            if (collectionName.indexOf('_store') >= 0) {
                return this.getAllOperation(collectionName, query);
            }
            /** @type {?} */
            var obs = void 0;
            if (this.network.isOffline()) {
                if (cacheId) {
                    obs = from(this.localForage.get(cacheId)).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) {
                        return res || (noCount ? [] : { count: 0, data: [] });
                    })));
                }
                else {
                    obs = this.getAllOffline(collectionName, false, search, filters, sorts, skip, limit, customFilter, noCount);
                }
            }
            else {
                /** @type {?} */
                var finalRes_2;
                obs = this.getAllQuery(collectionName, query, looseCount, noCount)
                    .pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    finalRes_2 = res;
                    if (cacheId) {
                        _this.localForage.set(cacheId, res);
                    }
                    if (noOffline) {
                        return of([]);
                    }
                    else {
                        return from(_this.getAllOffline(collectionName, true, search, filters, sorts, skip, limit, customFilter, noCount));
                    }
                })))
                    .pipe(map((/**
                 * @param {?} offlineRes
                 * @return {?}
                 */
                function (offlineRes) {
                    if (noCount) {
                        finalRes_2 = __spread((offlineRes || []), (finalRes_2 || []));
                    }
                    else {
                        finalRes_2.data = __spread((offlineRes.data || []), (finalRes_2.data || []));
                    }
                    return finalRes_2;
                })));
            }
            return obs;
        }
    };
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} useTagsCollection
     * @return {?}
     */
    Broker.prototype.getAllTags = /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} useTagsCollection
     * @return {?}
     */
    function (collectionName, search, filters, skip, limit, useTagsCollection) {
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (useTagsCollection === void 0) { useTagsCollection = false; }
        filters = filters || [[]];
        //fix for "MongoError","message":"$geoNear, $near, and $nearSphere are not allowed in this context"
        if (collectionName === 'locations') {
            filters = filters.map((/**
             * @param {?} ff
             * @return {?}
             */
            function (ff) {
                return ff.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.field !== '_geoloc'; }));
            }));
        }
        if (this.network.isOffline()) {
            return this.getAllTagsOffline({ collectionName: collectionName, search: search, filters: filters });
        }
        else if (useTagsCollection) {
            //this is not used anymore
            /** @type {?} */
            var aggregateOptions = [{ $match: { collectionName: Models.fixCollectionName(collectionName) } }, { $group: { _id: '$tag', count: { $max: '$count' } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, { $group: { _id: 1, total: { $sum: 1 }, data: { $push: '$$ROOT' } } }, { $project: { count: '$total', data: { $slice: ['$data', skip, skip + limit] } } }];
            return this.aggregateQuery('tags', filters, aggregateOptions, search).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return (res && res.length > 0 ? { data: res[0].data, count: res[0].count } : { data: [], count: 0 }); })));
        }
        else {
            /** @type {?} */
            var aggregateOptions = [{ $unwind: '$tags' }];
            if (search) {
                aggregateOptions.push({
                    $match: { tags: { $regex: search.replace(/([^a-z0-9]+)/gi, ''), $options: 'i' } }
                });
            }
            aggregateOptions = aggregateOptions.concat(__spread([{ $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }], (skip > 0 ? [{ $skip: skip }] : []), (limit > 0 ? [{ $limit: limit }] : [])));
            return this.aggregateQuery(collectionName, filters, aggregateOptions).pipe(map((/**
             * @param {?=} res
             * @return {?}
             */
            function (res) {
                if (res === void 0) { res = []; }
                return ({ data: res, count: res.length });
            })));
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    Broker.prototype.getAllTagsOffline = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return this.getAllOffline(config.collectionName, false, config.search, config.filters, null, null, null, null, true).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var data = [];
            /** @type {?} */
            var count = {};
            if (res && res.length > 0) {
                res.forEach((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    if (t.tags) {
                        [].concat(t.tags).forEach((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        function (tag) {
                            count[tag] = count[tag] > 0 ? count[tag] + 1 : 1;
                        }));
                    }
                }));
                keys(count).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    data.push({ _id: key, tag: key, count: count[key] });
                }));
                data = orderBy(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return -d.count; }));
            }
            return { data: data, count: data.length, config: config };
        })));
    };
    /**
     * @param {?} config
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    Broker.prototype.getMultipleAllTags = /**
     * @param {?} config
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    function (config, skip, limit) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (this.network.isOffline()) {
            /** @type {?} */
            var obs = config.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.getAllTagsOffline(c); }));
            return combineLatest(obs).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                return ret;
            })));
        }
        else {
            /** @type {?} */
            var aggregateOptions_1 = __spread([{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }], (skip > 0 ? [{ $skip: skip }] : []), (limit > 0 ? [{ $limit: limit }] : []));
            /** @type {?} */
            var queries = config.map((/**
             * @param {?} conf
             * @return {?}
             */
            function (conf) {
                /** @type {?} */
                var filters = conf.filters || [];
                if (conf.collectionName === 'locations') {
                    filters = filters.map((/**
                     * @param {?} ff
                     * @return {?}
                     */
                    function (ff) {
                        return ff.filter((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.field !== '_geoloc'; }));
                    }));
                }
                return _this.getAggregateQuery(conf.collectionName, filters, aggregateOptions_1, conf.search, null, null, null, conf.subQuery);
            }));
            return this.aggregateQueries(queries).pipe(map((/**
             * @param {?} rets
             * @return {?}
             */
            function (rets) {
                /** @type {?} */
                var retVal = rets.map((/**
                 * @param {?} res
                 * @param {?} i
                 * @return {?}
                 */
                function (res, i) { return ({ data: res, count: res.length, config: config[i] }); }));
                return retVal;
            })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?=} looseCount
     * @param {?=} noCount
     * @return {?}
     */
    Broker.prototype.getAllQuery = /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?=} looseCount
     * @param {?=} noCount
     * @return {?}
     */
    function (collectionName, query, looseCount, noCount) {
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/find';
        return this.rq.post(url, { filter: query }, null, !noCount, false, looseCount);
        //let url = this.config.apiUrl + collectionName + '?filter=' + encodeURIComponent(JSON.stringify(query));
        //return this.rq.get(url, true);
    };
    /**
     * @param {?=} search
     * @return {?}
     */
    Broker.prototype.getAllGoogleMaps = /**
     * @param {?=} search
     * @return {?}
     */
    function (search) {
        if (search) {
            return this.googlemaps.placePredictionsLocationObserver(search).pipe(map((/**
             * @param {?} predictions
             * @return {?}
             */
            function (predictions) {
                /** @type {?} */
                var details = flatten(predictions).filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.geometry && d.geometry.location; }));
                return {
                    count: details.length,
                    data: details.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        /** @type {?} */
                        var position = new Position(d.geometry.location);
                        return {
                            address: d.formatted_address,
                            _id: d.id,
                            _geoloc: position.toGeoLoc(true),
                            coords: position.toJson()
                        };
                    }))
                };
            })));
        }
        else {
            return from(this.googlemaps.getCurrentAddresses(true)).pipe(map((/**
             * @param {?} addresses
             * @return {?}
             */
            function (addresses) {
                return { count: addresses.length, data: addresses };
            })));
        }
    };
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    Broker.prototype.getAllUnsplash = /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    function (search, skip, limit) {
        return this.unsplash.getAll(search, skip, limit);
    };
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @return {?}
     */
    Broker.prototype.getAllWorkplace = /**
     * @param {?} collectionName
     * @param {?=} search
     * @return {?}
     */
    function (collectionName, search) {
        /** @type {?} */
        var graphEntity = collectionName.replace('workplace_', '');
        switch (graphEntity) {
            case 'groups':
                return (/** @type {?} */ (this.workplace.getAllGroups()));
        }
        return of({ count: 0, data: [] });
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    Broker.prototype.getAllOperation = /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    function (collectionName, query) {
        /** @type {?} */
        var url = this.config.apiUrl + 'Operation/findDocument';
        return this.rq
            .post(url, {
            collectionName: Models.fixCollectionName(collectionName.replace('_store', ''), true),
            where: query.where,
            //operationId: (<any>query.where).operationId.inq[0],
            limit: query.limit,
            skip: query.skip
        }, null, true)
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.data && res.data.map) {
                res.data = res.data; //.map(r => r.doc);
            }
            return res;
        })));
    };
    /**
     * @param {?=} lastSync
     * @param {?=} progressEvent
     * @return {?}
     */
    Broker.prototype.syncDatabase = /**
     * @param {?=} lastSync
     * @param {?=} progressEvent
     * @return {?}
     */
    function (lastSync, progressEvent) {
        var _this = this;
        /** @type {?} */
        var collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            this.log.log('Syncing Database - Start');
            /** @type {?} */
            var promises = collections.map((/**
             * @param {?} entry
             * @param {?} i
             * @return {?}
             */
            function (entry, i) {
                return (/**
                 * @return {?}
                 */
                function () {
                    if (entry.max <= 0) {
                        return;
                    }
                    _this.log.log('Syncing Database - Syncing ' + entry.name);
                    return _this.cache.getDatabaseCollection(entry.name).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        /** @type {?} */
                        var filters = cloneDeep(entry.filters || [[]]);
                        filters.forEach((/**
                         * @param {?} fs
                         * @return {?}
                         */
                        function (fs) {
                            return fs.forEach((/**
                             * @param {?} f
                             * @return {?}
                             */
                            function (f) {
                                if (f.value && isArray(f.value) && f.value.indexOf('currentLanguage') >= 0) {
                                    f.value[f.value.indexOf('currentLanguage')] = _this.translate.getCurrentLanguage();
                                }
                            }));
                        }));
                        if (lastSync && data.length > 0) {
                            // && ) {
                            filters.forEach((/**
                             * @param {?} f
                             * @return {?}
                             */
                            function (f) { return f.push({ field: '_lmt', operator: { _id: 'gte' }, value: lastSync }); }));
                        }
                        return (_this.getAll(entry.name, entry.fields, null, null, filters, null, 0, Math.min(entry.max || 1000, 1000), null, null, null, null, null, null, true)
                            .toPromise()
                            // let chunckNumber = (entry.max || 10000) / 100;
                            // let ps = [];
                            // for (let ii = 0; ii <= chunckNumber; ii++) {
                            //   ps.push(this.getAll(entry.name, entry.fields, null, null, filters, null, ii * 100, 100).toPromise());
                            //   //ps.push(this.aggregateQuery(entry.name, filters, [{ $skip: ii * 100 }, { $limit: 100 }], null, null, false, null, null).toPromise());
                            // }
                            // return Promise.all(ps)
                            // .then((ret: Array<ResponseObject>) => {
                            //   let d = [].concat.apply([], ret.map(r => r.data));
                            //   return {
                            //     count: d.length,
                            //     data: d
                            //   };
                            // })
                            .then((/**
                         * @param {?} ret
                         * @return {?}
                         */
                        function (ret) {
                            if (progressEvent) {
                                progressEvent.emit((i / collections.length) * 100);
                            }
                            if (ret && ret.data) {
                                /** @type {?} */
                                var filePromises_1 = [Promise.resolve(null)];
                                /** @type {?} */
                                var deletedKeys_1;
                                if (lastSync) {
                                    filePromises_1 = [
                                        _this.getDeletedEntities(entry.name, data)
                                            .toPromise()
                                            .then((/**
                                         * @param {?} deletedkeys
                                         * @return {?}
                                         */
                                        function (deletedkeys) {
                                            deletedKeys_1 = deletedkeys;
                                        }))
                                    ];
                                }
                                if (entry.addToCache && entry.addToCache.length > 0) {
                                    entry.addToCache.forEach((/**
                                     * @param {?} key
                                     * @return {?}
                                     */
                                    function (key) {
                                        ret.data.forEach((/**
                                         * @param {?} item
                                         * @return {?}
                                         */
                                        function (item) {
                                            if (item[key]) {
                                                filePromises_1.push((/**
                                                 * @return {?}
                                                 */
                                                function () { return cacheFile(item[key]); }));
                                            }
                                        }));
                                    }));
                                }
                                return Promise.all(filePromises_1).then((/**
                                 * @return {?}
                                 */
                                function () {
                                    return _this.cache.updateDatabaseCollection(entry.name, ret.data, '_id', deletedKeys_1);
                                }));
                            }
                        })));
                    }));
                });
            }));
            return this.promise.sequential(promises).then((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                if (progressEvent) {
                    progressEvent.emit(100);
                }
                return ret;
            }));
        }
        return Promise.resolve(null);
    };
    /**
     * @return {?}
     */
    Broker.prototype.clearDatabase = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            /** @type {?} */
            var promises = collections.map((/**
             * @param {?} entry
             * @return {?}
             */
            function (entry) {
                return (/**
                 * @return {?}
                 */
                function () { return _this.cache.clearDatabaseCollection(entry.name); });
            }));
            return this.promise.sequential(promises);
        }
        return Promise.resolve(null);
    };
    /**
     * @param {?} collectionName
     * @param {?} data
     * @return {?}
     */
    Broker.prototype.getDeletedEntities = /**
     * @param {?} collectionName
     * @param {?} data
     * @return {?}
     */
    function (collectionName, data) {
        data = data || [];
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getDeletedIds';
        /** @type {?} */
        var modelName = Models.fixCollectionName(collectionName, true);
        return this.rq.post(url, { modelName: modelName, ids: data.map((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e._id; })) }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal) {
                return retVal || [];
            }
            return [];
        })));
    };
    /**
     * @return {?}
     */
    Broker.prototype.getOfflineEntitiesCount = /**
     * @return {?}
     */
    function () {
        return this.uploadDatabaseOrGetCount(true);
    };
    /**
     * @param {?=} progressEmitter
     * @return {?}
     */
    Broker.prototype.uploadDatabase = /**
     * @param {?=} progressEmitter
     * @return {?}
     */
    function (progressEmitter) {
        return this.uploadDatabaseOrGetCount(false, progressEmitter);
    };
    /**
     * @param {?} returnCount
     * @param {?=} progressEmitter
     * @return {?}
     */
    Broker.prototype.uploadDatabaseOrGetCount = /**
     * @param {?} returnCount
     * @param {?=} progressEmitter
     * @return {?}
     */
    function (returnCount, progressEmitter) {
        var _this = this;
        /** @type {?} */
        var total = 0;
        /** @type {?} */
        var count = 0;
        /** @type {?} */
        var offlineData = {};
        if (!this.isUploadingDatabase || this.network.isOffline()) {
            this.isUploadingDatabase = true;
            /** @type {?} */
            var collections_1 = this.coreConfig.getSyncedCollections();
            return this.cache.getDatabaseCollection('custommodels').then((/**
             * @param {?} custommodels
             * @return {?}
             */
            function (custommodels) {
                if (collections_1 && collections_1.length > 0) {
                    collections_1 = cloneDeep(collections_1);
                    collections_1 = collections_1.concat(custommodels.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return ({ name: c.name }); })));
                    /** @type {?} */
                    var promisesCount = collections_1.map((/**
                     * @param {?} entry
                     * @return {?}
                     */
                    function (entry) {
                        return (/**
                         * @return {?}
                         */
                        function () {
                            return _this.cache.getDatabaseCollection(entry.name).then((/**
                             * @param {?} data
                             * @return {?}
                             */
                            function (data) {
                                data = data.filter((/**
                                 * @param {?} e
                                 * @return {?}
                                 */
                                function (e) { return _this.isOfflineEntity(e) && ((/** @type {?} */ (e))).status !== 'draft'; }));
                                offlineData[entry.name] = data;
                                total += data.length;
                            }));
                        });
                    }));
                    return _this.promise.sequential(promisesCount).then((/**
                     * @return {?}
                     */
                    function () {
                        if (returnCount) {
                            _this.isUploadingDatabase = false;
                            return total;
                        }
                        else {
                            _this.log.log('uploadDatabase', 'total', total);
                            if (progressEmitter) {
                                progressEmitter.emit(total > 0 ? (count / total) * 100 : 0);
                            }
                            /** @type {?} */
                            var promises_1 = [];
                            if (total > 0) {
                                collections_1.forEach((/**
                                 * @param {?} entry
                                 * @return {?}
                                 */
                                function (entry) {
                                    /** @type {?} */
                                    var data = offlineData[entry.name];
                                    data.forEach((/**
                                     * @param {?} entity
                                     * @return {?}
                                     */
                                    function (entity) {
                                        promises_1.push((/**
                                         * @return {?}
                                         */
                                        function () {
                                            /** @type {?} */
                                            var offlineId = entity._id;
                                            entity = __assign({}, entity);
                                            delete entity._id;
                                            return _this.upsert(entry.name, entity)
                                                .toPromise()
                                                .then((/**
                                             * @param {?} retVal
                                             * @return {?}
                                             */
                                            function (retVal) {
                                                count += 1;
                                                if (progressEmitter) {
                                                    progressEmitter.emit((count / total) * 100);
                                                }
                                                _this.log.log('uploadDatabase', 'count', count);
                                                return _this.cache.replaceFromDatabaseCollection(entry.name, offlineId, retVal);
                                            }));
                                        }));
                                    }));
                                }));
                            }
                            return _this.promise.sequential(promises_1).then((/**
                             * @return {?}
                             */
                            function () {
                                setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    if (progressEmitter) {
                                        progressEmitter.emit(100);
                                    }
                                }), 300);
                                _this.isUploadingDatabase = false;
                                return total;
                            }));
                        }
                    }));
                }
            }));
        }
        return Promise.resolve(returnCount ? 0 : null);
    };
    /**
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.isOfflineEntity = /**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        return entity && entity._id && this.isOfflineId(entity._id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    Broker.prototype.isOfflineId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return id && id.startsWith && id.startsWith(Cache.OFFLINE_PREFIX);
    };
    /**
     * @param {?} collectionName
     * @param {?} offlineOnly
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} customFilter
     * @param {?=} noCount
     * @return {?}
     */
    Broker.prototype.getAllOffline = /**
     * @param {?} collectionName
     * @param {?} offlineOnly
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} customFilter
     * @param {?=} noCount
     * @return {?}
     */
    function (collectionName, offlineOnly, search, filters, sorts, skip, limit, customFilter, noCount) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (customFilter === void 0) { customFilter = null; }
        if (noCount === void 0) { noCount = false; }
        return from(this.cache.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var model = Models.getModelByCollectionName(collectionName);
            if (offlineOnly) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.isOfflineEntity(d); }));
            }
            if (filters && filters.length > 0) {
                /** @type {?} */
                var newData_1 = [];
                filters.forEach((/**
                 * @param {?} fs
                 * @return {?}
                 */
                function (fs) {
                    /** @type {?} */
                    var subData = __spread(data);
                    fs.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.removeFromOffline !== true; })).forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        subData = subData.filter((/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) {
                            /** @type {?} */
                            var value = isArray(f.value) && isObject(f.value[0]) ? map$1(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
                            if (e && e[f.field] !== undefined && e[f.field] !== null) {
                                switch (f.operator._id) {
                                    case 'eq':
                                        return isEqual(e[f.field], value);
                                    case 'neq':
                                        return !isEqual(e[f.field], value);
                                    case 'inq':
                                        return intersection([].concat(e[f.field]), [].concat(value)).length > 0;
                                    case 'nin':
                                        return intersection([].concat(e[f.field]), [].concat(value)).length <= 0;
                                    case 'gt':
                                        return e[f.field] > value;
                                    case 'gte':
                                        return e[f.field] >= value;
                                    case 'lt':
                                        return e[f.field] < value;
                                    case 'lte':
                                        return e[f.field] <= value;
                                    case 'nearSphere':
                                        ((/** @type {?} */ (e))).distance = _this.geoloc.getDistance(e[f.field][1], e[f.field][0], value[1], value[0]);
                                        return ((/** @type {?} */ (e))).distance < f.max;
                                        break;
                                    case 'exists':
                                        return !isNullOrUndefined(e[f.field]);
                                        break;
                                }
                            }
                            else {
                                switch (f.operator._id) {
                                    case 'neq':
                                    case 'nin':
                                        return true;
                                    case 'inq':
                                        return value && value.indexOf(null) >= 0;
                                }
                            }
                        }));
                    }));
                    newData_1 = __spread(newData_1, subData);
                }));
                data = uniqBy(newData_1, (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e._id; }));
            }
            if (search && model && model.searchableFields) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    if (model.searchableFields.some((/**
                     * @param {?} name
                     * @return {?}
                     */
                    function (name) {
                        return d[name] &&
                            d[name]
                                .toString()
                                .toUpperCase()
                                .indexOf(search.toUpperCase()) >= 0;
                    }))) {
                        return true;
                    }
                    return false;
                }));
            }
            if (filters && filters.some((/**
             * @param {?} fs
             * @return {?}
             */
            function (fs) { return fs.some((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.operator._id === 'nearSphere'; })); }))) {
                data = orderBy(data, ['distance']);
            }
            if (sorts) {
                data = orderBy(data, sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.colId; })), sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.sort; })));
            }
            /** @type {?} */
            var total = data.length;
            if (limit > 0) {
                skip = skip || 0;
                data = data.slice(skip, skip + limit);
            }
            return noCount ? data : { count: total, data: data };
        })));
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @param {?=} aggregateOptionsOffline
     * @return {?}
     */
    Broker.prototype.aggregateQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @param {?=} aggregateOptionsOffline
     * @return {?}
     */
    function (collectionName, filters, aggregateOptions, search, excludedFields, includeCount, cacheId, customFilter, subQuery, aggregateOptionsOffline) {
        var _this = this;
        if (includeCount === void 0) { includeCount = false; }
        if (cacheId === void 0) { cacheId = null; }
        /** @type {?} */
        var obs;
        collectionName = Models.fixCollectionName(collectionName, true);
        if (this.network.isOffline()) {
            if (cacheId) {
                obs = from(this.localForage.get(cacheId));
            }
            else if (aggregateOptionsOffline) {
                obs = from(this.cache.getDatabaseCollection(collectionName).then((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    data = aggregateOptionsOffline(data);
                    if (includeCount) {
                        return { data: [{ count: data.length, data: data }] };
                    }
                    else {
                        return { data: data };
                    }
                })));
            }
            else {
                obs = of({ count: 0, data: [] });
            }
        }
        else if (collectionName === 'aggregateLogs') {
            return this.aggregateLogs(aggregateOptions);
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'businesslogic/aggregateQuery';
            /** @type {?} */
            var query = this.getAggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount, customFilter, subQuery);
            obs = this.rq.post(url, { params: query }).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                if (cacheId) {
                    _this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var data = [];
            if (retVal && retVal.data && retVal.data.length > 0) {
                if (includeCount) {
                    data = retVal.data[0];
                }
                else {
                    data = retVal.data;
                }
            }
            return data;
        })));
    };
    /**
     * @param {?} queries
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @return {?}
     */
    Broker.prototype.aggregateQueries = /**
     * @param {?} queries
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @return {?}
     */
    function (queries, includeCount, cacheId) {
        var _this = this;
        if (includeCount === void 0) { includeCount = false; }
        if (cacheId === void 0) { cacheId = null; }
        /** @type {?} */
        var obs;
        if (this.network.isOffline()) {
            if (cacheId) {
                obs = from(this.localForage.get(cacheId));
            }
            else {
                obs = of({ count: 0, data: [] });
            }
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'businesslogic/aggregateQueries';
            obs = this.rq.post(url, queries).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                /** @type {?} */
                var finalArray = Array(queries.length);
                for (var i = 0; i < finalArray.length; i++) {
                    finalArray[i] = [];
                }
                if (retVal && retVal.data && retVal.data.some((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return isObject(d.doc); }))) {
                    retVal.data.forEach((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        finalArray[d.index] = finalArray[d.index] || [];
                        finalArray[d.index].push(d.doc);
                    }));
                    retVal.data = finalArray;
                }
                else if (retVal && isArray(retVal.data) && retVal.data.length === 0) {
                    retVal.data = finalArray;
                }
                if (cacheId) {
                    _this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var data = [];
            if (retVal && retVal.data && retVal.data.length > 0) {
                if (includeCount) {
                    data = retVal.data[0];
                }
                else {
                    data = retVal.data;
                }
            }
            return data;
        })));
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    Broker.prototype.getAggregateQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    function (collectionName, filters, aggregateOptions, search, excludedFields, includeCount, customFilter, subQuery) {
        if (includeCount === void 0) { includeCount = false; }
        /** @type {?} */
        var match = {};
        /** @type {?} */
        var project = {};
        /** @type {?} */
        var filterWhere = null;
        /** @type {?} */
        var searchWhere = null;
        /** @type {?} */
        var defaultFields = [];
        /** @type {?} */
        var query = (/** @type {?} */ ({
            collectionName: Models.fixCollectionName(collectionName, true),
            includeCount: includeCount
        }));
        if (filters && filters.length > 0) {
            filterWhere = Models.exportWhere(collectionName, filters, excludedFields);
        }
        if (search) {
            searchWhere = Models.exportSearch(collectionName, search);
        }
        if (searchWhere && filterWhere) {
            query.where = { and: [searchWhere, filterWhere] };
        }
        else if (searchWhere) {
            query.where = searchWhere;
        }
        else if (filterWhere) {
            query.where = filterWhere;
        }
        if (customFilter && query.where) {
            query.where = { and: [query.where, customFilter] };
        }
        else if (customFilter) {
            query.where = customFilter;
        }
        query.where = query.where || {};
        if (defaultFields && defaultFields.length > 0) {
            defaultFields.forEach((/**
             * @param {?} field
             * @param {?} i
             * @return {?}
             */
            function (field, i) {
                project[field] = 1;
            }));
        }
        if (!isEmpty(project)) {
            aggregateOptions.unshift({ $project: project });
        }
        if (!isEmpty(match)) {
            aggregateOptions.unshift({ $match: match });
        }
        query.options = aggregateOptions;
        query.subQuery = Models.exportSubQuery(collectionName, filters, true);
        if (subQuery) {
            query.subQuery = subQuery;
        }
        return query;
    };
    /**
     * @param {?=} stages
     * @param {?=} groups
     * @param {?=} userIds
     * @return {?}
     */
    Broker.prototype.aggregateLogs = /**
     * @param {?=} stages
     * @param {?=} groups
     * @param {?=} userIds
     * @return {?}
     */
    function (stages, groups, userIds) {
        /** @type {?} */
        var url = this.config.apiUrl + 'AdminDashboard/aggregateLogs';
        return this.rq.post(url, { stages: stages, groups: groups, userIds: userIds });
    };
    /**
     * @param {?} query
     * @param {?} collectionName
     * @return {?}
     */
    Broker.prototype.textSearch = /**
     * @param {?} query
     * @param {?} collectionName
     * @return {?}
     */
    function (query, collectionName) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/textSearch';
        return this.rq.post(url, { query: query, modelName: collectionName });
    };
    /**
     * @param {?} file
     * @param {?} group
     * @param {?=} hideMobile
     * @param {?=} fileName
     * @param {?=} tenantRef
     * @return {?}
     */
    Broker.prototype.createFile = /**
     * @param {?} file
     * @param {?} group
     * @param {?=} hideMobile
     * @param {?=} fileName
     * @param {?=} tenantRef
     * @return {?}
     */
    function (file, group, hideMobile, fileName, tenantRef) {
        if (hideMobile === void 0) { hideMobile = true; }
        return this.upsert('files', {
            _downloadURL: file,
            _filename: file.name,
            group: group,
            hideMobile: hideMobile,
            mimeType: file.type,
            size: file.size,
            _tenantRef: tenantRef
        });
    };
    /**
     * @param {?=} fileTypes
     * @param {?=} maxFileSize
     * @return {?}
     */
    Broker.prototype.getFileUploader = /**
     * @param {?=} fileTypes
     * @param {?=} maxFileSize
     * @return {?}
     */
    function (fileTypes, maxFileSize) {
        /** @type {?} */
        var options = {
            maxFileSize: maxFileSize,
            url: this.config.uploadUrl
        };
        // if (fileTypes && fileTypes.length > 0) {
        //     options.allowedFileType = fileTypes;
        // }
        return new FileUploader(options);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    Broker.prototype.execute = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var url = this.config.apiUrl + 'Endpoints/execute';
        return this.rq.post(url, { params: params });
    };
    /**
     * @param {?} operationId
     * @return {?}
     */
    Broker.prototype.undoOperation = /**
     * @param {?} operationId
     * @return {?}
     */
    function (operationId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'operation/undoDelete';
        return this.rq.post(url, { operationId: operationId });
    };
    /**
     * @param {?} locations
     * @return {?}
     */
    Broker.prototype.getMarkers = /**
     * @param {?} locations
     * @return {?}
     */
    function (locations) {
        return locations
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l._geoloc && l._geoloc.length > 1; }))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) {
            return {
                _id: l._id,
                address: l.address,
                latitude: l._geoloc[1],
                longitude: l._geoloc[0],
                title: l.title,
                color: l.status === 'place' ? 'success' : l.status === 'file' ? 'info' : l.status === 'error' ? 'danger' : l.status === 'prediction' ? 'stable' : 'dark'
            };
        }));
    };
    /**
     * @param {?} id
     * @param {?} mode
     * @param {?=} customFilter
     * @return {?}
     */
    Broker.prototype.getUserOrLocationStat = /**
     * @param {?} id
     * @param {?} mode
     * @param {?=} customFilter
     * @return {?}
     */
    function (id, mode, customFilter) {
        /** @type {?} */
        var value = (/** @type {?} */ ((isString(id) ? [{ _id: id }] : id)));
        /** @type {?} */
        var ref = mode === 'campaign' ? 'descriptionRef' : mode === 'location' ? 'locationRef' : 'ownerRef';
        /** @type {?} */
        var filters = [[{ field: ref, operator: { _id: 'inq' }, value: value }]];
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$' + ref,
                    booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } },
                    finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } },
                    archived: { $cond: { if: { $eq: ['$status', 'archived'] }, then: 1, else: 0 } },
                    validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } },
                    rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } },
                    finishedDate: '$finishedDate'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    booked: { $sum: '$booked' },
                    finished: { $sum: '$finished' },
                    archived: { $sum: '$archived' },
                    validated: { $sum: '$validated' },
                    rejected: { $sum: '$rejected' },
                    latest: { $max: '$finishedDate' },
                    count: { $sum: 1 }
                }
            }
        ];
        return this.aggregateQuery('missions', filters, options, null, null, false, null, customFilter).pipe(map((/**
         * @param {?} stats
         * @return {?}
         */
        function (stats) {
            if (stats && stats.length > 0) {
                stats[0].available = (stats[0].count || 0) - (stats[0].finished || 0) - (stats[0].booked || 0) - (stats[0].archived || 0);
                stats[0].tobevalidated = (stats[0].finished || 0) - (stats[0].validated || 0) - (stats[0].rejected || 0);
            }
            return stats;
        })));
    };
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    Broker.prototype.setTimescale = /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    function (filters, timescale, dateField, endDate, previous) {
        if (dateField === void 0) { dateField = 'finishedDate'; }
        if (previous === void 0) { previous = false; }
        if (timescale) {
            filters = filters || [];
            filters.forEach((/**
             * @param {?} fs
             * @return {?}
             */
            function (fs) {
                fs = fs || [];
                remove(fs, (/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.field === dateField; }));
                fs.push({
                    field: dateField,
                    operator: { _id: 'between', interval: true },
                    value: getStartAndEndDates(timescale, endDate, undefined, undefined, previous)
                });
            }));
        }
    };
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    Broker.prototype._hasFiles = /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    function (entity, suffixs) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        /** @type {?} */
        var retVal = false;
        var _loop_1 = function (prop) {
            if (entity.hasOwnProperty(prop) && this_1.files.isImageFile(entity[prop])) {
                retVal = true;
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            function (suffix) {
                if (suffix) {
                    /** @type {?} */
                    var object = get(entity, prop + suffix);
                    if (isArray(object)) {
                        // for multiphoto field, value is an array;
                        /** @type {?} */
                        var extraDataSuffix = '.extraData';
                        /** @type {?} */
                        var extraData_1 = get(entity, prop + extraDataSuffix);
                        object.forEach((/**
                         * @param {?} v
                         * @param {?} index
                         * @return {?}
                         */
                        function (v, index) {
                            if (_this.files.isImageFile(v)) {
                                retVal = true;
                            }
                            if (extraData_1 && extraData_1[index] && extraData_1[index].edit) {
                                if (_this.files.isImageFile(extraData_1[index].edit)) {
                                    retVal = true;
                                }
                            }
                        }));
                    }
                    else {
                        if (_this.files.isImageFile(get(entity, prop + suffix))) {
                            retVal = true;
                        }
                    }
                }
            }));
        };
        var this_1 = this;
        for (var prop in entity) {
            _loop_1(prop);
        }
        return retVal;
    };
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    Broker.prototype._getFileProperties = /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    function (entity, suffixs) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        /** @type {?} */
        var retVal = [];
        var _loop_2 = function (prop) {
            if (entity.hasOwnProperty(prop) && this_2.files.isImageFile(entity[prop])) {
                retVal.push(prop);
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            function (suffix) {
                if (suffix) {
                    /** @type {?} */
                    var objectPath_1 = get(entity, prop + suffix);
                    // for multiphoto field, value is an array; and for todo with linked multi photo we need to do it to
                    if (isArray(objectPath_1)) {
                        /** @type {?} */
                        var extraDataSuffixs = ['.extraData', '.value.fieldExtra'];
                        extraDataSuffixs.forEach((/**
                         * @param {?} extraDataSuffix
                         * @return {?}
                         */
                        function (extraDataSuffix) {
                            /** @type {?} */
                            var extraData = get(entity, prop + extraDataSuffix);
                            objectPath_1.forEach((/**
                             * @param {?} v
                             * @param {?} index
                             * @return {?}
                             */
                            function (v, index) {
                                if (_this.files.isImageFile(v)) {
                                    retVal.push(prop + suffix + '[' + index + ']');
                                }
                                if (extraData && extraData[index] && extraData[index].edit) {
                                    if (_this.files.isImageFile(extraData[index].edit)) {
                                        retVal.push(prop + extraDataSuffix + '[' + index + ']' + '.edit');
                                    }
                                }
                            }));
                        }));
                    }
                    else {
                        if (_this.files.isImageFile(objectPath_1)) {
                            retVal.push(prop + suffix);
                        }
                    }
                }
            }));
        };
        var this_2 = this;
        for (var prop in entity) {
            _loop_2(prop);
        }
        retVal = uniq(retVal);
        return retVal;
    };
    Broker.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Broker.ctorParameters = function () { return [
        { type: Requestor },
        { type: Box },
        { type: Googlemaps },
        { type: Workplace },
        { type: Session },
        { type: Files },
        { type: PromiseService },
        { type: CoreConfig },
        { type: Log },
        { type: Network },
        { type: FileTransfer },
        { type: LocalForageService },
        { type: Config },
        { type: Injector },
        { type: Cache },
        { type: Smartloc },
        { type: Translate },
        { type: Unsplash }
    ]; };
    return Broker;
}());
/**
 * @param {?} timescale
 * @param {?=} endDate
 * @param {?=} amount
 * @param {?=} notsliding
 * @param {?=} previous
 * @return {?}
 */
function getStartAndEndDates(timescale, endDate, amount, notsliding, previous) {
    if (previous === void 0) { previous = false; }
    /** @type {?} */
    var lastDate = endDate || new Date();
    amount = amount || 7;
    /** @type {?} */
    var period = 'days';
    /** @type {?} */
    var startof = 'day';
    switch (timescale) {
        case 'last30days':
            amount = 30;
            period = 'days';
            break;
        case 'last90days':
            amount = 90;
            period = 'days';
            break;
        case 'last365days':
            amount = 365;
            period = 'days';
            break;
        case 'lastweek':
            amount = 0;
            period = 'weeks';
            break;
        case 'lastmonth':
            amount = 0;
            period = 'months';
            startof = 'month';
            break;
        case 'lastquarter':
            amount = 2;
            period = 'months';
            startof = 'month';
            break;
        case 'lastyear':
            amount = 0;
            period = 'years';
            startof = 'year';
            break;
        case 'last7days':
            amount = 7;
            period = 'days';
            startof = 'day';
            break;
        default:
            if (notsliding) {
                amount = amount ? amount - 1 : 0;
                period = timescale;
                startof = timescale;
            }
            else {
                amount = amount || 1;
                period = timescale;
                startof = 'day';
            }
            break;
    }
    /** @type {?} */
    var dateFrom = startOf(dateAdd(utc(toDate(lastDate)), period, -amount), startof);
    /** @type {?} */
    var dateTo = toDate(lastDate);
    if (previous) {
        dateFrom = dateAdd(dateFrom, period, -amount);
        dateTo = dateAdd(dateTo, period, -amount);
    }
    //use .utc() to get the startOf with no offset issues
    return [dateFrom.toISOString(), dateTo.toISOString()];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} className
 * @param {?} config
 * @return {?}
 */
function Editable(className, config) {
    return (/**
     * @param {?} target
     * @param {?=} decoratedPropertyName
     * @return {?}
     */
    function decoratorFactory(target, decoratedPropertyName) {
        config.name = config.name || decoratedPropertyName;
        config.filterName = config.filterName || config.name;
        if (!config.title) {
            config.title = config.name.toUpperCase();
        }
        if (config.collectionName && !config.tag && config.name !== '_acl.groups.r' && config.collectionName !== 'groups') {
            config.filterName += 'Ref';
        }
        if (Models) {
            Models.addFormField(className, config);
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} className
 * @return {?}
 */
function Searchable(className) {
    return (/**
     * @param {?} target
     * @param {?} decoratedPropertyName
     * @return {?}
     */
    function decoratorFactory(target, decoratedPropertyName) {
        if (Models) {
            Models.addSearchableField(className, decoratedPropertyName);
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} config
 * @return {?}
 */
function Model(config) {
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (Models) {
            Models.setCollectionName(config.className, config.collectionName, config.fields, config.include, config.searchSubquery, config.feathersService, target, null, config.detailComponent, config.icon);
        }
    });
}
/**
 * @param {?} config
 * @return {?}
 */
function ModelExtended(config) {
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        Models.addBaseModel(config.extendedClass, config.baseClass, target);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var conditions = {
    isNotField: 'type!="field"',
    isField: 'type=="field"',
    isTag: 'type=="tags"',
    isGroup: 'type=="groups"',
    isSelect: 'field.type=="selectmulti" or field.type=="selectbuttonsmulti"',
    isToggle: 'field.type=="checkbox" or field.type=="toggle"',
    isAutocomplete: 'field.type=="select" or field.type=="selectbuttons" or field.type=="autocomplete"',
    isFieldSimple: 'type=="field" and (field.type=="text" or field.type=="email" or field.type=="number" or field.type=="formula" or field.type=="date" or field.type=="tel" or field.type=="time" or field.type=="range" or field.type=="starrating")',
    isFieldWithValues: 'type=="field" and (field.type=="checkbox" or field.type=="toggle" or field.type=="select" or field.type=="selectmulti" or field.type=="selectbuttons" or field.type=="selectbuttonsmulti" or field.type=="autocomplete" or field.type=="selectimage")'
};
/**
 * @param {?} res
 * @return {?}
 */
function getGroupsTransform(res) {
    if (res.data && res.data.filter) {
        res.data = res.data.filter((/**
         * @param {?} g
         * @return {?}
         */
        function (g) { return ROLES.indexOf(g._id) < 0 && g.isRole !== true; }));
    }
    return res;
}
/**
 * @param {?} m
 * @return {?}
 */
function isNotInformationField(m) {
    return m.type !== FormFieldType.information;
}
/**
 * @return {?}
 */
function getFormFieldValues() {
    return map$1(MOBILE_FORM_FIELDS_ALL.filter(isNotInformationField), 'type');
}
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Condition', { type: FormFieldType.text, required: true }),
        __metadata("design:type", String)
    ], Condition.prototype, "title", void 0);
    __decorate([
        Editable('Condition', {
            type: FormFieldType.autocomplete,
            translate: true,
            values: CONDITION_TYPES,
            required: true
        }),
        __metadata("design:type", String)
    ], Condition.prototype, "type", void 0);
    __decorate([
        Editable('Condition', {
            type: FormFieldType.autocomplete,
            condition: conditions.isField,
            required: true,
            idAttributeName: 'name'
        }),
        __metadata("design:type", Object)
    ], Condition.prototype, "field", void 0);
    __decorate([
        Editable('Condition', {
            type: FormFieldType.autocomplete,
            required: true,
            multiple: false,
            translate: true,
            condition: 'type',
            conditionalValues: [{ condition: conditions.isNotField, values: ['in', 'notin'] }, { condition: conditions.isSelect, values: ['in', 'notin'] }, { condition: conditions.isToggle, values: ['equals', 'notequals'] }, { condition: conditions.isAutocomplete, values: ['equals', 'in', 'notin'] }],
            defaultValues: ['equals', 'notequals', 'greaterthan', 'lessthan']
        }),
        __metadata("design:type", String)
    ], Condition.prototype, "operator", void 0);
    __decorate([
        Editable('Condition', {
            type: FormFieldType.autocomplete,
            condition: conditions.isTag,
            tag: true,
            multiple: true,
            collectionName: 'locations',
            required: true
        }),
        __metadata("design:type", Array)
    ], Condition.prototype, "tags", void 0);
    __decorate([
        Editable('Condition', {
            title: 'GROUPS',
            required: true,
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            condition: conditions.isGroup,
            multiple: true,
            clearable: false
        }),
        __metadata("design:type", Array)
    ], Condition.prototype, "group", void 0);
    __decorate([
        Editable('Condition', {
            type: FormFieldType.autocomplete,
            required: true,
            condition: conditions.isFieldWithValues,
            dynamicValues: 'field.values',
            defaultValues: ['true', 'false'],
            multiple: true
        }),
        __metadata("design:type", Array)
    ], Condition.prototype, "values", void 0);
    __decorate([
        Editable('Condition', {
            dynamicType: 'field.type',
            defaultType: FormFieldType.text,
            required: true,
            condition: conditions.isFieldSimple
        }),
        __metadata("design:type", Object)
    ], Condition.prototype, "value", void 0);
    Condition = __decorate([
        Model({ className: 'Condition' })
    ], Condition);
    return Condition;
}(ICondition));
var ConditionalField = /** @class */ (function (_super) {
    __extends(ConditionalField, _super);
    function ConditionalField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('ConditionalField', { type: FormFieldType.text, readonly: true, title: 'FIELDIF' }),
        __metadata("design:type", String)
    ], ConditionalField.prototype, "fieldTitle", void 0);
    __decorate([
        Editable('ConditionalField', {
            type: FormFieldType.autocomplete,
            required: true,
            multiple: false,
            translate: true,
            title: 'FIELDIS',
            conditionalValues: [{ condition: conditions.isNotField, values: ['in', 'notin'] }, { condition: conditions.isSelect, values: ['in', 'notin'] }, { condition: conditions.isToggle, values: ['equals', 'notequals'] }, { condition: conditions.isAutocomplete, values: ['equals', 'in', 'notin'] }],
            defaultValues: ['equals', 'notequals', 'greaterthan', 'lessthan']
        }),
        __metadata("design:type", String)
    ], ConditionalField.prototype, "operator", void 0);
    __decorate([
        Editable('ConditionalField', {
            type: FormFieldType.autocomplete,
            required: true,
            condition: conditions.isFieldWithValues,
            dynamicValues: 'field.values',
            defaultValues: ['true', 'false'],
            multiple: true
        }),
        __metadata("design:type", Array)
    ], ConditionalField.prototype, "values", void 0);
    __decorate([
        Editable('ConditionalField', {
            dynamicType: 'field.type',
            defaultType: FormFieldType.text,
            required: true,
            condition: conditions.isFieldSimple
        }),
        __metadata("design:type", Object)
    ], ConditionalField.prototype, "value", void 0);
    __decorate([
        Editable('ConditionalField', {
            type: FormFieldType.autocomplete,
            required: true,
            title: 'FIELDTYPE',
            values: getFormFieldValues(),
            translate: true
        }),
        __metadata("design:type", String)
    ], ConditionalField.prototype, "newFieldType", void 0);
    __decorate([
        Editable('ConditionalField', { type: FormFieldType.text, required: true, title: 'TITLE' }),
        __metadata("design:type", String)
    ], ConditionalField.prototype, "newfieldTitle", void 0);
    __decorate([
        Editable('ConditionalField', { title: 'INSTRUCTIONS', type: FormFieldType.textarea }),
        __metadata("design:type", String)
    ], ConditionalField.prototype, "newfieldDescription", void 0);
    __decorate([
        Editable('ConditionalField', { title: 'MANDATORY', type: FormFieldType.checkbox }),
        __metadata("design:type", Boolean)
    ], ConditionalField.prototype, "newFieldRequired", void 0);
    ConditionalField = __decorate([
        Model({ className: 'ConditionalField' })
    ], ConditionalField);
    return ConditionalField;
}(IConditionalField));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var ADMIN_FILES_TYPE = ['locations', 'user', 'geofilters', 'campaignfilters', 'products', 'locationtypes'];
/** @type {?} */
var FORMCREATOR_FILES_TYPE = ['pages'];
/** @type {?} */
var FORM_FILES_IMAGE_MIME = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp'];
/** @type {?} */
var FORM_FILES_IMAGE_FILTER = [[{ field: 'mimeType', operator: { _id: 'inq' }, value: FORM_FILES_IMAGE_MIME }]];
/** @type {?} */
var FORM_FILES_GROUP_FILTER = [[{ field: 'mimeType', operator: { _id: 'inq' }, value: FORM_FILES_IMAGE_MIME }, { field: 'tags', operator: { _id: 'inq' }, value: ['group'] }]];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Tenant = /** @class */ (function (_super) {
    __extends(Tenant, _super);
    function Tenant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Tenant', { required: true, type: FormFieldType.text }),
        Searchable('Tenant'),
        __metadata("design:type", String)
    ], Tenant.prototype, "name", void 0);
    __decorate([
        Editable('Tenant', { required: false, type: FormFieldType.text }),
        Searchable('Tenant'),
        __metadata("design:type", String)
    ], Tenant.prototype, "title", void 0);
    __decorate([
        Editable('Tenant', { required: false, type: FormFieldType.textarea }),
        Searchable('Tenant'),
        __metadata("design:type", String)
    ], Tenant.prototype, "description", void 0);
    __decorate([
        Editable('Tenant', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            clearable: true,
            fixedPosition: true,
            maxWidth: 160,
            maxHeight: 160,
            crop: 'circle',
            collectionName: 'files',
            title: 'ICON',
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Object)
    ], Tenant.prototype, "icon", void 0);
    __decorate([
        Editable('Tenant', { type: FormFieldType.toggle }),
        __metadata("design:type", Boolean)
    ], Tenant.prototype, "ssoOnly", void 0);
    __decorate([
        Editable('Tenant', { type: FormFieldType.toggle }),
        __metadata("design:type", Boolean)
    ], Tenant.prototype, "protected", void 0);
    __decorate([
        Editable('Tenant', {
            type: FormFieldType.json,
            filterable: false,
            sortable: false,
            suppressExport: true
        }),
        __metadata("design:type", Array)
    ], Tenant.prototype, "locationKpis", void 0);
    Tenant = __decorate([
        Model({
            className: 'Tenant',
            collectionName: 'tenants',
            fields: ['*'],
            include: [],
            icon: 'yo-company'
        })
    ], Tenant);
    return Tenant;
}(ITenant));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocationType = /** @class */ (function (_super) {
    __extends(LocationType, _super);
    function LocationType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('LocationType', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 1
        }),
        __metadata("design:type", String)
    ], LocationType.prototype, "_id", void 0);
    __decorate([
        Editable('LocationType', { type: FormFieldType.text, required: true, exportOrder: 2 }),
        Searchable('LocationType'),
        __metadata("design:type", String)
    ], LocationType.prototype, "name", void 0);
    __decorate([
        Editable('LocationType', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            allowCustomTag: true,
            collectionName: 'groups',
            multiple: true,
            clearable: false,
            required: true,
            idOnly: true,
            filters: [[{ field: 'type', operator: { _id: 'nin' }, value: ['plan'] }, { field: 'isRole', operator: { _id: 'neq' }, value: true }]],
            hiddenFields: ['isRole', 'type'],
            mapTransform: getGroupsTransform
        }),
        __metadata("design:type", Array)
    ], LocationType.prototype, "group", void 0);
    __decorate([
        Editable('LocationType', {
            type: FormFieldType.number,
            readonly: true,
            visible: false,
            forceExport: true,
            exportOrder: 4
        }),
        __metadata("design:type", Number)
    ], LocationType.prototype, "count", void 0);
    __decorate([
        Editable('LocationType', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        __metadata("design:type", Tenant)
    ], LocationType.prototype, "_tenant", void 0);
    LocationType = __decorate([
        Model({
            className: 'LocationType',
            collectionName: 'locationtypes',
            fields: ['*'],
            include: ['_tenant'],
            icon: 'yo-categories'
        })
    ], LocationType);
    return LocationType;
}(ILocationType));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} className
 * @param {?} config
 * @return {?}
 */
function Mapping(className, config) {
    return (/**
     * @param {?} target
     * @param {?} decoratedPropertyName
     * @return {?}
     */
    function decoratorFactory(target, decoratedPropertyName) {
        if (Models) {
            Models.addMappingField(className, decoratedPropertyName, config.order);
        }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LOCATION_GEOCODESTATUS = ['file', 'geocoder', 'place', 'prediction', 'error'];
/**
 * @param {?} value
 * @param {?} data
 * @param {?} field
 * @return {?}
 */
function onAddressChange(value, data, field) {
    if (value && value._geoloc) {
        data._geoloc = value._geoloc;
        ((/** @type {?} */ (field)))._geoloc = value._geoloc;
        data.address = value.address;
    }
}
/**
 * @param {?} value
 * @param {?} data
 * @return {?}
 */
function onTypeChange(value, data) {
    if (value && value._id) {
        data.typeRef = value._id;
    }
}
var Location = /** @class */ (function () {
    function Location() {
    }
    __decorate([
        Mapping('Location', { order: 12 }),
        Editable('Location', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 13,
            filterable: false
        }),
        __metadata("design:type", String)
    ], Location.prototype, "_id", void 0);
    __decorate([
        Mapping('Location', { order: 11 }),
        Editable('Location', {
            type: FormFieldType.text,
            columnDefinition: { width: 100 },
            exportOrder: 12
        }),
        Searchable('Location'),
        __metadata("design:type", String)
    ], Location.prototype, "clientid", void 0);
    __decorate([
        Mapping('Location', { order: 0 }),
        Editable('Location', {
            required: true,
            type: FormFieldType.text,
            exportOrder: 1,
            sortable: true
        }),
        Searchable('Location'),
        __metadata("design:type", String)
    ], Location.prototype, "title", void 0);
    __decorate([
        Mapping('Location', { order: 1 }),
        Editable('Location', {
            required: true,
            type: FormFieldType.address,
            filterName: '_geoloc',
            columnDefinition: { width: 350 },
            showMap: true,
            exportOrder: 2,
            onChange: onAddressChange
        }),
        Searchable('Location'),
        __metadata("design:type", String)
    ], Location.prototype, "address", void 0);
    __decorate([
        Mapping('Location', { order: 15 }),
        Editable('Location', {
            type: FormFieldType.photo,
            filterable: false,
            title: 'PHOTO',
            columnDefinition: { width: 52 },
            exportOrder: 16,
            sortable: false,
            allowLibrary: true
        }),
        __metadata("design:type", String)
    ], Location.prototype, "imageData", void 0);
    __decorate([
        Mapping('Location', { order: 13 }),
        Editable('Location', {
            type: FormFieldType.checkbox,
            columnDefinition: { width: 40 },
            exportOrder: 14,
            filterable: true
        }),
        __metadata("design:type", Boolean)
    ], Location.prototype, "vip", void 0);
    __decorate([
        Mapping('Location', { order: 9 }),
        Editable('Location', {
            title: 'LOCATIONTAGS',
            type: FormFieldType.autocomplete,
            tag: true,
            collectionName: 'locations',
            multiple: true,
            subQuery: { field: 'locationRef', values: '_id' },
            icon: 'yo-tag',
            exportOrder: 10
        }),
        __metadata("design:type", Array)
    ], Location.prototype, "tags", void 0);
    __decorate([
        Mapping('Location', { order: 2 }),
        Editable('Location', {
            type: FormFieldType.autocomplete,
            collectionName: 'locationtypes',
            required: true,
            columnDefinition: { name: 'name' },
            exportOrder: 3,
            filterableAdvanced: true,
            onChange: onTypeChange,
            filterable: true
        }),
        __metadata("design:type", LocationType)
    ], Location.prototype, "type", void 0);
    __decorate([
        Mapping('Location', { order: 14 }),
        Editable('Location', {
            type: FormFieldType.autocomplete,
            collectionName: 'missiondescriptions',
            clearable: true,
            multiple: true,
            filterable: false,
            sortable: false,
            suppressExport: true,
            filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
            hiddenFields: ['archived']
        }),
        __metadata("design:type", Object)
    ], Location.prototype, "missiondescriptions", void 0);
    __decorate([
        Mapping('Location', { order: 10 }),
        Editable('Location', {
            title: 'NOTIFICATIONEMAILS',
            type: FormFieldType.emailreport,
            showUsers: true,
            stateful: false,
            tab: 'INFORMATION',
            exportOrder: 11,
            filterableAdvanced: true
        }),
        __metadata("design:type", Array)
    ], Location.prototype, "notificationemail", void 0);
    __decorate([
        Mapping('Location', { order: 5 }),
        Editable('Location', {
            type: FormFieldType.text,
            tab: 'INFORMATION',
            exportOrder: 6,
            filterableAdvanced: true
        }),
        Searchable('Location'),
        __metadata("design:type", String)
    ], Location.prototype, "contactname", void 0);
    __decorate([
        Mapping('Location', { order: 6 }),
        Editable('Location', {
            type: FormFieldType.email,
            tab: 'INFORMATION',
            exportOrder: 7,
            filterableAdvanced: true
        }),
        __metadata("design:type", String)
    ], Location.prototype, "contactemail", void 0);
    __decorate([
        Mapping('Location', { order: 7 }),
        Editable('Location', {
            type: FormFieldType.text,
            tab: 'INFORMATION',
            exportOrder: 8,
            filterableAdvanced: true
        }),
        __metadata("design:type", String)
    ], Location.prototype, "contactphone", void 0);
    __decorate([
        Mapping('Location', { order: 8 }),
        Editable('Location', {
            type: FormFieldType.textarea,
            tab: 'INFORMATION',
            exportOrder: 9,
            filterableAdvanced: true
        }),
        __metadata("design:type", String)
    ], Location.prototype, "info", void 0);
    __decorate([
        Editable('Location', {
            readonly: true,
            type: FormFieldType.autocomplete,
            values: LOCATION_GEOCODESTATUS,
            clearable: false,
            filterableAdvanced: true,
            suppressExport: true
        }),
        __metadata("design:type", String)
    ], Location.prototype, "status", void 0);
    __decorate([
        Mapping('Location', { order: 4 }),
        Editable('Location', {
            visible: false,
            exportOrder: 5,
            forceExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", String)
    ], Location.prototype, "placesearch", void 0);
    __decorate([
        Mapping('Location', { order: 3 }),
        Editable('Location', {
            visible: false,
            forceExport: true,
            exportOrder: 4,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Array)
    ], Location.prototype, "_geoloc", void 0);
    __decorate([
        Editable('Location', {
            type: FormFieldType.autocomplete,
            tab: 'PROPERTIES',
            allowCustomTag: true,
            multiple: true,
            filterable: false,
            sortable: false,
            suppressExport: true,
            condition: ROLES_CONDITIONS.hasProductBatch
        }),
        __metadata("design:type", Array)
    ], Location.prototype, "aisles", void 0);
    __decorate([
        Editable('Location', {
            type: FormFieldType.text,
            tab: 'PROPERTIES',
            condition: ROLES_CONDITIONS.hasProductBatch
        }),
        __metadata("design:type", String)
    ], Location.prototype, "smartTagId", void 0);
    __decorate([
        Editable('Location', {
            type: FormFieldType.json,
            tab: 'PROPERTIES',
            filterable: false,
            sortable: false,
            suppressExport: true,
            condition: ROLES_CONDITIONS.isAdmin
        }),
        __metadata("design:type", Array)
    ], Location.prototype, "properties", void 0);
    __decorate([
        Editable('Location', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        __metadata("design:type", Tenant)
    ], Location.prototype, "_tenant", void 0);
    __decorate([
        Editable('Location', {
            visible: false,
            type: FormFieldType.toggle,
            filterable: false,
            invertedSort: true
        }),
        __metadata("design:type", Boolean)
    ], Location.prototype, "hasAvailableMissions", void 0);
    __decorate([
        Editable('Location', {
            visible: false,
            type: FormFieldType.number,
            filterable: false,
            invertedSort: true
        }),
        __metadata("design:type", Number)
    ], Location.prototype, "availableMissions", void 0);
    Location = __decorate([
        Model({
            className: 'Location',
            collectionName: 'locations',
            fields: ['*', 'type.name'],
            include: ['type', '_tenant'],
            icon: 'yo-store'
        })
    ], Location);
    return Location;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var conditions$1 = {
    isCreate: 'not getAttributeValue("_ect")',
    isUpdate: 'getAttributeValue("_ect")',
    isNotUpdateMultiple: 'not (getAttributeValue("_id") == "multiple")',
    //isTeam: ' isTeam == 1',
    //isNotTeam: ' not (isTeam == 1)',
    isNotSarahMartin: 'not (username == "smartin@yoobic.com")',
    isNotYoobicAdmin: 'not (endsWith(getAttributeValue("username"),"@yoobic.com") == 1 and length("_acl.groups.r") == 0)'
};
/**
 * @param {?} value
 * @param {?} data
 * @return {?}
 */
function onUserLocationChange(value, data) {
    if (!value) {
        data.locationRef = null;
    }
}
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} user
     * @return {?}
     */
    User.getDisplayName = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        if (user) {
            /** @type {?} */
            var displayName = user.username;
            if (user.firstName && user.lastName) {
                displayName = startCase(user.firstName.toString().toLowerCase()) + ' ' + startCase(user.lastName.toString().toLowerCase());
            }
            else if (user.first_name && user.last_name) {
                displayName = startCase(user.first_name.toString().toLowerCase()) + ' ' + startCase(user.last_name.toString().toLowerCase());
            }
            else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.name) {
                displayName = user._socialIdentity.facebook.name;
            }
            else if (user.email) {
                displayName = user.email;
            }
            else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.email) {
                displayName = user._socialIdentity.facebook.email;
            }
            return displayName;
        }
        return '';
    };
    /**
     * @return {?}
     */
    User.getSimpleFields = /**
     * @return {?}
     */
    function () {
        return ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
    };
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 11
        }),
        __metadata("design:type", String)
    ], User.prototype, "_id", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.photo,
            filterable: false,
            title: 'PHOTO',
            columnDefinition: { width: 52 },
            exportOrder: 10,
            sortable: false,
            allowLibrary: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "imageData", void 0);
    __decorate([
        Editable('User', {
            required: true,
            flex: 100,
            type: FormFieldType.email,
            sortable: true,
            disableAutocomplete: true,
            condition: conditions$1.isNotUpdateMultiple,
            readonly: conditions$1.isUpdate,
            exportOrder: 1
        }),
        Searchable('User'),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        Editable('User', {
            required: false,
            flex: 100,
            type: FormFieldType.email,
            disableAutocomplete: true,
            exportOrder: 6
        }),
        Searchable('User'),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        Editable('User', {
            required: true,
            type: FormFieldType.password,
            secondary: true,
            icon: 'yo-password',
            disableAutocomplete: true,
            condition: ROLES_CONDITIONS.isAdminOrClientAdmin,
            filterable: false,
            sortable: false,
            exportOrder: 2
        }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        Editable('User', {
            required: true,
            flex: 100,
            type: FormFieldType.text,
            sortable: true,
            exportOrder: 4
        }),
        Searchable('User'),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        Editable('User', {
            flex: 100,
            required: true,
            type: FormFieldType.text,
            sortable: true,
            exportOrder: 5
        }),
        Searchable('User'),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        Editable('User', {
            required: true,
            filterable: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        __metadata("design:type", Tenant)
    ], User.prototype, "_tenant", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.toggle,
            flex: 100,
            title: 'TEAM',
            exportOrder: 12,
            condition: [conditions$1.isCreate, ROLES_CONDITIONS.isAdmin],
            filterableAdvanced: true
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isTeam", void 0);
    __decorate([
        Editable('User', {
            title: 'USERTAGS',
            type: FormFieldType.autocomplete,
            tag: true,
            collectionName: 'user',
            readonly: ROLES_CONDITIONS.isNeitherAdminNorClientAdmin,
            multiple: true,
            icon: 'yo-flag',
            subQuery: { field: 'ownerRef', values: '_id' },
            exportOrder: 13
        }),
        __metadata("design:type", Array)
    ], User.prototype, "tags", void 0);
    __decorate([
        Editable('User', {
            flex: 100,
            required: true,
            filterable: true,
            readonly: ROLES_CONDITIONS.isNeitherAdminNorClientAdmin,
            type: FormFieldType.autocomplete,
            exportOrder: 15,
            values: IRoles,
            translate: true,
            filterableAdvanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        Editable('User', {
            flex: 50,
            type: FormFieldType.tel,
            exportOrder: 7,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "telephone", void 0);
    __decorate([
        Editable('User', {
            flex: 50,
            type: FormFieldType.text,
            exportOrder: 8,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "company", void 0);
    __decorate([
        Editable('User', {
            flex: 50,
            type: FormFieldType.date,
            suppressExport: true,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "dateOfBirth", void 0);
    __decorate([
        Editable('User', {
            flex: 50,
            type: FormFieldType.autocomplete,
            values: ['MALE', 'FEMALE'],
            translate: true,
            suppressExport: true,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "gender", void 0);
    __decorate([
        Editable('User', { type: FormFieldType.address, exportOrder: 9, advanced: true }),
        __metadata("design:type", Object)
    ], User.prototype, "address", void 0);
    __decorate([
        Editable('User', {
            title: 'LOCATION',
            filterable: true,
            type: FormFieldType.autocomplete,
            onChange: onUserLocationChange,
            collectionName: 'locations',
            deleteOnHidden: false,
            readonly: ROLES_CONDITIONS.isNotManager,
            suppressExport: true,
            clearable: true
        }) //, conditions.isNotYoobicAdmin
        ,
        __metadata("design:type", Location)
    ], User.prototype, "location", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 14,
            filterable: false
        }),
        __metadata("design:type", String)
    ], User.prototype, "locationRef", void 0);
    __decorate([
        Editable('User', {
            required: true,
            name: '_acl.groups.r',
            columnDefinition: { name: '_acl?.groups?.r', forceName: true },
            title: 'GROUPS',
            condition: (/** @type {?} */ ([ROLES_CONDITIONS.isAdminOrClientAdmin, (/** @type {?} */ (conditions$1.isNotSarahMartin)), conditions$1.isNotYoobicAdmin])),
            type: FormFieldType.autocomplete,
            allowCustomTag: true,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            multiple: true,
            clearable: false,
            exportOrder: 3,
            deleteOnHidden: false,
            mapTransform: getGroupsTransform
        }),
        __metadata("design:type", Object)
    ], User.prototype, "_aclGroupsR", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.date,
            name: '_lmt',
            title: 'LASTSEEN',
            sortable: true,
            filterable: true,
            readonly: true,
            suppressExport: true,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", Object)
    ], User.prototype, "lastSeen", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: false,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", Object)
    ], User.prototype, "version", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: false,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", Object)
    ], User.prototype, "mobileVersion", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: true,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", Object)
    ], User.prototype, "platform", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: true,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "language", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: true,
            filterable: false,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "device", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: true,
            filterable: false,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "uuid", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.text,
            readonly: true,
            suppressExport: true,
            filterable: false,
            advanced: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "target", void 0);
    __decorate([
        Editable('User', {
            title: 'MAXWIDTH',
            type: FormFieldType.number,
            condition: ROLES_CONDITIONS.isAdmin,
            suppressExport: true,
            filterable: false
        }),
        __metadata("design:type", Number)
    ], User.prototype, "photoMaxWidth", void 0);
    __decorate([
        Editable('User', {
            title: 'SSO',
            type: FormFieldType.toggle,
            condition: ROLES_CONDITIONS.isAdmin,
            exportOrder: 18
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "sso", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.toggle,
            condition: ROLES_CONDITIONS.isAdmin,
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "disableTracking", void 0);
    __decorate([
        Editable('User', {
            type: FormFieldType.toggle,
            condition: ROLES_CONDITIONS.isAdmin,
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "disableDatabaseSync", void 0);
    User = __decorate([
        Model({
            className: 'User',
            collectionName: 'user',
            fields: ['*'],
            include: ['location', '_tenant'],
            icon: 'yo-user'
        })
    ], User);
    return User;
}(IUser));
var UserSettings = /** @class */ (function (_super) {
    __extends(UserSettings, _super);
    function UserSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('UserSettings', {
            type: FormFieldType.toggle,
            header: 'NOTIFICATIONS',
            flex: 100,
            title: 'DISABLEALLEMAILS',
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], UserSettings.prototype, "disableEmailNotifications", void 0);
    __decorate([
        Editable('UserSettings', {
            type: FormFieldType.toggle,
            flex: 100,
            title: 'DISABLEALLPUSH',
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], UserSettings.prototype, "disablePushNotifications", void 0);
    __decorate([
        Editable('UserSettings', {
            type: FormFieldType.toggle,
            flex: 100,
            title: 'DISABLEALLSMS',
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], UserSettings.prototype, "disableSmsNotifications", void 0);
    __decorate([
        Editable('UserSettings', {
            type: FormFieldType.toggle,
            flex: 100,
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], UserSettings.prototype, "sendFinishedEmail", void 0);
    __decorate([
        Editable('UserSettings', {
            title: 'MAXWIDTH',
            header: 'PHOTOS',
            type: FormFieldType.number,
            suppressExport: true,
            filterable: false,
            min: 600,
            max: 10240
        }),
        __metadata("design:type", Number)
    ], UserSettings.prototype, "photoMaxWidth", void 0);
    __decorate([
        Editable('UserSettings', {
            type: FormFieldType.toggle,
            flex: 100,
            title: 'DELETEPHOTOSINALBUM',
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], UserSettings.prototype, "deletePhotos", void 0);
    __decorate([
        Editable('UserSettings', {
            type: FormFieldType.toggle,
            flex: 100,
            header: 'MISSIONS',
            title: 'ENABLEMISSIONLIVESYNC',
            condition: ROLES_CONDITIONS.isAdmin,
            suppressExport: true,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Boolean)
    ], UserSettings.prototype, "enableMissionLiveSync", void 0);
    UserSettings = __decorate([
        Model({ className: 'UserSettings' })
    ], UserSettings);
    return UserSettings;
}(IUserSettings));
var SimpleUser = /** @class */ (function (_super) {
    __extends(SimpleUser, _super);
    function SimpleUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('SimpleUser', { type: FormFieldType.text, visible: false }),
        __metadata("design:type", String)
    ], SimpleUser.prototype, "_id", void 0);
    __decorate([
        Editable('SimpleUser', {
            visible: true,
            type: FormFieldType.photo,
            filterable: false,
            title: 'PHOTO',
            columnDefinition: { width: 52 }
        }),
        __metadata("design:type", String)
    ], SimpleUser.prototype, "imageData", void 0);
    __decorate([
        Editable('SimpleUser', { required: true, type: FormFieldType.email }),
        Searchable('SimpleUser'),
        __metadata("design:type", String)
    ], SimpleUser.prototype, "username", void 0);
    __decorate([
        Editable('SimpleUser', { visible: true, required: true, type: FormFieldType.email }),
        Searchable('SimpleUser'),
        __metadata("design:type", String)
    ], SimpleUser.prototype, "email", void 0);
    __decorate([
        Editable('SimpleUser', {
            required: true,
            type: FormFieldType.password,
            condition: conditions$1.isCreate,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", String)
    ], SimpleUser.prototype, "password", void 0);
    SimpleUser = __decorate([
        Model({ className: 'SimpleUser' })
    ], SimpleUser);
    return SimpleUser;
}(ISimpleUser));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Notification', {
            type: FormFieldType.autocomplete,
            translate: true,
            values: ['email', 'notification', 'allnotification'],
            required: true,
            filterable: true
        }),
        __metadata("design:type", String)
    ], Notification.prototype, "mode", void 0);
    __decorate([
        Editable('Notification', { type: FormFieldType.text, required: true }),
        Searchable('Notification'),
        __metadata("design:type", String)
    ], Notification.prototype, "title", void 0);
    __decorate([
        Editable('Notification', { type: FormFieldType.textarea, required: true }),
        __metadata("design:type", String)
    ], Notification.prototype, "body", void 0);
    __decorate([
        Editable('Notification', {
            type: FormFieldType.datetime,
            minDate: new Date(),
            condition: 'mode!="sms"'
        }),
        __metadata("design:type", Date)
    ], Notification.prototype, "scheduledDate", void 0);
    __decorate([
        Editable('Notification', {
            type: FormFieldType.autocomplete,
            collectionName: 'user',
            icon: 'yo-user',
            columnDefinition: { name: 'username' },
            exportOrder: 24,
            title: 'SENDBY',
            filterable: true
        }),
        __metadata("design:type", User)
    ], Notification.prototype, "sender", void 0);
    Notification = __decorate([
        Model({
            className: 'Notification',
            collectionName: 'notifications',
            fields: ['*', 'sender._id', 'sender.firstName', 'sender.lastName', 'sender.username', 'sender.imageData', 'sender.email', 'sender.telephone'],
            include: ['sender'],
            //'creator'
            icon: 'yo-activity'
        })
    ], Notification);
    return Notification;
}(INotification));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Push$1 = /** @class */ (function () {
    function Push$$1(coreConfig, log, config, rq, oneSignal, pushNative) {
        this.coreConfig = coreConfig;
        this.log = log;
        this.config = config;
        this.rq = rq;
        this.oneSignal = oneSignal;
        this.pushNative = pushNative;
        this.tags = ['username', 'language', 'isTeam'];
        this._notificationReceived = new Subject();
        this.registered = false;
        this._oneSignalPlayerIdChange = new Subject();
    }
    Object.defineProperty(Push$$1.prototype, "oneSignalPlayerIdChange$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._oneSignalPlayerIdChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Push$$1.prototype, "notificationReceived$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._notificationReceived.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} user
     * @return {?}
     */
    Push$$1.prototype.registerOneSignal = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var _this = this;
        if (this.registered === true) {
            //|| this.coreConfig.getAppId() === 'uk.co.boots.yoobicoperations'
            return Promise.resolve(user);
        }
        this.registered = true;
        /** @type {?} */
        var onesignalAppId = this.coreConfig.getKey('onesignalAppId');
        this._parentSubscription = new Subscription();
        if (this.coreConfig.isCordova()) {
            //OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });
            this.oneSignal.startInit(onesignalAppId, this.coreConfig.getKey('googleProjectNumber'));
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
            this._parentSubscription.add(this.oneSignal.handleNotificationReceived().subscribe((/**
             * @param {?} notif
             * @return {?}
             */
            function (notif) { return _this.onNotificationReceived(notif); })));
            this._parentSubscription.add(this.oneSignal.handleNotificationOpened().subscribe((/**
             * @param {?} notif
             * @return {?}
             */
            function (notif) { return _this.onNotificationOpened(notif); })));
            this.oneSignal.endInit();
            return this.oneSignal.getIds().then((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                _this.oneSignal.setSubscription(true);
                _this.oneSignal.sendTags(pick(user, _this.tags));
                if (retVal && retVal.userId) {
                    _this.currentOneSignalId = retVal.userId;
                    _this.updateUserOneSignalIds(user, _this.currentOneSignalId);
                    if (user.email) {
                        _this.oneSignal.syncHashedEmail(user.email);
                    }
                    if (retVal.pushToken) {
                        _this.addToken(user, retVal.pushToken);
                    }
                }
                _this._oneSignalPlayerIdChange.next(retVal.userId);
                return user;
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.log.forceLog(err);
                return user;
            }));
        }
        else if (this.coreConfig.isWeb() && window.OneSignal) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                if (!window.OneSignal.isPushNotificationsSupported() || location.hostname === 'localhost') {
                    return resolve(user);
                }
                window.OneSignal.push([
                    'init',
                    {
                        appId: onesignalAppId,
                        autoRegister: true,
                        notifyButton: { enable: false },
                        safari_web_id: _this.coreConfig.getKey('onesignalSafariWebId')
                    }
                ]);
                window.OneSignal.push((/**
                 * @return {?}
                 */
                function () {
                    window.OneSignal.sendTags(pick(user, _this.tags));
                    window.OneSignal.on('notificationDisplay', (/**
                     * @param {?} ev
                     * @return {?}
                     */
                    function (ev) {
                        _this.onNotificationReceived(ev);
                    }));
                    window.OneSignal.getUserId().then((/**
                     * @param {?} userId
                     * @return {?}
                     */
                    function (userId) {
                        _this.currentOneSignalId = userId;
                        _this.updateUserOneSignalIds(user, _this.currentOneSignalId);
                        resolve(user);
                    }));
                }));
            }));
        }
        else {
            return Promise.resolve(user);
        }
    };
    /**
     * @param {?} user
     * @param {?} oneSignalId
     * @return {?}
     */
    Push$$1.prototype.updateUserOneSignalIds = /**
     * @param {?} user
     * @param {?} oneSignalId
     * @return {?}
     */
    function (user, oneSignalId) {
        if (user) {
            user.oneSignalId = uniq(compact(union([].concat(user.oneSignalId), [oneSignalId])));
            user.oneSignalAppIds = user.oneSignalAppIds || {};
            /** @type {?} */
            var bundleId = this.coreConfig.getAppId().replace(/\./g, '_');
            user.oneSignalAppIds[bundleId] = uniq(compact(union([].concat(user.oneSignalAppIds[bundleId]), [oneSignalId])));
        }
    };
    /**
     * @param {?} notif
     * @return {?}
     */
    Push$$1.prototype.onNotificationReceived = /**
     * @param {?} notif
     * @return {?}
     */
    function (notif) {
        this._notificationReceived.next({ type: 'received', notification: notif });
    };
    /**
     * @param {?} notif
     * @return {?}
     */
    Push$$1.prototype.onNotificationOpened = /**
     * @param {?} notif
     * @return {?}
     */
    function (notif) {
        this._notificationReceived.next({
            type: 'opened',
            action: notif.action,
            notification: notif.notification
        });
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Push$$1.prototype.unregisterOneSignal = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        if (this.coreConfig.isCordova()) {
            this.oneSignal.setSubscription(false);
            if (this._parentSubscription) {
                this._parentSubscription.unsubscribe();
                this._parentSubscription = null;
            }
            user.oneSignalId = without(user.oneSignalId, this.currentOneSignalId);
            user.oneSignalAppIds = user.oneSignalAppIds || {};
            /** @type {?} */
            var bundleId = this.coreConfig.getAppId().replace(/\./g, '_');
            user.oneSignalAppIds[bundleId] = without(user.oneSignalAppIds[bundleId], this.currentOneSignalId);
            this.registered = false;
        }
    };
    /**
     * @param {?} user
     * @param {?} token
     * @return {?}
     */
    Push$$1.prototype.addToken = /**
     * @param {?} user
     * @param {?} token
     * @return {?}
     */
    function (user, token) {
        /** @type {?} */
        var platform = this.coreConfig.isIOS() ? 'ios' : 'android';
        if (!user._messaging || !isArray(user._messaging.pushTokens)) {
            user._messaging = { pushTokens: [] };
        }
        user._messaging.pushTokens.push({ token: token, platform: platform });
        user._messaging.pushTokens = uniqBy(user._messaging.pushTokens, (/**
         * @param {?} push
         * @return {?}
         */
        function (push) { return push.token; }));
        delete ((/** @type {?} */ (user))).messaging;
    };
    /**
     * @param {?} user
     * @param {?} token
     * @return {?}
     */
    Push$$1.prototype.removeToken = /**
     * @param {?} user
     * @param {?} token
     * @return {?}
     */
    function (user, token) {
        if (user._messaging && isArray(user._messaging.pushTokens)) {
            user._messaging.pushTokens = filter(user._messaging.pushTokens, (/**
             * @param {?} push
             * @return {?}
             */
            function (push) { return push.token !== token; }));
        }
    };
    /**
     * @param {?} user
     * @param {?} platform
     * @return {?}
     */
    Push$$1.prototype.getUserTokens = /**
     * @param {?} user
     * @param {?} platform
     * @return {?}
     */
    function (user, platform) {
        /** @type {?} */
        var tokens = [];
        if (user._messaging && user._messaging.pushTokens) {
            tokens = union(map$1(filter(user._messaging.pushTokens, (/**
             * @param {?} push
             * @return {?}
             */
            function (push) { return push.platform === platform; })), 'token'));
        }
        return tokens;
    };
    /**
     * @param {?} groups
     * @param {?} notification
     * @return {?}
     */
    Push$$1.prototype.notifyGroups = /**
     * @param {?} groups
     * @param {?} notification
     * @return {?}
     */
    function (groups, notification) {
        groups = [].concat(groups);
        if (groups && groups.length > 0) {
            notification.group = groups;
            //notification.userQuery = { where: { '_acl.groups.r': { inq: groups } } };
            return this.notify(notification);
        }
        else {
            return of(null);
        }
    };
    /**
     * @param {?} users
     * @param {?} notification
     * @return {?}
     */
    Push$$1.prototype.notifyUsers = /**
     * @param {?} users
     * @param {?} notification
     * @return {?}
     */
    function (users, notification) {
        if (users && users.length > 0) {
            return this.notify(notification, true, users.map((/**
             * @param {?} u
             * @return {?}
             */
            function (u) { return u._id; })));
        }
        else {
            return of(null);
        }
    };
    /**
     * @param {?} userId
     * @param {?} notification
     * @return {?}
     */
    Push$$1.prototype.notifyUserById = /**
     * @param {?} userId
     * @param {?} notification
     * @return {?}
     */
    function (userId, notification) {
        if (userId) {
            return this.notify(notification, true, [userId]);
        }
        else {
            return of(null);
        }
    };
    /**
     * @param {?} userIds
     * @param {?} notification
     * @return {?}
     */
    Push$$1.prototype.notifyUsersById = /**
     * @param {?} userIds
     * @param {?} notification
     * @return {?}
     */
    function (userIds, notification) {
        if (userIds && userIds.length > 0) {
            return this.notify(notification, true, userIds);
        }
        else {
            return of(null);
        }
    };
    /**
     * @param {?} userQuery
     * @param {?} notification
     * @return {?}
     */
    Push$$1.prototype.notifyUsersByQuery = /**
     * @param {?} userQuery
     * @param {?} notification
     * @return {?}
     */
    function (userQuery, notification) {
        if (!isEmpty(userQuery) && (!isEmpty(userQuery.where) || !isEmpty(userQuery.subQuery.where))) {
            //notification.userQuery = { where: { _id: { inq: userIds } } };
            notification.userQuery = userQuery;
            notification._tenantRef = notification._tenantRef || get(userQuery, ['where', '_tenantRef']) || get(userQuery, ['subQuery', 'where', '_tenantRef']);
            return this.notify(notification);
        }
        else {
            return of(null);
        }
    };
    /**
     * @param {?} notification
     * @param {?=} noQuery
     * @param {?=} userIds
     * @return {?}
     */
    Push$$1.prototype.notify = /**
     * @param {?} notification
     * @param {?=} noQuery
     * @param {?=} userIds
     * @return {?}
     */
    function (notification, noQuery, userIds) {
        if (noQuery === void 0) { noQuery = false; }
        if (notification.scheduledDate) {
            notification.scheduledDate = toDate(notification.scheduledDate);
        }
        if (notification.userQuery && notification.userQuery.limit !== undefined) {
            delete notification.userQuery.limit;
        }
        if (notification.userQuery && notification.userQuery.field !== undefined) {
            delete notification.userQuery.field;
        }
        notification.notificationOptions = merge(notification.notificationOptions || {}, {
            ios_badgeType: 'Increase',
            ios_badgeCount: 1
        });
        if (notification.mode === 'allnotification') {
            ((/** @type {?} */ (notification))).mode = 'all';
        }
        if (noQuery) {
            /** @type {?} */
            var url = this.config.apiUrl + 'notifications/sendTargetedNotification';
            return this.rq.post(url, { userIds: userIds, notification: notification });
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'businesslogic/sendNotification';
            return this.rq.post(url, notification);
        }
    };
    //deprecated
    //deprecated
    /**
     * @protected
     * @return {?}
     */
    Push$$1.prototype._registerNative = 
    //deprecated
    /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.coreConfig.isCordova()) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                /** @type {?} */
                var promiseFulfilled = false;
                _this.push = _this.pushNative.init({
                    android: {
                        senderID: _this.coreConfig.getKey('googleProjectNumber'),
                        iconColor: Colors.success,
                        icon: 'notify'
                    },
                    ios: { alert: 'true', badge: 'true', sound: 'false' }
                });
                _this.push.on('registration').subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    promiseFulfilled = true;
                    resolve(data.registrationId);
                }));
                _this.push.on('error').subscribe((/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    reject(error);
                }));
                _this.push.on('notification').subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { }));
                //sometimes on ios if the push are not enable it will not send an error, so we check after 10 sec
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (!promiseFulfilled) {
                        reject('timeout');
                    }
                }), 10000);
            }));
        }
        else {
            return (/** @type {?} */ (Promise.reject('not cordova')));
        }
    };
    Push$$1.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Push$$1.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Log },
        { type: Config },
        { type: Requestor },
        { type: OneSignal },
        { type: Push }
    ]; };
    return Push$$1;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Authentication = /** @class */ (function () {
    function Authentication(rq, push, config, broker, network, localStorage, localForage, session, coreConfig) {
        this.rq = rq;
        this.push = push;
        this.config = config;
        this.broker = broker;
        this.network = network;
        this.localStorage = localStorage;
        this.localForage = localForage;
        this.session = session;
        this.coreConfig = coreConfig;
        this.login$ = new Subject();
        this.logout$ = new Subject();
        this.profileUpdated$ = new EventEmitter();
    }
    /**
     * @param {?} username
     * @param {?} password
     * @param {?=} roles
     * @return {?}
     */
    Authentication.prototype.login = /**
     * @param {?} username
     * @param {?} password
     * @param {?=} roles
     * @return {?}
     */
    function (username, password, roles) {
        var _this = this;
        /** @type {?} */
        var url = this.broker.getServerUrl() + 'auth/login';
        return this.rq.post(url, { username: username, password: password, roles: roles }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.afterLogin(res);
            return res;
        })), catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.session.token = null;
            /** @type {?} */
            var err;
            if (res && res.json) {
                err = res.json().error;
            }
            else if (res && res.error && res.error.error) {
                err = res.error.error;
            }
            else if (res.name) {
                err = { message: res.name.toUpperCase() };
            }
            else {
                err = { message: 'REQUESTERROR' };
            }
            return throwError(err);
        })));
    };
    /**
     * @param {?} accessToken
     * @param {?=} provider
     * @return {?}
     */
    Authentication.prototype.loginSocial = /**
     * @param {?} accessToken
     * @param {?=} provider
     * @return {?}
     */
    function (accessToken, provider) {
        var _this = this;
        if (provider === void 0) { provider = 'facebook'; }
        /** @type {?} */
        var url = this.broker.getServerUrl() + 'auth/' + provider;
        return this.rq.post(url, { accessToken: accessToken }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.afterLogin(res);
            return res;
        })), catchError((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.session.token = null;
            return throwError(res.json().error);
        })));
    };
    /**
     * @param {?} tenant
     * @param {?} method
     * @param {?} host
     * @return {?}
     */
    Authentication.prototype.getLoginAdvancedUrl = /**
     * @param {?} tenant
     * @param {?} method
     * @param {?} host
     * @return {?}
     */
    function (tenant, method, host) {
        /** @type {?} */
        var url = this.broker.getServerUrl() + 'auth/' + tenant.toLowerCase() + '/' + method + '/login?host=' + host + '&tokenLocation=' + (this.coreConfig.isCordova() ? 'query' : 'fragment');
        return url;
    };
    /**
     * @param {?} tenant
     * @return {?}
     */
    Authentication.prototype.getTenantAdvancedLoginMethods = /**
     * @param {?} tenant
     * @return {?}
     */
    function (tenant) {
        /** @type {?} */
        var url = this.broker.getServerUrl() + 'auth/' + tenant.toLowerCase() + '/providers';
        return this.rq.get(url);
    };
    /**
     * @param {?} token
     * @return {?}
     */
    Authentication.prototype.getTenantFromToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var jwtHelper = new JwtHelperService({});
        return jwtHelper.decodeToken(token) || {};
    };
    /**
     * @param {?} res
     * @return {?}
     */
    Authentication.prototype.afterLogin = /**
     * @param {?} res
     * @return {?}
     */
    function (res) {
        this.session.token = res.$mcfly$token;
        this.session.userId = res.userId;
        this.session.user = res.user;
        this.session.tenant = res.tenant;
        this.login$.next('');
        this.cleanUpLocalStorage();
        return res;
    };
    /**
     * @return {?}
     */
    Authentication.prototype.cleanUpLocalStorage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var keys$$1 = ['stats.kpiFilterFormData', 'stats.selectedDescription', 'stats.selectedDashboard', 'stats.customSelectedDashboard'];
        keys$$1.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this.localStorage.remove(key);
        }));
    };
    /**
     * @return {?}
     */
    Authentication.prototype.getCurrentSession = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.rq.get(this.broker.getApiUrl() + 'businesslogic/getCurrentSession').pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            assign(_this.session, res.data);
            _this.session.hasScandit = _this.coreConfig.isCordova() ? _this.hasRoles(['scandit']) : _this.hasRoles(['scandit', 'admin']);
            return (/** @type {?} */ (_this.session));
        })), catchError((/**
         * @return {?}
         */
        function () {
            return of(null);
        })));
    };
    /**
     * @return {?}
     */
    Authentication.prototype.doLogout = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'user/logout';
        return this.rq.post(url, {});
    };
    /**
     * @return {?}
     */
    Authentication.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var promise = Promise.resolve(null);
        if (this.config.isTestpen) {
            if (this.localStorage) {
                this.localStorage.clear();
            }
            if (this.localForage) {
                this.localForage.clear();
            }
        }
        if (this.session && this.session.user && this.session.user._id) {
            this.push.unregisterOneSignal(this.session.user);
            promise = this.updateProfile(this.session.user).toPromise();
        }
        this.logout$.next('');
        return promise.then((/**
         * @return {?}
         */
        function () { return _this.afterLogout(); }), (/**
         * @return {?}
         */
        function () { return _this.afterLogout(); }));
    };
    /**
     * @return {?}
     */
    Authentication.prototype.afterLogout = /**
     * @return {?}
     */
    function () {
        this.doLogout().subscribe((/**
         * @return {?}
         */
        function () { }), (/**
         * @return {?}
         */
        function () { }));
        this.network.forceOffline(false, false);
        this.session.clear().catch((/**
         * @return {?}
         */
        function () { }));
        return Promise.resolve();
    };
    /**
     * @param {?} email
     * @param {?} imageData
     * @param {?} password
     * @return {?}
     */
    Authentication.prototype.signup = /**
     * @param {?} email
     * @param {?} imageData
     * @param {?} password
     * @return {?}
     */
    function (email, imageData, password) {
        var _this = this;
        /** @type {?} */
        var user = (/** @type {?} */ ({ username: email, email: email, password: password, imageData: imageData }));
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'user/signup';
        return this.rq.post(url, { user: user }).pipe(mergeMap((/**
         * @return {?}
         */
        function () {
            return _this.login(email, password);
        })));
    };
    /**
     * @param {?} users
     * @param {?} groups
     * @param {?=} password
     * @param {?=} sendPassword
     * @param {?=} appName
     * @param {?=} appleStoreUrl
     * @param {?=} playStoreUrl
     * @param {?=} _tenantRef
     * @return {?}
     */
    Authentication.prototype.inviteUsers = /**
     * @param {?} users
     * @param {?} groups
     * @param {?=} password
     * @param {?=} sendPassword
     * @param {?=} appName
     * @param {?=} appleStoreUrl
     * @param {?=} playStoreUrl
     * @param {?=} _tenantRef
     * @return {?}
     */
    function (users, groups, password, sendPassword, appName, appleStoreUrl, playStoreUrl, _tenantRef) {
        if (password === void 0) { password = null; }
        if (sendPassword === void 0) { sendPassword = true; }
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'user/invite';
        /** @type {?} */
        var finalPlayStoreUrl = playStoreUrl + this.coreConfig.getAppId();
        return this.rq.post(url, {
            users: users,
            groups: groups,
            password: password,
            sendPassword: sendPassword,
            appName: appName,
            appleStoreUrl: appleStoreUrl,
            playStoreUrl: finalPlayStoreUrl,
            _tenantRef: _tenantRef
        });
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isLoggedIn = /**
     * @return {?}
     */
    function () {
        return this.session.token && this.session.token.length > 0 && !this.isTokenExpired(this.session.token);
    };
    /**
     * @param {?} role
     * @return {?}
     */
    Authentication.prototype.hasRole = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    };
    /**
     * @param {?} roles
     * @return {?}
     */
    Authentication.prototype.hasRoles = /**
     * @param {?} roles
     * @return {?}
     */
    function (roles) {
        var _this = this;
        return some(map$1(roles, (/**
         * @param {?} role
         * @return {?}
         */
        function (role) { return _this.hasRole(role); })), (/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t === true; }));
    };
    /**
     * @param {?} roles
     * @return {?}
     */
    Authentication.prototype.hasAllRoles = /**
     * @param {?} roles
     * @return {?}
     */
    function (roles) {
        var _this = this;
        return every(roles, (/**
         * @param {?} role
         * @return {?}
         */
        function (role) { return _this.hasRole(role); }));
    };
    /**
     * @param {?} group
     * @return {?}
     */
    Authentication.prototype.hasGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return this.session.groups && this.session.groups.indexOf(group) >= 0;
    };
    /**
     * @param {?} groups
     * @return {?}
     */
    Authentication.prototype.hasGroups = /**
     * @param {?} groups
     * @return {?}
     */
    function (groups) {
        var _this = this;
        return some(map$1(groups, (/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return _this.hasGroup(group); })), (/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t === true; }));
    };
    /**
     * @param {?} groups
     * @return {?}
     */
    Authentication.prototype.hasAllGroups = /**
     * @param {?} groups
     * @return {?}
     */
    function (groups) {
        var _this = this;
        return every(groups, (/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return _this.hasGroup(group); }));
    };
    /**
     * @param {?=} checkSmartin
     * @return {?}
     */
    Authentication.prototype.isAdmin = /**
     * @param {?=} checkSmartin
     * @return {?}
     */
    function (checkSmartin) {
        if (checkSmartin === void 0) { checkSmartin = false; }
        /** @type {?} */
        var retVal = this.hasRole(Authentication.roleAdmin);
        if (checkSmartin && this.session.user.username !== 'smartin@yoobic.com') {
            retVal = false;
        }
        return retVal;
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isTrial = /**
     * @return {?}
     */
    function () {
        return !this.hasRole(Authentication.roleAdmin) && this.hasRole(Authentication.roleTrial);
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isDashboard = /**
     * @return {?}
     */
    function () {
        return this.hasRole(Authentication.roleDashboard) && !this.isAdmin() && !this.hasRole(Authentication.roleMissionViewer) && !this.hasRole(Authentication.roleManager);
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isTeam = /**
     * @return {?}
     */
    function () {
        return this.hasRole(Authentication.roleTeam);
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isCrowd = /**
     * @return {?}
     */
    function () {
        return !this.hasRole(Authentication.roleTeam);
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isStore = /**
     * @return {?}
     */
    function () {
        return this.session.user && isPresent(this.session.user.locationRef);
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isStoreManager = /**
     * @return {?}
     */
    function () {
        return this.hasRole('store') && this.session.user && this.session.user.locationRef;
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleAdmin = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEADMIN';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleEditor = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEEDITOR';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleViewer = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEVIEWER';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleManager = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEMANAGER';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleField = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEFIELD';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleStoreManager = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLESTOREMANAGER';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.isRoleStore = /**
     * @return {?}
     */
    function () {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLESTORE';
    };
    /**
     * @return {?}
     */
    Authentication.prototype.hasAccessToOperations = /**
     * @return {?}
     */
    function () {
        return this.hasRole('team');
    };
    /**
     * @return {?}
     */
    Authentication.prototype.hasAccessToBoost = /**
     * @return {?}
     */
    function () {
        return this.hasRole('academy');
    };
    /**
     * @return {?}
     */
    Authentication.prototype.getCurrentUser = /**
     * @return {?}
     */
    function () {
        return this.session.user;
    };
    /**
     * @param {?} oldPassword
     * @param {?} newPassword
     * @return {?}
     */
    Authentication.prototype.passwordChange = /**
     * @param {?} oldPassword
     * @param {?} newPassword
     * @return {?}
     */
    function (oldPassword, newPassword) {
        return this.rq.post(this.broker.getApiUrl() + 'user/changePassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    };
    /**
     * @param {?} email
     * @param {?=} isMagicLink
     * @param {?=} urlPrefix
     * @return {?}
     */
    Authentication.prototype.passwordReset = /**
     * @param {?} email
     * @param {?=} isMagicLink
     * @param {?=} urlPrefix
     * @return {?}
     */
    function (email, isMagicLink, urlPrefix) {
        if (isMagicLink === void 0) { isMagicLink = false; }
        if (urlPrefix === void 0) { urlPrefix = 'https://yoobic.app.link/'; }
        if (isMagicLink) {
            return this.rq.post(this.broker.getApiUrl() + 'user/getMagicLink', {
                username: email,
                urlPrefix: urlPrefix
            });
        }
        else {
            return this.rq.post(this.broker.getApiUrl() + 'user/reset', { email: email });
        }
    };
    /**
     * @param {?} token
     * @param {?} password
     * @param {?=} host
     * @return {?}
     */
    Authentication.prototype.passwordResetConfirm = /**
     * @param {?} token
     * @param {?} password
     * @param {?=} host
     * @return {?}
     */
    function (token, password, host) {
        /** @type {?} */
        var url = host ? 'https://' + host + '/api/' : this.broker.getApiUrl();
        return this.rq.post(url + 'Endpoints/resetPassword', { password: password }, token, null, true);
    };
    /**
     * @param {?} user
     * @param {?} password
     * @param {?=} dontSendMail
     * @return {?}
     */
    Authentication.prototype.passwordResetAdmin = /**
     * @param {?} user
     * @param {?} password
     * @param {?=} dontSendMail
     * @return {?}
     */
    function (user, password, dontSendMail) {
        if (dontSendMail === void 0) { dontSendMail = false; }
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/resetPassword', {
            options: {
                userPasswordList: [user].map((/**
                 * @param {?} u
                 * @return {?}
                 */
                function (u) { return ({
                    username: u.username,
                    _id: u._id,
                    password: password
                }); })),
                dontSendMail: dontSendMail
            }
        });
    };
    /**
     * @param {?} username
     * @return {?}
     */
    Authentication.prototype.impersonate = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/impersonate', {
            username: username
        });
    };
    /**
     * @param {?} username
     * @return {?}
     */
    Authentication.prototype.forceLogout = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/forceLogout', {
            username: username
        });
    };
    /**
     * @return {?}
     */
    Authentication.prototype.generatePassword = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var length = 8;
        /** @type {?} */
        var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        /** @type {?} */
        var retVal = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };
    /**
     * @param {?=} user
     * @param {?=} skipAcl
     * @param {?=} fields
     * @return {?}
     */
    Authentication.prototype.updateProfile = /**
     * @param {?=} user
     * @param {?=} skipAcl
     * @param {?=} fields
     * @return {?}
     */
    function (user, skipAcl, fields) {
        var _this = this;
        if (skipAcl === void 0) { skipAcl = false; }
        if (fields === void 0) { fields = []; }
        /** @type {?} */
        var userToUpdate = user || this.getCurrentUser();
        if (userToUpdate) {
            if (!this.isAdmin() && !skipAcl) {
                this.broker.setAcl(userToUpdate, this.session.groups);
            }
            if (fields && fields.length > 0) {
                userToUpdate = (/** @type {?} */ (pick(userToUpdate, fields)));
                if (fields.indexOf('_acl') < 0) {
                    skipAcl = true;
                }
            }
            return this.broker.upsert('user', userToUpdate, null, skipAcl).pipe(flatMap((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                return _this.broker.getById('user', retVal._id).pipe(map((/**
                 * @param {?} updatedUser
                 * @return {?}
                 */
                function (updatedUser) {
                    _this.session.user = updatedUser;
                    return updatedUser;
                })));
            })));
        }
        else {
            return of(null);
        }
    };
    /**
     * @param {?} token
     * @return {?}
     */
    Authentication.prototype.isTokenExpired = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var jwtHelper = new JwtHelperService({});
        try {
            return jwtHelper.isTokenExpired(token);
        }
        catch (err) {
            return true;
        }
    };
    /**
     * @param {?} token
     * @param {?} userId
     * @return {?}
     */
    Authentication.prototype.setToken = /**
     * @param {?} token
     * @param {?} userId
     * @return {?}
     */
    function (token, userId) {
        var _this = this;
        this.session.token = token;
        this.session.userId = userId;
        return this.broker.getById('user', userId).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            _this.session.user = retVal;
            _this.profileUpdated$.emit(retVal);
            return retVal;
        })));
    };
    /**
     * @param {?} tenant
     * @return {?}
     */
    Authentication.prototype.createPublicApiToken = /**
     * @param {?} tenant
     * @return {?}
     */
    function (tenant) {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'AdminDashboard/generateServiceAccount';
        return this.rq.post(url, {
            tenantId: tenant._id
        });
    };
    /**
     * @param {?} token
     * @return {?}
     */
    Authentication.prototype.invalidatePublicApiToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'publicAPITokens/' + token._id + '/invalidate';
        return this.rq.post(url, {});
    };
    Authentication.roleAdmin = 'admin';
    Authentication.roleTeam = 'team';
    Authentication.roleTrial = 'trial';
    Authentication.roleDashboard = 'dashboard';
    Authentication.roleManager = 'manager';
    Authentication.roleMissionViewer = 'missionviewer';
    Authentication.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Authentication.ctorParameters = function () { return [
        { type: Requestor },
        { type: Push$1 },
        { type: Config },
        { type: Broker },
        { type: Network },
        { type: LocalStorage },
        { type: LocalForageService },
        { type: Session },
        { type: CoreConfig }
    ]; };
    return Authentication;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(authentication) {
        this.authentication = authentication;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    AuthenticationGuard.prototype.canActivate = /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    function (next, state) {
        /** @type {?} */
        var retVal = false;
        if (this.authentication.isLoggedIn()) {
            if (next.data && next.data['roles']) {
                retVal = this.authentication.hasRoles(next.data['roles']) || this.authentication.isAdmin();
            }
            else {
                retVal = true;
            }
            if (next.data && next.data['excludedRoles'] && !this.authentication.isAdmin()) {
                retVal = retVal && !this.authentication.hasRoles(next.data['excludedRoles']);
            }
        }
        else {
            Requestor.unauthorizedEmitter.emit('not logged in');
        }
        return retVal;
    };
    AuthenticationGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthenticationGuard.ctorParameters = function () { return [
        { type: Authentication }
    ]; };
    return AuthenticationGuard;
}());
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    /**
     * @param {?} component
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    CanDeactivateGuard.prototype.canDeactivate = /**
     * @param {?} component
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (component, route, state) {
        return component && component.canDeactivate ? component.canDeactivate(component, route, state) : true;
    };
    CanDeactivateGuard.decorators = [
        { type: Injectable }
    ];
    return CanDeactivateGuard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BackupService = /** @class */ (function () {
    function BackupService(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    Object.defineProperty(BackupService.prototype, "apiUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiUrl + 'AdminDashboard/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} date
     * @return {?}
     */
    BackupService.prototype.getAll = /**
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var url = this.apiUrl + 'listBackup';
        return this.rq
            .post(url, {
            clusterName: 'rs-ds039424',
            date: toDate(date || new Date()).toISOString()
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res && res.map) {
                res = res
                    .map((/**
                 * @param {?} name
                 * @return {?}
                 */
                function (name) {
                    /** @type {?} */
                    var backup = { _id: name };
                    /** @type {?} */
                    var lastIndex = name.lastIndexOf('_');
                    /** @type {?} */
                    var dateStr = name.substr(lastIndex + 1).replace('.tgz', '');
                    backup.title = fromNow(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'));
                    backup.badge = dateFormat(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'), 'L LT');
                    backup.description = name;
                    return backup;
                }))
                    .reverse();
            }
            return res;
        })));
    };
    /**
     * @param {?} backupName
     * @param {?=} collections
     * @return {?}
     */
    BackupService.prototype.restore = /**
     * @param {?} backupName
     * @param {?=} collections
     * @return {?}
     */
    function (backupName, collections) {
        /** @type {?} */
        var url = this.apiUrl + 'restoreBackup ';
        return this.rq.post(url, {
            s3Key: backupName,
            collections: collections
        });
    };
    BackupService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BackupService.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config }
    ]; };
    return BackupService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Blog = /** @class */ (function () {
    function Blog(coreConfig, config, rq, translate) {
        this.coreConfig = coreConfig;
        this.config = config;
        this.rq = rq;
        this.translate = translate;
    }
    /**
     * @return {?}
     */
    Blog.prototype.getUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url;
        if (this.coreConfig.getAppName() === 'operations') {
            if (this.translate.getCurrentLanguage() === 'fr') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20417&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20415&public_link=true';
                }
            }
            else if (this.translate.getCurrentLanguage() === 'it') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=21144&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=21143&public_link=true';
                }
            }
            else {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20416&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20414&public_link=true';
                }
            }
        }
        else if (this.coreConfig.getAppName() === 'boost') {
            if (this.translate.getCurrentLanguage() === 'fr') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25008&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25006&public_link=true';
                }
            }
            else if (this.translate.getCurrentLanguage() === 'it') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25009&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25010&public_link=true';
                }
            }
            else {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25007&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25005&public_link=true';
                }
            }
        }
        return url;
    };
    /**
     * @param {?} blogUrl
     * @param {?=} limit
     * @param {?=} skip
     * @return {?}
     */
    Blog.prototype.get = /**
     * @param {?} blogUrl
     * @param {?=} limit
     * @param {?=} skip
     * @return {?}
     */
    function (blogUrl, limit, skip) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: limit, skip: skip }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            items.forEach((/**
             * @param {?} b
             * @return {?}
             */
            function (b) {
                try {
                    if (b && b.enclosure && b.enclosure.$ && b.enclosure.$.url) {
                        b.background = b.enclosure.$.url;
                    }
                    else {
                        /** @type {?} */
                        var content = b['content:encoded'];
                        /** @type {?} */
                        var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                        /** @type {?} */
                        var results = re.exec(content);
                        if (results) {
                            b.background = results[1];
                        }
                    }
                    if (b.pubDate && isString(b.pubDate)) {
                        b.pubDate = new Date(b.pubDate);
                    }
                    if (b.background) {
                        b.background = b.background.replace('blog.yoobic.com', 'yoobic.blogin.co');
                    }
                }
                catch (err) { }
            }));
            return items;
        })));
    };
    /**
     * @param {?} blogUrl
     * @return {?}
     */
    Blog.prototype.getLatestArticleDate = /**
     * @param {?} blogUrl
     * @return {?}
     */
    function (blogUrl) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: 1 }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            if (items && items.length > 0 && items[0]) {
                return items[0].pubDate;
            }
            return null;
        })));
    };
    Blog.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Blog.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Config },
        { type: Requestor },
        { type: Translate }
    ]; };
    return Blog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CurrentSessionResolver = /** @class */ (function () {
    function CurrentSessionResolver(authentication, network) {
        this.authentication = authentication;
        this.network = network;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    CurrentSessionResolver.prototype.resolve = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.authentication.getCurrentSession();
    };
    CurrentSessionResolver.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CurrentSessionResolver.ctorParameters = function () { return [
        { type: Authentication },
        { type: Network }
    ]; };
    return CurrentSessionResolver;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Dashboard = /** @class */ (function () {
    function Dashboard(broker, translate, session) {
        this.broker = broker;
        this.translate = translate;
        this.session = session;
    }
    /**
     * @param {?} dashboard
     * @param {?} users
     * @return {?}
     */
    Dashboard.prototype.publish = /**
     * @param {?} dashboard
     * @param {?} users
     * @return {?}
     */
    function (dashboard, users) {
        var _this = this;
        /** @type {?} */
        var dashboards = users
            .filter((/**
         * @param {?} u
         * @return {?}
         */
        function (u) { return u._id !== _this.session.user._id; }))
            .map((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            /** @type {?} */
            var dashboardCopy = cloneDeep(dashboard);
            // dashboardCopy.title += ' - ' + moment().format('L');
            dashboardCopy.originalRef = dashboard._id;
            delete dashboardCopy._id;
            dashboardCopy._acl = user._acl;
            _this.broker.setAcl(dashboardCopy, null, null, null, [user._id]);
            //dashboardCopy._acl.users = { r: [user._id], w: [user._id] };
            dashboardCopy.creatorRef = user._id;
            //dashboardCopy._acl.creator = user._id;
            return dashboardCopy;
        }));
        return this.broker
            .deleteAll('dashboards', {
            where: { originalRef: { inq: [dashboard._id] }, creatorRef: { inq: map$1(users, '_id') } }
        })
            .pipe(mergeMap((/**
         * @return {?}
         */
        function () {
            return _this.broker.upsertAll('dashboards', dashboards);
        })));
    };
    /**
     * @param {?} dashboard
     * @return {?}
     */
    Dashboard.prototype.deletePublished = /**
     * @param {?} dashboard
     * @return {?}
     */
    function (dashboard) {
        return this.broker.deleteAll('dashboards', {
            where: { originalRef: { inq: [dashboard._id] } }
        });
    };
    /**
     * @param {?} dashboard
     * @return {?}
     */
    Dashboard.prototype.updatePublished = /**
     * @param {?} dashboard
     * @return {?}
     */
    function (dashboard) {
        var _this = this;
        return this.broker.getAll('dashboards', ['_id', '_acl', '_ect', '_lmt'], null, null, [[{ field: 'originalRef', operator: { _id: 'inq' }, value: [dashboard._id] }]], null, 0, -1).pipe(mergeMap((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var dashboards = response.data;
            dashboards.forEach((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                d.title = dashboard.title + ' - ' + dateFormat(new Date(), 'L');
                d.description = dashboard.description;
                d.tabs = dashboard.tabs;
            }));
            return _this.broker.upsertAll('dashboards', dashboards);
        })));
    };
    /**
     * @param {?} dashboard
     * @param {?} title
     * @return {?}
     */
    Dashboard.prototype.copy = /**
     * @param {?} dashboard
     * @param {?} title
     * @return {?}
     */
    function (dashboard, title) {
        /** @type {?} */
        var newDashboard = cloneDeep(dashboard);
        newDashboard.title = title;
        delete newDashboard._id;
        if (newDashboard.tabs) {
            newDashboard.tabs.forEach((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                if (t.items) {
                    t.items.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        c.definition._id = getUUID();
                    }));
                }
            }));
        }
        return this.broker.upsert('dashboards', newDashboard);
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} excludedFields
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    Dashboard.prototype.aggregateQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} excludedFields
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    function (collectionName, filters, options, excludedFields, customFilter, subQuery) {
        //, aggregateFormDefinition?: Array<IFormField>, aggregateData?: any) { //where ?: Filters, match?: Object, limit?: Number, lookup?: Object, projectBefore?: Object, group?: Object, projectAfter?: Object) {
        options = options || [];
        return this.broker.aggregateQuery(collectionName, filters, options, null, excludedFields, false, null, customFilter, subQuery);
    };
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    Dashboard.prototype.setTimescale = /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    function (filters, timescale, dateField, endDate, previous) {
        if (dateField === void 0) { dateField = 'finishedDate'; }
        if (previous === void 0) { previous = false; }
        return this.broker.setTimescale(filters, timescale, dateField, endDate, previous);
    };
    /**
     * @param {?} title
     * @param {?=} filters
     * @param {?=} collectionName
     * @param {?=} dateGrouping
     * @param {?=} groupByDate
     * @param {?=} timeScale
     * @return {?}
     */
    Dashboard.prototype.getChartDefinition = /**
     * @param {?} title
     * @param {?=} filters
     * @param {?=} collectionName
     * @param {?=} dateGrouping
     * @param {?=} groupByDate
     * @param {?=} timeScale
     * @return {?}
     */
    function (title, filters, collectionName, dateGrouping, groupByDate, timeScale) {
        if (filters === void 0) { filters = [[]]; }
        if (collectionName === void 0) { collectionName = 'missions'; }
        if (dateGrouping === void 0) { dateGrouping = 'day'; }
        if (groupByDate === void 0) { groupByDate = true; }
        if (timeScale === void 0) { timeScale = 'last7days'; }
        /** @type {?} */
        var definition = (/** @type {?} */ ({
            title: this.translate.get(title),
            aggregateOptions: [],
            timescale: timeScale,
            collectionName: collectionName,
            dateGrouping: dateGrouping,
            filters: filters,
            groupByDate: groupByDate,
            palette: 'palette2',
            showAs: 'chart',
            type: 'areaspline',
            datetimeFormat: 'dd'
        }));
        return definition;
    };
    /**
     * @param {?=} missionDescription
     * @param {?=} fields
     * @param {?=} start
     * @param {?=} locationTags
     * @return {?}
     */
    Dashboard.prototype.getPhotos = /**
     * @param {?=} missionDescription
     * @param {?=} fields
     * @param {?=} start
     * @param {?=} locationTags
     * @return {?}
     */
    function (missionDescription, fields, start, locationTags) {
        if (start === void 0) { start = 0; }
        /** @type {?} */
        var filters = [[]];
        if (missionDescription && missionDescription._id) {
            filters[0].push({
                field: 'missiondescriptionRef',
                operator: { _id: 'inq' },
                value: [missionDescription._id]
            });
        }
        if (fields) {
            fields = [].concat(fields);
            filters[0].push({
                field: 'name',
                operator: { _id: 'inq' },
                value: fields.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name.replace('.value', ''); }))
            });
        }
        if (locationTags && locationTags.length) {
            filters[0].push({
                field: 'tags',
                collectionName: 'locations',
                operator: { _id: 'inq' },
                value: locationTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'locationRef', values: '_id' }
            });
        }
        return this.broker.getAll('photos', null, null, null, filters, null, start, 10);
    };
    /**
     * @param {?} folderIds
     * @return {?}
     */
    Dashboard.prototype.getFolderFolderStat = /**
     * @param {?} folderIds
     * @return {?}
     */
    function (folderIds) {
        /** @type {?} */
        var filters = [[{ field: 'parent', operator: { _id: 'inq' }, value: folderIds }]];
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$parent'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    folders: { $sum: 1 }
                }
            }
        ];
        return this.aggregateQuery('folders', filters, options);
    };
    /**
     * @param {?} folderIds
     * @param {?=} keepHideMobile
     * @return {?}
     */
    Dashboard.prototype.getFolderFileStat = /**
     * @param {?} folderIds
     * @param {?=} keepHideMobile
     * @return {?}
     */
    function (folderIds, keepHideMobile) {
        if (keepHideMobile === void 0) { keepHideMobile = true; }
        /** @type {?} */
        var filters = [[{ field: 'folder', operator: { _id: 'inq' }, value: folderIds }]];
        if (keepHideMobile === false) {
            filters[0].push({ field: 'hideMobile', operator: { _id: 'neq' }, value: true });
        }
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$folder'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    files: { $sum: 1 }
                }
            }
        ];
        return this.aggregateQuery('files', filters, options);
    };
    Dashboard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Dashboard.ctorParameters = function () { return [
        { type: Broker },
        { type: Translate },
        { type: Session }
    ]; };
    return Dashboard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilesBroker = /** @class */ (function () {
    function FilesBroker(dashboard, broker, files) {
        this.dashboard = dashboard;
        this.broker = broker;
        this.files = files;
    }
    /**
     * @return {?}
     */
    FilesBroker.prototype.getFilesTransform = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res && res.data && res.data.map) {
                res.data.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return _this.updateFileIcon(f); }));
            }
            return res;
        });
    };
    /**
     * @return {?}
     */
    FilesBroker.prototype.getFilesFoldersTransformAsync = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        function (res, search, filters, start, pageSize) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    res.data.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        delete f.items;
                        if (f.fftype === 'file') {
                            _this.updateFileIcon(f);
                        }
                    }));
                    /** @type {?} */
                    var ids_1 = res.data.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.fftype === 'folder'; })).map((/**
                     * @param {?} folder
                     * @return {?}
                     */
                    function (folder) { return folder._id; }));
                    _this.dashboard.getFolderFolderStat(ids_1).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    function (stats) {
                        res.data.forEach((/**
                         * @param {?} folder
                         * @return {?}
                         */
                        function (folder) {
                            /** @type {?} */
                            var stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return s._id === folder._id; }));
                            /** @type {?} */
                            var value = stat ? stat.folders || 0 : 0;
                            folder.stats = [{ title: 'FOLDERS', color: 'dark', value: value }];
                            ((/** @type {?} */ (folder))).hasChildren = value > 0;
                        }));
                        _this.dashboard.getFolderFileStat(ids_1, false).subscribe((/**
                         * @param {?} fileStats
                         * @return {?}
                         */
                        function (fileStats) {
                            res.data.forEach((/**
                             * @param {?} folder
                             * @return {?}
                             */
                            function (folder) {
                                /** @type {?} */
                                var stat = fileStats.find((/**
                                 * @param {?} s
                                 * @return {?}
                                 */
                                function (s) { return s._id === folder._id; }));
                                folder.stats.push({
                                    title: 'FILES',
                                    color: 'dark',
                                    value: stat ? stat.files || 0 : 0
                                });
                            }));
                            observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                            observer.complete();
                        }));
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    };
    /**
     * @param {?} folderId
     * @return {?}
     */
    FilesBroker.prototype.cleanupFolder = /**
     * @param {?} folderId
     * @return {?}
     */
    function (folderId) {
        return this.broker.deleteAll('files', { where: { folder: folderId } });
    };
    /**
     * @param {?} f
     * @return {?}
     */
    FilesBroker.prototype.updateFileIcon = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        if (this.files.isImage(f)) {
            f.imgSrc = f._downloadURL;
        }
        else if (this.files.isVideo(f)) {
            f.imgSrc = this.files.getVideoPoster(f._downloadURL);
        }
        else {
            f.icon = this.files.getIcon(f);
        }
    };
    FilesBroker.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilesBroker.ctorParameters = function () { return [
        { type: Dashboard },
        { type: Broker },
        { type: Files }
    ]; };
    return FilesBroker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Googletranslate = /** @class */ (function () {
    function Googletranslate() {
    }
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} target
     * @param {?} rq
     * @return {?}
     */
    Googletranslate.get = /**
     * @param {?} query
     * @param {?} source
     * @param {?} target
     * @param {?} rq
     * @return {?}
     */
    function (query, source, target, rq) {
        /** @type {?} */
        var sourceLang = this.fixLanguage(source);
        /** @type {?} */
        var targetLang = this.fixLanguage(target);
        if (sourceLang === targetLang) {
            return of(query);
        }
        else {
            /** @type {?} */
            var url = 'businesslogic/translate';
            return rq.post(url, { query: query, sourceLang: sourceLang, targetLang: targetLang }, null, null, null, null, true).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return response || query;
            })));
        }
    };
    /**
     * @param {?} language
     * @return {?}
     */
    Googletranslate.fixLanguage = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        switch (language) {
            case 'us':
                return 'en';
            case 'zhs':
                return 'zh-CN';
            case 'zht':
                return 'zh-TW';
            case 'ua':
                return 'uk';
            case 'kr':
                return 'ko';
            case 'cz':
                return 'cs';
            case 'gr':
                return 'el';
            case 'br':
                return 'pt';
            default:
                return language;
        }
    };
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} rq
     * @return {?}
     */
    Googletranslate.getAll = /**
     * @param {?} query
     * @param {?} source
     * @param {?} rq
     * @return {?}
     */
    function (query, source, rq) {
        var _this = this;
        /** @type {?} */
        var observables = Translate.availablesLanguage
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l !== source; }))
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l !== 'key'; }))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) {
            return _this.get(query, source, l, rq).pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return ({
                language: l,
                value: value || query
            }); })));
        }));
        return forkJoin(observables);
    };
    Googletranslate.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Googletranslate.ctorParameters = function () { return []; };
    return Googletranslate;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HttpCustomInterceptor = /** @class */ (function () {
    function HttpCustomInterceptor(config, network, log) {
        this.config = config;
        this.network = network;
        this.log = log;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpCustomInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        // if (req.url && req.url.indexOf(this.config.serverUrl) >= 0) {
        //     const authReq = req.clone({ headers: req.headers.set('Yoobic-Client-Version', this.coreConfig.getAppVersion()) });
        //     return next.handle(authReq);
        // } else {
        if (this.network.isOffline() && req.url && !req.url.startsWith('./')) {
            this.log.error(req);
        }
        return next.handle(req);
        //}
    };
    HttpCustomInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpCustomInterceptor.ctorParameters = function () { return [
        { type: Config },
        { type: Network },
        { type: Log }
    ]; };
    return HttpCustomInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PlatformService = /** @class */ (function () {
    function PlatformService(coreConfig) {
        this.coreConfig = coreConfig;
        this.data$ = new ReplaySubject(1, 2000);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    PlatformService.prototype.handler = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data) {
            this.data$.next(data);
        }
    };
    /**
     * @param {?=} debug
     * @return {?}
     */
    PlatformService.prototype.onReadyOrResume = /**
     * @param {?=} debug
     * @return {?}
     */
    function (debug) {
        var _this = this;
        if (debug === void 0) { debug = false; }
        if (this.coreConfig.isCordova() && window.Branch) {
            window.Branch.setDebug(debug);
            window.Branch.initSession().then((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.handler(data);
            }));
        }
    };
    PlatformService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PlatformService.ctorParameters = function () { return [
        { type: CoreConfig }
    ]; };
    return PlatformService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Locations = /** @class */ (function () {
    function Locations(geoloc, broker, rq, config, session, network, cache, authentication, googleMaps) {
        this.geoloc = geoloc;
        this.broker = broker;
        this.rq = rq;
        this.config = config;
        this.session = session;
        this.network = network;
        this.cache = cache;
        this.authentication = authentication;
        this.googleMaps = googleMaps;
    }
    /**
     * @param {?} position
     * @param {?=} maxPoints
     * @return {?}
     */
    Locations.prototype.loadMarkers = /**
     * @param {?} position
     * @param {?=} maxPoints
     * @return {?}
     */
    function (position, maxPoints) {
        var _this = this;
        if (maxPoints === void 0) { maxPoints = 5000; }
        position = position || this.geoloc.defaultPosition;
        /** @type {?} */
        var filters = [
            [
                {
                    field: '_geoloc',
                    operator: { _id: 'nearSphere' },
                    value: [position.longitude, position.latitude],
                    max: 40000
                }
            ]
        ];
        return this.broker.getAll('locations', ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return _this.getMarkers(retVal.data);
        })));
    };
    /**
     * @param {?} locations
     * @return {?}
     */
    Locations.prototype.getMarkers = /**
     * @param {?} locations
     * @return {?}
     */
    function (locations) {
        return this.broker.getMarkers(locations);
    };
    /**
     * @param {?} collectionName
     * @param {?=} maxPoints
     * @param {?=} fields
     * @param {?=} filters
     * @param {?=} subQuery
     * @return {?}
     */
    Locations.prototype.getMarkersData = /**
     * @param {?} collectionName
     * @param {?=} maxPoints
     * @param {?=} fields
     * @param {?=} filters
     * @param {?=} subQuery
     * @return {?}
     */
    function (collectionName, maxPoints, fields, filters, subQuery) {
        var _this = this;
        if (maxPoints === void 0) { maxPoints = 5000; }
        return this.broker.getAll(collectionName, fields || ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints, false, subQuery).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var markers = _this.getMarkers(retVal.data);
            /** @type {?} */
            var legendColors = {
                available: 'energized',
                booked: 'info',
                validated: 'success',
                rejected: 'danger',
                tobevalidated: 'royal',
                archived: 'dark'
            };
            return { markers: markers, legendColors: legendColors };
        })));
    };
    /**
     * @return {?}
     */
    Locations.prototype.getLegendColors = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var legendColors = {
            available: 'energized',
            booked: 'info',
            validated: 'success',
            rejected: 'danger',
            tobevalidated: 'royal',
            archived: 'dark'
        };
        return legendColors;
    };
    /**
     * @param {?} locationIds
     * @param {?=} userId
     * @return {?}
     */
    Locations.prototype.getLastVisitDate = /**
     * @param {?} locationIds
     * @param {?=} userId
     * @return {?}
     */
    function (locationIds, userId) {
        /** @type {?} */
        var filters = [[{ field: 'locationRef', operator: { _id: 'inq' }, value: locationIds }, { field: 'ownerRef', operator: { _id: 'eq' }, value: userId || this.session.userId }, { field: 'status', operator: { _id: 'eq' }, value: 'finished' }]];
        /** @type {?} */
        var options = [
            {
                $group: {
                    _id: '$locationRef',
                    finishedDate: { $max: '$finishedDate' },
                    count: { $sum: 1 }
                }
            }
        ];
        return this.broker.aggregateQuery('missions', filters, options, null, null, false, null);
    };
    /**
     * @param {?=} position
     * @return {?}
     */
    Locations.prototype.getStatsAndDistanceTransformAsync = /**
     * @param {?=} position
     * @return {?}
     */
    function (position) {
        var _this = this;
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    if (position) {
                        res.data = _this.calculateDistanceAndKpiData(res, position);
                    }
                    /** @type {?} */
                    var ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    function (location) { return location._id; }));
                    _this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    function (dates) {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        function (location) {
                            /** @type {?} */
                            var date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return d._id === location._id; }));
                            if (date && date.finishedDate) {
                                location.lastVisit = date.finishedDate;
                                location.countVisits = date.count;
                            }
                            observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                            observer.complete();
                        }));
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    };
    /**
     * @return {?}
     */
    Locations.prototype.getDistanceTransform = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.geoloc.getLocation().then((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            return (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return new Observable((/**
                 * @param {?} observer
                 * @return {?}
                 */
                function (observer) {
                    if (res && res.data && res.data.length > 0) {
                        res.data = _this.calculateDistanceAndKpiData(res, position);
                        observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                        observer.complete();
                    }
                    else {
                        observer.next({ count: 0, data: [] });
                        observer.complete();
                    }
                }));
            });
        }));
    };
    /**
     * @param {?} position
     * @return {?}
     */
    Locations.prototype.getDistanceAndLastVisitTransform = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        var _this = this;
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    res.data = _this.calculateDistanceAndKpiData(res, position);
                    /** @type {?} */
                    var ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    function (location) { return location._id; }));
                    _this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    function (dates) {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        function (location) {
                            /** @type {?} */
                            var date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return d._id === location._id; }));
                            if (date && date.finishedDate) {
                                location.lastVisit = date.finishedDate;
                                location.countVisits = date.count;
                            }
                            observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                            observer.complete();
                        }));
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    };
    /**
     * @param {?} res
     * @param {?} position
     * @return {?}
     */
    Locations.prototype.calculateDistanceAndKpiData = /**
     * @param {?} res
     * @param {?} position
     * @return {?}
     */
    function (res, position) {
        var _this = this;
        /** @type {?} */
        var retVal = res.data.map((/**
         * @param {?} location
         * @return {?}
         */
        function (location) {
            if (location._geoloc && position && isNumber(position.latitude) && isNumber(position.longitude)) {
                location.distance = _this.geoloc.getDistance(position.latitude, position.longitude, location._geoloc[1], location._geoloc[0]);
            }
            /** @type {?} */
            var oldKpiData = (/** @type {?} */ (location.kpiData));
            /** @type {?} */
            var kpiData = [];
            if (_this.session.tenant && _this.session.tenant.locationKpis && _this.session.tenant.locationKpis.length > 0) {
                _this.session.tenant.locationKpis.forEach((/**
                 * @param {?} kpi
                 * @return {?}
                 */
                function (kpi) {
                    if (_this.authentication.isAdmin() || (kpi.category === 'healthscore' && _this.authentication.hasRole('healthscore')) || (kpi.category !== 'healthscore' && _this.authentication.hasRole('storeinsights'))) {
                        kpiData.push({
                            category: kpi.category,
                            value: oldKpiData && oldKpiData[kpi.category] ? oldKpiData[kpi.category].value : null,
                            icon: kpi.icon,
                            extraSymbol: kpi.extraSymbol,
                            variation: oldKpiData && oldKpiData[kpi.category] ? oldKpiData[kpi.category].variation : null
                        });
                    }
                }));
            }
            location.kpiData = kpiData;
            return location;
        }));
        //retVal = orderBy(retVal, ['distance']);
        return retVal;
    };
    /**
     * @param {?} aroundMe
     * @param {?} stats
     * @param {?} forceRefresh
     * @return {?}
     */
    Locations.prototype.getAroundMeFilter = /**
     * @param {?} aroundMe
     * @param {?} stats
     * @param {?} forceRefresh
     * @return {?}
     */
    function (aroundMe, stats, forceRefresh) {
        var _this = this;
        /** @type {?} */
        var filters;
        /** @type {?} */
        var sortModel;
        /** @type {?} */
        var mapTransform;
        return this.geoloc.getLocation(forceRefresh).then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            mapTransform = stats ? _this.getStatsAndDistanceTransformAsync(res) : _this.getDistanceAndLastVisitTransform(res);
            if (!aroundMe || !res) {
                filters = [[]];
                sortModel = [{ colId: 'title', sort: 'asc' }];
            }
            else {
                sortModel = [];
                filters = [
                    [
                        {
                            field: '_geoloc',
                            operator: { _id: 'nearSphere' },
                            value: [res.longitude, res.latitude],
                            max: 40000
                        }
                    ]
                ];
            }
            return { filters: filters, sortModel: sortModel, mapTransform: mapTransform, position: res };
        }));
    };
    /**
     * @return {?}
     */
    Locations.prototype.getLocationTypesTransform = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        function (res, search, filters, start, pageSize) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    /** @type {?} */
                    var ids = res.data.map((/**
                     * @param {?} type
                     * @return {?}
                     */
                    function (type) { return type._id; }));
                    _this.getLocationTypesStat(ids).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    function (stats) {
                        res.data.forEach((/**
                         * @param {?} locationType
                         * @return {?}
                         */
                        function (locationType) {
                            /** @type {?} */
                            var stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return s._id === locationType._id; }));
                            /** @type {?} */
                            var count = stat ? stat.count || 0 : 0;
                            locationType.count = count;
                        }));
                        observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                        observer.complete();
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    };
    /**
     * @param {?} locationTypeIds
     * @return {?}
     */
    Locations.prototype.getLocationTypesStat = /**
     * @param {?} locationTypeIds
     * @return {?}
     */
    function (locationTypeIds) {
        /** @type {?} */
        var filters = [[{ field: 'typeRef', operator: { _id: 'inq' }, value: locationTypeIds }]];
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$typeRef'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    count: { $sum: 1 }
                }
            }
        ];
        return this.broker.aggregateQuery('locations', filters, options);
    };
    /**
     * @param {?} locationId
     * @param {?=} nbDays
     * @return {?}
     */
    Locations.prototype.getHealthscore = /**
     * @param {?} locationId
     * @param {?=} nbDays
     * @return {?}
     */
    function (locationId, nbDays) {
        var _this = this;
        if (nbDays === void 0) { nbDays = [7, 30, 90]; }
        if (this.network.isOffline()) {
            return from(this.cache.get(CACHE_KEYS.healthscore, locationId));
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'locations/healthScore?storeId=' + locationId + '&days=[' + nbDays.toString() + ']';
            return this.rq.get(url).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                /** @type {?} */
                var retVal = ret.data ? ret.data : ret;
                _this.cache.add(CACHE_KEYS.healthscore, locationId, retVal);
                return retVal;
            })));
        }
    };
    /**
     * @param {?} userId
     * @return {?}
     */
    Locations.prototype.getUserLocations = /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getUserLocations';
        return this.rq.post(url, { userId: userId });
    };
    Locations.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Locations.ctorParameters = function () { return [
        { type: Smartloc },
        { type: Broker },
        { type: Requestor },
        { type: Config },
        { type: Session },
        { type: Network },
        { type: Cache },
        { type: Authentication },
        { type: Googlemaps }
    ]; };
    return Locations;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//require('yoobic-loopback-node-sdk/client/browserify.bundle');
var Loopback = /** @class */ (function () {
    function Loopback(session) {
        this.session = session;
        this._client = ((/** @type {?} */ (window))).loopbackClient;
        if (this._client) {
            //this._client.setBaseUrl(this._config.apiUrl);
            this._client.setAccessToken(this.session.token);
        }
    }
    Object.defineProperty(Loopback.prototype, "client", {
        get: /**
         * @return {?}
         */
        function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Loopback.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Loopback.ctorParameters = function () { return [
        { type: Session }
    ]; };
    return Loopback;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MISSION_TYPES_NO_ADMIN = ['mission'];
/** @type {?} */
var MISSION_TYPES = ['mission', 'service', 'poll', 'todo', 'lesson'];
//'template',, 'memo'
/** @type {?} */
var MISSION_STATUS = ['booked', 'finished', 'archived', 'scheduled'];
/** @type {?} */
var conditions$2 = {
    isPoll: 'type == "poll"',
    isMission: 'type == "mission"',
    isQuizz: 'quizz == 1',
    isService: 'type == "service"',
    notService: 'not (type == "service")',
    notPollOrService: 'not (type == "service") and not (type == "poll")',
    isPollOrService: 'type=="poll" or type=="service"' //,
    //isUpdate: 'isNullOrEmpty(getAttributeValue("_ect")) == 0'
};
/**
 * @param {?} value
 * @param {?} data
 * @param {?} field
 * @return {?}
 */
function onMissionDescriptionTypeChange(value, data, field) {
    // if (value && (value === 'service' || value === 'poll' || value === 'lesson')) {
    //   setTimeout(() => {
    //     controls.language.setValue(controls.language.getValue() || Translate.currentLanguage);
    //   }, 300);
    // }
    // let groupIndex = formDefinition.findIndex(f => f.name === 'group');
    // let group = formDefinition[groupIndex];
    // if (value === 'service') {
    //   group.title = 'SERVICEGROUPS';
    // } else {
    //   group.title = 'MISSIONGROUPS';
    // }
    // formDefinition[groupIndex] = { ...group };
    // return true;
}
var MissionDescription = /** @class */ (function (_super) {
    __extends(MissionDescription, _super);
    function MissionDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('MissionDescription', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 1
        }),
        __metadata("design:type", String)
    ], MissionDescription.prototype, "_id", void 0);
    __decorate([
        Editable('MissionDescription', {
            type: FormFieldType.autocomplete,
            title: 'TYPE',
            values: MISSION_TYPES,
            //MISSION_TYPES_NO_ADMIN,
            translate: true,
            clearable: false,
            required: true,
            exportOrder: 3,
            filterable: true,
            onChange: onMissionDescriptionTypeChange
        }),
        __metadata("design:type", String)
    ], MissionDescription.prototype, "type", void 0);
    __decorate([
        Editable('MissionDescription', {
            required: true,
            title: 'TITLE',
            sortable: true,
            type: FormFieldType.text,
            exportOrder: 2
        }),
        Searchable('MissionDescription'),
        __metadata("design:type", String)
    ], MissionDescription.prototype, "title", void 0);
    __decorate([
        Editable('MissionDescription', {
            required: true,
            title: 'DESCRIPTION',
            type: FormFieldType.textarea,
            filterable: false,
            sortable: false,
            language: 'html'
        }) //
        ,
        __metadata("design:type", String)
    ], MissionDescription.prototype, "text", void 0);
    __decorate([
        Editable('MissionDescription', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxWidth: 160,
            maxHeight: 160,
            crop: 'circle',
            collectionName: 'files',
            title: 'ICON',
            required: true,
            flex: 50,
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Object)
    ], MissionDescription.prototype, "icon", void 0);
    __decorate([
        Editable('MissionDescription', {
            title: 'CAMPAIGNTAGS',
            filterable: true,
            type: FormFieldType.autocomplete,
            clearable: true,
            tag: true,
            allowCustomTag: true,
            collectionName: 'missiondescriptions',
            multiple: true,
            subQuery: { field: 'descriptionRef', values: '_id' },
            filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
            icon: 'yo-tag',
            secondary: true
        }),
        __metadata("design:type", Array)
    ], MissionDescription.prototype, "tags", void 0);
    MissionDescription = __decorate([
        Model({
            className: 'MissionDescription',
            collectionName: 'missiondescriptions',
            fields: [
                '_ect',
                '_id',
                '_lmt',
                '_tenant',
                '_tenantRef',
                'allowMultiple',
                'allowSameUserValidation',
                'archived',
                'audit',
                'autoRenew',
                'autoRenewOnBooking',
                'background',
                'bookingDuration',
                'category',
                'categoryRef',
                'count',
                'duration',
                'finishedGroups',
                'generateTitle',
                'group',
                'icon',
                'language',
                'locationOptions',
                'missionTags',
                'multiple',
                'notificationemail',
                'notify',
                'notifyBody',
                'notifyScheduledDate',
                'pdfMode',
                'price',
                'priority',
                'public',
                'quizz',
                'quizzMode',
                'recurring',
                'scoring',
                'showAnswers',
                'skipValidation',
                'submittext',
                'successtext',
                'tags',
                'text',
                'title',
                'type',
                'validFrom',
                'validUntil',
                'versionmin',
                'storesQuery'
            ],
            include: ['_tenant'],
            //'category',
            icon: 'yo-campaign'
        })
    ], MissionDescription);
    return MissionDescription;
}(IMissionDescription));
var MissionDescriptionCreate = /** @class */ (function (_super) {
    __extends(MissionDescriptionCreate, _super);
    function MissionDescriptionCreate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('MissionDescriptionCreate', {
            required: true,
            title: 'TITLE',
            sortable: true,
            type: FormFieldType.text,
            exportOrder: 2
        }),
        __metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "title", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            required: true,
            title: 'DESCRIPTION',
            type: FormFieldType.textarea,
            filterable: false,
            sortable: false,
            language: 'html'
        }),
        __metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "text", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxWidth: 160,
            maxHeight: 160,
            crop: 'circle',
            collectionName: 'files',
            title: 'ICON',
            required: true,
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Object)
    ], MissionDescriptionCreate.prototype, "icon", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.autocomplete,
            values: range(1, 5)
        }),
        __metadata("design:type", Object)
    ], MissionDescriptionCreate.prototype, "priority", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: [conditions$2.isMission],
            title: 'AUDIT',
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "audit", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: [conditions$2.isMission],
            title: 'RECURRING',
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "recurring", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: conditions$2.isPoll,
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "allowMultiple", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: conditions$2.isPoll,
            title: 'QUIZZ',
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "quizz", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.autocomplete,
            condition: conditions$2.isQuizz,
            flex: 100,
            title: 'MODE',
            values: ['ALLANSWERSVALID', 'ALLOWUNVALIDANSWERS', 'LIVEANSWERS'],
            translate: true,
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "quizzMode", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: conditions$2.isQuizz,
            flex: 100,
            title: 'SHOWANSWERS',
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "showAnswers", void 0);
    __decorate([
        Editable('MissionDescription', {
            type: FormFieldType.autocomplete,
            required: true,
            condition: conditions$2.isPollOrService,
            title: 'LANGUAGE',
            flex: 100,
            translate: true,
            values: Translate.availablesLanguageAll,
            clearable: false
        }),
        __metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "language", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            title: 'CAMPAIGNTAGS',
            filterable: true,
            type: FormFieldType.autocomplete,
            clearable: true,
            tag: true,
            allowCustomTag: true,
            collectionName: 'missiondescriptions',
            multiple: true,
            subQuery: { field: 'descriptionRef', values: '_id' },
            icon: 'yo-tag',
            secondary: true
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionCreate.prototype, "tags", void 0);
    __decorate([
        Editable('MissionDescriptionCreate', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        __metadata("design:type", Tenant)
    ], MissionDescriptionCreate.prototype, "_tenant", void 0);
    MissionDescriptionCreate = __decorate([
        Model({
            className: 'MissionDescriptionCreate'
        })
    ], MissionDescriptionCreate);
    return MissionDescriptionCreate;
}(IMissionDescription));
var MissionDescriptionSchedule = /** @class */ (function (_super) {
    __extends(MissionDescriptionSchedule, _super);
    function MissionDescriptionSchedule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('MissionDescriptionSchedule', {
            title: 'MISSIONVALIDFROMTOOLTIP',
            type: FormFieldType.datetime,
            condition: conditions$2.notService,
            externalValidators: [{ externalFieldName: 'validUntil', rule: 'lower' }]
        }),
        __metadata("design:type", Date)
    ], MissionDescriptionSchedule.prototype, "validFrom", void 0);
    __decorate([
        Editable('MissionDescriptionSchedule', {
            title: 'MISSIONVALIDUNTILTOOLTIP',
            type: FormFieldType.datetime,
            condition: conditions$2.notService,
            externalValidators: [{ externalFieldName: 'validFrom', rule: 'higher' }]
        }),
        __metadata("design:type", Date)
    ], MissionDescriptionSchedule.prototype, "validUntil", void 0);
    __decorate([
        Editable('MissionDescriptionSchedule', {
            title: 'MISSIONDUEDATE',
            type: FormFieldType.datetime,
            condition: conditions$2.notService
        }),
        __metadata("design:type", Date)
    ], MissionDescriptionSchedule.prototype, "duedate", void 0);
    MissionDescriptionSchedule = __decorate([
        Model({
            className: 'MissionDescriptionSchedule'
        })
    ], MissionDescriptionSchedule);
    return MissionDescriptionSchedule;
}(IMissionDescription));
var MissionDescriptionNotifications = /** @class */ (function (_super) {
    __extends(MissionDescriptionNotifications, _super);
    function MissionDescriptionNotifications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('MissionDescriptionNotifications', {
            type: FormFieldType.toggle,
            condition: conditions$2.notService
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionNotifications.prototype, "notify", void 0);
    __decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'NOTIFICATION',
            required: true,
            condition: 'notify == 1',
            type: FormFieldType.textarea
        }),
        __metadata("design:type", String)
    ], MissionDescriptionNotifications.prototype, "notifyBody", void 0);
    __decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'SCHEDULEDDATE',
            required: false,
            condition: 'notify == 1',
            type: FormFieldType.datetime
        }),
        __metadata("design:type", Date)
    ], MissionDescriptionNotifications.prototype, "notifyScheduledDate", void 0);
    __decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'NOTIFICATIONEMAILS',
            type: FormFieldType.emailreport,
            showUsers: true,
            stateful: false,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionNotifications.prototype, "notificationemail", void 0);
    __decorate([
        Editable('MissionDescriptionNotifications', {
            type: FormFieldType.toggle,
            columnDefinition: { width: 80 },
            suppressExport: true
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionNotifications.prototype, "disableLocationNotificationemail", void 0);
    __decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'PDFEXPORT',
            type: FormFieldType.selectcard,
            translate: true,
            values: [
                { title: 'PDFCLASSIC', description: 'PDFCLASSICDESCRIPTION', value: 'PDFCLASSIC' },
                { title: 'PDFPHOTOREPORT', description: 'PDFPHOTOREPORTDESCRIPTION', value: 'PDFPHOTOREPORT' },
                { title: 'PDFAUDITEXPORTS', description: 'PDFAUDITEXPORTSDESCRIPTION', value: 'PDFAUDITEXPORTS' },
                { title: 'PDFCONTRACT', description: 'PDFCONTRACTDESCRIPTION', value: 'PDFCONTRACT' }
            ],
            filterable: false
        }),
        __metadata("design:type", String)
    ], MissionDescriptionNotifications.prototype, "pdfMode", void 0);
    MissionDescriptionNotifications = __decorate([
        Model({
            className: 'MissionDescriptionNotifications'
        })
    ], MissionDescriptionNotifications);
    return MissionDescriptionNotifications;
}(IMissionDescription));
var MissionDescriptionSettings = /** @class */ (function (_super) {
    __extends(MissionDescriptionSettings, _super);
    function MissionDescriptionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('MissionDescriptionSettings', {
            required: true,
            title: 'MISSIONGROUPS',
            header: 'PERMISSIONS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "group", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            required: false,
            title: 'MISSIONGROUPS',
            type: FormFieldType.autocomplete,
            condition: conditions$2.isService,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "serviceGroups", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            required: false,
            title: 'FINISHEDGROUPS',
            type: FormFieldType.autocomplete,
            condition: [conditions$2.isMission],
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: true
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "finishedGroups", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            multiple: true,
            type: FormFieldType.autocomplete,
            exportOrder: 15,
            values: IRoles,
            translate: true,
            filterableAdvanced: true
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "roles", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            title: 'CATEGORIES',
            type: FormFieldType.autocomplete,
            tag: true,
            collectionName: 'missions',
            multiple: true,
            subQuery: { field: 'descriptionRef', values: '_id' },
            icon: 'yo-flag',
            filterable: false
        }),
        __metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "missionTags", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            header: 'COMPLIANCE',
            type: FormFieldType.toggle,
            title: 'SKIPVALIDATION',
            columnDefinition: { width: 80 },
            filterableAdvanced: true
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "skipValidation", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            type: FormFieldType.toggle,
            title: 'ALLOWSAMEUSERVALIDATION',
            condition: [ROLES_CONDITIONS.isManager, ROLES_CONDITIONS.isAdminOrClientAdmin],
            columnDefinition: { width: 80 },
            filterableAdvanced: true
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "allowSameUserValidation", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            header: 'MISSIONSETTINGS',
            type: FormFieldType.toggle,
            condition: conditions$2.notPollOrService,
            flex: 100
        }),
        __metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "autoRenew", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            type: FormFieldType.toggle,
            condition: [conditions$2.notPollOrService]
        }) //, readonly: conditions.isScheduled
        ,
        __metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "autoRenewOnBooking", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            title: 'CHECK',
            clearable: true,
            type: FormFieldType.selectcard,
            values: [
                { title: 'AVAILABLE', description: 'CHECKAVAILABLE', value: 'CHECKAVAILABLE' },
                { title: 'EXISTING', description: 'CHECKEXISTING', value: 'CHECKEXISTING' }
            ],
            translate: true,
            condition: conditions$2.notPollOrService
        }),
        __metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "locationOptions", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            header: 'MISC',
            required: false,
            title: 'MISSIONDURATION',
            type: FormFieldType.number
        }),
        __metadata("design:type", Number)
    ], MissionDescriptionSettings.prototype, "duration", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            condition: conditions$2.isService,
            title: 'SUBMITTEXT',
            type: FormFieldType.text,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "submittext", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            condition: conditions$2.isService,
            title: 'SUCCESSTEXT',
            type: FormFieldType.text,
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "successtext", void 0);
    __decorate([
        Editable('MissionDescriptionSettings', {
            title: 'VERSIONMIN',
            type: FormFieldType.text,
            sortable: false,
            condition: ROLES_CONDITIONS.isAdmin,
            filterableAdvanced: true
        }),
        __metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "versionmin", void 0);
    MissionDescriptionSettings = __decorate([
        Model({
            className: 'MissionDescriptionSettings'
        })
    ], MissionDescriptionSettings);
    return MissionDescriptionSettings;
}(IMissionDescription));
/** @type {?} */
var scoringConditions = {
    isPercentage: 'isPercentage == 1'
};
var Scoring = /** @class */ (function (_super) {
    __extends(Scoring, _super);
    function Scoring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Scoring', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Scoring.prototype, "title", void 0);
    __decorate([
        Editable('Scoring', { type: FormFieldType.textarea }),
        __metadata("design:type", String)
    ], Scoring.prototype, "description", void 0);
    __decorate([
        Editable('Scoring', {
            title: 'INITIALSCORE',
            type: FormFieldType.number,
            advanced: true,
            condition: ROLES_CONDITIONS.isAdmin
        }),
        __metadata("design:type", Number)
    ], Scoring.prototype, "initialValue", void 0);
    __decorate([
        Editable('Scoring', {
            title: 'MINSCOREFORVALIDATION',
            type: FormFieldType.number,
            advanced: true
        }),
        __metadata("design:type", Number)
    ], Scoring.prototype, "minValue", void 0);
    __decorate([
        Editable('Scoring', {
            type: FormFieldType.checkbox,
            title: 'ISPRIMARYSCORE',
            columnDefinition: { width: 80 }
        }),
        __metadata("design:type", Boolean)
    ], Scoring.prototype, "isActive", void 0);
    __decorate([
        Editable('Scoring', { type: FormFieldType.checkbox, title: 'ISLIVE', columnDefinition: { width: 80 } }),
        __metadata("design:type", Boolean)
    ], Scoring.prototype, "isLive", void 0);
    __decorate([
        Editable('Scoring', {
            type: FormFieldType.checkbox,
            title: 'PERCENTAGE',
            columnDefinition: { width: 80 },
            advanced: true
        }),
        __metadata("design:type", Boolean)
    ], Scoring.prototype, "isPercentage", void 0);
    __decorate([
        Editable('Scoring', {
            title: 'TOTAL',
            type: FormFieldType.number,
            condition: scoringConditions.isPercentage,
            required: true
        }),
        __metadata("design:type", Number)
    ], Scoring.prototype, "percentageBasis", void 0);
    __decorate([
        Editable('Scoring', {
            type: FormFieldType.autocomplete,
            multiple: true,
            title: 'FIELDS',
            displayType: 'formfield'
        }),
        __metadata("design:type", Array)
    ], Scoring.prototype, "selectedFields", void 0);
    Scoring = __decorate([
        Model({ className: 'Scoring' })
    ], Scoring);
    return Scoring;
}(IScoring));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Missiondescriptions = /** @class */ (function () {
    function Missiondescriptions() {
    }
    /*
          Return the transform to extract the fields from a mission description
      */
    /*
            Return the transform to extract the fields from a mission description
        */
    /**
     * @param {?=} types
     * @return {?}
     */
    Missiondescriptions.getFieldTransform = /*
            Return the transform to extract the fields from a mission description
        */
    /**
     * @param {?=} types
     * @return {?}
     */
    function (types) {
        if (types === void 0) { types = []; }
        return Models.getFieldTransform(types);
    };
    /*
          Return the list of slide items fields from a mission description (mobile type)
      */
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Missiondescriptions.getFields = /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (missiondescription, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        return Models.getFields(missiondescription, types, excludedTypes);
    };
    /*
          Return the list of slide items fields from an array of slides (mobile type)
      */
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Missiondescriptions.getFieldsFromSlides = /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (slides, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        return Models.getFieldsFromSlides(slides, types, excludedTypes);
    };
    /*
          Return the list of form field from a mission description. Used in the mission data grid and form
      */
    /*
            Return the list of form field from a mission description. Used in the mission data grid and form
        */
    /**
     * @param {?} missiondescription
     * @param {?} translate
     * @param {?=} includeComments
     * @return {?}
     */
    Missiondescriptions.getFormFields = /*
            Return the list of form field from a mission description. Used in the mission data grid and form
        */
    /**
     * @param {?} missiondescription
     * @param {?} translate
     * @param {?=} includeComments
     * @return {?}
     */
    function (missiondescription, translate, includeComments) {
        if (includeComments === void 0) { includeComments = false; }
        /** @type {?} */
        var mobileFields = Models.getFields(missiondescription, null, ['information']);
        mobileFields = mobileFields.reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        function (previous, current) {
            /** @type {?} */
            var retVal = cloneDeep(current);
            retVal.name += '.value';
            retVal.operators = Models.getFieldOperator(current);
            //retVal.type = Models.getFormFieldFromMobileField(retVal.type);
            previous.push(retVal);
            if (current.allowComments && includeComments) {
                retVal = cloneDeep(current);
                retVal.title = translate.polyglot(retVal.title) + ' .C';
                retVal.name += '.comments';
                retVal.type = FormFieldType.text;
                previous.push(retVal);
            }
            if (current.allowTime && includeComments) {
                retVal = cloneDeep(current);
                retVal.title = translate.polyglot(retVal.title) + ' .T';
                retVal.name += '.time';
                retVal.type = FormFieldType.datetime;
                previous.push(retVal);
            }
            return previous;
        }), []);
        if (missiondescription.type === 'service') {
            mobileFields.unshift({
                name: 'mission.status',
                title: 'STATUS',
                type: FormFieldType.autocomplete,
                translate: true,
                values: uniq(concat(MISSION_STATUS, [undefined])),
                handleUndefined: true,
                columnDefinition: { cellRenderer: 'missionStatusRenderer' },
                operators: Models.getFieldOperator({ type: FormFieldType.autocomplete })
            });
            mobileFields.unshift({
                name: 'mission.creatorDisplayName',
                title: 'REQUESTOR',
                type: FormFieldType.text,
                operators: Models.getFieldOperator({ type: FormFieldType.text })
            });
            mobileFields.unshift({
                name: 'mission._ect',
                title: 'CREATIONDATE',
                type: FormFieldType.datetime,
                operators: Models.getFieldOperator({ type: FormFieldType.datetime })
            });
        }
        if (missiondescription.scoring && missiondescription.scoring.length > 0) {
            forEach(missiondescription.scoring, (/**
             * @param {?} scoring
             * @return {?}
             */
            function (scoring) {
                if (scoring.isActive !== true) {
                    mobileFields.unshift({
                        name: 'extraScores.' + scoring.title + '.value',
                        title: scoring.title,
                        type: FormFieldType.number
                    });
                }
                else {
                    mobileFields.unshift({ name: 'score.value', title: scoring.title, type: FormFieldType.number });
                }
            }));
        }
        return mobileFields;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    Missiondescriptions.encodeScoringValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        }
        else {
            return v;
        }
    };
    Missiondescriptions.decorators = [
        { type: Injectable }
    ];
    return Missiondescriptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Print = /** @class */ (function () {
    function Print(rq, config, authentication, files) {
        this.rq = rq;
        this.config = config;
        this.authentication = authentication;
        this.files = files;
        this.excludedDashboardColumns = ['validated', 'validatedBy', 'owner.username', 'creator.username', 'user.username'];
    }
    /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @param {?=} progress
     * @return {?}
     */
    Print.prototype.printToMapping = /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @param {?=} progress
     * @return {?}
     */
    function (collectionName, columns, query, subQuery, aggregateOptions, type, campaignFields, filename, progress) {
        var _this = this;
        /** @type {?} */
        var publicCollectionName = Models.getPublicCollectionName(collectionName);
        /** @type {?} */
        var url = this.config.publicApiUrl + publicCollectionName + '/export';
        type = type === 'xlsx' ? 'xlsx' : 'csv';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;
        /** @type {?} */
        var exportColumns = sortBy(cloneDeep(columns.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return !c.suppressExport; }))), (/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.exportOrder || 100; })).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (c.field) {
                c.field = c.field.replace(/\?/g, '');
            }
            return c;
        }));
        if (this.authentication.isDashboard()) {
            exportColumns = exportColumns.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.excludedDashboardColumns.indexOf(c.field) < 0; }));
        }
        //let mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName(filename || publicCollectionName) + this.rq.getFilenameSuffix() + '.' + type;
        if (campaignFields && campaignFields.length > 0) {
            /** @type {?} */
            var catalogs = uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.catalog; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.catalog; })));
            if (catalogs.length > 0) ;
            /** @type {?} */
            var collectionNames = compact(uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.autocomplete; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.collectionName; }))));
            if (collectionNames.length > 0) ;
        }
        query = cloneDeep(query);
        delete query.fields;
        return this.rq
            .get(url, false, null, [{ name: 'filter', value: JSON.stringify(query) }, { name: 'type', value: type === 'xlsx' ? 'excel' : 'csv' }]) //r.token
            .toPromise()
            .then((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                function () {
                    return _this.rq.get(_this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    function () {
                        return of({});
                    })));
                })))
                    .pipe(filter$1((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
                    if (progress && s && s.progress) {
                        progress.emit(s.progress * 100);
                    }
                    return s && s.progress === 1;
                })))
                    .pipe(take(1))
                    .toPromise()
                    .then((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var fileUrl = get(res, 'data.output.data.download_url');
                    if (fileUrl) {
                        return downloadFile(fileUrl, filename);
                    }
                }));
            }
        }));
    };
    /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} channel
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @return {?}
     */
    Print.prototype.printToSpreadsheet = /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} channel
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @return {?}
     */
    function (collectionName, columns, query, subQuery, aggregateOptions, channel, type, campaignFields, filename) {
        var _this = this;
        /** @type {?} */
        var url = this.config.apiUrl + 'print/write-spreadsheet';
        /** @type {?} */
        var fixedCollectionName = Models.fixCollectionName(collectionName);
        type = type === 'csv' ? 'csv' : 'xlsx';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;
        /** @type {?} */
        var exportColumns = sortBy(cloneDeep(columns.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return !c.suppressExport; }))), (/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.exportOrder || 100; })).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (c.field) {
                c.field = c.field.replace(/\?/g, '');
            }
            return c;
        }));
        if (this.authentication.isDashboard()) {
            exportColumns = exportColumns.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.excludedDashboardColumns.indexOf(c.field) < 0; }));
        }
        /** @type {?} */
        var mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName(filename || fixedCollectionName) + this.rq.getFilenameSuffix() + '.' + type;
        /** @type {?} */
        var cacheQuery = {};
        if (campaignFields && campaignFields.length > 0) {
            /** @type {?} */
            var catalogs = uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.catalog; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.catalog; })));
            if (catalogs.length > 0) {
                cacheQuery.products = { where: { catalogRef: { inq: catalogs } } };
            }
            /** @type {?} */
            var collectionNames = compact(uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.autocomplete; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.collectionName; }))));
            if (collectionNames.length > 0) {
                cacheQuery.custommodels = { where: { name: { inq: collectionNames } }, cacheKey: 'name' };
            }
        }
        /** @type {?} */
        var body = {
            collectionName: fixedCollectionName,
            columns: exportColumns,
            query: query,
            aggregateOptions: aggregateOptions,
            channel: channel,
            type: type,
            cacheQuery: cacheQuery
        };
        return this.rq.downloadFile(filename, mime, url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
    };
    Print.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Print.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config },
        { type: Authentication },
        { type: Files }
    ]; };
    return Print;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var conditions$3 = {
    isUpdate: 'getAttributeValue("_ect")',
    isCreate: 'not getAttributeValue("_ect")',
    isNotRole: 'not (isRole == 1)'
};
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Group', {
            required: true,
            title: 'ID',
            type: FormFieldType.text,
            readonly: conditions$3.isUpdate,
            forceExport: true,
            exportOrder: 1
        }),
        Searchable('Group'),
        __metadata("design:type", String)
    ], Group.prototype, "_id", void 0);
    __decorate([
        Editable('Group', { required: false, type: FormFieldType.text }),
        Searchable('Group'),
        __metadata("design:type", String)
    ], Group.prototype, "title", void 0);
    __decorate([
        Editable('Group', { required: false, type: FormFieldType.textarea }),
        Searchable('Group'),
        __metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    __decorate([
        Editable('Group', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_GROUP_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            clearable: true,
            fixedPosition: true,
            maxWidth: 160,
            maxHeight: 160,
            crop: 'circle',
            collectionName: 'files',
            title: 'ICON',
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            sortable: false
        }),
        __metadata("design:type", Object)
    ], Group.prototype, "icon", void 0);
    __decorate([
        Editable('Group', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin, conditions$3.isNotRole],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        __metadata("design:type", Tenant)
    ], Group.prototype, "_tenant", void 0);
    __decorate([
        Editable('Group', {
            type: FormFieldType.toggle,
            condition: [conditions$3.isCreate, ROLES_CONDITIONS.isAdmin]
        }),
        __metadata("design:type", Boolean)
    ], Group.prototype, "team", void 0);
    __decorate([
        Editable('Group', {
            title: 'ROLE',
            type: FormFieldType.toggle,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        __metadata("design:type", Boolean)
    ], Group.prototype, "isRole", void 0);
    __decorate([
        Editable('Group', {
            type: FormFieldType.toggle,
            condition: [conditions$3.isCreate, ROLES_CONDITIONS.isAdmin]
        }),
        __metadata("design:type", Boolean)
    ], Group.prototype, "service", void 0);
    __decorate([
        Editable('Group', {
            readonly: true,
            visible: false,
            forceExport: true,
            filterable: false,
            columnDefinition: { name: 'list.length' },
            type: FormFieldType.number,
            exportOrder: 2
        }),
        __metadata("design:type", Object)
    ], Group.prototype, "users", void 0);
    __decorate([
        Editable('Group', {
            readonly: true,
            visible: false,
            forceExport: true,
            filterable: false,
            columnDefinition: { name: 'length' },
            type: FormFieldType.number,
            exportOrder: 3
        }),
        __metadata("design:type", Object)
    ], Group.prototype, "groups", void 0);
    __decorate([
        Editable('Group', {
            name: '_ect',
            title: 'CREATIONDATE',
            type: FormFieldType.date,
            readonly: true
        }),
        __metadata("design:type", Object)
    ], Group.prototype, "_ect", void 0);
    Group = __decorate([
        Model({
            className: 'Group',
            collectionName: 'groups',
            fields: ['*'],
            include: ['_tenant'],
            icon: 'yo-group'
        })
    ], Group);
    return Group;
}(IGroup));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Security = /** @class */ (function () {
    function Security(broker, rq, config) {
        this.broker = broker;
        this.rq = rq;
        this.config = config;
    }
    /**
      Return the list of groups and roles for a specific user
      */
    /**
     * Return the list of groups and roles for a specific user
     * @param {?} userId
     * @return {?}
     */
    Security.prototype.getUserSession = /**
     * Return the list of groups and roles for a specific user
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/getUserSession', { userId: userId });
    };
    /**
      Add the specified users to the group
      */
    /**
     * Add the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    Security.prototype.addGroupUsers = /**
     * Add the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    function (group, users) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $addToSet: { 'users.list': { $each: map$1(users, '_id') } }
            });
        }
        else {
            //not used
            group.users.list = uniq(concat(group.users.list, map$1(users, '_id')));
            return this.broker.create('groups', group);
        }
    };
    /**
      Remove the specified users to the group
      */
    /**
     * Remove the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    Security.prototype.removeGroupUsers = /**
     * Remove the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    function (group, users) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $pullAll: { 'users.list': map$1(users, '_id') }
            });
        }
        else {
            //not used
            group.users.list = uniq(difference(group.users.list, map$1(users, '_id')));
            return this.broker.create('groups', group);
        }
    };
    /**
         Add the specified groups to the group
         */
    /**
     * Add the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    Security.prototype.addGroupGroups = /**
     * Add the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    function (group, groups) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $addToSet: { groups: { $each: map$1(groups, '_id') } }
            });
        }
        else {
            group.groups = uniq(concat(group.groups, map$1(groups, '_id')));
            return this.broker.create('groups', group);
        }
    };
    /**
     Remove the specified groups to the group
     */
    /**
     * Remove the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    Security.prototype.removeGroupGroups = /**
     * Remove the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    function (group, groups) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $pullAll: { groups: map$1(groups, '_id') }
            });
        }
        else {
            group.groups = uniq(difference(group.groups, map$1(groups, '_id')));
            return this.broker.create('groups', group);
        }
    };
    /**
     * @param {?} id
     * @param {?} addedUsers
     * @param {?=} removedUsers
     * @param {?=} addedGroups
     * @param {?=} removedGroups
     * @return {?}
     */
    Security.prototype.updateGroup = /**
     * @param {?} id
     * @param {?} addedUsers
     * @param {?=} removedUsers
     * @param {?=} addedGroups
     * @param {?=} removedGroups
     * @return {?}
     */
    function (id, addedUsers, removedUsers, addedGroups, removedGroups) {
        var _this = this;
        if (removedUsers === void 0) { removedUsers = []; }
        if (addedGroups === void 0) { addedGroups = []; }
        if (removedGroups === void 0) { removedGroups = []; }
        return this.broker
            .patch('groups', {
            _id: id,
            $pullAll: {
                'users.list': map$1(removedUsers, '_id'),
                groups: map$1(removedGroups, '_id')
            }
        })
            .pipe(flatMap((/**
         * @return {?}
         */
        function () {
            return _this.broker.patch('groups', {
                _id: id,
                $addToSet: {
                    'users.list': { $each: map$1(addedUsers, '_id') },
                    groups: { $each: map$1(addedGroups, '_id') }
                }
            });
        })));
    };
    /**
     * @param {?} group
     * @return {?}
     */
    Security.prototype.initGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        group.groups = group.groups || [];
        group.users = group.users || {};
        group.users.list = group.users.list || [];
    };
    /**
          Returns the subquery used in the group's tab user grid
          */
    /**
     * Returns the subquery used in the group's tab user grid
     * @param {?} group
     * @return {?}
     */
    Security.prototype.getGroupUserSubQuery = /**
     * Returns the subquery used in the group's tab user grid
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'users.list'
        };
    };
    /**
      Returns the subquery used in the group's tab sub group grid
      */
    /**
     * Returns the subquery used in the group's tab sub group grid
     * @param {?} group
     * @return {?}
     */
    Security.prototype.getGroupGroupSubQuery = /**
     * Returns the subquery used in the group's tab sub group grid
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'groups'
        };
    };
    /**
     * @param {?} groupIds
     * @param {?=} mode
     * @return {?}
     */
    Security.prototype.getAncestry = /**
     * @param {?} groupIds
     * @param {?=} mode
     * @return {?}
     */
    function (groupIds, mode) {
        if (mode === void 0) { mode = 'descendants'; }
        /** @type {?} */
        var url = this.config.apiUrl + 'groups/getAncestry';
        return this.rq
            .post(url, {
            groupIds: groupIds
        })
            .pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (mode === 'descendants') {
                return uniq([].concat(retVal.descendants || []).concat(groupIds || []));
            }
            else if (mode === 'ancestors') {
                return uniq([].concat(retVal.groups || []).concat(groupIds || []));
            }
            else if (mode === 'both') {
                return uniq([]
                    .concat(retVal.descendants || [])
                    .concat(retVal.groups || [])
                    .concat(groupIds || []));
            }
        })));
    };
    Security.ROLES = ROLES;
    Security.ROLES_ASK = ROLES_ASK;
    Security.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Security.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor },
        { type: Config }
    ]; };
    return Security;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Tenants = /** @class */ (function () {
    function Tenants(rq, broker, config) {
        this.rq = rq;
        this.broker = broker;
        this.config = config;
    }
    /**
     * @param {?} from
     * @param {?} to
     * @param {?=} progress
     * @return {?}
     */
    Tenants.prototype.clone = /**
     * @param {?} from
     * @param {?} to
     * @param {?=} progress
     * @return {?}
     */
    function (from$$1, to, progress) {
        var _this = this;
        return this.rq
            .post(this.broker.getApiUrl() + 'demoManagement/CopyTenantToTenant', {
            copyFromId: from$$1._id,
            copyToId: to._id
        })
            .toPromise()
            .then((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                function () {
                    return _this.rq.get(_this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    function () {
                        return of({});
                    })));
                })))
                    .pipe(filter$1((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
                    if (progress && s && s.progress) {
                        progress.emit(s.progress * 100);
                    }
                    return s && s.progress === 1;
                })))
                    .pipe(take(1))
                    .toPromise()
                    .then((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    /** @type {?} */
                    var errors = get(res, 'data.output.errors');
                    /** @type {?} */
                    var data = get(res, 'data.output.data');
                    return { data: data, errors: errors };
                }));
            }
        }));
    };
    Tenants.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Tenants.ctorParameters = function () { return [
        { type: Requestor },
        { type: Broker },
        { type: Config }
    ]; };
    return Tenants;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Users = /** @class */ (function () {
    function Users(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    Users.prototype.getSimplifiedProfile = /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.broker.getById('user', userId, Users.simplifiedFields);
    };
    /**
     * @return {?}
     */
    Users.prototype.getFreshdeskUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'endpoints/getFreshdeskUrl';
        return this.rq.post(url, { host_url: 'support-mobile.operations.yoobic.com' }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res;
        })));
    };
    /**
     * @param {?} user
     * @param {?} groups
     * @return {?}
     */
    Users.prototype.setAcl = /**
     * @param {?} user
     * @param {?} groups
     * @return {?}
     */
    function (user, groups) {
        this.broker.setAcl(user, groups);
    };
    /**
     * @param {?=} showMe
     * @return {?}
     */
    Users.prototype.getCustomFilterNoAdmin = /**
     * @param {?=} showMe
     * @return {?}
     */
    function (showMe) {
        if (showMe === void 0) { showMe = true; }
        /** @type {?} */
        var ids = Users.adminIds.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return i._id; }));
        if (!showMe) {
            ids.push(this.rq.session.userId);
        }
        return { _id: { nin: ids } };
    };
    /**
     * @param {?} username
     * @return {?}
     */
    Users.prototype.isUsernameTaken = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/isUsernameTaken', { params: { username: username } }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })));
    };
    /**
     * @param {?} locationId
     * @return {?}
     */
    Users.prototype.getUsersByLocation = /**
     * @param {?} locationId
     * @return {?}
     */
    function (locationId) {
        return this.broker.getAll('user', Users.simplifiedFields, null, null, [[{ field: 'locationRef', operator: { _id: 'eq' }, value: locationId }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })));
    };
    /**
     * @param {?} locationId
     * @param {?=} userTags
     * @return {?}
     */
    Users.prototype.getGeofilterUsers = /**
     * @param {?} locationId
     * @param {?=} userTags
     * @return {?}
     */
    function (locationId, userTags) {
        var _this = this;
        /** @type {?} */
        var where = { _id: { inq: [locationId] } };
        /** @type {?} */
        var geofilterQuery = {
            limit: 0,
            fields: ['userRef'],
            subQuery: (/** @type {?} */ ({
                collectionName: 'locations',
                field: 'locationsRef',
                values: '_id',
                where: where
            }))
        };
        return this.broker.getAllQuery('geofilters', geofilterQuery).pipe(mergeMap((/**
         * @param {?} geofilters
         * @return {?}
         */
        function (geofilters) {
            /** @type {?} */
            var userIds = geofilters.data.map((/**
             * @param {?} geofilter
             * @return {?}
             */
            function (geofilter) { return geofilter.userRef; }));
            userIds = uniq(userIds);
            /** @type {?} */
            var userFilter = [[{ field: '_id', operator: { _id: 'inq' }, value: userIds }]];
            if (userTags && userTags.length > 0) {
                userFilter[0].push({ field: 'tags', operator: { _id: 'inq' }, value: userTags });
            }
            return _this.broker.getAll('user', Users.simplifiedFields, null, null, userFilter).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return res.data; })));
        })));
    };
    Users.adminIds = [{ _id: '53fb03c6546847ee0536386a' }];
    Users.simplifiedFields = ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
    Users.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Users.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor }
    ]; };
    return Users;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Version = /** @class */ (function () {
    function Version(config, coreConfig) {
        this.config = config;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} includeServerName
     * @return {?}
     */
    Version.prototype.get = /**
     * @param {?} includeServerName
     * @return {?}
     */
    function (includeServerName) {
        /** @type {?} */
        var retVal;
        /** @type {?} */
        var serverName = this.config.serverName.toUpperCase();
        if (includeServerName && serverName !== 'PRODUCTION') {
            retVal = this.coreConfig.getAppVersion() + ' - ' + serverName;
        }
        else {
            retVal = this.coreConfig.getAppVersion();
        }
        // if (this.coreConfig.isWKWebView()) {
        //   retVal += ' W';
        // }
        return retVal;
    };
    /**
     * @param {?} version
     * @return {?}
     */
    Version.prototype.isCurrentVersionHigherThan = /**
     * @param {?} version
     * @return {?}
     */
    function (version) {
        /** @type {?} */
        var currentVersion = this.coreConfig.getAppVersion();
        if (currentVersion === version) {
            return true;
        }
        /** @type {?} */
        var current = currentVersion.split('.');
        /** @type {?} */
        var required = version.split('.');
        /** @type {?} */
        var len = Math.min(current.length, required.length);
        // loop while the components are equal
        for (var i = 0; i < len; i++) {
            // A bigger than B
            if (parseInt(current[i], null) > parseInt(required[i], null)) {
                return true;
            }
            // B bigger than A
            if (parseInt(current[i], null) < parseInt(required[i], null)) {
                return false;
            }
        }
        // If one's a prefix of the other, the longer one is greater.
        if (current.length > required.length) {
            return true;
        }
        if (current.length < required.length) {
            return false;
        }
        // Otherwise they are the same.
        return true;
    };
    Version.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Version.ctorParameters = function () { return [
        { type: Config },
        { type: CoreConfig }
    ]; };
    return Version;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//declare const System: System;
var Xlsx = /** @class */ (function () {
    // private _xlsx: any;
    // private _papaparse: any;
    function Xlsx() {
    }
    // getXlsx() {
    //     if (this._xlsx) {
    //         return Promise.resolve(this._xlsx);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'xlsx').then((xlsx) => {
    //         this._xlsx = xlsx;
    //         return xlsx;
    //     });
    // }
    // getPapaParse() {
    //     if (this._papaparse) {
    //         return Promise.resolve(this._papaparse);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'papaparse').then((papaparse) => {
    //         this._papaparse = papaparse;
    //         return papaparse;
    //     });
    // }
    // getXlsx() {
    //     if (this._xlsx) {
    //         return Promise.resolve(this._xlsx);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'xlsx').then((xlsx) => {
    //         this._xlsx = xlsx;
    //         return xlsx;
    //     });
    // }
    // getPapaParse() {
    //     if (this._papaparse) {
    //         return Promise.resolve(this._papaparse);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'papaparse').then((papaparse) => {
    //         this._papaparse = papaparse;
    //         return papaparse;
    //     });
    // }
    /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    Xlsx.prototype.readFile = 
    // getXlsx() {
    //     if (this._xlsx) {
    //         return Promise.resolve(this._xlsx);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'xlsx').then((xlsx) => {
    //         this._xlsx = xlsx;
    //         return xlsx;
    //     });
    // }
    // getPapaParse() {
    //     if (this._papaparse) {
    //         return Promise.resolve(this._papaparse);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'papaparse').then((papaparse) => {
    //         this._papaparse = papaparse;
    //         return papaparse;
    //     });
    // }
    /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    function (nativeFile, type, encoding) {
        if (type === void 0) { type = 'blob'; }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                resolve(e.target.result);
            });
            fileReader.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return reject(e); });
            if (type === 'blob') {
                fileReader.readAsDataURL((/** @type {?} */ (nativeFile)));
            }
            else if (type === 'binary') {
                fileReader.readAsBinaryString((/** @type {?} */ (nativeFile)));
            }
            else {
                fileReader.readAsText((/** @type {?} */ (nativeFile)), encoding);
            }
        }));
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Xlsx.prototype.read = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var csv = '';
            if (file.name.endsWith('csv')) {
                csv = data;
            }
            else {
                /** @type {?} */
                var workbook = read$1(data, { type: 'binary' });
                /** @type {?} */
                var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                csv = utils['sheet_to_csv'](worksheet, { FS: ';' });
            }
            /** @type {?} */
            var retVal = parse(csv, { skipEmptyLines: true });
            return retVal.data;
        }));
        //});
        //});
    };
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    Xlsx.prototype.exportToFile = /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    function (content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        var blob = new Blob([content], {
            type: type
        });
        return this.saveBlob(blob, filename);
    };
    /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    Xlsx.prototype.saveBlob = /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    function (blob, filename) {
        ((/** @type {?} */ (saveAs)))(blob, filename);
    };
    /**
     * @param {?} base64
     * @return {?}
     */
    Xlsx.prototype.getBase64MimeType = /**
     * @param {?} base64
     * @return {?}
     */
    function (base64) {
        return base64.split(';')[0].replace('data:', '');
    };
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    Xlsx.prototype.b64toBlob = /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    function (b64Data, contentType, sliceSize) {
        if (contentType === void 0) { contentType = null; }
        if (sliceSize === void 0) { sliceSize = 512; }
        if (!contentType) {
            contentType = this.getBase64MimeType(b64Data);
        }
        b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
        /** @type {?} */
        var byteCharacters = atob(b64Data);
        /** @type {?} */
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            /** @type {?} */
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            /** @type {?} */
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            /** @type {?} */
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        /** @type {?} */
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Xlsx.prototype.readSheets = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var retVal = [];
            if (file.name.endsWith('csv')) {
                retVal.push(parse(data, { skipEmptyLines: true }).data);
            }
            else {
                /** @type {?} */
                var workbook_1 = read$1(data, { type: 'binary' });
                workbook_1.SheetNames.forEach((/**
                 * @param {?} sheet
                 * @return {?}
                 */
                function (sheet) {
                    /** @type {?} */
                    var v = utils['sheet_to_csv'](workbook_1.Sheets[sheet], { FS: ';' });
                    retVal.push(parse(v, { skipEmptyLines: true }).data);
                }));
            }
            return retVal;
        }));
        //});
        //});
    };
    /**
     * @param {?} title
     * @param {?} sheets
     * @return {?}
     */
    Xlsx.prototype.write = /**
     * @param {?} title
     * @param {?} sheets
     * @return {?}
     */
    function (title, sheets) {
        //return this.getXlsx().then((xlsx: any) => {
        /** @type {?} */
        var tables = new Array();
        /** @type {?} */
        var headers = new Array();
        forEach(sheets, (/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var hasHeader = false;
            /** @type {?} */
            var table = [];
            /** @type {?} */
            var header = [];
            forEach(s.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var row = [];
                forEach(s.columns, (/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    if (!((c.visible === false || c.suppressExport === true || c.action) && c.forceExport !== true)) {
                        /** @type {?} */
                        var value_1 = get(d, c.name);
                        if (c.type === 'address') {
                            value_1 = value_1 && value_1.address ? value_1.address : value_1;
                            if (typeof value_1 === 'object') {
                                value_1 = null;
                            }
                        }
                        if (c.type === 'catalog') {
                            delete value_1.valid;
                            /** @type {?} */
                            var retVal_1 = '';
                            keys(value_1).forEach((/**
                             * @param {?} pid
                             * @return {?}
                             */
                            function (pid) {
                                /** @type {?} */
                                var product = find(c.products, (/**
                                 * @param {?} p
                                 * @return {?}
                                 */
                                function (p) {
                                    return p._id === pid;
                                }));
                                if (product) {
                                    retVal_1 += product.reference + ' * ' + value_1[pid] + ',';
                                }
                            }));
                            value_1 = retVal_1; //JSON.stringify(value).replace('{', '').replace('}', '');
                        }
                        if (c.type === 'date' && value_1) {
                            /** @type {?} */
                            var m = toDate(value_1);
                            m = dateAdd(m, 'minutes', getUTCOffset(m));
                            value_1 = m;
                        }
                        if (c.type === 'time' && value_1) {
                            /** @type {?} */
                            var t = toDate(value_1);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value_1 = dateFormat(t, 'HH:mm:ss');
                        }
                        if (c.type === 'datetime' && value_1) {
                            /** @type {?} */
                            var dt = toDate(value_1);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value_1 = dateFormat(dt, 'L LT');
                        }
                        if (c.name === '_acl') {
                            value_1 = value_1.groups.r; //_difference(value.groups.r, roles);
                        }
                        if (value_1 && value_1._downloadURL) {
                            value_1 = value_1._downloadURL;
                        }
                        if (isObject(value_1) && !isDate(value_1) && !isArray(value_1)) {
                            //&& _isEmpty(value)
                            value_1 = null;
                        }
                        row.push(value_1);
                        if (!hasHeader) {
                            header.push(c.displayName || c.name);
                        }
                    }
                }));
                hasHeader = true;
                table.push(row);
            }));
            tables.push(table);
            headers.push(header);
        }));
        /** @type {?} */
        var wb = { SheetNames: [], Sheets: {}, Props: null };
        for (var i = 0; i < tables.length; i++) {
            tables[i].unshift(headers[i]);
            /** @type {?} */
            var wsName = sheets[i].title || 'SheetJs_' + i;
            /** @type {?} */
            var ws = this.sheetFromArrayOfArrays(tables[i]);
            wb.SheetNames.push(wsName);
            wb.Sheets[wsName] = ws;
        }
        /** @type {?} */
        var wbout = write(wb, (/** @type {?} */ ({ bookType: 'xlsx', bookSST: true, type: 'binary' })));
        /** @type {?} */
        var filename = title + '-' + dateFormat(new Date(), 'YYYY-MM-DDTHH:MM') + '.xlsx';
        this.exportToFile(this.s2ab(wbout), 'application/octet-stream', '', filename);
        //});
    };
    /**
     * @private
     * @param {?} v
     * @param {?=} date1904
     * @return {?}
     */
    Xlsx.prototype.datenum = /**
     * @private
     * @param {?} v
     * @param {?=} date1904
     * @return {?}
     */
    function (v, date1904) {
        if (date1904) {
            v += 1462;
        }
        /** @type {?} */
        var epoch = Date.parse(v);
        return (epoch - (/** @type {?} */ (new Date(Date.UTC(1899, 11, 30))))) / (24 * 60 * 60 * 1000);
    };
    /**
     * @private
     * @param {?} data
     * @param {?=} opts
     * @return {?}
     */
    Xlsx.prototype.sheetFromArrayOfArrays = /**
     * @private
     * @param {?} data
     * @param {?=} opts
     * @return {?}
     */
    function (data, opts) {
        /** @type {?} */
        var ws = {};
        /** @type {?} */
        var range$$1 = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (var R = 0; R !== data.length; ++R) {
            for (var C = 0; C !== data[R].length; ++C) {
                if (range$$1.s.r > R) {
                    range$$1.s.r = R;
                }
                if (range$$1.s.c > C) {
                    range$$1.s.c = C;
                }
                if (range$$1.e.r < R) {
                    range$$1.e.r = R;
                }
                if (range$$1.e.c < C) {
                    range$$1.e.c = C;
                }
                /** @type {?} */
                var cell = {
                    v: data[R][C]
                };
                if (cell.v === null) {
                    continue;
                }
                /** @type {?} */
                var cellRef = utils.encode_cell({ c: C, r: R });
                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                }
                else if (typeof cell.v === 'boolean') {
                    cell.t = 'b';
                }
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = ((/** @type {?} */ (SSF)))._table[14];
                    cell.v = this.datenum(cell.v);
                }
                else if (isArray(cell.v) && cell.v.length > 0 && isNumber(cell.v[0])) {
                    cell.t = 's';
                    cell.v = '[' + cell.v.join(',') + ']';
                }
                else if (isArray(cell.v) && cell.v.length > 0 && !isNumber(cell.v[0])) {
                    cell.t = 's';
                    cell.v = cell.v.join(',');
                }
                else if (isArray(cell.v) && cell.v.length === 0) {
                    cell.t = 's';
                    cell.v = '';
                }
                else {
                    cell.t = 's';
                }
                ws[cellRef] = cell;
            }
        }
        if (range$$1.s.c < 10000000) {
            ws['!ref'] = utils.encode_range(range$$1.s, range$$1.e);
        }
        return ws;
    };
    /**
     * @private
     * @param {?} s
     * @return {?}
     */
    Xlsx.prototype.s2ab = /**
     * @private
     * @param {?} s
     * @return {?}
     */
    function (s) {
        /** @type {?} */
        var buf = new ArrayBuffer(s.length);
        /** @type {?} */
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };
    Xlsx.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Xlsx.ctorParameters = function () { return []; };
    return Xlsx;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    FilterPipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        //value: array of values to filter
        //args[0]: string to match
        //args[1]: list of fields to use to compare
        //args[2]: not sure? seems to exlude if false
        //args[3]: use translation
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!args || !args[0]) {
            //&& !args[1]
            return value;
        }
        else if (value) {
            /** @type {?} */
            var translate_1 = args[3];
            return value.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (typeof item === 'string') {
                    return (item &&
                        _this.getStringToTest(item, translate_1)
                            .toLowerCase()
                            .indexOf(args[0].toLowerCase()) >= 0);
                }
                /** @type {?} */
                var keys$$1 = args[1] || keys(item);
                keys$$1 = [].concat(keys$$1);
                /** @type {?} */
                var retVal = false;
                for (var i = 0; i < keys$$1.length; i++) {
                    /** @type {?} */
                    var key = keys$$1[i];
                    if (args[0] && args[0].toLowerCase) {
                        if (typeof item[key] === 'string' || item[key] instanceof String) {
                            /** @type {?} */
                            var index = _this.getStringToTest(item[key], translate_1)
                                .toLowerCase()
                                .indexOf(args[0].toLowerCase());
                            retVal = retVal || (args[2] === false ? index < 0 : index >= 0);
                        }
                    }
                    else if (!args[0] && args[1]) {
                        /** @type {?} */
                        var bool = item.hasOwnProperty(key) && !isBlank(item[key]);
                        retVal = retVal || (args[2] === false ? !bool : bool);
                    }
                }
                return retVal;
            }));
        }
    };
    /**
     * @param {?} s
     * @param {?} translate
     * @return {?}
     */
    FilterPipe.prototype.getStringToTest = /**
     * @param {?} s
     * @param {?} translate
     * @return {?}
     */
    function (s, translate) {
        if (translate && this.translate) {
            return this.translate.get(s.toString().toUpperCase());
        }
        else {
            return s;
        }
    };
    FilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'filter' },] }
    ];
    /** @nocollapse */
    FilterPipe.ctorParameters = function () { return [
        { type: Translate }
    ]; };
    return FilterPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var SERVICES = [
    Algorithms,
    Authentication,
    AuthenticationGuard,
    BackupService,
    Box,
    Blog,
    Broker,
    CanDeactivateGuard,
    Cache,
    Config,
    CurrentSessionResolver,
    Dashboard,
    Files,
    FilesBroker,
    Googlemaps,
    Googletranslate,
    HttpCustomInterceptor,
    PlatformService,
    LoadingBar,
    Locations,
    Loopback,
    Missiondescriptions,
    Models,
    Print,
    Push$1,
    Requestor,
    Security,
    Session,
    Smartloc,
    Tenants,
    Unsplash,
    Users,
    Version,
    Workplace,
    Xlsx
];
/** @type {?} */
var PIPES = [FilterPipe];
var DataCoreModule = /** @class */ (function () {
    function DataCoreModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    DataCoreModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: DataCoreModule,
            providers: __spread(SERVICES, configuredProviders, [
                FileTransfer,
                DocumentViewer,
                Device,
                FileOpener,
                OneSignal,
                Push,
                File,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpCustomInterceptor,
                    deps: [Config, Network, Log],
                    multi: true
                }
            ])
        };
    };
    DataCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: __spread(PIPES),
                    imports: [CommonModule, TranslateModule, HttpClientModule],
                    exports: __spread([CommonModule, TranslateModule, HttpClientModule], PIPES)
                },] }
    ];
    return DataCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AggregateLog = /** @class */ (function (_super) {
    __extends(AggregateLog, _super);
    function AggregateLog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregateLog = __decorate([
        Model({
            className: 'AggregateLog',
            collectionName: 'aggregateLogs',
            fields: ['*'],
            include: []
        })
    ], AggregateLog);
    return AggregateLog;
}(IAggregateLog));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Algorithm = /** @class */ (function (_super) {
    __extends(Algorithm, _super);
    function Algorithm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Algorithm', { required: true, type: FormFieldType.text }),
        Searchable('Algorithm'),
        __metadata("design:type", String)
    ], Algorithm.prototype, "name", void 0);
    Algorithm = __decorate([
        Model({
            className: 'Algorithm',
            collectionName: 'algorithm',
            fields: ['name', '_id', 'stitch'],
            include: []
        })
    ], Algorithm);
    return Algorithm;
}(IAlgorithm));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutorenewConfig = /** @class */ (function (_super) {
    __extends(AutorenewConfig, _super);
    function AutorenewConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('AutorenewConfig', { required: true, type: FormFieldType.text }),
        Searchable('AutorenewConfig'),
        __metadata("design:type", String)
    ], AutorenewConfig.prototype, "title", void 0);
    __decorate([
        Editable('AutorenewConfig', {
            required: true,
            title: 'PREFIX',
            type: FormFieldType.text,
            flex: 50
        }),
        Searchable('AutorenewConfig'),
        __metadata("design:type", String)
    ], AutorenewConfig.prototype, "prefix_title", void 0);
    __decorate([
        Editable('AutorenewConfig', {
            type: FormFieldType.autocomplete,
            translate: true,
            values: range(1, 5),
            flex: 50,
            clearable: true,
            icon: 'yo-flag'
        }),
        __metadata("design:type", Number)
    ], AutorenewConfig.prototype, "priority", void 0);
    __decorate([
        Editable('AutorenewConfig', {
            type: FormFieldType.autocomplete,
            title: 'SOURCE',
            collectionName: 'missiondescriptions',
            required: false,
            columnDefinition: { name: 'title' },
            icon: 'yo-list2',
            filterable: false,
            sortable: false,
            filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
            hiddenFields: ['archived']
        }),
        __metadata("design:type", MissionDescription)
    ], AutorenewConfig.prototype, "descriptionSource", void 0);
    __decorate([
        Editable('AutorenewConfig', {
            type: FormFieldType.autocomplete,
            title: 'TARGET',
            collectionName: 'missiondescriptions',
            required: false,
            columnDefinition: { name: 'title' },
            icon: 'yo-list2',
            filterable: false,
            sortable: false,
            filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
            hiddenFields: ['archived']
        }),
        __metadata("design:type", MissionDescription)
    ], AutorenewConfig.prototype, "descriptionTarget", void 0);
    __decorate([
        Editable('AutorenewConfig', { type: FormFieldType.toggle }),
        Searchable('AutorenewConfig'),
        __metadata("design:type", Boolean)
    ], AutorenewConfig.prototype, "active", void 0);
    AutorenewConfig = __decorate([
        Model({
            className: 'AutorenewConfig',
            collectionName: 'autorenewConfig',
            fields: ['*'],
            include: ['descriptionSource', 'descriptionTarget']
        })
    ], AutorenewConfig);
    return AutorenewConfig;
}(IAutorenewConfig));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Backup = /** @class */ (function (_super) {
    __extends(Backup, _super);
    function Backup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Backup', { required: false, type: FormFieldType.date }),
        __metadata("design:type", Date)
    ], Backup.prototype, "date", void 0);
    __decorate([
        Editable('Backup', { required: true, type: FormFieldType.autocomplete, clearable: true }),
        __metadata("design:type", Object)
    ], Backup.prototype, "backup", void 0);
    __decorate([
        Editable('Backup', {
            required: false,
            type: FormFieldType.autocomplete,
            clearable: true,
            multiple: true,
            values: ['missions', 'missiondescription', 'missiondatas', 'user', 'locations', 'locationtypes', 'missiondatas', 'photos']
        }),
        __metadata("design:type", Array)
    ], Backup.prototype, "collections", void 0);
    Backup = __decorate([
        Model({
            className: 'Backup',
            fields: ['*'],
            include: []
        })
    ], Backup);
    return Backup;
}(IBackup));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Catalog = /** @class */ (function (_super) {
    __extends(Catalog, _super);
    function Catalog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Catalog', { required: true, type: FormFieldType.text }),
        Searchable('Catalog'),
        __metadata("design:type", String)
    ], Catalog.prototype, "title", void 0);
    __decorate([
        Editable('Catalog', {
            type: FormFieldType.autocomplete,
            maxWidth: 600,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxHeight: 300,
            crop: 'square',
            collectionName: 'files',
            title: 'PHOTO',
            required: true,
            columnDefinition: { name: '_downloadURL' }
        }),
        __metadata("design:type", Object)
    ], Catalog.prototype, "image", void 0);
    __decorate([
        Editable('Catalog', { type: FormFieldType.textarea }),
        __metadata("design:type", String)
    ], Catalog.prototype, "description", void 0);
    __decorate([
        Editable('Catalog', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false,
            required: true
        }),
        __metadata("design:type", String)
    ], Catalog.prototype, "group", void 0);
    Catalog = __decorate([
        Model({
            className: 'Catalog',
            collectionName: 'catalogs',
            fields: ['*'],
            include: [],
            icon: 'yo-catalogue'
        })
    ], Catalog);
    return Catalog;
}(ICatalog));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CHART_TYPES = ['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'radar', 'pie', 'doughnut', 'treemap'];
/** @type {?} */
var CHART_DATEGROUPINGBY = ['year', 'month', 'week', 'day', 'calendar'];
/** @type {?} */
var CHART_SHOW_AS = ['chart', 'grid', 'map', 'micro'];
/** @type {?} */
var CHART_DATETIMEFORMAT = ['d', 'dd', 'DD', 'w', 'MMM'];
/** @type {?} */
var CHART_TIMESCALE = ['last7days', 'lastweek', 'last30days', 'lastmonth', 'last90days', 'lastquarter', 'last365days', 'lastyear'];
/** @type {?} */
var conditions$4 = {
    showAsChart: 'showAs=="chart"',
    isMissionOrMissionData: 'collectionName=="missions" or collectionName=="missiondatas"',
    isMissionData: 'collectionName=="missiondatas"',
    isMission: 'collectionName=="missions"',
    groupByDate: 'groupByDate == 1'
};
/**
 * @param {?} missionfields
 * @param {?} data
 * @return {?}
 */
function onChartMissionFieldsChange(missionfields, data) {
    if (missionfields && missionfields.selectedDescription) {
        if (!data.title) {
            data.title = missionfields.selectedDescription.title;
        }
    }
}
var ChartDefinition = /** @class */ (function (_super) {
    __extends(ChartDefinition, _super);
    function ChartDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('ChartDefinition', {
            title: 'QUERYON',
            type: FormFieldType.autocomplete,
            translate: true,
            values: ['missions', 'missiondatas', 'custom'],
            clearable: false,
            required: true,
            autoselect: true
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "collectionName", void 0);
    __decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.missionfield,
            condition: conditions$4.isMissionData,
            title: 'CAMPAIGN',
            required: true,
            onChange: onChartMissionFieldsChange
        }),
        __metadata("design:type", Object)
    ], ChartDefinition.prototype, "missionfields", void 0);
    __decorate([
        Editable('ChartDefinition', { required: true, type: FormFieldType.text }),
        Searchable('ChartDefinition'),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "title", void 0);
    __decorate([
        Editable('ChartDefinition', { required: false, type: FormFieldType.textarea }),
        Searchable('ChartDefinition'),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "description", void 0);
    __decorate([
        Editable('ChartDefinition', {
            title: 'SHOWAS',
            type: FormFieldType.autocomplete,
            flex: 33,
            values: CHART_SHOW_AS
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "showAs", void 0);
    __decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.autocomplete,
            values: CHART_TYPES,
            flex: 33,
            condition: conditions$4.showAsChart,
            translate: true,
            clearable: false
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "type", void 0);
    __decorate([
        Editable('ChartDefinition', {
            title: 'PALETTE',
            type: FormFieldType.autocomplete,
            flex: 34,
            condition: conditions$4.showAsChart,
            translate: true,
            values: ['palette0', 'palette1', 'palette2', 'palette3'],
            clearable: false,
            autoselect: true
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "palette", void 0);
    __decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.checkbox,
            flex: 34,
            condition: conditions$4.isMissionOrMissionData
        }),
        __metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "groupByDate", void 0);
    __decorate([
        Editable('ChartDefinition', {
            title: 'DATETIMEFORMAT',
            type: FormFieldType.autocomplete,
            flex: 33,
            tag: true,
            condition: conditions$4.groupByDate,
            values: CHART_DATETIMEFORMAT,
            clearable: true
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "datetimeFormat", void 0);
    __decorate([
        Editable('ChartDefinition', {
            title: 'TIMESCALE',
            type: FormFieldType.autocomplete,
            flex: 33,
            condition: conditions$4.groupByDate,
            values: CHART_TIMESCALE
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "timescale", void 0);
    __decorate([
        Editable('ChartDefinition', {
            title: 'GROUPBY',
            type: FormFieldType.autocomplete,
            translate: true,
            flex: 34,
            values: CHART_DATEGROUPINGBY,
            condition: conditions$4.groupByDate,
            clearable: false
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "dateGrouping", void 0);
    __decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.checkbox,
            flex: 33,
            condition: conditions$4.isMission
        }),
        __metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "groupByTag", void 0);
    __decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.checkbox,
            flex: 33,
            condition: conditions$4.isMission
        }),
        __metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "groupByCampaign", void 0);
    __decorate([
        Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox }),
        __metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "showLegend", void 0);
    __decorate([
        Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox }),
        __metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "showValues", void 0);
    __decorate([
        Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox }),
        __metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "colorByPoint", void 0);
    __decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.autocomplete,
            flex: 34,
            values: ['normal', 'percent'],
            clearable: true
        }),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "stacked", void 0);
    __decorate([
        Editable('ChartDefinition', { required: false, type: FormFieldType.textarea }),
        Searchable('ChartDefinition'),
        __metadata("design:type", String)
    ], ChartDefinition.prototype, "custom", void 0);
    ChartDefinition = __decorate([
        Model({
            className: 'ChartDefinition',
            collectionName: 'chartdefinitions',
            fields: ['*'],
            include: []
        })
    ], ChartDefinition);
    return ChartDefinition;
}(IChartDefinition));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Currency = /** @class */ (function () {
    function Currency() {
    }
    __decorate([
        Editable('Currency', {
            required: true,
            type: FormFieldType.autocomplete,
            title: 'LANGUAGE',
            translate: true,
            values: Translate.availablesLanguage,
            clearable: false
        }),
        Searchable('Currency'),
        __metadata("design:type", String)
    ], Currency.prototype, "currency", void 0);
    __decorate([
        Editable('Currency', { required: true, type: FormFieldType.text }),
        Searchable('Currency'),
        __metadata("design:type", String)
    ], Currency.prototype, "symbol", void 0);
    __decorate([
        Editable('Currency', { required: true, type: FormFieldType.number, title: 'RATE1' }),
        Searchable('Currency'),
        __metadata("design:type", Number)
    ], Currency.prototype, "rate", void 0);
    Currency = __decorate([
        Model({
            className: 'Currency',
            collectionName: 'currencies',
            fields: ['*'],
            include: []
        })
    ], Currency);
    return Currency;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Dashboard$1 = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Dashboard', { required: true, type: FormFieldType.text, sortable: true }),
        Searchable('Dashboard'),
        __metadata("design:type", String)
    ], Dashboard.prototype, "title", void 0);
    __decorate([
        Editable('Dashboard', { required: false, type: FormFieldType.textarea }),
        Searchable('Dashboard'),
        __metadata("design:type", String)
    ], Dashboard.prototype, "description", void 0);
    __decorate([
        Editable('Dashboard', {
            name: '_lmt',
            title: 'DATE',
            type: FormFieldType.datetime,
            readonly: true,
            sortable: true,
            filterableAdvanced: true,
            advanced: true
        }),
        __metadata("design:type", Object)
    ], Dashboard.prototype, "_lmt", void 0);
    __decorate([
        Editable('Dashboard', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            collectionName: 'tenants',
            columnDefinition: { name: 'name' },
            multiple: false,
            filterable: true,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        __metadata("design:type", Tenant)
    ], Dashboard.prototype, "_tenant", void 0);
    Dashboard = __decorate([
        Model({
            className: 'Dashboard',
            collectionName: 'dashboards',
            fields: ['*'],
            include: []
        })
    ], Dashboard);
    return Dashboard;
}(IDashboard));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Entity = /** @class */ (function () {
    function Entity(source) {
        if (typeof source === 'string' || typeof source === 'number' || typeof source === 'boolean' || typeof source === 'undefined') {
            this._id = source;
        }
    }
    return Entity;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} doc
 * @param {?} data
 * @return {?}
 */
function onUrlChange(doc, data) {
    if (doc && doc.name) {
        data._filename = doc.name;
    }
    if (doc && doc.size) {
        data.size = doc.size;
    }
    if (doc && doc.type) {
        data.mimeType = doc.type;
    }
}
var File$1 = /** @class */ (function (_super) {
    __extends(File$$1, _super);
    function File$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('File', {
            name: '_ect',
            title: 'CREATIONDATE',
            type: FormFieldType.date,
            readonly: true,
            sortable: true,
            exportOrder: 21,
            filterableAdvanced: true
        }),
        __metadata("design:type", Object)
    ], File$$1.prototype, "_ect", void 0);
    __decorate([
        Editable('File', {
            type: FormFieldType.documentuploader,
            filterable: false,
            required: true,
            title: 'DOCUMENT',
            columnDefinition: { width: 52 },
            onChange: onUrlChange
        }),
        __metadata("design:type", String)
    ], File$$1.prototype, "_downloadURL", void 0);
    __decorate([
        Editable('File', { title: 'TITLE', required: true, type: FormFieldType.text, sortable: true }),
        Searchable('File'),
        __metadata("design:type", String)
    ], File$$1.prototype, "_filename", void 0);
    __decorate([
        Editable('File', { visible: false, type: FormFieldType.number, sortable: true }),
        __metadata("design:type", Number)
    ], File$$1.prototype, "size", void 0);
    __decorate([
        Editable('File', { visible: false, type: FormFieldType.autocomplete, filterable: true }),
        Searchable('File'),
        __metadata("design:type", String)
    ], File$$1.prototype, "mimeType", void 0);
    __decorate([
        Editable('File', { type: FormFieldType.toggle, columnDefinition: { width: 80 } }),
        __metadata("design:type", Boolean)
    ], File$$1.prototype, "hideMobile", void 0);
    __decorate([
        Editable('File', {
            required: true,
            name: 'group',
            columnDefinition: { name: 'group', forceName: true },
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false
        }),
        __metadata("design:type", Object)
    ], File$$1.prototype, "group", void 0);
    __decorate([
        Editable('File', {
            type: FormFieldType.autocomplete,
            tag: true,
            allowCustomTag: true,
            collectionName: 'files',
            multiple: true,
            icon: 'yo-flag',
            subQuery: { field: 'fileRef', values: '_id' }
        }),
        Searchable('File'),
        __metadata("design:type", Array)
    ], File$$1.prototype, "tags", void 0);
    __decorate([
        Editable('File', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            collectionName: 'tenants',
            columnDefinition: { name: 'name' },
            multiple: false,
            filterable: true,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        __metadata("design:type", Tenant)
    ], File$$1.prototype, "_tenant", void 0);
    File$$1 = __decorate([
        Model({
            className: 'File',
            collectionName: 'files',
            fields: ['*'],
            include: ['container'],
            icon: 'yo-file'
        })
    ], File$$1);
    return File$$1;
}(IFile));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Folder = /** @class */ (function (_super) {
    __extends(Folder, _super);
    function Folder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Folder', { title: 'TITLE', required: true, type: FormFieldType.text }),
        Searchable('Folder'),
        __metadata("design:type", String)
    ], Folder.prototype, "name", void 0);
    __decorate([
        Editable('Folder', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false,
            required: true
        }),
        __metadata("design:type", String)
    ], Folder.prototype, "group", void 0);
    Folder = __decorate([
        Model({
            className: 'Folder',
            collectionName: 'folders',
            fields: ['*'],
            include: ['container'],
            icon: 'yo-folder'
        })
    ], Folder);
    return Folder;
}(IFolder));
var FileOrFolder = /** @class */ (function (_super) {
    __extends(FileOrFolder, _super);
    function FileOrFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Searchable('FileOrFolder'),
        __metadata("design:type", String)
    ], FileOrFolder.prototype, "name", void 0);
    __decorate([
        Searchable('FileOrFolder'),
        __metadata("design:type", String)
    ], FileOrFolder.prototype, "_filename", void 0);
    __decorate([
        Searchable('FileOrFolder'),
        __metadata("design:type", String)
    ], FileOrFolder.prototype, "mimeType", void 0);
    FileOrFolder = __decorate([
        Model({
            className: 'FileOrFolder',
            collectionName: 'filesFolders',
            fields: ['*'],
            include: ['container']
        })
    ], FileOrFolder);
    return FileOrFolder;
}(IFileOrFolder));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} timescale
 * @param {?=} endDate
 * @param {?=} amount
 * @param {?=} notsliding
 * @return {?}
 */
function getStartAndEndDates$1(timescale, endDate, amount, notsliding) {
    /** @type {?} */
    var lastDate = endDate ? toDate(endDate) : new Date();
    amount = amount || 7;
    /** @type {?} */
    var period = 'days';
    /** @type {?} */
    var startof = 'day';
    switch (timescale) {
        case 'last30days':
            amount = 30;
            period = 'days';
            break;
        case 'last90days':
            amount = 90;
            period = 'days';
            break;
        case 'last365days':
            amount = 365;
            period = 'days';
            break;
        case 'lastweek':
            amount = 0;
            period = 'weeks';
            break;
        case 'lastmonth':
            amount = 0;
            period = 'months';
            startof = 'month';
            break;
        case 'lastquarter':
            amount = 2;
            period = 'months';
            startof = 'month';
            break;
        case 'lastyear':
            amount = 0;
            period = 'years';
            startof = 'year';
            break;
        case 'last7days':
            amount = 7;
            period = 'days';
            startof = 'day';
            break;
        default:
            if (notsliding) {
                amount = amount ? amount - 1 : 0;
                period = timescale;
                startof = timescale;
            }
            else {
                amount = amount || 1;
                period = timescale;
                startof = 'day';
            }
            break;
    }
    //use .utc() to get the startOf with no offset issues
    return [startOf(dateAdd(utc(lastDate), period, -amount), startof).toISOString(), lastDate.toISOString()];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BaseKpi = /** @class */ (function (_super) {
    __extends(BaseKpi, _super);
    function BaseKpi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} kpi
     * @param {?} cd
     * @param {?} translate
     * @return {?}
     */
    BaseKpi.getChartDefinition = /**
     * @param {?} kpi
     * @param {?} cd
     * @param {?} translate
     * @return {?}
     */
    function (kpi, cd, translate) {
        merge(cd, {
            description: kpi.description,
            title: kpi.title,
            showAs: kpi.showAs || cd.showAs || 'chart',
            showValues: kpi.showValues,
            showLegend: kpi.showLegend === false ? false : true,
            legendValue: kpi.accumulator
        });
        if (kpi && kpi.groupBySlider) {
            switch (kpi.groupBySlider.toString()) {
                case 'day':
                    cd.dateGrouping = 'hour';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 1,
                        timescale: 'day'
                    };
                    break;
                case 'week':
                    cd.dateGrouping = 'day';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 1,
                        timescale: 'week'
                    };
                    break;
                case 'month':
                    cd.dateGrouping = 'week';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 4,
                        timescale: 'week'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
                case '3months':
                    cd.dateGrouping = 'week';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 3,
                        timescale: 'month'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
                case '6months':
                    cd.dateGrouping = 'month';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 6,
                        timescale: 'month'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
                case 'year':
                    cd.dateGrouping = 'month';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 1,
                        timescale: 'year'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
            }
        }
    };
    /**
     * @param {?} groupBy
     * @return {?}
     */
    BaseKpi.getDateFormat = /**
     * @param {?} groupBy
     * @return {?}
     */
    function (groupBy) {
        /** @type {?} */
        var format = '%Y-%m-%d';
        if (groupBy && groupBy.toString) {
            switch (groupBy.toString()) {
                case 'day':
                    format = '%Y-%m-%d %H:00';
                    break;
                case 'week':
                    format = '%Y-%m-%d';
                    break;
                case 'month':
                    format = '%G-%V';
                    break;
                case '3months':
                    format = '%G-%V';
                    break;
                case '6months':
                    format = '%Y-%m';
                    break;
                case 'year':
                case '2':
                    format = '%Y-%m';
                    break;
            }
        }
        return format;
    };
    /**
     * @param {?} kpi
     * @param {?=} showPreviousYear
     * @return {?}
     */
    BaseKpi.getDates = /**
     * @param {?} kpi
     * @param {?=} showPreviousYear
     * @return {?}
     */
    function (kpi, showPreviousYear) {
        /** @type {?} */
        var retVal = {};
        if (kpi.dates) {
            if (kpi.dates.mode === 'calendar') {
                if (kpi.dates.startDate) {
                    retVal.startDate = kpi.dates.startDate;
                }
                if (kpi.dates.endDate) {
                    retVal.endDate = kpi.dates.endDate;
                }
            }
            if (kpi.dates.mode === 'dynamic') {
                /** @type {?} */
                var dates = this.getStartAndEndDates(kpi.dates.timescale, null, kpi.dates.amount, kpi.dates.notsliding);
                retVal.startDate = dates[0];
                retVal.endDate = dates[1];
            }
        }
        if (showPreviousYear) {
            if (retVal.startDate) {
                retVal.startDate = dateAdd(retVal.startDate, 'years', -1).toISOString();
            }
            if (retVal.endDate) {
                retVal.endDate = dateAdd(retVal.endDate, 'years', -1).toISOString();
            }
        }
        return retVal;
    };
    /**
     * @param {?} timescale
     * @param {?=} endDate
     * @param {?=} amount
     * @param {?=} notsliding
     * @return {?}
     */
    BaseKpi.getStartAndEndDates = /**
     * @param {?} timescale
     * @param {?=} endDate
     * @param {?=} amount
     * @param {?=} notsliding
     * @return {?}
     */
    function (timescale, endDate, amount, notsliding) {
        return getStartAndEndDates$1(timescale, endDate, amount, notsliding);
    };
    /**
     * @param {?} cd
     * @param {?} date
     * @return {?}
     */
    BaseKpi.fixDates = /**
     * @param {?} cd
     * @param {?} date
     * @return {?}
     */
    function (cd, date) {
        /** @type {?} */
        var retVal;
        if (!date) {
            return new Date().getTime();
        }
        if (cd.dateGrouping === 'week' || (cd.kpiFormValues && cd.kpiFormValues.groupBySlider === 'week' && cd.kpiFormValues.category !== 'healthscore')) {
            /** @type {?} */
            var y = (/** @type {?} */ (date.split('-')[0]));
            /** @type {?} */
            var w = (/** @type {?} */ (date.split('-')[1]));
            // // MongoDB week begins on Sundays and days preceding the first Sudnay of the year are in Week 0;
            // // So,  weekStartDay = days in Week 0 + first day of the week number
            // let yearStartDay = new Date(y, 0, 0).getDay();
            // let daysInWeek0 = yearStartDay === 0 ? 0 : 7 - yearStartDay;
            // let d = w === '00' ? 0 : daysInWeek0 + (w - 1) * 7;
            // let weekStart = new Date(y, 0, d);
            // retVal = weekStart.getTime();
            // //retVal = moment('2011-01-01').year(y).isoWeek(w).toDate().getTime(); //.startOf('day')
            /** @type {?} */
            var simple = new Date(y, 0, 1 + (w - 1) * 7);
            /** @type {?} */
            var dow = simple.getDay();
            /** @type {?} */
            var isoWeekStart = simple;
            if (dow <= 4) {
                isoWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
            }
            else {
                isoWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
            }
            return isoWeekStart.getTime();
        }
        else {
            retVal = new Date(date).getTime();
        }
        return retVal;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseKpi.getColor = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var color = Colors.black;
        if (!isNaN(value)) {
            if (value < 33) {
                color = Colors.danger;
            }
            else if (value < 75) {
                color = Colors.warning;
            }
            else if (value >= 75) {
                color = Colors.success;
            }
        }
        return color;
    };
    /**
     * @param {?} filters
     * @param {?} dates
     * @param {?=} field
     * @param {?=} allowNotExits
     * @return {?}
     */
    BaseKpi.setDateFilters = /**
     * @param {?} filters
     * @param {?} dates
     * @param {?=} field
     * @param {?=} allowNotExits
     * @return {?}
     */
    function (filters, dates, field, allowNotExits) {
        if (field === void 0) { field = 'finishedDate'; }
        if (allowNotExits === void 0) { allowNotExits = true; }
        if (dates.startDate || dates.endDate) {
            /** @type {?} */
            var filter$$1 = void 0;
            if (allowNotExits) {
                filters.push(cloneDeep(filters[0]));
                filter$$1 = (/** @type {?} */ ({ operator: { _id: 'exists' }, value: false }));
                filter$$1.field = field;
                filters[1].push(filter$$1);
            }
            if (dates.startDate) {
                filter$$1 = (/** @type {?} */ ({ operator: { _id: 'gte' }, value: dates.startDate }));
                filter$$1.field = field;
                filters[0].push(filter$$1);
            }
            if (dates.endDate) {
                filter$$1 = (/** @type {?} */ ({ operator: { _id: 'lt' }, value: dates.endDate }));
                filter$$1.field = field;
                filters[0].push(filter$$1);
            }
        }
    };
    /**
     * @param {?} filters
     * @param {?} locationTags
     * @return {?}
     */
    BaseKpi.setLocationTagsFilters = /**
     * @param {?} filters
     * @param {?} locationTags
     * @return {?}
     */
    function (filters, locationTags) {
        if (locationTags && locationTags.length) {
            filters[0].push({
                field: 'tags',
                collectionName: 'locations',
                operator: { _id: 'inq' },
                value: locationTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'locationRef', values: '_id' }
            });
        }
    };
    /**
     * @param {?} filters
     * @param {?} userTags
     * @return {?}
     */
    BaseKpi.setUserTagsFilters = /**
     * @param {?} filters
     * @param {?} userTags
     * @return {?}
     */
    function (filters, userTags) {
        if (userTags && userTags.length) {
            filters[0].push({
                field: 'tags',
                collectionName: 'user',
                operator: { _id: 'inq' },
                value: userTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'ownerRef', values: '_id', leftJoin: true }
            });
        }
    };
    /**
     * @param {?} campaigns
     * @param {?} campaignTags
     * @param {?} filters
     * @param {?} missionType
     * @return {?}
     */
    BaseKpi.setCampaignFilters = /**
     * @param {?} campaigns
     * @param {?} campaignTags
     * @param {?} filters
     * @param {?} missionType
     * @return {?}
     */
    function (campaigns, campaignTags, filters, missionType) {
        if (campaigns && campaigns.length > 0) {
            filters[0].unshift({
                field: 'descriptionRef',
                operator: { _id: 'inq' },
                value: campaigns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c._id; }))
            });
        }
        else if (campaignTags && campaignTags.length > 0) {
            filters[0].push({
                field: 'tags',
                collectionName: 'missiondescriptions',
                operator: { _id: 'inq' },
                value: campaignTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'descriptionRef', values: '_id' }
            });
        }
        if (missionType) {
            filters[0].push({ field: 'type', operator: { _id: 'inq' }, value: [missionType] });
        }
    };
    /**
     * @param {?} groupBy
     * @return {?}
     */
    BaseKpi.getDateFormatMoment = /**
     * @param {?} groupBy
     * @return {?}
     */
    function (groupBy) {
        /** @type {?} */
        var format = '';
        if (groupBy && groupBy.toString) {
            switch (groupBy.toString()) {
                case 'week':
                    format = 'YYYY-WW';
                    break;
                case 'month':
                    format = 'YYYY-MM';
                    break;
                case 'quarter':
                case 'year':
                    format = 'YYYY';
                    break;
            }
        }
        return format;
    };
    __decorate([
        Editable('BaseKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.number, advanced: true }),
        __metadata("design:type", Boolean)
    ], BaseKpi.prototype, "pointPadding", void 0);
    __decorate([
        Editable('BaseKpi', {
            tabIndex: 2,
            tab: 'ADVANCED',
            type: FormFieldType.number,
            advanced: true,
            min: 1
        }),
        __metadata("design:type", Number)
    ], BaseKpi.prototype, "numberPrecision", void 0);
    __decorate([
        Editable('BaseKpi', {
            tabIndex: 2,
            tab: 'ADVANCED',
            type: FormFieldType.autocomplete,
            translate: true,
            values: ['sum', 'avg', 'min', 'max']
        }),
        __metadata("design:type", String)
    ], BaseKpi.prototype, "accumulator", void 0);
    BaseKpi = __decorate([
        Model({
            className: 'BaseKpi'
        })
    ], BaseKpi);
    return BaseKpi;
}(IKpi));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';
// let conditions = {
//   isAdmin: 'context == "admin"',
//   isFormCreator: 'context == "formCreator"',
//   isNotTranslation: 'context!="translation"'
// };
var IMapping = /** @class */ (function (_super) {
    __extends(IMapping, _super);
    function IMapping() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('IMapping', {
            required: true,
            type: FormFieldType.documentuploader,
            filterable: false,
            title: 'DOCUMENT',
            extensions: ['csv', 'application', 'xls', 'xlsx']
        }) //'xls', 'xlsx', //'xls', 'xlsx', , 'application'
        ,
        __metadata("design:type", Object)
    ], IMapping.prototype, "document", void 0);
    // import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';
    // let conditions = {
    //   isAdmin: 'context == "admin"',
    //   isFormCreator: 'context == "formCreator"',
    //   isNotTranslation: 'context!="translation"'
    // };
    IMapping = __decorate([
        Model({ className: 'IMapping' })
    ], IMapping);
    return IMapping;
}(IIMapping));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Operation = /** @class */ (function (_super) {
    __extends(Operation, _super);
    function Operation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Searchable('Operation'),
        __metadata("design:type", String)
    ], Operation.prototype, "operationId", void 0);
    __decorate([
        Searchable('Operation'),
        __metadata("design:type", String)
    ], Operation.prototype, "operationName", void 0);
    __decorate([
        Searchable('Operation'),
        __metadata("design:type", String)
    ], Operation.prototype, "methodName", void 0);
    __decorate([
        Searchable('Operation'),
        __metadata("design:type", String)
    ], Operation.prototype, "modelName", void 0);
    __decorate([
        Editable('Operation', { type: FormFieldType.datetime, readonly: true }),
        Searchable('Operation'),
        __metadata("design:type", Date)
    ], Operation.prototype, "_createdAt", void 0);
    __decorate([
        Editable('Operation', { type: FormFieldType.number, readonly: true }),
        Searchable('Operation'),
        __metadata("design:type", Number)
    ], Operation.prototype, "count", void 0);
    Operation = __decorate([
        Model({
            className: 'Operation',
            collectionName: 'operation',
            fields: ['*'],
            include: []
        })
    ], Operation);
    return Operation;
}(IOperation));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Product', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 1
        }),
        __metadata("design:type", String)
    ], Product.prototype, "_id", void 0);
    __decorate([
        Editable('Product', {
            type: FormFieldType.autocomplete,
            collectionName: 'catalogs',
            forceExport: true,
            exportOrder: 2,
            required: true,
            columnDefinition: { name: 'title' },
            filterable: true
        }),
        __metadata("design:type", Object)
    ], Product.prototype, "catalog", void 0);
    __decorate([
        Editable('Product', { required: true, type: FormFieldType.text, exportOrder: 3, filterable: true, sortable: true }),
        Searchable('Product'),
        __metadata("design:type", String)
    ], Product.prototype, "title", void 0);
    __decorate([
        Editable('Product', { type: FormFieldType.text, exportOrder: 4, filterable: true, sortable: true }),
        Searchable('Product'),
        __metadata("design:type", String)
    ], Product.prototype, "reference", void 0);
    __decorate([
        Editable('Product', { flex: 50, type: FormFieldType.text, exportOrder: 10, filterable: true, sortable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "color", void 0);
    __decorate([
        Editable('Product', { required: false, flex: 50, type: FormFieldType.number, exportOrder: 9 }),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        Editable('Product', { flex: 50, type: FormFieldType.number, min: 0, exportOrder: 8 }),
        __metadata("design:type", Number)
    ], Product.prototype, "step", void 0);
    __decorate([
        Editable('Product', {
            type: FormFieldType.checkbox,
            flex: 50,
            columnDefinition: { width: 40 },
            exportOrder: 11,
            filterable: true
        }),
        __metadata("design:type", Boolean)
    ], Product.prototype, "outofstock", void 0);
    __decorate([
        Editable('Product', {
            type: FormFieldType.autocomplete,
            isImage: true,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxWidth: 600,
            maxHeight: 300,
            crop: 'square',
            collectionName: 'files',
            title: 'PHOTO',
            //required: true,
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            exportOrder: 7
        }),
        __metadata("design:type", Object)
    ], Product.prototype, "image", void 0);
    __decorate([
        Editable('Product', { type: FormFieldType.textarea, exportOrder: 5 }),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        Editable('Product', { type: FormFieldType.textarea, exportOrder: 6 }),
        __metadata("design:type", String)
    ], Product.prototype, "shortdescription", void 0);
    __decorate([
        Editable('Product', {
            type: FormFieldType.autocomplete,
            tag: true,
            allowCustomTag: true,
            collectionName: 'products',
            multiple: true,
            icon: 'yo-flag',
            subQuery: { field: 'fileRef', values: '_id' },
            exportOrder: 12,
            filterable: true
        }),
        Searchable('Product'),
        __metadata("design:type", Array)
    ], Product.prototype, "tags", void 0);
    Product = __decorate([
        Model({
            className: 'Product',
            collectionName: 'products',
            fields: ['*'],
            include: ['catalog'],
            icon: 'yo-product'
        })
    ], Product);
    return Product;
}(IProduct));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PublicApiToken = /** @class */ (function (_super) {
    __extends(PublicApiToken, _super);
    function PublicApiToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('PublicApiToken', { type: FormFieldType.textarea, readonly: true, name: 'accessToken.id' }),
        __metadata("design:type", Object)
    ], PublicApiToken.prototype, "accessToken", void 0);
    PublicApiToken = __decorate([
        Model({
            className: 'PublicApiToken',
            collectionName: 'publicAPITokens',
            fields: ['*'],
            include: ['user'],
            icon: 'yo-badge'
        })
    ], PublicApiToken);
    return PublicApiToken;
}(IPublicApiToken));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Slide = /** @class */ (function (_super) {
    __extends(Slide, _super);
    function Slide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Slide', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Slide.prototype, "title", void 0);
    __decorate([
        Editable('Slide', { type: FormFieldType.textarea }),
        __metadata("design:type", String)
    ], Slide.prototype, "description", void 0);
    __decorate([
        Editable('Slide', { type: FormFieldType.checkbox, flex: 100, advanced: true }),
        __metadata("design:type", Boolean)
    ], Slide.prototype, "hideheader", void 0);
    __decorate([
        Editable('Slide', {
            type: FormFieldType.checkbox,
            flex: 100,
            condition: [ROLES_CONDITIONS.hasService],
            advanced: true
        }),
        __metadata("design:type", Boolean)
    ], Slide.prototype, "service", void 0);
    __decorate([
        Editable('Slide', {
            type: FormFieldType.autocomplete,
            multiple: true,
            clearable: true,
            advanced: true
        }),
        __metadata("design:type", Object)
    ], Slide.prototype, "condition", void 0);
    Slide = __decorate([
        Model({ className: 'Slide' })
    ], Slide);
    return Slide;
}(ISlide));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Tableau = /** @class */ (function (_super) {
    __extends(Tableau, _super);
    function Tableau() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Tableau', { type: FormFieldType.text, required: true, title: 'DASHBOARDID' }),
        Searchable('Tableau'),
        __metadata("design:type", String)
    ], Tableau.prototype, "path", void 0);
    __decorate([
        Editable('Tableau', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            collectionName: 'tenants',
            columnDefinition: { name: 'name' },
            multiple: false,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        __metadata("design:type", Tenant)
    ], Tableau.prototype, "_tenant", void 0);
    Tableau = __decorate([
        Model({
            className: 'Tableau',
            collectionName: 'tableau',
            fields: ['*'],
            include: ['_tenant'],
            icon: 'yo-tableau'
        })
    ], Tableau);
    return Tableau;
}(ITableau));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TagGroup = /** @class */ (function (_super) {
    __extends(TagGroup, _super);
    function TagGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('TagGroup', { required: true, type: FormFieldType.text }),
        Searchable('TagGroup'),
        __metadata("design:type", String)
    ], TagGroup.prototype, "title", void 0);
    __decorate([
        Editable('TagGroup', {
            title: 'LOCATIONTAGS',
            required: true,
            type: FormFieldType.autocomplete,
            tag: true,
            collectionName: 'locations',
            multiple: true,
            subQuery: { field: 'locationRef', values: '_id' },
            fixedPosition: true
        }),
        __metadata("design:type", Array)
    ], TagGroup.prototype, "tags", void 0);
    __decorate([
        Editable('TagGroup', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false,
            required: true,
            fixedPosition: true
        }),
        __metadata("design:type", Object)
    ], TagGroup.prototype, "group", void 0);
    TagGroup = __decorate([
        Model({
            className: 'TagGroup',
            collectionName: 'tagGroups',
            fields: ['*'],
            include: []
        })
    ], TagGroup);
    return TagGroup;
}(ITagGroup));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Searchable('Tag'),
        __metadata("design:type", String)
    ], Tag.prototype, "tag", void 0);
    Tag = __decorate([
        Model({
            className: 'Tag',
            collectionName: 'tags',
            fields: ['*'],
            include: []
        })
    ], Tag);
    return Tag;
}(ITag));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function onUserMeActionHandler() {
    this.selectMatch(this.session.user);
}
var Todo = /** @class */ (function (_super) {
    __extends(Todo, _super);
    function Todo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Todo', { type: FormFieldType.text, name: 'title', required: true }),
        __metadata("design:type", String)
    ], Todo.prototype, "title", void 0);
    __decorate([
        Editable('Todo', {
            title: 'ASSIGNTO',
            name: 'user',
            type: FormFieldType.autocomplete,
            collectionName: 'user',
            queryFields: User.getSimpleFields(),
            multiple: false,
            required: true,
            extraButton: { title: 'ASSIGNTO', buttons: [{ text: 'ME', handler: onUserMeActionHandler }] }
        }),
        __metadata("design:type", Object)
    ], Todo.prototype, "user", void 0);
    __decorate([
        Editable('Todo', {
            title: 'DUEDATE',
            type: FormFieldType.datetime,
            required: false,
            clearable: true,
            minDate: new Date(),
            secondary: true,
            icon: 'yo-calendar'
        }),
        __metadata("design:type", Date)
    ], Todo.prototype, "duedate", void 0);
    __decorate([
        Editable('Todo', {
            title: 'NOTIFICATIONEMAILS',
            type: FormFieldType.emailreport,
            showUsers: true,
            secondary: true,
            icon: 'yo-email'
        }),
        __metadata("design:type", Array)
    ], Todo.prototype, "notificationemail", void 0);
    __decorate([
        Editable('Todo', {
            title: 'REMINDER',
            type: FormFieldType.datetime,
            required: false,
            clearable: true,
            secondary: true,
            icon: 'yo-activity'
        }),
        __metadata("design:type", Date)
    ], Todo.prototype, "reminderdate", void 0);
    __decorate([
        Editable('Todo', { type: FormFieldType.starrating, secondary: true, icon: 'yo-priority' }),
        __metadata("design:type", Number)
    ], Todo.prototype, "priority", void 0);
    Todo = __decorate([
        Model({ className: 'Todo' })
    ], Todo);
    return Todo;
}(ITodo));
var TodoTask = /** @class */ (function (_super) {
    __extends(TodoTask, _super);
    function TodoTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('TodoTask', { type: FormFieldType.text, title: 'TITLE', required: true }),
        __metadata("design:type", Object)
    ], TodoTask.prototype, "text", void 0);
    __decorate([
        Editable('TodoTask', { type: FormFieldType.textarea, required: false }),
        __metadata("design:type", Object)
    ], TodoTask.prototype, "comments", void 0);
    __decorate([
        Editable('TodoTask', {
            type: FormFieldType.datetime,
            required: false,
            clearable: true,
            minDate: new Date()
        }),
        __metadata("design:type", Object)
    ], TodoTask.prototype, "duedate", void 0);
    __decorate([
        Editable('TodoTask', { type: FormFieldType.toggle, required: false, title: 'PHOTO', flex: 50 }),
        __metadata("design:type", Object)
    ], TodoTask.prototype, "hasphoto", void 0);
    __decorate([
        Editable('TodoTask', {
            type: FormFieldType.toggle,
            required: false,
            title: 'MANDATORYPHOTO',
            flex: 50,
            condition: 'hasphoto.value==1'
        }),
        __metadata("design:type", Object)
    ], TodoTask.prototype, "isphotorequired", void 0);
    __decorate([
        Editable('TodoTask', {
            type: FormFieldType.toggle,
            required: false,
            title: 'ALLOWLIBRARY',
            flex: 50,
            condition: 'hasphoto.value==1'
        }),
        __metadata("design:type", Object)
    ], TodoTask.prototype, "allowLibrary", void 0);
    TodoTask = __decorate([
        Model({ className: 'TodoTask' })
    ], TodoTask);
    return TodoTask;
}(ITodoTask));
var TodoTaskSimple = /** @class */ (function (_super) {
    __extends(TodoTaskSimple, _super);
    function TodoTaskSimple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('TodoTaskSimple', {
            type: FormFieldType.textarea,
            title: 'DESCRIPTION',
            required: true
        }),
        __metadata("design:type", Object)
    ], TodoTaskSimple.prototype, "text", void 0);
    __decorate([
        Editable('TodoTaskSimple', {
            title: 'ASSIGNTO',
            name: 'user',
            type: FormFieldType.autocomplete,
            queryFields: User.getSimpleFields(),
            collectionName: 'user',
            multiple: false,
            required: true,
            extraButton: { title: 'ASSIGNTO', buttons: [{ text: 'ME', handler: onUserMeActionHandler }] }
        }),
        __metadata("design:type", Object)
    ], TodoTaskSimple.prototype, "user", void 0);
    __decorate([
        Editable('TodoTaskSimple', {
            type: FormFieldType.datetime,
            required: false,
            clearable: true,
            minDate: new Date()
        }),
        __metadata("design:type", Object)
    ], TodoTaskSimple.prototype, "duedate", void 0);
    __decorate([
        Editable('TodoTaskSimple', {
            type: FormFieldType.toggle,
            required: false,
            title: 'ASKFORPHOTO',
            flex: 50
        }),
        __metadata("design:type", Object)
    ], TodoTaskSimple.prototype, "hasphoto", void 0);
    __decorate([
        Editable('TodoTaskSimple', {
            type: FormFieldType.toggle,
            required: false,
            title: 'MANDATORYPHOTO',
            flex: 50,
            condition: 'hasphoto.value==1'
        }),
        __metadata("design:type", Object)
    ], TodoTaskSimple.prototype, "isphotorequired", void 0);
    __decorate([
        Editable('TodoTaskSimple', {
            type: FormFieldType.toggle,
            required: false,
            title: 'ALLOWLIBRARY',
            flex: 50,
            condition: 'hasphoto.value==1'
        }),
        __metadata("design:type", Object)
    ], TodoTaskSimple.prototype, "allowLibrary", void 0);
    TodoTaskSimple = __decorate([
        Model({ className: 'TodoTaskSimple' })
    ], TodoTaskSimple);
    return TodoTaskSimple;
}(ITodoTaskSimple));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} data
 * @param {?} field
 * @param {?} injector
 * @return {?}
 */
function translateButtonHandler(data, field, injector) {
    /** @type {?} */
    var rq = injector.get(Requestor);
    /** @type {?} */
    var language = data.language;
    /** @type {?} */
    var value = data.value;
    if (value && language) {
        data[language] = value;
        return Googletranslate.getAll(value, language, rq)
            .toPromise()
            .then((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            /** @type {?} */
            var isCapitalized = capitalize(value) === value;
            values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                data[v.language] = isCapitalized ? capitalize(v.value) : v.value;
            }));
        }));
    }
}
/**
 * @param {?} data
 * @param {?} field
 * @return {?}
 */
function resetButtonHandler(data, field) {
    Translate.availablesLanguage
        .filter((/**
     * @param {?} l
     * @return {?}
     */
    function (l) { return l !== 'key'; }))
        .forEach((/**
     * @param {?} l
     * @return {?}
     */
    function (l) {
        data[l] = null;
    }));
    data = __assign({}, data);
}
var Translation = /** @class */ (function (_super) {
    __extends(Translation, _super);
    function Translation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('Translation', { title: 'ID', visible: false, forceExport: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "_id", void 0);
    __decorate([
        Editable('Translation', {
            type: FormFieldType.autocomplete,
            title: 'LANGUAGE',
            translate: true,
            values: Translate.availablesLanguage,
            clearable: false,
            required: true,
            autoselect: true,
            columnDefinition: { width: 40 }
        }),
        __metadata("design:type", String)
    ], Translation.prototype, "language", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        Searchable('Translation'),
        __metadata("design:type", String)
    ], Translation.prototype, "key", void 0);
    __decorate([
        Editable('Translation', {
            required: true,
            type: FormFieldType.text
        }),
        __metadata("design:type", String)
    ], Translation.prototype, "value", void 0);
    __decorate([
        Editable('Translation', {
            type: FormFieldType.button,
            title: 'TRANSLATE',
            color: 'success',
            suppressExport: true,
            handler: translateButtonHandler
        }),
        __metadata("design:type", Object)
    ], Translation.prototype, "translateButton", void 0);
    __decorate([
        Editable('Translation', {
            type: FormFieldType.button,
            title: 'RESET',
            suppressExport: true,
            color: 'danger',
            handler: resetButtonHandler
        }),
        __metadata("design:type", Object)
    ], Translation.prototype, "resetButton", void 0);
    __decorate([
        Editable('Translation', { type: FormFieldType.toggle, title: 'UNVALIDATEREASON' }),
        __metadata("design:type", Boolean)
    ], Translation.prototype, "isReject", void 0);
    __decorate([
        Editable('Translation', { type: FormFieldType.toggle, title: 'ANNOTATE' }),
        __metadata("design:type", Boolean)
    ], Translation.prototype, "isPhotoAnnotation", void 0);
    __decorate([
        Editable('Translation', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false,
            required: true
        }),
        __metadata("design:type", Object)
    ], Translation.prototype, "group", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "en", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "us", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "fr", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "es", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "pl", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "nl", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "de", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "it", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "ru", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "zhs", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "zht", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "pt", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "kr", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "ja", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "ua", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "he", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "ar", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "cz", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "th", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "tr", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "bg", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "el", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "sl", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "sk", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "ro", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "hu", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "et", void 0);
    __decorate([
        Editable('Translation', { required: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], Translation.prototype, "br", void 0);
    Translation = __decorate([
        Model({
            className: 'Translation',
            collectionName: 'translations',
            fields: ['*'],
            include: ['_tenant'],
            icon: 'yo-translate'
        })
    ], Translation);
    return Translation;
}(ITranslation));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WorkplaceGroups = /** @class */ (function (_super) {
    __extends(WorkplaceGroups, _super);
    function WorkplaceGroups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], WorkplaceGroups.prototype, "name", void 0);
    __decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], WorkplaceGroups.prototype, "icon", void 0);
    __decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], WorkplaceGroups.prototype, "cover", void 0);
    __decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        __metadata("design:type", String)
    ], WorkplaceGroups.prototype, "description", void 0);
    WorkplaceGroups = __decorate([
        Model({
            className: 'WorkplaceGroups',
            collectionName: 'workplace_groups',
            fields: ['*'],
            include: []
        })
    ], WorkplaceGroups);
    return WorkplaceGroups;
}(IWorkplaceGroups));
var WorkplacePost = /** @class */ (function (_super) {
    __extends(WorkplacePost, _super);
    function WorkplacePost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Editable('WorkplacePost', { type: FormFieldType.textarea, required: true }),
        __metadata("design:type", String)
    ], WorkplacePost.prototype, "comments", void 0);
    __decorate([
        Editable('WorkplacePost', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'workplace_groups',
            multiple: true,
            required: true
        }),
        __metadata("design:type", Object)
    ], WorkplacePost.prototype, "workplaceGroups", void 0);
    WorkplacePost = __decorate([
        Model({ className: 'WorkplacePost' })
    ], WorkplacePost);
    return WorkplacePost;
}(IWorkplacePost));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Activity = /** @class */ (function () {
    function Activity(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @protected
     * @param {?} entity
     * @param {?} entityName
     * @param {?} action
     * @return {?}
     */
    Activity.prototype._viewOrLike = /**
     * @protected
     * @param {?} entity
     * @param {?} entityName
     * @param {?} action
     * @return {?}
     */
    function (entity, entityName, action) {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'activity/' + action;
        return this.rq.post(url, { entityRef: entity._id, entityName: entityName });
    };
    /**
     * @param {?} entityId
     * @param {?=} action
     * @return {?}
     */
    Activity.prototype.getActionFilter = /**
     * @param {?} entityId
     * @param {?=} action
     * @return {?}
     */
    function (entityId, action) {
        if (action === void 0) { action = 'view'; }
        return [[{ field: 'action', operator: { _id: 'eq' }, value: action }, { field: 'entityRef', operator: { _id: 'inq' }, value: [entityId] }]];
    };
    /**
     * @return {?}
     */
    Activity.prototype.getUserTransform = /**
     * @return {?}
     */
    function () {
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.data) {
                res.data = res.data.map((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) { return r.user; }));
            }
            return res;
        });
    };
    /**
     * @return {?}
     */
    Activity.prototype.getActionAggregateOptions = /**
     * @return {?}
     */
    function () {
        return (/**
         * @param {?} start
         * @param {?} limit
         * @return {?}
         */
        function (start, limit) { return __spread([{ $lookup: { from: 'user', localField: 'userRef', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }], (start > 0 ? [{ $skip: start }] : []), (limit > 0 ? [{ $limit: limit }] : [])); });
    };
    Activity.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Activity.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor }
    ]; };
    return Activity;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DataLoader = /** @class */ (function () {
    function DataLoader(broker, collectionName, items, pageSize, translate, translateService, looseCount) {
        if (items === void 0) { items = null; }
        if (pageSize === void 0) { pageSize = null; }
        if (translate === void 0) { translate = null; }
        if (translateService === void 0) { translateService = null; }
        if (looseCount === void 0) { looseCount = null; }
        this.broker = broker;
        this._currentPage = 0;
        this._total = 0;
        this._collectionName = '';
        this._loading = false;
        this._collectionName = Models.fixCollectionName(collectionName);
        this._items = items;
        this._translate = translate;
        this._looseCount = looseCount;
        if (pageSize && isNumber(pageSize) && pageSize > 0) {
            this._pageSize = pageSize;
        }
        else {
            this._pageSize = 21;
        }
        this.filterPipe = new FilterPipe(translateService);
    }
    Object.defineProperty(DataLoader.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pageSize;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._pageSize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "currentPage", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "total", {
        get: /**
         * @return {?}
         */
        function () {
            return this._total;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._total = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "totalPage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.ceil(this._total / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "loadingPageCount", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loadingPageCount;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._loadingPageCount = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.loadWithSearch = /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount) {
        if (currentPage === void 0) { currentPage = 0; }
        if (search === void 0) { search = null; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (mapTransform === void 0) { mapTransform = null; }
        if (mapTransformAsync === void 0) { mapTransformAsync = false; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (aggregateOptions === void 0) { aggregateOptions = null; }
        if (aggregateOptionsOffline === void 0) { aggregateOptionsOffline = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        return this.load(currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
    };
    /**
     * @param {?=} start
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.loadWithSearchDebounce = /**
     * @param {?=} start
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (start, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount) {
        var _this = this;
        if (start === void 0) { start = 0; }
        if (search === void 0) { search = null; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (mapTransform === void 0) { mapTransform = null; }
        if (mapTransformAsync === void 0) { mapTransformAsync = false; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (aggregateOptions === void 0) { aggregateOptions = null; }
        if (aggregateOptionsOffline === void 0) { aggregateOptionsOffline = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        if (search) {
            return search.pipe(debounceTime(400), distinctUntilChanged(), switchMap((/**
             * @param {?} term
             * @return {?}
             */
            function (term) { return _this.load(start, term.toString(), filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount); })));
        }
        else {
            return this.load(start, null, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
        }
    };
    /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.load = /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount) {
        var _this = this;
        if (currentPage === void 0) { currentPage = 0; }
        if (search === void 0) { search = null; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (mapTransform === void 0) { mapTransform = null; }
        if (mapTransformAsync === void 0) { mapTransformAsync = false; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (aggregateOptions === void 0) { aggregateOptions = null; }
        if (aggregateOptionsOffline === void 0) { aggregateOptionsOffline = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        this._loading = true;
        if (search) {
            search = search.trim();
        }
        if ((this._items && this._items.length > 0) || !this._collectionName || isEmpty(this._collectionName)) {
            /** @type {?} */
            var obs = new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /** @type {?} */
                var data = _this._items || [];
                if (search) {
                    data = _this.filterPipe.transform(data, search, null, null, _this._translate);
                }
                if (sortModel) {
                    data = orderBy(data, sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return s.colId; })), sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return s.sort.toLowerCase(); })));
                }
                _this._total = data.length;
                _this._currentPage = currentPage;
                if (data.slice) {
                    data = data.slice(currentPage * _this.pageSize, (currentPage + 1) * _this.pageSize);
                }
                /** @type {?} */
                var res = {
                    count: _this._total,
                    data: data.map ? data.map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) { return _this.convertItem(value); })) : []
                };
                observer.next(res);
                observer.complete();
            }));
            if (mapTransformAsync && mapTransform) {
                return obs.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else if (mapTransform) {
                return obs.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else {
                return obs;
            }
        }
        else if (aggregateOptions && isFunction(aggregateOptions)) {
            if (!mapTransform) {
                mapTransform = (/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x; });
            }
            return this.broker
                .aggregateQuery(this._collectionName, filters, aggregateOptions(currentPage * this.pageSize, this.pageSize, sortModel, search, filters), search, null, includeCount, cacheId, customFilter, subQuery, aggregateOptionsOffline && isFunction(aggregateOptionsOffline) ? aggregateOptionsOffline(currentPage * this.pageSize, this.pageSize, sortModel, search, filters) : null)
                .pipe(mapTransformAsync ? mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })) : map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })))
                .pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                _this._currentPage = currentPage;
                if (includeCount) {
                    _this._total = retVal.count;
                }
                else if (isObject(retVal) && isArray(retVal.data)) ;
                else {
                    retVal = { data: retVal };
                }
                _this._loading = false;
                return retVal;
            })));
        }
        else {
            /** @type {?} */
            var retVal = this.broker.getAll(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, tag, subQuery, customFilter, cacheId, this._looseCount, !includeCount).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this._currentPage = currentPage;
                _this._loading = false;
                if (!includeCount) {
                    _this._total = Math.max(-1, _this._total);
                    return { count: _this._total, data: res };
                }
                else {
                    _this._total = res.count;
                    return res;
                }
            })));
            if (mapTransformAsync && mapTransform) {
                return retVal.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else if (mapTransform) {
                return retVal.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else {
                return retVal;
            }
        }
    };
    /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.getQuery = /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (currentPage, search, filters, sortModel, subQuery, fields, include, customFilter, includeCount) {
        if (currentPage === void 0) { currentPage = 0; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        return this.broker.getQuery(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, subQuery, customFilter);
    };
    /**
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    DataLoader.prototype.getCount = /**
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    function (search, filters, subQuery, customFilter) {
        var _this = this;
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        return this.broker.getCount(this._collectionName, search, filters, subQuery, customFilter).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            _this._total = ret.count;
            return ret;
        })));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DataLoader.prototype.convertItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return new Entity(value);
        }
        else if (isEqual(keys(value), ['_id'])) {
            return new Entity(value._id);
        }
        else if (typeof value === 'undefined') {
            return new Entity('undefined');
        }
        else {
            return value;
        }
    };
    return DataLoader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DataCoreModule, Dashboard as DashboardCore, Editable, Mapping, Model, ModelExtended, Searchable, AggregateLog, Algorithm, AutorenewConfig, Backup, CACHE_KEYS, Catalog, onChartMissionFieldsChange, CHART_TYPES, CHART_DATEGROUPINGBY, CHART_SHOW_AS, CHART_DATETIMEFORMAT, CHART_TIMESCALE, ChartDefinition, getGroupsTransform, isNotInformationField, getFormFieldValues, CONDITION_TYPES, ROLES, ROLES_ASK, ROLES_CONDITIONS, Condition, ConditionalField, CONDITION_ALL_OPERATORS, SIMPLE_FIELD_TYPES, WITH_VALUES_FIELD_TYPES, ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE, FORM_FILES_IMAGE_MIME, FORM_FILES_IMAGE_FILTER, FORM_FILES_GROUP_FILTER, Currency, Dashboard$1 as Dashboard, Entity, onUrlChange, File$1 as File, Folder, FileOrFolder, Group, BaseKpi, LocationType, onAddressChange, onTypeChange, LOCATION_GEOCODESTATUS, Location, IMapping, onMissionDescriptionTypeChange, MISSION_TYPES_NO_ADMIN, MISSION_TYPES, MISSION_STATUS, MissionDescription, MissionDescriptionCreate, MissionDescriptionSchedule, MissionDescriptionNotifications, MissionDescriptionSettings, Scoring, IModel, Notification, Operation, Product, PublicApiToken, ResponseObject, Slide, Tableau, TagGroup, Tag, Tenant, onUserMeActionHandler, Todo, TodoTask, TodoTaskSimple, translateButtonHandler, resetButtonHandler, Translation, onUserLocationChange, User, UserSettings, SimpleUser, WorkplaceGroups, WorkplacePost, FilterPipe, Activity, Algorithms, AuthenticationGuard, CanDeactivateGuard, Authentication, CurrentSessionResolver, BackupService, Box, Blog, getStartAndEndDates, Broker, PlatformService, Config, Cache, DataLoader, Files, FilesBroker, Googlemaps, Googletranslate, HttpCustomInterceptor, LoadingBarEventType, LoadingBarEvent, LoadingBar, Locations, Loopback, Missiondescriptions, Models, Print, Push$1 as Push, Requestor, Security, Session, Smartloc, Tenants, Unsplash, Users, Version, Workplace, Xlsx, getStartAndEndDates$1 as ɵa };

//# sourceMappingURL=data-core.js.map