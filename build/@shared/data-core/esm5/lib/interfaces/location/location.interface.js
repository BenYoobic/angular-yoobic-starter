/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormFieldType } from '@shared/stencil';
import { LocationType } from '../location-type/location-type.interface';
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { Mapping } from '../../decorators/mapping/mapping.decorator';
import { ROLES_CONDITIONS } from '../condition/icondition.interface';
import { Tenant } from '../tenant/tenant.interface';
/** @type {?} */
export var LOCATION_GEOCODESTATUS = ['file', 'geocoder', 'place', 'prediction', 'error'];
/**
 * @param {?} value
 * @param {?} data
 * @param {?} field
 * @return {?}
 */
export function onAddressChange(value, data, field) {
    if (value && value._geoloc) {
        data._geoloc = value._geoloc;
        ((/** @type {?} */ (field)))._geoloc = value._geoloc;
        data.address = value.address;
    }
}
/**
 * @param {?} value
 * @param {?} data
 * @return {?}
 */
export function onTypeChange(value, data) {
    if (value && value._id) {
        data.typeRef = value._id;
    }
}
var Location = /** @class */ (function () {
    function Location() {
    }
    tslib_1.__decorate([
        Mapping('Location', { order: 12 }),
        Editable('Location', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 13,
            filterable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "_id", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 11 }),
        Editable('Location', {
            type: FormFieldType.text,
            columnDefinition: { width: 100 },
            exportOrder: 12
        }),
        Searchable('Location'),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "clientid", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 0 }),
        Editable('Location', {
            required: true,
            type: FormFieldType.text,
            exportOrder: 1,
            sortable: true
        }),
        Searchable('Location'),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "title", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 1 }),
        Editable('Location', {
            required: true,
            type: FormFieldType.address,
            filterName: '_geoloc',
            columnDefinition: { width: 350 },
            showMap: true,
            exportOrder: 2,
            onChange: onAddressChange
        }),
        Searchable('Location'),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "address", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 15 }),
        Editable('Location', {
            type: FormFieldType.photo,
            filterable: false,
            title: 'PHOTO',
            columnDefinition: { width: 52 },
            exportOrder: 16,
            sortable: false,
            allowLibrary: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "imageData", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 13 }),
        Editable('Location', {
            type: FormFieldType.checkbox,
            columnDefinition: { width: 40 },
            exportOrder: 14,
            filterable: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Location.prototype, "vip", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 9 }),
        Editable('Location', {
            title: 'LOCATIONTAGS',
            type: FormFieldType.autocomplete,
            tag: true,
            collectionName: 'locations',
            multiple: true,
            subQuery: { field: 'locationRef', values: '_id' },
            icon: 'yo-tag',
            exportOrder: 10
        }),
        tslib_1.__metadata("design:type", Array)
    ], Location.prototype, "tags", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 2 }),
        Editable('Location', {
            type: FormFieldType.autocomplete,
            collectionName: 'locationtypes',
            required: true,
            columnDefinition: { name: 'name' },
            exportOrder: 3,
            filterableAdvanced: true,
            onChange: onTypeChange,
            filterable: true
        }),
        tslib_1.__metadata("design:type", LocationType)
    ], Location.prototype, "type", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 14 }),
        Editable('Location', {
            type: FormFieldType.autocomplete,
            collectionName: 'missiondescriptions',
            clearable: true,
            multiple: true,
            filterable: false,
            sortable: false,
            suppressExport: true,
            filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
            hiddenFields: ['archived']
        }),
        tslib_1.__metadata("design:type", Object)
    ], Location.prototype, "missiondescriptions", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 10 }),
        Editable('Location', {
            title: 'NOTIFICATIONEMAILS',
            type: FormFieldType.emailreport,
            showUsers: true,
            stateful: false,
            tab: 'INFORMATION',
            exportOrder: 11,
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", Array)
    ], Location.prototype, "notificationemail", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 5 }),
        Editable('Location', {
            type: FormFieldType.text,
            tab: 'INFORMATION',
            exportOrder: 6,
            filterableAdvanced: true
        }),
        Searchable('Location'),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "contactname", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 6 }),
        Editable('Location', {
            type: FormFieldType.email,
            tab: 'INFORMATION',
            exportOrder: 7,
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "contactemail", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 7 }),
        Editable('Location', {
            type: FormFieldType.text,
            tab: 'INFORMATION',
            exportOrder: 8,
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "contactphone", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 8 }),
        Editable('Location', {
            type: FormFieldType.textarea,
            tab: 'INFORMATION',
            exportOrder: 9,
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "info", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            readonly: true,
            type: FormFieldType.autocomplete,
            values: LOCATION_GEOCODESTATUS,
            clearable: false,
            filterableAdvanced: true,
            suppressExport: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "status", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 4 }),
        Editable('Location', {
            visible: false,
            exportOrder: 5,
            forceExport: true,
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "placesearch", void 0);
    tslib_1.__decorate([
        Mapping('Location', { order: 3 }),
        Editable('Location', {
            visible: false,
            forceExport: true,
            exportOrder: 4,
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", Array)
    ], Location.prototype, "_geoloc", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            type: FormFieldType.autocomplete,
            tab: 'PROPERTIES',
            allowCustomTag: true,
            multiple: true,
            filterable: false,
            sortable: false,
            suppressExport: true,
            condition: ROLES_CONDITIONS.hasProductBatch
        }),
        tslib_1.__metadata("design:type", Array)
    ], Location.prototype, "aisles", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            type: FormFieldType.text,
            tab: 'PROPERTIES',
            condition: ROLES_CONDITIONS.hasProductBatch
        }),
        tslib_1.__metadata("design:type", String)
    ], Location.prototype, "smartTagId", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            type: FormFieldType.json,
            tab: 'PROPERTIES',
            filterable: false,
            sortable: false,
            suppressExport: true,
            condition: ROLES_CONDITIONS.isAdmin
        }),
        tslib_1.__metadata("design:type", Array)
    ], Location.prototype, "properties", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        tslib_1.__metadata("design:type", Tenant)
    ], Location.prototype, "_tenant", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            visible: false,
            type: FormFieldType.toggle,
            filterable: false,
            invertedSort: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Location.prototype, "hasAvailableMissions", void 0);
    tslib_1.__decorate([
        Editable('Location', {
            visible: false,
            type: FormFieldType.number,
            filterable: false,
            invertedSort: true
        }),
        tslib_1.__metadata("design:type", Number)
    ], Location.prototype, "availableMissions", void 0);
    Location = tslib_1.__decorate([
        Model({
            className: 'Location',
            collectionName: 'locations',
            fields: ['*', 'type.name'],
            include: ['type', '_tenant'],
            icon: 'yo-store'
        })
    ], Location);
    return Location;
}());
export { Location };
if (false) {
    /** @type {?} */
    Location.prototype._id;
    /** @type {?} */
    Location.prototype.clientid;
    /** @type {?} */
    Location.prototype.title;
    /** @type {?} */
    Location.prototype.address;
    /** @type {?} */
    Location.prototype.imageData;
    /** @type {?} */
    Location.prototype.vip;
    /** @type {?} */
    Location.prototype.tags;
    /** @type {?} */
    Location.prototype.type;
    /** @type {?} */
    Location.prototype.typeRef;
    /** @type {?} */
    Location.prototype.missiondescriptions;
    /** @type {?} */
    Location.prototype.missiondescriptionsRef;
    /** @type {?} */
    Location.prototype.notificationemail;
    /** @type {?} */
    Location.prototype.contactname;
    /** @type {?} */
    Location.prototype.contactemail;
    /** @type {?} */
    Location.prototype.contactphone;
    /** @type {?} */
    Location.prototype.info;
    /** @type {?} */
    Location.prototype.status;
    /** @type {?} */
    Location.prototype.placesearch;
    /** @type {?} */
    Location.prototype._geoloc;
    /** @type {?} */
    Location.prototype.aisles;
    /** @type {?} */
    Location.prototype.smartTagId;
    /** @type {?} */
    Location.prototype.properties;
    /** @type {?} */
    Location.prototype.distance;
    /** @type {?} */
    Location.prototype.stats;
    /** @type {?} */
    Location.prototype._tenant;
    /** @type {?} */
    Location.prototype._tenantRef;
    /** @type {?} */
    Location.prototype.lastVisit;
    /** @type {?} */
    Location.prototype.countVisits;
    /** @type {?} */
    Location.prototype.hasAvailableMissions;
    /** @type {?} */
    Location.prototype.availableMissions;
    /** @type {?} */
    Location.prototype.kpiData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvbG9jYXRpb24vbG9jYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBdUIsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFcEQsTUFBTSxLQUFPLHNCQUFzQixHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQzs7Ozs7OztBQUUxRixNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSztJQUNoRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM3QixDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFL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QWEsQ0FBQyxNQUFNO1lBQzFCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUM7O3VEQUN5QjtJQXRQaEIsUUFBUTtRQVBwQixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsVUFBVTtZQUNyQixjQUFjLEVBQUUsV0FBVztZQUMzQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDO1lBQzFCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7WUFDNUIsSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQztPQUNXLFFBQVEsQ0F5UHBCO0lBQUQsZUFBQztDQUFBLElBQUE7U0F6UFksUUFBUTs7O0lBQ25CLHVCQVFZOztJQUVaLDRCQU9pQjs7SUFFakIseUJBUWM7O0lBRWQsMkJBV2dCOztJQUVoQiw2QkFVbUI7O0lBRW5CLHVCQU9hOztJQUViLHdCQVdvQjs7SUFFcEIsd0JBV21COztJQUNuQiwyQkFBZ0I7O0lBRWhCLHVDQVlxQjs7SUFDckIsMENBQXVDOztJQUV2QyxxQ0FVa0M7O0lBRWxDLCtCQVFxQjs7SUFFckIsZ0NBT3NCOztJQUV0QixnQ0FPc0I7O0lBRXRCLHdCQU9jOztJQUVkLDBCQVFnQjs7SUFFaEIsK0JBUXFCOztJQUVyQiwyQkFRMEI7O0lBRTFCLDBCQVVrQjs7SUFFbEIsOEJBS29COztJQUVwQiw4QkFReUI7O0lBRXpCLDRCQUFrQjs7SUFDbEIseUJBQStEOztJQUUvRCwyQkFTaUI7O0lBQ2pCLDhCQUFvQjs7SUFFcEIsNkJBQWlCOztJQUNqQiwrQkFBcUI7O0lBRXJCLHdDQU0rQjs7SUFFL0IscUNBTTJCOztJQUUzQiwyQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUHJvcGVydHkgfSBmcm9tICcuLi9lbnRpdHkvZW50aXR5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJTG9jYXRpb24sIElLcGlEYXRhIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IExvY2F0aW9uVHlwZSB9IGZyb20gJy4uL2xvY2F0aW9uLXR5cGUvbG9jYXRpb24tdHlwZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgTWFwcGluZyB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbWFwcGluZy9tYXBwaW5nLmRlY29yYXRvcic7XG5pbXBvcnQgeyBST0xFU19DT05ESVRJT05TIH0gZnJvbSAnLi4vY29uZGl0aW9uL2ljb25kaXRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IExPQ0FUSU9OX0dFT0NPREVTVEFUVVMgPSBbJ2ZpbGUnLCAnZ2VvY29kZXInLCAncGxhY2UnLCAncHJlZGljdGlvbicsICdlcnJvciddO1xuXG5leHBvcnQgZnVuY3Rpb24gb25BZGRyZXNzQ2hhbmdlKHZhbHVlLCBkYXRhLCBmaWVsZCkge1xuICBpZiAodmFsdWUgJiYgdmFsdWUuX2dlb2xvYykge1xuICAgIGRhdGEuX2dlb2xvYyA9IHZhbHVlLl9nZW9sb2M7XG4gICAgKDxhbnk+ZmllbGQpLl9nZW9sb2MgPSB2YWx1ZS5fZ2VvbG9jO1xuICAgIGRhdGEuYWRkcmVzcyA9IHZhbHVlLmFkZHJlc3M7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVHlwZUNoYW5nZSh2YWx1ZSwgZGF0YSkge1xuICBpZiAodmFsdWUgJiYgdmFsdWUuX2lkKSB7XG4gICAgZGF0YS50eXBlUmVmID0gdmFsdWUuX2lkO1xuICB9XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0xvY2F0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICBmaWVsZHM6IFsnKicsICd0eXBlLm5hbWUnXSxcbiAgaW5jbHVkZTogWyd0eXBlJywgJ190ZW5hbnQnXSxcbiAgaWNvbjogJ3lvLXN0b3JlJ1xufSlcbmV4cG9ydCBjbGFzcyBMb2NhdGlvbiBpbXBsZW1lbnRzIElMb2NhdGlvbiB7XG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDEyIH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGZvcmNlRXhwb3J0OiB0cnVlLFxuICAgIGV4cG9ydE9yZGVyOiAxMyxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZVxuICB9KVxuICBfaWQ6IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAxMSB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiAxMDAgfSxcbiAgICBleHBvcnRPcmRlcjogMTJcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ0xvY2F0aW9uJylcbiAgY2xpZW50aWQ6IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAwIH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGV4cG9ydE9yZGVyOiAxLFxuICAgIHNvcnRhYmxlOiB0cnVlXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdMb2NhdGlvbicpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogMSB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYWRkcmVzcyxcbiAgICBmaWx0ZXJOYW1lOiAnX2dlb2xvYycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogMzUwIH0sXG4gICAgc2hvd01hcDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMixcbiAgICBvbkNoYW5nZTogb25BZGRyZXNzQ2hhbmdlXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdMb2NhdGlvbicpXG4gIGFkZHJlc3M6IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAxNSB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUucGhvdG8sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgdGl0bGU6ICdQSE9UTycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogNTIgfSxcbiAgICBleHBvcnRPcmRlcjogMTYsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIGFsbG93TGlicmFyeTogdHJ1ZVxuICB9KVxuICBpbWFnZURhdGE/OiBzdHJpbmc7XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogMTMgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDQwIH0sXG4gICAgZXhwb3J0T3JkZXI6IDE0LFxuICAgIGZpbHRlcmFibGU6IHRydWVcbiAgfSlcbiAgdmlwOiBib29sZWFuO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDkgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0aXRsZTogJ0xPQ0FUSU9OVEFHUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbG9jYXRpb25zJyxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBzdWJRdWVyeTogeyBmaWVsZDogJ2xvY2F0aW9uUmVmJywgdmFsdWVzOiAnX2lkJyB9LFxuICAgIGljb246ICd5by10YWcnLFxuICAgIGV4cG9ydE9yZGVyOiAxMFxuICB9KVxuICB0YWdzOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDIgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2xvY2F0aW9udHlwZXMnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ25hbWUnIH0sXG4gICAgZXhwb3J0T3JkZXI6IDMsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlLFxuICAgIG9uQ2hhbmdlOiBvblR5cGVDaGFuZ2UsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZVxuICB9KVxuICB0eXBlOiBMb2NhdGlvblR5cGU7XG4gIHR5cGVSZWY6IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAxNCB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbWlzc2lvbmRlc2NyaXB0aW9ucycsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdhcmNoaXZlZCcsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydhcmNoaXZlZCddXG4gIH0pXG4gIG1pc3Npb25kZXNjcmlwdGlvbnM/O1xuICBtaXNzaW9uZGVzY3JpcHRpb25zUmVmPzogQXJyYXk8c3RyaW5nPjtcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAxMCB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHRpdGxlOiAnTk9USUZJQ0FUSU9ORU1BSUxTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlscmVwb3J0LFxuICAgIHNob3dVc2VyczogdHJ1ZSxcbiAgICBzdGF0ZWZ1bDogZmFsc2UsXG4gICAgdGFiOiAnSU5GT1JNQVRJT04nLFxuICAgIGV4cG9ydE9yZGVyOiAxMSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbm90aWZpY2F0aW9uZW1haWw/OiBBcnJheTxzdHJpbmc+O1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDUgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgdGFiOiAnSU5GT1JNQVRJT04nLFxuICAgIGV4cG9ydE9yZGVyOiA2LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBAU2VhcmNoYWJsZSgnTG9jYXRpb24nKVxuICBjb250YWN0bmFtZT86IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiA2IH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5lbWFpbCxcbiAgICB0YWI6ICdJTkZPUk1BVElPTicsXG4gICAgZXhwb3J0T3JkZXI6IDcsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGNvbnRhY3RlbWFpbD86IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiA3IH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHRhYjogJ0lORk9STUFUSU9OJyxcbiAgICBleHBvcnRPcmRlcjogOCxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgY29udGFjdHBob25lPzogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDggfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIHRhYjogJ0lORk9STUFUSU9OJyxcbiAgICBleHBvcnRPcmRlcjogOSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgaW5mbz86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogTE9DQVRJT05fR0VPQ09ERVNUQVRVUyxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZVxuICB9KVxuICBzdGF0dXM/OiBzdHJpbmc7XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogNCB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGV4cG9ydE9yZGVyOiA1LFxuICAgIGZvcmNlRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBwbGFjZXNlYXJjaD86IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAzIH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDQsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIF9nZW9sb2M6IFtudW1iZXIsIG51bWJlcl07XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWI6ICdQUk9QRVJUSUVTJyxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmhhc1Byb2R1Y3RCYXRjaFxuICB9KVxuICBhaXNsZXM/OiBzdHJpbmdbXTtcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB0YWI6ICdQUk9QRVJUSUVTJyxcbiAgICBjb25kaXRpb246IFJPTEVTX0NPTkRJVElPTlMuaGFzUHJvZHVjdEJhdGNoXG4gIH0pXG4gIHNtYXJ0VGFnSWQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmpzb24sXG4gICAgdGFiOiAnUFJPUEVSVElFUycsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXG4gIH0pXG4gIHByb3BlcnRpZXM/OiBJUHJvcGVydHlbXTtcblxuICBkaXN0YW5jZT86IG51bWJlcjtcbiAgc3RhdHM/OiBBcnJheTx7IHRpdGxlOiBzdHJpbmc7IHZhbHVlOiBudW1iZXI7IGNvbG9yOiBzdHJpbmcgfT47XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3RlbmFudHMnLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9XG4gIH0pXG4gIF90ZW5hbnQ/OiBUZW5hbnQ7XG4gIF90ZW5hbnRSZWY/OiBzdHJpbmc7XG5cbiAgbGFzdFZpc2l0PzogRGF0ZTtcbiAgY291bnRWaXNpdHM/OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBpbnZlcnRlZFNvcnQ6IHRydWVcbiAgfSlcbiAgaGFzQXZhaWxhYmxlTWlzc2lvbnM/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgaW52ZXJ0ZWRTb3J0OiB0cnVlXG4gIH0pXG4gIGF2YWlsYWJsZU1pc3Npb25zPzogbnVtYmVyO1xuXG4gIGtwaURhdGE/OiBBcnJheTxJS3BpRGF0YT47XG59XG4iXX0=