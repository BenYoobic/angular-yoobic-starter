import { Entity } from '../../interfaces/entity/entity.interface';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { Observable } from 'rxjs';
export declare class Activity {
    protected broker: Broker;
    protected rq: Requestor;
    constructor(broker: Broker, rq: Requestor);
    protected _viewOrLike(entity: Entity, entityName: string, action: string): Observable<any>;
    getActionFilter(entityId: string, action?: string): ({
        field: string;
        operator: {
            _id: string;
        };
        value: string;
    } | {
        field: string;
        operator: {
            _id: string;
        };
        value: string[];
    })[][];
    getUserTransform(): (res: ResponseObject) => ResponseObject;
    getActionAggregateOptions(): (start: any, limit: any) => ({
        $lookup: {
            from: string;
            localField: string;
            foreignField: string;
            as: string;
        };
        $unwind?: undefined;
        $skip?: undefined;
        $limit?: undefined;
    } | {
        $unwind: string;
        $lookup?: undefined;
        $skip?: undefined;
        $limit?: undefined;
    } | {
        $skip: any;
        $lookup?: undefined;
        $unwind?: undefined;
        $limit?: undefined;
    } | {
        $limit: any;
        $lookup?: undefined;
        $unwind?: undefined;
        $skip?: undefined;
    })[];
}
