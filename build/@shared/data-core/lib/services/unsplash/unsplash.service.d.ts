import { CoreConfig } from '@shared/common';
import { Requestor } from '../requestor/requestor.service';
export declare class Unsplash {
    protected rq: Requestor;
    protected coreConfig: CoreConfig;
    constructor(rq: Requestor, coreConfig: CoreConfig);
    getAll(search?: string, skip?: number, limit?: number): import("rxjs").Observable<any>;
}
