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
var Track = /** @class */ (function () {
    function Track(network, push, session, localStorage, authentication, coreConfig, config, log, injector, intercom) {
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
    Track.prototype.isEnabled = /**
     * @param {?=} forceLoggedIn
     * @param {?=} ignoreE2E
     * @return {?}
     */
    function (forceLoggedIn, ignoreE2E) {
        if (forceLoggedIn === void 0) { forceLoggedIn = true; }
        if (ignoreE2E === void 0) { ignoreE2E = false; }
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
    };
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
    Track.prototype.loadSessionStack = 
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
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            try {
                if (!window['SessionStack'] && _this.isEnabled(false, true)) {
                    if (_this.coreConfig.isIOS() && _this.coreConfig.isCordova()) {
                        Object.defineProperty(window.document, 'cookie', {
                            enumerable: true,
                            configurable: true,
                            get: (/**
                             * @return {?}
                             */
                            function () {
                                return _this.localStorage.get('document-cookie');
                            }),
                            set: (/**
                             * @param {?} cookieString
                             * @return {?}
                             */
                            function (cookieString) {
                                /** @type {?} */
                                var cookie = _this.localStorage.get('document-cookie');
                                if (cookie) {
                                    /** @type {?} */
                                    var cookies = cookie.split('; ');
                                    /** @type {?} */
                                    var name_1 = cookieString.split('=')[0];
                                    cookies = cookies.filter((/**
                                     * @param {?} c
                                     * @return {?}
                                     */
                                    function (c) { return c.indexOf(name_1 + '=') < 0; }));
                                    cookies.push(cookieString.trim());
                                    cookie = cookies.join('; ');
                                }
                                else {
                                    cookie = cookieString;
                                }
                                _this.localStorage.set('document-cookie', cookie);
                            })
                        });
                    }
                    window['SessionStackKey'] = 'SessionStack';
                    window['SessionStack'] = window['SessionStack'] || {
                        t: _this.coreConfig.isIonic() ? _this.coreConfig.getKey('sessionStackMobile') : _this.coreConfig.getKey('sessionStackWeb'),
                        q: []
                    };
                    ['start', 'stop', 'identify', 'getSessionId', 'log', 'setOnDataCallback'].forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
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
                    var f = document.createElement('script');
                    f.async = !0;
                    f.src = 'https://cdn.sessionstack.com/sessionstack.js';
                    f.onload = (/**
                     * @return {?}
                     */
                    function () {
                        resolve(true);
                    });
                    f.onerror = (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        reject(err);
                    });
                    /** @type {?} */
                    var g = document.getElementsByTagName('script')[0];
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
    };
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
    Track.prototype.getSessionStackSession = 
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
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (window['SessionStack']) {
                window['SessionStack'].getSessionId((/**
                 * @param {?} sessionId
                 * @return {?}
                 */
                function (sessionId) {
                    _this.log.log('SessionStack sessionid', sessionId);
                    resolve(sessionId);
                }));
            }
            else {
                resolve(null);
            }
        }));
    };
    /**
     * @return {?}
     */
    Track.prototype.getSessionStackUrl = /**
     * @return {?}
     */
    function () {
        return 'https://app.sessionstack.com/player/#/sessions/';
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Track.prototype.sendSessionStackError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        // try {
        //   if (this.isEnabled(false) && window['SessionStack']) {
        //     window['SessionStack'].log(err);
        //   }
        // } catch (err) { }
    };
    /**
     * @return {?}
     */
    Track.prototype.loadAnalytics = /**
     * @return {?}
     */
    function () {
        if (!this.isEnabled(false)) {
            return;
        }
        /** @type {?} */
        var analytics = (window.analytics = window.analytics || []);
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
                        var e = Array.prototype.slice.call(arguments);
                        e.unshift(tt);
                        analytics.push(e);
                        return analytics;
                    });
                });
                for (var t = 0; t < analytics.methods.length; t++) {
                    /** @type {?} */
                    var e = analytics.methods[t];
                    analytics[e] = analytics.factory(e);
                }
                analytics.load = (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    /** @type {?} */
                    var e = document.createElement('script');
                    e.type = 'text/javascript';
                    e.async = !0;
                    e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
                    /** @type {?} */
                    var n = document.getElementsByTagName('script')[0];
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
    };
    /**
     * @param {?} event
     * @param {?=} properties
     * @return {?}
     */
    Track.prototype.track = /**
     * @param {?} event
     * @param {?=} properties
     * @return {?}
     */
    function (event, properties) {
        if (!event || event === '') {
            return;
        }
        event = event
            .split(' ')
            .map((/**
         * @param {?} word
         * @return {?}
         */
        function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }))
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
    };
    /**
     * @param {?} name
     * @param {?=} category
     * @param {?=} properties
     * @return {?}
     */
    Track.prototype.page = /**
     * @param {?} name
     * @param {?=} category
     * @param {?=} properties
     * @return {?}
     */
    function (name, category, properties) {
        if (this.isEnabled() && window.analytics) {
            try {
                window.analytics.page(category, name, merge(this.globalTrackedProps(this.session.user), properties));
            }
            catch (error) { }
        }
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Track.prototype.identify = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var _this = this;
        if (!user) {
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.isEnabled()) {
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
                        var segment_traits = {
                            user_id: user._id || '',
                            user_tags: user.tags || '',
                            email: user.email || user.username || '',
                            operating_system: _this.coreConfig.getPlatform(),
                            avatar: user.imageData || '',
                            phone: user.telephone || '',
                            gender: user.gender || '',
                            target: _this.coreConfig.getFullAppName(),
                            version: _this.coreConfig.getAppVersion(),
                            is_dark_theme: Colors.isDarkTheme()
                        };
                        window.analytics.identify(user._id, merge(_this.globalTrackedProps(user), segment_traits));
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
            _this.intercom.identify(user);
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (window && window['FS'] && window['FS'].getCurrentSessionURL) {
                    /** @type {?} */
                    var fullstoryURL = window['FS'].getCurrentSessionURL();
                    _this.intercom.update({
                        fullstoryURL: fullstoryURL
                    });
                }
            }), 2000);
        }), 3000);
    };
    /**
     * @return {?}
     */
    Track.prototype.intercomRegisterForPush = /**
     * @return {?}
     */
    function () {
        this.intercom.registerForPush();
    };
    /**
     * @param {?} user
     * @return {?}
     */
    Track.prototype.globalTrackedProps = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        /** @type {?} */
        var props = {
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
            var router = void 0;
            router = this.injector.get(Router);
            props = merge(props, { page: router.url });
        }
        catch (err) { }
        return props;
    };
    Track.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Track.ctorParameters = function () { return [
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
    ]; };
    return Track;
}());
export { Track };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy90cmFjay90cmFjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixPQUFPLEVBQVEsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUMsQ0FBQyxxQkFBcUI7O0FBQ3RHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7QUFHbEM7SUFFRSxlQUFzQixPQUFnQixFQUFZLElBQVUsRUFBWSxPQUFnQixFQUFZLFlBQTBCLEVBQVksY0FBOEIsRUFBWSxVQUFzQixFQUFZLE1BQWMsRUFBWSxHQUFRLEVBQVksUUFBa0IsRUFBWSxRQUFrQjtRQUE5UixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBWSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFZLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xULElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQix1QkFBdUI7UUFDdkIsMEJBQTBCO0lBQzVCLENBQUM7Ozs7OztJQUVELHlCQUFTOzs7OztJQUFULFVBQVUsYUFBNkIsRUFBRSxTQUEwQjtRQUF6RCw4QkFBQSxFQUFBLG9CQUE2QjtRQUFFLDBCQUFBLEVBQUEsaUJBQTBCO1FBQ2pFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM1QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNqRSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN4QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3RELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMxRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsb0JBQW9CO0lBQ3BCLGlDQUFpQztJQUNqQyxZQUFZO0lBQ1osZ0VBQWdFO0lBQ2hFLGlCQUFpQjtJQUNqQix3REFBd0Q7SUFDeEQsWUFBWTtJQUNaLFlBQVk7SUFDWiwwQkFBMEI7SUFDMUIsTUFBTTtJQUNOLElBQUk7Ozs7Ozs7Ozs7Ozs7OztJQUVKLGdDQUFnQjs7Ozs7Ozs7Ozs7Ozs7O0lBQWhCO1FBQUEsaUJBeURDO1FBeERDLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSTtnQkFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUMxRCxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTt3QkFDMUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRTs0QkFDL0MsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLFlBQVksRUFBRSxJQUFJOzRCQUNsQixHQUFHOzs7NEJBQUU7Z0NBQ0gsT0FBTyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzRCQUNsRCxDQUFDLENBQUE7NEJBQ0QsR0FBRzs7Ozs0QkFBRSxVQUFBLFlBQVk7O29DQUNYLE1BQU0sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDckQsSUFBSSxNQUFNLEVBQUU7O3dDQUNOLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7d0NBQzVCLE1BQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDckMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNOzs7O29DQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUF6QixDQUF5QixFQUFDLENBQUM7b0NBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0NBQ2xDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUM3QjtxQ0FBTTtvQ0FDTCxNQUFNLEdBQUcsWUFBWSxDQUFDO2lDQUN2QjtnQ0FDRCxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDbkQsQ0FBQyxDQUFBO3lCQUNGLENBQUMsQ0FBQztxQkFDSjtvQkFFRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxjQUFjLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUk7d0JBQ2pELENBQUMsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDdkgsQ0FBQyxFQUFFLEVBQUU7cUJBQ04sQ0FBQztvQkFDRixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsR0FBRzt3QkFDbkYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs0QkFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7OztnQ0FDM0I7b0NBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDM0UsQ0FBQyxDQUFBLENBQUM7b0JBQ04sQ0FBQyxFQUFDLENBQUM7O3dCQUNDLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDYixDQUFDLENBQUMsR0FBRyxHQUFHLDhDQUE4QyxDQUFDO29CQUN2RCxDQUFDLENBQUMsTUFBTTs7O29CQUFHO3dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEIsQ0FBQyxDQUFBLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLE9BQU87Ozs7b0JBQUcsVUFBQSxHQUFHO3dCQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDZCxDQUFDLENBQUEsQ0FBQzs7d0JBQ0UsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDakM7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2I7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBNEI7SUFDNUIsVUFBVTtJQUNWLG1DQUFtQztJQUNuQyx5Q0FBeUM7SUFDekMsUUFBUTtJQUNSLHNCQUFzQjtJQUN0QixJQUFJO0lBRUosNkJBQTZCO0lBQzdCLFVBQVU7SUFDVixtQ0FBbUM7SUFDbkMsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7OztJQUVKLHNDQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBdEI7UUFBQSxpQkFXQztRQVZDLE9BQU8sSUFBSSxPQUFPOzs7O1FBQUMsVUFBQSxPQUFPO1lBQ3hCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUMxQixNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWTs7OztnQkFBQyxVQUFBLFNBQVM7b0JBQzNDLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsRUFBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxrQ0FBa0I7OztJQUFsQjtRQUNFLE9BQU8saURBQWlELENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFRCxxQ0FBcUI7Ozs7SUFBckIsVUFBc0IsR0FBRztRQUN2QixRQUFRO1FBQ1IsMkRBQTJEO1FBQzNELHVDQUF1QztRQUN2QyxNQUFNO1FBQ04sb0JBQW9CO0lBQ3RCLENBQUM7Ozs7SUFFRCw2QkFBYTs7O0lBQWI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixPQUFPO1NBQ1I7O1lBQ0csU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUN6QixJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0wsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2TCxTQUFTLENBQUMsT0FBTzs7OztnQkFBRyxVQUFTLEVBQUU7b0JBQzdCOzs7b0JBQU87OzRCQUNELENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUM3QyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNkLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE9BQU8sU0FBUyxDQUFDO29CQUNuQixDQUFDLEVBQUM7Z0JBQ0osQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzt3QkFDN0MsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM1QixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckM7Z0JBQ0QsU0FBUyxDQUFDLElBQUk7Ozs7Z0JBQUcsVUFBUyxDQUFDOzt3QkFDckIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO29CQUN4QyxDQUFDLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO29CQUMzQixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNiLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsa0NBQWtDLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixDQUFDOzt3QkFDdEksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pKLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFakIsbUNBQW1DO2dCQUNuQyx1REFBdUQ7Z0JBQ3ZELGdFQUFnRTtnQkFDaEUsTUFBTTthQUNQO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7SUFFRCxxQkFBSzs7Ozs7SUFBTCxVQUFNLEtBQWEsRUFBRSxVQUFtQjtRQUN0QyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBQ0QsS0FBSyxHQUFHLEtBQUs7YUFDVixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUExRCxDQUEwRCxFQUFDO2FBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDeEMsSUFBSTtnQkFDRixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDOUY7WUFBQyxPQUFPLEtBQUssRUFBRSxHQUFFO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7OztJQUVELG9CQUFJOzs7Ozs7SUFBSixVQUFLLElBQVksRUFBRSxRQUFpQixFQUFFLFVBQWdCO1FBQ3BELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDeEMsSUFBSTtnQkFDRixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3RHO1lBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtTQUNuQjtJQUNILENBQUM7Ozs7O0lBRUQsd0JBQVE7Ozs7SUFBUixVQUFTLElBQVU7UUFBbkIsaUJBZ0ZDO1FBL0VDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPO1NBQ1I7UUFDRCxVQUFVOzs7UUFBQztZQUNULElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNwQixRQUFRO2dCQUNSLGlCQUFpQjtnQkFDakIsa0NBQWtDO2dCQUNsQyw4Q0FBOEM7Z0JBQzlDLHFDQUFxQztnQkFDckMsbUNBQW1DO2dCQUNuQyxnQ0FBZ0M7Z0JBQ2hDLGlDQUFpQztnQkFDakMsK0JBQStCO2dCQUMvQiwrQkFBK0I7Z0JBQy9CLDhDQUE4QztnQkFDOUMsa0NBQWtDO2dCQUNsQyxLQUFLO2dCQUNMLDBDQUEwQztnQkFDMUMsc0JBQXNCO2dCQUN0QixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7b0JBQ3BCLElBQUk7OzRCQUNFLGNBQWMsR0FBRzs0QkFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTs0QkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTs0QkFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFOzRCQUN4QyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTs0QkFDL0MsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTs0QkFDNUIsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTs0QkFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRTs0QkFDekIsTUFBTSxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFOzRCQUN4QyxPQUFPLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7NEJBQ3hDLGFBQWEsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO3lCQUNwQzt3QkFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztxQkFDM0Y7b0JBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtpQkFDbkI7Z0JBQ0QsNENBQTRDO2dCQUM1Qyw2Q0FBNkM7Z0JBQzdDLHFFQUFxRTtnQkFDckUsWUFBWTtnQkFDWixnREFBZ0Q7Z0JBQ2hELDBDQUEwQztnQkFDMUMsa0NBQWtDO2dCQUNsQyxvREFBb0Q7Z0JBQ3BELGtEQUFrRDtnQkFDbEQsc0RBQXNEO2dCQUN0RCxzQ0FBc0M7Z0JBQ3RDLDJEQUEyRDtnQkFDM0Qsd0NBQXdDO2dCQUN4Qyx1Q0FBdUM7Z0JBQ3ZDLHFDQUFxQztnQkFDckMsb0RBQW9EO2dCQUNwRCxvREFBb0Q7Z0JBQ3BELDhDQUE4QztnQkFDOUMsWUFBWTtnQkFDWiwyQkFBMkI7Z0JBQzNCLDREQUE0RDtnQkFDNUQseUZBQXlGO2dCQUN6Riw2RUFBNkU7Z0JBQzdFLG1DQUFtQztnQkFDbkMsK0NBQStDO2dCQUMvQyxnQkFBZ0I7Z0JBQ2hCLGNBQWM7Z0JBQ2Qsa0JBQWtCO2dCQUNsQiwwQkFBMEI7Z0JBQzFCLE1BQU07Z0JBQ04sTUFBTTthQUNQO1lBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsVUFBVTs7O1lBQUM7Z0JBQ1QsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRTs7d0JBQzNELFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUU7b0JBQ3RELEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO3dCQUNuQixZQUFZLEVBQUUsWUFBWTtxQkFDM0IsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELHVDQUF1Qjs7O0lBQXZCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELGtDQUFrQjs7OztJQUFsQixVQUFtQixJQUFVOztZQUN2QixLQUFLLEdBQUc7WUFDVixXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDckUsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtZQUNsQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO1lBQ3BDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUU7WUFDbEMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtZQUNsQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUU7WUFDckMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3BELFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDMUIsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDcEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1NBQ3ZEO1FBQ0QsSUFBSTs7Z0JBQ0UsTUFBTSxTQUFRO1lBQ2xCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1QztRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7UUFDaEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkEzVEYsVUFBVTs7OztnQkFORixPQUFPO2dCQUN3QixJQUFJO2dCQUFiLE9BQU87Z0JBREgsWUFBWTtnQkFDaEMsY0FBYztnQkFEWCxVQUFVO2dCQUNrQixNQUFNO2dCQUR0QixHQUFHO2dCQUZaLFFBQVE7Z0JBSXBCLFFBQVE7O0lBZ1VqQixZQUFDO0NBQUEsQUE1VEQsSUE0VEM7U0EzVFksS0FBSzs7Ozs7O0lBQ0osd0JBQTBCOzs7OztJQUFFLHFCQUFvQjs7Ozs7SUFBRSx3QkFBMEI7Ozs7O0lBQUUsNkJBQW9DOzs7OztJQUFFLCtCQUF3Qzs7Ozs7SUFBRSwyQkFBZ0M7Ozs7O0lBQUUsdUJBQXdCOzs7OztJQUFFLG9CQUFrQjs7Ozs7SUFBRSx5QkFBNEI7Ozs7O0lBQUUseUJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZXR3b3JrLCBDb3JlQ29uZmlnLCBMb2csIExvY2FsU3RvcmFnZSwgQ29sb3JzIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgVXNlciwgQXV0aGVudGljYXRpb24sIFNlc3Npb24sIFB1c2gsIENvbmZpZyB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJzsgLy8sIFJlcXVlc3RvciwgQ29uZmlnXG5pbXBvcnQgeyBJbnRlcmNvbSB9IGZyb20gJy4uL2ludGVyY29tL2ludGVyY29tLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gtZXMnO1xuLy9pbXBvcnQgeyBjYXB0dXJlRXhjZXB0aW9uLCBpbml0LCBzZXNzaW9uVVJMLCBnZXRTZXNzaW9uVVJMLCBpZGVudGlmeSB9IGZyb20gJ2xvZ3JvY2tldCc7XG4vL2NvbnN0IExvZ1JvY2tldCA9IHJlcXVpcmUoJ2xvZ3JvY2tldCcpO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYWNrIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIG5ldHdvcms6IE5ldHdvcmssIHByb3RlY3RlZCBwdXNoOiBQdXNoLCBwcm90ZWN0ZWQgc2Vzc2lvbjogU2Vzc2lvbiwgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZTogTG9jYWxTdG9yYWdlLCBwcm90ZWN0ZWQgYXV0aGVudGljYXRpb246IEF1dGhlbnRpY2F0aW9uLCBwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZywgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgbG9nOiBMb2csIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsIHByb3RlY3RlZCBpbnRlcmNvbTogSW50ZXJjb20pIHtcbiAgICB0aGlzLmxvYWRBbmFseXRpY3MoKTtcbiAgICAvL3RoaXMubG9hZExvZ1JvY2tldCgpO1xuICAgIC8vdGhpcy5sb2FkU2Vzc2lvblN0YWNrKCk7XG4gIH1cblxuICBpc0VuYWJsZWQoZm9yY2VMb2dnZWRJbjogYm9vbGVhbiA9IHRydWUsIGlnbm9yZUUyRTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzTG9jYWxob3N0KCkgJiYgIXRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmdldE1vZGUoKSAhPT0gJ3Byb2QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5pc0UyRSAmJiAhaWdub3JlRTJFKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChmb3JjZUxvZ2dlZEluICYmICF0aGlzLmF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4oKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXNzaW9uLnVzZXIgJiYgdGhpcy5zZXNzaW9uLnVzZXIuZGlzYWJsZVRyYWNraW5nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gbG9hZExvZ1JvY2tldCgpIHtcbiAgLy8gICBpZiAodGhpcy5pc0VuYWJsZWQoZmFsc2UpKSB7XG4gIC8vICAgICB0cnkge1xuICAvLyAgICAgICBMb2dSb2NrZXQuaW5pdCh0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdsb2dyb2NrZXRJZCcpLCB7XG4gIC8vICAgICAgICAgZG9tOiB7XG4gIC8vICAgICAgICAgICBiYXNlSHJlZjogdGhpcy5jb3JlQ29uZmlnLmdldENzc1B1YmxpY1VybCgpXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9KTtcbiAgLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cbiAgLy8gICB9XG4gIC8vIH1cblxuICBsb2FkU2Vzc2lvblN0YWNrKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXdpbmRvd1snU2Vzc2lvblN0YWNrJ10gJiYgdGhpcy5pc0VuYWJsZWQoZmFsc2UsIHRydWUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lPUygpICYmIHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5kb2N1bWVudCwgJ2Nvb2tpZScsIHtcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KCdkb2N1bWVudC1jb29raWUnKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2V0OiBjb29raWVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb29raWUgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXQoJ2RvY3VtZW50LWNvb2tpZScpO1xuICAgICAgICAgICAgICAgIGlmIChjb29raWUpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBjb29raWVzID0gY29va2llLnNwbGl0KCc7ICcpO1xuICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBjb29raWVTdHJpbmcuc3BsaXQoJz0nKVswXTtcbiAgICAgICAgICAgICAgICAgIGNvb2tpZXMgPSBjb29raWVzLmZpbHRlcihjID0+IGMuaW5kZXhPZihuYW1lICsgJz0nKSA8IDApO1xuICAgICAgICAgICAgICAgICAgY29va2llcy5wdXNoKGNvb2tpZVN0cmluZy50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgY29va2llID0gY29va2llcy5qb2luKCc7ICcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb29raWUgPSBjb29raWVTdHJpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLnNldCgnZG9jdW1lbnQtY29va2llJywgY29va2llKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93WydTZXNzaW9uU3RhY2tLZXknXSA9ICdTZXNzaW9uU3RhY2snO1xuICAgICAgICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrJ10gPSB3aW5kb3dbJ1Nlc3Npb25TdGFjayddIHx8IHtcbiAgICAgICAgICAgIHQ6IHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkgPyB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdzZXNzaW9uU3RhY2tNb2JpbGUnKSA6IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3Nlc3Npb25TdGFja1dlYicpLFxuICAgICAgICAgICAgcTogW11cbiAgICAgICAgICB9O1xuICAgICAgICAgIFsnc3RhcnQnLCAnc3RvcCcsICdpZGVudGlmeScsICdnZXRTZXNzaW9uSWQnLCAnbG9nJywgJ3NldE9uRGF0YUNhbGxiYWNrJ10uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgd2luZG93WydTZXNzaW9uU3RhY2snXVtrZXldID1cbiAgICAgICAgICAgICAgd2luZG93WydTZXNzaW9uU3RhY2snXVtrZXldIHx8XG4gICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrJ10ucS5wdXNoKFtrZXldLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgIGYuYXN5bmMgPSAhMDtcbiAgICAgICAgICBmLnNyYyA9ICdodHRwczovL2Nkbi5zZXNzaW9uc3RhY2suY29tL3Nlc3Npb25zdGFjay5qcyc7XG4gICAgICAgICAgZi5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZi5vbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgbGV0IGcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICAgZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmLCBnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gc2VuZExvZ1JvY2tldEVycm9yKGVycikge1xuICAvLyAgIHRyeSB7XG4gIC8vICAgICBpZiAodGhpcy5pc0VuYWJsZWQoZmFsc2UpKSB7XG4gIC8vICAgICAgIExvZ1JvY2tldC5jYXB0dXJlRXhjZXB0aW9uKGVycik7XG4gIC8vICAgICB9XG4gIC8vICAgfSBjYXRjaCAoZXJyKSB7IH1cbiAgLy8gfVxuXG4gIC8vIGdldExvZ1JvY2tldFNlc3Npb25VcmwoKSB7XG4gIC8vICAgdHJ5IHtcbiAgLy8gICAgIHJldHVybiBMb2dSb2NrZXQuc2Vzc2lvblVSTDtcbiAgLy8gICB9IGNhdGNoIChlcnJvcikgeyB9XG4gIC8vICAgcmV0dXJuICcnO1xuICAvLyB9XG5cbiAgZ2V0U2Vzc2lvblN0YWNrU2Vzc2lvbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmICh3aW5kb3dbJ1Nlc3Npb25TdGFjayddKSB7XG4gICAgICAgIHdpbmRvd1snU2Vzc2lvblN0YWNrJ10uZ2V0U2Vzc2lvbklkKHNlc3Npb25JZCA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCdTZXNzaW9uU3RhY2sgc2Vzc2lvbmlkJywgc2Vzc2lvbklkKTtcbiAgICAgICAgICByZXNvbHZlKHNlc3Npb25JZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFNlc3Npb25TdGFja1VybCgpOiBhbnkge1xuICAgIHJldHVybiAnaHR0cHM6Ly9hcHAuc2Vzc2lvbnN0YWNrLmNvbS9wbGF5ZXIvIy9zZXNzaW9ucy8nO1xuICB9XG5cbiAgc2VuZFNlc3Npb25TdGFja0Vycm9yKGVycikge1xuICAgIC8vIHRyeSB7XG4gICAgLy8gICBpZiAodGhpcy5pc0VuYWJsZWQoZmFsc2UpICYmIHdpbmRvd1snU2Vzc2lvblN0YWNrJ10pIHtcbiAgICAvLyAgICAgd2luZG93WydTZXNzaW9uU3RhY2snXS5sb2coZXJyKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9IGNhdGNoIChlcnIpIHsgfVxuICB9XG5cbiAgbG9hZEFuYWx5dGljcygpIHtcbiAgICBpZiAoIXRoaXMuaXNFbmFibGVkKGZhbHNlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYW5hbHl0aWNzID0gKHdpbmRvdy5hbmFseXRpY3MgPSB3aW5kb3cuYW5hbHl0aWNzIHx8IFtdKTtcbiAgICBpZiAoIWFuYWx5dGljcy5pbml0aWFsaXplKSB7XG4gICAgICBpZiAoYW5hbHl0aWNzLmludm9rZWQpIHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ1NlZ21lbnQgc25pcHBldCBpbmNsdWRlZCB0d2ljZS4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuYWx5dGljcy5pbnZva2VkID0gITA7XG4gICAgICAgIGFuYWx5dGljcy5tZXRob2RzID0gWyd0cmFja1N1Ym1pdCcsICd0cmFja0NsaWNrJywgJ3RyYWNrTGluaycsICd0cmFja0Zvcm0nLCAncGFnZXZpZXcnLCAnaWRlbnRpZnknLCAncmVzZXQnLCAnZ3JvdXAnLCAndHJhY2snLCAncmVhZHknLCAnYWxpYXMnLCAnZGVidWcnLCAncGFnZScsICdvbmNlJywgJ29mZicsICdvbiddO1xuICAgICAgICBhbmFseXRpY3MuZmFjdG9yeSA9IGZ1bmN0aW9uKHR0KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgZS51bnNoaWZ0KHR0KTtcbiAgICAgICAgICAgIGFuYWx5dGljcy5wdXNoKGUpO1xuICAgICAgICAgICAgcmV0dXJuIGFuYWx5dGljcztcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IGFuYWx5dGljcy5tZXRob2RzLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgICAgbGV0IGUgPSBhbmFseXRpY3MubWV0aG9kc1t0XTtcbiAgICAgICAgICBhbmFseXRpY3NbZV0gPSBhbmFseXRpY3MuZmFjdG9yeShlKTtcbiAgICAgICAgfVxuICAgICAgICBhbmFseXRpY3MubG9hZCA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICBsZXQgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgIGUudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgIGUuYXN5bmMgPSAhMDtcbiAgICAgICAgICBlLnNyYyA9ICgnaHR0cHM6JyA9PT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPyAnaHR0cHM6Ly8nIDogJ2h0dHA6Ly8nKSArICdjZG4uc2VnbWVudC5jb20vYW5hbHl0aWNzLmpzL3YxLycgKyB0ICsgJy9hbmFseXRpY3MubWluLmpzJztcbiAgICAgICAgICBsZXQgbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICAgICAgICBuLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGUsIG4pO1xuICAgICAgICB9O1xuICAgICAgICBhbmFseXRpY3MuU05JUFBFVF9WRVJTSU9OID0gJzQuMC4wJztcbiAgICAgICAgYW5hbHl0aWNzLmxvYWQodGhpcy5jb25maWcuc2VydmVyTmFtZSA9PT0gJ1Byb2R1Y3Rpb24nID8gdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnc2VnbWVudEFwaVdyaXRlS2V5JykgOiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdzZWdtZW50QXBpV3JpdGVLZXlEZXYnKSk7XG4gICAgICAgIGFuYWx5dGljcy5wYWdlKCk7XG5cbiAgICAgICAgLy8gTG9nUm9ja2V0LmdldFNlc3Npb25VUkwodXJsID0+IHtcbiAgICAgICAgLy8gICBhbmFseXRpY3MudHJhY2soJ0xvZ1JvY2tldCcsIHsgc2Vzc2lvblVSTDogdXJsIH0pO1xuICAgICAgICAvLyAgIHRoaXMuaW50ZXJjb20udHJhY2tFdmVudCgnTG9nUm9ja2V0JywgeyBzZXNzaW9uVVJMOiB1cmwgfSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRyYWNrKGV2ZW50OiBzdHJpbmcsIHByb3BlcnRpZXM/OiBPYmplY3QpOiB2b2lkIHtcbiAgICBpZiAoIWV2ZW50IHx8IGV2ZW50ID09PSAnJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudCA9IGV2ZW50XG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLm1hcCh3b3JkID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgICAuam9pbignICcpO1xuICAgIGlmICh0aGlzLnNlc3Npb24uZGVidWdFdmVudCkge1xuICAgICAgdGhpcy5sb2cubG9nKCdFVkVOVCcsIGV2ZW50LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgd2luZG93LmFuYWx5dGljcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgd2luZG93LmFuYWx5dGljcy50cmFjayhldmVudCwgbWVyZ2UodGhpcy5nbG9iYWxUcmFja2VkUHJvcHModGhpcy5zZXNzaW9uLnVzZXIpLCBwcm9wZXJ0aWVzKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICB9XG4gIH1cblxuICBwYWdlKG5hbWU6IHN0cmluZywgY2F0ZWdvcnk/OiBzdHJpbmcsIHByb3BlcnRpZXM/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSAmJiB3aW5kb3cuYW5hbHl0aWNzKSB7XG4gICAgICB0cnkge1xuICAgICAgICB3aW5kb3cuYW5hbHl0aWNzLnBhZ2UoY2F0ZWdvcnksIG5hbWUsIG1lcmdlKHRoaXMuZ2xvYmFsVHJhY2tlZFByb3BzKHRoaXMuc2Vzc2lvbi51c2VyKSwgcHJvcGVydGllcykpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgfVxuICB9XG5cbiAgaWRlbnRpZnkodXNlcjogVXNlcikge1xuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgIC8vIHRyeSB7XG4gICAgICAgIC8vIGxldCB0cmFpdHMgPSB7XG4gICAgICAgIC8vICAgYXZhdGFyOiB1c2VyLmltYWdlRGF0YSB8fCAnJyxcbiAgICAgICAgLy8gICBlbWFpbDogdXNlci5lbWFpbCB8fCB1c2VyLnVzZXJuYW1lIHx8ICcnLFxuICAgICAgICAvLyAgIGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUgfHwgJycsXG4gICAgICAgIC8vICAgbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUgfHwgJycsXG4gICAgICAgIC8vICAgY3JlYXRlZEF0OiB1c2VyLl9lY3QgfHwgJycsXG4gICAgICAgIC8vICAgcGhvbmU6IHVzZXIudGVsZXBob25lIHx8ICcnLFxuICAgICAgICAvLyAgIGdlbmRlcjogdXNlci5nZW5kZXIgfHwgJycsXG4gICAgICAgIC8vICAgZGV2aWNlOiB1c2VyLmRldmljZSB8fCAnJyxcbiAgICAgICAgLy8gICB0YXJnZXQ6IHRoaXMuY29yZUNvbmZpZy5nZXRGdWxsQXBwTmFtZSgpLFxuICAgICAgICAvLyAgIGxhbmd1YWdlOiB1c2VyLmxhbmd1YWdlIHx8ICcnXG4gICAgICAgIC8vIH07XG4gICAgICAgIC8vICAgTG9nUm9ja2V0LmlkZW50aWZ5KHVzZXIuX2lkLCB0cmFpdHMpO1xuICAgICAgICAvLyB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgICAgIGlmICh3aW5kb3cuYW5hbHl0aWNzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzZWdtZW50X3RyYWl0cyA9IHtcbiAgICAgICAgICAgICAgdXNlcl9pZDogdXNlci5faWQgfHwgJycsXG4gICAgICAgICAgICAgIHVzZXJfdGFnczogdXNlci50YWdzIHx8ICcnLFxuICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCB8fCB1c2VyLnVzZXJuYW1lIHx8ICcnLFxuICAgICAgICAgICAgICBvcGVyYXRpbmdfc3lzdGVtOiB0aGlzLmNvcmVDb25maWcuZ2V0UGxhdGZvcm0oKSxcbiAgICAgICAgICAgICAgYXZhdGFyOiB1c2VyLmltYWdlRGF0YSB8fCAnJyxcbiAgICAgICAgICAgICAgcGhvbmU6IHVzZXIudGVsZXBob25lIHx8ICcnLFxuICAgICAgICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyIHx8ICcnLFxuICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuY29yZUNvbmZpZy5nZXRGdWxsQXBwTmFtZSgpLFxuICAgICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLmNvcmVDb25maWcuZ2V0QXBwVmVyc2lvbigpLFxuICAgICAgICAgICAgICBpc19kYXJrX3RoZW1lOiBDb2xvcnMuaXNEYXJrVGhlbWUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5hbmFseXRpY3MuaWRlbnRpZnkodXNlci5faWQsIG1lcmdlKHRoaXMuZ2xvYmFsVHJhY2tlZFByb3BzKHVzZXIpLCBzZWdtZW50X3RyYWl0cykpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubG9hZFNlc3Npb25TdGFjaygpLnRoZW4oc3VjY2VzcyA9PiB7XG4gICAgICAgIC8vICAgaWYgKHN1Y2Nlc3MgJiYgd2luZG93WydTZXNzaW9uU3RhY2snXSkge1xuICAgICAgICAvLyAgICAgLy8mJiAhKHRoaXMuY29yZUNvbmZpZy5pc0lPUygpICYmIHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSlcbiAgICAgICAgLy8gICAgIHRyeSB7XG4gICAgICAgIC8vICAgICAgIHRoaXMubG9nLmxvZygnU2Vzc2lvblN0YWNrOiBpZGVudGlmeScpO1xuICAgICAgICAvLyAgICAgICB3aW5kb3dbJ1Nlc3Npb25TdGFjayddLmlkZW50aWZ5KHtcbiAgICAgICAgLy8gICAgICAgICB1c2VySWQ6IHVzZXIuX2lkIHx8ICcnLFxuICAgICAgICAvLyAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsIHx8IHVzZXIudXNlcm5hbWUgfHwgJycsXG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheU5hbWU6IFVzZXIuZ2V0RGlzcGxheU5hbWUodXNlciksXG4gICAgICAgIC8vICAgICAgICAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSB1c2VyIHZhcmlhYmxlcyBoZXJlLlxuICAgICAgICAvLyAgICAgICAgIHVzZXJfdGFnczogdXNlci50YWdzIHx8ICcnLFxuICAgICAgICAvLyAgICAgICAgIG9wZXJhdGluZ19zeXN0ZW06IHRoaXMuY29yZUNvbmZpZy5nZXRQbGF0Zm9ybSgpLFxuICAgICAgICAvLyAgICAgICAgIGF2YXRhcjogdXNlci5pbWFnZURhdGEgfHwgJycsXG4gICAgICAgIC8vICAgICAgICAgcGhvbmU6IHVzZXIudGVsZXBob25lIHx8ICcnLFxuICAgICAgICAvLyAgICAgICAgIGdlbmRlcjogdXNlci5nZW5kZXIgfHwgJycsXG4gICAgICAgIC8vICAgICAgICAgdGFyZ2V0OiB0aGlzLmNvcmVDb25maWcuZ2V0RnVsbEFwcE5hbWUoKSxcbiAgICAgICAgLy8gICAgICAgICB2ZXJzaW9uOiB0aGlzLmNvcmVDb25maWcuZ2V0QXBwVmVyc2lvbigpO1xuICAgICAgICAvLyAgICAgICAgIGlzX2RhcmtfdGhlbWU6IENvbG9ycy5pc0RhcmtUaGVtZSgpXG4gICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmdldFNlc3Npb25TdGFja1Nlc3Npb24oKS50aGVuKHNlc3Npb25JZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICBsZXQgc2Vzc2lvbnN0YWNrVVJMID0gdGhpcy5nZXRTZXNzaW9uU3RhY2tVcmwoKSArIChzZXNzaW9uSWQgfHwgJ25vdGZvdW5kJyk7XG4gICAgICAgIC8vICAgICAgICAgICB0aGlzLmxvZy5sb2coJ1Nlc3Npb25TdGFjazogbGluayB0byBpbnRlcmNvbScsIHNlc3Npb25zdGFja1VSTCk7XG4gICAgICAgIC8vICAgICAgICAgICB0aGlzLmludGVyY29tLnVwZGF0ZSh7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNlc3Npb25zdGFja1VSTDogc2Vzc2lvbnN0YWNrVVJMXG4gICAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgfSwgMjAwMCk7XG4gICAgICAgIC8vICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW50ZXJjb20uaWRlbnRpZnkodXNlcik7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3dbJ0ZTJ10gJiYgd2luZG93WydGUyddLmdldEN1cnJlbnRTZXNzaW9uVVJMKSB7XG4gICAgICAgICAgbGV0IGZ1bGxzdG9yeVVSTCA9IHdpbmRvd1snRlMnXS5nZXRDdXJyZW50U2Vzc2lvblVSTCgpO1xuICAgICAgICAgIHRoaXMuaW50ZXJjb20udXBkYXRlKHtcbiAgICAgICAgICAgIGZ1bGxzdG9yeVVSTDogZnVsbHN0b3J5VVJMXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDIwMDApO1xuICAgIH0sIDMwMDApO1xuICB9XG5cbiAgaW50ZXJjb21SZWdpc3RlckZvclB1c2goKSB7XG4gICAgdGhpcy5pbnRlcmNvbS5yZWdpc3RlckZvclB1c2goKTtcbiAgfVxuXG4gIGdsb2JhbFRyYWNrZWRQcm9wcyh1c2VyOiBVc2VyKSB7XG4gICAgbGV0IHByb3BzID0ge1xuICAgICAgdXNlcl9ncm91cHM6IHRoaXMuYXV0aGVudGljYXRpb24uaXNBZG1pbigpID8gW10gOiB0aGlzLnNlc3Npb24uZ3JvdXBzLFxuICAgICAgdXNlcl91c2VybmFtZTogdXNlci51c2VybmFtZSB8fCAnJyxcbiAgICAgIHVzZXJfZmlyc3RuYW1lOiB1c2VyLmZpcnN0TmFtZSB8fCAnJyxcbiAgICAgIHVzZXJfbGFzdG5hbWU6IHVzZXIubGFzdE5hbWUgfHwgJycsXG4gICAgICB1c2VyX2xhbmd1YWdlOiB1c2VyLmxhbmd1YWdlIHx8ICcnLFxuICAgICAgdXNlcl9jb21wYW55X25hbWU6IHVzZXIuY29tcGFueSB8fCAnJyxcbiAgICAgIHVzZXJfdGVuYW50OiB1c2VyLl90ZW5hbnQgPyB1c2VyLl90ZW5hbnQubmFtZSA6IG51bGwsXG4gICAgICB1c2VyX3JvbGU6IHVzZXIucm9sZSB8fCAnJyxcbiAgICAgIHVzZXJfcm9sZXM6IHRoaXMuc2Vzc2lvbi5yb2xlcyB8fCBbXSxcbiAgICAgIHVzZXJfZW52aXJvbm1lbnQ6IHRoaXMuY29uZmlnLnNlcnZlck5hbWUudG9VcHBlckNhc2UoKVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGxldCByb3V0ZXI6IFJvdXRlcjtcbiAgICAgIHJvdXRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlcik7XG4gICAgICBwcm9wcyA9IG1lcmdlKHByb3BzLCB7IHBhZ2U6IHJvdXRlci51cmwgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgIHJldHVybiBwcm9wcztcbiAgfVxufVxuIl19