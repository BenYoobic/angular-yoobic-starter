/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, ITenant } from '@shared/stencil';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';
let Tenant = class Tenant extends ITenant {
};
tslib_1.__decorate([
    Editable('Tenant', { required: true, type: FormFieldType.text }),
    Searchable('Tenant'),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "name", void 0);
tslib_1.__decorate([
    Editable('Tenant', { required: false, type: FormFieldType.text }),
    Searchable('Tenant'),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('Tenant', { required: false, type: FormFieldType.textarea }),
    Searchable('Tenant'),
    tslib_1.__metadata("design:type", String)
], Tenant.prototype, "description", void 0);
tslib_1.__decorate([
    Editable('Tenant', {
        type: FormFieldType.autocomplete,
        filters: FORM_FILES_IMAGE_FILTER,
        forceModal: true,
        hiddenFields: ['mimeType'],
        mode: 'tile',
        pageSize: 20,
        clearable: true,
        fixedPosition: true,
        maxWidth: 160,
        maxHeight: 160,
        crop: 'circle',
        collectionName: 'files',
        title: 'ICON',
        columnDefinition: { name: '_downloadURL' },
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Object)
], Tenant.prototype, "icon", void 0);
tslib_1.__decorate([
    Editable('Tenant', { type: FormFieldType.toggle }),
    tslib_1.__metadata("design:type", Boolean)
], Tenant.prototype, "ssoOnly", void 0);
tslib_1.__decorate([
    Editable('Tenant', { type: FormFieldType.toggle }),
    tslib_1.__metadata("design:type", Boolean)
], Tenant.prototype, "protected", void 0);
tslib_1.__decorate([
    Editable('Tenant', {
        type: FormFieldType.json,
        filterable: false,
        sortable: false,
        suppressExport: true
    }),
    tslib_1.__metadata("design:type", Array)
], Tenant.prototype, "locationKpis", void 0);
Tenant = tslib_1.__decorate([
    Model({
        className: 'Tenant',
        collectionName: 'tenants',
        fields: ['*'],
        include: [],
        icon: 'yo-company'
    })
], Tenant);
export { Tenant };
if (false) {
    /** @type {?} */
    Tenant.prototype.name;
    /** @type {?} */
    Tenant.prototype.title;
    /** @type {?} */
    Tenant.prototype.description;
    /** @type {?} */
    Tenant.prototype.icon;
    /** @type {?} */
    Tenant.prototype.ssoOnly;
    /** @type {?} */
    Tenant.prototype.protected;
    /** @type {?} */
    Tenant.prototype.locationKpis;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7SUFTOUQsTUFBTSxTQUFOLE1BQU8sU0FBUSxPQUFPO0NBOENsQyxDQUFBO0FBM0NDO0lBRkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRSxVQUFVLENBQUMsUUFBUSxDQUFDOztvQ0FDUjtBQUliO0lBRkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqRSxVQUFVLENBQUMsUUFBUSxDQUFDOztxQ0FDUDtBQUlkO0lBRkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyRSxVQUFVLENBQUMsUUFBUSxDQUFDOzsyQ0FDRDtBQW9CcEI7SUFsQkMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNsQixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDMUIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxJQUFJO1FBQ2YsYUFBYSxFQUFFLElBQUk7UUFDbkIsUUFBUSxFQUFFLEdBQUc7UUFDYixTQUFTLEVBQUUsR0FBRztRQUNkLElBQUksRUFBRSxRQUFRO1FBQ2QsY0FBYyxFQUFFLE9BQU87UUFDdkIsS0FBSyxFQUFFLE1BQU07UUFDYixnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7UUFDMUMsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQzs7b0NBQ1E7QUFHVjtJQURDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDOzt1Q0FDbEM7QUFHakI7SUFEQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7eUNBQ2hDO0FBUW5CO0lBTkMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNsQixJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUk7UUFDeEIsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEtBQUs7UUFDZixjQUFjLEVBQUUsSUFBSTtLQUNyQixDQUFDO3NDQUNhLEtBQUs7NENBQWU7QUE3Q3hCLE1BQU07SUFQbEIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLFFBQVE7UUFDbkIsY0FBYyxFQUFFLFNBQVM7UUFDekIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxJQUFJLEVBQUUsWUFBWTtLQUNuQixDQUFDO0dBQ1csTUFBTSxDQThDbEI7U0E5Q1ksTUFBTTs7O0lBQ2pCLHNCQUVhOztJQUViLHVCQUVjOztJQUVkLDZCQUVvQjs7SUFFcEIsc0JBa0JVOztJQUVWLHlCQUNpQjs7SUFFakIsMkJBQ21COztJQUVuQiw4QkFNbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSVRlbmFudCwgSUxvY2F0aW9uS3BpIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRk9STV9GSUxFU19JTUFHRV9GSUxURVIgfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzLmludGVyZmFjZSc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ1RlbmFudCcsXG4gIGNvbGxlY3Rpb25OYW1lOiAndGVuYW50cycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFtdLFxuICBpY29uOiAneW8tY29tcGFueSdcbn0pXG5leHBvcnQgY2xhc3MgVGVuYW50IGV4dGVuZHMgSVRlbmFudCB7XG4gIEBFZGl0YWJsZSgnVGVuYW50JywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdUZW5hbnQnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUZW5hbnQnLCB7IHJlcXVpcmVkOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdUZW5hbnQnKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVGVuYW50JywgeyByZXF1aXJlZDogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgQFNlYXJjaGFibGUoJ1RlbmFudCcpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUZW5hbnQnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19JTUFHRV9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBmaXhlZFBvc2l0aW9uOiB0cnVlLFxuICAgIG1heFdpZHRoOiAxNjAsXG4gICAgbWF4SGVpZ2h0OiAxNjAsXG4gICAgY3JvcDogJ2NpcmNsZScsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgdGl0bGU6ICdJQ09OJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZG93bmxvYWRVUkwnIH0sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGljb246IGFueTtcblxuICBARWRpdGFibGUoJ1RlbmFudCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUgfSlcbiAgc3NvT25seTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1RlbmFudCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUgfSlcbiAgcHJvdGVjdGVkOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVGVuYW50Jywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuanNvbixcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWVcbiAgfSlcbiAgbG9jYXRpb25LcGlzPzogQXJyYXk8SUxvY2F0aW9uS3BpPjtcbn1cbiJdfQ==