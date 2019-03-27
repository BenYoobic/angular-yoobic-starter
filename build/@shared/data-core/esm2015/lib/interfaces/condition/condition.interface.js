/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { MOBILE_FORM_FIELDS_ALL, FormFieldType, ICondition, IConditionalField } from '@shared/stencil';
import { Editable } from '../../decorators/editable/editable.decorator';
import { Model } from '../../decorators/model/model.decorator';
import { CONDITION_TYPES, ROLES, ROLES_ASK, ROLES_CONDITIONS } from './icondition.interface';
import { map } from 'lodash-es';
export { CONDITION_TYPES, ROLES, ROLES_ASK, ROLES_CONDITIONS };
/** @type {?} */
let conditions = {
    isNotField: 'type!="field"',
    isField: 'type=="field"',
    isTag: 'type=="tags"',
    isGroup: 'type=="groups"',
    isSelect: 'field.type=="selectmulti" or field.type=="selectbuttonsmulti"',
    isToggle: 'field.type=="checkbox" or field.type=="toggle"',
    isAutocomplete: 'field.type=="select" or field.type=="selectbuttons" or field.type=="autocomplete"',
    isFieldSimple: 'type=="field" and (field.type=="text" or field.type=="email" or field.type=="number" or field.type=="formula" or field.type=="date" or field.type=="tel" or field.type=="time" or field.type=="range" or field.type=="starrating")',
    isFieldWithValues: 'type=="field" and (field.type=="checkbox" or field.type=="toggle" or field.type=="select" or field.type=="selectmulti" or field.type=="selectbuttons" or field.type=="selectbuttonsmulti" or field.type=="autocomplete" or field.type=="selectimage")'
};
/**
 * @param {?} res
 * @return {?}
 */
export function getGroupsTransform(res) {
    if (res.data && res.data.filter) {
        res.data = res.data.filter((/**
         * @param {?} g
         * @return {?}
         */
        g => ROLES.indexOf(g._id) < 0 && g.isRole !== true));
    }
    return res;
}
/**
 * @param {?} m
 * @return {?}
 */
export function isNotInformationField(m) {
    return m.type !== FormFieldType.information;
}
/**
 * @return {?}
 */
export function getFormFieldValues() {
    return map(MOBILE_FORM_FIELDS_ALL.filter(isNotInformationField), 'type');
}
let Condition = class Condition extends ICondition {
};
tslib_1.__decorate([
    Editable('Condition', { type: FormFieldType.text, required: true }),
    tslib_1.__metadata("design:type", String)
], Condition.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        type: FormFieldType.autocomplete,
        translate: true,
        values: CONDITION_TYPES,
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], Condition.prototype, "type", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        type: FormFieldType.autocomplete,
        condition: conditions.isField,
        required: true,
        idAttributeName: 'name'
    }),
    tslib_1.__metadata("design:type", Object)
], Condition.prototype, "field", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        type: FormFieldType.autocomplete,
        required: true,
        multiple: false,
        translate: true,
        condition: 'type',
        conditionalValues: [{ condition: conditions.isNotField, values: ['in', 'notin'] }, { condition: conditions.isSelect, values: ['in', 'notin'] }, { condition: conditions.isToggle, values: ['equals', 'notequals'] }, { condition: conditions.isAutocomplete, values: ['equals', 'in', 'notin'] }],
        defaultValues: ['equals', 'notequals', 'greaterthan', 'lessthan']
    }),
    tslib_1.__metadata("design:type", String)
], Condition.prototype, "operator", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        type: FormFieldType.autocomplete,
        condition: conditions.isTag,
        tag: true,
        multiple: true,
        collectionName: 'locations',
        required: true
    }),
    tslib_1.__metadata("design:type", Array)
], Condition.prototype, "tags", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        title: 'GROUPS',
        required: true,
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        condition: conditions.isGroup,
        multiple: true,
        clearable: false
    }),
    tslib_1.__metadata("design:type", Array)
], Condition.prototype, "group", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        type: FormFieldType.autocomplete,
        required: true,
        condition: conditions.isFieldWithValues,
        dynamicValues: 'field.values',
        defaultValues: ['true', 'false'],
        multiple: true
    }),
    tslib_1.__metadata("design:type", Array)
], Condition.prototype, "values", void 0);
tslib_1.__decorate([
    Editable('Condition', {
        dynamicType: 'field.type',
        defaultType: FormFieldType.text,
        required: true,
        condition: conditions.isFieldSimple
    }),
    tslib_1.__metadata("design:type", Object)
], Condition.prototype, "value", void 0);
Condition = tslib_1.__decorate([
    Model({ className: 'Condition' })
], Condition);
export { Condition };
if (false) {
    /** @type {?} */
    Condition.prototype.title;
    /** @type {?} */
    Condition.prototype.type;
    /** @type {?} */
    Condition.prototype.field;
    /** @type {?} */
    Condition.prototype.operator;
    /** @type {?} */
    Condition.prototype.tags;
    /** @type {?} */
    Condition.prototype.group;
    /** @type {?} */
    Condition.prototype.values;
    /** @type {?} */
    Condition.prototype.value;
}
let ConditionalField = class ConditionalField extends IConditionalField {
};
tslib_1.__decorate([
    Editable('ConditionalField', { type: FormFieldType.text, readonly: true, title: 'FIELDIF' }),
    tslib_1.__metadata("design:type", String)
], ConditionalField.prototype, "fieldTitle", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', {
        type: FormFieldType.autocomplete,
        required: true,
        multiple: false,
        translate: true,
        title: 'FIELDIS',
        conditionalValues: [{ condition: conditions.isNotField, values: ['in', 'notin'] }, { condition: conditions.isSelect, values: ['in', 'notin'] }, { condition: conditions.isToggle, values: ['equals', 'notequals'] }, { condition: conditions.isAutocomplete, values: ['equals', 'in', 'notin'] }],
        defaultValues: ['equals', 'notequals', 'greaterthan', 'lessthan']
    }),
    tslib_1.__metadata("design:type", String)
], ConditionalField.prototype, "operator", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', {
        type: FormFieldType.autocomplete,
        required: true,
        condition: conditions.isFieldWithValues,
        dynamicValues: 'field.values',
        defaultValues: ['true', 'false'],
        multiple: true
    }),
    tslib_1.__metadata("design:type", Array)
], ConditionalField.prototype, "values", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', {
        dynamicType: 'field.type',
        defaultType: FormFieldType.text,
        required: true,
        condition: conditions.isFieldSimple
    }),
    tslib_1.__metadata("design:type", Object)
], ConditionalField.prototype, "value", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', {
        type: FormFieldType.autocomplete,
        required: true,
        title: 'FIELDTYPE',
        values: getFormFieldValues(),
        translate: true
    }),
    tslib_1.__metadata("design:type", String)
], ConditionalField.prototype, "newFieldType", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', { type: FormFieldType.text, required: true, title: 'TITLE' }),
    tslib_1.__metadata("design:type", String)
], ConditionalField.prototype, "newfieldTitle", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', { title: 'INSTRUCTIONS', type: FormFieldType.textarea }),
    tslib_1.__metadata("design:type", String)
], ConditionalField.prototype, "newfieldDescription", void 0);
tslib_1.__decorate([
    Editable('ConditionalField', { title: 'MANDATORY', type: FormFieldType.checkbox }),
    tslib_1.__metadata("design:type", Boolean)
], ConditionalField.prototype, "newFieldRequired", void 0);
ConditionalField = tslib_1.__decorate([
    Model({ className: 'ConditionalField' })
], ConditionalField);
export { ConditionalField };
if (false) {
    /** @type {?} */
    ConditionalField.prototype.fieldTitle;
    /** @type {?} */
    ConditionalField.prototype.operator;
    /** @type {?} */
    ConditionalField.prototype.values;
    /** @type {?} */
    ConditionalField.prototype.value;
    /** @type {?} */
    ConditionalField.prototype.newFieldType;
    /** @type {?} */
    ConditionalField.prototype.newfieldTitle;
    /** @type {?} */
    ConditionalField.prototype.newfieldDescription;
    /** @type {?} */
    ConditionalField.prototype.newFieldRequired;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLHNCQUFzQixFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVuSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzdGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUM7O0lBRTNELFVBQVUsR0FBRztJQUNmLFVBQVUsRUFBRSxlQUFlO0lBQzNCLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsUUFBUSxFQUFFLCtEQUErRDtJQUN6RSxRQUFRLEVBQUUsZ0RBQWdEO0lBQzFELGNBQWMsRUFBRSxtRkFBbUY7SUFDbkcsYUFBYSxFQUFFLG9PQUFvTztJQUNuUCxpQkFBaUIsRUFBRSx1UEFBdVA7Q0FDM1E7Ozs7O0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQW1CO0lBQ3BELElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUMvQixHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxF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WyJpbXBvcnQgeyBJRm9ybUZpZWxkLCBNT0JJTEVfRk9STV9GSUVMRFNfQUxMLCBGb3JtRmllbGRUeXBlLCBJQ29uZGl0aW9uLCBJQ29uZGl0aW9uYWxGaWVsZCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBDT05ESVRJT05fVFlQRVMsIFJPTEVTLCBST0xFU19BU0ssIFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuL2ljb25kaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqZWN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5cbmltcG9ydCB7IG1hcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmV4cG9ydCB7IENPTkRJVElPTl9UWVBFUywgUk9MRVMsIFJPTEVTX0FTSywgUk9MRVNfQ09ORElUSU9OUyB9O1xuXG5sZXQgY29uZGl0aW9ucyA9IHtcbiAgaXNOb3RGaWVsZDogJ3R5cGUhPVwiZmllbGRcIicsXG4gIGlzRmllbGQ6ICd0eXBlPT1cImZpZWxkXCInLFxuICBpc1RhZzogJ3R5cGU9PVwidGFnc1wiJyxcbiAgaXNHcm91cDogJ3R5cGU9PVwiZ3JvdXBzXCInLFxuICBpc1NlbGVjdDogJ2ZpZWxkLnR5cGU9PVwic2VsZWN0bXVsdGlcIiBvciBmaWVsZC50eXBlPT1cInNlbGVjdGJ1dHRvbnNtdWx0aVwiJyxcbiAgaXNUb2dnbGU6ICdmaWVsZC50eXBlPT1cImNoZWNrYm94XCIgb3IgZmllbGQudHlwZT09XCJ0b2dnbGVcIicsXG4gIGlzQXV0b2NvbXBsZXRlOiAnZmllbGQudHlwZT09XCJzZWxlY3RcIiBvciBmaWVsZC50eXBlPT1cInNlbGVjdGJ1dHRvbnNcIiBvciBmaWVsZC50eXBlPT1cImF1dG9jb21wbGV0ZVwiJyxcbiAgaXNGaWVsZFNpbXBsZTogJ3R5cGU9PVwiZmllbGRcIiBhbmQgKGZpZWxkLnR5cGU9PVwidGV4dFwiIG9yIGZpZWxkLnR5cGU9PVwiZW1haWxcIiBvciBmaWVsZC50eXBlPT1cIm51bWJlclwiIG9yIGZpZWxkLnR5cGU9PVwiZm9ybXVsYVwiIG9yIGZpZWxkLnR5cGU9PVwiZGF0ZVwiIG9yIGZpZWxkLnR5cGU9PVwidGVsXCIgb3IgZmllbGQudHlwZT09XCJ0aW1lXCIgb3IgZmllbGQudHlwZT09XCJyYW5nZVwiIG9yIGZpZWxkLnR5cGU9PVwic3RhcnJhdGluZ1wiKScsXG4gIGlzRmllbGRXaXRoVmFsdWVzOiAndHlwZT09XCJmaWVsZFwiIGFuZCAoZmllbGQudHlwZT09XCJjaGVja2JveFwiIG9yIGZpZWxkLnR5cGU9PVwidG9nZ2xlXCIgb3IgZmllbGQudHlwZT09XCJzZWxlY3RcIiBvciBmaWVsZC50eXBlPT1cInNlbGVjdG11bHRpXCIgb3IgZmllbGQudHlwZT09XCJzZWxlY3RidXR0b25zXCIgb3IgZmllbGQudHlwZT09XCJzZWxlY3RidXR0b25zbXVsdGlcIiBvciBmaWVsZC50eXBlPT1cImF1dG9jb21wbGV0ZVwiIG9yIGZpZWxkLnR5cGU9PVwic2VsZWN0aW1hZ2VcIiknXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JvdXBzVHJhbnNmb3JtKHJlczogUmVzcG9uc2VPYmplY3QpIHtcbiAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmZpbHRlcikge1xuICAgIHJlcy5kYXRhID0gcmVzLmRhdGEuZmlsdGVyKGcgPT4gUk9MRVMuaW5kZXhPZihnLl9pZCkgPCAwICYmIGcuaXNSb2xlICE9PSB0cnVlKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RJbmZvcm1hdGlvbkZpZWxkKG0pIHtcbiAgcmV0dXJuIG0udHlwZSAhPT0gRm9ybUZpZWxkVHlwZS5pbmZvcm1hdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1GaWVsZFZhbHVlcygpIHtcbiAgcmV0dXJuIG1hcChNT0JJTEVfRk9STV9GSUVMRFNfQUxMLmZpbHRlcihpc05vdEluZm9ybWF0aW9uRmllbGQpLCAndHlwZScpO1xufVxuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdDb25kaXRpb24nIH0pXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uIGV4dGVuZHMgSUNvbmRpdGlvbiB7XG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIHJlcXVpcmVkOiB0cnVlIH0pXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDb25kaXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHZhbHVlczogQ09ORElUSU9OX1RZUEVTLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIHR5cGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NvbmRpdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNGaWVsZCxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBpZEF0dHJpYnV0ZU5hbWU6ICduYW1lJ1xuICB9KVxuICBmaWVsZD86IElGb3JtRmllbGQ7XG5cbiAgLy8geyBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNTZWxlY3QsIHZhbHVlczogWydpbicsICdub3RpbicsICdjb250YWluc2FsbCddIH1cbiAgLy8gY29udGFpbnMgYWxsIDogY2hlY2sgdGhhdCBhbGwgdmFsdWVzIGFyZSBwcmVzZW50LlxuICAvLyBEZWFjdGl2YXRlZCBmb3IgdGhlIG1vbWVudCB0byBiZSBjb21wYXRpYmxlIHdpdGggdGhlIFYyXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgY29uZGl0aW9uOiAndHlwZScsXG4gICAgY29uZGl0aW9uYWxWYWx1ZXM6IFt7IGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEZpZWxkLCB2YWx1ZXM6IFsnaW4nLCAnbm90aW4nXSB9LCB7IGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlbGVjdCwgdmFsdWVzOiBbJ2luJywgJ25vdGluJ10gfSwgeyBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNUb2dnbGUsIHZhbHVlczogWydlcXVhbHMnLCAnbm90ZXF1YWxzJ10gfSwgeyBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBdXRvY29tcGxldGUsIHZhbHVlczogWydlcXVhbHMnLCAnaW4nLCAnbm90aW4nXSB9XSxcbiAgICBkZWZhdWx0VmFsdWVzOiBbJ2VxdWFscycsICdub3RlcXVhbHMnLCAnZ3JlYXRlcnRoYW4nLCAnbGVzc3RoYW4nXVxuICB9KVxuICBvcGVyYXRvcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1RhZyxcbiAgICB0YWc6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIHRhZ3M/OiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uJywge1xuICAgIHRpdGxlOiAnR1JPVVBTJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnaXNSb2xlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9LCB7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgbWFwVHJhbnNmb3JtOiBnZXRHcm91cHNUcmFuc2Zvcm0sXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzR3JvdXAsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICBncm91cD86IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdDb25kaXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzRmllbGRXaXRoVmFsdWVzLFxuICAgIGR5bmFtaWNWYWx1ZXM6ICdmaWVsZC52YWx1ZXMnLFxuICAgIGRlZmF1bHRWYWx1ZXM6IFsndHJ1ZScsICdmYWxzZSddLFxuICAgIG11bHRpcGxlOiB0cnVlXG4gIH0pXG4gIHZhbHVlczogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0NvbmRpdGlvbicsIHtcbiAgICBkeW5hbWljVHlwZTogJ2ZpZWxkLnR5cGUnLFxuICAgIGRlZmF1bHRUeXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzRmllbGRTaW1wbGVcbiAgfSlcbiAgdmFsdWU6IGFueTtcbn1cblxuQE1vZGVsKHsgY2xhc3NOYW1lOiAnQ29uZGl0aW9uYWxGaWVsZCcgfSlcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbEZpZWxkIGV4dGVuZHMgSUNvbmRpdGlvbmFsRmllbGQge1xuICBARWRpdGFibGUoJ0NvbmRpdGlvbmFsRmllbGQnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgcmVhZG9ubHk6IHRydWUsIHRpdGxlOiAnRklFTERJRicgfSlcbiAgZmllbGRUaXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uYWxGaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHRpdGxlOiAnRklFTERJUycsXG4gICAgY29uZGl0aW9uYWxWYWx1ZXM6IFt7IGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdEZpZWxkLCB2YWx1ZXM6IFsnaW4nLCAnbm90aW4nXSB9LCB7IGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlbGVjdCwgdmFsdWVzOiBbJ2luJywgJ25vdGluJ10gfSwgeyBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNUb2dnbGUsIHZhbHVlczogWydlcXVhbHMnLCAnbm90ZXF1YWxzJ10gfSwgeyBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBdXRvY29tcGxldGUsIHZhbHVlczogWydlcXVhbHMnLCAnaW4nLCAnbm90aW4nXSB9XSxcbiAgICBkZWZhdWx0VmFsdWVzOiBbJ2VxdWFscycsICdub3RlcXVhbHMnLCAnZ3JlYXRlcnRoYW4nLCAnbGVzc3RoYW4nXVxuICB9KVxuICBvcGVyYXRvcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uYWxGaWVsZCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNGaWVsZFdpdGhWYWx1ZXMsXG4gICAgZHluYW1pY1ZhbHVlczogJ2ZpZWxkLnZhbHVlcycsXG4gICAgZGVmYXVsdFZhbHVlczogWyd0cnVlJywgJ2ZhbHNlJ10sXG4gICAgbXVsdGlwbGU6IHRydWVcbiAgfSlcbiAgdmFsdWVzOiBBcnJheTxhbnk+O1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uYWxGaWVsZCcsIHtcbiAgICBkeW5hbWljVHlwZTogJ2ZpZWxkLnR5cGUnLFxuICAgIGRlZmF1bHRUeXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzRmllbGRTaW1wbGVcbiAgfSlcbiAgdmFsdWU6IGFueTtcblxuICBARWRpdGFibGUoJ0NvbmRpdGlvbmFsRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdGSUVMRFRZUEUnLFxuICAgIHZhbHVlczogZ2V0Rm9ybUZpZWxkVmFsdWVzKCksXG4gICAgdHJhbnNsYXRlOiB0cnVlXG4gIH0pXG4gIG5ld0ZpZWxkVHlwZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uYWxGaWVsZCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCByZXF1aXJlZDogdHJ1ZSwgdGl0bGU6ICdUSVRMRScgfSlcbiAgbmV3ZmllbGRUaXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ29uZGl0aW9uYWxGaWVsZCcsIHsgdGl0bGU6ICdJTlNUUlVDVElPTlMnLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIG5ld2ZpZWxkRGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0NvbmRpdGlvbmFsRmllbGQnLCB7IHRpdGxlOiAnTUFOREFUT1JZJywgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCB9KVxuICBuZXdGaWVsZFJlcXVpcmVkOiBib29sZWFuO1xufVxuIl19