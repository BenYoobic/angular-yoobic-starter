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
var Googlemaps = /** @class */ (function () {
    function Googlemaps(rq, geo, config, injector, network, cache) {
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
    Googlemaps.prototype.autocompleteFromSync = /**
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
    function (input, location, offset, radius, language, types, components, query) {
        if (offset === void 0) { offset = input.length; }
        if (radius === void 0) { radius = 100000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (query === void 0) { query = false; }
        return this._autocomplete({
            input: input,
            offset: offset,
            location: normalizeLocation(location),
            radius: radius,
            language: language,
            types: types,
            components: components
        }, query);
    };
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
    Googlemaps.prototype.autocompleteLocationObserver = /**
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
    function (input, offset, location, radius, language, types, components, query) {
        var _this = this;
        if (offset === void 0) { offset = input.length; }
        if (location === void 0) { location = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (query === void 0) { query = false; }
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                input: input,
                offset: offset,
                location: normalizeLocation(loc),
                radius: radius,
                language: language,
                types: types,
                components: components
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._autocomplete(i, query); })));
    };
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
    Googlemaps.prototype.autocompleteMultiObserver = /**
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
    function (inputO, offsetO, locationO, radius, language, types, components, query) {
        var _this = this;
        if (offsetO === void 0) { offsetO = inputO.pipe(map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.length; }))); }
        if (locationO === void 0) { locationO = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (query === void 0) { query = false; }
        return combineLatest(inputO, offsetO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._autocomplete(i, query); })));
    };
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
    Googlemaps.prototype.nearbySearchFromSync = /**
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
    function (location, radius, keyword, language, name, minprice, maxprice, opennow, rankby, type, types) {
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._nearbySearch({
            location: normalizeLocation(location),
            radius: radius,
            keyword: keyword,
            language: language,
            name: pipeJoin(name),
            minprice: minprice,
            maxprice: maxprice,
            opennow: opennow,
            rankby: rankby,
            type: type,
            types: pipeJoin(types)
        });
    };
    /**
     * @param {?} next_page_token
     * @return {?}
     */
    Googlemaps.prototype.nearbySearchNextResults = /**
     * @param {?} next_page_token
     * @return {?}
     */
    function (next_page_token) {
        return this._nextSearchResults(next_page_token);
    };
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
    Googlemaps.prototype.nearbySearchLocationObserver = /**
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
    function (location, radius, keyword, language, name, minprice, maxprice, opennow, rankby, type, types) {
        var _this = this;
        if (location === void 0) { location = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                location: normalizeLocation(loc),
                radius: radius,
                keyword: keyword,
                language: language,
                name: pipeJoin(name),
                minprice: minprice,
                maxprice: maxprice,
                opennow: opennow,
                rankby: rankby,
                type: type,
                types: pipeJoin(types)
            };
        })), concatMap((/**
         * @param {?} input
         * @return {?}
         */
        function (input) { return _this._nearbySearch(input); })));
    };
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
    Googlemaps.prototype.nearbySearchMultiObserver = /**
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
    function (locationO, keywordO, radius, language, nameO, minprice, maxprice, opennow, rankby, type, types) {
        var _this = this;
        if (locationO === void 0) { locationO = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (radius === void 0) { radius = 1000; }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return combineLatest(keywordO, nameO, locationO).pipe(concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._nearbySearch(i); })));
    };
    /**
     * @param {?=} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    Googlemaps.prototype.geocodeFromSync = /**
     * @param {?=} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    function (address, components, bounds, language, region) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._geocode({
            address: address,
            components: pipeJoin(components),
            bounds: normalizeBounds(bounds),
            language: language,
            region: region
        });
    };
    /**
     * @param {?} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    Googlemaps.prototype.geocodeAddressObserver = /**
     * @param {?} address
     * @param {?=} components
     * @param {?=} bounds
     * @param {?=} language
     * @param {?=} region
     * @return {?}
     */
    function (address, components, bounds, language, region) {
        var _this = this;
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return address.pipe(map((/**
         * @param {?} addr
         * @return {?}
         */
        function (addr) {
            return {
                address: addr,
                components: pipeJoin(components),
                bounds: normalizeBounds(bounds),
                language: language,
                region: region
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._geocode(i); })));
    };
    /**
     * @param {?} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodeFromSyncLocation = /**
     * @param {?} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (latlng, language, result_type, location_type) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._reverseGeocode({
            latlng: normalizeLocation(latlng),
            language: language,
            result_type: result_type,
            location_type: location_type
        });
    };
    /**
     * @param {?=} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodeLatLngObserver = /**
     * @param {?=} latlng
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (latlng, language, result_type, location_type) {
        var _this = this;
        if (latlng === void 0) { latlng = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return normalizeObservable(latlng).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                latlng: normalizeLocation(loc),
                language: language,
                result_type: result_type,
                location_type: location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._reverseGeocode(i); })));
    };
    /**
     * @param {?} place_id
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodeFromSyncPlaceID = /**
     * @param {?} place_id
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (place_id, language, result_type, location_type) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._reverseGeocode({
            place_id: place_id,
            language: language,
            result_type: result_type,
            location_type: location_type
        }).pipe(map((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results[0]; })));
    };
    /**
     * @param {?} place_idO
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    Googlemaps.prototype.reverseGeocodePlaceIDObserver = /**
     * @param {?} place_idO
     * @param {?=} language
     * @param {?=} result_type
     * @param {?=} location_type
     * @return {?}
     */
    function (place_idO, language, result_type, location_type) {
        var _this = this;
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return place_idO.pipe(map((/**
         * @param {?} place_id
         * @return {?}
         */
        function (place_id) {
            return {
                place_id: place_id,
                language: language,
                result_type: result_type,
                location_type: location_type
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._reverseGeocode(i); })), map((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results[0]; })));
    };
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
    Googlemaps.prototype.placePredictionsLocationObserver = /**
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
    function (input, location, language, offset, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        var _this = this;
        if (location === void 0) { location = from(this.geo.getLocation().then((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return pos.toStringLoc(); }))); }
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (offset === void 0) { offset = input.length; }
        return normalizeObservable(location).pipe(map((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) {
            return {
                input: input,
                offset: offset,
                location: normalizeLocation(loc),
                radius: radius,
                language: language,
                types: types,
                components: components,
                address: address,
                search: search,
                type: type,
                limit: limit,
                nearbyRadius: nearbyRadius,
                skipName: skipName,
                debug: debug
            };
        })), concatMap((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return _this._placePredictions(i); })));
    };
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
    Googlemaps.prototype.placePredictionsFromSync = /**
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
    function (location, input, language, offset, radius, types, components, address, search, type, limit, nearbyRadius, skipName, debug) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        if (offset === void 0) { offset = input.length; }
        return this._placePredictions({
            input: input,
            offset: offset,
            location: normalizeLocation(location),
            radius: radius,
            language: language,
            types: types,
            components: components,
            address: address,
            search: search,
            type: type,
            limit: limit,
            nearbyRadius: nearbyRadius,
            skipName: skipName,
            debug: debug
        });
    };
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
    Googlemaps.prototype.nearbyPlaceCodesFromSync = /**
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
    function (location, radius, keyword, language, name, minprice, maxprice, opennow, rankby, types, address, search, type, limit, nearbyRadius, skipName, debug) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._nearbyPlaceCodes({
            location: normalizeLocation(location),
            radius: radius,
            keyword: keyword,
            language: language,
            name: name,
            minprice: minprice,
            maxprice: maxprice,
            opennow: opennow,
            rankby: rankby,
            types: types,
            address: address,
            search: search,
            type: type,
            limit: limit,
            nearbyRadius: nearbyRadius,
            skipName: skipName,
            debug: debug
        });
    };
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
    Googlemaps.prototype.resolveAddressLocation = /**
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
    function (address, language, search, type, limit, nearbyRadius, skipName, debug) {
        if (language === void 0) { language = this.translate.getCurrentLanguage(); }
        return this._resolveAddressLocation({
            address: address,
            language: language,
            search: search,
            type: type,
            limit: limit,
            nearbyRadius: nearbyRadius,
            skipName: skipName,
            debug: debug
        });
    };
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    Googlemaps.prototype.getCurrentAddresses = /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
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
            function (p) {
                return _this.reverseGeocodeFromSyncLocation(p).toPromise();
            }))
                .then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                /** @type {?} */
                var retVal = [];
                if (res && res.length > 0) {
                    retVal = res.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        /** @type {?} */
                        var position = new Position(d.geometry.location);
                        return {
                            address: d.formatted_address,
                            _id: d.id || d.formatted_address,
                            _geoloc: position.toGeoLoc(true),
                            coords: position.toJson()
                        };
                    }));
                }
                _this.cache.add(CACHE_KEYS.addresses, CACHE_KEYS.addresses, retVal);
                return retVal;
            }));
        }
    };
    Object.defineProperty(Googlemaps.prototype, "apiUrl", {
        // public getStreetView(lat: number, lng: number) {
        //   let url= this.apiUrl+'streetView?'
        // }
        get: 
        // public getStreetView(lat: number, lng: number) {
        //   let url= this.apiUrl+'streetView?'
        // }
        /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiUrl + 'GoogleMaps/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} input
     * @param {?} query
     * @return {?}
     */
    Googlemaps.prototype._autocomplete = /**
     * @private
     * @param {?} input
     * @param {?} query
     * @return {?}
     */
    function (input, query) {
        return this.rq.post(this.apiUrl + "place/autocomplete?query=" + query, input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res.predictions;
        })));
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._placePredictions = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'place/predictions', input);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._nearbyPlaceCodes = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'place/nearby-place-codes', input);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._resolveAddressLocation = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'resolve-address-location', input);
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._nearbySearch = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'place/nearby', input);
    };
    /**
     * @private
     * @param {?} next_page_token
     * @return {?}
     */
    Googlemaps.prototype._nextSearchResults = /**
     * @private
     * @param {?} next_page_token
     * @return {?}
     */
    function (next_page_token) {
        return this.rq.post(this.apiUrl + 'place/nearby', { next_page_token: next_page_token });
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._geocode = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res.results;
        })));
    };
    /**
     * @private
     * @param {?} input
     * @return {?}
     */
    Googlemaps.prototype._reverseGeocode = /**
     * @private
     * @param {?} input
     * @return {?}
     */
    function (input) {
        return this.rq.post(this.apiUrl + 'reverse-geocode', input).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (isString(res)) {
                res = JSON.parse(res);
            }
            return uniqBy(res.results, (/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.formatted_address; }));
        })));
    };
    Googlemaps.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Googlemaps.ctorParameters = function () { return [
        { type: Requestor },
        { type: Smartloc },
        { type: Config },
        { type: Injector },
        { type: Network },
        { type: Cache }
    ]; };
    return Googlemaps;
}());
export { Googlemaps };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2dvb2dsZW1hcHMvZ29vZ2xlbWFwcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckQsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUlwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7QUFFN0MsU0FBUyxlQUFlLENBQUMsQ0FBbUI7SUFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFD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VkM7U0F6VlksVUFBVTs7Ozs7O0lBQ3JCLCtCQUE2Qjs7Ozs7SUFDakIsd0JBQXFCOzs7OztJQUFFLHlCQUFxQjs7Ozs7SUFBRSw0QkFBc0I7Ozs7O0lBQUUsOEJBQTRCOzs7OztJQUFFLDZCQUEwQjs7Ozs7SUFBRSwyQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lICovXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb3NpdGlvbiwgTmV0d29yayB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uL2NhY2hlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU21hcnRsb2MgfSBmcm9tICcuLi9zbWFydGxvYy9zbWFydGxvYy5zZXJ2aWNlJztcbmltcG9ydCB7IENBQ0hFX0tFWVMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NhY2hlL2NhY2hlLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IElBdXRvY29tcGxldGVJbnB1dCwgSUF1dG9jb21wbGV0ZVByZWRpY3Rpb24sIElBdXRvY29tcGxldGVSZXNwb25zZSwgSUJvdW5kcywgSUdlb2NvZGVJbnB1dCwgSUdlb2NvZGVSZXN1bHQsIElHZW9jb2RlUmVzcG9uc2UsIElOZWFyYnlTZWFyY2hJbnB1dCwgSU5lYXJieVNlYXJjaFJlc3BvbnNlLCBJUmV2ZXJzZUdlb2NvZGVJbnB1dCwgSVJldmVyc2VHZW9jb2RlUmVzcG9uc2UsIElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvbklucHV0LCBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25SZXN1bHQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2dvb2dsZW1hcHMvZ29vZ2xlbWFwcy5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBjb25jYXRNYXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGlzU3RyaW5nLCB1bmlxQnkgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5mdW5jdGlvbiBub3JtYWxpemVCb3VuZHMoYjogc3RyaW5nIHwgSUJvdW5kcyk6IHN0cmluZyB7XG4gIHJldHVybiBiID8gKHR5cGVvZiBiID09PSAnc3RyaW5nJyA/IGIgOiBiLnNvdXRod2VzdC5sYXQgKyAnLCcgKyBiLnNvdXRod2VzdC5sbmcgKyAnfCcgKyBiLm5vcnRoZWFzdC5sYXQgKyAnLCcgKyBiLm5vcnRoZWFzdC5sbmcpIDogJyc7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2F0aW9uKHA6IHN0cmluZyB8IFBvc2l0aW9uKTogc3RyaW5nIHtcbiAgcmV0dXJuIHAgPyAodHlwZW9mIHAgPT09ICdzdHJpbmcnID8gcCA6IHAudG9TdHJpbmdMb2MoKSkgOiAnJztcbn1cblxuZnVuY3Rpb24gcGlwZUpvaW4ocDogc3RyaW5nIHwgc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gcCA/ICh0eXBlb2YgcCA9PT0gJ3N0cmluZycgPyBwIDogcC5qb2luKCd8JykpIDogJyc7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU9ic2VydmFibGU8VD4obzogT2JzZXJ2YWJsZTxUPiB8IFByb21pc2U8VD4gfCBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBvIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSA/IG8gOiBmcm9tKFByb21pc2UucmVzb2x2ZShvKSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVtYXBzIHtcbiAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBycTogUmVxdWVzdG9yLCBwcml2YXRlIGdlbzogU21hcnRsb2MsIHByaXZhdGUgY29uZmlnOiBDb25maWcsIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsIHByb3RlY3RlZCBuZXR3b3JrOiBOZXR3b3JrLCBwcm90ZWN0ZWQgY2FjaGU6IENhY2hlKSB7XG4gICAgdGhpcy50cmFuc2xhdGUgPSB0aGlzLmluamVjdG9yLmdldDxUcmFuc2xhdGU+KFRyYW5zbGF0ZSk7XG4gIH1cblxuICBwdWJsaWMgYXV0b2NvbXBsZXRlRnJvbVN5bmMoaW5wdXQ6IHN0cmluZywgbG9jYXRpb246IHN0cmluZyB8IFBvc2l0aW9uLCBvZmZzZXQ6IG51bWJlciA9IGlucHV0Lmxlbmd0aCwgcmFkaXVzID0gMTAwMDAwLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHR5cGVzPzogc3RyaW5nLCBjb21wb25lbnRzPzogc3RyaW5nLCBxdWVyeSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxJQXV0b2NvbXBsZXRlUHJlZGljdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9jb21wbGV0ZShcbiAgICAgIHtcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIG9mZnNldCxcbiAgICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvY2F0aW9uKSxcbiAgICAgICAgcmFkaXVzLFxuICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgdHlwZXMsXG4gICAgICAgIGNvbXBvbmVudHNcbiAgICAgIH0sXG4gICAgICBxdWVyeVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXV0b2NvbXBsZXRlTG9jYXRpb25PYnNlcnZlcihpbnB1dDogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IGlucHV0Lmxlbmd0aCwgbG9jYXRpb246IE9ic2VydmFibGU8c3RyaW5nIHwgUG9zaXRpb24+IHwgUHJvbWlzZTxzdHJpbmcgfCBQb3NpdGlvbj4gfCBzdHJpbmcgfCBQb3NpdGlvbiA9IGZyb20odGhpcy5nZW8uZ2V0TG9jYXRpb24oKS50aGVuKHBvcyA9PiBwb3MudG9TdHJpbmdMb2MoKSkpLCByYWRpdXMgPSAxMDAwLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHR5cGVzPzogc3RyaW5nLCBjb21wb25lbnRzPzogc3RyaW5nLCBxdWVyeSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxJQXV0b2NvbXBsZXRlUHJlZGljdGlvbltdPiB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZU9ic2VydmFibGUobG9jYXRpb24pLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChsb2MpOiBJQXV0b2NvbXBsZXRlSW5wdXQgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIG9mZnNldCxcbiAgICAgICAgICAgIGxvY2F0aW9uOiBub3JtYWxpemVMb2NhdGlvbihsb2MpLFxuICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICB0eXBlcyxcbiAgICAgICAgICAgIGNvbXBvbmVudHNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgY29uY2F0TWFwKGkgPT4gdGhpcy5fYXV0b2NvbXBsZXRlKGksIHF1ZXJ5KSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGF1dG9jb21wbGV0ZU11bHRpT2JzZXJ2ZXIoaW5wdXRPOiBPYnNlcnZhYmxlPHN0cmluZz4sIG9mZnNldE86IE9ic2VydmFibGU8bnVtYmVyPiA9IGlucHV0Ty5waXBlKG1hcChzID0+IHMubGVuZ3RoKSksIGxvY2F0aW9uTzogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQb3NpdGlvbj4gPSBmcm9tKHRoaXMuZ2VvLmdldExvY2F0aW9uKCkudGhlbihwb3MgPT4gcG9zLnRvU3RyaW5nTG9jKCkpKSwgcmFkaXVzID0gMTAwMCwgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCB0eXBlcz86IHN0cmluZywgY29tcG9uZW50cz86IHN0cmluZywgcXVlcnkgPSBmYWxzZSk6IE9ic2VydmFibGU8SUF1dG9jb21wbGV0ZVByZWRpY3Rpb25bXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGlucHV0Tywgb2Zmc2V0TywgbG9jYXRpb25PKS5waXBlKGNvbmNhdE1hcCgoaTogYW55KSA9PiB0aGlzLl9hdXRvY29tcGxldGUoaSwgcXVlcnkpKSk7XG4gIH1cblxuICBwdWJsaWMgbmVhcmJ5U2VhcmNoRnJvbVN5bmMobG9jYXRpb246IHN0cmluZyB8IFBvc2l0aW9uLCByYWRpdXMgPSAxMDAwLCBrZXl3b3JkPzogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIG5hbWU/OiBzdHJpbmcgfCBzdHJpbmdbXSwgbWlucHJpY2U/OiBudW1iZXIsIG1heHByaWNlPzogbnVtYmVyLCBvcGVubm93PzogYm9vbGVhbiwgcmFua2J5Pzogc3RyaW5nLCB0eXBlPzogc3RyaW5nLCB0eXBlcz86IHN0cmluZyB8IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxJTmVhcmJ5U2VhcmNoUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fbmVhcmJ5U2VhcmNoKHtcbiAgICAgIGxvY2F0aW9uOiBub3JtYWxpemVMb2NhdGlvbihsb2NhdGlvbiksXG4gICAgICByYWRpdXMsXG4gICAgICBrZXl3b3JkLFxuICAgICAgbGFuZ3VhZ2UsXG4gICAgICBuYW1lOiBwaXBlSm9pbihuYW1lKSxcbiAgICAgIG1pbnByaWNlLFxuICAgICAgbWF4cHJpY2UsXG4gICAgICBvcGVubm93LFxuICAgICAgcmFua2J5LFxuICAgICAgdHlwZSxcbiAgICAgIHR5cGVzOiBwaXBlSm9pbih0eXBlcylcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZWFyYnlTZWFyY2hOZXh0UmVzdWx0cyhuZXh0X3BhZ2VfdG9rZW46IHN0cmluZyk6IE9ic2VydmFibGU8SU5lYXJieVNlYXJjaFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRTZWFyY2hSZXN1bHRzKG5leHRfcGFnZV90b2tlbik7XG4gIH1cblxuICBwdWJsaWMgbmVhcmJ5U2VhcmNoTG9jYXRpb25PYnNlcnZlcihsb2NhdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQb3NpdGlvbj4gfCBQcm9taXNlPHN0cmluZyB8IFBvc2l0aW9uPiB8IHN0cmluZyB8IFBvc2l0aW9uID0gZnJvbSh0aGlzLmdlby5nZXRMb2NhdGlvbigpLnRoZW4ocG9zID0+IHBvcy50b1N0cmluZ0xvYygpKSksIHJhZGl1cyA9IDEwMDAsIGtleXdvcmQ/OiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgbmFtZT86IHN0cmluZyB8IHN0cmluZ1tdLCBtaW5wcmljZT86IG51bWJlciwgbWF4cHJpY2U/OiBudW1iZXIsIG9wZW5ub3c/OiBib29sZWFuLCByYW5rYnk/OiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcsIHR5cGVzPzogc3RyaW5nIHwgc3RyaW5nW10pOiBPYnNlcnZhYmxlPElOZWFyYnlTZWFyY2hSZXNwb25zZT4ge1xuICAgIHJldHVybiBub3JtYWxpemVPYnNlcnZhYmxlKGxvY2F0aW9uKS5waXBlKFxuICAgICAgbWFwKFxuICAgICAgICAobG9jKTogSU5lYXJieVNlYXJjaElucHV0ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvYyksXG4gICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICBrZXl3b3JkLFxuICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICBuYW1lOiBwaXBlSm9pbihuYW1lKSxcbiAgICAgICAgICAgIG1pbnByaWNlLFxuICAgICAgICAgICAgbWF4cHJpY2UsXG4gICAgICAgICAgICBvcGVubm93LFxuICAgICAgICAgICAgcmFua2J5LFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHR5cGVzOiBwaXBlSm9pbih0eXBlcylcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApLFxuICAgICAgY29uY2F0TWFwKGlucHV0ID0+IHRoaXMuX25lYXJieVNlYXJjaChpbnB1dCkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBuZWFyYnlTZWFyY2hNdWx0aU9ic2VydmVyKGxvY2F0aW9uTzogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQb3NpdGlvbj4gPSBmcm9tKHRoaXMuZ2VvLmdldExvY2F0aW9uKCkudGhlbihwb3MgPT4gcG9zLnRvU3RyaW5nTG9jKCkpKSwga2V5d29yZE8/OiBPYnNlcnZhYmxlPHN0cmluZz4sIHJhZGl1cyA9IDEwMDAsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgbmFtZU8/OiBPYnNlcnZhYmxlPHN0cmluZyB8IHN0cmluZ1tdPiwgbWlucHJpY2U/OiBudW1iZXIsIG1heHByaWNlPzogbnVtYmVyLCBvcGVubm93PzogYm9vbGVhbiwgcmFua2J5Pzogc3RyaW5nLCB0eXBlPzogc3RyaW5nLCB0eXBlcz86IHN0cmluZyB8IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxJTmVhcmJ5U2VhcmNoUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChrZXl3b3JkTywgbmFtZU8sIGxvY2F0aW9uTykucGlwZShjb25jYXRNYXAoKGk6IGFueSkgPT4gdGhpcy5fbmVhcmJ5U2VhcmNoKGkpKSk7XG4gIH1cblxuICBwdWJsaWMgZ2VvY29kZUZyb21TeW5jKGFkZHJlc3M/OiBzdHJpbmcsIGNvbXBvbmVudHM/OiBzdHJpbmcgfCBzdHJpbmdbXSwgYm91bmRzPzogc3RyaW5nIHwgSUJvdW5kcywgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCByZWdpb24/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fZ2VvY29kZSh7XG4gICAgICBhZGRyZXNzLFxuICAgICAgY29tcG9uZW50czogcGlwZUpvaW4oY29tcG9uZW50cyksXG4gICAgICBib3VuZHM6IG5vcm1hbGl6ZUJvdW5kcyhib3VuZHMpLFxuICAgICAgbGFuZ3VhZ2UsXG4gICAgICByZWdpb25cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZW9jb2RlQWRkcmVzc09ic2VydmVyKGFkZHJlc3M6IE9ic2VydmFibGU8c3RyaW5nPiwgY29tcG9uZW50cz86IHN0cmluZyB8IHN0cmluZ1tdLCBib3VuZHM/OiBzdHJpbmcgfCBJQm91bmRzLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHJlZ2lvbj86IHN0cmluZyk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiBhZGRyZXNzLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChhZGRyKTogSUdlb2NvZGVJbnB1dCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHIsXG4gICAgICAgICAgICBjb21wb25lbnRzOiBwaXBlSm9pbihjb21wb25lbnRzKSxcbiAgICAgICAgICAgIGJvdW5kczogbm9ybWFsaXplQm91bmRzKGJvdW5kcyksXG4gICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgIHJlZ2lvblxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBjb25jYXRNYXAoaSA9PiB0aGlzLl9nZW9jb2RlKGkpKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJzZUdlb2NvZGVGcm9tU3luY0xvY2F0aW9uKGxhdGxuZzogc3RyaW5nIHwgUG9zaXRpb24sIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgcmVzdWx0X3R5cGU/OiBzdHJpbmcsIGxvY2F0aW9uX3R5cGU/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZUdlb2NvZGUoe1xuICAgICAgbGF0bG5nOiBub3JtYWxpemVMb2NhdGlvbihsYXRsbmcpLFxuICAgICAgbGFuZ3VhZ2UsXG4gICAgICByZXN1bHRfdHlwZSxcbiAgICAgIGxvY2F0aW9uX3R5cGVcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZXZlcnNlR2VvY29kZUxhdExuZ09ic2VydmVyKGxhdGxuZzogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQb3NpdGlvbj4gfCBQcm9taXNlPHN0cmluZyB8IFBvc2l0aW9uPiB8IHN0cmluZyB8IFBvc2l0aW9uID0gZnJvbSh0aGlzLmdlby5nZXRMb2NhdGlvbigpLnRoZW4ocG9zID0+IHBvcy50b1N0cmluZ0xvYygpKSksIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgcmVzdWx0X3R5cGU/OiBzdHJpbmcsIGxvY2F0aW9uX3R5cGU/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gbm9ybWFsaXplT2JzZXJ2YWJsZShsYXRsbmcpLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChsb2MpOiBJUmV2ZXJzZUdlb2NvZGVJbnB1dCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhdGxuZzogbm9ybWFsaXplTG9jYXRpb24obG9jKSxcbiAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgcmVzdWx0X3R5cGUsXG4gICAgICAgICAgICBsb2NhdGlvbl90eXBlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGNvbmNhdE1hcChpID0+IHRoaXMuX3JldmVyc2VHZW9jb2RlKGkpKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmV2ZXJzZUdlb2NvZGVGcm9tU3luY1BsYWNlSUQocGxhY2VfaWQ6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCByZXN1bHRfdHlwZT86IHN0cmluZywgbG9jYXRpb25fdHlwZT86IHN0cmluZyk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZUdlb2NvZGUoe1xuICAgICAgcGxhY2VfaWQsXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIHJlc3VsdF90eXBlLFxuICAgICAgbG9jYXRpb25fdHlwZVxuICAgIH0pLnBpcGUobWFwKHJlc3VsdHMgPT4gcmVzdWx0c1swXSkpO1xuICB9XG5cbiAgcHVibGljIHJldmVyc2VHZW9jb2RlUGxhY2VJRE9ic2VydmVyKHBsYWNlX2lkTzogT2JzZXJ2YWJsZTxzdHJpbmc+LCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIHJlc3VsdF90eXBlPzogc3RyaW5nLCBsb2NhdGlvbl90eXBlPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdD4ge1xuICAgIHJldHVybiBwbGFjZV9pZE8ucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKHBsYWNlX2lkKTogSVJldmVyc2VHZW9jb2RlSW5wdXQgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwbGFjZV9pZCxcbiAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgcmVzdWx0X3R5cGUsXG4gICAgICAgICAgICBsb2NhdGlvbl90eXBlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGNvbmNhdE1hcChpID0+IHRoaXMuX3JldmVyc2VHZW9jb2RlKGkpKSxcbiAgICAgIG1hcChyZXN1bHRzID0+IHJlc3VsdHNbMF0pXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwbGFjZVByZWRpY3Rpb25zTG9jYXRpb25PYnNlcnZlcihcbiAgICBpbnB1dD86IHN0cmluZyxcbiAgICBsb2NhdGlvbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQb3NpdGlvbj4gfCBQcm9taXNlPHN0cmluZyB8IFBvc2l0aW9uPiB8IHN0cmluZyB8IFBvc2l0aW9uID0gZnJvbSh0aGlzLmdlby5nZXRMb2NhdGlvbigpLnRoZW4ocG9zID0+IHBvcy50b1N0cmluZ0xvYygpKSksXG4gICAgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLFxuICAgIG9mZnNldDogbnVtYmVyID0gaW5wdXQubGVuZ3RoLFxuICAgIHJhZGl1cz86IG51bWJlcixcbiAgICB0eXBlcz86IHN0cmluZyxcbiAgICBjb21wb25lbnRzPzogc3RyaW5nLFxuICAgIGFkZHJlc3M/OiBzdHJpbmcsXG4gICAgc2VhcmNoPzogc3RyaW5nLFxuICAgIHR5cGU/OiBzdHJpbmcsXG4gICAgbGltaXQ/OiBudW1iZXIsXG4gICAgbmVhcmJ5UmFkaXVzPzogbnVtYmVyLFxuICAgIHNraXBOYW1lPzogYm9vbGVhbixcbiAgICBkZWJ1Zz86IGJvb2xlYW5cbiAgKTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZU9ic2VydmFibGUobG9jYXRpb24pLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChsb2MpOiBJQXV0b2NvbXBsZXRlSW5wdXQgfCBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25JbnB1dCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgb2Zmc2V0LFxuICAgICAgICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvYyksXG4gICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgIHR5cGVzLFxuICAgICAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICBzZWFyY2gsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgbGltaXQsXG4gICAgICAgICAgICBuZWFyYnlSYWRpdXMsXG4gICAgICAgICAgICBza2lwTmFtZSxcbiAgICAgICAgICAgIGRlYnVnXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGNvbmNhdE1hcChpID0+IHRoaXMuX3BsYWNlUHJlZGljdGlvbnMoaSkpXG4gICAgKTtcbiAgfVxuICBwdWJsaWMgcGxhY2VQcmVkaWN0aW9uc0Zyb21TeW5jKGxvY2F0aW9uOiBzdHJpbmcgfCBQb3NpdGlvbiwgaW5wdXQ/OiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgb2Zmc2V0OiBudW1iZXIgPSBpbnB1dC5sZW5ndGgsIHJhZGl1cz86IG51bWJlciwgdHlwZXM/OiBzdHJpbmcsIGNvbXBvbmVudHM/OiBzdHJpbmcsIGFkZHJlc3M/OiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgdHlwZT86IHN0cmluZywgbGltaXQ/OiBudW1iZXIsIG5lYXJieVJhZGl1cz86IG51bWJlciwgc2tpcE5hbWU/OiBib29sZWFuLCBkZWJ1Zz86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fcGxhY2VQcmVkaWN0aW9ucyh7XG4gICAgICBpbnB1dCxcbiAgICAgIG9mZnNldCxcbiAgICAgIGxvY2F0aW9uOiBub3JtYWxpemVMb2NhdGlvbihsb2NhdGlvbiksXG4gICAgICByYWRpdXMsXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIHR5cGVzLFxuICAgICAgY29tcG9uZW50cyxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBzZWFyY2gsXG4gICAgICB0eXBlLFxuICAgICAgbGltaXQsXG4gICAgICBuZWFyYnlSYWRpdXMsXG4gICAgICBza2lwTmFtZSxcbiAgICAgIGRlYnVnXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmVhcmJ5UGxhY2VDb2Rlc0Zyb21TeW5jKGxvY2F0aW9uOiBzdHJpbmcgfCBQb3NpdGlvbiwgcmFkaXVzPzogbnVtYmVyLCBrZXl3b3JkPzogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCksIG5hbWU/OiBzdHJpbmcgfCBzdHJpbmdbXSwgbWlucHJpY2U/OiBudW1iZXIsIG1heHByaWNlPzogbnVtYmVyLCBvcGVubm93PzogYm9vbGVhbiwgcmFua2J5Pzogc3RyaW5nLCB0eXBlcz86IHN0cmluZyB8IHN0cmluZ1tdLCBhZGRyZXNzPzogc3RyaW5nLCBzZWFyY2g/OiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcsIGxpbWl0PzogbnVtYmVyLCBuZWFyYnlSYWRpdXM/OiBudW1iZXIsIHNraXBOYW1lPzogYm9vbGVhbiwgZGVidWc/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25lYXJieVBsYWNlQ29kZXMoe1xuICAgICAgbG9jYXRpb246IG5vcm1hbGl6ZUxvY2F0aW9uKGxvY2F0aW9uKSxcbiAgICAgIHJhZGl1cyxcbiAgICAgIGtleXdvcmQsXG4gICAgICBsYW5ndWFnZSxcbiAgICAgIG5hbWUsXG4gICAgICBtaW5wcmljZSxcbiAgICAgIG1heHByaWNlLFxuICAgICAgb3Blbm5vdyxcbiAgICAgIHJhbmtieSxcbiAgICAgIHR5cGVzLFxuICAgICAgYWRkcmVzcyxcbiAgICAgIHNlYXJjaCxcbiAgICAgIHR5cGUsXG4gICAgICBsaW1pdCxcbiAgICAgIG5lYXJieVJhZGl1cyxcbiAgICAgIHNraXBOYW1lLFxuICAgICAgZGVidWdcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlQWRkcmVzc0xvY2F0aW9uKGFkZHJlc3M6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCBzZWFyY2g/OiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcsIGxpbWl0PzogbnVtYmVyLCBuZWFyYnlSYWRpdXM/OiBudW1iZXIsIHNraXBOYW1lPzogYm9vbGVhbiwgZGVidWc/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZUFkZHJlc3NMb2NhdGlvbih7XG4gICAgICBhZGRyZXNzLFxuICAgICAgbGFuZ3VhZ2UsXG4gICAgICBzZWFyY2gsXG4gICAgICB0eXBlLFxuICAgICAgbGltaXQsXG4gICAgICBuZWFyYnlSYWRpdXMsXG4gICAgICBza2lwTmFtZSxcbiAgICAgIGRlYnVnXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudEFkZHJlc3Nlcyhmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChDQUNIRV9LRVlTLmFkZHJlc3NlcywgQ0FDSEVfS0VZUy5hZGRyZXNzZXMpLnRvUHJvbWlzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZW9cbiAgICAgICAgLmdldExvY2F0aW9uKGZvcmNlUmVmcmVzaClcbiAgICAgICAgLnRoZW4oKHA6IFBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmV2ZXJzZUdlb2NvZGVGcm9tU3luY0xvY2F0aW9uKHApLnRvUHJvbWlzZSgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCByZXRWYWwgPSBbXTtcbiAgICAgICAgICBpZiAocmVzICYmIHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXRWYWwgPSByZXMubWFwKGQgPT4ge1xuICAgICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oZC5nZW9tZXRyeS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczogZC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBfaWQ6IGQuaWQgfHwgZC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBfZ2VvbG9jOiBwb3NpdGlvbi50b0dlb0xvYyh0cnVlKSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHBvc2l0aW9uLnRvSnNvbigpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYWNoZS5hZGQoQ0FDSEVfS0VZUy5hZGRyZXNzZXMsIENBQ0hFX0tFWVMuYWRkcmVzc2VzLCByZXRWYWwpO1xuICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHB1YmxpYyBnZXRTdHJlZXRWaWV3KGxhdDogbnVtYmVyLCBsbmc6IG51bWJlcikge1xuICAvLyAgIGxldCB1cmw9IHRoaXMuYXBpVXJsKydzdHJlZXRWaWV3PydcbiAgLy8gfVxuXG4gIHByaXZhdGUgZ2V0IGFwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXBpVXJsICsgJ0dvb2dsZU1hcHMvJztcbiAgfVxuXG4gIHByaXZhdGUgX2F1dG9jb21wbGV0ZShpbnB1dDogSUF1dG9jb21wbGV0ZUlucHV0LCBxdWVyeTogYm9vbGVhbik6IE9ic2VydmFibGU8SUF1dG9jb21wbGV0ZVByZWRpY3Rpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QoYCR7dGhpcy5hcGlVcmx9cGxhY2UvYXV0b2NvbXBsZXRlP3F1ZXJ5PSR7cXVlcnl9YCwgaW5wdXQpLnBpcGUoXG4gICAgICBtYXAoKHJlczogSUF1dG9jb21wbGV0ZVJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldHVybiByZXMucHJlZGljdGlvbnM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9wbGFjZVByZWRpY3Rpb25zKGlucHV0OiBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25JbnB1dCB8IElBdXRvY29tcGxldGVJbnB1dCk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5hcGlVcmwgKyAncGxhY2UvcHJlZGljdGlvbnMnLCBpbnB1dCk7XG4gIH1cblxuICBwcml2YXRlIF9uZWFyYnlQbGFjZUNvZGVzKGlucHV0OiBJUmVzb2x2ZWRBZGRyZXNzTG9jYXRpb25JbnB1dCB8IElOZWFyYnlTZWFyY2hJbnB1dCk6IE9ic2VydmFibGU8SUdlb2NvZGVSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5hcGlVcmwgKyAncGxhY2UvbmVhcmJ5LXBsYWNlLWNvZGVzJywgaW5wdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzb2x2ZUFkZHJlc3NMb2NhdGlvbihpbnB1dDogSVJlc29sdmVkQWRkcmVzc0xvY2F0aW9uSW5wdXQpOiBPYnNlcnZhYmxlPElSZXNvbHZlZEFkZHJlc3NMb2NhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5hcGlVcmwgKyAncmVzb2x2ZS1hZGRyZXNzLWxvY2F0aW9uJywgaW5wdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmVhcmJ5U2VhcmNoKGlucHV0OiBJTmVhcmJ5U2VhcmNoSW5wdXQpOiBPYnNlcnZhYmxlPElOZWFyYnlTZWFyY2hSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5hcGlVcmwgKyAncGxhY2UvbmVhcmJ5JywgaW5wdXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFNlYXJjaFJlc3VsdHMobmV4dF9wYWdlX3Rva2VuOiBzdHJpbmcpOiBPYnNlcnZhYmxlPElOZWFyYnlTZWFyY2hSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodGhpcy5hcGlVcmwgKyAncGxhY2UvbmVhcmJ5JywgeyBuZXh0X3BhZ2VfdG9rZW4gfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZW9jb2RlKGlucHV0OiBJR2VvY29kZUlucHV0KTogT2JzZXJ2YWJsZTxJR2VvY29kZVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdnZW9jb2RlJywgaW5wdXQpLnBpcGUoXG4gICAgICBtYXAoKHJlczogSUdlb2NvZGVSZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzLnJlc3VsdHM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9yZXZlcnNlR2VvY29kZShpbnB1dDogSVJldmVyc2VHZW9jb2RlSW5wdXQpOiBPYnNlcnZhYmxlPElHZW9jb2RlUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYXBpVXJsICsgJ3JldmVyc2UtZ2VvY29kZScsIGlucHV0KS5waXBlKFxuICAgICAgbWFwKChyZXM6IElSZXZlcnNlR2VvY29kZVJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChpc1N0cmluZyhyZXMpKSB7XG4gICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmlxQnkocmVzLnJlc3VsdHMsIHQgPT4gdC5mb3JtYXR0ZWRfYWRkcmVzcyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==