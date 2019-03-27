/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Models } from '../../services/models/models.service';
/**
 * @record
 */
export function IModelConfig() { }
if (false) {
    /** @type {?|undefined} */
    IModelConfig.prototype.collectionName;
    /** @type {?} */
    IModelConfig.prototype.className;
    /** @type {?|undefined} */
    IModelConfig.prototype.fields;
    /** @type {?|undefined} */
    IModelConfig.prototype.include;
    /** @type {?|undefined} */
    IModelConfig.prototype.searchSubquery;
    /** @type {?|undefined} */
    IModelConfig.prototype.feathersService;
    /** @type {?|undefined} */
    IModelConfig.prototype.detailComponent;
    /** @type {?|undefined} */
    IModelConfig.prototype.icon;
}
/**
 * @param {?} config
 * @return {?}
 */
export function Model(config) {
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (Models) {
            Models.setCollectionName(config.className, config.collectionName, config.fields, config.include, config.searchSubquery, config.feathersService, target, null, config.detailComponent, config.icon);
        }
    });
}
/**
 * @param {?} config
 * @return {?}
 */
export function ModelExtended(config) {
    return (/**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        Models.addBaseModel(config.extendedClass, config.baseClass, target);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFFOUQsa0NBU0M7OztJQVJDLHNDQUF3Qjs7SUFDeEIsaUNBQWtCOztJQUNsQiw4QkFBdUI7O0lBQ3ZCLCtCQUFjOztJQUNkLHNDQUEyRTs7SUFDM0UsdUNBQXlCOztJQUN6Qix1Q0FBeUI7O0lBQ3pCLDRCQUFjOzs7Ozs7QUFHaEIsTUFBTSxVQUFVLEtBQUssQ0FBQyxNQUFvQjtJQUN4Qzs7OztJQUFPLFVBQVMsTUFBcUI7UUFDbkMsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwTTtJQUNILENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUFvRDtJQUNoRjs7OztJQUFPLFVBQVMsTUFBVztRQUN6QixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RSxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9lbnRpdHkvZW50aXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tb2RlbHMvbW9kZWxzLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNb2RlbENvbmZpZyB7XG4gIGNvbGxlY3Rpb25OYW1lPzogc3RyaW5nO1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgZmllbGRzPzogQXJyYXk8c3RyaW5nPjtcbiAgaW5jbHVkZT86IGFueTtcbiAgc2VhcmNoU3VicXVlcnk/OiB7IGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7IGZpZWxkOiBzdHJpbmc7IHZhbHVlczogc3RyaW5nIH07XG4gIGZlYXRoZXJzU2VydmljZT86IHN0cmluZztcbiAgZGV0YWlsQ29tcG9uZW50Pzogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTW9kZWwoY29uZmlnOiBJTW9kZWxDb25maWcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogdHlwZW9mIEVudGl0eSkge1xuICAgIGlmIChNb2RlbHMpIHtcbiAgICAgIE1vZGVscy5zZXRDb2xsZWN0aW9uTmFtZShjb25maWcuY2xhc3NOYW1lLCBjb25maWcuY29sbGVjdGlvbk5hbWUsIGNvbmZpZy5maWVsZHMsIGNvbmZpZy5pbmNsdWRlLCBjb25maWcuc2VhcmNoU3VicXVlcnksIGNvbmZpZy5mZWF0aGVyc1NlcnZpY2UsIHRhcmdldCwgbnVsbCwgY29uZmlnLmRldGFpbENvbXBvbmVudCwgY29uZmlnLmljb24pO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1vZGVsRXh0ZW5kZWQoY29uZmlnOiB7IGJhc2VDbGFzczogc3RyaW5nOyBleHRlbmRlZENsYXNzOiBzdHJpbmcgfSkge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnkpIHtcbiAgICBNb2RlbHMuYWRkQmFzZU1vZGVsKGNvbmZpZy5leHRlbmRlZENsYXNzLCBjb25maWcuYmFzZUNsYXNzLCB0YXJnZXQpO1xuICB9O1xufVxuIl19