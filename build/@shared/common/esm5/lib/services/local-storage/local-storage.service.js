/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
var LocalStorage = /** @class */ (function () {
    function LocalStorage(coreConfig) {
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
    LocalStorage.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        try {
            this.localStorage[key] = value;
        }
        catch (e) { }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorage.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.localStorage[key] || false;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    LocalStorage.prototype.setObject = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.localStorage[key] = JSON.stringify(value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorage.prototype.getObject = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.localStorage[key]) {
            return JSON.parse(this.localStorage[key]);
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalStorage.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.coreConfig.isUniversal()) {
            this.localStorage.removeItem(key);
        }
        else {
            delete this.localStorage[key];
        }
    };
    /**
     * @return {?}
     */
    LocalStorage.prototype.clear = /**
     * @return {?}
     */
    function () {
        if (!this.coreConfig.isUniversal()) {
            /** @type {?} */
            var server = this.get('SERVER');
            this.localStorage.clear();
            if (server) {
                this.set('SERVER', server);
            }
        }
        else {
            this.localStorage = {};
        }
    };
    LocalStorage.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalStorage.ctorParameters = function () { return [
        { type: CoreConfig }
    ]; };
    return LocalStorage;
}());
export { LocalStorage };
if (false) {
    /** @type {?} */
    LocalStorage.prototype.localStorage;
    /**
     * @type {?}
     * @protected
     */
    LocalStorage.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2xvY2FsLXN0b3JhZ2UvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVoRTtJQUlFLHNCQUFzQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUNuRTtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7OztJQUVNLDBCQUFHOzs7OztJQUFWLFVBQVcsR0FBVyxFQUFFLEtBQWE7UUFDbkMsSUFBSTtZQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtJQUNoQixDQUFDOzs7OztJQUVNLDBCQUFHOzs7O0lBQVYsVUFBVyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBRU0sZ0NBQVM7Ozs7O0lBQWhCLFVBQWlCLEdBQVcsRUFBRSxLQUFVO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVNLGdDQUFTOzs7O0lBQWhCLFVBQWlCLEdBQVc7UUFDMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7OztJQUVNLDZCQUFNOzs7O0lBQWIsVUFBYyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7O0lBRU0sNEJBQUs7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7O2dCQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQixJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM1QjtTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7O2dCQXZERixVQUFVOzs7O2dCQUZGLFVBQVU7O0lBMERuQixtQkFBQztDQUFBLEFBeERELElBd0RDO1NBdkRZLFlBQVk7OztJQUN2QixvQ0FBeUI7Ozs7O0lBRWIsa0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJy4uL2NvcmUtY29uZmlnL2NvcmUtY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlIHtcbiAgcHVibGljIGxvY2FsU3RvcmFnZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnKSB7XG4gICAgaWYgKCFjb3JlQ29uZmlnLmlzVW5pdmVyc2FsKCkpIHtcbiAgICAgIGlmICh0eXBlb2YgbG9jYWxTdG9yYWdlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IExvY2FsIFN0b3JhZ2UnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2Vba2V5XSB8fCBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPYmplY3Qoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZVtrZXldID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldE9iamVjdChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlW2tleV0pIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMubG9jYWxTdG9yYWdlW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmxvY2FsU3RvcmFnZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICBsZXQgc2VydmVyID0gdGhpcy5nZXQoJ1NFUlZFUicpO1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIGlmIChzZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5zZXQoJ1NFUlZFUicsIHNlcnZlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0ge307XG4gICAgfVxuICB9XG59XG4iXX0=