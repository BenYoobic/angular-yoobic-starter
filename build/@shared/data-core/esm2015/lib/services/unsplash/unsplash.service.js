/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { Requestor } from '../requestor/requestor.service';
import { map } from 'rxjs/operators';
export class Unsplash {
    /**
     * @param {?} rq
     * @param {?} coreConfig
     */
    constructor(rq, coreConfig) {
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    getAll(search, skip, limit) {
        /** @type {?} */
        let url;
        if (search) {
            url = 'https://api.unsplash.com/search/photos?client_id=' + this.coreConfig.getKey('unsplashAccessKey');
            url += '&query=' + search;
            url += '&page=' + (skip / limit + 1);
            url += '&per_page=' + limit;
        }
        else {
            url = 'https://api.unsplash.com/photos?page=1&per_page=20&client_id=' + this.coreConfig.getKey('unsplashAccessKey');
        }
        return this.rq.get(url, null, null, null, true).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            //{
            //count: search ? ret.total : 100,
            //data:
            return (search ? ret.results : ret).map((/**
             * @param {?} r
             * @return {?}
             */
            r => ({
                _id: r.id,
                title: r.description,
                value: r.urls.raw,
                thumb: r.urls.thumb
            })));
            //};
        })));
    }
}
Unsplash.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Unsplash.ctorParameters = () => [
    { type: Requestor },
    { type: CoreConfig }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Unsplash.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Unsplash.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zcGxhc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy91bnNwbGFzaC91bnNwbGFzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU0sT0FBTyxRQUFROzs7OztJQUNuQixZQUFzQixFQUFhLEVBQVksVUFBc0I7UUFBL0MsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7Ozs7O0lBRXpFLE1BQU0sQ0FBQyxNQUFlLEVBQUUsSUFBYSxFQUFFLEtBQWM7O1lBQy9DLEdBQUc7UUFDUCxJQUFJLE1BQU0sRUFBRTtZQUNWLEdBQUcsR0FBRyxtREFBbUQsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3hHLEdBQUcsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQzFCLEdBQUcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQU07WUFDTCxHQUFHLEdBQUcsK0RBQStELEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNySDtRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDbEQsR0FBRzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1IsR0FBRztZQUNILGtDQUFrQztZQUNsQyxPQUFPO1lBQ1AsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNULEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVztnQkFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDakIsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDLEVBQUMsQ0FBQztZQUNKLElBQUk7UUFDTixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7O1lBNUJGLFVBQVU7Ozs7WUFIRixTQUFTO1lBRlQsVUFBVTs7Ozs7OztJQU9MLHNCQUF1Qjs7Ozs7SUFBRSw4QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuXG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVW5zcGxhc2gge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcnE6IFJlcXVlc3RvciwgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcpIHt9XG5cbiAgZ2V0QWxsKHNlYXJjaD86IHN0cmluZywgc2tpcD86IG51bWJlciwgbGltaXQ/OiBudW1iZXIpIHtcbiAgICBsZXQgdXJsO1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIHVybCA9ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vc2VhcmNoL3Bob3Rvcz9jbGllbnRfaWQ9JyArIHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3Vuc3BsYXNoQWNjZXNzS2V5Jyk7XG4gICAgICB1cmwgKz0gJyZxdWVyeT0nICsgc2VhcmNoO1xuICAgICAgdXJsICs9ICcmcGFnZT0nICsgKHNraXAgLyBsaW1pdCArIDEpO1xuICAgICAgdXJsICs9ICcmcGVyX3BhZ2U9JyArIGxpbWl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9hcGkudW5zcGxhc2guY29tL3Bob3Rvcz9wYWdlPTEmcGVyX3BhZ2U9MjAmY2xpZW50X2lkPScgKyB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCd1bnNwbGFzaEFjY2Vzc0tleScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ycS5nZXQodXJsLCBudWxsLCBudWxsLCBudWxsLCB0cnVlKS5waXBlKFxuICAgICAgbWFwKHJldCA9PiB7XG4gICAgICAgIC8ve1xuICAgICAgICAvL2NvdW50OiBzZWFyY2ggPyByZXQudG90YWwgOiAxMDAsXG4gICAgICAgIC8vZGF0YTpcbiAgICAgICAgcmV0dXJuIChzZWFyY2ggPyByZXQucmVzdWx0cyA6IHJldCkubWFwKHIgPT4gKHtcbiAgICAgICAgICBfaWQ6IHIuaWQsXG4gICAgICAgICAgdGl0bGU6IHIuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdmFsdWU6IHIudXJscy5yYXcsXG4gICAgICAgICAgdGh1bWI6IHIudXJscy50aHVtYlxuICAgICAgICB9KSk7XG4gICAgICAgIC8vfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19