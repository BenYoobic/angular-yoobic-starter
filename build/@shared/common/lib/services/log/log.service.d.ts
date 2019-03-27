import { CoreConfig } from '../core-config/core-config.service';
export declare class Log {
    protected coreConfig: CoreConfig;
    constructor(coreConfig: CoreConfig);
    log(message?: any, ...optionalParams: any[]): void;
    forceLog(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    alert(message: any): void;
}
