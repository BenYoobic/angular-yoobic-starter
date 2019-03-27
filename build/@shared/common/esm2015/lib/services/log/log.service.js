/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
export class Log {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    log(message, ...optionalParams) {
        if (this.coreConfig.getMode() === 'dev') {
            window['console'].log(message, ...optionalParams);
        }
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    forceLog(message, ...optionalParams) {
        window['console'].log(message, ...optionalParams);
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    error(message, ...optionalParams) {
        if (this.coreConfig.getMode() === 'dev') {
            window['console'].error(message, ...optionalParams);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    alert(message) {
        window['alert'](message);
    }
}
Log.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Log.ctorParameters = () => [
    { type: CoreConfig }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Log.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9nL2xvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUdoRSxNQUFNLE9BQU8sR0FBRzs7OztJQUNkLFlBQXNCLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7Ozs7SUFFaEQsR0FBRyxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxLQUFLLEVBQUU7WUFDdkMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxPQUFhLEVBQUUsR0FBRyxjQUFxQjtRQUM5QyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxPQUFhLEVBQUUsR0FBRyxjQUFxQjtRQUMzQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxPQUFZO1FBQ2hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUF0QkYsVUFBVTs7OztZQUZGLFVBQVU7Ozs7Ozs7SUFJTCx5QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnLi4vY29yZS1jb25maWcvY29yZS1jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2cge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKSB7XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5nZXRNb2RlKCkgPT09ICdkZXYnKSB7XG4gICAgICB3aW5kb3dbJ2NvbnNvbGUnXS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgIH1cbiAgfVxuXG4gIGZvcmNlTG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgIHdpbmRvd1snY29uc29sZSddLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG4gIH1cblxuICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pIHtcbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmdldE1vZGUoKSA9PT0gJ2RldicpIHtcbiAgICAgIHdpbmRvd1snY29uc29sZSddLmVycm9yKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcbiAgICB9XG4gIH1cblxuICBhbGVydChtZXNzYWdlOiBhbnkpIHtcbiAgICB3aW5kb3dbJ2FsZXJ0J10obWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==