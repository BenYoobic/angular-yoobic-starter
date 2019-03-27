/// <reference path="../../../../../../types/window/index.d.ts" />
import { IPosition, ILatLng } from '../../interfaces/position/position.interface';
import { CoreConfig } from '../core-config/core-config.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
export declare class Position implements IPosition {
    latitude: number;
    longitude: number;
    accuracy: number;
    static isPosition(p: any): p is Position;
    constructor(loc: IPosition | string | ILatLng);
    toGeoLoc(reversed?: boolean): Array<number>;
    toJson(): {
        latitude: number;
        longitude: number;
    };
    toStringLoc(): string;
}
export declare class GeoLocation {
    private geolocation;
    protected coreConfig: CoreConfig;
    defaultPosition: Position;
    private timeout;
    private cache;
    private cacheTimestamp;
    constructor(geolocation: Geolocation, coreConfig: CoreConfig);
    getDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit?: string): number;
    getLocation(forceRefresh?: boolean): Promise<Position | null>;
}
