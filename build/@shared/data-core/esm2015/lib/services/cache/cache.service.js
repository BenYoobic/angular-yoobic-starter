/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { getUUID } from '@shared/stencil';
import { LocalForageService, PromiseService, Log } from '@shared/common';
import { CACHE_KEYS } from '../../interfaces/cache/cache.interface';
import { from } from 'rxjs';
import { keys } from 'lodash-es';
export class Cache {
    /**
     * @param {?} localForage
     * @param {?} promise
     * @param {?} log
     */
    constructor(localForage, promise, log) {
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
    add(cacheKey, entryKey, item) {
        return this.localForage
            .get(cacheKey)
            .then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || {};
            if (entryKey) {
                data[entryKey] = item;
            }
            return this.localForage.set(cacheKey, data);
        }))
            .then((/**
         * @return {?}
         */
        () => item));
    }
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    get(cacheKey, entryKey) {
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data || {};
            return data[entryKey] || {};
        })));
    }
    /**
     * @param {?} cacheKey
     * @return {?}
     */
    getAll(cacheKey) {
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || {};
            /** @type {?} */
            let retVal = [];
            keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                if (data[key]) {
                    retVal.push(data[key]);
                }
            }));
            return retVal;
        }));
    }
    /**
     * @param {?} cacheKey
     * @param {?} entryKey
     * @return {?}
     */
    remove(cacheKey, entryKey) {
        return from(this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data || {};
            delete data[entryKey];
            return this.localForage.set(cacheKey, data);
        })));
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    getDatabaseCacheKey(collectionName) {
        return CACHE_KEYS.database + '.' + collectionName;
    }
    /**
     * @template T
     * @param {?} collectionName
     * @return {?}
     */
    getDatabaseCollection(collectionName) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return data || [];
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @return {?}
     */
    setDatabaseCollection(collectionName, items) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.set(cacheKey, items);
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} items
     * @param {?=} idField
     * @param {?=} deletedKeys
     * @return {?}
     */
    updateDatabaseCollection(collectionName, items, idField = '_id', deletedKeys) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        return this.localForage.get(cacheKey).then((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || [];
            if (items && items.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => items.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r[idField] === d[idField])) < 0));
            }
            data = [...data, ...items];
            if (deletedKeys && deletedKeys.length > 0) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => deletedKeys.findIndex((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r[idField] === d[idField])) < 0));
            }
            this.log.log('Syncing Database - Syncing ' + collectionName + ' done : ' + data.length + ' entities locally');
            return this.localForage.set(cacheKey, data);
        }));
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    clearDatabaseCollection(collectionName) {
        /** @type {?} */
        let cacheKey = this.getDatabaseCacheKey(collectionName);
        this.log.log('Syncing Database - Clearing ' + collectionName);
        return this.localForage.remove(cacheKey);
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} patch
     * @param {?=} idField
     * @return {?}
     */
    upsertInDatabaseCollection(collectionName, entity, patch = false, idField = '_id') {
        entity[idField] = entity[idField] || Cache.OFFLINE_PREFIX + getUUID();
        return this.getByIdFromDatabaseCollection(collectionName, entity[idField]).then((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && patch) {
                entity = Object.assign({}, retVal, ((/** @type {?} */ (entity))));
            }
            return this.updateDatabaseCollection(collectionName, [entity], idField).then((/**
             * @return {?}
             */
            () => {
                return entity;
            }));
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    removeFromDatabaseCollection(collectionName, id, idField = '_id') {
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            d => d[idField] !== id));
            return this.setDatabaseCollection(collectionName, data);
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?} newEntity
     * @param {?=} idField
     * @return {?}
     */
    replaceFromDatabaseCollection(collectionName, id, newEntity, idField = '_id') {
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            data = data.filter((/**
             * @param {?} d
             * @return {?}
             */
            d => d[idField] !== id));
            data = [...data, newEntity];
            return this.setDatabaseCollection(collectionName, data);
        }));
    }
    /**
     * @template T
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} idField
     * @return {?}
     */
    getByIdFromDatabaseCollection(collectionName, id, idField = '_id') {
        return this.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let retVal = data.find((/**
             * @param {?} d
             * @return {?}
             */
            d => d[idField] === id));
            return retVal;
        }));
    }
}
Cache.OFFLINE_PREFIX = 'offline_';
Cache.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Cache.ctorParameters = () => [
    { type: LocalForageService },
    { type: PromiseService },
    { type: Log }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jYWNoZS9jYWNoZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBVyxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHakMsTUFBTSxPQUFPLEtBQUs7Ozs7OztJQUdoQixZQUFzQixXQUErQixFQUFZLE9BQXVCLEVBQVksR0FBUTtRQUF0RixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUFZLFFBQUcsR0FBSCxHQUFHLENBQUs7SUFBRyxDQUFDOzs7Ozs7O0lBRWhILEdBQUcsQ0FBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsSUFBUztRQUMvQyxPQUFPLElBQUksQ0FBQyxXQUFXO2FBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFDYixJQUFJOzs7O1FBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNsQixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNsQixJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDO2FB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SSxDQUFDLHFCQUFxQixDQUFJLGNBQWMsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTtZQUMvRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQztZQUMzQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBSSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQUVELDZCQUE2QixDQUFjLGNBQXNCLEVBQUUsRUFBVSxFQUFFLFVBQWtCLEtBQUs7UUFDcEcsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUksY0FBYyxDQUFDLENBQUMsSUFBSTs7OztRQUFDLElBQUksQ0FBQyxFQUFFOztnQkFDM0QsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFDO1lBQzlDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7QUF2SGEsb0JBQWMsR0FBRyxVQUFVLENBQUM7O1lBRjNDLFVBQVU7Ozs7WUFQRixrQkFBa0I7WUFBRSxjQUFjO1lBQUUsR0FBRzs7OztJQVM5QyxxQkFBMEM7Ozs7O0lBRTlCLDRCQUF5Qzs7Ozs7SUFBRSx3QkFBaUM7Ozs7O0lBQUUsb0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJRW50aXR5LCBnZXRVVUlEIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IExvY2FsRm9yYWdlU2VydmljZSwgUHJvbWlzZVNlcnZpY2UsIExvZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcblxuaW1wb3J0IHsgQ0FDSEVfS0VZUyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY2FjaGUvY2FjaGUuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsga2V5cyB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZSB7XG4gIHB1YmxpYyBzdGF0aWMgT0ZGTElORV9QUkVGSVggPSAnb2ZmbGluZV8nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBsb2NhbEZvcmFnZTogTG9jYWxGb3JhZ2VTZXJ2aWNlLCBwcm90ZWN0ZWQgcHJvbWlzZTogUHJvbWlzZVNlcnZpY2UsIHByb3RlY3RlZCBsb2c6IExvZykge31cblxuICBhZGQoY2FjaGVLZXk6IHN0cmluZywgZW50cnlLZXk6IHN0cmluZywgaXRlbTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2VcbiAgICAgIC5nZXQoY2FjaGVLZXkpXG4gICAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICBpZiAoZW50cnlLZXkpIHtcbiAgICAgICAgICBkYXRhW2VudHJ5S2V5XSA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2Uuc2V0KGNhY2hlS2V5LCBkYXRhKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiBpdGVtKTtcbiAgfVxuXG4gIGdldChjYWNoZUtleTogc3RyaW5nLCBlbnRyeUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZyb20oXG4gICAgICB0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUtleSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgIHJldHVybiBkYXRhW2VudHJ5S2V5XSB8fCB7fTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldEFsbChjYWNoZUtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2UuZ2V0KGNhY2hlS2V5KS50aGVuKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgbGV0IHJldFZhbCA9IFtdO1xuICAgICAga2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChkYXRhW2tleV0pIHtcbiAgICAgICAgICByZXRWYWwucHVzaChkYXRhW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmUoY2FjaGVLZXk6IHN0cmluZywgZW50cnlLZXk6IHN0cmluZykge1xuICAgIHJldHVybiBmcm9tKFxuICAgICAgdGhpcy5sb2NhbEZvcmFnZS5nZXQoY2FjaGVLZXkpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICBkZWxldGUgZGF0YVtlbnRyeUtleV07XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlLnNldChjYWNoZUtleSwgZGF0YSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXREYXRhYmFzZUNhY2hlS2V5KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gQ0FDSEVfS0VZUy5kYXRhYmFzZSArICcuJyArIGNvbGxlY3Rpb25OYW1lO1xuICB9XG5cbiAgZ2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQgPSBJRW50aXR5Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxUPj4ge1xuICAgIGxldCBjYWNoZUtleSA9IHRoaXMuZ2V0RGF0YWJhc2VDYWNoZUtleShjb2xsZWN0aW9uTmFtZSk7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxGb3JhZ2UuZ2V0KGNhY2hlS2V5KS50aGVuKChkYXRhOiBBcnJheTxUPikgPT4ge1xuICAgICAgcmV0dXJuIGRhdGEgfHwgW107XG4gICAgfSk7XG4gIH1cblxuICBzZXREYXRhYmFzZUNvbGxlY3Rpb248VCA9IElFbnRpdHk+KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGl0ZW1zOiBBcnJheTxUPik6IFByb21pc2U8QXJyYXk8VD4+IHtcbiAgICBsZXQgY2FjaGVLZXkgPSB0aGlzLmdldERhdGFiYXNlQ2FjaGVLZXkoY29sbGVjdGlvbk5hbWUpO1xuICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlLnNldChjYWNoZUtleSwgaXRlbXMpO1xuICB9XG5cbiAgdXBkYXRlRGF0YWJhc2VDb2xsZWN0aW9uPFQgPSBJRW50aXR5Pihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpdGVtczogQXJyYXk8VD4sIGlkRmllbGQ6IHN0cmluZyA9ICdfaWQnLCBkZWxldGVkS2V5cz86IEFycmF5PHN0cmluZz4pIHtcbiAgICBsZXQgY2FjaGVLZXkgPSB0aGlzLmdldERhdGFiYXNlQ2FjaGVLZXkoY29sbGVjdGlvbk5hbWUpO1xuICAgIHJldHVybiB0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUtleSkudGhlbigoZGF0YTogQXJyYXk8VD4pID0+IHtcbiAgICAgIGRhdGEgPSBkYXRhIHx8IFtdO1xuICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gaXRlbXMuZmluZEluZGV4KHIgPT4gcltpZEZpZWxkXSA9PT0gZFtpZEZpZWxkXSkgPCAwKTtcbiAgICAgIH1cbiAgICAgIGRhdGEgPSBbLi4uZGF0YSwgLi4uaXRlbXNdO1xuICAgICAgaWYgKGRlbGV0ZWRLZXlzICYmIGRlbGV0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gZGVsZXRlZEtleXMuZmluZEluZGV4KHIgPT4gcltpZEZpZWxkXSA9PT0gZFtpZEZpZWxkXSkgPCAwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9nLmxvZygnU3luY2luZyBEYXRhYmFzZSAtIFN5bmNpbmcgJyArIGNvbGxlY3Rpb25OYW1lICsgJyBkb25lIDogJyArIGRhdGEubGVuZ3RoICsgJyBlbnRpdGllcyBsb2NhbGx5Jyk7XG4gICAgICByZXR1cm4gdGhpcy5sb2NhbEZvcmFnZS5zZXQoY2FjaGVLZXksIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJEYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWU6IHN0cmluZykge1xuICAgIGxldCBjYWNoZUtleSA9IHRoaXMuZ2V0RGF0YWJhc2VDYWNoZUtleShjb2xsZWN0aW9uTmFtZSk7XG4gICAgdGhpcy5sb2cubG9nKCdTeW5jaW5nIERhdGFiYXNlIC0gQ2xlYXJpbmcgJyArIGNvbGxlY3Rpb25OYW1lKTtcbiAgICByZXR1cm4gdGhpcy5sb2NhbEZvcmFnZS5yZW1vdmUoY2FjaGVLZXkpO1xuICB9XG5cbiAgdXBzZXJ0SW5EYXRhYmFzZUNvbGxlY3Rpb248VCA9IElFbnRpdHk+KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGVudGl0eTogVCwgcGF0Y2g6IGJvb2xlYW4gPSBmYWxzZSwgaWRGaWVsZDogc3RyaW5nID0gJ19pZCcpIHtcbiAgICBlbnRpdHlbaWRGaWVsZF0gPSBlbnRpdHlbaWRGaWVsZF0gfHwgQ2FjaGUuT0ZGTElORV9QUkVGSVggKyBnZXRVVUlEKCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QnlJZEZyb21EYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIGVudGl0eVtpZEZpZWxkXSkudGhlbihyZXRWYWwgPT4ge1xuICAgICAgaWYgKHJldFZhbCAmJiBwYXRjaCkge1xuICAgICAgICBlbnRpdHkgPSB7IC4uLnJldFZhbCwgLi4uKGVudGl0eSBhcyBhbnkpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVEYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIFtlbnRpdHldLCBpZEZpZWxkKS50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlRnJvbURhdGFiYXNlQ29sbGVjdGlvbjxUID0gSUVudGl0eT4oY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IHN0cmluZywgaWRGaWVsZDogc3RyaW5nID0gJ19pZCcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhYmFzZUNvbGxlY3Rpb248VD4oY29sbGVjdGlvbk5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICBkYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBkW2lkRmllbGRdICE9PSBpZCk7XG4gICAgICByZXR1cm4gdGhpcy5zZXREYXRhYmFzZUNvbGxlY3Rpb248VD4oY29sbGVjdGlvbk5hbWUsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVwbGFjZUZyb21EYXRhYmFzZUNvbGxlY3Rpb248VCA9IElFbnRpdHk+KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcsIG5ld0VudGl0eTogVCwgaWRGaWVsZDogc3RyaW5nID0gJ19pZCcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhYmFzZUNvbGxlY3Rpb248VD4oY29sbGVjdGlvbk5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICBkYXRhID0gZGF0YS5maWx0ZXIoZCA9PiBkW2lkRmllbGRdICE9PSBpZCk7XG4gICAgICBkYXRhID0gWy4uLmRhdGEsIG5ld0VudGl0eV07XG4gICAgICByZXR1cm4gdGhpcy5zZXREYXRhYmFzZUNvbGxlY3Rpb248VD4oY29sbGVjdGlvbk5hbWUsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0QnlJZEZyb21EYXRhYmFzZUNvbGxlY3Rpb248VCA9IElFbnRpdHk+KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGlkRmllbGQ6IHN0cmluZyA9ICdfaWQnKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YWJhc2VDb2xsZWN0aW9uPFQ+KGNvbGxlY3Rpb25OYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgbGV0IHJldFZhbCA9IGRhdGEuZmluZChkID0+IGRbaWRGaWVsZF0gPT09IGlkKTtcbiAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==