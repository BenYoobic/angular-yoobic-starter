/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { map, mergeMap } from 'rxjs/operators';
import { uniq } from 'lodash-es';
export class Users {
    /**
     * @param {?} broker
     * @param {?} rq
     */
    constructor(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    getSimplifiedProfile(userId) {
        return this.broker.getById('user', userId, Users.simplifiedFields);
    }
    /**
     * @return {?}
     */
    getFreshdeskUrl() {
        /** @type {?} */
        let url = this.broker.getApiUrl() + 'endpoints/getFreshdeskUrl';
        return this.rq.post(url, { host_url: 'support-mobile.operations.yoobic.com' }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            return res;
        })));
    }
    /**
     * @param {?} user
     * @param {?} groups
     * @return {?}
     */
    setAcl(user, groups) {
        this.broker.setAcl(user, groups);
    }
    /**
     * @param {?=} showMe
     * @return {?}
     */
    getCustomFilterNoAdmin(showMe = true) {
        /** @type {?} */
        let ids = Users.adminIds.map((/**
         * @param {?} i
         * @return {?}
         */
        i => i._id));
        if (!showMe) {
            ids.push(this.rq.session.userId);
        }
        return { _id: { nin: ids } };
    }
    /**
     * @param {?} username
     * @return {?}
     */
    isUsernameTaken(username) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/isUsernameTaken', { params: { username } }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.data)));
    }
    /**
     * @param {?} locationId
     * @return {?}
     */
    getUsersByLocation(locationId) {
        return this.broker.getAll('user', Users.simplifiedFields, null, null, [[{ field: 'locationRef', operator: { _id: 'eq' }, value: locationId }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.data)));
    }
    /**
     * @param {?} locationId
     * @param {?=} userTags
     * @return {?}
     */
    getGeofilterUsers(locationId, userTags) {
        /** @type {?} */
        let where = { _id: { inq: [locationId] } };
        /** @type {?} */
        let geofilterQuery = {
            limit: 0,
            fields: ['userRef'],
            subQuery: (/** @type {?} */ ({
                collectionName: 'locations',
                field: 'locationsRef',
                values: '_id',
                where: where
            }))
        };
        return this.broker.getAllQuery('geofilters', geofilterQuery).pipe(mergeMap((/**
         * @param {?} geofilters
         * @return {?}
         */
        geofilters => {
            /** @type {?} */
            let userIds = geofilters.data.map((/**
             * @param {?} geofilter
             * @return {?}
             */
            geofilter => geofilter.userRef));
            userIds = uniq(userIds);
            /** @type {?} */
            let userFilter = [[{ field: '_id', operator: { _id: 'inq' }, value: userIds }]];
            if (userTags && userTags.length > 0) {
                userFilter[0].push({ field: 'tags', operator: { _id: 'inq' }, value: userTags });
            }
            return this.broker.getAll('user', Users.simplifiedFields, null, null, userFilter).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            res => res.data)));
        })));
    }
}
Users.adminIds = [{ _id: '53fb03c6546847ee0536386a' }];
Users.simplifiedFields = ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
Users.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Users.ctorParameters = () => [
    { type: Broker },
    { type: Requestor }
];
if (false) {
    /** @type {?} */
    Users.adminIds;
    /** @type {?} */
    Users.simplifiedFields;
    /**
     * @type {?}
     * @protected
     */
    Users.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Users.prototype.rq;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy91c2Vycy91c2Vycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR2pDLE1BQU0sT0FBTyxLQUFLOzs7OztJQUloQixZQUFzQixNQUFjLEVBQVksRUFBYTtRQUF2QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksT0FBRSxHQUFGLEVBQUUsQ0FBVztJQUFHLENBQUM7Ozs7O0lBRWpFLG9CQUFvQixDQUNsQixNQUFNO1FBVU4sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Ozs7SUFFRCxlQUFlOztZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLDJCQUEyQjtRQUMvRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxzQ0FBc0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNqRixHQUFHOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDUixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBVSxFQUFFLE1BQXFCO1FBQ3RD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TUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQy9HLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOztBQXZFYSxjQUFRLEdBQWUsQ0FBQyxFQUFFLEdBQUcsRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUM7QUFDN0Qsc0JBQWdCLEdBQWtCLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7O1lBSGpJLFVBQVU7Ozs7WUFSRixNQUFNO1lBQ04sU0FBUzs7OztJQVNoQixlQUEyRTs7SUFDM0UsdUJBQWdJOzs7OztJQUVwSCx1QkFBd0I7Ozs7O0lBQUUsbUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJva2VyIH0gZnJvbSAnLi4vYnJva2VyL2Jyb2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy91c2VyL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YlF1ZXJ5LCBRdWVyeSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdW5pcSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VycyB7XG4gIHB1YmxpYyBzdGF0aWMgYWRtaW5JZHM6IEFycmF5PGFueT4gPSBbeyBfaWQ6ICc1M2ZiMDNjNjU0Njg0N2VlMDUzNjM4NmEnIH1dO1xuICBwdWJsaWMgc3RhdGljIHNpbXBsaWZpZWRGaWVsZHM6IEFycmF5PHN0cmluZz4gPSBbJ19pZCcsICdpbWFnZURhdGEnLCAnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ2VtYWlsJywgJ3RlbGVwaG9uZScsICd1c2VybmFtZSddO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IpIHt9XG5cbiAgZ2V0U2ltcGxpZmllZFByb2ZpbGUoXG4gICAgdXNlcklkXG4gICk6IE9ic2VydmFibGU8e1xuICAgIF9pZD86IHN0cmluZztcbiAgICBpbWFnZURhdGE/OiBzdHJpbmc7XG4gICAgZmlyc3ROYW1lPzogc3RyaW5nO1xuICAgIGxhc3ROYW1lPzogc3RyaW5nO1xuICAgIGVtYWlsPzogc3RyaW5nO1xuICAgIHRlbGVwaG9uZT86IHN0cmluZztcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgfT4ge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRCeUlkKCd1c2VyJywgdXNlcklkLCBVc2Vycy5zaW1wbGlmaWVkRmllbGRzKTtcbiAgfVxuXG4gIGdldEZyZXNoZGVza1VybCgpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAnZW5kcG9pbnRzL2dldEZyZXNoZGVza1VybCc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgaG9zdF91cmw6ICdzdXBwb3J0LW1vYmlsZS5vcGVyYXRpb25zLnlvb2JpYy5jb20nIH0pLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHNldEFjbCh1c2VyOiBVc2VyLCBncm91cHM6IEFycmF5PHN0cmluZz4pIHtcbiAgICB0aGlzLmJyb2tlci5zZXRBY2wodXNlciwgZ3JvdXBzKTtcbiAgfVxuXG4gIGdldEN1c3RvbUZpbHRlck5vQWRtaW4oc2hvd01lOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGxldCBpZHMgPSBVc2Vycy5hZG1pbklkcy5tYXAoaSA9PiBpLl9pZCk7XG4gICAgaWYgKCFzaG93TWUpIHtcbiAgICAgIGlkcy5wdXNoKHRoaXMucnEuc2Vzc2lvbi51c2VySWQpO1xuICAgIH1cbiAgICByZXR1cm4geyBfaWQ6IHsgbmluOiBpZHMgfSB9O1xuICB9XG5cbiAgaXNVc2VybmFtZVRha2VuKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ2J1c2luZXNzbG9naWMvaXNVc2VybmFtZVRha2VuJywgeyBwYXJhbXM6IHsgdXNlcm5hbWUgfSB9KS5waXBlKG1hcChyZXMgPT4gcmVzLmRhdGEpKTtcbiAgfVxuXG4gIGdldFVzZXJzQnlMb2NhdGlvbihsb2NhdGlvbklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QWxsKCd1c2VyJywgVXNlcnMuc2ltcGxpZmllZEZpZWxkcywgbnVsbCwgbnVsbCwgW1t7IGZpZWxkOiAnbG9jYXRpb25SZWYnLCBvcGVyYXRvcjogeyBfaWQ6ICdlcScgfSwgdmFsdWU6IGxvY2F0aW9uSWQgfV1dKS5waXBlKG1hcChyZXMgPT4gcmVzLmRhdGEpKTtcbiAgfVxuXG4gIGdldEdlb2ZpbHRlclVzZXJzKGxvY2F0aW9uSWQ6IHN0cmluZywgdXNlclRhZ3M/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgbGV0IHdoZXJlID0geyBfaWQ6IHsgaW5xOiBbbG9jYXRpb25JZF0gfSB9O1xuICAgIGxldCBnZW9maWx0ZXJRdWVyeTogUXVlcnkgPSB7XG4gICAgICBsaW1pdDogMCxcbiAgICAgIGZpZWxkczogWyd1c2VyUmVmJ10sXG4gICAgICBzdWJRdWVyeTogPFN1YlF1ZXJ5PntcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgICAgICBmaWVsZDogJ2xvY2F0aW9uc1JlZicsXG4gICAgICAgIHZhbHVlczogJ19pZCcsXG4gICAgICAgIHdoZXJlOiB3aGVyZVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldEFsbFF1ZXJ5KCdnZW9maWx0ZXJzJywgZ2VvZmlsdGVyUXVlcnkpLnBpcGUoXG4gICAgICBtZXJnZU1hcChnZW9maWx0ZXJzID0+IHtcbiAgICAgICAgbGV0IHVzZXJJZHM6IEFycmF5PHN0cmluZz4gPSBnZW9maWx0ZXJzLmRhdGEubWFwKGdlb2ZpbHRlciA9PiBnZW9maWx0ZXIudXNlclJlZik7XG4gICAgICAgIHVzZXJJZHMgPSB1bmlxKHVzZXJJZHMpO1xuICAgICAgICBsZXQgdXNlckZpbHRlciA9IFtbeyBmaWVsZDogJ19pZCcsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IHVzZXJJZHMgfV1dO1xuICAgICAgICBpZiAodXNlclRhZ3MgJiYgdXNlclRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHVzZXJGaWx0ZXJbMF0ucHVzaCh7IGZpZWxkOiAndGFncycsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IHVzZXJUYWdzIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ3VzZXInLCBVc2Vycy5zaW1wbGlmaWVkRmllbGRzLCBudWxsLCBudWxsLCB1c2VyRmlsdGVyKS5waXBlKG1hcChyZXMgPT4gcmVzLmRhdGEpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19