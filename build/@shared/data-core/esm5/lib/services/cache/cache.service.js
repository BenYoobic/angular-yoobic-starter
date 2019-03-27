/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { getUUID } from '@shared/stencil';
import { LocalForageService, PromiseService, Log } from '@shared/common';
import { CACHE_KEYS } from '../../interfaces/cache/cache.interface';
import { from } from 'rxjs';
import { keys } from 'lodash-es';
var Cache = /** @class */ (function () {
    function Cache(localForage, promise, log) {
        this.localForage = localForage;
        this.promise = promise;
        this.log = log;
    }
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @param {?} item
     * @return {?}
     */
    Cache.prototype.add = /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @param {?} item
     * @return {?}
     */
    function (cacheKey, entryKey, item) {
        var _this = this;
        return this.localForage
            .get(cacheKey)
            .then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            if (entryKey) {
                data[entryKey] = item;
            }
            return _this.localForage.set(cacheKey, data);
        }))
            .then((/**
         * @return {?}
         */
        function () { return item; }));
    };
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    Cache.prototype.get = /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    function (cacheKey, entryKey) {
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            return data[entryKey] || {};
        })));
    };
    /**
     * @param {?} cacheKey
     * @return {?}
     */
    Cache.prototype.getAll = /**
     * @param {?} cacheKey
     * @return {?}
     */
    function (cacheKey) {
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            /** @type {?} */
            var retVal = [];
            keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                if (data[key]) {
                    retVal.push(data[key]);
                }
            }));
            return retVal;
        }));
    };
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    Cache.prototype.remove = /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    function (cacheKey, entryKey) {
        var _this = this;
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            delete data[entryKey];
            return _this.localForage.set(cacheKey, data);
        })));
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Cache.prototype.getDatabaseCacheKey = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        return CACHE_KEYS.database + '.' + collectionName;
    };
    /**
     * @template T
     * @param {?} collectionName
     * @return {?}
     */
    Cache.prototype.getDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            return data || [];
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @return {?}
     */
    Cache.prototype.setDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @return {?}
     */
    function (collectionName, items) {
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.set(cacheKey, items);
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @param {?=} idField
     * @param {?=} deletedKeys
     * @return {?}
     */
    Cache.prototype.updateDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @param {?=} idField
     * @param {?=} deletedKeys
     * @return {?}
     */
    function (collectionName, items, idField, deletedKeys) {
        var _this = this;
        if (idField === void 0) { idField = '_id'; }
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || [];
            if (items && items.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return items.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) { return r[idField] === d[idField]; })) < 0; }));
            }
            data = tslib_1.__spread(data, items);
            if (deletedKeys && deletedKeys.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return deletedKeys.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) { return r[idField] === d[idField]; })) < 0; }));
            }
            _this.log.log('Syncing Database - Syncing ' + collectionName + ' done : ' + data.length + ' entities locally');
            return _this.localForage.set(cacheKey, data);
        }));
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Cache.prototype.clearDatabaseCollection = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var cacheKey = this.getDatabaseCacheKey(collectionName);
        this.log.log('Syncing Database - Clearing ' + collectionName);
        return this.localForage.remove(cacheKey);
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} patch
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.upsertInDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} patch
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, entity, patch, idField) {
        var _this = this;
        if (patch === void 0) { patch = false; }
        if (idField === void 0) { idField = '_id'; }
        entity[idField] = entity[idField] || Cache.OFFLINE_PREFIX + getUUID();
        return this.getByIdFromDatabaseCollection(collectionName, entity[idField]).then((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && patch) {
                entity = tslib_1.__assign({}, retVal, ((/** @type {?} */ (entity))));
            }
            return _this.updateDatabaseCollection(collectionName, [entity], idField).then((/**
             * @return {?}
             */
            function () {
                return entity;
            }));
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.removeFromDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, id, idField) {
        var _this = this;
        if (idField === void 0) { idField = '_id'; }
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[idField] !== id; }));
            return _this.setDatabaseCollection(collectionName, data);
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?} newEntity
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.replaceFromDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?} newEntity
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, id, newEntity, idField) {
        var _this = this;
        if (idField === void 0) { idField = '_id'; }
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[idField] !== id; }));
            data = tslib_1.__spread(data, [newEntity]);
            return _this.setDatabaseCollection(collectionName, data);
        }));
    };
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    Cache.prototype.getByIdFromDatabaseCollection = /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    function (collectionName, id, idField) {
        if (idField === void 0) { idField = '_id'; }
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var retVal = data.find((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d[idField] === id; }));
            return retVal;
        }));
    };
    Cache.OFFLINE_PREFIX = 'offline_';
    Cache.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Cache.ctorParameters = function () { return [
        { type: LocalForageService },
        { type: PromiseService },
        { type: Log }
    ]; };
    return Cache;
}());
export { Cache };
if (false) {
    /** @type {?} */
    Cache.OFFLINE_PREFIX;
    /**
     * @type {?}
     * @protected
     */
    Cache.prototype.localForage;
    /**
     * @type {?}
     * @protected
     */
    Cache.prototype.promise;
    /**
     * @type {?}
     * @protected
     */
    Cache.prototype.log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYWNoZS9jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQVcsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWpDO0lBSUUsZUFBc0IsV0FBK0IsRUFBWSxPQUF1QixFQUFZLEdBQVE7UUFBdEYsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQVksWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFLO0lBQUcsQ0FBQzs7Ozs7OztJQUVoSCxtQkFBRzs7Ozs7O0lBQUgsVUFBSSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsSUFBUztRQUFqRCxpQkFXQztRQVZDLE9BQU8sSUFBSSxDQUFDLFdBQVc7YUFDcEIsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUNiLElBQUk7Ozs7UUFBQyxVQUFDLElBQVM7WUFDZCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNsQixJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDO2FBQ0QsSUFBSTs7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RjNDLFVBQVU7Ozs7Z0JBUEYsa0JBQWtCO2dCQUFFLGNBQWM7Z0JBQUUsR0FBRzs7SUFpSWhELFlBQUM7Q0FBQSxBQTFIRCxJQTBIQztTQXpIWSxLQUFLOzs7SUFDaEIscUJBQTBDOzs7OztJQUU5Qiw0QkFBeUM7Ozs7O0lBQUUsd0JBQWlDOzs7OztJQUFFLG9CQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUVudGl0eSwgZ2V0VVVJRCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBMb2NhbEZvcmFnZVNlcnZpY2UsIFByb21pc2VTZXJ2aWNlLCBMb2cgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5cbmltcG9ydCB7IENBQ0hFX0tFWVMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NhY2hlL2NhY2hlLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGtleXMgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FjaGUge1xuICBwdWJsaWMgc3RhdGljIE9GRkxJTkVfUFJFRklYID0gJ29mZmxpbmVfJztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbG9jYWxGb3JhZ2U6IExvY2FsRm9yYWdlU2VydmljZSwgcHJvdGVjdGVkIHByb21pc2U6IFByb21pc2VTZXJ2aWNlLCBwcm90ZWN0ZWQgbG9nOiBMb2cpIHt9XG5cbiAgYWRkKGNhY2hlS2V5OiBzdHJpbmcsIGVudHJ5S2V5OiBzdHJpbmcsIGl0ZW06IGFueSkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlXG4gICAgICAuZ2V0KGNhY2hlS2V5KVxuICAgICAgLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgaWYgKGVudHJ5S2V5KSB7XG4gICAgICAgICAgZGF0YVtlbnRyeUtleV0gPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlLnNldChjYWNoZUtleSwgZGF0YSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4gaXRlbSk7XG4gIH1cblxuICBnZXQoY2FjaGVLZXk6IHN0cmluZywgZW50cnlLZXk6IHN0cmluZykge1xuICAgIHJldHVybiBmcm9tKFxuICAgICAgdGhpcy5sb2NhbEZvcmFnZS5nZXQoY2FjaGVLZXkpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICByZXR1cm4gZGF0YVtlbnRyeUtleV0gfHwge307XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRBbGwoY2FjaGVLZXk6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUtleSkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgIGxldCByZXRWYWwgPSBbXTtcbiAgICAgIGtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoZGF0YVtrZXldKSB7XG4gICAgICAgICAgcmV0VmFsLnB1c2goZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlKGNhY2hlS2V5OiBzdHJpbmcsIGVudHJ5S2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnJvbShcbiAgICAgIHRoaXMubG9jYWxGb3JhZ2UuZ2V0KGNhY2hlS2V5KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCB7fTtcbiAgICAgICAgZGVsZXRlIGRhdGFbZW50cnlLZXldO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbEZvcmFnZS5zZXQoY2FjaGVLZXksIGRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0RGF0YWJhc2VDYWNoZUtleShjb2xsZWN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIENBQ0hFX0tFWVMuZGF0YWJhc2UgKyAnLicgKyBjb2xsZWN0aW9uTmFtZTtcbiAgfVxuXG4gIGdldERhdGFiYXNlQ29sbGVjdGlvbjxUID0gSUVudGl0eT4oY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8VD4+IHtcbiAgICBsZXQgY2FjaGVLZXkgPSB0aGlzLmdldERhdGFiYXNlQ2FjaGVLZXkoY29sbGVjdGlvbk5hbWUpO1xuICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUtleSkudGhlbigoZGF0YTogQXJyYXk8VD4pID0+IHtcbiAgICAgIHJldHVybiBkYXRhIHx8IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQgPSBJRW50aXR5Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpdGVtczogQXJyYXk8VD4pOiBQcm9taXNlPEFycmF5PFQ+PiB7XG4gICAgbGV0IGNhY2hlS2V5ID0gdGhpcy5nZXREYXRhYmFzZUNhY2hlS2V5KGNvbGxlY3Rpb25OYW1lKTtcbiAgICByZXR1cm4gdGhpcy5sb2NhbEZvcmFnZS5zZXQoY2FjaGVLZXksIGl0ZW1zKTtcbiAgfVxuXG4gIHVwZGF0ZURhdGFiYXNlQ29sbGVjdGlvbjxUID0gSUVudGl0eT4oY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaXRlbXM6IEFycmF5PFQ+LCBpZEZpZWxkOiBzdHJpbmcgPSAnX2lkJywgZGVsZXRlZEtleXM/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgbGV0IGNhY2hlS2V5ID0gdGhpcy5nZXREYXRhYmFzZUNhY2hlS2V5KGNvbGxlY3Rpb25OYW1lKTtcbiAgICByZXR1cm4gdGhpcy5sb2NhbEZvcmFnZS5nZXQoY2FjaGVLZXkpLnRoZW4oKGRhdGE6IEFycmF5PFQ+KSA9PiB7XG4gICAgICBkYXRhID0gZGF0YSB8fCBbXTtcbiAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhLmZpbHRlcihkID0+IGl0ZW1zLmZpbmRJbmRleChyID0+IHJbaWRGaWVsZF0gPT09IGRbaWRGaWVsZF0pIDwgMCk7XG4gICAgICB9XG4gICAgICBkYXRhID0gWy4uLmRhdGEsIC4uLml0ZW1zXTtcbiAgICAgIGlmIChkZWxldGVkS2V5cyAmJiBkZWxldGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRhdGEgPSBkYXRhLmZpbHRlcihkID0+IGRlbGV0ZWRLZXlzLmZpbmRJbmRleChyID0+IHJbaWRGaWVsZF0gPT09IGRbaWRGaWVsZF0pIDwgMCk7XG4gICAgICB9XG4gICAgICB0aGlzLmxvZy5sb2coJ1N5bmNpbmcgRGF0YWJhc2UgLSBTeW5jaW5nICcgKyBjb2xsZWN0aW9uTmFtZSArICcgZG9uZSA6ICcgKyBkYXRhLmxlbmd0aCArICcgZW50aXRpZXMgbG9jYWxseScpO1xuICAgICAgcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2Uuc2V0KGNhY2hlS2V5LCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyRGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgY2FjaGVLZXkgPSB0aGlzLmdldERhdGFiYXNlQ2FjaGVLZXkoY29sbGVjdGlvbk5hbWUpO1xuICAgIHRoaXMubG9nLmxvZygnU3luY2luZyBEYXRhYmFzZSAtIENsZWFyaW5nICcgKyBjb2xsZWN0aW9uTmFtZSk7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2UucmVtb3ZlKGNhY2hlS2V5KTtcbiAgfVxuXG4gIHVwc2VydEluRGF0YWJhc2VDb2xsZWN0aW9uPFQgPSBJRW50aXR5Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IFQsIHBhdGNoOiBib29sZWFuID0gZmFsc2UsIGlkRmllbGQ6IHN0cmluZyA9ICdfaWQnKSB7XG4gICAgZW50aXR5W2lkRmllbGRdID0gZW50aXR5W2lkRmllbGRdIHx8IENhY2hlLk9GRkxJTkVfUFJFRklYICsgZ2V0VVVJRCgpO1xuICAgIHJldHVybiB0aGlzLmdldEJ5SWRGcm9tRGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHlbaWRGaWVsZF0pLnRoZW4ocmV0VmFsID0+IHtcbiAgICAgIGlmIChyZXRWYWwgJiYgcGF0Y2gpIHtcbiAgICAgICAgZW50aXR5ID0geyAuLi5yZXRWYWwsIC4uLihlbnRpdHkgYXMgYW55KSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lLCBbZW50aXR5XSwgaWRGaWVsZCkudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUZyb21EYXRhYmFzZUNvbGxlY3Rpb248VCA9IElFbnRpdHk+KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGlkRmllbGQ6IHN0cmluZyA9ICdfaWQnKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQ+KGNvbGxlY3Rpb25OYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gZFtpZEZpZWxkXSAhPT0gaWQpO1xuICAgICAgcmV0dXJuIHRoaXMuc2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQ+KGNvbGxlY3Rpb25OYW1lLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlcGxhY2VGcm9tRGF0YWJhc2VDb2xsZWN0aW9uPFQgPSBJRW50aXR5Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogc3RyaW5nLCBuZXdFbnRpdHk6IFQsIGlkRmllbGQ6IHN0cmluZyA9ICdfaWQnKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQ+KGNvbGxlY3Rpb25OYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gZFtpZEZpZWxkXSAhPT0gaWQpO1xuICAgICAgZGF0YSA9IFsuLi5kYXRhLCBuZXdFbnRpdHldO1xuICAgICAgcmV0dXJuIHRoaXMuc2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQ+KGNvbGxlY3Rpb25OYW1lLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEJ5SWRGcm9tRGF0YWJhc2VDb2xsZWN0aW9uPFQgPSBJRW50aXR5Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogc3RyaW5nLCBpZEZpZWxkOiBzdHJpbmcgPSAnX2lkJykge1xuICAgIHJldHVybiB0aGlzLmdldERhdGFiYXNlQ29sbGVjdGlvbjxUPihjb2xsZWN0aW9uTmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCByZXRWYWwgPSBkYXRhLmZpbmQoZCA9PiBkW2lkRmllbGRdID09PSBpZCk7XG4gICAgICByZXR1cm4gcmV0VmFsO1xuICAgIH0pO1xuICB9XG59XG4iXX0=