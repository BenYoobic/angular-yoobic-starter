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
export class DataLoader {
    /**
     * @param {?} broker
     * @param {?} collectionName
     * @param {?=} items
     * @param {?=} pageSize
     * @param {?=} translate
     * @param {?=} translateService
     * @param {?=} looseCount
     */
    constructor(broker, collectionName, items = null, pageSize = null, translate = null, translateService = null, looseCount = null) {
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
    /**
     * @return {?}
     */
    get pageSize() {
        return this._pageSize;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set pageSize(val) {
        this._pageSize = val;
    }
    /**
     * @return {?}
     */
    get currentPage() {
        return this._currentPage;
    }
    /**
     * @return {?}
     */
    get total() {
        return this._total;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) {
        this._total = value;
    }
    /**
     * @return {?}
     */
    get totalPage() {
        return Math.ceil(this._total / this.pageSize);
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @return {?}
     */
    get loadingPageCount() {
        return this._loadingPageCount;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loadingPageCount(value) {
        this._loadingPageCount = value;
    }
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
    loadWithSearch(currentPage = 0, search = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields = null, include = null, aggregateOptions = null, aggregateOptionsOffline = null, cacheId = null, customFilter = null, includeCount = false) {
        return this.load(currentPage, search, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
    }
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
    loadWithSearchDebounce(start = 0, search = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields = null, include = null, aggregateOptions = null, aggregateOptionsOffline = null, cacheId = null, customFilter = null, includeCount = false) {
        if (search) {
            return search.pipe(debounceTime(400), distinctUntilChanged(), switchMap((/**
             * @param {?} term
             * @return {?}
             */
            term => this.load(start, term.toString(), filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount))));
        }
        else {
            return this.load(start, null, filters, sortModel, mapTransform, mapTransformAsync, tag, subQuery, fields, include, aggregateOptions, aggregateOptionsOffline, cacheId, customFilter, includeCount);
        }
    }
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
    load(currentPage = 0, search = null, filters = [], sortModel = null, mapTransform = null, mapTransformAsync = false, tag = false, subQuery = null, fields = null, include = null, aggregateOptions = null, aggregateOptionsOffline = null, cacheId = null, customFilter = null, includeCount = false) {
        this._loading = true;
        if (search) {
            search = search.trim();
        }
        if ((this._items && this._items.length > 0) || !this._collectionName || isEmpty(this._collectionName)) {
            /** @type {?} */
            let obs = new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                /** @type {?} */
                let data = this._items || [];
                if (search) {
                    data = this.filterPipe.transform(data, search, null, null, this._translate);
                }
                if (sortModel) {
                    data = orderBy(data, sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => s.colId)), sortModel.map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => s.sort.toLowerCase())));
                }
                this._total = data.length;
                this._currentPage = currentPage;
                if (data.slice) {
                    data = data.slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize);
                }
                /** @type {?} */
                let res = {
                    count: this._total,
                    data: data.map ? data.map((/**
                     * @param {?} value
                     * @return {?}
                     */
                    value => this.convertItem(value))) : []
                };
                observer.next(res);
                observer.complete();
            }));
            if (mapTransformAsync && mapTransform) {
                return obs.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
            }
            else if (mapTransform) {
                return obs.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
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
                x => x);
            }
            return this.broker
                .aggregateQuery(this._collectionName, filters, aggregateOptions(currentPage * this.pageSize, this.pageSize, sortModel, search, filters), search, null, includeCount, cacheId, customFilter, subQuery, aggregateOptionsOffline && isFunction(aggregateOptionsOffline) ? aggregateOptionsOffline(currentPage * this.pageSize, this.pageSize, sortModel, search, filters) : null)
                .pipe(mapTransformAsync ? mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            res => mapTransform(res, search, filters, currentPage, this.pageSize))) : map((/**
             * @param {?} res
             * @return {?}
             */
            res => mapTransform(res, search, filters, currentPage, this.pageSize))))
                .pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            retVal => {
                this._currentPage = currentPage;
                if (includeCount) {
                    this._total = retVal.count;
                }
                else if (isObject(retVal) && isArray(retVal.data)) {
                    //nothing to do. used in photo duplicate
                }
                else {
                    retVal = { data: retVal };
                }
                this._loading = false;
                return retVal;
            })));
        }
        else {
            /** @type {?} */
            let retVal = this.broker.getAll(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, tag, subQuery, customFilter, cacheId, this._looseCount, !includeCount).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                this._currentPage = currentPage;
                this._loading = false;
                if (!includeCount) {
                    this._total = Math.max(-1, this._total);
                    return { count: this._total, data: res };
                }
                else {
                    this._total = res.count;
                    return res;
                }
            })));
            if (mapTransformAsync && mapTransform) {
                return retVal.pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
            }
            else if (mapTransform) {
                return retVal.pipe(map((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => mapTransform(res, search, filters, currentPage, this.pageSize))));
            }
            else {
                return retVal;
            }
        }
    }
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
    getQuery(currentPage = 0, search, filters = [], sortModel = null, subQuery = null, fields = null, include = null, customFilter = null, includeCount = false) {
        return this.broker.getQuery(this._collectionName, fields, include, search, filters, sortModel, currentPage * this.pageSize, this.pageSize, subQuery, customFilter);
    }
    /**
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    getCount(search, filters, subQuery = null, customFilter = null) {
        return this.broker.getCount(this._collectionName, search, filters, subQuery, customFilter).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            this._total = ret.count;
            return ret;
        })));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    convertItem(value) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9kYXRhLWxvYWRlci9kYXRhLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUc1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVyRyxNQUFNLE9BQU8sVUFBVTs7Ozs7Ozs7OztJQWdEckIsWUFBb0IsTUFBYyxFQUFFLGNBQXNCLEVBQUUsUUFBb0IsSUFBSSxFQUFFLFdBQW1CLElBQUksRUFBRSxZQUFxQixJQUFJLEVBQUUsbUJBQThCLElBQUksRUFBRSxhQUFzQixJQUFJO1FBQXBMLFdBQU0sR0FBTixNQUFNLENBQVE7UUFYMUIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFTdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7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O0lBQ0osQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDeEYsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjthQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUN2QyxPQUFPLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUFoSkMsa0NBQXlCOzs7OztJQUN6Qiw0QkFBbUI7Ozs7O0lBQ25CLHFDQUE2Qjs7Ozs7SUFDN0IsOEJBQXlCOzs7OztJQUN6QiwrQkFBMEI7Ozs7O0lBQzFCLDRCQUEyQjs7Ozs7SUFDM0IsZ0NBQTRCOzs7OztJQUM1QixnQ0FBK0I7Ozs7O0lBQy9CLGlDQUE2Qjs7Ozs7SUFDN0IsdUNBQW1DOzs7OztJQUV2Qiw0QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBCcm9rZXIgfSBmcm9tICcuLi9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZWxzIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUmVzcG9uc2VPYmplY3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLW9iamVjdC9yZXNwb25zZS1vYmplY3QuaW50ZXJmYWNlJztcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZW50aXR5L2VudGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRmlsdGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL2ZpbHRlci9maWx0ZXIucGlwZSc7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3dpdGNoTWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgb3JkZXJCeSwgaXNBcnJheSwgaXNPYmplY3QsIGtleXMsIGlzRXF1YWwsIGlzRnVuY3Rpb24sIGlzRW1wdHksIGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuZXhwb3J0IGNsYXNzIERhdGFMb2FkZXIge1xuICBwdWJsaWMgZ2V0IHBhZ2VTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9wYWdlU2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGFnZVNpemUodmFsKSB7XG4gICAgdGhpcy5fcGFnZVNpemUgPSB2YWw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdG90YWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsO1xuICB9XG5cbiAgcHVibGljIHNldCB0b3RhbCh2YWx1ZSkge1xuICAgIHRoaXMuX3RvdGFsID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRvdGFsUGFnZSgpIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuX3RvdGFsIC8gdGhpcy5wYWdlU2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvYWRpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvYWRpbmdQYWdlQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRpbmdQYWdlQ291bnQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxvYWRpbmdQYWdlQ291bnQodmFsdWUpIHtcbiAgICB0aGlzLl9sb2FkaW5nUGFnZUNvdW50ID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50UGFnZSA9IDA7XG4gIHByaXZhdGUgX3RvdGFsID0gMDtcbiAgcHJpdmF0ZSBfY29sbGVjdGlvbk5hbWUgPSAnJztcbiAgcHJpdmF0ZSBfbG9hZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9wYWdlU2l6ZTogbnVtYmVyOyAvL0NvcmVDb25maWcuaXNXZWIoKSA/IDMwIDpcbiAgcHJpdmF0ZSBfaXRlbXM6IEFycmF5PGFueT47XG4gIHByaXZhdGUgX3RyYW5zbGF0ZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBmaWx0ZXJQaXBlOiBGaWx0ZXJQaXBlO1xuICBwcml2YXRlIF9sb29zZUNvdW50OiBib29sZWFuO1xuICBwcml2YXRlIF9sb2FkaW5nUGFnZUNvdW50OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJva2VyOiBCcm9rZXIsIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGl0ZW1zOiBBcnJheTxhbnk+ID0gbnVsbCwgcGFnZVNpemU6IG51bWJlciA9IG51bGwsIHRyYW5zbGF0ZTogYm9vbGVhbiA9IG51bGwsIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZSA9IG51bGwsIGxvb3NlQ291bnQ6IGJvb2xlYW4gPSBudWxsKSB7XG4gICAgdGhpcy5fY29sbGVjdGlvbk5hbWUgPSBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgdGhpcy5fdHJhbnNsYXRlID0gdHJhbnNsYXRlO1xuICAgIHRoaXMuX2xvb3NlQ291bnQgPSBsb29zZUNvdW50O1xuICAgIGlmIChwYWdlU2l6ZSAmJiBpc051bWJlcihwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwKSB7XG4gICAgICB0aGlzLl9wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wYWdlU2l6ZSA9IDIxO1xuICAgIH1cbiAgICB0aGlzLmZpbHRlclBpcGUgPSBuZXcgRmlsdGVyUGlwZSh0cmFuc2xhdGVTZXJ2aWNlKTtcbiAgfVxuXG4gIGxvYWRXaXRoU2VhcmNoKGN1cnJlbnRQYWdlOiBudW1iZXIgPSAwLCBzZWFyY2g6IHN0cmluZyA9IG51bGwsIGZpbHRlcnMgPSBbXSwgc29ydE1vZGVsID0gbnVsbCwgbWFwVHJhbnNmb3JtID0gbnVsbCwgbWFwVHJhbnNmb3JtQXN5bmMgPSBmYWxzZSwgdGFnID0gZmFsc2UsIHN1YlF1ZXJ5ID0gbnVsbCwgZmllbGRzOiBzdHJpbmdbXSA9IG51bGwsIGluY2x1ZGU6IHN0cmluZ1tdID0gbnVsbCwgYWdncmVnYXRlT3B0aW9uczogKHNraXAsIGxpbWl0LCBzb3J0cywgc2VhcmNoLCBmaWx0ZXJzKSA9PiBBcnJheTxhbnk+ID0gbnVsbCwgYWdncmVnYXRlT3B0aW9uc09mZmxpbmU6IChza2lwLCBsaW1pdCwgc29ydHMsIHNlYXJjaCwgZmlsdGVycykgPT4gQXJyYXk8YW55PiA9IG51bGwsIGNhY2hlSWQ6IHN0cmluZyA9IG51bGwsIGN1c3RvbUZpbHRlcjogYW55ID0gbnVsbCwgaW5jbHVkZUNvdW50ID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkKGN1cnJlbnRQYWdlLCBzZWFyY2gsIGZpbHRlcnMsIHNvcnRNb2RlbCwgbWFwVHJhbnNmb3JtLCBtYXBUcmFuc2Zvcm1Bc3luYywgdGFnLCBzdWJRdWVyeSwgZmllbGRzLCBpbmNsdWRlLCBhZ2dyZWdhdGVPcHRpb25zLCBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZSwgY2FjaGVJZCwgY3VzdG9tRmlsdGVyLCBpbmNsdWRlQ291bnQpO1xuICB9XG5cbiAgbG9hZFdpdGhTZWFyY2hEZWJvdW5jZShzdGFydCA9IDAsIHNlYXJjaDogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gbnVsbCwgZmlsdGVycyA9IFtdLCBzb3J0TW9kZWwgPSBudWxsLCBtYXBUcmFuc2Zvcm0gPSBudWxsLCBtYXBUcmFuc2Zvcm1Bc3luYyA9IGZhbHNlLCB0YWcgPSBmYWxzZSwgc3ViUXVlcnkgPSBudWxsLCBmaWVsZHM6IHN0cmluZ1tdID0gbnVsbCwgaW5jbHVkZTogc3RyaW5nW10gPSBudWxsLCBhZ2dyZWdhdGVPcHRpb25zOiAoc2tpcCwgbGltaXQsIHNvcnRzLCBzZWFyY2gsIGZpbHRlcnMpID0+IEFycmF5PGFueT4gPSBudWxsLCBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZTogKHNraXAsIGxpbWl0LCBzb3J0cywgc2VhcmNoLCBmaWx0ZXJzKSA9PiBBcnJheTxhbnk+ID0gbnVsbCwgY2FjaGVJZDogc3RyaW5nID0gbnVsbCwgY3VzdG9tRmlsdGVyOiBhbnkgPSBudWxsLCBpbmNsdWRlQ291bnQgPSBmYWxzZSkge1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIHJldHVybiBzZWFyY2gucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDQwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHRoaXMubG9hZChzdGFydCwgdGVybS50b1N0cmluZygpLCBmaWx0ZXJzLCBzb3J0TW9kZWwsIG1hcFRyYW5zZm9ybSwgbWFwVHJhbnNmb3JtQXN5bmMsIHRhZywgc3ViUXVlcnksIGZpZWxkcywgaW5jbHVkZSwgYWdncmVnYXRlT3B0aW9ucywgYWdncmVnYXRlT3B0aW9uc09mZmxpbmUsIGNhY2hlSWQsIGN1c3RvbUZpbHRlciwgaW5jbHVkZUNvdW50KSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmxvYWQoc3RhcnQsIG51bGwsIGZpbHRlcnMsIHNvcnRNb2RlbCwgbWFwVHJhbnNmb3JtLCBtYXBUcmFuc2Zvcm1Bc3luYywgdGFnLCBzdWJRdWVyeSwgZmllbGRzLCBpbmNsdWRlLCBhZ2dyZWdhdGVPcHRpb25zLCBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZSwgY2FjaGVJZCwgY3VzdG9tRmlsdGVyLCBpbmNsdWRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoY3VycmVudFBhZ2U6IG51bWJlciA9IDAsIHNlYXJjaDogc3RyaW5nID0gbnVsbCwgZmlsdGVycyA9IFtdLCBzb3J0TW9kZWwgPSBudWxsLCBtYXBUcmFuc2Zvcm0gPSBudWxsLCBtYXBUcmFuc2Zvcm1Bc3luYyA9IGZhbHNlLCB0YWcgPSBmYWxzZSwgc3ViUXVlcnkgPSBudWxsLCBmaWVsZHM6IHN0cmluZ1tdID0gbnVsbCwgaW5jbHVkZTogc3RyaW5nW10gPSBudWxsLCBhZ2dyZWdhdGVPcHRpb25zOiAoc2tpcCwgbGltaXQsIHNvcnRzLCBzZWFyY2gsIGZpbHRlcnMpID0+IEFycmF5PGFueT4gPSBudWxsLCBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZTogKHNraXAsIGxpbWl0LCBzb3J0cywgc2VhcmNoLCBmaWx0ZXJzKSA9PiBBcnJheTxhbnk+ID0gbnVsbCwgY2FjaGVJZDogc3RyaW5nID0gbnVsbCwgY3VzdG9tRmlsdGVyOiBhbnkgPSBudWxsLCBpbmNsdWRlQ291bnQgPSBmYWxzZSkge1xuICAgIHRoaXMuX2xvYWRpbmcgPSB0cnVlO1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIHNlYXJjaCA9IHNlYXJjaC50cmltKCk7XG4gICAgfVxuICAgIGlmICgodGhpcy5faXRlbXMgJiYgdGhpcy5faXRlbXMubGVuZ3RoID4gMCkgfHwgIXRoaXMuX2NvbGxlY3Rpb25OYW1lIHx8IGlzRW1wdHkodGhpcy5fY29sbGVjdGlvbk5hbWUpKSB7XG4gICAgICBsZXQgb2JzID0gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2l0ZW1zIHx8IFtdO1xuICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgZGF0YSA9IHRoaXMuZmlsdGVyUGlwZS50cmFuc2Zvcm0oZGF0YSwgc2VhcmNoLCBudWxsLCBudWxsLCB0aGlzLl90cmFuc2xhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3J0TW9kZWwpIHtcbiAgICAgICAgICBkYXRhID0gb3JkZXJCeShkYXRhLCBzb3J0TW9kZWwubWFwKHMgPT4gcy5jb2xJZCksIHNvcnRNb2RlbC5tYXAocyA9PiBzLnNvcnQudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvdGFsID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XG5cbiAgICAgICAgaWYgKGRhdGEuc2xpY2UpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShjdXJyZW50UGFnZSAqIHRoaXMucGFnZVNpemUsIChjdXJyZW50UGFnZSArIDEpICogdGhpcy5wYWdlU2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzOiBSZXNwb25zZU9iamVjdCA9IHtcbiAgICAgICAgICBjb3VudDogdGhpcy5fdG90YWwsXG4gICAgICAgICAgZGF0YTogZGF0YS5tYXAgPyBkYXRhLm1hcCh2YWx1ZSA9PiB0aGlzLmNvbnZlcnRJdGVtKHZhbHVlKSkgOiBbXVxuICAgICAgICB9O1xuICAgICAgICBvYnNlcnZlci5uZXh0KHJlcyk7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChtYXBUcmFuc2Zvcm1Bc3luYyAmJiBtYXBUcmFuc2Zvcm0pIHtcbiAgICAgICAgcmV0dXJuIG9icy5waXBlKG1lcmdlTWFwKHJlcyA9PiBtYXBUcmFuc2Zvcm0ocmVzLCBzZWFyY2gsIGZpbHRlcnMsIGN1cnJlbnRQYWdlLCB0aGlzLnBhZ2VTaXplKSkpO1xuICAgICAgfSBlbHNlIGlmIChtYXBUcmFuc2Zvcm0pIHtcbiAgICAgICAgcmV0dXJuIG9icy5waXBlKG1hcChyZXMgPT4gbWFwVHJhbnNmb3JtKHJlcywgc2VhcmNoLCBmaWx0ZXJzLCBjdXJyZW50UGFnZSwgdGhpcy5wYWdlU2l6ZSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYnM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhZ2dyZWdhdGVPcHRpb25zICYmIGlzRnVuY3Rpb24oYWdncmVnYXRlT3B0aW9ucykpIHtcbiAgICAgIGlmICghbWFwVHJhbnNmb3JtKSB7XG4gICAgICAgIG1hcFRyYW5zZm9ybSA9IHggPT4geDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJyb2tlclxuICAgICAgICAuYWdncmVnYXRlUXVlcnkodGhpcy5fY29sbGVjdGlvbk5hbWUsIGZpbHRlcnMsIGFnZ3JlZ2F0ZU9wdGlvbnMoY3VycmVudFBhZ2UgKiB0aGlzLnBhZ2VTaXplLCB0aGlzLnBhZ2VTaXplLCBzb3J0TW9kZWwsIHNlYXJjaCwgZmlsdGVycyksIHNlYXJjaCwgbnVsbCwgaW5jbHVkZUNvdW50LCBjYWNoZUlkLCBjdXN0b21GaWx0ZXIsIHN1YlF1ZXJ5LCBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZSAmJiBpc0Z1bmN0aW9uKGFnZ3JlZ2F0ZU9wdGlvbnNPZmZsaW5lKSA/IGFnZ3JlZ2F0ZU9wdGlvbnNPZmZsaW5lKGN1cnJlbnRQYWdlICogdGhpcy5wYWdlU2l6ZSwgdGhpcy5wYWdlU2l6ZSwgc29ydE1vZGVsLCBzZWFyY2gsIGZpbHRlcnMpIDogbnVsbClcbiAgICAgICAgLnBpcGUobWFwVHJhbnNmb3JtQXN5bmMgPyBtZXJnZU1hcChyZXMgPT4gbWFwVHJhbnNmb3JtKHJlcywgc2VhcmNoLCBmaWx0ZXJzLCBjdXJyZW50UGFnZSwgdGhpcy5wYWdlU2l6ZSkpIDogbWFwKHJlcyA9PiBtYXBUcmFuc2Zvcm0ocmVzLCBzZWFyY2gsIGZpbHRlcnMsIGN1cnJlbnRQYWdlLCB0aGlzLnBhZ2VTaXplKSkpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICAgICAgICAgIGlmIChpbmNsdWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fdG90YWwgPSByZXRWYWwuY291bnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHJldFZhbCkgJiYgaXNBcnJheShyZXRWYWwuZGF0YSkpIHtcbiAgICAgICAgICAgICAgLy9ub3RoaW5nIHRvIGRvLiB1c2VkIGluIHBob3RvIGR1cGxpY2F0ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0VmFsID0geyBkYXRhOiByZXRWYWwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJldFZhbCA9IHRoaXMuYnJva2VyLmdldEFsbCh0aGlzLl9jb2xsZWN0aW9uTmFtZSwgZmllbGRzLCBpbmNsdWRlLCBzZWFyY2gsIGZpbHRlcnMsIHNvcnRNb2RlbCwgY3VycmVudFBhZ2UgKiB0aGlzLnBhZ2VTaXplLCB0aGlzLnBhZ2VTaXplLCB0YWcsIHN1YlF1ZXJ5LCBjdXN0b21GaWx0ZXIsIGNhY2hlSWQsIHRoaXMuX2xvb3NlQ291bnQsICFpbmNsdWRlQ291bnQpLnBpcGUoXG4gICAgICAgIG1hcCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlO1xuICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoIWluY2x1ZGVDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fdG90YWwgPSBNYXRoLm1heCgtMSwgdGhpcy5fdG90YWwpO1xuICAgICAgICAgICAgcmV0dXJuIHsgY291bnQ6IHRoaXMuX3RvdGFsLCBkYXRhOiByZXMgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdG90YWwgPSByZXMuY291bnQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBpZiAobWFwVHJhbnNmb3JtQXN5bmMgJiYgbWFwVHJhbnNmb3JtKSB7XG4gICAgICAgIHJldHVybiByZXRWYWwucGlwZShtZXJnZU1hcChyZXMgPT4gbWFwVHJhbnNmb3JtKHJlcywgc2VhcmNoLCBmaWx0ZXJzLCBjdXJyZW50UGFnZSwgdGhpcy5wYWdlU2l6ZSkpKTtcbiAgICAgIH0gZWxzZSBpZiAobWFwVHJhbnNmb3JtKSB7XG4gICAgICAgIHJldHVybiByZXRWYWwucGlwZShtYXAocmVzID0+IG1hcFRyYW5zZm9ybShyZXMsIHNlYXJjaCwgZmlsdGVycywgY3VycmVudFBhZ2UsIHRoaXMucGFnZVNpemUpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFF1ZXJ5KGN1cnJlbnRQYWdlOiBudW1iZXIgPSAwLCBzZWFyY2g6IHN0cmluZywgZmlsdGVycyA9IFtdLCBzb3J0TW9kZWwgPSBudWxsLCBzdWJRdWVyeSA9IG51bGwsIGZpZWxkczogc3RyaW5nW10gPSBudWxsLCBpbmNsdWRlOiBzdHJpbmdbXSA9IG51bGwsIGN1c3RvbUZpbHRlcjogYW55ID0gbnVsbCwgaW5jbHVkZUNvdW50ID0gZmFsc2UpOiBRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldFF1ZXJ5KHRoaXMuX2NvbGxlY3Rpb25OYW1lLCBmaWVsZHMsIGluY2x1ZGUsIHNlYXJjaCwgZmlsdGVycywgc29ydE1vZGVsLCBjdXJyZW50UGFnZSAqIHRoaXMucGFnZVNpemUsIHRoaXMucGFnZVNpemUsIHN1YlF1ZXJ5LCBjdXN0b21GaWx0ZXIpO1xuICB9XG5cbiAgZ2V0Q291bnQoc2VhcmNoPzogc3RyaW5nLCBmaWx0ZXJzPywgc3ViUXVlcnkgPSBudWxsLCBjdXN0b21GaWx0ZXIgPSBudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldENvdW50KHRoaXMuX2NvbGxlY3Rpb25OYW1lLCBzZWFyY2gsIGZpbHRlcnMsIHN1YlF1ZXJ5LCBjdXN0b21GaWx0ZXIpLnBpcGUoXG4gICAgICBtYXAocmV0ID0+IHtcbiAgICAgICAgdGhpcy5fdG90YWwgPSByZXQuY291bnQ7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjb252ZXJ0SXRlbSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRW50aXR5KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzRXF1YWwoa2V5cyh2YWx1ZSksIFsnX2lkJ10pKSB7XG4gICAgICByZXR1cm4gbmV3IEVudGl0eSh2YWx1ZS5faWQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBFbnRpdHkoJ3VuZGVmaW5lZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=