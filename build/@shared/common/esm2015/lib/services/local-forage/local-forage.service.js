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
export class LocalForageService {
    /**
     * @param {?} coreConfig
     * @param {?} log
     */
    constructor(coreConfig, log) {
        this.coreConfig = coreConfig;
        this.log = log;
        this.init().then((/**
         * @return {?}
         */
        () => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => { }));
    }
    /**
     * @return {?}
     */
    init() {
        if (this.coreConfig.isCordova()) {
            try {
                return localForage.defineDriver(cordovaSQLiteDriver).then((/**
                 * @return {?}
                 */
                () => {
                    return localForage.setDriver
                        .bind(localForage)([cordovaSQLiteDriver._driver, localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE])
                        .then((/**
                     * @return {?}
                     */
                    () => {
                        this.log.log('setDriver:' + localForage.driver.bind(localForage)());
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
    }
    /**
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        return localForage.setItem.bind(localForage)(key, value);
    }
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return localForage.getItem.bind(localForage)(key);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        return localForage.removeItem.bind(localForage)(key);
    }
    /**
     * @return {?}
     */
    clear() {
        return localForage.clear.bind(localForage)();
    }
}
LocalForageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalForageService.ctorParameters = () => [
    { type: CoreConfig },
    { type: Log }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtZm9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYWwtZm9yYWdlL2xvY2FsLWZvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFekMsT0FBTyxLQUFLLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxLQUFLLG1CQUFtQixNQUFNLGlDQUFpQyxDQUFDOztBQUl2RSxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUM3QixZQUFvQixVQUFzQixFQUFZLEdBQVE7UUFBMUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFZLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUk7OztRQUFDLEdBQUcsRUFBRSxHQUFFLENBQUM7Ozs7UUFBRSxHQUFHLENBQUMsRUFBRSxHQUFFLENBQUMsRUFBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFDRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9CLElBQUk7Z0JBQ0YsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSTs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDN0QsT0FBTyxXQUFXLENBQUMsU0FBUzt5QkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7eUJBQ3JILElBQUk7OztvQkFBQyxHQUFHLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDcEUsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzNCLENBQUMsRUFBQyxDQUFDO2dCQUNQLENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUI7U0FDRjthQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkQsNERBQTREO1lBQzVELE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Ozs7OztJQUVNLEdBQUcsQ0FBSSxHQUFXLEVBQUUsS0FBVTtRQUNuQyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFDTSxHQUFHLENBQUksR0FBVztRQUN2QixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBQ00sTUFBTSxDQUFDLEdBQVc7UUFDdkIsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBQ00sS0FBSztRQUNWLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7WUF0Q0YsVUFBVTs7OztZQVBGLFVBQVU7WUFDVixHQUFHOzs7Ozs7O0lBUUUsd0NBQThCOzs7OztJQUFFLGlDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICcuLi9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uL2xvZy9sb2cuc2VydmljZSc7XG5cbmltcG9ydCAqIGFzIGxvY2FsRm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlJztcbmltcG9ydCAqIGFzIGNvcmRvdmFTUUxpdGVEcml2ZXIgZnJvbSAnbG9jYWxmb3JhZ2UtY29yZG92YXNxbGl0ZWRyaXZlcic7XG4vL2h0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljLXN0b3JhZ2UvYmxvYi9tYXN0ZXIvc3JjL3N0b3JhZ2UudHNcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsRm9yYWdlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZywgcHJvdGVjdGVkIGxvZzogTG9nKSB7XG4gICAgdGhpcy5pbml0KCkudGhlbigoKSA9PiB7fSwgZXJyID0+IHt9KTtcbiAgfVxuICBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBsb2NhbEZvcmFnZS5kZWZpbmVEcml2ZXIoY29yZG92YVNRTGl0ZURyaXZlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsRm9yYWdlLnNldERyaXZlclxuICAgICAgICAgICAgLmJpbmQobG9jYWxGb3JhZ2UpKFtjb3Jkb3ZhU1FMaXRlRHJpdmVyLl9kcml2ZXIsIGxvY2FsRm9yYWdlLklOREVYRUREQiwgbG9jYWxGb3JhZ2UuV0VCU1FMLCBsb2NhbEZvcmFnZS5MT0NBTFNUT1JBR0VdKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZy5sb2coJ3NldERyaXZlcjonICsgbG9jYWxGb3JhZ2UuZHJpdmVyLmJpbmQobG9jYWxGb3JhZ2UpKCkpO1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoZXJyKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobG9jYWxGb3JhZ2Uuc3VwcG9ydHMobG9jYWxGb3JhZ2UuV0VCU1FMKSkge1xuICAgICAgLy8hdGhpcy5jb3JlQ29uZmlnLmlzRmlyZWZveCgpICYmICF0aGlzLmNvcmVDb25maWcuaXNJRSgpKSB7XG4gICAgICByZXR1cm4gbG9jYWxGb3JhZ2Uuc2V0RHJpdmVyLmJpbmQobG9jYWxGb3JhZ2UpKGxvY2FsRm9yYWdlLldFQlNRTCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQ8VD4oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gbG9jYWxGb3JhZ2Uuc2V0SXRlbS5iaW5kKGxvY2FsRm9yYWdlKShrZXksIHZhbHVlKTtcbiAgfVxuICBwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIGxvY2FsRm9yYWdlLmdldEl0ZW0uYmluZChsb2NhbEZvcmFnZSkoa2V5KTtcbiAgfVxuICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxvY2FsRm9yYWdlLnJlbW92ZUl0ZW0uYmluZChsb2NhbEZvcmFnZSkoa2V5KTtcbiAgfVxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgcmV0dXJuIGxvY2FsRm9yYWdlLmNsZWFyLmJpbmQobG9jYWxGb3JhZ2UpKCk7XG4gIH1cbn1cbiJdfQ==