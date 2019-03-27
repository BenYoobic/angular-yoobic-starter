/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
export class Activity {
    /**
     * @param {?} broker
     * @param {?} rq
     */
    constructor(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @protected
     * @param {?} entity
     * @param {?} entityName
     * @param {?} action
     * @return {?}
     */
    _viewOrLike(entity, entityName, action) {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'activity/' + action;
        return this.rq.post(url, { entityRef: entity._id, entityName });
    }
    /**
     * @param {?} entityId
     * @param {?=} action
     * @return {?}
     */
    getActionFilter(entityId, action = 'view') {
        return [[{ field: 'action', operator: { _id: 'eq' }, value: action }, { field: 'entityRef', operator: { _id: 'inq' }, value: [entityId] }]];
    }
    /**
     * @return {?}
     */
    getUserTransform() {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res.data) {
                res.data = res.data.map((/**
                 * @param {?} r
                 * @return {?}
                 */
                r => r.user));
            }
            return res;
        });
    }
    /**
     * @return {?}
     */
    getActionAggregateOptions() {
        return (/**
         * @param {?} start
         * @param {?} limit
         * @return {?}
         */
        (start, limit) => [{ $lookup: { from: 'user', localField: 'userRef', foreignField: '_id', as: 'user' } }, { $unwind: '$user' }, ...(start > 0 ? [{ $skip: start }] : []), ...(limit > 0 ? [{ $limit: limit }] : [])]);
    }
}
Activity.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Activity.ctorParameters = () => [
    { type: Broker },
    { type: Requestor }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Activity.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Activity.prototype.rq;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hY3Rpdml0eS9hY3Rpdml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFNM0QsTUFBTSxPQUFPLFFBQVE7Ozs7O0lBQ25CLFlBQXNCLE1BQWMsRUFBWSxFQUFhO1FBQXZDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUFXO0lBQUcsQ0FBQzs7Ozs7Ozs7SUFFdkQsV0FBVyxDQUFDLE1BQWMsRUFBRSxVQUFrQixFQUFFLE1BQWM7O1lBQ2xFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLFdBQVcsR0FBRyxNQUFNO1FBQ3hELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsUUFBZ0IsRUFBRSxTQUFpQixNQUFNO1FBQ3ZELE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUksQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNkOzs7O1FBQU8sQ0FBQyxHQUFtQixFQUFFLEVBQUU7WUFDN0IsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUM7SUFDSixDQUFDOzs7O0lBRUQseUJBQXlCO1FBQ3ZCOzs7OztRQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7SUFDOU4sQ0FBQzs7O1lBeEJGLFVBQVU7Ozs7WUFORixNQUFNO1lBQ04sU0FBUzs7Ozs7OztJQU9KLDBCQUF3Qjs7Ozs7SUFBRSxzQkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZW50aXR5L2VudGl0eS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQnJva2VyIH0gZnJvbSAnLi4vYnJva2VyL2Jyb2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zZU9iamVjdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcmVzcG9uc2Utb2JqZWN0L3Jlc3BvbnNlLW9iamVjdC5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3Rpdml0eSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IpIHt9XG5cbiAgcHJvdGVjdGVkIF92aWV3T3JMaWtlKGVudGl0eTogRW50aXR5LCBlbnRpdHlOYW1lOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAnYWN0aXZpdHkvJyArIGFjdGlvbjtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBlbnRpdHlSZWY6IGVudGl0eS5faWQsIGVudGl0eU5hbWUgfSk7XG4gIH1cblxuICBnZXRBY3Rpb25GaWx0ZXIoZW50aXR5SWQ6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcgPSAndmlldycpIHtcbiAgICByZXR1cm4gW1t7IGZpZWxkOiAnYWN0aW9uJywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBhY3Rpb24gfSwgeyBmaWVsZDogJ2VudGl0eVJlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IFtlbnRpdHlJZF0gfV1dO1xuICB9XG5cbiAgZ2V0VXNlclRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gKHJlczogUmVzcG9uc2VPYmplY3QpID0+IHtcbiAgICAgIGlmIChyZXMuZGF0YSkge1xuICAgICAgICByZXMuZGF0YSA9IHJlcy5kYXRhLm1hcChyID0+IHIudXNlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gIH1cblxuICBnZXRBY3Rpb25BZ2dyZWdhdGVPcHRpb25zKCkge1xuICAgIHJldHVybiAoc3RhcnQsIGxpbWl0KSA9PiBbeyAkbG9va3VwOiB7IGZyb206ICd1c2VyJywgbG9jYWxGaWVsZDogJ3VzZXJSZWYnLCBmb3JlaWduRmllbGQ6ICdfaWQnLCBhczogJ3VzZXInIH0gfSwgeyAkdW53aW5kOiAnJHVzZXInIH0sIC4uLihzdGFydCA+IDAgPyBbeyAkc2tpcDogc3RhcnQgfV0gOiBbXSksIC4uLihsaW1pdCA+IDAgPyBbeyAkbGltaXQ6IGxpbWl0IH1dIDogW10pXTtcbiAgfVxufVxuIl19