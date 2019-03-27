/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CONDITION_TYPES, CONDITION_ALL_OPERATORS, SIMPLE_FIELD_TYPES, WITH_VALUES_FIELD_TYPES } from '@shared/data-core';
import { getUUID } from '@shared/stencil';
import { isEqual, omit, isArray } from 'lodash-es';
export class Conditions {
    constructor() { }
    /**
     * @return {?}
     */
    generateConditionId() {
        return getUUID();
    }
    /**
     * @param {?} op
     * @return {?}
     */
    convertOperator(op) {
        if (!op) {
            return 'in';
        }
        /** @type {?} */
        let retVal;
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
    }
    /**
     * @param {?} type
     * @return {?}
     */
    convertType(type) {
        if (!type) {
            return;
        }
        /** @type {?} */
        let retVal;
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
    }
    /**
     * @param {?} f
     * @return {?}
     */
    convertField(f) {
        if (!f) {
            return;
        }
        /** @type {?} */
        let res = { name: f.name, title: f.title, type: f.type };
        if (f.values) {
            res['values'] = f.values;
        }
        return res;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    isValid(c) {
        if (!c) {
            return false;
        }
        /** @type {?} */
        let isTitleValid = c.title && !!c.title.replace(/\s/g, '');
        /** @type {?} */
        let isOpValid = c.operator && CONDITION_ALL_OPERATORS.indexOf(c.operator) >= 0;
        /** @type {?} */
        let isTypeValid = c.type && CONDITION_TYPES.indexOf(c.type) >= 0;
        /** @type {?} */
        let isFieldValid = c.type === 'field' && c.field;
        /** @type {?} */
        let isTagsValid = c.type === 'tags' && c.tags && isArray(c.tags) && c.tags.length > 0;
        /** @type {?} */
        let isGroupValid = c.type === 'groups' && c.group && isArray(c.group) && c.group.length > 0;
        /** @type {?} */
        let isValueValid = c.type === 'field' && isFieldValid && SIMPLE_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.value;
        /** @type {?} */
        let areValuesValid = c.type === 'field' && isFieldValid && WITH_VALUES_FIELD_TYPES.indexOf(c.field.type) >= 0 && c.values && isArray(c.values) && c.values.length > 0;
        return isTitleValid && isOpValid && isTypeValid && (isGroupValid || isTagsValid || (isFieldValid && (isValueValid || areValuesValid)));
    }
    /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    areEqual(c1, c2) {
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
    }
}
Conditions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Conditions.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmRpdGlvbnMvY29uZGl0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0SSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBR25ELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLGdCQUFlLENBQUM7Ozs7SUFFaEIsbUJBQW1CO1FBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsRUFBVTtRQUN4QixJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUM7U0FDYjs7WUFDRyxNQUFNO1FBQ1YsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMzQyxLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxHQUFHLFFBQVEsQ0FBQztnQkFDbEIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssSUFBSSxDQUFDO1lBQ1YsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLGFBQWE7Z0JBQ2hCLE1BQU0sR0FBRyxXQUFXLENBQUM7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLElBQUksQ0FB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O1lBQzVCLE9BQU8sT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7WUEvR0YsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDb25kaXRpb24sIENPTkRJVElPTl9UWVBFUywgQ09ORElUSU9OX0FMTF9PUEVSQVRPUlMsIFNJTVBMRV9GSUVMRF9UWVBFUywgV0lUSF9WQUxVRVNfRklFTERfVFlQRVMgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5cbmltcG9ydCB7IGdldFVVSUQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBpc0VxdWFsLCBvbWl0LCBpc0FycmF5IH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbnMge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2VuZXJhdGVDb25kaXRpb25JZCgpIHtcbiAgICByZXR1cm4gZ2V0VVVJRCgpO1xuICB9XG5cbiAgY29udmVydE9wZXJhdG9yKG9wOiBzdHJpbmcpIHtcbiAgICBpZiAoIW9wKSB7XG4gICAgICByZXR1cm4gJ2luJztcbiAgICB9XG4gICAgbGV0IHJldFZhbDtcbiAgICBzd2l0Y2ggKG9wLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csICcnKSkge1xuICAgICAgY2FzZSAnZXF1YWxzJzpcbiAgICAgIGNhc2UgJz09JzpcbiAgICAgIGNhc2UgJz09PSc6XG4gICAgICBjYXNlICfDqWdhbCc6XG4gICAgICAgIHJldFZhbCA9ICdlcXVhbHMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25vdGVxdWFscyc6XG4gICAgICBjYXNlICchPSc6XG4gICAgICBjYXNlICchPT0nOlxuICAgICAgY2FzZSAnZGlmZsOpcmVudGRlJzpcbiAgICAgICAgcmV0VmFsID0gJ25vdGVxdWFscyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZ3JlYXRlcnRoYW4nOlxuICAgICAgY2FzZSAnPj0nOlxuICAgICAgY2FzZSAncGx1c2dyYW5kcXVlJzpcbiAgICAgICAgcmV0VmFsID0gJ2dyZWF0ZXJ0aGFuJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZXNzdGhhbic6XG4gICAgICBjYXNlICc8PSc6XG4gICAgICBjYXNlICdwbHVzcGV0aXRxdWUnOlxuICAgICAgICByZXRWYWwgPSAnbGVzc3RoYW4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2luJzpcbiAgICAgIGNhc2UgJ2NvbnRpZW50JzpcbiAgICAgIGNhc2UgJ2NvbnRhaW5zJzpcbiAgICAgICAgcmV0VmFsID0gJ2luJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdub3Rpbic6XG4gICAgICBjYXNlICduZWNvbnRpZW50cGFzJzpcbiAgICAgIGNhc2UgJ25vdGNvbnRhaW5zJzpcbiAgICAgICAgcmV0VmFsID0gJ25vdGluJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBjb252ZXJ0VHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJldFZhbDtcbiAgICBzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJycpKSB7XG4gICAgICBjYXNlICdmaWVsZCc6XG4gICAgICBjYXNlICdjaGFtcCc6XG4gICAgICAgIHJldFZhbCA9ICdmaWVsZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGFncyc6XG4gICAgICAgIHJldFZhbCA9ICd0YWdzJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdncm91cHMnOlxuICAgICAgY2FzZSAnZ3JvdXBlcyc6XG4gICAgICAgIHJldFZhbCA9ICdncm91cHMnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldFZhbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGNvbnZlcnRGaWVsZChmKSB7XG4gICAgaWYgKCFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCByZXMgPSB7IG5hbWU6IGYubmFtZSwgdGl0bGU6IGYudGl0bGUsIHR5cGU6IGYudHlwZSB9O1xuICAgIGlmIChmLnZhbHVlcykge1xuICAgICAgcmVzWyd2YWx1ZXMnXSA9IGYudmFsdWVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgaXNWYWxpZChjOiBJQ29uZGl0aW9uKSB7XG4gICAgaWYgKCFjKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBpc1RpdGxlVmFsaWQgPSBjLnRpdGxlICYmICEhYy50aXRsZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIGxldCBpc09wVmFsaWQgPSBjLm9wZXJhdG9yICYmIENPTkRJVElPTl9BTExfT1BFUkFUT1JTLmluZGV4T2YoYy5vcGVyYXRvcikgPj0gMDtcbiAgICBsZXQgaXNUeXBlVmFsaWQgPSBjLnR5cGUgJiYgQ09ORElUSU9OX1RZUEVTLmluZGV4T2YoYy50eXBlKSA+PSAwO1xuICAgIGxldCBpc0ZpZWxkVmFsaWQgPSBjLnR5cGUgPT09ICdmaWVsZCcgJiYgYy5maWVsZDtcbiAgICBsZXQgaXNUYWdzVmFsaWQgPSBjLnR5cGUgPT09ICd0YWdzJyAmJiBjLnRhZ3MgJiYgaXNBcnJheShjLnRhZ3MpICYmIGMudGFncy5sZW5ndGggPiAwO1xuICAgIGxldCBpc0dyb3VwVmFsaWQgPSBjLnR5cGUgPT09ICdncm91cHMnICYmIGMuZ3JvdXAgJiYgaXNBcnJheShjLmdyb3VwKSAmJiBjLmdyb3VwLmxlbmd0aCA+IDA7XG4gICAgbGV0IGlzVmFsdWVWYWxpZCA9IGMudHlwZSA9PT0gJ2ZpZWxkJyAmJiBpc0ZpZWxkVmFsaWQgJiYgU0lNUExFX0ZJRUxEX1RZUEVTLmluZGV4T2YoYy5maWVsZC50eXBlKSA+PSAwICYmIGMudmFsdWU7XG4gICAgbGV0IGFyZVZhbHVlc1ZhbGlkID0gYy50eXBlID09PSAnZmllbGQnICYmIGlzRmllbGRWYWxpZCAmJiBXSVRIX1ZBTFVFU19GSUVMRF9UWVBFUy5pbmRleE9mKGMuZmllbGQudHlwZSkgPj0gMCAmJiBjLnZhbHVlcyAmJiBpc0FycmF5KGMudmFsdWVzKSAmJiBjLnZhbHVlcy5sZW5ndGggPiAwO1xuXG4gICAgcmV0dXJuIGlzVGl0bGVWYWxpZCAmJiBpc09wVmFsaWQgJiYgaXNUeXBlVmFsaWQgJiYgKGlzR3JvdXBWYWxpZCB8fCBpc1RhZ3NWYWxpZCB8fCAoaXNGaWVsZFZhbGlkICYmIChpc1ZhbHVlVmFsaWQgfHwgYXJlVmFsdWVzVmFsaWQpKSk7XG4gIH1cblxuICBhcmVFcXVhbChjMTogSUNvbmRpdGlvbiwgYzI6IElDb25kaXRpb24pIHtcbiAgICBpZiAoYzEuX2lkICYmIGMyLl9pZCkge1xuICAgICAgcmV0dXJuIGMxLl9pZCA9PT0gYzIuX2lkO1xuICAgIH0gZWxzZSBpZiAoIWMxLl9pZCAmJiAhYzIuX2lkKSB7XG4gICAgICByZXR1cm4gaXNFcXVhbChjMSwgYzIpO1xuICAgIH0gZWxzZSBpZiAoYzEuX2lkICYmICFjMi5faWQpIHtcbiAgICAgIHJldHVybiBpc0VxdWFsKGMyLCBvbWl0KGMxLCAnX2lkJykpO1xuICAgIH0gZWxzZSBpZiAoIWMxLl9pZCAmJiBjMi5faWQpIHtcbiAgICAgIHJldHVybiBpc0VxdWFsKGMxLCBvbWl0KGMyLCAnX2lkJykpO1xuICAgIH1cbiAgfVxufVxuIl19