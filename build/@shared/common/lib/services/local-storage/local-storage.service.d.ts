import { CoreConfig } from '../core-config/core-config.service';
export declare class LocalStorage {
    protected coreConfig: CoreConfig;
    localStorage: any;
    constructor(coreConfig: CoreConfig);
    set(key: string, value: string): void;
    get(key: string): string;
    setObject(key: string, value: any): void;
    getObject(key: string): any;
    remove(key: string): any;
    clear(): void;
}
