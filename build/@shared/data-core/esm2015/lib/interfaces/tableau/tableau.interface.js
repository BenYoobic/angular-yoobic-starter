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
let Tableau = class Tableau extends ITableau {
};
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
export { Tableau };
if (false) {
    /** @type {?} */
    Tableau.prototype.path;
    /** @type {?} */
    Tableau.prototype._tenant;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGVhdS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy90YWJsZWF1L3RhYmxlYXUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7SUFTdkQsT0FBTyxTQUFQLE9BQVEsU0FBUSxRQUFRO0NBZXBDLENBQUE7QUFaQztJQUZDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUN2RixVQUFVLENBQUMsU0FBUyxDQUFDOztxQ0FDVDtBQVdiO0lBVEMsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNuQixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxTQUFTO1FBQ3pCLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNsQyxRQUFRLEVBQUUsS0FBSztRQUNmLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztLQUN0QyxDQUFDO3NDQUNPLE1BQU07d0NBQUM7QUFkTCxPQUFPO0lBUG5CLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxTQUFTO1FBQ3BCLGNBQWMsRUFBRSxTQUFTO1FBQ3pCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNwQixJQUFJLEVBQUUsWUFBWTtLQUNuQixDQUFDO0dBQ1csT0FBTyxDQWVuQjtTQWZZLE9BQU87OztJQUNsQix1QkFFYTs7SUFFYiwwQkFTZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSVRhYmxlYXUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBUZW5hbnQgfSBmcm9tICcuLi90ZW5hbnQvdGVuYW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBST0xFU19DT05ESVRJT05TIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdUYWJsZWF1JyxcbiAgY29sbGVjdGlvbk5hbWU6ICd0YWJsZWF1JyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogWydfdGVuYW50J10sXG4gIGljb246ICd5by10YWJsZWF1J1xufSlcbmV4cG9ydCBjbGFzcyBUYWJsZWF1IGV4dGVuZHMgSVRhYmxlYXUge1xuICBARWRpdGFibGUoJ1RhYmxlYXUnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgcmVxdWlyZWQ6IHRydWUsIHRpdGxlOiAnREFTSEJPQVJESUQnIH0pXG4gIEBTZWFyY2hhYmxlKCdUYWJsZWF1JylcbiAgcGF0aDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVGFibGVhdScsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9LFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzQWRtaW5dXG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcbn1cbiJdfQ==