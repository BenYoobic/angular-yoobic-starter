/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Editable } from '../../decorators/editable/editable.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, ITableau } from '@shared/stencil';
import { Model } from '../../decorators/model/model.decorator';
import { Tenant } from '../tenant/tenant.interface';
import { ROLES_CONDITIONS } from '../condition/condition.interface';
var Tableau = /** @class */ (function (_super) {
    tslib_1.__extends(Tableau, _super);
    function Tableau() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Tableau', { type: FormFieldType.text, required: true, title: 'DASHBOARDID' }),
        Searchable('Tableau'),
        tslib_1.__metadata("design:type", String)
    ], Tableau.prototype, "path", void 0);
    tslib_1.__decorate([
        Editable('Tableau', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            collectionName: 'tenants',
            columnDefinition: { name: 'name' },
            multiple: false,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        tslib_1.__metadata("design:type", Tenant)
    ], Tableau.prototype, "_tenant", void 0);
    Tableau = tslib_1.__decorate([
        Model({
            className: 'Tableau',
            collectionName: 'tableau',
            fields: ['*'],
            include: ['_tenant'],
            icon: 'yo-tableau'
        })
    ], Tableau);
    return Tableau;
}(ITableau));
export { Tableau };
if (false) {
    /** @type {?} */
    Tableau.prototype.path;
    /** @type {?} */
    Tableau.prototype._tenant;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVhdS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy90YWJsZWF1L3RhYmxlYXUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBU3ZDLG1DQUFROzs7SUFlckMsQ0FBQztJQVpDO1FBRkMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDO1FBQ3ZGLFVBQVUsQ0FBQyxTQUFTLENBQUM7O3lDQUNUO0lBV2I7UUFUQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLFFBQVE7WUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7WUFDaEMsY0FBYyxFQUFFLFNBQVM7WUFDekIsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ2xDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1NBQ3RDLENBQUM7MENBQ08sTUFBTTs0Q0FBQztJQWRMLE9BQU87UUFQbkIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLFNBQVM7WUFDcEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3BCLElBQUksRUFBRSxZQUFZO1NBQ25CLENBQUM7T0FDVyxPQUFPLENBZW5CO0lBQUQsY0FBQztDQUFBLENBZjRCLFFBQVEsR0FlcEM7U0FmWSxPQUFPOzs7SUFDbEIsdUJBRWE7O0lBRWIsMEJBU2dCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElUYWJsZWF1IH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUk9MRVNfQ09ORElUSU9OUyB9IGZyb20gJy4uL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnVGFibGVhdScsXG4gIGNvbGxlY3Rpb25OYW1lOiAndGFibGVhdScsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnX3RlbmFudCddLFxuICBpY29uOiAneW8tdGFibGVhdSdcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVhdSBleHRlbmRzIElUYWJsZWF1IHtcbiAgQEVkaXRhYmxlKCdUYWJsZWF1JywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIHJlcXVpcmVkOiB0cnVlLCB0aXRsZTogJ0RBU0hCT0FSRElEJyB9KVxuICBAU2VhcmNoYWJsZSgnVGFibGVhdScpXG4gIHBhdGg6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RhYmxlYXUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdURU5BTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndGVuYW50cycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfSxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXVxuICB9KVxuICBfdGVuYW50OiBUZW5hbnQ7XG59XG4iXX0=