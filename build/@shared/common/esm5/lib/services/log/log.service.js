/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
var Log = /** @class */ (function () {
    function Log(coreConfig) {
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    Log.prototype.log = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var _a;
        if (this.coreConfig.getMode() === 'dev') {
            (_a = window['console']).log.apply(_a, tslib_1.__spread([message], optionalParams));
        }
    };
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    Log.prototype.forceLog = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = window['console']).log.apply(_a, tslib_1.__spread([message], optionalParams));
    };
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    Log.prototype.error = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var _a;
        if (this.coreConfig.getMode() === 'dev') {
            (_a = window['console']).error.apply(_a, tslib_1.__spread([message], optionalParams));
        }
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Log.prototype.alert = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        window['alert'](message);
    };
    Log.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Log.ctorParameters = function () { return [
        { type: CoreConfig }
    ]; };
    return Log;
}());
export { Log };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Log.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nL2xvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFaEU7SUFFRSxhQUFzQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQzs7Ozs7O0lBRWhELGlCQUFHOzs7OztJQUFILFVBQUksT0FBYTtRQUFFLHdCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsdUNBQXdCOzs7UUFDekMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLEtBQUssRUFBRTtZQUN2QyxDQUFBLEtBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUMsR0FBRyw2QkFBQyxPQUFPLEdBQUssY0FBYyxHQUFFO1NBQ25EO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsc0JBQVE7Ozs7O0lBQVIsVUFBUyxPQUFhO1FBQUUsd0JBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qix1Q0FBd0I7OztRQUM5QyxDQUFBLEtBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUMsR0FBRyw2QkFBQyxPQUFPLEdBQUssY0FBYyxHQUFFO0lBQ3BELENBQUM7Ozs7OztJQUVELG1CQUFLOzs7OztJQUFMLFVBQU0sT0FBYTtRQUFFLHdCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsdUNBQXdCOzs7UUFDM0MsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLEtBQUssRUFBRTtZQUN2QyxDQUFBLEtBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUMsS0FBSyw2QkFBQyxPQUFPLEdBQUssY0FBYyxHQUFFO1NBQ3JEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxtQkFBSzs7OztJQUFMLFVBQU0sT0FBWTtRQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0JBdEJGLFVBQVU7Ozs7Z0JBRkYsVUFBVTs7SUF5Qm5CLFVBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQXRCWSxHQUFHOzs7Ozs7SUFDRix5QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnLi4vY29yZS1jb25maWcvY29yZS1jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2cge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5nZXRNb2RlKCkgPT09ICdkZXYnKSB7XG4gICAgICB3aW5kb3dbJ2NvbnNvbGUnXS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgIH1cbiAgfVxuXG4gIGZvcmNlTG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgIHdpbmRvd1snY29uc29sZSddLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG4gIH1cblxuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pIHtcbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmdldE1vZGUoKSA9PT0gJ2RldicpIHtcbiAgICAgIHdpbmRvd1snY29uc29sZSddLmVycm9yKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcbiAgICB9XG4gIH1cblxuICBhbGVydChtZXNzYWdlOiBhbnkpIHtcbiAgICB3aW5kb3dbJ2FsZXJ0J10obWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==