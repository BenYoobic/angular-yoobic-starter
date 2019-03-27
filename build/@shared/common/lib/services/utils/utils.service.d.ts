import { CoreConfig } from '../core-config/core-config.service';
export declare class Utils {
    protected coreConfig: CoreConfig;
    constructor(coreConfig: CoreConfig);
    loadScript(url: any): Promise<{}>;
    getUrlParameterByName(key: string, url?: string): string;
    removeParameterFromUrl(key: string, url: string): string;
}
