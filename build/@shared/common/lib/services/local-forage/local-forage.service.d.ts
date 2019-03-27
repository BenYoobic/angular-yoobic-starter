import { CoreConfig } from '../core-config/core-config.service';
import { Log } from '../log/log.service';
export declare class LocalForageService {
    private coreConfig;
    protected log: Log;
    constructor(coreConfig: CoreConfig, log: Log);
    init(): Promise<void>;
    set<T>(key: string, value: any): Promise<T>;
    get<T>(key: string): Promise<T>;
    remove(key: string): any;
    clear(): any;
}
