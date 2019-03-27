/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IGroup } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
import { ROLES_CONDITIONS } from '../condition/icondition.interface';
import { FORM_FILES_GROUP_FILTER } from '../constants/constants.interface';
/** @type {?} */
var conditions = {
    isUpdate: 'getAttributeValue("_ect")',
    isCreate: 'not getAttributeValue("_ect")',
    isNotRole: 'not (isRole == 1)'
};
var Group = /** @class */ (function (_super) {
    tslib_1.__extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Group', {
            required: true,
            title: 'ID',
            type: FormFieldType.text,
            readonly: conditions.isUpdate,
            forceExport: true,
            exportOrder: 1
        }),
        Searchable('Group'),
        tslib_1.__metadata("design:type", String)
    ], Group.prototype, "_id", void 0);
    tslib_1.__decorate([
        Editable('Group', { required: false, type: FormFieldType.text }),
        Searchable('Group'),
        tslib_1.__metadata("design:type", String)
    ], Group.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('Group', { required: false, type: FormFieldType.textarea }),
        Searchable('Group'),
        tslib_1.__metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_GROUP_FILTER,
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
    ], Group.prototype, "icon", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin, conditions.isNotRole],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        tslib_1.__metadata("design:type", Tenant)
    ], Group.prototype, "_tenant", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            type: FormFieldType.toggle,
            condition: [conditions.isCreate, ROLES_CONDITIONS.isAdmin]
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Group.prototype, "team", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            title: 'ROLE',
            type: FormFieldType.toggle,
            condition: [ROLES_CONDITIONS.isAdmin]
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Group.prototype, "isRole", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            type: FormFieldType.toggle,
            condition: [conditions.isCreate, ROLES_CONDITIONS.isAdmin]
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Group.prototype, "service", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            readonly: true,
            visible: false,
            forceExport: true,
            filterable: false,
            columnDefinition: { name: 'list.length' },
            type: FormFieldType.number,
            exportOrder: 2
        }),
        tslib_1.__metadata("design:type", Object)
    ], Group.prototype, "users", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            readonly: true,
            visible: false,
            forceExport: true,
            filterable: false,
            columnDefinition: { name: 'length' },
            type: FormFieldType.number,
            exportOrder: 3
        }),
        tslib_1.__metadata("design:type", Object)
    ], Group.prototype, "groups", void 0);
    tslib_1.__decorate([
        Editable('Group', {
            name: '_ect',
            title: 'CREATIONDATE',
            type: FormFieldType.date,
            readonly: true
        }),
        tslib_1.__metadata("design:type", Object)
    ], Group.prototype, "_ect", void 0);
    Group = tslib_1.__decorate([
        Model({
            className: 'Group',
            collectionName: 'groups',
            fields: ['*'],
            include: ['_tenant'],
            icon: 'yo-group'
        })
    ], Group);
    return Group;
}(IGroup));
export { Group };
if (false) {
    /** @type {?} */
    Group.prototype._id;
    /** @type {?} */
    Group.prototype.title;
    /** @type {?} */
    Group.prototype.description;
    /** @type {?} */
    Group.prototype.icon;
    /** @type {?} */
    Group.prototype._tenant;
    /** @type {?} */
    Group.prototype.team;
    /** @type {?} */
    Group.prototype.isRole;
    /** @type {?} */
    Group.prototype.service;
    /** @type {?} */
    Group.prototype.users;
    /** @type {?} */
    Group.prototype.groups;
    /** @type {?} */
    Group.prototype._ect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvZ3JvdXAvZ3JvdXAuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBRXZFLFVBQVUsR0FBRztJQUNmLFFBQVEsRUFBRSwyQkFBMkI7SUFDckMsUUFBUSxFQUFFLCtCQUErQjtJQUN6QyxTQUFTLEVBQUUsbUJBQW1CO0NBQy9COztJQVMwQixpQ0FBTTs7O0lBbUdqQyxDQUFDO0lBekZDO1FBVEMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtZQUM3QixXQUFXLEVBQUUsSUFBSTtZQUNqQixXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUM7UUFDRCxVQUFVLENBQUMsT0FBTyxDQUFDOztzQ0FDUjtJQUlaO1FBRkMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRSxV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Q3JCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtZQUN4QixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7O3VDQUNTO0lBbEdBLEtBQUs7UUFQakIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLE9BQU87WUFDbEIsY0FBYyxFQUFFLFFBQVE7WUFDeEIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3BCLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUM7T0FDVyxLQUFLLENBbUdqQjtJQUFELFlBQUM7Q0FBQSxDQW5HMEIsTUFBTSxHQW1HaEM7U0FuR1ksS0FBSzs7O0lBQ2hCLG9CQVNZOztJQUVaLHNCQUVjOztJQUVkLDRCQUVvQjs7SUFFcEIscUJBa0JVOztJQUVWLHdCQVNnQjs7SUFFaEIscUJBSWU7O0lBRWYsdUJBS2lCOztJQUVqQix3QkFJa0I7O0lBRWxCLHNCQVNZOztJQUVaLHVCQVNhOztJQUViLHFCQU1XIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUdyb3VwIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vaWNvbmRpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRk9STV9GSUxFU19HUk9VUF9GSUxURVIgfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzLmludGVyZmFjZSc7XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBpc1VwZGF0ZTogJ2dldEF0dHJpYnV0ZVZhbHVlKFwiX2VjdFwiKScsXG4gIGlzQ3JlYXRlOiAnbm90IGdldEF0dHJpYnV0ZVZhbHVlKFwiX2VjdFwiKScsXG4gIGlzTm90Um9sZTogJ25vdCAoaXNSb2xlID09IDEpJ1xufTtcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnR3JvdXAnLFxuICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnX3RlbmFudCddLFxuICBpY29uOiAneW8tZ3JvdXAnXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwIGV4dGVuZHMgSUdyb3VwIHtcbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ0lEJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgcmVhZG9ubHk6IGNvbmRpdGlvbnMuaXNVcGRhdGUsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDFcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ0dyb3VwJylcbiAgX2lkOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHsgcmVxdWlyZWQ6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgQFNlYXJjaGFibGUoJ0dyb3VwJylcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0dyb3VwJywgeyByZXF1aXJlZDogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgQFNlYXJjaGFibGUoJ0dyb3VwJylcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ0dyb3VwJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGZpbHRlcnM6IEZPUk1fRklMRVNfR1JPVVBfRklMVEVSLFxuICAgIGZvcmNlTW9kYWw6IHRydWUsXG4gICAgaGlkZGVuRmllbGRzOiBbJ21pbWVUeXBlJ10sXG4gICAgbW9kZTogJ3RpbGUnLFxuICAgIHBhZ2VTaXplOiAyMCxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBtYXhXaWR0aDogMTYwLFxuICAgIG1heEhlaWdodDogMTYwLFxuICAgIGNyb3A6ICdjaXJjbGUnLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIHRpdGxlOiAnSUNPTicsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2Rvd25sb2FkVVJMJyB9LFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBpY29uOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluLCBjb25kaXRpb25zLmlzTm90Um9sZV0sXG4gICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfVxuICB9KVxuICBfdGVuYW50OiBUZW5hbnQ7XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzQ3JlYXRlLCBST0xFU19DT05ESVRJT05TLmlzQWRtaW5dXG4gIH0pXG4gIHRlYW0/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnR3JvdXAnLCB7XG4gICAgdGl0bGU6ICdST0xFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzQWRtaW5dXG4gIH0pXG4gIGlzUm9sZT86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzQ3JlYXRlLCBST0xFU19DT05ESVRJT05TLmlzQWRtaW5dXG4gIH0pXG4gIHNlcnZpY2U/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnR3JvdXAnLCB7XG4gICAgcmVhZG9ubHk6IHRydWUsXG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgZm9yY2VFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbGlzdC5sZW5ndGgnIH0sXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgZXhwb3J0T3JkZXI6IDJcbiAgfSlcbiAgdXNlcnM/OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICByZWFkb25seTogdHJ1ZSxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdsZW5ndGgnIH0sXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgZXhwb3J0T3JkZXI6IDNcbiAgfSlcbiAgZ3JvdXBzPzogYW55O1xuXG4gIEBFZGl0YWJsZSgnR3JvdXAnLCB7XG4gICAgbmFtZTogJ19lY3QnLFxuICAgIHRpdGxlOiAnQ1JFQVRJT05EQVRFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGUsXG4gICAgcmVhZG9ubHk6IHRydWVcbiAgfSlcbiAgX2VjdD86IGFueTtcbn1cbiJdfQ==