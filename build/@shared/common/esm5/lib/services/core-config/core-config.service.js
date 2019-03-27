/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { setIsWeb, setIsIonic, isIOS as _isIOS, isCordova as _isCordova, isCapacitorNative as _isCapacitorNative, isElectron as _isElectron, isFirefox as _isFirefox, isIE as _isIE, isIE11 as _isIE11, isIOS9 as _isIOS9, isIphoneX as _isIphoneX, isIphone5 as _isIphone5, isIphoneSE as _isIphoneSE, isAndroid as _isAndroid, isWKWebView as _isWKWebView, isSamsung as _isSamsung, isZebraScanner as _isZebraScanner, isTablet as _isTablet, isPhablet as _isPhablet, isSurface as _isSurface, getProtocol as _getProtocol } from '@shared/stencil';
/** @type {?} */
export var CORECONFIG_CONSTANTS = new InjectionToken('CoreConfigConstants');
var CoreConfig = /** @class */ (function () {
    function CoreConfig(platformId, config) {
        this.platformId = platformId;
        this.configConstants = {};
        this.configConstants = config;
    }
    /**
     * @return {?}
     */
    CoreConfig.prototype.setStencil = /**
     * @return {?}
     */
    function () {
        setIsWeb(this.isWeb());
        setIsIonic(this.isIonic());
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isWeb = /**
     * @return {?}
     */
    function () {
        return this.configConstants.configIsWeb;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIonic = /**
     * @return {?}
     */
    function () {
        return this.configConstants.configIsIonic2;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isCordova = /**
     * @return {?}
     */
    function () {
        return _isCordova();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isCapacitorNative = /**
     * @return {?}
     */
    function () {
        return _isCapacitorNative();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isHybrid = /**
     * @return {?}
     */
    function () {
        return this.isCordova() || this.isCapacitorNative();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isElectron = /**
     * @return {?}
     */
    function () {
        return _isElectron();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isFirefox = /**
     * @return {?}
     */
    function () {
        return _isFirefox();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIE = /**
     * @return {?}
     */
    function () {
        return _isIE();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIE11 = /**
     * @return {?}
     */
    function () {
        return _isIE11();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isUniversal = /**
     * @return {?}
     */
    function () {
        return isPlatformServer(this.platformId);
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getPlatform = /**
     * @return {?}
     */
    function () {
        return this.configConstants.configPlatform;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getPlatformClean = /**
     * @return {?}
     */
    function () {
        return this.getPlatform()
            .toLowerCase()
            .replace('ionic', 'mobile');
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIOS = /**
     * @return {?}
     */
    function () {
        return _isIOS();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIOS9 = /**
     * @return {?}
     */
    function () {
        return _isIOS9();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIphoneX = /**
     * @return {?}
     */
    function () {
        return _isIphoneX();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIphone5 = /**
     * @return {?}
     */
    function () {
        return _isIphone5();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isIphoneSE = /**
     * @return {?}
     */
    function () {
        return _isIphoneSE();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isAndroid = /**
     * @return {?}
     */
    function () {
        return _isAndroid();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isWKWebView = /**
     * @return {?}
     */
    function () {
        return _isWKWebView();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isTablet = /**
     * @return {?}
     */
    function () {
        return _isTablet();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isPhablet = /**
     * @return {?}
     */
    function () {
        return _isPhablet();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isSamsung = /**
     * @return {?}
     */
    function () {
        return _isSamsung();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isZebraScanner = /**
     * @return {?}
     */
    function () {
        return _isZebraScanner();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isSurface = /**
     * @return {?}
     */
    function () {
        return _isSurface();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isLocalhost = /**
     * @return {?}
     */
    function () {
        return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    };
    /**
     * @param {?=} cleanLocation
     * @return {?}
     */
    CoreConfig.prototype.reload = /**
     * @param {?=} cleanLocation
     * @return {?}
     */
    function (cleanLocation) {
        if (cleanLocation === void 0) { cleanLocation = false; }
        if (this.isElectron()) {
        }
        else if (location && ((/** @type {?} */ (location))).reload) {
            location.reload();
            if (cleanLocation) {
                location.replace(location.origin);
            }
        }
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isFullScreenEnabled = /**
     * @return {?}
     */
    function () {
        if (this.isUniversal()) {
            return false;
        }
        return ((/** @type {?} */ (document))).fullscreenEnabled || ((/** @type {?} */ (document))).webkitFullscreenEnabled || ((/** @type {?} */ (document))).mozFullScreenEnabled || ((/** @type {?} */ (document))).msFullscreenEnabled;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.isFullScreen = /**
     * @return {?}
     */
    function () {
        if (this.isUniversal()) {
            return false;
        }
        if (((/** @type {?} */ (document))).fullscreenElement || ((/** @type {?} */ (document))).webkitFullscreenElement || ((/** @type {?} */ (document))).mozFullScreenElement || ((/** @type {?} */ (document))).msFullscreenElement) {
            return true;
        }
        return false;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.requestFullScreen = /**
     * @return {?}
     */
    function () {
        if (this.isUniversal()) {
            return;
        }
        if (document && document.body) {
            /** @type {?} */
            var i = document.body;
            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            }
            else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            }
            else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            }
            else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
        }
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.exitFullScreen = /**
     * @return {?}
     */
    function () {
        if (this.isUniversal()) {
            return;
        }
        if (document) {
            if (((/** @type {?} */ (document))).exitFullscreen) {
                ((/** @type {?} */ (document))).exitFullscreen();
            }
            else if (((/** @type {?} */ (document))).webkitExitFullscreen) {
                ((/** @type {?} */ (document))).webkitExitFullscreen();
            }
            else if (((/** @type {?} */ (document))).mozCancelFullScreen) {
                ((/** @type {?} */ (document))).mozCancelFullScreen();
            }
            else if (((/** @type {?} */ (document))).msExitFullscreen) {
                ((/** @type {?} */ (document))).msExitFullscreen();
            }
        }
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getProtocol = /**
     * @return {?}
     */
    function () {
        return _getProtocol();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getMode = /**
     * @return {?}
     */
    function () {
        return this.configConstants.configMode;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CoreConfig.prototype.getKey = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.configConstants[key];
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getAppId = /**
     * @return {?}
     */
    function () {
        return window['BuildInfo'] ? window['BuildInfo'].basePackageName : window.location.hostname;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getAppVersion = /**
     * @return {?}
     */
    function () {
        return this.configConstants.appVersion;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getAppName = /**
     * @return {?}
     */
    function () {
        return this.configConstants.appName;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getFullAppName = /**
     * @return {?}
     */
    function () {
        return this.getAppName() + '-' + this.getPlatformClean() + '-' + this.getAppVersion();
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getWebUrl = /**
     * @return {?}
     */
    function () {
        return this.configConstants.webUrl;
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getCssPublicUrl = /**
     * @return {?}
     */
    function () {
        //https://storage.googleapis.com/yoobic-mobile-apps/6.0.222-1/operations/mobile/styles.f3f4a35e34aff00b5977.css
        return 'https://storage.googleapis.com/yoobic-mobile-apps/' + this.getAppVersion() + '/' + this.getAppName() + '/' + this.getPlatformClean() + '/';
    };
    /**
     * @return {?}
     */
    CoreConfig.prototype.getSyncedCollections = /**
     * @return {?}
     */
    function () {
        return this.configConstants.syncedCollections;
    };
    CoreConfig.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CoreConfig.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [CORECONFIG_CONSTANTS,] }] }
    ]; };
    return CoreConfig;
}());
export { CoreConfig };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CoreConfig.prototype.configConstants;
    /**
     * @type {?}
     * @private
     */
    CoreConfig.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS1jb25maWcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFHTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLEtBQUssSUFBSSxNQUFNLEVBQ2YsU0FBUyxJQUFJLFVBQVUsRUFDdkIsaUJBQWlCLElBQUksa0JBQWtCLEVBQ3ZDLFVBQVUsSUFBSSxXQUFXLEVBQ3pCLFNBQVMsSUFBSSxVQUFVLEVBQ3ZCLElBQUksSUFBSSxLQUFLLEVBQ2IsTUFBTSxJQUFJLE9BQU8sRUFDakIsTUFBTSxJQUFJLE9BQU8sRUFDakIsU0FBUyxJQUFJLFVBQVUsRUFDdkIsU0FBUyxJQUFJLFVBQVUsRUFDdkIsVUFBVSxJQUFJLFdBQVcsRUFDekIsU0FBUyxJQUFJLFVBQVUsRUFDdkIsV0FBVyxJQUFJLFlBQVksRUFDM0IsU0FBUyxJQUFJLFVBQVUsRUFDdkIsY0FBYyxJQUFJLGVBQWUsRUFDakMsUUFBUSxJQUFJLFNBQVMsRUFDckIsU0FBUyxJQUFJLFVBQVUsRUFDdkIsU0FBUyxJQUFJLFVBQVUsRUFDdkIsV0FBVyxJQUFJLFlBQVksRUFDNUIsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFekIsTUFBTSxLQUFPLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFNLHFCQUFxQixDQUFDO0FBRWxGO0lBSUUsb0JBQXlDLFVBQVUsRUFBZ0MsTUFBTTtRQUFoRCxlQUFVLEdBQVYsVUFBVSxDQUFBO1FBRjNDLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBR2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSwrQkFBVTs7O0lBQWpCO1FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRU0sMEJBQUs7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRU0sNEJBQU87OztJQUFkO1FBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRU0sOEJBQVM7OztJQUFoQjtRQUNFLE9BQU8sVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVNLHNDQUFpQjs7O0lBQXhCO1FBQ0UsT0FBTyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFTSw2QkFBUTs7O0lBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUN0RCxDQUFDOzs7O0lBRU0sK0JBQVU7OztJQUFqQjtRQUNFLE9BQU8sV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVNLDhCQUFTOzs7SUFBaEI7UUFDRSxPQUFPLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFTSx5QkFBSTs7O0lBQVg7UUFDRSxPQUFPLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Ozs7SUFFTSwyQkFBTTs7O0lBQWI7UUFDRSxPQUFPLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFTSxnQ0FBVzs7O0lBQWxCO1FBQ0UsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVNLGdDQUFXOzs7SUFBbEI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFTSxxQ0FBZ0I7OztJQUF2QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRTthQUN0QixXQUFXLEVBQUU7YUFDYixPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFTSwwQkFBSzs7O0lBQVo7UUFDRSxPQUFPLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFTSwyQkFBTTs7O0lBQWI7UUFDRSxPQUFPLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFTSw4QkFBUzs7O0lBQWhCO1FBQ0UsT0FBTyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRU0sOEJBQVM7OztJQUFoQjtRQUNFLE9BQU8sVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVNLCtCQUFVOzs7SUFBakI7UUFDRSxPQUFPLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFTSw4QkFBUzs7O0lBQWhCO1FBQ0UsT0FBTyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRU0sZ0NBQVc7OztJQUFsQjtRQUNFLE9BQU8sWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVNLDZCQUFROzs7SUFBZjtRQUNFLE9BQU8sU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVNLDhCQUFTOzs7SUFBaEI7UUFDRSxPQUFPLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFTSw4QkFBUzs7O0lBQWhCO1FBQ0UsT0FBTyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRU0sbUNBQWM7OztJQUFyQjtRQUNFLE9BQU8sZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVNLDhCQUFTOzs7SUFBaEI7UUFDRSxPQUFPLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFTSxnQ0FBVzs7O0lBQWxCO1FBQ0UsT0FBTyxRQUFRLENBQUMsUUFBUSxLQUFLLFdBQVcsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQztJQUNoRixDQUFDOzs7OztJQUVNLDJCQUFNOzs7O0lBQWIsVUFBYyxhQUE4QjtRQUE5Qiw4QkFBQSxFQUFBLHFCQUE4QjtRQUMxQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtTQUN0QjthQUFNLElBQUksUUFBUSxJQUFJLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDN0MsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLElBQUksYUFBYSxFQUFFO2dCQUNqQixRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQztTQUNGO0lBQ0gsQ0FBQzs7OztJQUVNLHdDQUFtQjs7O0lBQTFCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLG1CQUFLLFFBQVEsRUFBQSxDQUFDLENBQUMsb0JBQW9CLElBQUksQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0lBQ3JLLENBQUM7Ozs7SUFFTSxpQ0FBWTs7O0lBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLG1CQUFLLFFBQVEsRUFBQSxDQUFDLENBQUMsb0JBQW9CLElBQUksQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLG1CQUFtQixFQUFFO1lBQy9KLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFTSxzQ0FBaUI7OztJQUF4QjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3RCLE9BQU87U0FDUjtRQUNELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7O2dCQUN6QixDQUFDLEdBQVEsUUFBUSxDQUFDLElBQUk7WUFDMUIsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFO2dCQUN2QixDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUN2QjtpQkFBTSxJQUFJLENBQUMsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDcEMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzFCO2lCQUFNLElBQUksQ0FBQyxDQUFDLG1CQUFtQixFQUFFO2dCQUNoQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVNLG1DQUFjOzs7SUFBckI7UUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN0QixPQUFPO1NBQ1I7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLGNBQWMsRUFBRTtnQkFDbEMsQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ2xDO2lCQUFNLElBQUksQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLG9CQUFvQixFQUFFO2dCQUMvQyxDQUFDLG1CQUFLLFFBQVEsRUFBQSxDQUFDLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUN4QztpQkFBTSxJQUFJLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDOUMsQ0FBQyxtQkFBSyxRQUFRLEVBQUEsQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDdkM7aUJBQU0sSUFBSSxDQUFDLG1CQUFLLFFBQVEsRUFBQSxDQUFDLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzNDLENBQUMsbUJBQUssUUFBUSxFQUFBLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3BDO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRU0sZ0NBQVc7OztJQUFsQjtRQUNFLE9BQU8sWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVNLDRCQUFPOzs7SUFBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFFTSwyQkFBTTs7OztJQUFiLFVBQWMsR0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVNLDZCQUFROzs7SUFBZjtRQUNFLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUM5RixDQUFDOzs7O0lBRU0sa0NBQWE7OztJQUFwQjtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7SUFDekMsQ0FBQzs7OztJQUVNLCtCQUFVOzs7SUFBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSxtQ0FBYzs7O0lBQXJCO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDeEYsQ0FBQzs7OztJQUVNLDhCQUFTOzs7SUFBaEI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFTSxvQ0FBZTs7O0lBQXRCO1FBQ0UsK0dBQStHO1FBQy9HLE9BQU8sb0RBQW9ELEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNySixDQUFDOzs7O0lBRU0seUNBQW9COzs7SUFBM0I7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsQ0FBQzs7Z0JBek5GLFVBQVU7Ozs7Z0RBSUksTUFBTSxTQUFDLFdBQVc7Z0RBQXVCLE1BQU0sU0FBQyxvQkFBb0I7O0lBc05uRixpQkFBQztDQUFBLEFBMU5ELElBME5DO1NBek5ZLFVBQVU7Ozs7OztJQUNyQixxQ0FBa0M7Ozs7O0lBRXRCLGdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIElDb3JlQ29uZmlnLFxuICBJU3luY2VkQ29sbGVjdGlvbixcbiAgc2V0SXNXZWIsXG4gIHNldElzSW9uaWMsXG4gIGlzSU9TIGFzIF9pc0lPUyxcbiAgaXNDb3Jkb3ZhIGFzIF9pc0NvcmRvdmEsXG4gIGlzQ2FwYWNpdG9yTmF0aXZlIGFzIF9pc0NhcGFjaXRvck5hdGl2ZSxcbiAgaXNFbGVjdHJvbiBhcyBfaXNFbGVjdHJvbixcbiAgaXNGaXJlZm94IGFzIF9pc0ZpcmVmb3gsXG4gIGlzSUUgYXMgX2lzSUUsXG4gIGlzSUUxMSBhcyBfaXNJRTExLFxuICBpc0lPUzkgYXMgX2lzSU9TOSxcbiAgaXNJcGhvbmVYIGFzIF9pc0lwaG9uZVgsXG4gIGlzSXBob25lNSBhcyBfaXNJcGhvbmU1LFxuICBpc0lwaG9uZVNFIGFzIF9pc0lwaG9uZVNFLFxuICBpc0FuZHJvaWQgYXMgX2lzQW5kcm9pZCxcbiAgaXNXS1dlYlZpZXcgYXMgX2lzV0tXZWJWaWV3LFxuICBpc1NhbXN1bmcgYXMgX2lzU2Ftc3VuZyxcbiAgaXNaZWJyYVNjYW5uZXIgYXMgX2lzWmVicmFTY2FubmVyLFxuICBpc1RhYmxldCBhcyBfaXNUYWJsZXQsXG4gIGlzUGhhYmxldCBhcyBfaXNQaGFibGV0LFxuICBpc1N1cmZhY2UgYXMgX2lzU3VyZmFjZSxcbiAgZ2V0UHJvdG9jb2wgYXMgX2dldFByb3RvY29sXG59IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmV4cG9ydCBjb25zdCBDT1JFQ09ORklHX0NPTlNUQU5UUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdDb3JlQ29uZmlnQ29uc3RhbnRzJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb3JlQ29uZmlnIGltcGxlbWVudHMgSUNvcmVDb25maWcge1xuICBwcml2YXRlIGNvbmZpZ0NvbnN0YW50czogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkLCBASW5qZWN0KENPUkVDT05GSUdfQ09OU1RBTlRTKSBjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZ0NvbnN0YW50cyA9IGNvbmZpZztcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdGVuY2lsKCkge1xuICAgIHNldElzV2ViKHRoaXMuaXNXZWIoKSk7XG4gICAgc2V0SXNJb25pYyh0aGlzLmlzSW9uaWMoKSk7XG4gIH1cblxuICBwdWJsaWMgaXNXZWIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnQ29uc3RhbnRzLmNvbmZpZ0lzV2ViO1xuICB9XG5cbiAgcHVibGljIGlzSW9uaWMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnQ29uc3RhbnRzLmNvbmZpZ0lzSW9uaWMyO1xuICB9XG5cbiAgcHVibGljIGlzQ29yZG92YSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gX2lzQ29yZG92YSgpO1xuICB9XG5cbiAgcHVibGljIGlzQ2FwYWNpdG9yTmF0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBfaXNDYXBhY2l0b3JOYXRpdmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0h5YnJpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvcmRvdmEoKSB8fCB0aGlzLmlzQ2FwYWNpdG9yTmF0aXZlKCk7XG4gIH1cblxuICBwdWJsaWMgaXNFbGVjdHJvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gX2lzRWxlY3Ryb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZpcmVmb3goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIF9pc0ZpcmVmb3goKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0lFKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBfaXNJRSgpO1xuICB9XG5cbiAgcHVibGljIGlzSUUxMSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gX2lzSUUxMSgpO1xuICB9XG5cbiAgcHVibGljIGlzVW5pdmVyc2FsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGxhdGZvcm0oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdDb25zdGFudHMuY29uZmlnUGxhdGZvcm07XG4gIH1cblxuICBwdWJsaWMgZ2V0UGxhdGZvcm1DbGVhbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldFBsYXRmb3JtKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAucmVwbGFjZSgnaW9uaWMnLCAnbW9iaWxlJyk7XG4gIH1cblxuICBwdWJsaWMgaXNJT1MoKSB7XG4gICAgcmV0dXJuIF9pc0lPUygpO1xuICB9XG5cbiAgcHVibGljIGlzSU9TOSgpIHtcbiAgICByZXR1cm4gX2lzSU9TOSgpO1xuICB9XG5cbiAgcHVibGljIGlzSXBob25lWCgpIHtcbiAgICByZXR1cm4gX2lzSXBob25lWCgpO1xuICB9XG5cbiAgcHVibGljIGlzSXBob25lNSgpIHtcbiAgICByZXR1cm4gX2lzSXBob25lNSgpO1xuICB9XG5cbiAgcHVibGljIGlzSXBob25lU0UoKSB7XG4gICAgcmV0dXJuIF9pc0lwaG9uZVNFKCk7XG4gIH1cblxuICBwdWJsaWMgaXNBbmRyb2lkKCkge1xuICAgIHJldHVybiBfaXNBbmRyb2lkKCk7XG4gIH1cblxuICBwdWJsaWMgaXNXS1dlYlZpZXcoKSB7XG4gICAgcmV0dXJuIF9pc1dLV2ViVmlldygpO1xuICB9XG5cbiAgcHVibGljIGlzVGFibGV0KCkge1xuICAgIHJldHVybiBfaXNUYWJsZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1BoYWJsZXQoKSB7XG4gICAgcmV0dXJuIF9pc1BoYWJsZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NhbXN1bmcoKSB7XG4gICAgcmV0dXJuIF9pc1NhbXN1bmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1plYnJhU2Nhbm5lcigpIHtcbiAgICByZXR1cm4gX2lzWmVicmFTY2FubmVyKCk7XG4gIH1cblxuICBwdWJsaWMgaXNTdXJmYWNlKCkge1xuICAgIHJldHVybiBfaXNTdXJmYWNlKCk7XG4gIH1cblxuICBwdWJsaWMgaXNMb2NhbGhvc3QoKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lID09PSAnbG9jYWxob3N0JyB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gJzEyNy4wLjAuMSc7XG4gIH1cblxuICBwdWJsaWMgcmVsb2FkKGNsZWFuTG9jYXRpb246IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmlzRWxlY3Ryb24oKSkge1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24gJiYgKDxhbnk+bG9jYXRpb24pLnJlbG9hZCkge1xuICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBpZiAoY2xlYW5Mb2NhdGlvbikge1xuICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKGxvY2F0aW9uLm9yaWdpbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRnVsbFNjcmVlbkVuYWJsZWQoKSB7XG4gICAgaWYgKHRoaXMuaXNVbml2ZXJzYWwoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKDxhbnk+ZG9jdW1lbnQpLmZ1bGxzY3JlZW5FbmFibGVkIHx8ICg8YW55PmRvY3VtZW50KS53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCB8fCAoPGFueT5kb2N1bWVudCkubW96RnVsbFNjcmVlbkVuYWJsZWQgfHwgKDxhbnk+ZG9jdW1lbnQpLm1zRnVsbHNjcmVlbkVuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNGdWxsU2NyZWVuKCkge1xuICAgIGlmICh0aGlzLmlzVW5pdmVyc2FsKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCg8YW55PmRvY3VtZW50KS5mdWxsc2NyZWVuRWxlbWVudCB8fCAoPGFueT5kb2N1bWVudCkud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHwgKDxhbnk+ZG9jdW1lbnQpLm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8ICg8YW55PmRvY3VtZW50KS5tc0Z1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3RGdWxsU2NyZWVuKCkge1xuICAgIGlmICh0aGlzLmlzVW5pdmVyc2FsKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIGxldCBpOiBhbnkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgLy8gZ28gZnVsbC1zY3JlZW5cbiAgICAgIGlmIChpLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgIGkucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoaS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICBpLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGkubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgaS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmIChpLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgaS5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGV4aXRGdWxsU2NyZWVuKCkge1xuICAgIGlmICh0aGlzLmlzVW5pdmVyc2FsKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICBpZiAoKDxhbnk+ZG9jdW1lbnQpLmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICg8YW55PmRvY3VtZW50KS5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIGlmICgoPGFueT5kb2N1bWVudCkud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICg8YW55PmRvY3VtZW50KS5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICg8YW55PmRvY3VtZW50KS5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldFByb3RvY29sKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIF9nZXRQcm90b2NvbCgpO1xuICB9XG5cbiAgcHVibGljIGdldE1vZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdDb25zdGFudHMuY29uZmlnTW9kZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ0NvbnN0YW50c1trZXldO1xuICB9XG5cbiAgcHVibGljIGdldEFwcElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHdpbmRvd1snQnVpbGRJbmZvJ10gPyB3aW5kb3dbJ0J1aWxkSW5mbyddLmJhc2VQYWNrYWdlTmFtZSA6IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBcHBWZXJzaW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnQ29uc3RhbnRzLmFwcFZlcnNpb247XG4gIH1cblxuICBwdWJsaWMgZ2V0QXBwTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ0NvbnN0YW50cy5hcHBOYW1lO1xuICB9XG5cbiAgcHVibGljIGdldEZ1bGxBcHBOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXBwTmFtZSgpICsgJy0nICsgdGhpcy5nZXRQbGF0Zm9ybUNsZWFuKCkgKyAnLScgKyB0aGlzLmdldEFwcFZlcnNpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXZWJVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnQ29uc3RhbnRzLndlYlVybDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDc3NQdWJsaWNVcmwoKSB7XG4gICAgLy9odHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20veW9vYmljLW1vYmlsZS1hcHBzLzYuMC4yMjItMS9vcGVyYXRpb25zL21vYmlsZS9zdHlsZXMuZjNmNGEzNWUzNGFmZjAwYjU5NzcuY3NzXG4gICAgcmV0dXJuICdodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20veW9vYmljLW1vYmlsZS1hcHBzLycgKyB0aGlzLmdldEFwcFZlcnNpb24oKSArICcvJyArIHRoaXMuZ2V0QXBwTmFtZSgpICsgJy8nICsgdGhpcy5nZXRQbGF0Zm9ybUNsZWFuKCkgKyAnLyc7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3luY2VkQ29sbGVjdGlvbnMoKTogQXJyYXk8SVN5bmNlZENvbGxlY3Rpb24+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdDb25zdGFudHMuc3luY2VkQ29sbGVjdGlvbnM7XG4gIH1cbn1cbiJdfQ==