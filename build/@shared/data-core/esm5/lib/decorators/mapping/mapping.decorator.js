/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Models } from '../../services/models/models.service';
/**
 * @param {?} className
 * @param {?} config
 * @return {?}
 */
export function Mapping(className, config) {
    return (/**
     * @param {?} target
     * @param {?} decoratedPropertyName
     * @return {?}
     */
    function decoratorFactory(target, decoratedPropertyName) {
        if (Models) {
            Models.addMappingField(className, decoratedPropertyName, config.order);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGluZy5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjb3JhdG9ycy9tYXBwaW5nL21hcHBpbmcuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQUU5RCxNQUFNLFVBQVUsT0FBTyxDQUFDLFNBQWlCLEVBQUUsTUFBeUI7SUFDbEU7Ozs7O0lBQU8sU0FBUyxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUscUJBQTZCO1FBQzVFLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXBwaW5nKGNsYXNzTmFtZTogc3RyaW5nLCBjb25maWc6IHsgb3JkZXI6IG51bWJlciB9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3JGYWN0b3J5KHRhcmdldDogT2JqZWN0LCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChNb2RlbHMpIHtcbiAgICAgIE1vZGVscy5hZGRNYXBwaW5nRmllbGQoY2xhc3NOYW1lLCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWUsIGNvbmZpZy5vcmRlcik7XG4gICAgfVxuICB9O1xufVxuIl19