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
var LocationType = /** @class */ (function (_super) {
    tslib_1.__extends(LocationType, _super);
    function LocationType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return LocationType;
}(ILocationType));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24tdHlwZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9sb2NhdGlvbi10eXBlL2xvY2F0aW9uLXR5cGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBU2xCLHdDQUFhOzs7SUFpRC9DLENBQUM7SUF6Q0M7UUFOQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtZQUN4QixPQUFPLEVBQUUsS0FBSztZQUNkLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQzs7NkNBQ1c7SUFJYjtRQUZDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN0RixVQUFVLENBQUMsY0FBYyxDQUFDOzs4Q0FDZDtJQWViO1FBYkMsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN4QixLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsUUFBUTtZQUN4QixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JJLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFDaEMsWUFBWSxFQUFFLGtCQUFrQjtTQUNqQyxDQUFDOzBDQUNNLEtBQUs7K0NBQU07SUFTbkI7UUFQQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtZQUMxQixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLElBQUk7WUFDakIsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDOzsrQ0FDYTtJQVdmO1FBVEMsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN4QixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUNyQyxjQUFjLEVBQUUsU0FBUztZQUN6QixRQUFRLEVBQUUsS0FBSztZQUNmLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtTQUNuQyxDQUFDOzBDQUNPLE1BQU07aURBQUM7SUEvQ0wsWUFBWTtRQVB4QixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsY0FBYztZQUN6QixjQUFjLEVBQUUsZUFBZTtZQUMvQixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDcEIsSUFBSSxFQUFFLGVBQWU7U0FDdEIsQ0FBQztPQUNXLFlBQVksQ0FpRHhCO0lBQUQsbUJBQUM7Q0FBQSxDQWpEaUMsYUFBYSxHQWlEOUM7U0FqRFksWUFBWTs7O0lBRXZCLDJCQU1hOztJQUViLDRCQUVhOztJQUViLDZCQWFtQjs7SUFFbkIsNkJBT2U7O0lBRWYsK0JBU2dCOztJQUNoQixrQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTG9jYXRpb25UeXBlLCBGb3JtRmllbGRUeXBlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IGdldEdyb3Vwc1RyYW5zZm9ybSwgUk9MRVNfQ09ORElUSU9OUyB9IGZyb20gJy4uL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTG9jYXRpb25UeXBlJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnR5cGVzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogWydfdGVuYW50J10sXG4gIGljb246ICd5by1jYXRlZ29yaWVzJ1xufSlcbmV4cG9ydCBjbGFzcyBMb2NhdGlvblR5cGUgZXh0ZW5kcyBJTG9jYXRpb25UeXBlIHtcbiAgLy8gZXhwb3J0IGNsYXNzIExvY2F0aW9uVHlwZSBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBARWRpdGFibGUoJ0xvY2F0aW9uVHlwZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDFcbiAgfSlcbiAgX2lkPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTG9jYXRpb25UeXBlJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIHJlcXVpcmVkOiB0cnVlLCBleHBvcnRPcmRlcjogMiB9KVxuICBAU2VhcmNoYWJsZSgnTG9jYXRpb25UeXBlJylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTG9jYXRpb25UeXBlJywge1xuICAgIHRpdGxlOiAnR1JPVVBTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH0sIHsgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybVxuICB9KVxuICBncm91cD86IEFycmF5PGFueT47XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvblR5cGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgcmVhZG9ubHk6IHRydWUsXG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDRcbiAgfSlcbiAgY291bnQ/OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvblR5cGUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdURU5BTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl0sXG4gICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfVxuICB9KVxuICBfdGVuYW50OiBUZW5hbnQ7XG4gIF90ZW5hbnRSZWY/OiBzdHJpbmc7XG59XG4iXX0=