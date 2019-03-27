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
export const CHART_TYPES = ['line', 'spline', 'area', 'areaspline', 'column', 'bar', 'radar', 'pie', 'doughnut', 'treemap'];
/** @type {?} */
export const CHART_DATEGROUPINGBY = ['year', 'month', 'week', 'day', 'calendar'];
/** @type {?} */
export const CHART_SHOW_AS = ['chart', 'grid', 'map', 'micro'];
/** @type {?} */
export const CHART_DATETIMEFORMAT = ['d', 'dd', 'DD', 'w', 'MMM'];
/** @type {?} */
export const CHART_TIMESCALE = ['last7days', 'lastweek', 'last30days', 'lastmonth', 'last90days', 'lastquarter', 'last365days', 'lastyear'];
/** @type {?} */
let conditions = {
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
let ChartDefinition = class ChartDefinition extends IChartDefinition {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtZGVmaW5pdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9jaGFydC1kZWZpbml0aW9uL2NoYXJ0LWRlZmluaXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQXVCLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdkYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7QUFHeEUsTUFBTSxPQUFPLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQzs7QUFDM0gsTUFBTSxPQUFPLG9CQUFvQixHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQzs7QUFDaEYsTUFBTSxPQUFPLGFBQWEsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQzs7QUFDOUQsTUFBTSxPQUFPLG9CQUFvQixHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQzs7QUFDakUsTUFBTSxPQUFPLGVBQWUsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7O0lBRXZJLFVBQVUsR0FBRztJQUNmLFdBQVcsRUFBRSxpQkFBaUI7SUFDOUIs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OztJQUV0Qix5Q0FTd0I7O0lBRXhCLG9DQU9tQjs7SUFFbkIsdUNBU3NCOztJQUV0QixxQ0FLcUI7O0lBRXJCLDBDQUswQjs7SUFFMUIscUNBQ3FCOztJQUVyQixxQ0FDcUI7O0lBRXJCLHVDQUN1Qjs7SUFFdkIsa0NBTWlCOztJQUVqQixpQ0FFZ0I7O0lBRWhCLHVDQUEwSjs7SUFDMUosa0NBQWtCOztJQUVsQiwyQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElGb3JtRmllbGQsIEZpbHRlcnMsIElDaGFydERlZmluaXRpb24gfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgTWlzc2lvbkRlc2NyaXB0aW9uIH0gZnJvbSAnLi4vbWlzc2lvbi1kZXNjcmlwdGlvbi9taXNzaW9uLWRlc2NyaXB0aW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBDSEFSVF9UWVBFUyA9IFsnbGluZScsICdzcGxpbmUnLCAnYXJlYScsICdhcmVhc3BsaW5lJywgJ2NvbHVtbicsICdiYXInLCAncmFkYXInLCAncGllJywgJ2RvdWdobnV0JywgJ3RyZWVtYXAnXTtcbmV4cG9ydCBjb25zdCBDSEFSVF9EQVRFR1JPVVBJTkdCWSA9IFsneWVhcicsICdtb250aCcsICd3ZWVrJywgJ2RheScsICdjYWxlbmRhciddO1xuZXhwb3J0IGNvbnN0IENIQVJUX1NIT1dfQVMgPSBbJ2NoYXJ0JywgJ2dyaWQnLCAnbWFwJywgJ21pY3JvJ107XG5leHBvcnQgY29uc3QgQ0hBUlRfREFURVRJTUVGT1JNQVQgPSBbJ2QnLCAnZGQnLCAnREQnLCAndycsICdNTU0nXTtcbmV4cG9ydCBjb25zdCBDSEFSVF9USU1FU0NBTEUgPSBbJ2xhc3Q3ZGF5cycsICdsYXN0d2VlaycsICdsYXN0MzBkYXlzJywgJ2xhc3Rtb250aCcsICdsYXN0OTBkYXlzJywgJ2xhc3RxdWFydGVyJywgJ2xhc3QzNjVkYXlzJywgJ2xhc3R5ZWFyJ107XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBzaG93QXNDaGFydDogJ3Nob3dBcz09XCJjaGFydFwiJyxcbiAgaXNNaXNzaW9uT3JNaXNzaW9uRGF0YTogJ2NvbGxlY3Rpb25OYW1lPT1cIm1pc3Npb25zXCIgb3IgY29sbGVjdGlvbk5hbWU9PVwibWlzc2lvbmRhdGFzXCInLFxuICBpc01pc3Npb25EYXRhOiAnY29sbGVjdGlvbk5hbWU9PVwibWlzc2lvbmRhdGFzXCInLFxuICBpc01pc3Npb246ICdjb2xsZWN0aW9uTmFtZT09XCJtaXNzaW9uc1wiJyxcbiAgZ3JvdXBCeURhdGU6ICdncm91cEJ5RGF0ZSA9PSAxJ1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBJTWlzc2lvbkZpZWxkIHtcbiAgc2VsZWN0ZWREZXNjcmlwdGlvbjogTWlzc2lvbkRlc2NyaXB0aW9uO1xuICBmaWVsZHM/OiBBcnJheTxJRm9ybUZpZWxkPiB8IElGb3JtRmllbGQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1pc3Npb25GaWVsZHMge1xuICBzZWxlY3RlZERlc2NyaXB0aW9uOiBNaXNzaW9uRGVzY3JpcHRpb247XG4gIGZpZWxkcz86IEFycmF5PElGb3JtRmllbGQ+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DaGFydE1pc3Npb25GaWVsZHNDaGFuZ2UobWlzc2lvbmZpZWxkcywgZGF0YSkge1xuICBpZiAobWlzc2lvbmZpZWxkcyAmJiBtaXNzaW9uZmllbGRzLnNlbGVjdGVkRGVzY3JpcHRpb24pIHtcbiAgICBpZiAoIWRhdGEudGl0bGUpIHtcbiAgICAgIGRhdGEudGl0bGUgPSBtaXNzaW9uZmllbGRzLnNlbGVjdGVkRGVzY3JpcHRpb24udGl0bGU7XG4gICAgfVxuICB9XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0NoYXJ0RGVmaW5pdGlvbicsXG4gIGNvbGxlY3Rpb25OYW1lOiAnY2hhcnRkZWZpbml0aW9ucycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0RGVmaW5pdGlvbiBleHRlbmRzIElDaGFydERlZmluaXRpb24ge1xuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0aXRsZTogJ1FVRVJZT04nLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFsnbWlzc2lvbnMnLCAnbWlzc2lvbmRhdGFzJywgJ2N1c3RvbSddLFxuICAgIGNsZWFyYWJsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgYXV0b3NlbGVjdDogdHJ1ZVxuICB9KVxuICBjb2xsZWN0aW9uTmFtZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm1pc3Npb25maWVsZCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNNaXNzaW9uRGF0YSxcbiAgICB0aXRsZTogJ0NBTVBBSUdOJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBvbkNoYW5nZTogb25DaGFydE1pc3Npb25GaWVsZHNDaGFuZ2VcbiAgfSlcbiAgbWlzc2lvbmZpZWxkcz86IElNaXNzaW9uRmllbGQ7XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgQFNlYXJjaGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7IHJlcXVpcmVkOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSB9KVxuICBAU2VhcmNoYWJsZSgnQ2hhcnREZWZpbml0aW9uJylcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7XG4gICAgdGl0bGU6ICdTSE9XQVMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGZsZXg6IDMzLFxuICAgIHZhbHVlczogQ0hBUlRfU0hPV19BU1xuICB9KVxuICBzaG93QXM/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdmFsdWVzOiBDSEFSVF9UWVBFUyxcbiAgICBmbGV4OiAzMyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuc2hvd0FzQ2hhcnQsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2VcbiAgfSlcbiAgdHlwZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0aXRsZTogJ1BBTEVUVEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGZsZXg6IDM0LFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5zaG93QXNDaGFydCxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgdmFsdWVzOiBbJ3BhbGV0dGUwJywgJ3BhbGV0dGUxJywgJ3BhbGV0dGUyJywgJ3BhbGV0dGUzJ10sXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICBhdXRvc2VsZWN0OiB0cnVlXG4gIH0pXG4gIHBhbGV0dGU/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAzNCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNNaXNzaW9uT3JNaXNzaW9uRGF0YVxuICB9KVxuICBncm91cEJ5RGF0ZT86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7XG4gICAgdGl0bGU6ICdEQVRFVElNRUZPUk1BVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmxleDogMzMsXG4gICAgdGFnOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5ncm91cEJ5RGF0ZSxcbiAgICB2YWx1ZXM6IENIQVJUX0RBVEVUSU1FRk9STUFULFxuICAgIGNsZWFyYWJsZTogdHJ1ZVxuICB9KVxuICBkYXRldGltZUZvcm1hdD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0aXRsZTogJ1RJTUVTQ0FMRScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmxleDogMzMsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmdyb3VwQnlEYXRlLFxuICAgIHZhbHVlczogQ0hBUlRfVElNRVNDQUxFXG4gIH0pXG4gIHRpbWVzY2FsZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0aXRsZTogJ0dST1VQQlknLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBmbGV4OiAzNCxcbiAgICB2YWx1ZXM6IENIQVJUX0RBVEVHUk9VUElOR0JZLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5ncm91cEJ5RGF0ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlXG4gIH0pXG4gIGRhdGVHcm91cGluZz86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDMzLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc01pc3Npb25cbiAgfSlcbiAgZ3JvdXBCeVRhZz86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAzMyxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNNaXNzaW9uXG4gIH0pXG4gIGdyb3VwQnlDYW1wYWlnbj86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdDaGFydERlZmluaXRpb24nLCB7IGZsZXg6IDMzLCB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94IH0pXG4gIHNob3dMZWdlbmQ/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnQ2hhcnREZWZpbml0aW9uJywgeyBmbGV4OiAzMywgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCB9KVxuICBzaG93VmFsdWVzPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHsgZmxleDogMzMsIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3ggfSlcbiAgY29sb3JCeVBvaW50PzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBmbGV4OiAzNCxcbiAgICB2YWx1ZXM6IFsnbm9ybWFsJywgJ3BlcmNlbnQnXSxcbiAgICBjbGVhcmFibGU6IHRydWVcbiAgfSlcbiAgc3RhY2tlZD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NoYXJ0RGVmaW5pdGlvbicsIHsgcmVxdWlyZWQ6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIEBTZWFyY2hhYmxlKCdDaGFydERlZmluaXRpb24nKVxuICBjdXN0b20/OiBzdHJpbmc7XG5cbiAgbWFwVHJhbnNmb3JtPzogKHJldFZhbDogQXJyYXk8eyBfaWQ6IHN0cmluZzsgc2VyaWU/OiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IGNvbG9yPzogc3RyaW5nIH0+LCBjZD86IENoYXJ0RGVmaW5pdGlvbiwgYnJva2VyPzogYW55LCBjb21wb25lbnQ/OiBhbnkpID0+IHt9O1xuICBmaWx0ZXJzPzogRmlsdGVycztcblxuICBzaG93UHJldmlvdXNZZWFyPzogYm9vbGVhbjtcbn1cbiJdfQ==