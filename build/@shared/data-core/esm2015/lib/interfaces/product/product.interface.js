/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IProduct, FormFieldType } from '@shared/stencil';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';
let Product = class Product extends IProduct {
};
tslib_1.__decorate([
    Editable('Product', {
        type: FormFieldType.text,
        visible: false,
        forceExport: true,
        exportOrder: 1
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "_id", void 0);
tslib_1.__decorate([
    Editable('Product', {
        type: FormFieldType.autocomplete,
        collectionName: 'catalogs',
        forceExport: true,
        exportOrder: 2,
        required: true,
        columnDefinition: { name: 'title' },
        filterable: true
    }),
    tslib_1.__metadata("design:type", Object)
], Product.prototype, "catalog", void 0);
tslib_1.__decorate([
    Editable('Product', { required: true, type: FormFieldType.text, exportOrder: 3, filterable: true, sortable: true }),
    Searchable('Product'),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('Product', { type: FormFieldType.text, exportOrder: 4, filterable: true, sortable: true }),
    Searchable('Product'),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "reference", void 0);
tslib_1.__decorate([
    Editable('Product', { flex: 50, type: FormFieldType.text, exportOrder: 10, filterable: true, sortable: true }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "color", void 0);
tslib_1.__decorate([
    Editable('Product', { required: false, flex: 50, type: FormFieldType.number, exportOrder: 9 }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    Editable('Product', { flex: 50, type: FormFieldType.number, min: 0, exportOrder: 8 }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "step", void 0);
tslib_1.__decorate([
    Editable('Product', {
        type: FormFieldType.checkbox,
        flex: 50,
        columnDefinition: { width: 40 },
        exportOrder: 11,
        filterable: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], Product.prototype, "outofstock", void 0);
tslib_1.__decorate([
    Editable('Product', {
        type: FormFieldType.autocomplete,
        isImage: true,
        filters: FORM_FILES_IMAGE_FILTER,
        forceModal: true,
        hiddenFields: ['mimeType'],
        mode: 'tile',
        pageSize: 20,
        fixedPosition: true,
        maxWidth: 600,
        maxHeight: 300,
        crop: 'square',
        collectionName: 'files',
        title: 'PHOTO',
        //required: true,
        columnDefinition: { name: '_downloadURL' },
        filterable: false,
        exportOrder: 7
    }),
    tslib_1.__metadata("design:type", Object)
], Product.prototype, "image", void 0);
tslib_1.__decorate([
    Editable('Product', { type: FormFieldType.textarea, exportOrder: 5 }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    Editable('Product', { type: FormFieldType.textarea, exportOrder: 6 }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "shortdescription", void 0);
tslib_1.__decorate([
    Editable('Product', {
        type: FormFieldType.autocomplete,
        tag: true,
        allowCustomTag: true,
        collectionName: 'products',
        multiple: true,
        icon: 'yo-flag',
        subQuery: { field: 'fileRef', values: '_id' },
        exportOrder: 12,
        filterable: true
    }),
    Searchable('Product'),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "tags", void 0);
Product = tslib_1.__decorate([
    Model({
        className: 'Product',
        collectionName: 'products',
        fields: ['*'],
        include: ['catalog'],
        icon: 'yo-product'
    })
], Product);
export { Product };
if (false) {
    /** @type {?} */
    Product.prototype._id;
    /** @type {?} */
    Product.prototype.catalog;
    /** @type {?} */
    Product.prototype.catalogRef;
    /** @type {?} */
    Product.prototype.title;
    /** @type {?} */
    Product.prototype.reference;
    /** @type {?} */
    Product.prototype.color;
    /** @type {?} */
    Product.prototype.price;
    /** @type {?} */
    Product.prototype.step;
    /** @type {?} */
    Product.prototype.outofstock;
    /** @type {?} */
    Product.prototype.image;
    /** @type {?} */
    Product.prototype.description;
    /** @type {?} */
    Product.prototype.shortdescription;
    /** @type {?} */
    Product.prototype.tags;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9wcm9kdWN0L3Byb2R1Y3QuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztJQVM5RCxPQUFPLFNBQVAsT0FBUSxTQUFRLFFBQVE7Q0F1RnBDLENBQUE7QUFoRkM7SUFOQyxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ25CLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN4QixPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFdBQVcsRUFBRSxDQUFDO0tBQ2YsQ0FBQzs7b0NBQ1U7QUFXWjtJQVRDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDbkIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxVQUFVO1FBQzFCLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7UUFDbkMsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQzs7d0NBQ1c7QUFLYjtJQUZDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUs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QUF0RlYsT0FBTztJQVBuQixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsU0FBUztRQUNwQixjQUFjLEVBQUUsVUFBVTtRQUMxQixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDcEIsSUFBSSxFQUFFLFlBQVk7S0FDbkIsQ0FBQztHQUNXLE9BQU8sQ0F1Rm5CO1NBdkZZLE9BQU87OztJQUNsQixzQkFNWTs7SUFFWiwwQkFTYTs7SUFDYiw2QkFBbUI7O0lBRW5CLHdCQUVjOztJQUVkLDRCQUVrQjs7SUFFbEIsd0JBQ2M7O0lBRWQsd0JBQ2M7O0lBRWQsdUJBQ2E7O0lBRWIsNkJBT29COztJQUVwQix3QkFtQlc7O0lBRVgsOEJBQ29COztJQUVwQixtQ0FDeUI7O0lBRXpCLHVCQVlxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IElQcm9kdWN0LCBGb3JtRmllbGRUeXBlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IEZPUk1fRklMRVNfSU1BR0VfRklMVEVSIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cy5pbnRlcmZhY2UnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdQcm9kdWN0JyxcbiAgY29sbGVjdGlvbk5hbWU6ICdwcm9kdWN0cycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnY2F0YWxvZyddLFxuICBpY29uOiAneW8tcHJvZHVjdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIElQcm9kdWN0IHtcbiAgQEVkaXRhYmxlKCdQcm9kdWN0Jywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMVxuICB9KVxuICBfaWQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1Byb2R1Y3QnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdjYXRhbG9ncycsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAndGl0bGUnIH0sXG4gICAgZmlsdGVyYWJsZTogdHJ1ZVxuICB9KVxuICBjYXRhbG9nOiBhbnk7XG4gIGNhdGFsb2dSZWY6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1Byb2R1Y3QnLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIGV4cG9ydE9yZGVyOiAzLCBmaWx0ZXJhYmxlOiB0cnVlLCBzb3J0YWJsZTogdHJ1ZSB9KVxuICBAU2VhcmNoYWJsZSgnUHJvZHVjdCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdQcm9kdWN0JywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIGV4cG9ydE9yZGVyOiA0LCBmaWx0ZXJhYmxlOiB0cnVlLCBzb3J0YWJsZTogdHJ1ZSB9KVxuICBAU2VhcmNoYWJsZSgnUHJvZHVjdCcpXG4gIHJlZmVyZW5jZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnUHJvZHVjdCcsIHsgZmxleDogNTAsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgZXhwb3J0T3JkZXI6IDEwLCBmaWx0ZXJhYmxlOiB0cnVlLCBzb3J0YWJsZTogdHJ1ZSB9KVxuICBjb2xvcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnUHJvZHVjdCcsIHsgcmVxdWlyZWQ6IGZhbHNlLCBmbGV4OiA1MCwgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsIGV4cG9ydE9yZGVyOiA5IH0pXG4gIHByaWNlOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdQcm9kdWN0JywgeyBmbGV4OiA1MCwgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsIG1pbjogMCwgZXhwb3J0T3JkZXI6IDggfSlcbiAgc3RlcDogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnUHJvZHVjdCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDUwLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDQwIH0sXG4gICAgZXhwb3J0T3JkZXI6IDExLFxuICAgIGZpbHRlcmFibGU6IHRydWVcbiAgfSlcbiAgb3V0b2ZzdG9jazogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1Byb2R1Y3QnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgaXNJbWFnZTogdHJ1ZSxcbiAgICBmaWx0ZXJzOiBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUixcbiAgICBmb3JjZU1vZGFsOiB0cnVlLFxuICAgIGhpZGRlbkZpZWxkczogWydtaW1lVHlwZSddLFxuICAgIG1vZGU6ICd0aWxlJyxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBtYXhXaWR0aDogNjAwLFxuICAgIG1heEhlaWdodDogMzAwLFxuICAgIGNyb3A6ICdzcXVhcmUnLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIHRpdGxlOiAnUEhPVE8nLFxuICAgIC8vcmVxdWlyZWQ6IHRydWUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2Rvd25sb2FkVVJMJyB9LFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGV4cG9ydE9yZGVyOiA3XG4gIH0pXG4gIGltYWdlOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdQcm9kdWN0JywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLCBleHBvcnRPcmRlcjogNSB9KVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnUHJvZHVjdCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSwgZXhwb3J0T3JkZXI6IDYgfSlcbiAgc2hvcnRkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnUHJvZHVjdCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdwcm9kdWN0cycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgaWNvbjogJ3lvLWZsYWcnLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnZmlsZVJlZicsIHZhbHVlczogJ19pZCcgfSxcbiAgICBleHBvcnRPcmRlcjogMTIsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZVxuICB9KVxuICBAU2VhcmNoYWJsZSgnUHJvZHVjdCcpXG4gIHRhZ3M/OiBBcnJheTxzdHJpbmc+O1xufVxuIl19