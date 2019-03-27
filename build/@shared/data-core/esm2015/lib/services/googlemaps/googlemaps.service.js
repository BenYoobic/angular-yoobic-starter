/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:variable-name */
import { Injectable, Injector } from '@angular/core';
import { Position, Network } from '@shared/common';
import { Translate } from '@shared/translate';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Cache } from '../cache/cache.service';
import { Smartloc } from '../smartloc/smartloc.service';
import { CACHE_KEYS } from '../../interfaces/cache/cache.interface';
import { concatMap, map } from 'rxjs/operators';
import { Observable, from, combineLatest } from 'rxjs';
import { isString, uniqBy } from 'lodash-es';
/**
 * @param {?} b
 * @return {?}
 */
function normalizeBounds(b) {
    return b ? (typeof b === 'string' ? b : b.southwest.lat + ',' + b.southwest.lng + '|' + b.northeast.lat + ',' + b.northeast.lng) : '';
}
/**
 * @param {?} p
 * @return {?}
 */
function normalizeLocation(p) {
    return p ? (typeof p === 'string' ? p : p.toStringLoc()) : '';
}
/**
 * @param {?} p
 * @return {?}
 */
function pipeJoin(p) {
    return p ? (typeof p === 'string' ? p : p.join('|')) : '';
}
/**
 * @template T
 * @param {?} o
 * @return {?}
 */
function normalizeObservable(o) {
    return o instanceof Observable ? o : from(Promise.resolve(o));
}
export class Googlemaps {
    /**
     * @param {?} rq
     * @param {?} geo
     * @param {?} config
     * @param {?} injector
     * @param {?} network
     * @param {?} cache
     */
    constructor(rq, geo, config, injector, network, cache) {
        this.rq = rq;
        this.geo = geo;
        this.config = config;
        this.injector = injector;
        this.network = network;
        this.cache = cache;
        this.translate = this.injector.get(Translate);
    }
    /**
     * @param {?} input
     * @param {?} location
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    autocompleteFromSync(input, location, offset = input.length, radius = 100000, language = this.translate.getCurrentLanguage(), types, components, query = false) {
        return this._autocomplete({
            input,
            offset,
            location: normalizeLocation(location),
            radius,
            language,
            types,
            components
        }, query);
    }
    /**
     * @param {?} input
     * @param {?=} offset
     * @param {?=} location
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    autocompleteLocationObserver(input, offset = input.length, location = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), radius = 1000, language = this.translate.getCurrentLanguage(), types, components, query = false) {
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                input,
                offset,
                location: normalizeLocation(loc),
                radius,
                language,
                types,
                components
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._autocomplete(i, query))));
    }
    /**
     * @param {?} inputO
     * @param {?=} offsetO
     * @param {?=} locationO
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} types
     * @param {?=} components
     * @param {?=} query
     * @return {?}
     */
    autocompleteMultiObserver(inputO, offsetO = inputO.pipe(map((/**
     * @param {?} s
     * @return {?}
     */
    s => s.length))), locationO = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), radius = 1000, language = this.translate.getCurrentLanguage(), types, components, query = false) {
        return combineLatest(inputO, offsetO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        (i) => this._autocomplete(i, query))));
    }
    /**
     * @param {?} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    nearbySearchFromSync(location, radius = 1000, keyword, language = this.translate.getCurrentLanguage(), name, minprice, maxprice, opennow, rankby, type, types) {
        return this._nearbySearch({
            location: normalizeLocation(location),
            radius,
            keyword,
            language,
            name: pipeJoin(name),
            minprice,
            maxprice,
            opennow,
            rankby,
            type,
            types: pipeJoin(types)
        });
    }
    /**
     * @param {?} next_page_token
     * @return {?}
     */
    nearbySearchNextResults(next_page_token) {
        return this._nextSearchResults(next_page_token);
    }
    /**
     * @param {?=} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    nearbySearchLocationObserver(location = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), radius = 1000, keyword, language = this.translate.getCurrentLanguage(), name, minprice, maxprice, opennow, rankby, type, types) {
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                location: normalizeLocation(loc),
                radius,
                keyword,
                language,
                name: pipeJoin(name),
                minprice,
                maxprice,
                opennow,
                rankby,
                type,
                types: pipeJoin(types)
            };
        })), concatMap((/**
         * @param {?} input
         * @return {?}
         */
        input => this._nearbySearch(input))));
    }
    /**
     * @param {?=} locationO
     * @param {?=} keywordO
     * @param {?=} radius
     * @param {?=} language
     * @param {?=} nameO
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} type
     * @param {?=} types
     * @return {?}
     */
    nearbySearchMultiObserver(locationO = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), keywordO, radius = 1000, language = this.translate.getCurrentLanguage(), nameO, minprice, maxprice, opennow, rankby, type, types) {
        return combineLatest(keywordO, nameO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        (i) => this._nearbySearch(i))));
    }
    /**
     * @param {?=} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    geocodeFromSync(address, components, bounds, language = this.translate.getCurrentLanguage(), region) {
        return this._geocode({
            address,
            components: pipeJoin(components),
            bounds: normalizeBounds(bounds),
            language,
            region
        });
    }
    /**
     * @param {?} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    geocodeAddressObserver(address, components, bounds, language = this.translate.getCurrentLanguage(), region) {
        return address.pipe(map((/**
         * @param {?} addr
         * @return {?}
         */
        (addr) => {
            return {
                address: addr,
                components: pipeJoin(components),
                bounds: normalizeBounds(bounds),
                language,
                region
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._geocode(i))));
    }
    /**
     * @param {?} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodeFromSyncLocation(latlng, language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return this._reverseGeocode({
            latlng: normalizeLocation(latlng),
            language,
            result_type,
            location_type
        });
    }
    /**
     * @param {?=} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodeLatLngObserver(latlng = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return normalizeObservable(latlng).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                latlng: normalizeLocation(loc),
                language,
                result_type,
                location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._reverseGeocode(i))));
    }
    /**
     * @param {?} place_id
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodeFromSyncPlaceID(place_id, language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return this._reverseGeocode({
            place_id,
            language,
            result_type,
            location_type
        }).pipe(map((/**
         * @param {?} results
         * @return {?}
         */
        results => results[0])));
    }
    /**
     * @param {?} place_idO
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    reverseGeocodePlaceIDObserver(place_idO, language = this.translate.getCurrentLanguage(), result_type, location_type) {
        return place_idO.pipe(map((/**
         * @param {?} place_id
         * @return {?}
         */
        (place_id) => {
            return {
                place_id,
                language,
                result_type,
                location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._reverseGeocode(i))), map((/**
         * @param {?} results
         * @return {?}
         */
        results => results[0])));
    }
    /**
     * @param {?=} input
     * @param {?=} location
     * @param {?=} language
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} types
     * @param {?=} components
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    placePredictionsLocationObserver(input, location = from(this.geo.getLocation().then((/**
     * @param {?} pos
     * @return {?}
     */
    pos => pos.toStringLoc()))), language = this.translate.getCurrentLanguage(), offset = input.length, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        (loc) => {
            return {
                input,
                offset,
                location: normalizeLocation(loc),
                radius,
                language,
                types,
                components,
                address,
                search,
                type,
                limit,
                nearbyRadius,
                skipName,
                debug
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        i => this._placePredictions(i))));
    }
    /**
     * @param {?} location
     * @param {?=} input
     * @param {?=} language
     * @param {?=} offset
     * @param {?=} radius
     * @param {?=} types
     * @param {?=} components
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    placePredictionsFromSync(location, input, language = this.translate.getCurrentLanguage(), offset = input.length, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        return this._placePredictions({
            input,
            offset,
            location: normalizeLocation(location),
            radius,
            language,
            types,
            components,
            address,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }
    /**
     * @param {?} location
     * @param {?=} radius
     * @param {?=} keyword
     * @param {?=} language
     * @param {?=} name
     * @param {?=} minprice
     * @param {?=} maxprice
     * @param {?=} opennow
     * @param {?=} rankby
     * @param {?=} types
     * @param {?=} address
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    nearbyPlaceCodesFromSync(location, radius, keyword, language = this.translate.getCurrentLanguage(), name, minprice, maxprice, opennow, rankby, types, address, search, type, limit, nearbyRadius, skipName, debug) {
        return this._nearbyPlaceCodes({
            location: normalizeLocation(location),
            radius,
            keyword,
            language,
            name,
            minprice,
            maxprice,
            opennow,
            rankby,
            types,
            address,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }
    /**
     * @param {?} address
     * @param {?=} language
     * @param {?=} search
     * @param {?=} type
     * @param {?=} limit
     * @param {?=} nearbyRadius
     * @param {?=} skipName
     * @param {?=} debug
     * @return {?}
     */
    resolveAddressLocation(address, language = this.translate.getCurrentLanguage(), search, type, limit, nearbyRadius, skipName, debug) {
        return this._resolveAddressLocation({
            address,
            language,
            search,
            type,
            limit,
            nearbyRadius,
            skipName,
            debug
        });
    }
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    getCurrentAddresses(forceRefresh = false) {
        if (this.network.isOffline()) {
            return this.cache.get(CACHE_KEYS.addresses, CACHE_KEYS.addresses).toPromise();
        }
        else {
            return this.geo
                .getLocation(forceRefresh)
                .then((/**
             * @param {?} p
             * @return {?}
             */
            (p) => {
                return this.reverseGeocodeFromSyncLocation(p).toPromise();
            }))
                .then((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                /** @type {?} */
                let retVal = [];
                if (res && res.length > 0) {
                    retVal = res.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        /** @type {?} */
                        let position = new Position(d.geometry.location);
                        return {
                            address: d.formatted_address,
                            _id: d.id || d.formatted_address,
                            _geoloc: position.toGeoLoc(true),
                            coords: position.toJson()
                        };
                    }));
                }
                this.cache.add(CACHE_KEYS.addresses, CACHE_KEYS.addresses, retVal);
                return retVal;
            }));
        }
    }
    // public getStreetView(lat: number, lng: number) {
    //   let url= this.apiUrl+'streetView?'
    // }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl + 'GoogleMaps/';
    }
    /**
     * @private
     * @param {?} input
     * @param {?} query
     * @return {?}
     */
    _autocomplete(input, query) {
        return this.rq.post(`${this.apiUrl}place/autocomplete?query=${query}`, input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return res.predictions;
        })));
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _placePredictions(input) {
        return this.rq.post(this.apiUrl + 'place/predictions', input);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _nearbyPlaceCodes(input) {
        return this.rq.post(this.apiUrl + 'place/nearby-place-codes', input);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _resolveAddressLocation(input) {
        return this.rq.post(this.apiUrl + 'resolve-address-location', input);
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _nearbySearch(input) {
        return this.rq.post(this.apiUrl + 'place/nearby', input);
    }
    /**
     * @private
     * @param {?} next_page_token
     * @return {?}
     */
    _nextSearchResults(next_page_token) {
        return this.rq.post(this.apiUrl + 'place/nearby', { next_page_token });
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _geocode(input) {
        return this.rq.post(this.apiUrl + 'geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return res.results;
        })));
    }
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    _reverseGeocode(input) {
        return this.rq.post(this.apiUrl + 'reverse-geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (isString(res)) {
                res = JSON.parse(res);
            }
            return uniqBy(res.results, (/**
             * @param {?} t
             * @return {?}
             */
            t => t.formatted_address));
        })));
    }
}
Googlemaps.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Googlemaps.ctorParameters = () => [
    { type: Requestor },
    { type: Smartloc },
    { type: Config },
    { type: Injector },
    { type: Network },
    { type: Cache }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Googlemaps.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    Googlemaps.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Googlemaps.prototype.geo;
    /**
     * @type {?}
     * @private
     */
    Googlemaps.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Googlemaps.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    Googlemaps.prototype.network;
    /**
     * @type {?}
     * @protected
     */
    Googlemaps.prototype.cache;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dvb2dsZW1hcHMvZ29vZ2xlbWFwcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUlwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFFN0MsU0FBUyxlQUFlLENBQUMsQ0FBbUI7SUFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFD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LDRCQUFzQjs7Ozs7SUFBRSw4QkFBNEI7Ozs7O0lBQUUsNkJBQTBCOzs7OztJQUFFLDJCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOnZhcmlhYmxlLW5hbWUgKi9cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBvc2l0aW9uLCBOZXR3b3JrIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vY2FjaGUvY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBTbWFydGxvYyB9IGZyb20gJy4uL3NtYXJ0bG9jL3NtYXJ0bG9jLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ0FDSEVfS0VZUyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY2FjaGUvY2FjaGUuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgSUF1dG9jb21wbGV0ZUlucHV0LCBJQXV0b2NvbXBsZXRlUHJlZGljdGlvbiwgSUF1dG9jb21wbGV0ZVJlc3BvbnNlLCBJQm91bmRzLCBJR2VvY29kZUlucHV0LCBJR2VvY29kZVJlc3VsdCwgSUdlb2NvZGVSZXNwb25zZSwgSU5lYXJieVNlYXJjaElucHV0LCBJTmVhcmJ5U2VhcmNoUmVzcG9uc2UsIElSZXZlcnNlR2VvY29kZUlucHV0LCBJUmV2ZXJzZUdlb2NvZGVSZXNwb25zZSwgSVJlc29sdmVkQWRkcmVzc0xvY2F0aW9uSW5wdXQsIElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvblJlc3VsdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZ29vZ2xlbWFwcy9nb29nbGVtYXBzLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGNvbmNhdE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaXNTdHJpbmcsIHVuaXFCeSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUJvdW5kcyhiOiBzdHJpbmcgfCBJQm91bmRzKTogc3RyaW5nIHtcbiAgcmV0dXJuIGIgPyAodHlwZW9mIGIgPT09ICdzdHJpbmcnID8gYiA6IGIuc291dGh3ZXN0LmxhdCArICcsJyArIGIuc291dGh3ZXN0LmxuZyArICd8JyArIGIubm9ydGhlYXN0LmxhdCArICcsJyArIGIubm9ydGhlYXN0LmxuZykgOiAnJztcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTG9jYXRpb24ocDogc3RyaW5nIHwgUG9zaXRpb24pOiBzdHJpbmcge1xuICByZXR1cm4gcCA/ICh0eXBlb2YgcCA9PT0gJ3N0cmluZycgPyBwIDogcC50b1N0cmluZ0xvYygpKSA6ICcnO1xufVxuXG5mdW5jdGlvbiBwaXBlSm9pbihwOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiBwID8gKHR5cGVvZiBwID09PSAnc3RyaW5nJyA/IHAgOiBwLmpvaW4oJ3wnKSkgOiAnJztcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplT2JzZXJ2YWJsZTxUPihvOiBPYnNlcnZhYmxlPFQ+IHwgUHJvbWlzZTxUPiB8IFQpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIG8gaW5zdGFuY2VvZiBPYnNlcnZhYmxlID8gbyA6IGZyb20oUHJvbWlzZS5yZXNvbHZlKG8pKTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdvb2dsZW1hcHMge1xuICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJxOiBSZXF1ZXN0b3IsIHByaXZhdGUgZ2VvOiBTbWFydGxvYywgcHJpdmF0ZSBjb25maWc6IENvbmZpZywgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJvdGVjdGVkIG5ldHdvcms6IE5ldHdvcmssIHByb3RlY3RlZCBjYWNoZTogQ2FjaGUpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZSA9IHRoaXMuaW5qZWN0b3IuZ2V0PFRyYW5zbGF0ZT4oVHJhbnNsYXRlKTtcbiAgfVxuXG4gIHB1YmxpYyBhdXRvY29tcGxldGVGcm9tU3luYyhpbnB1dDogc3RyaW5nLCBsb2NhdGlvbjogc3RyaW5nIHwgUG9zaXRpb24sIG9mZnNldDogbnVtYmVyID0gaW5wdXQubGVuZ3RoLCByYWRpdXMgPSAxMDAwMDAsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgdHlwZXM/OiBzdHJpbmcsIGNvbXBvbmVudHM/OiBzdHJpbmcsIHF1ZXJ5ID0gZmFsc2UpOiBPYnNlcnZhYmxlPElBdXRvY29tcGxldGVQcmVkaWN0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b2NvbXBsZXRlKFxuICAgICAge1xuICAgICAgICBpbnB1dCxcbiAgICAgICAgb2Zmc2V0LFxuICAgICAgICBsb2NhdGlvbjogbm9ybWFsaXplTG9jYXRpb24obG9jYXRpb24pLFxuICAgICAgICByYWRpdXMsXG4gICAgICAgIGxhbmd1YWdlLFxuICAgICAgICB0eXBlcyxcbiAgICAgICAgY29tcG9uZW50c1xuICAgICAgfSxcbiAgICAgIHF1ZXJ5XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhdXRvY29tcGxldGVMb2NhdGlvbk9ic2VydmVyKGlucHV0OiBzdHJpbmcsIG9mZnNldDogbnVtYmVyID0gaW5wdXQubGVuZ3RoLCBsb2NhdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQb3NpdGlvbj4gfCBQcm9taXNlPHN0cmluZyB8IFBvc2l0aW9uPiB8IHN0cmluZyB8IFBvc2l0aW9uID0gZnJvbSh0aGlzLmdlby5nZXRMb2NhdGlvbigpLnRoZW4ocG9zID0+IHBvcy50b1N0cmluZ0xvYygpKSksIHJhZGl1cyA9IDEwMDAsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgdHlwZXM/OiBzdHJpbmcsIGNvbXBvbmVudHM/OiBzdHJpbmcsIHF1ZXJ5ID0gZmFsc2UpOiBPYnNlcnZhYmxlPElBdXRvY29tcGxldGVQcmVkaWN0aW9uW10+IHtcbiAgICByZXR1cm4gbm9ybWFsaXplT2JzZXJ2YWJsZShsb2NhdGlvbikucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGxvYyk6IElBdXRvY29tcGxldGVJbnB1dCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvYyksXG4gICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgIHR5cGVzLFxuICAgICAgICAgICAgY29tcG9uZW50c1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBjb25jYXRNYXAoaSA9PiB0aGlzLl9hdXRvY29tcGxldGUoaSwgcXVlcnkpKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXV0b2NvbXBsZXRlTXVsdGlPYnNlcnZlcihpbnB1dE86IE9ic2VydmFibGU8c3RyaW5nPiwgb2Zmc2V0TzogT2JzZXJ2YWJsZTxudW1iZXI+ID0gaW5wdXRPLnBpcGUobWFwKHMgPT4gcy5sZW5ndGgpKSwgbG9jYXRpb25POiBPYnNlcnZhYmxlPHN0cmluZyB8IFBvc2l0aW9uPiA9IGZyb20odGhpcy5nZW8uZ2V0TG9jYXRpb24oKS50aGVuKHBvcyA9PiBwb3MudG9TdHJpbmdMb2MoKSkpLCByYWRpdXMgPSAxMDAwLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHR5cGVzPzogc3RyaW5nLCBjb21wb25lbnRzPzogc3RyaW5nLCBxdWVyeSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxJQXV0b2NvbXBsZXRlUHJlZGljdGlvbltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoaW5wdXRPLCBvZmZzZXRPLCBsb2NhdGlvbk8pLnBpcGUoY29uY2F0TWFwKChpOiBhbnkpID0+IHRoaXMuX2F1dG9jb21wbGV0ZShpLCBxdWVyeSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBuZWFyYnlTZWFyY2hGcm9tU3luYyhsb2NhdGlvbjogc3RyaW5nIHwgUG9zaXRpb24sIHJhZGl1cyA9IDEwMDAsIGtleXdvcmQ/OiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgbmFtZT86IHN0cmluZyB8IHN0cmluZ1tdLCBtaW5wcmljZT86IG51bWJlciwgbWF4cHJpY2U/OiBudW1iZXIsIG9wZW5ub3c/OiBib29sZWFuLCByYW5rYnk/OiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcsIHR5cGVzPzogc3RyaW5nIHwgc3RyaW5nW10pOiBPYnNlcnZhYmxlPElOZWFyYnlTZWFyY2hSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9uZWFyYnlTZWFyY2goe1xuICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvY2F0aW9uKSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIGtleXdvcmQsXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIG5hbWU6IHBpcGVKb2luKG5hbWUpLFxuICAgICAgbWlucHJpY2UsXG4gICAgICBtYXhwcmljZSxcbiAgICAgIG9wZW5ub3csXG4gICAgICByYW5rYnksXG4gICAgICB0eXBlLFxuICAgICAgdHlwZXM6IHBpcGVKb2luKHR5cGVzKVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG5lYXJieVNlYXJjaE5leHRSZXN1bHRzKG5leHRfcGFnZV90b2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxJTmVhcmJ5U2VhcmNoUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFNlYXJjaFJlc3VsdHMobmV4dF9wYWdlX3Rva2VuKTtcbiAgfVxuXG4gIHB1YmxpYyBuZWFyYnlTZWFyY2hMb2NhdGlvbk9ic2VydmVyKGxvY2F0aW9uOiBPYnNlcnZhYmxlPHN0cmluZyB8IFBvc2l0aW9uPiB8IFByb21pc2U8c3RyaW5nIHwgUG9zaXRpb24+IHwgc3RyaW5nIHwgUG9zaXRpb24gPSBmcm9tKHRoaXMuZ2VvLmdldExvY2F0aW9uKCkudGhlbihwb3MgPT4gcG9zLnRvU3RyaW5nTG9jKCkpKSwgcmFkaXVzID0gMTAwMCwga2V5d29yZD86IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCBuYW1lPzogc3RyaW5nIHwgc3RyaW5nW10sIG1pbnByaWNlPzogbnVtYmVyLCBtYXhwcmljZT86IG51bWJlciwgb3Blbm5vdz86IGJvb2xlYW4sIHJhbmtieT86IHN0cmluZywgdHlwZT86IHN0cmluZywgdHlwZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSk6IE9ic2VydmFibGU8SU5lYXJieVNlYXJjaFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZU9ic2VydmFibGUobG9jYXRpb24pLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChsb2MpOiBJTmVhcmJ5U2VhcmNoSW5wdXQgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsb2NhdGlvbjogbm9ybWFsaXplTG9jYXRpb24obG9jKSxcbiAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgIG5hbWU6IHBpcGVKb2luKG5hbWUpLFxuICAgICAgICAgICAgbWlucHJpY2UsXG4gICAgICAgICAgICBtYXhwcmljZSxcbiAgICAgICAgICAgIG9wZW5ub3csXG4gICAgICAgICAgICByYW5rYnksXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdHlwZXM6IHBpcGVKb2luKHR5cGVzKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBjb25jYXRNYXAoaW5wdXQgPT4gdGhpcy5fbmVhcmJ5U2VhcmNoKGlucHV0KSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG5lYXJieVNlYXJjaE11bHRpT2JzZXJ2ZXIobG9jYXRpb25POiBPYnNlcnZhYmxlPHN0cmluZyB8IFBvc2l0aW9uPiA9IGZyb20odGhpcy5nZW8uZ2V0TG9jYXRpb24oKS50aGVuKHBvcyA9PiBwb3MudG9TdHJpbmdMb2MoKSkpLCBrZXl3b3JkTz86IE9ic2VydmFibGU8c3RyaW5nPiwgcmFkaXVzID0gMTAwMCwgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCBuYW1lTz86IE9ic2VydmFibGU8c3RyaW5nIHwgc3RyaW5nW10+LCBtaW5wcmljZT86IG51bWJlciwgbWF4cHJpY2U/OiBudW1iZXIsIG9wZW5ub3c/OiBib29sZWFuLCByYW5rYnk/OiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcsIHR5cGVzPzogc3RyaW5nIHwgc3RyaW5nW10pOiBPYnNlcnZhYmxlPElOZWFyYnlTZWFyY2hSZXNwb25zZT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGtleXdvcmRPLCBuYW1lTywgbG9jYXRpb25PKS5waXBlKGNvbmNhdE1hcCgoaTogYW55KSA9PiB0aGlzLl9uZWFyYnlTZWFyY2goaSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZW9jb2RlRnJvbVN5bmMoYWRkcmVzcz86IHN0cmluZywgY29tcG9uZW50cz86IHN0cmluZyB8IHN0cmluZ1tdLCBib3VuZHM/OiBzdHJpbmcgfCBJQm91bmRzLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHJlZ2lvbj86IHN0cmluZyk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9nZW9jb2RlKHtcbiAgICAgIGFkZHJlc3MsXG4gICAgICBjb21wb25lbnRzOiBwaXBlSm9pbihjb21wb25lbnRzKSxcbiAgICAgIGJvdW5kczogbm9ybWFsaXplQm91bmRzKGJvdW5kcyksXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIHJlZ2lvblxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdlb2NvZGVBZGRyZXNzT2JzZXJ2ZXIoYWRkcmVzczogT2JzZXJ2YWJsZTxzdHJpbmc+LCBjb21wb25lbnRzPzogc3RyaW5nIHwgc3RyaW5nW10sIGJvdW5kcz86IHN0cmluZyB8IElCb3VuZHMsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgcmVnaW9uPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIGFkZHJlc3MucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGFkZHIpOiBJR2VvY29kZUlucHV0ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcixcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IHBpcGVKb2luKGNvbXBvbmVudHMpLFxuICAgICAgICAgICAgYm91bmRzOiBub3JtYWxpemVCb3VuZHMoYm91bmRzKSxcbiAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgcmVnaW9uXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGNvbmNhdE1hcChpID0+IHRoaXMuX2dlb2NvZGUoaSkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnNlR2VvY29kZUZyb21TeW5jTG9jYXRpb24obGF0bG5nOiBzdHJpbmcgfCBQb3NpdGlvbiwgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCByZXN1bHRfdHlwZT86IHN0cmluZywgbG9jYXRpb25fdHlwZT86IHN0cmluZyk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXZlcnNlR2VvY29kZSh7XG4gICAgICBsYXRsbmc6IG5vcm1hbGl6ZUxvY2F0aW9uKGxhdGxuZyksXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIHJlc3VsdF90eXBlLFxuICAgICAgbG9jYXRpb25fdHlwZVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJldmVyc2VHZW9jb2RlTGF0TG5nT2JzZXJ2ZXIobGF0bG5nOiBPYnNlcnZhYmxlPHN0cmluZyB8IFBvc2l0aW9uPiB8IFByb21pc2U8c3RyaW5nIHwgUG9zaXRpb24+IHwgc3RyaW5nIHwgUG9zaXRpb24gPSBmcm9tKHRoaXMuZ2VvLmdldExvY2F0aW9uKCkudGhlbihwb3MgPT4gcG9zLnRvU3RyaW5nTG9jKCkpKSwgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCByZXN1bHRfdHlwZT86IHN0cmluZywgbG9jYXRpb25fdHlwZT86IHN0cmluZyk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiBub3JtYWxpemVPYnNlcnZhYmxlKGxhdGxuZykucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGxvYyk6IElSZXZlcnNlR2VvY29kZUlucHV0ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGF0bG5nOiBub3JtYWxpemVMb2NhdGlvbihsb2MpLFxuICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICByZXN1bHRfdHlwZSxcbiAgICAgICAgICAgIGxvY2F0aW9uX3R5cGVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgY29uY2F0TWFwKGkgPT4gdGhpcy5fcmV2ZXJzZUdlb2NvZGUoaSkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnNlR2VvY29kZUZyb21TeW5jUGxhY2VJRChwbGFjZV9pZDogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHJlc3VsdF90eXBlPzogc3RyaW5nLCBsb2NhdGlvbl90eXBlPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXZlcnNlR2VvY29kZSh7XG4gICAgICBwbGFjZV9pZCxcbiAgICAgIGxhbmd1YWdlLFxuICAgICAgcmVzdWx0X3R5cGUsXG4gICAgICBsb2NhdGlvbl90eXBlXG4gICAgfSkucGlwZShtYXAocmVzdWx0cyA9PiByZXN1bHRzWzBdKSk7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJzZUdlb2NvZGVQbGFjZUlET2JzZXJ2ZXIocGxhY2VfaWRPOiBPYnNlcnZhYmxlPHN0cmluZz4sIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgcmVzdWx0X3R5cGU/OiBzdHJpbmcsIGxvY2F0aW9uX3R5cGU/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHBsYWNlX2lkTy5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAocGxhY2VfaWQpOiBJUmV2ZXJzZUdlb2NvZGVJbnB1dCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBsYWNlX2lkLFxuICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICByZXN1bHRfdHlwZSxcbiAgICAgICAgICAgIGxvY2F0aW9uX3R5cGVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgY29uY2F0TWFwKGkgPT4gdGhpcy5fcmV2ZXJzZUdlb2NvZGUoaSkpLFxuICAgICAgbWFwKHJlc3VsdHMgPT4gcmVzdWx0c1swXSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHBsYWNlUHJlZGljdGlvbnNMb2NhdGlvbk9ic2VydmVyKFxuICAgIGlucHV0Pzogc3RyaW5nLFxuICAgIGxvY2F0aW9uOiBPYnNlcnZhYmxlPHN0cmluZyB8IFBvc2l0aW9uPiB8IFByb21pc2U8c3RyaW5nIHwgUG9zaXRpb24+IHwgc3RyaW5nIHwgUG9zaXRpb24gPSBmcm9tKHRoaXMuZ2VvLmdldExvY2F0aW9uKCkudGhlbihwb3MgPT4gcG9zLnRvU3RyaW5nTG9jKCkpKSxcbiAgICBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksXG4gICAgb2Zmc2V0OiBudW1iZXIgPSBpbnB1dC5sZW5ndGgsXG4gICAgcmFkaXVzPzogbnVtYmVyLFxuICAgIHR5cGVzPzogc3RyaW5nLFxuICAgIGNvbXBvbmVudHM/OiBzdHJpbmcsXG4gICAgYWRkcmVzcz86IHN0cmluZyxcbiAgICBzZWFyY2g/OiBzdHJpbmcsXG4gICAgdHlwZT86IHN0cmluZyxcbiAgICBsaW1pdD86IG51bWJlcixcbiAgICBuZWFyYnlSYWRpdXM/OiBudW1iZXIsXG4gICAgc2tpcE5hbWU/OiBib29sZWFuLFxuICAgIGRlYnVnPzogYm9vbGVhblxuICApOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gbm9ybWFsaXplT2JzZXJ2YWJsZShsb2NhdGlvbikucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGxvYyk6IElBdXRvY29tcGxldGVJbnB1dCB8IElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvbklucHV0ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICBvZmZzZXQsXG4gICAgICAgICAgICBsb2NhdGlvbjogbm9ybWFsaXplTG9jYXRpb24obG9jKSxcbiAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgdHlwZXMsXG4gICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgIHNlYXJjaCxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICBsaW1pdCxcbiAgICAgICAgICAgIG5lYXJieVJhZGl1cyxcbiAgICAgICAgICAgIHNraXBOYW1lLFxuICAgICAgICAgICAgZGVidWdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgY29uY2F0TWFwKGkgPT4gdGhpcy5fcGxhY2VQcmVkaWN0aW9ucyhpKSlcbiAgICApO1xuICB9XG4gIHB1YmxpYyBwbGFjZVByZWRpY3Rpb25zRnJvbVN5bmMobG9jYXRpb246IHN0cmluZyB8IFBvc2l0aW9uLCBpbnB1dD86IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCBvZmZzZXQ6IG51bWJlciA9IGlucHV0Lmxlbmd0aCwgcmFkaXVzPzogbnVtYmVyLCB0eXBlcz86IHN0cmluZywgY29tcG9uZW50cz86IHN0cmluZywgYWRkcmVzcz86IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCB0eXBlPzogc3RyaW5nLCBsaW1pdD86IG51bWJlciwgbmVhcmJ5UmFkaXVzPzogbnVtYmVyLCBza2lwTmFtZT86IGJvb2xlYW4sIGRlYnVnPzogYm9vbGVhbik6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9wbGFjZVByZWRpY3Rpb25zKHtcbiAgICAgIGlucHV0LFxuICAgICAgb2Zmc2V0LFxuICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvY2F0aW9uKSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIGxhbmd1YWdlLFxuICAgICAgdHlwZXMsXG4gICAgICBjb21wb25lbnRzLFxuICAgICAgYWRkcmVzcyxcbiAgICAgIHNlYXJjaCxcbiAgICAgIHR5cGUsXG4gICAgICBsaW1pdCxcbiAgICAgIG5lYXJieVJhZGl1cyxcbiAgICAgIHNraXBOYW1lLFxuICAgICAgZGVidWdcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZWFyYnlQbGFjZUNvZGVzRnJvbVN5bmMobG9jYXRpb246IHN0cmluZyB8IFBvc2l0aW9uLCByYWRpdXM/OiBudW1iZXIsIGtleXdvcmQ/OiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgbmFtZT86IHN0cmluZyB8IHN0cmluZ1tdLCBtaW5wcmljZT86IG51bWJlciwgbWF4cHJpY2U/OiBudW1iZXIsIG9wZW5ub3c/OiBib29sZWFuLCByYW5rYnk/OiBzdHJpbmcsIHR5cGVzPzogc3RyaW5nIHwgc3RyaW5nW10sIGFkZHJlc3M/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgdHlwZT86IHN0cmluZywgbGltaXQ/OiBudW1iZXIsIG5lYXJieVJhZGl1cz86IG51bWJlciwgc2tpcE5hbWU/OiBib29sZWFuLCBkZWJ1Zz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fbmVhcmJ5UGxhY2VDb2Rlcyh7XG4gICAgICBsb2NhdGlvbjogbm9ybWFsaXplTG9jYXRpb24obG9jYXRpb24pLFxuICAgICAgcmFkaXVzLFxuICAgICAga2V5d29yZCxcbiAgICAgIGxhbmd1YWdlLFxuICAgICAgbmFtZSxcbiAgICAgIG1pbnByaWNlLFxuICAgICAgbWF4cHJpY2UsXG4gICAgICBvcGVubm93LFxuICAgICAgcmFua2J5LFxuICAgICAgdHlwZXMsXG4gICAgICBhZGRyZXNzLFxuICAgICAgc2VhcmNoLFxuICAgICAgdHlwZSxcbiAgICAgIGxpbWl0LFxuICAgICAgbmVhcmJ5UmFkaXVzLFxuICAgICAgc2tpcE5hbWUsXG4gICAgICBkZWJ1Z1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVBZGRyZXNzTG9jYXRpb24oYWRkcmVzczogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHNlYXJjaD86IHN0cmluZywgdHlwZT86IHN0cmluZywgbGltaXQ/OiBudW1iZXIsIG5lYXJieVJhZGl1cz86IG51bWJlciwgc2tpcE5hbWU/OiBib29sZWFuLCBkZWJ1Zz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlQWRkcmVzc0xvY2F0aW9uKHtcbiAgICAgIGFkZHJlc3MsXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIHNlYXJjaCxcbiAgICAgIHR5cGUsXG4gICAgICBsaW1pdCxcbiAgICAgIG5lYXJieVJhZGl1cyxcbiAgICAgIHNraXBOYW1lLFxuICAgICAgZGVidWdcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50QWRkcmVzc2VzKGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KENBQ0hFX0tFWVMuYWRkcmVzc2VzLCBDQUNIRV9LRVlTLmFkZHJlc3NlcykudG9Qcm9taXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdlb1xuICAgICAgICAuZ2V0TG9jYXRpb24oZm9yY2VSZWZyZXNoKVxuICAgICAgICAudGhlbigocDogUG9zaXRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXZlcnNlR2VvY29kZUZyb21TeW5jTG9jYXRpb24ocCkudG9Qcm9taXNlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IHJldFZhbCA9IFtdO1xuICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldFZhbCA9IHJlcy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbihkLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBkLmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgIF9pZDogZC5pZCB8fCBkLmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgIF9nZW9sb2M6IHBvc2l0aW9uLnRvR2VvTG9jKHRydWUpLFxuICAgICAgICAgICAgICAgIGNvb3JkczogcG9zaXRpb24udG9Kc29uKClcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhY2hlLmFkZChDQUNIRV9LRVlTLmFkZHJlc3NlcywgQ0FDSEVfS0VZUy5hZGRyZXNzZXMsIHJldFZhbCk7XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcHVibGljIGdldFN0cmVldFZpZXcobGF0OiBudW1iZXIsIGxuZzogbnVtYmVyKSB7XG4gIC8vICAgbGV0IHVybD0gdGhpcy5hcGlVcmwrJ3N0cmVldFZpZXc/J1xuICAvLyB9XG5cbiAgcHJpdmF0ZSBnZXQgYXBpVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnR29vZ2xlTWFwcy8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXV0b2NvbXBsZXRlKGlucHV0OiBJQXV0b2NvbXBsZXRlSW5wdXQsIHF1ZXJ5OiBib29sZWFuKTogT2JzZXJ2YWJsZTxJQXV0b2NvbXBsZXRlUHJlZGljdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdChgJHt0aGlzLmFwaVVybH1wbGFjZS9hdXRvY29tcGxldGU/cXVlcnk9JHtxdWVyeX1gLCBpbnB1dCkucGlwZShcbiAgICAgIG1hcCgocmVzOiBJQXV0b2NvbXBsZXRlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcy5wcmVkaWN0aW9ucztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BsYWNlUHJlZGljdGlvbnMoaW5wdXQ6IElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvbklucHV0IHwgSUF1dG9jb21wbGV0ZUlucHV0KTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdwbGFjZS9wcmVkaWN0aW9ucycsIGlucHV0KTtcbiAgfVxuXG4gIHByaXZhdGUgX25lYXJieVBsYWNlQ29kZXMoaW5wdXQ6IElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvbklucHV0IHwgSU5lYXJieVNlYXJjaElucHV0KTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdwbGFjZS9uZWFyYnktcGxhY2UtY29kZXMnLCBpbnB1dCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNvbHZlQWRkcmVzc0xvY2F0aW9uKGlucHV0OiBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25JbnB1dCk6IE9ic2VydmFibGU8SVJlc29sdmVkQWRkcmVzc0xvY2F0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdyZXNvbHZlLWFkZHJlc3MtbG9jYXRpb24nLCBpbnB1dCk7XG4gIH1cblxuICBwcml2YXRlIF9uZWFyYnlTZWFyY2goaW5wdXQ6IElOZWFyYnlTZWFyY2hJbnB1dCk6IE9ic2VydmFibGU8SU5lYXJieVNlYXJjaFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdwbGFjZS9uZWFyYnknLCBpbnB1dCk7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0U2VhcmNoUmVzdWx0cyhuZXh0X3BhZ2VfdG9rZW46IHN0cmluZyk6IE9ic2VydmFibGU8SU5lYXJieVNlYXJjaFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdwbGFjZS9uZWFyYnknLCB7IG5leHRfcGFnZV90b2tlbiB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlb2NvZGUoaW5wdXQ6IElHZW9jb2RlSW5wdXQpOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYXBpVXJsICsgJ2dlb2NvZGUnLCBpbnB1dCkucGlwZShcbiAgICAgIG1hcCgocmVzOiBJR2VvY29kZVJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMucmVzdWx0cztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JldmVyc2VHZW9jb2RlKGlucHV0OiBJUmV2ZXJzZUdlb2NvZGVJbnB1dCk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5hcGlVcmwgKyAncmV2ZXJzZS1nZW9jb2RlJywgaW5wdXQpLnBpcGUoXG4gICAgICBtYXAoKHJlczogSVJldmVyc2VHZW9jb2RlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuaXFCeShyZXMucmVzdWx0cywgdCA9PiB0LmZvcm1hdHRlZF9hZGRyZXNzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19