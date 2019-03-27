/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Editable, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
let CustomFormField = class CustomFormField extends Entity {
};
tslib_1.__decorate([
    Editable('CustomFormField', { type: FormFieldType.text, required: true }),
    tslib_1.__metadata("design:type", String)
], CustomFormField.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('CustomFormField', { type: FormFieldType.textarea }),
    tslib_1.__metadata("design:type", String)
], CustomFormField.prototype, "description", void 0);
tslib_1.__decorate([
    Editable('CustomFormField', {
        type: FormFieldType.autocomplete,
        multiple: true,
        required: true,
        idAttributeName: 'name',
        displayType: 'formfield'
    }),
    tslib_1.__metadata("design:type", Array)
], CustomFormField.prototype, "fields", void 0);
tslib_1.__decorate([
    Editable('CustomFormField', {
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false,
        required: true,
        allowCustomTag: true,
        tag: false
    }),
    tslib_1.__metadata("design:type", String)
], CustomFormField.prototype, "group", void 0);
CustomFormField = tslib_1.__decorate([
    Model({
        className: 'CustomFormField',
        collectionName: 'customFormFields',
        fields: ['*'],
        include: []
    })
], CustomFormField);
export { CustomFormField };
if (false) {
    /** @type {?} */
    CustomFormField.prototype._id;
    /** @type {?} */
    CustomFormField.prototype._acl;
    /** @type {?} */
    CustomFormField.prototype._lmt;
    /** @type {?} */
    CustomFormField.prototype._ect;
    /** @type {?} */
    CustomFormField.prototype.title;
    /** @type {?} */
    CustomFormField.prototype.description;
    /** @type {?} */
    CustomFormField.prototype.fields;
    /** @type {?} */
    CustomFormField.prototype.conditions;
    /** @type {?} */
    CustomFormField.prototype.group;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZvcm0tZmllbGQuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvY3VzdG9tLWZvcm0tZmllbGQvY3VzdG9tLWZvcm0tZmllbGQuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBbUIsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztJQVEvQyxlQUFlLFNBQWYsZUFBZ0IsU0FBUSxNQUFNO0NBdUMxQyxDQUFBO0FBL0JDO0lBREMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDNUQ7QUFHZDtJQURDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7O29EQUMxQztBQVNwQjtJQVBDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMzQixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLFdBQVcsRUFBRSxXQUFXO0tBQ3pCLENBQUM7c0NBQ00sS0FBSzsrQ0FBYTtBQWtCMUI7SUFkQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDM0IsS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsY0FBYyxFQUFFLFFBQVE7UUFDeEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNySSxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1FBQ2hDLE1BQU0sRUFBRSxJQUFJO1FBQ1osWUFBWSxFQUFFLGtCQUFrQjtRQUNoQyxRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLElBQUk7UUFDcEIsR0FBRyxFQUFFLEtBQUs7S0FDWCxDQUFDOzs4Q0FDWTtBQXRDSCxlQUFlO0lBTjNCLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxpQkFBaUI7UUFDNUIsY0FBYyxFQUFFLGtCQUFrQjtRQUNsQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDVyxlQUFlLENBdUMzQjtTQXZDWSxlQUFlOzs7SUFFMUIsOEJBQVk7O0lBQ1osK0JBQVc7O0lBQ1gsK0JBQWM7O0lBQ2QsK0JBQWM7O0lBRWQsZ0NBQ2M7O0lBRWQsc0NBQ29COztJQUVwQixpQ0FPMEI7O0lBRTFCLHFDQUE2Qjs7SUFFN0IsZ0NBY2MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIElBY2wsIENvbmRpdGlvbiwgTW9kZWwsIEVkaXRhYmxlLCBnZXRHcm91cHNUcmFuc2Zvcm0gfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJRm9ybUZpZWxkIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQ3VzdG9tRm9ybUZpZWxkJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdjdXN0b21Gb3JtRmllbGRzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tRm9ybUZpZWxkIGV4dGVuZHMgRW50aXR5IHtcbiAgLy8gZXhwb3J0IGNsYXNzIEN1c3RvbUZvcm1GaWVsZCBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBfaWQ6IHN0cmluZztcbiAgX2FjbDogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1c3RvbUZvcm1GaWVsZCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCByZXF1aXJlZDogdHJ1ZSB9KVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tRm9ybUZpZWxkJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDdXN0b21Gb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgaWRBdHRyaWJ1dGVOYW1lOiAnbmFtZScsXG4gICAgZGlzcGxheVR5cGU6ICdmb3JtZmllbGQnXG4gIH0pXG4gIGZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD47XG5cbiAgY29uZGl0aW9uczogQXJyYXk8Q29uZGl0aW9uPjtcblxuICBARWRpdGFibGUoJ0N1c3RvbUZvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgdGFnOiBmYWxzZVxuICB9KVxuICBncm91cDogc3RyaW5nO1xufVxuIl19