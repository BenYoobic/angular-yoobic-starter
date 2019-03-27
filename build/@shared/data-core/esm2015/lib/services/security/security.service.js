/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
export { Group } from '../../interfaces/group/group.interface';
import { ROLES as ROLES_LIST, ROLES_ASK } from '../../interfaces/condition/condition.interface';
import { Config } from '../config/config.service';
import { flatMap, map as map$ } from 'rxjs/operators';
import { uniq, concat, map, difference } from 'lodash-es';
export class Security {
    /**
     * @param {?} broker
     * @param {?} rq
     * @param {?} config
     */
    constructor(broker, rq, config) {
        this.broker = broker;
        this.rq = rq;
        this.config = config;
    }
    /**
     * Return the list of groups and roles for a specific user
     * @param {?} userId
     * @return {?}
     */
    getUserSession(userId) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/getUserSession', { userId });
    }
    /**
     * Add the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    addGroupUsers(group, users) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $addToSet: { 'users.list': { $each: map(users, '_id') } }
            });
        }
        else {
            //not used
            group.users.list = uniq(concat(group.users.list, map(users, '_id')));
            return this.broker.create('groups', group);
        }
    }
    /**
     * Remove the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    removeGroupUsers(group, users) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $pullAll: { 'users.list': map(users, '_id') }
            });
        }
        else {
            //not used
            group.users.list = uniq(difference(group.users.list, map(users, '_id')));
            return this.broker.create('groups', group);
        }
    }
    /**
     * Add the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    addGroupGroups(group, groups) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $addToSet: { groups: { $each: map(groups, '_id') } }
            });
        }
        else {
            group.groups = uniq(concat(group.groups, map(groups, '_id')));
            return this.broker.create('groups', group);
        }
    }
    /**
     * Remove the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    removeGroupGroups(group, groups) {
        this.initGroup(group);
        if (group._id) {
            return this.broker.patch('groups', {
                _id: group._id,
                $pullAll: { groups: map(groups, '_id') }
            });
        }
        else {
            group.groups = uniq(difference(group.groups, map(groups, '_id')));
            return this.broker.create('groups', group);
        }
    }
    /**
     * @param {?} id
     * @param {?} addedUsers
     * @param {?=} removedUsers
     * @param {?=} addedGroups
     * @param {?=} removedGroups
     * @return {?}
     */
    updateGroup(id, addedUsers, removedUsers = [], addedGroups = [], removedGroups = []) {
        return this.broker
            .patch('groups', {
            _id: id,
            $pullAll: {
                'users.list': map(removedUsers, '_id'),
                groups: map(removedGroups, '_id')
            }
        })
            .pipe(flatMap((/**
         * @return {?}
         */
        () => {
            return this.broker.patch('groups', {
                _id: id,
                $addToSet: {
                    'users.list': { $each: map(addedUsers, '_id') },
                    groups: { $each: map(addedGroups, '_id') }
                }
            });
        })));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    initGroup(group) {
        group.groups = group.groups || [];
        group.users = group.users || {};
        group.users.list = group.users.list || [];
    }
    /**
     * Returns the subquery used in the group's tab user grid
     * @param {?} group
     * @return {?}
     */
    getGroupUserSubQuery(group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'users.list'
        };
    }
    /**
     * Returns the subquery used in the group's tab sub group grid
     * @param {?} group
     * @return {?}
     */
    getGroupGroupSubQuery(group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'groups'
        };
    }
    /**
     * @param {?} groupIds
     * @param {?=} mode
     * @return {?}
     */
    getAncestry(groupIds, mode = 'descendants') {
        /** @type {?} */
        let url = this.config.apiUrl + 'groups/getAncestry';
        return this.rq
            .post(url, {
            groupIds
        })
            .pipe(map$((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (mode === 'descendants') {
                return uniq([].concat(retVal.descendants || []).concat(groupIds || []));
            }
            else if (mode === 'ancestors') {
                return uniq([].concat(retVal.groups || []).concat(groupIds || []));
            }
            else if (mode === 'both') {
                return uniq([]
                    .concat(retVal.descendants || [])
                    .concat(retVal.groups || [])
                    .concat(groupIds || []));
            }
        })));
    }
}
Security.ROLES = ROLES_LIST;
Security.ROLES_ASK = ROLES_ASK;
Security.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Security.ctorParameters = () => [
    { type: Broker },
    { type: Requestor },
    { type: Config }
];
if (false) {
    /** @type {?} */
    Security.ROLES;
    /** @type {?} */
    Security.ROLES_ASK;
    /**
     * @type {?}
     * @protected
     */
    Security.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Security.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Security.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zZWN1cml0eS9zZWN1cml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHM0Qsc0JBQWMsd0NBQXdDLENBQUM7QUFDdkQsT0FBTyxFQUFFLEtBQUssSUFBSSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHMUQsTUFBTSxPQUFPLFFBQVE7Ozs7OztJQUluQixZQUFzQixNQUFjLEVBQVksRUFBYSxFQUFZLE1BQWM7UUFBakUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQzs7Ozs7O0lBSTNGLGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7Ozs7OztJQUtELGFBQWEsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUN2QyxJQUFJLENBQUMsU0FB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QUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO2lCQUFNLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQ1QsRUFBRTtxQkFDQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztxQkFDM0IsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDMUIsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7O0FBdkphLGNBQUssR0FBRyxVQUFVLENBQUM7QUFDbkIsa0JBQVMsR0FBRyxTQUFTLENBQUM7O1lBSHJDLFVBQVU7Ozs7WUFiRixNQUFNO1lBQ04sU0FBUztZQUtULE1BQU07Ozs7SUFTYixlQUFpQzs7SUFDakMsbUJBQW9DOzs7OztJQUV4QiwwQkFBd0I7Ozs7O0lBQUUsc0JBQXVCOzs7OztJQUFFLDBCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb2tlciB9IGZyb20gJy4uL2Jyb2tlci9icm9rZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdXNlci91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZ3JvdXAvZ3JvdXAuaW50ZXJmYWNlJztcbmV4cG9ydCAqIGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZ3JvdXAvZ3JvdXAuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJPTEVTIGFzIFJPTEVTX0xJU1QsIFJPTEVTX0FTSyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmxhdE1hcCwgbWFwIGFzIG1hcCQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IHVuaXEsIGNvbmNhdCwgbWFwLCBkaWZmZXJlbmNlIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5IHtcbiAgcHVibGljIHN0YXRpYyBST0xFUyA9IFJPTEVTX0xJU1Q7XG4gIHB1YmxpYyBzdGF0aWMgUk9MRVNfQVNLID0gUk9MRVNfQVNLO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZykge31cbiAgLyoqXG4gICAgUmV0dXJuIHRoZSBsaXN0IG9mIGdyb3VwcyBhbmQgcm9sZXMgZm9yIGEgc3BlY2lmaWMgdXNlclxuICAgICovXG4gIGdldFVzZXJTZXNzaW9uKHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ2J1c2luZXNzbG9naWMvZ2V0VXNlclNlc3Npb24nLCB7IHVzZXJJZCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgIEFkZCB0aGUgc3BlY2lmaWVkIHVzZXJzIHRvIHRoZSBncm91cFxuICAgICovXG4gIGFkZEdyb3VwVXNlcnMoZ3JvdXA6IEdyb3VwLCB1c2VyczogVXNlcltdKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmluaXRHcm91cChncm91cCk7XG4gICAgaWYgKGdyb3VwLl9pZCkge1xuICAgICAgcmV0dXJuIHRoaXMuYnJva2VyLnBhdGNoKCdncm91cHMnLCB7XG4gICAgICAgIF9pZDogZ3JvdXAuX2lkLFxuICAgICAgICAkYWRkVG9TZXQ6IHsgJ3VzZXJzLmxpc3QnOiB7ICRlYWNoOiBtYXAodXNlcnMsICdfaWQnKSB9IH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL25vdCB1c2VkXG4gICAgICBncm91cC51c2Vycy5saXN0ID0gdW5pcShjb25jYXQoZ3JvdXAudXNlcnMubGlzdCwgbWFwKHVzZXJzLCAnX2lkJykpKTtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5jcmVhdGUoJ2dyb3VwcycsIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICBSZW1vdmUgdGhlIHNwZWNpZmllZCB1c2VycyB0byB0aGUgZ3JvdXBcbiAgICAqL1xuICByZW1vdmVHcm91cFVzZXJzKGdyb3VwOiBHcm91cCwgdXNlcnM6IFVzZXJbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5pbml0R3JvdXAoZ3JvdXApO1xuICAgIGlmIChncm91cC5faWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5wYXRjaCgnZ3JvdXBzJywge1xuICAgICAgICBfaWQ6IGdyb3VwLl9pZCxcbiAgICAgICAgJHB1bGxBbGw6IHsgJ3VzZXJzLmxpc3QnOiBtYXAodXNlcnMsICdfaWQnKSB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9ub3QgdXNlZFxuICAgICAgZ3JvdXAudXNlcnMubGlzdCA9IHVuaXEoZGlmZmVyZW5jZShncm91cC51c2Vycy5saXN0LCBtYXAodXNlcnMsICdfaWQnKSkpO1xuICAgICAgcmV0dXJuIHRoaXMuYnJva2VyLmNyZWF0ZSgnZ3JvdXBzJywgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgICAgIEFkZCB0aGUgc3BlY2lmaWVkIGdyb3VwcyB0byB0aGUgZ3JvdXBcbiAgICAgICAqL1xuICBhZGRHcm91cEdyb3Vwcyhncm91cDogR3JvdXAsIGdyb3VwczogR3JvdXBbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5pbml0R3JvdXAoZ3JvdXApO1xuICAgIGlmIChncm91cC5faWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5wYXRjaCgnZ3JvdXBzJywge1xuICAgICAgICBfaWQ6IGdyb3VwLl9pZCxcbiAgICAgICAgJGFkZFRvU2V0OiB7IGdyb3VwczogeyAkZWFjaDogbWFwKGdyb3VwcywgJ19pZCcpIH0gfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwLmdyb3VwcyA9IHVuaXEoY29uY2F0KGdyb3VwLmdyb3VwcywgbWFwKGdyb3VwcywgJ19pZCcpKSk7XG4gICAgICByZXR1cm4gdGhpcy5icm9rZXIuY3JlYXRlKCdncm91cHMnLCBncm91cCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICBSZW1vdmUgdGhlIHNwZWNpZmllZCBncm91cHMgdG8gdGhlIGdyb3VwXG4gICAqL1xuICByZW1vdmVHcm91cEdyb3Vwcyhncm91cDogR3JvdXAsIGdyb3VwczogR3JvdXBbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5pbml0R3JvdXAoZ3JvdXApO1xuICAgIGlmIChncm91cC5faWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5wYXRjaCgnZ3JvdXBzJywge1xuICAgICAgICBfaWQ6IGdyb3VwLl9pZCxcbiAgICAgICAgJHB1bGxBbGw6IHsgZ3JvdXBzOiBtYXAoZ3JvdXBzLCAnX2lkJykgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwLmdyb3VwcyA9IHVuaXEoZGlmZmVyZW5jZShncm91cC5ncm91cHMsIG1hcChncm91cHMsICdfaWQnKSkpO1xuICAgICAgcmV0dXJuIHRoaXMuYnJva2VyLmNyZWF0ZSgnZ3JvdXBzJywgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUdyb3VwKGlkOiBzdHJpbmcsIGFkZGVkVXNlcnM6IEFycmF5PFVzZXI+LCByZW1vdmVkVXNlcnM6IEFycmF5PFVzZXI+ID0gW10sIGFkZGVkR3JvdXBzOiBBcnJheTxHcm91cD4gPSBbXSwgcmVtb3ZlZEdyb3VwczogQXJyYXk8R3JvdXA+ID0gW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmJyb2tlclxuICAgICAgLnBhdGNoKCdncm91cHMnLCB7XG4gICAgICAgIF9pZDogaWQsXG4gICAgICAgICRwdWxsQWxsOiB7XG4gICAgICAgICAgJ3VzZXJzLmxpc3QnOiBtYXAocmVtb3ZlZFVzZXJzLCAnX2lkJyksXG4gICAgICAgICAgZ3JvdXBzOiBtYXAocmVtb3ZlZEdyb3VwcywgJ19pZCcpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgZmxhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYnJva2VyLnBhdGNoKCdncm91cHMnLCB7XG4gICAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgICAgJGFkZFRvU2V0OiB7XG4gICAgICAgICAgICAgICd1c2Vycy5saXN0JzogeyAkZWFjaDogbWFwKGFkZGVkVXNlcnMsICdfaWQnKSB9LFxuICAgICAgICAgICAgICBncm91cHM6IHsgJGVhY2g6IG1hcChhZGRlZEdyb3VwcywgJ19pZCcpIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBpbml0R3JvdXAoZ3JvdXA6IEdyb3VwKSB7XG4gICAgZ3JvdXAuZ3JvdXBzID0gZ3JvdXAuZ3JvdXBzIHx8IFtdO1xuICAgIGdyb3VwLnVzZXJzID0gZ3JvdXAudXNlcnMgfHwge307XG4gICAgZ3JvdXAudXNlcnMubGlzdCA9IGdyb3VwLnVzZXJzLmxpc3QgfHwgW107XG4gIH1cblxuICAvKipcbiAgICAgICAgUmV0dXJucyB0aGUgc3VicXVlcnkgdXNlZCBpbiB0aGUgZ3JvdXAncyB0YWIgdXNlciBncmlkXG4gICAgICAgICovXG4gIGdldEdyb3VwVXNlclN1YlF1ZXJ5KGdyb3VwOiBHcm91cCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwJyxcbiAgICAgIHdoZXJlOiB7IF9pZDogZ3JvdXAuX2lkIH0sXG4gICAgICBmaWVsZDogJ19pZCcsXG4gICAgICB2YWx1ZXM6ICd1c2Vycy5saXN0J1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICBSZXR1cm5zIHRoZSBzdWJxdWVyeSB1c2VkIGluIHRoZSBncm91cCdzIHRhYiBzdWIgZ3JvdXAgZ3JpZFxuICAgICovXG4gIGdldEdyb3VwR3JvdXBTdWJRdWVyeShncm91cDogR3JvdXApIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sbGVjdGlvbk5hbWU6ICdncm91cCcsXG4gICAgICB3aGVyZTogeyBfaWQ6IGdyb3VwLl9pZCB9LFxuICAgICAgZmllbGQ6ICdfaWQnLFxuICAgICAgdmFsdWVzOiAnZ3JvdXBzJ1xuICAgIH07XG4gIH1cblxuICBnZXRBbmNlc3RyeShncm91cElkczogc3RyaW5nW10sIG1vZGU6ICdhbmNlc3RvcnMnIHwgJ2Rlc2NlbmRhbnRzJyB8ICdib3RoJyA9ICdkZXNjZW5kYW50cycpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2dyb3Vwcy9nZXRBbmNlc3RyeSc7XG4gICAgcmV0dXJuIHRoaXMucnFcbiAgICAgIC5wb3N0KHVybCwge1xuICAgICAgICBncm91cElkc1xuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAkKHJldFZhbCA9PiB7XG4gICAgICAgICAgaWYgKG1vZGUgPT09ICdkZXNjZW5kYW50cycpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmlxKFtdLmNvbmNhdChyZXRWYWwuZGVzY2VuZGFudHMgfHwgW10pLmNvbmNhdChncm91cElkcyB8fCBbXSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ2FuY2VzdG9ycycpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmlxKFtdLmNvbmNhdChyZXRWYWwuZ3JvdXBzIHx8IFtdKS5jb25jYXQoZ3JvdXBJZHMgfHwgW10pKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdib3RoJykge1xuICAgICAgICAgICAgcmV0dXJuIHVuaXEoXG4gICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICAgICAgLmNvbmNhdChyZXRWYWwuZGVzY2VuZGFudHMgfHwgW10pXG4gICAgICAgICAgICAgICAgLmNvbmNhdChyZXRWYWwuZ3JvdXBzIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5jb25jYXQoZ3JvdXBJZHMgfHwgW10pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==