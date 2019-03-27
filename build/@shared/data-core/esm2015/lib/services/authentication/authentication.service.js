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
export class Authentication {
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
        let keys = ['stats.kpiFilterFormData', 'stats.selectedDescription', 'stats.selectedDashboard', 'stats.customSelectedDashboard'];
        keys.forEach((/**
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
        return some(_map(roles, (/**
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
        return some(_map(groups, (/**
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
    { type: Push },
    { type: Config },
    { type: Broker },
    { type: Network },
    { type: LocalStorage },
    { type: LocalForageService },
    { type: Session },
    { type: CoreConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2xELE9BQU8sRUFBYyxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFNBQVMsRUFBNEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHbkUsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7Ozs7OztJQVl6QixZQUFzQixFQUFhLEVBQVksSUFBVSxFQUFZLE1BQWMsRUFB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Qyx5QkFBcUM7Ozs7O0lBQ3JDLDZCQUE2Qzs7Ozs7SUFDN0MsMkJBQXlDOzs7OztJQUN6QyxpQ0FBcUQ7O0lBRXJELGdDQUFzQzs7SUFDdEMsaUNBQXVDOztJQUN2Qyx5Q0FBMEM7Ozs7O0lBRTlCLDRCQUF1Qjs7Ozs7SUFBRSw4QkFBb0I7Ozs7O0lBQUUsZ0NBQXdCOzs7OztJQUFFLGdDQUF3Qjs7Ozs7SUFBRSxpQ0FBMEI7Ozs7O0lBQUUsc0NBQW9DOzs7OztJQUFFLHFDQUF5Qzs7Ozs7SUFBRSxpQ0FBMEI7Ozs7O0lBQUUsb0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm9rZXIgfSBmcm9tICcuLi9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBQdXNoIH0gZnJvbSAnLi4vcHVzaC9wdXNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aHJvd0Vycm9yLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yLCBtZXJnZU1hcCwgZmxhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEp3dEhlbHBlclNlcnZpY2UgfSBmcm9tICdAYXV0aDAvYW5ndWxhci1qd3QnO1xuaW1wb3J0IHsgTmV0d29yaywgTG9jYWxTdG9yYWdlLCBMb2NhbEZvcmFnZVNlcnZpY2UsIENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBpc1ByZXNlbnQsIElUZW5hbnQsIElQdWJsaWNBcGlUb2tlbiB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBhc3NpZ24sIHNvbWUsIG1hcCBhcyBfbWFwLCBldmVyeSwgcGljayB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgcm9sZUFkbWluID0gJ2FkbWluJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlVGVhbSA9ICd0ZWFtJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlVHJpYWwgPSAndHJpYWwnO1xuICBwcm90ZWN0ZWQgc3RhdGljIHJvbGVEYXNoYm9hcmQgPSAnZGFzaGJvYXJkJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlTWFuYWdlciA9ICdtYW5hZ2VyJztcbiAgcHJvdGVjdGVkIHN0YXRpYyByb2xlTWlzc2lvblZpZXdlciA9ICdtaXNzaW9udmlld2VyJztcblxuICBwdWJsaWMgbG9naW4kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwdWJsaWMgbG9nb3V0JCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHVibGljIHByb2ZpbGVVcGRhdGVkJDogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IsIHByb3RlY3RlZCBwdXNoOiBQdXNoLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcsIHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIG5ldHdvcms6IE5ldHdvcmssIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZSwgcHJvdGVjdGVkIGxvY2FsRm9yYWdlOiBMb2NhbEZvcmFnZVNlcnZpY2UsIHByb3RlY3RlZCBzZXNzaW9uOiBTZXNzaW9uLCBwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge1xuICAgIHRoaXMucHJvZmlsZVVwZGF0ZWQkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIH1cblxuICBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCByb2xlcz86IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRTZXJ2ZXJVcmwoKSArICdhdXRoL2xvZ2luJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyB1c2VybmFtZSwgcGFzc3dvcmQsIHJvbGVzIH0pLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgdGhpcy5hZnRlckxvZ2luKHJlcyk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IocmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnRva2VuID0gbnVsbDtcbiAgICAgICAgbGV0IGVycjtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuanNvbikge1xuICAgICAgICAgIGVyciA9IHJlcy5qc29uKCkuZXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzICYmIHJlcy5lcnJvciAmJiByZXMuZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBlcnIgPSByZXMuZXJyb3IuZXJyb3I7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzLm5hbWUpIHtcbiAgICAgICAgICBlcnIgPSB7IG1lc3NhZ2U6IHJlcy5uYW1lLnRvVXBwZXJDYXNlKCkgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcnIgPSB7IG1lc3NhZ2U6ICdSRVFVRVNURVJST1InIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGxvZ2luU29jaWFsKGFjY2Vzc1Rva2VuOiBzdHJpbmcsIHByb3ZpZGVyID0gJ2ZhY2Vib29rJykge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRTZXJ2ZXJVcmwoKSArICdhdXRoLycgKyBwcm92aWRlcjtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBhY2Nlc3NUb2tlbiB9KS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuYWZ0ZXJMb2dpbihyZXMpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi50b2tlbiA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHJlcy5qc29uKCkuZXJyb3IpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0TG9naW5BZHZhbmNlZFVybCh0ZW5hbnQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGhvc3Q6IHN0cmluZykge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRTZXJ2ZXJVcmwoKSArICdhdXRoLycgKyB0ZW5hbnQudG9Mb3dlckNhc2UoKSArICcvJyArIG1ldGhvZCArICcvbG9naW4/aG9zdD0nICsgaG9zdCArICcmdG9rZW5Mb2NhdGlvbj0nICsgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSA/ICdxdWVyeScgOiAnZnJhZ21lbnQnKTtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgZ2V0VGVuYW50QWR2YW5jZWRMb2dpbk1ldGhvZHModGVuYW50OiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0U2VydmVyVXJsKCkgKyAnYXV0aC8nICsgdGVuYW50LnRvTG93ZXJDYXNlKCkgKyAnL3Byb3ZpZGVycyc7XG4gICAgcmV0dXJuIHRoaXMucnEuZ2V0KHVybCk7XG4gIH1cblxuICBnZXRUZW5hbnRGcm9tVG9rZW4odG9rZW4pOiB7IF90ZW5hbnRSZWY/OiBzdHJpbmc7IF90ZW5hbnROYW1lPzogc3RyaW5nOyBzdWI/OiBzdHJpbmcgfSB7XG4gICAgbGV0IGp3dEhlbHBlcjogSnd0SGVscGVyU2VydmljZSA9IG5ldyBKd3RIZWxwZXJTZXJ2aWNlKHt9KTtcbiAgICByZXR1cm4gand0SGVscGVyLmRlY29kZVRva2VuKHRva2VuKSB8fCB7fTtcbiAgfVxuXG4gIGFmdGVyTG9naW4ocmVzKSB7XG4gICAgdGhpcy5zZXNzaW9uLnRva2VuID0gcmVzLiRtY2ZseSR0b2tlbjtcbiAgICB0aGlzLnNlc3Npb24udXNlcklkID0gcmVzLnVzZXJJZDtcbiAgICB0aGlzLnNlc3Npb24udXNlciA9IHJlcy51c2VyO1xuICAgIHRoaXMuc2Vzc2lvbi50ZW5hbnQgPSByZXMudGVuYW50O1xuICAgIHRoaXMubG9naW4kLm5leHQoJycpO1xuICAgIHRoaXMuY2xlYW5VcExvY2FsU3RvcmFnZSgpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBjbGVhblVwTG9jYWxTdG9yYWdlKCkge1xuICAgIGxldCBrZXlzID0gWydzdGF0cy5rcGlGaWx0ZXJGb3JtRGF0YScsICdzdGF0cy5zZWxlY3RlZERlc2NyaXB0aW9uJywgJ3N0YXRzLnNlbGVjdGVkRGFzaGJvYXJkJywgJ3N0YXRzLmN1c3RvbVNlbGVjdGVkRGFzaGJvYXJkJ107XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZS5yZW1vdmUoa2V5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTZXNzaW9uKCk6IE9ic2VydmFibGU8U2Vzc2lvbj4ge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucnEuZ2V0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ2J1c2luZXNzbG9naWMvZ2V0Q3VycmVudFNlc3Npb24nKS5waXBlKFxuICAgICAgbWFwKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBhc3NpZ24odGhpcy5zZXNzaW9uLCByZXMuZGF0YSk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5oYXNTY2FuZGl0ID0gdGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpID8gdGhpcy5oYXNSb2xlcyhbJ3NjYW5kaXQnXSkgOiB0aGlzLmhhc1JvbGVzKFsnc2NhbmRpdCcsICdhZG1pbiddKTtcbiAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5zZXNzaW9uO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZG9Mb2dvdXQoKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3VzZXIvbG9nb3V0JztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwge30pO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5pc1Rlc3RwZW4pIHtcbiAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubG9jYWxGb3JhZ2UpIHtcbiAgICAgICAgdGhpcy5sb2NhbEZvcmFnZS5jbGVhcigpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zZXNzaW9uICYmIHRoaXMuc2Vzc2lvbi51c2VyICYmIHRoaXMuc2Vzc2lvbi51c2VyLl9pZCkge1xuICAgICAgdGhpcy5wdXNoLnVucmVnaXN0ZXJPbmVTaWduYWwodGhpcy5zZXNzaW9uLnVzZXIpO1xuICAgICAgcHJvbWlzZSA9IHRoaXMudXBkYXRlUHJvZmlsZSh0aGlzLnNlc3Npb24udXNlcikudG9Qcm9taXNlKCk7XG4gICAgfVxuICAgIHRoaXMubG9nb3V0JC5uZXh0KCcnKTtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+IHRoaXMuYWZ0ZXJMb2dvdXQoKSwgKCkgPT4gdGhpcy5hZnRlckxvZ291dCgpKTtcbiAgfVxuXG4gIGFmdGVyTG9nb3V0KCkge1xuICAgIHRoaXMuZG9Mb2dvdXQoKS5zdWJzY3JpYmUoKCkgPT4ge30sICgpID0+IHt9KTtcbiAgICB0aGlzLm5ldHdvcmsuZm9yY2VPZmZsaW5lKGZhbHNlLCBmYWxzZSk7XG4gICAgdGhpcy5zZXNzaW9uLmNsZWFyKCkuY2F0Y2goKCkgPT4ge30pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHNpZ251cChlbWFpbDogc3RyaW5nLCBpbWFnZURhdGE6IGFueSwgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIGxldCB1c2VyID0gPGFueT57IHVzZXJuYW1lOiBlbWFpbCwgZW1haWwsIHBhc3N3b3JkLCBpbWFnZURhdGEgfTtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAndXNlci9zaWdudXAnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVzZXIgfSkucGlwZShcbiAgICAgIG1lcmdlTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGludml0ZVVzZXJzKHVzZXJzOiBBcnJheTx7IGVtYWlsOiBzdHJpbmc7IHJvbGVzOiBBcnJheTxzdHJpbmc+OyBsb2NhdGlvblJlZj86IHN0cmluZyB9PiwgZ3JvdXBzOiBBcnJheTxzdHJpbmc+LCBwYXNzd29yZDogc3RyaW5nID0gbnVsbCwgc2VuZFBhc3N3b3JkOiBib29sZWFuID0gdHJ1ZSwgYXBwTmFtZT86IHN0cmluZywgYXBwbGVTdG9yZVVybD86IHN0cmluZywgcGxheVN0b3JlVXJsPzogc3RyaW5nLCBfdGVuYW50UmVmPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAndXNlci9pbnZpdGUnO1xuICAgIGxldCBmaW5hbFBsYXlTdG9yZVVybCA9IHBsYXlTdG9yZVVybCArIHRoaXMuY29yZUNvbmZpZy5nZXRBcHBJZCgpO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7XG4gICAgICB1c2VycyxcbiAgICAgIGdyb3VwcyxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgc2VuZFBhc3N3b3JkLFxuICAgICAgYXBwTmFtZSxcbiAgICAgIGFwcGxlU3RvcmVVcmwsXG4gICAgICBwbGF5U3RvcmVVcmw6IGZpbmFsUGxheVN0b3JlVXJsLFxuICAgICAgX3RlbmFudFJlZlxuICAgIH0pO1xuICB9XG5cbiAgaXNMb2dnZWRJbigpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLnRva2VuICYmIHRoaXMuc2Vzc2lvbi50b2tlbi5sZW5ndGggPiAwICYmICF0aGlzLmlzVG9rZW5FeHBpcmVkKHRoaXMuc2Vzc2lvbi50b2tlbik7XG4gIH1cblxuICBoYXNSb2xlKHJvbGU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24ucm9sZXMgJiYgdGhpcy5zZXNzaW9uLnJvbGVzLmluZGV4T2Yocm9sZSkgPj0gMDtcbiAgfVxuXG4gIGhhc1JvbGVzKHJvbGVzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIHNvbWUoX21hcChyb2xlcywgcm9sZSA9PiB0aGlzLmhhc1JvbGUocm9sZSkpLCB0ID0+IHQgPT09IHRydWUpO1xuICB9XG5cbiAgaGFzQWxsUm9sZXMocm9sZXM6IEFycmF5PHN0cmluZz4pIHtcbiAgICByZXR1cm4gZXZlcnkocm9sZXMsIHJvbGUgPT4gdGhpcy5oYXNSb2xlKHJvbGUpKTtcbiAgfVxuXG4gIGhhc0dyb3VwKGdyb3VwOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdyb3VwcyAmJiB0aGlzLnNlc3Npb24uZ3JvdXBzLmluZGV4T2YoZ3JvdXApID49IDA7XG4gIH1cblxuICBoYXNHcm91cHMoZ3JvdXBzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgcmV0dXJuIHNvbWUoX21hcChncm91cHMsIGdyb3VwID0+IHRoaXMuaGFzR3JvdXAoZ3JvdXApKSwgdCA9PiB0ID09PSB0cnVlKTtcbiAgfVxuXG4gIGhhc0FsbEdyb3Vwcyhncm91cHM6IEFycmF5PHN0cmluZz4pIHtcbiAgICByZXR1cm4gZXZlcnkoZ3JvdXBzLCBncm91cCA9PiB0aGlzLmhhc0dyb3VwKGdyb3VwKSk7XG4gIH1cblxuICBpc0FkbWluKGNoZWNrU21hcnRpbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgbGV0IHJldFZhbCA9IHRoaXMuaGFzUm9sZShBdXRoZW50aWNhdGlvbi5yb2xlQWRtaW4pO1xuICAgIGlmIChjaGVja1NtYXJ0aW4gJiYgdGhpcy5zZXNzaW9uLnVzZXIudXNlcm5hbWUgIT09ICdzbWFydGluQHlvb2JpYy5jb20nKSB7XG4gICAgICByZXRWYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGlzVHJpYWwoKSB7XG4gICAgcmV0dXJuICF0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZUFkbWluKSAmJiB0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZVRyaWFsKTtcbiAgfVxuXG4gIGlzRGFzaGJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZURhc2hib2FyZCkgJiYgIXRoaXMuaXNBZG1pbigpICYmICF0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZU1pc3Npb25WaWV3ZXIpICYmICF0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZU1hbmFnZXIpO1xuICB9XG5cbiAgaXNUZWFtKCkge1xuICAgIHJldHVybiB0aGlzLmhhc1JvbGUoQXV0aGVudGljYXRpb24ucm9sZVRlYW0pO1xuICB9XG5cbiAgaXNDcm93ZCgpIHtcbiAgICByZXR1cm4gIXRoaXMuaGFzUm9sZShBdXRoZW50aWNhdGlvbi5yb2xlVGVhbSk7XG4gIH1cblxuICBpc1N0b3JlKCkge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlciAmJiBpc1ByZXNlbnQodGhpcy5zZXNzaW9uLnVzZXIubG9jYXRpb25SZWYpO1xuICB9XG5cbiAgaXNTdG9yZU1hbmFnZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzUm9sZSgnc3RvcmUnKSAmJiB0aGlzLnNlc3Npb24udXNlciAmJiB0aGlzLnNlc3Npb24udXNlci5sb2NhdGlvblJlZjtcbiAgfVxuXG4gIGlzUm9sZUFkbWluKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRVc2VyKCkgJiYgdGhpcy5nZXRDdXJyZW50VXNlcigpLnJvbGUgPT09ICdST0xFQURNSU4nO1xuICB9XG5cbiAgaXNSb2xlRWRpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRVc2VyKCkgJiYgdGhpcy5nZXRDdXJyZW50VXNlcigpLnJvbGUgPT09ICdST0xFRURJVE9SJztcbiAgfVxuXG4gIGlzUm9sZVZpZXdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRVZJRVdFUic7XG4gIH1cblxuICBpc1JvbGVNYW5hZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRVc2VyKCkgJiYgdGhpcy5nZXRDdXJyZW50VXNlcigpLnJvbGUgPT09ICdST0xFTUFOQUdFUic7XG4gIH1cblxuICBpc1JvbGVGaWVsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRUZJRUxEJztcbiAgfVxuXG4gIGlzUm9sZVN0b3JlTWFuYWdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRVNUT1JFTUFOQUdFUic7XG4gIH1cblxuICBpc1JvbGVTdG9yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50VXNlcigpICYmIHRoaXMuZ2V0Q3VycmVudFVzZXIoKS5yb2xlID09PSAnUk9MRVNUT1JFJztcbiAgfVxuXG4gIGhhc0FjY2Vzc1RvT3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNSb2xlKCd0ZWFtJyk7XG4gIH1cblxuICBoYXNBY2Nlc3NUb0Jvb3N0KCkge1xuICAgIHJldHVybiB0aGlzLmhhc1JvbGUoJ2FjYWRlbXknKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRVc2VyKCk6IFVzZXIge1xuICAgIHJldHVybiB0aGlzLnNlc3Npb24udXNlcjtcbiAgfVxuXG4gIHBhc3N3b3JkQ2hhbmdlKG9sZFBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3VzZXIvY2hhbmdlUGFzc3dvcmQnLCB7XG4gICAgICBvbGRQYXNzd29yZCxcbiAgICAgIG5ld1Bhc3N3b3JkXG4gICAgfSk7XG4gIH1cblxuICBwYXNzd29yZFJlc2V0KGVtYWlsLCBpc01hZ2ljTGluazogYm9vbGVhbiA9IGZhbHNlLCB1cmxQcmVmaXg6IHN0cmluZyA9ICdodHRwczovL3lvb2JpYy5hcHAubGluay8nKSB7XG4gICAgaWYgKGlzTWFnaWNMaW5rKSB7XG4gICAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ3VzZXIvZ2V0TWFnaWNMaW5rJywge1xuICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgIHVybFByZWZpeFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAndXNlci9yZXNldCcsIHsgZW1haWw6IGVtYWlsIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBhc3N3b3JkUmVzZXRDb25maXJtKHRva2VuOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGhvc3Q/OiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gaG9zdCA/ICdodHRwczovLycgKyBob3N0ICsgJy9hcGkvJyA6IHRoaXMuYnJva2VyLmdldEFwaVVybCgpO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsICsgJ0VuZHBvaW50cy9yZXNldFBhc3N3b3JkJywgeyBwYXNzd29yZDogcGFzc3dvcmQgfSwgdG9rZW4sIG51bGwsIHRydWUpO1xuICB9XG5cbiAgcGFzc3dvcmRSZXNldEFkbWluKHVzZXI6IGFueSwgcGFzc3dvcmQ6IHN0cmluZywgZG9udFNlbmRNYWlsID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ0FkbWluRGFzaGJvYXJkL3Jlc2V0UGFzc3dvcmQnLCB7XG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHVzZXJQYXNzd29yZExpc3Q6IFt1c2VyXS5tYXAoKHU6IGFueSkgPT4gKHtcbiAgICAgICAgICB1c2VybmFtZTogdS51c2VybmFtZSxcbiAgICAgICAgICBfaWQ6IHUuX2lkLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KSksXG4gICAgICAgIGRvbnRTZW5kTWFpbDogZG9udFNlbmRNYWlsXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbXBlcnNvbmF0ZSh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdBZG1pbkRhc2hib2FyZC9pbXBlcnNvbmF0ZScsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gIH1cblxuICBmb3JjZUxvZ291dCh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdBZG1pbkRhc2hib2FyZC9mb3JjZUxvZ291dCcsIHtcbiAgICAgIHVzZXJuYW1lXG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZVBhc3N3b3JkKCkge1xuICAgIGxldCBsZW5ndGggPSA4O1xuICAgIGxldCBjaGFyc2V0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5JztcbiAgICBsZXQgcmV0VmFsID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjaGFyc2V0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICByZXRWYWwgKz0gY2hhcnNldC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbikpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgdXBkYXRlUHJvZmlsZSh1c2VyPzogYW55LCBza2lwQWNsID0gZmFsc2UsIGZpZWxkczogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgbGV0IHVzZXJUb1VwZGF0ZTogYW55ID0gdXNlciB8fCB0aGlzLmdldEN1cnJlbnRVc2VyKCk7XG4gICAgaWYgKHVzZXJUb1VwZGF0ZSkge1xuICAgICAgaWYgKCF0aGlzLmlzQWRtaW4oKSAmJiAhc2tpcEFjbCkge1xuICAgICAgICB0aGlzLmJyb2tlci5zZXRBY2wodXNlclRvVXBkYXRlLCB0aGlzLnNlc3Npb24uZ3JvdXBzKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZHMgJiYgZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdXNlclRvVXBkYXRlID0gPGFueT5waWNrKHVzZXJUb1VwZGF0ZSwgZmllbGRzKTtcbiAgICAgICAgaWYgKGZpZWxkcy5pbmRleE9mKCdfYWNsJykgPCAwKSB7XG4gICAgICAgICAgc2tpcEFjbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci51cHNlcnQoJ3VzZXInLCB1c2VyVG9VcGRhdGUsIG51bGwsIHNraXBBY2wpLnBpcGUoXG4gICAgICAgIGZsYXRNYXAocmV0VmFsID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QnlJZCgndXNlcicsIHJldFZhbC5faWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAodXBkYXRlZFVzZXIgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNlc3Npb24udXNlciA9IHVwZGF0ZWRVc2VyO1xuICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFVzZXI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgaXNUb2tlbkV4cGlyZWQodG9rZW46IHN0cmluZykge1xuICAgIGxldCBqd3RIZWxwZXI6IEp3dEhlbHBlclNlcnZpY2UgPSBuZXcgSnd0SGVscGVyU2VydmljZSh7fSk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBqd3RIZWxwZXIuaXNUb2tlbkV4cGlyZWQodG9rZW4pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9rZW4odG9rZW46IHN0cmluZywgdXNlcklkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlc3Npb24udG9rZW4gPSB0b2tlbjtcbiAgICB0aGlzLnNlc3Npb24udXNlcklkID0gdXNlcklkO1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRCeUlkKCd1c2VyJywgdXNlcklkKS5waXBlKFxuICAgICAgbWFwKChyZXRWYWw6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnNlc3Npb24udXNlciA9IHJldFZhbDtcbiAgICAgICAgdGhpcy5wcm9maWxlVXBkYXRlZCQuZW1pdChyZXRWYWwpO1xuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlUHVibGljQXBpVG9rZW4odGVuYW50OiBJVGVuYW50KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ0FkbWluRGFzaGJvYXJkL2dlbmVyYXRlU2VydmljZUFjY291bnQnO1xuXG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHtcbiAgICAgIHRlbmFudElkOiB0ZW5hbnQuX2lkXG4gICAgfSk7XG4gIH1cblxuICBpbnZhbGlkYXRlUHVibGljQXBpVG9rZW4odG9rZW46IElQdWJsaWNBcGlUb2tlbikge1xuICAgIGxldCB1cmwgPSB0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdwdWJsaWNBUElUb2tlbnMvJyArIHRva2VuLl9pZCArICcvaW52YWxpZGF0ZSc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHt9KTtcbiAgfVxufVxuIl19