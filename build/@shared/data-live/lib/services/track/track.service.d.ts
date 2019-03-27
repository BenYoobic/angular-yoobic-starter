import { Injector } from '@angular/core';
import { Network, CoreConfig, Log, LocalStorage } from '@shared/common';
import { User, Authentication, Session, Push, Config } from '@shared/data-core';
import { Intercom } from '../intercom/intercom.service';
export declare class Track {
    protected network: Network;
    protected push: Push;
    protected session: Session;
    protected localStorage: LocalStorage;
    protected authentication: Authentication;
    protected coreConfig: CoreConfig;
    protected config: Config;
    protected log: Log;
    protected injector: Injector;
    protected intercom: Intercom;
    constructor(network: Network, push: Push, session: Session, localStorage: LocalStorage, authentication: Authentication, coreConfig: CoreConfig, config: Config, log: Log, injector: Injector, intercom: Intercom);
    isEnabled(forceLoggedIn?: boolean, ignoreE2E?: boolean): boolean;
    loadSessionStack(): Promise<{}>;
    getSessionStackSession(): Promise<string>;
    getSessionStackUrl(): any;
    sendSessionStackError(err: any): void;
    loadAnalytics(): void;
    track(event: string, properties?: Object): void;
    page(name: string, category?: string, properties?: any): void;
    identify(user: User): void;
    intercomRegisterForPush(): void;
    globalTrackedProps(user: User): {
        user_groups: string[];
        user_username: string;
        user_firstname: string;
        user_lastname: string;
        user_language: string;
        user_company_name: string;
        user_tenant: string;
        user_role: string;
        user_roles: string[];
        user_environment: string;
    };
}
