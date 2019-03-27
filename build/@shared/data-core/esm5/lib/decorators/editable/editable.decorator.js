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
export function Editable(className, config) {
    return (/**
     * @param {?} target
     * @param {?=} decoratedPropertyName
     * @return {?}
     */
    function decoratorFactory(target, decoratedPropertyName) {
        config.name = config.name || decoratedPropertyName;
        config.filterName = config.filterName || config.name;
        if (!config.title) {
            config.title = config.name.toUpperCase();
        }
        if (config.collectionName && !config.tag && config.name !== '_acl.groups.r' && config.collectionName !== 'groups') {
            config.filterName += 'Ref';
        }
        if (Models) {
            Models.addFormField(className, config);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGFibGUuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQUc5RCxNQUFNLFVBQVUsUUFBUSxDQUFDLFNBQWlCLEVBQUUsTUFBa0I7SUFDNUQ7Ozs7O0lBQU8sU0FBUyxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUscUJBQThCO1FBQzdFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxxQkFBcUIsQ0FBQztRQUNuRCxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNqQixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssZUFBZSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUSxFQUFFO1lBQ2pILE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tb2RlbHMvbW9kZWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSUZvcm1GaWVsZCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBFZGl0YWJsZShjbGFzc05hbWU6IHN0cmluZywgY29uZmlnOiBJRm9ybUZpZWxkKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3JGYWN0b3J5KHRhcmdldDogT2JqZWN0LCBkZWNvcmF0ZWRQcm9wZXJ0eU5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25maWcubmFtZSA9IGNvbmZpZy5uYW1lIHx8IGRlY29yYXRlZFByb3BlcnR5TmFtZTtcbiAgICBjb25maWcuZmlsdGVyTmFtZSA9IGNvbmZpZy5maWx0ZXJOYW1lIHx8IGNvbmZpZy5uYW1lO1xuICAgIGlmICghY29uZmlnLnRpdGxlKSB7XG4gICAgICBjb25maWcudGl0bGUgPSBjb25maWcubmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmNvbGxlY3Rpb25OYW1lICYmICFjb25maWcudGFnICYmIGNvbmZpZy5uYW1lICE9PSAnX2FjbC5ncm91cHMucicgJiYgY29uZmlnLmNvbGxlY3Rpb25OYW1lICE9PSAnZ3JvdXBzJykge1xuICAgICAgY29uZmlnLmZpbHRlck5hbWUgKz0gJ1JlZic7XG4gICAgfVxuXG4gICAgaWYgKE1vZGVscykge1xuICAgICAgTW9kZWxzLmFkZEZvcm1GaWVsZChjbGFzc05hbWUsIGNvbmZpZyk7XG4gICAgfVxuICB9O1xufVxuIl19