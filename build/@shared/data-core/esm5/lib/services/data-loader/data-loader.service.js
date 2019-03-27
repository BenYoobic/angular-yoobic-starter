/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Models } from '../models/models.service';
import { Entity } from '../../interfaces/entity/entity.interface';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, mergeMap } from 'rxjs/operators';
import { orderBy, isArray, isObject, keys, isEqual, isFunction, isEmpty, isNumber } from 'lodash-es';
var DataLoader = /** @class */ (function () {
    function DataLoader(broker, collectionName, items, pageSize, translate, translateService, looseCount) {
        if (items === void 0) { items = null; }
        if (pageSize === void 0) { pageSize = null; }
        if (translate === void 0) { translate = null; }
        if (translateService === void 0) { translateService = null; }
        if (looseCount === void 0) { looseCount = null; }
        this.broker = broker;
        this._currentPage = 0;
        this._total = 0;
        this._collectionName = '';
        this._loading = false;
        this._collectionName = Models.fixCollectionName(collectionName);
        this._items = items;
        this._translate = translate;
        this._looseCount = looseCount;
        if (pageSize && isNumber(pageSize) && pageSize > 0) {
            this._pageSize = pageSize;
        }
        else {
            this._pageSize = 21;
        }
        this.filterPipe = new FilterPipe(translateService);
    }
    Object.defineProperty(DataLoader.prototype, "pageSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pageSize;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._pageSize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "currentPage", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "total", {
        get: /**
         * @return {?}
         */
        function () {
            return this._total;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._total = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "totalPage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.ceil(this._total / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "loading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "loadingPageCount", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loadingPageCount;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._loadingPageCount = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.loadWithSearch = /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount) {
        if (currentPage === void 0) { currentPage = 0; }
        if (search === void 0) { search = null; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (mapTransform === void 0) { mapTransform = null; }
        if (mapTransformAsync === void 0) { mapTransformAsync = false; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (aggregateOptions === void 0) { aggregateOptions = null; }
        if (aggregateOptionsOffline === void 0) { aggregateOptionsOffline = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        return this.load(currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
    };
    /**
     * @param {?=} start
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.loadWithSearchDebounce = /**
     * @param {?=} start
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (start, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount) {
        var _this = this;
        if (start === void 0) { start = 0; }
        if (search === void 0) { search = null; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (mapTransform === void 0) { mapTransform = null; }
        if (mapTransformAsync === void 0) { mapTransformAsync = false; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (aggregateOptions === void 0) { aggregateOptions = null; }
        if (aggregateOptionsOffline === void 0) { aggregateOptionsOffline = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        if (search) {
            return search.pipe(debounceTime(400), distinctUntilChanged(), switchMap((/**
             * @param {?} term
             * @return {?}
             */
            function (term) { return _this.load(start, term.toString(), filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount); })));
        }
        else {
            return this.load(start, null, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
        }
    };
    /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.load = /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} mapTransform
     * @param {?=} mapTransformAsync
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} aggregateOptions
     * @param {?=} aggregateOptionsOffline
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount) {
        var _this = this;
        if (currentPage === void 0) { currentPage = 0; }
        if (search === void 0) { search = null; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (mapTransform === void 0) { mapTransform = null; }
        if (mapTransformAsync === void 0) { mapTransformAsync = false; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (aggregateOptions === void 0) { aggregateOptions = null; }
        if (aggregateOptionsOffline === void 0) { aggregateOptionsOffline = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        this._loading = true;
        if (search) {
            search = search.trim();
        }
        if ((this._items && this._items.length > 0) || !this._collectionName || isEmpty(this._collectionName)) {
            /** @type {?} */
            var obs = new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                /** @type {?} */
                var data = _this._items || [];
                if (search) {
                    data = _this.filterPipe.transform(data, search, null, null, _this._translate);
                }
                if (sortModel) {
                    data = orderBy(data, sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return s.colId; })), sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    function (s) { return s.sort.toLowerCase(); })));
                }
                _this._total = data.length;
                _this._currentPage = currentPage;
                if (data.slice) {
                    data = data.slice(currentPage * _this.pageSize, (currentPage + 1) * _this.pageSize);
                }
                /** @type {?} */
                var res = {
                    count: _this._total,
                    data: data.map ? data.map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) { return _this.convertItem(value); })) : []
                };
                observer.next(res);
                observer.complete();
            }));
            if (mapTransformAsync && mapTransform) {
                return obs.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else if (mapTransform) {
                return obs.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else {
                return obs;
            }
        }
        else if (aggregateOptions && isFunction(aggregateOptions)) {
            if (!mapTransform) {
                mapTransform = (/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x; });
            }
            return this.broker
                .aggregateQuery(this._collectionName, filters, aggregateOptions(currentPage * this.pageSize, this.pageSize, sortModel, search, filters), search, null, includeCount, cacheId, customFilter, subQuery, aggregateOptionsOffline && isFunction(aggregateOptionsOffline) ? aggregateOptionsOffline(currentPage * this.pageSize, this.pageSize, sortModel, search, filters) : null)
                .pipe(mapTransformAsync ? mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })) : map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })))
                .pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                _this._currentPage = currentPage;
                if (includeCount) {
                    _this._total = retVal.count;
                }
                else if (isObject(retVal) && isArray(retVal.data)) {
                    //nothing to do. used in photo duplicate
                }
                else {
                    retVal = { data: retVal };
                }
                _this._loading = false;
                return retVal;
            })));
        }
        else {
            /** @type {?} */
            var retVal = this.broker.getAll(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, tag, subQuery, customFilter, cacheId, this._looseCount, !includeCount).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this._currentPage = currentPage;
                _this._loading = false;
                if (!includeCount) {
                    _this._total = Math.max(-1, _this._total);
                    return { count: _this._total, data: res };
                }
                else {
                    _this._total = res.count;
                    return res;
                }
            })));
            if (mapTransformAsync && mapTransform) {
                return retVal.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else if (mapTransform) {
                return retVal.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) { return mapTransform(res, search, filters, currentPage, _this.pageSize); })));
            }
            else {
                return retVal;
            }
        }
    };
    /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    DataLoader.prototype.getQuery = /**
     * @param {?=} currentPage
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sortModel
     * @param {?=} subQuery
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} customFilter
     * @param {?=} includeCount
     * @return {?}
     */
    function (currentPage, search, filters, sortModel, subQuery, fields, include, customFilter, includeCount) {
        if (currentPage === void 0) { currentPage = 0; }
        if (filters === void 0) { filters = []; }
        if (sortModel === void 0) { sortModel = null; }
        if (subQuery === void 0) { subQuery = null; }
        if (fields === void 0) { fields = null; }
        if (include === void 0) { include = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (includeCount === void 0) { includeCount = false; }
        return this.broker.getQuery(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, subQuery, customFilter);
    };
    /**
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    DataLoader.prototype.getCount = /**
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    function (search, filters, subQuery, customFilter) {
        var _this = this;
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        return this.broker.getCount(this._collectionName, search, filters, subQuery, customFilter).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            _this._total = ret.count;
            return ret;
        })));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DataLoader.prototype.convertItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return new Entity(value);
        }
        else if (isEqual(keys(value), ['_id'])) {
            return new Entity(value._id);
        }
        else if (typeof value === 'undefined') {
            return new Entity('undefined');
        }
        else {
            return value;
        }
    };
    return DataLoader;
}());
export { DataLoader };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._currentPage;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._total;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._collectionName;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._loading;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._pageSize;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._items;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._translate;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype.filterPipe;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._looseCount;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype._loadingPageCount;
    /**
     * @type {?}
     * @private
     */
    DataLoader.prototype.broker;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kYXRhLWxvYWRlci9kYXRhLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUc1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVyRztJQWdERSxvQkFBb0IsTUFBYyxFQUFFLGNBQXNCLEVBQUUsS0FBd0IsRUFBRSxRQUF1QixFQUFFLFNBQXlCLEVBQUUsZ0JBQWtDLEVBQUUsVUFBMEI7UUFBNUksc0JBQUEsRUFBQSxZQUF3QjtRQUFFLHlCQUFBLEVBQUEsZUFBdUI7UUFBRSwwQkFBQSxFQUFBLGdCQUF5QjtRQUFFLGlDQUFBLEVBQUEsdUJBQWtDO1FBQUUsMkJBQUEsRUFBQSxpQkFBMEI7UUFBcEwsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVgxQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVN2QixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FB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O0lBQzdCLHVDQUFtQzs7Ozs7SUFFdkIsNEJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuaW1wb3J0IHsgQnJva2VyIH0gZnJvbSAnLi4vYnJva2VyL2Jyb2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMuc2VydmljZSc7XG5cbmltcG9ydCB7IFJlc3BvbnNlT2JqZWN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2VudGl0eS9lbnRpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZpbHRlclBpcGUgfSBmcm9tICcuLi8uLi9waXBlcy9maWx0ZXIvZmlsdGVyLnBpcGUnO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN3aXRjaE1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IG9yZGVyQnksIGlzQXJyYXksIGlzT2JqZWN0LCBrZXlzLCBpc0VxdWFsLCBpc0Z1bmN0aW9uLCBpc0VtcHR5LCBpc051bWJlciB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmV4cG9ydCBjbGFzcyBEYXRhTG9hZGVyIHtcbiAgcHVibGljIGdldCBwYWdlU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZVNpemU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHBhZ2VTaXplKHZhbCkge1xuICAgIHRoaXMuX3BhZ2VTaXplID0gdmFsO1xuICB9XG5cbiAgcHVibGljIGdldCBjdXJyZW50UGFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRvdGFsKCkge1xuICAgIHJldHVybiB0aGlzLl90b3RhbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG90YWwodmFsdWUpIHtcbiAgICB0aGlzLl90b3RhbCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCB0b3RhbFBhZ2UoKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLl90b3RhbCAvIHRoaXMucGFnZVNpemUpO1xuICB9XG5cbiAgcHVibGljIGdldCBsb2FkaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgcHVibGljIGdldCBsb2FkaW5nUGFnZUNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nUGFnZUNvdW50O1xuICB9XG5cbiAgcHVibGljIHNldCBsb2FkaW5nUGFnZUNvdW50KHZhbHVlKSB7XG4gICAgdGhpcy5fbG9hZGluZ1BhZ2VDb3VudCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAwO1xuICBwcml2YXRlIF90b3RhbCA9IDA7XG4gIHByaXZhdGUgX2NvbGxlY3Rpb25OYW1lID0gJyc7XG4gIHByaXZhdGUgX2xvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFnZVNpemU6IG51bWJlcjsgLy9Db3JlQ29uZmlnLmlzV2ViKCkgPyAzMCA6XG4gIHByaXZhdGUgX2l0ZW1zOiBBcnJheTxhbnk+O1xuICBwcml2YXRlIF90cmFuc2xhdGU6IGJvb2xlYW47XG4gIHByaXZhdGUgZmlsdGVyUGlwZTogRmlsdGVyUGlwZTtcbiAgcHJpdmF0ZSBfbG9vc2VDb3VudDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfbG9hZGluZ1BhZ2VDb3VudDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyb2tlcjogQnJva2VyLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpdGVtczogQXJyYXk8YW55PiA9IG51bGwsIHBhZ2VTaXplOiBudW1iZXIgPSBudWxsLCB0cmFuc2xhdGU6IGJvb2xlYW4gPSBudWxsLCB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGUgPSBudWxsLCBsb29zZUNvdW50OiBib29sZWFuID0gbnVsbCkge1xuICAgIHRoaXMuX2NvbGxlY3Rpb25OYW1lID0gTW9kZWxzLmZpeENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgIHRoaXMuX3RyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcbiAgICB0aGlzLl9sb29zZUNvdW50ID0gbG9vc2VDb3VudDtcbiAgICBpZiAocGFnZVNpemUgJiYgaXNOdW1iZXIocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCkge1xuICAgICAgdGhpcy5fcGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcGFnZVNpemUgPSAyMTtcbiAgICB9XG4gICAgdGhpcy5maWx0ZXJQaXBlID0gbmV3IEZpbHRlclBpcGUodHJhbnNsYXRlU2VydmljZSk7XG4gIH1cblxuICBsb2FkV2l0aFNlYXJjaChjdXJyZW50UGFnZTogbnVtYmVyID0gMCwgc2VhcmNoOiBzdHJpbmcgPSBudWxsLCBmaWx0ZXJzID0gW10sIHNvcnRNb2RlbCA9IG51bGwsIG1hcFRyYW5zZm9ybSA9IG51bGwsIG1hcFRyYW5zZm9ybUFzeW5jID0gZmFsc2UsIHRhZyA9IGZhbHNlLCBzdWJRdWVyeSA9IG51bGwsIGZpZWxkczogc3RyaW5nW10gPSBudWxsLCBpbmNsdWRlOiBzdHJpbmdbXSA9IG51bGwsIGFnZ3JlZ2F0ZU9wdGlvbnM6IChza2lwLCBsaW1pdCwgc29ydHMsIHNlYXJjaCwgZmlsdGVycykgPT4gQXJyYXk8YW55PiA9IG51bGwsIGFnZ3JlZ2F0ZU9wdGlvbnNPZmZsaW5lOiAoc2tpcCwgbGltaXQsIHNvcnRzLCBzZWFyY2gsIGZpbHRlcnMpID0+IEFycmF5PGFueT4gPSBudWxsLCBjYWNoZUlkOiBzdHJpbmcgPSBudWxsLCBjdXN0b21GaWx0ZXI6IGFueSA9IG51bGwsIGluY2x1ZGVDb3VudCA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZChjdXJyZW50UGFnZSwgc2VhcmNoLCBmaWx0ZXJzLCBzb3J0TW9kZWwsIG1hcFRyYW5zZm9ybSwgbWFwVHJhbnNmb3JtQXN5bmMsIHRhZywgc3ViUXVlcnksIGZpZWxkcywgaW5jbHVkZSwgYWdncmVnYXRlT3B0aW9ucywgYWdncmVnYXRlT3B0aW9uc09mZmxpbmUsIGNhY2hlSWQsIGN1c3RvbUZpbHRlciwgaW5jbHVkZUNvdW50KTtcbiAgfVxuXG4gIGxvYWRXaXRoU2VhcmNoRGVib3VuY2Uoc3RhcnQgPSAwLCBzZWFyY2g6IE9ic2VydmFibGU8c3RyaW5nPiA9IG51bGwsIGZpbHRlcnMgPSBbXSwgc29ydE1vZGVsID0gbnVsbCwgbWFwVHJhbnNmb3JtID0gbnVsbCwgbWFwVHJhbnNmb3JtQXN5bmMgPSBmYWxzZSwgdGFnID0gZmFsc2UsIHN1YlF1ZXJ5ID0gbnVsbCwgZmllbGRzOiBzdHJpbmdbXSA9IG51bGwsIGluY2x1ZGU6IHN0cmluZ1tdID0gbnVsbCwgYWdncmVnYXRlT3B0aW9uczogKHNraXAsIGxpbWl0LCBzb3J0cywgc2VhcmNoLCBmaWx0ZXJzKSA9PiBBcnJheTxhbnk+ID0gbnVsbCwgYWdncmVnYXRlT3B0aW9uc09mZmxpbmU6IChza2lwLCBsaW1pdCwgc29ydHMsIHNlYXJjaCwgZmlsdGVycykgPT4gQXJyYXk8YW55PiA9IG51bGwsIGNhY2hlSWQ6IHN0cmluZyA9IG51bGwsIGN1c3RvbUZpbHRlcjogYW55ID0gbnVsbCwgaW5jbHVkZUNvdW50ID0gZmFsc2UpIHtcbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICByZXR1cm4gc2VhcmNoLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSg0MDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAodGVybSA9PiB0aGlzLmxvYWQoc3RhcnQsIHRlcm0udG9TdHJpbmcoKSwgZmlsdGVycywgc29ydE1vZGVsLCBtYXBUcmFuc2Zvcm0sIG1hcFRyYW5zZm9ybUFzeW5jLCB0YWcsIHN1YlF1ZXJ5LCBmaWVsZHMsIGluY2x1ZGUsIGFnZ3JlZ2F0ZU9wdGlvbnMsIGFnZ3JlZ2F0ZU9wdGlvbnNPZmZsaW5lLCBjYWNoZUlkLCBjdXN0b21GaWx0ZXIsIGluY2x1ZGVDb3VudCkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkKHN0YXJ0LCBudWxsLCBmaWx0ZXJzLCBzb3J0TW9kZWwsIG1hcFRyYW5zZm9ybSwgbWFwVHJhbnNmb3JtQXN5bmMsIHRhZywgc3ViUXVlcnksIGZpZWxkcywgaW5jbHVkZSwgYWdncmVnYXRlT3B0aW9ucywgYWdncmVnYXRlT3B0aW9uc09mZmxpbmUsIGNhY2hlSWQsIGN1c3RvbUZpbHRlciwgaW5jbHVkZUNvdW50KTtcbiAgICB9XG4gIH1cblxuICBsb2FkKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAwLCBzZWFyY2g6IHN0cmluZyA9IG51bGwsIGZpbHRlcnMgPSBbXSwgc29ydE1vZGVsID0gbnVsbCwgbWFwVHJhbnNmb3JtID0gbnVsbCwgbWFwVHJhbnNmb3JtQXN5bmMgPSBmYWxzZSwgdGFnID0gZmFsc2UsIHN1YlF1ZXJ5ID0gbnVsbCwgZmllbGRzOiBzdHJpbmdbXSA9IG51bGwsIGluY2x1ZGU6IHN0cmluZ1tdID0gbnVsbCwgYWdncmVnYXRlT3B0aW9uczogKHNraXAsIGxpbWl0LCBzb3J0cywgc2VhcmNoLCBmaWx0ZXJzKSA9PiBBcnJheTxhbnk+ID0gbnVsbCwgYWdncmVnYXRlT3B0aW9uc09mZmxpbmU6IChza2lwLCBsaW1pdCwgc29ydHMsIHNlYXJjaCwgZmlsdGVycykgPT4gQXJyYXk8YW55PiA9IG51bGwsIGNhY2hlSWQ6IHN0cmluZyA9IG51bGwsIGN1c3RvbUZpbHRlcjogYW55ID0gbnVsbCwgaW5jbHVkZUNvdW50ID0gZmFsc2UpIHtcbiAgICB0aGlzLl9sb2FkaW5nID0gdHJ1ZTtcbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBzZWFyY2ggPSBzZWFyY2gudHJpbSgpO1xuICAgIH1cbiAgICBpZiAoKHRoaXMuX2l0ZW1zICYmIHRoaXMuX2l0ZW1zLmxlbmd0aCA+IDApIHx8ICF0aGlzLl9jb2xsZWN0aW9uTmFtZSB8fCBpc0VtcHR5KHRoaXMuX2NvbGxlY3Rpb25OYW1lKSkge1xuICAgICAgbGV0IG9icyA9IG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9pdGVtcyB8fCBbXTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgIGRhdGEgPSB0aGlzLmZpbHRlclBpcGUudHJhbnNmb3JtKGRhdGEsIHNlYXJjaCwgbnVsbCwgbnVsbCwgdGhpcy5fdHJhbnNsYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc29ydE1vZGVsKSB7XG4gICAgICAgICAgZGF0YSA9IG9yZGVyQnkoZGF0YSwgc29ydE1vZGVsLm1hcChzID0+IHMuY29sSWQpLCBzb3J0TW9kZWwubWFwKHMgPT4gcy5zb3J0LnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b3RhbCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlO1xuXG4gICAgICAgIGlmIChkYXRhLnNsaWNlKSB7XG4gICAgICAgICAgZGF0YSA9IGRhdGEuc2xpY2UoY3VycmVudFBhZ2UgKiB0aGlzLnBhZ2VTaXplLCAoY3VycmVudFBhZ2UgKyAxKSAqIHRoaXMucGFnZVNpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlczogUmVzcG9uc2VPYmplY3QgPSB7XG4gICAgICAgICAgY291bnQ6IHRoaXMuX3RvdGFsLFxuICAgICAgICAgIGRhdGE6IGRhdGEubWFwID8gZGF0YS5tYXAodmFsdWUgPT4gdGhpcy5jb252ZXJ0SXRlbSh2YWx1ZSkpIDogW11cbiAgICAgICAgfTtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXMpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAobWFwVHJhbnNmb3JtQXN5bmMgJiYgbWFwVHJhbnNmb3JtKSB7XG4gICAgICAgIHJldHVybiBvYnMucGlwZShtZXJnZU1hcChyZXMgPT4gbWFwVHJhbnNmb3JtKHJlcywgc2VhcmNoLCBmaWx0ZXJzLCBjdXJyZW50UGFnZSwgdGhpcy5wYWdlU2l6ZSkpKTtcbiAgICAgIH0gZWxzZSBpZiAobWFwVHJhbnNmb3JtKSB7XG4gICAgICAgIHJldHVybiBvYnMucGlwZShtYXAocmVzID0+IG1hcFRyYW5zZm9ybShyZXMsIHNlYXJjaCwgZmlsdGVycywgY3VycmVudFBhZ2UsIHRoaXMucGFnZVNpemUpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWdncmVnYXRlT3B0aW9ucyAmJiBpc0Z1bmN0aW9uKGFnZ3JlZ2F0ZU9wdGlvbnMpKSB7XG4gICAgICBpZiAoIW1hcFRyYW5zZm9ybSkge1xuICAgICAgICBtYXBUcmFuc2Zvcm0gPSB4ID0+IHg7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5icm9rZXJcbiAgICAgICAgLmFnZ3JlZ2F0ZVF1ZXJ5KHRoaXMuX2NvbGxlY3Rpb25OYW1lLCBmaWx0ZXJzLCBhZ2dyZWdhdGVPcHRpb25zKGN1cnJlbnRQYWdlICogdGhpcy5wYWdlU2l6ZSwgdGhpcy5wYWdlU2l6ZSwgc29ydE1vZGVsLCBzZWFyY2gsIGZpbHRlcnMpLCBzZWFyY2gsIG51bGwsIGluY2x1ZGVDb3VudCwgY2FjaGVJZCwgY3VzdG9tRmlsdGVyLCBzdWJRdWVyeSwgYWdncmVnYXRlT3B0aW9uc09mZmxpbmUgJiYgaXNGdW5jdGlvbihhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZSkgPyBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZShjdXJyZW50UGFnZSAqIHRoaXMucGFnZVNpemUsIHRoaXMucGFnZVNpemUsIHNvcnRNb2RlbCwgc2VhcmNoLCBmaWx0ZXJzKSA6IG51bGwpXG4gICAgICAgIC5waXBlKG1hcFRyYW5zZm9ybUFzeW5jID8gbWVyZ2VNYXAocmVzID0+IG1hcFRyYW5zZm9ybShyZXMsIHNlYXJjaCwgZmlsdGVycywgY3VycmVudFBhZ2UsIHRoaXMucGFnZVNpemUpKSA6IG1hcChyZXMgPT4gbWFwVHJhbnNmb3JtKHJlcywgc2VhcmNoLCBmaWx0ZXJzLCBjdXJyZW50UGFnZSwgdGhpcy5wYWdlU2l6ZSkpKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XG4gICAgICAgICAgICBpZiAoaW5jbHVkZUNvdW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuX3RvdGFsID0gcmV0VmFsLmNvdW50O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChyZXRWYWwpICYmIGlzQXJyYXkocmV0VmFsLmRhdGEpKSB7XG4gICAgICAgICAgICAgIC8vbm90aGluZyB0byBkby4gdXNlZCBpbiBwaG90byBkdXBsaWNhdGVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldFZhbCA9IHsgZGF0YTogcmV0VmFsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXRWYWwgPSB0aGlzLmJyb2tlci5nZXRBbGwodGhpcy5fY29sbGVjdGlvbk5hbWUsIGZpZWxkcywgaW5jbHVkZSwgc2VhcmNoLCBmaWx0ZXJzLCBzb3J0TW9kZWwsIGN1cnJlbnRQYWdlICogdGhpcy5wYWdlU2l6ZSwgdGhpcy5wYWdlU2l6ZSwgdGFnLCBzdWJRdWVyeSwgY3VzdG9tRmlsdGVyLCBjYWNoZUlkLCB0aGlzLl9sb29zZUNvdW50LCAhaW5jbHVkZUNvdW50KS5waXBlKFxuICAgICAgICBtYXAoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCFpbmNsdWRlQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsID0gTWF0aC5tYXgoLTEsIHRoaXMuX3RvdGFsKTtcbiAgICAgICAgICAgIHJldHVybiB7IGNvdW50OiB0aGlzLl90b3RhbCwgZGF0YTogcmVzIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsID0gcmVzLmNvdW50O1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgaWYgKG1hcFRyYW5zZm9ybUFzeW5jICYmIG1hcFRyYW5zZm9ybSkge1xuICAgICAgICByZXR1cm4gcmV0VmFsLnBpcGUobWVyZ2VNYXAocmVzID0+IG1hcFRyYW5zZm9ybShyZXMsIHNlYXJjaCwgZmlsdGVycywgY3VycmVudFBhZ2UsIHRoaXMucGFnZVNpemUpKSk7XG4gICAgICB9IGVsc2UgaWYgKG1hcFRyYW5zZm9ybSkge1xuICAgICAgICByZXR1cm4gcmV0VmFsLnBpcGUobWFwKHJlcyA9PiBtYXBUcmFuc2Zvcm0ocmVzLCBzZWFyY2gsIGZpbHRlcnMsIGN1cnJlbnRQYWdlLCB0aGlzLnBhZ2VTaXplKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRRdWVyeShjdXJyZW50UGFnZTogbnVtYmVyID0gMCwgc2VhcmNoOiBzdHJpbmcsIGZpbHRlcnMgPSBbXSwgc29ydE1vZGVsID0gbnVsbCwgc3ViUXVlcnkgPSBudWxsLCBmaWVsZHM6IHN0cmluZ1tdID0gbnVsbCwgaW5jbHVkZTogc3RyaW5nW10gPSBudWxsLCBjdXN0b21GaWx0ZXI6IGFueSA9IG51bGwsIGluY2x1ZGVDb3VudCA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRRdWVyeSh0aGlzLl9jb2xsZWN0aW9uTmFtZSwgZmllbGRzLCBpbmNsdWRlLCBzZWFyY2gsIGZpbHRlcnMsIHNvcnRNb2RlbCwgY3VycmVudFBhZ2UgKiB0aGlzLnBhZ2VTaXplLCB0aGlzLnBhZ2VTaXplLCBzdWJRdWVyeSwgY3VzdG9tRmlsdGVyKTtcbiAgfVxuXG4gIGdldENvdW50KHNlYXJjaD86IHN0cmluZywgZmlsdGVycz8sIHN1YlF1ZXJ5ID0gbnVsbCwgY3VzdG9tRmlsdGVyID0gbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRDb3VudCh0aGlzLl9jb2xsZWN0aW9uTmFtZSwgc2VhcmNoLCBmaWx0ZXJzLCBzdWJRdWVyeSwgY3VzdG9tRmlsdGVyKS5waXBlKFxuICAgICAgbWFwKHJldCA9PiB7XG4gICAgICAgIHRoaXMuX3RvdGFsID0gcmV0LmNvdW50O1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY29udmVydEl0ZW0odmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gbmV3IEVudGl0eSh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc0VxdWFsKGtleXModmFsdWUpLCBbJ19pZCddKSkge1xuICAgICAgcmV0dXJuIG5ldyBFbnRpdHkodmFsdWUuX2lkKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBuZXcgRW50aXR5KCd1bmRlZmluZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19