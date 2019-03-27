import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Session } from '../session/session.service';
import { GeoLocation, Position } from '@shared/common';
export declare class Smartloc {
    private session;
    private geoLoc;
    private config;
    private rq;
    constructor(session: Session, geoLoc: GeoLocation, config: Config, rq: Requestor);
    readonly defaultPosition: Position;
    getLocation(forceRefresh?: boolean): Promise<Position>;
    getDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit?: string): number;
    getLocationEntity(id: any): Promise<any>;
    hasRole(role: string): boolean;
}
