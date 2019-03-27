import { CoreConfig } from '@shared/common';
import { ReplaySubject } from 'rxjs';
export declare class PlatformService {
    private coreConfig;
    data$: ReplaySubject<any>;
    constructor(coreConfig: CoreConfig);
    handler(data: any): void;
    onReadyOrResume(debug?: boolean): void;
}
