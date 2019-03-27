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
import { __decorate, __metadata } from 'tslib';
import { isPresent, getUUID, dateFormat, dateAdd, MOBILE_FORM_FIELDS_ALL, FormFieldType, isImageFile, isNumberField, isBooleanField, isPhotoField, isMultiPhotosField, isPhotoOrMultiPhotosField, isVideoField, isDateTimeField, isIntervalField, isMultipleField, isColoredField, isFile, isBase64, isFileUri, read, getExtension, changeExtension, getMaxSize, toPng, isValid, isImage, isVideo, isAudio, isDocument, getType, getMimeType, getIcon, getVideoPoster, b64toBlob, blobToFile, b64ToFile, saveBase64AsImageFile, resizeBase64Image, getBase64MimeType, getBase64Extension, resizeImage, getNativeDirectory, resolveFilePath, fixImageOrientation, moveToImageDirectory, moveToImageDirectoryBase, fileNativeWriteFile, fileNativeCheckFile, fixAbsolutePath, getCloudinaryUrl, getLocalFilePath, getLocalFileName, saveToLocalFile, cleanFileName, getUrlWithAnnotations, showPdfOnDevice, downloadFileToDevice, openBlob, afterOpenBlob, toDate, utc, startOf, cacheFile, isNullOrUndefined, ICondition, IConditionalField, ITenant, ILocationType, IUser, IUserSettings, ISimpleUser, IRoles, INotification, dateParse, fromNow, IMissionDescription, IScoring, downloadFile, IGroup, getUTCOffset, isBlank, IAggregateLog, IAlgorithm, IAutorenewConfig, IBackup, ICatalog, IChartDefinition, IDashboard, IFile, IFolder, IFileOrFolder, IKpi, IIMapping, IOperation, IProduct, IPublicApiToken, ISlide, ITableau, ITagGroup, ITag, ITodo, ITodoTask, ITodoTaskSimple, ITranslation, IWorkplaceGroups, IWorkplacePost } from '@shared/stencil';
import { Injectable, EventEmitter, Injector, Pipe, NgModule } from '@angular/core';
import { Observable, of, throwError, from, combineLatest, forkJoin, Subscription, Subject, ReplaySubject, timer } from 'rxjs';
import { catchError, map, concatMap, mergeMap, flatMap, filter as filter$1, take, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { keys, cloneDeep, compact, uniq, union, isArray, isObject, isString, map as map$1, pull, assign, isEmpty, get, findIndex, uniqBy, set, flatten, forEach, concat, remove, isEqual, intersection, orderBy, startCase, pick, without, filter, merge, some, every, isNumber, range, sortBy, difference, find, isDate, isNaN, capitalize, isFunction } from 'lodash-es';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Config {
    /**
     * @param {?} localStorage
     * @param {?} coreConfig
     * @param {?} translate
     */
    constructor(localStorage, coreConfig, translate) {
        this.localStorage = localStorage;
        this.coreConfig = coreConfig;
        this.translate = translate;
    }
    /**
     * @return {?}
     */
    get servers() {
        /** @type {?} */
        let servers = [
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
    }
    /**
     * @return {?}
     */
    get serverUrl() {
        if (this.isTestpen) {
            return Config.TESTPEN_URL;
        }
        if (this.isSandbox) {
            return Config.SANDBOX_URL;
        }
        /** @type {?} */
        let defaultServer;
        if (this.server && this.server !== '') {
            defaultServer = this.server;
        }
        else {
            defaultServer = Config.PROD_URL; //Config.DEV_URL;
        }
        this.server = this.localStorage.get('SERVER') || defaultServer;
        return this.server;
    }
    /**
     * @return {?}
     */
    get serverName() {
        /** @type {?} */
        let server = this.servers.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.url === this.serverUrl));
        if (server && server.length === 1) {
            return server[0].name;
        }
        return this.translate.get('CUSTOM');
    }
    /**
     * @param {?} url
     * @return {?}
     */
    set serverUrl(url) {
        this.localStorage.set('SERVER', url);
    }
    /**
     * @return {?}
     */
    get apiUrl() {
        return this.serverUrl + 'api/';
    }
    /**
     * @return {?}
     */
    get publicApiUrl() {
        return this.serverUrl + 'public/api/';
    }
    /**
     * @return {?}
     */
    get uploadUrl() {
        return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'ImageContainers/cloudinary/upload';
    }
    /**
     * @return {?}
     */
    get uploadProxyUrl() {
        return (this.localStorage.get('SERVER_IMAGE') || Config.IMAGE_URL) + 'cloudinary/uploadProxyImage';
    }
    /**
     * @return {?}
     */
    get zapierInstagramUrl() {
        /** @type {?} */
        let url = this.serverUrl;
        switch (url) {
            case Config.PROD_URL:
                return Config.ZAPIER_INSTAGRAM_PROD_URL;
            default:
                return '';
        }
    }
    /**
     * @return {?}
     */
    get isTestpen() {
        return !this.coreConfig.isUniversal() && (location.hostname === 'testpen-dashboard.yoobic.com' || location.hostname === 'testpen-mobile.yoobic.com' || this.server === Config.TESTPEN_URL);
    }
    /**
     * @return {?}
     */
    get isSandbox() {
        return !this.coreConfig.isUniversal() && (location.hostname === 'dashboard-sandbox.yoobic.com' || location.hostname === 'operations-sandbox.yoobic.com' || location.hostname === 'operations-mobile-sandbox.yoobic.com');
    }
    /**
     * @return {?}
     */
    get isE2E() {
        return this.serverUrl === Config.E2E_URL;
    }
    /**
     * @return {?}
     */
    get isProduction() {
        return this.serverUrl === Config.PROD_URL;
    }
    /**
     * @return {?}
     */
    get isDemo() {
        return this.serverUrl === Config.DEMO_URL || this.serverUrl === Config.DEMO_FRESH_URL;
    }
    /**
     * @return {?}
     */
    getCurrentConfig() {
        /** @type {?} */
        let items = this.servers.map((/**
         * @param {?} server
         * @return {?}
         */
        server => ({
            title: server.name,
            url: server.url,
            _id: server._id,
            icon: 'yo-servers'
        })));
        /** @type {?} */
        let custom = {
            title: this.translate.get('CUSTOM'),
            url: null,
            _id: 'custom',
            icon: 'yo-edit'
        };
        /** @type {?} */
        let selections = items.filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s.url === this.serverUrl));
        /** @type {?} */
        let initialSelection;
        if (selections.length <= 0) {
            custom.url = this.serverUrl;
            initialSelection = custom;
        }
        else {
            initialSelection = selections[0];
        }
        items.unshift(custom);
        return { items, initialSelection, custom };
    }
}
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
Config.ctorParameters = () => [
    { type: LocalStorage },
    { type: CoreConfig },
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Session {
    /**
     * @param {?} localForage
     * @param {?} config
     */
    constructor(localForage, config) {
        this.localForage = localForage;
        this.config = config;
        this.openedChannels = [];
        this.selectedMissionDescription = null;
        this.selectedLocation = null;
    }
    /**
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl;
    }
    /**
     * @param {?=} clearUser
     * @return {?}
     */
    clear(clearUser = true) {
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
    }
}
Session.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Session.ctorParameters = () => [
    { type: LocalForageService },
    { type: Config }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const LoadingBarEventType = {
    PROGRESS: 0,
    VISIBLE: 1,
};
LoadingBarEventType[LoadingBarEventType.PROGRESS] = 'PROGRESS';
LoadingBarEventType[LoadingBarEventType.VISIBLE] = 'VISIBLE';
class LoadingBarEvent {
    /**
     * @param {?} type
     * @param {?} value
     */
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
class LoadingBar {
    constructor() {
        this.interval = 500; // in milliseconds
        this._progress = 0;
        this._visible = true;
        this._intervalCounterId = 0;
        this.observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this.subscriber = subscriber;
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set progress(value) {
        if (isPresent(value)) {
            if (value > 0) {
                this.visible = true;
            }
            this._progress = value;
            this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
        }
    }
    /**
     * @return {?}
     */
    get progress() {
        return this._progress;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        if (isPresent(value)) {
            this._visible = value;
            this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
        }
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?=} onCompleted
     * @return {?}
     */
    start(onCompleted = null) {
        if (!this.isStarting) {
            this.isStarting = true;
            this.complete();
            this.visible = true;
            this._intervalCounterId = setInterval((/**
             * @return {?}
             */
            () => {
                this.progress++;
                if (this.progress === 100) {
                    this.complete();
                }
            }), this.interval);
            this.isStarting = false;
        }
    }
    /**
     * @return {?}
     */
    complete() {
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
        this.progress = 100;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.visible = false;
            this.progress = 0;
        }), 250);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    emitEvent(event) {
        if (this.subscriber) {
            this.subscriber.next(event);
        }
    }
}
LoadingBar.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LoadingBar.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* beautify ignore:end */
class Requestor {
    /**
     * @param {?} http
     * @param {?} session
     * @param {?} config
     * @param {?} loadingBar
     * @param {?} coreConfig
     */
    constructor(http, session, config, loadingBar, coreConfig) {
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
    fetch(url, options) {
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
        res => {
            this.slimbarComplete();
            return res;
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        }));
    }
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
    post(url, body, token, withCount = false, isTempToken = false, looseCount = false, partialUrl = false) {
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
        (res) => {
            this.slimbarComplete();
            this.updateToken(res);
            if (res['_body'] === '') {
                return {};
            }
            return this.formatResponse(res, withCount);
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })));
    }
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
    patch(url, body, token, withCount = false, isTempToken = false, looseCount = false, partialUrl = false) {
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
        (res) => {
            this.slimbarComplete();
            this.updateToken(res);
            if (res['_body'] === '') {
                return {};
            }
            return this.formatResponse(res, withCount);
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })));
    }
    /**
     * @param {?} url
     * @param {?} body
     * @param {?=} blob
     * @param {?=} includeToken
     * @return {?}
     */
    postRaw(url, body, blob, includeToken) {
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
        (res) => {
            this.slimbarComplete();
            return res;
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })));
    }
    /**
     * @param {?} url
     * @param {?} data
     * @return {?}
     */
    postMultiPart(url, data) {
        this.slimbarStart();
        /** @type {?} */
        const formData = new FormData();
        keys(data).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            formData.append(key, data[key]);
        }));
        /** @type {?} */
        const headers = new HttpHeaders();
        return this.http
            .post(url, formData, { headers, observe: 'response', responseType: 'text' })
            .pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        (ret) => {
            this.slimbarComplete();
            return ret.body;
        })))
            .pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            throw e;
        })));
    }
    /**
     * @param {?} url
     * @param {?} file
     * @return {?}
     */
    postFile(url, file) {
        this.slimbarStart();
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => {
            /** @type {?} */
            let formData = new FormData();
            formData.append('file', file, file.name);
            /** @type {?} */
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (/**
             * @return {?}
             */
            () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(xhr.response ? JSON.parse(xhr.response) : '');
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                    this.slimbarComplete();
                }
            });
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.session.token);
            xhr.setRequestHeader('X-Application-Id', this.coreConfig.getAppId());
            xhr.setRequestHeader('Yoobic-Client-Version', this.coreConfig.getAppVersion());
            xhr.send(formData);
        }));
    }
    /**
     * @param {?} url
     * @param {?=} withCount
     * @param {?=} token
     * @param {?=} params
     * @param {?=} suppressToken
     * @return {?}
     */
    get(url, withCount = false, token, params, suppressToken) {
        this.slimbarStart();
        /** @type {?} */
        let httpParams = new HttpParams();
        if (params && params.length > 0) {
            params.forEach((/**
             * @param {?} p
             * @return {?}
             */
            p => {
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
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })), map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            this.slimbarComplete();
            this.updateToken(res);
            return this.formatResponse(res, withCount);
        })));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getBinaryContent(url) {
        this.slimbarStart();
        return this.http
            .get(url, { responseType: 'arraybuffer' })
            .pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            this.slimbarComplete();
            return retVal;
        })))
            .pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })));
    }
    /**
     * @param {?} url
     * @param {?} body
     * @return {?}
     */
    put(url, body) {
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
        (res) => {
            this.updateToken(res);
            this.slimbarComplete();
            return res.body;
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })));
    }
    /**
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    delete(url, body) {
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
        (res) => {
            this.updateToken(res);
            this.slimbarComplete();
            return res.body;
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        })));
    }
    /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    downloadFile(filename, mediaType, url, options) {
        this.slimbarStart();
        return this.fetch(url, options)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            return res && res.blob ? res.blob() : null;
        }))
            .then((/**
         * @param {?} blob
         * @return {?}
         */
        blob => {
            if (blob) {
                ((/** @type {?} */ (saveAs)))(blob, filename);
            }
            this.slimbarComplete();
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.slimbarComplete();
            return this.errorHandler(e, url);
        }));
    }
    /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    saveBlob(blob, filename) {
        ((/** @type {?} */ (saveAs)))(blob, filename);
    }
    /**
     * @param {?} array
     * @param {?} filename
     * @return {?}
     */
    saveArrayBuffer(array, filename) {
        /** @type {?} */
        let blob = new Blob([new Uint8Array(array)]);
        ((/** @type {?} */ (saveAs)))(blob, filename);
    }
    /**
     * @return {?}
     */
    getFilenameSuffix() {
        return '_' + new Date().toISOString().replace('.', '_');
    }
    /**
     * @private
     * @param {?} e
     * @param {?} url
     * @return {?}
     */
    errorHandler(e, url) {
        /** @type {?} */
        let isInvalidCredentials = false;
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
    }
    /**
     * @private
     * @param {?} res
     * @param {?=} withCount
     * @return {?}
     */
    formatResponse(res, withCount = false) {
        return withCount
            ? {
                data: res.body,
                count: +(res.headers.get('x-total-count') || res.headers.get('X-Total-Count') || res.headers.get('x-loose-count') || res.headers.get('X-Loose-Count')) || 0
            }
            : res.body;
    }
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
    buildHeaders(withCount = false, token, contentType, isTempToken, suppressToken, looseCount) {
        /** @type {?} */
        let headers = new HttpHeaders();
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
    }
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
    buildFetchHeaders(withCount = false, token, contentType, isTempToken, suppressToken, looseCount) {
        try {
            if (!this.coreConfig.isIE11() && Headers) {
                /** @type {?} */
                let headers = new Headers();
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
    }
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
    buildFetchHeadersFallback(withCount = false, token, contentType, isTempToken, suppressToken, looseCount) {
        /** @type {?} */
        let headers = {};
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
    }
    /**
     * @private
     * @param {?} res
     * @return {?}
     */
    updateToken(res) {
        if (res && res.url && res.url.indexOf(this.config.serverUrl) >= 0 && res.headers && res.headers.get('authorization')) {
            this.session.token = res.headers.get('authorization');
        }
    }
    /**
     * @private
     * @return {?}
     */
    slimbarStart() {
        this.loadingBar.start();
    }
    /**
     * @private
     * @return {?}
     */
    slimbarComplete() {
        this.loadingBar.complete();
    }
}
Requestor.unauthorizedEmitter = new EventEmitter();
Requestor.payloadTooBigEmitter = new EventEmitter();
Requestor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Requestor.ctorParameters = () => [
    { type: HttpClient },
    { type: Session },
    { type: Config },
    { type: LoadingBar },
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Algorithms {
    /**
     * @param {?} config
     * @param {?} rq
     */
    constructor(config, rq) {
        this.config = config;
        this.rq = rq;
    }
    /**
     * @param {?} imageUrl
     * @param {?} algorithmId
     * @return {?}
     */
    process(imageUrl, algorithmId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrl, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    }
    /**
     * @param {?} imageUrls
     * @param {?} algorithmId
     * @return {?}
     */
    processMultiple(imageUrls, algorithmId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrls, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    }
}
Algorithms.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Algorithms.ctorParameters = () => [
    { type: Config },
    { type: Requestor }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CACHE_KEYS = {
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
class Cache {
    /**
     * @param {?} localForage
     * @param {?} promise
     * @param {?} log
     */
    constructor(localForage, promise, log) {
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
    add(cacheKey, entryKey, item) {
        return this.localForage
            .get(cacheKey)
            .then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || {};
            if (entryKey) {
                data[entryKey] = item;
            }
            return this.localForage.set(cacheKey, data);
        }))
            .then((/**
         * @return {?}
         */
        () => item));
    }
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    get(cacheKey, entryKey) {
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data || {};
            return data[entryKey] || {};
        })));
    }
    /**
     * @param {?} cacheKey
     * @return {?}
     */
    getAll(cacheKey) {
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || {};
            /** @type {?} */
            let retVal = [];
            keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                if (data[key]) {
                    retVal.push(data[key]);
                }
            }));
            return retVal;
        }));
    }
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    remove(cacheKey, entryKey) {
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data || {};
            delete data[entryKey];
            return this.localForage.set(cacheKey, data);
        })));
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    getDatabaseCacheKey(collectionName) {
        return CACHE_KEYS.database + '.' + collectionName;
    }
    /**
     * @template T
     * @param {?} collectionName
     * @return {?}
     */
    getDatabaseCollection(collectionName) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return data || [];
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @return {?}
     */
    setDatabaseCollection(collectionName, items) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.set(cacheKey, items);
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @param {?=} idField
     * @param {?=} deletedKeys
     * @return {?}
     */
    updateDatabaseCollection(collectionName, items, idField = '_id', deletedKeys) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || [];
            if (items && items.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => items.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r[idField] === d[idField])) < 0));
            }
            data = [...data, ...items];
            if (deletedKeys && deletedKeys.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => deletedKeys.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r[idField] === d[idField])) < 0));
            }
            this.log.log('Syncing Database - Syncing ' + collectionName + ' done : ' + data.length + ' entities locally');
            return this.localForage.set(cacheKey, data);
        }));
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    clearDatabaseCollection(collectionName) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        this.log.log('Syncing Database - Clearing ' + collectionName);
        return this.localForage.remove(cacheKey);
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} patch
     * @param {?=} idField
     * @return {?}
     */
    upsertInDatabaseCollection(collectionName, entity, patch = false, idField = '_id') {
        entity[idField] = entity[idField] || Cache.OFFLINE_PREFIX + getUUID();
        return this.getByIdFromDatabaseCollection(collectionName, entity[idField]).then((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && patch) {
                entity = Object.assign({}, retVal, ((/** @type {?} */ (entity))));
            }
            return this.updateDatabaseCollection(collectionName, [entity], idField).then((/**
             * @return {?}
             */
            () => {
                return entity;
            }));
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    removeFromDatabaseCollection(collectionName, id, idField = '_id') {
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            d => d[idField] !== id));
            return this.setDatabaseCollection(collectionName, data);
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?} newEntity
     * @param {?=} idField
     * @return {?}
     */
    replaceFromDatabaseCollection(collectionName, id, newEntity, idField = '_id') {
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            d => d[idField] !== id));
            data = [...data, newEntity];
            return this.setDatabaseCollection(collectionName, data);
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    getByIdFromDatabaseCollection(collectionName, id, idField = '_id') {
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let retVal = data.find((/**
             * @param {?} d
             * @return {?}
             */
            d => d[idField] === id));
            return retVal;
        }));
    }
}
Cache.OFFLINE_PREFIX = 'offline_';
Cache.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Cache.ctorParameters = () => [
    { type: LocalForageService },
    { type: PromiseService },
    { type: Log }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IModel {
    /**
     * @return {?}
     */
    get formFields() {
        return cloneDeep(this._formFields);
    }
    /**
     * @param {?} f
     * @return {?}
     */
    set formFields(f) {
        this._formFields = f;
    }
    /**
     * @param {?} className
     */
    constructor(className) {
        this.className = className;
        this.searchableFields = new Array();
        this.mappingFields = new Map();
        this._formFields = new Array();
        this.appearance = new Map();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CONDITION_TYPES = ['field', 'tags', 'groups'];
/** @type {?} */
const CONDITION_ALL_OPERATORS = ['equals', 'notequals', 'in', 'notin', 'greaterthan', 'lessthan'];
/** @type {?} */
const SIMPLE_FIELD_TYPES = ['text', 'email', 'number', 'date', 'tel', 'time', 'range', 'starrating'];
/** @type {?} */
const WITH_VALUES_FIELD_TYPES = ['checkbox', 'toggle', 'select', 'selectmulti', 'selectbuttons', 'selectbuttonsmulti', 'autocomplete'];
/** @type {?} */
const ROLES = [
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
const ROLES_ASK = ['manager', 'creator', 'quora', 'academy', 'academyplus'];
/** @type {?} */
const ROLES_CONDITIONS = {
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
class Models {
    /**
     * @param {?} className
     * @param {?} fieldName
     * @return {?}
     */
    static addSearchableField(className, fieldName) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.searchableFields.push(fieldName);
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} fieldName
     * @param {?} order
     * @return {?}
     */
    static addMappingField(className, fieldName, order) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.mappingFields.set(order, fieldName);
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} entityListItemProperty
     * @param {?} appearance
     * @return {?}
     */
    static addAppearance(className, entityListItemProperty, appearance) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.appearance.set(entityListItemProperty, appearance);
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} field
     * @return {?}
     */
    static addFormField(className, field) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        /** @type {?} */
        let formFields = model.formFields;
        formFields = formFields.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name !== field.name));
        formFields.push(field);
        model.formFields = formFields;
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} baseClassName
     * @param {?} target
     * @return {?}
     */
    static addBaseModel(className, baseClassName, target) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        /** @type {?} */
        let base = this.createOrGetModel(baseClassName);
        /** @type {?} */
        let formFields = model.formFields || [];
        /** @type {?} */
        let baseFields = [];
        if (base.formFields) {
            base.formFields.map((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                if (formFields.findIndex((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.name === field.name)) < 0) {
                    baseFields.push(cloneDeep(field));
                }
            }));
        }
        model.formFields = compact(union(baseFields, formFields));
        model.searchableFields = uniq(union(cloneDeep(base.searchableFields), model.searchableFields));
        model.type = target;
        this.updateModel(className, model);
    }
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
    static setCollectionName(className, collectionName, fields, include, searchSubquery, feathersService, target, isCustom, detailComponent, icon) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
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
    }
    /**
     * @param {?} className
     * @return {?}
     */
    static clearCollectionName(className) {
        Models._models.delete(className);
    }
    /**
     * @param {?} className
     * @return {?}
     */
    static getModel(className) {
        /** @type {?} */
        let retVal;
        if (isString(className) === true) {
            retVal = this.createOrGetModel((/** @type {?} */ (className)));
        }
        else {
            Models._models.forEach((/**
             * @param {?} m
             * @return {?}
             */
            m => {
                if (m.type && m.type === className) {
                    retVal = m;
                }
            }));
        }
        return retVal;
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    static getModelByCollectionName(collectionName) {
        /** @type {?} */
        let model;
        Models._models.forEach((/**
         * @param {?} m
         * @return {?}
         */
        m => {
            if (m.collectionName === collectionName) {
                model = m;
            }
        }));
        if (!model && collectionName && collectionName.endsWith('_store')) {
            /** @type {?} */
            let name = collectionName.replace('_store', '');
            if (name === 'missiondescription') {
                name += 's';
            }
            return Models.getModelByCollectionName(name);
        }
        return model;
    }
    /**
     * @param {?} collectionName
     * @param {?=} advancedFiltersFields
     * @param {?=} campaignFields
     * @param {?=} isAdmin
     * @return {?}
     */
    static getFilterableFields(collectionName, advancedFiltersFields, campaignFields, isAdmin = false) {
        /** @type {?} */
        let fields = [];
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.formFields) {
            fields = cloneDeep(model.formFields);
        }
        if (model && model.isCustom && fields) {
            fields.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
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
            af => {
                /** @type {?} */
                let index = findIndex(fields, (/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.name === af.name));
                if (index < 0) {
                    fields.push(af);
                }
                else {
                    fields[index] = Object.assign({}, fields[index], af);
                }
            }));
        }
        if (campaignFields) {
            campaignFields = cloneDeep(campaignFields);
            campaignFields.forEach((/**
             * @param {?} c
             * @return {?}
             */
            c => {
                c.name += '.value';
                c.filterable = true;
                //c.sortable = true;
            }));
            fields = fields.concat(campaignFields);
        }
        /** @type {?} */
        let tenantIndex = findIndex(fields, (/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === '_tenant'));
        if (tenantIndex >= 0 && !isAdmin) {
            fields[tenantIndex].filterable = false;
        }
        /** @type {?} */
        let finalFields = [];
        fields.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            finalFields.push(f);
            if (f.collectionName && f.collectionName !== collectionName && f.filterable === true && f.showSubQueryFilters === true) {
                Models.getModelByCollectionName(f.collectionName).formFields.forEach((/**
                 * @param {?} subfield
                 * @return {?}
                 */
                subfield => {
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
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static getFieldName(field) {
        /** @type {?} */
        let fieldName = field.name + (field.columnDefinition && field.columnDefinition.name ? '.' + field.columnDefinition.name : '');
        if (field.columnDefinition && field.columnDefinition.forceName) {
            fieldName = field.columnDefinition.name;
        }
        return fieldName;
    }
    /**
     * @param {?} field
     * @param {?} translate
     * @return {?}
     */
    static getFieldTitle(field, translate) {
        /** @type {?} */
        let fieldTitle = field.title || field.name;
        fieldTitle = translate.polyglot(fieldTitle);
        return fieldTitle;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isBooleanField(field) {
        return isBooleanField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isNumberField(field) {
        return isNumberField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isPhotoField(field) {
        return isPhotoField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isMultiPhotosField(field) {
        return isMultiPhotosField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isPhotoOrMultiPhotosField(field) {
        return isPhotoOrMultiPhotosField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isVideoField(field) {
        return isVideoField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isDateTimeField(field) {
        return isDateTimeField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isIntervalField(field) {
        return isIntervalField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isChartableAutoFieldNoPhoto(field) {
        return Models.isChartableAutoField(field, false);
    }
    /**
     * @param {?} field
     * @param {?=} includePhoto
     * @return {?}
     */
    static isChartableAutoField(field, includePhoto = true) {
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
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isMultipleField(field) {
        return isMultipleField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isColoredField(field) {
        return isColoredField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static getFieldOperator(field) {
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
    }
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
    static getMobileFieldIcon(type) {
        /** @type {?} */
        let fields = [].concat(MOBILE_FORM_FIELDS_ALL).filter((/**
         * @param {?} field
         * @return {?}
         */
        field => field.type === type));
        if (fields && fields.length > 0) {
            return fields[0].icon;
        }
        return '';
    }
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} excludedFields
     * @return {?}
     */
    static exportWhere(collectionName, filters, excludedFields = []) {
        /** @type {?} */
        let retVal = filters.map((/**
         * @param {?} fs
         * @return {?}
         */
        fs => {
            /** @type {?} */
            let simplifiedFilters = [];
            fs.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                if ((!f.subQuery || f.collectionName === collectionName) && (!excludedFields || excludedFields.indexOf(f.field) < 0)) {
                    //&& !f.isFieldSelector
                    /** @type {?} */
                    let filter$$1 = Models.exportFilterField(f);
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
    }
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    static exportSubQuery(collectionName, filters, isAggregationQuery) {
        /** @type {?} */
        let retVal = [];
        if (filters && isArray(filters) && ((/** @type {?} */ (filters))).length > 0) {
            ((/** @type {?} */ (filters))).forEach((/**
             * @param {?} fs
             * @return {?}
             */
            fs => {
                fs.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    if (f.subQuery && f.collectionName !== collectionName) {
                        retVal.push({
                            collectionName: this.fixCollectionName(f.collectionName, isAggregationQuery),
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
    }
    /**
     * @param {?} collectionName
     * @param {?} search
     * @return {?}
     */
    static exportSearch(collectionName, search) {
        if (search && search.match && search.match(/^[0-9a-fA-F]{24}$/)) {
            return { _id: search };
        }
        else {
            /** @type {?} */
            let retVal = Models.getModelByCollectionName(collectionName).searchableFields.map((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                /** @type {?} */
                let filter$$1 = {};
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
    }
    /**
     * @param {?} collectionName
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    static fixCollectionName(collectionName, isAggregationQuery) {
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
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    static getPublicCollectionName(collectionName) {
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
    }
    /**
     * @param {?} params
     * @return {?}
     */
    static getPhotoFromParams(params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            let row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            let f = params.colDef.field.replace('.value', '');
            /** @type {?} */
            let photo = Models.extractPhoto(row[f], row, {}, f);
            return photo;
        }
        return null;
    }
    // get photos for multiphoto component
    /**
     * @param {?} params
     * @return {?}
     */
    static getPhotosFromParams(params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            let row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            let f = params.colDef.field.replace('.value', '');
            // field name
            /** @type {?} */
            let photos = [];
            if (row && f && row[f] && row[f].value && isArray(row[f].value)) {
                row[f].value.forEach((/**
                 * @param {?} v
                 * @param {?} multiIndex
                 * @return {?}
                 */
                (v, multiIndex) => {
                    photos.push(Models.extractPhoto(v, row, {}, f, FormFieldType.multiphotos, null, multiIndex));
                }));
            }
            return photos;
        }
        return null;
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    static getEmptyUrl(collectionName) {
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
    }
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
    static extractPhoto(data, missiondata, field, name, type, hideUser = false, multiIndex) {
        /** @type {?} */
        let photo = {};
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
                    let fieldData = get(missiondata, field.name || name);
                    /** @type {?} */
                    let extraData = fieldData && ((/** @type {?} */ (fieldData))).extraData ? ((/** @type {?} */ (fieldData))).extraData : {};
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
    }
    /*
           Return the transform to extract the fields from a mission description
       */
    /**
     * @param {?=} types
     * @return {?}
     */
    static getFieldTransform(types = []) {
        /**
         * @param {?} res
         * @return {?}
         */
        function getFieldTransformInternal(res) {
            if (res.data && res.data.forEach) {
                /** @type {?} */
                let fields = [];
                res.data.forEach((/**
                 * @param {?} missiondescription
                 * @return {?}
                 */
                (missiondescription) => {
                    /** @type {?} */
                    let missionFields = Models.getFields(missiondescription, types);
                    missionFields = missionFields.map((/**
                     * @param {?} field
                     * @return {?}
                     */
                    (field) => {
                        return assign(field, {
                            _id: field.name,
                            name: field.name + '.value',
                            operators: Models.getFieldOperator(field),
                            slideTitle: missiondescription.title
                        });
                    }));
                    fields = fields.concat(missionFields);
                }));
                res.data = fields;
            }
            return res;
        }
        return getFieldTransformInternal;
    }
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFields(missiondescription, types = [], excludedTypes = []) {
        return Models.getFieldsFromSlides(missiondescription.slides, types, excludedTypes);
    }
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFieldsFromSlides(slides, types = [], excludedTypes = []) {
        /** @type {?} */
        let fields = [];
        if (slides) {
            slides.forEach((/**
             * @param {?} slide
             * @param {?} index
             * @return {?}
             */
            (slide, index) => {
                if (slide.items) {
                    slide.items.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => {
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
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    static exportFilterField(f) {
        /** @type {?} */
        let filter$$1 = {};
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
                let def = filter$$1;
                def[f.field] = {};
                def[f.field][f.operator._id] = map$1(f.value, (/**
                 * @param {?} v
                 * @return {?}
                 */
                v => {
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
                let value = isArray(f.value) && isObject(f.value[0]) ? map$1(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
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
    }
    /**
     * @private
     * @param {?} className
     * @param {?=} override
     * @return {?}
     */
    static createOrGetModel(className, override) {
        Models._models = Models._models || new Map();
        if (Models._models.has(className) && override !== true) {
            return Models._models.get(className);
        }
        else {
            /** @type {?} */
            let model = new IModel(className);
            Models._models.set(className, model);
            return model;
        }
    }
    /**
     * @private
     * @param {?} className
     * @param {?} model
     * @return {?}
     */
    static updateModel(className, model) {
        /** @type {?} */
        let formFields = model.formFields || [];
        if (formFields.findIndex((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === '_tenant')) < 0 && model.collectionName && model.collectionName !== 'tenants') {
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
    }
}
Models._models = new Map();
Models.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Smartloc {
    /**
     * @param {?} session
     * @param {?} geoLoc
     * @param {?} config
     * @param {?} rq
     */
    constructor(session, geoLoc, config, rq) {
        this.session = session;
        this.geoLoc = geoLoc;
        this.config = config;
        this.rq = rq;
    }
    /**
     * @return {?}
     */
    get defaultPosition() {
        return this.geoLoc.defaultPosition;
    }
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    getLocation(forceRefresh = false) {
        if (this.hasRole('store') && !this.hasRole('admin')) {
            /** @type {?} */
            let promise;
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
                loc => {
                    if (loc && loc._geoloc && loc._geoloc.length > 1) {
                        this.session.user.location = loc;
                        /** @type {?} */
                        let position = new Position({ latitude: loc._geoloc[1], longitude: loc._geoloc[0] });
                        return position;
                    }
                    return null;
                }));
            }
        }
        return this.geoLoc.getLocation(forceRefresh);
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
        return this.geoLoc.getDistance(lat1, lon1, lat2, lon2, unit);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getLocationEntity(id) {
        /** @type {?} */
        let url = this.config.apiUrl + 'locations' + '/' + id;
        return this.rq.get(url).toPromise();
    }
    /**
     * @param {?} role
     * @return {?}
     */
    hasRole(role) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    }
}
Smartloc.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Smartloc.ctorParameters = () => [
    { type: Session },
    { type: GeoLocation },
    { type: Config },
    { type: Requestor }
];

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
class Googlemaps {
    /**
     * @param {?} rq
     * @param {?} geo
     * @param {?} config
     * @param {?} injector
     * @param {?} network
     * @param {?} cache
     */
    constructor(rq, geo, config, injector, network, cache) {
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
    autocompleteFromSync(input, location, offset = input.length, radius = 100000, language = this.translate.getCurrentLanguage(), types, components, query = false) {
        return this._autocomplete({
            input,
            offset,
            location: normalizeLocation(location),
            radius,
            language,
            types,
            components
        }, query);
    }
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
    autocompleteLocationObserver(input, offset = input.length, location = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), radius = 1000, language = this.translate.getCurrentLanguage(), types, components, query = false) {
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                input,
                offset,
                location: normalizeLocation(loc),
                radius,
                language,
                types,
                components
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._autocomplete(i, query))));
    }
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
    autocompleteMultiObserver(inputO, offsetO = inputO.pipe(map((/**
     * @param {?} s
     * @return {?}
     */
    s => s.length))), locationO = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), radius = 1000, language = this.translate.getCurrentLanguage(), types, components, query = false) {
        return combineLatest(inputO, offsetO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        (i) => this._autocomplete(i, query))));
    }
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
    nearbySearchFromSync(location, radius = 1000, keyword, language = this.translate.getCurrentLanguage(), name, minprice, maxprice, opennow, rankby, type, types) {
        return this._nearbySearch({
            location: normalizeLocation(location),
            radius,
            keyword,
            language,
            name: pipeJoin(name),
            minprice,
            maxprice,
            opennow,
            rankby,
            type,
            types: pipeJoin(types)
        });
    }
    /**
     * @param {?} next_page_token
     * @return {?}
     */
    nearbySearchNextResults(next_page_token) {
        return this._nextSearchResults(next_page_token);
    }
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
    nearbySearchLocationObserver(location = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), radius = 1000, keyword, language = this.translate.getCurrentLanguage(), name, minprice, maxprice, opennow, rankby, type, types) {
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                location: normalizeLocation(loc),
                radius,
                keyword,
                language,
                name: pipeJoin(name),
                minprice,
                maxprice,
                opennow,
                rankby,
                type,
                types: pipeJoin(types)
            };
        })), concatMap((/**
         * @param {?} input
         * @return {?}
         */
        input => this._nearbySearch(input))));
    }
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
    nearbySearchMultiObserver(locationO = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), keywordO, radius = 1000, language = this.translate.getCurrentLanguage(), nameO, minprice, maxprice, opennow, rankby, type, types) {
        return combineLatest(keywordO, nameO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        (i) => this._nearbySearch(i))));
    }
    /**
     * @param {?=} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    geocodeFromSync(address, components, bounds, language = this.translate.getCurrentLanguage(), region) {
        return this._geocode({
            address,
            components: pipeJoin(components),
            bounds: normalizeBounds(bounds),
            language,
            region
        });
    }
    /**
     * @param {?} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    geocodeAddressObserver(address, components, bounds, language = this.translate.getCurrentLanguage(), region) {
        return address.pipe(map((/**
         * @param {?} addr
         * @return {?}
         */
        (addr) => {
            return {
                address: addr,
                components: pipeJoin(components),
                bounds: normalizeBounds(bounds),
                language,
                region
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._geocode(i))));
    }
    /**
     * @param {?} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodeFromSyncLocation(latlng, language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return this._reverseGeocode({
            latlng: normalizeLocation(latlng),
            language,
            result_type,
            location_type
        });
    }
    /**
     * @param {?=} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodeLatLngObserver(latlng = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return normalizeObservable(latlng).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                latlng: normalizeLocation(loc),
                language,
                result_type,
                location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._reverseGeocode(i))));
    }
    /**
     * @param {?} place_id
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodeFromSyncPlaceID(place_id, language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return this._reverseGeocode({
            place_id,
            language,
            result_type,
            location_type
        }).pipe(map((/**
         * @param {?} results
         * @return {?}
         */
        results => results[0])));
    }
    /**
     * @param {?} place_idO
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodePlaceIDObserver(place_idO, language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return place_idO.pipe(map((/**
         * @param {?} place_id
         * @return {?}
         */
        (place_id) => {
            return {
                place_id,
                language,
                result_type,
                location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._reverseGeocode(i))), map((/**
         * @param {?} results
         * @return {?}
         */
        results => results[0])));
    }
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
    placePredictionsLocationObserver(input, location = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), language = this.translate.getCurrentLanguage(), offset = input.length, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                input,
                offset,
                location: normalizeLocation(loc),
                radius,
                language,
                types,
                components,
                address,
                search,
                type,
                limit,
                nearbyRadius,
                skipName,
                debug
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._placePredictions(i))));
    }
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
    placePredictionsFromSync(location, input, language = this.translate.getCurrentLanguage(), offset = input.length, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        return this._placePredictions({
            input,
            offset,
            location: normalizeLocation(location),
            radius,
            language,
            types,
            components,
            address,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }
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
    nearbyPlaceCodesFromSync(location, radius, keyword, language = this.translate.getCurrentLanguage(), name, minprice, maxprice, opennow, rankby, types, address, search, type, limit, nearbyRadius, skipName, debug) {
        return this._nearbyPlaceCodes({
            location: normalizeLocation(location),
            radius,
            keyword,
            language,
            name,
            minprice,
            maxprice,
            opennow,
            rankby,
            types,
            address,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }
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
    resolveAddressLocation(address, language = this.translate.getCurrentLanguage(), search, type, limit, nearbyRadius, skipName, debug) {
        return this._resolveAddressLocation({
            address,
            language,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    getCurrentAddresses(forceRefresh = false) {
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
            (p) => {
                return this.reverseGeocodeFromSyncLocation(p).toPromise();
            }))
                .then((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                /** @type {?} */
                let retVal = [];
                if (res && res.length > 0) {
                    retVal = res.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        /** @type {?} */
                        let position = new Position(d.geometry.location);
                        return {
                            address: d.formatted_address,
                            _id: d.id || d.formatted_address,
                            _geoloc: position.toGeoLoc(true),
                            coords: position.toJson()
                        };
                    }));
                }
                this.cache.add(CACHE_KEYS.addresses, CACHE_KEYS.addresses, retVal);
                return retVal;
            }));
        }
    }
    // public getStreetView(lat: number, lng: number) {
    //   let url= this.apiUrl+'streetView?'
    // }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl + 'GoogleMaps/';
    }
    /**
     * @private
     * @param {?} input
     * @param {?} query
     * @return {?}
     */
    _autocomplete(input, query) {
        return this.rq.post(`${this.apiUrl}place/autocomplete?query=${query}`, input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return res.predictions;
        })));
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _placePredictions(input) {
        return this.rq.post(this.apiUrl + 'place/predictions', input);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _nearbyPlaceCodes(input) {
        return this.rq.post(this.apiUrl + 'place/nearby-place-codes', input);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _resolveAddressLocation(input) {
        return this.rq.post(this.apiUrl + 'resolve-address-location', input);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _nearbySearch(input) {
        return this.rq.post(this.apiUrl + 'place/nearby', input);
    }
    /**
     * @private
     * @param {?} next_page_token
     * @return {?}
     */
    _nextSearchResults(next_page_token) {
        return this.rq.post(this.apiUrl + 'place/nearby', { next_page_token });
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _geocode(input) {
        return this.rq.post(this.apiUrl + 'geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return res.results;
        })));
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _reverseGeocode(input) {
        return this.rq.post(this.apiUrl + 'reverse-geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (isString(res)) {
                res = JSON.parse(res);
            }
            return uniqBy(res.results, (/**
             * @param {?} t
             * @return {?}
             */
            t => t.formatted_address));
        })));
    }
}
Googlemaps.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Googlemaps.ctorParameters = () => [
    { type: Requestor },
    { type: Smartloc },
    { type: Config },
    { type: Injector },
    { type: Network },
    { type: Cache }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Workplace {
    /**
     * @param {?} rq
     * @param {?} config
     */
    constructor(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl + 'workplace/';
    }
    /**
     * @return {?}
     */
    getAllGroups() {
        /** @type {?} */
        let url = this.apiUrl + 'getGroups';
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
        res => {
            res.data.forEach((/**
             * @param {?} g
             * @return {?}
             */
            g => (g._id = g.id)));
            return res;
        })));
    }
    /**
     * @param {?} groupIds
     * @param {?} options
     * @return {?}
     */
    postOnGroup(groupIds, options) {
        /** @type {?} */
        let url = this.apiUrl + 'post';
        return this.rq.post(url, {
            groupIds,
            options
        });
    }
}
Workplace.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Workplace.ctorParameters = () => [
    { type: Requestor },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Files {
    /**
     * @param {?} rq
     * @param {?} coreConfig
     * @param {?} log
     * @param {?} config
     */
    constructor(rq, coreConfig, log, config) {
        this.rq = rq;
        this.coreConfig = coreConfig;
        this.log = log;
        this.config = config;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isFile(file) {
        return isFile(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isBase64(file) {
        return isBase64(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isFileUri(file) {
        return isFileUri(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isImageFile(file) {
        return isImageFile(file);
    }
    /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    read(nativeFile, type = 'blob', encoding) {
        return read((/** @type {?} */ (nativeFile)), type, encoding);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getExtension(file) {
        return getExtension(file);
    }
    /**
     * @param {?} filename
     * @param {?} extension
     * @return {?}
     */
    changeExtension(filename, extension) {
        return changeExtension(filename, extension);
    }
    /**
     * @param {?} extension
     * @return {?}
     */
    getMaxSize(extension) {
        return getMaxSize(extension);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toPng(value) {
        return toPng(value);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isValid(file) {
        return isValid((/** @type {?} */ (file)));
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isImage(file) {
        return isImage(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isVideo(file) {
        return isVideo(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isAudio(file) {
        return isAudio(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isDocument(file) {
        return isDocument(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getType(file) {
        return getType(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getMimeType(file) {
        return getMimeType(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    getIcon(file) {
        return getIcon(file);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getVideoPoster(value) {
        return getVideoPoster(value);
    }
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    b64toBlob(b64Data, contentType = null, sliceSize = 512) {
        return b64toBlob(b64Data, contentType, sliceSize);
    }
    /**
     * @param {?} blob
     * @return {?}
     */
    blobToFile(blob) {
        return blobToFile(blob);
    }
    /**
     * @param {?} data
     * @param {?} file
     * @return {?}
     */
    b64ToFile(data, file) {
        return b64ToFile(data, (/** @type {?} */ (file)));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    saveBase64AsImageFile(data) {
        return saveBase64AsImageFile(data);
    }
    /**
     * @param {?} base64
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    resizeBase64Image(base64, maxWidth, maxHeight) {
        return resizeBase64Image(base64, maxWidth, maxHeight);
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64MimeType(base64) {
        return getBase64MimeType(base64);
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64Extension(base64) {
        return getBase64Extension(base64);
    }
    /**
     * @param {?} file
     * @param {?} maxWidth
     * @param {?} maxHeight
     * @return {?}
     */
    resizeImage(file, maxWidth, maxHeight) {
        return resizeImage((/** @type {?} */ (file)), maxWidth, maxHeight);
    }
    /**
     * @param {?} subfolder
     * @return {?}
     */
    getNativeDirectory(subfolder) {
        return getNativeDirectory(subfolder);
    }
    /**
     * @param {?} filePath
     * @return {?}
     */
    resolveFilePath(filePath) {
        return resolveFilePath(filePath);
    }
    /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    fixImageOrientation(path, fileName) {
        return fixImageOrientation(path, fileName);
    }
    //should only be called in cordova
    /**
     * @param {?} originalFilePath
     * @param {?=} disableOrientationFix
     * @return {?}
     */
    moveToImageDirectory(originalFilePath, disableOrientationFix = false) {
        return moveToImageDirectory(originalFilePath, disableOrientationFix);
    }
    /**
     * @param {?} fileDirPath
     * @param {?} fileEntry
     * @param {?} newName
     * @param {?} originalFilePath
     * @return {?}
     */
    moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath) {
        return moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
    }
    /**
     * @param {?} path
     * @param {?} fileName
     * @param {?} text
     * @param {?} options
     * @return {?}
     */
    fileNativeWriteFile(path, fileName, text, options) {
        return fileNativeWriteFile(path, fileName, text, options);
    }
    /**
     * @param {?} path
     * @param {?} fileName
     * @return {?}
     */
    fileNativeCheckFile(path, fileName) {
        return fileNativeCheckFile(path, fileName);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    fixAbsolutePath(data) {
        return fixAbsolutePath(data);
    }
    /**
     * @param {?} retVal
     * @return {?}
     */
    getCloudinaryUrl(retVal) {
        return getCloudinaryUrl(retVal);
    }
    /**
     * @param {?} filename
     * @param {?} mediaType
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    downloadFile(filename, mediaType, url, options) {
        return this.rq.downloadFile(filename, mediaType, url, options);
    }
    /**
     * @return {?}
     */
    getLocalFilePath() {
        return getLocalFilePath();
    }
    /**
     * @param {?} fileName
     * @return {?}
     */
    getLocalFileName(fileName) {
        return getLocalFileName(fileName);
    }
    /**
     * @param {?} blob
     * @param {?} fileName
     * @return {?}
     */
    saveToLocalFile(blob, fileName) {
        return saveToLocalFile(blob, fileName);
    }
    /**
     * @param {?} src
     * @param {?=} photo
     * @return {?}
     */
    getUrlWithAnnotations(src, photo) {
        return getUrlWithAnnotations(src, photo);
    }
    /**
     * @param {?} fileName
     * @return {?}
     */
    cleanFileName(fileName) {
        return cleanFileName(fileName);
    }
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    downloadFileToDevice(source, target) {
        return downloadFileToDevice(source, target);
    }
    /**
     * @param {?} filePath
     * @param {?=} fileName
     * @return {?}
     */
    showPdfOnDevice(filePath, fileName = null) {
        return showPdfOnDevice(filePath, fileName);
    }
    /**
     * @param {?} photoUrl
     * @return {?}
     */
    uploadProxy(photoUrl) {
        /** @type {?} */
        let url = this.config.uploadProxyUrl;
        return this.rq.post(url, { url: photoUrl }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return this.getCloudinaryUrl({ cloudinary: retVal });
        })));
    }
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    exportToFile(content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        let blob = new Blob([content], {
            type: type
        });
        return this.rq.saveBlob(blob, filename);
    }
    /**
     * @param {?} blob
     * @param {?} fileName
     * @param {?} mimeType
     * @return {?}
     */
    openBlob(blob, fileName, mimeType) {
        return openBlob(blob, fileName, mimeType);
    }
    /**
     * @param {?} filePath
     * @param {?} mimeType
     * @return {?}
     */
    afterOpenBlob(filePath, mimeType) {
        return afterOpenBlob(filePath, mimeType);
    }
    /**
     * @return {?}
     */
    _requestExternalStoragePermission() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (this.coreConfig.isAndroid() && this.coreConfig.isCordova()) {
                /** @type {?} */
                let permissions = ((/** @type {?} */ (window.cordova.plugins))).permissions;
                permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, (/**
                 * @param {?} initialStatus
                 * @return {?}
                 */
                initialStatus => {
                    if (!initialStatus.hasPermission) {
                        /** @type {?} */
                        let errorCallback = (/**
                         * @return {?}
                         */
                        () => {
                            this.log.error('Storage permission is not turned on');
                            reject(false);
                        });
                        permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, (/**
                         * @param {?} status
                         * @return {?}
                         */
                        status => {
                            if (!status.hasPermission) {
                                errorCallback();
                            }
                            else {
                                resolve(true);
                            }
                        }), errorCallback);
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
    }
}
Files.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Files.ctorParameters = () => [
    { type: Requestor },
    { type: CoreConfig },
    { type: Log },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Box {
    /**
     * @param {?} config
     * @param {?} rq
     * @param {?} coreConfig
     */
    constructor(config, rq, coreConfig) {
        this.config = config;
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} documentUrl
     * @return {?}
     */
    upload(documentUrl) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/uploadToBox';
        return this.rq.post(url, { params: { documentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data) {
                return retVal.data.id;
            }
            return null;
        })));
    }
    /**
     * @param {?} boxId
     * @return {?}
     */
    createViewingSession(boxId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/createViewingSessionBox';
        return this.rq.post(url, { params: { boxId } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data) {
                return retVal.data;
            }
            return null;
        })));
    }
    /**
     * @param {?} contentUrl
     * @return {?}
     */
    getViewingContent(contentUrl) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getViewingContentBox';
        return this.rq.post(url, { params: { contentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data) {
                /** @type {?} */
                let content = retVal.data;
                /** @type {?} */
                let headIndex = content.indexOf('<head>') + 6;
                /** @type {?} */
                let overwriteStyle = '<style type="text/css">';
                overwriteStyle += '.controls-center .scroll-previous-btn, .controls-center .scroll-next-btn, .controls-right .zoom-in-btn, .controls-right .zoom-out-btn, .controls-right {';
                overwriteStyle += '  display: initial !important;';
                overwriteStyle += '}';
                overwriteStyle += '.fullscreen-btn {';
                overwriteStyle += '  display: none !important;';
                overwriteStyle += '}';
                overwriteStyle += '</style>';
                /** @type {?} */
                let protocol = this.coreConfig.getProtocol();
                content = [content.slice(0, headIndex), overwriteStyle, content.slice(headIndex)].join('');
                content = content.replace(new RegExp('href="//', 'g'), 'href="' + protocol + '//');
                content = content.replace(new RegExp('src="//', 'g'), 'src="' + protocol + '//');
                return content;
            }
            return null;
        })));
    }
}
Box.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Box.ctorParameters = () => [
    { type: Config },
    { type: Requestor },
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Unsplash {
    /**
     * @param {?} rq
     * @param {?} coreConfig
     */
    constructor(rq, coreConfig) {
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    getAll(search, skip, limit) {
        /** @type {?} */
        let url;
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
        ret => {
            //{
            //count: search ? ret.total : 100,
            //data:
            return (search ? ret.results : ret).map((/**
             * @param {?} r
             * @return {?}
             */
            r => ({
                _id: r.id,
                title: r.description,
                value: r.urls.raw,
                thumb: r.urls.thumb
            })));
            //};
        })));
    }
}
Unsplash.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Unsplash.ctorParameters = () => [
    { type: Requestor },
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ResponseObject {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//, groupBy, flatMap, reduce
class Broker {
    /**
     * @param {?} rq
     * @param {?} box
     * @param {?} googlemaps
     * @param {?} workplace
     * @param {?} session
     * @param {?} files
     * @param {?} promise
     * @param {?} coreConfig
     * @param {?} log
     * @param {?} network
     * @param {?} transfer
     * @param {?} localForage
     * @param {?} config
     * @param {?} injector
     * @param {?} cache
     * @param {?} geoloc
     * @param {?} translate
     * @param {?} unsplash
     */
    constructor(rq, box, googlemaps, workplace, session, files, promise, coreConfig, log, network, transfer, localForage, config, injector, cache, geoloc, translate, unsplash) {
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
    init() { }
    /**
     * @return {?}
     */
    getApiUrl() {
        return this.config.apiUrl;
    }
    /**
     * @return {?}
     */
    getServerUrl() {
        return this.config.serverUrl;
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    getCollectionName(collectionName) {
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            return 'custommodelinstances';
        }
        return collectionName;
    }
    /**
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} idAttributeName
     * @return {?}
     */
    getById(collectionName, id, fields, include, idAttributeName) {
        /** @type {?} */
        let query = this.getQuery(collectionName, fields, include);
        delete query.limit;
        delete query.skip;
        delete query.order;
        delete query.subQuery;
        if (this.network.isOffline()) {
            return from(this.cache.getByIdFromDatabaseCollection(collectionName, id, idAttributeName));
        }
        else if (!idAttributeName || idAttributeName === '_id') {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(query));
            return this.rq.get(url);
        }
        else {
            /** @type {?} */
            let filters = [[{ field: idAttributeName, operator: { _id: 'eq' }, value: id }]];
            return this.getAll(collectionName, fields, include, null, filters).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                if (res.data && res.data.length > 0) {
                    return res.data[0];
                }
                return null;
            })));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    create(collectionName, entity) {
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName);
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline()) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.rq.post(url, entity);
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    update(collectionName, entity) {
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else if (collectionName === 'groups') {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName);
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
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} fields
     * @return {?}
     */
    save(collectionName, entity, fields) {
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.upsert(collectionName, entity).pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            res => this.getById(collectionName, res._id, fields))));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    patch(collectionName, entity) {
        if (!entity || !entity._id) {
            throw new Error('Cant patch an empty entity or an entity without an id');
        }
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity, true));
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + entity._id;
            return this.rq.patch(url, entity);
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} previousEntity
     * @param {?=} skipAcl
     * @return {?}
     */
    upsert(collectionName, entity, previousEntity, skipAcl) {
        if (!skipAcl) {
            this.setAcl(entity, ((/** @type {?} */ (entity))).group, false, collectionName);
        }
        this.incrementTags(collectionName, entity).subscribe((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        let suffixs = collectionName === 'missiondatas' ? ['.value', '.edit', '.value.fieldValue'] : ['._downloadURL', '.edit'];
        /** @type {?} */
        let hasFiles = this._hasFiles(entity, suffixs);
        if (this.network.isOffline() || !hasFiles) {
            return this.update(collectionName, entity);
        }
        else {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                this.uploadEntityFiles(entity, suffixs).then((/**
                 * @return {?}
                 */
                () => {
                    this.update(collectionName, entity).subscribe((/**
                     * @param {?} ret
                     * @return {?}
                     */
                    ret => {
                        if (ret._downloadURL && this.files.isDocument(ret._downloadURL)) {
                            this.box.upload(ret._downloadURL).subscribe((/**
                             * @param {?} boxId
                             * @return {?}
                             */
                            boxId => {
                                if (boxId) {
                                    ret.boxId = boxId;
                                }
                                this.update(collectionName, ret).subscribe((/**
                                 * @param {?} retval
                                 * @return {?}
                                 */
                                retval => {
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
                err => { }));
            }));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entities
     * @return {?}
     */
    upsertAll(collectionName, entities) {
        /** @type {?} */
        let obs = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        entity => this.upsert(collectionName, entity)));
        return forkJoin(obs);
    }
    /**
     * @param {?} entity
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @param {?=} promisesOnly
     * @param {?=} totalOffset
     * @return {?}
     */
    uploadEntityFiles(entity, suffixs = [], progressEmitter, tags, promisesOnly = false, totalOffset = 0) {
        /** @type {?} */
        let properties = this._getFileProperties(entity, suffixs);
        /** @type {?} */
        let count = 0;
        /** @type {?} */
        let promises = properties.map((/**
         * @param {?} prop
         * @return {?}
         */
        prop => {
            /** @type {?} */
            let promise;
            /** @type {?} */
            let file = get(entity, prop);
            promise = ((/**
             * @param {?} offsetIndex
             * @param {?} total
             * @return {?}
             */
            (offsetIndex, total) => {
                return (/**
                 * @return {?}
                 */
                () => this.prepareUpload(file)
                    .then((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    return this.upload(f, progressEmitter, offsetIndex, total, tags, totalOffset);
                }))
                    .then((/**
                 * @param {?} url
                 * @return {?}
                 */
                url => {
                    set(entity, prop, url);
                }))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => Promise.reject(err))));
            }))(count, properties.length);
            count += 1;
            return promise;
        }));
        if (promisesOnly) {
            return promises.length > 0 ? promises : (/** @type {?} */ ([(/**
                 * @return {?}
                 */
                () => Promise.resolve('empty'))]));
        }
        return this.promise.sequential(promises);
    }
    /**
     * @param {?} entities
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @return {?}
     */
    uploadEntitiesFiles(entities, suffixs = [], progressEmitter, tags) {
        /** @type {?} */
        let promises = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        entity => {
            return (/**
             * @return {?}
             */
            () => this.uploadEntityFiles(entity, suffixs, progressEmitter, tags, false));
        }));
        return this.promise.sequential(promises);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    prepareUpload(file) {
        return this.files._requestExternalStoragePermission().then((/**
         * @return {?}
         */
        () => {
            if (this.files.isBase64(file)) {
                return Promise.resolve(this.files.b64toBlob(file));
            }
            else if (this.files.isFileUri(file)) {
                return this.files.resolveFilePath((/** @type {?} */ (file)));
            }
            else {
                return Promise.resolve(file);
            }
        }));
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?} entity
     * @return {?}
     */
    updateAll(collectionName, query, entity) {
        /** @type {?} */
        let rawQuery = assign({}, query.where);
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        if (entity.group) {
            entity['_acl.groups.r'] = entity.group;
        }
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/update?where=' + encodeURIComponent(JSON.stringify(rawQuery));
        return this.rq.post(url, entity);
    }
    /**
     * @param {?} entity
     * @param {?=} group
     * @param {?=} addWrite
     * @param {?=} collectionName
     * @param {?=} users
     * @return {?}
     */
    setAcl(entity, group, addWrite = false, collectionName, users) {
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
    }
    /**
     * @return {?}
     */
    getCurrentGroups() {
        if (this.session.roles.indexOf('admin') < 0) {
            return this.session.groups;
        }
        else {
            return ['debug_v2'];
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    updateCustomModel(collectionName, entity) {
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            entity._modelName = collectionName;
            if (entity.location && entity.location._id) {
                entity.locationRef = entity.location._id;
            }
        }
    }
    /**
     * @param {?} file
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @param {?=} tags
     * @param {?=} totalOffset
     * @return {?}
     */
    upload(file, progressEmitter, offsetIndex = 0, total = 1, tags = [], totalOffset = 0) {
        tags = concat([this.session.userId], tags);
        //check for file created from base64 if we can send them through cordova transfert plugin.
        if (this.coreConfig.isCordova() && file.nativeURL) {
            /** @type {?} */
            let fileTransfer = this.transfer.create();
            if (progressEmitter) {
                fileTransfer.onProgress((/**
                 * @param {?} ev
                 * @return {?}
                 */
                ev => {
                    if (ev.lengthComputable) {
                        /** @type {?} */
                        let percentage = ((ev.loaded / ev.total) * 100) / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
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
            (result) => {
                /** @type {?} */
                let retVal = JSON.parse(result.response);
                return this.files.getCloudinaryUrl(retVal);
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                /** @type {?} */
                let fileError = err && err.message ? err.message : 'File Error';
                return Promise.reject(fileError);
            }));
        }
        else {
            /** @type {?} */
            let fileUploader = this.getFileUploader(null);
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                fileUploader.onBuildItemForm = (/**
                 * @param {?} fileItem
                 * @param {?} form
                 * @return {?}
                 */
                (fileItem, form) => {
                    form.append('tags', JSON.stringify(tags));
                });
                fileUploader.onCompleteItem = (/**
                 * @param {?} item
                 * @param {?} response
                 * @param {?} status
                 * @param {?} headers
                 * @return {?}
                 */
                (item, response, status, headers) => {
                    this.log.log('upload finish');
                    fileUploader.clearQueue();
                    if (status === 200) {
                        /** @type {?} */
                        let retVal = JSON.parse(response);
                        resolve(this.files.getCloudinaryUrl(retVal));
                    }
                    else {
                        reject(response ? JSON.parse(response) : 'error');
                    }
                });
                if (progressEmitter) {
                    fileUploader.onProgressItem = (/**
                     * @param {?} item
                     * @param {?} progress
                     * @return {?}
                     */
                    (item, progress) => {
                        /** @type {?} */
                        let percentage = progress / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
                        progressEmitter.next(percentage);
                    });
                }
                fileUploader.addToQueue([file]);
                fileUploader.queue[0].alias = 'undefined';
                //fileItem.alias = 'undefined';
                this.log.log('upload begin');
                fileUploader.uploadAll();
            }));
        }
    }
    /**
     * @param {?} data
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @return {?}
     */
    uploadData(data, progressEmitter, offsetIndex = 0, total = 1) {
        /** @type {?} */
        let file = this.files.b64toBlob(data);
        return this.upload(file, progressEmitter, offsetIndex, total);
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    incrementTags(collectionName, entity) {
        if (entity.tags && entity.tags.length > 0) {
            entity.tags = uniq(compact([].concat(entity.tags)));
            if (entity.tags.length > 0 && !this.network.isOffline()) {
                /** @type {?} */
                let url = this.config.apiUrl + 'tags/incrementTags';
                return this.rq.post(url, {
                    params: {
                        collectionName: Models.fixCollectionName(collectionName),
                        tags: entity.tags,
                        groups: [].concat(entity.group || entity._acl.groups.r),
                        entity
                    }
                });
            }
        }
        return of(null);
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    updateTags(collectionName) {
        /** @type {?} */
        let url = this.config.apiUrl + 'tags/updateTags';
        return this.rq.post(url, { params: { collection: collectionName } });
    }
    /**
     * @return {?}
     */
    createAllTags() {
        /** @type {?} */
        let url = this.config.apiUrl + 'businessLogic/createAllTags';
        return this.rq.post(url, { params: {} });
    }
    /**
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    delete(collectionName, id) {
        if (this.isOfflineId(id)) {
            return from(this.cache.removeFromDatabaseCollection(collectionName, id));
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + encodeURIComponent(id);
            return this.rq.delete(url);
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    deleteAll(collectionName, query) {
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName);
        /** @type {?} */
        let rawQuery = assign({}, query.where || { _id: { exists: true } });
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        return this.rq.delete(url, rawQuery);
    }
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
    getQuery(collectionName, fields, include, search, filters, sorts, skip = 0, limit = 20, subQuery = null, customFilter = null) {
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
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
                    f => {
                        f.push({ field: '_modelName', operator: { _id: 'eq' }, value: model.collectionName });
                    }));
                }
            }
        }
        /** @type {?} */
        let query = {};
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
            s => isString(s) || (s.colId && s.sort))).map((/**
             * @param {?} s
             * @return {?}
             */
            s => (isString(s) ? s : s.colId + ' ' + (s.sort ? s.sort.toUpperCase() : 'ASC'))));
        }
        else if (sorts && sorts.length === 0) {
            query.order = [];
        }
        else {
            query.order = ['_lmt DESC'];
        }
        /** @type {?} */
        let searchWhere = null;
        /** @type {?} */
        let filterWhere = null;
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
        let filterSubquery = Models.exportSubQuery(collectionName, filters);
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
    }
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} noOffline
     * @return {?}
     */
    getCount(collectionName, search, filters, subQuery = null, customFilter = null, noOffline = false) {
        if (this.network.isOffline()) {
            return this.getAllOffline(collectionName, false, search, filters, null, null, null, customFilter, false).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                return { count: ret.count, data: [] };
            })));
        }
        else {
            /** @type {?} */
            let query = this.getQuery(collectionName, null, null, search, filters, null, null, null, subQuery, customFilter);
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/count';
            //?where=' + encodeURIComponent(JSON.stringify(query.where || {}));
            /** @type {?} */
            let finalQuery = {};
            if (query.where) {
                finalQuery.where = query.where;
            }
            if (query.subQuery) {
                finalQuery.subQuery = query.subQuery;
            }
            /** @type {?} */
            let finalRes;
            return this.rq
                .post(url, finalQuery)
                .pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                finalRes = res;
                if (noOffline) {
                    return of([]);
                }
                else {
                    return from(this.getAllOffline(collectionName, true, search, filters, null, null, null, customFilter));
                }
            })))
                .pipe(map((/**
             * @param {?} offlineRes
             * @return {?}
             */
            offlineRes => {
                /** @type {?} */
                let count = finalRes || 0;
                if (offlineRes && offlineRes.count > 0) {
                    count += offlineRes.count;
                }
                return { count: count, data: [] };
            })));
        }
    }
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
    getAll(collectionName, fields, include, search, filters, sorts, skip = 0, limit = 20, tag = false, subQuery = null, customFilter = null, cacheId = null, looseCount = null, noCount = false, noOffline = false) {
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
            let query = this.getQuery(collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter);
            if (collectionName.indexOf('_store') >= 0) {
                return this.getAllOperation(collectionName, query);
            }
            /** @type {?} */
            let obs;
            if (this.network.isOffline()) {
                if (cacheId) {
                    obs = from(this.localForage.get(cacheId)).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    res => {
                        return res || (noCount ? [] : { count: 0, data: [] });
                    })));
                }
                else {
                    obs = this.getAllOffline(collectionName, false, search, filters, sorts, skip, limit, customFilter, noCount);
                }
            }
            else {
                /** @type {?} */
                let finalRes;
                obs = this.getAllQuery(collectionName, query, looseCount, noCount)
                    .pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    finalRes = res;
                    if (cacheId) {
                        this.localForage.set(cacheId, res);
                    }
                    if (noOffline) {
                        return of([]);
                    }
                    else {
                        return from(this.getAllOffline(collectionName, true, search, filters, sorts, skip, limit, customFilter, noCount));
                    }
                })))
                    .pipe(map((/**
                 * @param {?} offlineRes
                 * @return {?}
                 */
                (offlineRes) => {
                    if (noCount) {
                        finalRes = [...(offlineRes || []), ...(finalRes || [])];
                    }
                    else {
                        finalRes.data = [...(offlineRes.data || []), ...(finalRes.data || [])];
                    }
                    return finalRes;
                })));
            }
            return obs;
        }
    }
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} useTagsCollection
     * @return {?}
     */
    getAllTags(collectionName, search, filters, skip = 0, limit = 20, useTagsCollection = false) {
        filters = filters || [[]];
        //fix for "MongoError","message":"$geoNear, $near, and $nearSphere are not allowed in this context"
        if (collectionName === 'locations') {
            filters = filters.map((/**
             * @param {?} ff
             * @return {?}
             */
            ff => {
                return ff.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.field !== '_geoloc'));
            }));
        }
        if (this.network.isOffline()) {
            return this.getAllTagsOffline({ collectionName, search, filters });
        }
        else if (useTagsCollection) {
            //this is not used anymore
            /** @type {?} */
            let aggregateOptions = [{ $match: { collectionName: Models.fixCollectionName(collectionName) } }, { $group: { _id: '$tag', count: { $max: '$count' } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, { $group: { _id: 1, total: { $sum: 1 }, data: { $push: '$$ROOT' } } }, { $project: { count: '$total', data: { $slice: ['$data', skip, skip + limit] } } }];
            return this.aggregateQuery('tags', filters, aggregateOptions, search).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            (res) => (res && res.length > 0 ? { data: res[0].data, count: res[0].count } : { data: [], count: 0 }))));
        }
        else {
            /** @type {?} */
            let aggregateOptions = [{ $unwind: '$tags' }];
            if (search) {
                aggregateOptions.push({
                    $match: { tags: { $regex: search.replace(/([^a-z0-9]+)/gi, ''), $options: 'i' } }
                });
            }
            aggregateOptions = aggregateOptions.concat([{ $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, ...(skip > 0 ? [{ $skip: skip }] : []), ...(limit > 0 ? [{ $limit: limit }] : [])]);
            return this.aggregateQuery(collectionName, filters, aggregateOptions).pipe(map((/**
             * @param {?=} res
             * @return {?}
             */
            (res = []) => ({ data: res, count: res.length }))));
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getAllTagsOffline(config) {
        return this.getAllOffline(config.collectionName, false, config.search, config.filters, null, null, null, null, true).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            /** @type {?} */
            let data = [];
            /** @type {?} */
            let count = {};
            if (res && res.length > 0) {
                res.forEach((/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    if (t.tags) {
                        [].concat(t.tags).forEach((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        tag => {
                            count[tag] = count[tag] > 0 ? count[tag] + 1 : 1;
                        }));
                    }
                }));
                keys(count).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    data.push({ _id: key, tag: key, count: count[key] });
                }));
                data = orderBy(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => -d.count));
            }
            return { data, count: data.length, config };
        })));
    }
    /**
     * @param {?} config
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    getMultipleAllTags(config, skip = 0, limit = 20) {
        if (this.network.isOffline()) {
            /** @type {?} */
            let obs = config.map((/**
             * @param {?} c
             * @return {?}
             */
            c => this.getAllTagsOffline(c)));
            return combineLatest(obs).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                return ret;
            })));
        }
        else {
            /** @type {?} */
            let aggregateOptions = [{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, ...(skip > 0 ? [{ $skip: skip }] : []), ...(limit > 0 ? [{ $limit: limit }] : [])];
            /** @type {?} */
            let queries = config.map((/**
             * @param {?} conf
             * @return {?}
             */
            conf => {
                /** @type {?} */
                let filters = conf.filters || [];
                if (conf.collectionName === 'locations') {
                    filters = filters.map((/**
                     * @param {?} ff
                     * @return {?}
                     */
                    ff => {
                        return ff.filter((/**
                         * @param {?} f
                         * @return {?}
                         */
                        f => f.field !== '_geoloc'));
                    }));
                }
                return this.getAggregateQuery(conf.collectionName, filters, aggregateOptions, conf.search, null, null, null, conf.subQuery);
            }));
            return this.aggregateQueries(queries).pipe(map((/**
             * @param {?} rets
             * @return {?}
             */
            rets => {
                /** @type {?} */
                let retVal = rets.map((/**
                 * @param {?} res
                 * @param {?} i
                 * @return {?}
                 */
                (res, i) => ({ data: res, count: res.length, config: config[i] })));
                return retVal;
            })));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?=} looseCount
     * @param {?=} noCount
     * @return {?}
     */
    getAllQuery(collectionName, query, looseCount, noCount) {
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/find';
        return this.rq.post(url, { filter: query }, null, !noCount, false, looseCount);
        //let url = this.config.apiUrl + collectionName + '?filter=' + encodeURIComponent(JSON.stringify(query));
        //return this.rq.get(url, true);
    }
    /**
     * @param {?=} search
     * @return {?}
     */
    getAllGoogleMaps(search) {
        if (search) {
            return this.googlemaps.placePredictionsLocationObserver(search).pipe(map((/**
             * @param {?} predictions
             * @return {?}
             */
            predictions => {
                /** @type {?} */
                let details = flatten(predictions).filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => d.geometry && d.geometry.location));
                return {
                    count: details.length,
                    data: details.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        /** @type {?} */
                        let position = new Position(d.geometry.location);
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
            addresses => {
                return { count: addresses.length, data: addresses };
            })));
        }
    }
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    getAllUnsplash(search, skip, limit) {
        return this.unsplash.getAll(search, skip, limit);
    }
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @return {?}
     */
    getAllWorkplace(collectionName, search) {
        /** @type {?} */
        let graphEntity = collectionName.replace('workplace_', '');
        switch (graphEntity) {
            case 'groups':
                return (/** @type {?} */ (this.workplace.getAllGroups()));
        }
        return of({ count: 0, data: [] });
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    getAllOperation(collectionName, query) {
        /** @type {?} */
        let url = this.config.apiUrl + 'Operation/findDocument';
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
        res => {
            if (res.data && res.data.map) {
                res.data = res.data; //.map(r => r.doc);
            }
            return res;
        })));
    }
    /**
     * @param {?=} lastSync
     * @param {?=} progressEvent
     * @return {?}
     */
    syncDatabase(lastSync, progressEvent) {
        /** @type {?} */
        let collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            this.log.log('Syncing Database - Start');
            /** @type {?} */
            let promises = collections.map((/**
             * @param {?} entry
             * @param {?} i
             * @return {?}
             */
            (entry, i) => {
                return (/**
                 * @return {?}
                 */
                () => {
                    if (entry.max <= 0) {
                        return;
                    }
                    this.log.log('Syncing Database - Syncing ' + entry.name);
                    return this.cache.getDatabaseCollection(entry.name).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    data => {
                        /** @type {?} */
                        let filters = cloneDeep(entry.filters || [[]]);
                        filters.forEach((/**
                         * @param {?} fs
                         * @return {?}
                         */
                        fs => fs.forEach((/**
                         * @param {?} f
                         * @return {?}
                         */
                        f => {
                            if (f.value && isArray(f.value) && f.value.indexOf('currentLanguage') >= 0) {
                                f.value[f.value.indexOf('currentLanguage')] = this.translate.getCurrentLanguage();
                            }
                        }))));
                        if (lastSync && data.length > 0) {
                            // && ) {
                            filters.forEach((/**
                             * @param {?} f
                             * @return {?}
                             */
                            f => f.push({ field: '_lmt', operator: { _id: 'gte' }, value: lastSync })));
                        }
                        return (this.getAll(entry.name, entry.fields, null, null, filters, null, 0, Math.min(entry.max || 1000, 1000), null, null, null, null, null, null, true)
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
                        ret => {
                            if (progressEvent) {
                                progressEvent.emit((i / collections.length) * 100);
                            }
                            if (ret && ret.data) {
                                /** @type {?} */
                                let filePromises = [Promise.resolve(null)];
                                /** @type {?} */
                                let deletedKeys;
                                if (lastSync) {
                                    filePromises = [
                                        this.getDeletedEntities(entry.name, data)
                                            .toPromise()
                                            .then((/**
                                         * @param {?} deletedkeys
                                         * @return {?}
                                         */
                                        (deletedkeys) => {
                                            deletedKeys = deletedkeys;
                                        }))
                                    ];
                                }
                                if (entry.addToCache && entry.addToCache.length > 0) {
                                    entry.addToCache.forEach((/**
                                     * @param {?} key
                                     * @return {?}
                                     */
                                    key => {
                                        ret.data.forEach((/**
                                         * @param {?} item
                                         * @return {?}
                                         */
                                        item => {
                                            if (item[key]) {
                                                filePromises.push((/**
                                                 * @return {?}
                                                 */
                                                () => cacheFile(item[key])));
                                            }
                                        }));
                                    }));
                                }
                                return Promise.all(filePromises).then((/**
                                 * @return {?}
                                 */
                                () => {
                                    return this.cache.updateDatabaseCollection(entry.name, ret.data, '_id', deletedKeys);
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
            ret => {
                if (progressEvent) {
                    progressEvent.emit(100);
                }
                return ret;
            }));
        }
        return Promise.resolve(null);
    }
    /**
     * @return {?}
     */
    clearDatabase() {
        /** @type {?} */
        let collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            /** @type {?} */
            let promises = collections.map((/**
             * @param {?} entry
             * @return {?}
             */
            entry => {
                return (/**
                 * @return {?}
                 */
                () => this.cache.clearDatabaseCollection(entry.name));
            }));
            return this.promise.sequential(promises);
        }
        return Promise.resolve(null);
    }
    /**
     * @param {?} collectionName
     * @param {?} data
     * @return {?}
     */
    getDeletedEntities(collectionName, data) {
        data = data || [];
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getDeletedIds';
        /** @type {?} */
        let modelName = Models.fixCollectionName(collectionName, true);
        return this.rq.post(url, { modelName, ids: data.map((/**
             * @param {?} e
             * @return {?}
             */
            e => e._id)) }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal) {
                return retVal || [];
            }
            return [];
        })));
    }
    /**
     * @return {?}
     */
    getOfflineEntitiesCount() {
        return this.uploadDatabaseOrGetCount(true);
    }
    /**
     * @param {?=} progressEmitter
     * @return {?}
     */
    uploadDatabase(progressEmitter) {
        return this.uploadDatabaseOrGetCount(false, progressEmitter);
    }
    /**
     * @param {?} returnCount
     * @param {?=} progressEmitter
     * @return {?}
     */
    uploadDatabaseOrGetCount(returnCount, progressEmitter) {
        /** @type {?} */
        let total = 0;
        /** @type {?} */
        let count = 0;
        /** @type {?} */
        let offlineData = {};
        if (!this.isUploadingDatabase || this.network.isOffline()) {
            this.isUploadingDatabase = true;
            /** @type {?} */
            let collections = this.coreConfig.getSyncedCollections();
            return this.cache.getDatabaseCollection('custommodels').then((/**
             * @param {?} custommodels
             * @return {?}
             */
            custommodels => {
                if (collections && collections.length > 0) {
                    collections = cloneDeep(collections);
                    collections = collections.concat(custommodels.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => ({ name: c.name }))));
                    /** @type {?} */
                    let promisesCount = collections.map((/**
                     * @param {?} entry
                     * @return {?}
                     */
                    entry => {
                        return (/**
                         * @return {?}
                         */
                        () => this.cache.getDatabaseCollection(entry.name).then((/**
                         * @param {?} data
                         * @return {?}
                         */
                        data => {
                            data = data.filter((/**
                             * @param {?} e
                             * @return {?}
                             */
                            e => this.isOfflineEntity(e) && ((/** @type {?} */ (e))).status !== 'draft'));
                            offlineData[entry.name] = data;
                            total += data.length;
                        })));
                    }));
                    return this.promise.sequential(promisesCount).then((/**
                     * @return {?}
                     */
                    () => {
                        if (returnCount) {
                            this.isUploadingDatabase = false;
                            return total;
                        }
                        else {
                            this.log.log('uploadDatabase', 'total', total);
                            if (progressEmitter) {
                                progressEmitter.emit(total > 0 ? (count / total) * 100 : 0);
                            }
                            /** @type {?} */
                            let promises = [];
                            if (total > 0) {
                                collections.forEach((/**
                                 * @param {?} entry
                                 * @return {?}
                                 */
                                entry => {
                                    /** @type {?} */
                                    let data = offlineData[entry.name];
                                    data.forEach((/**
                                     * @param {?} entity
                                     * @return {?}
                                     */
                                    entity => {
                                        promises.push((/**
                                         * @return {?}
                                         */
                                        () => {
                                            /** @type {?} */
                                            let offlineId = entity._id;
                                            entity = Object.assign({}, entity);
                                            delete entity._id;
                                            return this.upsert(entry.name, entity)
                                                .toPromise()
                                                .then((/**
                                             * @param {?} retVal
                                             * @return {?}
                                             */
                                            retVal => {
                                                count += 1;
                                                if (progressEmitter) {
                                                    progressEmitter.emit((count / total) * 100);
                                                }
                                                this.log.log('uploadDatabase', 'count', count);
                                                return this.cache.replaceFromDatabaseCollection(entry.name, offlineId, retVal);
                                            }));
                                        }));
                                    }));
                                }));
                            }
                            return this.promise.sequential(promises).then((/**
                             * @return {?}
                             */
                            () => {
                                setTimeout((/**
                                 * @return {?}
                                 */
                                () => {
                                    if (progressEmitter) {
                                        progressEmitter.emit(100);
                                    }
                                }), 300);
                                this.isUploadingDatabase = false;
                                return total;
                            }));
                        }
                    }));
                }
            }));
        }
        return Promise.resolve(returnCount ? 0 : null);
    }
    /**
     * @param {?} entity
     * @return {?}
     */
    isOfflineEntity(entity) {
        return entity && entity._id && this.isOfflineId(entity._id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isOfflineId(id) {
        return id && id.startsWith && id.startsWith(Cache.OFFLINE_PREFIX);
    }
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
    getAllOffline(collectionName, offlineOnly, search, filters, sorts, skip = 0, limit = 20, customFilter = null, noCount = false) {
        return from(this.cache.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let model = Models.getModelByCollectionName(collectionName);
            if (offlineOnly) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.isOfflineEntity(d)));
            }
            if (filters && filters.length > 0) {
                /** @type {?} */
                let newData = [];
                filters.forEach((/**
                 * @param {?} fs
                 * @return {?}
                 */
                fs => {
                    /** @type {?} */
                    let subData = [...data];
                    fs.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.removeFromOffline !== true)).forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => {
                        subData = subData.filter((/**
                         * @param {?} e
                         * @return {?}
                         */
                        e => {
                            /** @type {?} */
                            let value = isArray(f.value) && isObject(f.value[0]) ? map$1(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
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
                                        ((/** @type {?} */ (e))).distance = this.geoloc.getDistance(e[f.field][1], e[f.field][0], value[1], value[0]);
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
                    newData = [...newData, ...subData];
                }));
                data = uniqBy(newData, (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e._id));
            }
            if (search && model && model.searchableFields) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
                    if (model.searchableFields.some((/**
                     * @param {?} name
                     * @return {?}
                     */
                    name => d[name] &&
                        d[name]
                            .toString()
                            .toUpperCase()
                            .indexOf(search.toUpperCase()) >= 0))) {
                        return true;
                    }
                    return false;
                }));
            }
            if (filters && filters.some((/**
             * @param {?} fs
             * @return {?}
             */
            fs => fs.some((/**
             * @param {?} f
             * @return {?}
             */
            f => f.operator._id === 'nearSphere'))))) {
                data = orderBy(data, ['distance']);
            }
            if (sorts) {
                data = orderBy(data, sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => s.colId)), sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => s.sort)));
            }
            /** @type {?} */
            let total = data.length;
            if (limit > 0) {
                skip = skip || 0;
                data = data.slice(skip, skip + limit);
            }
            return noCount ? data : { count: total, data: data };
        })));
    }
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
    aggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount = false, cacheId = null, customFilter, subQuery, aggregateOptionsOffline) {
        /** @type {?} */
        let obs;
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
                data => {
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
            let url = this.config.apiUrl + 'businesslogic/aggregateQuery';
            /** @type {?} */
            let query = this.getAggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount, customFilter, subQuery);
            obs = this.rq.post(url, { params: query }).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            retVal => {
                if (cacheId) {
                    this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        (retVal) => {
            /** @type {?} */
            let data = [];
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
    }
    /**
     * @param {?} queries
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @return {?}
     */
    aggregateQueries(queries, includeCount = false, cacheId = null) {
        /** @type {?} */
        let obs;
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
            let url = this.config.apiUrl + 'businesslogic/aggregateQueries';
            obs = this.rq.post(url, queries).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            (retVal) => {
                /** @type {?} */
                let finalArray = Array(queries.length);
                for (let i = 0; i < finalArray.length; i++) {
                    finalArray[i] = [];
                }
                if (retVal && retVal.data && retVal.data.some((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => isObject(d.doc)))) {
                    retVal.data.forEach((/**
                     * @param {?} d
                     * @return {?}
                     */
                    (d) => {
                        finalArray[d.index] = finalArray[d.index] || [];
                        finalArray[d.index].push(d.doc);
                    }));
                    retVal.data = finalArray;
                }
                else if (retVal && isArray(retVal.data) && retVal.data.length === 0) {
                    retVal.data = finalArray;
                }
                if (cacheId) {
                    this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        (retVal) => {
            /** @type {?} */
            let data = [];
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
    }
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
    getAggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount = false, customFilter, subQuery) {
        /** @type {?} */
        let match = {};
        /** @type {?} */
        let project = {};
        /** @type {?} */
        let filterWhere = null;
        /** @type {?} */
        let searchWhere = null;
        /** @type {?} */
        let defaultFields = [];
        /** @type {?} */
        let query = (/** @type {?} */ ({
            collectionName: Models.fixCollectionName(collectionName, true),
            includeCount
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
            (field, i) => {
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
    }
    /**
     * @param {?=} stages
     * @param {?=} groups
     * @param {?=} userIds
     * @return {?}
     */
    aggregateLogs(stages, groups, userIds) {
        /** @type {?} */
        let url = this.config.apiUrl + 'AdminDashboard/aggregateLogs';
        return this.rq.post(url, { stages, groups, userIds });
    }
    /**
     * @param {?} query
     * @param {?} collectionName
     * @return {?}
     */
    textSearch(query, collectionName) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/textSearch';
        return this.rq.post(url, { query, modelName: collectionName });
    }
    /**
     * @param {?} file
     * @param {?} group
     * @param {?=} hideMobile
     * @param {?=} fileName
     * @param {?=} tenantRef
     * @return {?}
     */
    createFile(file, group, hideMobile = true, fileName, tenantRef) {
        return this.upsert('files', {
            _downloadURL: file,
            _filename: file.name,
            group: group,
            hideMobile: hideMobile,
            mimeType: file.type,
            size: file.size,
            _tenantRef: tenantRef
        });
    }
    /**
     * @param {?=} fileTypes
     * @param {?=} maxFileSize
     * @return {?}
     */
    getFileUploader(fileTypes, maxFileSize) {
        /** @type {?} */
        let options = {
            maxFileSize: maxFileSize,
            url: this.config.uploadUrl
        };
        // if (fileTypes && fileTypes.length > 0) {
        //     options.allowedFileType = fileTypes;
        // }
        return new FileUploader(options);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    execute(params) {
        /** @type {?} */
        let url = this.config.apiUrl + 'Endpoints/execute';
        return this.rq.post(url, { params });
    }
    /**
     * @param {?} operationId
     * @return {?}
     */
    undoOperation(operationId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'operation/undoDelete';
        return this.rq.post(url, { operationId });
    }
    /**
     * @param {?} locations
     * @return {?}
     */
    getMarkers(locations) {
        return locations
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        (l) => l._geoloc && l._geoloc.length > 1))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        (l) => {
            return {
                _id: l._id,
                address: l.address,
                latitude: l._geoloc[1],
                longitude: l._geoloc[0],
                title: l.title,
                color: l.status === 'place' ? 'success' : l.status === 'file' ? 'info' : l.status === 'error' ? 'danger' : l.status === 'prediction' ? 'stable' : 'dark'
            };
        }));
    }
    /**
     * @param {?} id
     * @param {?} mode
     * @param {?=} customFilter
     * @return {?}
     */
    getUserOrLocationStat(id, mode, customFilter) {
        /** @type {?} */
        let value = (/** @type {?} */ ((isString(id) ? [{ _id: id }] : id)));
        /** @type {?} */
        let ref = mode === 'campaign' ? 'descriptionRef' : mode === 'location' ? 'locationRef' : 'ownerRef';
        /** @type {?} */
        let filters = [[{ field: ref, operator: { _id: 'inq' }, value: value }]];
        /** @type {?} */
        let options = [
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
        (stats) => {
            if (stats && stats.length > 0) {
                stats[0].available = (stats[0].count || 0) - (stats[0].finished || 0) - (stats[0].booked || 0) - (stats[0].archived || 0);
                stats[0].tobevalidated = (stats[0].finished || 0) - (stats[0].validated || 0) - (stats[0].rejected || 0);
            }
            return stats;
        })));
    }
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    setTimescale(filters, timescale, dateField = 'finishedDate', endDate, previous = false) {
        if (timescale) {
            filters = filters || [];
            filters.forEach((/**
             * @param {?} fs
             * @return {?}
             */
            fs => {
                fs = fs || [];
                remove(fs, (/**
                 * @param {?} f
                 * @return {?}
                 */
                (f) => f.field === dateField));
                fs.push({
                    field: dateField,
                    operator: { _id: 'between', interval: true },
                    value: getStartAndEndDates(timescale, endDate, undefined, undefined, previous)
                });
            }));
        }
    }
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    _hasFiles(entity, suffixs = []) {
        /** @type {?} */
        let retVal = false;
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop) && this.files.isImageFile(entity[prop])) {
                retVal = true;
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            suffix => {
                if (suffix) {
                    /** @type {?} */
                    let object = get(entity, prop + suffix);
                    if (isArray(object)) {
                        // for multiphoto field, value is an array;
                        /** @type {?} */
                        let extraDataSuffix = '.extraData';
                        /** @type {?} */
                        let extraData = get(entity, prop + extraDataSuffix);
                        object.forEach((/**
                         * @param {?} v
                         * @param {?} index
                         * @return {?}
                         */
                        (v, index) => {
                            if (this.files.isImageFile(v)) {
                                retVal = true;
                            }
                            if (extraData && extraData[index] && extraData[index].edit) {
                                if (this.files.isImageFile(extraData[index].edit)) {
                                    retVal = true;
                                }
                            }
                        }));
                    }
                    else {
                        if (this.files.isImageFile(get(entity, prop + suffix))) {
                            retVal = true;
                        }
                    }
                }
            }));
        }
        return retVal;
    }
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    _getFileProperties(entity, suffixs = []) {
        /** @type {?} */
        let retVal = [];
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop) && this.files.isImageFile(entity[prop])) {
                retVal.push(prop);
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            suffix => {
                if (suffix) {
                    /** @type {?} */
                    let objectPath = get(entity, prop + suffix);
                    // for multiphoto field, value is an array; and for todo with linked multi photo we need to do it to
                    if (isArray(objectPath)) {
                        /** @type {?} */
                        let extraDataSuffixs = ['.extraData', '.value.fieldExtra'];
                        extraDataSuffixs.forEach((/**
                         * @param {?} extraDataSuffix
                         * @return {?}
                         */
                        extraDataSuffix => {
                            /** @type {?} */
                            let extraData = get(entity, prop + extraDataSuffix);
                            objectPath.forEach((/**
                             * @param {?} v
                             * @param {?} index
                             * @return {?}
                             */
                            (v, index) => {
                                if (this.files.isImageFile(v)) {
                                    retVal.push(prop + suffix + '[' + index + ']');
                                }
                                if (extraData && extraData[index] && extraData[index].edit) {
                                    if (this.files.isImageFile(extraData[index].edit)) {
                                        retVal.push(prop + extraDataSuffix + '[' + index + ']' + '.edit');
                                    }
                                }
                            }));
                        }));
                    }
                    else {
                        if (this.files.isImageFile(objectPath)) {
                            retVal.push(prop + suffix);
                        }
                    }
                }
            }));
        }
        retVal = uniq(retVal);
        return retVal;
    }
}
Broker.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Broker.ctorParameters = () => [
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
];
/**
 * @param {?} timescale
 * @param {?=} endDate
 * @param {?=} amount
 * @param {?=} notsliding
 * @param {?=} previous
 * @return {?}
 */
function getStartAndEndDates(timescale, endDate, amount, notsliding, previous = false) {
    /** @type {?} */
    let lastDate = endDate || new Date();
    amount = amount || 7;
    /** @type {?} */
    let period = 'days';
    /** @type {?} */
    let startof = 'day';
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
    let dateFrom = startOf(dateAdd(utc(toDate(lastDate)), period, -amount), startof);
    /** @type {?} */
    let dateTo = toDate(lastDate);
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
let conditions = {
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
        g => ROLES.indexOf(g._id) < 0 && g.isRole !== true));
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
let Condition = class Condition extends ICondition {
};
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
let ConditionalField = class ConditionalField extends IConditionalField {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ADMIN_FILES_TYPE = ['locations', 'user', 'geofilters', 'campaignfilters', 'products', 'locationtypes'];
/** @type {?} */
const FORMCREATOR_FILES_TYPE = ['pages'];
/** @type {?} */
const FORM_FILES_IMAGE_MIME = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp'];
/** @type {?} */
const FORM_FILES_IMAGE_FILTER = [[{ field: 'mimeType', operator: { _id: 'inq' }, value: FORM_FILES_IMAGE_MIME }]];
/** @type {?} */
const FORM_FILES_GROUP_FILTER = [[{ field: 'mimeType', operator: { _id: 'inq' }, value: FORM_FILES_IMAGE_MIME }, { field: 'tags', operator: { _id: 'inq' }, value: ['group'] }]];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Tenant = class Tenant extends ITenant {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let LocationType = class LocationType extends ILocationType {
};
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
const LOCATION_GEOCODESTATUS = ['file', 'geocoder', 'place', 'prediction', 'error'];
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
let Location = class Location {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let conditions$1 = {
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
let User = class User extends IUser {
    /**
     * @param {?} user
     * @return {?}
     */
    static getDisplayName(user) {
        if (user) {
            /** @type {?} */
            let displayName = user.username;
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
    }
    /**
     * @return {?}
     */
    static getSimpleFields() {
        return ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
    }
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
let UserSettings = class UserSettings extends IUserSettings {
};
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
let SimpleUser = class SimpleUser extends ISimpleUser {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Notification = class Notification extends INotification {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Push$1 {
    /**
     * @param {?} coreConfig
     * @param {?} log
     * @param {?} config
     * @param {?} rq
     * @param {?} oneSignal
     * @param {?} pushNative
     */
    constructor(coreConfig, log, config, rq, oneSignal, pushNative) {
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
    /**
     * @return {?}
     */
    get oneSignalPlayerIdChange$() {
        return this._oneSignalPlayerIdChange.asObservable();
    }
    /**
     * @return {?}
     */
    get notificationReceived$() {
        return this._notificationReceived.asObservable();
    }
    /**
     * @param {?} user
     * @return {?}
     */
    registerOneSignal(user) {
        if (this.registered === true) {
            //|| this.coreConfig.getAppId() === 'uk.co.boots.yoobicoperations'
            return Promise.resolve(user);
        }
        this.registered = true;
        /** @type {?} */
        let onesignalAppId = this.coreConfig.getKey('onesignalAppId');
        this._parentSubscription = new Subscription();
        if (this.coreConfig.isCordova()) {
            //OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });
            this.oneSignal.startInit(onesignalAppId, this.coreConfig.getKey('googleProjectNumber'));
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
            this._parentSubscription.add(this.oneSignal.handleNotificationReceived().subscribe((/**
             * @param {?} notif
             * @return {?}
             */
            notif => this.onNotificationReceived(notif))));
            this._parentSubscription.add(this.oneSignal.handleNotificationOpened().subscribe((/**
             * @param {?} notif
             * @return {?}
             */
            notif => this.onNotificationOpened(notif))));
            this.oneSignal.endInit();
            return this.oneSignal.getIds().then((/**
             * @param {?} retVal
             * @return {?}
             */
            retVal => {
                this.oneSignal.setSubscription(true);
                this.oneSignal.sendTags(pick(user, this.tags));
                if (retVal && retVal.userId) {
                    this.currentOneSignalId = retVal.userId;
                    this.updateUserOneSignalIds(user, this.currentOneSignalId);
                    if (user.email) {
                        this.oneSignal.syncHashedEmail(user.email);
                    }
                    if (retVal.pushToken) {
                        this.addToken(user, retVal.pushToken);
                    }
                }
                this._oneSignalPlayerIdChange.next(retVal.userId);
                return user;
            }), (/**
             * @param {?} err
             * @return {?}
             */
            err => {
                this.log.forceLog(err);
                return user;
            }));
        }
        else if (this.coreConfig.isWeb() && window.OneSignal) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                if (!window.OneSignal.isPushNotificationsSupported() || location.hostname === 'localhost') {
                    return resolve(user);
                }
                window.OneSignal.push([
                    'init',
                    {
                        appId: onesignalAppId,
                        autoRegister: true,
                        notifyButton: { enable: false },
                        safari_web_id: this.coreConfig.getKey('onesignalSafariWebId')
                    }
                ]);
                window.OneSignal.push((/**
                 * @return {?}
                 */
                () => {
                    window.OneSignal.sendTags(pick(user, this.tags));
                    window.OneSignal.on('notificationDisplay', (/**
                     * @param {?} ev
                     * @return {?}
                     */
                    ev => {
                        this.onNotificationReceived(ev);
                    }));
                    window.OneSignal.getUserId().then((/**
                     * @param {?} userId
                     * @return {?}
                     */
                    userId => {
                        this.currentOneSignalId = userId;
                        this.updateUserOneSignalIds(user, this.currentOneSignalId);
                        resolve(user);
                    }));
                }));
            }));
        }
        else {
            return Promise.resolve(user);
        }
    }
    /**
     * @param {?} user
     * @param {?} oneSignalId
     * @return {?}
     */
    updateUserOneSignalIds(user, oneSignalId) {
        if (user) {
            user.oneSignalId = uniq(compact(union([].concat(user.oneSignalId), [oneSignalId])));
            user.oneSignalAppIds = user.oneSignalAppIds || {};
            /** @type {?} */
            let bundleId = this.coreConfig.getAppId().replace(/\./g, '_');
            user.oneSignalAppIds[bundleId] = uniq(compact(union([].concat(user.oneSignalAppIds[bundleId]), [oneSignalId])));
        }
    }
    /**
     * @param {?} notif
     * @return {?}
     */
    onNotificationReceived(notif) {
        this._notificationReceived.next({ type: 'received', notification: notif });
    }
    /**
     * @param {?} notif
     * @return {?}
     */
    onNotificationOpened(notif) {
        this._notificationReceived.next({
            type: 'opened',
            action: notif.action,
            notification: notif.notification
        });
    }
    /**
     * @param {?} user
     * @return {?}
     */
    unregisterOneSignal(user) {
        if (this.coreConfig.isCordova()) {
            this.oneSignal.setSubscription(false);
            if (this._parentSubscription) {
                this._parentSubscription.unsubscribe();
                this._parentSubscription = null;
            }
            user.oneSignalId = without(user.oneSignalId, this.currentOneSignalId);
            user.oneSignalAppIds = user.oneSignalAppIds || {};
            /** @type {?} */
            let bundleId = this.coreConfig.getAppId().replace(/\./g, '_');
            user.oneSignalAppIds[bundleId] = without(user.oneSignalAppIds[bundleId], this.currentOneSignalId);
            this.registered = false;
        }
    }
    /**
     * @param {?} user
     * @param {?} token
     * @return {?}
     */
    addToken(user, token) {
        /** @type {?} */
        let platform = this.coreConfig.isIOS() ? 'ios' : 'android';
        if (!user._messaging || !isArray(user._messaging.pushTokens)) {
            user._messaging = { pushTokens: [] };
        }
        user._messaging.pushTokens.push({ token: token, platform: platform });
        user._messaging.pushTokens = uniqBy(user._messaging.pushTokens, (/**
         * @param {?} push
         * @return {?}
         */
        push => push.token));
        delete ((/** @type {?} */ (user))).messaging;
    }
    /**
     * @param {?} user
     * @param {?} token
     * @return {?}
     */
    removeToken(user, token) {
        if (user._messaging && isArray(user._messaging.pushTokens)) {
            user._messaging.pushTokens = filter(user._messaging.pushTokens, (/**
             * @param {?} push
             * @return {?}
             */
            push => push.token !== token));
        }
    }
    /**
     * @param {?} user
     * @param {?} platform
     * @return {?}
     */
    getUserTokens(user, platform) {
        /** @type {?} */
        let tokens = [];
        if (user._messaging && user._messaging.pushTokens) {
            tokens = union(map$1(filter(user._messaging.pushTokens, (/**
             * @param {?} push
             * @return {?}
             */
            push => push.platform === platform)), 'token'));
        }
        return tokens;
    }
    /**
     * @param {?} groups
     * @param {?} notification
     * @return {?}
     */
    notifyGroups(groups, notification) {
        groups = [].concat(groups);
        if (groups && groups.length > 0) {
            notification.group = groups;
            //notification.userQuery = { where: { '_acl.groups.r': { inq: groups } } };
            return this.notify(notification);
        }
        else {
            return of(null);
        }
    }
    /**
     * @param {?} users
     * @param {?} notification
     * @return {?}
     */
    notifyUsers(users, notification) {
        if (users && users.length > 0) {
            return this.notify(notification, true, users.map((/**
             * @param {?} u
             * @return {?}
             */
            u => u._id)));
        }
        else {
            return of(null);
        }
    }
    /**
     * @param {?} userId
     * @param {?} notification
     * @return {?}
     */
    notifyUserById(userId, notification) {
        if (userId) {
            return this.notify(notification, true, [userId]);
        }
        else {
            return of(null);
        }
    }
    /**
     * @param {?} userIds
     * @param {?} notification
     * @return {?}
     */
    notifyUsersById(userIds, notification) {
        if (userIds && userIds.length > 0) {
            return this.notify(notification, true, userIds);
        }
        else {
            return of(null);
        }
    }
    /**
     * @param {?} userQuery
     * @param {?} notification
     * @return {?}
     */
    notifyUsersByQuery(userQuery, notification) {
        if (!isEmpty(userQuery) && (!isEmpty(userQuery.where) || !isEmpty(userQuery.subQuery.where))) {
            //notification.userQuery = { where: { _id: { inq: userIds } } };
            notification.userQuery = userQuery;
            notification._tenantRef = notification._tenantRef || get(userQuery, ['where', '_tenantRef']) || get(userQuery, ['subQuery', 'where', '_tenantRef']);
            return this.notify(notification);
        }
        else {
            return of(null);
        }
    }
    /**
     * @param {?} notification
     * @param {?=} noQuery
     * @param {?=} userIds
     * @return {?}
     */
    notify(notification, noQuery = false, userIds) {
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
            let url = this.config.apiUrl + 'notifications/sendTargetedNotification';
            return this.rq.post(url, { userIds, notification });
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + 'businesslogic/sendNotification';
            return this.rq.post(url, notification);
        }
    }
    //deprecated
    /**
     * @protected
     * @return {?}
     */
    _registerNative() {
        if (this.coreConfig.isCordova()) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                /** @type {?} */
                let promiseFulfilled = false;
                this.push = this.pushNative.init({
                    android: {
                        senderID: this.coreConfig.getKey('googleProjectNumber'),
                        iconColor: Colors.success,
                        icon: 'notify'
                    },
                    ios: { alert: 'true', badge: 'true', sound: 'false' }
                });
                this.push.on('registration').subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    promiseFulfilled = true;
                    resolve(data.registrationId);
                }));
                this.push.on('error').subscribe((/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    reject(error);
                }));
                this.push.on('notification').subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => { }));
                //sometimes on ios if the push are not enable it will not send an error, so we check after 10 sec
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (!promiseFulfilled) {
                        reject('timeout');
                    }
                }), 10000);
            }));
        }
        else {
            return (/** @type {?} */ (Promise.reject('not cordova')));
        }
    }
}
Push$1.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Push$1.ctorParameters = () => [
    { type: CoreConfig },
    { type: Log },
    { type: Config },
    { type: Requestor },
    { type: OneSignal },
    { type: Push }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Authentication {
    /**
     * @param {?} rq
     * @param {?} push
     * @param {?} config
     * @param {?} broker
     * @param {?} network
     * @param {?} localStorage
     * @param {?} localForage
     * @param {?} session
     * @param {?} coreConfig
     */
    constructor(rq, push, config, broker, network, localStorage, localForage, session, coreConfig) {
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
    login(username, password, roles) {
        /** @type {?} */
        let url = this.broker.getServerUrl() + 'auth/login';
        return this.rq.post(url, { username, password, roles }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.afterLogin(res);
            return res;
        })), catchError((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.session.token = null;
            /** @type {?} */
            let err;
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
    }
    /**
     * @param {?} accessToken
     * @param {?=} provider
     * @return {?}
     */
    loginSocial(accessToken, provider = 'facebook') {
        /** @type {?} */
        let url = this.broker.getServerUrl() + 'auth/' + provider;
        return this.rq.post(url, { accessToken }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.afterLogin(res);
            return res;
        })), catchError((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.session.token = null;
            return throwError(res.json().error);
        })));
    }
    /**
     * @param {?} tenant
     * @param {?} method
     * @param {?} host
     * @return {?}
     */
    getLoginAdvancedUrl(tenant, method, host) {
        /** @type {?} */
        let url = this.broker.getServerUrl() + 'auth/' + tenant.toLowerCase() + '/' + method + '/login?host=' + host + '&tokenLocation=' + (this.coreConfig.isCordova() ? 'query' : 'fragment');
        return url;
    }
    /**
     * @param {?} tenant
     * @return {?}
     */
    getTenantAdvancedLoginMethods(tenant) {
        /** @type {?} */
        let url = this.broker.getServerUrl() + 'auth/' + tenant.toLowerCase() + '/providers';
        return this.rq.get(url);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    getTenantFromToken(token) {
        /** @type {?} */
        let jwtHelper = new JwtHelperService({});
        return jwtHelper.decodeToken(token) || {};
    }
    /**
     * @param {?} res
     * @return {?}
     */
    afterLogin(res) {
        this.session.token = res.$mcfly$token;
        this.session.userId = res.userId;
        this.session.user = res.user;
        this.session.tenant = res.tenant;
        this.login$.next('');
        this.cleanUpLocalStorage();
        return res;
    }
    /**
     * @return {?}
     */
    cleanUpLocalStorage() {
        /** @type {?} */
        let keys$$1 = ['stats.kpiFilterFormData', 'stats.selectedDescription', 'stats.selectedDashboard', 'stats.customSelectedDashboard'];
        keys$$1.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            this.localStorage.remove(key);
        }));
    }
    /**
     * @return {?}
     */
    getCurrentSession() {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.rq.get(this.broker.getApiUrl() + 'businesslogic/getCurrentSession').pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            assign(this.session, res.data);
            this.session.hasScandit = this.coreConfig.isCordova() ? this.hasRoles(['scandit']) : this.hasRoles(['scandit', 'admin']);
            return (/** @type {?} */ (this.session));
        })), catchError((/**
         * @return {?}
         */
        () => {
            return of(null);
        })));
    }
    /**
     * @return {?}
     */
    doLogout() {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'user/logout';
        return this.rq.post(url, {});
    }
    /**
     * @return {?}
     */
    logout() {
        /** @type {?} */
        let promise = Promise.resolve(null);
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
        () => this.afterLogout()), (/**
         * @return {?}
         */
        () => this.afterLogout()));
    }
    /**
     * @return {?}
     */
    afterLogout() {
        this.doLogout().subscribe((/**
         * @return {?}
         */
        () => { }), (/**
         * @return {?}
         */
        () => { }));
        this.network.forceOffline(false, false);
        this.session.clear().catch((/**
         * @return {?}
         */
        () => { }));
        return Promise.resolve();
    }
    /**
     * @param {?} email
     * @param {?} imageData
     * @param {?} password
     * @return {?}
     */
    signup(email, imageData, password) {
        /** @type {?} */
        let user = (/** @type {?} */ ({ username: email, email, password, imageData }));
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'user/signup';
        return this.rq.post(url, { user }).pipe(mergeMap((/**
         * @return {?}
         */
        () => {
            return this.login(email, password);
        })));
    }
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
    inviteUsers(users, groups, password = null, sendPassword = true, appName, appleStoreUrl, playStoreUrl, _tenantRef) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'user/invite';
        /** @type {?} */
        let finalPlayStoreUrl = playStoreUrl + this.coreConfig.getAppId();
        return this.rq.post(url, {
            users,
            groups,
            password,
            sendPassword,
            appName,
            appleStoreUrl,
            playStoreUrl: finalPlayStoreUrl,
            _tenantRef
        });
    }
    /**
     * @return {?}
     */
    isLoggedIn() {
        return this.session.token && this.session.token.length > 0 && !this.isTokenExpired(this.session.token);
    }
    /**
     * @param {?} role
     * @return {?}
     */
    hasRole(role) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    }
    /**
     * @param {?} roles
     * @return {?}
     */
    hasRoles(roles) {
        return some(map$1(roles, (/**
         * @param {?} role
         * @return {?}
         */
        role => this.hasRole(role))), (/**
         * @param {?} t
         * @return {?}
         */
        t => t === true));
    }
    /**
     * @param {?} roles
     * @return {?}
     */
    hasAllRoles(roles) {
        return every(roles, (/**
         * @param {?} role
         * @return {?}
         */
        role => this.hasRole(role)));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    hasGroup(group) {
        return this.session.groups && this.session.groups.indexOf(group) >= 0;
    }
    /**
     * @param {?} groups
     * @return {?}
     */
    hasGroups(groups) {
        return some(map$1(groups, (/**
         * @param {?} group
         * @return {?}
         */
        group => this.hasGroup(group))), (/**
         * @param {?} t
         * @return {?}
         */
        t => t === true));
    }
    /**
     * @param {?} groups
     * @return {?}
     */
    hasAllGroups(groups) {
        return every(groups, (/**
         * @param {?} group
         * @return {?}
         */
        group => this.hasGroup(group)));
    }
    /**
     * @param {?=} checkSmartin
     * @return {?}
     */
    isAdmin(checkSmartin = false) {
        /** @type {?} */
        let retVal = this.hasRole(Authentication.roleAdmin);
        if (checkSmartin && this.session.user.username !== 'smartin@yoobic.com') {
            retVal = false;
        }
        return retVal;
    }
    /**
     * @return {?}
     */
    isTrial() {
        return !this.hasRole(Authentication.roleAdmin) && this.hasRole(Authentication.roleTrial);
    }
    /**
     * @return {?}
     */
    isDashboard() {
        return this.hasRole(Authentication.roleDashboard) && !this.isAdmin() && !this.hasRole(Authentication.roleMissionViewer) && !this.hasRole(Authentication.roleManager);
    }
    /**
     * @return {?}
     */
    isTeam() {
        return this.hasRole(Authentication.roleTeam);
    }
    /**
     * @return {?}
     */
    isCrowd() {
        return !this.hasRole(Authentication.roleTeam);
    }
    /**
     * @return {?}
     */
    isStore() {
        return this.session.user && isPresent(this.session.user.locationRef);
    }
    /**
     * @return {?}
     */
    isStoreManager() {
        return this.hasRole('store') && this.session.user && this.session.user.locationRef;
    }
    /**
     * @return {?}
     */
    isRoleAdmin() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEADMIN';
    }
    /**
     * @return {?}
     */
    isRoleEditor() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEEDITOR';
    }
    /**
     * @return {?}
     */
    isRoleViewer() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEVIEWER';
    }
    /**
     * @return {?}
     */
    isRoleManager() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEMANAGER';
    }
    /**
     * @return {?}
     */
    isRoleField() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLEFIELD';
    }
    /**
     * @return {?}
     */
    isRoleStoreManager() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLESTOREMANAGER';
    }
    /**
     * @return {?}
     */
    isRoleStore() {
        return this.getCurrentUser() && this.getCurrentUser().role === 'ROLESTORE';
    }
    /**
     * @return {?}
     */
    hasAccessToOperations() {
        return this.hasRole('team');
    }
    /**
     * @return {?}
     */
    hasAccessToBoost() {
        return this.hasRole('academy');
    }
    /**
     * @return {?}
     */
    getCurrentUser() {
        return this.session.user;
    }
    /**
     * @param {?} oldPassword
     * @param {?} newPassword
     * @return {?}
     */
    passwordChange(oldPassword, newPassword) {
        return this.rq.post(this.broker.getApiUrl() + 'user/changePassword', {
            oldPassword,
            newPassword
        });
    }
    /**
     * @param {?} email
     * @param {?=} isMagicLink
     * @param {?=} urlPrefix
     * @return {?}
     */
    passwordReset(email, isMagicLink = false, urlPrefix = 'https://yoobic.app.link/') {
        if (isMagicLink) {
            return this.rq.post(this.broker.getApiUrl() + 'user/getMagicLink', {
                username: email,
                urlPrefix
            });
        }
        else {
            return this.rq.post(this.broker.getApiUrl() + 'user/reset', { email: email });
        }
    }
    /**
     * @param {?} token
     * @param {?} password
     * @param {?=} host
     * @return {?}
     */
    passwordResetConfirm(token, password, host) {
        /** @type {?} */
        let url = host ? 'https://' + host + '/api/' : this.broker.getApiUrl();
        return this.rq.post(url + 'Endpoints/resetPassword', { password: password }, token, null, true);
    }
    /**
     * @param {?} user
     * @param {?} password
     * @param {?=} dontSendMail
     * @return {?}
     */
    passwordResetAdmin(user, password, dontSendMail = false) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/resetPassword', {
            options: {
                userPasswordList: [user].map((/**
                 * @param {?} u
                 * @return {?}
                 */
                (u) => ({
                    username: u.username,
                    _id: u._id,
                    password: password
                }))),
                dontSendMail: dontSendMail
            }
        });
    }
    /**
     * @param {?} username
     * @return {?}
     */
    impersonate(username) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/impersonate', {
            username
        });
    }
    /**
     * @param {?} username
     * @return {?}
     */
    forceLogout(username) {
        return this.rq.post(this.broker.getApiUrl() + 'AdminDashboard/forceLogout', {
            username
        });
    }
    /**
     * @return {?}
     */
    generatePassword() {
        /** @type {?} */
        let length = 8;
        /** @type {?} */
        let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        /** @type {?} */
        let retVal = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    /**
     * @param {?=} user
     * @param {?=} skipAcl
     * @param {?=} fields
     * @return {?}
     */
    updateProfile(user, skipAcl = false, fields = []) {
        /** @type {?} */
        let userToUpdate = user || this.getCurrentUser();
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
            retVal => {
                return this.broker.getById('user', retVal._id).pipe(map((/**
                 * @param {?} updatedUser
                 * @return {?}
                 */
                updatedUser => {
                    this.session.user = updatedUser;
                    return updatedUser;
                })));
            })));
        }
        else {
            return of(null);
        }
    }
    /**
     * @param {?} token
     * @return {?}
     */
    isTokenExpired(token) {
        /** @type {?} */
        let jwtHelper = new JwtHelperService({});
        try {
            return jwtHelper.isTokenExpired(token);
        }
        catch (err) {
            return true;
        }
    }
    /**
     * @param {?} token
     * @param {?} userId
     * @return {?}
     */
    setToken(token, userId) {
        this.session.token = token;
        this.session.userId = userId;
        return this.broker.getById('user', userId).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        (retVal) => {
            this.session.user = retVal;
            this.profileUpdated$.emit(retVal);
            return retVal;
        })));
    }
    /**
     * @param {?} tenant
     * @return {?}
     */
    createPublicApiToken(tenant) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'AdminDashboard/generateServiceAccount';
        return this.rq.post(url, {
            tenantId: tenant._id
        });
    }
    /**
     * @param {?} token
     * @return {?}
     */
    invalidatePublicApiToken(token) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'publicAPITokens/' + token._id + '/invalidate';
        return this.rq.post(url, {});
    }
}
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
Authentication.ctorParameters = () => [
    { type: Requestor },
    { type: Push$1 },
    { type: Config },
    { type: Broker },
    { type: Network },
    { type: LocalStorage },
    { type: LocalForageService },
    { type: Session },
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthenticationGuard {
    /**
     * @param {?} authentication
     */
    constructor(authentication) {
        this.authentication = authentication;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        let retVal = false;
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
    }
}
AuthenticationGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthenticationGuard.ctorParameters = () => [
    { type: Authentication }
];
class CanDeactivateGuard {
    /**
     * @param {?} component
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canDeactivate(component, route, state) {
        return component && component.canDeactivate ? component.canDeactivate(component, route, state) : true;
    }
}
CanDeactivateGuard.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BackupService {
    /**
     * @param {?} rq
     * @param {?} config
     */
    constructor(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl + 'AdminDashboard/';
    }
    /**
     * @param {?=} date
     * @return {?}
     */
    getAll(date) {
        /** @type {?} */
        let url = this.apiUrl + 'listBackup';
        return this.rq
            .post(url, {
            clusterName: 'rs-ds039424',
            date: toDate(date || new Date()).toISOString()
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res && res.map) {
                res = res
                    .map((/**
                 * @param {?} name
                 * @return {?}
                 */
                (name) => {
                    /** @type {?} */
                    let backup = { _id: name };
                    /** @type {?} */
                    let lastIndex = name.lastIndexOf('_');
                    /** @type {?} */
                    let dateStr = name.substr(lastIndex + 1).replace('.tgz', '');
                    backup.title = fromNow(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'));
                    backup.badge = dateFormat(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'), 'L LT');
                    backup.description = name;
                    return backup;
                }))
                    .reverse();
            }
            return res;
        })));
    }
    /**
     * @param {?} backupName
     * @param {?=} collections
     * @return {?}
     */
    restore(backupName, collections) {
        /** @type {?} */
        let url = this.apiUrl + 'restoreBackup ';
        return this.rq.post(url, {
            s3Key: backupName,
            collections
        });
    }
}
BackupService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BackupService.ctorParameters = () => [
    { type: Requestor },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Blog {
    /**
     * @param {?} coreConfig
     * @param {?} config
     * @param {?} rq
     * @param {?} translate
     */
    constructor(coreConfig, config, rq, translate) {
        this.coreConfig = coreConfig;
        this.config = config;
        this.rq = rq;
        this.translate = translate;
    }
    /**
     * @return {?}
     */
    getUrl() {
        /** @type {?} */
        let url;
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
    }
    /**
     * @param {?} blogUrl
     * @param {?=} limit
     * @param {?=} skip
     * @return {?}
     */
    get(blogUrl, limit, skip) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit, skip }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            /** @type {?} */
            let items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            items.forEach((/**
             * @param {?} b
             * @return {?}
             */
            b => {
                try {
                    if (b && b.enclosure && b.enclosure.$ && b.enclosure.$.url) {
                        b.background = b.enclosure.$.url;
                    }
                    else {
                        /** @type {?} */
                        let content = b['content:encoded'];
                        /** @type {?} */
                        let re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                        /** @type {?} */
                        let results = re.exec(content);
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
    }
    /**
     * @param {?} blogUrl
     * @return {?}
     */
    getLatestArticleDate(blogUrl) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: 1 }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            /** @type {?} */
            let items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            if (items && items.length > 0 && items[0]) {
                return items[0].pubDate;
            }
            return null;
        })));
    }
}
Blog.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Blog.ctorParameters = () => [
    { type: CoreConfig },
    { type: Config },
    { type: Requestor },
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CurrentSessionResolver {
    /**
     * @param {?} authentication
     * @param {?} network
     */
    constructor(authentication, network) {
        this.authentication = authentication;
        this.network = network;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    resolve(route, state) {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.authentication.getCurrentSession();
    }
}
CurrentSessionResolver.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CurrentSessionResolver.ctorParameters = () => [
    { type: Authentication },
    { type: Network }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Dashboard {
    /**
     * @param {?} broker
     * @param {?} translate
     * @param {?} session
     */
    constructor(broker, translate, session) {
        this.broker = broker;
        this.translate = translate;
        this.session = session;
    }
    /**
     * @param {?} dashboard
     * @param {?} users
     * @return {?}
     */
    publish(dashboard, users) {
        /** @type {?} */
        let dashboards = users
            .filter((/**
         * @param {?} u
         * @return {?}
         */
        u => u._id !== this.session.user._id))
            .map((/**
         * @param {?} user
         * @return {?}
         */
        user => {
            /** @type {?} */
            let dashboardCopy = cloneDeep(dashboard);
            // dashboardCopy.title += ' - ' + moment().format('L');
            dashboardCopy.originalRef = dashboard._id;
            delete dashboardCopy._id;
            dashboardCopy._acl = user._acl;
            this.broker.setAcl(dashboardCopy, null, null, null, [user._id]);
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
        () => {
            return this.broker.upsertAll('dashboards', dashboards);
        })));
    }
    /**
     * @param {?} dashboard
     * @return {?}
     */
    deletePublished(dashboard) {
        return this.broker.deleteAll('dashboards', {
            where: { originalRef: { inq: [dashboard._id] } }
        });
    }
    /**
     * @param {?} dashboard
     * @return {?}
     */
    updatePublished(dashboard) {
        return this.broker.getAll('dashboards', ['_id', '_acl', '_ect', '_lmt'], null, null, [[{ field: 'originalRef', operator: { _id: 'inq' }, value: [dashboard._id] }]], null, 0, -1).pipe(mergeMap((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            /** @type {?} */
            let dashboards = response.data;
            dashboards.forEach((/**
             * @param {?} d
             * @return {?}
             */
            d => {
                d.title = dashboard.title + ' - ' + dateFormat(new Date(), 'L');
                d.description = dashboard.description;
                d.tabs = dashboard.tabs;
            }));
            return this.broker.upsertAll('dashboards', dashboards);
        })));
    }
    /**
     * @param {?} dashboard
     * @param {?} title
     * @return {?}
     */
    copy(dashboard, title) {
        /** @type {?} */
        let newDashboard = cloneDeep(dashboard);
        newDashboard.title = title;
        delete newDashboard._id;
        if (newDashboard.tabs) {
            newDashboard.tabs.forEach((/**
             * @param {?} t
             * @return {?}
             */
            t => {
                if (t.items) {
                    t.items.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        c.definition._id = getUUID();
                    }));
                }
            }));
        }
        return this.broker.upsert('dashboards', newDashboard);
    }
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} excludedFields
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    aggregateQuery(collectionName, filters, options, excludedFields, customFilter, subQuery) {
        //, aggregateFormDefinition?: Array<IFormField>, aggregateData?: any) { //where ?: Filters, match?: Object, limit?: Number, lookup?: Object, projectBefore?: Object, group?: Object, projectAfter?: Object) {
        options = options || [];
        return this.broker.aggregateQuery(collectionName, filters, options, null, excludedFields, false, null, customFilter, subQuery);
    }
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    setTimescale(filters, timescale, dateField = 'finishedDate', endDate, previous = false) {
        return this.broker.setTimescale(filters, timescale, dateField, endDate, previous);
    }
    /**
     * @param {?} title
     * @param {?=} filters
     * @param {?=} collectionName
     * @param {?=} dateGrouping
     * @param {?=} groupByDate
     * @param {?=} timeScale
     * @return {?}
     */
    getChartDefinition(title, filters = [[]], collectionName = 'missions', dateGrouping = 'day', groupByDate = true, timeScale = 'last7days') {
        /** @type {?} */
        let definition = (/** @type {?} */ ({
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
    }
    /**
     * @param {?=} missionDescription
     * @param {?=} fields
     * @param {?=} start
     * @param {?=} locationTags
     * @return {?}
     */
    getPhotos(missionDescription, fields, start = 0, locationTags) {
        /** @type {?} */
        let filters = [[]];
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
                f => f.name.replace('.value', '')))
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
    }
    /**
     * @param {?} folderIds
     * @return {?}
     */
    getFolderFolderStat(folderIds) {
        /** @type {?} */
        let filters = [[{ field: 'parent', operator: { _id: 'inq' }, value: folderIds }]];
        /** @type {?} */
        let options = [
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
    }
    /**
     * @param {?} folderIds
     * @param {?=} keepHideMobile
     * @return {?}
     */
    getFolderFileStat(folderIds, keepHideMobile = true) {
        /** @type {?} */
        let filters = [[{ field: 'folder', operator: { _id: 'inq' }, value: folderIds }]];
        if (keepHideMobile === false) {
            filters[0].push({ field: 'hideMobile', operator: { _id: 'neq' }, value: true });
        }
        /** @type {?} */
        let options = [
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
    }
}
Dashboard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Dashboard.ctorParameters = () => [
    { type: Broker },
    { type: Translate },
    { type: Session }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FilesBroker {
    /**
     * @param {?} dashboard
     * @param {?} broker
     * @param {?} files
     */
    constructor(dashboard, broker, files) {
        this.dashboard = dashboard;
        this.broker = broker;
        this.files = files;
    }
    /**
     * @return {?}
     */
    getFilesTransform() {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res && res.data && res.data.map) {
                res.data.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => this.updateFileIcon(f)));
            }
            return res;
        });
    }
    /**
     * @return {?}
     */
    getFilesFoldersTransformAsync() {
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        (res, search, filters, start, pageSize) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    res.data.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => {
                        delete f.items;
                        if (f.fftype === 'file') {
                            this.updateFileIcon(f);
                        }
                    }));
                    /** @type {?} */
                    let ids = res.data.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.fftype === 'folder')).map((/**
                     * @param {?} folder
                     * @return {?}
                     */
                    (folder) => folder._id));
                    this.dashboard.getFolderFolderStat(ids).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    stats => {
                        res.data.forEach((/**
                         * @param {?} folder
                         * @return {?}
                         */
                        (folder) => {
                            /** @type {?} */
                            let stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            s => s._id === folder._id));
                            /** @type {?} */
                            let value = stat ? stat.folders || 0 : 0;
                            folder.stats = [{ title: 'FOLDERS', color: 'dark', value }];
                            ((/** @type {?} */ (folder))).hasChildren = value > 0;
                        }));
                        this.dashboard.getFolderFileStat(ids, false).subscribe((/**
                         * @param {?} fileStats
                         * @return {?}
                         */
                        fileStats => {
                            res.data.forEach((/**
                             * @param {?} folder
                             * @return {?}
                             */
                            (folder) => {
                                /** @type {?} */
                                let stat = fileStats.find((/**
                                 * @param {?} s
                                 * @return {?}
                                 */
                                s => s._id === folder._id));
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
    }
    /**
     * @param {?} folderId
     * @return {?}
     */
    cleanupFolder(folderId) {
        return this.broker.deleteAll('files', { where: { folder: folderId } });
    }
    /**
     * @param {?} f
     * @return {?}
     */
    updateFileIcon(f) {
        if (this.files.isImage(f)) {
            f.imgSrc = f._downloadURL;
        }
        else if (this.files.isVideo(f)) {
            f.imgSrc = this.files.getVideoPoster(f._downloadURL);
        }
        else {
            f.icon = this.files.getIcon(f);
        }
    }
}
FilesBroker.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilesBroker.ctorParameters = () => [
    { type: Dashboard },
    { type: Broker },
    { type: Files }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Googletranslate {
    constructor() { }
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} target
     * @param {?} rq
     * @return {?}
     */
    static get(query, source, target, rq) {
        /** @type {?} */
        let sourceLang = this.fixLanguage(source);
        /** @type {?} */
        let targetLang = this.fixLanguage(target);
        if (sourceLang === targetLang) {
            return of(query);
        }
        else {
            /** @type {?} */
            let url = 'businesslogic/translate';
            return rq.post(url, { query, sourceLang, targetLang }, null, null, null, null, true).pipe(map((/**
             * @param {?} response
             * @return {?}
             */
            response => {
                return response || query;
            })));
        }
    }
    /**
     * @param {?} language
     * @return {?}
     */
    static fixLanguage(language) {
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
    }
    /**
     * @param {?} query
     * @param {?} source
     * @param {?} rq
     * @return {?}
     */
    static getAll(query, source, rq) {
        /** @type {?} */
        let observables = Translate.availablesLanguage
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        l => l !== source))
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        l => l !== 'key'))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            return this.get(query, source, l, rq).pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => ({
                language: l,
                value: value || query
            }))));
        }));
        return forkJoin(observables);
    }
}
Googletranslate.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Googletranslate.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class HttpCustomInterceptor {
    /**
     * @param {?} config
     * @param {?} network
     * @param {?} log
     */
    constructor(config, network, log) {
        this.config = config;
        this.network = network;
        this.log = log;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        // if (req.url && req.url.indexOf(this.config.serverUrl) >= 0) {
        //     const authReq = req.clone({ headers: req.headers.set('Yoobic-Client-Version', this.coreConfig.getAppVersion()) });
        //     return next.handle(authReq);
        // } else {
        if (this.network.isOffline() && req.url && !req.url.startsWith('./')) {
            this.log.error(req);
        }
        return next.handle(req);
        //}
    }
}
HttpCustomInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpCustomInterceptor.ctorParameters = () => [
    { type: Config },
    { type: Network },
    { type: Log }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlatformService {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
        this.data$ = new ReplaySubject(1, 2000);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    handler(data) {
        if (data) {
            this.data$.next(data);
        }
    }
    /**
     * @param {?=} debug
     * @return {?}
     */
    onReadyOrResume(debug = false) {
        if (this.coreConfig.isCordova() && window.Branch) {
            window.Branch.setDebug(debug);
            window.Branch.initSession().then((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                this.handler(data);
            }));
        }
    }
}
PlatformService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PlatformService.ctorParameters = () => [
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Locations {
    /**
     * @param {?} geoloc
     * @param {?} broker
     * @param {?} rq
     * @param {?} config
     * @param {?} session
     * @param {?} network
     * @param {?} cache
     * @param {?} authentication
     * @param {?} googleMaps
     */
    constructor(geoloc, broker, rq, config, session, network, cache, authentication, googleMaps) {
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
    loadMarkers(position, maxPoints = 5000) {
        position = position || this.geoloc.defaultPosition;
        /** @type {?} */
        let filters = [
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
        retVal => {
            return this.getMarkers(retVal.data);
        })));
    }
    /**
     * @param {?} locations
     * @return {?}
     */
    getMarkers(locations) {
        return this.broker.getMarkers(locations);
    }
    /**
     * @param {?} collectionName
     * @param {?=} maxPoints
     * @param {?=} fields
     * @param {?=} filters
     * @param {?=} subQuery
     * @return {?}
     */
    getMarkersData(collectionName, maxPoints = 5000, fields, filters, subQuery) {
        return this.broker.getAll(collectionName, fields || ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints, false, subQuery).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            /** @type {?} */
            let markers = this.getMarkers(retVal.data);
            /** @type {?} */
            let legendColors = {
                available: 'energized',
                booked: 'info',
                validated: 'success',
                rejected: 'danger',
                tobevalidated: 'royal',
                archived: 'dark'
            };
            return { markers, legendColors };
        })));
    }
    /**
     * @return {?}
     */
    getLegendColors() {
        /** @type {?} */
        let legendColors = {
            available: 'energized',
            booked: 'info',
            validated: 'success',
            rejected: 'danger',
            tobevalidated: 'royal',
            archived: 'dark'
        };
        return legendColors;
    }
    /**
     * @param {?} locationIds
     * @param {?=} userId
     * @return {?}
     */
    getLastVisitDate(locationIds, userId) {
        /** @type {?} */
        let filters = [[{ field: 'locationRef', operator: { _id: 'inq' }, value: locationIds }, { field: 'ownerRef', operator: { _id: 'eq' }, value: userId || this.session.userId }, { field: 'status', operator: { _id: 'eq' }, value: 'finished' }]];
        /** @type {?} */
        let options = [
            {
                $group: {
                    _id: '$locationRef',
                    finishedDate: { $max: '$finishedDate' },
                    count: { $sum: 1 }
                }
            }
        ];
        return this.broker.aggregateQuery('missions', filters, options, null, null, false, null);
    }
    /**
     * @param {?=} position
     * @return {?}
     */
    getStatsAndDistanceTransformAsync(position) {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    if (position) {
                        res.data = this.calculateDistanceAndKpiData(res, position);
                    }
                    /** @type {?} */
                    let ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    (location) => location._id));
                    this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    dates => {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        (location) => {
                            /** @type {?} */
                            let date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            d => d._id === location._id));
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
    }
    /**
     * @return {?}
     */
    getDistanceTransform() {
        return this.geoloc.getLocation().then((/**
         * @param {?} position
         * @return {?}
         */
        (position) => {
            return (/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                return new Observable((/**
                 * @param {?} observer
                 * @return {?}
                 */
                (observer) => {
                    if (res && res.data && res.data.length > 0) {
                        res.data = this.calculateDistanceAndKpiData(res, position);
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
    }
    /**
     * @param {?} position
     * @return {?}
     */
    getDistanceAndLastVisitTransform(position) {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    res.data = this.calculateDistanceAndKpiData(res, position);
                    /** @type {?} */
                    let ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    (location) => location._id));
                    this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    dates => {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        (location) => {
                            /** @type {?} */
                            let date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            d => d._id === location._id));
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
    }
    /**
     * @param {?} res
     * @param {?} position
     * @return {?}
     */
    calculateDistanceAndKpiData(res, position) {
        /** @type {?} */
        let retVal = res.data.map((/**
         * @param {?} location
         * @return {?}
         */
        (location) => {
            if (location._geoloc && position && isNumber(position.latitude) && isNumber(position.longitude)) {
                location.distance = this.geoloc.getDistance(position.latitude, position.longitude, location._geoloc[1], location._geoloc[0]);
            }
            /** @type {?} */
            let oldKpiData = (/** @type {?} */ (location.kpiData));
            /** @type {?} */
            let kpiData = [];
            if (this.session.tenant && this.session.tenant.locationKpis && this.session.tenant.locationKpis.length > 0) {
                this.session.tenant.locationKpis.forEach((/**
                 * @param {?} kpi
                 * @return {?}
                 */
                kpi => {
                    if (this.authentication.isAdmin() || (kpi.category === 'healthscore' && this.authentication.hasRole('healthscore')) || (kpi.category !== 'healthscore' && this.authentication.hasRole('storeinsights'))) {
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
    }
    /**
     * @param {?} aroundMe
     * @param {?} stats
     * @param {?} forceRefresh
     * @return {?}
     */
    getAroundMeFilter(aroundMe, stats, forceRefresh) {
        /** @type {?} */
        let filters;
        /** @type {?} */
        let sortModel;
        /** @type {?} */
        let mapTransform;
        return this.geoloc.getLocation(forceRefresh).then((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            mapTransform = stats ? this.getStatsAndDistanceTransformAsync(res) : this.getDistanceAndLastVisitTransform(res);
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
            return { filters, sortModel, mapTransform, position: res };
        }));
    }
    /**
     * @return {?}
     */
    getLocationTypesTransform() {
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        (res, search, filters, start, pageSize) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    /** @type {?} */
                    let ids = res.data.map((/**
                     * @param {?} type
                     * @return {?}
                     */
                    (type) => type._id));
                    this.getLocationTypesStat(ids).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    stats => {
                        res.data.forEach((/**
                         * @param {?} locationType
                         * @return {?}
                         */
                        (locationType) => {
                            /** @type {?} */
                            let stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            s => s._id === locationType._id));
                            /** @type {?} */
                            let count = stat ? stat.count || 0 : 0;
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
    }
    /**
     * @param {?} locationTypeIds
     * @return {?}
     */
    getLocationTypesStat(locationTypeIds) {
        /** @type {?} */
        let filters = [[{ field: 'typeRef', operator: { _id: 'inq' }, value: locationTypeIds }]];
        /** @type {?} */
        let options = [
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
    }
    /**
     * @param {?} locationId
     * @param {?=} nbDays
     * @return {?}
     */
    getHealthscore(locationId, nbDays = [7, 30, 90]) {
        if (this.network.isOffline()) {
            return from(this.cache.get(CACHE_KEYS.healthscore, locationId));
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + 'locations/healthScore?storeId=' + locationId + '&days=[' + nbDays.toString() + ']';
            return this.rq.get(url).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                /** @type {?} */
                let retVal = ret.data ? ret.data : ret;
                this.cache.add(CACHE_KEYS.healthscore, locationId, retVal);
                return retVal;
            })));
        }
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    getUserLocations(userId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getUserLocations';
        return this.rq.post(url, { userId });
    }
}
Locations.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Locations.ctorParameters = () => [
    { type: Smartloc },
    { type: Broker },
    { type: Requestor },
    { type: Config },
    { type: Session },
    { type: Network },
    { type: Cache },
    { type: Authentication },
    { type: Googlemaps }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//require('yoobic-loopback-node-sdk/client/browserify.bundle');
class Loopback {
    /**
     * @param {?} session
     */
    constructor(session) {
        this.session = session;
        this._client = ((/** @type {?} */ (window))).loopbackClient;
        if (this._client) {
            //this._client.setBaseUrl(this._config.apiUrl);
            this._client.setAccessToken(this.session.token);
        }
    }
    /**
     * @return {?}
     */
    get client() {
        return this._client;
    }
}
Loopback.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Loopback.ctorParameters = () => [
    { type: Session }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MISSION_TYPES_NO_ADMIN = ['mission'];
/** @type {?} */
const MISSION_TYPES = ['mission', 'service', 'poll', 'todo', 'lesson'];
//'template',, 'memo'
/** @type {?} */
const MISSION_STATUS = ['booked', 'finished', 'archived', 'scheduled'];
/** @type {?} */
let conditions$2 = {
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
let MissionDescription = class MissionDescription extends IMissionDescription {
};
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
let MissionDescriptionCreate = class MissionDescriptionCreate extends IMissionDescription {
};
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
let MissionDescriptionSchedule = class MissionDescriptionSchedule extends IMissionDescription {
};
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
let MissionDescriptionNotifications = class MissionDescriptionNotifications extends IMissionDescription {
};
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
let MissionDescriptionSettings = class MissionDescriptionSettings extends IMissionDescription {
};
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
/** @type {?} */
let scoringConditions = {
    isPercentage: 'isPercentage == 1'
};
let Scoring = class Scoring extends IScoring {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Missiondescriptions {
    /*
            Return the transform to extract the fields from a mission description
        */
    /**
     * @param {?=} types
     * @return {?}
     */
    static getFieldTransform(types = []) {
        return Models.getFieldTransform(types);
    }
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFields(missiondescription, types = [], excludedTypes = []) {
        return Models.getFields(missiondescription, types, excludedTypes);
    }
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFieldsFromSlides(slides, types = [], excludedTypes = []) {
        return Models.getFieldsFromSlides(slides, types, excludedTypes);
    }
    /*
            Return the list of form field from a mission description. Used in the mission data grid and form
        */
    /**
     * @param {?} missiondescription
     * @param {?} translate
     * @param {?=} includeComments
     * @return {?}
     */
    static getFormFields(missiondescription, translate, includeComments = false) {
        /** @type {?} */
        let mobileFields = Models.getFields(missiondescription, null, ['information']);
        mobileFields = mobileFields.reduce((/**
         * @param {?} previous
         * @param {?} current
         * @return {?}
         */
        (previous, current) => {
            /** @type {?} */
            let retVal = cloneDeep(current);
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
            scoring => {
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
    }
    /**
     * @param {?} v
     * @return {?}
     */
    static encodeScoringValue(v) {
        if (v && v.toString) {
            return v.toString().replace(/\./, '_');
        }
        else {
            return v;
        }
    }
}
Missiondescriptions.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Print {
    /**
     * @param {?} rq
     * @param {?} config
     * @param {?} authentication
     * @param {?} files
     */
    constructor(rq, config, authentication, files) {
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
    printToMapping(collectionName, columns, query, subQuery, aggregateOptions, type, campaignFields, filename, progress) {
        /** @type {?} */
        let publicCollectionName = Models.getPublicCollectionName(collectionName);
        /** @type {?} */
        let url = this.config.publicApiUrl + publicCollectionName + '/export';
        type = type === 'xlsx' ? 'xlsx' : 'csv';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;
        /** @type {?} */
        let exportColumns = sortBy(cloneDeep(columns.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => !c.suppressExport))), (/**
         * @param {?} c
         * @return {?}
         */
        c => c.exportOrder || 100)).map((/**
         * @param {?} c
         * @return {?}
         */
        (c) => {
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
            c => this.excludedDashboardColumns.indexOf(c.field) < 0));
        }
        //let mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName(filename || publicCollectionName) + this.rq.getFilenameSuffix() + '.' + type;
        if (campaignFields && campaignFields.length > 0) {
            /** @type {?} */
            let catalogs = uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.type === FormFieldType.catalog)).map((/**
             * @param {?} f
             * @return {?}
             */
            f => f.catalog)));
            if (catalogs.length > 0) ;
            /** @type {?} */
            let collectionNames = compact(uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.type === FormFieldType.autocomplete)).map((/**
             * @param {?} f
             * @return {?}
             */
            f => f.collectionName))));
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
        ret => {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                () => {
                    return this.rq.get(this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    () => {
                        return of({});
                    })));
                })))
                    .pipe(filter$1((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
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
                res => {
                    /** @type {?} */
                    let fileUrl = get(res, 'data.output.data.download_url');
                    if (fileUrl) {
                        return downloadFile(fileUrl, filename);
                    }
                }));
            }
        }));
    }
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
    printToSpreadsheet(collectionName, columns, query, subQuery, aggregateOptions, channel, type, campaignFields, filename) {
        /** @type {?} */
        let url = this.config.apiUrl + 'print/write-spreadsheet';
        /** @type {?} */
        let fixedCollectionName = Models.fixCollectionName(collectionName);
        type = type === 'csv' ? 'csv' : 'xlsx';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;
        /** @type {?} */
        let exportColumns = sortBy(cloneDeep(columns.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => !c.suppressExport))), (/**
         * @param {?} c
         * @return {?}
         */
        (c) => c.exportOrder || 100)).map((/**
         * @param {?} c
         * @return {?}
         */
        (c) => {
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
            c => this.excludedDashboardColumns.indexOf(c.field) < 0));
        }
        /** @type {?} */
        let mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName(filename || fixedCollectionName) + this.rq.getFilenameSuffix() + '.' + type;
        /** @type {?} */
        let cacheQuery = {};
        if (campaignFields && campaignFields.length > 0) {
            /** @type {?} */
            let catalogs = uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.type === FormFieldType.catalog)).map((/**
             * @param {?} f
             * @return {?}
             */
            f => f.catalog)));
            if (catalogs.length > 0) {
                cacheQuery.products = { where: { catalogRef: { inq: catalogs } } };
            }
            /** @type {?} */
            let collectionNames = compact(uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            f => f.type === FormFieldType.autocomplete)).map((/**
             * @param {?} f
             * @return {?}
             */
            f => f.collectionName))));
            if (collectionNames.length > 0) {
                cacheQuery.custommodels = { where: { name: { inq: collectionNames } }, cacheKey: 'name' };
            }
        }
        /** @type {?} */
        let body = {
            collectionName: fixedCollectionName,
            columns: exportColumns,
            query,
            aggregateOptions,
            channel,
            type,
            cacheQuery
        };
        return this.rq.downloadFile(filename, mime, url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
    }
}
Print.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Print.ctorParameters = () => [
    { type: Requestor },
    { type: Config },
    { type: Authentication },
    { type: Files }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let conditions$3 = {
    isUpdate: 'getAttributeValue("_ect")',
    isCreate: 'not getAttributeValue("_ect")',
    isNotRole: 'not (isRole == 1)'
};
let Group = class Group extends IGroup {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Security {
    /**
     * @param {?} broker
     * @param {?} rq
     * @param {?} config
     */
    constructor(broker, rq, config) {
        this.broker = broker;
        this.rq = rq;
        this.config = config;
    }
    /**
     * Return the list of groups and roles for a specific user
     * @param {?} userId
     * @return {?}
     */
    getUserSession(userId) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/getUserSession', { userId });
    }
    /**
     * Add the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    addGroupUsers(group, users) {
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
    }
    /**
     * Remove the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    removeGroupUsers(group, users) {
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
    }
    /**
     * Add the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    addGroupGroups(group, groups) {
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
    }
    /**
     * Remove the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    removeGroupGroups(group, groups) {
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
    }
    /**
     * @param {?} id
     * @param {?} addedUsers
     * @param {?=} removedUsers
     * @param {?=} addedGroups
     * @param {?=} removedGroups
     * @return {?}
     */
    updateGroup(id, addedUsers, removedUsers = [], addedGroups = [], removedGroups = []) {
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
        () => {
            return this.broker.patch('groups', {
                _id: id,
                $addToSet: {
                    'users.list': { $each: map$1(addedUsers, '_id') },
                    groups: { $each: map$1(addedGroups, '_id') }
                }
            });
        })));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    initGroup(group) {
        group.groups = group.groups || [];
        group.users = group.users || {};
        group.users.list = group.users.list || [];
    }
    /**
     * Returns the subquery used in the group's tab user grid
     * @param {?} group
     * @return {?}
     */
    getGroupUserSubQuery(group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'users.list'
        };
    }
    /**
     * Returns the subquery used in the group's tab sub group grid
     * @param {?} group
     * @return {?}
     */
    getGroupGroupSubQuery(group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'groups'
        };
    }
    /**
     * @param {?} groupIds
     * @param {?=} mode
     * @return {?}
     */
    getAncestry(groupIds, mode = 'descendants') {
        /** @type {?} */
        let url = this.config.apiUrl + 'groups/getAncestry';
        return this.rq
            .post(url, {
            groupIds
        })
            .pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
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
    }
}
Security.ROLES = ROLES;
Security.ROLES_ASK = ROLES_ASK;
Security.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Security.ctorParameters = () => [
    { type: Broker },
    { type: Requestor },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Tenants {
    /**
     * @param {?} rq
     * @param {?} broker
     * @param {?} config
     */
    constructor(rq, broker, config) {
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
    clone(from$$1, to, progress) {
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
        ret => {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                () => {
                    return this.rq.get(this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    () => {
                        return of({});
                    })));
                })))
                    .pipe(filter$1((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
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
                res => {
                    /** @type {?} */
                    let errors = get(res, 'data.output.errors');
                    /** @type {?} */
                    let data = get(res, 'data.output.data');
                    return { data, errors };
                }));
            }
        }));
    }
}
Tenants.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Tenants.ctorParameters = () => [
    { type: Requestor },
    { type: Broker },
    { type: Config }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Users {
    /**
     * @param {?} broker
     * @param {?} rq
     */
    constructor(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    getSimplifiedProfile(userId) {
        return this.broker.getById('user', userId, Users.simplifiedFields);
    }
    /**
     * @return {?}
     */
    getFreshdeskUrl() {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'endpoints/getFreshdeskUrl';
        return this.rq.post(url, { host_url: 'support-mobile.operations.yoobic.com' }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            return res;
        })));
    }
    /**
     * @param {?} user
     * @param {?} groups
     * @return {?}
     */
    setAcl(user, groups) {
        this.broker.setAcl(user, groups);
    }
    /**
     * @param {?=} showMe
     * @return {?}
     */
    getCustomFilterNoAdmin(showMe = true) {
        /** @type {?} */
        let ids = Users.adminIds.map((/**
         * @param {?} i
         * @return {?}
         */
        i => i._id));
        if (!showMe) {
            ids.push(this.rq.session.userId);
        }
        return { _id: { nin: ids } };
    }
    /**
     * @param {?} username
     * @return {?}
     */
    isUsernameTaken(username) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/isUsernameTaken', { params: { username } }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.data)));
    }
    /**
     * @param {?} locationId
     * @return {?}
     */
    getUsersByLocation(locationId) {
        return this.broker.getAll('user', Users.simplifiedFields, null, null, [[{ field: 'locationRef', operator: { _id: 'eq' }, value: locationId }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.data)));
    }
    /**
     * @param {?} locationId
     * @param {?=} userTags
     * @return {?}
     */
    getGeofilterUsers(locationId, userTags) {
        /** @type {?} */
        let where = { _id: { inq: [locationId] } };
        /** @type {?} */
        let geofilterQuery = {
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
        geofilters => {
            /** @type {?} */
            let userIds = geofilters.data.map((/**
             * @param {?} geofilter
             * @return {?}
             */
            geofilter => geofilter.userRef));
            userIds = uniq(userIds);
            /** @type {?} */
            let userFilter = [[{ field: '_id', operator: { _id: 'inq' }, value: userIds }]];
            if (userTags && userTags.length > 0) {
                userFilter[0].push({ field: 'tags', operator: { _id: 'inq' }, value: userTags });
            }
            return this.broker.getAll('user', Users.simplifiedFields, null, null, userFilter).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            res => res.data)));
        })));
    }
}
Users.adminIds = [{ _id: '53fb03c6546847ee0536386a' }];
Users.simplifiedFields = ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
Users.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Users.ctorParameters = () => [
    { type: Broker },
    { type: Requestor }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Version {
    /**
     * @param {?} config
     * @param {?} coreConfig
     */
    constructor(config, coreConfig) {
        this.config = config;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} includeServerName
     * @return {?}
     */
    get(includeServerName) {
        /** @type {?} */
        let retVal;
        /** @type {?} */
        let serverName = this.config.serverName.toUpperCase();
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
    }
    /**
     * @param {?} version
     * @return {?}
     */
    isCurrentVersionHigherThan(version) {
        /** @type {?} */
        let currentVersion = this.coreConfig.getAppVersion();
        if (currentVersion === version) {
            return true;
        }
        /** @type {?} */
        let current = currentVersion.split('.');
        /** @type {?} */
        let required = version.split('.');
        /** @type {?} */
        let len = Math.min(current.length, required.length);
        // loop while the components are equal
        for (let i = 0; i < len; i++) {
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
    }
}
Version.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Version.ctorParameters = () => [
    { type: Config },
    { type: CoreConfig }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
//declare const System: System;
class Xlsx {
    // private _xlsx: any;
    // private _papaparse: any;
    constructor() { }
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
    readFile(nativeFile, type = 'blob', encoding) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            let fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                resolve(e.target.result);
            });
            fileReader.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            e => reject(e));
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
    }
    /**
     * @param {?} file
     * @return {?}
     */
    read(file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let csv = '';
            if (file.name.endsWith('csv')) {
                csv = data;
            }
            else {
                /** @type {?} */
                let workbook = read$1(data, { type: 'binary' });
                /** @type {?} */
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                csv = utils['sheet_to_csv'](worksheet, { FS: ';' });
            }
            /** @type {?} */
            let retVal = parse(csv, { skipEmptyLines: true });
            return retVal.data;
        }));
        //});
        //});
    }
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    exportToFile(content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        let blob = new Blob([content], {
            type: type
        });
        return this.saveBlob(blob, filename);
    }
    /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    saveBlob(blob, filename) {
        ((/** @type {?} */ (saveAs)))(blob, filename);
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64MimeType(base64) {
        return base64.split(';')[0].replace('data:', '');
    }
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    b64toBlob(b64Data, contentType = null, sliceSize = 512) {
        if (!contentType) {
            contentType = this.getBase64MimeType(b64Data);
        }
        b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
        /** @type {?} */
        const byteCharacters = atob(b64Data);
        /** @type {?} */
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            /** @type {?} */
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            /** @type {?} */
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            /** @type {?} */
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        /** @type {?} */
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    readSheets(file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let retVal = [];
            if (file.name.endsWith('csv')) {
                retVal.push(parse(data, { skipEmptyLines: true }).data);
            }
            else {
                /** @type {?} */
                let workbook = read$1(data, { type: 'binary' });
                workbook.SheetNames.forEach((/**
                 * @param {?} sheet
                 * @return {?}
                 */
                sheet => {
                    /** @type {?} */
                    let v = utils['sheet_to_csv'](workbook.Sheets[sheet], { FS: ';' });
                    retVal.push(parse(v, { skipEmptyLines: true }).data);
                }));
            }
            return retVal;
        }));
        //});
        //});
    }
    /**
     * @param {?} title
     * @param {?} sheets
     * @return {?}
     */
    write(title, sheets) {
        //return this.getXlsx().then((xlsx: any) => {
        /** @type {?} */
        let tables = new Array();
        /** @type {?} */
        let headers = new Array();
        forEach(sheets, (/**
         * @param {?} s
         * @return {?}
         */
        s => {
            /** @type {?} */
            let hasHeader = false;
            /** @type {?} */
            let table = [];
            /** @type {?} */
            let header = [];
            forEach(s.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                let row = [];
                forEach(s.columns, (/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    if (!((c.visible === false || c.suppressExport === true || c.action) && c.forceExport !== true)) {
                        /** @type {?} */
                        let value = get(d, c.name);
                        if (c.type === 'address') {
                            value = value && value.address ? value.address : value;
                            if (typeof value === 'object') {
                                value = null;
                            }
                        }
                        if (c.type === 'catalog') {
                            delete value.valid;
                            /** @type {?} */
                            let retVal = '';
                            keys(value).forEach((/**
                             * @param {?} pid
                             * @return {?}
                             */
                            function (pid) {
                                /** @type {?} */
                                let product = find(c.products, (/**
                                 * @param {?} p
                                 * @return {?}
                                 */
                                (p) => {
                                    return p._id === pid;
                                }));
                                if (product) {
                                    retVal += product.reference + ' * ' + value[pid] + ',';
                                }
                            }));
                            value = retVal; //JSON.stringify(value).replace('{', '').replace('}', '');
                        }
                        if (c.type === 'date' && value) {
                            /** @type {?} */
                            let m = toDate(value);
                            m = dateAdd(m, 'minutes', getUTCOffset(m));
                            value = m;
                        }
                        if (c.type === 'time' && value) {
                            /** @type {?} */
                            let t = toDate(value);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value = dateFormat(t, 'HH:mm:ss');
                        }
                        if (c.type === 'datetime' && value) {
                            /** @type {?} */
                            let dt = toDate(value);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value = dateFormat(dt, 'L LT');
                        }
                        if (c.name === '_acl') {
                            value = value.groups.r; //_difference(value.groups.r, roles);
                        }
                        if (value && value._downloadURL) {
                            value = value._downloadURL;
                        }
                        if (isObject(value) && !isDate(value) && !isArray(value)) {
                            //&& _isEmpty(value)
                            value = null;
                        }
                        row.push(value);
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
        let wb = { SheetNames: [], Sheets: {}, Props: null };
        for (let i = 0; i < tables.length; i++) {
            tables[i].unshift(headers[i]);
            /** @type {?} */
            let wsName = sheets[i].title || 'SheetJs_' + i;
            /** @type {?} */
            let ws = this.sheetFromArrayOfArrays(tables[i]);
            wb.SheetNames.push(wsName);
            wb.Sheets[wsName] = ws;
        }
        /** @type {?} */
        let wbout = write(wb, (/** @type {?} */ ({ bookType: 'xlsx', bookSST: true, type: 'binary' })));
        /** @type {?} */
        let filename = title + '-' + dateFormat(new Date(), 'YYYY-MM-DDTHH:MM') + '.xlsx';
        this.exportToFile(this.s2ab(wbout), 'application/octet-stream', '', filename);
        //});
    }
    /**
     * @private
     * @param {?} v
     * @param {?=} date1904
     * @return {?}
     */
    datenum(v, date1904) {
        if (date1904) {
            v += 1462;
        }
        /** @type {?} */
        let epoch = Date.parse(v);
        return (epoch - (/** @type {?} */ (new Date(Date.UTC(1899, 11, 30))))) / (24 * 60 * 60 * 1000);
    }
    /**
     * @private
     * @param {?} data
     * @param {?=} opts
     * @return {?}
     */
    sheetFromArrayOfArrays(data, opts) {
        /** @type {?} */
        let ws = {};
        /** @type {?} */
        let range$$1 = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (let R = 0; R !== data.length; ++R) {
            for (let C = 0; C !== data[R].length; ++C) {
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
                let cell = {
                    v: data[R][C]
                };
                if (cell.v === null) {
                    continue;
                }
                /** @type {?} */
                let cellRef = utils.encode_cell({ c: C, r: R });
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
    }
    /**
     * @private
     * @param {?} s
     * @return {?}
     */
    s2ab(s) {
        /** @type {?} */
        let buf = new ArrayBuffer(s.length);
        /** @type {?} */
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    }
}
Xlsx.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Xlsx.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FilterPipe {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        //value: array of values to filter
        //args[0]: string to match
        //args[1]: list of fields to use to compare
        //args[2]: not sure? seems to exlude if false
        //args[3]: use translation
        if (!args || !args[0]) {
            //&& !args[1]
            return value;
        }
        else if (value) {
            /** @type {?} */
            let translate = args[3];
            return value.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (typeof item === 'string') {
                    return (item &&
                        this.getStringToTest(item, translate)
                            .toLowerCase()
                            .indexOf(args[0].toLowerCase()) >= 0);
                }
                /** @type {?} */
                let keys$$1 = args[1] || keys(item);
                keys$$1 = [].concat(keys$$1);
                /** @type {?} */
                let retVal = false;
                for (let i = 0; i < keys$$1.length; i++) {
                    /** @type {?} */
                    let key = keys$$1[i];
                    if (args[0] && args[0].toLowerCase) {
                        if (typeof item[key] === 'string' || item[key] instanceof String) {
                            /** @type {?} */
                            let index = this.getStringToTest(item[key], translate)
                                .toLowerCase()
                                .indexOf(args[0].toLowerCase());
                            retVal = retVal || (args[2] === false ? index < 0 : index >= 0);
                        }
                    }
                    else if (!args[0] && args[1]) {
                        /** @type {?} */
                        let bool = item.hasOwnProperty(key) && !isBlank(item[key]);
                        retVal = retVal || (args[2] === false ? !bool : bool);
                    }
                }
                return retVal;
            }));
        }
    }
    /**
     * @param {?} s
     * @param {?} translate
     * @return {?}
     */
    getStringToTest(s, translate) {
        if (translate && this.translate) {
            return this.translate.get(s.toString().toUpperCase());
        }
        else {
            return s;
        }
    }
}
FilterPipe.decorators = [
    { type: Pipe, args: [{ name: 'filter' },] }
];
/** @nocollapse */
FilterPipe.ctorParameters = () => [
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let SERVICES = [
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
let PIPES = [FilterPipe];
class DataCoreModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: DataCoreModule,
            providers: [
                ...SERVICES,
                ...configuredProviders,
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
            ]
        };
    }
}
DataCoreModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...PIPES],
                imports: [CommonModule, TranslateModule, HttpClientModule],
                exports: [CommonModule, TranslateModule, HttpClientModule, ...PIPES]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let AggregateLog = class AggregateLog extends IAggregateLog {
};
AggregateLog = __decorate([
    Model({
        className: 'AggregateLog',
        collectionName: 'aggregateLogs',
        fields: ['*'],
        include: []
    })
], AggregateLog);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Algorithm = class Algorithm extends IAlgorithm {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let AutorenewConfig = class AutorenewConfig extends IAutorenewConfig {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Backup = class Backup extends IBackup {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Catalog = class Catalog extends ICatalog {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CHART_TYPES = ['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'radar', 'pie', 'doughnut', 'treemap'];
/** @type {?} */
const CHART_DATEGROUPINGBY = ['year', 'month', 'week', 'day', 'calendar'];
/** @type {?} */
const CHART_SHOW_AS = ['chart', 'grid', 'map', 'micro'];
/** @type {?} */
const CHART_DATETIMEFORMAT = ['d', 'dd', 'DD', 'w', 'MMM'];
/** @type {?} */
const CHART_TIMESCALE = ['last7days', 'lastweek', 'last30days', 'lastmonth', 'last90days', 'lastquarter', 'last365days', 'lastyear'];
/** @type {?} */
let conditions$4 = {
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
let ChartDefinition = class ChartDefinition extends IChartDefinition {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Currency = class Currency {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Dashboard$1 = class Dashboard extends IDashboard {
};
__decorate([
    Editable('Dashboard', { required: true, type: FormFieldType.text, sortable: true }),
    Searchable('Dashboard'),
    __metadata("design:type", String)
], Dashboard$1.prototype, "title", void 0);
__decorate([
    Editable('Dashboard', { required: false, type: FormFieldType.textarea }),
    Searchable('Dashboard'),
    __metadata("design:type", String)
], Dashboard$1.prototype, "description", void 0);
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
], Dashboard$1.prototype, "_lmt", void 0);
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
], Dashboard$1.prototype, "_tenant", void 0);
Dashboard$1 = __decorate([
    Model({
        className: 'Dashboard',
        collectionName: 'dashboards',
        fields: ['*'],
        include: []
    })
], Dashboard$1);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Entity {
    /**
     * @param {?=} source
     */
    constructor(source) {
        if (typeof source === 'string' || typeof source === 'number' || typeof source === 'boolean' || typeof source === 'undefined') {
            this._id = source;
        }
    }
}

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
let File$1 = class File$$1 extends IFile {
};
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
], File$1.prototype, "_ect", void 0);
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
], File$1.prototype, "_downloadURL", void 0);
__decorate([
    Editable('File', { title: 'TITLE', required: true, type: FormFieldType.text, sortable: true }),
    Searchable('File'),
    __metadata("design:type", String)
], File$1.prototype, "_filename", void 0);
__decorate([
    Editable('File', { visible: false, type: FormFieldType.number, sortable: true }),
    __metadata("design:type", Number)
], File$1.prototype, "size", void 0);
__decorate([
    Editable('File', { visible: false, type: FormFieldType.autocomplete, filterable: true }),
    Searchable('File'),
    __metadata("design:type", String)
], File$1.prototype, "mimeType", void 0);
__decorate([
    Editable('File', { type: FormFieldType.toggle, columnDefinition: { width: 80 } }),
    __metadata("design:type", Boolean)
], File$1.prototype, "hideMobile", void 0);
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
], File$1.prototype, "group", void 0);
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
], File$1.prototype, "tags", void 0);
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
], File$1.prototype, "_tenant", void 0);
File$1 = __decorate([
    Model({
        className: 'File',
        collectionName: 'files',
        fields: ['*'],
        include: ['container'],
        icon: 'yo-file'
    })
], File$1);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Folder = class Folder extends IFolder {
};
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
let FileOrFolder = class FileOrFolder extends IFileOrFolder {
};
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
    let lastDate = endDate ? toDate(endDate) : new Date();
    amount = amount || 7;
    /** @type {?} */
    let period = 'days';
    /** @type {?} */
    let startof = 'day';
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
let BaseKpi = class BaseKpi extends IKpi {
    /**
     * @param {?} kpi
     * @param {?} cd
     * @param {?} translate
     * @return {?}
     */
    static getChartDefinition(kpi, cd, translate) {
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
    }
    /**
     * @param {?} groupBy
     * @return {?}
     */
    static getDateFormat(groupBy) {
        /** @type {?} */
        let format = '%Y-%m-%d';
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
    }
    /**
     * @param {?} kpi
     * @param {?=} showPreviousYear
     * @return {?}
     */
    static getDates(kpi, showPreviousYear) {
        /** @type {?} */
        let retVal = {};
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
                let dates = this.getStartAndEndDates(kpi.dates.timescale, null, kpi.dates.amount, kpi.dates.notsliding);
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
    }
    /**
     * @param {?} timescale
     * @param {?=} endDate
     * @param {?=} amount
     * @param {?=} notsliding
     * @return {?}
     */
    static getStartAndEndDates(timescale, endDate, amount, notsliding) {
        return getStartAndEndDates$1(timescale, endDate, amount, notsliding);
    }
    /**
     * @param {?} cd
     * @param {?} date
     * @return {?}
     */
    static fixDates(cd, date) {
        /** @type {?} */
        let retVal;
        if (!date) {
            return new Date().getTime();
        }
        if (cd.dateGrouping === 'week' || (cd.kpiFormValues && cd.kpiFormValues.groupBySlider === 'week' && cd.kpiFormValues.category !== 'healthscore')) {
            /** @type {?} */
            let y = (/** @type {?} */ (date.split('-')[0]));
            /** @type {?} */
            let w = (/** @type {?} */ (date.split('-')[1]));
            // // MongoDB week begins on Sundays and days preceding the first Sudnay of the year are in Week 0;
            // // So,  weekStartDay = days in Week 0 + first day of the week number
            // let yearStartDay = new Date(y, 0, 0).getDay();
            // let daysInWeek0 = yearStartDay === 0 ? 0 : 7 - yearStartDay;
            // let d = w === '00' ? 0 : daysInWeek0 + (w - 1) * 7;
            // let weekStart = new Date(y, 0, d);
            // retVal = weekStart.getTime();
            // //retVal = moment('2011-01-01').year(y).isoWeek(w).toDate().getTime(); //.startOf('day')
            /** @type {?} */
            let simple = new Date(y, 0, 1 + (w - 1) * 7);
            /** @type {?} */
            let dow = simple.getDay();
            /** @type {?} */
            let isoWeekStart = simple;
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static getColor(value) {
        /** @type {?} */
        let color = Colors.black;
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
    }
    /**
     * @param {?} filters
     * @param {?} dates
     * @param {?=} field
     * @param {?=} allowNotExits
     * @return {?}
     */
    static setDateFilters(filters, dates, field = 'finishedDate', allowNotExits = true) {
        if (dates.startDate || dates.endDate) {
            /** @type {?} */
            let filter$$1;
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
    }
    /**
     * @param {?} filters
     * @param {?} locationTags
     * @return {?}
     */
    static setLocationTagsFilters(filters, locationTags) {
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
    }
    /**
     * @param {?} filters
     * @param {?} userTags
     * @return {?}
     */
    static setUserTagsFilters(filters, userTags) {
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
    }
    /**
     * @param {?} campaigns
     * @param {?} campaignTags
     * @param {?} filters
     * @param {?} missionType
     * @return {?}
     */
    static setCampaignFilters(campaigns, campaignTags, filters, missionType) {
        if (campaigns && campaigns.length > 0) {
            filters[0].unshift({
                field: 'descriptionRef',
                operator: { _id: 'inq' },
                value: campaigns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c._id))
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
    }
    /**
     * @param {?} groupBy
     * @return {?}
     */
    static getDateFormatMoment(groupBy) {
        /** @type {?} */
        let format = '';
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
    }
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
let IMapping = 
// import { ADMIN_FILES_TYPE, FORMCREATOR_FILES_TYPE } from '../constants/constants.interface';
// let conditions = {
//   isAdmin: 'context == "admin"',
//   isFormCreator: 'context == "formCreator"',
//   isNotTranslation: 'context!="translation"'
// };
class IMapping extends IIMapping {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Operation = class Operation extends IOperation {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Product = class Product extends IProduct {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let PublicApiToken = class PublicApiToken extends IPublicApiToken {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Slide = class Slide extends ISlide {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Tableau = class Tableau extends ITableau {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let TagGroup = class TagGroup extends ITagGroup {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let Tag = class Tag extends ITag {
};
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
let Todo = class Todo extends ITodo {
};
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
let TodoTask = class TodoTask extends ITodoTask {
};
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
let TodoTaskSimple = class TodoTaskSimple extends ITodoTaskSimple {
};
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
    const rq = injector.get(Requestor);
    /** @type {?} */
    let language = data.language;
    /** @type {?} */
    let value = data.value;
    if (value && language) {
        data[language] = value;
        return Googletranslate.getAll(value, language, rq)
            .toPromise()
            .then((/**
         * @param {?} values
         * @return {?}
         */
        (values) => {
            /** @type {?} */
            let isCapitalized = capitalize(value) === value;
            values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => {
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
    l => l !== 'key'))
        .forEach((/**
     * @param {?} l
     * @return {?}
     */
    l => {
        data[l] = null;
    }));
    data = Object.assign({}, data);
}
let Translation = class Translation extends ITranslation {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let WorkplaceGroups = class WorkplaceGroups extends IWorkplaceGroups {
};
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
let WorkplacePost = class WorkplacePost extends IWorkplacePost {
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Activity {
    /**
     * @param {?} broker
     * @param {?} rq
     */
    constructor(broker, rq) {
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
    _viewOrLike(entity, entityName, action) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'activity/' + action;
        return this.rq.post(url, { entityRef: entity._id, entityName });
    }
    /**
     * @param {?} entityId
     * @param {?=} action
     * @return {?}
     */
    getActionFilter(entityId, action = 'view') {
        return [[{ field: 'action', operator: { _id: 'eq' }, value: action }, { field: 'entityRef', operator: { _id: 'inq' }, value: [entityId] }]];
    }
    /**
     * @return {?}
     */
    getUserTransform() {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res.data) {
                res.data = res.data.map((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r.user));
            }
            return res;
        });
    }
    /**
     * @return {?}
     */
    getActionAggregateOptions() {
        return (/**
         * @param {?} start
         * @param {?} limit
         * @return {?}
         */
        (start, limit) => [{ $lookup: { from: 'user', localField: 'userRef', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }, ...(start > 0 ? [{ $skip: start }] : []), ...(limit > 0 ? [{ $limit: limit }] : [])]);
    }
}
Activity.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Activity.ctorParameters = () => [
    { type: Broker },
    { type: Requestor }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DataLoader {
    /**
     * @param {?} broker
     * @param {?} collectionName
     * @param {?=} items
     * @param {?=} pageSize
     * @param {?=} translate
     * @param {?=} translateService
     * @param {?=} looseCount
     */
    constructor(broker, collectionName, items = null, pageSize = null, translate = null, translateService = null, looseCount = null) {
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
    /**
     * @return {?}
     */
    get pageSize() {
        return this._pageSize;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set pageSize(val) {
        this._pageSize = val;
    }
    /**
     * @return {?}
     */
    get currentPage() {
        return this._currentPage;
    }
    /**
     * @return {?}
     */
    get total() {
        return this._total;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) {
        this._total = value;
    }
    /**
     * @return {?}
     */
    get totalPage() {
        return Math.ceil(this._total / this.pageSize);
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @return {?}
     */
    get loadingPageCount() {
        return this._loadingPageCount;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loadingPageCount(value) {
        this._loadingPageCount = value;
    }
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
    loadWithSearch(currentPage = 0, search = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields = null, include = null, aggregateOptions = null, aggregateOptionsOffline = null, cacheId = null, customFilter = null, includeCount = false) {
        return this.load(currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
    }
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
    loadWithSearchDebounce(start = 0, search = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields = null, include = null, aggregateOptions = null, aggregateOptionsOffline = null, cacheId = null, customFilter = null, includeCount = false) {
        if (search) {
            return search.pipe(debounceTime(400), distinctUntilChanged(), switchMap((/**
             * @param {?} term
             * @return {?}
             */
            term => this.load(start, term.toString(), filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount))));
        }
        else {
            return this.load(start, null, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
        }
    }
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
    load(currentPage = 0, search = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields = null, include = null, aggregateOptions = null, aggregateOptionsOffline = null, cacheId = null, customFilter = null, includeCount = false) {
        this._loading = true;
        if (search) {
            search = search.trim();
        }
        if ((this._items && this._items.length > 0) || !this._collectionName || isEmpty(this._collectionName)) {
            /** @type {?} */
            let obs = new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                /** @type {?} */
                let data = this._items || [];
                if (search) {
                    data = this.filterPipe.transform(data, search, null, null, this._translate);
                }
                if (sortModel) {
                    data = orderBy(data, sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => s.colId)), sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => s.sort.toLowerCase())));
                }
                this._total = data.length;
                this._currentPage = currentPage;
                if (data.slice) {
                    data = data.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize);
                }
                /** @type {?} */
                let res = {
                    count: this._total,
                    data: data.map ? data.map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => this.convertItem(value))) : []
                };
                observer.next(res);
                observer.complete();
            }));
            if (mapTransformAsync && mapTransform) {
                return obs.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
            }
            else if (mapTransform) {
                return obs.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
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
                x => x);
            }
            return this.broker
                .aggregateQuery(this._collectionName, filters, aggregateOptions(currentPage * this.pageSize, this.pageSize, sortModel, search, filters), search, null, includeCount, cacheId, customFilter, subQuery, aggregateOptionsOffline && isFunction(aggregateOptionsOffline) ? aggregateOptionsOffline(currentPage * this.pageSize, this.pageSize, sortModel, search, filters) : null)
                .pipe(mapTransformAsync ? mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            res => mapTransform(res, search, filters, currentPage, this.pageSize))) : map((/**
             * @param {?} res
             * @return {?}
             */
            res => mapTransform(res, search, filters, currentPage, this.pageSize))))
                .pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            retVal => {
                this._currentPage = currentPage;
                if (includeCount) {
                    this._total = retVal.count;
                }
                else if (isObject(retVal) && isArray(retVal.data)) ;
                else {
                    retVal = { data: retVal };
                }
                this._loading = false;
                return retVal;
            })));
        }
        else {
            /** @type {?} */
            let retVal = this.broker.getAll(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, tag, subQuery, customFilter, cacheId, this._looseCount, !includeCount).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                this._currentPage = currentPage;
                this._loading = false;
                if (!includeCount) {
                    this._total = Math.max(-1, this._total);
                    return { count: this._total, data: res };
                }
                else {
                    this._total = res.count;
                    return res;
                }
            })));
            if (mapTransformAsync && mapTransform) {
                return retVal.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
            }
            else if (mapTransform) {
                return retVal.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
            }
            else {
                return retVal;
            }
        }
    }
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
    getQuery(currentPage = 0, search, filters = [], sortModel = null, subQuery = null, fields = null, include = null, customFilter = null, includeCount = false) {
        return this.broker.getQuery(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, subQuery, customFilter);
    }
    /**
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    getCount(search, filters, subQuery = null, customFilter = null) {
        return this.broker.getCount(this._collectionName, search, filters, subQuery, customFilter).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            this._total = ret.count;
            return ret;
        })));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    convertItem(value) {
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
    }
}

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