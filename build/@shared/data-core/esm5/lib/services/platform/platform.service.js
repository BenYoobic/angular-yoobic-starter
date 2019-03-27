/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { ReplaySubject } from 'rxjs';
var PlatformService = /** @class */ (function () {
    function PlatformService(coreConfig) {
        this.coreConfig = coreConfig;
        this.data$ = new ReplaySubject(1, 2000);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    PlatformService.prototype.handler = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data) {
            this.data$.next(data);
        }
    };
    /**
     * @param {?=} debug
     * @return {?}
     */
    PlatformService.prototype.onReadyOrResume = /**
     * @param {?=} debug
     * @return {?}
     */
    function (debug) {
        var _this = this;
        if (debug === void 0) { debug = false; }
        if (this.coreConfig.isCordova() && window.Branch) {
            window.Branch.setDebug(debug);
            window.Branch.initSession().then((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.handler(data);
            }));
        }
    };
    PlatformService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PlatformService.ctorParameters = function () { return [
        { type: CoreConfig }
    ]; };
    return PlatformService;
}());
export { PlatformService };
if (false) {
    /** @type {?} */
    PlatformService.prototype.data$;
    /**
     * @type {?}
     * @private
     */
    PlatformService.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wbGF0Zm9ybS9wbGF0Zm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVyQztJQUlFLHlCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRm5DLFVBQUssR0FBdUIsSUFBSSxhQUFhLENBQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXRCLENBQUM7Ozs7O0lBRTlDLGlDQUFPOzs7O0lBQVAsVUFBUSxJQUFJO1FBQ1YsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7O0lBRUQseUNBQWU7Ozs7SUFBZixVQUFnQixLQUFhO1FBQTdCLGlCQU9DO1FBUGUsc0JBQUEsRUFBQSxhQUFhO1FBQzNCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsSUFBSTtnQkFDbkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBbkJGLFVBQVU7Ozs7Z0JBSEYsVUFBVTs7SUF1Qm5CLHNCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FuQlksZUFBZTs7O0lBQzFCLGdDQUFtRTs7Ozs7SUFFdkQscUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6dmFyaWFibGUtbmFtZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtU2VydmljZSB7XG4gIHB1YmxpYyBkYXRhJDogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxLCAyMDAwKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcmVDb25maWc6IENvcmVDb25maWcpIHt9XG5cbiAgaGFuZGxlcihkYXRhKSB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YSQubmV4dChkYXRhKTtcbiAgICB9XG4gIH1cblxuICBvblJlYWR5T3JSZXN1bWUoZGVidWcgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkgJiYgd2luZG93LkJyYW5jaCkge1xuICAgICAgd2luZG93LkJyYW5jaC5zZXREZWJ1ZyhkZWJ1Zyk7XG4gICAgICB3aW5kb3cuQnJhbmNoLmluaXRTZXNzaW9uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVyKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=