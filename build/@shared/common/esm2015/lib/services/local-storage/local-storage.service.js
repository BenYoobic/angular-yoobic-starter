/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
export class LocalStorage {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
        if (!coreConfig.isUniversal()) {
            if (typeof localStorage === 'undefined') {
                throw new Error('Current browser does not support Local Storage');
            }
            this.localStorage = localStorage;
        }
        else {
            this.localStorage = {};
        }
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        try {
            this.localStorage[key] = value;
        }
        catch (e) { }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.localStorage[key] || false;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setObject(key, value) {
        this.localStorage[key] = JSON.stringify(value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getObject(key) {
        if (this.localStorage[key]) {
            return JSON.parse(this.localStorage[key]);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        if (!this.coreConfig.isUniversal()) {
            this.localStorage.removeItem(key);
        }
        else {
            delete this.localStorage[key];
        }
    }
    /**
     * @return {?}
     */
    clear() {
        if (!this.coreConfig.isUniversal()) {
            /** @type {?} */
            let server = this.get('SERVER');
            this.localStorage.clear();
            if (server) {
                this.set('SERVER', server);
            }
        }
        else {
            this.localStorage = {};
        }
    }
}
LocalStorage.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalStorage.ctorParameters = () => [
    { type: CoreConfig }
];
if (false) {
    /** @type {?} */
    LocalStorage.prototype.localStorage;
    /**
     * @type {?}
     * @protected
     */
    LocalStorage.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUdoRSxNQUFNLE9BQU8sWUFBWTs7OztJQUd2QixZQUFzQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7OztJQUVNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYTtRQUNuQyxJQUFJO1lBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDaEM7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBQ2hCLENBQUM7Ozs7O0lBRU0sR0FBRyxDQUFDLEdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFFTSxTQUFTLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRU0sU0FBUyxDQUFDLEdBQVc7UUFDMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7OztJQUVNLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7O0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFOztnQkFDOUIsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDNUI7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7WUF2REYsVUFBVTs7OztZQUZGLFVBQVU7Ozs7SUFJakIsb0NBQXlCOzs7OztJQUViLGtDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICcuLi9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZSB7XG4gIHB1YmxpYyBsb2NhbFN0b3JhZ2U6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge1xuICAgIGlmICghY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXJyZW50IGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBMb2NhbCBTdG9yYWdlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSB7fTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlW2tleV0gfHwgZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0T2JqZWN0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Vba2V5XSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPYmplY3Qoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVtrZXldKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmxvY2FsU3RvcmFnZVtrZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvcmVDb25maWcuaXNVbml2ZXJzYWwoKSkge1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdGhpcy5sb2NhbFN0b3JhZ2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgaWYgKCF0aGlzLmNvcmVDb25maWcuaXNVbml2ZXJzYWwoKSkge1xuICAgICAgbGV0IHNlcnZlciA9IHRoaXMuZ2V0KCdTRVJWRVInKTtcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICBpZiAoc2VydmVyKSB7XG4gICAgICAgIHRoaXMuc2V0KCdTRVJWRVInLCBzZXJ2ZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IHt9O1xuICAgIH1cbiAgfVxufVxuIl19