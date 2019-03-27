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
let conditions = {
    isUpdate: 'getAttributeValue("_ect")',
    isCreate: 'not getAttributeValue("_ect")',
    isNotRole: 'not (isRole == 1)'
};
let Group = class Group extends IGroup {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvZ3JvdXAvZ3JvdXAuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBRXZFLFVBQVUsR0FBRztJQUNmLFFBQVEsRUFBRSwyQkFBMkI7SUFDckMsUUFBUSxFQUFFLCtCQUErQjtJQUN6QyxTQUFTLEVBQUUsbUJBQW1CO0NBQy9CO0lBU1ksS0FBSyxTQUFMLEtBQU0sU0FBUSxNQUFNO0NBbUdoQyxDQUFBO0FBekZDO0lBVEMsUUFBUSxDQUFDLE9BQU8sRUFBRTtRQUNqQixRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1FBQ3hCLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUTtRQUM3QixXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsQ0FBQztLQUNmLENBQUM7SUFDRCxVQUFVLENBQUMsT0FBTyxDQUFDOztrQ0FDUjtBQUlaO0lBRkMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVB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QUssRUFBRSxjQUFjO1FBQ3JCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN4QixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O21DQUNTO0FBbEdBLEtBQUs7SUFQakIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLE9BQU87UUFDbEIsY0FBYyxFQUFFLFFBQVE7UUFDeEIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3BCLElBQUksRUFBRSxVQUFVO0tBQ2pCLENBQUM7R0FDVyxLQUFLLENBbUdqQjtTQW5HWSxLQUFLOzs7SUFDaEIsb0JBU1k7O0lBRVosc0JBRWM7O0lBRWQsNEJBRW9COztJQUVwQixxQkFrQlU7O0lBRVYsd0JBU2dCOztJQUVoQixxQkFJZTs7SUFFZix1QkFLaUI7O0lBRWpCLHdCQUlrQjs7SUFFbEIsc0JBU1k7O0lBRVosdUJBU2E7O0lBRWIscUJBTVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJR3JvdXAgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUk9MRVNfQ09ORElUSU9OUyB9IGZyb20gJy4uL2NvbmRpdGlvbi9pY29uZGl0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGT1JNX0ZJTEVTX0dST1VQX0ZJTFRFUiB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMuaW50ZXJmYWNlJztcblxubGV0IGNvbmRpdGlvbnMgPSB7XG4gIGlzVXBkYXRlOiAnZ2V0QXR0cmlidXRlVmFsdWUoXCJfZWN0XCIpJyxcbiAgaXNDcmVhdGU6ICdub3QgZ2V0QXR0cmlidXRlVmFsdWUoXCJfZWN0XCIpJyxcbiAgaXNOb3RSb2xlOiAnbm90IChpc1JvbGUgPT0gMSknXG59O1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdHcm91cCcsXG4gIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogWydfdGVuYW50J10sXG4gIGljb246ICd5by1ncm91cCdcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBJR3JvdXAge1xuICBARWRpdGFibGUoJ0dyb3VwJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnSUQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICByZWFkb25seTogY29uZGl0aW9ucy5pc1VwZGF0ZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMVxuICB9KVxuICBAU2VhcmNoYWJsZSgnR3JvdXAnKVxuICBfaWQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0dyb3VwJywgeyByZXF1aXJlZDogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnR3JvdXAnKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnR3JvdXAnLCB7IHJlcXVpcmVkOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSB9KVxuICBAU2VhcmNoYWJsZSgnR3JvdXAnKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnR3JvdXAnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19HUk9VUF9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBmaXhlZFBvc2l0aW9uOiB0cnVlLFxuICAgIG1heFdpZHRoOiAxNjAsXG4gICAgbWF4SGVpZ2h0OiAxNjAsXG4gICAgY3JvcDogJ2NpcmNsZScsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgdGl0bGU6ICdJQ09OJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZG93bmxvYWRVUkwnIH0sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGljb246IGFueTtcblxuICBARWRpdGFibGUoJ0dyb3VwJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnVEVOQU5UJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzQWRtaW4sIGNvbmRpdGlvbnMuaXNOb3RSb2xlXSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3RlbmFudHMnLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9XG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcblxuICBARWRpdGFibGUoJ0dyb3VwJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNDcmVhdGUsIFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl1cbiAgfSlcbiAgdGVhbT86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICB0aXRsZTogJ1JPTEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl1cbiAgfSlcbiAgaXNSb2xlPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0dyb3VwJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNDcmVhdGUsIFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl1cbiAgfSlcbiAgc2VydmljZT86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICByZWFkb25seTogdHJ1ZSxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdsaXN0Lmxlbmd0aCcgfSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBleHBvcnRPcmRlcjogMlxuICB9KVxuICB1c2Vycz86IGFueTtcblxuICBARWRpdGFibGUoJ0dyb3VwJywge1xuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGZvcmNlRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ2xlbmd0aCcgfSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBleHBvcnRPcmRlcjogM1xuICB9KVxuICBncm91cHM/OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdHcm91cCcsIHtcbiAgICBuYW1lOiAnX2VjdCcsXG4gICAgdGl0bGU6ICdDUkVBVElPTkRBVEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSxcbiAgICByZWFkb25seTogdHJ1ZVxuICB9KVxuICBfZWN0PzogYW55O1xufVxuIl19