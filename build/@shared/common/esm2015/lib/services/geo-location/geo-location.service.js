/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// <reference path="../../../../../../types/window/index.d.ts" />
/// <reference path="../../../../../../types/window/index.d.ts" />
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import { dateDiffInMinutes } from '@shared/stencil';
import { isNumber } from 'lodash-es';
import { Geolocation } from '@ionic-native/geolocation/ngx';
export class Position {
    /**
     * @param {?} p
     * @return {?}
     */
    static isPosition(p) {
        return p instanceof Position || (isNumber(p.latitude) && isNumber(p.longitude));
    }
    /**
     * @param {?} loc
     */
    constructor(loc) {
        if (typeof loc === 'string') {
            [this.latitude, this.longitude] = loc.split(',').map(parseFloat);
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
     * @param {?=} reversed
     * @return {?}
     */
    toGeoLoc(reversed = false) {
        return reversed ? [this.longitude, this.latitude] : [this.latitude, this.longitude];
    }
    /**
     * @return {?}
     */
    toJson() {
        return { latitude: this.latitude, longitude: this.longitude };
    }
    /**
     * @return {?}
     */
    toStringLoc() {
        return this.latitude + ',' + this.longitude;
    }
}
if (false) {
    /** @type {?} */
    Position.prototype.latitude;
    /** @type {?} */
    Position.prototype.longitude;
    /** @type {?} */
    Position.prototype.accuracy;
}
export class GeoLocation {
    /**
     * @param {?} geolocation
     * @param {?} coreConfig
     */
    constructor(geolocation, coreConfig) {
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
    getDistance(lat1, lon1, lat2, lon2, unit = 'K') {
        /** @type {?} */
        let radlat1 = (Math.PI * lat1) / 180;
        /** @type {?} */
        let radlat2 = (Math.PI * lat2) / 180;
        /** @type {?} */
        let theta = lon1 - lon2;
        /** @type {?} */
        let radtheta = (Math.PI * theta) / 180;
        /** @type {?} */
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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
    }
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    getLocation(forceRefresh = false) {
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
            value => new Position(value.coords)), (/**
             * @param {?} err
             * @return {?}
             */
            err => this.defaultPosition));
        }
        else if (navigator && navigator.geolocation) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                if (!forceRefresh && this.cache && (!this.cacheTimestamp || dateDiffInMinutes(new Date(), this.cacheTimestamp) > 15)) {
                    resolve(this.cache);
                }
                else {
                    navigator.geolocation.getCurrentPosition((/**
                     * @param {?} pos
                     * @return {?}
                     */
                    pos => {
                        this.cache = new Position(pos.coords);
                        this.cacheTimestamp = new Date();
                        resolve(this.cache);
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        this.cache = this.defaultPosition;
                        this.cacheTimestamp = new Date();
                        resolve(this.defaultPosition);
                    }), { enableHighAccuracy: false, timeout: 10 * 1000, maximumAge: 10 * 60 * 1000 });
                }
            }));
        }
        else {
            return Promise.resolve(null);
        }
    }
}
GeoLocation.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GeoLocation.ctorParameters = () => [
    { type: Geolocation },
    { type: CoreConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvLWxvY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZ2VvLWxvY2F0aW9uL2dlby1sb2NhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrRUFBa0U7O0FBRWxFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDckMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE1BQU0sT0FBTyxRQUFROzs7OztJQUtaLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBTTtRQUM3QixPQUFPLENBQUMsWUFBWSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDOzs7O0lBRUQsWUFBWSxHQUFpQztRQUMzQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFB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QUFDO29CQUNoQyxDQUFDLEdBQ0QsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQzlFLENBQUM7aUJBQ0g7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7WUEzREYsVUFBVTs7OztZQXJDRixXQUFXO1lBSFgsVUFBVTs7OztJQTBDakIsc0NBQStGOzs7OztJQUMvRiw4QkFBd0I7Ozs7O0lBQ3hCLDRCQUF3Qjs7Ozs7SUFDeEIscUNBQTZCOzs7OztJQUVqQixrQ0FBZ0M7Ozs7O0lBQUUsaUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uLy4uLy4uL3R5cGVzL3dpbmRvdy9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBvc2l0aW9uLCBJTGF0TG5nIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9wb3NpdGlvbi9wb3NpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJy4uL2NvcmUtY29uZmlnL2NvcmUtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGF0ZURpZmZJbk1pbnV0ZXMgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IHsgR2VvbG9jYXRpb24gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2dlb2xvY2F0aW9uL25neCc7XG5cbmV4cG9ydCBjbGFzcyBQb3NpdGlvbiBpbXBsZW1lbnRzIElQb3NpdGlvbiB7XG4gIGxhdGl0dWRlOiBudW1iZXI7XG4gIGxvbmdpdHVkZTogbnVtYmVyO1xuICBhY2N1cmFjeTogbnVtYmVyO1xuXG4gIHB1YmxpYyBzdGF0aWMgaXNQb3NpdGlvbihwOiBhbnkpOiBwIGlzIFBvc2l0aW9uIHtcbiAgICByZXR1cm4gcCBpbnN0YW5jZW9mIFBvc2l0aW9uIHx8IChpc051bWJlcihwLmxhdGl0dWRlKSAmJiBpc051bWJlcihwLmxvbmdpdHVkZSkpO1xuICB9XG5cbiAgY29uc3RydWN0b3IobG9jOiBJUG9zaXRpb24gfCBzdHJpbmcgfCBJTGF0TG5nKSB7XG4gICAgaWYgKHR5cGVvZiBsb2MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBbdGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGVdID0gbG9jLnNwbGl0KCcsJykubWFwKHBhcnNlRmxvYXQpO1xuICAgIH0gZWxzZSBpZiAoUG9zaXRpb24uaXNQb3NpdGlvbihsb2MpKSB7XG4gICAgICB0aGlzLmxhdGl0dWRlID0gbG9jLmxhdGl0dWRlO1xuICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2MubG9uZ2l0dWRlO1xuICAgICAgdGhpcy5hY2N1cmFjeSA9IGxvYy5hY2N1cmFjeTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sYXRpdHVkZSA9ICg8SUxhdExuZz5sb2MpLmxhdDtcbiAgICAgIHRoaXMubG9uZ2l0dWRlID0gKDxJTGF0TG5nPmxvYykubG5nO1xuICAgIH1cbiAgfVxuXG4gIHRvR2VvTG9jKHJldmVyc2VkID0gZmFsc2UpOiBBcnJheTxudW1iZXI+IHtcbiAgICByZXR1cm4gcmV2ZXJzZWQgPyBbdGhpcy5sb25naXR1ZGUsIHRoaXMubGF0aXR1ZGVdIDogW3RoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlXTtcbiAgfVxuXG4gIHRvSnNvbigpIHtcbiAgICByZXR1cm4geyBsYXRpdHVkZTogdGhpcy5sYXRpdHVkZSwgbG9uZ2l0dWRlOiB0aGlzLmxvbmdpdHVkZSB9O1xuICB9XG5cbiAgdG9TdHJpbmdMb2MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYXRpdHVkZSArICcsJyArIHRoaXMubG9uZ2l0dWRlO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZW9Mb2NhdGlvbiB7XG4gIHB1YmxpYyBkZWZhdWx0UG9zaXRpb246IFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKHsgbGF0aXR1ZGU6IDUxLjUzMTYyLCBsb25naXR1ZGU6IC0wLjIzNzY0NDcgfSk7XG4gIHByaXZhdGUgdGltZW91dCA9IDMwMDAwO1xuICBwcml2YXRlIGNhY2hlOiBQb3NpdGlvbjtcbiAgcHJpdmF0ZSBjYWNoZVRpbWVzdGFtcDogRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdlb2xvY2F0aW9uOiBHZW9sb2NhdGlvbiwgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcpIHsgfVxuXG4gIGdldERpc3RhbmNlKGxhdDE6IG51bWJlciwgbG9uMTogbnVtYmVyLCBsYXQyOiBudW1iZXIsIGxvbjI6IG51bWJlciwgdW5pdCA9ICdLJykge1xuICAgIGxldCByYWRsYXQxID0gKE1hdGguUEkgKiBsYXQxKSAvIDE4MDtcbiAgICBsZXQgcmFkbGF0MiA9IChNYXRoLlBJICogbGF0MikgLyAxODA7XG4gICAgbGV0IHRoZXRhID0gbG9uMSAtIGxvbjI7XG4gICAgbGV0IHJhZHRoZXRhID0gKE1hdGguUEkgKiB0aGV0YSkgLyAxODA7XG4gICAgbGV0IGRpc3QgPSBNYXRoLnNpbihyYWRsYXQxKSAqIE1hdGguc2luKHJhZGxhdDIpICsgTWF0aC5jb3MocmFkbGF0MSkgKiBNYXRoLmNvcyhyYWRsYXQyKSAqIE1hdGguY29zKHJhZHRoZXRhKTtcbiAgICBkaXN0ID0gTWF0aC5hY29zKGRpc3QpO1xuICAgIGRpc3QgPSAoZGlzdCAqIDE4MCkgLyBNYXRoLlBJO1xuICAgIGRpc3QgPSBkaXN0ICogNjAgKiAxLjE1MTU7XG4gICAgaWYgKHVuaXQgPT09ICdLJykge1xuICAgICAgZGlzdCA9IGRpc3QgKiAxLjYwOTM0NDtcbiAgICB9XG4gICAgaWYgKHVuaXQgPT09ICdOJykge1xuICAgICAgZGlzdCA9IGRpc3QgKiAwLjg2ODQ7XG4gICAgfVxuICAgIHJldHVybiBkaXN0O1xuICB9XG5cbiAgZ2V0TG9jYXRpb24oZm9yY2VSZWZyZXNoID0gZmFsc2UpOiBQcm9taXNlPFBvc2l0aW9uIHwgbnVsbD4ge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdlb2xvY2F0aW9uXG4gICAgICAgIC5nZXRDdXJyZW50UG9zaXRpb24oe1xuICAgICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSxcbiAgICAgICAgICBtYXhpbXVtQWdlOiA5MDAwMCxcbiAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odmFsdWUgPT4gbmV3IFBvc2l0aW9uKHZhbHVlLmNvb3JkcyksIGVyciA9PiB0aGlzLmRlZmF1bHRQb3NpdGlvbik7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIWZvcmNlUmVmcmVzaCAmJiB0aGlzLmNhY2hlICYmICghdGhpcy5jYWNoZVRpbWVzdGFtcCB8fCBkYXRlRGlmZkluTWludXRlcyhuZXcgRGF0ZSgpLCB0aGlzLmNhY2hlVGltZXN0YW1wKSA+IDE1KSkge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5jYWNoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICAgIHBvcyA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSBuZXcgUG9zaXRpb24ocG9zLmNvb3Jkcyk7XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGVUaW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuY2FjaGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLmRlZmF1bHRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5jYWNoZVRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcy5kZWZhdWx0UG9zaXRpb24pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZSwgdGltZW91dDogMTAgKiAxMDAwLCBtYXhpbXVtQWdlOiAxMCAqIDYwICogMTAwMCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuICB9XG59XG4iXX0=