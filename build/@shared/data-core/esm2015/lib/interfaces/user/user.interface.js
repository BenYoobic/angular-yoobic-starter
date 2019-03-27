/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IUser, IUserSettings, ISimpleUser, IRoles } from '@shared/stencil';
import { Location } from '../location/location.interface';
import { Tenant } from '../tenant/tenant.interface';
import { getGroupsTransform, ROLES_CONDITIONS } from '../condition/condition.interface';
import { startCase } from 'lodash-es';
/** @type {?} */
let conditions = {
    isCreate: 'not getAttributeValue("_ect")',
    isUpdate: 'getAttributeValue("_ect")',
    isNotUpdateMultiple: 'not (getAttributeValue("_id") == "multiple")',
    //isTeam: ' isTeam == 1',
    //isNotTeam: ' not (isTeam == 1)',
    isNotSarahMartin: 'not (username == "smartin@yoobic.com")',
    isNotYoobicAdmin: 'not (endsWith(getAttributeValue("username"),"@yoobic.com") == 1 and length("_acl.groups.r") == 0)'
};
/**
 * @param {?} value
 * @param {?} data
 * @return {?}
 */
export function onUserLocationChange(value, data) {
    if (!value) {
        data.locationRef = null;
    }
}
let User = class User extends IUser {
    /**
     * @param {?} user
     * @return {?}
     */
    static getDisplayName(user) {
        if (user) {
            /** @type {?} */
            let displayName = user.username;
            if (user.firstName && user.lastName) {
                displayName = startCase(user.firstName.toString().toLowerCase()) + ' ' + startCase(user.lastName.toString().toLowerCase());
            }
            else if (user.first_name && user.last_name) {
                displayName = startCase(user.first_name.toString().toLowerCase()) + ' ' + startCase(user.last_name.toString().toLowerCase());
            }
            else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.name) {
                displayName = user._socialIdentity.facebook.name;
            }
            else if (user.email) {
                displayName = user.email;
            }
            else if (user._socialIdentity && user._socialIdentity.facebook && user._socialIdentity.facebook.email) {
                displayName = user._socialIdentity.facebook.email;
            }
            return displayName;
        }
        return '';
    }
    /**
     * @return {?}
     */
    static getSimpleFields() {
        return ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
    }
};
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        visible: false,
        forceExport: true,
        exportOrder: 11
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.photo,
        filterable: false,
        title: 'PHOTO',
        columnDefinition: { width: 52 },
        exportOrder: 10,
        sortable: false,
        allowLibrary: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "imageData", void 0);
tslib_1.__decorate([
    Editable('User', {
        required: true,
        flex: 100,
        type: FormFieldType.email,
        sortable: true,
        disableAutocomplete: true,
        condition: conditions.isNotUpdateMultiple,
        readonly: conditions.isUpdate,
        exportOrder: 1
    }),
    Searchable('User'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    Editable('User', {
        required: false,
        flex: 100,
        type: FormFieldType.email,
        disableAutocomplete: true,
        exportOrder: 6
    }),
    Searchable('User'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    Editable('User', {
        required: true,
        type: FormFieldType.password,
        secondary: true,
        icon: 'yo-password',
        disableAutocomplete: true,
        condition: ROLES_CONDITIONS.isAdminOrClientAdmin,
        filterable: false,
        sortable: false,
        exportOrder: 2
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    Editable('User', {
        required: true,
        flex: 100,
        type: FormFieldType.text,
        sortable: true,
        exportOrder: 4
    }),
    Searchable('User'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    Editable('User', {
        flex: 100,
        required: true,
        type: FormFieldType.text,
        sortable: true,
        exportOrder: 5
    }),
    Searchable('User'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    Editable('User', {
        required: true,
        filterable: true,
        title: 'TENANT',
        type: FormFieldType.autocomplete,
        condition: [ROLES_CONDITIONS.isAdmin],
        collectionName: 'tenants',
        multiple: false,
        columnDefinition: { name: 'name' }
    }),
    tslib_1.__metadata("design:type", Tenant)
], User.prototype, "_tenant", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.toggle,
        flex: 100,
        title: 'TEAM',
        exportOrder: 12,
        condition: [conditions.isCreate, ROLES_CONDITIONS.isAdmin],
        filterableAdvanced: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isTeam", void 0);
tslib_1.__decorate([
    Editable('User', {
        title: 'USERTAGS',
        type: FormFieldType.autocomplete,
        tag: true,
        collectionName: 'user',
        readonly: ROLES_CONDITIONS.isNeitherAdminNorClientAdmin,
        multiple: true,
        icon: 'yo-flag',
        subQuery: { field: 'ownerRef', values: '_id' },
        exportOrder: 13
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "tags", void 0);
tslib_1.__decorate([
    Editable('User', {
        flex: 100,
        required: true,
        filterable: true,
        readonly: ROLES_CONDITIONS.isNeitherAdminNorClientAdmin,
        type: FormFieldType.autocomplete,
        exportOrder: 15,
        values: IRoles,
        translate: true,
        filterableAdvanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    Editable('User', {
        flex: 50,
        type: FormFieldType.tel,
        exportOrder: 7,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "telephone", void 0);
tslib_1.__decorate([
    Editable('User', {
        flex: 50,
        type: FormFieldType.text,
        exportOrder: 8,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "company", void 0);
tslib_1.__decorate([
    Editable('User', {
        flex: 50,
        type: FormFieldType.date,
        suppressExport: true,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    Editable('User', {
        flex: 50,
        type: FormFieldType.autocomplete,
        values: ['MALE', 'FEMALE'],
        translate: true,
        suppressExport: true,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "gender", void 0);
tslib_1.__decorate([
    Editable('User', { type: FormFieldType.address, exportOrder: 9, advanced: true }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    Editable('User', {
        title: 'LOCATION',
        filterable: true,
        type: FormFieldType.autocomplete,
        onChange: onUserLocationChange,
        collectionName: 'locations',
        deleteOnHidden: false,
        readonly: ROLES_CONDITIONS.isNotManager,
        suppressExport: true,
        clearable: true
    }) //, conditions.isNotYoobicAdmin
    ,
    tslib_1.__metadata("design:type", Location)
], User.prototype, "location", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        visible: false,
        forceExport: true,
        exportOrder: 14,
        filterable: false
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "locationRef", void 0);
tslib_1.__decorate([
    Editable('User', {
        required: true,
        name: '_acl.groups.r',
        columnDefinition: { name: '_acl?.groups?.r', forceName: true },
        title: 'GROUPS',
        condition: (/** @type {?} */ ([ROLES_CONDITIONS.isAdminOrClientAdmin, (/** @type {?} */ (conditions.isNotSarahMartin)), conditions.isNotYoobicAdmin])),
        type: FormFieldType.autocomplete,
        allowCustomTag: true,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        multiple: true,
        clearable: false,
        exportOrder: 3,
        deleteOnHidden: false,
        mapTransform: getGroupsTransform
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "_aclGroupsR", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.date,
        name: '_lmt',
        title: 'LASTSEEN',
        sortable: true,
        filterable: true,
        readonly: true,
        suppressExport: true,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "lastSeen", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: false,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "version", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: false,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "mobileVersion", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: true,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "platform", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: true,
        filterableAdvanced: true,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "language", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: true,
        filterable: false,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "device", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: true,
        filterable: false,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "uuid", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.text,
        readonly: true,
        suppressExport: true,
        filterable: false,
        advanced: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "target", void 0);
tslib_1.__decorate([
    Editable('User', {
        title: 'MAXWIDTH',
        type: FormFieldType.number,
        condition: ROLES_CONDITIONS.isAdmin,
        suppressExport: true,
        filterable: false
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "photoMaxWidth", void 0);
tslib_1.__decorate([
    Editable('User', {
        title: 'SSO',
        type: FormFieldType.toggle,
        condition: ROLES_CONDITIONS.isAdmin,
        exportOrder: 18
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "sso", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.toggle,
        condition: ROLES_CONDITIONS.isAdmin,
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "disableTracking", void 0);
tslib_1.__decorate([
    Editable('User', {
        type: FormFieldType.toggle,
        condition: ROLES_CONDITIONS.isAdmin,
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "disableDatabaseSync", void 0);
User = tslib_1.__decorate([
    Model({
        className: 'User',
        collectionName: 'user',
        fields: ['*'],
        include: ['location', '_tenant'],
        icon: 'yo-user'
    })
], User);
export { User };
if (false) {
    /** @type {?} */
    User.prototype._id;
    /** @type {?} */
    User.prototype.imageData;
    /** @type {?} */
    User.prototype.username;
    /** @type {?} */
    User.prototype.email;
    /** @type {?} */
    User.prototype.password;
    /** @type {?} */
    User.prototype.firstName;
    /** @type {?} */
    User.prototype.lastName;
    /** @type {?} */
    User.prototype._tenant;
    /** @type {?} */
    User.prototype.isTeam;
    /** @type {?} */
    User.prototype.tags;
    /** @type {?} */
    User.prototype.role;
    /** @type {?} */
    User.prototype.telephone;
    /** @type {?} */
    User.prototype.company;
    /** @type {?} */
    User.prototype.position;
    /** @type {?} */
    User.prototype.dateOfBirth;
    /** @type {?} */
    User.prototype.gender;
    /** @type {?} */
    User.prototype.address;
    /** @type {?} */
    User.prototype.location;
    /** @type {?} */
    User.prototype.locationRef;
    /** @type {?} */
    User.prototype._aclGroupsR;
    /** @type {?} */
    User.prototype.lastSeen;
    /** @type {?} */
    User.prototype.version;
    /** @type {?} */
    User.prototype.mobileVersion;
    /** @type {?} */
    User.prototype.platform;
    /** @type {?} */
    User.prototype.language;
    /** @type {?} */
    User.prototype.device;
    /** @type {?} */
    User.prototype.uuid;
    /** @type {?} */
    User.prototype.target;
    /** @type {?} */
    User.prototype.photoMaxWidth;
    /** @type {?} */
    User.prototype.sso;
    /** @type {?} */
    User.prototype.disableTracking;
    /** @type {?} */
    User.prototype.disableDatabaseSync;
}
let UserSettings = class UserSettings extends IUserSettings {
};
tslib_1.__decorate([
    Editable('UserSettings', {
        type: FormFieldType.toggle,
        header: 'NOTIFICATIONS',
        flex: 100,
        title: 'DISABLEALLEMAILS',
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSettings.prototype, "disableEmailNotifications", void 0);
tslib_1.__decorate([
    Editable('UserSettings', {
        type: FormFieldType.toggle,
        flex: 100,
        title: 'DISABLEALLPUSH',
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSettings.prototype, "disablePushNotifications", void 0);
tslib_1.__decorate([
    Editable('UserSettings', {
        type: FormFieldType.toggle,
        flex: 100,
        title: 'DISABLEALLSMS',
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSettings.prototype, "disableSmsNotifications", void 0);
tslib_1.__decorate([
    Editable('UserSettings', {
        type: FormFieldType.toggle,
        flex: 100,
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSettings.prototype, "sendFinishedEmail", void 0);
tslib_1.__decorate([
    Editable('UserSettings', {
        title: 'MAXWIDTH',
        header: 'PHOTOS',
        type: FormFieldType.number,
        suppressExport: true,
        filterable: false,
        min: 600,
        max: 10240
    }),
    tslib_1.__metadata("design:type", Number)
], UserSettings.prototype, "photoMaxWidth", void 0);
tslib_1.__decorate([
    Editable('UserSettings', {
        type: FormFieldType.toggle,
        flex: 100,
        title: 'DELETEPHOTOSINALBUM',
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSettings.prototype, "deletePhotos", void 0);
tslib_1.__decorate([
    Editable('UserSettings', {
        type: FormFieldType.toggle,
        flex: 100,
        header: 'MISSIONS',
        title: 'ENABLEMISSIONLIVESYNC',
        condition: ROLES_CONDITIONS.isAdmin,
        suppressExport: true,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSettings.prototype, "enableMissionLiveSync", void 0);
UserSettings = tslib_1.__decorate([
    Model({ className: 'UserSettings' })
], UserSettings);
export { UserSettings };
if (false) {
    /** @type {?} */
    UserSettings.prototype.useBigFonts;
    /** @type {?} */
    UserSettings.prototype.disableHapticFeedback;
    /** @type {?} */
    UserSettings.prototype.showScrollbars;
    /** @type {?} */
    UserSettings.prototype.disableEmailNotifications;
    /** @type {?} */
    UserSettings.prototype.disablePushNotifications;
    /** @type {?} */
    UserSettings.prototype.disableSmsNotifications;
    /** @type {?} */
    UserSettings.prototype.sendFinishedEmail;
    /** @type {?} */
    UserSettings.prototype.photoMaxWidth;
    /** @type {?} */
    UserSettings.prototype.deletePhotos;
    /** @type {?} */
    UserSettings.prototype.enableMissionLiveSync;
    /** @type {?} */
    UserSettings.prototype.allowPhotoEdit;
    /** @type {?} */
    UserSettings.prototype.disablePhotoOrientationAutoFix;
    /** @type {?} */
    UserSettings.prototype.orderServicesByDate;
    /** @type {?} */
    UserSettings.prototype.goToBasket;
    /** @type {?} */
    UserSettings.prototype.radius;
    /** @type {?} */
    UserSettings.prototype.timezone;
}
let SimpleUser = class SimpleUser extends ISimpleUser {
};
tslib_1.__decorate([
    Editable('SimpleUser', { type: FormFieldType.text, visible: false }),
    tslib_1.__metadata("design:type", String)
], SimpleUser.prototype, "_id", void 0);
tslib_1.__decorate([
    Editable('SimpleUser', {
        visible: true,
        type: FormFieldType.photo,
        filterable: false,
        title: 'PHOTO',
        columnDefinition: { width: 52 }
    }),
    tslib_1.__metadata("design:type", String)
], SimpleUser.prototype, "imageData", void 0);
tslib_1.__decorate([
    Editable('SimpleUser', { required: true, type: FormFieldType.email }),
    Searchable('SimpleUser'),
    tslib_1.__metadata("design:type", String)
], SimpleUser.prototype, "username", void 0);
tslib_1.__decorate([
    Editable('SimpleUser', { visible: true, required: true, type: FormFieldType.email }),
    Searchable('SimpleUser'),
    tslib_1.__metadata("design:type", String)
], SimpleUser.prototype, "email", void 0);
tslib_1.__decorate([
    Editable('SimpleUser', {
        required: true,
        type: FormFieldType.password,
        condition: conditions.isCreate,
        filterable: false,
        sortable: false
    }),
    tslib_1.__metadata("design:type", String)
], SimpleUser.prototype, "password", void 0);
SimpleUser = tslib_1.__decorate([
    Model({ className: 'SimpleUser' })
], SimpleUser);
export { SimpleUser };
if (false) {
    /** @type {?} */
    SimpleUser.prototype._id;
    /** @type {?} */
    SimpleUser.prototype.imageData;
    /** @type {?} */
    SimpleUser.prototype.username;
    /** @type {?} */
    SimpleUser.prototype.email;
    /** @type {?} */
    SimpleUser.prototype.password;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy91c2VyL3VzZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBUyxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXhGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7O0lBRWxDLFVBQVUsR0FBRztJQUNmLFFBQVEsRUFBRSwrQkFBK0I7SUFDekMsUUFBUSxFQUFFLDJCQUEyQjtJQUNyQyxtQkFBbUIsRUFBRSw4Q0FBOEM7OztJQUduRSxnQkFBZ0IsRUFBRSx3Q0FBd0M7SUFDMUQsZ0JBQWdCLEVBQUUsbUdBQW1HO0NBQ3RIOzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUk7SUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQztJQVNZLElBQUksU0FBSixJQUFLLFNBQVEsS0FBSzs7Ozs7SUFtVTdCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBUztRQUM3QixJQUFJLElBQUksRUFB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QixDQUFDOzs0Q0FDZTtBQTdCTixVQUFVO0lBRHRCLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBQztHQUN0QixVQUFVLENBOEJ0QjtTQTlCWSxVQUFVOzs7SUFFckIseUJBQ2E7O0lBRWIsK0JBT2tCOztJQUVsQiw4QkFFaUI7O0lBRWpCLDJCQUVjOztJQUVkLDhCQU9pQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElVc2VyLCBJVXNlclNldHRpbmdzLCBJU2ltcGxlVXNlciwgSVJvbGUsIElSb2xlcyB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJy4uL2xvY2F0aW9uL2xvY2F0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUZW5hbnQgfSBmcm9tICcuLi90ZW5hbnQvdGVuYW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXRHcm91cHNUcmFuc2Zvcm0sIFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IHN0YXJ0Q2FzZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBpc0NyZWF0ZTogJ25vdCBnZXRBdHRyaWJ1dGVWYWx1ZShcIl9lY3RcIiknLFxuICBpc1VwZGF0ZTogJ2dldEF0dHJpYnV0ZVZhbHVlKFwiX2VjdFwiKScsXG4gIGlzTm90VXBkYXRlTXVsdGlwbGU6ICdub3QgKGdldEF0dHJpYnV0ZVZhbHVlKFwiX2lkXCIpID09IFwibXVsdGlwbGVcIiknLFxuICAvL2lzVGVhbTogJyBpc1RlYW0gPT0gMScsXG4gIC8vaXNOb3RUZWFtOiAnIG5vdCAoaXNUZWFtID09IDEpJyxcbiAgaXNOb3RTYXJhaE1hcnRpbjogJ25vdCAodXNlcm5hbWUgPT0gXCJzbWFydGluQHlvb2JpYy5jb21cIiknLFxuICBpc05vdFlvb2JpY0FkbWluOiAnbm90IChlbmRzV2l0aChnZXRBdHRyaWJ1dGVWYWx1ZShcInVzZXJuYW1lXCIpLFwiQHlvb2JpYy5jb21cIikgPT0gMSBhbmQgbGVuZ3RoKFwiX2FjbC5ncm91cHMuclwiKSA9PSAwKSdcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblVzZXJMb2NhdGlvbkNoYW5nZSh2YWx1ZSwgZGF0YSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgZGF0YS5sb2NhdGlvblJlZiA9IG51bGw7XG4gIH1cbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnVXNlcicsXG4gIGNvbGxlY3Rpb25OYW1lOiAndXNlcicsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnbG9jYXRpb24nLCAnX3RlbmFudCddLFxuICBpY29uOiAneW8tdXNlcidcbn0pXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIElVc2VyIHtcbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMTFcbiAgfSlcbiAgX2lkPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnBob3RvLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHRpdGxlOiAnUEhPVE8nLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDUyIH0sXG4gICAgZXhwb3J0T3JkZXI6IDEwLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBhbGxvd0xpYnJhcnk6IHRydWVcbiAgfSlcbiAgaW1hZ2VEYXRhPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBmbGV4OiAxMDAsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5lbWFpbCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBkaXNhYmxlQXV0b2NvbXBsZXRlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdFVwZGF0ZU11bHRpcGxlLFxuICAgIHJlYWRvbmx5OiBjb25kaXRpb25zLmlzVXBkYXRlLFxuICAgIGV4cG9ydE9yZGVyOiAxXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdVc2VyJylcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsLFxuICAgIGRpc2FibGVBdXRvY29tcGxldGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDZcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ1VzZXInKVxuICBlbWFpbD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5wYXNzd29yZCxcbiAgICBzZWNvbmRhcnk6IHRydWUsXG4gICAgaWNvbjogJ3lvLXBhc3N3b3JkJyxcbiAgICBkaXNhYmxlQXV0b2NvbXBsZXRlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluT3JDbGllbnRBZG1pbixcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgZXhwb3J0T3JkZXI6IDJcbiAgfSlcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDRcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ1VzZXInKVxuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIGZsZXg6IDEwMCxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDVcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ1VzZXInKVxuICBsYXN0TmFtZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3RlbmFudHMnLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9XG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgZmxleDogMTAwLFxuICAgIHRpdGxlOiAnVEVBTScsXG4gICAgZXhwb3J0T3JkZXI6IDEyLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNDcmVhdGUsIFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl0sXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGlzVGVhbT86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHRpdGxlOiAnVVNFUlRBR1MnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3VzZXInLFxuICAgIHJlYWRvbmx5OiBST0xFU19DT05ESVRJT05TLmlzTmVpdGhlckFkbWluTm9yQ2xpZW50QWRtaW4sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgaWNvbjogJ3lvLWZsYWcnLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnb3duZXJSZWYnLCB2YWx1ZXM6ICdfaWQnIH0sXG4gICAgZXhwb3J0T3JkZXI6IDEzXG4gIH0pXG4gIHRhZ3M/OiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHtcbiAgICBmbGV4OiAxMDAsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICByZWFkb25seTogUk9MRVNfQ09ORElUSU9OUy5pc05laXRoZXJBZG1pbk5vckNsaWVudEFkbWluLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGV4cG9ydE9yZGVyOiAxNSxcbiAgICB2YWx1ZXM6IElSb2xlcyxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHJvbGU/OiBJUm9sZTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgZmxleDogNTAsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZWwsXG4gICAgZXhwb3J0T3JkZXI6IDcsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHRlbGVwaG9uZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgZmxleDogNTAsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGV4cG9ydE9yZGVyOiA4LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjb21wYW55Pzogc3RyaW5nO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyJywgeyBmbGV4OiAxMDAsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgZXhwb3J0T3JkZXI6IDE2LCBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUgfSlcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIGZsZXg6IDUwLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgZGF0ZU9mQmlydGg/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIGZsZXg6IDUwLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogWydNQUxFJywgJ0ZFTUFMRSddLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgZ2VuZGVyPzogc3RyaW5nO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsLCBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOb3RUZWFtLCBleHBvcnRPcmRlcjogMTcsIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSB9KVxuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5hZGRyZXNzLCBleHBvcnRPcmRlcjogOSwgYWR2YW5jZWQ6IHRydWUgfSlcbiAgYWRkcmVzcz86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdGl0bGU6ICdMT0NBVElPTicsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBvbkNoYW5nZTogb25Vc2VyTG9jYXRpb25DaGFuZ2UsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgIGRlbGV0ZU9uSGlkZGVuOiBmYWxzZSxcbiAgICByZWFkb25seTogUk9MRVNfQ09ORElUSU9OUy5pc05vdE1hbmFnZXIsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgY2xlYXJhYmxlOiB0cnVlXG4gIH0pIC8vLCBjb25kaXRpb25zLmlzTm90WW9vYmljQWRtaW5cbiAgbG9jYXRpb24/OiBMb2NhdGlvbjtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGZvcmNlRXhwb3J0OiB0cnVlLFxuICAgIGV4cG9ydE9yZGVyOiAxNCxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZVxuICB9KVxuICBsb2NhdGlvblJlZj86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbmFtZTogJ19hY2wuZ3JvdXBzLnInLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ19hY2w/Lmdyb3Vwcz8ucicsIGZvcmNlTmFtZTogdHJ1ZSB9LFxuICAgIHRpdGxlOiAnR1JPVVBTJyxcbiAgICBjb25kaXRpb246IDxhbnk+W1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbk9yQ2xpZW50QWRtaW4sIDxhbnk+Y29uZGl0aW9ucy5pc05vdFNhcmFoTWFydGluLCBjb25kaXRpb25zLmlzTm90WW9vYmljQWRtaW5dLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIGV4cG9ydE9yZGVyOiAzLFxuICAgIGRlbGV0ZU9uSGlkZGVuOiBmYWxzZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybVxuICB9KVxuICBfYWNsR3JvdXBzUj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRlLFxuICAgIG5hbWU6ICdfbG10JyxcbiAgICB0aXRsZTogJ0xBU1RTRUVOJyxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlLFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBsYXN0U2Vlbj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgdmVyc2lvbj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbW9iaWxlVmVyc2lvbj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBwbGF0Zm9ybT86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBsYW5ndWFnZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGRldmljZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHV1aWQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICByZWFkb25seTogdHJ1ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICB0YXJnZXQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHRpdGxlOiAnTUFYV0lEVEgnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlXG4gIH0pXG4gIHBob3RvTWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHRpdGxlOiAnU1NPJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbixcbiAgICBleHBvcnRPcmRlcjogMThcbiAgfSlcbiAgc3NvPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW4sXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGRpc2FibGVUcmFja2luZz86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkaXNhYmxlRGF0YWJhc2VTeW5jPzogYm9vbGVhbjtcblxuICBzdGF0aWMgZ2V0RGlzcGxheU5hbWUodXNlcjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodXNlcikge1xuICAgICAgbGV0IGRpc3BsYXlOYW1lID0gdXNlci51c2VybmFtZTtcbiAgICAgIGlmICh1c2VyLmZpcnN0TmFtZSAmJiB1c2VyLmxhc3ROYW1lKSB7XG4gICAgICAgIGRpc3BsYXlOYW1lID0gc3RhcnRDYXNlKHVzZXIuZmlyc3ROYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgKyAnICcgKyBzdGFydENhc2UodXNlci5sYXN0TmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSBlbHNlIGlmICh1c2VyLmZpcnN0X25hbWUgJiYgdXNlci5sYXN0X25hbWUpIHtcbiAgICAgICAgZGlzcGxheU5hbWUgPSBzdGFydENhc2UodXNlci5maXJzdF9uYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgKyAnICcgKyBzdGFydENhc2UodXNlci5sYXN0X25hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodXNlci5fc29jaWFsSWRlbnRpdHkgJiYgdXNlci5fc29jaWFsSWRlbnRpdHkuZmFjZWJvb2sgJiYgdXNlci5fc29jaWFsSWRlbnRpdHkuZmFjZWJvb2submFtZSkge1xuICAgICAgICBkaXNwbGF5TmFtZSA9IHVzZXIuX3NvY2lhbElkZW50aXR5LmZhY2Vib29rLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHVzZXIuZW1haWwpIHtcbiAgICAgICAgZGlzcGxheU5hbWUgPSB1c2VyLmVtYWlsO1xuICAgICAgfSBlbHNlIGlmICh1c2VyLl9zb2NpYWxJZGVudGl0eSAmJiB1c2VyLl9zb2NpYWxJZGVudGl0eS5mYWNlYm9vayAmJiB1c2VyLl9zb2NpYWxJZGVudGl0eS5mYWNlYm9vay5lbWFpbCkge1xuICAgICAgICBkaXNwbGF5TmFtZSA9IHVzZXIuX3NvY2lhbElkZW50aXR5LmZhY2Vib29rLmVtYWlsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRpc3BsYXlOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2ltcGxlRmllbGRzKCkge1xuICAgIHJldHVybiBbJ19pZCcsICdpbWFnZURhdGEnLCAnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ2VtYWlsJywgJ3RlbGVwaG9uZScsICd1c2VybmFtZSddO1xuICB9XG59XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ1VzZXJTZXR0aW5ncycgfSlcbmV4cG9ydCBjbGFzcyBVc2VyU2V0dGluZ3MgZXh0ZW5kcyBJVXNlclNldHRpbmdzIHtcbiAgLy9ARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIGZsZXg6IDEwMCwgc3VwcHJlc3NFeHBvcnQ6IHRydWUsIGZpbHRlcmFibGU6IGZhbHNlLCBzb3J0YWJsZTogZmFsc2UgfSlcbiAgdXNlQmlnRm9udHM6IGJvb2xlYW47XG5cbiAgLy8gQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBmbGV4OiAxMDAsIHRpdGxlOiAnRElTQUJMRUhBUFRJQ0ZFRURCQUNLJywgc3VwcHJlc3NFeHBvcnQ6IHRydWUsIGZpbHRlcmFibGU6IGZhbHNlLCBzb3J0YWJsZTogZmFsc2UgfSlcbiAgZGlzYWJsZUhhcHRpY0ZlZWRiYWNrOiBib29sZWFuO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBmbGV4OiAxMDAsIHN1cHByZXNzRXhwb3J0OiB0cnVlLCBmaWx0ZXJhYmxlOiBmYWxzZSwgc29ydGFibGU6IGZhbHNlIH0pXG4gIHNob3dTY3JvbGxiYXJzOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGhlYWRlcjogJ05PVElGSUNBVElPTlMnLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RJU0FCTEVBTExFTUFJTFMnLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkaXNhYmxlRW1haWxOb3RpZmljYXRpb25zOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RJU0FCTEVBTExQVVNIJyxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgZGlzYWJsZVB1c2hOb3RpZmljYXRpb25zOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RJU0FCTEVBTExTTVMnLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkaXNhYmxlU21zTm90aWZpY2F0aW9uczogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBmbGV4OiAxMDAsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIHNlbmRGaW5pc2hlZEVtYWlsOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHRpdGxlOiAnTUFYV0lEVEgnLFxuICAgIGhlYWRlcjogJ1BIT1RPUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgbWluOiA2MDAsXG4gICAgbWF4OiAxMDI0MFxuICB9KVxuICBwaG90b01heFdpZHRoPzogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RFTEVURVBIT1RPU0lOQUxCVU0nLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkZWxldGVQaG90b3M6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgZmxleDogMTAwLFxuICAgIGhlYWRlcjogJ01JU1NJT05TJyxcbiAgICB0aXRsZTogJ0VOQUJMRU1JU1NJT05MSVZFU1lOQycsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW4sXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGVuYWJsZU1pc3Npb25MaXZlU3luYzogYm9vbGVhbjtcblxuICAvL0BFZGl0YWJsZSgnVXNlclNldHRpbmdzJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSwgZmxleDogMTAwLCBzdXBwcmVzc0V4cG9ydDogdHJ1ZSwgZmlsdGVyYWJsZTogZmFsc2UsIHNvcnRhYmxlOiBmYWxzZSB9KVxuICBhbGxvd1Bob3RvRWRpdDogYm9vbGVhbjtcblxuICAvL0BFZGl0YWJsZSgnVXNlclNldHRpbmdzJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSwgZmxleDogMTAwLCBzdXBwcmVzc0V4cG9ydDogdHJ1ZSwgZmlsdGVyYWJsZTogZmFsc2UsIHNvcnRhYmxlOiBmYWxzZSB9KVxuICBkaXNhYmxlUGhvdG9PcmllbnRhdGlvbkF1dG9GaXg6IGJvb2xlYW47XG5cbiAgLy9ARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIGZsZXg6IDEwMCwgaGVhZGVyOiAnU0VSVklDRVMnLCBzdXBwcmVzc0V4cG9ydDogdHJ1ZSwgZmlsdGVyYWJsZTogZmFsc2UsIHNvcnRhYmxlOiBmYWxzZSB9KVxuICBvcmRlclNlcnZpY2VzQnlEYXRlOiBib29sZWFuO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBoZWFkZXI6ICdNSVNTSU9OUycsIGZsZXg6IDEwMCwgc3VwcHJlc3NFeHBvcnQ6IHRydWUsIGZpbHRlcmFibGU6IGZhbHNlLCBzb3J0YWJsZTogZmFsc2UgfSlcbiAgZ29Ub0Jhc2tldDogYm9vbGVhbjtcblxuICAvLyBARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHtcbiAgLy8gICB0eXBlOiBGb3JtRmllbGRUeXBlLnJhbmdlLFxuICAvLyAgIGhlYWRlcjogJ0ZJTFRFUlMnLFxuICAvLyAgIG1pbjogMSxcbiAgLy8gICBtYXg6IDQwMCxcbiAgLy8gICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgLy8gICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgLy8gfSlcbiAgcmFkaXVzOiBhbnk7XG5cbiAgLy8gQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLCB2YWx1ZXM6IG1vbWVudFRpbWVab25lLnR6Lm5hbWVzKCkgfSlcbiAgdGltZXpvbmU6IGFueTtcblxuICAvLyBARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5zZWxlY3RidXR0b25zLCBmbGV4OiAxMDAsIHN1cHByZXNzRXhwb3J0OiB0cnVlLCBmaWx0ZXJhYmxlOiBmYWxzZSwgc29ydGFibGU6IGZhbHNlLCB2YWx1ZXM6IFsnWUVTJywgJ05PJ10gfSlcbiAgLy8gdGVzdDtcbn1cblxuQE1vZGVsKHsgY2xhc3NOYW1lOiAnU2ltcGxlVXNlcicgfSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVVc2VyIGV4dGVuZHMgSVNpbXBsZVVzZXIge1xuICAvLyBleHBvcnQgY2xhc3MgU2ltcGxlVXNlciBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgdmlzaWJsZTogZmFsc2UgfSlcbiAgX2lkPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnU2ltcGxlVXNlcicsIHtcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUucGhvdG8sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgdGl0bGU6ICdQSE9UTycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogNTIgfVxuICB9KVxuICBpbWFnZURhdGE6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsIH0pXG4gIEBTZWFyY2hhYmxlKCdTaW1wbGVVc2VyJylcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7IHZpc2libGU6IHRydWUsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsIH0pXG4gIEBTZWFyY2hhYmxlKCdTaW1wbGVVc2VyJylcbiAgZW1haWw6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5wYXNzd29yZCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNDcmVhdGUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iXX0=