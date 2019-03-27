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
var Push = /** @class */ (function () {
    function Push(coreConfig, log, config, rq, oneSignal, pushNative) {
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
    Object.defineProperty(Push.prototype, "oneSignalPlayerIdChange$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._oneSignalPlayerIdChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Push.prototype, "notificationReceived$", {
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
    Push.prototype.registerOneSignal = /**
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
    Push.prototype.updateUserOneSignalIds = /**
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
    Push.prototype.onNotificationReceived = /**
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
    Push.prototype.onNotificationOpened = /**
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
    Push.prototype.unregisterOneSignal = /**
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
    Push.prototype.addToken = /**
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
    Push.prototype.removeToken = /**
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
    Push.prototype.getUserTokens = /**
     * @param {?} user
     * @param {?} platform
     * @return {?}
     */
    function (user, platform) {
        /** @type {?} */
        var tokens = [];
        if (user._messaging && user._messaging.pushTokens) {
            tokens = union(map(filter(user._messaging.pushTokens, (/**
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
    Push.prototype.notifyGroups = /**
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
    Push.prototype.notifyUsers = /**
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
    Push.prototype.notifyUserById = /**
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
    Push.prototype.notifyUsersById = /**
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
    Push.prototype.notifyUsersByQuery = /**
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
    Push.prototype.notify = /**
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
    Push.prototype._registerNative = 
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
    Push.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Push.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Log },
        { type: Config },
        { type: Requestor },
        { type: OneSignal },
        { type: PushNative }
    ]; };
    return Push;
}());
export { Push };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3B1c2gvcHVzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBYyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTdELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLElBQUksSUFBSSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCw2QkFBYyxzREFBc0QsQ0FBQztBQUVyRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbkg7SUFVRSxjQUFvQixVQUFzQixFQUFVLEdBQVEsRUFBVSxNQUFjLEVBQVUsRUFBYSxFQUFVLFNBQW9CLEVBQVUsVUFBc0I7UUFBckosZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFVLGNBQVMsR0FBVCxT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QyxDQUFDLFNBQVM7Ozs7Z0JBQUMsVUFBQSxLQUFLO29CQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsRUFBQyxDQUFDO2dCQUVILEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVM7Ozs7Z0JBQUMsVUFBQyxJQUFTLElBQU0sQ0FBQyxFQUFDLENBQUM7Z0JBQzFELGlHQUFpRztnQkFDakcsVUFBVTs7O2dCQUFDO29CQUNULElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDckIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNuQjtnQkFDSCxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7WUFDWixDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLG1CQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUEsQ0FBQztTQUMzQztJQUNILENBQUM7O2dCQWhRRixVQUFVOzs7O2dCQVhNLFVBQVU7Z0JBQUUsR0FBRztnQkFMdkIsTUFBTTtnQkFDTixTQUFTO2dCQVFULFNBQVM7Z0JBQ0QsVUFBVTs7SUF1UTNCLFdBQUM7Q0FBQSxBQWpRRCxJQWlRQztTQWhRWSxJQUFJOzs7Ozs7SUFDZixvQkFBa0I7Ozs7O0lBQ2xCLG9CQUFpRTs7Ozs7SUFDakUscUNBQWlFOzs7OztJQUNqRSxtQ0FBMEM7Ozs7O0lBQzFDLGtDQUFtQzs7Ozs7SUFDbkMsMEJBQW9DOzs7OztJQUNwQyx3Q0FBeUQ7Ozs7O0lBRTdDLDBCQUE4Qjs7Ozs7SUFBRSxtQkFBZ0I7Ozs7O0lBQUUsc0JBQXNCOzs7OztJQUFFLGtCQUFxQjs7Ozs7SUFBRSx5QkFBNEI7Ozs7O0lBQUUsMEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy91c2VyL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL25vdGlmaWNhdGlvbi1ldmVudC9ub3RpZmljYXRpb24tZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIFN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IENvbG9ycywgQ29yZUNvbmZpZywgTG9nIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuXG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBPbmVTaWduYWwgfSBmcm9tICdAaW9uaWMtbmF0aXZlL29uZXNpZ25hbC9uZ3gnO1xuaW1wb3J0IHsgUHVzaCBhcyBQdXNoTmF0aXZlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9wdXNoL25neCc7XG5cbmV4cG9ydCAqIGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBwaWNrLCB1bmlxLCBjb21wYWN0LCB1bmlvbiwgd2l0aG91dCwgaXNBcnJheSwgdW5pcUJ5LCBmaWx0ZXIsIG1hcCwgbWVyZ2UsIGlzRW1wdHksIGdldCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQdXNoIHtcbiAgcHJpdmF0ZSBwdXNoOiBhbnk7XG4gIHByaXZhdGUgdGFnczogQXJyYXk8c3RyaW5nPiA9IFsndXNlcm5hbWUnLCAnbGFuZ3VhZ2UnLCAnaXNUZWFtJ107XG4gIHByaXZhdGUgX25vdGlmaWNhdGlvblJlY2VpdmVkID0gbmV3IFN1YmplY3Q8Tm90aWZpY2F0aW9uRXZlbnQ+KCk7XG4gIHByaXZhdGUgX3BhcmVudFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGN1cnJlbnRPbmVTaWduYWxJZDogc3RyaW5nO1xuICBwcml2YXRlIHJlZ2lzdGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25lU2lnbmFsUGxheWVySWRDaGFuZ2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcml2YXRlIGxvZzogTG9nLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnLCBwcml2YXRlIHJxOiBSZXF1ZXN0b3IsIHByaXZhdGUgb25lU2lnbmFsOiBPbmVTaWduYWwsIHByaXZhdGUgcHVzaE5hdGl2ZTogUHVzaE5hdGl2ZSkge31cblxuICBnZXQgb25lU2lnbmFsUGxheWVySWRDaGFuZ2UkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX29uZVNpZ25hbFBsYXllcklkQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG5vdGlmaWNhdGlvblJlY2VpdmVkJCgpOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbkV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX25vdGlmaWNhdGlvblJlY2VpdmVkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbmVTaWduYWwodXNlcjogVXNlcikge1xuICAgIGlmICh0aGlzLnJlZ2lzdGVyZWQgPT09IHRydWUpIHtcbiAgICAgIC8vfHwgdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCkgPT09ICd1ay5jby5ib290cy55b29iaWNvcGVyYXRpb25zJ1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1c2VyKTtcbiAgICB9XG4gICAgdGhpcy5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICBsZXQgb25lc2lnbmFsQXBwSWQgPSB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdvbmVzaWduYWxBcHBJZCcpO1xuICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICAvL09uZVNpZ25hbC5zZXRMb2dMZXZlbCh7IGxvZ0xldmVsOiA0LCB2aXN1YWxMZXZlbDogNCB9KTtcbiAgICAgIHRoaXMub25lU2lnbmFsLnN0YXJ0SW5pdChvbmVzaWduYWxBcHBJZCwgdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnZ29vZ2xlUHJvamVjdE51bWJlcicpKTtcbiAgICAgIHRoaXMub25lU2lnbmFsLmluRm9jdXNEaXNwbGF5aW5nKHRoaXMub25lU2lnbmFsLk9TSW5Gb2N1c0Rpc3BsYXlPcHRpb24uTm9uZSk7XG4gICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24uYWRkKHRoaXMub25lU2lnbmFsLmhhbmRsZU5vdGlmaWNhdGlvblJlY2VpdmVkKCkuc3Vic2NyaWJlKG5vdGlmID0+IHRoaXMub25Ob3RpZmljYXRpb25SZWNlaXZlZChub3RpZikpKTtcbiAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi5hZGQodGhpcy5vbmVTaWduYWwuaGFuZGxlTm90aWZpY2F0aW9uT3BlbmVkKCkuc3Vic2NyaWJlKG5vdGlmID0+IHRoaXMub25Ob3RpZmljYXRpb25PcGVuZWQobm90aWYpKSk7XG4gICAgICB0aGlzLm9uZVNpZ25hbC5lbmRJbml0KCk7XG5cbiAgICAgIHJldHVybiB0aGlzLm9uZVNpZ25hbC5nZXRJZHMoKS50aGVuKFxuICAgICAgICByZXRWYWwgPT4ge1xuICAgICAgICAgIHRoaXMub25lU2lnbmFsLnNldFN1YnNjcmlwdGlvbih0cnVlKTtcbiAgICAgICAgICB0aGlzLm9uZVNpZ25hbC5zZW5kVGFncyhwaWNrKHVzZXIsIHRoaXMudGFncykpO1xuICAgICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLnVzZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T25lU2lnbmFsSWQgPSByZXRWYWwudXNlcklkO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VyT25lU2lnbmFsSWRzKHVzZXIsIHRoaXMuY3VycmVudE9uZVNpZ25hbElkKTtcbiAgICAgICAgICAgIGlmICh1c2VyLmVtYWlsKSB7XG4gICAgICAgICAgICAgIHRoaXMub25lU2lnbmFsLnN5bmNIYXNoZWRFbWFpbCh1c2VyLmVtYWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXRWYWwucHVzaFRva2VuKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkVG9rZW4odXNlciwgcmV0VmFsLnB1c2hUb2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX29uZVNpZ25hbFBsYXllcklkQ2hhbmdlLm5leHQocmV0VmFsLnVzZXJJZCk7XG4gICAgICAgICAgcmV0dXJuIHVzZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cuZm9yY2VMb2coZXJyKTtcbiAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29yZUNvbmZpZy5pc1dlYigpICYmIHdpbmRvdy5PbmVTaWduYWwpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghd2luZG93Lk9uZVNpZ25hbC5pc1B1c2hOb3RpZmljYXRpb25zU3VwcG9ydGVkKCkgfHwgbG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUodXNlcik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93Lk9uZVNpZ25hbC5wdXNoKFtcbiAgICAgICAgICAnaW5pdCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXBwSWQ6IG9uZXNpZ25hbEFwcElkLFxuICAgICAgICAgICAgYXV0b1JlZ2lzdGVyOiB0cnVlLFxuICAgICAgICAgICAgbm90aWZ5QnV0dG9uOiB7IGVuYWJsZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHNhZmFyaV93ZWJfaWQ6IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ29uZXNpZ25hbFNhZmFyaVdlYklkJylcbiAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgICB3aW5kb3cuT25lU2lnbmFsLnB1c2goKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5PbmVTaWduYWwuc2VuZFRhZ3MocGljayh1c2VyLCB0aGlzLnRhZ3MpKTtcbiAgICAgICAgICB3aW5kb3cuT25lU2lnbmFsLm9uKCdub3RpZmljYXRpb25EaXNwbGF5JywgZXYgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk5vdGlmaWNhdGlvblJlY2VpdmVkKGV2KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHdpbmRvdy5PbmVTaWduYWwuZ2V0VXNlcklkKCkudGhlbih1c2VySWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T25lU2lnbmFsSWQgPSB1c2VySWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJPbmVTaWduYWxJZHModXNlciwgdGhpcy5jdXJyZW50T25lU2lnbmFsSWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1c2VyKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVVc2VyT25lU2lnbmFsSWRzKHVzZXIsIG9uZVNpZ25hbElkKSB7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIHVzZXIub25lU2lnbmFsSWQgPSB1bmlxKGNvbXBhY3QodW5pb24oW10uY29uY2F0KHVzZXIub25lU2lnbmFsSWQpLCBbb25lU2lnbmFsSWRdKSkpO1xuXG4gICAgICB1c2VyLm9uZVNpZ25hbEFwcElkcyA9IHVzZXIub25lU2lnbmFsQXBwSWRzIHx8IHt9O1xuICAgICAgbGV0IGJ1bmRsZUlkID0gdGhpcy5jb3JlQ29uZmlnLmdldEFwcElkKCkucmVwbGFjZSgvXFwuL2csICdfJyk7XG4gICAgICB1c2VyLm9uZVNpZ25hbEFwcElkc1tidW5kbGVJZF0gPSB1bmlxKGNvbXBhY3QodW5pb24oW10uY29uY2F0KHVzZXIub25lU2lnbmFsQXBwSWRzW2J1bmRsZUlkXSksIFtvbmVTaWduYWxJZF0pKSk7XG4gICAgfVxuICB9XG5cbiAgb25Ob3RpZmljYXRpb25SZWNlaXZlZChub3RpZjogYW55KSB7XG4gICAgdGhpcy5fbm90aWZpY2F0aW9uUmVjZWl2ZWQubmV4dCh7IHR5cGU6ICdyZWNlaXZlZCcsIG5vdGlmaWNhdGlvbjogbm90aWYgfSk7XG4gIH1cblxuICBvbk5vdGlmaWNhdGlvbk9wZW5lZChub3RpZjogYW55KSB7XG4gICAgdGhpcy5fbm90aWZpY2F0aW9uUmVjZWl2ZWQubmV4dCh7XG4gICAgICB0eXBlOiAnb3BlbmVkJyxcbiAgICAgIGFjdGlvbjogbm90aWYuYWN0aW9uLFxuICAgICAgbm90aWZpY2F0aW9uOiBub3RpZi5ub3RpZmljYXRpb25cbiAgICB9KTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJPbmVTaWduYWwodXNlcjogVXNlcikge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRoaXMub25lU2lnbmFsLnNldFN1YnNjcmlwdGlvbihmYWxzZSk7XG4gICAgICBpZiAodGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgfVxuICAgICAgdXNlci5vbmVTaWduYWxJZCA9IHdpdGhvdXQodXNlci5vbmVTaWduYWxJZCwgdGhpcy5jdXJyZW50T25lU2lnbmFsSWQpO1xuICAgICAgdXNlci5vbmVTaWduYWxBcHBJZHMgPSB1c2VyLm9uZVNpZ25hbEFwcElkcyB8fCB7fTtcbiAgICAgIGxldCBidW5kbGVJZCA9IHRoaXMuY29yZUNvbmZpZy5nZXRBcHBJZCgpLnJlcGxhY2UoL1xcLi9nLCAnXycpO1xuICAgICAgdXNlci5vbmVTaWduYWxBcHBJZHNbYnVuZGxlSWRdID0gd2l0aG91dCh1c2VyLm9uZVNpZ25hbEFwcElkc1tidW5kbGVJZF0sIHRoaXMuY3VycmVudE9uZVNpZ25hbElkKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRva2VuKHVzZXI6IFVzZXIsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgcGxhdGZvcm0gPSB0aGlzLmNvcmVDb25maWcuaXNJT1MoKSA/ICdpb3MnIDogJ2FuZHJvaWQnO1xuICAgIGlmICghdXNlci5fbWVzc2FnaW5nIHx8ICFpc0FycmF5KHVzZXIuX21lc3NhZ2luZy5wdXNoVG9rZW5zKSkge1xuICAgICAgdXNlci5fbWVzc2FnaW5nID0geyBwdXNoVG9rZW5zOiBbXSB9O1xuICAgIH1cbiAgICB1c2VyLl9tZXNzYWdpbmcucHVzaFRva2Vucy5wdXNoKHsgdG9rZW46IHRva2VuLCBwbGF0Zm9ybTogcGxhdGZvcm0gfSk7XG4gICAgdXNlci5fbWVzc2FnaW5nLnB1c2hUb2tlbnMgPSB1bmlxQnkodXNlci5fbWVzc2FnaW5nLnB1c2hUb2tlbnMsIHB1c2ggPT4gcHVzaC50b2tlbik7XG4gICAgZGVsZXRlICg8YW55PnVzZXIpLm1lc3NhZ2luZztcbiAgfVxuXG4gIHJlbW92ZVRva2VuKHVzZXI6IFVzZXIsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBpZiAodXNlci5fbWVzc2FnaW5nICYmIGlzQXJyYXkodXNlci5fbWVzc2FnaW5nLnB1c2hUb2tlbnMpKSB7XG4gICAgICB1c2VyLl9tZXNzYWdpbmcucHVzaFRva2VucyA9IGZpbHRlcih1c2VyLl9tZXNzYWdpbmcucHVzaFRva2VucywgcHVzaCA9PiBwdXNoLnRva2VuICE9PSB0b2tlbik7XG4gICAgfVxuICB9XG5cbiAgZ2V0VXNlclRva2Vucyh1c2VyOiBVc2VyLCBwbGF0Zm9ybTogc3RyaW5nKSB7XG4gICAgbGV0IHRva2VucyA9IFtdO1xuICAgIGlmICh1c2VyLl9tZXNzYWdpbmcgJiYgdXNlci5fbWVzc2FnaW5nLnB1c2hUb2tlbnMpIHtcbiAgICAgIHRva2VucyA9IHVuaW9uKG1hcChmaWx0ZXIodXNlci5fbWVzc2FnaW5nLnB1c2hUb2tlbnMsIHB1c2ggPT4gcHVzaC5wbGF0Zm9ybSA9PT0gcGxhdGZvcm0pLCAndG9rZW4nKSk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBub3RpZnlHcm91cHMoZ3JvdXBzOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikge1xuICAgIGdyb3VwcyA9IFtdLmNvbmNhdChncm91cHMpO1xuICAgIGlmIChncm91cHMgJiYgZ3JvdXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5ncm91cCA9IGdyb3VwcztcbiAgICAgIC8vbm90aWZpY2F0aW9uLnVzZXJRdWVyeSA9IHsgd2hlcmU6IHsgJ19hY2wuZ3JvdXBzLnInOiB7IGlucTogZ3JvdXBzIH0gfSB9O1xuICAgICAgcmV0dXJuIHRoaXMubm90aWZ5KG5vdGlmaWNhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlVc2Vycyh1c2VyczogQXJyYXk8VXNlcj4sIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uKSB7XG4gICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdGlmeShub3RpZmljYXRpb24sIHRydWUsIHVzZXJzLm1hcCh1ID0+IHUuX2lkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlVc2VyQnlJZCh1c2VySWQ6IHN0cmluZywgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pIHtcbiAgICBpZiAodXNlcklkKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub3RpZnkobm90aWZpY2F0aW9uLCB0cnVlLCBbdXNlcklkXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlVc2Vyc0J5SWQodXNlcklkczogQXJyYXk8c3RyaW5nPiwgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pIHtcbiAgICBpZiAodXNlcklkcyAmJiB1c2VySWRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLm5vdGlmeShub3RpZmljYXRpb24sIHRydWUsIHVzZXJJZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5VXNlcnNCeVF1ZXJ5KHVzZXJRdWVyeTogYW55LCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikge1xuICAgIGlmICghaXNFbXB0eSh1c2VyUXVlcnkpICYmICghaXNFbXB0eSh1c2VyUXVlcnkud2hlcmUpIHx8ICFpc0VtcHR5KHVzZXJRdWVyeS5zdWJRdWVyeS53aGVyZSkpKSB7XG4gICAgICAvL25vdGlmaWNhdGlvbi51c2VyUXVlcnkgPSB7IHdoZXJlOiB7IF9pZDogeyBpbnE6IHVzZXJJZHMgfSB9IH07XG4gICAgICBub3RpZmljYXRpb24udXNlclF1ZXJ5ID0gdXNlclF1ZXJ5O1xuICAgICAgbm90aWZpY2F0aW9uLl90ZW5hbnRSZWYgPSBub3RpZmljYXRpb24uX3RlbmFudFJlZiB8fCBnZXQodXNlclF1ZXJ5LCBbJ3doZXJlJywgJ190ZW5hbnRSZWYnXSkgfHwgZ2V0KHVzZXJRdWVyeSwgWydzdWJRdWVyeScsICd3aGVyZScsICdfdGVuYW50UmVmJ10pO1xuICAgICAgcmV0dXJuIHRoaXMubm90aWZ5KG5vdGlmaWNhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnkobm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24sIG5vUXVlcnk6IGJvb2xlYW4gPSBmYWxzZSwgdXNlcklkcz86IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAobm90aWZpY2F0aW9uLnNjaGVkdWxlZERhdGUpIHtcbiAgICAgIG5vdGlmaWNhdGlvbi5zY2hlZHVsZWREYXRlID0gdG9EYXRlKG5vdGlmaWNhdGlvbi5zY2hlZHVsZWREYXRlKTtcbiAgICB9XG4gICAgaWYgKG5vdGlmaWNhdGlvbi51c2VyUXVlcnkgJiYgbm90aWZpY2F0aW9uLnVzZXJRdWVyeS5saW1pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWxldGUgbm90aWZpY2F0aW9uLnVzZXJRdWVyeS5saW1pdDtcbiAgICB9XG4gICAgaWYgKG5vdGlmaWNhdGlvbi51c2VyUXVlcnkgJiYgbm90aWZpY2F0aW9uLnVzZXJRdWVyeS5maWVsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWxldGUgbm90aWZpY2F0aW9uLnVzZXJRdWVyeS5maWVsZDtcbiAgICB9XG4gICAgbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbk9wdGlvbnMgPSBtZXJnZShub3RpZmljYXRpb24ubm90aWZpY2F0aW9uT3B0aW9ucyB8fCB7fSwge1xuICAgICAgaW9zX2JhZGdlVHlwZTogJ0luY3JlYXNlJyxcbiAgICAgIGlvc19iYWRnZUNvdW50OiAxXG4gICAgfSk7XG4gICAgaWYgKG5vdGlmaWNhdGlvbi5tb2RlID09PSAnYWxsbm90aWZpY2F0aW9uJykge1xuICAgICAgKDxhbnk+bm90aWZpY2F0aW9uKS5tb2RlID0gJ2FsbCc7XG4gICAgfVxuICAgIGlmIChub1F1ZXJ5KSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ25vdGlmaWNhdGlvbnMvc2VuZFRhcmdldGVkTm90aWZpY2F0aW9uJztcbiAgICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVzZXJJZHMsIG5vdGlmaWNhdGlvbiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL3NlbmROb3RpZmljYXRpb24nO1xuICAgICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIG5vdGlmaWNhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLy9kZXByZWNhdGVkXG4gIHByb3RlY3RlZCBfcmVnaXN0ZXJOYXRpdmUoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzQ29yZG92YSgpKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgcHJvbWlzZUZ1bGZpbGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnB1c2ggPSB0aGlzLnB1c2hOYXRpdmUuaW5pdCh7XG4gICAgICAgICAgYW5kcm9pZDoge1xuICAgICAgICAgICAgc2VuZGVySUQ6IHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ2dvb2dsZVByb2plY3ROdW1iZXInKSxcbiAgICAgICAgICAgIGljb25Db2xvcjogQ29sb3JzLnN1Y2Nlc3MsXG4gICAgICAgICAgICBpY29uOiAnbm90aWZ5J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaW9zOiB7IGFsZXJ0OiAndHJ1ZScsIGJhZGdlOiAndHJ1ZScsIHNvdW5kOiAnZmFsc2UnIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHVzaC5vbigncmVnaXN0cmF0aW9uJykuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICBwcm9taXNlRnVsZmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKGRhdGEucmVnaXN0cmF0aW9uSWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnB1c2gub24oJ2Vycm9yJykuc3Vic2NyaWJlKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnB1c2gub24oJ25vdGlmaWNhdGlvbicpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7fSk7XG4gICAgICAgIC8vc29tZXRpbWVzIG9uIGlvcyBpZiB0aGUgcHVzaCBhcmUgbm90IGVuYWJsZSBpdCB3aWxsIG5vdCBzZW5kIGFuIGVycm9yLCBzbyB3ZSBjaGVjayBhZnRlciAxMCBzZWNcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKCFwcm9taXNlRnVsZmlsbGVkKSB7XG4gICAgICAgICAgICByZWplY3QoJ3RpbWVvdXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDAwKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gPGFueT5Qcm9taXNlLnJlamVjdCgnbm90IGNvcmRvdmEnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==