/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Models } from '../../services/models/models.service';
/**
 * @param {?} className
 * @return {?}
 */
export function Searchable(className) {
    return (/**
     * @param {?} target
     * @param {?} decoratedPropertyName
     * @return {?}
     */
    function decoratorFactory(target, decoratedPropertyName) {
        if (Models) {
            Models.addSearchableField(className, decoratedPropertyName);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoYWJsZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0FBRTlELE1BQU0sVUFBVSxVQUFVLENBQUMsU0FBaUI7SUFDMUM7Ozs7O0lBQU8sU0FBUyxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUscUJBQTZCO1FBQzVFLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWFyY2hhYmxlKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3JGYWN0b3J5KHRhcmdldDogT2JqZWN0LCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChNb2RlbHMpIHtcbiAgICAgIE1vZGVscy5hZGRTZWFyY2hhYmxlRmllbGQoY2xhc3NOYW1lLCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWUpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==