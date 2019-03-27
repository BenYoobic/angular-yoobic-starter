import { Requestor, Config } from '@shared/data-core';
export declare class TwilioToken {
    private rq;
    private config;
    constructor(rq: Requestor, config: Config);
    getToken(): any;
}
