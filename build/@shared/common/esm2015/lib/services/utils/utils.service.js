/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '../core-config/core-config.service';
import postscribe from 'postscribe';
export class Utils {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    loadScript(url) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (this.coreConfig.isUniversal()) {
                resolve(true);
            }
            else {
                /** @type {?} */
                let element = document.getElementsByTagName('head')[0];
                /** @type {?} */
                let html = `<script async type=text/javascript src=${url}></script>`;
                postscribe(element, html, {
                    done: (/**
                     * @return {?}
                     */
                    () => {
                        resolve(true);
                    })
                });
            }
        }));
    }
    /**
     * @param {?} key
     * @param {?=} url
     * @return {?}
     */
    getUrlParameterByName(key, url) {
        if (!url) {
            url = window.location.href;
        }
        key = key.replace(/[\[\]]/g, '\\$&');
        /** @type {?} */
        const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
        /** @type {?} */
        let results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    /**
     * @param {?} key
     * @param {?} url
     * @return {?}
     */
    removeParameterFromUrl(key, url) {
        /** @type {?} */
        let rtn = url.split('?')[0];
        /** @type {?} */
        let param;
        /** @type {?} */
        let paramsArr = [];
        /** @type {?} */
        let queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
        if (queryString !== '') {
            paramsArr = queryString.split('&');
            for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
                param = paramsArr[i].split('=')[0];
                if (param === key) {
                    paramsArr.splice(i, 1);
                }
            }
            rtn = rtn + '?' + paramsArr.join('&');
        }
        return rtn;
    }
}
Utils.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Utils.ctorParameters = () => [
    { type: CoreConfig }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Utils.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVoRSxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFHcEMsTUFBTSxPQUFPLEtBQUs7Ozs7SUFDaEIsWUFBc0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Ozs7O0lBRWhELFVBQVUsQ0FBQyxHQUFHO1FBQ1osT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtpQkFBTTs7b0JBQ0QsT0FBTyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUNsRCxJQUFJLEdBQUcsMENBQTBDLEdBQUcsWUFBWTtnQkFDcEUsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7b0JBQ3hCLElBQUk7OztvQkFBRSxHQUFHLEVBQUU7d0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDLENBQUE7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVELHFCQUFxQixDQUFDLEdBQVcsRUFBRSxHQUFZO1FBQzdDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDNUI7UUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7O2NBQy9CLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLG1CQUFtQixDQUFDOztZQUN4RCxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7Ozs7SUFFRCxzQkFBc0IsQ0FBQyxHQUFXLEVBQUUsR0FBVzs7WUFDekMsR0FBRyxHQUFXLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMvQixLQUFhOztZQUNiLFNBQVMsR0FBa0IsRUFBRTs7WUFDN0IsV0FBVyxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUUsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ3RCLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqRCxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO29CQUNqQixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDeEI7YUFDRjtZQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OztZQXBERixVQUFVOzs7O1lBSkYsVUFBVTs7Ozs7OztJQU1MLDJCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICcuLi9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlJztcblxuaW1wb3J0IHBvc3RzY3JpYmUgZnJvbSAncG9zdHNjcmliZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnKSB7fVxuXG4gIGxvYWRTY3JpcHQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNVbml2ZXJzYWwoKSkge1xuICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICBsZXQgaHRtbCA9IGA8c2NyaXB0IGFzeW5jIHR5cGU9dGV4dC9qYXZhc2NyaXB0IHNyYz0ke3VybH0+PC9zY3JpcHQ+YDtcbiAgICAgICAgcG9zdHNjcmliZShlbGVtZW50LCBodG1sLCB7XG4gICAgICAgICAgZG9uZTogKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VXJsUGFyYW1ldGVyQnlOYW1lKGtleTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXVybCkge1xuICAgICAgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgfVxuICAgIGtleSA9IGtleS5yZXBsYWNlKC9bXFxbXFxdXS9nLCAnXFxcXCQmJyk7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdbPyZdJyArIGtleSArICcoPShbXiYjXSopfCZ8I3wkKScpO1xuICAgIGxldCByZXN1bHRzID0gcmVnZXguZXhlYyh1cmwpO1xuICAgIGlmICghcmVzdWx0cykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghcmVzdWx0c1syXSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICB9XG5cbiAgcmVtb3ZlUGFyYW1ldGVyRnJvbVVybChrZXk6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcbiAgICBsZXQgcnRuOiBzdHJpbmcgPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgICBsZXQgcGFyYW06IHN0cmluZztcbiAgICBsZXQgcGFyYW1zQXJyOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgbGV0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/IHVybC5zcGxpdCgnPycpWzFdIDogJyc7XG4gICAgaWYgKHF1ZXJ5U3RyaW5nICE9PSAnJykge1xuICAgICAgcGFyYW1zQXJyID0gcXVlcnlTdHJpbmcuc3BsaXQoJyYnKTtcbiAgICAgIGZvciAobGV0IGkgPSBwYXJhbXNBcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgcGFyYW0gPSBwYXJhbXNBcnJbaV0uc3BsaXQoJz0nKVswXTtcbiAgICAgICAgaWYgKHBhcmFtID09PSBrZXkpIHtcbiAgICAgICAgICBwYXJhbXNBcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBydG4gPSBydG4gKyAnPycgKyBwYXJhbXNBcnIuam9pbignJicpO1xuICAgIH1cbiAgICByZXR1cm4gcnRuO1xuICB9XG59XG4iXX0=