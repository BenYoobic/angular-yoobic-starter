/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { dateFormat, getUUID, FormFieldType } from '@shared/stencil';
import { Translate } from '@shared/translate';
import { Broker } from '../broker/broker.service';
import { Session } from '../session/session.service';
import { cloneDeep, map } from 'lodash-es';
import { mergeMap } from 'rxjs/operators';
var Dashboard = /** @class */ (function () {
    function Dashboard(broker, translate, session) {
        this.broker = broker;
        this.translate = translate;
        this.session = session;
    }
    /**
     * @param {?} dashboard
     * @param {?} users
     * @return {?}
     */
    Dashboard.prototype.publish = /**
     * @param {?} dashboard
     * @param {?} users
     * @return {?}
     */
    function (dashboard, users) {
        var _this = this;
        /** @type {?} */
        var dashboards = users
            .filter((/**
         * @param {?} u
         * @return {?}
         */
        function (u) { return u._id !== _this.session.user._id; }))
            .map((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            /** @type {?} */
            var dashboardCopy = cloneDeep(dashboard);
            // dashboardCopy.title += ' - ' + moment().format('L');
            dashboardCopy.originalRef = dashboard._id;
            delete dashboardCopy._id;
            dashboardCopy._acl = user._acl;
            _this.broker.setAcl(dashboardCopy, null, null, null, [user._id]);
            //dashboardCopy._acl.users = { r: [user._id], w: [user._id] };
            dashboardCopy.creatorRef = user._id;
            //dashboardCopy._acl.creator = user._id;
            return dashboardCopy;
        }));
        return this.broker
            .deleteAll('dashboards', {
            where: { originalRef: { inq: [dashboard._id] }, creatorRef: { inq: map(users, '_id') } }
        })
            .pipe(mergeMap((/**
         * @return {?}
         */
        function () {
            return _this.broker.upsertAll('dashboards', dashboards);
        })));
    };
    /**
     * @param {?} dashboard
     * @return {?}
     */
    Dashboard.prototype.deletePublished = /**
     * @param {?} dashboard
     * @return {?}
     */
    function (dashboard) {
        return this.broker.deleteAll('dashboards', {
            where: { originalRef: { inq: [dashboard._id] } }
        });
    };
    /**
     * @param {?} dashboard
     * @return {?}
     */
    Dashboard.prototype.updatePublished = /**
     * @param {?} dashboard
     * @return {?}
     */
    function (dashboard) {
        var _this = this;
        return this.broker.getAll('dashboards', ['_id', '_acl', '_ect', '_lmt'], null, null, [[{ field: 'originalRef', operator: { _id: 'inq' }, value: [dashboard._id] }]], null, 0, -1).pipe(mergeMap((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            /** @type {?} */
            var dashboards = response.data;
            dashboards.forEach((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                d.title = dashboard.title + ' - ' + dateFormat(new Date(), 'L');
                d.description = dashboard.description;
                d.tabs = dashboard.tabs;
            }));
            return _this.broker.upsertAll('dashboards', dashboards);
        })));
    };
    /**
     * @param {?} dashboard
     * @param {?} title
     * @return {?}
     */
    Dashboard.prototype.copy = /**
     * @param {?} dashboard
     * @param {?} title
     * @return {?}
     */
    function (dashboard, title) {
        /** @type {?} */
        var newDashboard = cloneDeep(dashboard);
        newDashboard.title = title;
        delete newDashboard._id;
        if (newDashboard.tabs) {
            newDashboard.tabs.forEach((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                if (t.items) {
                    t.items.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) {
                        c.definition._id = getUUID();
                    }));
                }
            }));
        }
        return this.broker.upsert('dashboards', newDashboard);
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} excludedFields
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    Dashboard.prototype.aggregateQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} excludedFields
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    function (collectionName, filters, options, excludedFields, customFilter, subQuery) {
        //, aggregateFormDefinition?: Array<IFormField>, aggregateData?: any) { //where ?: Filters, match?: Object, limit?: Number, lookup?: Object, projectBefore?: Object, group?: Object, projectAfter?: Object) {
        options = options || [];
        return this.broker.aggregateQuery(collectionName, filters, options, null, excludedFields, false, null, customFilter, subQuery);
    };
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    Dashboard.prototype.setTimescale = /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    function (filters, timescale, dateField, endDate, previous) {
        if (dateField === void 0) { dateField = 'finishedDate'; }
        if (previous === void 0) { previous = false; }
        return this.broker.setTimescale(filters, timescale, dateField, endDate, previous);
    };
    /**
     * @param {?} title
     * @param {?=} filters
     * @param {?=} collectionName
     * @param {?=} dateGrouping
     * @param {?=} groupByDate
     * @param {?=} timeScale
     * @return {?}
     */
    Dashboard.prototype.getChartDefinition = /**
     * @param {?} title
     * @param {?=} filters
     * @param {?=} collectionName
     * @param {?=} dateGrouping
     * @param {?=} groupByDate
     * @param {?=} timeScale
     * @return {?}
     */
    function (title, filters, collectionName, dateGrouping, groupByDate, timeScale) {
        if (filters === void 0) { filters = [[]]; }
        if (collectionName === void 0) { collectionName = 'missions'; }
        if (dateGrouping === void 0) { dateGrouping = 'day'; }
        if (groupByDate === void 0) { groupByDate = true; }
        if (timeScale === void 0) { timeScale = 'last7days'; }
        /** @type {?} */
        var definition = (/** @type {?} */ ({
            title: this.translate.get(title),
            aggregateOptions: [],
            timescale: timeScale,
            collectionName: collectionName,
            dateGrouping: dateGrouping,
            filters: filters,
            groupByDate: groupByDate,
            palette: 'palette2',
            showAs: 'chart',
            type: 'areaspline',
            datetimeFormat: 'dd'
        }));
        return definition;
    };
    /**
     * @param {?=} missionDescription
     * @param {?=} fields
     * @param {?=} start
     * @param {?=} locationTags
     * @return {?}
     */
    Dashboard.prototype.getPhotos = /**
     * @param {?=} missionDescription
     * @param {?=} fields
     * @param {?=} start
     * @param {?=} locationTags
     * @return {?}
     */
    function (missionDescription, fields, start, locationTags) {
        if (start === void 0) { start = 0; }
        /** @type {?} */
        var filters = [[]];
        if (missionDescription && missionDescription._id) {
            filters[0].push({
                field: 'missiondescriptionRef',
                operator: { _id: 'inq' },
                value: [missionDescription._id]
            });
        }
        if (fields) {
            fields = [].concat(fields);
            filters[0].push({
                field: 'name',
                operator: { _id: 'inq' },
                value: fields.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name.replace('.value', ''); }))
            });
        }
        if (locationTags && locationTags.length) {
            filters[0].push({
                field: 'tags',
                collectionName: 'locations',
                operator: { _id: 'inq' },
                value: locationTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'locationRef', values: '_id' }
            });
        }
        return this.broker.getAll('photos', null, null, null, filters, null, start, 10);
    };
    /**
     * @param {?} folderIds
     * @return {?}
     */
    Dashboard.prototype.getFolderFolderStat = /**
     * @param {?} folderIds
     * @return {?}
     */
    function (folderIds) {
        /** @type {?} */
        var filters = [[{ field: 'parent', operator: { _id: 'inq' }, value: folderIds }]];
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$parent'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    folders: { $sum: 1 }
                }
            }
        ];
        return this.aggregateQuery('folders', filters, options);
    };
    /**
     * @param {?} folderIds
     * @param {?=} keepHideMobile
     * @return {?}
     */
    Dashboard.prototype.getFolderFileStat = /**
     * @param {?} folderIds
     * @param {?=} keepHideMobile
     * @return {?}
     */
    function (folderIds, keepHideMobile) {
        if (keepHideMobile === void 0) { keepHideMobile = true; }
        /** @type {?} */
        var filters = [[{ field: 'folder', operator: { _id: 'inq' }, value: folderIds }]];
        if (keepHideMobile === false) {
            filters[0].push({ field: 'hideMobile', operator: { _id: 'neq' }, value: true });
        }
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$folder'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    files: { $sum: 1 }
                }
            }
        ];
        return this.aggregateQuery('files', filters, options);
    };
    Dashboard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Dashboard.ctorParameters = function () { return [
        { type: Broker },
        { type: Translate },
        { type: Session }
    ]; };
    return Dashboard;
}());
export { Dashboard };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Dashboard.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Dashboard.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    Dashboard.prototype.session;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBaUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFROUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUM7SUFFRSxtQkFBc0IsTUFBYyxFQUFZLFNBQW9CLEVBQVksT0FBZ0I7UUFBMUUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQzs7Ozs7O0lBRXBHLDJCQUFPOzs7OztJQUFQLFVBQVEsU0FBcUIsRUFBRSxLQUFrQjtRQUFqRCxpQkEwQkM7O1lBekJLLFVBQVUsR0FBRyxLQUFLO2FBQ25CLE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUEvQixDQUErQixFQUFDO2FBQzVDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUk7O2dCQUNILGFBQWEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1lBQ3hDLHVEQUF1RDtZQUN2RCxhQUFh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QW5LRCxJQW1LQztTQWxLWSxTQUFTOzs7Ozs7SUFDUiwyQkFBd0I7Ozs7O0lBQUUsOEJBQThCOzs7OztJQUFFLDRCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmlsdGVycywgU3ViUXVlcnksIElGb3JtRmllbGQsIGRhdGVGb3JtYXQsIGdldFVVSUQsIEZvcm1GaWVsZFR5cGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBDaGFydERlZmluaXRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NoYXJ0LWRlZmluaXRpb24vY2hhcnQtZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkIGFzIElEYXNoYm9hcmQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTWlzc2lvbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9taXNzaW9uLWRlc2NyaXB0aW9uL21pc3Npb24tZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqZWN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5cbmltcG9ydCB7IEJyb2tlciB9IGZyb20gJy4uL2Jyb2tlci9icm9rZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBjbG9uZURlZXAsIG1hcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlLCBwcm90ZWN0ZWQgc2Vzc2lvbjogU2Vzc2lvbikge31cblxuICBwdWJsaXNoKGRhc2hib2FyZDogSURhc2hib2FyZCwgdXNlcnM6IEFycmF5PFVzZXI+KSB7XG4gICAgbGV0IGRhc2hib2FyZHMgPSB1c2Vyc1xuICAgICAgLmZpbHRlcih1ID0+IHUuX2lkICE9PSB0aGlzLnNlc3Npb24udXNlci5faWQpXG4gICAgICAubWFwKHVzZXIgPT4ge1xuICAgICAgICBsZXQgZGFzaGJvYXJkQ29weSA9IGNsb25lRGVlcChkYXNoYm9hcmQpO1xuICAgICAgICAvLyBkYXNoYm9hcmRDb3B5LnRpdGxlICs9ICcgLSAnICsgbW9tZW50KCkuZm9ybWF0KCdMJyk7XG4gICAgICAgIGRhc2hib2FyZENvcHkub3JpZ2luYWxSZWYgPSBkYXNoYm9hcmQuX2lkO1xuICAgICAgICBkZWxldGUgZGFzaGJvYXJkQ29weS5faWQ7XG5cbiAgICAgICAgZGFzaGJvYXJkQ29weS5fYWNsID0gdXNlci5fYWNsO1xuICAgICAgICB0aGlzLmJyb2tlci5zZXRBY2woZGFzaGJvYXJkQ29weSwgbnVsbCwgbnVsbCwgbnVsbCwgW3VzZXIuX2lkXSk7XG4gICAgICAgIC8vZGFzaGJvYXJkQ29weS5fYWNsLnVzZXJzID0geyByOiBbdXNlci5faWRdLCB3OiBbdXNlci5faWRdIH07XG4gICAgICAgIGRhc2hib2FyZENvcHkuY3JlYXRvclJlZiA9IHVzZXIuX2lkO1xuICAgICAgICAvL2Rhc2hib2FyZENvcHkuX2FjbC5jcmVhdG9yID0gdXNlci5faWQ7XG4gICAgICAgIHJldHVybiBkYXNoYm9hcmRDb3B5O1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5icm9rZXJcbiAgICAgIC5kZWxldGVBbGwoJ2Rhc2hib2FyZHMnLCB7XG4gICAgICAgIHdoZXJlOiB7IG9yaWdpbmFsUmVmOiB7IGlucTogW2Rhc2hib2FyZC5faWRdIH0sIGNyZWF0b3JSZWY6IHsgaW5xOiBtYXAodXNlcnMsICdfaWQnKSB9IH1cbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJyb2tlci51cHNlcnRBbGwoJ2Rhc2hib2FyZHMnLCBkYXNoYm9hcmRzKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBkZWxldGVQdWJsaXNoZWQoZGFzaGJvYXJkOiBJRGFzaGJvYXJkKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmRlbGV0ZUFsbCgnZGFzaGJvYXJkcycsIHtcbiAgICAgIHdoZXJlOiB7IG9yaWdpbmFsUmVmOiB7IGlucTogW2Rhc2hib2FyZC5faWRdIH0gfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlUHVibGlzaGVkKGRhc2hib2FyZDogSURhc2hib2FyZCkge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5nZXRBbGwoJ2Rhc2hib2FyZHMnLCBbJ19pZCcsICdfYWNsJywgJ19lY3QnLCAnX2xtdCddLCBudWxsLCBudWxsLCBbW3sgZmllbGQ6ICdvcmlnaW5hbFJlZicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IFtkYXNoYm9hcmQuX2lkXSB9XV0sIG51bGwsIDAsIC0xKS5waXBlKFxuICAgICAgbWVyZ2VNYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQgZGFzaGJvYXJkczogQXJyYXk8SURhc2hib2FyZD4gPSByZXNwb25zZS5kYXRhO1xuICAgICAgICBkYXNoYm9hcmRzLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgZC50aXRsZSA9IGRhc2hib2FyZC50aXRsZSArICcgLSAnICsgZGF0ZUZvcm1hdChuZXcgRGF0ZSgpLCAnTCcpO1xuICAgICAgICAgIGQuZGVzY3JpcHRpb24gPSBkYXNoYm9hcmQuZGVzY3JpcHRpb247XG4gICAgICAgICAgZC50YWJzID0gZGFzaGJvYXJkLnRhYnM7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5icm9rZXIudXBzZXJ0QWxsKCdkYXNoYm9hcmRzJywgZGFzaGJvYXJkcyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjb3B5KGRhc2hib2FyZDogSURhc2hib2FyZCwgdGl0bGU6IHN0cmluZykge1xuICAgIGxldCBuZXdEYXNoYm9hcmQgPSBjbG9uZURlZXAoZGFzaGJvYXJkKTtcbiAgICBuZXdEYXNoYm9hcmQudGl0bGUgPSB0aXRsZTtcbiAgICBkZWxldGUgbmV3RGFzaGJvYXJkLl9pZDtcbiAgICBpZiAobmV3RGFzaGJvYXJkLnRhYnMpIHtcbiAgICAgIG5ld0Rhc2hib2FyZC50YWJzLmZvckVhY2godCA9PiB7XG4gICAgICAgIGlmICh0Lml0ZW1zKSB7XG4gICAgICAgICAgdC5pdGVtcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgYy5kZWZpbml0aW9uLl9pZCA9IGdldFVVSUQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmJyb2tlci51cHNlcnQoJ2Rhc2hib2FyZHMnLCBuZXdEYXNoYm9hcmQpO1xuICB9XG5cbiAgYWdncmVnYXRlUXVlcnkoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIG9wdGlvbnM/OiBBcnJheTxhbnk+LCBleGNsdWRlZEZpZWxkcz86IEFycmF5PGFueT4sIGN1c3RvbUZpbHRlcj86IGFueSwgc3ViUXVlcnk/OiBTdWJRdWVyeSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgLy8sIGFnZ3JlZ2F0ZUZvcm1EZWZpbml0aW9uPzogQXJyYXk8SUZvcm1GaWVsZD4sIGFnZ3JlZ2F0ZURhdGE/OiBhbnkpIHsgLy93aGVyZSA/OiBGaWx0ZXJzLCBtYXRjaD86IE9iamVjdCwgbGltaXQ/OiBOdW1iZXIsIGxvb2t1cD86IE9iamVjdCwgcHJvamVjdEJlZm9yZT86IE9iamVjdCwgZ3JvdXA/OiBPYmplY3QsIHByb2plY3RBZnRlcj86IE9iamVjdCkge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IFtdO1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5hZ2dyZWdhdGVRdWVyeShjb2xsZWN0aW9uTmFtZSwgZmlsdGVycywgb3B0aW9ucywgbnVsbCwgZXhjbHVkZWRGaWVsZHMsIGZhbHNlLCBudWxsLCBjdXN0b21GaWx0ZXIsIHN1YlF1ZXJ5KTtcbiAgfVxuXG4gIHNldFRpbWVzY2FsZShmaWx0ZXJzOiBGaWx0ZXJzLCB0aW1lc2NhbGU6IHN0cmluZywgZGF0ZUZpZWxkID0gJ2ZpbmlzaGVkRGF0ZScsIGVuZERhdGU/OiBEYXRlIHwgc3RyaW5nLCBwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnNldFRpbWVzY2FsZShmaWx0ZXJzLCB0aW1lc2NhbGUsIGRhdGVGaWVsZCwgZW5kRGF0ZSwgcHJldmlvdXMpO1xuICB9XG5cbiAgZ2V0Q2hhcnREZWZpbml0aW9uKHRpdGxlOiBzdHJpbmcsIGZpbHRlcnM6IEFycmF5PGFueT4gPSBbW11dLCBjb2xsZWN0aW9uTmFtZSA9ICdtaXNzaW9ucycsIGRhdGVHcm91cGluZyA9ICdkYXknLCBncm91cEJ5RGF0ZSA9IHRydWUsIHRpbWVTY2FsZSA9ICdsYXN0N2RheXMnKSB7XG4gICAgbGV0IGRlZmluaXRpb246IENoYXJ0RGVmaW5pdGlvbiA9IDxhbnk+e1xuICAgICAgdGl0bGU6IHRoaXMudHJhbnNsYXRlLmdldCh0aXRsZSksXG4gICAgICBhZ2dyZWdhdGVPcHRpb25zOiBbXSxcbiAgICAgIHRpbWVzY2FsZTogdGltZVNjYWxlLFxuICAgICAgY29sbGVjdGlvbk5hbWU6IGNvbGxlY3Rpb25OYW1lLFxuICAgICAgZGF0ZUdyb3VwaW5nOiBkYXRlR3JvdXBpbmcsXG4gICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxuICAgICAgZ3JvdXBCeURhdGU6IGdyb3VwQnlEYXRlLFxuICAgICAgcGFsZXR0ZTogJ3BhbGV0dGUyJyxcbiAgICAgIHNob3dBczogJ2NoYXJ0JyxcbiAgICAgIHR5cGU6ICdhcmVhc3BsaW5lJyxcbiAgICAgIGRhdGV0aW1lRm9ybWF0OiAnZGQnXG4gICAgfTtcbiAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgfVxuXG4gIGdldFBob3RvcyhtaXNzaW9uRGVzY3JpcHRpb24/OiBNaXNzaW9uRGVzY3JpcHRpb24sIGZpZWxkcz86IEFycmF5PElGb3JtRmllbGQ+LCBzdGFydCA9IDAsIGxvY2F0aW9uVGFncz86IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgbGV0IGZpbHRlcnM6IEZpbHRlcnMgPSBbW11dO1xuICAgIGlmIChtaXNzaW9uRGVzY3JpcHRpb24gJiYgbWlzc2lvbkRlc2NyaXB0aW9uLl9pZCkge1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHtcbiAgICAgICAgZmllbGQ6ICdtaXNzaW9uZGVzY3JpcHRpb25SZWYnLFxuICAgICAgICBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sXG4gICAgICAgIHZhbHVlOiBbbWlzc2lvbkRlc2NyaXB0aW9uLl9pZF1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZmllbGRzKSB7XG4gICAgICBmaWVsZHMgPSBbXS5jb25jYXQoZmllbGRzKTtcbiAgICAgIGZpbHRlcnNbMF0ucHVzaCh7XG4gICAgICAgIGZpZWxkOiAnbmFtZScsXG4gICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSxcbiAgICAgICAgdmFsdWU6IGZpZWxkcy5tYXAoZiA9PiBmLm5hbWUucmVwbGFjZSgnLnZhbHVlJywgJycpKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChsb2NhdGlvblRhZ3MgJiYgbG9jYXRpb25UYWdzLmxlbmd0aCkge1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHtcbiAgICAgICAgZmllbGQ6ICd0YWdzJyxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgICAgICBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sXG4gICAgICAgIHZhbHVlOiBsb2NhdGlvblRhZ3MsXG4gICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgICAgICBzdWJRdWVyeTogeyBmaWVsZDogJ2xvY2F0aW9uUmVmJywgdmFsdWVzOiAnX2lkJyB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldEFsbCgncGhvdG9zJywgbnVsbCwgbnVsbCwgbnVsbCwgZmlsdGVycywgbnVsbCwgc3RhcnQsIDEwKTtcbiAgfVxuXG4gIGdldEZvbGRlckZvbGRlclN0YXQoZm9sZGVySWRzOiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxBcnJheTx7IF9pZDogc3RyaW5nOyBmb2xkZXJzOiBudW1iZXIgfT4+IHtcbiAgICBsZXQgZmlsdGVycyA9IFtbeyBmaWVsZDogJ3BhcmVudCcsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IGZvbGRlcklkcyB9XV07XG4gICAgbGV0IG9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgICRwcm9qZWN0OiB7XG4gICAgICAgICAgX2lkOiAnJHBhcmVudCdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgX2lkOiAnJF9pZCcsXG4gICAgICAgICAgZm9sZGVyczogeyAkc3VtOiAxIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF07XG4gICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlUXVlcnkoJ2ZvbGRlcnMnLCBmaWx0ZXJzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldEZvbGRlckZpbGVTdGF0KGZvbGRlcklkczogQXJyYXk8c3RyaW5nPiwga2VlcEhpZGVNb2JpbGUgPSB0cnVlKTogT2JzZXJ2YWJsZTxBcnJheTx7IF9pZDogc3RyaW5nOyBmaWxlczogbnVtYmVyIH0+PiB7XG4gICAgbGV0IGZpbHRlcnM6IEZpbHRlcnMgPSBbW3sgZmllbGQ6ICdmb2xkZXInLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiBmb2xkZXJJZHMgfV1dO1xuICAgIGlmIChrZWVwSGlkZU1vYmlsZSA9PT0gZmFsc2UpIHtcbiAgICAgIGZpbHRlcnNbMF0ucHVzaCh7IGZpZWxkOiAnaGlkZU1vYmlsZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSk7XG4gICAgfVxuICAgIGxldCBvcHRpb25zID0gW1xuICAgICAge1xuICAgICAgICAkcHJvamVjdDoge1xuICAgICAgICAgIF9pZDogJyRmb2xkZXInXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgIF9pZDogJyRfaWQnLFxuICAgICAgICAgIGZpbGVzOiB7ICRzdW06IDEgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGVRdWVyeSgnZmlsZXMnLCBmaWx0ZXJzLCBvcHRpb25zKTtcbiAgfVxufVxuIl19