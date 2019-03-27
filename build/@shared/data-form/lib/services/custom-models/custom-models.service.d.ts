import { Network } from '@shared/common';
import { Config, Requestor, Broker } from '@shared/data-core';
import { CustomModel } from '../../interfaces/custom-model/custom-model.interface';
import { Observable } from 'rxjs';
export declare class CustomModels {
    protected config: Config;
    protected rq: Requestor;
    protected broker: Broker;
    protected network: Network;
    customModels: Array<CustomModel>;
    constructor(config: Config, rq: Requestor, broker: Broker, network: Network);
    registerModel(name: string, customModel: CustomModel): Observable<any>;
    registerModelForClient(customModel: CustomModel): void;
    registerModelsForClient(): void;
}
