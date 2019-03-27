/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import postscribe from 'postscribe';
var Utils = /** @class */ (function () {
    function Utils(coreConfig) {
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    Utils.prototype.loadScript = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (_this.coreConfig.isUniversal()) {
                resolve(true);
            }
            else {
                /** @type {?} */
                var element = document.getElementsByTagName('head')[0];
                /** @type {?} */
                var html = "<script async type=text/javascript src=" + url + "></script>";
                postscribe(element, html, {
                    done: (/**
                     * @return {?}
                     */
                    function () {
                        resolve(true);
                    })
                });
            }
        }));
    };
    /**
     * @param {?} key
     * @param {?=} url
     * @return {?}
     */
    Utils.prototype.getUrlParameterByName = /**
     * @param {?} key
     * @param {?=} url
     * @return {?}
     */
    function (key, url) {
        if (!url) {
            url = window.location.href;
        }
        key = key.replace(/[\[\]]/g, '\\$&');
        /** @type {?} */
        var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
        /** @type {?} */
        var results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    /**
     * @param {?} key
     * @param {?} url
     * @return {?}
     */
    Utils.prototype.removeParameterFromUrl = /**
     * @param {?} key
     * @param {?} url
     * @return {?}
     */
    function (key, url) {
        /** @type {?} */
        var rtn = url.split('?')[0];
        /** @type {?} */
        var param;
        /** @type {?} */
        var paramsArr = [];
        /** @type {?} */
        var queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    };
    Utils.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Utils.ctorParameters = function () { return [
        { type: CoreConfig }
    ]; };
    return Utils;
}());
export { Utils };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Utils.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVoRSxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFFcEM7SUFFRSxlQUFzQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQzs7Ozs7SUFFaEQsMEJBQVU7Ozs7SUFBVixVQUFXLEdBQUc7UUFBZCxpQkFjQztRQWJDLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtpQkFBTTs7b0JBQ0QsT0FBTyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUNsRCxJQUFJLEdBQUcsNENBQTBDLEdBQUcsZUFBWTtnQkFDcEUsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7b0JBQ3hCLElBQUk7OztvQkFBRTt3QkFDSixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hCLENBQUMsQ0FBQTtpQkFDRixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQscUNBQXFCOzs7OztJQUFyQixVQUFzQixHQUFXLEVBQUUsR0FBWTtRQUM3QyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztZQUMvQixLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQzs7WUFDeEQsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7O0lBRUQsc0NBQXNCOzs7OztJQUF0QixVQUF1QixHQUFXLEVBQUUsR0FBVzs7WUFDekMsR0FBRyxHQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMvQixLQUFhOztZQUNiLFNBQVMsR0FBa0IsRUFBRTs7WUFDN0IsV0FBVyxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUUsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ3RCLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqRCxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO29CQUNqQixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDeEI7YUFDRjtZQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7O2dCQXBERixVQUFVOzs7O2dCQUpGLFVBQVU7O0lBeURuQixZQUFDO0NBQUEsQUFyREQsSUFxREM7U0FwRFksS0FBSzs7Ozs7O0lBQ0osMkJBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJy4uL2NvcmUtY29uZmlnL2NvcmUtY29uZmlnLnNlcnZpY2UnO1xuXG5pbXBvcnQgcG9zdHNjcmliZSBmcm9tICdwb3N0c2NyaWJlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcpIHt9XG5cbiAgbG9hZFNjcmlwdCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc1VuaXZlcnNhbCgpKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIGxldCBodG1sID0gYDxzY3JpcHQgYXN5bmMgdHlwZT10ZXh0L2phdmFzY3JpcHQgc3JjPSR7dXJsfT48L3NjcmlwdD5gO1xuICAgICAgICBwb3N0c2NyaWJlKGVsZW1lbnQsIGh0bWwsIHtcbiAgICAgICAgICBkb25lOiAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRVcmxQYXJhbWV0ZXJCeU5hbWUoa2V5OiBzdHJpbmcsIHVybD86IHN0cmluZykge1xuICAgIGlmICghdXJsKSB7XG4gICAgICB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB9XG4gICAga2V5ID0ga2V5LnJlcGxhY2UoL1tcXFtcXF1dL2csICdcXFxcJCYnKTtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1s/Jl0nICsga2V5ICsgJyg9KFteJiNdKil8JnwjfCQpJyk7XG4gICAgbGV0IHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG4gICAgaWYgKCFyZXN1bHRzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKCFyZXN1bHRzWzJdKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gIH1cblxuICByZW1vdmVQYXJhbWV0ZXJGcm9tVXJsKGtleTogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgIGxldCBydG46IHN0cmluZyA9IHVybC5zcGxpdCgnPycpWzBdO1xuICAgIGxldCBwYXJhbTogc3RyaW5nO1xuICAgIGxldCBwYXJhbXNBcnI6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBsZXQgcXVlcnlTdHJpbmc6IHN0cmluZyA9IHVybC5pbmRleE9mKCc/JykgIT09IC0xID8gdXJsLnNwbGl0KCc/JylbMV0gOiAnJztcbiAgICBpZiAocXVlcnlTdHJpbmcgIT09ICcnKSB7XG4gICAgICBwYXJhbXNBcnIgPSBxdWVyeVN0cmluZy5zcGxpdCgnJicpO1xuICAgICAgZm9yIChsZXQgaSA9IHBhcmFtc0Fyci5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICBwYXJhbSA9IHBhcmFtc0FycltpXS5zcGxpdCgnPScpWzBdO1xuICAgICAgICBpZiAocGFyYW0gPT09IGtleSkge1xuICAgICAgICAgIHBhcmFtc0Fyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJ0biA9IHJ0biArICc/JyArIHBhcmFtc0Fyci5qb2luKCcmJyk7XG4gICAgfVxuICAgIHJldHVybiBydG47XG4gIH1cbn1cbiJdfQ==