/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Searchable, Editable, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
let GridState = class GridState extends Entity {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZHN0YXRlLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2dyaWRzdGF0ZS9ncmlkc3RhdGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBUSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztJQU9uQyxTQUFTLFNBQVQsU0FBVSxTQUFRLE1BQU07Q0FnQ3BDLENBQUE7QUF2QkM7SUFGQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25FLFVBQVUsQ0FBQyxXQUFXLENBQUM7O3dDQUNWO0FBSWQ7SUFGQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0YsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7OENBQ0o7QUFZcEI7SUFWQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckksWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNoQyxNQUFNLEVBQUUsSUFBSTtRQUNaLFlBQVksRUFBRSxrQkFBa0I7UUFDaEMsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDOzt3Q0FDNEI7QUF6Qm5CLFNBQVM7SUFOckIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLFdBQVc7UUFDdEIsY0FBYyxFQUFFLFdBQVc7UUFDM0IsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLEVBQUU7S0FDWixDQUFDO0dBQ1csU0FBUyxDQWdDckI7U0FoQ1ksU0FBUzs7O0lBRXBCLHdCQUFZOztJQUNaLHlCQUFXOztJQUNYLHlCQUFjOztJQUNkLHlCQUFjOztJQUVkLDBCQUVjOztJQUVkLGdDQUVvQjs7SUFFcEIsMEJBVThCOztJQUU5QixtQ0FBdUI7O0lBQ3ZCLDRCQUFhOztJQUNiLDhCQUFlOztJQUNmLGtDQUFtQjs7SUFDbkIseUJBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIElBY2wsIE1vZGVsLCBTZWFyY2hhYmxlLCBFZGl0YWJsZSwgZ2V0R3JvdXBzVHJhbnNmb3JtIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdHcmlkU3RhdGUnLFxuICBjb2xsZWN0aW9uTmFtZTogJ2dyaWRzdGF0ZScsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEdyaWRTdGF0ZSBleHRlbmRzIEVudGl0eSB7XG4gIC8vIGV4cG9ydCBjbGFzcyBHcmlkU3RhdGUgaW1wbGVtZW50cyBJRW50aXR5IHtcbiAgX2lkOiBzdHJpbmc7XG4gIF9hY2w6IElBY2w7XG4gIF9sbXQ/OiBzdHJpbmc7XG4gIF9lY3Q/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdHcmlkU3RhdGUnLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgQFNlYXJjaGFibGUoJ0dyaWRTdGF0ZScpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdHcmlkU3RhdGUnLCB7IHJlcXVpcmVkOiB0cnVlLCB0aXRsZTogJ0RFU0NSSVBUSU9OJywgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSB9KVxuICBAU2VhcmNoYWJsZSgnR3JpZFN0YXRlJylcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0dyaWRTdGF0ZScsIHtcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlXG4gIH0pXG4gIGdyb3VwOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuXG4gIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7XG4gIGZpbHRlcnM6IGFueTtcbiAgc29ydE1vZGVsOiBhbnk7XG4gIHZpc2libGVGaWVsZHM6IGFueTtcbiAgbW9kZTogYW55O1xufVxuIl19