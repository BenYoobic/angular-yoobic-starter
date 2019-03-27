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
let Dashboard = class Dashboard extends IDashboard {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7SUFRdkQsU0FBUyxTQUFULFNBQVUsU0FBUSxVQUFVO0NBMkN4QyxDQUFBO0FBeENDO0lBRkMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25GLFVBQVUsQ0FBQyxXQUFXLENBQUM7O3dDQUNWO0FBSWQ7SUFGQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hFLFVBQVUsQ0FBQyxXQUFXLENBQUM7OzhDQUNKO0FBV3BCO0lBVEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtRQUNyQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxNQUFNO1FBQ2IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1FBQzVCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7dUNBQ1E7QUF1QlY7SUFWQyxRQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLFFBQVE7UUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsY0FBYyxFQUFFLFNBQVM7UUFDekIsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsVUFBVSxFQUFFLElBQUk7UUFDaEIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0tBQ3RDLENBQUM7c0NBQ08sTUFBTTswQ0FBQztBQXpDTCxTQUFTO0lBTnJCLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLGNBQWMsRUFBRSxZQUFZO1FBQzVCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQztHQUNXLFNBQVMsQ0EyQ3JCO1NBM0NZLFNBQVM7OztJQUNwQiwwQkFFYzs7SUFFZCxnQ0FFb0I7O0lBRXBCLHlCQVNVOztJQUVWLHlCQVNHOztJQUVILDRCQVVnQjs7SUFDaEIsK0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhcnREZWZpbml0aW9uIH0gZnJvbSAnLi4vY2hhcnQtZGVmaW5pdGlvbi9jaGFydC1kZWZpbml0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElEYXNoYm9hcmQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUk9MRVNfQ09ORElUSU9OUyB9IGZyb20gJy4uL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnRGFzaGJvYXJkJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdkYXNoYm9hcmRzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgSURhc2hib2FyZCB7XG4gIEBFZGl0YWJsZSgnRGFzaGJvYXJkJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCBzb3J0YWJsZTogdHJ1ZSB9KVxuICBAU2VhcmNoYWJsZSgnRGFzaGJvYXJkJylcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0Rhc2hib2FyZCcsIHsgcmVxdWlyZWQ6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIEBTZWFyY2hhYmxlKCdEYXNoYm9hcmQnKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRGFzaGJvYXJkJywge1xuICAgIG5hbWU6ICdfbG10JyxcbiAgICB0aXRsZTogJ0RBVEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgcmVhZG9ubHk6IHRydWUsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIF9sbXQ6IGFueTtcblxuICB0YWJzOiBBcnJheTx7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBpdGVtczogQXJyYXk8e1xuICAgICAgY29sOiBudW1iZXI7XG4gICAgICByb3c6IG51bWJlcjtcbiAgICAgIHNpemV4OiBudW1iZXI7XG4gICAgICBzaXpleTogbnVtYmVyO1xuICAgICAgZGVmaW5pdGlvbjogQ2hhcnREZWZpbml0aW9uO1xuICAgIH0+O1xuICB9PjtcblxuICBARWRpdGFibGUoJ0Rhc2hib2FyZCcsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9LFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl1cbiAgfSlcbiAgX3RlbmFudDogVGVuYW50O1xuICBfdGVuYW50UmVmPzogc3RyaW5nO1xufVxuIl19