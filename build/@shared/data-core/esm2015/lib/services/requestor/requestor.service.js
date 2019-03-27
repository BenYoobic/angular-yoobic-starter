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
export class Requestor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUc1QyxPQUFPLE1BQU0sTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQU9qRCxNQUFNLE9BQU8sU0FBUzs7Ozs7Ozs7SUFJcEIsWUFBc0IsSUFBZ0IsRUFBUyxPQUFnQixFQUFZLE1BQWMsRUFBWSxVQUFzQixFQUFZLFVBQXNCO1FBQXZJLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQzs7Ozs7O0lBRWpLLEtBQUssQ0FBQyxHQUFXLEVBQUUsT0FBWTtRQUM3QixJ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QUFFLDJCQUF3Qjs7Ozs7SUFBRSwrQkFBZ0M7Ozs7O0lBQUUsK0JBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IExvYWRpbmdCYXIgfSBmcm9tICcuLi9sb2FkaW5nLWJhci9sb2FkaW5nLWJhci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcblxuLy9pbXBvcnQgKiBhcyBGaWxlU2F2ZXIgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgc2F2ZUFzIGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHsga2V5cyB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qIGJlYXV0aWZ5IGlnbm9yZTpzdGFydCAqL1xuZGVjbGFyZSB2YXIgZmV0Y2g7XG4vKiBiZWF1dGlmeSBpZ25vcmU6ZW5kICovXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0b3Ige1xuICBzdGF0aWMgdW5hdXRob3JpemVkRW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBzdGF0aWMgcGF5bG9hZFRvb0JpZ0VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHNlc3Npb246IFNlc3Npb24sIHByb3RlY3RlZCBjb25maWc6IENvbmZpZywgcHJvdGVjdGVkIGxvYWRpbmdCYXI6IExvYWRpbmdCYXIsIHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnKSB7fVxuXG4gIGZldGNoKHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkpIHtcbiAgICBpZiAob3B0aW9ucy5ib2R5ICYmIHR5cGVvZiBvcHRpb25zLmJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmJvZHkpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5ub0hlYWRlciAhPT0gdHJ1ZSkge1xuICAgICAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5idWlsZEZldGNoSGVhZGVycygpO1xuICAgIH1cbiAgICBkZWxldGUgb3B0aW9ucy5ub0hlYWRlcjtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHBvc3QodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgdG9rZW4/OiBzdHJpbmcsIHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlLCBpc1RlbXBUb2tlbjogYm9vbGVhbiA9IGZhbHNlLCBsb29zZUNvdW50OiBib29sZWFuID0gZmFsc2UsIHBhcnRpYWxVcmw6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICBpZiAocGFydGlhbFVybCkge1xuICAgICAgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdCh1cmwsIGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6ICcnLCB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuYnVpbGRIZWFkZXJzKHdpdGhDb3VudCwgdG9rZW4sIG51bGwsIGlzVGVtcFRva2VuLCBmYWxzZSwgbG9vc2VDb3VudCksXG4gICAgICAgIG9ic2VydmU6ICdyZXNwb25zZSdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KTogYW55ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRva2VuKHJlcyk7XG4gICAgICAgICAgICBpZiAocmVzWydfYm9keSddID09PSAnJykge1xuICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSZXNwb25zZShyZXMsIHdpdGhDb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcGF0Y2godXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgdG9rZW4/OiBzdHJpbmcsIHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlLCBpc1RlbXBUb2tlbjogYm9vbGVhbiA9IGZhbHNlLCBsb29zZUNvdW50OiBib29sZWFuID0gZmFsc2UsIHBhcnRpYWxVcmw6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICBpZiAocGFydGlhbFVybCkge1xuICAgICAgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucGF0Y2godXJsLCBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiAnJywge1xuICAgICAgICBoZWFkZXJzOiB0aGlzLmJ1aWxkSGVhZGVycyh3aXRoQ291bnQsIHRva2VuLCBudWxsLCBpc1RlbXBUb2tlbiwgZmFsc2UsIGxvb3NlQ291bnQpLFxuICAgICAgICBvYnNlcnZlOiAncmVzcG9uc2UnXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICAocmVzOiBIdHRwUmVzcG9uc2U8YW55Pik6IGFueSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb2tlbihyZXMpO1xuICAgICAgICAgICAgaWYgKHJlc1snX2JvZHknXSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0UmVzcG9uc2UocmVzLCB3aXRoQ291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlcihlLCB1cmwpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHBvc3RSYXcodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgYmxvYj86IGJvb2xlYW4sIGluY2x1ZGVUb2tlbj86IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHVybCwgYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogJycsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5idWlsZEhlYWRlcnMoZmFsc2UsIG51bGwsIG51bGwsIG51bGwsICFpbmNsdWRlVG9rZW4pLFxuICAgICAgICByZXNwb25zZVR5cGU6IDxhbnk+KGJsb2IgPyAnYXJyYXlidWZmZXInIDogJ2pzb24nKSxcbiAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKHJlczogSHR0cFJlc3BvbnNlPGFueT4pOiBhbnkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfVxuICAgICAgICApLFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcG9zdE11bHRpUGFydCh1cmw6IHN0cmluZywgZGF0YTogT2JqZWN0KSB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICB9KTtcbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3QodXJsLCBmb3JtRGF0YSwgeyBoZWFkZXJzLCBvYnNlcnZlOiAncmVzcG9uc2UnLCByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmV0OiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHJldC5ib2R5O1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHBvc3RGaWxlKHVybDogc3RyaW5nLCBmaWxlOiBGaWxlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICBsZXQgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xuICAgICAgbGV0IHhocjogWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeGhyLnJlc3BvbnNlID8gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpIDogJycpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdGhpcy5zZXNzaW9uLnRva2VuKTtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLUlkJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCkpO1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1lvb2JpYy1DbGllbnQtVmVyc2lvbicsIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCkpO1xuICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHVybDogc3RyaW5nLCB3aXRoQ291bnQ6IGJvb2xlYW4gPSBmYWxzZSwgdG9rZW4/OiBzdHJpbmcsIHBhcmFtcz86IEFycmF5PHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogYW55IH0+LCBzdXBwcmVzc1Rva2VuPzogYm9vbGVhbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLmZvckVhY2gocCA9PiB7XG4gICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChwLm5hbWUsIHAudmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldCh1cmwsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5idWlsZEhlYWRlcnMod2l0aENvdW50LCB0b2tlbiwgbnVsbCwgbnVsbCwgc3VwcHJlc3NUb2tlbiksXG4gICAgICAgIHBhcmFtczogaHR0cFBhcmFtcyxcbiAgICAgICAgb2JzZXJ2ZTogJ3Jlc3BvbnNlJ1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVyKGUsIHVybCk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKHJlczogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHRoaXMudXBkYXRlVG9rZW4ocmVzKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSZXNwb25zZShyZXMsIHdpdGhDb3VudCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgZ2V0QmluYXJ5Q29udGVudCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHVybCwgeyByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlcihlLCB1cmwpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgYm9keTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNsaW1iYXJTdGFydCgpO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wdXQodXJsLCBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiBudWxsLCB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuYnVpbGRIZWFkZXJzKCksXG4gICAgICAgIG9ic2VydmU6ICdyZXNwb25zZSdcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVUb2tlbihyZXMpO1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHJlcy5ib2R5O1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlcihlLCB1cmwpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgYm9keT86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucmVxdWVzdCgnZGVsZXRlJywgdXJsLCB7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuYnVpbGRIZWFkZXJzKCksXG4gICAgICAgIG9ic2VydmU6ICdyZXNwb25zZScsXG4gICAgICAgIGJvZHk6IGJvZHlcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVUb2tlbihyZXMpO1xuICAgICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgICAgcmV0dXJuIHJlcy5ib2R5O1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICB0aGlzLnNsaW1iYXJDb21wbGV0ZSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlcihlLCB1cmwpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGRvd25sb2FkRmlsZShmaWxlbmFtZTogc3RyaW5nLCBtZWRpYVR5cGU6IHN0cmluZywgdXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5zbGltYmFyU3RhcnQoKTtcbiAgICByZXR1cm4gdGhpcy5mZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICByZXR1cm4gcmVzICYmIHJlcy5ibG9iID8gcmVzLmJsb2IoKSA6IG51bGw7XG4gICAgICB9KVxuICAgICAgLnRoZW4oYmxvYiA9PiB7XG4gICAgICAgIGlmIChibG9iKSB7XG4gICAgICAgICAgKDxhbnk+c2F2ZUFzKShibG9iLCBmaWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbGltYmFyQ29tcGxldGUoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIHRoaXMuc2xpbWJhckNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxlcihlLCB1cmwpO1xuICAgICAgfSk7XG4gIH1cblxuICBzYXZlQmxvYihibG9iOiBCbG9iLCBmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgKDxhbnk+c2F2ZUFzKShibG9iLCBmaWxlbmFtZSk7XG4gIH1cblxuICBzYXZlQXJyYXlCdWZmZXIoYXJyYXk6IEFycmF5QnVmZmVyLCBmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSk7XG4gICAgKDxhbnk+c2F2ZUFzKShibG9iLCBmaWxlbmFtZSk7XG4gIH1cblxuICBnZXRGaWxlbmFtZVN1ZmZpeCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnXycgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgnLicsICdfJyk7XG4gIH1cblxuICBwcml2YXRlIGVycm9ySGFuZGxlcihlOiBhbnksIHVybCkge1xuICAgIGxldCBpc0ludmFsaWRDcmVkZW50aWFsczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlmIChlICYmIGUuc3RhdHVzID09PSA0MDEgJiYgdXJsICYmIHVybC5pbmRleE9mKHRoaXMuY29uZmlnLnNlcnZlclVybCkgPj0gMCAmJiBlLmVycm9yICYmIGUuZXJyb3IuZXJyb3IgJiYgKGUuZXJyb3IuZXJyb3IubmFtZSA9PT0gJ0ludmFsaWRDcmVkZW50aWFscycgfHwgZS5lcnJvci5lcnJvci5uYW1lID09PSAnT25seVNzb0xvZ2luQWxsb3dlZCcgfHwgZS5lcnJvci5lcnJvci5tZXNzYWdlID09PSAnT25seSBTU08gbG9naW4gYWxsb3dlZCcpKSB7XG4gICAgICBpc0ludmFsaWRDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuICAgIGlmIChlLnN0YXR1cyA9PT0gNDAxICYmIHVybCAmJiB1cmwuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXJ2ZXJVcmwpID49IDAgJiYgIWlzSW52YWxpZENyZWRlbnRpYWxzICYmIHVybC5pbmRleE9mKCdnZXRDYW1wYWlnblNjb3JlJykgPCAwICYmIGUuZXJyb3IgJiYgZS5lcnJvci5lcnJvciAmJiBlLmVycm9yLmVycm9yLm5hbWUgJiYgZS5lcnJvci5lcnJvci5uYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdMT0dPVVQnKSB7XG4gICAgICBSZXF1ZXN0b3IudW5hdXRob3JpemVkRW1pdHRlci5lbWl0KGUpO1xuICAgIH0gZWxzZSBpZiAoZS5zdGF0dXMgPT09IDQxMykge1xuICAgICAgUmVxdWVzdG9yLnBheWxvYWRUb29CaWdFbWl0dGVyLmVtaXQoZSk7XG4gICAgfSBlbHNlIGlmIChlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICByZXR1cm4gb2YobmV3IEh0dHBSZXNwb25zZTxhbnk+KDxhbnk+eyBib2R5OiB7fSwgc3RhdHVzOiA0MDQgfSkpO1xuICAgIH0gLy9lbHNlIHtcbiAgICB0aHJvdyBlO1xuICAgIC8vfVxuICAgIC8vcmV0dXJuIE9ic2VydmFibGUub2YoZSk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdFJlc3BvbnNlKHJlczogSHR0cFJlc3BvbnNlPGFueT4sIHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHdpdGhDb3VudFxuICAgICAgPyB7XG4gICAgICAgICAgZGF0YTogcmVzLmJvZHksXG4gICAgICAgICAgY291bnQ6ICsocmVzLmhlYWRlcnMuZ2V0KCd4LXRvdGFsLWNvdW50JykgfHwgcmVzLmhlYWRlcnMuZ2V0KCdYLVRvdGFsLUNvdW50JykgfHwgcmVzLmhlYWRlcnMuZ2V0KCd4LWxvb3NlLWNvdW50JykgfHwgcmVzLmhlYWRlcnMuZ2V0KCdYLUxvb3NlLUNvdW50JykpIHx8IDBcbiAgICAgICAgfVxuICAgICAgOiByZXMuYm9keTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRIZWFkZXJzKHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlLCB0b2tlbj86IHN0cmluZywgY29udGVudFR5cGU/OiBzdHJpbmcsIGlzVGVtcFRva2VuPzogYm9vbGVhbiwgc3VwcHJlc3NUb2tlbj86IGJvb2xlYW4sIGxvb3NlQ291bnQ/OiBib29sZWFuKSB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnWC1BcHBsaWNhdGlvbi1JZCcsIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBJZCgpKTtcbiAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ1lvb2JpYy1DbGllbnQtVmVyc2lvbicsIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCkpO1xuXG4gICAgaWYgKHdpdGhDb3VudCkge1xuICAgICAgaWYgKGxvb3NlQ291bnQpIHtcbiAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCd4LWxvb3NlLWNvdW50JywgJ3RydWUnKTtcbiAgICAgIH1cbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgneC10b3RhbC1jb3VudCcsICd0cnVlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgneC1sb29zZS1jb3VudCcsICd0cnVlJyk7XG4gICAgfVxuICAgIGlmIChzdXBwcmVzc1Rva2VuICE9PSB0cnVlKSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKGlzVGVtcFRva2VuKSB7XG4gICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXNzaW9uLnRva2VuKSB7XG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRoaXMuc2Vzc2lvbi50b2tlbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEZldGNoSGVhZGVycyh3aXRoQ291bnQ6IGJvb2xlYW4gPSBmYWxzZSwgdG9rZW4/OiBzdHJpbmcsIGNvbnRlbnRUeXBlPzogc3RyaW5nLCBpc1RlbXBUb2tlbj86IGJvb2xlYW4sIHN1cHByZXNzVG9rZW4/OiBib29sZWFuLCBsb29zZUNvdW50PzogYm9vbGVhbikge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc0lFMTEoKSAmJiBIZWFkZXJzKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnWC1BcHBsaWNhdGlvbi1JZCcsIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBJZCgpKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ1lvb2JpYy1DbGllbnQtVmVyc2lvbicsIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCkpO1xuXG4gICAgICAgIGlmICh3aXRoQ291bnQpIHtcbiAgICAgICAgICBpZiAobG9vc2VDb3VudCkge1xuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ3gtbG9vc2UtY291bnQnLCAndHJ1ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgneC10b3RhbC1jb3VudCcsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1cHByZXNzVG9rZW4gIT09IHRydWUpIHtcbiAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGlmIChpc1RlbXBUb2tlbikge1xuICAgICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgndG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2Vzc2lvbi50b2tlbikge1xuICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0aGlzLnNlc3Npb24udG9rZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRGZXRjaEhlYWRlcnNGYWxsYmFjayh3aXRoQ291bnQsIHRva2VuLCBjb250ZW50VHlwZSwgaXNUZW1wVG9rZW4sIHN1cHByZXNzVG9rZW4sIGxvb3NlQ291bnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEZldGNoSGVhZGVyc0ZhbGxiYWNrKHdpdGhDb3VudDogYm9vbGVhbiA9IGZhbHNlLCB0b2tlbj86IHN0cmluZywgY29udGVudFR5cGU/OiBzdHJpbmcsIGlzVGVtcFRva2VuPzogYm9vbGVhbiwgc3VwcHJlc3NUb2tlbj86IGJvb2xlYW4sIGxvb3NlQ291bnQ/OiBib29sZWFuKSB7XG4gICAgbGV0IGhlYWRlcnMgPSB7fTtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IFtjb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vanNvbiddO1xuICAgIGhlYWRlcnNbJ0FjY2VwdCddID0gWydhcHBsaWNhdGlvbi9qc29uJ107XG4gICAgaGVhZGVyc1snWC1BcHBsaWNhdGlvbi1JZCddID0gW3RoaXMuY29yZUNvbmZpZy5nZXRBcHBJZCgpXTtcbiAgICBoZWFkZXJzWydZb29iaWMtQ2xpZW50LVZlcnNpb24nXSA9IFt0aGlzLmNvcmVDb25maWcuZ2V0QXBwVmVyc2lvbigpXTtcblxuICAgIGlmICh3aXRoQ291bnQpIHtcbiAgICAgIGlmIChsb29zZUNvdW50KSB7XG4gICAgICAgIGhlYWRlcnNbJ3gtbG9vc2UtY291bnQnXSA9IFsndHJ1ZSddO1xuICAgICAgfVxuICAgICAgaGVhZGVyc1sneC10b3RhbC1jb3VudCddID0gWyd0cnVlJ107XG4gICAgfVxuICAgIGlmIChzdXBwcmVzc1Rva2VuICE9PSB0cnVlKSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKGlzVGVtcFRva2VuKSB7XG4gICAgICAgICAgaGVhZGVyc1sndG9rZW4nXSA9IFt0b2tlbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gWydCZWFyZXIgJyArIHRva2VuXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlc3Npb24udG9rZW4pIHtcbiAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gWydCZWFyZXIgJyArIHRoaXMuc2Vzc2lvbi50b2tlbl07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUb2tlbihyZXM6IEh0dHBSZXNwb25zZTxhbnk+KSB7XG4gICAgaWYgKHJlcyAmJiByZXMudXJsICYmIHJlcy51cmwuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXJ2ZXJVcmwpID49IDAgJiYgcmVzLmhlYWRlcnMgJiYgcmVzLmhlYWRlcnMuZ2V0KCdhdXRob3JpemF0aW9uJykpIHtcbiAgICAgIHRoaXMuc2Vzc2lvbi50b2tlbiA9IHJlcy5oZWFkZXJzLmdldCgnYXV0aG9yaXphdGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2xpbWJhclN0YXJ0KCkge1xuICAgIHRoaXMubG9hZGluZ0Jhci5zdGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzbGltYmFyQ29tcGxldGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nQmFyLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==