/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as localForage from 'localforage';
/**
 * @param {?=} storageKey
 * @param {?=} useAsync
 * @param {?=} callback
 * @param {?=} forceReplace
 * @return {?}
 */
export function Persistent(storageKey, useAsync, callback, forceReplace) {
    /**
     * @param {?} str
     * @return {?}
     */
    function isValidJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    return (/**
     * @param {?} target
     * @param {?} decoratedPropertyName
     * @return {?}
     */
    function (target, decoratedPropertyName) {
        /** @type {?} */
        var options = Object.assign({}, { storageKey: storageKey || decoratedPropertyName });
        /** @type {?} */
        var _value;
        if (useAsync) {
            localForage.getItem(options.storageKey).then((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                _value = v;
                if (callback) {
                    callback(v);
                }
            }), (/**
             * @return {?}
             */
            function () { }));
        }
        else {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem(options.storageKey) && isValidJson(localStorage.getItem(options.storageKey))) {
                    _value = JSON.parse((/** @type {?} */ (localStorage.getItem(options.storageKey))));
                }
                else {
                    _value = null;
                }
            }
        }
        /** @type {?} */
        var _isInitialised = false;
        /** @type {?} */
        var propertyObj = {
            get: (/**
             * @return {?}
             */
            function () {
                _isInitialised = true;
                return _value;
            }),
            set: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!_isInitialised) {
                    _isInitialised = true;
                    if (forceReplace !== true) {
                        return;
                    }
                }
                if (typeof value !== 'undefined') {
                    _value = value;
                    try {
                        if (useAsync) {
                            localForage.setItem(options.storageKey, value).catch((/**
                             * @return {?}
                             */
                            function () { }));
                        }
                        else {
                            localStorage.setItem(options.storageKey, JSON.stringify(value));
                        }
                    }
                    catch (e) { }
                }
            }),
            enumerable: false
        };
        Object.defineProperty(target, decoratedPropertyName, propertyObj);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdGVudC5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZGVjb3JhdG9ycy9wZXJzaXN0ZW50L3BlcnNpc3RlbnQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssV0FBVyxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7QUFFM0MsTUFBTSxVQUFVLFVBQVUsQ0FBQyxVQUFtQixFQUFFLFFBQWtCLEVBQUUsUUFBbUIsRUFBRSxZQUFzQjs7Ozs7SUFDN0csU0FBUyxXQUFXLENBQUMsR0FBRztRQUN0QixJQUFJO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztJQUFPLFVBQUMsTUFBYyxFQUFFLHFCQUE2Qjs7WUFDL0MsT0FBTyxHQUEyQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLElBQUkscUJBQXFCLEVBQUUsQ0FBQzs7WUFDeEcsTUFBVztRQUNmLElBQUksUUFBUSxFQUFFO1lBQ1osV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSTs7OztZQUMxQyxVQUFBLENBQUM7Z0JBQ0MsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDWCxJQUFJLFFBQVEsRUFBRTtvQkFDWixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2I7WUFDSCxDQUFDOzs7WUFDRCxjQUFPLENBQUMsRUFDVCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUNqQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO29CQUNyRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBQSxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBVSxDQUFDLENBQUM7aUJBQ3pFO3FCQUFNO29CQUNMLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ2Y7YUFDRjtTQUNGOztZQUNHLGNBQWMsR0FBRyxLQUFLOztZQUV0QixXQUFXLEdBQUc7WUFDaEIsR0FBRzs7O1lBQUU7Z0JBQ0gsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFBO1lBQ0QsR0FBRzs7OztZQUFFLFVBQVMsS0FBSztnQkFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO3dCQUN6QixPQUFPO3FCQUNSO2lCQUNGO2dCQUNELElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO29CQUNoQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNmLElBQUk7d0JBQ0YsSUFBSSxRQUFRLEVBQUU7NEJBQ1osV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUs7Ozs0QkFBQyxjQUFPLENBQUMsRUFBQyxDQUFDO3lCQUNoRTs2QkFBTTs0QkFDTCxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lCQUNqRTtxQkFDRjtvQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO2lCQUNmO1lBQ0gsQ0FBQyxDQUFBO1lBQ0QsVUFBVSxFQUFFLEtBQUs7U0FDbEI7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwRSxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9jYWxGb3JhZ2UgZnJvbSAnbG9jYWxmb3JhZ2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gUGVyc2lzdGVudChzdG9yYWdlS2V5Pzogc3RyaW5nLCB1c2VBc3luYz86IGJvb2xlYW4sIGNhbGxiYWNrPzogRnVuY3Rpb24sIGZvcmNlUmVwbGFjZT86IGJvb2xlYW4pIHtcbiAgZnVuY3Rpb24gaXNWYWxpZEpzb24oc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgIEpTT04ucGFyc2Uoc3RyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuICh0YXJnZXQ6IE9iamVjdCwgZGVjb3JhdGVkUHJvcGVydHlOYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBsZXQgb3B0aW9uczogeyBzdG9yYWdlS2V5OiBzdHJpbmcgfSA9IE9iamVjdC5hc3NpZ24oe30sIHsgc3RvcmFnZUtleTogc3RvcmFnZUtleSB8fCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWUgfSk7XG4gICAgbGV0IF92YWx1ZTogYW55O1xuICAgIGlmICh1c2VBc3luYykge1xuICAgICAgbG9jYWxGb3JhZ2UuZ2V0SXRlbShvcHRpb25zLnN0b3JhZ2VLZXkpLnRoZW4oXG4gICAgICAgIHYgPT4ge1xuICAgICAgICAgIF92YWx1ZSA9IHY7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHt9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG9wdGlvbnMuc3RvcmFnZUtleSkgJiYgaXNWYWxpZEpzb24obG9jYWxTdG9yYWdlLmdldEl0ZW0ob3B0aW9ucy5zdG9yYWdlS2V5KSkpIHtcbiAgICAgICAgICBfdmFsdWUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG9wdGlvbnMuc3RvcmFnZUtleSkgYXMgc3RyaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdmFsdWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBfaXNJbml0aWFsaXNlZCA9IGZhbHNlO1xuXG4gICAgbGV0IHByb3BlcnR5T2JqID0ge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgX2lzSW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKCFfaXNJbml0aWFsaXNlZCkge1xuICAgICAgICAgIF9pc0luaXRpYWxpc2VkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZm9yY2VSZXBsYWNlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh1c2VBc3luYykge1xuICAgICAgICAgICAgICBsb2NhbEZvcmFnZS5zZXRJdGVtKG9wdGlvbnMuc3RvcmFnZUtleSwgdmFsdWUpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9wdGlvbnMuc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlY29yYXRlZFByb3BlcnR5TmFtZSwgcHJvcGVydHlPYmopO1xuICB9O1xufVxuIl19