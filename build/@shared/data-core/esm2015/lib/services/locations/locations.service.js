/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Network } from '@shared/common';
import { Broker } from '../broker/broker.service';
import { Smartloc } from '../smartloc/smartloc.service';
import { Requestor } from '../requestor/requestor.service';
import { Googlemaps } from '../googlemaps/googlemaps.service';
import { Authentication } from '../authentication/authentication.service';
import { Config } from '../config/config.service';
import { Session } from '../session/session.service';
import { Cache } from '../cache/cache.service';
import { CACHE_KEYS } from '../../interfaces/cache/cache.interface';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNumber } from 'lodash-es';
export class Locations {
    /**
     * @param {?} geoloc
     * @param {?} broker
     * @param {?} rq
     * @param {?} config
     * @param {?} session
     * @param {?} network
     * @param {?} cache
     * @param {?} authentication
     * @param {?} googleMaps
     */
    constructor(geoloc, broker, rq, config, session, network, cache, authentication, googleMaps) {
        this.geoloc = geoloc;
        this.broker = broker;
        this.rq = rq;
        this.config = config;
        this.session = session;
        this.network = network;
        this.cache = cache;
        this.authentication = authentication;
        this.googleMaps = googleMaps;
    }
    /**
     * @param {?} position
     * @param {?=} maxPoints
     * @return {?}
     */
    loadMarkers(position, maxPoints = 5000) {
        position = position || this.geoloc.defaultPosition;
        /** @type {?} */
        let filters = [
            [
                {
                    field: '_geoloc',
                    operator: { _id: 'nearSphere' },
                    value: [position.longitude, position.latitude],
                    max: 40000
                }
            ]
        ];
        return this.broker.getAll('locations', ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return this.getMarkers(retVal.data);
        })));
    }
    /**
     * @param {?} locations
     * @return {?}
     */
    getMarkers(locations) {
        return this.broker.getMarkers(locations);
    }
    /**
     * @param {?} collectionName
     * @param {?=} maxPoints
     * @param {?=} fields
     * @param {?=} filters
     * @param {?=} subQuery
     * @return {?}
     */
    getMarkersData(collectionName, maxPoints = 5000, fields, filters, subQuery) {
        return this.broker.getAll(collectionName, fields || ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints, false, subQuery).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            /** @type {?} */
            let markers = this.getMarkers(retVal.data);
            /** @type {?} */
            let legendColors = {
                available: 'energized',
                booked: 'info',
                validated: 'success',
                rejected: 'danger',
                tobevalidated: 'royal',
                archived: 'dark'
            };
            return { markers, legendColors };
        })));
    }
    /**
     * @return {?}
     */
    getLegendColors() {
        /** @type {?} */
        let legendColors = {
            available: 'energized',
            booked: 'info',
            validated: 'success',
            rejected: 'danger',
            tobevalidated: 'royal',
            archived: 'dark'
        };
        return legendColors;
    }
    /**
     * @param {?} locationIds
     * @param {?=} userId
     * @return {?}
     */
    getLastVisitDate(locationIds, userId) {
        /** @type {?} */
        let filters = [[{ field: 'locationRef', operator: { _id: 'inq' }, value: locationIds }, { field: 'ownerRef', operator: { _id: 'eq' }, value: userId || this.session.userId }, { field: 'status', operator: { _id: 'eq' }, value: 'finished' }]];
        /** @type {?} */
        let options = [
            {
                $group: {
                    _id: '$locationRef',
                    finishedDate: { $max: '$finishedDate' },
                    count: { $sum: 1 }
                }
            }
        ];
        return this.broker.aggregateQuery('missions', filters, options, null, null, false, null);
    }
    /**
     * @param {?=} position
     * @return {?}
     */
    getStatsAndDistanceTransformAsync(position) {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    if (position) {
                        res.data = this.calculateDistanceAndKpiData(res, position);
                    }
                    /** @type {?} */
                    let ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    (location) => location._id));
                    this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    dates => {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        (location) => {
                            /** @type {?} */
                            let date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            d => d._id === location._id));
                            if (date && date.finishedDate) {
                                location.lastVisit = date.finishedDate;
                                location.countVisits = date.count;
                            }
                            observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                            observer.complete();
                        }));
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    }
    /**
     * @return {?}
     */
    getDistanceTransform() {
        return this.geoloc.getLocation().then((/**
         * @param {?} position
         * @return {?}
         */
        (position) => {
            return (/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                return new Observable((/**
                 * @param {?} observer
                 * @return {?}
                 */
                (observer) => {
                    if (res && res.data && res.data.length > 0) {
                        res.data = this.calculateDistanceAndKpiData(res, position);
                        observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                        observer.complete();
                    }
                    else {
                        observer.next({ count: 0, data: [] });
                        observer.complete();
                    }
                }));
            });
        }));
    }
    /**
     * @param {?} position
     * @return {?}
     */
    getDistanceAndLastVisitTransform(position) {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    res.data = this.calculateDistanceAndKpiData(res, position);
                    /** @type {?} */
                    let ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    (location) => location._id));
                    this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    dates => {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        (location) => {
                            /** @type {?} */
                            let date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            d => d._id === location._id));
                            if (date && date.finishedDate) {
                                location.lastVisit = date.finishedDate;
                                location.countVisits = date.count;
                            }
                            observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                            observer.complete();
                        }));
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    }
    /**
     * @param {?} res
     * @param {?} position
     * @return {?}
     */
    calculateDistanceAndKpiData(res, position) {
        /** @type {?} */
        let retVal = res.data.map((/**
         * @param {?} location
         * @return {?}
         */
        (location) => {
            if (location._geoloc && position && isNumber(position.latitude) && isNumber(position.longitude)) {
                location.distance = this.geoloc.getDistance(position.latitude, position.longitude, location._geoloc[1], location._geoloc[0]);
            }
            /** @type {?} */
            let oldKpiData = (/** @type {?} */ (location.kpiData));
            /** @type {?} */
            let kpiData = [];
            if (this.session.tenant && this.session.tenant.locationKpis && this.session.tenant.locationKpis.length > 0) {
                this.session.tenant.locationKpis.forEach((/**
                 * @param {?} kpi
                 * @return {?}
                 */
                kpi => {
                    if (this.authentication.isAdmin() || (kpi.category === 'healthscore' && this.authentication.hasRole('healthscore')) || (kpi.category !== 'healthscore' && this.authentication.hasRole('storeinsights'))) {
                        kpiData.push({
                            category: kpi.category,
                            value: oldKpiData && oldKpiData[kpi.category] ? oldKpiData[kpi.category].value : null,
                            icon: kpi.icon,
                            extraSymbol: kpi.extraSymbol,
                            variation: oldKpiData && oldKpiData[kpi.category] ? oldKpiData[kpi.category].variation : null
                        });
                    }
                }));
            }
            location.kpiData = kpiData;
            return location;
        }));
        //retVal = orderBy(retVal, ['distance']);
        return retVal;
    }
    /**
     * @param {?} aroundMe
     * @param {?} stats
     * @param {?} forceRefresh
     * @return {?}
     */
    getAroundMeFilter(aroundMe, stats, forceRefresh) {
        /** @type {?} */
        let filters;
        /** @type {?} */
        let sortModel;
        /** @type {?} */
        let mapTransform;
        return this.geoloc.getLocation(forceRefresh).then((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            mapTransform = stats ? this.getStatsAndDistanceTransformAsync(res) : this.getDistanceAndLastVisitTransform(res);
            if (!aroundMe || !res) {
                filters = [[]];
                sortModel = [{ colId: 'title', sort: 'asc' }];
            }
            else {
                sortModel = [];
                filters = [
                    [
                        {
                            field: '_geoloc',
                            operator: { _id: 'nearSphere' },
                            value: [res.longitude, res.latitude],
                            max: 40000
                        }
                    ]
                ];
            }
            return { filters, sortModel, mapTransform, position: res };
        }));
    }
    /**
     * @return {?}
     */
    getLocationTypesTransform() {
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        (res, search, filters, start, pageSize) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    /** @type {?} */
                    let ids = res.data.map((/**
                     * @param {?} type
                     * @return {?}
                     */
                    (type) => type._id));
                    this.getLocationTypesStat(ids).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    stats => {
                        res.data.forEach((/**
                         * @param {?} locationType
                         * @return {?}
                         */
                        (locationType) => {
                            /** @type {?} */
                            let stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            s => s._id === locationType._id));
                            /** @type {?} */
                            let count = stat ? stat.count || 0 : 0;
                            locationType.count = count;
                        }));
                        observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                        observer.complete();
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    }
    /**
     * @param {?} locationTypeIds
     * @return {?}
     */
    getLocationTypesStat(locationTypeIds) {
        /** @type {?} */
        let filters = [[{ field: 'typeRef', operator: { _id: 'inq' }, value: locationTypeIds }]];
        /** @type {?} */
        let options = [
            {
                $project: {
                    _id: '$typeRef'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    count: { $sum: 1 }
                }
            }
        ];
        return this.broker.aggregateQuery('locations', filters, options);
    }
    /**
     * @param {?} locationId
     * @param {?=} nbDays
     * @return {?}
     */
    getHealthscore(locationId, nbDays = [7, 30, 90]) {
        if (this.network.isOffline()) {
            return from(this.cache.get(CACHE_KEYS.healthscore, locationId));
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + 'locations/healthScore?storeId=' + locationId + '&days=[' + nbDays.toString() + ']';
            return this.rq.get(url).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                /** @type {?} */
                let retVal = ret.data ? ret.data : ret;
                this.cache.add(CACHE_KEYS.healthscore, locationId, retVal);
                return retVal;
            })));
        }
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    getUserLocations(userId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getUserLocations';
        return this.rq.post(url, { userId });
    }
}
Locations.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Locations.ctorParameters = () => [
    { type: Smartloc },
    { type: Broker },
    { type: Requestor },
    { type: Config },
    { type: Session },
    { type: Network },
    { type: Cache },
    { type: Authentication },
    { type: Googlemaps }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Locations.prototype.geoloc;
    /**
     * @type {?}
     * @private
     */
    Locations.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.session;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.network;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.cache;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.authentication;
    /**
     * @type {?}
     * @protected
     */
    Locations.prototype.googleMaps;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYXRpb25zL2xvY2F0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUlwRSxPQUFPLEVBQUUsVUFBVSxFQUFZLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUdyQyxNQUFNLE9BQU8sU0FBUzs7Ozs7Ozs7Ozs7O0lBQ3BCLFlBQW9CLE1BQWdCLEVBQVUsTUFBYyxFQUFZLEVBQWEsRUFBWSxNQUFjLEVBQVksT0FBZ0IsRUFBWSxPQUFnQixFQUFZLEtBQVksRUFBWSxjQUE4QixFQUFZLFVBQXNCO1FB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WUFITCxjQUFjO1lBRGQsVUFBVTs7Ozs7OztJQW1CTCwyQkFBd0I7Ozs7O0lBQUUsMkJBQXNCOzs7OztJQUFFLHVCQUF1Qjs7Ozs7SUFBRSwyQkFBd0I7Ozs7O0lBQUUsNEJBQTBCOzs7OztJQUFFLDRCQUEwQjs7Ozs7SUFBRSwwQkFBc0I7Ozs7O0lBQUUsbUNBQXdDOzs7OztJQUFFLCtCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElQb3NpdGlvbiwgTmV0d29yayB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IEJyb2tlciB9IGZyb20gJy4uL2Jyb2tlci9icm9rZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTbWFydGxvYyB9IGZyb20gJy4uL3NtYXJ0bG9jL3NtYXJ0bG9jLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZW1hcHMgfSBmcm9tICcuLi9nb29nbGVtYXBzL2dvb2dsZW1hcHMuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4uL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uL2NhY2hlL2NhY2hlLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbG9jYXRpb24vbG9jYXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IExvY2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbG9jYXRpb24tdHlwZS9sb2NhdGlvbi10eXBlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBSZXNwb25zZU9iamVjdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcmVzcG9uc2Utb2JqZWN0L3Jlc3BvbnNlLW9iamVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ0FDSEVfS0VZUyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY2FjaGUvY2FjaGUuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgRmlsdGVycywgU3ViUXVlcnksIElIZWFsdGhzY29yZSwgSVNvcnQsIElLcGlEYXRhIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2F0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2VvbG9jOiBTbWFydGxvYywgcHJpdmF0ZSBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZywgcHJvdGVjdGVkIHNlc3Npb246IFNlc3Npb24sIHByb3RlY3RlZCBuZXR3b3JrOiBOZXR3b3JrLCBwcm90ZWN0ZWQgY2FjaGU6IENhY2hlLCBwcm90ZWN0ZWQgYXV0aGVudGljYXRpb246IEF1dGhlbnRpY2F0aW9uLCBwcm90ZWN0ZWQgZ29vZ2xlTWFwczogR29vZ2xlbWFwcykge31cblxuICBsb2FkTWFya2Vycyhwb3NpdGlvbjogSVBvc2l0aW9uLCBtYXhQb2ludHMgPSA1MDAwKSB7XG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCB0aGlzLmdlb2xvYy5kZWZhdWx0UG9zaXRpb247XG4gICAgbGV0IGZpbHRlcnMgPSBbXG4gICAgICBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZDogJ19nZW9sb2MnLFxuICAgICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ25lYXJTcGhlcmUnIH0sXG4gICAgICAgICAgdmFsdWU6IFtwb3NpdGlvbi5sb25naXR1ZGUsIHBvc2l0aW9uLmxhdGl0dWRlXSxcbiAgICAgICAgICBtYXg6IDQwMDAwXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ2xvY2F0aW9ucycsIFsnX2lkJywgJ3RpdGxlJywgJ19nZW9sb2MnLCAnYWRkcmVzcyddLCBudWxsLCBudWxsLCBmaWx0ZXJzLCBudWxsLCAwLCBtYXhQb2ludHMpLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFya2VycyhyZXRWYWwuZGF0YSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRNYXJrZXJzKGxvY2F0aW9uczogQXJyYXk8TG9jYXRpb24+KSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldE1hcmtlcnMobG9jYXRpb25zKTtcbiAgfVxuXG4gIGdldE1hcmtlcnNEYXRhKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIG1heFBvaW50czogbnVtYmVyID0gNTAwMCwgZmllbGRzPzogQXJyYXk8c3RyaW5nPiwgZmlsdGVycz86IEZpbHRlcnMsIHN1YlF1ZXJ5PzogU3ViUXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QWxsKGNvbGxlY3Rpb25OYW1lLCBmaWVsZHMgfHwgWydfaWQnLCAndGl0bGUnLCAnX2dlb2xvYycsICdhZGRyZXNzJ10sIG51bGwsIG51bGwsIGZpbHRlcnMsIG51bGwsIDAsIG1heFBvaW50cywgZmFsc2UsIHN1YlF1ZXJ5KS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGxldCBtYXJrZXJzID0gdGhpcy5nZXRNYXJrZXJzKHJldFZhbC5kYXRhKTtcbiAgICAgICAgbGV0IGxlZ2VuZENvbG9ycyA9IHtcbiAgICAgICAgICBhdmFpbGFibGU6ICdlbmVyZ2l6ZWQnLFxuICAgICAgICAgIGJvb2tlZDogJ2luZm8nLFxuICAgICAgICAgIHZhbGlkYXRlZDogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIHJlamVjdGVkOiAnZGFuZ2VyJyxcbiAgICAgICAgICB0b2JldmFsaWRhdGVkOiAncm95YWwnLFxuICAgICAgICAgIGFyY2hpdmVkOiAnZGFyaydcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgbWFya2VycywgbGVnZW5kQ29sb3JzIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRMZWdlbmRDb2xvcnMoKSB7XG4gICAgbGV0IGxlZ2VuZENvbG9ycyA9IHtcbiAgICAgIGF2YWlsYWJsZTogJ2VuZXJnaXplZCcsXG4gICAgICBib29rZWQ6ICdpbmZvJyxcbiAgICAgIHZhbGlkYXRlZDogJ3N1Y2Nlc3MnLFxuICAgICAgcmVqZWN0ZWQ6ICdkYW5nZXInLFxuICAgICAgdG9iZXZhbGlkYXRlZDogJ3JveWFsJyxcbiAgICAgIGFyY2hpdmVkOiAnZGFyaydcbiAgICB9O1xuICAgIHJldHVybiBsZWdlbmRDb2xvcnM7XG4gIH1cblxuICBnZXRMYXN0VmlzaXREYXRlKGxvY2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+LCB1c2VySWQ/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFycmF5PHsgX2lkOiBzdHJpbmc7IGZpbmlzaGVkRGF0ZTogRGF0ZTsgY291bnQ6IG51bWJlciB9Pj4ge1xuICAgIGxldCBmaWx0ZXJzOiBGaWx0ZXJzID0gW1t7IGZpZWxkOiAnbG9jYXRpb25SZWYnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiBsb2NhdGlvbklkcyB9LCB7IGZpZWxkOiAnb3duZXJSZWYnLCBvcGVyYXRvcjogeyBfaWQ6ICdlcScgfSwgdmFsdWU6IHVzZXJJZCB8fCB0aGlzLnNlc3Npb24udXNlcklkIH0sIHsgZmllbGQ6ICdzdGF0dXMnLCBvcGVyYXRvcjogeyBfaWQ6ICdlcScgfSwgdmFsdWU6ICdmaW5pc2hlZCcgfV1dO1xuXG4gICAgbGV0IG9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgIF9pZDogJyRsb2NhdGlvblJlZicsXG4gICAgICAgICAgZmluaXNoZWREYXRlOiB7ICRtYXg6ICckZmluaXNoZWREYXRlJyB9LFxuICAgICAgICAgIGNvdW50OiB7ICRzdW06IDEgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuYWdncmVnYXRlUXVlcnkoJ21pc3Npb25zJywgZmlsdGVycywgb3B0aW9ucywgbnVsbCwgbnVsbCwgZmFsc2UsIG51bGwpO1xuICB9XG5cbiAgZ2V0U3RhdHNBbmREaXN0YW5jZVRyYW5zZm9ybUFzeW5jKHBvc2l0aW9uPzogSVBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIChyZXM6IFJlc3BvbnNlT2JqZWN0KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+KChvYnNlcnZlcjogT2JzZXJ2ZXI8UmVzcG9uc2VPYmplY3Q+KSA9PiB7XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgcmVzLmRhdGEgPSB0aGlzLmNhbGN1bGF0ZURpc3RhbmNlQW5kS3BpRGF0YShyZXMsIHBvc2l0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGlkcyA9IHJlcy5kYXRhLm1hcCgobG9jYXRpb246IExvY2F0aW9uKSA9PiBsb2NhdGlvbi5faWQpO1xuICAgICAgICAgIHRoaXMuZ2V0TGFzdFZpc2l0RGF0ZShpZHMpLnN1YnNjcmliZShkYXRlcyA9PiB7XG4gICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlcy5maW5kKGQgPT4gZC5faWQgPT09IGxvY2F0aW9uLl9pZCk7XG4gICAgICAgICAgICAgIGlmIChkYXRlICYmIGRhdGUuZmluaXNoZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ubGFzdFZpc2l0ID0gZGF0ZS5maW5pc2hlZERhdGU7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uY291bnRWaXNpdHMgPSBkYXRlLmNvdW50O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogcmVzLmNvdW50LCBkYXRhOiA8YW55PnJlcy5kYXRhIH0pO1xuICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZ2V0RGlzdGFuY2VUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VvbG9jLmdldExvY2F0aW9uKCkudGhlbigocG9zaXRpb246IElQb3NpdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIChyZXM6IFJlc3BvbnNlT2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZU9iamVjdD4oKG9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZU9iamVjdD4pID0+IHtcbiAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcy5kYXRhID0gdGhpcy5jYWxjdWxhdGVEaXN0YW5jZUFuZEtwaURhdGEocmVzLCBwb3NpdGlvbik7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgY291bnQ6IHJlcy5jb3VudCwgZGF0YTogPGFueT5yZXMuZGF0YSB9KTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0RGlzdGFuY2VBbmRMYXN0VmlzaXRUcmFuc2Zvcm0ocG9zaXRpb246IElQb3NpdGlvbikge1xuICAgIHJldHVybiAocmVzOiBSZXNwb25zZU9iamVjdCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT2JqZWN0PikgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXMuZGF0YSA9IHRoaXMuY2FsY3VsYXRlRGlzdGFuY2VBbmRLcGlEYXRhKHJlcywgcG9zaXRpb24pO1xuICAgICAgICAgIGxldCBpZHMgPSByZXMuZGF0YS5tYXAoKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4gbG9jYXRpb24uX2lkKTtcbiAgICAgICAgICB0aGlzLmdldExhc3RWaXNpdERhdGUoaWRzKS5zdWJzY3JpYmUoZGF0ZXMgPT4ge1xuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgobG9jYXRpb246IExvY2F0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBkYXRlID0gZGF0ZXMuZmluZChkID0+IGQuX2lkID09PSBsb2NhdGlvbi5faWQpO1xuICAgICAgICAgICAgICBpZiAoZGF0ZSAmJiBkYXRlLmZpbmlzaGVkRGF0ZSkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmxhc3RWaXNpdCA9IGRhdGUuZmluaXNoZWREYXRlO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmNvdW50VmlzaXRzID0gZGF0ZS5jb3VudDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgY291bnQ6IHJlcy5jb3VudCwgZGF0YTogPGFueT5yZXMuZGF0YSB9KTtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGNhbGN1bGF0ZURpc3RhbmNlQW5kS3BpRGF0YShyZXM6IFJlc3BvbnNlT2JqZWN0LCBwb3NpdGlvbjogSVBvc2l0aW9uKSB7XG4gICAgbGV0IHJldFZhbCA9IHJlcy5kYXRhLm1hcCgobG9jYXRpb246IExvY2F0aW9uKSA9PiB7XG4gICAgICBpZiAobG9jYXRpb24uX2dlb2xvYyAmJiBwb3NpdGlvbiAmJiBpc051bWJlcihwb3NpdGlvbi5sYXRpdHVkZSkgJiYgaXNOdW1iZXIocG9zaXRpb24ubG9uZ2l0dWRlKSkge1xuICAgICAgICBsb2NhdGlvbi5kaXN0YW5jZSA9IHRoaXMuZ2VvbG9jLmdldERpc3RhbmNlKHBvc2l0aW9uLmxhdGl0dWRlLCBwb3NpdGlvbi5sb25naXR1ZGUsIGxvY2F0aW9uLl9nZW9sb2NbMV0sIGxvY2F0aW9uLl9nZW9sb2NbMF0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgb2xkS3BpRGF0YTogT2JqZWN0ID0gbG9jYXRpb24ua3BpRGF0YSBhcyBhbnk7XG4gICAgICBsZXQga3BpRGF0YTogQXJyYXk8SUtwaURhdGE+ID0gW107XG4gICAgICBpZiAodGhpcy5zZXNzaW9uLnRlbmFudCAmJiB0aGlzLnNlc3Npb24udGVuYW50LmxvY2F0aW9uS3BpcyAmJiB0aGlzLnNlc3Npb24udGVuYW50LmxvY2F0aW9uS3Bpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi50ZW5hbnQubG9jYXRpb25LcGlzLmZvckVhY2goa3BpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvbi5pc0FkbWluKCkgfHwgKGtwaS5jYXRlZ29yeSA9PT0gJ2hlYWx0aHNjb3JlJyAmJiB0aGlzLmF1dGhlbnRpY2F0aW9uLmhhc1JvbGUoJ2hlYWx0aHNjb3JlJykpIHx8IChrcGkuY2F0ZWdvcnkgIT09ICdoZWFsdGhzY29yZScgJiYgdGhpcy5hdXRoZW50aWNhdGlvbi5oYXNSb2xlKCdzdG9yZWluc2lnaHRzJykpKSB7XG4gICAgICAgICAgICBrcGlEYXRhLnB1c2goe1xuICAgICAgICAgICAgICBjYXRlZ29yeToga3BpLmNhdGVnb3J5LFxuICAgICAgICAgICAgICB2YWx1ZTogb2xkS3BpRGF0YSAmJiBvbGRLcGlEYXRhW2twaS5jYXRlZ29yeV0gPyBvbGRLcGlEYXRhW2twaS5jYXRlZ29yeV0udmFsdWUgOiBudWxsLFxuICAgICAgICAgICAgICBpY29uOiBrcGkuaWNvbixcbiAgICAgICAgICAgICAgZXh0cmFTeW1ib2w6IGtwaS5leHRyYVN5bWJvbCxcbiAgICAgICAgICAgICAgdmFyaWF0aW9uOiBvbGRLcGlEYXRhICYmIG9sZEtwaURhdGFba3BpLmNhdGVnb3J5XSA/IG9sZEtwaURhdGFba3BpLmNhdGVnb3J5XS52YXJpYXRpb24gOiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9jYXRpb24ua3BpRGF0YSA9IGtwaURhdGE7XG5cbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9KTtcbiAgICAvL3JldFZhbCA9IG9yZGVyQnkocmV0VmFsLCBbJ2Rpc3RhbmNlJ10pO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBnZXRBcm91bmRNZUZpbHRlcihhcm91bmRNZTogYm9vbGVhbiwgc3RhdHM6IGJvb2xlYW4sIGZvcmNlUmVmcmVzaDogYm9vbGVhbik6IFByb21pc2U8eyBmaWx0ZXJzOiBGaWx0ZXJzOyBzb3J0TW9kZWw6IElTb3J0W107IG1hcFRyYW5zZm9ybTogYW55OyBwb3NpdGlvbjogSVBvc2l0aW9uIH0+IHtcbiAgICBsZXQgZmlsdGVyczogRmlsdGVycztcbiAgICBsZXQgc29ydE1vZGVsOiBBcnJheTxhbnk+O1xuICAgIGxldCBtYXBUcmFuc2Zvcm06IGFueTtcbiAgICByZXR1cm4gdGhpcy5nZW9sb2MuZ2V0TG9jYXRpb24oZm9yY2VSZWZyZXNoKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgbWFwVHJhbnNmb3JtID0gc3RhdHMgPyB0aGlzLmdldFN0YXRzQW5kRGlzdGFuY2VUcmFuc2Zvcm1Bc3luYyhyZXMpIDogdGhpcy5nZXREaXN0YW5jZUFuZExhc3RWaXNpdFRyYW5zZm9ybShyZXMpO1xuICAgICAgaWYgKCFhcm91bmRNZSB8fCAhcmVzKSB7XG4gICAgICAgIGZpbHRlcnMgPSBbW11dO1xuICAgICAgICBzb3J0TW9kZWwgPSBbeyBjb2xJZDogJ3RpdGxlJywgc29ydDogJ2FzYycgfV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzb3J0TW9kZWwgPSBbXTtcbiAgICAgICAgZmlsdGVycyA9IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpZWxkOiAnX2dlb2xvYycsXG4gICAgICAgICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ25lYXJTcGhlcmUnIH0sXG4gICAgICAgICAgICAgIHZhbHVlOiBbcmVzLmxvbmdpdHVkZSwgcmVzLmxhdGl0dWRlXSxcbiAgICAgICAgICAgICAgbWF4OiA0MDAwMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGZpbHRlcnMsIHNvcnRNb2RlbCwgbWFwVHJhbnNmb3JtLCBwb3NpdGlvbjogcmVzIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRMb2NhdGlvblR5cGVzVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiAocmVzOiBSZXNwb25zZU9iamVjdCwgc2VhcmNoLCBmaWx0ZXJzLCBzdGFydCwgcGFnZVNpemUpID0+IHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZU9iamVjdD4oKG9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZU9iamVjdD4pID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IGlkcyA9IHJlcy5kYXRhLm1hcCgodHlwZTogTG9jYXRpb25UeXBlKSA9PiB0eXBlLl9pZCk7XG4gICAgICAgICAgdGhpcy5nZXRMb2NhdGlvblR5cGVzU3RhdChpZHMpLnN1YnNjcmliZShzdGF0cyA9PiB7XG4gICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChsb2NhdGlvblR5cGU6IExvY2F0aW9uVHlwZSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgc3RhdCA9IHN0YXRzLmZpbmQocyA9PiBzLl9pZCA9PT0gbG9jYXRpb25UeXBlLl9pZCk7XG4gICAgICAgICAgICAgIGxldCBjb3VudCA9IHN0YXQgPyBzdGF0LmNvdW50IHx8IDAgOiAwO1xuICAgICAgICAgICAgICBsb2NhdGlvblR5cGUuY291bnQgPSBjb3VudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiByZXMuY291bnQsIGRhdGE6IDxhbnk+cmVzLmRhdGEgfSk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGdldExvY2F0aW9uVHlwZXNTdGF0KGxvY2F0aW9uVHlwZUlkczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8QXJyYXk8eyBfaWQ6IHN0cmluZzsgY291bnQ6IG51bWJlciB9Pj4ge1xuICAgIGxldCBmaWx0ZXJzOiBGaWx0ZXJzID0gW1t7IGZpZWxkOiAndHlwZVJlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IGxvY2F0aW9uVHlwZUlkcyB9XV07XG4gICAgbGV0IG9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgICRwcm9qZWN0OiB7XG4gICAgICAgICAgX2lkOiAnJHR5cGVSZWYnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgIF9pZDogJyRfaWQnLFxuICAgICAgICAgIGNvdW50OiB7ICRzdW06IDEgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuYWdncmVnYXRlUXVlcnkoJ2xvY2F0aW9ucycsIGZpbHRlcnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0SGVhbHRoc2NvcmUobG9jYXRpb25JZDogc3RyaW5nLCBuYkRheXM6IEFycmF5PG51bWJlcj4gPSBbNywgMzAsIDkwXSk6IE9ic2VydmFibGU8QXJyYXk8SUhlYWx0aHNjb3JlPj4ge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuY2FjaGUuZ2V0KENBQ0hFX0tFWVMuaGVhbHRoc2NvcmUsIGxvY2F0aW9uSWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdsb2NhdGlvbnMvaGVhbHRoU2NvcmU/c3RvcmVJZD0nICsgbG9jYXRpb25JZCArICcmZGF5cz1bJyArIG5iRGF5cy50b1N0cmluZygpICsgJ10nO1xuICAgICAgcmV0dXJuIHRoaXMucnEuZ2V0KHVybCkucGlwZShcbiAgICAgICAgbWFwKHJldCA9PiB7XG4gICAgICAgICAgbGV0IHJldFZhbCA9IHJldC5kYXRhID8gcmV0LmRhdGEgOiByZXQ7XG4gICAgICAgICAgdGhpcy5jYWNoZS5hZGQoQ0FDSEVfS0VZUy5oZWFsdGhzY29yZSwgbG9jYXRpb25JZCwgcmV0VmFsKTtcbiAgICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnZXRVc2VyTG9jYXRpb25zKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL2dldFVzZXJMb2NhdGlvbnMnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVzZXJJZCB9KTtcbiAgfVxufVxuIl19