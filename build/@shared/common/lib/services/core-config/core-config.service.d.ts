import { InjectionToken } from '@angular/core';
import { ICoreConfig, ISyncedCollection } from '@shared/stencil';
export declare const CORECONFIG_CONSTANTS: InjectionToken<any>;
export declare class CoreConfig implements ICoreConfig {
    private platformId;
    private configConstants;
    constructor(platformId: any, config: any);
    setStencil(): void;
    isWeb(): boolean;
    isIonic(): boolean;
    isCordova(): boolean;
    isCapacitorNative(): boolean;
    isHybrid(): boolean;
    isElectron(): boolean;
    isFirefox(): boolean;
    isIE(): boolean;
    isIE11(): boolean;
    isUniversal(): boolean;
    getPlatform(): string;
    getPlatformClean(): string;
    isIOS(): boolean;
    isIOS9(): boolean;
    isIphoneX(): boolean;
    isIphone5(): boolean;
    isIphoneSE(): boolean;
    isAndroid(): boolean;
    isWKWebView(): any;
    isTablet(): boolean;
    isPhablet(): boolean;
    isSamsung(): boolean;
    isZebraScanner(): boolean;
    isSurface(): boolean;
    isLocalhost(): boolean;
    reload(cleanLocation?: boolean): void;
    isFullScreenEnabled(): any;
    isFullScreen(): boolean;
    requestFullScreen(): void;
    exitFullScreen(): void;
    getProtocol(): string;
    getMode(): string;
    getKey(key: string): string;
    getAppId(): string;
    getAppVersion(): string;
    getAppName(): string;
    getFullAppName(): string;
    getWebUrl(): any;
    getCssPublicUrl(): string;
    getSyncedCollections(): Array<ISyncedCollection>;
}
