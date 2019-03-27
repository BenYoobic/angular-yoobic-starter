/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Session } from '../session/session.service';
import { Config } from '../config/config.service';
import { LoadingBar } from '../loading-bar/loading-bar.service';
import { CoreConfig } from '@shared/common';
//import * as FileSaver from 'file-saver';
import saveAs from 'file-saver';
import { keys } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
export { Requestor };
if (false) {
    /** @type {?} */
    Requestor.unauthorizedEmitter;
    /** @type {?} */
    Requestor.payloadTooBigEmitter;
    /**
     * @type {?}
     * @protected
     */
    Requestor.prototype.http;
    /** @type {?} */
    Requestor.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    Requestor.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Requestor.prototype.loadingBar;
    /**
     * @type {?}
     * @protected
     */
    Requestor.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc1QyxPQUFPLE1BQU0sTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQU1qRDtJQUtFLG1CQUFzQixJQUFnQixFQUFTLE9BQWdCLEVBQVksTUFBYyxFQUFZLFVBQXNCLEVBQVksVUFBc0I7UUFBdkksU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFaksseUJBQUs7Ozs7O0lBQUwsVUFBTSxHQUFXLEVBQUUsT0FBWTtRQUEvQixpQkFrQkM7UUFqQkMs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QUMsRUFBRTtZQUNwSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7Ozs7O0lBRU8sZ0NBQVk7Ozs7SUFBcEI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU8sbUNBQWU7Ozs7SUFBdkI7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUEzWU0sNkJBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUM5Qyw4QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDOztnQkFIdkQsVUFBVTs7OztnQkFuQkYsVUFBVTtnQkFFVixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sVUFBVTtnQkFFVixVQUFVOztJQTJabkIsZ0JBQUM7Q0FBQSxBQTlZRCxJQThZQztTQTdZWSxTQUFTOzs7SUFDcEIsOEJBQXFEOztJQUNyRCwrQkFBc0Q7Ozs7O0lBRTFDLHlCQUEwQjs7SUFBRSw0QkFBdUI7Ozs7O0lBQUUsMkJBQXdCOzs7OztJQUFFLCtCQUFnQzs7Ozs7SUFBRSwrQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0JhciB9IGZyb20gJy4uL2xvYWRpbmctYmFyL2xvYWRpbmctYmFyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuXG4vL2ltcG9ydCAqIGFzIEZpbGVTYXZlciBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCBzYXZlQXMgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgeyBrZXlzIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLyogYmVhdXRpZnkgaWdub3JlOnN0YXJ0ICovXG5kZWNsYXJlIHZhciBmZXRjaDtcbi8qIGJlYXV0aWZ5IGlnbm9yZTplbmQgKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RvciB7XG4gIHN0YXRpYyB1bmF1dGhvcml6ZWRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHN0YXRpYyBwYXlsb2FkVG9vQmlnRW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc2Vzc2lvbjogU2Vzc2lvbiwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgbG9hZGluZ0JhcjogTG9hZGluZ0JhciwgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcpIHt9XG5cbiAgZmV0Y2godXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkge1xuICAgIGlmIChvcHRpb25zLmJvZHkgJiYgdHlwZW9mIG9wdGlvbnMuYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm5vSGVhZGVyICE9PSB0cnVlKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLmJ1aWxkRmV0Y2hIZWFkZXJzKCk7XG4gICAgfVxuICAgIGRlbGV0ZSBvcHRpb25zLm5vSGVhZGVyO1xuICAgIHRoaXMuc2xpbWJhclN0YXJ0KCk7XG4gICAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIoZSwgdXJsKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcG9zdCh1cmw6IHN0cmluZywgYm9keTogYW55LCB0b2tlbj86IHN0cmluZywgd2l0aENvdW50OiBib29sZWFuID0gZmFsc2UsIGlzVGVtcFRva2VuOiBib29sZWFuID0gZmFsc2UsIGxvb3NlQ291bnQ6IGJvb2xlYW4gPSBmYWxzZSwgcGFydGlhbFVybDogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIGlmIChwYXJ0aWFsVXJsKSB7XG4gICAgICB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB1cmw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCwgYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogJycsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5idWlsZEhlYWRlcnMod2l0aENvdW50LCB0b2tlbiwgbnVsbCwgaXNUZW1wVG9rZW4sIGZhbHNlLCBsb29zZUNvdW50KSxcbiAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKHJlczogSHR0cFJlc3BvbnNlPGFueT4pOiBhbnkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9rZW4ocmVzKTtcbiAgICAgICAgICAgIGlmIChyZXNbJ19ib2R5J10gPT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJlc3BvbnNlKHJlcywgd2l0aENvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICksXG4gICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIoZSwgdXJsKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwYXRjaCh1cmw6IHN0cmluZywgYm9keTogYW55LCB0b2tlbj86IHN0cmluZywgd2l0aENvdW50OiBib29sZWFuID0gZmFsc2UsIGlzVGVtcFRva2VuOiBib29sZWFuID0gZmFsc2UsIGxvb3NlQ291bnQ6IGJvb2xlYW4gPSBmYWxzZSwgcGFydGlhbFVybDogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIGlmIChwYXJ0aWFsVXJsKSB7XG4gICAgICB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB1cmw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wYXRjaCh1cmwsIGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6ICcnLCB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuYnVpbGRIZWFkZXJzKHdpdGhDb3VudCwgdG9rZW4sIG51bGwsIGlzVGVtcFRva2VuLCBmYWxzZSwgbG9vc2VDb3VudCksXG4gICAgICAgIG9ic2VydmU6ICdyZXNwb25zZSdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KTogYW55ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRva2VuKHJlcyk7XG4gICAgICAgICAgICBpZiAocmVzWydfYm9keSddID09PSAnJykge1xuICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSZXNwb25zZShyZXMsIHdpdGhDb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcG9zdFJhdyh1cmw6IHN0cmluZywgYm9keTogYW55LCBibG9iPzogYm9vbGVhbiwgaW5jbHVkZVRva2VuPzogYm9vbGVhbikge1xuICAgIHRoaXMuc2xpbWJhclN0YXJ0KCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiAnJywge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLmJ1aWxkSGVhZGVycyhmYWxzZSwgbnVsbCwgbnVsbCwgbnVsbCwgIWluY2x1ZGVUb2tlbiksXG4gICAgICAgIHJlc3BvbnNlVHlwZTogPGFueT4oYmxvYiA/ICdhcnJheWJ1ZmZlcicgOiAnanNvbicpLFxuICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAocmVzOiBIdHRwUmVzcG9uc2U8YW55Pik6IGFueSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgICksXG4gICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIoZSwgdXJsKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwb3N0TXVsdGlQYXJ0KHVybDogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAga2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIGZvcm1EYXRhLCB7IGhlYWRlcnMsIG9ic2VydmU6ICdyZXNwb25zZScsIHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXQ6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm4gcmV0LmJvZHk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcG9zdEZpbGUodXJsOiBzdHJpbmcsIGZpbGU6IEZpbGUpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc2xpbWJhclN0YXJ0KCk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcbiAgICAgIGxldCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgICBsZXQgeGhyOiBYTUxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh4aHIucmVzcG9uc2UgPyBKU09OLnBhcnNlKHhoci5yZXNwb25zZSkgOiAnJyk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcih4aHIucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0aGlzLnNlc3Npb24udG9rZW4pO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXBwbGljYXRpb24tSWQnLCB0aGlzLmNvcmVDb25maWcuZ2V0QXBwSWQoKSk7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWW9vYmljLUNsaWVudC1WZXJzaW9uJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcFZlcnNpb24oKSk7XG4gICAgICB4aHIuc2VuZChmb3JtRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXQodXJsOiBzdHJpbmcsIHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlLCB0b2tlbj86IHN0cmluZywgcGFyYW1zPzogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBhbnkgfT4sIHN1cHByZXNzVG9rZW4/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMuZm9yRWFjaChwID0+IHtcbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KHAubmFtZSwgcC52YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHVybCwge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLmJ1aWxkSGVhZGVycyh3aXRoQ291bnQsIHRva2VuLCBudWxsLCBudWxsLCBzdXBwcmVzc1Rva2VuKSxcbiAgICAgICAgcGFyYW1zOiBodHRwUGFyYW1zLFxuICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXIoZSwgdXJsKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVUb2tlbihyZXMpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJlc3BvbnNlKHJlcywgd2l0aENvdW50KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBnZXRCaW5hcnlDb250ZW50KHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBib2R5OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc2xpbWJhclN0YXJ0KCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnB1dCh1cmwsIGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IG51bGwsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5idWlsZEhlYWRlcnMoKSxcbiAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRva2VuKHJlcyk7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm4gcmVzLmJvZHk7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5yZXF1ZXN0KCdkZWxldGUnLCB1cmwsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5idWlsZEhlYWRlcnMoKSxcbiAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyxcbiAgICAgICAgYm9keTogYm9keVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRva2VuKHJlcyk7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm4gcmVzLmJvZHk7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZG93bmxvYWRGaWxlKGZpbGVuYW1lOiBzdHJpbmcsIG1lZGlhVHlwZTogc3RyaW5nLCB1cmw6IHN0cmluZywgb3B0aW9uczogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiB0aGlzLmZldGNoKHVybCwgb3B0aW9ucylcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXMgJiYgcmVzLmJsb2IgPyByZXMuYmxvYigpIDogbnVsbDtcbiAgICAgIH0pXG4gICAgICAudGhlbihibG9iID0+IHtcbiAgICAgICAgaWYgKGJsb2IpIHtcbiAgICAgICAgICAoPGFueT5zYXZlQXMpKGJsb2IsIGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHNhdmVCbG9iKGJsb2I6IEJsb2IsIGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAoPGFueT5zYXZlQXMpKGJsb2IsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHNhdmVBcnJheUJ1ZmZlcihhcnJheTogQXJyYXlCdWZmZXIsIGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShhcnJheSldKTtcbiAgICAoPGFueT5zYXZlQXMpKGJsb2IsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIGdldEZpbGVuYW1lU3VmZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdfJyArIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKCcuJywgJ18nKTtcbiAgfVxuXG4gIHByaXZhdGUgZXJyb3JIYW5kbGVyKGU6IGFueSwgdXJsKSB7XG4gICAgbGV0IGlzSW52YWxpZENyZWRlbnRpYWxzOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKGUgJiYgZS5zdGF0dXMgPT09IDQwMSAmJiB1cmwgJiYgdXJsLmluZGV4T2YodGhpcy5jb25maWcuc2VydmVyVXJsKSA+PSAwICYmIGUuZXJyb3IgJiYgZS5lcnJvci5lcnJvciAmJiAoZS5lcnJvci5lcnJvci5uYW1lID09PSAnSW52YWxpZENyZWRlbnRpYWxzJyB8fCBlLmVycm9yLmVycm9yLm5hbWUgPT09ICdPbmx5U3NvTG9naW5BbGxvd2VkJyB8fCBlLmVycm9yLmVycm9yLm1lc3NhZ2UgPT09ICdPbmx5IFNTTyBsb2dpbiBhbGxvd2VkJykpIHtcbiAgICAgIGlzSW52YWxpZENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGUuc3RhdHVzID09PSA0MDEgJiYgdXJsICYmIHVybC5pbmRleE9mKHRoaXMuY29uZmlnLnNlcnZlclVybCkgPj0gMCAmJiAhaXNJbnZhbGlkQ3JlZGVudGlhbHMgJiYgdXJsLmluZGV4T2YoJ2dldENhbXBhaWduU2NvcmUnKSA8IDAgJiYgZS5lcnJvciAmJiBlLmVycm9yLmVycm9yICYmIGUuZXJyb3IuZXJyb3IubmFtZSAmJiBlLmVycm9yLmVycm9yLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0xPR09VVCcpIHtcbiAgICAgIFJlcXVlc3Rvci51bmF1dGhvcml6ZWRFbWl0dGVyLmVtaXQoZSk7XG4gICAgfSBlbHNlIGlmIChlLnN0YXR1cyA9PT0gNDEzKSB7XG4gICAgICBSZXF1ZXN0b3IucGF5bG9hZFRvb0JpZ0VtaXR0ZXIuZW1pdChlKTtcbiAgICB9IGVsc2UgaWYgKGUuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIHJldHVybiBvZihuZXcgSHR0cFJlc3BvbnNlPGFueT4oPGFueT57IGJvZHk6IHt9LCBzdGF0dXM6IDQwNCB9KSk7XG4gICAgfSAvL2Vsc2Uge1xuICAgIHRocm93IGU7XG4gICAgLy99XG4gICAgLy9yZXR1cm4gT2JzZXJ2YWJsZS5vZihlKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0UmVzcG9uc2UocmVzOiBIdHRwUmVzcG9uc2U8YW55Piwgd2l0aENvdW50OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gd2l0aENvdW50XG4gICAgICA/IHtcbiAgICAgICAgICBkYXRhOiByZXMuYm9keSxcbiAgICAgICAgICBjb3VudDogKyhyZXMuaGVhZGVycy5nZXQoJ3gtdG90YWwtY291bnQnKSB8fCByZXMuaGVhZGVycy5nZXQoJ1gtVG90YWwtQ291bnQnKSB8fCByZXMuaGVhZGVycy5nZXQoJ3gtbG9vc2UtY291bnQnKSB8fCByZXMuaGVhZGVycy5nZXQoJ1gtTG9vc2UtQ291bnQnKSkgfHwgMFxuICAgICAgICB9XG4gICAgICA6IHJlcy5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEhlYWRlcnMod2l0aENvdW50OiBib29sZWFuID0gZmFsc2UsIHRva2VuPzogc3RyaW5nLCBjb250ZW50VHlwZT86IHN0cmluZywgaXNUZW1wVG9rZW4/OiBib29sZWFuLCBzdXBwcmVzc1Rva2VuPzogYm9vbGVhbiwgbG9vc2VDb3VudD86IGJvb2xlYW4pIHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUgfHwgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUFwcGxpY2F0aW9uLUlkJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCkpO1xuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnWW9vYmljLUNsaWVudC1WZXJzaW9uJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcFZlcnNpb24oKSk7XG5cbiAgICBpZiAod2l0aENvdW50KSB7XG4gICAgICBpZiAobG9vc2VDb3VudCkge1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ3gtbG9vc2UtY291bnQnLCAndHJ1ZScpO1xuICAgICAgfVxuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCd4LXRvdGFsLWNvdW50JywgJ3RydWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCd4LWxvb3NlLWNvdW50JywgJ3RydWUnKTtcbiAgICB9XG4gICAgaWYgKHN1cHByZXNzVG9rZW4gIT09IHRydWUpIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAoaXNUZW1wVG9rZW4pIHtcbiAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ3Rva2VuJywgdG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlc3Npb24udG9rZW4pIHtcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdGhpcy5zZXNzaW9uLnRva2VuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRmV0Y2hIZWFkZXJzKHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlLCB0b2tlbj86IHN0cmluZywgY29udGVudFR5cGU/OiBzdHJpbmcsIGlzVGVtcFRva2VuPzogYm9vbGVhbiwgc3VwcHJlc3NUb2tlbj86IGJvb2xlYW4sIGxvb3NlQ291bnQ/OiBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzSUUxMSgpICYmIEhlYWRlcnMpIHtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUgfHwgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdYLUFwcGxpY2F0aW9uLUlkJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCkpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnWW9vYmljLUNsaWVudC1WZXJzaW9uJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcFZlcnNpb24oKSk7XG5cbiAgICAgICAgaWYgKHdpdGhDb3VudCkge1xuICAgICAgICAgIGlmIChsb29zZUNvdW50KSB7XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgneC1sb29zZS1jb3VudCcsICd0cnVlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCd4LXRvdGFsLWNvdW50JywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VwcHJlc3NUb2tlbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgaWYgKGlzVGVtcFRva2VuKSB7XG4gICAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXNzaW9uLnRva2VuKSB7XG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRoaXMuc2Vzc2lvbi50b2tlbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge31cbiAgICByZXR1cm4gdGhpcy5idWlsZEZldGNoSGVhZGVyc0ZhbGxiYWNrKHdpdGhDb3VudCwgdG9rZW4sIGNvbnRlbnRUeXBlLCBpc1RlbXBUb2tlbiwgc3VwcHJlc3NUb2tlbiwgbG9vc2VDb3VudCk7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRmV0Y2hIZWFkZXJzRmFsbGJhY2sod2l0aENvdW50OiBib29sZWFuID0gZmFsc2UsIHRva2VuPzogc3RyaW5nLCBjb250ZW50VHlwZT86IHN0cmluZywgaXNUZW1wVG9rZW4/OiBib29sZWFuLCBzdXBwcmVzc1Rva2VuPzogYm9vbGVhbiwgbG9vc2VDb3VudD86IGJvb2xlYW4pIHtcbiAgICBsZXQgaGVhZGVycyA9IHt9O1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gW2NvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgaGVhZGVyc1snQWNjZXB0J10gPSBbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICBoZWFkZXJzWydYLUFwcGxpY2F0aW9uLUlkJ10gPSBbdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCldO1xuICAgIGhlYWRlcnNbJ1lvb2JpYy1DbGllbnQtVmVyc2lvbiddID0gW3RoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCldO1xuXG4gICAgaWYgKHdpdGhDb3VudCkge1xuICAgICAgaWYgKGxvb3NlQ291bnQpIHtcbiAgICAgICAgaGVhZGVyc1sneC1sb29zZS1jb3VudCddID0gWyd0cnVlJ107XG4gICAgICB9XG4gICAgICBoZWFkZXJzWyd4LXRvdGFsLWNvdW50J10gPSBbJ3RydWUnXTtcbiAgICB9XG4gICAgaWYgKHN1cHByZXNzVG9rZW4gIT09IHRydWUpIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAoaXNUZW1wVG9rZW4pIHtcbiAgICAgICAgICBoZWFkZXJzWyd0b2tlbiddID0gW3Rva2VuXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBbJ0JlYXJlciAnICsgdG9rZW5dO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2Vzc2lvbi50b2tlbikge1xuICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBbJ0JlYXJlciAnICsgdGhpcy5zZXNzaW9uLnRva2VuXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRva2VuKHJlczogSHR0cFJlc3BvbnNlPGFueT4pIHtcbiAgICBpZiAocmVzICYmIHJlcy51cmwgJiYgcmVzLnVybC5pbmRleE9mKHRoaXMuY29uZmlnLnNlcnZlclVybCkgPj0gMCAmJiByZXMuaGVhZGVycyAmJiByZXMuaGVhZGVycy5nZXQoJ2F1dGhvcml6YXRpb24nKSkge1xuICAgICAgdGhpcy5zZXNzaW9uLnRva2VuID0gcmVzLmhlYWRlcnMuZ2V0KCdhdXRob3JpemF0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzbGltYmFyU3RhcnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nQmFyLnN0YXJ0KCk7XG4gIH1cblxuICBwcml2YXRlIHNsaW1iYXJDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmxvYWRpbmdCYXIuY29tcGxldGUoKTtcbiAgfVxufVxuIl19