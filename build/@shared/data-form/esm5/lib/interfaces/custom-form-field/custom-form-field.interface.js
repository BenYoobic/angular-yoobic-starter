/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Editable, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
var CustomFormField = /** @class */ (function (_super) {
    tslib_1.__extends(CustomFormField, _super);
    function CustomFormField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return CustomFormField;
}(Entity));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWZvcm0tZmllbGQuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvY3VzdG9tLWZvcm0tZmllbGQvY3VzdG9tLWZvcm0tZmllbGQuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBbUIsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQzs7SUFRdkIsMkNBQU07OztJQXVDM0MsQ0FBQztJQS9CQztRQURDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQzVEO0lBR2Q7UUFEQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDOzt3REFDMUM7SUFTcEI7UUFQQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxlQUFlLEVBQUUsTUFBTTtZQUN2QixXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDOzBDQUNNLEtBQUs7bURBQWE7SUFrQjFCO1FBZEMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckksWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUNoQyxNQUFNLEVBQUUsSUFBSTtZQUNaLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEdBQUcsRUFBRSxLQUFLO1NBQ1gsQ0FBQzs7a0RBQ1k7SUF0Q0gsZUFBZTtRQU4zQixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO09BQ1csZUFBZSxDQXVDM0I7SUFBRCxzQkFBQztDQUFBLENBdkNvQyxNQUFNLEdBdUMxQztTQXZDWSxlQUFlOzs7SUFFMUIsOEJBQVk7O0lBQ1osK0JBQVc7O0lBQ1gsK0JBQWM7O0lBQ2QsK0JBQWM7O0lBRWQsZ0NBQ2M7O0lBRWQsc0NBQ29COztJQUVwQixpQ0FPMEI7O0lBRTFCLHFDQUE2Qjs7SUFFN0IsZ0NBY2MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIElBY2wsIENvbmRpdGlvbiwgTW9kZWwsIEVkaXRhYmxlLCBnZXRHcm91cHNUcmFuc2Zvcm0gfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJRm9ybUZpZWxkIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQ3VzdG9tRm9ybUZpZWxkJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdjdXN0b21Gb3JtRmllbGRzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tRm9ybUZpZWxkIGV4dGVuZHMgRW50aXR5IHtcbiAgLy8gZXhwb3J0IGNsYXNzIEN1c3RvbUZvcm1GaWVsZCBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBfaWQ6IHN0cmluZztcbiAgX2FjbDogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1c3RvbUZvcm1GaWVsZCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCByZXF1aXJlZDogdHJ1ZSB9KVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tRm9ybUZpZWxkJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDdXN0b21Gb3JtRmllbGQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgaWRBdHRyaWJ1dGVOYW1lOiAnbmFtZScsXG4gICAgZGlzcGxheVR5cGU6ICdmb3JtZmllbGQnXG4gIH0pXG4gIGZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD47XG5cbiAgY29uZGl0aW9uczogQXJyYXk8Q29uZGl0aW9uPjtcblxuICBARWRpdGFibGUoJ0N1c3RvbUZvcm1GaWVsZCcsIHtcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgdGFnOiBmYWxzZVxuICB9KVxuICBncm91cDogc3RyaW5nO1xufVxuIl19