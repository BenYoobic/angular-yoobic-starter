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
var Locations = /** @class */ (function () {
    function Locations(geoloc, broker, rq, config, session, network, cache, authentication, googleMaps) {
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
    Locations.prototype.loadMarkers = /**
     * @param {?} position
     * @param {?=} maxPoints
     * @return {?}
     */
    function (position, maxPoints) {
        var _this = this;
        if (maxPoints === void 0) { maxPoints = 5000; }
        position = position || this.geoloc.defaultPosition;
        /** @type {?} */
        var filters = [
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
        function (retVal) {
            return _this.getMarkers(retVal.data);
        })));
    };
    /**
     * @param {?} locations
     * @return {?}
     */
    Locations.prototype.getMarkers = /**
     * @param {?} locations
     * @return {?}
     */
    function (locations) {
        return this.broker.getMarkers(locations);
    };
    /**
     * @param {?} collectionName
     * @param {?=} maxPoints
     * @param {?=} fields
     * @param {?=} filters
     * @param {?=} subQuery
     * @return {?}
     */
    Locations.prototype.getMarkersData = /**
     * @param {?} collectionName
     * @param {?=} maxPoints
     * @param {?=} fields
     * @param {?=} filters
     * @param {?=} subQuery
     * @return {?}
     */
    function (collectionName, maxPoints, fields, filters, subQuery) {
        var _this = this;
        if (maxPoints === void 0) { maxPoints = 5000; }
        return this.broker.getAll(collectionName, fields || ['_id', 'title', '_geoloc', 'address'], null, null, filters, null, 0, maxPoints, false, subQuery).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var markers = _this.getMarkers(retVal.data);
            /** @type {?} */
            var legendColors = {
                available: 'energized',
                booked: 'info',
                validated: 'success',
                rejected: 'danger',
                tobevalidated: 'royal',
                archived: 'dark'
            };
            return { markers: markers, legendColors: legendColors };
        })));
    };
    /**
     * @return {?}
     */
    Locations.prototype.getLegendColors = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var legendColors = {
            available: 'energized',
            booked: 'info',
            validated: 'success',
            rejected: 'danger',
            tobevalidated: 'royal',
            archived: 'dark'
        };
        return legendColors;
    };
    /**
     * @param {?} locationIds
     * @param {?=} userId
     * @return {?}
     */
    Locations.prototype.getLastVisitDate = /**
     * @param {?} locationIds
     * @param {?=} userId
     * @return {?}
     */
    function (locationIds, userId) {
        /** @type {?} */
        var filters = [[{ field: 'locationRef', operator: { _id: 'inq' }, value: locationIds }, { field: 'ownerRef', operator: { _id: 'eq' }, value: userId || this.session.userId }, { field: 'status', operator: { _id: 'eq' }, value: 'finished' }]];
        /** @type {?} */
        var options = [
            {
                $group: {
                    _id: '$locationRef',
                    finishedDate: { $max: '$finishedDate' },
                    count: { $sum: 1 }
                }
            }
        ];
        return this.broker.aggregateQuery('missions', filters, options, null, null, false, null);
    };
    /**
     * @param {?=} position
     * @return {?}
     */
    Locations.prototype.getStatsAndDistanceTransformAsync = /**
     * @param {?=} position
     * @return {?}
     */
    function (position) {
        var _this = this;
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    if (position) {
                        res.data = _this.calculateDistanceAndKpiData(res, position);
                    }
                    /** @type {?} */
                    var ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    function (location) { return location._id; }));
                    _this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    function (dates) {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        function (location) {
                            /** @type {?} */
                            var date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return d._id === location._id; }));
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
    };
    /**
     * @return {?}
     */
    Locations.prototype.getDistanceTransform = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.geoloc.getLocation().then((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            return (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                return new Observable((/**
                 * @param {?} observer
                 * @return {?}
                 */
                function (observer) {
                    if (res && res.data && res.data.length > 0) {
                        res.data = _this.calculateDistanceAndKpiData(res, position);
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
    };
    /**
     * @param {?} position
     * @return {?}
     */
    Locations.prototype.getDistanceAndLastVisitTransform = /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        var _this = this;
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    res.data = _this.calculateDistanceAndKpiData(res, position);
                    /** @type {?} */
                    var ids = res.data.map((/**
                     * @param {?} location
                     * @return {?}
                     */
                    function (location) { return location._id; }));
                    _this.getLastVisitDate(ids).subscribe((/**
                     * @param {?} dates
                     * @return {?}
                     */
                    function (dates) {
                        res.data.forEach((/**
                         * @param {?} location
                         * @return {?}
                         */
                        function (location) {
                            /** @type {?} */
                            var date = dates.find((/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return d._id === location._id; }));
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
    };
    /**
     * @param {?} res
     * @param {?} position
     * @return {?}
     */
    Locations.prototype.calculateDistanceAndKpiData = /**
     * @param {?} res
     * @param {?} position
     * @return {?}
     */
    function (res, position) {
        var _this = this;
        /** @type {?} */
        var retVal = res.data.map((/**
         * @param {?} location
         * @return {?}
         */
        function (location) {
            if (location._geoloc && position && isNumber(position.latitude) && isNumber(position.longitude)) {
                location.distance = _this.geoloc.getDistance(position.latitude, position.longitude, location._geoloc[1], location._geoloc[0]);
            }
            /** @type {?} */
            var oldKpiData = (/** @type {?} */ (location.kpiData));
            /** @type {?} */
            var kpiData = [];
            if (_this.session.tenant && _this.session.tenant.locationKpis && _this.session.tenant.locationKpis.length > 0) {
                _this.session.tenant.locationKpis.forEach((/**
                 * @param {?} kpi
                 * @return {?}
                 */
                function (kpi) {
                    if (_this.authentication.isAdmin() || (kpi.category === 'healthscore' && _this.authentication.hasRole('healthscore')) || (kpi.category !== 'healthscore' && _this.authentication.hasRole('storeinsights'))) {
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
    };
    /**
     * @param {?} aroundMe
     * @param {?} stats
     * @param {?} forceRefresh
     * @return {?}
     */
    Locations.prototype.getAroundMeFilter = /**
     * @param {?} aroundMe
     * @param {?} stats
     * @param {?} forceRefresh
     * @return {?}
     */
    function (aroundMe, stats, forceRefresh) {
        var _this = this;
        /** @type {?} */
        var filters;
        /** @type {?} */
        var sortModel;
        /** @type {?} */
        var mapTransform;
        return this.geoloc.getLocation(forceRefresh).then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            mapTransform = stats ? _this.getStatsAndDistanceTransformAsync(res) : _this.getDistanceAndLastVisitTransform(res);
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
            return { filters: filters, sortModel: sortModel, mapTransform: mapTransform, position: res };
        }));
    };
    /**
     * @return {?}
     */
    Locations.prototype.getLocationTypesTransform = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        function (res, search, filters, start, pageSize) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    /** @type {?} */
                    var ids = res.data.map((/**
                     * @param {?} type
                     * @return {?}
                     */
                    function (type) { return type._id; }));
                    _this.getLocationTypesStat(ids).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    function (stats) {
                        res.data.forEach((/**
                         * @param {?} locationType
                         * @return {?}
                         */
                        function (locationType) {
                            /** @type {?} */
                            var stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return s._id === locationType._id; }));
                            /** @type {?} */
                            var count = stat ? stat.count || 0 : 0;
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
    };
    /**
     * @param {?} locationTypeIds
     * @return {?}
     */
    Locations.prototype.getLocationTypesStat = /**
     * @param {?} locationTypeIds
     * @return {?}
     */
    function (locationTypeIds) {
        /** @type {?} */
        var filters = [[{ field: 'typeRef', operator: { _id: 'inq' }, value: locationTypeIds }]];
        /** @type {?} */
        var options = [
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
    };
    /**
     * @param {?} locationId
     * @param {?=} nbDays
     * @return {?}
     */
    Locations.prototype.getHealthscore = /**
     * @param {?} locationId
     * @param {?=} nbDays
     * @return {?}
     */
    function (locationId, nbDays) {
        var _this = this;
        if (nbDays === void 0) { nbDays = [7, 30, 90]; }
        if (this.network.isOffline()) {
            return from(this.cache.get(CACHE_KEYS.healthscore, locationId));
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'locations/healthScore?storeId=' + locationId + '&days=[' + nbDays.toString() + ']';
            return this.rq.get(url).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                /** @type {?} */
                var retVal = ret.data ? ret.data : ret;
                _this.cache.add(CACHE_KEYS.healthscore, locationId, retVal);
                return retVal;
            })));
        }
    };
    /**
     * @param {?} userId
     * @return {?}
     */
    Locations.prototype.getUserLocations = /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getUserLocations';
        return this.rq.post(url, { userId: userId });
    };
    Locations.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Locations.ctorParameters = function () { return [
        { type: Smartloc },
        { type: Broker },
        { type: Requestor },
        { type: Config },
        { type: Session },
        { type: Network },
        { type: Cache },
        { type: Authentication },
        { type: Googlemaps }
    ]; };
    return Locations;
}());
export { Locations };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYXRpb25zL2xvY2F0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUlwRSxPQUFPLEVBQUUsVUFBVSxFQUFZLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVyQztJQUVFLG1CQUFvQixNQUFnQixFQUFVLE1BQWMsRUFBWSxFQUFhLEVBQVksTUFBYyxFQUFZLE9BQWdCLEVBQVksT0FBZ0IsRUFBWSxLQUFZLEVBQVksY0FBOEIsRUFBWSxVQUFzQjtRQUF2UCxXQUFNLEdBQU4sTUFBTSxDQUFVO1FB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QWdDO1FBQy9ELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2dCQTdQRixVQUFVOzs7O2dCQW5CRixRQUFRO2dCQURSLE1BQU07Z0JBRU4sU0FBUztnQkFHVCxNQUFNO2dCQUNOLE9BQU87Z0JBUEksT0FBTztnQkFRbEIsS0FBSztnQkFITCxjQUFjO2dCQURkLFVBQVU7O0lBK1FuQixnQkFBQztDQUFBLEFBOVBELElBOFBDO1NBN1BZLFNBQVM7Ozs7OztJQUNSLDJCQUF3Qjs7Ozs7SUFBRSwyQkFBc0I7Ozs7O0lBQUUsdUJBQXVCOzs7OztJQUFFLDJCQUF3Qjs7Ozs7SUFBRSw0QkFBMEI7Ozs7O0lBQUUsNEJBQTBCOzs7OztJQUFFLDBCQUFzQjs7Ozs7SUFBRSxtQ0FBd0M7Ozs7O0lBQUUsK0JBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBvc2l0aW9uLCBOZXR3b3JrIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgQnJva2VyIH0gZnJvbSAnLi4vYnJva2VyL2Jyb2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNtYXJ0bG9jIH0gZnJvbSAnLi4vc21hcnRsb2Mvc21hcnRsb2Muc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlbWFwcyB9IGZyb20gJy4uL2dvb2dsZW1hcHMvZ29vZ2xlbWFwcy5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi4vYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vY2FjaGUvY2FjaGUuc2VydmljZSc7XG5cbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi9sb2NhdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTG9jYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi10eXBlL2xvY2F0aW9uLXR5cGUuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqZWN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDQUNIRV9LRVlTIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jYWNoZS9jYWNoZS5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzLCBTdWJRdWVyeSwgSUhlYWx0aHNjb3JlLCBJU29ydCwgSUtwaURhdGEgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYXRpb25zIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnZW9sb2M6IFNtYXJ0bG9jLCBwcml2YXRlIGJyb2tlcjogQnJva2VyLCBwcm90ZWN0ZWQgcnE6IFJlcXVlc3RvciwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgc2Vzc2lvbjogU2Vzc2lvbiwgcHJvdGVjdGVkIG5ldHdvcms6IE5ldHdvcmssIHByb3RlY3RlZCBjYWNoZTogQ2FjaGUsIHByb3RlY3RlZCBhdXRoZW50aWNhdGlvbjogQXV0aGVudGljYXRpb24sIHByb3RlY3RlZCBnb29nbGVNYXBzOiBHb29nbGVtYXBzKSB7fVxuXG4gIGxvYWRNYXJrZXJzKHBvc2l0aW9uOiBJUG9zaXRpb24sIG1heFBvaW50cyA9IDUwMDApIHtcbiAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IHRoaXMuZ2VvbG9jLmRlZmF1bHRQb3NpdGlvbjtcbiAgICBsZXQgZmlsdGVycyA9IFtcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIGZpZWxkOiAnX2dlb2xvYycsXG4gICAgICAgICAgb3BlcmF0b3I6IHsgX2lkOiAnbmVhclNwaGVyZScgfSxcbiAgICAgICAgICB2YWx1ZTogW3Bvc2l0aW9uLmxvbmdpdHVkZSwgcG9zaXRpb24ubGF0aXR1ZGVdLFxuICAgICAgICAgIG1heDogNDAwMDBcbiAgICAgICAgfVxuICAgICAgXVxuICAgIF07XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldEFsbCgnbG9jYXRpb25zJywgWydfaWQnLCAndGl0bGUnLCAnX2dlb2xvYycsICdhZGRyZXNzJ10sIG51bGwsIG51bGwsIGZpbHRlcnMsIG51bGwsIDAsIG1heFBvaW50cykucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYXJrZXJzKHJldFZhbC5kYXRhKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldE1hcmtlcnMobG9jYXRpb25zOiBBcnJheTxMb2NhdGlvbj4pIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0TWFya2Vycyhsb2NhdGlvbnMpO1xuICB9XG5cbiAgZ2V0TWFya2Vyc0RhdGEoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgbWF4UG9pbnRzOiBudW1iZXIgPSA1MDAwLCBmaWVsZHM/OiBBcnJheTxzdHJpbmc+LCBmaWx0ZXJzPzogRmlsdGVycywgc3ViUXVlcnk/OiBTdWJRdWVyeSkge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoY29sbGVjdGlvbk5hbWUsIGZpZWxkcyB8fCBbJ19pZCcsICd0aXRsZScsICdfZ2VvbG9jJywgJ2FkZHJlc3MnXSwgbnVsbCwgbnVsbCwgZmlsdGVycywgbnVsbCwgMCwgbWF4UG9pbnRzLCBmYWxzZSwgc3ViUXVlcnkpLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgbGV0IG1hcmtlcnMgPSB0aGlzLmdldE1hcmtlcnMocmV0VmFsLmRhdGEpO1xuICAgICAgICBsZXQgbGVnZW5kQ29sb3JzID0ge1xuICAgICAgICAgIGF2YWlsYWJsZTogJ2VuZXJnaXplZCcsXG4gICAgICAgICAgYm9va2VkOiAnaW5mbycsXG4gICAgICAgICAgdmFsaWRhdGVkOiAnc3VjY2VzcycsXG4gICAgICAgICAgcmVqZWN0ZWQ6ICdkYW5nZXInLFxuICAgICAgICAgIHRvYmV2YWxpZGF0ZWQ6ICdyb3lhbCcsXG4gICAgICAgICAgYXJjaGl2ZWQ6ICdkYXJrJ1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4geyBtYXJrZXJzLCBsZWdlbmRDb2xvcnMgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldExlZ2VuZENvbG9ycygpIHtcbiAgICBsZXQgbGVnZW5kQ29sb3JzID0ge1xuICAgICAgYXZhaWxhYmxlOiAnZW5lcmdpemVkJyxcbiAgICAgIGJvb2tlZDogJ2luZm8nLFxuICAgICAgdmFsaWRhdGVkOiAnc3VjY2VzcycsXG4gICAgICByZWplY3RlZDogJ2RhbmdlcicsXG4gICAgICB0b2JldmFsaWRhdGVkOiAncm95YWwnLFxuICAgICAgYXJjaGl2ZWQ6ICdkYXJrJ1xuICAgIH07XG4gICAgcmV0dXJuIGxlZ2VuZENvbG9ycztcbiAgfVxuXG4gIGdldExhc3RWaXNpdERhdGUobG9jYXRpb25JZHM6IEFycmF5PHN0cmluZz4sIHVzZXJJZD86IHN0cmluZyk6IE9ic2VydmFibGU8QXJyYXk8eyBfaWQ6IHN0cmluZzsgZmluaXNoZWREYXRlOiBEYXRlOyBjb3VudDogbnVtYmVyIH0+PiB7XG4gICAgbGV0IGZpbHRlcnM6IEZpbHRlcnMgPSBbW3sgZmllbGQ6ICdsb2NhdGlvblJlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IGxvY2F0aW9uSWRzIH0sIHsgZmllbGQ6ICdvd25lclJlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2VxJyB9LCB2YWx1ZTogdXNlcklkIHx8IHRoaXMuc2Vzc2lvbi51c2VySWQgfSwgeyBmaWVsZDogJ3N0YXR1cycsIG9wZXJhdG9yOiB7IF9pZDogJ2VxJyB9LCB2YWx1ZTogJ2ZpbmlzaGVkJyB9XV07XG5cbiAgICBsZXQgb3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgX2lkOiAnJGxvY2F0aW9uUmVmJyxcbiAgICAgICAgICBmaW5pc2hlZERhdGU6IHsgJG1heDogJyRmaW5pc2hlZERhdGUnIH0sXG4gICAgICAgICAgY291bnQ6IHsgJHN1bTogMSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5hZ2dyZWdhdGVRdWVyeSgnbWlzc2lvbnMnLCBmaWx0ZXJzLCBvcHRpb25zLCBudWxsLCBudWxsLCBmYWxzZSwgbnVsbCk7XG4gIH1cblxuICBnZXRTdGF0c0FuZERpc3RhbmNlVHJhbnNmb3JtQXN5bmMocG9zaXRpb24/OiBJUG9zaXRpb24pIHtcbiAgICByZXR1cm4gKHJlczogUmVzcG9uc2VPYmplY3QpID0+IHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZU9iamVjdD4oKG9ic2VydmVyOiBPYnNlcnZlcjxSZXNwb25zZU9iamVjdD4pID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICByZXMuZGF0YSA9IHRoaXMuY2FsY3VsYXRlRGlzdGFuY2VBbmRLcGlEYXRhKHJlcywgcG9zaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgaWRzID0gcmVzLmRhdGEubWFwKChsb2NhdGlvbjogTG9jYXRpb24pID0+IGxvY2F0aW9uLl9pZCk7XG4gICAgICAgICAgdGhpcy5nZXRMYXN0VmlzaXREYXRlKGlkcykuc3Vic2NyaWJlKGRhdGVzID0+IHtcbiAgICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goKGxvY2F0aW9uOiBMb2NhdGlvbikgPT4ge1xuICAgICAgICAgICAgICBsZXQgZGF0ZSA9IGRhdGVzLmZpbmQoZCA9PiBkLl9pZCA9PT0gbG9jYXRpb24uX2lkKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGUgJiYgZGF0ZS5maW5pc2hlZERhdGUpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5sYXN0VmlzaXQgPSBkYXRlLmZpbmlzaGVkRGF0ZTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5jb3VudFZpc2l0cyA9IGRhdGUuY291bnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiByZXMuY291bnQsIGRhdGE6IDxhbnk+cmVzLmRhdGEgfSk7XG4gICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgY291bnQ6IDAsIGRhdGE6IFtdIH0pO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBnZXREaXN0YW5jZVRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZW9sb2MuZ2V0TG9jYXRpb24oKS50aGVuKChwb3NpdGlvbjogSVBvc2l0aW9uKSA9PiB7XG4gICAgICByZXR1cm4gKHJlczogUmVzcG9uc2VPYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT2JqZWN0PikgPT4ge1xuICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzLmRhdGEgPSB0aGlzLmNhbGN1bGF0ZURpc3RhbmNlQW5kS3BpRGF0YShyZXMsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogcmVzLmNvdW50LCBkYXRhOiA8YW55PnJlcy5kYXRhIH0pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXREaXN0YW5jZUFuZExhc3RWaXNpdFRyYW5zZm9ybShwb3NpdGlvbjogSVBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIChyZXM6IFJlc3BvbnNlT2JqZWN0KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+KChvYnNlcnZlcjogT2JzZXJ2ZXI8UmVzcG9uc2VPYmplY3Q+KSA9PiB7XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlcy5kYXRhID0gdGhpcy5jYWxjdWxhdGVEaXN0YW5jZUFuZEtwaURhdGEocmVzLCBwb3NpdGlvbik7XG4gICAgICAgICAgbGV0IGlkcyA9IHJlcy5kYXRhLm1hcCgobG9jYXRpb246IExvY2F0aW9uKSA9PiBsb2NhdGlvbi5faWQpO1xuICAgICAgICAgIHRoaXMuZ2V0TGFzdFZpc2l0RGF0ZShpZHMpLnN1YnNjcmliZShkYXRlcyA9PiB7XG4gICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgbGV0IGRhdGUgPSBkYXRlcy5maW5kKGQgPT4gZC5faWQgPT09IGxvY2F0aW9uLl9pZCk7XG4gICAgICAgICAgICAgIGlmIChkYXRlICYmIGRhdGUuZmluaXNoZWREYXRlKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ubGFzdFZpc2l0ID0gZGF0ZS5maW5pc2hlZERhdGU7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uY291bnRWaXNpdHMgPSBkYXRlLmNvdW50O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogcmVzLmNvdW50LCBkYXRhOiA8YW55PnJlcy5kYXRhIH0pO1xuICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgY2FsY3VsYXRlRGlzdGFuY2VBbmRLcGlEYXRhKHJlczogUmVzcG9uc2VPYmplY3QsIHBvc2l0aW9uOiBJUG9zaXRpb24pIHtcbiAgICBsZXQgcmV0VmFsID0gcmVzLmRhdGEubWFwKChsb2NhdGlvbjogTG9jYXRpb24pID0+IHtcbiAgICAgIGlmIChsb2NhdGlvbi5fZ2VvbG9jICYmIHBvc2l0aW9uICYmIGlzTnVtYmVyKHBvc2l0aW9uLmxhdGl0dWRlKSAmJiBpc051bWJlcihwb3NpdGlvbi5sb25naXR1ZGUpKSB7XG4gICAgICAgIGxvY2F0aW9uLmRpc3RhbmNlID0gdGhpcy5nZW9sb2MuZ2V0RGlzdGFuY2UocG9zaXRpb24ubGF0aXR1ZGUsIHBvc2l0aW9uLmxvbmdpdHVkZSwgbG9jYXRpb24uX2dlb2xvY1sxXSwgbG9jYXRpb24uX2dlb2xvY1swXSk7XG4gICAgICB9XG5cbiAgICAgIGxldCBvbGRLcGlEYXRhOiBPYmplY3QgPSBsb2NhdGlvbi5rcGlEYXRhIGFzIGFueTtcbiAgICAgIGxldCBrcGlEYXRhOiBBcnJheTxJS3BpRGF0YT4gPSBbXTtcbiAgICAgIGlmICh0aGlzLnNlc3Npb24udGVuYW50ICYmIHRoaXMuc2Vzc2lvbi50ZW5hbnQubG9jYXRpb25LcGlzICYmIHRoaXMuc2Vzc2lvbi50ZW5hbnQubG9jYXRpb25LcGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uLnRlbmFudC5sb2NhdGlvbktwaXMuZm9yRWFjaChrcGkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uLmlzQWRtaW4oKSB8fCAoa3BpLmNhdGVnb3J5ID09PSAnaGVhbHRoc2NvcmUnICYmIHRoaXMuYXV0aGVudGljYXRpb24uaGFzUm9sZSgnaGVhbHRoc2NvcmUnKSkgfHwgKGtwaS5jYXRlZ29yeSAhPT0gJ2hlYWx0aHNjb3JlJyAmJiB0aGlzLmF1dGhlbnRpY2F0aW9uLmhhc1JvbGUoJ3N0b3JlaW5zaWdodHMnKSkpIHtcbiAgICAgICAgICAgIGtwaURhdGEucHVzaCh7XG4gICAgICAgICAgICAgIGNhdGVnb3J5OiBrcGkuY2F0ZWdvcnksXG4gICAgICAgICAgICAgIHZhbHVlOiBvbGRLcGlEYXRhICYmIG9sZEtwaURhdGFba3BpLmNhdGVnb3J5XSA/IG9sZEtwaURhdGFba3BpLmNhdGVnb3J5XS52YWx1ZSA6IG51bGwsXG4gICAgICAgICAgICAgIGljb246IGtwaS5pY29uLFxuICAgICAgICAgICAgICBleHRyYVN5bWJvbDoga3BpLmV4dHJhU3ltYm9sLFxuICAgICAgICAgICAgICB2YXJpYXRpb246IG9sZEtwaURhdGEgJiYgb2xkS3BpRGF0YVtrcGkuY2F0ZWdvcnldID8gb2xkS3BpRGF0YVtrcGkuY2F0ZWdvcnldLnZhcmlhdGlvbiA6IG51bGxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2NhdGlvbi5rcGlEYXRhID0ga3BpRGF0YTtcblxuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH0pO1xuICAgIC8vcmV0VmFsID0gb3JkZXJCeShyZXRWYWwsIFsnZGlzdGFuY2UnXSk7XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGdldEFyb3VuZE1lRmlsdGVyKGFyb3VuZE1lOiBib29sZWFuLCBzdGF0czogYm9vbGVhbiwgZm9yY2VSZWZyZXNoOiBib29sZWFuKTogUHJvbWlzZTx7IGZpbHRlcnM6IEZpbHRlcnM7IHNvcnRNb2RlbDogSVNvcnRbXTsgbWFwVHJhbnNmb3JtOiBhbnk7IHBvc2l0aW9uOiBJUG9zaXRpb24gfT4ge1xuICAgIGxldCBmaWx0ZXJzOiBGaWx0ZXJzO1xuICAgIGxldCBzb3J0TW9kZWw6IEFycmF5PGFueT47XG4gICAgbGV0IG1hcFRyYW5zZm9ybTogYW55O1xuICAgIHJldHVybiB0aGlzLmdlb2xvYy5nZXRMb2NhdGlvbihmb3JjZVJlZnJlc2gpLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICBtYXBUcmFuc2Zvcm0gPSBzdGF0cyA/IHRoaXMuZ2V0U3RhdHNBbmREaXN0YW5jZVRyYW5zZm9ybUFzeW5jKHJlcykgOiB0aGlzLmdldERpc3RhbmNlQW5kTGFzdFZpc2l0VHJhbnNmb3JtKHJlcyk7XG4gICAgICBpZiAoIWFyb3VuZE1lIHx8ICFyZXMpIHtcbiAgICAgICAgZmlsdGVycyA9IFtbXV07XG4gICAgICAgIHNvcnRNb2RlbCA9IFt7IGNvbElkOiAndGl0bGUnLCBzb3J0OiAnYXNjJyB9XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvcnRNb2RlbCA9IFtdO1xuICAgICAgICBmaWx0ZXJzID0gW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdfZ2VvbG9jJyxcbiAgICAgICAgICAgICAgb3BlcmF0b3I6IHsgX2lkOiAnbmVhclNwaGVyZScgfSxcbiAgICAgICAgICAgICAgdmFsdWU6IFtyZXMubG9uZ2l0dWRlLCByZXMubGF0aXR1ZGVdLFxuICAgICAgICAgICAgICBtYXg6IDQwMDAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZmlsdGVycywgc29ydE1vZGVsLCBtYXBUcmFuc2Zvcm0sIHBvc2l0aW9uOiByZXMgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldExvY2F0aW9uVHlwZXNUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIChyZXM6IFJlc3BvbnNlT2JqZWN0LCBzZWFyY2gsIGZpbHRlcnMsIHN0YXJ0LCBwYWdlU2l6ZSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT2JqZWN0PikgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsZXQgaWRzID0gcmVzLmRhdGEubWFwKCh0eXBlOiBMb2NhdGlvblR5cGUpID0+IHR5cGUuX2lkKTtcbiAgICAgICAgICB0aGlzLmdldExvY2F0aW9uVHlwZXNTdGF0KGlkcykuc3Vic2NyaWJlKHN0YXRzID0+IHtcbiAgICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goKGxvY2F0aW9uVHlwZTogTG9jYXRpb25UeXBlKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBzdGF0ID0gc3RhdHMuZmluZChzID0+IHMuX2lkID09PSBsb2NhdGlvblR5cGUuX2lkKTtcbiAgICAgICAgICAgICAgbGV0IGNvdW50ID0gc3RhdCA/IHN0YXQuY291bnQgfHwgMCA6IDA7XG4gICAgICAgICAgICAgIGxvY2F0aW9uVHlwZS5jb3VudCA9IGNvdW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgY291bnQ6IHJlcy5jb3VudCwgZGF0YTogPGFueT5yZXMuZGF0YSB9KTtcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZ2V0TG9jYXRpb25UeXBlc1N0YXQobG9jYXRpb25UeXBlSWRzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcnJheTx7IF9pZDogc3RyaW5nOyBjb3VudDogbnVtYmVyIH0+PiB7XG4gICAgbGV0IGZpbHRlcnM6IEZpbHRlcnMgPSBbW3sgZmllbGQ6ICd0eXBlUmVmJywgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LCB2YWx1ZTogbG9jYXRpb25UeXBlSWRzIH1dXTtcbiAgICBsZXQgb3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJHByb2plY3Q6IHtcbiAgICAgICAgICBfaWQ6ICckdHlwZVJlZidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgX2lkOiAnJF9pZCcsXG4gICAgICAgICAgY291bnQ6IHsgJHN1bTogMSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5hZ2dyZWdhdGVRdWVyeSgnbG9jYXRpb25zJywgZmlsdGVycywgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRIZWFsdGhzY29yZShsb2NhdGlvbklkOiBzdHJpbmcsIG5iRGF5czogQXJyYXk8bnVtYmVyPiA9IFs3LCAzMCwgOTBdKTogT2JzZXJ2YWJsZTxBcnJheTxJSGVhbHRoc2NvcmU+PiB7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgcmV0dXJuIGZyb20odGhpcy5jYWNoZS5nZXQoQ0FDSEVfS0VZUy5oZWFsdGhzY29yZSwgbG9jYXRpb25JZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2xvY2F0aW9ucy9oZWFsdGhTY29yZT9zdG9yZUlkPScgKyBsb2NhdGlvbklkICsgJyZkYXlzPVsnICsgbmJEYXlzLnRvU3RyaW5nKCkgKyAnXSc7XG4gICAgICByZXR1cm4gdGhpcy5ycS5nZXQodXJsKS5waXBlKFxuICAgICAgICBtYXAocmV0ID0+IHtcbiAgICAgICAgICBsZXQgcmV0VmFsID0gcmV0LmRhdGEgPyByZXQuZGF0YSA6IHJldDtcbiAgICAgICAgICB0aGlzLmNhY2hlLmFkZChDQUNIRV9LRVlTLmhlYWx0aHNjb3JlLCBsb2NhdGlvbklkLCByZXRWYWwpO1xuICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldFVzZXJMb2NhdGlvbnModXNlcklkOiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvZ2V0VXNlckxvY2F0aW9ucyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgdXNlcklkIH0pO1xuICB9XG59XG4iXX0=