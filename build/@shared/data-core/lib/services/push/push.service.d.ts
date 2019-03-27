import { User } from '../../interfaces/user/user.interface';
import { Notification } from '../../interfaces/notification/notification.interface';
import { NotificationEvent } from '../../interfaces/notification-event/notification-event.interface';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Observable } from 'rxjs';
import { CoreConfig, Log } from '@shared/common';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push as PushNative } from '@ionic-native/push/ngx';
export * from '../../interfaces/notification/notification.interface';
export declare class Push {
    private coreConfig;
    private log;
    private config;
    private rq;
    private oneSignal;
    private pushNative;
    private push;
    private tags;
    private _notificationReceived;
    private _parentSubscription;
    private currentOneSignalId;
    private registered;
    private _oneSignalPlayerIdChange;
    constructor(coreConfig: CoreConfig, log: Log, config: Config, rq: Requestor, oneSignal: OneSignal, pushNative: PushNative);
    readonly oneSignalPlayerIdChange$: Observable<string>;
    readonly notificationReceived$: Observable<NotificationEvent>;
    registerOneSignal(user: User): Promise<{}>;
    updateUserOneSignalIds(user: any, oneSignalId: any): void;
    onNotificationReceived(notif: any): void;
    onNotificationOpened(notif: any): void;
    unregisterOneSignal(user: User): void;
    addToken(user: User, token: string): void;
    removeToken(user: User, token: string): void;
    getUserTokens(user: User, platform: string): any[];
    notifyGroups(groups: string | Array<string>, notification: Notification): Observable<any>;
    notifyUsers(users: Array<User>, notification: Notification): Observable<any>;
    notifyUserById(userId: string, notification: Notification): Observable<any>;
    notifyUsersById(userIds: Array<string>, notification: Notification): Observable<any>;
    notifyUsersByQuery(userQuery: any, notification: Notification): Observable<any>;
    notify(notification: Notification, noQuery?: boolean, userIds?: Array<string>): Observable<any>;
    protected _registerNative(): Promise<string>;
}
