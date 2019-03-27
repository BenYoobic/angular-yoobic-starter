/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model, Searchable, Editable, getGroupsTransform, FORM_FILES_IMAGE_FILTER } from '@shared/data-core';
import { FormFieldType, ICustomModel } from '@shared/stencil';
/** @type {?} */
let conditions = {
    isAllowInventory: 'allowInventory == 1'
};
let CustomModel = class CustomModel extends ICustomModel {
};
tslib_1.__decorate([
    Editable('CustomModel', { type: FormFieldType.text, visible: false }),
    tslib_1.__metadata("design:type", String)
], CustomModel.prototype, "_id", void 0);
tslib_1.__decorate([
    Editable('CustomModel', { required: true, type: FormFieldType.text }),
    Searchable('CustomModel'),
    tslib_1.__metadata("design:type", String)
], CustomModel.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('CustomModel', { required: true, type: FormFieldType.text }),
    Searchable('CustomModel'),
    tslib_1.__metadata("design:type", String)
], CustomModel.prototype, "name", void 0);
tslib_1.__decorate([
    Editable('CustomModel', { required: false, type: FormFieldType.textarea }),
    Searchable('CustomModel'),
    tslib_1.__metadata("design:type", String)
], CustomModel.prototype, "shortDescription", void 0);
tslib_1.__decorate([
    Editable('CustomModel', {
        required: true,
        flex: 100,
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false
    }),
    tslib_1.__metadata("design:type", Array)
], CustomModel.prototype, "group", void 0);
tslib_1.__decorate([
    Editable('CustomModel', {
        type: FormFieldType.checkbox,
        flex: 100,
        title: 'INVENTORY',
        columnDefinition: { width: 80 }
    }),
    tslib_1.__metadata("design:type", Boolean)
], CustomModel.prototype, "allowInventory", void 0);
tslib_1.__decorate([
    Editable('CustomModel', {
        type: FormFieldType.autocomplete,
        required: true,
        condition: conditions.isAllowInventory,
        filters: FORM_FILES_IMAGE_FILTER,
        forceModal: true,
        hiddenFields: ['mimeType'],
        mode: 'tile',
        pageSize: 20,
        fixedPosition: true,
        maxWidth: 750,
        maxHeight: 240,
        crop: 'square',
        collectionName: 'files',
        title: 'BACKGROUND',
        columnDefinition: { name: '_downloadURL' },
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Object)
], CustomModel.prototype, "background", void 0);
CustomModel = tslib_1.__decorate([
    Model({
        className: 'CustomModel',
        collectionName: 'custommodels',
        fields: ['*']
    })
], CustomModel);
export { CustomModel };
if (false) {
    /** @type {?} */
    CustomModel.prototype._id;
    /** @type {?} */
    CustomModel.prototype._acl;
    /** @type {?} */
    CustomModel.prototype._lmt;
    /** @type {?} */
    CustomModel.prototype._ect;
    /** @type {?} */
    CustomModel.prototype.title;
    /** @type {?} */
    CustomModel.prototype.name;
    /** @type {?} */
    CustomModel.prototype.shortDescription;
    /** @type {?} */
    CustomModel.prototype.group;
    /** @type {?} */
    CustomModel.prototype.allowInventory;
    /** @type {?} */
    CustomModel.prototype.background;
    /** @type {?} */
    CustomModel.prototype.feathersService;
    /** @type {?} */
    CustomModel.prototype.fields;
    /** @type {?} */
    CustomModel.prototype.properties;
    /** @type {?} */
    CustomModel.prototype.permissions;
    /** @type {?} */
    CustomModel.prototype.appearance;
    /** @type {?} */
    CustomModel.prototype.slides;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1vZGVsLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2N1c3RvbS1tb2RlbC9jdXN0b20tbW9kZWwuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFRLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFTLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUgsT0FBTyxFQUFFLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFFdEUsVUFBVSxHQUFHO0lBQ2YsZ0JBQWdCLEVBQUUscUJBQXFCO0NBQ3hDO0lBT1ksV0FBVyxTQUFYLFdBQVksU0FBUSxZQUFZO0NBNEU1QyxDQUFBO0FBeEVDO0lBREMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7d0NBQzFEO0FBUVo7SUFGQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JFLFVBQVUsQ0FBQyxhQUFhLENBQUM7OzBDQUNaO0FBSWQ7SUFGQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JFLFVBQVUsQ0FBQyxhQUFhLENBQUM7O3lDQUNiO0FBSWI7SUFGQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFFLFVBQVUsQ0FBQyxhQUFhLENBQUM7O3FEQUNEO0FBY3pCO0lBWkMsUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUN2QixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckksWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNoQyxNQUFNLEVBQUUsSUFBSTtRQUNaLFlBQVksRUFBRSxrQkFBa0I7UUFDaEMsUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsS0FBSztLQUNqQixDQUFDO3NDQUNLLEtBQUs7MENBQVM7QUFRckI7SUFOQyxRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3ZCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtRQUM1QixJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxXQUFXO1FBQ2xCLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtLQUNoQyxDQUFDOzttREFDc0I7QUFxQnhCO0lBbkJDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdkIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0I7UUFDdEMsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDMUIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsRUFBRTtRQUNaLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFFBQVEsRUFBRSxHQUFHO1FBQ2IsU0FBUyxFQUFFLEdBQUc7UUFDZCxJQUFJLEVBQUUsUUFBUTtRQUNkLGNBQWMsRUFBRSxPQUFPO1FBQ3ZCLEtBQUssRUFBRSxZQUFZO1FBQ25CLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtRQUMxQyxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDOzsrQ0FDYztBQS9ETCxXQUFXO0lBTHZCLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxhQUFhO1FBQ3hCLGNBQWMsRUFBRSxjQUFjO1FBQzlCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztLQUNkLENBQUM7R0FDVyxXQUFXLENBNEV2QjtTQTVFWSxXQUFXOzs7SUFHdEIsMEJBQ1k7O0lBRVosMkJBQVc7O0lBQ1gsMkJBQWM7O0lBQ2QsMkJBQWM7O0lBRWQsNEJBRWM7O0lBRWQsMkJBRWE7O0lBRWIsdUNBRXlCOztJQUV6Qiw0QkFZcUI7O0lBRXJCLHFDQU13Qjs7SUFFeEIsaUNBbUJnQjs7SUFJaEIsc0NBQXdCOztJQUV4Qiw2QkFBMEI7O0lBQzFCLGlDQUF3Qjs7SUFDeEIsa0NBQXFCOztJQUVyQixpQ0FBd0M7O0lBRXhDLDZCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElBY2wsIE1vZGVsLCBTZWFyY2hhYmxlLCBFZGl0YWJsZSwgU2xpZGUsIGdldEdyb3Vwc1RyYW5zZm9ybSwgRk9STV9GSUxFU19JTUFHRV9GSUxURVIgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJRm9ybUZpZWxkLCBJQ3VzdG9tTW9kZWwgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5sZXQgY29uZGl0aW9ucyA9IHtcbiAgaXNBbGxvd0ludmVudG9yeTogJ2FsbG93SW52ZW50b3J5ID09IDEnXG59O1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdDdXN0b21Nb2RlbCcsXG4gIGNvbGxlY3Rpb25OYW1lOiAnY3VzdG9tbW9kZWxzJyxcbiAgZmllbGRzOiBbJyonXVxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21Nb2RlbCBleHRlbmRzIElDdXN0b21Nb2RlbCB7XG4gIC8vIGV4cG9ydCBjbGFzcyBDdXN0b21Nb2RlbCBpbXBsZW1lbnRzIElFbnRpdHkge1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tTW9kZWwnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgdmlzaWJsZTogZmFsc2UgfSlcbiAgX2lkOiBzdHJpbmc7XG5cbiAgX2FjbDogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1c3RvbU1vZGVsJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdDdXN0b21Nb2RlbCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDdXN0b21Nb2RlbCcsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnQ3VzdG9tTW9kZWwnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDdXN0b21Nb2RlbCcsIHsgcmVxdWlyZWQ6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIEBTZWFyY2hhYmxlKCdDdXN0b21Nb2RlbCcpXG4gIHNob3J0RGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1c3RvbU1vZGVsJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnaXNSb2xlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9LCB7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgbWFwVHJhbnNmb3JtOiBnZXRHcm91cHNUcmFuc2Zvcm0sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICBncm91cDogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ0N1c3RvbU1vZGVsJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgZmxleDogMTAwLFxuICAgIHRpdGxlOiAnSU5WRU5UT1JZJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9XG4gIH0pXG4gIGFsbG93SW52ZW50b3J5OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tTW9kZWwnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzQWxsb3dJbnZlbnRvcnksXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19JTUFHRV9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGZpeGVkUG9zaXRpb246IHRydWUsXG4gICAgbWF4V2lkdGg6IDc1MCxcbiAgICBtYXhIZWlnaHQ6IDI0MCxcbiAgICBjcm9wOiAnc3F1YXJlJyxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2ZpbGVzJyxcbiAgICB0aXRsZTogJ0JBQ0tHUk9VTkQnLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ19kb3dubG9hZFVSTCcgfSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgYmFja2dyb3VuZDogYW55O1xuXG4gIC8vIEBFZGl0YWJsZSgnQ3VzdG9tTW9kZWwnLCB7IHJlcXVpcmVkOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIC8vIEBTZWFyY2hhYmxlKCdDdXN0b21Nb2RlbCcpXG4gIGZlYXRoZXJzU2VydmljZTogc3RyaW5nO1xuXG4gIGZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD47XG4gIHByb3BlcnRpZXM/OiBBcnJheTxhbnk+O1xuICBwZXJtaXNzaW9ucz86IHN0cmluZztcblxuICBhcHBlYXJhbmNlPzogTWFwPHN0cmluZywgQXJyYXk8c3RyaW5nPj47XG5cbiAgc2xpZGVzPzogQXJyYXk8U2xpZGU+O1xufVxuIl19