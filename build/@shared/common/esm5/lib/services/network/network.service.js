/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import { Persistent } from '../../decorators/persistent/persistent.decorator';
import { Network as NetworkNative } from '@ionic-native/network/ngx';
import { Subject } from 'rxjs';
import { isUndefined } from 'lodash-es';
var Network = /** @class */ (function () {
    function Network(coreConfig, networkNative) {
        var _this = this;
        this.coreConfig = coreConfig;
        this.networkNative = networkNative;
        this._isForcedOffline = false;
        this._isOffline = false;
        this._supportedConnections = ['wifi', 'ethernet', '4g', '3g'];
        this._connectionChange = new Subject();
        if (this.coreConfig.isCordova()) {
            /** @type {?} */
            var connection = this.networkNative.type;
            if (isUndefined(connection)) {
                this._isOffline = !navigator.onLine;
            }
            else {
                this._isOffline = this._supportedConnections.indexOf(connection) < 0;
            }
        }
        else if (this.coreConfig.isUniversal()) {
            this._isOffline = false;
        }
        else {
            this._isOffline = !navigator.onLine;
        }
        this.emit();
        if (this.coreConfig.isCordova()) {
            this._onConnectSubscription = (/** @type {?} */ (this.networkNative.onConnect().subscribe((/**
             * @return {?}
             */
            function () {
                _this._isOffline = false;
                _this.emit();
            }))));
            this._onDisconnectSubscription = (/** @type {?} */ (this.networkNative.onDisconnect().subscribe((/**
             * @return {?}
             */
            function () {
                _this._isOffline = true;
                _this.emit();
            }))));
        }
        else if (!this.coreConfig.isUniversal()) {
            this.onlineListener = (/**
             * @return {?}
             */
            function () {
                _this._isOffline = false;
                _this.emit();
            });
            this.offlineListener = (/**
             * @return {?}
             */
            function () {
                _this._isOffline = true;
                _this.emit();
            });
            window.addEventListener('online', this.onlineListener);
            window.addEventListener('offline', this.offlineListener);
        }
    }
    /**
     * @return {?}
     */
    Network.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._onConnectSubscription) {
            this._onConnectSubscription.unsubscribe();
        }
        if (this._onDisconnectSubscription) {
            this._onDisconnectSubscription.unsubscribe();
        }
        window.removeEventListener('online', this.onlineListener);
        window.removeEventListener('offline', this.offlineListener);
    };
    Object.defineProperty(Network.prototype, "connectionChange$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._connectionChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Network.prototype.isOffline = /**
     * @return {?}
     */
    function () {
        return this._isForcedOffline || this._isOffline;
    };
    /**
     * @return {?}
     */
    Network.prototype.isForcedOffline = /**
     * @return {?}
     */
    function () {
        return this._isForcedOffline;
    };
    /**
     * @return {?}
     */
    Network.prototype.getConnection = /**
     * @return {?}
     */
    function () {
        return this.networkNative.type;
    };
    /**
     * @return {?}
     */
    Network.prototype.emit = /**
     * @return {?}
     */
    function () {
        this._connectionChange.next(this._isForcedOffline || this._isOffline);
    };
    /**
     * @param {?} offline
     * @param {?=} emit
     * @return {?}
     */
    Network.prototype.forceOffline = /**
     * @param {?} offline
     * @param {?=} emit
     * @return {?}
     */
    function (offline, emit) {
        if (emit === void 0) { emit = true; }
        this._isForcedOffline = offline;
        if (emit) {
            this.emit();
        }
    };
    Network.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Network.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: NetworkNative }
    ]; };
    tslib_1.__decorate([
        Persistent(),
        tslib_1.__metadata("design:type", Boolean)
    ], Network.prototype, "_isForcedOffline", void 0);
    return Network;
}());
export { Network };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Network.prototype._isForcedOffline;
    /**
     * @type {?}
     * @private
     */
    Network.prototype._isOffline;
    /**
     * @type {?}
     * @private
     */
    Network.prototype._onConnectSubscription;
    /**
     * @type {?}
     * @private
     */
    Network.prototype._onDisconnectSubscription;
    /**
     * @type {?}
     * @private
     */
    Network.prototype._supportedConnections;
    /**
     * @type {?}
     * @private
     */
    Network.prototype._connectionChange;
    /**
     * @type {?}
     * @private
     */
    Network.prototype.onlineListener;
    /**
     * @type {?}
     * @private
     */
    Network.prototype.offlineListener;
    /**
     * @type {?}
     * @private
     */
    Network.prototype.coreConfig;
    /**
     * @type {?}
     * @private
     */
    Network.prototype.networkNative;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25ldHdvcmsvbmV0d29yay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDaEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBRTlFLE9BQU8sRUFBRSxPQUFPLElBQUksYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUE0QixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV4QztJQWFFLGlCQUFvQixVQUFzQixFQUFVLGFBQTRCO1FBQWhGLGlCQW9DQztRQXBDbUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBWDFELHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUVoRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRzVCLDBCQUFxQixHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQU1qRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUU7O2dCQUMzQixVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJO1lBQ3hDLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxx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Q0FBQzs7Ozs7O0lBRUQsOEJBQVk7Ozs7O0lBQVosVUFBYSxPQUFnQixFQUFFLElBQW9CO1FBQXBCLHFCQUFBLEVBQUEsV0FBb0I7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUNoQyxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Z0JBekZGLFVBQVU7Ozs7Z0JBUkYsVUFBVTtnQkFHQyxhQUFhOztJQU9qQjtRQUFiLFVBQVUsRUFBRTs7cURBQTJDO0lBd0YxRCxjQUFDO0NBQUEsQUExRkQsSUEwRkM7U0F6RlksT0FBTzs7Ozs7O0lBQ2xCLG1DQUF3RDs7Ozs7SUFFeEQsNkJBQW9DOzs7OztJQUNwQyx5Q0FBNkM7Ozs7O0lBQzdDLDRDQUFnRDs7Ozs7SUFDaEQsd0NBQWlFOzs7OztJQUNqRSxvQ0FBbUQ7Ozs7O0lBRW5ELGlDQUF1Qjs7Ozs7SUFDdkIsa0NBQXdCOzs7OztJQUVaLDZCQUE4Qjs7Ozs7SUFBRSxnQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICcuLi9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFBlcnNpc3RlbnQgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3BlcnNpc3RlbnQvcGVyc2lzdGVudC5kZWNvcmF0b3InO1xuXG5pbXBvcnQgeyBOZXR3b3JrIGFzIE5ldHdvcmtOYXRpdmUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL25ldHdvcmsvbmd4JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZXR3b3JrIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFBlcnNpc3RlbnQoKSBwcml2YXRlIF9pc0ZvcmNlZE9mZmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9pc09mZmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25Db25uZWN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX29uRGlzY29ubmVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9zdXBwb3J0ZWRDb25uZWN0aW9ucyA9IFsnd2lmaScsICdldGhlcm5ldCcsICc0ZycsICczZyddO1xuICBwcml2YXRlIF9jb25uZWN0aW9uQ2hhbmdlID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIG9ubGluZUxpc3RlbmVyO1xuICBwcml2YXRlIG9mZmxpbmVMaXN0ZW5lcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByaXZhdGUgbmV0d29ya05hdGl2ZTogTmV0d29ya05hdGl2ZSkge1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkpIHtcbiAgICAgIGxldCBjb25uZWN0aW9uID0gdGhpcy5uZXR3b3JrTmF0aXZlLnR5cGU7XG4gICAgICBpZiAoaXNVbmRlZmluZWQoY29ubmVjdGlvbikpIHtcbiAgICAgICAgdGhpcy5faXNPZmZsaW5lID0gIW5hdmlnYXRvci5vbkxpbmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pc09mZmxpbmUgPSB0aGlzLl9zdXBwb3J0ZWRDb25uZWN0aW9ucy5pbmRleE9mKGNvbm5lY3Rpb24pIDwgMDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICB0aGlzLl9pc09mZmxpbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNPZmZsaW5lID0gIW5hdmlnYXRvci5vbkxpbmU7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgpO1xuXG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSkge1xuICAgICAgdGhpcy5fb25Db25uZWN0U3Vic2NyaXB0aW9uID0gPGFueT50aGlzLm5ldHdvcmtOYXRpdmUub25Db25uZWN0KCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5faXNPZmZsaW5lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9vbkRpc2Nvbm5lY3RTdWJzY3JpcHRpb24gPSA8YW55PnRoaXMubmV0d29ya05hdGl2ZS5vbkRpc2Nvbm5lY3QoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc09mZmxpbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICB0aGlzLm9ubGluZUxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc09mZmxpbmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0KCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5vZmZsaW5lTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzT2ZmbGluZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCB0aGlzLm9ubGluZUxpc3RlbmVyKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgdGhpcy5vZmZsaW5lTGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9vbkNvbm5lY3RTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX29uQ29ubmVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9vbkRpc2Nvbm5lY3RTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX29uRGlzY29ubmVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvbmxpbmUnLCB0aGlzLm9ubGluZUxpc3RlbmVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsIHRoaXMub2ZmbGluZUxpc3RlbmVyKTtcbiAgfVxuXG4gIGdldCBjb25uZWN0aW9uQ2hhbmdlJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGlzT2ZmbGluZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNGb3JjZWRPZmZsaW5lIHx8IHRoaXMuX2lzT2ZmbGluZTtcbiAgfVxuXG4gIGlzRm9yY2VkT2ZmbGluZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNGb3JjZWRPZmZsaW5lO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5uZXR3b3JrTmF0aXZlLnR5cGU7XG4gIH1cblxuICBlbWl0KCkge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb25DaGFuZ2UubmV4dCh0aGlzLl9pc0ZvcmNlZE9mZmxpbmUgfHwgdGhpcy5faXNPZmZsaW5lKTtcbiAgfVxuXG4gIGZvcmNlT2ZmbGluZShvZmZsaW5lOiBib29sZWFuLCBlbWl0OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuX2lzRm9yY2VkT2ZmbGluZSA9IG9mZmxpbmU7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdCgpO1xuICAgIH1cbiAgfVxufVxuIl19