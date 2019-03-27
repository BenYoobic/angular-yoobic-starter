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
export const LOCATION_GEOCODESTATUS = ['file', 'geocoder', 'place', 'prediction', 'error'];
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
let Location = class Location {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvbG9jYXRpb24vbG9jYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBdUIsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFFcEQsTUFBTSxPQUFPLHNCQUFzQixHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQzs7Ozs7OztBQUUxRixNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSztJQUNoRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM3QixDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFL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SztRQUNkLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixVQUFVLEVBQUUsS0FBSztRQUNqQixZQUFZLEVBQUUsSUFBSTtLQUNuQixDQUFDOzttREFDeUI7QUF0UGhCLFFBQVE7SUFQcEIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLFVBQVU7UUFDckIsY0FBYyxFQUFFLFdBQVc7UUFDM0IsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQztRQUMxQixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1FBQzVCLElBQUksRUFBRSxVQUFVO0tBQ2pCLENBQUM7R0FDVyxRQUFRLENBeVBwQjtTQXpQWSxRQUFROzs7SUFDbkIsdUJBUVk7O0lBRVosNEJBT2lCOztJQUVqQix5QkFRYzs7SUFFZCwyQkFXZ0I7O0lBRWhCLDZCQVVtQjs7SUFFbkIsdUJBT2E7O0lBRWIsd0JBV29COztJQUVwQix3QkFXbUI7O0lBQ25CLDJCQUFnQjs7SUFFaEIsdUNBWXFCOztJQUNyQiwwQ0FBdUM7O0lBRXZDLHFDQVVrQzs7SUFFbEMsK0JBUXFCOztJQUVyQixnQ0FPc0I7O0lBRXRCLGdDQU9zQjs7SUFFdEIsd0JBT2M7O0lBRWQsMEJBUWdCOztJQUVoQiwrQkFRcUI7O0lBRXJCLDJCQVEwQjs7SUFFMUIsMEJBVWtCOztJQUVsQiw4QkFLb0I7O0lBRXBCLDhCQVF5Qjs7SUFFekIsNEJBQWtCOztJQUNsQix5QkFBK0Q7O0lBRS9ELDJCQVNpQjs7SUFDakIsOEJBQW9COztJQUVwQiw2QkFBaUI7O0lBQ2pCLCtCQUFxQjs7SUFFckIsd0NBTStCOztJQUUvQixxQ0FNMkI7O0lBRTNCLDJCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQcm9wZXJ0eSB9IGZyb20gJy4uL2VudGl0eS9lbnRpdHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElMb2NhdGlvbiwgSUtwaURhdGEgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgTG9jYXRpb25UeXBlIH0gZnJvbSAnLi4vbG9jYXRpb24tdHlwZS9sb2NhdGlvbi10eXBlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBNYXBwaW5nIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tYXBwaW5nL21hcHBpbmcuZGVjb3JhdG9yJztcbmltcG9ydCB7IFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vaWNvbmRpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgTE9DQVRJT05fR0VPQ09ERVNUQVRVUyA9IFsnZmlsZScsICdnZW9jb2RlcicsICdwbGFjZScsICdwcmVkaWN0aW9uJywgJ2Vycm9yJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkFkZHJlc3NDaGFuZ2UodmFsdWUsIGRhdGEsIGZpZWxkKSB7XG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5fZ2VvbG9jKSB7XG4gICAgZGF0YS5fZ2VvbG9jID0gdmFsdWUuX2dlb2xvYztcbiAgICAoPGFueT5maWVsZCkuX2dlb2xvYyA9IHZhbHVlLl9nZW9sb2M7XG4gICAgZGF0YS5hZGRyZXNzID0gdmFsdWUuYWRkcmVzcztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25UeXBlQ2hhbmdlKHZhbHVlLCBkYXRhKSB7XG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5faWQpIHtcbiAgICBkYXRhLnR5cGVSZWYgPSB2YWx1ZS5faWQ7XG4gIH1cbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTG9jYXRpb24nLFxuICBjb2xsZWN0aW9uTmFtZTogJ2xvY2F0aW9ucycsXG4gIGZpZWxkczogWycqJywgJ3R5cGUubmFtZSddLFxuICBpbmNsdWRlOiBbJ3R5cGUnLCAnX3RlbmFudCddLFxuICBpY29uOiAneW8tc3RvcmUnXG59KVxuZXhwb3J0IGNsYXNzIExvY2F0aW9uIGltcGxlbWVudHMgSUxvY2F0aW9uIHtcbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogMTIgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDEzLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlXG4gIH0pXG4gIF9pZDogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDExIH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDEwMCB9LFxuICAgIGV4cG9ydE9yZGVyOiAxMlxuICB9KVxuICBAU2VhcmNoYWJsZSgnTG9jYXRpb24nKVxuICBjbGllbnRpZDogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDAgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgZXhwb3J0T3JkZXI6IDEsXG4gICAgc29ydGFibGU6IHRydWVcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ0xvY2F0aW9uJylcbiAgdGl0bGU6IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAxIH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hZGRyZXNzLFxuICAgIGZpbHRlck5hbWU6ICdfZ2VvbG9jJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiAzNTAgfSxcbiAgICBzaG93TWFwOiB0cnVlLFxuICAgIGV4cG9ydE9yZGVyOiAyLFxuICAgIG9uQ2hhbmdlOiBvbkFkZHJlc3NDaGFuZ2VcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ0xvY2F0aW9uJylcbiAgYWRkcmVzczogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDE1IH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5waG90byxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICB0aXRsZTogJ1BIT1RPJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA1MiB9LFxuICAgIGV4cG9ydE9yZGVyOiAxNixcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgYWxsb3dMaWJyYXJ5OiB0cnVlXG4gIH0pXG4gIGltYWdlRGF0YT86IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiAxMyB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogNDAgfSxcbiAgICBleHBvcnRPcmRlcjogMTQsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZVxuICB9KVxuICB2aXA6IGJvb2xlYW47XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogOSB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHRpdGxlOiAnTE9DQVRJT05UQUdTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnbG9jYXRpb25SZWYnLCB2YWx1ZXM6ICdfaWQnIH0sXG4gICAgaWNvbjogJ3lvLXRhZycsXG4gICAgZXhwb3J0T3JkZXI6IDEwXG4gIH0pXG4gIHRhZ3M6IEFycmF5PHN0cmluZz47XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogMiB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbG9jYXRpb250eXBlcycsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfSxcbiAgICBleHBvcnRPcmRlcjogMyxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgb25DaGFuZ2U6IG9uVHlwZUNoYW5nZSxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlXG4gIH0pXG4gIHR5cGU6IExvY2F0aW9uVHlwZTtcbiAgdHlwZVJlZjogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDE0IH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdtaXNzaW9uZGVzY3JpcHRpb25zJyxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2FyY2hpdmVkJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2FyY2hpdmVkJ11cbiAgfSlcbiAgbWlzc2lvbmRlc2NyaXB0aW9ucz87XG4gIG1pc3Npb25kZXNjcmlwdGlvbnNSZWY/OiBBcnJheTxzdHJpbmc+O1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDEwIH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdGl0bGU6ICdOT1RJRklDQVRJT05FTUFJTFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZW1haWxyZXBvcnQsXG4gICAgc2hvd1VzZXJzOiB0cnVlLFxuICAgIHN0YXRlZnVsOiBmYWxzZSxcbiAgICB0YWI6ICdJTkZPUk1BVElPTicsXG4gICAgZXhwb3J0T3JkZXI6IDExLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBub3RpZmljYXRpb25lbWFpbD86IEFycmF5PHN0cmluZz47XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogNSB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB0YWI6ICdJTkZPUk1BVElPTicsXG4gICAgZXhwb3J0T3JkZXI6IDYsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdMb2NhdGlvbicpXG4gIGNvbnRhY3RuYW1lPzogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDYgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsLFxuICAgIHRhYjogJ0lORk9STUFUSU9OJyxcbiAgICBleHBvcnRPcmRlcjogNyxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgY29udGFjdGVtYWlsPzogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDcgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgdGFiOiAnSU5GT1JNQVRJT04nLFxuICAgIGV4cG9ydE9yZGVyOiA4LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjb250YWN0cGhvbmU/OiBzdHJpbmc7XG5cbiAgQE1hcHBpbmcoJ0xvY2F0aW9uJywgeyBvcmRlcjogOCB9KVxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEsXG4gICAgdGFiOiAnSU5GT1JNQVRJT04nLFxuICAgIGV4cG9ydE9yZGVyOiA5LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBpbmZvPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgcmVhZG9ubHk6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdmFsdWVzOiBMT0NBVElPTl9HRU9DT0RFU1RBVFVTLFxuICAgIGNsZWFyYWJsZTogZmFsc2UsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlXG4gIH0pXG4gIHN0YXR1cz86IHN0cmluZztcblxuICBATWFwcGluZygnTG9jYXRpb24nLCB7IG9yZGVyOiA0IH0pXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgZXhwb3J0T3JkZXI6IDUsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIHBsYWNlc2VhcmNoPzogc3RyaW5nO1xuXG4gIEBNYXBwaW5nKCdMb2NhdGlvbicsIHsgb3JkZXI6IDMgfSlcbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogNCxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgX2dlb2xvYzogW251bWJlciwgbnVtYmVyXTtcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhYjogJ1BST1BFUlRJRVMnLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBjb25kaXRpb246IFJPTEVTX0NPTkRJVElPTlMuaGFzUHJvZHVjdEJhdGNoXG4gIH0pXG4gIGFpc2xlcz86IHN0cmluZ1tdO1xuXG4gIEBFZGl0YWJsZSgnTG9jYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHRhYjogJ1BST1BFUlRJRVMnLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5oYXNQcm9kdWN0QmF0Y2hcbiAgfSlcbiAgc21hcnRUYWdJZD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuanNvbixcbiAgICB0YWI6ICdQUk9QRVJUSUVTJyxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW5cbiAgfSlcbiAgcHJvcGVydGllcz86IElQcm9wZXJ0eVtdO1xuXG4gIGRpc3RhbmNlPzogbnVtYmVyO1xuICBzdGF0cz86IEFycmF5PHsgdGl0bGU6IHN0cmluZzsgdmFsdWU6IG51bWJlcjsgY29sb3I6IHN0cmluZyB9PjtcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnVEVOQU5UJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzQWRtaW5dLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndGVuYW50cycsXG4gICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ25hbWUnIH1cbiAgfSlcbiAgX3RlbmFudD86IFRlbmFudDtcbiAgX3RlbmFudFJlZj86IHN0cmluZztcblxuICBsYXN0VmlzaXQ/OiBEYXRlO1xuICBjb3VudFZpc2l0cz86IG51bWJlcjtcblxuICBARWRpdGFibGUoJ0xvY2F0aW9uJywge1xuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGludmVydGVkU29ydDogdHJ1ZVxuICB9KVxuICBoYXNBdmFpbGFibGVNaXNzaW9ucz86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdMb2NhdGlvbicsIHtcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBpbnZlcnRlZFNvcnQ6IHRydWVcbiAgfSlcbiAgYXZhaWxhYmxlTWlzc2lvbnM/OiBudW1iZXI7XG5cbiAga3BpRGF0YT86IEFycmF5PElLcGlEYXRhPjtcbn1cbiJdfQ==