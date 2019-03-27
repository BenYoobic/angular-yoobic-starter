import { EventEmitter } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { ITenant } from '@shared/stencil';
export declare class Tenants {
    protected rq: Requestor;
    protected broker: Broker;
    protected config: Config;
    constructor(rq: Requestor, broker: Broker, config: Config);
    clone(from: ITenant, to: ITenant, progress?: EventEmitter<number>): Promise<{
        data: any;
        errors: any;
    }>;
}
