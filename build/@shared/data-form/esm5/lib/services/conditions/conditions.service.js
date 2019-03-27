/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CONDITION_TYPES, CONDITION_ALL_OPERATORS, SIMPLE_FIELD_TYPES, WITH_VALUES_FIELD_TYPES } from '@shared/data-core';
import { getUUID } from '@shared/stencil';
import { isEqual, omit, isArray } from 'lodash-es';
var Conditions = /** @class */ (function () {
    function Conditions() {
    }
    /**
     * @return {?}
     */
    Conditions.prototype.generateConditionId = /**
     * @return {?}
     */
    function () {
        return getUUID();
    };
    /**
     * @param {?} op
     * @return {?}
     */
    Conditions.prototype.convertOperator = /**
     * @param {?} op
     * @return {?}
     */
    function (op) {
        if (!op) {
            return 'in';
        }
        /** @type {?} */
        var retVal;
        switch (op.toLowerCase().replace(/\s/g, '')) {
            case 'equals':
            case '==':
            case '===':
            case 'égal':
                retVal = 'equals';
                break;
            case 'notequals':
            case '!=':
            case '!==':
            case 'différentde':
                retVal = 'notequals';
                break;
            case 'greaterthan':
            case '>=':
            case 'plusgrandque':
                retVal = 'greaterthan';
                break;
            case 'lessthan':
            case '<=':
            case 'pluspetitque':
                retVal = 'lessthan';
                break;
            case 'in':
            case 'contient':
            case 'contains':
                retVal = 'in';
                break;
            case 'notin':
            case 'necontientpas':
            case 'notcontains':
                retVal = 'notin';
                break;
        }
        return retVal;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    Conditions.prototype.convertType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (!type) {
            return;
        }
        /** @type {?} */
        var retVal;
        switch (type.toLowerCase().replace(/\s/g, '')) {
            case 'field':
            case 'champ':
                retVal = 'field';
                break;
            case 'tags':
                retVal = 'tags';
                break;
            case 'groups':
            case 'groupes':
                retVal = 'groups';
                break;
            default:
                retVal = '';
                break;
        }
        return retVal;
    };
    /**
     * @param {?} f
     * @return {?}
     */
    Conditions.prototype.convertField = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        if (!f) {
            return;
        }
        /** @type {?} */
        var res = { name: f.name, title: f.title, type: f.type };
        if (f.values) {
            res['values'] = f.values;
        }
        return res;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    Conditions.prototype.isValid = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        if (!c) {
            return false;
        }
        /** @type {?} */
        var isTitleValid = c.title && !!c.title.replace(/\s/g, '');
        /** @type {?} */
        var isOpValid = c.operator && CONDITION_ALL_OPERATORS.indexOf(c.operator) >= 0;
        /** @type {?} */
        var isTypeValid = c.type && CONDITION_TYPES.indexOf(c.type) >= 0;
        /** @type {?} */
        var isFieldValid = c.type === 'field' && c.field;
        /** @type {?} */
        var isTagsValid = c.type === 'tags' && c.tags && isArray(c.tags) && c.tags.length > 0;
        /** @type {?} */
        var isGroupValid = c.type === 'groups' && c.group && isArray(c.group) && c.group.length > 0;
        /** @type {?} */
        var isValueValid = c.type === 'field' && isFieldValid && SIMPLE_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.value;
        /** @type {?} */
        var areValuesValid = c.type === 'field' && isFieldValid && WITH_VALUES_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.values && isArray(c.values) && c.values.length > 0;
        return isTitleValid && isOpValid && isTypeValid && (isGroupValid || isTagsValid || (isFieldValid && (isValueValid || areValuesValid)));
    };
    /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    Conditions.prototype.areEqual = /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    function (c1, c2) {
        if (c1._id && c2._id) {
            return c1._id === c2._id;
        }
        else if (!c1._id && !c2._id) {
            return isEqual(c1, c2);
        }
        else if (c1._id && !c2._id) {
            return isEqual(c2, omit(c1, '_id'));
        }
        else if (!c1._id && c2._id) {
            return isEqual(c1, omit(c2, '_id'));
        }
    };
    Conditions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Conditions.ctorParameters = function () { return []; };
    return Conditions;
}());
export { Conditions };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmRpdGlvbnMvY29uZGl0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0SSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5EO0lBRUU7SUFBZSxDQUFDOzs7O0lBRWhCLHdDQUFtQjs7O0lBQW5CO1FBQ0UsT0FBTyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVELG9DQUFlOzs7O0lBQWYsVUFBZ0IsRUFBVTtRQUN4QixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUM7U0FDYjs7WUFDRyxNQUFNO1FBQ1YsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMzQyxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDbEIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLGFBQWE7Z0JBQ2hCLE1BQU0sR0FBRyxXQUFXLENBQUM7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLElBQUksQ0FB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QUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUM1QixPQUFPLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7Z0JBL0dGLFVBQVU7Ozs7SUFnSFgsaUJBQUM7Q0FBQSxBQWhIRCxJQWdIQztTQS9HWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUNvbmRpdGlvbiwgQ09ORElUSU9OX1RZUEVTLCBDT05ESVRJT05fQUxMX09QRVJBVE9SUywgU0lNUExFX0ZJRUxEX1RZUEVTLCBXSVRIX1ZBTFVFU19GSUVMRF9UWVBFUyB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcblxuaW1wb3J0IHsgZ2V0VVVJRCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IGlzRXF1YWwsIG9taXQsIGlzQXJyYXkgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZW5lcmF0ZUNvbmRpdGlvbklkKCkge1xuICAgIHJldHVybiBnZXRVVUlEKCk7XG4gIH1cblxuICBjb252ZXJ0T3BlcmF0b3Iob3A6IHN0cmluZykge1xuICAgIGlmICghb3ApIHtcbiAgICAgIHJldHVybiAnaW4nO1xuICAgIH1cbiAgICBsZXQgcmV0VmFsO1xuICAgIHN3aXRjaCAob3AudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJycpKSB7XG4gICAgICBjYXNlICdlcXVhbHMnOlxuICAgICAgY2FzZSAnPT0nOlxuICAgICAgY2FzZSAnPT09JzpcbiAgICAgIGNhc2UgJ8OpZ2FsJzpcbiAgICAgICAgcmV0VmFsID0gJ2VxdWFscyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbm90ZXF1YWxzJzpcbiAgICAgIGNhc2UgJyE9JzpcbiAgICAgIGNhc2UgJyE9PSc6XG4gICAgICBjYXNlICdkaWZmw6lyZW50ZGUnOlxuICAgICAgICByZXRWYWwgPSAnbm90ZXF1YWxzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdncmVhdGVydGhhbic6XG4gICAgICBjYXNlICc+PSc6XG4gICAgICBjYXNlICdwbHVzZ3JhbmRxdWUnOlxuICAgICAgICByZXRWYWwgPSAnZ3JlYXRlcnRoYW4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlc3N0aGFuJzpcbiAgICAgIGNhc2UgJzw9JzpcbiAgICAgIGNhc2UgJ3BsdXNwZXRpdHF1ZSc6XG4gICAgICAgIHJldFZhbCA9ICdsZXNzdGhhbic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW4nOlxuICAgICAgY2FzZSAnY29udGllbnQnOlxuICAgICAgY2FzZSAnY29udGFpbnMnOlxuICAgICAgICByZXRWYWwgPSAnaW4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25vdGluJzpcbiAgICAgIGNhc2UgJ25lY29udGllbnRwYXMnOlxuICAgICAgY2FzZSAnbm90Y29udGFpbnMnOlxuICAgICAgICByZXRWYWwgPSAnbm90aW4nO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGNvbnZlcnRUeXBlKHR5cGU6IHN0cmluZykge1xuICAgIGlmICghdHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmV0VmFsO1xuICAgIHN3aXRjaCAodHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnJykpIHtcbiAgICAgIGNhc2UgJ2ZpZWxkJzpcbiAgICAgIGNhc2UgJ2NoYW1wJzpcbiAgICAgICAgcmV0VmFsID0gJ2ZpZWxkJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0YWdzJzpcbiAgICAgICAgcmV0VmFsID0gJ3RhZ3MnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2dyb3Vwcyc6XG4gICAgICBjYXNlICdncm91cGVzJzpcbiAgICAgICAgcmV0VmFsID0gJ2dyb3Vwcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0VmFsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgY29udmVydEZpZWxkKGYpIHtcbiAgICBpZiAoIWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlcyA9IHsgbmFtZTogZi5uYW1lLCB0aXRsZTogZi50aXRsZSwgdHlwZTogZi50eXBlIH07XG4gICAgaWYgKGYudmFsdWVzKSB7XG4gICAgICByZXNbJ3ZhbHVlcyddID0gZi52YWx1ZXM7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBpc1ZhbGlkKGM6IElDb25kaXRpb24pIHtcbiAgICBpZiAoIWMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGlzVGl0bGVWYWxpZCA9IGMudGl0bGUgJiYgISFjLnRpdGxlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgbGV0IGlzT3BWYWxpZCA9IGMub3BlcmF0b3IgJiYgQ09ORElUSU9OX0FMTF9PUEVSQVRPUlMuaW5kZXhPZihjLm9wZXJhdG9yKSA+PSAwO1xuICAgIGxldCBpc1R5cGVWYWxpZCA9IGMudHlwZSAmJiBDT05ESVRJT05fVFlQRVMuaW5kZXhPZihjLnR5cGUpID49IDA7XG4gICAgbGV0IGlzRmllbGRWYWxpZCA9IGMudHlwZSA9PT0gJ2ZpZWxkJyAmJiBjLmZpZWxkO1xuICAgIGxldCBpc1RhZ3NWYWxpZCA9IGMudHlwZSA9PT0gJ3RhZ3MnICYmIGMudGFncyAmJiBpc0FycmF5KGMudGFncykgJiYgYy50YWdzLmxlbmd0aCA+IDA7XG4gICAgbGV0IGlzR3JvdXBWYWxpZCA9IGMudHlwZSA9PT0gJ2dyb3VwcycgJiYgYy5ncm91cCAmJiBpc0FycmF5KGMuZ3JvdXApICYmIGMuZ3JvdXAubGVuZ3RoID4gMDtcbiAgICBsZXQgaXNWYWx1ZVZhbGlkID0gYy50eXBlID09PSAnZmllbGQnICYmIGlzRmllbGRWYWxpZCAmJiBTSU1QTEVfRklFTERfVFlQRVMuaW5kZXhPZihjLmZpZWxkLnR5cGUpID49IDAgJiYgYy52YWx1ZTtcbiAgICBsZXQgYXJlVmFsdWVzVmFsaWQgPSBjLnR5cGUgPT09ICdmaWVsZCcgJiYgaXNGaWVsZFZhbGlkICYmIFdJVEhfVkFMVUVTX0ZJRUxEX1RZUEVTLmluZGV4T2YoYy5maWVsZC50eXBlKSA+PSAwICYmIGMudmFsdWVzICYmIGlzQXJyYXkoYy52YWx1ZXMpICYmIGMudmFsdWVzLmxlbmd0aCA+IDA7XG5cbiAgICByZXR1cm4gaXNUaXRsZVZhbGlkICYmIGlzT3BWYWxpZCAmJiBpc1R5cGVWYWxpZCAmJiAoaXNHcm91cFZhbGlkIHx8IGlzVGFnc1ZhbGlkIHx8IChpc0ZpZWxkVmFsaWQgJiYgKGlzVmFsdWVWYWxpZCB8fCBhcmVWYWx1ZXNWYWxpZCkpKTtcbiAgfVxuXG4gIGFyZUVxdWFsKGMxOiBJQ29uZGl0aW9uLCBjMjogSUNvbmRpdGlvbikge1xuICAgIGlmIChjMS5faWQgJiYgYzIuX2lkKSB7XG4gICAgICByZXR1cm4gYzEuX2lkID09PSBjMi5faWQ7XG4gICAgfSBlbHNlIGlmICghYzEuX2lkICYmICFjMi5faWQpIHtcbiAgICAgIHJldHVybiBpc0VxdWFsKGMxLCBjMik7XG4gICAgfSBlbHNlIGlmIChjMS5faWQgJiYgIWMyLl9pZCkge1xuICAgICAgcmV0dXJuIGlzRXF1YWwoYzIsIG9taXQoYzEsICdfaWQnKSk7XG4gICAgfSBlbHNlIGlmICghYzEuX2lkICYmIGMyLl9pZCkge1xuICAgICAgcmV0dXJuIGlzRXF1YWwoYzEsIG9taXQoYzIsICdfaWQnKSk7XG4gICAgfVxuICB9XG59XG4iXX0=