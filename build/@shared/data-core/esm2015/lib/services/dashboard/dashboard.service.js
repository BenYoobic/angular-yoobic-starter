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
export class Dashboard {
    /**
     * @param {?} broker
     * @param {?} translate
     * @param {?} session
     */
    constructor(broker, translate, session) {
        this.broker = broker;
        this.translate = translate;
        this.session = session;
    }
    /**
     * @param {?} dashboard
     * @param {?} users
     * @return {?}
     */
    publish(dashboard, users) {
        /** @type {?} */
        let dashboards = users
            .filter((/**
         * @param {?} u
         * @return {?}
         */
        u => u._id !== this.session.user._id))
            .map((/**
         * @param {?} user
         * @return {?}
         */
        user => {
            /** @type {?} */
            let dashboardCopy = cloneDeep(dashboard);
            // dashboardCopy.title += ' - ' + moment().format('L');
            dashboardCopy.originalRef = dashboard._id;
            delete dashboardCopy._id;
            dashboardCopy._acl = user._acl;
            this.broker.setAcl(dashboardCopy, null, null, null, [user._id]);
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
        () => {
            return this.broker.upsertAll('dashboards', dashboards);
        })));
    }
    /**
     * @param {?} dashboard
     * @return {?}
     */
    deletePublished(dashboard) {
        return this.broker.deleteAll('dashboards', {
            where: { originalRef: { inq: [dashboard._id] } }
        });
    }
    /**
     * @param {?} dashboard
     * @return {?}
     */
    updatePublished(dashboard) {
        return this.broker.getAll('dashboards', ['_id', '_acl', '_ect', '_lmt'], null, null, [[{ field: 'originalRef', operator: { _id: 'inq' }, value: [dashboard._id] }]], null, 0, -1).pipe(mergeMap((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            /** @type {?} */
            let dashboards = response.data;
            dashboards.forEach((/**
             * @param {?} d
             * @return {?}
             */
            d => {
                d.title = dashboard.title + ' - ' + dateFormat(new Date(), 'L');
                d.description = dashboard.description;
                d.tabs = dashboard.tabs;
            }));
            return this.broker.upsertAll('dashboards', dashboards);
        })));
    }
    /**
     * @param {?} dashboard
     * @param {?} title
     * @return {?}
     */
    copy(dashboard, title) {
        /** @type {?} */
        let newDashboard = cloneDeep(dashboard);
        newDashboard.title = title;
        delete newDashboard._id;
        if (newDashboard.tabs) {
            newDashboard.tabs.forEach((/**
             * @param {?} t
             * @return {?}
             */
            t => {
                if (t.items) {
                    t.items.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        c.definition._id = getUUID();
                    }));
                }
            }));
        }
        return this.broker.upsert('dashboards', newDashboard);
    }
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} options
     * @param {?=} excludedFields
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    aggregateQuery(collectionName, filters, options, excludedFields, customFilter, subQuery) {
        //, aggregateFormDefinition?: Array<IFormField>, aggregateData?: any) { //where ?: Filters, match?: Object, limit?: Number, lookup?: Object, projectBefore?: Object, group?: Object, projectAfter?: Object) {
        options = options || [];
        return this.broker.aggregateQuery(collectionName, filters, options, null, excludedFields, false, null, customFilter, subQuery);
    }
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    setTimescale(filters, timescale, dateField = 'finishedDate', endDate, previous = false) {
        return this.broker.setTimescale(filters, timescale, dateField, endDate, previous);
    }
    /**
     * @param {?} title
     * @param {?=} filters
     * @param {?=} collectionName
     * @param {?=} dateGrouping
     * @param {?=} groupByDate
     * @param {?=} timeScale
     * @return {?}
     */
    getChartDefinition(title, filters = [[]], collectionName = 'missions', dateGrouping = 'day', groupByDate = true, timeScale = 'last7days') {
        /** @type {?} */
        let definition = (/** @type {?} */ ({
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
    }
    /**
     * @param {?=} missionDescription
     * @param {?=} fields
     * @param {?=} start
     * @param {?=} locationTags
     * @return {?}
     */
    getPhotos(missionDescription, fields, start = 0, locationTags) {
        /** @type {?} */
        let filters = [[]];
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
                f => f.name.replace('.value', '')))
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
    }
    /**
     * @param {?} folderIds
     * @return {?}
     */
    getFolderFolderStat(folderIds) {
        /** @type {?} */
        let filters = [[{ field: 'parent', operator: { _id: 'inq' }, value: folderIds }]];
        /** @type {?} */
        let options = [
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
    }
    /**
     * @param {?} folderIds
     * @param {?=} keepHideMobile
     * @return {?}
     */
    getFolderFileStat(folderIds, keepHideMobile = true) {
        /** @type {?} */
        let filters = [[{ field: 'folder', operator: { _id: 'inq' }, value: folderIds }]];
        if (keepHideMobile === false) {
            filters[0].push({ field: 'hideMobile', operator: { _id: 'neq' }, value: true });
        }
        /** @type {?} */
        let options = [
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
    }
}
Dashboard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Dashboard.ctorParameters = () => [
    { type: Broker },
    { type: Translate },
    { type: Session }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBaUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFROUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHMUMsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQUNwQixZQUFzQixNQUFjLEVBQVksU0FBb0IsRUFBWSxPQUFnQjtRQUExRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFBRyxDQUFDOzs7Ozs7SUFFcEcsT0FBTyxDQUFDLFNBQXFCLEVBQUUsS0FBa0I7O1lBQzNDLFVBQVUsR0FBRyxLQUFLO2FBQ25CLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDO2FBQzVDLEdBQUc7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRTs7Z0JBQ04sYUFBYSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDeEMsdURBQXVEO1lBQ3ZELGFBQWEsQ0FBQyxXQUFX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Ozs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxTQUF3QixFQUFFLGNBQWMsR0FBRyxJQUFJOztZQUMzRCxPQUFPLEdBQVksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDMUYsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNqRjs7WUFDRyxPQUFPLEdBQUc7WUFDWjtnQkFDRSxRQUFRLEVBQUU7b0JBQ1IsR0FBRyxFQUFFLFNBQVM7aUJBQ2Y7YUFDRjtZQUNEO2dCQUNFLE1BQU0sRUFBRTtvQkFDTixHQUFHLEVBQUUsTUFBTTtvQkFDWCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO2lCQUNuQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7WUFsS0YsVUFBVTs7OztZQVBGLE1BQU07WUFSTixTQUFTO1lBU1QsT0FBTzs7Ozs7OztJQVFGLDJCQUF3Qjs7Ozs7SUFBRSw4QkFBOEI7Ozs7O0lBQUUsNEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWx0ZXJzLCBTdWJRdWVyeSwgSUZvcm1GaWVsZCwgZGF0ZUZvcm1hdCwgZ2V0VVVJRCwgRm9ybUZpZWxkVHlwZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IENoYXJ0RGVmaW5pdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY2hhcnQtZGVmaW5pdGlvbi9jaGFydC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmQgYXMgSURhc2hib2FyZCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdXNlci91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNaXNzaW9uRGVzY3JpcHRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL21pc3Npb24tZGVzY3JpcHRpb24vbWlzc2lvbi1kZXNjcmlwdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmplY3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLW9iamVjdC9yZXNwb25zZS1vYmplY3QuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQnJva2VyIH0gZnJvbSAnLi4vYnJva2VyL2Jyb2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5cbmltcG9ydCB7IGNsb25lRGVlcCwgbWFwIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGJyb2tlcjogQnJva2VyLCBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGUsIHByb3RlY3RlZCBzZXNzaW9uOiBTZXNzaW9uKSB7fVxuXG4gIHB1Ymxpc2goZGFzaGJvYXJkOiBJRGFzaGJvYXJkLCB1c2VyczogQXJyYXk8VXNlcj4pIHtcbiAgICBsZXQgZGFzaGJvYXJkcyA9IHVzZXJzXG4gICAgICAuZmlsdGVyKHUgPT4gdS5faWQgIT09IHRoaXMuc2Vzc2lvbi51c2VyLl9pZClcbiAgICAgIC5tYXAodXNlciA9PiB7XG4gICAgICAgIGxldCBkYXNoYm9hcmRDb3B5ID0gY2xvbmVEZWVwKGRhc2hib2FyZCk7XG4gICAgICAgIC8vIGRhc2hib2FyZENvcHkudGl0bGUgKz0gJyAtICcgKyBtb21lbnQoKS5mb3JtYXQoJ0wnKTtcbiAgICAgICAgZGFzaGJvYXJkQ29weS5vcmlnaW5hbFJlZiA9IGRhc2hib2FyZC5faWQ7XG4gICAgICAgIGRlbGV0ZSBkYXNoYm9hcmRDb3B5Ll9pZDtcblxuICAgICAgICBkYXNoYm9hcmRDb3B5Ll9hY2wgPSB1c2VyLl9hY2w7XG4gICAgICAgIHRoaXMuYnJva2VyLnNldEFjbChkYXNoYm9hcmRDb3B5LCBudWxsLCBudWxsLCBudWxsLCBbdXNlci5faWRdKTtcbiAgICAgICAgLy9kYXNoYm9hcmRDb3B5Ll9hY2wudXNlcnMgPSB7IHI6IFt1c2VyLl9pZF0sIHc6IFt1c2VyLl9pZF0gfTtcbiAgICAgICAgZGFzaGJvYXJkQ29weS5jcmVhdG9yUmVmID0gdXNlci5faWQ7XG4gICAgICAgIC8vZGFzaGJvYXJkQ29weS5fYWNsLmNyZWF0b3IgPSB1c2VyLl9pZDtcbiAgICAgICAgcmV0dXJuIGRhc2hib2FyZENvcHk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmJyb2tlclxuICAgICAgLmRlbGV0ZUFsbCgnZGFzaGJvYXJkcycsIHtcbiAgICAgICAgd2hlcmU6IHsgb3JpZ2luYWxSZWY6IHsgaW5xOiBbZGFzaGJvYXJkLl9pZF0gfSwgY3JlYXRvclJlZjogeyBpbnE6IG1hcCh1c2VycywgJ19pZCcpIH0gfVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYnJva2VyLnVwc2VydEFsbCgnZGFzaGJvYXJkcycsIGRhc2hib2FyZHMpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGRlbGV0ZVB1Ymxpc2hlZChkYXNoYm9hcmQ6IElEYXNoYm9hcmQpIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZGVsZXRlQWxsKCdkYXNoYm9hcmRzJywge1xuICAgICAgd2hlcmU6IHsgb3JpZ2luYWxSZWY6IHsgaW5xOiBbZGFzaGJvYXJkLl9pZF0gfSB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVQdWJsaXNoZWQoZGFzaGJvYXJkOiBJRGFzaGJvYXJkKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldEFsbCgnZGFzaGJvYXJkcycsIFsnX2lkJywgJ19hY2wnLCAnX2VjdCcsICdfbG10J10sIG51bGwsIG51bGwsIFtbeyBmaWVsZDogJ29yaWdpbmFsUmVmJywgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LCB2YWx1ZTogW2Rhc2hib2FyZC5faWRdIH1dXSwgbnVsbCwgMCwgLTEpLnBpcGUoXG4gICAgICBtZXJnZU1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCBkYXNoYm9hcmRzOiBBcnJheTxJRGFzaGJvYXJkPiA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIGRhc2hib2FyZHMuZm9yRWFjaChkID0+IHtcbiAgICAgICAgICBkLnRpdGxlID0gZGFzaGJvYXJkLnRpdGxlICsgJyAtICcgKyBkYXRlRm9ybWF0KG5ldyBEYXRlKCksICdMJyk7XG4gICAgICAgICAgZC5kZXNjcmlwdGlvbiA9IGRhc2hib2FyZC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICBkLnRhYnMgPSBkYXNoYm9hcmQudGFicztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmJyb2tlci51cHNlcnRBbGwoJ2Rhc2hib2FyZHMnLCBkYXNoYm9hcmRzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNvcHkoZGFzaGJvYXJkOiBJRGFzaGJvYXJkLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgbGV0IG5ld0Rhc2hib2FyZCA9IGNsb25lRGVlcChkYXNoYm9hcmQpO1xuICAgIG5ld0Rhc2hib2FyZC50aXRsZSA9IHRpdGxlO1xuICAgIGRlbGV0ZSBuZXdEYXNoYm9hcmQuX2lkO1xuICAgIGlmIChuZXdEYXNoYm9hcmQudGFicykge1xuICAgICAgbmV3RGFzaGJvYXJkLnRhYnMuZm9yRWFjaCh0ID0+IHtcbiAgICAgICAgaWYgKHQuaXRlbXMpIHtcbiAgICAgICAgICB0Lml0ZW1zLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBjLmRlZmluaXRpb24uX2lkID0gZ2V0VVVJRCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLnVwc2VydCgnZGFzaGJvYXJkcycsIG5ld0Rhc2hib2FyZCk7XG4gIH1cblxuICBhZ2dyZWdhdGVRdWVyeShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgb3B0aW9ucz86IEFycmF5PGFueT4sIGV4Y2x1ZGVkRmllbGRzPzogQXJyYXk8YW55PiwgY3VzdG9tRmlsdGVyPzogYW55LCBzdWJRdWVyeT86IFN1YlF1ZXJ5KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLywgYWdncmVnYXRlRm9ybURlZmluaXRpb24/OiBBcnJheTxJRm9ybUZpZWxkPiwgYWdncmVnYXRlRGF0YT86IGFueSkgeyAvL3doZXJlID86IEZpbHRlcnMsIG1hdGNoPzogT2JqZWN0LCBsaW1pdD86IE51bWJlciwgbG9va3VwPzogT2JqZWN0LCBwcm9qZWN0QmVmb3JlPzogT2JqZWN0LCBncm91cD86IE9iamVjdCwgcHJvamVjdEFmdGVyPzogT2JqZWN0KSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgW107XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmFnZ3JlZ2F0ZVF1ZXJ5KGNvbGxlY3Rpb25OYW1lLCBmaWx0ZXJzLCBvcHRpb25zLCBudWxsLCBleGNsdWRlZEZpZWxkcywgZmFsc2UsIG51bGwsIGN1c3RvbUZpbHRlciwgc3ViUXVlcnkpO1xuICB9XG5cbiAgc2V0VGltZXNjYWxlKGZpbHRlcnM6IEZpbHRlcnMsIHRpbWVzY2FsZTogc3RyaW5nLCBkYXRlRmllbGQgPSAnZmluaXNoZWREYXRlJywgZW5kRGF0ZT86IERhdGUgfCBzdHJpbmcsIHByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuc2V0VGltZXNjYWxlKGZpbHRlcnMsIHRpbWVzY2FsZSwgZGF0ZUZpZWxkLCBlbmREYXRlLCBwcmV2aW91cyk7XG4gIH1cblxuICBnZXRDaGFydERlZmluaXRpb24odGl0bGU6IHN0cmluZywgZmlsdGVyczogQXJyYXk8YW55PiA9IFtbXV0sIGNvbGxlY3Rpb25OYW1lID0gJ21pc3Npb25zJywgZGF0ZUdyb3VwaW5nID0gJ2RheScsIGdyb3VwQnlEYXRlID0gdHJ1ZSwgdGltZVNjYWxlID0gJ2xhc3Q3ZGF5cycpIHtcbiAgICBsZXQgZGVmaW5pdGlvbjogQ2hhcnREZWZpbml0aW9uID0gPGFueT57XG4gICAgICB0aXRsZTogdGhpcy50cmFuc2xhdGUuZ2V0KHRpdGxlKSxcbiAgICAgIGFnZ3JlZ2F0ZU9wdGlvbnM6IFtdLFxuICAgICAgdGltZXNjYWxlOiB0aW1lU2NhbGUsXG4gICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWUsXG4gICAgICBkYXRlR3JvdXBpbmc6IGRhdGVHcm91cGluZyxcbiAgICAgIGZpbHRlcnM6IGZpbHRlcnMsXG4gICAgICBncm91cEJ5RGF0ZTogZ3JvdXBCeURhdGUsXG4gICAgICBwYWxldHRlOiAncGFsZXR0ZTInLFxuICAgICAgc2hvd0FzOiAnY2hhcnQnLFxuICAgICAgdHlwZTogJ2FyZWFzcGxpbmUnLFxuICAgICAgZGF0ZXRpbWVGb3JtYXQ6ICdkZCdcbiAgICB9O1xuICAgIHJldHVybiBkZWZpbml0aW9uO1xuICB9XG5cbiAgZ2V0UGhvdG9zKG1pc3Npb25EZXNjcmlwdGlvbj86IE1pc3Npb25EZXNjcmlwdGlvbiwgZmllbGRzPzogQXJyYXk8SUZvcm1GaWVsZD4sIHN0YXJ0ID0gMCwgbG9jYXRpb25UYWdzPzogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBsZXQgZmlsdGVyczogRmlsdGVycyA9IFtbXV07XG4gICAgaWYgKG1pc3Npb25EZXNjcmlwdGlvbiAmJiBtaXNzaW9uRGVzY3JpcHRpb24uX2lkKSB7XG4gICAgICBmaWx0ZXJzWzBdLnB1c2goe1xuICAgICAgICBmaWVsZDogJ21pc3Npb25kZXNjcmlwdGlvblJlZicsXG4gICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSxcbiAgICAgICAgdmFsdWU6IFttaXNzaW9uRGVzY3JpcHRpb24uX2lkXVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIGZpZWxkcyA9IFtdLmNvbmNhdChmaWVsZHMpO1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHtcbiAgICAgICAgZmllbGQ6ICduYW1lJyxcbiAgICAgICAgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LFxuICAgICAgICB2YWx1ZTogZmllbGRzLm1hcChmID0+IGYubmFtZS5yZXBsYWNlKCcudmFsdWUnLCAnJykpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGxvY2F0aW9uVGFncyAmJiBsb2NhdGlvblRhZ3MubGVuZ3RoKSB7XG4gICAgICBmaWx0ZXJzWzBdLnB1c2goe1xuICAgICAgICBmaWVsZDogJ3RhZ3MnLFxuICAgICAgICBjb2xsZWN0aW9uTmFtZTogJ2xvY2F0aW9ucycsXG4gICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSxcbiAgICAgICAgdmFsdWU6IGxvY2F0aW9uVGFncyxcbiAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnbG9jYXRpb25SZWYnLCB2YWx1ZXM6ICdfaWQnIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QWxsKCdwaG90b3MnLCBudWxsLCBudWxsLCBudWxsLCBmaWx0ZXJzLCBudWxsLCBzdGFydCwgMTApO1xuICB9XG5cbiAgZ2V0Rm9sZGVyRm9sZGVyU3RhdChmb2xkZXJJZHM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFycmF5PHsgX2lkOiBzdHJpbmc7IGZvbGRlcnM6IG51bWJlciB9Pj4ge1xuICAgIGxldCBmaWx0ZXJzID0gW1t7IGZpZWxkOiAncGFyZW50Jywgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LCB2YWx1ZTogZm9sZGVySWRzIH1dXTtcbiAgICBsZXQgb3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJHByb2plY3Q6IHtcbiAgICAgICAgICBfaWQ6ICckcGFyZW50J1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAkZ3JvdXA6IHtcbiAgICAgICAgICBfaWQ6ICckX2lkJyxcbiAgICAgICAgICBmb2xkZXJzOiB7ICRzdW06IDEgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGVRdWVyeSgnZm9sZGVycycsIGZpbHRlcnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0Rm9sZGVyRmlsZVN0YXQoZm9sZGVySWRzOiBBcnJheTxzdHJpbmc+LCBrZWVwSGlkZU1vYmlsZSA9IHRydWUpOiBPYnNlcnZhYmxlPEFycmF5PHsgX2lkOiBzdHJpbmc7IGZpbGVzOiBudW1iZXIgfT4+IHtcbiAgICBsZXQgZmlsdGVyczogRmlsdGVycyA9IFtbeyBmaWVsZDogJ2ZvbGRlcicsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IGZvbGRlcklkcyB9XV07XG4gICAgaWYgKGtlZXBIaWRlTW9iaWxlID09PSBmYWxzZSkge1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHsgZmllbGQ6ICdoaWRlTW9iaWxlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgbGV0IG9wdGlvbnMgPSBbXG4gICAgICB7XG4gICAgICAgICRwcm9qZWN0OiB7XG4gICAgICAgICAgX2lkOiAnJGZvbGRlcidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgX2lkOiAnJF9pZCcsXG4gICAgICAgICAgZmlsZXM6IHsgJHN1bTogMSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZVF1ZXJ5KCdmaWxlcycsIGZpbHRlcnMsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=