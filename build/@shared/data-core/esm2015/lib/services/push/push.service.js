/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Subscription, Subject, of } from 'rxjs';
import { Colors, CoreConfig, Log } from '@shared/common';
import { toDate } from '@shared/stencil';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push as PushNative } from '@ionic-native/push/ngx';
export { Notification } from '../../interfaces/notification/notification.interface';
import { pick, uniq, compact, union, without, isArray, uniqBy, filter, map, merge, isEmpty, get } from 'lodash-es';
export class Push {
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
            tokens = union(map(filter(user._messaging.pushTokens, (/**
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
Push.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Push.ctorParameters = () => [
    { type: CoreConfig },
    { type: Log },
    { type: Config },
    { type: Requestor },
    { type: OneSignal },
    { type: PushNative }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Push.prototype.push;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.tags;
    /**
     * @type {?}
     * @private
     */
    Push.prototype._notificationReceived;
    /**
     * @type {?}
     * @private
     */
    Push.prototype._parentSubscription;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.currentOneSignalId;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.registered;
    /**
     * @type {?}
     * @private
     */
    Push.prototype._oneSignalPlayerIdChange;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.coreConfig;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.log;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.config;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.oneSignal;
    /**
     * @type {?}
     * @private
     */
    Push.prototype.pushNative;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3B1c2gvcHVzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBYyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLElBQUksSUFBSSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCw2QkFBYyxzREFBc0QsQ0FBQztBQUVyRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHbkgsTUFBTSxPQUFPLElBQUk7Ozs7Ozs7OztJQVNmLFlBQW9CLFVBQXNCLEVBQVUsR0FBUSxFQUFVLE1BQWMsRUFBVSxFQUFhLEVBQVUsU0FBb0IsRUFBVSxVQUFzQjtRQUFySixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxPQUFFLEdBQUYsRUFB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QUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ25CO2dCQUNILENBQUMsR0FBRSxLQUFLLENBQUMsQ0FBQztZQUNaLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE9BQU8sbUJBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBQSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7O1lBaFFGLFVBQVU7Ozs7WUFYTSxVQUFVO1lBQUUsR0FBRztZQUx2QixNQUFNO1lBQ04sU0FBUztZQVFULFNBQVM7WUFDRCxVQUFVOzs7Ozs7O0lBUXpCLG9CQUFrQjs7Ozs7SUFDbEIsb0JBQWlFOzs7OztJQUNqRSxxQ0FBaUU7Ozs7O0lBQ2pFLG1DQUEwQzs7Ozs7SUFDMUMsa0NBQW1DOzs7OztJQUNuQywwQkFBb0M7Ozs7O0lBQ3BDLHdDQUF5RDs7Ozs7SUFFN0MsMEJBQThCOzs7OztJQUFFLG1CQUFnQjs7Ozs7SUFBRSxzQkFBc0I7Ozs7O0lBQUUsa0JBQXFCOzs7OztJQUFFLHlCQUE0Qjs7Ozs7SUFBRSwwQkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25FdmVudCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbm90aWZpY2F0aW9uLWV2ZW50L25vdGlmaWNhdGlvbi1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ29sb3JzLCBDb3JlQ29uZmlnLCBMb2cgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5cbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IE9uZVNpZ25hbCB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvb25lc2lnbmFsL25neCc7XG5pbXBvcnQgeyBQdXNoIGFzIFB1c2hOYXRpdmUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL3B1c2gvbmd4JztcblxuZXhwb3J0ICogZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IHBpY2ssIHVuaXEsIGNvbXBhY3QsIHVuaW9uLCB3aXRob3V0LCBpc0FycmF5LCB1bmlxQnksIGZpbHRlciwgbWFwLCBtZXJnZSwgaXNFbXB0eSwgZ2V0IH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFB1c2gge1xuICBwcml2YXRlIHB1c2g6IGFueTtcbiAgcHJpdmF0ZSB0YWdzOiBBcnJheTxzdHJpbmc+ID0gWyd1c2VybmFtZScsICdsYW5ndWFnZScsICdpc1RlYW0nXTtcbiAgcHJpdmF0ZSBfbm90aWZpY2F0aW9uUmVjZWl2ZWQgPSBuZXcgU3ViamVjdDxOb3RpZmljYXRpb25FdmVudD4oKTtcbiAgcHJpdmF0ZSBfcGFyZW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgY3VycmVudE9uZVNpZ25hbElkOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVnaXN0ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9vbmVTaWduYWxQbGF5ZXJJZENoYW5nZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByaXZhdGUgbG9nOiBMb2csIHByaXZhdGUgY29uZmlnOiBDb25maWcsIHByaXZhdGUgcnE6IFJlcXVlc3RvciwgcHJpdmF0ZSBvbmVTaWduYWw6IE9uZVNpZ25hbCwgcHJpdmF0ZSBwdXNoTmF0aXZlOiBQdXNoTmF0aXZlKSB7fVxuXG4gIGdldCBvbmVTaWduYWxQbGF5ZXJJZENoYW5nZSQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fb25lU2lnbmFsUGxheWVySWRDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgbm90aWZpY2F0aW9uUmVjZWl2ZWQkKCk6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbm90aWZpY2F0aW9uUmVjZWl2ZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZWdpc3Rlck9uZVNpZ25hbCh1c2VyOiBVc2VyKSB7XG4gICAgaWYgKHRoaXMucmVnaXN0ZXJlZCA9PT0gdHJ1ZSkge1xuICAgICAgLy98fCB0aGlzLmNvcmVDb25maWcuZ2V0QXBwSWQoKSA9PT0gJ3VrLmNvLmJvb3RzLnlvb2JpY29wZXJhdGlvbnMnXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVzZXIpO1xuICAgIH1cbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgIGxldCBvbmVzaWduYWxBcHBJZCA9IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ29uZXNpZ25hbEFwcElkJyk7XG4gICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIC8vT25lU2lnbmFsLnNldExvZ0xldmVsKHsgbG9nTGV2ZWw6IDQsIHZpc3VhbExldmVsOiA0IH0pO1xuICAgICAgdGhpcy5vbmVTaWduYWwuc3RhcnRJbml0KG9uZXNpZ25hbEFwcElkLCB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdnb29nbGVQcm9qZWN0TnVtYmVyJykpO1xuICAgICAgdGhpcy5vbmVTaWduYWwuaW5Gb2N1c0Rpc3BsYXlpbmcodGhpcy5vbmVTaWduYWwuT1NJbkZvY3VzRGlzcGxheU9wdGlvbi5Ob25lKTtcbiAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5vbmVTaWduYWwuaGFuZGxlTm90aWZpY2F0aW9uUmVjZWl2ZWQoKS5zdWJzY3JpYmUobm90aWYgPT4gdGhpcy5vbk5vdGlmaWNhdGlvblJlY2VpdmVkKG5vdGlmKSkpO1xuICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLmFkZCh0aGlzLm9uZVNpZ25hbC5oYW5kbGVOb3RpZmljYXRpb25PcGVuZWQoKS5zdWJzY3JpYmUobm90aWYgPT4gdGhpcy5vbk5vdGlmaWNhdGlvbk9wZW5lZChub3RpZikpKTtcbiAgICAgIHRoaXMub25lU2lnbmFsLmVuZEluaXQoKTtcblxuICAgICAgcmV0dXJuIHRoaXMub25lU2lnbmFsLmdldElkcygpLnRoZW4oXG4gICAgICAgIHJldFZhbCA9PiB7XG4gICAgICAgICAgdGhpcy5vbmVTaWduYWwuc2V0U3Vic2NyaXB0aW9uKHRydWUpO1xuICAgICAgICAgIHRoaXMub25lU2lnbmFsLnNlbmRUYWdzKHBpY2sodXNlciwgdGhpcy50YWdzKSk7XG4gICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwudXNlcklkKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPbmVTaWduYWxJZCA9IHJldFZhbC51c2VySWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJPbmVTaWduYWxJZHModXNlciwgdGhpcy5jdXJyZW50T25lU2lnbmFsSWQpO1xuICAgICAgICAgICAgaWYgKHVzZXIuZW1haWwpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbmVTaWduYWwuc3luY0hhc2hlZEVtYWlsKHVzZXIuZW1haWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJldFZhbC5wdXNoVG9rZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5hZGRUb2tlbih1c2VyLCByZXRWYWwucHVzaFRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fb25lU2lnbmFsUGxheWVySWRDaGFuZ2UubmV4dChyZXRWYWwudXNlcklkKTtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5mb3JjZUxvZyhlcnIpO1xuICAgICAgICAgIHJldHVybiB1c2VyO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb3JlQ29uZmlnLmlzV2ViKCkgJiYgd2luZG93Lk9uZVNpZ25hbCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCF3aW5kb3cuT25lU2lnbmFsLmlzUHVzaE5vdGlmaWNhdGlvbnNTdXBwb3J0ZWQoKSB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuT25lU2lnbmFsLnB1c2goW1xuICAgICAgICAgICdpbml0JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhcHBJZDogb25lc2lnbmFsQXBwSWQsXG4gICAgICAgICAgICBhdXRvUmVnaXN0ZXI6IHRydWUsXG4gICAgICAgICAgICBub3RpZnlCdXR0b246IHsgZW5hYmxlOiBmYWxzZSB9LFxuICAgICAgICAgICAgc2FmYXJpX3dlYl9pZDogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnb25lc2lnbmFsU2FmYXJpV2ViSWQnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgICAgIHdpbmRvdy5PbmVTaWduYWwucHVzaCgoKSA9PiB7XG4gICAgICAgICAgd2luZG93Lk9uZVNpZ25hbC5zZW5kVGFncyhwaWNrKHVzZXIsIHRoaXMudGFncykpO1xuICAgICAgICAgIHdpbmRvdy5PbmVTaWduYWwub24oJ25vdGlmaWNhdGlvbkRpc3BsYXknLCBldiA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTm90aWZpY2F0aW9uUmVjZWl2ZWQoZXYpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgd2luZG93Lk9uZVNpZ25hbC5nZXRVc2VySWQoKS50aGVuKHVzZXJJZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPbmVTaWduYWxJZCA9IHVzZXJJZDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVXNlck9uZVNpZ25hbElkcyh1c2VyLCB0aGlzLmN1cnJlbnRPbmVTaWduYWxJZCk7XG4gICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVzZXIpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVVzZXJPbmVTaWduYWxJZHModXNlciwgb25lU2lnbmFsSWQpIHtcbiAgICBpZiAodXNlcikge1xuICAgICAgdXNlci5vbmVTaWduYWxJZCA9IHVuaXEoY29tcGFjdCh1bmlvbihbXS5jb25jYXQodXNlci5vbmVTaWduYWxJZCksIFtvbmVTaWduYWxJZF0pKSk7XG5cbiAgICAgIHVzZXIub25lU2lnbmFsQXBwSWRzID0gdXNlci5vbmVTaWduYWxBcHBJZHMgfHwge307XG4gICAgICBsZXQgYnVuZGxlSWQgPSB0aGlzLmNvcmVDb25maWcuZ2V0QXBwSWQoKS5yZXBsYWNlKC9cXC4vZywgJ18nKTtcbiAgICAgIHVzZXIub25lU2lnbmFsQXBwSWRzW2J1bmRsZUlkXSA9IHVuaXEoY29tcGFjdCh1bmlvbihbXS5jb25jYXQodXNlci5vbmVTaWduYWxBcHBJZHNbYnVuZGxlSWRdKSwgW29uZVNpZ25hbElkXSkpKTtcbiAgICB9XG4gIH1cblxuICBvbk5vdGlmaWNhdGlvblJlY2VpdmVkKG5vdGlmOiBhbnkpIHtcbiAgICB0aGlzLl9ub3RpZmljYXRpb25SZWNlaXZlZC5uZXh0KHsgdHlwZTogJ3JlY2VpdmVkJywgbm90aWZpY2F0aW9uOiBub3RpZiB9KTtcbiAgfVxuXG4gIG9uTm90aWZpY2F0aW9uT3BlbmVkKG5vdGlmOiBhbnkpIHtcbiAgICB0aGlzLl9ub3RpZmljYXRpb25SZWNlaXZlZC5uZXh0KHtcbiAgICAgIHR5cGU6ICdvcGVuZWQnLFxuICAgICAgYWN0aW9uOiBub3RpZi5hY3Rpb24sXG4gICAgICBub3RpZmljYXRpb246IG5vdGlmLm5vdGlmaWNhdGlvblxuICAgIH0pO1xuICB9XG5cbiAgdW5yZWdpc3Rlck9uZVNpZ25hbCh1c2VyOiBVc2VyKSB7XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgdGhpcy5vbmVTaWduYWwuc2V0U3Vic2NyaXB0aW9uKGZhbHNlKTtcbiAgICAgIGlmICh0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICB9XG4gICAgICB1c2VyLm9uZVNpZ25hbElkID0gd2l0aG91dCh1c2VyLm9uZVNpZ25hbElkLCB0aGlzLmN1cnJlbnRPbmVTaWduYWxJZCk7XG4gICAgICB1c2VyLm9uZVNpZ25hbEFwcElkcyA9IHVzZXIub25lU2lnbmFsQXBwSWRzIHx8IHt9O1xuICAgICAgbGV0IGJ1bmRsZUlkID0gdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCkucmVwbGFjZSgvXFwuL2csICdfJyk7XG4gICAgICB1c2VyLm9uZVNpZ25hbEFwcElkc1tidW5kbGVJZF0gPSB3aXRob3V0KHVzZXIub25lU2lnbmFsQXBwSWRzW2J1bmRsZUlkXSwgdGhpcy5jdXJyZW50T25lU2lnbmFsSWQpO1xuICAgICAgdGhpcy5yZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9rZW4odXNlcjogVXNlciwgdG9rZW46IHN0cmluZykge1xuICAgIGxldCBwbGF0Zm9ybSA9IHRoaXMuY29yZUNvbmZpZy5pc0lPUygpID8gJ2lvcycgOiAnYW5kcm9pZCc7XG4gICAgaWYgKCF1c2VyLl9tZXNzYWdpbmcgfHwgIWlzQXJyYXkodXNlci5fbWVzc2FnaW5nLnB1c2hUb2tlbnMpKSB7XG4gICAgICB1c2VyLl9tZXNzYWdpbmcgPSB7IHB1c2hUb2tlbnM6IFtdIH07XG4gICAgfVxuICAgIHVzZXIuX21lc3NhZ2luZy5wdXNoVG9rZW5zLnB1c2goeyB0b2tlbjogdG9rZW4sIHBsYXRmb3JtOiBwbGF0Zm9ybSB9KTtcbiAgICB1c2VyLl9tZXNzYWdpbmcucHVzaFRva2VucyA9IHVuaXFCeSh1c2VyLl9tZXNzYWdpbmcucHVzaFRva2VucywgcHVzaCA9PiBwdXNoLnRva2VuKTtcbiAgICBkZWxldGUgKDxhbnk+dXNlcikubWVzc2FnaW5nO1xuICB9XG5cbiAgcmVtb3ZlVG9rZW4odXNlcjogVXNlciwgdG9rZW46IHN0cmluZykge1xuICAgIGlmICh1c2VyLl9tZXNzYWdpbmcgJiYgaXNBcnJheSh1c2VyLl9tZXNzYWdpbmcucHVzaFRva2VucykpIHtcbiAgICAgIHVzZXIuX21lc3NhZ2luZy5wdXNoVG9rZW5zID0gZmlsdGVyKHVzZXIuX21lc3NhZ2luZy5wdXNoVG9rZW5zLCBwdXNoID0+IHB1c2gudG9rZW4gIT09IHRva2VuKTtcbiAgICB9XG4gIH1cblxuICBnZXRVc2VyVG9rZW5zKHVzZXI6IFVzZXIsIHBsYXRmb3JtOiBzdHJpbmcpIHtcbiAgICBsZXQgdG9rZW5zID0gW107XG4gICAgaWYgKHVzZXIuX21lc3NhZ2luZyAmJiB1c2VyLl9tZXNzYWdpbmcucHVzaFRva2Vucykge1xuICAgICAgdG9rZW5zID0gdW5pb24obWFwKGZpbHRlcih1c2VyLl9tZXNzYWdpbmcucHVzaFRva2VucywgcHVzaCA9PiBwdXNoLnBsYXRmb3JtID09PSBwbGF0Zm9ybSksICd0b2tlbicpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIG5vdGlmeUdyb3Vwcyhncm91cHM6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKSB7XG4gICAgZ3JvdXBzID0gW10uY29uY2F0KGdyb3Vwcyk7XG4gICAgaWYgKGdyb3VwcyAmJiBncm91cHMubGVuZ3RoID4gMCkge1xuICAgICAgbm90aWZpY2F0aW9uLmdyb3VwID0gZ3JvdXBzO1xuICAgICAgLy9ub3RpZmljYXRpb24udXNlclF1ZXJ5ID0geyB3aGVyZTogeyAnX2FjbC5ncm91cHMucic6IHsgaW5xOiBncm91cHMgfSB9IH07XG4gICAgICByZXR1cm4gdGhpcy5ub3RpZnkobm90aWZpY2F0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeVVzZXJzKHVzZXJzOiBBcnJheTxVc2VyPiwgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pIHtcbiAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMubm90aWZ5KG5vdGlmaWNhdGlvbiwgdHJ1ZSwgdXNlcnMubWFwKHUgPT4gdS5faWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeVVzZXJCeUlkKHVzZXJJZDogc3RyaW5nLCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikge1xuICAgIGlmICh1c2VySWQpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdGlmeShub3RpZmljYXRpb24sIHRydWUsIFt1c2VySWRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeVVzZXJzQnlJZCh1c2VySWRzOiBBcnJheTxzdHJpbmc+LCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikge1xuICAgIGlmICh1c2VySWRzICYmIHVzZXJJZHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMubm90aWZ5KG5vdGlmaWNhdGlvbiwgdHJ1ZSwgdXNlcklkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlVc2Vyc0J5UXVlcnkodXNlclF1ZXJ5OiBhbnksIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKCFpc0VtcHR5KHVzZXJRdWVyeSkgJiYgKCFpc0VtcHR5KHVzZXJRdWVyeS53aGVyZSkgfHwgIWlzRW1wdHkodXNlclF1ZXJ5LnN1YlF1ZXJ5LndoZXJlKSkpIHtcbiAgICAgIC8vbm90aWZpY2F0aW9uLnVzZXJRdWVyeSA9IHsgd2hlcmU6IHsgX2lkOiB7IGlucTogdXNlcklkcyB9IH0gfTtcbiAgICAgIG5vdGlmaWNhdGlvbi51c2VyUXVlcnkgPSB1c2VyUXVlcnk7XG4gICAgICBub3RpZmljYXRpb24uX3RlbmFudFJlZiA9IG5vdGlmaWNhdGlvbi5fdGVuYW50UmVmIHx8IGdldCh1c2VyUXVlcnksIFsnd2hlcmUnLCAnX3RlbmFudFJlZiddKSB8fCBnZXQodXNlclF1ZXJ5LCBbJ3N1YlF1ZXJ5JywgJ3doZXJlJywgJ190ZW5hbnRSZWYnXSk7XG4gICAgICByZXR1cm4gdGhpcy5ub3RpZnkobm90aWZpY2F0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeShub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbiwgbm9RdWVyeTogYm9vbGVhbiA9IGZhbHNlLCB1c2VySWRzPzogQXJyYXk8c3RyaW5nPikge1xuICAgIGlmIChub3RpZmljYXRpb24uc2NoZWR1bGVkRGF0ZSkge1xuICAgICAgbm90aWZpY2F0aW9uLnNjaGVkdWxlZERhdGUgPSB0b0RhdGUobm90aWZpY2F0aW9uLnNjaGVkdWxlZERhdGUpO1xuICAgIH1cbiAgICBpZiAobm90aWZpY2F0aW9uLnVzZXJRdWVyeSAmJiBub3RpZmljYXRpb24udXNlclF1ZXJ5LmxpbWl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlbGV0ZSBub3RpZmljYXRpb24udXNlclF1ZXJ5LmxpbWl0O1xuICAgIH1cbiAgICBpZiAobm90aWZpY2F0aW9uLnVzZXJRdWVyeSAmJiBub3RpZmljYXRpb24udXNlclF1ZXJ5LmZpZWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlbGV0ZSBub3RpZmljYXRpb24udXNlclF1ZXJ5LmZpZWxkO1xuICAgIH1cbiAgICBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uT3B0aW9ucyA9IG1lcmdlKG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25PcHRpb25zIHx8IHt9LCB7XG4gICAgICBpb3NfYmFkZ2VUeXBlOiAnSW5jcmVhc2UnLFxuICAgICAgaW9zX2JhZGdlQ291bnQ6IDFcbiAgICB9KTtcbiAgICBpZiAobm90aWZpY2F0aW9uLm1vZGUgPT09ICdhbGxub3RpZmljYXRpb24nKSB7XG4gICAgICAoPGFueT5ub3RpZmljYXRpb24pLm1vZGUgPSAnYWxsJztcbiAgICB9XG4gICAgaWYgKG5vUXVlcnkpIHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnbm90aWZpY2F0aW9ucy9zZW5kVGFyZ2V0ZWROb3RpZmljYXRpb24nO1xuICAgICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgdXNlcklkcywgbm90aWZpY2F0aW9uIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvc2VuZE5vdGlmaWNhdGlvbic7XG4gICAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgbm90aWZpY2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvL2RlcHJlY2F0ZWRcbiAgcHJvdGVjdGVkIF9yZWdpc3Rlck5hdGl2ZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBwcm9taXNlRnVsZmlsbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHVzaCA9IHRoaXMucHVzaE5hdGl2ZS5pbml0KHtcbiAgICAgICAgICBhbmRyb2lkOiB7XG4gICAgICAgICAgICBzZW5kZXJJRDogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnZ29vZ2xlUHJvamVjdE51bWJlcicpLFxuICAgICAgICAgICAgaWNvbkNvbG9yOiBDb2xvcnMuc3VjY2VzcyxcbiAgICAgICAgICAgIGljb246ICdub3RpZnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpb3M6IHsgYWxlcnQ6ICd0cnVlJywgYmFkZ2U6ICd0cnVlJywgc291bmQ6ICdmYWxzZScgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wdXNoLm9uKCdyZWdpc3RyYXRpb24nKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgIHByb21pc2VGdWxmaWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHJlc29sdmUoZGF0YS5yZWdpc3RyYXRpb25JZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHVzaC5vbignZXJyb3InKS5zdWJzY3JpYmUoZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHVzaC5vbignbm90aWZpY2F0aW9uJykuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHt9KTtcbiAgICAgICAgLy9zb21ldGltZXMgb24gaW9zIGlmIHRoZSBwdXNoIGFyZSBub3QgZW5hYmxlIGl0IHdpbGwgbm90IHNlbmQgYW4gZXJyb3IsIHNvIHdlIGNoZWNrIGFmdGVyIDEwIHNlY1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAoIXByb21pc2VGdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHJlamVjdCgndGltZW91dCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiA8YW55PlByb21pc2UucmVqZWN0KCdub3QgY29yZG92YScpO1xuICAgIH1cbiAgfVxufVxuIl19