/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import { Log } from '../log/log.service';
import * as localForage from 'localforage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
//https://github.com/ionic-team/ionic-storage/blob/master/src/storage.ts
var LocalForageService = /** @class */ (function () {
    function LocalForageService(coreConfig, log) {
        this.coreConfig = coreConfig;
        this.log = log;
        this.init().then((/**
         * @return {?}
         */
        function () { }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { }));
    }
    /**
     * @return {?}
     */
    LocalForageService.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.coreConfig.isCordova()) {
            try {
                return localForage.defineDriver(cordovaSQLiteDriver).then((/**
                 * @return {?}
                 */
                function () {
                    return localForage.setDriver
                        .bind(localForage)([cordovaSQLiteDriver._driver, localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE])
                        .then((/**
                     * @return {?}
                     */
                    function () {
                        _this.log.log('setDriver:' + localForage.driver.bind(localForage)());
                        return Promise.resolve();
                    }));
                }));
            }
            catch (err) {
                this.log.error(err);
                return Promise.resolve();
            }
        }
        else if (localForage.supports(localForage.WEBSQL)) {
            //!this.coreConfig.isFirefox() && !this.coreConfig.isIE()) {
            return localForage.setDriver.bind(localForage)(localForage.WEBSQL);
        }
        return Promise.resolve();
    };
    /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    LocalForageService.prototype.set = /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        return localForage.setItem.bind(localForage)(key, value);
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    LocalForageService.prototype.get = /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return localForage.getItem.bind(localForage)(key);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalForageService.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return localForage.removeItem.bind(localForage)(key);
    };
    /**
     * @return {?}
     */
    LocalForageService.prototype.clear = /**
     * @return {?}
     */
    function () {
        return localForage.clear.bind(localForage)();
    };
    LocalForageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalForageService.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Log }
    ]; };
    return LocalForageService;
}());
export { LocalForageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalForageService.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    LocalForageService.prototype.log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtZm9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYWwtZm9yYWdlL2xvY2FsLWZvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFekMsT0FBTyxLQUFLLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxLQUFLLG1CQUFtQixNQUFNLGlDQUFpQyxDQUFDOztBQUd2RTtJQUVFLDRCQUFvQixVQUFzQixFQUFZLEdBQVE7UUFBMUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFZLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUk7OztRQUFDLGNBQU8sQ0FBQzs7OztRQUFFLFVBQUEsR0FBRyxJQUFLLENBQUMsRUFBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFDRCxpQ0FBSTs7O0lBQUo7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLElBQUk7Z0JBQ0YsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSTs7O2dCQUFDO29CQUN4RCxPQUFPLFdBQVcsQ0FBQyxTQUFTO3lCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDckgsSUFBSTs7O29CQUFDO3dCQUNKLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3BFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMzQixDQUFDLEVBQUMsQ0FBQztnQkFDUCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzFCO1NBQ0Y7YUFBTSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25ELDREQUE0RDtZQUM1RCxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRTtRQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFFTSxnQ0FBRzs7Ozs7O0lBQVYsVUFBYyxHQUFXLEVBQUUsS0FBVTtRQUNuQyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFDTSxnQ0FBRzs7Ozs7SUFBVixVQUFjLEdBQVc7UUFDdkIsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUNNLG1DQUFNOzs7O0lBQWIsVUFBYyxHQUFXO1FBQ3ZCLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OztJQUNNLGtDQUFLOzs7SUFBWjtRQUNFLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztJQUMvQyxDQUFDOztnQkF0Q0YsVUFBVTs7OztnQkFQRixVQUFVO2dCQUNWLEdBQUc7O0lBNkNaLHlCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0F0Q1ksa0JBQWtCOzs7Ozs7SUFDakIsd0NBQThCOzs7OztJQUFFLGlDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICcuLi9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uL2xvZy9sb2cuc2VydmljZSc7XG5cbmltcG9ydCAqIGFzIGxvY2FsRm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlJztcbmltcG9ydCAqIGFzIGNvcmRvdmFTUUxpdGVEcml2ZXIgZnJvbSAnbG9jYWxmb3JhZ2UtY29yZG92YXNxbGl0ZWRyaXZlcic7XG4vL2h0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljLXN0b3JhZ2UvYmxvYi9tYXN0ZXIvc3JjL3N0b3JhZ2UudHNcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsRm9yYWdlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZywgcHJvdGVjdGVkIGxvZzogTG9nKSB7XG4gICAgdGhpcy5pbml0KCkudGhlbigoKSA9PiB7fSwgZXJyID0+IHt9KTtcbiAgfVxuICBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBsb2NhbEZvcmFnZS5kZWZpbmVEcml2ZXIoY29yZG92YVNRTGl0ZURyaXZlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsRm9yYWdlLnNldERyaXZlclxuICAgICAgICAgICAgLmJpbmQobG9jYWxGb3JhZ2UpKFtjb3Jkb3ZhU1FMaXRlRHJpdmVyLl9kcml2ZXIsIGxvY2FsRm9yYWdlLklOREVYRUREQiwgbG9jYWxGb3JhZ2UuV0VCU1FMLCBsb2NhbEZvcmFnZS5MT0NBTFNUT1JBR0VdKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZy5sb2coJ3NldERyaXZlcjonICsgbG9jYWxGb3JhZ2UuZHJpdmVyLmJpbmQobG9jYWxGb3JhZ2UpKCkpO1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoZXJyKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobG9jYWxGb3JhZ2Uuc3VwcG9ydHMobG9jYWxGb3JhZ2UuV0VCU1FMKSkge1xuICAgICAgLy8hdGhpcy5jb3JlQ29uZmlnLmlzRmlyZWZveCgpICYmICF0aGlzLmNvcmVDb25maWcuaXNJRSgpKSB7XG4gICAgICByZXR1cm4gbG9jYWxGb3JhZ2Uuc2V0RHJpdmVyLmJpbmQobG9jYWxGb3JhZ2UpKGxvY2FsRm9yYWdlLldFQlNRTCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQ8VD4oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gbG9jYWxGb3JhZ2Uuc2V0SXRlbS5iaW5kKGxvY2FsRm9yYWdlKShrZXksIHZhbHVlKTtcbiAgfVxuICBwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIGxvY2FsRm9yYWdlLmdldEl0ZW0uYmluZChsb2NhbEZvcmFnZSkoa2V5KTtcbiAgfVxuICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxvY2FsRm9yYWdlLnJlbW92ZUl0ZW0uYmluZChsb2NhbEZvcmFnZSkoa2V5KTtcbiAgfVxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgcmV0dXJuIGxvY2FsRm9yYWdlLmNsZWFyLmJpbmQobG9jYWxGb3JhZ2UpKCk7XG4gIH1cbn1cbiJdfQ==