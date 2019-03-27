import { IPosition, Network } from '@shared/common';
import { Broker } from '../broker/broker.service';
import { Smartloc } from '../smartloc/smartloc.service';
import { Requestor } from '../requestor/requestor.service';
import { Googlemaps } from '../googlemaps/googlemaps.service';
import { Authentication } from '../authentication/authentication.service';
import { Config } from '../config/config.service';
import { Session } from '../session/session.service';
import { Cache } from '../cache/cache.service';
import { Location } from '../../interfaces/location/location.interface';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { Filters, SubQuery, IHealthscore, ISort } from '@shared/stencil';
import { Observable } from 'rxjs';
export declare class Locations {
    private geoloc;
    private broker;
    protected rq: Requestor;
    protected config: Config;
    protected session: Session;
    protected network: Network;
    protected cache: Cache;
    protected authentication: Authentication;
    protected googleMaps: Googlemaps;
    constructor(geoloc: Smartloc, broker: Broker, rq: Requestor, config: Config, session: Session, network: Network, cache: Cache, authentication: Authentication, googleMaps: Googlemaps);
    loadMarkers(position: IPosition, maxPoints?: number): Observable<{
        _id: string;
        address: string;
        latitude: number;
        longitude: number;
        title: string;
        color: string;
    }[]>;
    getMarkers(locations: Array<Location>): {
        _id: string;
        address: string;
        latitude: number;
        longitude: number;
        title: string;
        color: string;
    }[];
    getMarkersData(collectionName: string, maxPoints?: number, fields?: Array<string>, filters?: Filters, subQuery?: SubQuery): Observable<{
        markers: {
            _id: string;
            address: string;
            latitude: number;
            longitude: number;
            title: string;
            color: string;
        }[];
        legendColors: {
            available: string;
            booked: string;
            validated: string;
            rejected: string;
            tobevalidated: string;
            archived: string;
        };
    }>;
    getLegendColors(): {
        available: string;
        booked: string;
        validated: string;
        rejected: string;
        tobevalidated: string;
        archived: string;
    };
    getLastVisitDate(locationIds: Array<string>, userId?: string): Observable<Array<{
        _id: string;
        finishedDate: Date;
        count: number;
    }>>;
    getStatsAndDistanceTransformAsync(position?: IPosition): (res: ResponseObject) => Observable<ResponseObject>;
    getDistanceTransform(): Promise<(res: ResponseObject) => Observable<ResponseObject>>;
    getDistanceAndLastVisitTransform(position: IPosition): (res: ResponseObject) => Observable<ResponseObject>;
    calculateDistanceAndKpiData(res: ResponseObject, position: IPosition): Location[];
    getAroundMeFilter(aroundMe: boolean, stats: boolean, forceRefresh: boolean): Promise<{
        filters: Filters;
        sortModel: ISort[];
        mapTransform: any;
        position: IPosition;
    }>;
    getLocationTypesTransform(): (res: ResponseObject, search: any, filters: any, start: any, pageSize: any) => Observable<ResponseObject>;
    getLocationTypesStat(locationTypeIds: Array<string>): Observable<Array<{
        _id: string;
        count: number;
    }>>;
    getHealthscore(locationId: string, nbDays?: Array<number>): Observable<Array<IHealthscore>>;
    getUserLocations(userId: string): Observable<any>;
}
