import { OnDestroy } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import { Network as NetworkNative } from '@ionic-native/network/ngx';
import { Observable } from 'rxjs';
export declare class Network implements OnDestroy {
    private coreConfig;
    private networkNative;
    private _isForcedOffline;
    private _isOffline;
    private _onConnectSubscription;
    private _onDisconnectSubscription;
    private _supportedConnections;
    private _connectionChange;
    private onlineListener;
    private offlineListener;
    constructor(coreConfig: CoreConfig, networkNative: NetworkNative);
    ngOnDestroy(): void;
    readonly connectionChange$: Observable<boolean>;
    isOffline(): boolean;
    isForcedOffline(): boolean;
    getConnection(): string;
    emit(): void;
    forceOffline(offline: boolean, emit?: boolean): void;
}
