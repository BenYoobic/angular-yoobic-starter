/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { map, mergeMap } from 'rxjs/operators';
import { uniq } from 'lodash-es';
var Users = /** @class */ (function () {
    function Users(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} userId
     * @return {?}
     */
    Users.prototype.getSimplifiedProfile = /**
     * @param {?} userId
     * @return {?}
     */
    function (userId) {
        return this.broker.getById('user', userId, Users.simplifiedFields);
    };
    /**
     * @return {?}
     */
    Users.prototype.getFreshdeskUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.broker.getApiUrl() + 'endpoints/getFreshdeskUrl';
        return this.rq.post(url, { host_url: 'support-mobile.operations.yoobic.com' }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return res;
        })));
    };
    /**
     * @param {?} user
     * @param {?} groups
     * @return {?}
     */
    Users.prototype.setAcl = /**
     * @param {?} user
     * @param {?} groups
     * @return {?}
     */
    function (user, groups) {
        this.broker.setAcl(user, groups);
    };
    /**
     * @param {?=} showMe
     * @return {?}
     */
    Users.prototype.getCustomFilterNoAdmin = /**
     * @param {?=} showMe
     * @return {?}
     */
    function (showMe) {
        if (showMe === void 0) { showMe = true; }
        /** @type {?} */
        var ids = Users.adminIds.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return i._id; }));
        if (!showMe) {
            ids.push(this.rq.session.userId);
        }
        return { _id: { nin: ids } };
    };
    /**
     * @param {?} username
     * @return {?}
     */
    Users.prototype.isUsernameTaken = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/isUsernameTaken', { params: { username: username } }).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })));
    };
    /**
     * @param {?} locationId
     * @return {?}
     */
    Users.prototype.getUsersByLocation = /**
     * @param {?} locationId
     * @return {?}
     */
    function (locationId) {
        return this.broker.getAll('user', Users.simplifiedFields, null, null, [[{ field: 'locationRef', operator: { _id: 'eq' }, value: locationId }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })));
    };
    /**
     * @param {?} locationId
     * @param {?=} userTags
     * @return {?}
     */
    Users.prototype.getGeofilterUsers = /**
     * @param {?} locationId
     * @param {?=} userTags
     * @return {?}
     */
    function (locationId, userTags) {
        var _this = this;
        /** @type {?} */
        var where = { _id: { inq: [locationId] } };
        /** @type {?} */
        var geofilterQuery = {
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
        function (geofilters) {
            /** @type {?} */
            var userIds = geofilters.data.map((/**
             * @param {?} geofilter
             * @return {?}
             */
            function (geofilter) { return geofilter.userRef; }));
            userIds = uniq(userIds);
            /** @type {?} */
            var userFilter = [[{ field: '_id', operator: { _id: 'inq' }, value: userIds }]];
            if (userTags && userTags.length > 0) {
                userFilter[0].push({ field: 'tags', operator: { _id: 'inq' }, value: userTags });
            }
            return _this.broker.getAll('user', Users.simplifiedFields, null, null, userFilter).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return res.data; })));
        })));
    };
    Users.adminIds = [{ _id: '53fb03c6546847ee0536386a' }];
    Users.simplifiedFields = ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
    Users.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Users.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor }
    ]; };
    return Users;
}());
export { Users };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy91c2Vycy91c2Vycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWpDO0lBS0UsZUFBc0IsTUFBYyxFQUFZLEVBQWE7UUFBdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQVc7SUFBRyxDQUFDOzs7OztJQUVqRSxvQ0FBb0I7Ozs7SUFBcEIsVUFDRSxNQUFNO1FBVU4sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Ozs7SUFFRCwrQkFBZTs7O0lBQWY7O1lBQ00sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsMkJBQTJCO1FBQy9ELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2pGLEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDTCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFRCxzQkFBTTs7Ozs7SUFBTixVQUFPLElBQVUsRUFBRSxNQUFxQjtRQUN0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QUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ2xGO1lBQ0QsT0FBTyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQVIsQ0FBUSxFQUFDLENBQUMsQ0FBQztRQUMvRyxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQXZFYSxjQUFRLEdBQWUsQ0FBQyxFQUFFLEdBQUcsRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUM7SUFDN0Qsc0JBQWdCLEdBQWtCLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7O2dCQUhqSSxVQUFVOzs7O2dCQVJGLE1BQU07Z0JBQ04sU0FBUzs7SUFpRmxCLFlBQUM7Q0FBQSxBQTFFRCxJQTBFQztTQXpFWSxLQUFLOzs7SUFDaEIsZUFBMkU7O0lBQzNFLHVCQUFnSTs7Ozs7SUFFcEgsdUJBQXdCOzs7OztJQUFFLG1CQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb2tlciB9IGZyb20gJy4uL2Jyb2tlci9icm9rZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdXNlci91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJRdWVyeSwgUXVlcnkgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHVuaXEgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlcnMge1xuICBwdWJsaWMgc3RhdGljIGFkbWluSWRzOiBBcnJheTxhbnk+ID0gW3sgX2lkOiAnNTNmYjAzYzY1NDY4NDdlZTA1MzYzODZhJyB9XTtcbiAgcHVibGljIHN0YXRpYyBzaW1wbGlmaWVkRmllbGRzOiBBcnJheTxzdHJpbmc+ID0gWydfaWQnLCAnaW1hZ2VEYXRhJywgJ2ZpcnN0TmFtZScsICdsYXN0TmFtZScsICdlbWFpbCcsICd0ZWxlcGhvbmUnLCAndXNlcm5hbWUnXTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYnJva2VyOiBCcm9rZXIsIHByb3RlY3RlZCBycTogUmVxdWVzdG9yKSB7fVxuXG4gIGdldFNpbXBsaWZpZWRQcm9maWxlKFxuICAgIHVzZXJJZFxuICApOiBPYnNlcnZhYmxlPHtcbiAgICBfaWQ/OiBzdHJpbmc7XG4gICAgaW1hZ2VEYXRhPzogc3RyaW5nO1xuICAgIGZpcnN0TmFtZT86IHN0cmluZztcbiAgICBsYXN0TmFtZT86IHN0cmluZztcbiAgICBlbWFpbD86IHN0cmluZztcbiAgICB0ZWxlcGhvbmU/OiBzdHJpbmc7XG4gICAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIH0+IHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QnlJZCgndXNlcicsIHVzZXJJZCwgVXNlcnMuc2ltcGxpZmllZEZpZWxkcyk7XG4gIH1cblxuICBnZXRGcmVzaGRlc2tVcmwoKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ2VuZHBvaW50cy9nZXRGcmVzaGRlc2tVcmwnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IGhvc3RfdXJsOiAnc3VwcG9ydC1tb2JpbGUub3BlcmF0aW9ucy55b29iaWMuY29tJyB9KS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBzZXRBY2wodXNlcjogVXNlciwgZ3JvdXBzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgdGhpcy5icm9rZXIuc2V0QWNsKHVzZXIsIGdyb3Vwcyk7XG4gIH1cblxuICBnZXRDdXN0b21GaWx0ZXJOb0FkbWluKHNob3dNZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBsZXQgaWRzID0gVXNlcnMuYWRtaW5JZHMubWFwKGkgPT4gaS5faWQpO1xuICAgIGlmICghc2hvd01lKSB7XG4gICAgICBpZHMucHVzaCh0aGlzLnJxLnNlc3Npb24udXNlcklkKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgX2lkOiB7IG5pbjogaWRzIH0gfTtcbiAgfVxuXG4gIGlzVXNlcm5hbWVUYWtlbih1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdidXNpbmVzc2xvZ2ljL2lzVXNlcm5hbWVUYWtlbicsIHsgcGFyYW1zOiB7IHVzZXJuYW1lIH0gfSkucGlwZShtYXAocmVzID0+IHJlcy5kYXRhKSk7XG4gIH1cblxuICBnZXRVc2Vyc0J5TG9jYXRpb24obG9jYXRpb25JZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldEFsbCgndXNlcicsIFVzZXJzLnNpbXBsaWZpZWRGaWVsZHMsIG51bGwsIG51bGwsIFtbeyBmaWVsZDogJ2xvY2F0aW9uUmVmJywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBsb2NhdGlvbklkIH1dXSkucGlwZShtYXAocmVzID0+IHJlcy5kYXRhKSk7XG4gIH1cblxuICBnZXRHZW9maWx0ZXJVc2Vycyhsb2NhdGlvbklkOiBzdHJpbmcsIHVzZXJUYWdzPzogQXJyYXk8c3RyaW5nPikge1xuICAgIGxldCB3aGVyZSA9IHsgX2lkOiB7IGlucTogW2xvY2F0aW9uSWRdIH0gfTtcbiAgICBsZXQgZ2VvZmlsdGVyUXVlcnk6IFF1ZXJ5ID0ge1xuICAgICAgbGltaXQ6IDAsXG4gICAgICBmaWVsZHM6IFsndXNlclJlZiddLFxuICAgICAgc3ViUXVlcnk6IDxTdWJRdWVyeT57XG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiAnbG9jYXRpb25zJyxcbiAgICAgICAgZmllbGQ6ICdsb2NhdGlvbnNSZWYnLFxuICAgICAgICB2YWx1ZXM6ICdfaWQnLFxuICAgICAgICB3aGVyZTogd2hlcmVcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGxRdWVyeSgnZ2VvZmlsdGVycycsIGdlb2ZpbHRlclF1ZXJ5KS5waXBlKFxuICAgICAgbWVyZ2VNYXAoZ2VvZmlsdGVycyA9PiB7XG4gICAgICAgIGxldCB1c2VySWRzOiBBcnJheTxzdHJpbmc+ID0gZ2VvZmlsdGVycy5kYXRhLm1hcChnZW9maWx0ZXIgPT4gZ2VvZmlsdGVyLnVzZXJSZWYpO1xuICAgICAgICB1c2VySWRzID0gdW5pcSh1c2VySWRzKTtcbiAgICAgICAgbGV0IHVzZXJGaWx0ZXIgPSBbW3sgZmllbGQ6ICdfaWQnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiB1c2VySWRzIH1dXTtcbiAgICAgICAgaWYgKHVzZXJUYWdzICYmIHVzZXJUYWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB1c2VyRmlsdGVyWzBdLnB1c2goeyBmaWVsZDogJ3RhZ3MnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiB1c2VyVGFncyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QWxsKCd1c2VyJywgVXNlcnMuc2ltcGxpZmllZEZpZWxkcywgbnVsbCwgbnVsbCwgdXNlckZpbHRlcikucGlwZShtYXAocmVzID0+IHJlcy5kYXRhKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==