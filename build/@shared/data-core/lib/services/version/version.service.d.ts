import { Config } from '../config/config.service';
import { CoreConfig } from '@shared/common';
export declare class Version {
    private config;
    private coreConfig;
    constructor(config: Config, coreConfig: CoreConfig);
    get(includeServerName: boolean): string;
    isCurrentVersionHigherThan(version: string): boolean;
}
