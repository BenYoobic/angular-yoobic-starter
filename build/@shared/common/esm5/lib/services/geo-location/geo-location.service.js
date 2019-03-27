/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// <reference path="../../../../../../types/window/index.d.ts" />
/// <reference path="../../../../../../types/window/index.d.ts" />
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import { dateDiffInMinutes } from '@shared/stencil';
import { isNumber } from 'lodash-es';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var Position = /** @class */ (function () {
    function Position(loc) {
        var _a;
        if (typeof loc === 'string') {
            _a = tslib_1.__read(loc.split(',').map(parseFloat), 2), this.latitude = _a[0], this.longitude = _a[1];
        }
        else if (Position.isPosition(loc)) {
            this.latitude = loc.latitude;
            this.longitude = loc.longitude;
            this.accuracy = loc.accuracy;
        }
        else {
            this.latitude = ((/** @type {?} */ (loc))).lat;
            this.longitude = ((/** @type {?} */ (loc))).lng;
        }
    }
    /**
     * @param {?} p
     * @return {?}
     */
    Position.isPosition = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        return p instanceof Position || (isNumber(p.latitude) && isNumber(p.longitude));
    };
    /**
     * @param {?=} reversed
     * @return {?}
     */
    Position.prototype.toGeoLoc = /**
     * @param {?=} reversed
     * @return {?}
     */
    function (reversed) {
        if (reversed === void 0) { reversed = false; }
        return reversed ? [this.longitude, this.latitude] : [this.latitude, this.longitude];
    };
    /**
     * @return {?}
     */
    Position.prototype.toJson = /**
     * @return {?}
     */
    function () {
        return { latitude: this.latitude, longitude: this.longitude };
    };
    /**
     * @return {?}
     */
    Position.prototype.toStringLoc = /**
     * @return {?}
     */
    function () {
        return this.latitude + ',' + this.longitude;
    };
    return Position;
}());
export { Position };
if (false) {
    /** @type {?} */
    Position.prototype.latitude;
    /** @type {?} */
    Position.prototype.longitude;
    /** @type {?} */
    Position.prototype.accuracy;
}
var GeoLocation = /** @class */ (function () {
    function GeoLocation(geolocation, coreConfig) {
        this.geolocation = geolocation;
        this.coreConfig = coreConfig;
        this.defaultPosition = new Position({ latitude: 51.53162, longitude: -0.2376447 });
        this.timeout = 30000;
    }
    /**
     * @param {?} lat1
     * @param {?} lon1
     * @param {?} lat2
     * @param {?} lon2
     * @param {?=} unit
     * @return {?}
     */
    GeoLocation.prototype.getDistance = /**
     * @param {?} lat1
     * @param {?} lon1
     * @param {?} lat2
     * @param {?} lon2
     * @param {?=} unit
     * @return {?}
     */
    function (lat1, lon1, lat2, lon2, unit) {
        if (unit === void 0) { unit = 'K'; }
        /** @type {?} */
        var radlat1 = (Math.PI * lat1) / 180;
        /** @type {?} */
        var radlat2 = (Math.PI * lat2) / 180;
        /** @type {?} */
        var theta = lon1 - lon2;
        /** @type {?} */
        var radtheta = (Math.PI * theta) / 180;
        /** @type {?} */
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === 'K') {
            dist = dist * 1.609344;
        }
        if (unit === 'N') {
            dist = dist * 0.8684;
        }
        return dist;
    };
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    GeoLocation.prototype.getLocation = /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (this.coreConfig.isCordova()) {
            return this.geolocation
                .getCurrentPosition({
                enableHighAccuracy: true,
                maximumAge: 90000,
                timeout: this.timeout
            })
                .then((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return new Position(value.coords); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.defaultPosition; }));
        }
        else if (navigator && navigator.geolocation) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                if (!forceRefresh && _this.cache && (!_this.cacheTimestamp || dateDiffInMinutes(new Date(), _this.cacheTimestamp) > 15)) {
                    resolve(_this.cache);
                }
                else {
                    navigator.geolocation.getCurrentPosition((/**
                     * @param {?} pos
                     * @return {?}
                     */
                    function (pos) {
                        _this.cache = new Position(pos.coords);
                        _this.cacheTimestamp = new Date();
                        resolve(_this.cache);
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        _this.cache = _this.defaultPosition;
                        _this.cacheTimestamp = new Date();
                        resolve(_this.defaultPosition);
                    }), { enableHighAccuracy: false, timeout: 10 * 1000, maximumAge: 10 * 60 * 1000 });
                }
            }));
        }
        else {
            return Promise.resolve(null);
        }
    };
    GeoLocation.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GeoLocation.ctorParameters = function () { return [
        { type: Geolocation },
        { type: CoreConfig }
    ]; };
    return GeoLocation;
}());
export { GeoLocation };
if (false) {
    /** @type {?} */
    GeoLocation.prototype.defaultPosition;
    /**
     * @type {?}
     * @private
     */
    GeoLocation.prototype.timeout;
    /**
     * @type {?}
     * @private
     */
    GeoLocation.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    GeoLocation.prototype.cacheTimestamp;
    /**
     * @type {?}
     * @private
     */
    GeoLocation.prototype.geolocation;
    /**
     * @type {?}
     * @protected
     */
    GeoLocation.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvLWxvY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZ2VvLWxvY2F0aW9uL2dlby1sb2NhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQWtFOztBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RDtJQVNFLGtCQUFZLEdBQWlDOztRQUMzQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixzREFBZ0UsRUFBL0QscUJBQWEsRUFBRSxzQkFBYyxDQUFtQztTQUNsRTthQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztTQUM5QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLG1CQUFTLEdBQUcsRUFBQSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxtQkFBUyxHQUFHLEVBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNyQztJQUNILENBQUM7Ozs7O0lBZmEsbUJBQVU7Ozs7SUFBeEIsVUFBeUIsQ0FBTTtRQUM3QixPQUFPLENBQUMsWUFBWSxR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Q0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ2hDLENBQUMsR0FDRCxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FDOUUsQ0FBQztpQkFDSDtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7O2dCQTNERixVQUFVOzs7O2dCQXJDRixXQUFXO2dCQUhYLFVBQVU7O0lBb0duQixrQkFBQztDQUFBLEFBNURELElBNERDO1NBM0RZLFdBQVc7OztJQUN0QixzQ0FBK0Y7Ozs7O0lBQy9GLDhCQUF3Qjs7Ozs7SUFDeEIsNEJBQXdCOzs7OztJQUN4QixxQ0FBNkI7Ozs7O0lBRWpCLGtDQUFnQzs7Ozs7SUFBRSxpQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vLi4vLi4vdHlwZXMvd2luZG93L2luZGV4LmQudHNcIiAvPlxuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJUG9zaXRpb24sIElMYXRMbmcgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Bvc2l0aW9uL3Bvc2l0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnLi4vY29yZS1jb25maWcvY29yZS1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBkYXRlRGlmZkluTWludXRlcyB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBHZW9sb2NhdGlvbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZ2VvbG9jYXRpb24vbmd4JztcblxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uIGltcGxlbWVudHMgSVBvc2l0aW9uIHtcbiAgbGF0aXR1ZGU6IG51bWJlcjtcbiAgbG9uZ2l0dWRlOiBudW1iZXI7XG4gIGFjY3VyYWN5OiBudW1iZXI7XG5cbiAgcHVibGljIHN0YXRpYyBpc1Bvc2l0aW9uKHA6IGFueSk6IHAgaXMgUG9zaXRpb24ge1xuICAgIHJldHVybiBwIGluc3RhbmNlb2YgUG9zaXRpb24gfHwgKGlzTnVtYmVyKHAubGF0aXR1ZGUpICYmIGlzTnVtYmVyKHAubG9uZ2l0dWRlKSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihsb2M6IElQb3NpdGlvbiB8IHN0cmluZyB8IElMYXRMbmcpIHtcbiAgICBpZiAodHlwZW9mIGxvYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIFt0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZV0gPSBsb2Muc3BsaXQoJywnKS5tYXAocGFyc2VGbG9hdCk7XG4gICAgfSBlbHNlIGlmIChQb3NpdGlvbi5pc1Bvc2l0aW9uKGxvYykpIHtcbiAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2MubGF0aXR1ZGU7XG4gICAgICB0aGlzLmxvbmdpdHVkZSA9IGxvYy5sb25naXR1ZGU7XG4gICAgICB0aGlzLmFjY3VyYWN5ID0gbG9jLmFjY3VyYWN5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxhdGl0dWRlID0gKDxJTGF0TG5nPmxvYykubGF0O1xuICAgICAgdGhpcy5sb25naXR1ZGUgPSAoPElMYXRMbmc+bG9jKS5sbmc7XG4gICAgfVxuICB9XG5cbiAgdG9HZW9Mb2MocmV2ZXJzZWQgPSBmYWxzZSk6IEFycmF5PG51bWJlcj4ge1xuICAgIHJldHVybiByZXZlcnNlZCA/IFt0aGlzLmxvbmdpdHVkZSwgdGhpcy5sYXRpdHVkZV0gOiBbdGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGVdO1xuICB9XG5cbiAgdG9Kc29uKCkge1xuICAgIHJldHVybiB7IGxhdGl0dWRlOiB0aGlzLmxhdGl0dWRlLCBsb25naXR1ZGU6IHRoaXMubG9uZ2l0dWRlIH07XG4gIH1cblxuICB0b1N0cmluZ0xvYygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhdGl0dWRlICsgJywnICsgdGhpcy5sb25naXR1ZGU7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdlb0xvY2F0aW9uIHtcbiAgcHVibGljIGRlZmF1bHRQb3NpdGlvbjogUG9zaXRpb24gPSBuZXcgUG9zaXRpb24oeyBsYXRpdHVkZTogNTEuNTMxNjIsIGxvbmdpdHVkZTogLTAuMjM3NjQ0NyB9KTtcbiAgcHJpdmF0ZSB0aW1lb3V0ID0gMzAwMDA7XG4gIHByaXZhdGUgY2FjaGU6IFBvc2l0aW9uO1xuICBwcml2YXRlIGNhY2hlVGltZXN0YW1wOiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2VvbG9jYXRpb246IEdlb2xvY2F0aW9uLCBwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykgeyB9XG5cbiAgZ2V0RGlzdGFuY2UobGF0MTogbnVtYmVyLCBsb24xOiBudW1iZXIsIGxhdDI6IG51bWJlciwgbG9uMjogbnVtYmVyLCB1bml0ID0gJ0snKSB7XG4gICAgbGV0IHJhZGxhdDEgPSAoTWF0aC5QSSAqIGxhdDEpIC8gMTgwO1xuICAgIGxldCByYWRsYXQyID0gKE1hdGguUEkgKiBsYXQyKSAvIDE4MDtcbiAgICBsZXQgdGhldGEgPSBsb24xIC0gbG9uMjtcbiAgICBsZXQgcmFkdGhldGEgPSAoTWF0aC5QSSAqIHRoZXRhKSAvIDE4MDtcbiAgICBsZXQgZGlzdCA9IE1hdGguc2luKHJhZGxhdDEpICogTWF0aC5zaW4ocmFkbGF0MikgKyBNYXRoLmNvcyhyYWRsYXQxKSAqIE1hdGguY29zKHJhZGxhdDIpICogTWF0aC5jb3MocmFkdGhldGEpO1xuICAgIGRpc3QgPSBNYXRoLmFjb3MoZGlzdCk7XG4gICAgZGlzdCA9IChkaXN0ICogMTgwKSAvIE1hdGguUEk7XG4gICAgZGlzdCA9IGRpc3QgKiA2MCAqIDEuMTUxNTtcbiAgICBpZiAodW5pdCA9PT0gJ0snKSB7XG4gICAgICBkaXN0ID0gZGlzdCAqIDEuNjA5MzQ0O1xuICAgIH1cbiAgICBpZiAodW5pdCA9PT0gJ04nKSB7XG4gICAgICBkaXN0ID0gZGlzdCAqIDAuODY4NDtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3Q7XG4gIH1cblxuICBnZXRMb2NhdGlvbihmb3JjZVJlZnJlc2ggPSBmYWxzZSk6IFByb21pc2U8UG9zaXRpb24gfCBudWxsPiB7XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2VvbG9jYXRpb25cbiAgICAgICAgLmdldEN1cnJlbnRQb3NpdGlvbih7XG4gICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgICAgICAgIG1heGltdW1BZ2U6IDkwMDAwLFxuICAgICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dFxuICAgICAgICB9KVxuICAgICAgICAudGhlbih2YWx1ZSA9PiBuZXcgUG9zaXRpb24odmFsdWUuY29vcmRzKSwgZXJyID0+IHRoaXMuZGVmYXVsdFBvc2l0aW9uKTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZm9yY2VSZWZyZXNoICYmIHRoaXMuY2FjaGUgJiYgKCF0aGlzLmNhY2hlVGltZXN0YW1wIHx8IGRhdGVEaWZmSW5NaW51dGVzKG5ldyBEYXRlKCksIHRoaXMuY2FjaGVUaW1lc3RhbXApID4gMTUpKSB7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmNhY2hlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAgICAgcG9zID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZSA9IG5ldyBQb3NpdGlvbihwb3MuY29vcmRzKTtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZVRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jYWNoZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZSA9IHRoaXMuZGVmYXVsdFBvc2l0aW9uO1xuICAgICAgICAgICAgICB0aGlzLmNhY2hlVGltZXN0YW1wID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmRlZmF1bHRQb3NpdGlvbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlLCB0aW1lb3V0OiAxMCAqIDEwMDAsIG1heGltdW1BZ2U6IDEwICogNjAgKiAxMDAwIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==