import { Injector } from '@angular/core';
import { Position, Network } from '@shared/common';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Cache } from '../cache/cache.service';
import { Smartloc } from '../smartloc/smartloc.service';
import { IAutocompletePrediction, IBounds, IGeocodeResult, INearbySearchResponse, IResolvedAddressLocationResult } from '../../interfaces/googlemaps/googlemaps.interface';
import { Observable } from 'rxjs';
export declare class Googlemaps {
    private rq;
    private geo;
    private config;
    protected injector: Injector;
    protected network: Network;
    protected cache: Cache;
    private translate;
    constructor(rq: Requestor, geo: Smartloc, config: Config, injector: Injector, network: Network, cache: Cache);
    autocompleteFromSync(input: string, location: string | Position, offset?: number, radius?: number, language?: string, types?: string, components?: string, query?: boolean): Observable<IAutocompletePrediction[]>;
    autocompleteLocationObserver(input: string, offset?: number, location?: Observable<string | Position> | Promise<string | Position> | string | Position, radius?: number, language?: string, types?: string, components?: string, query?: boolean): Observable<IAutocompletePrediction[]>;
    autocompleteMultiObserver(inputO: Observable<string>, offsetO?: Observable<number>, locationO?: Observable<string | Position>, radius?: number, language?: string, types?: string, components?: string, query?: boolean): Observable<IAutocompletePrediction[]>;
    nearbySearchFromSync(location: string | Position, radius?: number, keyword?: string, language?: string, name?: string | string[], minprice?: number, maxprice?: number, opennow?: boolean, rankby?: string, type?: string, types?: string | string[]): Observable<INearbySearchResponse>;
    nearbySearchNextResults(next_page_token: string): Observable<INearbySearchResponse>;
    nearbySearchLocationObserver(location?: Observable<string | Position> | Promise<string | Position> | string | Position, radius?: number, keyword?: string, language?: string, name?: string | string[], minprice?: number, maxprice?: number, opennow?: boolean, rankby?: string, type?: string, types?: string | string[]): Observable<INearbySearchResponse>;
    nearbySearchMultiObserver(locationO?: Observable<string | Position>, keywordO?: Observable<string>, radius?: number, language?: string, nameO?: Observable<string | string[]>, minprice?: number, maxprice?: number, opennow?: boolean, rankby?: string, type?: string, types?: string | string[]): Observable<INearbySearchResponse>;
    geocodeFromSync(address?: string, components?: string | string[], bounds?: string | IBounds, language?: string, region?: string): Observable<IGeocodeResult[]>;
    geocodeAddressObserver(address: Observable<string>, components?: string | string[], bounds?: string | IBounds, language?: string, region?: string): Observable<IGeocodeResult[]>;
    reverseGeocodeFromSyncLocation(latlng: string | Position, language?: string, result_type?: string, location_type?: string): Observable<IGeocodeResult[]>;
    reverseGeocodeLatLngObserver(latlng?: Observable<string | Position> | Promise<string | Position> | string | Position, language?: string, result_type?: string, location_type?: string): Observable<IGeocodeResult[]>;
    reverseGeocodeFromSyncPlaceID(place_id: string, language?: string, result_type?: string, location_type?: string): Observable<IGeocodeResult>;
    reverseGeocodePlaceIDObserver(place_idO: Observable<string>, language?: string, result_type?: string, location_type?: string): Observable<IGeocodeResult>;
    placePredictionsLocationObserver(input?: string, location?: Observable<string | Position> | Promise<string | Position> | string | Position, language?: string, offset?: number, radius?: number, types?: string, components?: string, address?: string, search?: string, type?: string, limit?: number, nearbyRadius?: number, skipName?: boolean, debug?: boolean): Observable<IGeocodeResult[]>;
    placePredictionsFromSync(location: string | Position, input?: string, language?: string, offset?: number, radius?: number, types?: string, components?: string, address?: string, search?: string, type?: string, limit?: number, nearbyRadius?: number, skipName?: boolean, debug?: boolean): Observable<IGeocodeResult[]>;
    nearbyPlaceCodesFromSync(location: string | Position, radius?: number, keyword?: string, language?: string, name?: string | string[], minprice?: number, maxprice?: number, opennow?: boolean, rankby?: string, types?: string | string[], address?: string, search?: string, type?: string, limit?: number, nearbyRadius?: number, skipName?: boolean, debug?: boolean): Observable<IGeocodeResult[]>;
    resolveAddressLocation(address: string, language?: string, search?: string, type?: string, limit?: number, nearbyRadius?: number, skipName?: boolean, debug?: boolean): Observable<IResolvedAddressLocationResult>;
    getCurrentAddresses(forceRefresh?: boolean): Promise<any>;
    private readonly apiUrl;
    private _autocomplete;
    private _placePredictions;
    private _nearbyPlaceCodes;
    private _resolveAddressLocation;
    private _nearbySearch;
    private _nextSearchResults;
    private _geocode;
    private _reverseGeocode;
}