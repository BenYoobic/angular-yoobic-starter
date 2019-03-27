/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Searchable, Editable, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
var GridState = /** @class */ (function (_super) {
    tslib_1.__extends(GridState, _super);
    function GridState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('GridState', { required: true, type: FormFieldType.text }),
        Searchable('GridState'),
        tslib_1.__metadata("design:type", String)
    ], GridState.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('GridState', { required: true, title: 'DESCRIPTION', type: FormFieldType.textarea }),
        Searchable('GridState'),
        tslib_1.__metadata("design:type", String)
    ], GridState.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('GridState', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true
        }),
        tslib_1.__metadata("design:type", Object)
    ], GridState.prototype, "group", void 0);
    GridState = tslib_1.__decorate([
        Model({
            className: 'GridState',
            collectionName: 'gridstate',
            fields: ['*'],
            include: []
        })
    ], GridState);
    return GridState;
}(Entity));
export { GridState };
if (false) {
    /** @type {?} */
    GridState.prototype._id;
    /** @type {?} */
    GridState.prototype._acl;
    /** @type {?} */
    GridState.prototype._lmt;
    /** @type {?} */
    GridState.prototype._ect;
    /** @type {?} */
    GridState.prototype.title;
    /** @type {?} */
    GridState.prototype.description;
    /** @type {?} */
    GridState.prototype.group;
    /** @type {?} */
    GridState.prototype.collectionName;
    /** @type {?} */
    GridState.prototype.filters;
    /** @type {?} */
    GridState.prototype.sortModel;
    /** @type {?} */
    GridState.prototype.visibleFields;
    /** @type {?} */
    GridState.prototype.mode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0YXRlLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2dyaWRzdGF0ZS9ncmlkc3RhdGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBUSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFPakIscUNBQU07OztJQWdDckMsQ0FBQztJQXZCQztRQUZDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkUsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7NENBQ1Y7SUFJZDtRQUZDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3RixVQUFVLENBQUMsV0FBVyxDQUFDOztrREFDSjtJQVlwQjtRQVZDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDckIsS0FBSyxFQUFFLFFBQVE7WUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7WUFDaEMsY0FBYyxFQUFFLFFBQVE7WUFDeEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNySSxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2hDLE1BQU0sRUFBRSxJQUFJO1lBQ1osWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7OzRDQUM0QjtJQXpCbkIsU0FBUztRQU5yQixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsV0FBVztZQUN0QixjQUFjLEVBQUUsV0FBVztZQUMzQixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7T0FDVyxTQUFTLENBZ0NyQjtJQUFELGdCQUFDO0NBQUEsQ0FoQzhCLE1BQU0sR0FnQ3BDO1NBaENZLFNBQVM7OztJQUVwQix3QkFBWTs7SUFDWix5QkFBVzs7SUFDWCx5QkFBYzs7SUFDZCx5QkFBYzs7SUFFZCwwQkFFYzs7SUFFZCxnQ0FFb0I7O0lBRXBCLDBCQVU4Qjs7SUFFOUIsbUNBQXVCOztJQUN2Qiw0QkFBYTs7SUFDYiw4QkFBZTs7SUFDZixrQ0FBbUI7O0lBQ25CLHlCQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBJQWNsLCBNb2RlbCwgU2VhcmNoYWJsZSwgRWRpdGFibGUsIGdldEdyb3Vwc1RyYW5zZm9ybSB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnR3JpZFN0YXRlJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdncmlkc3RhdGUnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBHcmlkU3RhdGUgZXh0ZW5kcyBFbnRpdHkge1xuICAvLyBleHBvcnQgY2xhc3MgR3JpZFN0YXRlIGltcGxlbWVudHMgSUVudGl0eSB7XG4gIF9pZDogc3RyaW5nO1xuICBfYWNsOiBJQWNsO1xuICBfbG10Pzogc3RyaW5nO1xuICBfZWN0Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnR3JpZFN0YXRlJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdHcmlkU3RhdGUnKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnR3JpZFN0YXRlJywgeyByZXF1aXJlZDogdHJ1ZSwgdGl0bGU6ICdERVNDUklQVElPTicsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgQFNlYXJjaGFibGUoJ0dyaWRTdGF0ZScpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdHcmlkU3RhdGUnLCB7XG4gICAgdGl0bGU6ICdHUk9VUFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybSxcbiAgICBtdWx0aXBsZTogdHJ1ZVxuICB9KVxuICBncm91cDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPjtcblxuICBjb2xsZWN0aW9uTmFtZTogc3RyaW5nO1xuICBmaWx0ZXJzOiBhbnk7XG4gIHNvcnRNb2RlbDogYW55O1xuICB2aXNpYmxlRmllbGRzOiBhbnk7XG4gIG1vZGU6IGFueTtcbn1cbiJdfQ==