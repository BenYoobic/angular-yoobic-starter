/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { CoreConfig } from '@shared/common';
var Version = /** @class */ (function () {
    function Version(config, coreConfig) {
        this.config = config;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} includeServerName
     * @return {?}
     */
    Version.prototype.get = /**
     * @param {?} includeServerName
     * @return {?}
     */
    function (includeServerName) {
        /** @type {?} */
        var retVal;
        /** @type {?} */
        var serverName = this.config.serverName.toUpperCase();
        if (includeServerName && serverName !== 'PRODUCTION') {
            retVal = this.coreConfig.getAppVersion() + ' - ' + serverName;
        }
        else {
            retVal = this.coreConfig.getAppVersion();
        }
        // if (this.coreConfig.isWKWebView()) {
        //   retVal += ' W';
        // }
        return retVal;
    };
    /**
     * @param {?} version
     * @return {?}
     */
    Version.prototype.isCurrentVersionHigherThan = /**
     * @param {?} version
     * @return {?}
     */
    function (version) {
        /** @type {?} */
        var currentVersion = this.coreConfig.getAppVersion();
        if (currentVersion === version) {
            return true;
        }
        /** @type {?} */
        var current = currentVersion.split('.');
        /** @type {?} */
        var required = version.split('.');
        /** @type {?} */
        var len = Math.min(current.length, required.length);
        // loop while the components are equal
        for (var i = 0; i < len; i++) {
            // A bigger than B
            if (parseInt(current[i], null) > parseInt(required[i], null)) {
                return true;
            }
            // B bigger than A
            if (parseInt(current[i], null) < parseInt(required[i], null)) {
                return false;
            }
        }
        // If one's a prefix of the other, the longer one is greater.
        if (current.length > required.length) {
            return true;
        }
        if (current.length < required.length) {
            return false;
        }
        // Otherwise they are the same.
        return true;
    };
    Version.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Version.ctorParameters = function () { return [
        { type: Config },
        { type: CoreConfig }
    ]; };
    return Version;
}());
export { Version };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Version.prototype.config;
    /**
     * @type {?}
     * @private
     */
    Version.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3ZlcnNpb24vdmVyc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUM7SUFFRSxpQkFBb0IsTUFBYyxFQUFVLFVBQXNCO1FBQTlDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQzs7Ozs7SUFFL0QscUJBQUc7Ozs7SUFBVixVQUFXLGlCQUEwQjs7WUFDL0IsTUFBYzs7WUFDZCxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1FBQ3JELElBQUksaUJBQWlCLElBQUksVUFBVSxLQUFLLFlBQVksRUFBRTtZQUNwRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQy9EO2FBQU07WUFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMxQztRQUNELHVDQUF1QztRQUN2QyxvQkFBb0I7UUFDcEIsSUFBSTtRQUNKLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsNENBQTBCOzs7O0lBQTFCLFVBQTJCLE9BQWU7O1lBQ3BDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTtRQUNwRCxJQUFJLGNBQWMsS0FBSyxPQUFPLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDYjs7WUFFRyxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBQ25DLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7WUFDN0IsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRW5ELHNDQUFzQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLGtCQUFrQjtZQUNsQixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDNUQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELGtCQUFrQjtZQUNsQixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDNUQsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsNkRBQTZEO1FBQzdELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsK0JBQStCO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBaERGLFVBQVU7Ozs7Z0JBSkYsTUFBTTtnQkFFTixVQUFVOztJQW1EbkIsY0FBQztDQUFBLEFBakRELElBaURDO1NBaERZLE9BQU87Ozs7OztJQUNOLHlCQUFzQjs7Ozs7SUFBRSw2QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmVyc2lvbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWcsIHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICBwdWJsaWMgZ2V0KGluY2x1ZGVTZXJ2ZXJOYW1lOiBib29sZWFuKSB7XG4gICAgbGV0IHJldFZhbDogc3RyaW5nO1xuICAgIGxldCBzZXJ2ZXJOYW1lID0gdGhpcy5jb25maWcuc2VydmVyTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmIChpbmNsdWRlU2VydmVyTmFtZSAmJiBzZXJ2ZXJOYW1lICE9PSAnUFJPRFVDVElPTicpIHtcbiAgICAgIHJldFZhbCA9IHRoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCkgKyAnIC0gJyArIHNlcnZlck5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldFZhbCA9IHRoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCk7XG4gICAgfVxuICAgIC8vIGlmICh0aGlzLmNvcmVDb25maWcuaXNXS1dlYlZpZXcoKSkge1xuICAgIC8vICAgcmV0VmFsICs9ICcgVyc7XG4gICAgLy8gfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBpc0N1cnJlbnRWZXJzaW9uSGlnaGVyVGhhbih2ZXJzaW9uOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgY3VycmVudFZlcnNpb24gPSB0aGlzLmNvcmVDb25maWcuZ2V0QXBwVmVyc2lvbigpO1xuICAgIGlmIChjdXJyZW50VmVyc2lvbiA9PT0gdmVyc2lvbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnQgPSBjdXJyZW50VmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIGxldCByZXF1aXJlZCA9IHZlcnNpb24uc3BsaXQoJy4nKTtcbiAgICBsZXQgbGVuID0gTWF0aC5taW4oY3VycmVudC5sZW5ndGgsIHJlcXVpcmVkLmxlbmd0aCk7XG5cbiAgICAvLyBsb29wIHdoaWxlIHRoZSBjb21wb25lbnRzIGFyZSBlcXVhbFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIC8vIEEgYmlnZ2VyIHRoYW4gQlxuICAgICAgaWYgKHBhcnNlSW50KGN1cnJlbnRbaV0sIG51bGwpID4gcGFyc2VJbnQocmVxdWlyZWRbaV0sIG51bGwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgLy8gQiBiaWdnZXIgdGhhbiBBXG4gICAgICBpZiAocGFyc2VJbnQoY3VycmVudFtpXSwgbnVsbCkgPCBwYXJzZUludChyZXF1aXJlZFtpXSwgbnVsbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiBvbmUncyBhIHByZWZpeCBvZiB0aGUgb3RoZXIsIHRoZSBsb25nZXIgb25lIGlzIGdyZWF0ZXIuXG4gICAgaWYgKGN1cnJlbnQubGVuZ3RoID4gcmVxdWlyZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnQubGVuZ3RoIDwgcmVxdWlyZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSB0aGV5IGFyZSB0aGUgc2FtZS5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19