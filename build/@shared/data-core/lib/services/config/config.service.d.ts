import { LocalStorage, CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';
import { IConfigService } from '@shared/stencil';
export declare class Config implements IConfigService {
    protected localStorage: LocalStorage;
    protected coreConfig: CoreConfig;
    protected translate: Translate;
    private static PROD_URL;
    private static SANDBOX_URL;
    private static STAGING_URL;
    private static DEMO_URL;
    private static DEMO_FRESH_URL;
    private static DEV_URL;
    private static DEV1_URL;
    private static LOCALHOST_URL;
    private static TESTPEN_URL;
    private static TRIAL_URL;
    private static E2E_URL;
    private static IMAGE_URL;
    private static ZAPIER_INSTAGRAM_PROD_URL;
    private server;
    constructor(localStorage: LocalStorage, coreConfig: CoreConfig, translate: Translate);
    readonly servers: {
        _id: string;
        name: string;
        url: string;
    }[];
    serverUrl: string;
    readonly serverName: string;
    readonly apiUrl: string;
    readonly publicApiUrl: string;
    readonly uploadUrl: string;
    readonly uploadProxyUrl: string;
    readonly zapierInstagramUrl: string;
    readonly isTestpen: boolean;
    readonly isSandbox: boolean;
    readonly isE2E: boolean;
    readonly isProduction: boolean;
    readonly isDemo: boolean;
    getCurrentConfig(): {
        items: {
            title: string;
            url: string;
            _id: string;
            icon: string;
        }[];
        initialSelection: {
            title: string;
            url: string;
            _id: string;
            icon: string;
        };
        custom: {
            title: string;
            url: string;
            _id: string;
            icon: string;
        };
    };
}
