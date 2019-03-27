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
var BaseKpi = /** @class */ (function (_super) {
    tslib_1.__extends(BaseKpi, _super);
    function BaseKpi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} kpi
     * @param {?} cd
     * @param {?} translate
     * @return {?}
     */
    BaseKpi.getChartDefinition = /**
     * @param {?} kpi
     * @param {?} cd
     * @param {?} translate
     * @return {?}
     */
    function (kpi, cd, translate) {
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
    };
    /**
     * @param {?} groupBy
     * @return {?}
     */
    BaseKpi.getDateFormat = /**
     * @param {?} groupBy
     * @return {?}
     */
    function (groupBy) {
        /** @type {?} */
        var format = '%Y-%m-%d';
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
    };
    /**
     * @param {?} kpi
     * @param {?=} showPreviousYear
     * @return {?}
     */
    BaseKpi.getDates = /**
     * @param {?} kpi
     * @param {?=} showPreviousYear
     * @return {?}
     */
    function (kpi, showPreviousYear) {
        /** @type {?} */
        var retVal = {};
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
                var dates = this.getStartAndEndDates(kpi.dates.timescale, null, kpi.dates.amount, kpi.dates.notsliding);
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
    };
    /**
     * @param {?} timescale
     * @param {?=} endDate
     * @param {?=} amount
     * @param {?=} notsliding
     * @return {?}
     */
    BaseKpi.getStartAndEndDates = /**
     * @param {?} timescale
     * @param {?=} endDate
     * @param {?=} amount
     * @param {?=} notsliding
     * @return {?}
     */
    function (timescale, endDate, amount, notsliding) {
        return getStartAndEndDatesCore(timescale, endDate, amount, notsliding);
    };
    /**
     * @param {?} cd
     * @param {?} date
     * @return {?}
     */
    BaseKpi.fixDates = /**
     * @param {?} cd
     * @param {?} date
     * @return {?}
     */
    function (cd, date) {
        /** @type {?} */
        var retVal;
        if (!date) {
            return new Date().getTime();
        }
        if (cd.dateGrouping === 'week' || (cd.kpiFormValues && cd.kpiFormValues.groupBySlider === 'week' && cd.kpiFormValues.category !== 'healthscore')) {
            /** @type {?} */
            var y = (/** @type {?} */ (date.split('-')[0]));
            /** @type {?} */
            var w = (/** @type {?} */ (date.split('-')[1]));
            // // MongoDB week begins on Sundays and days preceding the first Sudnay of the year are in Week 0;
            // // So,  weekStartDay = days in Week 0 + first day of the week number
            // let yearStartDay = new Date(y, 0, 0).getDay();
            // let daysInWeek0 = yearStartDay === 0 ? 0 : 7 - yearStartDay;
            // let d = w === '00' ? 0 : daysInWeek0 + (w - 1) * 7;
            // let weekStart = new Date(y, 0, d);
            // retVal = weekStart.getTime();
            // //retVal = moment('2011-01-01').year(y).isoWeek(w).toDate().getTime(); //.startOf('day')
            /** @type {?} */
            var simple = new Date(y, 0, 1 + (w - 1) * 7);
            /** @type {?} */
            var dow = simple.getDay();
            /** @type {?} */
            var isoWeekStart = simple;
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseKpi.getColor = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var color = Colors.black;
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
    };
    /**
     * @param {?} filters
     * @param {?} dates
     * @param {?=} field
     * @param {?=} allowNotExits
     * @return {?}
     */
    BaseKpi.setDateFilters = /**
     * @param {?} filters
     * @param {?} dates
     * @param {?=} field
     * @param {?=} allowNotExits
     * @return {?}
     */
    function (filters, dates, field, allowNotExits) {
        if (field === void 0) { field = 'finishedDate'; }
        if (allowNotExits === void 0) { allowNotExits = true; }
        if (dates.startDate || dates.endDate) {
            /** @type {?} */
            var filter = void 0;
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
    };
    /**
     * @param {?} filters
     * @param {?} locationTags
     * @return {?}
     */
    BaseKpi.setLocationTagsFilters = /**
     * @param {?} filters
     * @param {?} locationTags
     * @return {?}
     */
    function (filters, locationTags) {
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
    };
    /**
     * @param {?} filters
     * @param {?} userTags
     * @return {?}
     */
    BaseKpi.setUserTagsFilters = /**
     * @param {?} filters
     * @param {?} userTags
     * @return {?}
     */
    function (filters, userTags) {
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
    };
    /**
     * @param {?} campaigns
     * @param {?} campaignTags
     * @param {?} filters
     * @param {?} missionType
     * @return {?}
     */
    BaseKpi.setCampaignFilters = /**
     * @param {?} campaigns
     * @param {?} campaignTags
     * @param {?} filters
     * @param {?} missionType
     * @return {?}
     */
    function (campaigns, campaignTags, filters, missionType) {
        if (campaigns && campaigns.length > 0) {
            filters[0].unshift({
                field: 'descriptionRef',
                operator: { _id: 'inq' },
                value: campaigns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c._id; }))
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
    };
    /**
     * @param {?} groupBy
     * @return {?}
     */
    BaseKpi.getDateFormatMoment = /**
     * @param {?} groupBy
     * @return {?}
     */
    function (groupBy) {
        /** @type {?} */
        var format = '';
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
    return BaseKpi;
}(IKpi));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3BpLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2twaS9rcGkuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBd0IsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsbUJBQW1CLElBQUksdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7SUFLdkIsbUNBQUk7OztJQTRTakMsQ0FBQzs7Ozs7OztJQXBSZSwwQkFBa0I7Ozs7OztJQUFoQyxVQUFpQyxHQUFRLEVBQUUsRUFBbUIsRUFBRSxTQUFvQjtRQUNsRixLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ1IsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1lBQzVCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLE9BQU87WUFDMUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO1lBQzFCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ25ELFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQzVC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UUFQQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxDQUFDO1lBQ1gsR0FBRyxFQUFFLFVBQVU7WUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07WUFDMUIsUUFBUSxFQUFFLElBQUk7WUFDZCxHQUFHLEVBQUUsQ0FBQztTQUNQLENBQUM7O29EQUNzQjtJQVd4QjtRQVBDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbkIsUUFBUSxFQUFFLENBQUM7WUFDWCxHQUFHLEVBQUUsVUFBVTtZQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNyQyxDQUFDOztnREFDa0I7SUF0QlQsT0FBTztRQUhuQixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsU0FBUztTQUNyQixDQUFDO09BQ1csT0FBTyxDQTRTbkI7SUFBRCxjQUFDO0NBQUEsQ0E1UzRCLElBQUksR0E0U2hDO1NBNVNZLE9BQU87OztJQUNsQiwrQkFDc0I7O0lBRXRCLGtDQU93Qjs7SUFFeEIsd0JBQW1COztJQUVuQiw4QkFPb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IGRhdGVBZGQsIEZvcm1GaWVsZFR5cGUsIElLcGksIEZpbHRlcnMsIElEYXRlc1JhbmdlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IGdldFN0YXJ0QW5kRW5kRGF0ZXMgYXMgZ2V0U3RhcnRBbmRFbmREYXRlc0NvcmUgfSBmcm9tICcuLi9kYXRlcy9kYXRlcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTWlzc2lvbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi4vbWlzc2lvbi1kZXNjcmlwdGlvbi9taXNzaW9uLWRlc2NyaXB0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDaGFydERlZmluaXRpb24gfSBmcm9tICcuLi9jaGFydC1kZWZpbml0aW9uL2NoYXJ0LWRlZmluaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuXG5pbXBvcnQgeyBDb2xvcnMgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IG1lcmdlLCBpc05hTiwgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQmFzZUtwaSdcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUtwaSBleHRlbmRzIElLcGkge1xuICBARWRpdGFibGUoJ0Jhc2VLcGknLCB7IHRhYkluZGV4OiAyLCB0YWI6ICdBRFZBTkNFRCcsIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLCBhZHZhbmNlZDogdHJ1ZSB9KVxuICBwb2ludFBhZGRpbmc6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdCYXNlS3BpJywge1xuICAgIHRhYkluZGV4OiAyLFxuICAgIHRhYjogJ0FEVkFOQ0VEJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBhZHZhbmNlZDogdHJ1ZSxcbiAgICBtaW46IDFcbiAgfSlcbiAgbnVtYmVyUHJlY2lzaW9uOiBudW1iZXI7XG5cbiAgZGF0ZXM6IElEYXRlc1JhbmdlO1xuXG4gIEBFZGl0YWJsZSgnQmFzZUtwaScsIHtcbiAgICB0YWJJbmRleDogMixcbiAgICB0YWI6ICdBRFZBTkNFRCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHZhbHVlczogWydzdW0nLCAnYXZnJywgJ21pbicsICdtYXgnXVxuICB9KVxuICBhY2N1bXVsYXRvcjogc3RyaW5nO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q2hhcnREZWZpbml0aW9uKGtwaTogYW55LCBjZDogQ2hhcnREZWZpbml0aW9uLCB0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge1xuICAgIG1lcmdlKGNkLCB7XG4gICAgICBkZXNjcmlwdGlvbjoga3BpLmRlc2NyaXB0aW9uLFxuICAgICAgdGl0bGU6IGtwaS50aXRsZSxcbiAgICAgIHNob3dBczoga3BpLnNob3dBcyB8fCBjZC5zaG93QXMgfHwgJ2NoYXJ0JyxcbiAgICAgIHNob3dWYWx1ZXM6IGtwaS5zaG93VmFsdWVzLFxuICAgICAgc2hvd0xlZ2VuZDoga3BpLnNob3dMZWdlbmQgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgbGVnZW5kVmFsdWU6IGtwaS5hY2N1bXVsYXRvclxuICAgIH0pO1xuXG4gICAgaWYgKGtwaSAmJiBrcGkuZ3JvdXBCeVNsaWRlcikge1xuICAgICAgc3dpdGNoIChrcGkuZ3JvdXBCeVNsaWRlci50b1N0cmluZygpKSB7XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgY2QuZGF0ZUdyb3VwaW5nID0gJ2hvdXInO1xuICAgICAgICAgIGtwaS5kYXRlcyA9IHtcbiAgICAgICAgICAgIG1vZGU6ICdkeW5hbWljJyxcbiAgICAgICAgICAgIGFtb3VudDogMSxcbiAgICAgICAgICAgIHRpbWVzY2FsZTogJ2RheSdcbiAgICAgICAgICB9O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgIGNkLmRhdGVHcm91cGluZyA9ICdkYXknO1xuICAgICAgICAgIGtwaS5kYXRlcyA9IHtcbiAgICAgICAgICAgIG1vZGU6ICdkeW5hbWljJyxcbiAgICAgICAgICAgIGFtb3VudDogMSxcbiAgICAgICAgICAgIHRpbWVzY2FsZTogJ3dlZWsnXG4gICAgICAgICAgfTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgY2QuZGF0ZUdyb3VwaW5nID0gJ3dlZWsnO1xuICAgICAgICAgIGtwaS5kYXRlcyA9IHtcbiAgICAgICAgICAgIG1vZGU6ICdkeW5hbWljJyxcbiAgICAgICAgICAgIGFtb3VudDogNCxcbiAgICAgICAgICAgIHRpbWVzY2FsZTogJ3dlZWsnXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvL2NkLnR5cGUgPSBrcGkuY2hhcnRUeXBlIHx8ICdjb2x1bW4nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJzNtb250aHMnOlxuICAgICAgICAgIGNkLmRhdGVHcm91cGluZyA9ICd3ZWVrJztcbiAgICAgICAgICBrcGkuZGF0ZXMgPSB7XG4gICAgICAgICAgICBtb2RlOiAnZHluYW1pYycsXG4gICAgICAgICAgICBhbW91bnQ6IDMsXG4gICAgICAgICAgICB0aW1lc2NhbGU6ICdtb250aCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2QudHlwZSA9IGtwaS5jaGFydFR5cGUgfHwgJ2NvbHVtbic7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnNm1vbnRocyc6XG4gICAgICAgICAgY2QuZGF0ZUdyb3VwaW5nID0gJ21vbnRoJztcbiAgICAgICAgICBrcGkuZGF0ZXMgPSB7XG4gICAgICAgICAgICBtb2RlOiAnZHluYW1pYycsXG4gICAgICAgICAgICBhbW91bnQ6IDYsXG4gICAgICAgICAgICB0aW1lc2NhbGU6ICdtb250aCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vY2QudHlwZSA9IGtwaS5jaGFydFR5cGUgfHwgJ2NvbHVtbic7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgY2QuZGF0ZUdyb3VwaW5nID0gJ21vbnRoJztcbiAgICAgICAgICBrcGkuZGF0ZXMgPSB7XG4gICAgICAgICAgICBtb2RlOiAnZHluYW1pYycsXG4gICAgICAgICAgICBhbW91bnQ6IDEsXG4gICAgICAgICAgICB0aW1lc2NhbGU6ICd5ZWFyJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgLy9jZC50eXBlID0ga3BpLmNoYXJ0VHlwZSB8fCAnY29sdW1uJztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldERhdGVGb3JtYXQoZ3JvdXBCeSkge1xuICAgIGxldCBmb3JtYXQgPSAnJVktJW0tJWQnO1xuICAgIGlmIChncm91cEJ5ICYmIGdyb3VwQnkudG9TdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoZ3JvdXBCeS50b1N0cmluZygpKSB7XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgZm9ybWF0ID0gJyVZLSVtLSVkICVIOjAwJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICBmb3JtYXQgPSAnJVktJW0tJWQnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICBmb3JtYXQgPSAnJUctJVYnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJzNtb250aHMnOlxuICAgICAgICAgIGZvcm1hdCA9ICclRy0lVic7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnNm1vbnRocyc6XG4gICAgICAgICAgZm9ybWF0ID0gJyVZLSVtJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgZm9ybWF0ID0gJyVZLSVtJztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGF0ZXMoa3BpOiBCYXNlS3BpLCBzaG93UHJldmlvdXNZZWFyPzogYm9vbGVhbik6IHsgc3RhcnREYXRlPzogc3RyaW5nOyBlbmREYXRlPzogc3RyaW5nIH0ge1xuICAgIGxldCByZXRWYWw6IGFueSA9IHt9O1xuICAgIGlmIChrcGkuZGF0ZXMpIHtcbiAgICAgIGlmIChrcGkuZGF0ZXMubW9kZSA9PT0gJ2NhbGVuZGFyJykge1xuICAgICAgICBpZiAoa3BpLmRhdGVzLnN0YXJ0RGF0ZSkge1xuICAgICAgICAgIHJldFZhbC5zdGFydERhdGUgPSBrcGkuZGF0ZXMuc3RhcnREYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrcGkuZGF0ZXMuZW5kRGF0ZSkge1xuICAgICAgICAgIHJldFZhbC5lbmREYXRlID0ga3BpLmRhdGVzLmVuZERhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChrcGkuZGF0ZXMubW9kZSA9PT0gJ2R5bmFtaWMnKSB7XG4gICAgICAgIGxldCBkYXRlcyA9IHRoaXMuZ2V0U3RhcnRBbmRFbmREYXRlcyhrcGkuZGF0ZXMudGltZXNjYWxlLCBudWxsLCBrcGkuZGF0ZXMuYW1vdW50LCBrcGkuZGF0ZXMubm90c2xpZGluZyk7XG4gICAgICAgIHJldFZhbC5zdGFydERhdGUgPSBkYXRlc1swXTtcbiAgICAgICAgcmV0VmFsLmVuZERhdGUgPSBkYXRlc1sxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNob3dQcmV2aW91c1llYXIpIHtcbiAgICAgIGlmIChyZXRWYWwuc3RhcnREYXRlKSB7XG4gICAgICAgIHJldFZhbC5zdGFydERhdGUgPSBkYXRlQWRkKHJldFZhbC5zdGFydERhdGUsICd5ZWFycycsIC0xKS50b0lTT1N0cmluZygpO1xuICAgICAgfVxuICAgICAgaWYgKHJldFZhbC5lbmREYXRlKSB7XG4gICAgICAgIHJldFZhbC5lbmREYXRlID0gZGF0ZUFkZChyZXRWYWwuZW5kRGF0ZSwgJ3llYXJzJywgLTEpLnRvSVNPU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0U3RhcnRBbmRFbmREYXRlcyh0aW1lc2NhbGUsIGVuZERhdGU/OiBEYXRlIHwgc3RyaW5nLCBhbW91bnQ/OiBudW1iZXIsIG5vdHNsaWRpbmc/OiBib29sZWFuKSB7XG4gICAgcmV0dXJuIGdldFN0YXJ0QW5kRW5kRGF0ZXNDb3JlKHRpbWVzY2FsZSwgZW5kRGF0ZSwgYW1vdW50LCBub3RzbGlkaW5nKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZml4RGF0ZXMoY2Q6IENoYXJ0RGVmaW5pdGlvbiwgZGF0ZTogc3RyaW5nKSB7XG4gICAgbGV0IHJldFZhbDtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG4gICAgaWYgKGNkLmRhdGVHcm91cGluZyA9PT0gJ3dlZWsnIHx8IChjZC5rcGlGb3JtVmFsdWVzICYmIGNkLmtwaUZvcm1WYWx1ZXMuZ3JvdXBCeVNsaWRlciA9PT0gJ3dlZWsnICYmIGNkLmtwaUZvcm1WYWx1ZXMuY2F0ZWdvcnkgIT09ICdoZWFsdGhzY29yZScpKSB7XG4gICAgICBsZXQgeSA9IDxhbnk+ZGF0ZS5zcGxpdCgnLScpWzBdO1xuICAgICAgbGV0IHcgPSA8YW55PmRhdGUuc3BsaXQoJy0nKVsxXTtcbiAgICAgIC8vIC8vIE1vbmdvREIgd2VlayBiZWdpbnMgb24gU3VuZGF5cyBhbmQgZGF5cyBwcmVjZWRpbmcgdGhlIGZpcnN0IFN1ZG5heSBvZiB0aGUgeWVhciBhcmUgaW4gV2VlayAwO1xuICAgICAgLy8gLy8gU28sICB3ZWVrU3RhcnREYXkgPSBkYXlzIGluIFdlZWsgMCArIGZpcnN0IGRheSBvZiB0aGUgd2VlayBudW1iZXJcbiAgICAgIC8vIGxldCB5ZWFyU3RhcnREYXkgPSBuZXcgRGF0ZSh5LCAwLCAwKS5nZXREYXkoKTtcbiAgICAgIC8vIGxldCBkYXlzSW5XZWVrMCA9IHllYXJTdGFydERheSA9PT0gMCA/IDAgOiA3IC0geWVhclN0YXJ0RGF5O1xuICAgICAgLy8gbGV0IGQgPSB3ID09PSAnMDAnID8gMCA6IGRheXNJbldlZWswICsgKHcgLSAxKSAqIDc7XG4gICAgICAvLyBsZXQgd2Vla1N0YXJ0ID0gbmV3IERhdGUoeSwgMCwgZCk7XG5cbiAgICAgIC8vIHJldFZhbCA9IHdlZWtTdGFydC5nZXRUaW1lKCk7XG4gICAgICAvLyAvL3JldFZhbCA9IG1vbWVudCgnMjAxMS0wMS0wMScpLnllYXIoeSkuaXNvV2Vlayh3KS50b0RhdGUoKS5nZXRUaW1lKCk7IC8vLnN0YXJ0T2YoJ2RheScpXG5cbiAgICAgIGxldCBzaW1wbGUgPSBuZXcgRGF0ZSh5LCAwLCAxICsgKHcgLSAxKSAqIDcpO1xuICAgICAgbGV0IGRvdyA9IHNpbXBsZS5nZXREYXkoKTtcbiAgICAgIGxldCBpc29XZWVrU3RhcnQgPSBzaW1wbGU7XG4gICAgICBpZiAoZG93IDw9IDQpIHtcbiAgICAgICAgaXNvV2Vla1N0YXJ0LnNldERhdGUoc2ltcGxlLmdldERhdGUoKSAtIHNpbXBsZS5nZXREYXkoKSArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNvV2Vla1N0YXJ0LnNldERhdGUoc2ltcGxlLmdldERhdGUoKSArIDggLSBzaW1wbGUuZ2V0RGF5KCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlzb1dlZWtTdGFydC5nZXRUaW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldFZhbCA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q29sb3IodmFsdWUpIHtcbiAgICBsZXQgY29sb3IgPSBDb2xvcnMuYmxhY2s7XG4gICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDMzKSB7XG4gICAgICAgIGNvbG9yID0gQ29sb3JzLmRhbmdlcjtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCA3NSkge1xuICAgICAgICBjb2xvciA9IENvbG9ycy53YXJuaW5nO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+PSA3NSkge1xuICAgICAgICBjb2xvciA9IENvbG9ycy5zdWNjZXNzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldERhdGVGaWx0ZXJzKGZpbHRlcnM6IEZpbHRlcnMsIGRhdGVzOiB7IHN0YXJ0RGF0ZT86IHN0cmluZzsgZW5kRGF0ZT86IHN0cmluZyB9LCBmaWVsZCA9ICdmaW5pc2hlZERhdGUnLCBhbGxvd05vdEV4aXRzID0gdHJ1ZSkge1xuICAgIGlmIChkYXRlcy5zdGFydERhdGUgfHwgZGF0ZXMuZW5kRGF0ZSkge1xuICAgICAgbGV0IGZpbHRlcjogYW55O1xuICAgICAgaWYgKGFsbG93Tm90RXhpdHMpIHtcbiAgICAgICAgZmlsdGVycy5wdXNoKGNsb25lRGVlcChmaWx0ZXJzWzBdKSk7XG4gICAgICAgIGZpbHRlciA9IDxhbnk+eyBvcGVyYXRvcjogeyBfaWQ6ICdleGlzdHMnIH0sIHZhbHVlOiBmYWxzZSB9O1xuICAgICAgICBmaWx0ZXIuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgZmlsdGVyc1sxXS5wdXNoKGZpbHRlcik7XG4gICAgICB9XG4gICAgICBpZiAoZGF0ZXMuc3RhcnREYXRlKSB7XG4gICAgICAgIGZpbHRlciA9IDxhbnk+eyBvcGVyYXRvcjogeyBfaWQ6ICdndGUnIH0sIHZhbHVlOiBkYXRlcy5zdGFydERhdGUgfTtcbiAgICAgICAgZmlsdGVyLmZpZWxkID0gZmllbGQ7XG4gICAgICAgIGZpbHRlcnNbMF0ucHVzaChmaWx0ZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGVzLmVuZERhdGUpIHtcbiAgICAgICAgZmlsdGVyID0gPGFueT57IG9wZXJhdG9yOiB7IF9pZDogJ2x0JyB9LCB2YWx1ZTogZGF0ZXMuZW5kRGF0ZSB9O1xuICAgICAgICBmaWx0ZXIuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgZmlsdGVyc1swXS5wdXNoKGZpbHRlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRMb2NhdGlvblRhZ3NGaWx0ZXJzKGZpbHRlcnM6IEZpbHRlcnMsIGxvY2F0aW9uVGFnczogQXJyYXk8c3RyaW5nPikge1xuICAgIGlmIChsb2NhdGlvblRhZ3MgJiYgbG9jYXRpb25UYWdzLmxlbmd0aCkge1xuICAgICAgZmlsdGVyc1swXS5wdXNoKHtcbiAgICAgICAgZmllbGQ6ICd0YWdzJyxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgICAgICBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sXG4gICAgICAgIHZhbHVlOiBsb2NhdGlvblRhZ3MsXG4gICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgICAgICBzdWJRdWVyeTogeyBmaWVsZDogJ2xvY2F0aW9uUmVmJywgdmFsdWVzOiAnX2lkJyB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldFVzZXJUYWdzRmlsdGVycyhmaWx0ZXJzOiBGaWx0ZXJzLCB1c2VyVGFnczogQXJyYXk8c3RyaW5nPikge1xuICAgIGlmICh1c2VyVGFncyAmJiB1c2VyVGFncy5sZW5ndGgpIHtcbiAgICAgIGZpbHRlcnNbMF0ucHVzaCh7XG4gICAgICAgIGZpZWxkOiAndGFncycsXG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiAndXNlcicsXG4gICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSxcbiAgICAgICAgdmFsdWU6IHVzZXJUYWdzLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdvd25lclJlZicsIHZhbHVlczogJ19pZCcsIGxlZnRKb2luOiB0cnVlIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0Q2FtcGFpZ25GaWx0ZXJzKGNhbXBhaWduczogQXJyYXk8TWlzc2lvbkRlc2NyaXB0aW9uPiwgY2FtcGFpZ25UYWdzOiBBcnJheTxzdHJpbmc+LCBmaWx0ZXJzOiBGaWx0ZXJzLCBtaXNzaW9uVHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKGNhbXBhaWducyAmJiBjYW1wYWlnbnMubGVuZ3RoID4gMCkge1xuICAgICAgZmlsdGVyc1swXS51bnNoaWZ0KHtcbiAgICAgICAgZmllbGQ6ICdkZXNjcmlwdGlvblJlZicsXG4gICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSxcbiAgICAgICAgdmFsdWU6IGNhbXBhaWducy5tYXAoYyA9PiBjLl9pZClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY2FtcGFpZ25UYWdzICYmIGNhbXBhaWduVGFncy5sZW5ndGggPiAwKSB7XG4gICAgICBmaWx0ZXJzWzBdLnB1c2goe1xuICAgICAgICBmaWVsZDogJ3RhZ3MnLFxuICAgICAgICBjb2xsZWN0aW9uTmFtZTogJ21pc3Npb25kZXNjcmlwdGlvbnMnLFxuICAgICAgICBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sXG4gICAgICAgIHZhbHVlOiBjYW1wYWlnblRhZ3MsXG4gICAgICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgICAgICBzdWJRdWVyeTogeyBmaWVsZDogJ2Rlc2NyaXB0aW9uUmVmJywgdmFsdWVzOiAnX2lkJyB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1pc3Npb25UeXBlKSB7XG4gICAgICBmaWx0ZXJzWzBdLnB1c2goeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiBbbWlzc2lvblR5cGVdIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RGF0ZUZvcm1hdE1vbWVudChncm91cEJ5KSB7XG4gICAgbGV0IGZvcm1hdCA9ICcnO1xuICAgIGlmIChncm91cEJ5ICYmIGdyb3VwQnkudG9TdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoZ3JvdXBCeS50b1N0cmluZygpKSB7XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgIGZvcm1hdCA9ICdZWVlZLVdXJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgZm9ybWF0ID0gJ1lZWVktTU0nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXInOlxuICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICBmb3JtYXQgPSAnWVlZWSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cbn1cbiJdfQ==