/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { Session } from '../session/session.service';
import { Push } from '../push/push.service';
import { Config } from '../config/config.service';
import { Subject, throwError, of } from 'rxjs';
import { map, catchError, mergeMap, flatMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Network, LocalStorage, LocalForageService, CoreConfig } from '@shared/common';
import { isPresent } from '@shared/stencil';
import { assign, some, map as _map, every, pick } from 'lodash-es';
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
        var keys = ['stats.kpiFilterFormData', 'stats.selectedDescription', 'stats.selectedDashboard', 'stats.customSelectedDashboard'];
        keys.forEach((/**
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
        return some(_map(roles, (/**
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
        return some(_map(groups, (/**
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
        { type: Push },
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
export { Authentication };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Authentication.roleAdmin;
    /**
     * @type {?}
     * @protected
     */
    Authentication.roleTeam;
    /**
     * @type {?}
     * @protected
     */
    Authentication.roleTrial;
    /**
     * @type {?}
     * @protected
     */
    Authentication.roleDashboard;
    /**
     * @type {?}
     * @protected
     */
    Authentication.roleManager;
    /**
     * @type {?}
     * @protected
     */
    Authentication.roleMissionViewer;
    /** @type {?} */
    Authentication.prototype.login$;
    /** @type {?} */
    Authentication.prototype.logout$;
    /** @type {?} */
    Authentication.prototype.profileUpdated$;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.push;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.network;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.localStorage;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.localForage;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    Authentication.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2xELE9BQU8sRUFBYyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFNBQVMsRUFBNEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkU7SUFhRSx3QkFBc0IsRUFBYSxFQUFZLElBQVUsRUFBWSxNQUFjLEVBQVksTUFBYyxFQUFZLE9BQWdCLEVBQVksWUFB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O0lBRXJELGdDQUFzQzs7SUFDdEMsaUNBQXVDOztJQUN2Qyx5Q0FBMEM7Ozs7O0lBRTlCLDRCQUF1Qjs7Ozs7SUFBRSw4QkFBb0I7Ozs7O0lBQUUsZ0NBQXdCOzs7OztJQUFFLGdDQUF3Qjs7Ozs7SUFBRSxpQ0FBMEI7Ozs7O0lBQUUsc0NBQW9DOzs7OztJQUFFLHFDQUF5Qzs7Ozs7SUFBRSxpQ0FBMEI7Ozs7O0lBQUUsb0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm9rZXIgfSBmcm9tICcuLi9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBQdXNoIH0gZnJvbSAnLi4vcHVzaC9wdXNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aHJvd0Vycm9yLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yLCBtZXJnZU1hcCwgZmxhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEp3dEhlbHBlclNlcnZpY2UgfSBmcm9tICdAYXV0aDAvYW5ndWxhci1qd3QnO1xuaW1wb3J0IHsgTmV0d29yaywgTG9jYWxTdG9yYWdlLCBMb2NhbEZvcmFnZVNlcnZpY2UsIENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBpc1ByZXNlbnQsIElUZW5hbnQsIElQdWJsaWNBcGlUb2tlbiB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBhc3NpZ24sIHNvbWUsIG1hcCBhcyBfbWFwLCBldmVyeSwgcGljayB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgcm9sZUFkbWluID0gJ2FkbWluJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlVGVhbSA9ICd0ZWFtJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlVHJpYWwgPSAndHJpYWwnO1xuICBwcm90ZWN0ZWQgc3RhdGljIHJvbGVEYXNoYm9hcmQgPSAnZGFzaGJvYXJkJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlTWFuYWdlciA9ICdtYW5hZ2VyJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlTWlzc2lvblZpZXdlciA9ICdtaXNzaW9udmlld2VyJztcblxuICBwdWJsaWMgbG9naW4kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwdWJsaWMgbG9nb3V0JCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHVibGljIHByb2ZpbGVVcGRhdGVkJDogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IsIHByb3RlY3RlZCBwdXNoOiBQdXNoLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcsIHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIG5ldHdvcms6IE5ldHdvcmssIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZSwgcHJvdGVjdGVkIGxvY2FsRm9yYWdlOiBMb2NhbEZvcmFnZVNlcnZpY2UsIHByb3RlY3RlZCBzZXNzaW9uOiBTZXNzaW9uLCBwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge1xuICAgIHRoaXMucHJvZmlsZVVwZGF0ZWQkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIH1cblxuICBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCByb2xlcz86IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRTZXJ2ZXJVcmwoKSArICdhdXRoL2xvZ2luJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyB1c2VybmFtZSwgcGFzc3dvcmQsIHJvbGVzIH0pLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgdGhpcy5hZnRlckxvZ2luKHJlcyk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IocmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnRva2VuID0gbnVsbDtcbiAgICAgICAgbGV0IGVycjtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuanNvbikge1xuICAgICAgICAgIGVyciA9IHJlcy5qc29uKCkuZXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzICYmIHJlcy5lcnJvciAmJiByZXMuZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBlcnIgPSByZXMuZXJyb3IuZXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzLm5hbWUpIHtcbiAgICAgICAgICBlcnIgPSB7IG1lc3NhZ2U6IHJlcy5uYW1lLnRvVXBwZXJDYXNlKCkgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcnIgPSB7IG1lc3NhZ2U6ICdSRVFVRVNURVJST1InIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGxvZ2luU29jaWFsKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIHByb3ZpZGVyID0gJ2ZhY2Vib29rJykge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRTZXJ2ZXJVcmwoKSArICdhdXRoLycgKyBwcm92aWRlcjtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBhY2Nlc3NUb2tlbiB9KS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuYWZ0ZXJMb2dpbihyZXMpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi50b2tlbiA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHJlcy5qc29uKCkuZXJyb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0TG9naW5BZHZhbmNlZFVybCh0ZW5hbnQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGhvc3Q6IHN0cmluZykge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRTZXJ2ZXJVcmwoKSArICdhdXRoLycgKyB0ZW5hbnQudG9Mb3dlckNhc2UoKSArICcvJyArIG1ldGhvZCArICcvbG9naW4/aG9zdD0nICsgaG9zdCArICcmdG9rZW5Mb2NhdGlvbj0nICsgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSA/ICdxdWVyeScgOiAnZnJhZ21lbnQnKTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgZ2V0VGVuYW50QWR2YW5jZWRMb2dpbk1ldGhvZHModGVuYW50OiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0U2VydmVyVXJsKCkgKyAnYXV0aC8nICsgdGVuYW50LnRvTG93ZXJDYXNlKCkgKyAnL3Byb3ZpZGVycyc7XG4gICAgcmV0dXJuIHRoaXMucnEuZ2V0KHVybCk7XG4gIH1cblxuICBnZXRUZW5hbnRGcm9tVG9rZW4odG9rZW4pOiB7IF90ZW5hbnRSZWY/OiBzdHJpbmc7IF90ZW5hbnROYW1lPzogc3RyaW5nOyBzdWI/OiBzdHJpbmcgfSB7XG4gICAgbGV0IGp3dEhlbHBlcjogSnd0SGVscGVyU2VydmljZSA9IG5ldyBKd3RIZWxwZXJTZXJ2aWNlKHt9KTtcbiAgICByZXR1cm4gand0SGVscGVyLmRlY29kZVRva2VuKHRva2VuKSB8fCB7fTtcbiAgfVxuXG4gIGFmdGVyTG9naW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uLnRva2VuID0gcmVzLiRtY2ZseSR0b2tlbjtcbiAgICB0aGlzLnNlc3Npb24udXNlcklkID0gcmVzLnVzZXJJZDtcbiAgICB0aGlzLnNlc3Npb24udXNlciA9IHJlcy51c2VyO1xuICAgIHRoaXMuc2Vzc2lvbi50ZW5hbnQgPSByZXMudGVuYW50O1xuICAgIHRoaXMubG9naW4kLm5leHQoJycpO1xuICAgIHRoaXMuY2xlYW5VcExvY2FsU3RvcmFnZSgpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBjbGVhblVwTG9jYWxTdG9yYWdlKCkge1xuICAgIGxldCBrZXlzID0gWydzdGF0cy5rcGlGaWx0ZXJGb3JtRGF0YScsICdzdGF0cy5zZWxlY3RlZERlc2NyaXB0aW9uJywgJ3N0YXRzLnNlbGVjdGVkRGFzaGJvYXJkJywgJ3N0YXRzLmN1c3RvbVNlbGVjdGVkRGFzaGJvYXJkJ107XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZS5yZW1vdmUoa2V5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTZXNzaW9uKCk6IE9ic2VydmFibGU8U2Vzc2lvbj4ge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucnEuZ2V0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ2J1c2luZXNzbG9naWMvZ2V0Q3VycmVudFNlc3Npb24nKS5waXBlKFxuICAgICAgbWFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBhc3NpZ24odGhpcy5zZXNzaW9uLCByZXMuZGF0YSk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5oYXNTY2FuZGl0ID0gdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpID8gdGhpcy5oYXNSb2xlcyhbJ3NjYW5kaXQnXSkgOiB0aGlzLmhhc1JvbGVzKFsnc2NhbmRpdCcsICdhZG1pbiddKTtcbiAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5zZXNzaW9uO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZG9Mb2dvdXQoKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3VzZXIvbG9nb3V0JztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwge30pO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5pc1Rlc3RwZW4pIHtcbiAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubG9jYWxGb3JhZ2UpIHtcbiAgICAgICAgdGhpcy5sb2NhbEZvcmFnZS5jbGVhcigpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zZXNzaW9uICYmIHRoaXMuc2Vzc2lvbi51c2VyICYmIHRoaXMuc2Vzc2lvbi51c2VyLl9pZCkge1xuICAgICAgdGhpcy5wdXNoLnVucmVnaXN0ZXJPbmVTaWduYWwodGhpcy5zZXNzaW9uLnVzZXIpO1xuICAgICAgcHJvbWlzZSA9IHRoaXMudXBkYXRlUHJvZmlsZSh0aGlzLnNlc3Npb24udXNlcikudG9Qcm9taXNlKCk7XG4gICAgfVxuICAgIHRoaXMubG9nb3V0JC5uZXh0KCcnKTtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+IHRoaXMuYWZ0ZXJMb2dvdXQoKSwgKCkgPT4gdGhpcy5hZnRlckxvZ291dCgpKTtcbiAgfVxuXG4gIGFmdGVyTG9nb3V0KCkge1xuICAgIHRoaXMuZG9Mb2dvdXQoKS5zdWJzY3JpYmUoKCkgPT4ge30sICgpID0+IHt9KTtcbiAgICB0aGlzLm5ldHdvcmsuZm9yY2VPZmZsaW5lKGZhbHNlLCBmYWxzZSk7XG4gICAgdGhpcy5zZXNzaW9uLmNsZWFyKCkuY2F0Y2goKCkgPT4ge30pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHNpZ251cChlbWFpbDogc3RyaW5nLCBpbWFnZURhdGE6IGFueSwgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIGxldCB1c2VyID0gPGFueT57IHVzZXJuYW1lOiBlbWFpbCwgZW1haWwsIHBhc3N3b3JkLCBpbWFnZURhdGEgfTtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAndXNlci9zaWdudXAnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVzZXIgfSkucGlwZShcbiAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGludml0ZVVzZXJzKHVzZXJzOiBBcnJheTx7IGVtYWlsOiBzdHJpbmc7IHJvbGVzOiBBcnJheTxzdHJpbmc+OyBsb2NhdGlvblJlZj86IHN0cmluZyB9PiwgZ3JvdXBzOiBBcnJheTxzdHJpbmc+LCBwYXNzd29yZDogc3RyaW5nID0gbnVsbCwgc2VuZFBhc3N3b3JkOiBib29sZWFuID0gdHJ1ZSwgYXBwTmFtZT86IHN0cmluZywgYXBwbGVTdG9yZVVybD86IHN0cmluZywgcGxheVN0b3JlVXJsPzogc3RyaW5nLCBfdGVuYW50UmVmPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAndXNlci9pbnZpdGUnO1xuICAgIGxldCBmaW5hbFBsYXlTdG9yZVVybCA9IHBsYXlTdG9yZVVybCArIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBJZCgpO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7XG4gICAgICB1c2VycyxcbiAgICAgIGdyb3VwcyxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgc2VuZFBhc3N3b3JkLFxuICAgICAgYXBwTmFtZSxcbiAgICAgIGFwcGxlU3RvcmVVcmwsXG4gICAgICBwbGF5U3RvcmVVcmw6IGZpbmFsUGxheVN0b3JlVXJsLFxuICAgICAgX3RlbmFudFJlZlxuICAgIH0pO1xuICB9XG5cbiAgaXNMb2dnZWRJbigpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLnRva2VuICYmIHRoaXMuc2Vzc2lvbi50b2tlbi5sZW5ndGggPiAwICYmICF0aGlzLmlzVG9rZW5FeHBpcmVkKHRoaXMuc2Vzc2lvbi50b2tlbik7XG4gIH1cblxuICBoYXNSb2xlKHJvbGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24ucm9sZXMgJiYgdGhpcy5zZXNzaW9uLnJvbGVzLmluZGV4T2Yocm9sZSkgPj0gMDtcbiAgfVxuXG4gIGhhc1JvbGVzKHJvbGVzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIHNvbWUoX21hcChyb2xlcywgcm9sZSA9PiB0aGlzLmhhc1JvbGUocm9sZSkpLCB0ID0+IHQgPT09IHRydWUpO1xuICB9XG5cbiAgaGFzQWxsUm9sZXMocm9sZXM6IEFycmF5PHN0cmluZz4pIHtcbiAgICByZXR1cm4gZXZlcnkocm9sZXMsIHJvbGUgPT4gdGhpcy5oYXNSb2xlKHJvbGUpKTtcbiAgfVxuXG4gIGhhc0dyb3VwKGdyb3VwOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdyb3VwcyAmJiB0aGlzLnNlc3Npb24uZ3JvdXBzLmluZGV4T2YoZ3JvdXApID49IDA7XG4gIH1cblxuICBoYXNHcm91cHMoZ3JvdXBzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIHNvbWUoX21hcChncm91cHMsIGdyb3VwID0+IHRoaXMuaGFzR3JvdXAoZ3JvdXApKSwgdCA9PiB0ID09PSB0cnVlKTtcbiAgfVxuXG4gIGhhc0FsbEdyb3Vwcyhncm91cHM6IEFycmF5PHN0cmluZz4pIHtcbiAgICByZXR1cm4gZXZlcnkoZ3JvdXBzLCBncm91cCA9PiB0aGlzLmhhc0dyb3VwKGdyb3VwKSk7XG4gIH1cblxuICBpc0FkbWluKGNoZWNrU21hcnRpbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgbGV0IHJldFZhbCA9IHRoaXMuaGFzUm9sZShBdXRoZW50aWNhdGlvbi5yb2xlQWRtaW4pO1xuICAgIGlmIChjaGVja1NtYXJ0aW4gJiYgdGhpcy5zZXNzaW9uLnVzZXIudXNlcm5hbWUgIT09ICdzbWFydGluQHlvb2JpYy5jb20nKSB7XG4gICAgICByZXRWYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGlzVHJpYWwoKSB7XG4gICAgcmV0dXJuICF0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZUFkbWluKSAmJiB0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZVRyaWFsKTtcbiAgfVxuXG4gIGlzRGFzaGJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZURhc2hib2FyZCkgJiYgIXRoaXMuaXNBZG1pbigpICYmICF0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZU1pc3Npb25WaWV3ZXIpICYmICF0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZU1hbmFnZXIpO1xuICB9XG5cbiAgaXNUZWFtKCkge1xuICAgIHJldHVybiB0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZVRlYW0pO1xuICB9XG5cbiAgaXNDcm93ZCgpIHtcbiAgICByZXR1cm4gIXRoaXMuaGFzUm9sZShBdXRoZW50aWNhdGlvbi5yb2xlVGVhbSk7XG4gIH1cblxuICBpc1N0b3JlKCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlciAmJiBpc1ByZXNlbnQodGhpcy5zZXNzaW9uLnVzZXIubG9jYXRpb25SZWYpO1xuICB9XG5cbiAgaXNTdG9yZU1hbmFnZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzUm9sZSgnc3RvcmUnKSAmJiB0aGlzLnNlc3Npb24udXNlciAmJiB0aGlzLnNlc3Npb24udXNlci5sb2NhdGlvblJlZjtcbiAgfVxuXG4gIGlzUm9sZUFkbWluKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRVc2VyKCkgJiYgdGhpcy5nZXRDdXJyZW50VXNlcigpLnJvbGUgPT09ICdST0xFQURNSU4nO1xuICB9XG5cbiAgaXNSb2xlRWRpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRVc2VyKCkgJiYgdGhpcy5nZXRDdXJyZW50VXNlcigpLnJvbGUgPT09ICdST0xFRURJVE9SJztcbiAgfVxuXG4gIGlzUm9sZVZpZXdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRVZJRVdFUic7XG4gIH1cblxuICBpc1JvbGVNYW5hZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRVc2VyKCkgJiYgdGhpcy5nZXRDdXJyZW50VXNlcigpLnJvbGUgPT09ICdST0xFTUFOQUdFUic7XG4gIH1cblxuICBpc1JvbGVGaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRUZJRUxEJztcbiAgfVxuXG4gIGlzUm9sZVN0b3JlTWFuYWdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRVNUT1JFTUFOQUdFUic7XG4gIH1cblxuICBpc1JvbGVTdG9yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRVNUT1JFJztcbiAgfVxuXG4gIGhhc0FjY2Vzc1RvT3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNSb2xlKCd0ZWFtJyk7XG4gIH1cblxuICBoYXNBY2Nlc3NUb0Jvb3N0KCkge1xuICAgIHJldHVybiB0aGlzLmhhc1JvbGUoJ2FjYWRlbXknKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRVc2VyKCk6IFVzZXIge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlcjtcbiAgfVxuXG4gIHBhc3N3b3JkQ2hhbmdlKG9sZFBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3VzZXIvY2hhbmdlUGFzc3dvcmQnLCB7XG4gICAgICBvbGRQYXNzd29yZCxcbiAgICAgIG5ld1Bhc3N3b3JkXG4gICAgfSk7XG4gIH1cblxuICBwYXNzd29yZFJlc2V0KGVtYWlsLCBpc01hZ2ljTGluazogYm9vbGVhbiA9IGZhbHNlLCB1cmxQcmVmaXg6IHN0cmluZyA9ICdodHRwczovL3lvb2JpYy5hcHAubGluay8nKSB7XG4gICAgaWYgKGlzTWFnaWNMaW5rKSB7XG4gICAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3VzZXIvZ2V0TWFnaWNMaW5rJywge1xuICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgIHVybFByZWZpeFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAndXNlci9yZXNldCcsIHsgZW1haWw6IGVtYWlsIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBhc3N3b3JkUmVzZXRDb25maXJtKHRva2VuOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGhvc3Q/OiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gaG9zdCA/ICdodHRwczovLycgKyBob3N0ICsgJy9hcGkvJyA6IHRoaXMuYnJva2VyLmdldEFwaVVybCgpO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsICsgJ0VuZHBvaW50cy9yZXNldFBhc3N3b3JkJywgeyBwYXNzd29yZDogcGFzc3dvcmQgfSwgdG9rZW4sIG51bGwsIHRydWUpO1xuICB9XG5cbiAgcGFzc3dvcmRSZXNldEFkbWluKHVzZXI6IGFueSwgcGFzc3dvcmQ6IHN0cmluZywgZG9udFNlbmRNYWlsID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ0FkbWluRGFzaGJvYXJkL3Jlc2V0UGFzc3dvcmQnLCB7XG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHVzZXJQYXNzd29yZExpc3Q6IFt1c2VyXS5tYXAoKHU6IGFueSkgPT4gKHtcbiAgICAgICAgICB1c2VybmFtZTogdS51c2VybmFtZSxcbiAgICAgICAgICBfaWQ6IHUuX2lkLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KSksXG4gICAgICAgIGRvbnRTZW5kTWFpbDogZG9udFNlbmRNYWlsXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbXBlcnNvbmF0ZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdBZG1pbkRhc2hib2FyZC9pbXBlcnNvbmF0ZScsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gIH1cblxuICBmb3JjZUxvZ291dCh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdBZG1pbkRhc2hib2FyZC9mb3JjZUxvZ291dCcsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZVBhc3N3b3JkKCkge1xuICAgIGxldCBsZW5ndGggPSA4O1xuICAgIGxldCBjaGFyc2V0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5JztcbiAgICBsZXQgcmV0VmFsID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjaGFyc2V0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICByZXRWYWwgKz0gY2hhcnNldC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbikpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgdXBkYXRlUHJvZmlsZSh1c2VyPzogYW55LCBza2lwQWNsID0gZmFsc2UsIGZpZWxkczogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgbGV0IHVzZXJUb1VwZGF0ZTogYW55ID0gdXNlciB8fCB0aGlzLmdldEN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKHVzZXJUb1VwZGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLmlzQWRtaW4oKSAmJiAhc2tpcEFjbCkge1xuICAgICAgICB0aGlzLmJyb2tlci5zZXRBY2wodXNlclRvVXBkYXRlLCB0aGlzLnNlc3Npb24uZ3JvdXBzKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZHMgJiYgZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdXNlclRvVXBkYXRlID0gPGFueT5waWNrKHVzZXJUb1VwZGF0ZSwgZmllbGRzKTtcbiAgICAgICAgaWYgKGZpZWxkcy5pbmRleE9mKCdfYWNsJykgPCAwKSB7XG4gICAgICAgICAgc2tpcEFjbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci51cHNlcnQoJ3VzZXInLCB1c2VyVG9VcGRhdGUsIG51bGwsIHNraXBBY2wpLnBpcGUoXG4gICAgICAgIGZsYXRNYXAocmV0VmFsID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QnlJZCgndXNlcicsIHJldFZhbC5faWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAodXBkYXRlZFVzZXIgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlc3Npb24udXNlciA9IHVwZGF0ZWRVc2VyO1xuICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFVzZXI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZykge1xuICAgIGxldCBqd3RIZWxwZXI6IEp3dEhlbHBlclNlcnZpY2UgPSBuZXcgSnd0SGVscGVyU2VydmljZSh7fSk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBqd3RIZWxwZXIuaXNUb2tlbkV4cGlyZWQodG9rZW4pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9rZW4odG9rZW46IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlc3Npb24udG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLnNlc3Npb24udXNlcklkID0gdXNlcklkO1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRCeUlkKCd1c2VyJywgdXNlcklkKS5waXBlKFxuICAgICAgbWFwKChyZXRWYWw6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnNlc3Npb24udXNlciA9IHJldFZhbDtcbiAgICAgICAgdGhpcy5wcm9maWxlVXBkYXRlZCQuZW1pdChyZXRWYWwpO1xuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUHVibGljQXBpVG9rZW4odGVuYW50OiBJVGVuYW50KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ0FkbWluRGFzaGJvYXJkL2dlbmVyYXRlU2VydmljZUFjY291bnQnO1xuXG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHtcbiAgICAgIHRlbmFudElkOiB0ZW5hbnQuX2lkXG4gICAgfSk7XG4gIH1cblxuICBpbnZhbGlkYXRlUHVibGljQXBpVG9rZW4odG9rZW46IElQdWJsaWNBcGlUb2tlbikge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdwdWJsaWNBUElUb2tlbnMvJyArIHRva2VuLl9pZCArICcvaW52YWxpZGF0ZSc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHt9KTtcbiAgfVxufVxuIl19