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
    (target, decoratedPropertyName) => {
        /** @type {?} */
        let options = Object.assign({}, { storageKey: storageKey || decoratedPropertyName });
        /** @type {?} */
        let _value;
        if (useAsync) {
            localForage.getItem(options.storageKey).then((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                _value = v;
                if (callback) {
                    callback(v);
                }
            }), (/**
             * @return {?}
             */
            () => { }));
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
        let _isInitialised = false;
        /** @type {?} */
        let propertyObj = {
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
                            () => { }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdGVudC5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZGVjb3JhdG9ycy9wZXJzaXN0ZW50L3BlcnNpc3RlbnQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssV0FBVyxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7QUFFM0MsTUFBTSxVQUFVLFVBQVUsQ0FBQyxVQUFtQixFQUFFLFFBQWtCLEVBQUUsUUFBbUIsRUFBRSxZQUFzQjs7Ozs7SUFDN0csU0FBUyxXQUFXLENBQUMsR0FBRztRQUN0QixJQUFJO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztJQUFPLENBQUMsTUFBYyxFQUFFLHFCQUE2QixFQUFRLEVBQUU7O1lBQ3pELE9BQU8sR0FBMkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxJQUFJLHFCQUFxQixFQUFFLENBQUM7O1lBQ3hHLE1BQVc7UUFDZixJQUFJLFFBQVEsRUFBRTtZQUNaLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUk7Ozs7WUFDMUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ0YsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDWCxJQUFJLFFBQVEsRUFBRTtvQkFDWixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2I7WUFDSCxDQUFDOzs7WUFDRCxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQ1QsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtnQkFDakMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtvQkFDckcsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQUEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQVUsQ0FBQyxDQUFDO2lCQUN6RTtxQkFBTTtvQkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNmO2FBQ0Y7U0FDRjs7WUFDRyxjQUFjLEdBQUcsS0FBSzs7WUFFdEIsV0FBVyxHQUFHO1lBQ2hCLEdBQUc7OztZQUFFO2dCQUNILGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQTtZQUNELEdBQUc7Ozs7WUFBRSxVQUFTLEtBQUs7Z0JBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTt3QkFDekIsT0FBTztxQkFDUjtpQkFDRjtnQkFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtvQkFDaEMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDZixJQUFJO3dCQUNGLElBQUksUUFBUSxFQUFFOzRCQUNaLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxLQUFLOzs7NEJBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDLENBQUM7eUJBQ2hFOzZCQUFNOzRCQUNMLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7eUJBQ2pFO3FCQUNGO29CQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7aUJBQ2Y7WUFDSCxDQUFDLENBQUE7WUFDRCxVQUFVLEVBQUUsS0FBSztTQUNsQjtRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BFLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2NhbEZvcmFnZSBmcm9tICdsb2NhbGZvcmFnZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBQZXJzaXN0ZW50KHN0b3JhZ2VLZXk/OiBzdHJpbmcsIHVzZUFzeW5jPzogYm9vbGVhbiwgY2FsbGJhY2s/OiBGdW5jdGlvbiwgZm9yY2VSZXBsYWNlPzogYm9vbGVhbikge1xuICBmdW5jdGlvbiBpc1ZhbGlkSnNvbihzdHIpIHtcbiAgICB0cnkge1xuICAgICAgSlNPTi5wYXJzZShzdHIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gKHRhcmdldDogT2JqZWN0LCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGxldCBvcHRpb25zOiB7IHN0b3JhZ2VLZXk6IHN0cmluZyB9ID0gT2JqZWN0LmFzc2lnbih7fSwgeyBzdG9yYWdlS2V5OiBzdG9yYWdlS2V5IHx8IGRlY29yYXRlZFByb3BlcnR5TmFtZSB9KTtcbiAgICBsZXQgX3ZhbHVlOiBhbnk7XG4gICAgaWYgKHVzZUFzeW5jKSB7XG4gICAgICBsb2NhbEZvcmFnZS5nZXRJdGVtKG9wdGlvbnMuc3RvcmFnZUtleSkudGhlbihcbiAgICAgICAgdiA9PiB7XG4gICAgICAgICAgX3ZhbHVlID0gdjtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge31cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0ob3B0aW9ucy5zdG9yYWdlS2V5KSAmJiBpc1ZhbGlkSnNvbihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShvcHRpb25zLnN0b3JhZ2VLZXkpKSkge1xuICAgICAgICAgIF92YWx1ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ob3B0aW9ucy5zdG9yYWdlS2V5KSBhcyBzdHJpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF92YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IF9pc0luaXRpYWxpc2VkID0gZmFsc2U7XG5cbiAgICBsZXQgcHJvcGVydHlPYmogPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBfaXNJbml0aWFsaXNlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAoIV9pc0luaXRpYWxpc2VkKSB7XG4gICAgICAgICAgX2lzSW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChmb3JjZVJlcGxhY2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBfdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHVzZUFzeW5jKSB7XG4gICAgICAgICAgICAgIGxvY2FsRm9yYWdlLnNldEl0ZW0ob3B0aW9ucy5zdG9yYWdlS2V5LCB2YWx1ZSkuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob3B0aW9ucy5zdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVjb3JhdGVkUHJvcGVydHlOYW1lLCBwcm9wZXJ0eU9iaik7XG4gIH07XG59XG4iXX0=