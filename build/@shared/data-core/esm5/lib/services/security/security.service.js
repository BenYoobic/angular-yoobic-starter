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
var Security = /** @class */ (function () {
    function Security(broker, rq, config) {
        this.broker = broker;
        this.rq = rq;
        this.config = config;
    }
    /**
      Return the list of groups and roles for a specific user
      */
    /**
     * Return the list of groups and roles for a specific user
     * @param {?} userId
     * @return {?}
     */
    Security.prototype.getUserSession = /**
     * Return the list of groups and roles for a specific user
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/getUserSession', { userId: userId });
    };
    /**
      Add the specified users to the group
      */
    /**
     * Add the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    Security.prototype.addGroupUsers = /**
     * Add the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    function (group, users) {
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
    };
    /**
      Remove the specified users to the group
      */
    /**
     * Remove the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    Security.prototype.removeGroupUsers = /**
     * Remove the specified users to the group
     * @param {?} group
     * @param {?} users
     * @return {?}
     */
    function (group, users) {
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
    };
    /**
         Add the specified groups to the group
         */
    /**
     * Add the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    Security.prototype.addGroupGroups = /**
     * Add the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    function (group, groups) {
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
    };
    /**
     Remove the specified groups to the group
     */
    /**
     * Remove the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    Security.prototype.removeGroupGroups = /**
     * Remove the specified groups to the group
     * @param {?} group
     * @param {?} groups
     * @return {?}
     */
    function (group, groups) {
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
    };
    /**
     * @param {?} id
     * @param {?} addedUsers
     * @param {?=} removedUsers
     * @param {?=} addedGroups
     * @param {?=} removedGroups
     * @return {?}
     */
    Security.prototype.updateGroup = /**
     * @param {?} id
     * @param {?} addedUsers
     * @param {?=} removedUsers
     * @param {?=} addedGroups
     * @param {?=} removedGroups
     * @return {?}
     */
    function (id, addedUsers, removedUsers, addedGroups, removedGroups) {
        var _this = this;
        if (removedUsers === void 0) { removedUsers = []; }
        if (addedGroups === void 0) { addedGroups = []; }
        if (removedGroups === void 0) { removedGroups = []; }
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
        function () {
            return _this.broker.patch('groups', {
                _id: id,
                $addToSet: {
                    'users.list': { $each: map(addedUsers, '_id') },
                    groups: { $each: map(addedGroups, '_id') }
                }
            });
        })));
    };
    /**
     * @param {?} group
     * @return {?}
     */
    Security.prototype.initGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        group.groups = group.groups || [];
        group.users = group.users || {};
        group.users.list = group.users.list || [];
    };
    /**
          Returns the subquery used in the group's tab user grid
          */
    /**
     * Returns the subquery used in the group's tab user grid
     * @param {?} group
     * @return {?}
     */
    Security.prototype.getGroupUserSubQuery = /**
     * Returns the subquery used in the group's tab user grid
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'users.list'
        };
    };
    /**
      Returns the subquery used in the group's tab sub group grid
      */
    /**
     * Returns the subquery used in the group's tab sub group grid
     * @param {?} group
     * @return {?}
     */
    Security.prototype.getGroupGroupSubQuery = /**
     * Returns the subquery used in the group's tab sub group grid
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return {
            collectionName: 'group',
            where: { _id: group._id },
            field: '_id',
            values: 'groups'
        };
    };
    /**
     * @param {?} groupIds
     * @param {?=} mode
     * @return {?}
     */
    Security.prototype.getAncestry = /**
     * @param {?} groupIds
     * @param {?=} mode
     * @return {?}
     */
    function (groupIds, mode) {
        if (mode === void 0) { mode = 'descendants'; }
        /** @type {?} */
        var url = this.config.apiUrl + 'groups/getAncestry';
        return this.rq
            .post(url, {
            groupIds: groupIds
        })
            .pipe(map$((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
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
    };
    Security.ROLES = ROLES_LIST;
    Security.ROLES_ASK = ROLES_ASK;
    Security.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Security.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor },
        { type: Config }
    ]; };
    return Security;
}());
export { Security };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zZWN1cml0eS9zZWN1cml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHM0Qsc0JBQWMsd0NBQXdDLENBQUM7QUFDdkQsT0FBTyxFQUFFLEtBQUssSUFBSSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFMUQ7SUFLRSxrQkFBc0IsTUFBYyxFQUFZLEVBQWEsRUFBWSxNQUFjO1FBQWpFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFDM0Y7O1FBRUk7Ozs7OztJQUNKLGlDQUFjOzs7OztJQUFkLFVBQWUsTUFBYztRQUMzQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsOEJBQThCLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOztRQUVJOzs7Ozs7O0lBQ0osZ0NBQWE7Ozs7OztJQUFiLFVBQWMsS0FBWSxF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QzFCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekU7aUJBQU0sSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO2dCQUMvQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO2lCQUFNLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQ1QsRUFBRTtxQkFDQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7cUJBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztxQkFDM0IsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDMUIsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUF2SmEsY0FBSyxHQUFHLFVBQVUsQ0FBQztJQUNuQixrQkFBUyxHQUFHLFNBQVMsQ0FBQzs7Z0JBSHJDLFVBQVU7Ozs7Z0JBYkYsTUFBTTtnQkFDTixTQUFTO2dCQUtULE1BQU07O0lBaUtmLGVBQUM7Q0FBQSxBQTFKRCxJQTBKQztTQXpKWSxRQUFROzs7SUFDbkIsZUFBaUM7O0lBQ2pDLG1CQUFvQzs7Ozs7SUFFeEIsMEJBQXdCOzs7OztJQUFFLHNCQUF1Qjs7Ozs7SUFBRSwwQkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm9rZXIgfSBmcm9tICcuLi9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2dyb3VwL2dyb3VwLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2dyb3VwL2dyb3VwLmludGVyZmFjZSc7XG5pbXBvcnQgeyBST0xFUyBhcyBST0xFU19MSVNULCBST0xFU19BU0sgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZsYXRNYXAsIG1hcCBhcyBtYXAkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyB1bmlxLCBjb25jYXQsIG1hcCwgZGlmZmVyZW5jZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWN1cml0eSB7XG4gIHB1YmxpYyBzdGF0aWMgUk9MRVMgPSBST0xFU19MSVNUO1xuICBwdWJsaWMgc3RhdGljIFJPTEVTX0FTSyA9IFJPTEVTX0FTSztcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYnJva2VyOiBCcm9rZXIsIHByb3RlY3RlZCBycTogUmVxdWVzdG9yLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcpIHt9XG4gIC8qKlxuICAgIFJldHVybiB0aGUgbGlzdCBvZiBncm91cHMgYW5kIHJvbGVzIGZvciBhIHNwZWNpZmljIHVzZXJcbiAgICAqL1xuICBnZXRVc2VyU2Vzc2lvbih1c2VySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdidXNpbmVzc2xvZ2ljL2dldFVzZXJTZXNzaW9uJywgeyB1c2VySWQgfSk7XG4gIH1cblxuICAvKipcbiAgICBBZGQgdGhlIHNwZWNpZmllZCB1c2VycyB0byB0aGUgZ3JvdXBcbiAgICAqL1xuICBhZGRHcm91cFVzZXJzKGdyb3VwOiBHcm91cCwgdXNlcnM6IFVzZXJbXSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgdGhpcy5pbml0R3JvdXAoZ3JvdXApO1xuICAgIGlmIChncm91cC5faWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5wYXRjaCgnZ3JvdXBzJywge1xuICAgICAgICBfaWQ6IGdyb3VwLl9pZCxcbiAgICAgICAgJGFkZFRvU2V0OiB7ICd1c2Vycy5saXN0JzogeyAkZWFjaDogbWFwKHVzZXJzLCAnX2lkJykgfSB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9ub3QgdXNlZFxuICAgICAgZ3JvdXAudXNlcnMubGlzdCA9IHVuaXEoY29uY2F0KGdyb3VwLnVzZXJzLmxpc3QsIG1hcCh1c2VycywgJ19pZCcpKSk7XG4gICAgICByZXR1cm4gdGhpcy5icm9rZXIuY3JlYXRlKCdncm91cHMnLCBncm91cCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAgUmVtb3ZlIHRoZSBzcGVjaWZpZWQgdXNlcnMgdG8gdGhlIGdyb3VwXG4gICAgKi9cbiAgcmVtb3ZlR3JvdXBVc2Vycyhncm91cDogR3JvdXAsIHVzZXJzOiBVc2VyW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuaW5pdEdyb3VwKGdyb3VwKTtcbiAgICBpZiAoZ3JvdXAuX2lkKSB7XG4gICAgICByZXR1cm4gdGhpcy5icm9rZXIucGF0Y2goJ2dyb3VwcycsIHtcbiAgICAgICAgX2lkOiBncm91cC5faWQsXG4gICAgICAgICRwdWxsQWxsOiB7ICd1c2Vycy5saXN0JzogbWFwKHVzZXJzLCAnX2lkJykgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vbm90IHVzZWRcbiAgICAgIGdyb3VwLnVzZXJzLmxpc3QgPSB1bmlxKGRpZmZlcmVuY2UoZ3JvdXAudXNlcnMubGlzdCwgbWFwKHVzZXJzLCAnX2lkJykpKTtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5jcmVhdGUoJ2dyb3VwcycsIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICAgICBBZGQgdGhlIHNwZWNpZmllZCBncm91cHMgdG8gdGhlIGdyb3VwXG4gICAgICAgKi9cbiAgYWRkR3JvdXBHcm91cHMoZ3JvdXA6IEdyb3VwLCBncm91cHM6IEdyb3VwW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuaW5pdEdyb3VwKGdyb3VwKTtcbiAgICBpZiAoZ3JvdXAuX2lkKSB7XG4gICAgICByZXR1cm4gdGhpcy5icm9rZXIucGF0Y2goJ2dyb3VwcycsIHtcbiAgICAgICAgX2lkOiBncm91cC5faWQsXG4gICAgICAgICRhZGRUb1NldDogeyBncm91cHM6IHsgJGVhY2g6IG1hcChncm91cHMsICdfaWQnKSB9IH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBncm91cC5ncm91cHMgPSB1bmlxKGNvbmNhdChncm91cC5ncm91cHMsIG1hcChncm91cHMsICdfaWQnKSkpO1xuICAgICAgcmV0dXJuIHRoaXMuYnJva2VyLmNyZWF0ZSgnZ3JvdXBzJywgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgUmVtb3ZlIHRoZSBzcGVjaWZpZWQgZ3JvdXBzIHRvIHRoZSBncm91cFxuICAgKi9cbiAgcmVtb3ZlR3JvdXBHcm91cHMoZ3JvdXA6IEdyb3VwLCBncm91cHM6IEdyb3VwW10pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuaW5pdEdyb3VwKGdyb3VwKTtcbiAgICBpZiAoZ3JvdXAuX2lkKSB7XG4gICAgICByZXR1cm4gdGhpcy5icm9rZXIucGF0Y2goJ2dyb3VwcycsIHtcbiAgICAgICAgX2lkOiBncm91cC5faWQsXG4gICAgICAgICRwdWxsQWxsOiB7IGdyb3VwczogbWFwKGdyb3VwcywgJ19pZCcpIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBncm91cC5ncm91cHMgPSB1bmlxKGRpZmZlcmVuY2UoZ3JvdXAuZ3JvdXBzLCBtYXAoZ3JvdXBzLCAnX2lkJykpKTtcbiAgICAgIHJldHVybiB0aGlzLmJyb2tlci5jcmVhdGUoJ2dyb3VwcycsIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVHcm91cChpZDogc3RyaW5nLCBhZGRlZFVzZXJzOiBBcnJheTxVc2VyPiwgcmVtb3ZlZFVzZXJzOiBBcnJheTxVc2VyPiA9IFtdLCBhZGRlZEdyb3VwczogQXJyYXk8R3JvdXA+ID0gW10sIHJlbW92ZWRHcm91cHM6IEFycmF5PEdyb3VwPiA9IFtdKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXJcbiAgICAgIC5wYXRjaCgnZ3JvdXBzJywge1xuICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAkcHVsbEFsbDoge1xuICAgICAgICAgICd1c2Vycy5saXN0JzogbWFwKHJlbW92ZWRVc2VycywgJ19pZCcpLFxuICAgICAgICAgIGdyb3VwczogbWFwKHJlbW92ZWRHcm91cHMsICdfaWQnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZsYXRNYXAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJyb2tlci5wYXRjaCgnZ3JvdXBzJywge1xuICAgICAgICAgICAgX2lkOiBpZCxcbiAgICAgICAgICAgICRhZGRUb1NldDoge1xuICAgICAgICAgICAgICAndXNlcnMubGlzdCc6IHsgJGVhY2g6IG1hcChhZGRlZFVzZXJzLCAnX2lkJykgfSxcbiAgICAgICAgICAgICAgZ3JvdXBzOiB7ICRlYWNoOiBtYXAoYWRkZWRHcm91cHMsICdfaWQnKSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgaW5pdEdyb3VwKGdyb3VwOiBHcm91cCkge1xuICAgIGdyb3VwLmdyb3VwcyA9IGdyb3VwLmdyb3VwcyB8fCBbXTtcbiAgICBncm91cC51c2VycyA9IGdyb3VwLnVzZXJzIHx8IHt9O1xuICAgIGdyb3VwLnVzZXJzLmxpc3QgPSBncm91cC51c2Vycy5saXN0IHx8IFtdO1xuICB9XG5cbiAgLyoqXG4gICAgICAgIFJldHVybnMgdGhlIHN1YnF1ZXJ5IHVzZWQgaW4gdGhlIGdyb3VwJ3MgdGFiIHVzZXIgZ3JpZFxuICAgICAgICAqL1xuICBnZXRHcm91cFVzZXJTdWJRdWVyeShncm91cDogR3JvdXApIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sbGVjdGlvbk5hbWU6ICdncm91cCcsXG4gICAgICB3aGVyZTogeyBfaWQ6IGdyb3VwLl9pZCB9LFxuICAgICAgZmllbGQ6ICdfaWQnLFxuICAgICAgdmFsdWVzOiAndXNlcnMubGlzdCdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAgUmV0dXJucyB0aGUgc3VicXVlcnkgdXNlZCBpbiB0aGUgZ3JvdXAncyB0YWIgc3ViIGdyb3VwIGdyaWRcbiAgICAqL1xuICBnZXRHcm91cEdyb3VwU3ViUXVlcnkoZ3JvdXA6IEdyb3VwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXAnLFxuICAgICAgd2hlcmU6IHsgX2lkOiBncm91cC5faWQgfSxcbiAgICAgIGZpZWxkOiAnX2lkJyxcbiAgICAgIHZhbHVlczogJ2dyb3VwcydcbiAgICB9O1xuICB9XG5cbiAgZ2V0QW5jZXN0cnkoZ3JvdXBJZHM6IHN0cmluZ1tdLCBtb2RlOiAnYW5jZXN0b3JzJyB8ICdkZXNjZW5kYW50cycgfCAnYm90aCcgPSAnZGVzY2VuZGFudHMnKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdncm91cHMvZ2V0QW5jZXN0cnknO1xuICAgIHJldHVybiB0aGlzLnJxXG4gICAgICAucG9zdCh1cmwsIHtcbiAgICAgICAgZ3JvdXBJZHNcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwJChyZXRWYWwgPT4ge1xuICAgICAgICAgIGlmIChtb2RlID09PSAnZGVzY2VuZGFudHMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5pcShbXS5jb25jYXQocmV0VmFsLmRlc2NlbmRhbnRzIHx8IFtdKS5jb25jYXQoZ3JvdXBJZHMgfHwgW10pKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdhbmNlc3RvcnMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5pcShbXS5jb25jYXQocmV0VmFsLmdyb3VwcyB8fCBbXSkuY29uY2F0KGdyb3VwSWRzIHx8IFtdKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtb2RlID09PSAnYm90aCcpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmlxKFxuICAgICAgICAgICAgICBbXVxuICAgICAgICAgICAgICAgIC5jb25jYXQocmV0VmFsLmRlc2NlbmRhbnRzIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5jb25jYXQocmV0VmFsLmdyb3VwcyB8fCBbXSlcbiAgICAgICAgICAgICAgICAuY29uY2F0KGdyb3VwSWRzIHx8IFtdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG59XG4iXX0=