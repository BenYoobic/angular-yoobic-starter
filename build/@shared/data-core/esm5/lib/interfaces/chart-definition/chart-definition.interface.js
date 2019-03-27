/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { FormFieldType, IChartDefinition } from '@shared/stencil';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
/** @type {?} */
export var CHART_TYPES = ['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'radar', 'pie', 'doughnut', 'treemap'];
/** @type {?} */
export var CHART_DATEGROUPINGBY = ['year', 'month', 'week', 'day', 'calendar'];
/** @type {?} */
export var CHART_SHOW_AS = ['chart', 'grid', 'map', 'micro'];
/** @type {?} */
export var CHART_DATETIMEFORMAT = ['d', 'dd', 'DD', 'w', 'MMM'];
/** @type {?} */
export var CHART_TIMESCALE = ['last7days', 'lastweek', 'last30days', 'lastmonth', 'last90days', 'lastquarter', 'last365days', 'lastyear'];
/** @type {?} */
var conditions = {
    showAsChart: 'showAs=="chart"',
    isMissionOrMissionData: 'collectionName=="missions" or collectionName=="missiondatas"',
    isMissionData: 'collectionName=="missiondatas"',
    isMission: 'collectionName=="missions"',
    groupByDate: 'groupByDate == 1'
};
/**
 * @record
 */
export function IMissionField() { }
if (false) {
    /** @type {?} */
    IMissionField.prototype.selectedDescription;
    /** @type {?|undefined} */
    IMissionField.prototype.fields;
}
/**
 * @record
 */
export function IMissionFields() { }
if (false) {
    /** @type {?} */
    IMissionFields.prototype.selectedDescription;
    /** @type {?|undefined} */
    IMissionFields.prototype.fields;
}
/**
 * @param {?} missionfields
 * @param {?} data
 * @return {?}
 */
export function onChartMissionFieldsChange(missionfields, data) {
    if (missionfields && missionfields.selectedDescription) {
        if (!data.title) {
            data.title = missionfields.selectedDescription.title;
        }
    }
}
var ChartDefinition = /** @class */ (function (_super) {
    tslib_1.__extends(ChartDefinition, _super);
    function ChartDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            title: 'QUERYON',
            type: FormFieldType.autocomplete,
            translate: true,
            values: ['missions', 'missiondatas', 'custom'],
            clearable: false,
            required: true,
            autoselect: true
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "collectionName", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.missionfield,
            condition: conditions.isMissionData,
            title: 'CAMPAIGN',
            required: true,
            onChange: onChartMissionFieldsChange
        }),
        tslib_1.__metadata("design:type", Object)
    ], ChartDefinition.prototype, "missionfields", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', { required: true, type: FormFieldType.text }),
        Searchable('ChartDefinition'),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', { required: false, type: FormFieldType.textarea }),
        Searchable('ChartDefinition'),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            title: 'SHOWAS',
            type: FormFieldType.autocomplete,
            flex: 33,
            values: CHART_SHOW_AS
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "showAs", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.autocomplete,
            values: CHART_TYPES,
            flex: 33,
            condition: conditions.showAsChart,
            translate: true,
            clearable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "type", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            title: 'PALETTE',
            type: FormFieldType.autocomplete,
            flex: 34,
            condition: conditions.showAsChart,
            translate: true,
            values: ['palette0', 'palette1', 'palette2', 'palette3'],
            clearable: false,
            autoselect: true
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "palette", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.checkbox,
            flex: 34,
            condition: conditions.isMissionOrMissionData
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "groupByDate", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            title: 'DATETIMEFORMAT',
            type: FormFieldType.autocomplete,
            flex: 33,
            tag: true,
            condition: conditions.groupByDate,
            values: CHART_DATETIMEFORMAT,
            clearable: true
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "datetimeFormat", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            title: 'TIMESCALE',
            type: FormFieldType.autocomplete,
            flex: 33,
            condition: conditions.groupByDate,
            values: CHART_TIMESCALE
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "timescale", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            title: 'GROUPBY',
            type: FormFieldType.autocomplete,
            translate: true,
            flex: 34,
            values: CHART_DATEGROUPINGBY,
            condition: conditions.groupByDate,
            clearable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "dateGrouping", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.checkbox,
            flex: 33,
            condition: conditions.isMission
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "groupByTag", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.checkbox,
            flex: 33,
            condition: conditions.isMission
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "groupByCampaign", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox }),
        tslib_1.__metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "showLegend", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox }),
        tslib_1.__metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "showValues", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', { flex: 33, type: FormFieldType.checkbox }),
        tslib_1.__metadata("design:type", Boolean)
    ], ChartDefinition.prototype, "colorByPoint", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', {
            type: FormFieldType.autocomplete,
            flex: 34,
            values: ['normal', 'percent'],
            clearable: true
        }),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "stacked", void 0);
    tslib_1.__decorate([
        Editable('ChartDefinition', { required: false, type: FormFieldType.textarea }),
        Searchable('ChartDefinition'),
        tslib_1.__metadata("design:type", String)
    ], ChartDefinition.prototype, "custom", void 0);
    ChartDefinition = tslib_1.__decorate([
        Model({
            className: 'ChartDefinition',
            collectionName: 'chartdefinitions',
            fields: ['*'],
            include: []
        })
    ], ChartDefinition);
    return ChartDefinition;
}(IChartDefinition));
export { ChartDefinition };
if (false) {
    /** @type {?} */
    ChartDefinition.prototype.collectionName;
    /** @type {?} */
    ChartDefinition.prototype.missionfields;
    /** @type {?} */
    ChartDefinition.prototype.title;
    /** @type {?} */
    ChartDefinition.prototype.description;
    /** @type {?} */
    ChartDefinition.prototype.showAs;
    /** @type {?} */
    ChartDefinition.prototype.type;
    /** @type {?} */
    ChartDefinition.prototype.palette;
    /** @type {?} */
    ChartDefinition.prototype.groupByDate;
    /** @type {?} */
    ChartDefinition.prototype.datetimeFormat;
    /** @type {?} */
    ChartDefinition.prototype.timescale;
    /** @type {?} */
    ChartDefinition.prototype.dateGrouping;
    /** @type {?} */
    ChartDefinition.prototype.groupByTag;
    /** @type {?} */
    ChartDefinition.prototype.groupByCampaign;
    /** @type {?} */
    ChartDefinition.prototype.showLegend;
    /** @type {?} */
    ChartDefinition.prototype.showValues;
    /** @type {?} */
    ChartDefinition.prototype.colorByPoint;
    /** @type {?} */
    ChartDefinition.prototype.stacked;
    /** @type {?} */
    ChartDefinition.prototype.custom;
    /** @type {?} */
    ChartDefinition.prototype.mapTransform;
    /** @type {?} */
    ChartDefinition.prototype.filters;
    /** @type {?} */
    ChartDefinition.prototype.showPreviousYear;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtZGVmaW5pdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9jaGFydC1kZWZpbml0aW9uL2NoYXJ0LWRlZmluaXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQXVCLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7QUFHeEUsTUFBTSxLQUFPLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQzs7QUFDM0gsTUFBTSxLQUFPLG9CQUFvQixHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQzs7QUFDaEYsTUFBTSxLQUFPLGFBQWEsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQzs7QUFDOUQsTUFBTSxLQUFPLG9CQUFvQixHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQzs7QUFDakUsTUFBTSxLQUFPLGVBQWUsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7O0lBRXZJLFVBQVUsR0FBRztJQUNmLFdBQVcsRUFBRSxpQkFBaUI7SUFDOUIs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a0NBVWlCOztJQUVqQixzQ0FLc0I7O0lBRXRCLHlDQVN3Qjs7SUFFeEIsb0NBT21COztJQUVuQix1Q0FTc0I7O0lBRXRCLHFDQUtxQjs7SUFFckIsMENBSzBCOztJQUUxQixxQ0FDcUI7O0lBRXJCLHFDQUNxQjs7SUFFckIsdUNBQ3VCOztJQUV2QixrQ0FNaUI7O0lBRWpCLGlDQUVnQjs7SUFFaEIsdUNBQTBKOztJQUMxSixrQ0FBa0I7O0lBRWxCLDJDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUZvcm1GaWVsZCwgRmlsdGVycywgSUNoYXJ0RGVmaW5pdGlvbiB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBNaXNzaW9uRGVzY3JpcHRpb24gfSBmcm9tICcuLi9taXNzaW9uLWRlc2NyaXB0aW9uL21pc3Npb24tZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IENIQVJUX1RZUEVTID0gWydsaW5lJywgJ3NwbGluZScsICdhcmVhJywgJ2FyZWFzcGxpbmUnLCAnY29sdW1uJywgJ2JhcicsICdyYWRhcicsICdwaWUnLCAnZG91Z2hudXQnLCAndHJlZW1hcCddO1xuZXhwb3J0IGNvbnN0IENIQVJUX0RBVEVHUk9VUElOR0JZID0gWyd5ZWFyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF5JywgJ2NhbGVuZGFyJ107XG5leHBvcnQgY29uc3QgQ0hBUlRfU0hPV19BUyA9IFsnY2hhcnQnLCAnZ3JpZCcsICdtYXAnLCAnbWljcm8nXTtcbmV4cG9ydCBjb25zdCBDSEFSVF9EQVRFVElNRUZPUk1BVCA9IFsnZCcsICdkZCcsICdERCcsICd3JywgJ01NTSddO1xuZXhwb3J0IGNvbnN0IENIQVJUX1RJTUVTQ0FMRSA9IFsnbGFzdDdkYXlzJywgJ2xhc3R3ZWVrJywgJ2xhc3QzMGRheXMnLCAnbGFzdG1vbnRoJywgJ2xhc3Q5MGRheXMnLCAnbGFzdHF1YXJ0ZXInLCAnbGFzdDM2NWRheXMnLCAnbGFzdHllYXInXTtcblxubGV0IGNvbmRpdGlvbnMgPSB7XG4gIHNob3dBc0NoYXJ0OiAnc2hvd0FzPT1cImNoYXJ0XCInLFxuICBpc01pc3Npb25Pck1pc3Npb25EYXRhOiAnY29sbGVjdGlvbk5hbWU9PVwibWlzc2lvbnNcIiBvciBjb2xsZWN0aW9uTmFtZT09XCJtaXNzaW9uZGF0YXNcIicsXG4gIGlzTWlzc2lvbkRhdGE6ICdjb2xsZWN0aW9uTmFtZT09XCJtaXNzaW9uZGF0YXNcIicsXG4gIGlzTWlzc2lvbjogJ2NvbGxlY3Rpb25OYW1lPT1cIm1pc3Npb25zXCInLFxuICBncm91cEJ5RGF0ZTogJ2dyb3VwQnlEYXRlID09IDEnXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElNaXNzaW9uRmllbGQge1xuICBzZWxlY3RlZERlc2NyaXB0aW9uOiBNaXNzaW9uRGVzY3JpcHRpb247XG4gIGZpZWxkcz86IEFycmF5PElGb3JtRmllbGQ+IHwgSUZvcm1GaWVsZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTWlzc2lvbkZpZWxkcyB7XG4gIHNlbGVjdGVkRGVzY3JpcHRpb246IE1pc3Npb25EZXNjcmlwdGlvbjtcbiAgZmllbGRzPzogQXJyYXk8SUZvcm1GaWVsZD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoYXJ0TWlzc2lvbkZpZWxkc0NoYW5nZShtaXNzaW9uZmllbGRzLCBkYXRhKSB7XG4gIGlmIChtaXNzaW9uZmllbGRzICYmIG1pc3Npb25maWVsZHMuc2VsZWN0ZWREZXNjcmlwdGlvbikge1xuICAgIGlmICghZGF0YS50aXRsZSkge1xuICAgICAgZGF0YS50aXRsZSA9IG1pc3Npb25maWVsZHMuc2VsZWN0ZWREZXNjcmlwdGlvbi50aXRsZTtcbiAgICB9XG4gIH1cbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQ2hhcnREZWZpbml0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdjaGFydGRlZmluaXRpb25zJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgQ2hhcnREZWZpbml0aW9uIGV4dGVuZHMgSUNoYXJ0RGVmaW5pdGlvbiB7XG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHRpdGxlOiAnUVVFUllPTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHZhbHVlczogWydtaXNzaW9ucycsICdtaXNzaW9uZGF0YXMnLCAnY3VzdG9tJ10sXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBhdXRvc2VsZWN0OiB0cnVlXG4gIH0pXG4gIGNvbGxlY3Rpb25OYW1lPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubWlzc2lvbmZpZWxkLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc01pc3Npb25EYXRhLFxuICAgIHRpdGxlOiAnQ0FNUEFJR04nLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG9uQ2hhbmdlOiBvbkNoYXJ0TWlzc2lvbkZpZWxkc0NoYW5nZVxuICB9KVxuICBtaXNzaW9uZmllbGRzPzogSU1pc3Npb25GaWVsZDtcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnQ2hhcnREZWZpbml0aW9uJylcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHsgcmVxdWlyZWQ6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIEBTZWFyY2hhYmxlKCdDaGFydERlZmluaXRpb24nKVxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0aXRsZTogJ1NIT1dBUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmxleDogMzMsXG4gICAgdmFsdWVzOiBDSEFSVF9TSE9XX0FTXG4gIH0pXG4gIHNob3dBcz86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB2YWx1ZXM6IENIQVJUX1RZUEVTLFxuICAgIGZsZXg6IDMzLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5zaG93QXNDaGFydCxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICB0eXBlPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHRpdGxlOiAnUEFMRVRURScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmxleDogMzQsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLnNob3dBc0NoYXJ0LFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFsncGFsZXR0ZTAnLCAncGFsZXR0ZTEnLCAncGFsZXR0ZTInLCAncGFsZXR0ZTMnXSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIGF1dG9zZWxlY3Q6IHRydWVcbiAgfSlcbiAgcGFsZXR0ZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDM0LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc01pc3Npb25Pck1pc3Npb25EYXRhXG4gIH0pXG4gIGdyb3VwQnlEYXRlPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0aXRsZTogJ0RBVEVUSU1FRk9STUFUJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBmbGV4OiAzMyxcbiAgICB0YWc6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmdyb3VwQnlEYXRlLFxuICAgIHZhbHVlczogQ0hBUlRfREFURVRJTUVGT1JNQVQsXG4gICAgY2xlYXJhYmxlOiB0cnVlXG4gIH0pXG4gIGRhdGV0aW1lRm9ybWF0Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHRpdGxlOiAnVElNRVNDQUxFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBmbGV4OiAzMyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuZ3JvdXBCeURhdGUsXG4gICAgdmFsdWVzOiBDSEFSVF9USU1FU0NBTEVcbiAgfSlcbiAgdGltZXNjYWxlPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHRpdGxlOiAnR1JPVVBCWScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIGZsZXg6IDM0LFxuICAgIHZhbHVlczogQ0hBUlRfREFURUdST1VQSU5HQlksXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmdyb3VwQnlEYXRlLFxuICAgIGNsZWFyYWJsZTogZmFsc2VcbiAgfSlcbiAgZGF0ZUdyb3VwaW5nPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgZmxleDogMzMsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzTWlzc2lvblxuICB9KVxuICBncm91cEJ5VGFnPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDMzLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc01pc3Npb25cbiAgfSlcbiAgZ3JvdXBCeUNhbXBhaWduPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHsgZmxleDogMzMsIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3ggfSlcbiAgc2hvd0xlZ2VuZD86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7IGZsZXg6IDMzLCB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94IH0pXG4gIHNob3dWYWx1ZXM/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywgeyBmbGV4OiAzMywgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCB9KVxuICBjb2xvckJ5UG9pbnQ/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGZsZXg6IDM0LFxuICAgIHZhbHVlczogWydub3JtYWwnLCAncGVyY2VudCddLFxuICAgIGNsZWFyYWJsZTogdHJ1ZVxuICB9KVxuICBzdGFja2VkPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywgeyByZXF1aXJlZDogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgQFNlYXJjaGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicpXG4gIGN1c3RvbT86IHN0cmluZztcblxuICBtYXBUcmFuc2Zvcm0/OiAocmV0VmFsOiBBcnJheTx7IF9pZDogc3RyaW5nOyBzZXJpZT86IHN0cmluZzsgdmFsdWU6IG51bWJlcjsgY29sb3I/OiBzdHJpbmcgfT4sIGNkPzogQ2hhcnREZWZpbml0aW9uLCBicm9rZXI/OiBhbnksIGNvbXBvbmVudD86IGFueSkgPT4ge307XG4gIGZpbHRlcnM/OiBGaWx0ZXJzO1xuXG4gIHNob3dQcmV2aW91c1llYXI/OiBib29sZWFuO1xufVxuIl19