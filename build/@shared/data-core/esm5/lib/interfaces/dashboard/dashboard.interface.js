/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IDashboard } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
import { ROLES_CONDITIONS } from '../condition/condition.interface';
var Dashboard = /** @class */ (function (_super) {
    tslib_1.__extends(Dashboard, _super);
    function Dashboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Dashboard', { required: true, type: FormFieldType.text, sortable: true }),
        Searchable('Dashboard'),
        tslib_1.__metadata("design:type", String)
    ], Dashboard.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('Dashboard', { required: false, type: FormFieldType.textarea }),
        Searchable('Dashboard'),
        tslib_1.__metadata("design:type", String)
    ], Dashboard.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('Dashboard', {
            name: '_lmt',
            title: 'DATE',
            type: FormFieldType.datetime,
            readonly: true,
            sortable: true,
            filterableAdvanced: true,
            advanced: true
        }),
        tslib_1.__metadata("design:type", Object)
    ], Dashboard.prototype, "_lmt", void 0);
    tslib_1.__decorate([
        Editable('Dashboard', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            collectionName: 'tenants',
            columnDefinition: { name: 'name' },
            multiple: false,
            filterable: true,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        tslib_1.__metadata("design:type", Tenant)
    ], Dashboard.prototype, "_tenant", void 0);
    Dashboard = tslib_1.__decorate([
        Model({
            className: 'Dashboard',
            collectionName: 'dashboards',
            fields: ['*'],
            include: []
        })
    ], Dashboard);
    return Dashboard;
}(IDashboard));
export { Dashboard };
if (false) {
    /** @type {?} */
    Dashboard.prototype.title;
    /** @type {?} */
    Dashboard.prototype.description;
    /** @type {?} */
    Dashboard.prototype._lmt;
    /** @type {?} */
    Dashboard.prototype.tabs;
    /** @type {?} */
    Dashboard.prototype._tenant;
    /** @type {?} */
    Dashboard.prototype._tenantRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBUXJDLHFDQUFVOzs7SUEyQ3pDLENBQUM7SUF4Q0M7UUFGQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDbkYsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7NENBQ1Y7SUFJZDtRQUZDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEUsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7a0RBQ0o7SUFXcEI7UUFUQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7WUFDNUIsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUsSUFBSTtZQUNkLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDOzsyQ0FDUTtJQXVCVjtRQVZDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDckIsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxjQUFjLEVBQUUsU0FBUztZQUN6QixnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDbEMsUUFBUSxFQUFFLEtBQUs7WUFDZixVQUFVLEVBQUUsSUFBSTtZQUNoQixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7U0FDdEMsQ0FBQzswQ0FDTyxNQUFNOzhDQUFDO0lBekNMLFNBQVM7UUFOckIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLFdBQVc7WUFDdEIsY0FBYyxFQUFFLFlBQVk7WUFDNUIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO09BQ1csU0FBUyxDQTJDckI7SUFBRCxnQkFBQztDQUFBLENBM0M4QixVQUFVLEdBMkN4QztTQTNDWSxTQUFTOzs7SUFDcEIsMEJBRWM7O0lBRWQsZ0NBRW9COztJQUVwQix5QkFTVTs7SUFFVix5QkFTRzs7SUFFSCw0QkFVZ0I7O0lBQ2hCLCtCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXJ0RGVmaW5pdGlvbiB9IGZyb20gJy4uL2NoYXJ0LWRlZmluaXRpb24vY2hhcnQtZGVmaW5pdGlvbi5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJRGFzaGJvYXJkIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9uLmludGVyZmFjZSc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0Rhc2hib2FyZCcsXG4gIGNvbGxlY3Rpb25OYW1lOiAnZGFzaGJvYXJkcycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFtdXG59KVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIElEYXNoYm9hcmQge1xuICBARWRpdGFibGUoJ0Rhc2hib2FyZCcsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgc29ydGFibGU6IHRydWUgfSlcbiAgQFNlYXJjaGFibGUoJ0Rhc2hib2FyZCcpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdEYXNoYm9hcmQnLCB7IHJlcXVpcmVkOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSB9KVxuICBAU2VhcmNoYWJsZSgnRGFzaGJvYXJkJylcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Rhc2hib2FyZCcsIHtcbiAgICBuYW1lOiAnX2xtdCcsXG4gICAgdGl0bGU6ICdEQVRFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lLFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBfbG10OiBhbnk7XG5cbiAgdGFiczogQXJyYXk8e1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgaXRlbXM6IEFycmF5PHtcbiAgICAgIGNvbDogbnVtYmVyO1xuICAgICAgcm93OiBudW1iZXI7XG4gICAgICBzaXpleDogbnVtYmVyO1xuICAgICAgc2l6ZXk6IG51bWJlcjtcbiAgICAgIGRlZmluaXRpb246IENoYXJ0RGVmaW5pdGlvbjtcbiAgICB9PjtcbiAgfT47XG5cbiAgQEVkaXRhYmxlKCdEYXNoYm9hcmQnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdURU5BTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndGVuYW50cycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfSxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzQWRtaW5dXG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcbiAgX3RlbmFudFJlZj86IHN0cmluZztcbn1cbiJdfQ==