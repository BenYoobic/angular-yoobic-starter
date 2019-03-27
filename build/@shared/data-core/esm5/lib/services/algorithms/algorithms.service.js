/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
var Algorithms = /** @class */ (function () {
    function Algorithms(config, rq) {
        this.config = config;
        this.rq = rq;
    }
    /**
     * @param {?} imageUrl
     * @param {?} algorithmId
     * @return {?}
     */
    Algorithms.prototype.process = /**
     * @param {?} imageUrl
     * @param {?} algorithmId
     * @return {?}
     */
    function (imageUrl, algorithmId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrl, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    };
    /**
     * @param {?} imageUrls
     * @param {?} algorithmId
     * @return {?}
     */
    Algorithms.prototype.processMultiple = /**
     * @param {?} imageUrls
     * @param {?} algorithmId
     * @return {?}
     */
    function (imageUrls, algorithmId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'algorithm/process';
        return this.rq.post(url, { image_url: imageUrls, algorithm_id: algorithmId }).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            return throwError(err);
        })), map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            return retVal && retVal.results ? retVal.results || {} : {};
        })));
    };
    Algorithms.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Algorithms.ctorParameters = function () { return [
        { type: Config },
        { type: Requestor }
    ]; };
    return Algorithms;
}());
export { Algorithms };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb3JpdGhtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FsZ29yaXRobXMvYWxnb3JpdGhtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pEO0lBRUUsb0JBQW9CLE1BQWMsRUFBVSxFQUFhO1FBQXJDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFXO0lBQUcsQ0FBQzs7Ozs7O0lBRTdELDRCQUFPOzs7OztJQUFQLFVBQVEsUUFBZ0IsRUFBRSxXQUFtQjs7WUFDdkMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFtQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRSxVQUFVOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ1osT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDLEVBQ0YsR0FBRzs7OztRQUFDLFVBQUEsTUFBTTtZQUNSLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUQsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELG9DQUFlOzs7OztJQUFmLFVBQWdCLFNBQXdCLEVBQUUsV0FBbUI7O1lBQ3ZELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxtQkFBbUI7UUFDbEQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDaEYsVUFBVTs7OztRQUFDLFVBQUEsR0FBRztZQUNaLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxFQUNGLEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlELENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOztnQkExQkYsVUFBVTs7OztnQkFKRixNQUFNO2dCQUNOLFNBQVM7O0lBOEJsQixpQkFBQztDQUFBLEFBM0JELElBMkJDO1NBMUJZLFVBQVU7Ozs7OztJQUNULDRCQUFzQjs7Ozs7SUFBRSx3QkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbGdvcml0aG1zIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZywgcHJpdmF0ZSBycTogUmVxdWVzdG9yKSB7fVxuXG4gIHByb2Nlc3MoaW1hZ2VVcmw6IHN0cmluZywgYWxnb3JpdGhtSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdhbGdvcml0aG0vcHJvY2Vzcyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgaW1hZ2VfdXJsOiBpbWFnZVVybCwgYWxnb3JpdGhtX2lkOiBhbGdvcml0aG1JZCB9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfSksXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgcmV0dXJuIHJldFZhbCAmJiByZXRWYWwucmVzdWx0cyA/IHJldFZhbC5yZXN1bHRzIHx8IHt9IDoge307XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm9jZXNzTXVsdGlwbGUoaW1hZ2VVcmxzOiBBcnJheTxzdHJpbmc+LCBhbGdvcml0aG1JZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2FsZ29yaXRobS9wcm9jZXNzJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBpbWFnZV91cmw6IGltYWdlVXJscywgYWxnb3JpdGhtX2lkOiBhbGdvcml0aG1JZCB9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfSksXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgcmV0dXJuIHJldFZhbCAmJiByZXRWYWwucmVzdWx0cyA/IHJldFZhbC5yZXN1bHRzIHx8IHt9IDoge307XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==