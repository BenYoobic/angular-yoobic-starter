/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Network, CoreConfig, Log, LocalStorage, Colors } from '@shared/common';
import { Authentication, Session, Push, Config } from '@shared/data-core'; //, Requestor, Config
//, Requestor, Config
import { Intercom } from '../intercom/intercom.service';
import { merge } from 'lodash-es';
//import { captureException, init, sessionURL, getSessionURL, identify } from 'logrocket';
//const LogRocket = require('logrocket');
export class Track {
    /**
     * @param {?} network
     * @param {?} push
     * @param {?} session
     * @param {?} localStorage
     * @param {?} authentication
     * @param {?} coreConfig
     * @param {?} config
     * @param {?} log
     * @param {?} injector
     * @param {?} intercom
     */
    constructor(network, push, session, localStorage, authentication, coreConfig, config, log, injector, intercom) {
        this.network = network;
        this.push = push;
        this.session = session;
        this.localStorage = localStorage;
        this.authentication = authentication;
        this.coreConfig = coreConfig;
        this.config = config;
        this.log = log;
        this.injector = injector;
        this.intercom = intercom;
        this.loadAnalytics();
        //this.loadLogRocket();
        //this.loadSessionStack();
    }
    /**
     * @param {?=} forceLoggedIn
     * @param {?=} ignoreE2E
     * @return {?}
     */
    isEnabled(forceLoggedIn = true, ignoreE2E = false) {
        if (this.network.isOffline()) {
            return false;
        }
        if (this.coreConfig.isLocalhost() && !this.coreConfig.isCordova()) {
            return false;
        }
        if (this.coreConfig.getMode() !== 'prod') {
            return false;
        }
        if (this.config.isE2E && !ignoreE2E) {
            return false;
        }
        if (forceLoggedIn && !this.authentication.isLoggedIn()) {
            return false;
        }
        if (this.session.user && this.session.user.disableTracking) {
            return false;
        }
        return true;
    }
    // loadLogRocket() {
    //   if (this.isEnabled(false)) {
    //     try {
    //       LogRocket.init(this.coreConfig.getKey('logrocketId'), {
    //         dom: {
    //           baseHref: this.coreConfig.getCssPublicUrl()
    //         }
    //       });
    //     } catch (error) { }
    //   }
    // }
    /**
     * @return {?}
     */
    loadSessionStack() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            try {
                if (!window['SessionStack'] && this.isEnabled(false, true)) {
                    if (this.coreConfig.isIOS() && this.coreConfig.isCordova()) {
                        Object.defineProperty(window.document, 'cookie', {
                            enumerable: true,
                            configurable: true,
                            get: (/**
                             * @return {?}
                             */
                            () => {
                                return this.localStorage.get('document-cookie');
                            }),
                            set: (/**
                             * @param {?} cookieString
                             * @return {?}
                             */
                            cookieString => {
                                /** @type {?} */
                                let cookie = this.localStorage.get('document-cookie');
                                if (cookie) {
                                    /** @type {?} */
                                    let cookies = cookie.split('; ');
                                    /** @type {?} */
                                    let name = cookieString.split('=')[0];
                                    cookies = cookies.filter((/**
                                     * @param {?} c
                                     * @return {?}
                                     */
                                    c => c.indexOf(name + '=') < 0));
                                    cookies.push(cookieString.trim());
                                    cookie = cookies.join('; ');
                                }
                                else {
                                    cookie = cookieString;
                                }
                                this.localStorage.set('document-cookie', cookie);
                            })
                        });
                    }
                    window['SessionStackKey'] = 'SessionStack';
                    window['SessionStack'] = window['SessionStack'] || {
                        t: this.coreConfig.isIonic() ? this.coreConfig.getKey('sessionStackMobile') : this.coreConfig.getKey('sessionStackWeb'),
                        q: []
                    };
                    ['start', 'stop', 'identify', 'getSessionId', 'log', 'setOnDataCallback'].forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    key => {
                        window['SessionStack'][key] =
                            window['SessionStack'][key] ||
                                (/**
                                 * @return {?}
                                 */
                                function () {
                                    window['SessionStack'].q.push([key].concat([].slice.call(arguments, 0)));
                                });
                    }));
                    /** @type {?} */
                    let f = document.createElement('script');
                    f.async = !0;
                    f.src = 'https://cdn.sessionstack.com/sessionstack.js';
                    f.onload = (/**
                     * @return {?}
                     */
                    () => {
                        resolve(true);
                    });
                    f.onerror = (/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        reject(err);
                    });
                    /** @type {?} */
                    let g = document.getElementsByTagName('script')[0];
                    g.parentNode.insertBefore(f, g);
                }
                else {
                    resolve(false);
                }
            }
            catch (err) {
                reject(err);
            }
        }));
    }
    // sendLogRocketError(err) {
    //   try {
    //     if (this.isEnabled(false)) {
    //       LogRocket.captureException(err);
    //     }
    //   } catch (err) { }
    // }
    // getLogRocketSessionUrl() {
    //   try {
    //     return LogRocket.sessionURL;
    //   } catch (error) { }
    //   return '';
    // }
    /**
     * @return {?}
     */
    getSessionStackSession() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (window['SessionStack']) {
                window['SessionStack'].getSessionId((/**
                 * @param {?} sessionId
                 * @return {?}
                 */
                sessionId => {
                    this.log.log('SessionStack sessionid', sessionId);
                    resolve(sessionId);
                }));
            }
            else {
                resolve(null);
            }
        }));
    }
    /**
     * @return {?}
     */
    getSessionStackUrl() {
        return 'https://app.sessionstack.com/player/#/sessions/';
    }
    /**
     * @param {?} err
     * @return {?}
     */
    sendSessionStackError(err) {
        // try {
        //   if (this.isEnabled(false) && window['SessionStack']) {
        //     window['SessionStack'].log(err);
        //   }
        // } catch (err) { }
    }
    /**
     * @return {?}
     */
    loadAnalytics() {
        if (!this.isEnabled(false)) {
            return;
        }
        /** @type {?} */
        let analytics = (window.analytics = window.analytics || []);
        if (!analytics.initialize) {
            if (analytics.invoked) {
                this.log.error('Segment snippet included twice.');
            }
            else {
                analytics.invoked = !0;
                analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on'];
                analytics.factory = (/**
                 * @param {?} tt
                 * @return {?}
                 */
                function (tt) {
                    return (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        let e = Array.prototype.slice.call(arguments);
                        e.unshift(tt);
                        analytics.push(e);
                        return analytics;
                    });
                });
                for (let t = 0; t < analytics.methods.length; t++) {
                    /** @type {?} */
                    let e = analytics.methods[t];
                    analytics[e] = analytics.factory(e);
                }
                analytics.load = (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    /** @type {?} */
                    let e = document.createElement('script');
                    e.type = 'text/javascript';
                    e.async = !0;
                    e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
                    /** @type {?} */
                    let n = document.getElementsByTagName('script')[0];
                    n.parentNode.insertBefore(e, n);
                });
                analytics.SNIPPET_VERSION = '4.0.0';
                analytics.load(this.config.serverName === 'Production' ? this.coreConfig.getKey('segmentApiWriteKey') : this.coreConfig.getKey('segmentApiWriteKeyDev'));
                analytics.page();
                // LogRocket.getSessionURL(url => {
                //   analytics.track('LogRocket', { sessionURL: url });
                //   this.intercom.trackEvent('LogRocket', { sessionURL: url });
                // });
            }
        }
    }
    /**
     * @param {?} event
     * @param {?=} properties
     * @return {?}
     */
    track(event, properties) {
        if (!event || event === '') {
            return;
        }
        event = event
            .split(' ')
            .map((/**
         * @param {?} word
         * @return {?}
         */
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
            .join(' ');
        if (this.session.debugEvent) {
            this.log.log('EVENT', event, properties);
        }
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.track(event, merge(this.globalTrackedProps(this.session.user), properties));
            }
            catch (error) { }
        }
    }
    /**
     * @param {?} name
     * @param {?=} category
     * @param {?=} properties
     * @return {?}
     */
    page(name, category, properties) {
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.page(category, name, merge(this.globalTrackedProps(this.session.user), properties));
            }
            catch (error) { }
        }
    }
    /**
     * @param {?} user
     * @return {?}
     */
    identify(user) {
        if (!user) {
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.isEnabled()) {
                // try {
                // let traits = {
                //   avatar: user.imageData || '',
                //   email: user.email || user.username || '',
                //   firstName: user.firstName || '',
                //   lastName: user.lastName || '',
                //   createdAt: user._ect || '',
                //   phone: user.telephone || '',
                //   gender: user.gender || '',
                //   device: user.device || '',
                //   target: this.coreConfig.getFullAppName(),
                //   language: user.language || ''
                // };
                //   LogRocket.identify(user._id, traits);
                // } catch (error) { }
                if (window.analytics) {
                    try {
                        /** @type {?} */
                        let segment_traits = {
                            user_id: user._id || '',
                            user_tags: user.tags || '',
                            email: user.email || user.username || '',
                            operating_system: this.coreConfig.getPlatform(),
                            avatar: user.imageData || '',
                            phone: user.telephone || '',
                            gender: user.gender || '',
                            target: this.coreConfig.getFullAppName(),
                            version: this.coreConfig.getAppVersion(),
                            is_dark_theme: Colors.isDarkTheme()
                        };
                        window.analytics.identify(user._id, merge(this.globalTrackedProps(user), segment_traits));
                    }
                    catch (error) { }
                }
                // this.loadSessionStack().then(success => {
                //   if (success && window['SessionStack']) {
                //     //&& !(this.coreConfig.isIOS() && this.coreConfig.isCordova())
                //     try {
                //       this.log.log('SessionStack: identify');
                //       window['SessionStack'].identify({
                //         userId: user._id || '',
                //         email: user.email || user.username || '',
                //         displayName: User.getDisplayName(user),
                //         // Add your own custom user variables here.
                //         user_tags: user.tags || '',
                //         operating_system: this.coreConfig.getPlatform(),
                //         avatar: user.imageData || '',
                //         phone: user.telephone || '',
                //         gender: user.gender || '',
                //         target: this.coreConfig.getFullAppName(),
                //         version: this.coreConfig.getAppVersion();
                //         is_dark_theme: Colors.isDarkTheme()
                //       });
                //       setTimeout(() => {
                //         this.getSessionStackSession().then(sessionId => {
                //           let sessionstackURL = this.getSessionStackUrl() + (sessionId || 'notfound');
                //           this.log.log('SessionStack: link to intercom', sessionstackURL);
                //           this.intercom.update({
                //             sessionstackURL: sessionstackURL
                //           });
                //         });
                //       }, 2000);
                //     } catch (error) { }
                //   }
                // });
            }
            this.intercom.identify(user);
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (window && window['FS'] && window['FS'].getCurrentSessionURL) {
                    /** @type {?} */
                    let fullstoryURL = window['FS'].getCurrentSessionURL();
                    this.intercom.update({
                        fullstoryURL: fullstoryURL
                    });
                }
            }), 2000);
        }), 3000);
    }
    /**
     * @return {?}
     */
    intercomRegisterForPush() {
        this.intercom.registerForPush();
    }
    /**
     * @param {?} user
     * @return {?}
     */
    globalTrackedProps(user) {
        /** @type {?} */
        let props = {
            user_groups: this.authentication.isAdmin() ? [] : this.session.groups,
            user_username: user.username || '',
            user_firstname: user.firstName || '',
            user_lastname: user.lastName || '',
            user_language: user.language || '',
            user_company_name: user.company || '',
            user_tenant: user._tenant ? user._tenant.name : null,
            user_role: user.role || '',
            user_roles: this.session.roles || [],
            user_environment: this.config.serverName.toUpperCase()
        };
        try {
            /** @type {?} */
            let router;
            router = this.injector.get(Router);
            props = merge(props, { page: router.url });
        }
        catch (err) { }
        return props;
    }
}
Track.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Track.ctorParameters = () => [
    { type: Network },
    { type: Push },
    { type: Session },
    { type: LocalStorage },
    { type: Authentication },
    { type: CoreConfig },
    { type: Config },
    { type: Log },
    { type: Injector },
    { type: Intercom }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.network;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.push;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.localStorage;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.authentication;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.log;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    Track.prototype.intercom;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy90cmFjay90cmFjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixPQUFPLEVBQVEsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBQyxxQkFBcUI7O0FBQ3RHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFJbEMsTUFBTSxPQUFPLEtBQUs7Ozs7Ozs7Ozs7Ozs7SUFDaEIsWUFBc0IsT0FBZ0IsRUFBWSxJQUFVLEVBQVksT0FBZ0IsRUFBWSxZQUEwQixFQUFZLGNBQThCLEVBQVksVUFBc0IsRUFBWSxNQUFjLEVBQVksR0FBUSxFQUFZLFFBQWtCLEVBQVksUUFBa0I7UUFBOVIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFZLFNBQUksR0FBSixJQUFJLENBQU07UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVksaUJBQVksR0FBWixZQUFZLENBQWM7UUFBWSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBWSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNs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SUFDZixDQUFDOzs7WUEzVEYsVUFBVTs7OztZQU5GLE9BQU87WUFDd0IsSUFBSTtZQUFiLE9BQU87WUFESCxZQUFZO1lBQ2hDLGNBQWM7WUFEWCxVQUFVO1lBQ2tCLE1BQU07WUFEdEIsR0FBRztZQUZaLFFBQVE7WUFJcEIsUUFBUTs7Ozs7OztJQU1ILHdCQUEwQjs7Ozs7SUFBRSxxQkFBb0I7Ozs7O0lBQUUsd0JBQTBCOzs7OztJQUFFLDZCQUFvQzs7Ozs7SUFBRSwrQkFBd0M7Ozs7O0lBQUUsMkJBQWdDOzs7OztJQUFFLHVCQUF3Qjs7Ozs7SUFBRSxvQkFBa0I7Ozs7O0lBQUUseUJBQTRCOzs7OztJQUFFLHlCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmV0d29yaywgQ29yZUNvbmZpZywgTG9nLCBMb2NhbFN0b3JhZ2UsIENvbG9ycyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IFVzZXIsIEF1dGhlbnRpY2F0aW9uLCBTZXNzaW9uLCBQdXNoLCBDb25maWcgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7IC8vLCBSZXF1ZXN0b3IsIENvbmZpZ1xuaW1wb3J0IHsgSW50ZXJjb20gfSBmcm9tICcuLi9pbnRlcmNvbS9pbnRlcmNvbS5zZXJ2aWNlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoLWVzJztcbi8vaW1wb3J0IHsgY2FwdHVyZUV4Y2VwdGlvbiwgaW5pdCwgc2Vzc2lvblVSTCwgZ2V0U2Vzc2lvblVSTCwgaWRlbnRpZnkgfSBmcm9tICdsb2dyb2NrZXQnO1xuLy9jb25zdCBMb2dSb2NrZXQgPSByZXF1aXJlKCdsb2dyb2NrZXQnKTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFjayB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBuZXR3b3JrOiBOZXR3b3JrLCBwcm90ZWN0ZWQgcHVzaDogUHVzaCwgcHJvdGVjdGVkIHNlc3Npb246IFNlc3Npb24sIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZSwgcHJvdGVjdGVkIGF1dGhlbnRpY2F0aW9uOiBBdXRoZW50aWNhdGlvbiwgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZywgcHJvdGVjdGVkIGxvZzogTG9nLCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgaW50ZXJjb206IEludGVyY29tKSB7XG4gICAgdGhpcy5sb2FkQW5hbHl0aWNzKCk7XG4gICAgLy90aGlzLmxvYWRMb2dSb2NrZXQoKTtcbiAgICAvL3RoaXMubG9hZFNlc3Npb25TdGFjaygpO1xuICB9XG5cbiAgaXNFbmFibGVkKGZvcmNlTG9nZ2VkSW46IGJvb2xlYW4gPSB0cnVlLCBpZ25vcmVFMkU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0xvY2FsaG9zdCgpICYmICF0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5nZXRNb2RlKCkgIT09ICdwcm9kJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuaXNFMkUgJiYgIWlnbm9yZUUyRSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZm9yY2VMb2dnZWRJbiAmJiAhdGhpcy5hdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2Vzc2lvbi51c2VyICYmIHRoaXMuc2Vzc2lvbi51c2VyLmRpc2FibGVUcmFja2luZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGxvYWRMb2dSb2NrZXQoKSB7XG4gIC8vICAgaWYgKHRoaXMuaXNFbmFibGVkKGZhbHNlKSkge1xuICAvLyAgICAgdHJ5IHtcbiAgLy8gICAgICAgTG9nUm9ja2V0LmluaXQodGhpcy5jb3JlQ29uZmlnLmdldEtleSgnbG9ncm9ja2V0SWQnKSwge1xuICAvLyAgICAgICAgIGRvbToge1xuICAvLyAgICAgICAgICAgYmFzZUhyZWY6IHRoaXMuY29yZUNvbmZpZy5nZXRDc3NQdWJsaWNVcmwoKVxuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfSk7XG4gIC8vICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgbG9hZFNlc3Npb25TdGFjaygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCF3aW5kb3dbJ1Nlc3Npb25TdGFjayddICYmIHRoaXMuaXNFbmFibGVkKGZhbHNlLCB0cnVlKSkge1xuICAgICAgICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNJT1MoKSAmJiB0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuZG9jdW1lbnQsICdjb29raWUnLCB7XG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldCgnZG9jdW1lbnQtY29va2llJyk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNldDogY29va2llU3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29va2llID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KCdkb2N1bWVudC1jb29raWUnKTtcbiAgICAgICAgICAgICAgICBpZiAoY29va2llKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgY29va2llcyA9IGNvb2tpZS5zcGxpdCgnOyAnKTtcbiAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gY29va2llU3RyaW5nLnNwbGl0KCc9JylbMF07XG4gICAgICAgICAgICAgICAgICBjb29raWVzID0gY29va2llcy5maWx0ZXIoYyA9PiBjLmluZGV4T2YobmFtZSArICc9JykgPCAwKTtcbiAgICAgICAgICAgICAgICAgIGNvb2tpZXMucHVzaChjb29raWVTdHJpbmcudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgIGNvb2tpZSA9IGNvb2tpZXMuam9pbignOyAnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29va2llID0gY29va2llU3RyaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXQoJ2RvY3VtZW50LWNvb2tpZScsIGNvb2tpZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrS2V5J10gPSAnU2Vzc2lvblN0YWNrJztcbiAgICAgICAgICB3aW5kb3dbJ1Nlc3Npb25TdGFjayddID0gd2luZG93WydTZXNzaW9uU3RhY2snXSB8fCB7XG4gICAgICAgICAgICB0OiB0aGlzLmNvcmVDb25maWcuaXNJb25pYygpID8gdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnc2Vzc2lvblN0YWNrTW9iaWxlJykgOiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdzZXNzaW9uU3RhY2tXZWInKSxcbiAgICAgICAgICAgIHE6IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgICBbJ3N0YXJ0JywgJ3N0b3AnLCAnaWRlbnRpZnknLCAnZ2V0U2Vzc2lvbklkJywgJ2xvZycsICdzZXRPbkRhdGFDYWxsYmFjayddLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrJ11ba2V5XSA9XG4gICAgICAgICAgICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrJ11ba2V5XSB8fFxuICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbJ1Nlc3Npb25TdGFjayddLnEucHVzaChba2V5XS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGV0IGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICBmLmFzeW5jID0gITA7XG4gICAgICAgICAgZi5zcmMgPSAnaHR0cHM6Ly9jZG4uc2Vzc2lvbnN0YWNrLmNvbS9zZXNzaW9uc3RhY2suanMnO1xuICAgICAgICAgIGYub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGYub25lcnJvciA9IGVyciA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGxldCBnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICAgICAgIGcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZiwgZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIHNlbmRMb2dSb2NrZXRFcnJvcihlcnIpIHtcbiAgLy8gICB0cnkge1xuICAvLyAgICAgaWYgKHRoaXMuaXNFbmFibGVkKGZhbHNlKSkge1xuICAvLyAgICAgICBMb2dSb2NrZXQuY2FwdHVyZUV4Y2VwdGlvbihlcnIpO1xuICAvLyAgICAgfVxuICAvLyAgIH0gY2F0Y2ggKGVycikgeyB9XG4gIC8vIH1cblxuICAvLyBnZXRMb2dSb2NrZXRTZXNzaW9uVXJsKCkge1xuICAvLyAgIHRyeSB7XG4gIC8vICAgICByZXR1cm4gTG9nUm9ja2V0LnNlc3Npb25VUkw7XG4gIC8vICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuICAvLyAgIHJldHVybiAnJztcbiAgLy8gfVxuXG4gIGdldFNlc3Npb25TdGFja1Nlc3Npb24oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBpZiAod2luZG93WydTZXNzaW9uU3RhY2snXSkge1xuICAgICAgICB3aW5kb3dbJ1Nlc3Npb25TdGFjayddLmdldFNlc3Npb25JZChzZXNzaW9uSWQgPT4ge1xuICAgICAgICAgIHRoaXMubG9nLmxvZygnU2Vzc2lvblN0YWNrIHNlc3Npb25pZCcsIHNlc3Npb25JZCk7XG4gICAgICAgICAgcmVzb2x2ZShzZXNzaW9uSWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRTZXNzaW9uU3RhY2tVcmwoKTogYW55IHtcbiAgICByZXR1cm4gJ2h0dHBzOi8vYXBwLnNlc3Npb25zdGFjay5jb20vcGxheWVyLyMvc2Vzc2lvbnMvJztcbiAgfVxuXG4gIHNlbmRTZXNzaW9uU3RhY2tFcnJvcihlcnIpIHtcbiAgICAvLyB0cnkge1xuICAgIC8vICAgaWYgKHRoaXMuaXNFbmFibGVkKGZhbHNlKSAmJiB3aW5kb3dbJ1Nlc3Npb25TdGFjayddKSB7XG4gICAgLy8gICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrJ10ubG9nKGVycik7XG4gICAgLy8gICB9XG4gICAgLy8gfSBjYXRjaCAoZXJyKSB7IH1cbiAgfVxuXG4gIGxvYWRBbmFseXRpY3MoKSB7XG4gICAgaWYgKCF0aGlzLmlzRW5hYmxlZChmYWxzZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGFuYWx5dGljcyA9ICh3aW5kb3cuYW5hbHl0aWNzID0gd2luZG93LmFuYWx5dGljcyB8fCBbXSk7XG4gICAgaWYgKCFhbmFseXRpY3MuaW5pdGlhbGl6ZSkge1xuICAgICAgaWYgKGFuYWx5dGljcy5pbnZva2VkKSB7XG4gICAgICAgIHRoaXMubG9nLmVycm9yKCdTZWdtZW50IHNuaXBwZXQgaW5jbHVkZWQgdHdpY2UuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmFseXRpY3MuaW52b2tlZCA9ICEwO1xuICAgICAgICBhbmFseXRpY3MubWV0aG9kcyA9IFsndHJhY2tTdWJtaXQnLCAndHJhY2tDbGljaycsICd0cmFja0xpbmsnLCAndHJhY2tGb3JtJywgJ3BhZ2V2aWV3JywgJ2lkZW50aWZ5JywgJ3Jlc2V0JywgJ2dyb3VwJywgJ3RyYWNrJywgJ3JlYWR5JywgJ2FsaWFzJywgJ2RlYnVnJywgJ3BhZ2UnLCAnb25jZScsICdvZmYnLCAnb24nXTtcbiAgICAgICAgYW5hbHl0aWNzLmZhY3RvcnkgPSBmdW5jdGlvbih0dCkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGUudW5zaGlmdCh0dCk7XG4gICAgICAgICAgICBhbmFseXRpY3MucHVzaChlKTtcbiAgICAgICAgICAgIHJldHVybiBhbmFseXRpY3M7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBhbmFseXRpY3MubWV0aG9kcy5sZW5ndGg7IHQrKykge1xuICAgICAgICAgIGxldCBlID0gYW5hbHl0aWNzLm1ldGhvZHNbdF07XG4gICAgICAgICAgYW5hbHl0aWNzW2VdID0gYW5hbHl0aWNzLmZhY3RvcnkoZSk7XG4gICAgICAgIH1cbiAgICAgICAgYW5hbHl0aWNzLmxvYWQgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgbGV0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICBlLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICBlLmFzeW5jID0gITA7XG4gICAgICAgICAgZS5zcmMgPSAoJ2h0dHBzOicgPT09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vJyA6ICdodHRwOi8vJykgKyAnY2RuLnNlZ21lbnQuY29tL2FuYWx5dGljcy5qcy92MS8nICsgdCArICcvYW5hbHl0aWNzLm1pbi5qcyc7XG4gICAgICAgICAgbGV0IG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICAgbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLCBuKTtcbiAgICAgICAgfTtcbiAgICAgICAgYW5hbHl0aWNzLlNOSVBQRVRfVkVSU0lPTiA9ICc0LjAuMCc7XG4gICAgICAgIGFuYWx5dGljcy5sb2FkKHRoaXMuY29uZmlnLnNlcnZlck5hbWUgPT09ICdQcm9kdWN0aW9uJyA/IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3NlZ21lbnRBcGlXcml0ZUtleScpIDogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnc2VnbWVudEFwaVdyaXRlS2V5RGV2JykpO1xuICAgICAgICBhbmFseXRpY3MucGFnZSgpO1xuXG4gICAgICAgIC8vIExvZ1JvY2tldC5nZXRTZXNzaW9uVVJMKHVybCA9PiB7XG4gICAgICAgIC8vICAgYW5hbHl0aWNzLnRyYWNrKCdMb2dSb2NrZXQnLCB7IHNlc3Npb25VUkw6IHVybCB9KTtcbiAgICAgICAgLy8gICB0aGlzLmludGVyY29tLnRyYWNrRXZlbnQoJ0xvZ1JvY2tldCcsIHsgc2Vzc2lvblVSTDogdXJsIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cmFjayhldmVudDogc3RyaW5nLCBwcm9wZXJ0aWVzPzogT2JqZWN0KTogdm9pZCB7XG4gICAgaWYgKCFldmVudCB8fCBldmVudCA9PT0gJycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQgPSBldmVudFxuICAgICAgLnNwbGl0KCcgJylcbiAgICAgIC5tYXAod29yZCA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgICAgLmpvaW4oJyAnKTtcbiAgICBpZiAodGhpcy5zZXNzaW9uLmRlYnVnRXZlbnQpIHtcbiAgICAgIHRoaXMubG9nLmxvZygnRVZFTlQnLCBldmVudCwgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpICYmIHdpbmRvdy5hbmFseXRpY3MpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHdpbmRvdy5hbmFseXRpY3MudHJhY2soZXZlbnQsIG1lcmdlKHRoaXMuZ2xvYmFsVHJhY2tlZFByb3BzKHRoaXMuc2Vzc2lvbi51c2VyKSwgcHJvcGVydGllcykpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgfVxuICB9XG5cbiAgcGFnZShuYW1lOiBzdHJpbmcsIGNhdGVnb3J5Pzogc3RyaW5nLCBwcm9wZXJ0aWVzPzogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgd2luZG93LmFuYWx5dGljcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgd2luZG93LmFuYWx5dGljcy5wYWdlKGNhdGVnb3J5LCBuYW1lLCBtZXJnZSh0aGlzLmdsb2JhbFRyYWNrZWRQcm9wcyh0aGlzLnNlc3Npb24udXNlciksIHByb3BlcnRpZXMpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIH1cbiAgfVxuXG4gIGlkZW50aWZ5KHVzZXI6IFVzZXIpIHtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAvLyB0cnkge1xuICAgICAgICAvLyBsZXQgdHJhaXRzID0ge1xuICAgICAgICAvLyAgIGF2YXRhcjogdXNlci5pbWFnZURhdGEgfHwgJycsXG4gICAgICAgIC8vICAgZW1haWw6IHVzZXIuZW1haWwgfHwgdXNlci51c2VybmFtZSB8fCAnJyxcbiAgICAgICAgLy8gICBmaXJzdE5hbWU6IHVzZXIuZmlyc3ROYW1lIHx8ICcnLFxuICAgICAgICAvLyAgIGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lIHx8ICcnLFxuICAgICAgICAvLyAgIGNyZWF0ZWRBdDogdXNlci5fZWN0IHx8ICcnLFxuICAgICAgICAvLyAgIHBob25lOiB1c2VyLnRlbGVwaG9uZSB8fCAnJyxcbiAgICAgICAgLy8gICBnZW5kZXI6IHVzZXIuZ2VuZGVyIHx8ICcnLFxuICAgICAgICAvLyAgIGRldmljZTogdXNlci5kZXZpY2UgfHwgJycsXG4gICAgICAgIC8vICAgdGFyZ2V0OiB0aGlzLmNvcmVDb25maWcuZ2V0RnVsbEFwcE5hbWUoKSxcbiAgICAgICAgLy8gICBsYW5ndWFnZTogdXNlci5sYW5ndWFnZSB8fCAnJ1xuICAgICAgICAvLyB9O1xuICAgICAgICAvLyAgIExvZ1JvY2tldC5pZGVudGlmeSh1c2VyLl9pZCwgdHJhaXRzKTtcbiAgICAgICAgLy8gfSBjYXRjaCAoZXJyb3IpIHsgfVxuICAgICAgICBpZiAod2luZG93LmFuYWx5dGljcykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgc2VnbWVudF90cmFpdHMgPSB7XG4gICAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXIuX2lkIHx8ICcnLFxuICAgICAgICAgICAgICB1c2VyX3RhZ3M6IHVzZXIudGFncyB8fCAnJyxcbiAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwgfHwgdXNlci51c2VybmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgb3BlcmF0aW5nX3N5c3RlbTogdGhpcy5jb3JlQ29uZmlnLmdldFBsYXRmb3JtKCksXG4gICAgICAgICAgICAgIGF2YXRhcjogdXNlci5pbWFnZURhdGEgfHwgJycsXG4gICAgICAgICAgICAgIHBob25lOiB1c2VyLnRlbGVwaG9uZSB8fCAnJyxcbiAgICAgICAgICAgICAgZ2VuZGVyOiB1c2VyLmdlbmRlciB8fCAnJyxcbiAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmNvcmVDb25maWcuZ2V0RnVsbEFwcE5hbWUoKSxcbiAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5jb3JlQ29uZmlnLmdldEFwcFZlcnNpb24oKSxcbiAgICAgICAgICAgICAgaXNfZGFya190aGVtZTogQ29sb3JzLmlzRGFya1RoZW1lKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuYW5hbHl0aWNzLmlkZW50aWZ5KHVzZXIuX2lkLCBtZXJnZSh0aGlzLmdsb2JhbFRyYWNrZWRQcm9wcyh1c2VyKSwgc2VnbWVudF90cmFpdHMpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmxvYWRTZXNzaW9uU3RhY2soKS50aGVuKHN1Y2Nlc3MgPT4ge1xuICAgICAgICAvLyAgIGlmIChzdWNjZXNzICYmIHdpbmRvd1snU2Vzc2lvblN0YWNrJ10pIHtcbiAgICAgICAgLy8gICAgIC8vJiYgISh0aGlzLmNvcmVDb25maWcuaXNJT1MoKSAmJiB0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpXG4gICAgICAgIC8vICAgICB0cnkge1xuICAgICAgICAvLyAgICAgICB0aGlzLmxvZy5sb2coJ1Nlc3Npb25TdGFjazogaWRlbnRpZnknKTtcbiAgICAgICAgLy8gICAgICAgd2luZG93WydTZXNzaW9uU3RhY2snXS5pZGVudGlmeSh7XG4gICAgICAgIC8vICAgICAgICAgdXNlcklkOiB1c2VyLl9pZCB8fCAnJyxcbiAgICAgICAgLy8gICAgICAgICBlbWFpbDogdXNlci5lbWFpbCB8fCB1c2VyLnVzZXJuYW1lIHx8ICcnLFxuICAgICAgICAvLyAgICAgICAgIGRpc3BsYXlOYW1lOiBVc2VyLmdldERpc3BsYXlOYW1lKHVzZXIpLFxuICAgICAgICAvLyAgICAgICAgIC8vIEFkZCB5b3VyIG93biBjdXN0b20gdXNlciB2YXJpYWJsZXMgaGVyZS5cbiAgICAgICAgLy8gICAgICAgICB1c2VyX3RhZ3M6IHVzZXIudGFncyB8fCAnJyxcbiAgICAgICAgLy8gICAgICAgICBvcGVyYXRpbmdfc3lzdGVtOiB0aGlzLmNvcmVDb25maWcuZ2V0UGxhdGZvcm0oKSxcbiAgICAgICAgLy8gICAgICAgICBhdmF0YXI6IHVzZXIuaW1hZ2VEYXRhIHx8ICcnLFxuICAgICAgICAvLyAgICAgICAgIHBob25lOiB1c2VyLnRlbGVwaG9uZSB8fCAnJyxcbiAgICAgICAgLy8gICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyIHx8ICcnLFxuICAgICAgICAvLyAgICAgICAgIHRhcmdldDogdGhpcy5jb3JlQ29uZmlnLmdldEZ1bGxBcHBOYW1lKCksXG4gICAgICAgIC8vICAgICAgICAgdmVyc2lvbjogdGhpcy5jb3JlQ29uZmlnLmdldEFwcFZlcnNpb24oKTtcbiAgICAgICAgLy8gICAgICAgICBpc19kYXJrX3RoZW1lOiBDb2xvcnMuaXNEYXJrVGhlbWUoKVxuICAgICAgICAvLyAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5nZXRTZXNzaW9uU3RhY2tTZXNzaW9uKCkudGhlbihzZXNzaW9uSWQgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgbGV0IHNlc3Npb25zdGFja1VSTCA9IHRoaXMuZ2V0U2Vzc2lvblN0YWNrVXJsKCkgKyAoc2Vzc2lvbklkIHx8ICdub3Rmb3VuZCcpO1xuICAgICAgICAvLyAgICAgICAgICAgdGhpcy5sb2cubG9nKCdTZXNzaW9uU3RhY2s6IGxpbmsgdG8gaW50ZXJjb20nLCBzZXNzaW9uc3RhY2tVUkwpO1xuICAgICAgICAvLyAgICAgICAgICAgdGhpcy5pbnRlcmNvbS51cGRhdGUoe1xuICAgICAgICAvLyAgICAgICAgICAgICBzZXNzaW9uc3RhY2tVUkw6IHNlc3Npb25zdGFja1VSTFxuICAgICAgICAvLyAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgIH0sIDIwMDApO1xuICAgICAgICAvLyAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmludGVyY29tLmlkZW50aWZ5KHVzZXIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93WydGUyddICYmIHdpbmRvd1snRlMnXS5nZXRDdXJyZW50U2Vzc2lvblVSTCkge1xuICAgICAgICAgIGxldCBmdWxsc3RvcnlVUkwgPSB3aW5kb3dbJ0ZTJ10uZ2V0Q3VycmVudFNlc3Npb25VUkwoKTtcbiAgICAgICAgICB0aGlzLmludGVyY29tLnVwZGF0ZSh7XG4gICAgICAgICAgICBmdWxsc3RvcnlVUkw6IGZ1bGxzdG9yeVVSTFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCAyMDAwKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIGludGVyY29tUmVnaXN0ZXJGb3JQdXNoKCkge1xuICAgIHRoaXMuaW50ZXJjb20ucmVnaXN0ZXJGb3JQdXNoKCk7XG4gIH1cblxuICBnbG9iYWxUcmFja2VkUHJvcHModXNlcjogVXNlcikge1xuICAgIGxldCBwcm9wcyA9IHtcbiAgICAgIHVzZXJfZ3JvdXBzOiB0aGlzLmF1dGhlbnRpY2F0aW9uLmlzQWRtaW4oKSA/IFtdIDogdGhpcy5zZXNzaW9uLmdyb3VwcyxcbiAgICAgIHVzZXJfdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUgfHwgJycsXG4gICAgICB1c2VyX2ZpcnN0bmFtZTogdXNlci5maXJzdE5hbWUgfHwgJycsXG4gICAgICB1c2VyX2xhc3RuYW1lOiB1c2VyLmxhc3ROYW1lIHx8ICcnLFxuICAgICAgdXNlcl9sYW5ndWFnZTogdXNlci5sYW5ndWFnZSB8fCAnJyxcbiAgICAgIHVzZXJfY29tcGFueV9uYW1lOiB1c2VyLmNvbXBhbnkgfHwgJycsXG4gICAgICB1c2VyX3RlbmFudDogdXNlci5fdGVuYW50ID8gdXNlci5fdGVuYW50Lm5hbWUgOiBudWxsLFxuICAgICAgdXNlcl9yb2xlOiB1c2VyLnJvbGUgfHwgJycsXG4gICAgICB1c2VyX3JvbGVzOiB0aGlzLnNlc3Npb24ucm9sZXMgfHwgW10sXG4gICAgICB1c2VyX2Vudmlyb25tZW50OiB0aGlzLmNvbmZpZy5zZXJ2ZXJOYW1lLnRvVXBwZXJDYXNlKClcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBsZXQgcm91dGVyOiBSb3V0ZXI7XG4gICAgICByb3V0ZXIgPSB0aGlzLmluamVjdG9yLmdldChSb3V0ZXIpO1xuICAgICAgcHJvcHMgPSBtZXJnZShwcm9wcywgeyBwYWdlOiByb3V0ZXIudXJsIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge31cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cbn1cbiJdfQ==