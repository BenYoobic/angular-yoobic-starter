/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
export class Algorithms {
    /**
     * @param {?} config
     * @param {?} rq
     */
    constructor(config, rq) {
        this.config = config;
        this.rq = rq;
    }
    /**
     * @param {?} imageUrl
     * @param {?} algorithmId
     * @return {?}
     */
    process(imageUrl, algorithmId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrl, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    }
    /**
     * @param {?} imageUrls
     * @param {?} algorithmId
     * @return {?}
     */
    processMultiple(imageUrls, algorithmId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrls, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    }
}
Algorithms.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Algorithms.ctorParameters = () => [
    { type: Config },
    { type: Requestor }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Algorithms.prototype.config;
    /**
     * @type {?}
     * @private
     */
    Algorithms.prototype.rq;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb3JpdGhtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FsZ29yaXRobXMvYWxnb3JpdGhtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE1BQU0sT0FBTyxVQUFVOzs7OztJQUNyQixZQUFvQixNQUFjLEVBQVUsRUFBYTtRQUFyQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBVztJQUFHLENBQUM7Ozs7OztJQUU3RCxPQUFPLENBQUMsUUFBZ0IsRUFBRSxXQUFtQjs7WUFDdkMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFtQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRSxVQUFVOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDZixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDWCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlELENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsU0FBd0IsRUFBRSxXQUFtQjs7WUFDdkQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFtQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNoRixVQUFVOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDZixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDWCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlELENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7WUExQkYsVUFBVTs7OztZQUpGLE1BQU07WUFDTixTQUFTOzs7Ozs7O0lBS0osNEJBQXNCOzs7OztJQUFFLHdCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZ29yaXRobXMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnLCBwcml2YXRlIHJxOiBSZXF1ZXN0b3IpIHt9XG5cbiAgcHJvY2VzcyhpbWFnZVVybDogc3RyaW5nLCBhbGdvcml0aG1JZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2FsZ29yaXRobS9wcm9jZXNzJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBpbWFnZV91cmw6IGltYWdlVXJsLCBhbGdvcml0aG1faWQ6IGFsZ29yaXRobUlkIH0pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9KSxcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICByZXR1cm4gcmV0VmFsICYmIHJldFZhbC5yZXN1bHRzID8gcmV0VmFsLnJlc3VsdHMgfHwge30gOiB7fTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb2Nlc3NNdWx0aXBsZShpbWFnZVVybHM6IEFycmF5PHN0cmluZz4sIGFsZ29yaXRobUlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnYWxnb3JpdGhtL3Byb2Nlc3MnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IGltYWdlX3VybDogaW1hZ2VVcmxzLCBhbGdvcml0aG1faWQ6IGFsZ29yaXRobUlkIH0pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9KSxcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICByZXR1cm4gcmV0VmFsICYmIHJldFZhbC5yZXN1bHRzID8gcmV0VmFsLnJlc3VsdHMgfHwge30gOiB7fTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19