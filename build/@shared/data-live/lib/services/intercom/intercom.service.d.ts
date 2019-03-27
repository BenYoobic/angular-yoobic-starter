import { CoreConfig } from '@shared/common';
import { Authentication, User, Config, Session } from '@shared/data-core';
import { Subject } from 'rxjs';
import { Intercom as IntercomNative } from '@ionic-native/intercom/ngx';
import { WebIntercom } from './web-intercom.service';
export declare class Intercom {
    protected coreConfig: CoreConfig;
    protected config: Config;
    protected intercomNative: IntercomNative;
    protected authentication: Authentication;
    protected session: Session;
    protected webIntercom: WebIntercom;
    unreadCount$: Subject<number>;
    protected readonly app_id: string;
    constructor(coreConfig: CoreConfig, config: Config, intercomNative: IntercomNative, authentication: Authentication, session: Session, webIntercom: WebIntercom);
    isEnabled(): boolean;
    init(): void;
    registerForPush(): void;
    logout(): void;
    identify(user: User): void;
    trackEvent(eventName: string, metaData: any): void;
    update(metaData: any): void;
    show(): void;
}
