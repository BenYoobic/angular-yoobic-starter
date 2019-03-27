/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Editable } from '../../decorators/editable/editable.decorator';
import { dateAdd, FormFieldType, IKpi } from '@shared/stencil';
import { getStartAndEndDates as getStartAndEndDatesCore } from '../dates/dates.interface';
import { Model } from '../../decorators/model/model.decorator';
import { Colors } from '@shared/common';
import { merge, isNaN, cloneDeep } from 'lodash-es';
let BaseKpi = class BaseKpi extends IKpi {
    /**
     * @param {?} kpi
     * @param {?} cd
     * @param {?} translate
     * @return {?}
     */
    static getChartDefinition(kpi, cd, translate) {
        merge(cd, {
            description: kpi.description,
            title: kpi.title,
            showAs: kpi.showAs || cd.showAs || 'chart',
            showValues: kpi.showValues,
            showLegend: kpi.showLegend === false ? false : true,
            legendValue: kpi.accumulator
        });
        if (kpi && kpi.groupBySlider) {
            switch (kpi.groupBySlider.toString()) {
                case 'day':
                    cd.dateGrouping = 'hour';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 1,
                        timescale: 'day'
                    };
                    break;
                case 'week':
                    cd.dateGrouping = 'day';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 1,
                        timescale: 'week'
                    };
                    break;
                case 'month':
                    cd.dateGrouping = 'week';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 4,
                        timescale: 'week'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
                case '3months':
                    cd.dateGrouping = 'week';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 3,
                        timescale: 'month'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
                case '6months':
                    cd.dateGrouping = 'month';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 6,
                        timescale: 'month'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
                case 'year':
                    cd.dateGrouping = 'month';
                    kpi.dates = {
                        mode: 'dynamic',
                        amount: 1,
                        timescale: 'year'
                    };
                    //cd.type = kpi.chartType || 'column';
                    break;
            }
        }
    }
    /**
     * @param {?} groupBy
     * @return {?}
     */
    static getDateFormat(groupBy) {
        /** @type {?} */
        let format = '%Y-%m-%d';
        if (groupBy && groupBy.toString) {
            switch (groupBy.toString()) {
                case 'day':
                    format = '%Y-%m-%d %H:00';
                    break;
                case 'week':
                    format = '%Y-%m-%d';
                    break;
                case 'month':
                    format = '%G-%V';
                    break;
                case '3months':
                    format = '%G-%V';
                    break;
                case '6months':
                    format = '%Y-%m';
                    break;
                case 'year':
                case '2':
                    format = '%Y-%m';
                    break;
            }
        }
        return format;
    }
    /**
     * @param {?} kpi
     * @param {?=} showPreviousYear
     * @return {?}
     */
    static getDates(kpi, showPreviousYear) {
        /** @type {?} */
        let retVal = {};
        if (kpi.dates) {
            if (kpi.dates.mode === 'calendar') {
                if (kpi.dates.startDate) {
                    retVal.startDate = kpi.dates.startDate;
                }
                if (kpi.dates.endDate) {
                    retVal.endDate = kpi.dates.endDate;
                }
            }
            if (kpi.dates.mode === 'dynamic') {
                /** @type {?} */
                let dates = this.getStartAndEndDates(kpi.dates.timescale, null, kpi.dates.amount, kpi.dates.notsliding);
                retVal.startDate = dates[0];
                retVal.endDate = dates[1];
            }
        }
        if (showPreviousYear) {
            if (retVal.startDate) {
                retVal.startDate = dateAdd(retVal.startDate, 'years', -1).toISOString();
            }
            if (retVal.endDate) {
                retVal.endDate = dateAdd(retVal.endDate, 'years', -1).toISOString();
            }
        }
        return retVal;
    }
    /**
     * @param {?} timescale
     * @param {?=} endDate
     * @param {?=} amount
     * @param {?=} notsliding
     * @return {?}
     */
    static getStartAndEndDates(timescale, endDate, amount, notsliding) {
        return getStartAndEndDatesCore(timescale, endDate, amount, notsliding);
    }
    /**
     * @param {?} cd
     * @param {?} date
     * @return {?}
     */
    static fixDates(cd, date) {
        /** @type {?} */
        let retVal;
        if (!date) {
            return new Date().getTime();
        }
        if (cd.dateGrouping === 'week' || (cd.kpiFormValues && cd.kpiFormValues.groupBySlider === 'week' && cd.kpiFormValues.category !== 'healthscore')) {
            /** @type {?} */
            let y = (/** @type {?} */ (date.split('-')[0]));
            /** @type {?} */
            let w = (/** @type {?} */ (date.split('-')[1]));
            // // MongoDB week begins on Sundays and days preceding the first Sudnay of the year are in Week 0;
            // // So,  weekStartDay = days in Week 0 + first day of the week number
            // let yearStartDay = new Date(y, 0, 0).getDay();
            // let daysInWeek0 = yearStartDay === 0 ? 0 : 7 - yearStartDay;
            // let d = w === '00' ? 0 : daysInWeek0 + (w - 1) * 7;
            // let weekStart = new Date(y, 0, d);
            // retVal = weekStart.getTime();
            // //retVal = moment('2011-01-01').year(y).isoWeek(w).toDate().getTime(); //.startOf('day')
            /** @type {?} */
            let simple = new Date(y, 0, 1 + (w - 1) * 7);
            /** @type {?} */
            let dow = simple.getDay();
            /** @type {?} */
            let isoWeekStart = simple;
            if (dow <= 4) {
                isoWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
            }
            else {
                isoWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
            }
            return isoWeekStart.getTime();
        }
        else {
            retVal = new Date(date).getTime();
        }
        return retVal;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static getColor(value) {
        /** @type {?} */
        let color = Colors.black;
        if (!isNaN(value)) {
            if (value < 33) {
                color = Colors.danger;
            }
            else if (value < 75) {
                color = Colors.warning;
            }
            else if (value >= 75) {
                color = Colors.success;
            }
        }
        return color;
    }
    /**
     * @param {?} filters
     * @param {?} dates
     * @param {?=} field
     * @param {?=} allowNotExits
     * @return {?}
     */
    static setDateFilters(filters, dates, field = 'finishedDate', allowNotExits = true) {
        if (dates.startDate || dates.endDate) {
            /** @type {?} */
            let filter;
            if (allowNotExits) {
                filters.push(cloneDeep(filters[0]));
                filter = (/** @type {?} */ ({ operator: { _id: 'exists' }, value: false }));
                filter.field = field;
                filters[1].push(filter);
            }
            if (dates.startDate) {
                filter = (/** @type {?} */ ({ operator: { _id: 'gte' }, value: dates.startDate }));
                filter.field = field;
                filters[0].push(filter);
            }
            if (dates.endDate) {
                filter = (/** @type {?} */ ({ operator: { _id: 'lt' }, value: dates.endDate }));
                filter.field = field;
                filters[0].push(filter);
            }
        }
    }
    /**
     * @param {?} filters
     * @param {?} locationTags
     * @return {?}
     */
    static setLocationTagsFilters(filters, locationTags) {
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
    }
    /**
     * @param {?} filters
     * @param {?} userTags
     * @return {?}
     */
    static setUserTagsFilters(filters, userTags) {
        if (userTags && userTags.length) {
            filters[0].push({
                field: 'tags',
                collectionName: 'user',
                operator: { _id: 'inq' },
                value: userTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'ownerRef', values: '_id', leftJoin: true }
            });
        }
    }
    /**
     * @param {?} campaigns
     * @param {?} campaignTags
     * @param {?} filters
     * @param {?} missionType
     * @return {?}
     */
    static setCampaignFilters(campaigns, campaignTags, filters, missionType) {
        if (campaigns && campaigns.length > 0) {
            filters[0].unshift({
                field: 'descriptionRef',
                operator: { _id: 'inq' },
                value: campaigns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c._id))
            });
        }
        else if (campaignTags && campaignTags.length > 0) {
            filters[0].push({
                field: 'tags',
                collectionName: 'missiondescriptions',
                operator: { _id: 'inq' },
                value: campaignTags,
                type: FormFieldType.autocomplete,
                subQuery: { field: 'descriptionRef', values: '_id' }
            });
        }
        if (missionType) {
            filters[0].push({ field: 'type', operator: { _id: 'inq' }, value: [missionType] });
        }
    }
    /**
     * @param {?} groupBy
     * @return {?}
     */
    static getDateFormatMoment(groupBy) {
        /** @type {?} */
        let format = '';
        if (groupBy && groupBy.toString) {
            switch (groupBy.toString()) {
                case 'week':
                    format = 'YYYY-WW';
                    break;
                case 'month':
                    format = 'YYYY-MM';
                    break;
                case 'quarter':
                case 'year':
                    format = 'YYYY';
                    break;
            }
        }
        return format;
    }
};
tslib_1.__decorate([
    Editable('BaseKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.number, advanced: true }),
    tslib_1.__metadata("design:type", Boolean)
], BaseKpi.prototype, "pointPadding", void 0);
tslib_1.__decorate([
    Editable('BaseKpi', {
        tabIndex: 2,
        tab: 'ADVANCED',
        type: FormFieldType.number,
        advanced: true,
        min: 1
    }),
    tslib_1.__metadata("design:type", Number)
], BaseKpi.prototype, "numberPrecision", void 0);
tslib_1.__decorate([
    Editable('BaseKpi', {
        tabIndex: 2,
        tab: 'ADVANCED',
        type: FormFieldType.autocomplete,
        translate: true,
        values: ['sum', 'avg', 'min', 'max']
    }),
    tslib_1.__metadata("design:type", String)
], BaseKpi.prototype, "accumulator", void 0);
BaseKpi = tslib_1.__decorate([
    Model({
        className: 'BaseKpi'
    })
], BaseKpi);
export { BaseKpi };
if (false) {
    /** @type {?} */
    BaseKpi.prototype.pointPadding;
    /** @type {?} */
    BaseKpi.prototype.numberPrecision;
    /** @type {?} */
    BaseKpi.prototype.dates;
    /** @type {?} */
    BaseKpi.prototype.accumulator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3BpLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2twaS9rcGkuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBd0IsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsbUJBQW1CLElBQUksdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztJQUt2QyxPQUFPLFNBQVAsT0FBUSxTQUFRLElBQUk7Ozs7Ozs7SUF3QnhCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFRLEVBQUUsRUFBbUIsRUFBRSxTQUFvQjtRQUNsRixLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ1IsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1lBQzVCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLE9BQU87WUFDMUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO1lBQzFCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ25ELFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFO1lB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WCxHQUFHLEVBQUUsVUFBVTtRQUNmLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixRQUFRLEVBQUUsSUFBSTtRQUNkLEdBQUcsRUFBRSxDQUFDO0tBQ1AsQ0FBQzs7Z0RBQ3NCO0FBV3hCO0lBUEMsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNuQixRQUFRLEVBQUUsQ0FBQztRQUNYLEdBQUcsRUFBRSxVQUFVO1FBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0tBQ3JDLENBQUM7OzRDQUNrQjtBQXRCVCxPQUFPO0lBSG5CLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxTQUFTO0tBQ3JCLENBQUM7R0FDVyxPQUFPLENBNFNuQjtTQTVTWSxPQUFPOzs7SUFDbEIsK0JBQ3NCOztJQUV0QixrQ0FPd0I7O0lBRXhCLHdCQUFtQjs7SUFFbkIsOEJBT29CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBkYXRlQWRkLCBGb3JtRmllbGRUeXBlLCBJS3BpLCBGaWx0ZXJzLCBJRGF0ZXNSYW5nZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBnZXRTdGFydEFuZEVuZERhdGVzIGFzIGdldFN0YXJ0QW5kRW5kRGF0ZXNDb3JlIH0gZnJvbSAnLi4vZGF0ZXMvZGF0ZXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IE1pc3Npb25EZXNjcmlwdGlvbiB9IGZyb20gJy4uL21pc3Npb24tZGVzY3JpcHRpb24vbWlzc2lvbi1kZXNjcmlwdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2hhcnREZWZpbml0aW9uIH0gZnJvbSAnLi4vY2hhcnQtZGVmaW5pdGlvbi9jaGFydC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcblxuaW1wb3J0IHsgQ29sb3JzIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBtZXJnZSwgaXNOYU4sIGNsb25lRGVlcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0Jhc2VLcGknXG59KVxuZXhwb3J0IGNsYXNzIEJhc2VLcGkgZXh0ZW5kcyBJS3BpIHtcbiAgQEVkaXRhYmxlKCdCYXNlS3BpJywgeyB0YWJJbmRleDogMiwgdGFiOiAnQURWQU5DRUQnLCB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlciwgYWR2YW5jZWQ6IHRydWUgfSlcbiAgcG9pbnRQYWRkaW5nOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnQmFzZUtwaScsIHtcbiAgICB0YWJJbmRleDogMixcbiAgICB0YWI6ICdBRFZBTkNFRCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgYWR2YW5jZWQ6IHRydWUsXG4gICAgbWluOiAxXG4gIH0pXG4gIG51bWJlclByZWNpc2lvbjogbnVtYmVyO1xuXG4gIGRhdGVzOiBJRGF0ZXNSYW5nZTtcblxuICBARWRpdGFibGUoJ0Jhc2VLcGknLCB7XG4gICAgdGFiSW5kZXg6IDIsXG4gICAgdGFiOiAnQURWQU5DRUQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFsnc3VtJywgJ2F2ZycsICdtaW4nLCAnbWF4J11cbiAgfSlcbiAgYWNjdW11bGF0b3I6IHN0cmluZztcblxuICBwdWJsaWMgc3RhdGljIGdldENoYXJ0RGVmaW5pdGlvbihrcGk6IGFueSwgY2Q6IENoYXJ0RGVmaW5pdGlvbiwgdHJhbnNsYXRlOiBUcmFuc2xhdGUpIHtcbiAgICBtZXJnZShjZCwge1xuICAgICAgZGVzY3JpcHRpb246IGtwaS5kZXNjcmlwdGlvbixcbiAgICAgIHRpdGxlOiBrcGkudGl0bGUsXG4gICAgICBzaG93QXM6IGtwaS5zaG93QXMgfHwgY2Quc2hvd0FzIHx8ICdjaGFydCcsXG4gICAgICBzaG93VmFsdWVzOiBrcGkuc2hvd1ZhbHVlcyxcbiAgICAgIHNob3dMZWdlbmQ6IGtwaS5zaG93TGVnZW5kID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgIGxlZ2VuZFZhbHVlOiBrcGkuYWNjdW11bGF0b3JcbiAgICB9KTtcblxuICAgIGlmIChrcGkgJiYga3BpLmdyb3VwQnlTbGlkZXIpIHtcbiAgICAgIHN3aXRjaCAoa3BpLmdyb3VwQnlTbGlkZXIudG9TdHJpbmcoKSkge1xuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgIGNkLmRhdGVHcm91cGluZyA9ICdob3VyJztcbiAgICAgICAgICBrcGkuZGF0ZXMgPSB7XG4gICAgICAgICAgICBtb2RlOiAnZHluYW1pYycsXG4gICAgICAgICAgICBhbW91bnQ6IDEsXG4gICAgICAgICAgICB0aW1lc2NhbGU6ICdkYXknXG4gICAgICAgICAgfTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICBjZC5kYXRlR3JvdXBpbmcgPSAnZGF5JztcbiAgICAgICAgICBrcGkuZGF0ZXMgPSB7XG4gICAgICAgICAgICBtb2RlOiAnZHluYW1pYycsXG4gICAgICAgICAgICBhbW91bnQ6IDEsXG4gICAgICAgICAgICB0aW1lc2NhbGU6ICd3ZWVrJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgIGNkLmRhdGVHcm91cGluZyA9ICd3ZWVrJztcbiAgICAgICAgICBrcGkuZGF0ZXMgPSB7XG4gICAgICAgICAgICBtb2RlOiAnZHluYW1pYycsXG4gICAgICAgICAgICBhbW91bnQ6IDQsXG4gICAgICAgICAgICB0aW1lc2NhbGU6ICd3ZWVrJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy9jZC50eXBlID0ga3BpLmNoYXJ0VHlwZSB8fCAnY29sdW1uJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICczbW9udGhzJzpcbiAgICAgICAgICBjZC5kYXRlR3JvdXBpbmcgPSAnd2Vlayc7XG4gICAgICAgICAga3BpLmRhdGVzID0ge1xuICAgICAgICAgICAgbW9kZTogJ2R5bmFtaWMnLFxuICAgICAgICAgICAgYW1vdW50OiAzLFxuICAgICAgICAgICAgdGltZXNjYWxlOiAnbW9udGgnXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NkLnR5cGUgPSBrcGkuY2hhcnRUeXBlIHx8ICdjb2x1bW4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJzZtb250aHMnOlxuICAgICAgICAgIGNkLmRhdGVHcm91cGluZyA9ICdtb250aCc7XG4gICAgICAgICAga3BpLmRhdGVzID0ge1xuICAgICAgICAgICAgbW9kZTogJ2R5bmFtaWMnLFxuICAgICAgICAgICAgYW1vdW50OiA2LFxuICAgICAgICAgICAgdGltZXNjYWxlOiAnbW9udGgnXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NkLnR5cGUgPSBrcGkuY2hhcnRUeXBlIHx8ICdjb2x1bW4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgIGNkLmRhdGVHcm91cGluZyA9ICdtb250aCc7XG4gICAgICAgICAga3BpLmRhdGVzID0ge1xuICAgICAgICAgICAgbW9kZTogJ2R5bmFtaWMnLFxuICAgICAgICAgICAgYW1vdW50OiAxLFxuICAgICAgICAgICAgdGltZXNjYWxlOiAneWVhcidcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2QudHlwZSA9IGtwaS5jaGFydFR5cGUgfHwgJ2NvbHVtbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXREYXRlRm9ybWF0KGdyb3VwQnkpIHtcbiAgICBsZXQgZm9ybWF0ID0gJyVZLSVtLSVkJztcbiAgICBpZiAoZ3JvdXBCeSAmJiBncm91cEJ5LnRvU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGdyb3VwQnkudG9TdHJpbmcoKSkge1xuICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgIGZvcm1hdCA9ICclWS0lbS0lZCAlSDowMCc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgZm9ybWF0ID0gJyVZLSVtLSVkJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgZm9ybWF0ID0gJyVHLSVWJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICczbW9udGhzJzpcbiAgICAgICAgICBmb3JtYXQgPSAnJUctJVYnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJzZtb250aHMnOlxuICAgICAgICAgIGZvcm1hdCA9ICclWS0lbSc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgIGZvcm1hdCA9ICclWS0lbSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldERhdGVzKGtwaTogQmFzZUtwaSwgc2hvd1ByZXZpb3VzWWVhcj86IGJvb2xlYW4pOiB7IHN0YXJ0RGF0ZT86IHN0cmluZzsgZW5kRGF0ZT86IHN0cmluZyB9IHtcbiAgICBsZXQgcmV0VmFsOiBhbnkgPSB7fTtcbiAgICBpZiAoa3BpLmRhdGVzKSB7XG4gICAgICBpZiAoa3BpLmRhdGVzLm1vZGUgPT09ICdjYWxlbmRhcicpIHtcbiAgICAgICAgaWYgKGtwaS5kYXRlcy5zdGFydERhdGUpIHtcbiAgICAgICAgICByZXRWYWwuc3RhcnREYXRlID0ga3BpLmRhdGVzLnN0YXJ0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa3BpLmRhdGVzLmVuZERhdGUpIHtcbiAgICAgICAgICByZXRWYWwuZW5kRGF0ZSA9IGtwaS5kYXRlcy5lbmREYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoa3BpLmRhdGVzLm1vZGUgPT09ICdkeW5hbWljJykge1xuICAgICAgICBsZXQgZGF0ZXMgPSB0aGlzLmdldFN0YXJ0QW5kRW5kRGF0ZXMoa3BpLmRhdGVzLnRpbWVzY2FsZSwgbnVsbCwga3BpLmRhdGVzLmFtb3VudCwga3BpLmRhdGVzLm5vdHNsaWRpbmcpO1xuICAgICAgICByZXRWYWwuc3RhcnREYXRlID0gZGF0ZXNbMF07XG4gICAgICAgIHJldFZhbC5lbmREYXRlID0gZGF0ZXNbMV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaG93UHJldmlvdXNZZWFyKSB7XG4gICAgICBpZiAocmV0VmFsLnN0YXJ0RGF0ZSkge1xuICAgICAgICByZXRWYWwuc3RhcnREYXRlID0gZGF0ZUFkZChyZXRWYWwuc3RhcnREYXRlLCAneWVhcnMnLCAtMSkudG9JU09TdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXRWYWwuZW5kRGF0ZSkge1xuICAgICAgICByZXRWYWwuZW5kRGF0ZSA9IGRhdGVBZGQocmV0VmFsLmVuZERhdGUsICd5ZWFycycsIC0xKS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFN0YXJ0QW5kRW5kRGF0ZXModGltZXNjYWxlLCBlbmREYXRlPzogRGF0ZSB8IHN0cmluZywgYW1vdW50PzogbnVtYmVyLCBub3RzbGlkaW5nPzogYm9vbGVhbikge1xuICAgIHJldHVybiBnZXRTdGFydEFuZEVuZERhdGVzQ29yZSh0aW1lc2NhbGUsIGVuZERhdGUsIGFtb3VudCwgbm90c2xpZGluZyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpeERhdGVzKGNkOiBDaGFydERlZmluaXRpb24sIGRhdGU6IHN0cmluZykge1xuICAgIGxldCByZXRWYWw7XG4gICAgaWYgKCFkYXRlKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIGlmIChjZC5kYXRlR3JvdXBpbmcgPT09ICd3ZWVrJyB8fCAoY2Qua3BpRm9ybVZhbHVlcyAmJiBjZC5rcGlGb3JtVmFsdWVzLmdyb3VwQnlTbGlkZXIgPT09ICd3ZWVrJyAmJiBjZC5rcGlGb3JtVmFsdWVzLmNhdGVnb3J5ICE9PSAnaGVhbHRoc2NvcmUnKSkge1xuICAgICAgbGV0IHkgPSA8YW55PmRhdGUuc3BsaXQoJy0nKVswXTtcbiAgICAgIGxldCB3ID0gPGFueT5kYXRlLnNwbGl0KCctJylbMV07XG4gICAgICAvLyAvLyBNb25nb0RCIHdlZWsgYmVnaW5zIG9uIFN1bmRheXMgYW5kIGRheXMgcHJlY2VkaW5nIHRoZSBmaXJzdCBTdWRuYXkgb2YgdGhlIHllYXIgYXJlIGluIFdlZWsgMDtcbiAgICAgIC8vIC8vIFNvLCAgd2Vla1N0YXJ0RGF5ID0gZGF5cyBpbiBXZWVrIDAgKyBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgbnVtYmVyXG4gICAgICAvLyBsZXQgeWVhclN0YXJ0RGF5ID0gbmV3IERhdGUoeSwgMCwgMCkuZ2V0RGF5KCk7XG4gICAgICAvLyBsZXQgZGF5c0luV2VlazAgPSB5ZWFyU3RhcnREYXkgPT09IDAgPyAwIDogNyAtIHllYXJTdGFydERheTtcbiAgICAgIC8vIGxldCBkID0gdyA9PT0gJzAwJyA/IDAgOiBkYXlzSW5XZWVrMCArICh3IC0gMSkgKiA3O1xuICAgICAgLy8gbGV0IHdlZWtTdGFydCA9IG5ldyBEYXRlKHksIDAsIGQpO1xuXG4gICAgICAvLyByZXRWYWwgPSB3ZWVrU3RhcnQuZ2V0VGltZSgpO1xuICAgICAgLy8gLy9yZXRWYWwgPSBtb21lbnQoJzIwMTEtMDEtMDEnKS55ZWFyKHkpLmlzb1dlZWsodykudG9EYXRlKCkuZ2V0VGltZSgpOyAvLy5zdGFydE9mKCdkYXknKVxuXG4gICAgICBsZXQgc2ltcGxlID0gbmV3IERhdGUoeSwgMCwgMSArICh3IC0gMSkgKiA3KTtcbiAgICAgIGxldCBkb3cgPSBzaW1wbGUuZ2V0RGF5KCk7XG4gICAgICBsZXQgaXNvV2Vla1N0YXJ0ID0gc2ltcGxlO1xuICAgICAgaWYgKGRvdyA8PSA0KSB7XG4gICAgICAgIGlzb1dlZWtTdGFydC5zZXREYXRlKHNpbXBsZS5nZXREYXRlKCkgLSBzaW1wbGUuZ2V0RGF5KCkgKyAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzb1dlZWtTdGFydC5zZXREYXRlKHNpbXBsZS5nZXREYXRlKCkgKyA4IC0gc2ltcGxlLmdldERheSgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpc29XZWVrU3RhcnQuZ2V0VGltZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRWYWwgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldENvbG9yKHZhbHVlKSB7XG4gICAgbGV0IGNvbG9yID0gQ29sb3JzLmJsYWNrO1xuICAgIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUgPCAzMykge1xuICAgICAgICBjb2xvciA9IENvbG9ycy5kYW5nZXI7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgNzUpIHtcbiAgICAgICAgY29sb3IgPSBDb2xvcnMud2FybmluZztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPj0gNzUpIHtcbiAgICAgICAgY29sb3IgPSBDb2xvcnMuc3VjY2VzcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXREYXRlRmlsdGVycyhmaWx0ZXJzOiBGaWx0ZXJzLCBkYXRlczogeyBzdGFydERhdGU/OiBzdHJpbmc7IGVuZERhdGU/OiBzdHJpbmcgfSwgZmllbGQgPSAnZmluaXNoZWREYXRlJywgYWxsb3dOb3RFeGl0cyA9IHRydWUpIHtcbiAgICBpZiAoZGF0ZXMuc3RhcnREYXRlIHx8IGRhdGVzLmVuZERhdGUpIHtcbiAgICAgIGxldCBmaWx0ZXI6IGFueTtcbiAgICAgIGlmIChhbGxvd05vdEV4aXRzKSB7XG4gICAgICAgIGZpbHRlcnMucHVzaChjbG9uZURlZXAoZmlsdGVyc1swXSkpO1xuICAgICAgICBmaWx0ZXIgPSA8YW55Pnsgb3BlcmF0b3I6IHsgX2lkOiAnZXhpc3RzJyB9LCB2YWx1ZTogZmFsc2UgfTtcbiAgICAgICAgZmlsdGVyLmZpZWxkID0gZmllbGQ7XG4gICAgICAgIGZpbHRlcnNbMV0ucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGVzLnN0YXJ0RGF0ZSkge1xuICAgICAgICBmaWx0ZXIgPSA8YW55Pnsgb3BlcmF0b3I6IHsgX2lkOiAnZ3RlJyB9LCB2YWx1ZTogZGF0ZXMuc3RhcnREYXRlIH07XG4gICAgICAgIGZpbHRlci5maWVsZCA9IGZpZWxkO1xuICAgICAgICBmaWx0ZXJzWzBdLnB1c2goZmlsdGVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRlcy5lbmREYXRlKSB7XG4gICAgICAgIGZpbHRlciA9IDxhbnk+eyBvcGVyYXRvcjogeyBfaWQ6ICdsdCcgfSwgdmFsdWU6IGRhdGVzLmVuZERhdGUgfTtcbiAgICAgICAgZmlsdGVyLmZpZWxkID0gZmllbGQ7XG4gICAgICAgIGZpbHRlcnNbMF0ucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0TG9jYXRpb25UYWdzRmlsdGVycyhmaWx0ZXJzOiBGaWx0ZXJzLCBsb2NhdGlvblRhZ3M6IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAobG9jYXRpb25UYWdzICYmIGxvY2F0aW9uVGFncy5sZW5ndGgpIHtcbiAgICAgIGZpbHRlcnNbMF0ucHVzaCh7XG4gICAgICAgIGZpZWxkOiAndGFncycsXG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiAnbG9jYXRpb25zJyxcbiAgICAgICAgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LFxuICAgICAgICB2YWx1ZTogbG9jYXRpb25UYWdzLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdsb2NhdGlvblJlZicsIHZhbHVlczogJ19pZCcgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRVc2VyVGFnc0ZpbHRlcnMoZmlsdGVyczogRmlsdGVycywgdXNlclRhZ3M6IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAodXNlclRhZ3MgJiYgdXNlclRhZ3MubGVuZ3RoKSB7XG4gICAgICBmaWx0ZXJzWzBdLnB1c2goe1xuICAgICAgICBmaWVsZDogJ3RhZ3MnLFxuICAgICAgICBjb2xsZWN0aW9uTmFtZTogJ3VzZXInLFxuICAgICAgICBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sXG4gICAgICAgIHZhbHVlOiB1c2VyVGFncyxcbiAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnb3duZXJSZWYnLCB2YWx1ZXM6ICdfaWQnLCBsZWZ0Sm9pbjogdHJ1ZSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldENhbXBhaWduRmlsdGVycyhjYW1wYWlnbnM6IEFycmF5PE1pc3Npb25EZXNjcmlwdGlvbj4sIGNhbXBhaWduVGFnczogQXJyYXk8c3RyaW5nPiwgZmlsdGVyczogRmlsdGVycywgbWlzc2lvblR5cGU6IHN0cmluZykge1xuICAgIGlmIChjYW1wYWlnbnMgJiYgY2FtcGFpZ25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZpbHRlcnNbMF0udW5zaGlmdCh7XG4gICAgICAgIGZpZWxkOiAnZGVzY3JpcHRpb25SZWYnLFxuICAgICAgICBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sXG4gICAgICAgIHZhbHVlOiBjYW1wYWlnbnMubWFwKGMgPT4gYy5faWQpXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNhbXBhaWduVGFncyAmJiBjYW1wYWlnblRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHtcbiAgICAgICAgZmllbGQ6ICd0YWdzJyxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICdtaXNzaW9uZGVzY3JpcHRpb25zJyxcbiAgICAgICAgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LFxuICAgICAgICB2YWx1ZTogY2FtcGFpZ25UYWdzLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdkZXNjcmlwdGlvblJlZicsIHZhbHVlczogJ19pZCcgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtaXNzaW9uVHlwZSkge1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnaW5xJyB9LCB2YWx1ZTogW21pc3Npb25UeXBlXSB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldERhdGVGb3JtYXRNb21lbnQoZ3JvdXBCeSkge1xuICAgIGxldCBmb3JtYXQgPSAnJztcbiAgICBpZiAoZ3JvdXBCeSAmJiBncm91cEJ5LnRvU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGdyb3VwQnkudG9TdHJpbmcoKSkge1xuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICBmb3JtYXQgPSAnWVlZWS1XVyc7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgIGZvcm1hdCA9ICdZWVlZLU1NJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdxdWFydGVyJzpcbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgZm9ybWF0ID0gJ1lZWVknO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0O1xuICB9XG59XG4iXX0=