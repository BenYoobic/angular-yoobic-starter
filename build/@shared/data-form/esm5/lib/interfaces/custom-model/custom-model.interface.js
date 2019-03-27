/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model, Searchable, Editable, getGroupsTransform, FORM_FILES_IMAGE_FILTER } from '@shared/data-core';
import { FormFieldType, ICustomModel } from '@shared/stencil';
/** @type {?} */
var conditions = {
    isAllowInventory: 'allowInventory == 1'
};
var CustomModel = /** @class */ (function (_super) {
    tslib_1.__extends(CustomModel, _super);
    function CustomModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return CustomModel;
}(ICustomModel));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1vZGVsLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2N1c3RvbS1tb2RlbC9jdXN0b20tbW9kZWwuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFRLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFTLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUgsT0FBTyxFQUFFLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFFdEUsVUFBVSxHQUFHO0lBQ2YsZ0JBQWdCLEVBQUUscUJBQXFCO0NBQ3hDOztJQU9nQyx1Q0FBWTs7O0lBNEU3QyxDQUFDO0lBeEVDO1FBREMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7NENBQzFEO0lBUVo7UUFGQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JFLFVBQVUsQ0FBQyxhQUFhLENBQUM7OzhDQUNaO0lBSWQ7UUFGQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JFLFVBQVUsQ0FBQyxhQUFhLENBQUM7OzZDQUNiO0lBSWI7UUFGQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFFLFVBQVUsQ0FBQyxhQUFhLENBQUM7O3lEQUNEO0lBY3pCO1FBWkMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN2QixRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxHQUFHO1lBQ1QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckksWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUNoQyxNQUFNLEVBQUUsSUFBSTtZQUNaLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDOzBDQUNLLEtBQUs7OENBQVM7SUFRckI7UUFOQyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtZQUM1QixJQUFJLEVBQUUsR0FBRztZQUNULEtBQUssRUFBRSxXQUFXO1lBQ2xCLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtTQUNoQyxDQUFDOzt1REFDc0I7SUFxQnhCO1FBbkJDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0I7WUFDdEMsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDMUIsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLEdBQUc7WUFDZCxJQUFJLEVBQUUsUUFBUTtZQUNkLGNBQWMsRUFBRSxPQUFPO1lBQ3ZCLEtBQUssRUFBRSxZQUFZO1lBQ25CLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUMxQyxVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDOzttREFDYztJQS9ETCxXQUFXO1FBTHZCLEtBQUssQ0FBQztZQUNMLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNkLENBQUM7T0FDVyxXQUFXLENBNEV2QjtJQUFELGtCQUFDO0NBQUEsQ0E1RWdDLFlBQVksR0E0RTVDO1NBNUVZLFdBQVc7OztJQUd0QiwwQkFDWTs7SUFFWiwyQkFBVzs7SUFDWCwyQkFBYzs7SUFDZCwyQkFBYzs7SUFFZCw0QkFFYzs7SUFFZCwyQkFFYTs7SUFFYix1Q0FFeUI7O0lBRXpCLDRCQVlxQjs7SUFFckIscUNBTXdCOztJQUV4QixpQ0FtQmdCOztJQUloQixzQ0FBd0I7O0lBRXhCLDZCQUEwQjs7SUFDMUIsaUNBQXdCOztJQUN4QixrQ0FBcUI7O0lBRXJCLGlDQUF3Qzs7SUFFeEMsNkJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUFjbCwgTW9kZWwsIFNlYXJjaGFibGUsIEVkaXRhYmxlLCBTbGlkZSwgZ2V0R3JvdXBzVHJhbnNmb3JtLCBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUiB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElGb3JtRmllbGQsIElDdXN0b21Nb2RlbCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBpc0FsbG93SW52ZW50b3J5OiAnYWxsb3dJbnZlbnRvcnkgPT0gMSdcbn07XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0N1c3RvbU1vZGVsJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdjdXN0b21tb2RlbHMnLFxuICBmaWVsZHM6IFsnKiddXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbU1vZGVsIGV4dGVuZHMgSUN1c3RvbU1vZGVsIHtcbiAgLy8gZXhwb3J0IGNsYXNzIEN1c3RvbU1vZGVsIGltcGxlbWVudHMgSUVudGl0eSB7XG5cbiAgQEVkaXRhYmxlKCdDdXN0b21Nb2RlbCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCB2aXNpYmxlOiBmYWxzZSB9KVxuICBfaWQ6IHN0cmluZztcblxuICBfYWNsOiBJQWNsO1xuICBfbG10Pzogc3RyaW5nO1xuICBfZWN0Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tTW9kZWwnLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgQFNlYXJjaGFibGUoJ0N1c3RvbU1vZGVsJylcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1c3RvbU1vZGVsJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdDdXN0b21Nb2RlbCcpXG4gIG5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1c3RvbU1vZGVsJywgeyByZXF1aXJlZDogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgQFNlYXJjaGFibGUoJ0N1c3RvbU1vZGVsJylcbiAgc2hvcnREZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tTW9kZWwnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZmxleDogMTAwLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlXG4gIH0pXG4gIGdyb3VwOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnQ3VzdG9tTW9kZWwnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICBmbGV4OiAxMDAsXG4gICAgdGl0bGU6ICdJTlZFTlRPUlknLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgYWxsb3dJbnZlbnRvcnk6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdDdXN0b21Nb2RlbCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNBbGxvd0ludmVudG9yeSxcbiAgICBmaWx0ZXJzOiBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUixcbiAgICBmb3JjZU1vZGFsOiB0cnVlLFxuICAgIGhpZGRlbkZpZWxkczogWydtaW1lVHlwZSddLFxuICAgIG1vZGU6ICd0aWxlJyxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBtYXhXaWR0aDogNzUwLFxuICAgIG1heEhlaWdodDogMjQwLFxuICAgIGNyb3A6ICdzcXVhcmUnLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIHRpdGxlOiAnQkFDS0dST1VORCcsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2Rvd25sb2FkVVJMJyB9LFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBiYWNrZ3JvdW5kOiBhbnk7XG5cbiAgLy8gQEVkaXRhYmxlKCdDdXN0b21Nb2RlbCcsIHsgcmVxdWlyZWQ6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgLy8gQFNlYXJjaGFibGUoJ0N1c3RvbU1vZGVsJylcbiAgZmVhdGhlcnNTZXJ2aWNlOiBzdHJpbmc7XG5cbiAgZmllbGRzOiBBcnJheTxJRm9ybUZpZWxkPjtcbiAgcHJvcGVydGllcz86IEFycmF5PGFueT47XG4gIHBlcm1pc3Npb25zPzogc3RyaW5nO1xuXG4gIGFwcGVhcmFuY2U/OiBNYXA8c3RyaW5nLCBBcnJheTxzdHJpbmc+PjtcblxuICBzbGlkZXM/OiBBcnJheTxTbGlkZT47XG59XG4iXX0=