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
var conditions = {
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
var User = /** @class */ (function (_super) {
    tslib_1.__extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} user
     * @return {?}
     */
    User.getDisplayName = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        if (user) {
            /** @type {?} */
            var displayName = user.username;
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
    };
    /**
     * @return {?}
     */
    User.getSimpleFields = /**
     * @return {?}
     */
    function () {
        return ['_id', 'imageData', 'firstName', 'lastName', 'email', 'telephone', 'username'];
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
    return User;
}(IUser));
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
var UserSettings = /** @class */ (function (_super) {
    tslib_1.__extends(UserSettings, _super);
    function UserSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return UserSettings;
}(IUserSettings));
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
var SimpleUser = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleUser, _super);
    function SimpleUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return SimpleUser;
}(ISimpleUser));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy91c2VyL3VzZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBUyxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXhGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7O0lBRWxDLFVBQVUsR0FBRztJQUNmLFFBQVEsRUFBRSwrQkFBK0I7SUFDekMsUUFBUSxFQUFFLDJCQUEyQjtJQUNyQyxtQkFBbUIsRUFBRSw4Q0FBOEM7OztJQUduRSxnQkFBZ0IsRUFBRSx3Q0FBd0M7SUFDMUQsZ0JBQWdCLEVBQUUsbUdBQW1HO0NBQ3RIOzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBSyxFQUFFLElBQUk7SUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQzs7SUFTeUIsZ0NBQUs7OztJQXlWL0IsQ0FBQzs7Ozs7SUF0QlEsbUJBQWM7Ozs7SUFBckIsVUFBc0IsSUFBUztRQUM3QixJQUFJLElBQUksRUFBRTs7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akIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQzs7Z0RBQ2U7SUE3Qk4sVUFBVTtRQUR0QixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUM7T0FDdEIsVUFBVSxDQThCdEI7SUFBRCxpQkFBQztDQUFBLENBOUIrQixXQUFXLEdBOEIxQztTQTlCWSxVQUFVOzs7SUFFckIseUJBQ2E7O0lBRWIsK0JBT2tCOztJQUVsQiw4QkFFaUI7O0lBRWpCLDJCQUVjOztJQUVkLDhCQU9pQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElVc2VyLCBJVXNlclNldHRpbmdzLCBJU2ltcGxlVXNlciwgSVJvbGUsIElSb2xlcyB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJy4uL2xvY2F0aW9uL2xvY2F0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUZW5hbnQgfSBmcm9tICcuLi90ZW5hbnQvdGVuYW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXRHcm91cHNUcmFuc2Zvcm0sIFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IHN0YXJ0Q2FzZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBpc0NyZWF0ZTogJ25vdCBnZXRBdHRyaWJ1dGVWYWx1ZShcIl9lY3RcIiknLFxuICBpc1VwZGF0ZTogJ2dldEF0dHJpYnV0ZVZhbHVlKFwiX2VjdFwiKScsXG4gIGlzTm90VXBkYXRlTXVsdGlwbGU6ICdub3QgKGdldEF0dHJpYnV0ZVZhbHVlKFwiX2lkXCIpID09IFwibXVsdGlwbGVcIiknLFxuICAvL2lzVGVhbTogJyBpc1RlYW0gPT0gMScsXG4gIC8vaXNOb3RUZWFtOiAnIG5vdCAoaXNUZWFtID09IDEpJyxcbiAgaXNOb3RTYXJhaE1hcnRpbjogJ25vdCAodXNlcm5hbWUgPT0gXCJzbWFydGluQHlvb2JpYy5jb21cIiknLFxuICBpc05vdFlvb2JpY0FkbWluOiAnbm90IChlbmRzV2l0aChnZXRBdHRyaWJ1dGVWYWx1ZShcInVzZXJuYW1lXCIpLFwiQHlvb2JpYy5jb21cIikgPT0gMSBhbmQgbGVuZ3RoKFwiX2FjbC5ncm91cHMuclwiKSA9PSAwKSdcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblVzZXJMb2NhdGlvbkNoYW5nZSh2YWx1ZSwgZGF0YSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgZGF0YS5sb2NhdGlvblJlZiA9IG51bGw7XG4gIH1cbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnVXNlcicsXG4gIGNvbGxlY3Rpb25OYW1lOiAndXNlcicsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnbG9jYXRpb24nLCAnX3RlbmFudCddLFxuICBpY29uOiAneW8tdXNlcidcbn0pXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIElVc2VyIHtcbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMTFcbiAgfSlcbiAgX2lkPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnBob3RvLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHRpdGxlOiAnUEhPVE8nLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDUyIH0sXG4gICAgZXhwb3J0T3JkZXI6IDEwLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBhbGxvd0xpYnJhcnk6IHRydWVcbiAgfSlcbiAgaW1hZ2VEYXRhPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBmbGV4OiAxMDAsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5lbWFpbCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBkaXNhYmxlQXV0b2NvbXBsZXRlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc05vdFVwZGF0ZU11bHRpcGxlLFxuICAgIHJlYWRvbmx5OiBjb25kaXRpb25zLmlzVXBkYXRlLFxuICAgIGV4cG9ydE9yZGVyOiAxXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdVc2VyJylcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsLFxuICAgIGRpc2FibGVBdXRvY29tcGxldGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDZcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ1VzZXInKVxuICBlbWFpbD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5wYXNzd29yZCxcbiAgICBzZWNvbmRhcnk6IHRydWUsXG4gICAgaWNvbjogJ3lvLXBhc3N3b3JkJyxcbiAgICBkaXNhYmxlQXV0b2NvbXBsZXRlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluT3JDbGllbnRBZG1pbixcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgZXhwb3J0T3JkZXI6IDJcbiAgfSlcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDRcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ1VzZXInKVxuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIGZsZXg6IDEwMCxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDVcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ1VzZXInKVxuICBsYXN0TmFtZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3RlbmFudHMnLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9XG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgZmxleDogMTAwLFxuICAgIHRpdGxlOiAnVEVBTScsXG4gICAgZXhwb3J0T3JkZXI6IDEyLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMuaXNDcmVhdGUsIFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl0sXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGlzVGVhbT86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHRpdGxlOiAnVVNFUlRBR1MnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3VzZXInLFxuICAgIHJlYWRvbmx5OiBST0xFU19DT05ESVRJT05TLmlzTmVpdGhlckFkbWluTm9yQ2xpZW50QWRtaW4sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgaWNvbjogJ3lvLWZsYWcnLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnb3duZXJSZWYnLCB2YWx1ZXM6ICdfaWQnIH0sXG4gICAgZXhwb3J0T3JkZXI6IDEzXG4gIH0pXG4gIHRhZ3M/OiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHtcbiAgICBmbGV4OiAxMDAsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICByZWFkb25seTogUk9MRVNfQ09ORElUSU9OUy5pc05laXRoZXJBZG1pbk5vckNsaWVudEFkbWluLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGV4cG9ydE9yZGVyOiAxNSxcbiAgICB2YWx1ZXM6IElSb2xlcyxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHJvbGU/OiBJUm9sZTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgZmxleDogNTAsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZWwsXG4gICAgZXhwb3J0T3JkZXI6IDcsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHRlbGVwaG9uZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgZmxleDogNTAsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGV4cG9ydE9yZGVyOiA4LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBjb21wYW55Pzogc3RyaW5nO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyJywgeyBmbGV4OiAxMDAsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgZXhwb3J0T3JkZXI6IDE2LCBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUgfSlcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIGZsZXg6IDUwLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgZGF0ZU9mQmlydGg/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIGZsZXg6IDUwLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogWydNQUxFJywgJ0ZFTUFMRSddLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgZ2VuZGVyPzogc3RyaW5nO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsLCBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNOb3RUZWFtLCBleHBvcnRPcmRlcjogMTcsIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSB9KVxuXG4gIEBFZGl0YWJsZSgnVXNlcicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5hZGRyZXNzLCBleHBvcnRPcmRlcjogOSwgYWR2YW5jZWQ6IHRydWUgfSlcbiAgYWRkcmVzcz86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdGl0bGU6ICdMT0NBVElPTicsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBvbkNoYW5nZTogb25Vc2VyTG9jYXRpb25DaGFuZ2UsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdsb2NhdGlvbnMnLFxuICAgIGRlbGV0ZU9uSGlkZGVuOiBmYWxzZSxcbiAgICByZWFkb25seTogUk9MRVNfQ09ORElUSU9OUy5pc05vdE1hbmFnZXIsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgY2xlYXJhYmxlOiB0cnVlXG4gIH0pIC8vLCBjb25kaXRpb25zLmlzTm90WW9vYmljQWRtaW5cbiAgbG9jYXRpb24/OiBMb2NhdGlvbjtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGZvcmNlRXhwb3J0OiB0cnVlLFxuICAgIGV4cG9ydE9yZGVyOiAxNCxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZVxuICB9KVxuICBsb2NhdGlvblJlZj86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbmFtZTogJ19hY2wuZ3JvdXBzLnInLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ19hY2w/Lmdyb3Vwcz8ucicsIGZvcmNlTmFtZTogdHJ1ZSB9LFxuICAgIHRpdGxlOiAnR1JPVVBTJyxcbiAgICBjb25kaXRpb246IDxhbnk+W1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbk9yQ2xpZW50QWRtaW4sIDxhbnk+Y29uZGl0aW9ucy5pc05vdFNhcmFoTWFydGluLCBjb25kaXRpb25zLmlzTm90WW9vYmljQWRtaW5dLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIGV4cG9ydE9yZGVyOiAzLFxuICAgIGRlbGV0ZU9uSGlkZGVuOiBmYWxzZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybVxuICB9KVxuICBfYWNsR3JvdXBzUj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRlLFxuICAgIG5hbWU6ICdfbG10JyxcbiAgICB0aXRsZTogJ0xBU1RTRUVOJyxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlLFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBsYXN0U2Vlbj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgdmVyc2lvbj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWUsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbW9iaWxlVmVyc2lvbj86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBwbGF0Zm9ybT86IGFueTtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBsYW5ndWFnZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGRldmljZT86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHV1aWQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICByZWFkb25seTogdHJ1ZSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICB0YXJnZXQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHRpdGxlOiAnTUFYV0lEVEgnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlXG4gIH0pXG4gIHBob3RvTWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHRpdGxlOiAnU1NPJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbixcbiAgICBleHBvcnRPcmRlcjogMThcbiAgfSlcbiAgc3NvPzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1VzZXInLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW4sXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGRpc2FibGVUcmFja2luZz86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdVc2VyJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkaXNhYmxlRGF0YWJhc2VTeW5jPzogYm9vbGVhbjtcblxuICBzdGF0aWMgZ2V0RGlzcGxheU5hbWUodXNlcjogYW55KTogc3RyaW5nIHtcbiAgICBpZiAodXNlcikge1xuICAgICAgbGV0IGRpc3BsYXlOYW1lID0gdXNlci51c2VybmFtZTtcbiAgICAgIGlmICh1c2VyLmZpcnN0TmFtZSAmJiB1c2VyLmxhc3ROYW1lKSB7XG4gICAgICAgIGRpc3BsYXlOYW1lID0gc3RhcnRDYXNlKHVzZXIuZmlyc3ROYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgKyAnICcgKyBzdGFydENhc2UodXNlci5sYXN0TmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfSBlbHNlIGlmICh1c2VyLmZpcnN0X25hbWUgJiYgdXNlci5sYXN0X25hbWUpIHtcbiAgICAgICAgZGlzcGxheU5hbWUgPSBzdGFydENhc2UodXNlci5maXJzdF9uYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgKyAnICcgKyBzdGFydENhc2UodXNlci5sYXN0X25hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH0gZWxzZSBpZiAodXNlci5fc29jaWFsSWRlbnRpdHkgJiYgdXNlci5fc29jaWFsSWRlbnRpdHkuZmFjZWJvb2sgJiYgdXNlci5fc29jaWFsSWRlbnRpdHkuZmFjZWJvb2submFtZSkge1xuICAgICAgICBkaXNwbGF5TmFtZSA9IHVzZXIuX3NvY2lhbElkZW50aXR5LmZhY2Vib29rLm5hbWU7XG4gICAgICB9IGVsc2UgaWYgKHVzZXIuZW1haWwpIHtcbiAgICAgICAgZGlzcGxheU5hbWUgPSB1c2VyLmVtYWlsO1xuICAgICAgfSBlbHNlIGlmICh1c2VyLl9zb2NpYWxJZGVudGl0eSAmJiB1c2VyLl9zb2NpYWxJZGVudGl0eS5mYWNlYm9vayAmJiB1c2VyLl9zb2NpYWxJZGVudGl0eS5mYWNlYm9vay5lbWFpbCkge1xuICAgICAgICBkaXNwbGF5TmFtZSA9IHVzZXIuX3NvY2lhbElkZW50aXR5LmZhY2Vib29rLmVtYWlsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRpc3BsYXlOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2ltcGxlRmllbGRzKCkge1xuICAgIHJldHVybiBbJ19pZCcsICdpbWFnZURhdGEnLCAnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ2VtYWlsJywgJ3RlbGVwaG9uZScsICd1c2VybmFtZSddO1xuICB9XG59XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ1VzZXJTZXR0aW5ncycgfSlcbmV4cG9ydCBjbGFzcyBVc2VyU2V0dGluZ3MgZXh0ZW5kcyBJVXNlclNldHRpbmdzIHtcbiAgLy9ARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIGZsZXg6IDEwMCwgc3VwcHJlc3NFeHBvcnQ6IHRydWUsIGZpbHRlcmFibGU6IGZhbHNlLCBzb3J0YWJsZTogZmFsc2UgfSlcbiAgdXNlQmlnRm9udHM6IGJvb2xlYW47XG5cbiAgLy8gQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBmbGV4OiAxMDAsIHRpdGxlOiAnRElTQUJMRUhBUFRJQ0ZFRURCQUNLJywgc3VwcHJlc3NFeHBvcnQ6IHRydWUsIGZpbHRlcmFibGU6IGZhbHNlLCBzb3J0YWJsZTogZmFsc2UgfSlcbiAgZGlzYWJsZUhhcHRpY0ZlZWRiYWNrOiBib29sZWFuO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBmbGV4OiAxMDAsIHN1cHByZXNzRXhwb3J0OiB0cnVlLCBmaWx0ZXJhYmxlOiBmYWxzZSwgc29ydGFibGU6IGZhbHNlIH0pXG4gIHNob3dTY3JvbGxiYXJzOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGhlYWRlcjogJ05PVElGSUNBVElPTlMnLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RJU0FCTEVBTExFTUFJTFMnLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkaXNhYmxlRW1haWxOb3RpZmljYXRpb25zOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RJU0FCTEVBTExQVVNIJyxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgZGlzYWJsZVB1c2hOb3RpZmljYXRpb25zOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RJU0FCTEVBTExTTVMnLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkaXNhYmxlU21zTm90aWZpY2F0aW9uczogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBmbGV4OiAxMDAsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIHNlbmRGaW5pc2hlZEVtYWlsOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHRpdGxlOiAnTUFYV0lEVEgnLFxuICAgIGhlYWRlcjogJ1BIT1RPUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgbWluOiA2MDAsXG4gICAgbWF4OiAxMDI0MFxuICB9KVxuICBwaG90b01heFdpZHRoPzogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnVXNlclNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0aXRsZTogJ0RFTEVURVBIT1RPU0lOQUxCVU0nLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBkZWxldGVQaG90b3M6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgZmxleDogMTAwLFxuICAgIGhlYWRlcjogJ01JU1NJT05TJyxcbiAgICB0aXRsZTogJ0VOQUJMRU1JU1NJT05MSVZFU1lOQycsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW4sXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGVuYWJsZU1pc3Npb25MaXZlU3luYzogYm9vbGVhbjtcblxuICAvL0BFZGl0YWJsZSgnVXNlclNldHRpbmdzJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSwgZmxleDogMTAwLCBzdXBwcmVzc0V4cG9ydDogdHJ1ZSwgZmlsdGVyYWJsZTogZmFsc2UsIHNvcnRhYmxlOiBmYWxzZSB9KVxuICBhbGxvd1Bob3RvRWRpdDogYm9vbGVhbjtcblxuICAvL0BFZGl0YWJsZSgnVXNlclNldHRpbmdzJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSwgZmxleDogMTAwLCBzdXBwcmVzc0V4cG9ydDogdHJ1ZSwgZmlsdGVyYWJsZTogZmFsc2UsIHNvcnRhYmxlOiBmYWxzZSB9KVxuICBkaXNhYmxlUGhvdG9PcmllbnRhdGlvbkF1dG9GaXg6IGJvb2xlYW47XG5cbiAgLy9ARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIGZsZXg6IDEwMCwgaGVhZGVyOiAnU0VSVklDRVMnLCBzdXBwcmVzc0V4cG9ydDogdHJ1ZSwgZmlsdGVyYWJsZTogZmFsc2UsIHNvcnRhYmxlOiBmYWxzZSB9KVxuICBvcmRlclNlcnZpY2VzQnlEYXRlOiBib29sZWFuO1xuXG4gIC8vQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBoZWFkZXI6ICdNSVNTSU9OUycsIGZsZXg6IDEwMCwgc3VwcHJlc3NFeHBvcnQ6IHRydWUsIGZpbHRlcmFibGU6IGZhbHNlLCBzb3J0YWJsZTogZmFsc2UgfSlcbiAgZ29Ub0Jhc2tldDogYm9vbGVhbjtcblxuICAvLyBARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHtcbiAgLy8gICB0eXBlOiBGb3JtRmllbGRUeXBlLnJhbmdlLFxuICAvLyAgIGhlYWRlcjogJ0ZJTFRFUlMnLFxuICAvLyAgIG1pbjogMSxcbiAgLy8gICBtYXg6IDQwMCxcbiAgLy8gICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgLy8gICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgLy8gfSlcbiAgcmFkaXVzOiBhbnk7XG5cbiAgLy8gQEVkaXRhYmxlKCdVc2VyU2V0dGluZ3MnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLCB2YWx1ZXM6IG1vbWVudFRpbWVab25lLnR6Lm5hbWVzKCkgfSlcbiAgdGltZXpvbmU6IGFueTtcblxuICAvLyBARWRpdGFibGUoJ1VzZXJTZXR0aW5ncycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5zZWxlY3RidXR0b25zLCBmbGV4OiAxMDAsIHN1cHByZXNzRXhwb3J0OiB0cnVlLCBmaWx0ZXJhYmxlOiBmYWxzZSwgc29ydGFibGU6IGZhbHNlLCB2YWx1ZXM6IFsnWUVTJywgJ05PJ10gfSlcbiAgLy8gdGVzdDtcbn1cblxuQE1vZGVsKHsgY2xhc3NOYW1lOiAnU2ltcGxlVXNlcicgfSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVVc2VyIGV4dGVuZHMgSVNpbXBsZVVzZXIge1xuICAvLyBleHBvcnQgY2xhc3MgU2ltcGxlVXNlciBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgdmlzaWJsZTogZmFsc2UgfSlcbiAgX2lkPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnU2ltcGxlVXNlcicsIHtcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUucGhvdG8sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgdGl0bGU6ICdQSE9UTycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogNTIgfVxuICB9KVxuICBpbWFnZURhdGE6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsIH0pXG4gIEBTZWFyY2hhYmxlKCdTaW1wbGVVc2VyJylcbiAgdXNlcm5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7IHZpc2libGU6IHRydWUsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlsIH0pXG4gIEBTZWFyY2hhYmxlKCdTaW1wbGVVc2VyJylcbiAgZW1haWw6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NpbXBsZVVzZXInLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5wYXNzd29yZCxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNDcmVhdGUsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iXX0=