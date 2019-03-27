/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ILocationType, FormFieldType } from '@shared/stencil';
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform, ROLES_CONDITIONS } from '../condition/condition.interface';
import { Tenant } from '../tenant/tenant.interface';
let LocationType = class LocationType extends ILocationType {
};
tslib_1.__decorate([
    Editable('LocationType', {
        type: FormFieldType.text,
        visible: false,
        forceExport: true,
        exportOrder: 1
    }),
    tslib_1.__metadata("design:type", String)
], LocationType.prototype, "_id", void 0);
tslib_1.__decorate([
    Editable('LocationType', { type: FormFieldType.text, required: true, exportOrder: 2 }),
    Searchable('LocationType'),
    tslib_1.__metadata("design:type", String)
], LocationType.prototype, "name", void 0);
tslib_1.__decorate([
    Editable('LocationType', {
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        allowCustomTag: true,
        collectionName: 'groups',
        multiple: true,
        clearable: false,
        required: true,
        idOnly: true,
        filters: [[{ field: 'type', operator: { _id: 'nin' }, value: ['plan'] }, { field: 'isRole', operator: { _id: 'neq' }, value: true }]],
        hiddenFields: ['isRole', 'type'],
        mapTransform: getGroupsTransform
    }),
    tslib_1.__metadata("design:type", Array)
], LocationType.prototype, "group", void 0);
tslib_1.__decorate([
    Editable('LocationType', {
        type: FormFieldType.number,
        readonly: true,
        visible: false,
        forceExport: true,
        exportOrder: 4
    }),
    tslib_1.__metadata("design:type", Number)
], LocationType.prototype, "count", void 0);
tslib_1.__decorate([
    Editable('LocationType', {
        required: true,
        title: 'TENANT',
        type: FormFieldType.autocomplete,
        condition: [ROLES_CONDITIONS.isAdmin],
        collectionName: 'tenants',
        multiple: false,
        columnDefinition: { name: 'name' }
    }),
    tslib_1.__metadata("design:type", Tenant)
], LocationType.prototype, "_tenant", void 0);
LocationType = tslib_1.__decorate([
    Model({
        className: 'LocationType',
        collectionName: 'locationtypes',
        fields: ['*'],
        include: ['_tenant'],
        icon: 'yo-categories'
    })
], LocationType);
export { LocationType };
if (false) {
    /** @type {?} */
    LocationType.prototype._id;
    /** @type {?} */
    LocationType.prototype.name;
    /** @type {?} */
    LocationType.prototype.group;
    /** @type {?} */
    LocationType.prototype.count;
    /** @type {?} */
    LocationType.prototype._tenant;
    /** @type {?} */
    LocationType.prototype._tenantRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24tdHlwZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9sb2NhdGlvbi10eXBlL2xvY2F0aW9uLXR5cGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7SUFTdkMsWUFBWSxTQUFaLFlBQWEsU0FBUSxhQUFhO0NBaUQ5QyxDQUFBO0FBekNDO0lBTkMsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUN4QixJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUk7UUFDeEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsQ0FBQztLQUNmLENBQUM7O3lDQUNXO0FBSWI7SUFGQyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEYsVUFBVSxDQUFDLGNBQWMsQ0FBQzs7MENBQ2Q7QUFlYjtJQWJDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDeEIsS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsY0FBYyxFQUFFLElBQUk7UUFDcEIsY0FBYyxFQUFFLFFBQVE7UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsS0FBSztRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNySSxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1FBQ2hDLFlBQVksRUFBRSxrQkFBa0I7S0FDakMsQ0FBQztzQ0FDTSxLQUFLOzJDQUFNO0FBU25CO0lBUEMsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUN4QixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDMUIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsS0FBSztRQUNkLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLFdBQVcsRUFBRSxDQUFDO0tBQ2YsQ0FBQzs7MkNBQ2E7QUFXZjtJQVRDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDeEIsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFDckMsY0FBYyxFQUFFLFNBQVM7UUFDekIsUUFBUSxFQUFFLEtBQUs7UUFDZixnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7S0FDbkMsQ0FBQztzQ0FDTyxNQUFNOzZDQUFDO0FBL0NMLFlBQVk7SUFQeEIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLGNBQWM7UUFDekIsY0FBYyxFQUFFLGVBQWU7UUFDL0IsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3BCLElBQUksRUFBRSxlQUFlO0tBQ3RCLENBQUM7R0FDVyxZQUFZLENBaUR4QjtTQWpEWSxZQUFZOzs7SUFFdkIsMkJBTWE7O0lBRWIsNEJBRWE7O0lBRWIsNkJBYW1COztJQUVuQiw2QkFPZTs7SUFFZiwrQkFTZ0I7O0lBQ2hCLGtDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElMb2NhdGlvblR5cGUsIEZvcm1GaWVsZFR5cGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0R3JvdXBzVHJhbnNmb3JtLCBST0xFU19DT05ESVRJT05TIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdMb2NhdGlvblR5cGUnLFxuICBjb2xsZWN0aW9uTmFtZTogJ2xvY2F0aW9udHlwZXMnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbJ190ZW5hbnQnXSxcbiAgaWNvbjogJ3lvLWNhdGVnb3JpZXMnXG59KVxuZXhwb3J0IGNsYXNzIExvY2F0aW9uVHlwZSBleHRlbmRzIElMb2NhdGlvblR5cGUge1xuICAvLyBleHBvcnQgY2xhc3MgTG9jYXRpb25UeXBlIGltcGxlbWVudHMgSUVudGl0eSB7XG4gIEBFZGl0YWJsZSgnTG9jYXRpb25UeXBlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMVxuICB9KVxuICBfaWQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvblR5cGUnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgcmVxdWlyZWQ6IHRydWUsIGV4cG9ydE9yZGVyOiAyIH0pXG4gIEBTZWFyY2hhYmxlKCdMb2NhdGlvblR5cGUnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvblR5cGUnLCB7XG4gICAgdGl0bGU6ICdHUk9VUFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfSwgeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtXG4gIH0pXG4gIGdyb3VwPzogQXJyYXk8YW55PjtcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uVHlwZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICByZWFkb25seTogdHJ1ZSxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogNFxuICB9KVxuICBjb3VudD86IG51bWJlcjtcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uVHlwZScsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3RlbmFudHMnLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9XG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcbiAgX3RlbmFudFJlZj86IHN0cmluZztcbn1cbiJdfQ==