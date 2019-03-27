/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Translate } from '@shared/translate';
import { IMissionDescription, IScoring, FormFieldType, IRoles } from '@shared/stencil';
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform, ROLES_CONDITIONS } from '../condition/condition.interface';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';
import { Tenant } from '../tenant/tenant.interface';
import { range } from 'lodash-es';
/** @type {?} */
export var MISSION_TYPES_NO_ADMIN = ['mission'];
/** @type {?} */
export var MISSION_TYPES = ['mission', 'service', 'poll', 'todo', 'lesson'];
//'template',, 'memo'
/** @type {?} */
export var MISSION_STATUS = ['booked', 'finished', 'archived', 'scheduled'];
/** @type {?} */
var conditions = {
    isPoll: 'type == "poll"',
    isMission: 'type == "mission"',
    isQuizz: 'quizz == 1',
    isService: 'type == "service"',
    notService: 'not (type == "service")',
    notPollOrService: 'not (type == "service") and not (type == "poll")',
    isPollOrService: 'type=="poll" or type=="service"' //,
    //isUpdate: 'isNullOrEmpty(getAttributeValue("_ect")) == 0'
};
/**
 * @param {?} value
 * @param {?} data
 * @param {?} field
 * @return {?}
 */
export function onMissionDescriptionTypeChange(value, data, field) {
    // if (value && (value === 'service' || value === 'poll' || value === 'lesson')) {
    //   setTimeout(() => {
    //     controls.language.setValue(controls.language.getValue() || Translate.currentLanguage);
    //   }, 300);
    // }
    // let groupIndex = formDefinition.findIndex(f => f.name === 'group');
    // let group = formDefinition[groupIndex];
    // if (value === 'service') {
    //   group.title = 'SERVICEGROUPS';
    // } else {
    //   group.title = 'MISSIONGROUPS';
    // }
    // formDefinition[groupIndex] = { ...group };
    // return true;
}
var MissionDescription = /** @class */ (function (_super) {
    tslib_1.__extends(MissionDescription, _super);
    function MissionDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('MissionDescription', {
            type: FormFieldType.text,
            visible: false,
            forceExport: true,
            exportOrder: 1
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescription.prototype, "_id", void 0);
    tslib_1.__decorate([
        Editable('MissionDescription', {
            type: FormFieldType.autocomplete,
            title: 'TYPE',
            values: MISSION_TYPES,
            //MISSION_TYPES_NO_ADMIN,
            translate: true,
            clearable: false,
            required: true,
            exportOrder: 3,
            filterable: true,
            onChange: onMissionDescriptionTypeChange
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescription.prototype, "type", void 0);
    tslib_1.__decorate([
        Editable('MissionDescription', {
            required: true,
            title: 'TITLE',
            sortable: true,
            type: FormFieldType.text,
            exportOrder: 2
        }),
        Searchable('MissionDescription'),
        tslib_1.__metadata("design:type", String)
    ], MissionDescription.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('MissionDescription', {
            required: true,
            title: 'DESCRIPTION',
            type: FormFieldType.textarea,
            filterable: false,
            sortable: false,
            language: 'html'
        }) //
        ,
        tslib_1.__metadata("design:type", String)
    ], MissionDescription.prototype, "text", void 0);
    tslib_1.__decorate([
        Editable('MissionDescription', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxWidth: 160,
            maxHeight: 160,
            crop: 'circle',
            collectionName: 'files',
            title: 'ICON',
            required: true,
            flex: 50,
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", Object)
    ], MissionDescription.prototype, "icon", void 0);
    tslib_1.__decorate([
        Editable('MissionDescription', {
            title: 'CAMPAIGNTAGS',
            filterable: true,
            type: FormFieldType.autocomplete,
            clearable: true,
            tag: true,
            allowCustomTag: true,
            collectionName: 'missiondescriptions',
            multiple: true,
            subQuery: { field: 'descriptionRef', values: '_id' },
            filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
            icon: 'yo-tag',
            secondary: true
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescription.prototype, "tags", void 0);
    MissionDescription = tslib_1.__decorate([
        Model({
            className: 'MissionDescription',
            collectionName: 'missiondescriptions',
            fields: [
                '_ect',
                '_id',
                '_lmt',
                '_tenant',
                '_tenantRef',
                'allowMultiple',
                'allowSameUserValidation',
                'archived',
                'audit',
                'autoRenew',
                'autoRenewOnBooking',
                'background',
                'bookingDuration',
                'category',
                'categoryRef',
                'count',
                'duration',
                'finishedGroups',
                'generateTitle',
                'group',
                'icon',
                'language',
                'locationOptions',
                'missionTags',
                'multiple',
                'notificationemail',
                'notify',
                'notifyBody',
                'notifyScheduledDate',
                'pdfMode',
                'price',
                'priority',
                'public',
                'quizz',
                'quizzMode',
                'recurring',
                'scoring',
                'showAnswers',
                'skipValidation',
                'submittext',
                'successtext',
                'tags',
                'text',
                'title',
                'type',
                'validFrom',
                'validUntil',
                'versionmin',
                'storesQuery'
            ],
            include: ['_tenant'],
            //'category',
            icon: 'yo-campaign'
        })
    ], MissionDescription);
    return MissionDescription;
}(IMissionDescription));
export { MissionDescription };
if (false) {
    /** @type {?} */
    MissionDescription.prototype._id;
    /** @type {?} */
    MissionDescription.prototype.type;
    /** @type {?} */
    MissionDescription.prototype.title;
    /** @type {?} */
    MissionDescription.prototype.text;
    /** @type {?} */
    MissionDescription.prototype.icon;
    /** @type {?} */
    MissionDescription.prototype.tags;
    /** @type {?} */
    MissionDescription.prototype.background;
    /** @type {?} */
    MissionDescription.prototype.group;
    /** @type {?} */
    MissionDescription.prototype.serviceGroups;
    /** @type {?} */
    MissionDescription.prototype.missionTags;
    /** @type {?} */
    MissionDescription.prototype.slides;
    /** @type {?} */
    MissionDescription.prototype.public;
    /** @type {?} */
    MissionDescription.prototype.skipValidation;
    /** @type {?} */
    MissionDescription.prototype.allowSameUserValidation;
    /** @type {?} */
    MissionDescription.prototype.allowMultiple;
    /** @type {?} */
    MissionDescription.prototype.quizz;
    /** @type {?} */
    MissionDescription.prototype.quizzMode;
    /** @type {?} */
    MissionDescription.prototype.showAnswers;
    /** @type {?} */
    MissionDescription.prototype.audit;
    /** @type {?} */
    MissionDescription.prototype.recurring;
    /** @type {?} */
    MissionDescription.prototype.category;
    /** @type {?} */
    MissionDescription.prototype.language;
    /** @type {?} */
    MissionDescription.prototype.submittext;
    /** @type {?} */
    MissionDescription.prototype.successtext;
    /** @type {?} */
    MissionDescription.prototype.versionmin;
    /** @type {?} */
    MissionDescription.prototype.finishedGroups;
    /** @type {?} */
    MissionDescription.prototype.roles;
    /** @type {?} */
    MissionDescription.prototype.archived;
    /** @type {?} */
    MissionDescription.prototype.count;
    /** @type {?} */
    MissionDescription.prototype.storesQuery;
    /** @type {?} */
    MissionDescription.prototype.latest;
    /** @type {?} */
    MissionDescription.prototype._ect;
    /** @type {?} */
    MissionDescription.prototype.conditions;
    /** @type {?} */
    MissionDescription.prototype.scoring;
    /** @type {?} */
    MissionDescription.prototype._tenant;
    /** @type {?} */
    MissionDescription.prototype._tenantRef;
    /** @type {?} */
    MissionDescription.prototype.validFrom;
    /** @type {?} */
    MissionDescription.prototype.validUntil;
    /** @type {?} */
    MissionDescription.prototype.duedate;
    /** @type {?} */
    MissionDescription.prototype.notify;
    /** @type {?} */
    MissionDescription.prototype.notifyBody;
    /** @type {?} */
    MissionDescription.prototype.notifyScheduledDate;
    /** @type {?} */
    MissionDescription.prototype.notificationemail;
    /** @type {?} */
    MissionDescription.prototype.disableLocationNotificationemail;
    /** @type {?} */
    MissionDescription.prototype.pdfMode;
}
var MissionDescriptionCreate = /** @class */ (function (_super) {
    tslib_1.__extends(MissionDescriptionCreate, _super);
    function MissionDescriptionCreate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            required: true,
            title: 'TITLE',
            sortable: true,
            type: FormFieldType.text,
            exportOrder: 2
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            required: true,
            title: 'DESCRIPTION',
            type: FormFieldType.textarea,
            filterable: false,
            sortable: false,
            language: 'html'
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "text", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.autocomplete,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxWidth: 160,
            maxHeight: 160,
            crop: 'circle',
            collectionName: 'files',
            title: 'ICON',
            required: true,
            columnDefinition: { name: '_downloadURL' },
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", Object)
    ], MissionDescriptionCreate.prototype, "icon", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.autocomplete,
            values: range(1, 5)
        }),
        tslib_1.__metadata("design:type", Object)
    ], MissionDescriptionCreate.prototype, "priority", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: [conditions.isMission],
            title: 'AUDIT',
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "audit", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: [conditions.isMission],
            title: 'RECURRING',
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "recurring", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: conditions.isPoll,
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "allowMultiple", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: conditions.isPoll,
            title: 'QUIZZ',
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "quizz", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.autocomplete,
            condition: conditions.isQuizz,
            flex: 100,
            title: 'MODE',
            values: ['ALLANSWERSVALID', 'ALLOWUNVALIDANSWERS', 'LIVEANSWERS'],
            translate: true,
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "quizzMode", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            type: FormFieldType.toggle,
            condition: conditions.isQuizz,
            flex: 100,
            title: 'SHOWANSWERS',
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionCreate.prototype, "showAnswers", void 0);
    tslib_1.__decorate([
        Editable('MissionDescription', {
            type: FormFieldType.autocomplete,
            required: true,
            condition: conditions.isPollOrService,
            title: 'LANGUAGE',
            flex: 100,
            translate: true,
            values: Translate.availablesLanguageAll,
            clearable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionCreate.prototype, "language", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            title: 'CAMPAIGNTAGS',
            filterable: true,
            type: FormFieldType.autocomplete,
            clearable: true,
            tag: true,
            allowCustomTag: true,
            collectionName: 'missiondescriptions',
            multiple: true,
            subQuery: { field: 'descriptionRef', values: '_id' },
            icon: 'yo-tag',
            secondary: true
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionCreate.prototype, "tags", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionCreate', {
            required: true,
            title: 'TENANT',
            type: FormFieldType.autocomplete,
            condition: [ROLES_CONDITIONS.isAdmin],
            collectionName: 'tenants',
            multiple: false,
            columnDefinition: { name: 'name' }
        }),
        tslib_1.__metadata("design:type", Tenant)
    ], MissionDescriptionCreate.prototype, "_tenant", void 0);
    MissionDescriptionCreate = tslib_1.__decorate([
        Model({
            className: 'MissionDescriptionCreate'
        })
    ], MissionDescriptionCreate);
    return MissionDescriptionCreate;
}(IMissionDescription));
export { MissionDescriptionCreate };
if (false) {
    /** @type {?} */
    MissionDescriptionCreate.prototype.type;
    /** @type {?} */
    MissionDescriptionCreate.prototype.title;
    /** @type {?} */
    MissionDescriptionCreate.prototype.text;
    /** @type {?} */
    MissionDescriptionCreate.prototype.icon;
    /** @type {?} */
    MissionDescriptionCreate.prototype.priority;
    /** @type {?} */
    MissionDescriptionCreate.prototype.audit;
    /** @type {?} */
    MissionDescriptionCreate.prototype.recurring;
    /** @type {?} */
    MissionDescriptionCreate.prototype.allowMultiple;
    /** @type {?} */
    MissionDescriptionCreate.prototype.quizz;
    /** @type {?} */
    MissionDescriptionCreate.prototype.quizzMode;
    /** @type {?} */
    MissionDescriptionCreate.prototype.showAnswers;
    /** @type {?} */
    MissionDescriptionCreate.prototype.language;
    /** @type {?} */
    MissionDescriptionCreate.prototype.tags;
    /** @type {?} */
    MissionDescriptionCreate.prototype.slides;
    /** @type {?} */
    MissionDescriptionCreate.prototype._tenant;
    /** @type {?} */
    MissionDescriptionCreate.prototype._tenantRef;
}
var MissionDescriptionSchedule = /** @class */ (function (_super) {
    tslib_1.__extends(MissionDescriptionSchedule, _super);
    function MissionDescriptionSchedule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('MissionDescriptionSchedule', {
            title: 'MISSIONVALIDFROMTOOLTIP',
            type: FormFieldType.datetime,
            condition: conditions.notService,
            externalValidators: [{ externalFieldName: 'validUntil', rule: 'lower' }]
        }),
        tslib_1.__metadata("design:type", Date)
    ], MissionDescriptionSchedule.prototype, "validFrom", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSchedule', {
            title: 'MISSIONVALIDUNTILTOOLTIP',
            type: FormFieldType.datetime,
            condition: conditions.notService,
            externalValidators: [{ externalFieldName: 'validFrom', rule: 'higher' }]
        }),
        tslib_1.__metadata("design:type", Date)
    ], MissionDescriptionSchedule.prototype, "validUntil", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSchedule', {
            title: 'MISSIONDUEDATE',
            type: FormFieldType.datetime,
            condition: conditions.notService
        }),
        tslib_1.__metadata("design:type", Date)
    ], MissionDescriptionSchedule.prototype, "duedate", void 0);
    MissionDescriptionSchedule = tslib_1.__decorate([
        Model({
            className: 'MissionDescriptionSchedule'
        })
    ], MissionDescriptionSchedule);
    return MissionDescriptionSchedule;
}(IMissionDescription));
export { MissionDescriptionSchedule };
if (false) {
    /** @type {?} */
    MissionDescriptionSchedule.prototype.validFrom;
    /** @type {?} */
    MissionDescriptionSchedule.prototype.validUntil;
    /** @type {?} */
    MissionDescriptionSchedule.prototype.duedate;
}
var MissionDescriptionNotifications = /** @class */ (function (_super) {
    tslib_1.__extends(MissionDescriptionNotifications, _super);
    function MissionDescriptionNotifications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('MissionDescriptionNotifications', {
            type: FormFieldType.toggle,
            condition: conditions.notService
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionNotifications.prototype, "notify", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'NOTIFICATION',
            required: true,
            condition: 'notify == 1',
            type: FormFieldType.textarea
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionNotifications.prototype, "notifyBody", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'SCHEDULEDDATE',
            required: false,
            condition: 'notify == 1',
            type: FormFieldType.datetime
        }),
        tslib_1.__metadata("design:type", Date)
    ], MissionDescriptionNotifications.prototype, "notifyScheduledDate", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'NOTIFICATIONEMAILS',
            type: FormFieldType.emailreport,
            showUsers: true,
            stateful: false,
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionNotifications.prototype, "notificationemail", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionNotifications', {
            type: FormFieldType.toggle,
            columnDefinition: { width: 80 },
            suppressExport: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionNotifications.prototype, "disableLocationNotificationemail", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionNotifications', {
            title: 'PDFEXPORT',
            type: FormFieldType.selectcard,
            translate: true,
            values: [
                { title: 'PDFCLASSIC', description: 'PDFCLASSICDESCRIPTION', value: 'PDFCLASSIC' },
                { title: 'PDFPHOTOREPORT', description: 'PDFPHOTOREPORTDESCRIPTION', value: 'PDFPHOTOREPORT' },
                { title: 'PDFAUDITEXPORTS', description: 'PDFAUDITEXPORTSDESCRIPTION', value: 'PDFAUDITEXPORTS' },
                { title: 'PDFCONTRACT', description: 'PDFCONTRACTDESCRIPTION', value: 'PDFCONTRACT' }
            ],
            filterable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionNotifications.prototype, "pdfMode", void 0);
    MissionDescriptionNotifications = tslib_1.__decorate([
        Model({
            className: 'MissionDescriptionNotifications'
        })
    ], MissionDescriptionNotifications);
    return MissionDescriptionNotifications;
}(IMissionDescription));
export { MissionDescriptionNotifications };
if (false) {
    /** @type {?} */
    MissionDescriptionNotifications.prototype.notify;
    /** @type {?} */
    MissionDescriptionNotifications.prototype.notifyBody;
    /** @type {?} */
    MissionDescriptionNotifications.prototype.notifyScheduledDate;
    /** @type {?} */
    MissionDescriptionNotifications.prototype.notificationemail;
    /** @type {?} */
    MissionDescriptionNotifications.prototype.disableLocationNotificationemail;
    /** @type {?} */
    MissionDescriptionNotifications.prototype.pdfMode;
}
var MissionDescriptionSettings = /** @class */ (function (_super) {
    tslib_1.__extends(MissionDescriptionSettings, _super);
    function MissionDescriptionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            required: true,
            title: 'MISSIONGROUPS',
            header: 'PERMISSIONS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "group", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            required: false,
            title: 'MISSIONGROUPS',
            type: FormFieldType.autocomplete,
            condition: conditions.isService,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "serviceGroups", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            required: false,
            title: 'FINISHEDGROUPS',
            type: FormFieldType.autocomplete,
            condition: [conditions.isMission],
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: true
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "finishedGroups", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            multiple: true,
            type: FormFieldType.autocomplete,
            exportOrder: 15,
            values: IRoles,
            translate: true,
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "roles", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            title: 'CATEGORIES',
            type: FormFieldType.autocomplete,
            tag: true,
            collectionName: 'missions',
            multiple: true,
            subQuery: { field: 'descriptionRef', values: '_id' },
            icon: 'yo-flag',
            filterable: false
        }),
        tslib_1.__metadata("design:type", Array)
    ], MissionDescriptionSettings.prototype, "missionTags", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            header: 'COMPLIANCE',
            type: FormFieldType.toggle,
            title: 'SKIPVALIDATION',
            columnDefinition: { width: 80 },
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "skipValidation", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            type: FormFieldType.toggle,
            title: 'ALLOWSAMEUSERVALIDATION',
            condition: [ROLES_CONDITIONS.isManager, ROLES_CONDITIONS.isAdminOrClientAdmin],
            columnDefinition: { width: 80 },
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "allowSameUserValidation", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            header: 'MISSIONSETTINGS',
            type: FormFieldType.toggle,
            condition: conditions.notPollOrService,
            flex: 100
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "autoRenew", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            type: FormFieldType.toggle,
            condition: [conditions.notPollOrService]
        }) //, readonly: conditions.isScheduled
        ,
        tslib_1.__metadata("design:type", Boolean)
    ], MissionDescriptionSettings.prototype, "autoRenewOnBooking", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            title: 'CHECK',
            clearable: true,
            type: FormFieldType.selectcard,
            values: [
                { title: 'AVAILABLE', description: 'CHECKAVAILABLE', value: 'CHECKAVAILABLE' },
                { title: 'EXISTING', description: 'CHECKEXISTING', value: 'CHECKEXISTING' }
            ],
            translate: true,
            condition: conditions.notPollOrService
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "locationOptions", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            header: 'MISC',
            required: false,
            title: 'MISSIONDURATION',
            type: FormFieldType.number
        }),
        tslib_1.__metadata("design:type", Number)
    ], MissionDescriptionSettings.prototype, "duration", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            condition: conditions.isService,
            title: 'SUBMITTEXT',
            type: FormFieldType.text,
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "submittext", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            condition: conditions.isService,
            title: 'SUCCESSTEXT',
            type: FormFieldType.text,
            filterable: false,
            sortable: false
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "successtext", void 0);
    tslib_1.__decorate([
        Editable('MissionDescriptionSettings', {
            title: 'VERSIONMIN',
            type: FormFieldType.text,
            sortable: false,
            condition: ROLES_CONDITIONS.isAdmin,
            filterableAdvanced: true
        }),
        tslib_1.__metadata("design:type", String)
    ], MissionDescriptionSettings.prototype, "versionmin", void 0);
    MissionDescriptionSettings = tslib_1.__decorate([
        Model({
            className: 'MissionDescriptionSettings'
        })
    ], MissionDescriptionSettings);
    return MissionDescriptionSettings;
}(IMissionDescription));
export { MissionDescriptionSettings };
if (false) {
    /** @type {?} */
    MissionDescriptionSettings.prototype.group;
    /** @type {?} */
    MissionDescriptionSettings.prototype.serviceGroups;
    /** @type {?} */
    MissionDescriptionSettings.prototype.finishedGroups;
    /** @type {?} */
    MissionDescriptionSettings.prototype.roles;
    /** @type {?} */
    MissionDescriptionSettings.prototype.missionTags;
    /** @type {?} */
    MissionDescriptionSettings.prototype.skipValidation;
    /** @type {?} */
    MissionDescriptionSettings.prototype.allowSameUserValidation;
    /** @type {?} */
    MissionDescriptionSettings.prototype.autoRenew;
    /** @type {?} */
    MissionDescriptionSettings.prototype.autoRenewOnBooking;
    /** @type {?} */
    MissionDescriptionSettings.prototype.locationOptions;
    /** @type {?} */
    MissionDescriptionSettings.prototype.duration;
    /** @type {?} */
    MissionDescriptionSettings.prototype.submittext;
    /** @type {?} */
    MissionDescriptionSettings.prototype.successtext;
    /** @type {?} */
    MissionDescriptionSettings.prototype.versionmin;
}
/** @type {?} */
var scoringConditions = {
    isPercentage: 'isPercentage == 1'
};
var Scoring = /** @class */ (function (_super) {
    tslib_1.__extends(Scoring, _super);
    function Scoring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Scoring', { required: true, type: FormFieldType.text }),
        tslib_1.__metadata("design:type", String)
    ], Scoring.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('Scoring', { type: FormFieldType.textarea }),
        tslib_1.__metadata("design:type", String)
    ], Scoring.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('Scoring', {
            title: 'INITIALSCORE',
            type: FormFieldType.number,
            advanced: true,
            condition: ROLES_CONDITIONS.isAdmin
        }),
        tslib_1.__metadata("design:type", Number)
    ], Scoring.prototype, "initialValue", void 0);
    tslib_1.__decorate([
        Editable('Scoring', {
            title: 'MINSCOREFORVALIDATION',
            type: FormFieldType.number,
            advanced: true
        }),
        tslib_1.__metadata("design:type", Number)
    ], Scoring.prototype, "minValue", void 0);
    tslib_1.__decorate([
        Editable('Scoring', {
            type: FormFieldType.checkbox,
            title: 'ISPRIMARYSCORE',
            columnDefinition: { width: 80 }
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Scoring.prototype, "isActive", void 0);
    tslib_1.__decorate([
        Editable('Scoring', { type: FormFieldType.checkbox, title: 'ISLIVE', columnDefinition: { width: 80 } }),
        tslib_1.__metadata("design:type", Boolean)
    ], Scoring.prototype, "isLive", void 0);
    tslib_1.__decorate([
        Editable('Scoring', {
            type: FormFieldType.checkbox,
            title: 'PERCENTAGE',
            columnDefinition: { width: 80 },
            advanced: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Scoring.prototype, "isPercentage", void 0);
    tslib_1.__decorate([
        Editable('Scoring', {
            title: 'TOTAL',
            type: FormFieldType.number,
            condition: scoringConditions.isPercentage,
            required: true
        }),
        tslib_1.__metadata("design:type", Number)
    ], Scoring.prototype, "percentageBasis", void 0);
    tslib_1.__decorate([
        Editable('Scoring', {
            type: FormFieldType.autocomplete,
            multiple: true,
            title: 'FIELDS',
            displayType: 'formfield'
        }),
        tslib_1.__metadata("design:type", Array)
    ], Scoring.prototype, "selectedFields", void 0);
    Scoring = tslib_1.__decorate([
        Model({ className: 'Scoring' })
    ], Scoring);
    return Scoring;
}(IScoring));
export { Scoring };
if (false) {
    /** @type {?} */
    Scoring.prototype.title;
    /** @type {?} */
    Scoring.prototype.description;
    /** @type {?} */
    Scoring.prototype.initialValue;
    /** @type {?} */
    Scoring.prototype.minValue;
    /** @type {?} */
    Scoring.prototype.isActive;
    /** @type {?} */
    Scoring.prototype.isLive;
    /** @type {?} */
    Scoring.prototype.isPercentage;
    /** @type {?} */
    Scoring.prototype.percentageBasis;
    /** @type {?} */
    Scoring.prototype.selectedFields;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2lvbi1kZXNjcmlwdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9taXNzaW9uLWRlc2NyaXB0aW9uL21pc3Npb24tZGVzY3JpcHRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFjLE1BQU0sRUFBeUIsTUFBTSxpQkFBaUIsQ0FBQztBQUUxSCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFbEMsTUFBTSxLQUFPLHNCQUFzQixHQUFHLENBQUMsU0FBUyxDQUFDOztBQUNqRCxNQUFNLEtBQU8sYUFBYSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQzs7O0FBQzdFLE1BQU0sS0FBTyxjQUFjLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7O0lBRXpFLFVBQVUsR0FBRztJQUNmLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsU0FBUyxFQUFFLG1CQUFtQjtJQUM5QixPQUFP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LGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLFFBQVE7WUFDZixXQUFXLEVBQUUsV0FBVztTQUN6QixDQUFDOzBDQUNjLEtBQUs7bURBQWE7SUF0RHZCLE9BQU87UUFEbkIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDO09BQ25CLE9BQU8sQ0F1RG5CO0lBQUQsY0FBQztDQUFBLENBdkQ0QixRQUFRLEdBdURwQztTQXZEWSxPQUFPOzs7SUFDbEIsd0JBQ2M7O0lBRWQsOEJBQ29COztJQUVwQiwrQkFNcUI7O0lBRXJCLDJCQUtpQjs7SUFFakIsMkJBS2tCOztJQUVsQix5QkFDZ0I7O0lBRWhCLCtCQU1zQjs7SUFFdEIsa0NBTXdCOztJQUV4QixpQ0FNa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBJTWlzc2lvbkRlc2NyaXB0aW9uLCBJU2NvcmluZywgRm9ybUZpZWxkVHlwZSwgSUZvcm1GaWVsZCwgSVJvbGVzLCBJUm9sZSwgU2VsZWN0aW9uUXVlcnkgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgU2xpZGUgfSBmcm9tICcuLi9zbGlkZS9zbGlkZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IENvbmRpdGlvbiwgZ2V0R3JvdXBzVHJhbnNmb3JtLCBST0xFU19DT05ESVRJT05TIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUiB9IGZyb20gJy4uL2NvbnN0YW50cy9jb25zdGFudHMuaW50ZXJmYWNlJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IHJhbmdlIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuZXhwb3J0IGNvbnN0IE1JU1NJT05fVFlQRVNfTk9fQURNSU4gPSBbJ21pc3Npb24nXTtcbmV4cG9ydCBjb25zdCBNSVNTSU9OX1RZUEVTID0gWydtaXNzaW9uJywgJ3NlcnZpY2UnLCAncG9sbCcsICd0b2RvJywgJ2xlc3NvbiddOyAvLyd0ZW1wbGF0ZScsLCAnbWVtbydcbmV4cG9ydCBjb25zdCBNSVNTSU9OX1NUQVRVUyA9IFsnYm9va2VkJywgJ2ZpbmlzaGVkJywgJ2FyY2hpdmVkJywgJ3NjaGVkdWxlZCddO1xuXG5sZXQgY29uZGl0aW9ucyA9IHtcbiAgaXNQb2xsOiAndHlwZSA9PSBcInBvbGxcIicsXG4gIGlzTWlzc2lvbjogJ3R5cGUgPT0gXCJtaXNzaW9uXCInLFxuICBpc1F1aXp6OiAncXVpenogPT0gMScsXG4gIGlzU2VydmljZTogJ3R5cGUgPT0gXCJzZXJ2aWNlXCInLFxuICBub3RTZXJ2aWNlOiAnbm90ICh0eXBlID09IFwic2VydmljZVwiKScsXG4gIG5vdFBvbGxPclNlcnZpY2U6ICdub3QgKHR5cGUgPT0gXCJzZXJ2aWNlXCIpIGFuZCBub3QgKHR5cGUgPT0gXCJwb2xsXCIpJyxcbiAgaXNQb2xsT3JTZXJ2aWNlOiAndHlwZT09XCJwb2xsXCIgb3IgdHlwZT09XCJzZXJ2aWNlXCInIC8vLFxuICAvL2lzVXBkYXRlOiAnaXNOdWxsT3JFbXB0eShnZXRBdHRyaWJ1dGVWYWx1ZShcIl9lY3RcIikpID09IDAnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25NaXNzaW9uRGVzY3JpcHRpb25UeXBlQ2hhbmdlKHZhbHVlLCBkYXRhLCBmaWVsZCkge1xuICAvLyBpZiAodmFsdWUgJiYgKHZhbHVlID09PSAnc2VydmljZScgfHwgdmFsdWUgPT09ICdwb2xsJyB8fCB2YWx1ZSA9PT0gJ2xlc3NvbicpKSB7XG4gIC8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vICAgICBjb250cm9scy5sYW5ndWFnZS5zZXRWYWx1ZShjb250cm9scy5sYW5ndWFnZS5nZXRWYWx1ZSgpIHx8IFRyYW5zbGF0ZS5jdXJyZW50TGFuZ3VhZ2UpO1xuICAvLyAgIH0sIDMwMCk7XG4gIC8vIH1cbiAgLy8gbGV0IGdyb3VwSW5kZXggPSBmb3JtRGVmaW5pdGlvbi5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09ICdncm91cCcpO1xuICAvLyBsZXQgZ3JvdXAgPSBmb3JtRGVmaW5pdGlvbltncm91cEluZGV4XTtcbiAgLy8gaWYgKHZhbHVlID09PSAnc2VydmljZScpIHtcbiAgLy8gICBncm91cC50aXRsZSA9ICdTRVJWSUNFR1JPVVBTJztcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBncm91cC50aXRsZSA9ICdNSVNTSU9OR1JPVVBTJztcbiAgLy8gfVxuICAvLyBmb3JtRGVmaW5pdGlvbltncm91cEluZGV4XSA9IHsgLi4uZ3JvdXAgfTtcbiAgLy8gcmV0dXJuIHRydWU7XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ01pc3Npb25EZXNjcmlwdGlvbicsXG4gIGNvbGxlY3Rpb25OYW1lOiAnbWlzc2lvbmRlc2NyaXB0aW9ucycsXG4gIGZpZWxkczogW1xuICAgICdfZWN0JyxcbiAgICAnX2lkJyxcbiAgICAnX2xtdCcsXG4gICAgJ190ZW5hbnQnLFxuICAgICdfdGVuYW50UmVmJyxcbiAgICAnYWxsb3dNdWx0aXBsZScsXG4gICAgJ2FsbG93U2FtZVVzZXJWYWxpZGF0aW9uJyxcbiAgICAnYXJjaGl2ZWQnLFxuICAgICdhdWRpdCcsXG4gICAgJ2F1dG9SZW5ldycsXG4gICAgJ2F1dG9SZW5ld09uQm9va2luZycsXG4gICAgJ2JhY2tncm91bmQnLFxuICAgICdib29raW5nRHVyYXRpb24nLCAvL1xuICAgICdjYXRlZ29yeScsXG4gICAgJ2NhdGVnb3J5UmVmJyxcbiAgICAnY291bnQnLFxuICAgICdkdXJhdGlvbicsXG4gICAgJ2ZpbmlzaGVkR3JvdXBzJyxcbiAgICAnZ2VuZXJhdGVUaXRsZScsXG4gICAgJ2dyb3VwJyxcbiAgICAnaWNvbicsXG4gICAgJ2xhbmd1YWdlJyxcbiAgICAnbG9jYXRpb25PcHRpb25zJyxcbiAgICAnbWlzc2lvblRhZ3MnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ25vdGlmaWNhdGlvbmVtYWlsJyxcbiAgICAnbm90aWZ5JyxcbiAgICAnbm90aWZ5Qm9keScsXG4gICAgJ25vdGlmeVNjaGVkdWxlZERhdGUnLFxuICAgICdwZGZNb2RlJyxcbiAgICAncHJpY2UnLFxuICAgICdwcmlvcml0eScsXG4gICAgJ3B1YmxpYycsXG4gICAgJ3F1aXp6JyxcbiAgICAncXVpenpNb2RlJyxcbiAgICAncmVjdXJyaW5nJyxcbiAgICAnc2NvcmluZycsXG4gICAgJ3Nob3dBbnN3ZXJzJyxcbiAgICAnc2tpcFZhbGlkYXRpb24nLFxuICAgICdzdWJtaXR0ZXh0JyxcbiAgICAnc3VjY2Vzc3RleHQnLFxuICAgICd0YWdzJyxcbiAgICAndGV4dCcsXG4gICAgJ3RpdGxlJyxcbiAgICAndHlwZScsXG4gICAgJ3ZhbGlkRnJvbScsXG4gICAgJ3ZhbGlkVW50aWwnLFxuICAgICd2ZXJzaW9ubWluJyxcbiAgICAnc3RvcmVzUXVlcnknXG4gIF0sXG4gIGluY2x1ZGU6IFsnX3RlbmFudCddLCAvLydjYXRlZ29yeScsXG4gIGljb246ICd5by1jYW1wYWlnbidcbn0pXG5leHBvcnQgY2xhc3MgTWlzc2lvbkRlc2NyaXB0aW9uIGV4dGVuZHMgSU1pc3Npb25EZXNjcmlwdGlvbiB7XG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICBmb3JjZUV4cG9ydDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMVxuICB9KVxuICBfaWQ/OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGl0bGU6ICdUWVBFJyxcbiAgICB2YWx1ZXM6IE1JU1NJT05fVFlQRVMsIC8vTUlTU0lPTl9UWVBFU19OT19BRE1JTixcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMyxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlLFxuICAgIG9uQ2hhbmdlOiBvbk1pc3Npb25EZXNjcmlwdGlvblR5cGVDaGFuZ2VcbiAgfSlcbiAgdHlwZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnVElUTEUnLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICBleHBvcnRPcmRlcjogMlxuICB9KVxuICBAU2VhcmNoYWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uJylcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbicsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ0RFU0NSSVBUSU9OJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBsYW5ndWFnZTogJ2h0bWwnXG4gIH0pIC8vXG4gIHRleHQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBmaWx0ZXJzOiBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUixcbiAgICBmb3JjZU1vZGFsOiB0cnVlLFxuICAgIGhpZGRlbkZpZWxkczogWydtaW1lVHlwZSddLFxuICAgIG1vZGU6ICd0aWxlJyxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBtYXhXaWR0aDogMTYwLFxuICAgIG1heEhlaWdodDogMTYwLFxuICAgIGNyb3A6ICdjaXJjbGUnLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIHRpdGxlOiAnSUNPTicsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZmxleDogNTAsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2Rvd25sb2FkVVJMJyB9LFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBpY29uOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb24nLCB7XG4gICAgdGl0bGU6ICdDQU1QQUlHTlRBR1MnLFxuICAgIGZpbHRlcmFibGU6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ21pc3Npb25kZXNjcmlwdGlvbnMnLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnZGVzY3JpcHRpb25SZWYnLCB2YWx1ZXM6ICdfaWQnIH0sXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnYXJjaGl2ZWQnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH1dXSxcbiAgICBpY29uOiAneW8tdGFnJyxcbiAgICBzZWNvbmRhcnk6IHRydWVcbiAgfSlcbiAgdGFnczogQXJyYXk8c3RyaW5nPjtcblxuICBiYWNrZ3JvdW5kOiBhbnk7XG4gIGdyb3VwOiBBcnJheTxzdHJpbmc+O1xuICBzZXJ2aWNlR3JvdXBzOiBBcnJheTxzdHJpbmc+O1xuICBtaXNzaW9uVGFnczogQXJyYXk8c3RyaW5nPjtcbiAgc2xpZGVzOiBBcnJheTxTbGlkZT47XG4gIHB1YmxpYzogYm9vbGVhbjtcbiAgc2tpcFZhbGlkYXRpb246IGJvb2xlYW47XG4gIGFsbG93U2FtZVVzZXJWYWxpZGF0aW9uOiBib29sZWFuO1xuICBhbGxvd011bHRpcGxlOiBib29sZWFuO1xuICBxdWl6ejogYm9vbGVhbjtcbiAgcXVpenpNb2RlOiBzdHJpbmc7XG4gIHNob3dBbnN3ZXJzOiBib29sZWFuO1xuICBhdWRpdDogYm9vbGVhbjtcbiAgcmVjdXJyaW5nOiBib29sZWFuO1xuICBjYXRlZ29yeTogTWlzc2lvbkRlc2NyaXB0aW9uO1xuICBsYW5ndWFnZTogc3RyaW5nO1xuICBzdWJtaXR0ZXh0OiBzdHJpbmc7XG4gIHN1Y2Nlc3N0ZXh0OiBzdHJpbmc7XG4gIHZlcnNpb25taW46IHN0cmluZztcbiAgZmluaXNoZWRHcm91cHM6IEFycmF5PHN0cmluZz47XG4gIHJvbGVzPzogQXJyYXk8SVJvbGU+O1xuICBhcmNoaXZlZDogYm9vbGVhbjtcbiAgY291bnQ6IG51bWJlcjtcbiAgc3RvcmVzUXVlcnk/OiBTZWxlY3Rpb25RdWVyeTtcbiAgbGF0ZXN0OiBEYXRlO1xuICBfZWN0OiBhbnk7XG4gIGNvbmRpdGlvbnM6IEFycmF5PENvbmRpdGlvbj47XG4gIHNjb3Jpbmc6IEFycmF5PFNjb3Jpbmc+O1xuICBfdGVuYW50OiBUZW5hbnQ7XG4gIF90ZW5hbnRSZWY/OiBzdHJpbmc7XG5cbiAgLy9NaXNzaW9uRGVzY3JpcHRpb25TY2hlZHVsZVxuICB2YWxpZEZyb206IERhdGU7XG4gIHZhbGlkVW50aWw6IERhdGU7XG4gIGR1ZWRhdGU6IERhdGU7XG5cbiAgLy9NaXNzaW9uRGVzY3JpcHRpb25Ob3RpZmljYXRpb25zXG4gIG5vdGlmeT86IGJvb2xlYW47XG4gIG5vdGlmeUJvZHk/OiBzdHJpbmc7XG4gIG5vdGlmeVNjaGVkdWxlZERhdGU/OiBEYXRlO1xuICBub3RpZmljYXRpb25lbWFpbD86IEFycmF5PHN0cmluZz47XG4gIGRpc2FibGVMb2NhdGlvbk5vdGlmaWNhdGlvbmVtYWlsPzogYm9vbGVhbjtcbiAgcGRmTW9kZT86IHN0cmluZztcbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUgZXh0ZW5kcyBJTWlzc2lvbkRlc2NyaXB0aW9uIHtcbiAgdHlwZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnVElUTEUnLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICBleHBvcnRPcmRlcjogMlxuICB9KVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnREVTQ1JJUFRJT04nLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIGxhbmd1YWdlOiAnaHRtbCdcbiAgfSlcbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGZpbHRlcnM6IEZPUk1fRklMRVNfSU1BR0VfRklMVEVSLFxuICAgIGZvcmNlTW9kYWw6IHRydWUsXG4gICAgaGlkZGVuRmllbGRzOiBbJ21pbWVUeXBlJ10sXG4gICAgbW9kZTogJ3RpbGUnLFxuICAgIHBhZ2VTaXplOiAyMCxcbiAgICBmaXhlZFBvc2l0aW9uOiB0cnVlLFxuICAgIG1heFdpZHRoOiAxNjAsXG4gICAgbWF4SGVpZ2h0OiAxNjAsXG4gICAgY3JvcDogJ2NpcmNsZScsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgdGl0bGU6ICdJQ09OJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZG93bmxvYWRVUkwnIH0sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGljb246IGFueTtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB2YWx1ZXM6IHJhbmdlKDEsIDUpXG4gIH0pXG4gIHByaW9yaXR5OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc01pc3Npb25dLFxuICAgIHRpdGxlOiAnQVVESVQnLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgYXVkaXQ6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc01pc3Npb25dLFxuICAgIHRpdGxlOiAnUkVDVVJSSU5HJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9XG4gIH0pXG4gIHJlY3VycmluZzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNQb2xsLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgYWxsb3dNdWx0aXBsZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNQb2xsLFxuICAgIHRpdGxlOiAnUVVJWlonLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgcXVpeno6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzUXVpenosXG4gICAgZmxleDogMTAwLFxuICAgIHRpdGxlOiAnTU9ERScsXG4gICAgdmFsdWVzOiBbJ0FMTEFOU1dFUlNWQUxJRCcsICdBTExPV1VOVkFMSURBTlNXRVJTJywgJ0xJVkVBTlNXRVJTJ10sXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgcXVpenpNb2RlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzUXVpenosXG4gICAgZmxleDogMTAwLFxuICAgIHRpdGxlOiAnU0hPV0FOU1dFUlMnLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgc2hvd0Fuc3dlcnM6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzUG9sbE9yU2VydmljZSxcbiAgICB0aXRsZTogJ0xBTkdVQUdFJyxcbiAgICBmbGV4OiAxMDAsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHZhbHVlczogVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZUFsbCxcbiAgICBjbGVhcmFibGU6IGZhbHNlXG4gIH0pXG4gIGxhbmd1YWdlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgdGl0bGU6ICdDQU1QQUlHTlRBR1MnLFxuICAgIGZpbHRlcmFibGU6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBhbGxvd0N1c3RvbVRhZzogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ21pc3Npb25kZXNjcmlwdGlvbnMnLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnZGVzY3JpcHRpb25SZWYnLCB2YWx1ZXM6ICdfaWQnIH0sXG4gICAgaWNvbjogJ3lvLXRhZycsXG4gICAgc2Vjb25kYXJ5OiB0cnVlXG4gIH0pXG4gIHRhZ3M6IEFycmF5PHN0cmluZz47XG5cbiAgc2xpZGVzOiBBcnJheTxTbGlkZT47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdURU5BTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl0sXG4gICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfVxuICB9KVxuICBfdGVuYW50OiBUZW5hbnQ7XG4gIF90ZW5hbnRSZWY/OiBzdHJpbmc7XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ01pc3Npb25EZXNjcmlwdGlvblNjaGVkdWxlJ1xufSlcbmV4cG9ydCBjbGFzcyBNaXNzaW9uRGVzY3JpcHRpb25TY2hlZHVsZSBleHRlbmRzIElNaXNzaW9uRGVzY3JpcHRpb24ge1xuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNjaGVkdWxlJywge1xuICAgIHRpdGxlOiAnTUlTU0lPTlZBTElERlJPTVRPT0xUSVAnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm5vdFNlcnZpY2UsXG4gICAgZXh0ZXJuYWxWYWxpZGF0b3JzOiBbeyBleHRlcm5hbEZpZWxkTmFtZTogJ3ZhbGlkVW50aWwnLCBydWxlOiAnbG93ZXInIH1dXG4gIH0pXG4gIHZhbGlkRnJvbTogRGF0ZTtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNjaGVkdWxlJywge1xuICAgIHRpdGxlOiAnTUlTU0lPTlZBTElEVU5USUxUT09MVElQJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5ub3RTZXJ2aWNlLFxuICAgIGV4dGVybmFsVmFsaWRhdG9yczogW3sgZXh0ZXJuYWxGaWVsZE5hbWU6ICd2YWxpZEZyb20nLCBydWxlOiAnaGlnaGVyJyB9XVxuICB9KVxuICB2YWxpZFVudGlsOiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2NoZWR1bGUnLCB7XG4gICAgdGl0bGU6ICdNSVNTSU9ORFVFREFURScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMubm90U2VydmljZVxuICB9KVxuICBkdWVkYXRlOiBEYXRlO1xuXG4gIC8vIEBFZGl0YWJsZSgnTWlzc2lvbkdlbmVyYXRlJywge1xuICAvLyAgIHRhYkluZGV4OiAyLFxuICAvLyAgIHRhYjogJ09QVElPTlMnLFxuICAvLyAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuc2NoZWR1bGUsXG4gIC8vICAgaGlkZUxhYmVsOiB0cnVlLFxuICAvLyAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NjaGVkdWxlZCxcbiAgLy8gICBmbGV4OiAxMDBcbiAgLy8gfSlcbiAgLy8gc2NoZWR1bGU6IGJvb2xlYW47XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnXG59KVxuZXhwb3J0IGNsYXNzIE1pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMgZXh0ZW5kcyBJTWlzc2lvbkRlc2NyaXB0aW9uIHtcbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25Ob3RpZmljYXRpb25zJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5ub3RTZXJ2aWNlXG4gIH0pXG4gIG5vdGlmeTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnLCB7XG4gICAgdGl0bGU6ICdOT1RJRklDQVRJT04nLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogJ25vdGlmeSA9PSAxJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhXG4gIH0pXG4gIG5vdGlmeUJvZHk6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnLCB7XG4gICAgdGl0bGU6ICdTQ0hFRFVMRUREQVRFJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgY29uZGl0aW9uOiAnbm90aWZ5ID09IDEnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWVcbiAgfSlcbiAgbm90aWZ5U2NoZWR1bGVkRGF0ZTogRGF0ZTtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnLCB7XG4gICAgdGl0bGU6ICdOT1RJRklDQVRJT05FTUFJTFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZW1haWxyZXBvcnQsXG4gICAgc2hvd1VzZXJzOiB0cnVlLFxuICAgIHN0YXRlZnVsOiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgbm90aWZpY2F0aW9uZW1haWw6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25Ob3RpZmljYXRpb25zJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH0sXG4gICAgc3VwcHJlc3NFeHBvcnQ6IHRydWVcbiAgfSlcbiAgZGlzYWJsZUxvY2F0aW9uTm90aWZpY2F0aW9uZW1haWw6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25Ob3RpZmljYXRpb25zJywge1xuICAgIHRpdGxlOiAnUERGRVhQT1JUJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnNlbGVjdGNhcmQsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHZhbHVlczogW1xuICAgICAgeyB0aXRsZTogJ1BERkNMQVNTSUMnLCBkZXNjcmlwdGlvbjogJ1BERkNMQVNTSUNERVNDUklQVElPTicsIHZhbHVlOiAnUERGQ0xBU1NJQycgfSwgLy9cbiAgICAgIHsgdGl0bGU6ICdQREZQSE9UT1JFUE9SVCcsIGRlc2NyaXB0aW9uOiAnUERGUEhPVE9SRVBPUlRERVNDUklQVElPTicsIHZhbHVlOiAnUERGUEhPVE9SRVBPUlQnIH0sXG4gICAgICB7IHRpdGxlOiAnUERGQVVESVRFWFBPUlRTJywgZGVzY3JpcHRpb246ICdQREZBVURJVEVYUE9SVFNERVNDUklQVElPTicsIHZhbHVlOiAnUERGQVVESVRFWFBPUlRTJyB9LFxuICAgICAgeyB0aXRsZTogJ1BERkNPTlRSQUNUJywgZGVzY3JpcHRpb246ICdQREZDT05UUkFDVERFU0NSSVBUSU9OJywgdmFsdWU6ICdQREZDT05UUkFDVCcgfVxuICAgIF0sXG4gICAgZmlsdGVyYWJsZTogZmFsc2VcbiAgfSlcbiAgcGRmTW9kZT86IHN0cmluZztcbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTWlzc2lvbkRlc2NyaXB0aW9uU2V0dGluZ3MnXG59KVxuZXhwb3J0IGNsYXNzIE1pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzIGV4dGVuZHMgSU1pc3Npb25EZXNjcmlwdGlvbiB7XG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2V0dGluZ3MnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdNSVNTSU9OR1JPVVBTJyxcbiAgICBoZWFkZXI6ICdQRVJNSVNTSU9OUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2VcbiAgfSlcbiAgZ3JvdXA6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdNSVNTSU9OR1JPVVBTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNTZXJ2aWNlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlXG4gIH0pXG4gIHNlcnZpY2VHcm91cHM6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdGSU5JU0hFREdST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbY29uZGl0aW9ucy5pc01pc3Npb25dLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IHRydWVcbiAgfSlcbiAgZmluaXNoZWRHcm91cHM6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBleHBvcnRPcmRlcjogMTUsXG4gICAgdmFsdWVzOiBJUm9sZXMsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICByb2xlcz86IEFycmF5PElSb2xlPjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHRpdGxlOiAnQ0FURUdPUklFUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbWlzc2lvbnMnLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnZGVzY3JpcHRpb25SZWYnLCB2YWx1ZXM6ICdfaWQnIH0sXG4gICAgaWNvbjogJ3lvLWZsYWcnLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlXG4gIH0pXG4gIG1pc3Npb25UYWdzOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2V0dGluZ3MnLCB7XG4gICAgaGVhZGVyOiAnQ09NUExJQU5DRScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgdGl0bGU6ICdTS0lQVkFMSURBVElPTicsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgc2tpcFZhbGlkYXRpb246IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICB0aXRsZTogJ0FMTE9XU0FNRVVTRVJWQUxJREFUSU9OJyxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzTWFuYWdlciwgUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluT3JDbGllbnRBZG1pbl0sXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfSxcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgYWxsb3dTYW1lVXNlclZhbGlkYXRpb246IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICBoZWFkZXI6ICdNSVNTSU9OU0VUVElOR1MnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5ub3RQb2xsT3JTZXJ2aWNlLFxuICAgIGZsZXg6IDEwMFxuICB9KVxuICBhdXRvUmVuZXc6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLm5vdFBvbGxPclNlcnZpY2VdXG4gIH0pIC8vLCByZWFkb25seTogY29uZGl0aW9ucy5pc1NjaGVkdWxlZFxuICBhdXRvUmVuZXdPbkJvb2tpbmc6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICB0aXRsZTogJ0NIRUNLJyxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5zZWxlY3RjYXJkLFxuICAgIHZhbHVlczogW1xuICAgICAgeyB0aXRsZTogJ0FWQUlMQUJMRScsIGRlc2NyaXB0aW9uOiAnQ0hFQ0tBVkFJTEFCTEUnLCB2YWx1ZTogJ0NIRUNLQVZBSUxBQkxFJyB9LCAvL1xuICAgICAgeyB0aXRsZTogJ0VYSVNUSU5HJywgZGVzY3JpcHRpb246ICdDSEVDS0VYSVNUSU5HJywgdmFsdWU6ICdDSEVDS0VYSVNUSU5HJyB9XG4gICAgXSxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm5vdFBvbGxPclNlcnZpY2VcbiAgfSlcbiAgbG9jYXRpb25PcHRpb25zOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICBoZWFkZXI6ICdNSVNDJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdNSVNTSU9ORFVSQVRJT04nLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyXG4gIH0pXG4gIGR1cmF0aW9uOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNTZXJ2aWNlLFxuICAgIHRpdGxlOiAnU1VCTUlUVEVYVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBzdWJtaXR0ZXh0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNTZXJ2aWNlLFxuICAgIHRpdGxlOiAnU1VDQ0VTU1RFWFQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgc3VjY2Vzc3RleHQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHRpdGxlOiAnVkVSU0lPTk1JTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICBjb25kaXRpb246IFJPTEVTX0NPTkRJVElPTlMuaXNBZG1pbixcbiAgICBmaWx0ZXJhYmxlQWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgdmVyc2lvbm1pbjogc3RyaW5nO1xufVxuXG5sZXQgc2NvcmluZ0NvbmRpdGlvbnMgPSB7XG4gIGlzUGVyY2VudGFnZTogJ2lzUGVyY2VudGFnZSA9PSAxJ1xufTtcblxuQE1vZGVsKHsgY2xhc3NOYW1lOiAnU2NvcmluZycgfSlcbmV4cG9ydCBjbGFzcyBTY29yaW5nIGV4dGVuZHMgSVNjb3Jpbmcge1xuICBARWRpdGFibGUoJ1Njb3JpbmcnLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1Njb3JpbmcnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ1Njb3JpbmcnLCB7XG4gICAgdGl0bGU6ICdJTklUSUFMU0NPUkUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGFkdmFuY2VkOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXG4gIH0pXG4gIGluaXRpYWxWYWx1ZTogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHtcbiAgICB0aXRsZTogJ01JTlNDT1JFRk9SVkFMSURBVElPTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgbWluVmFsdWU6IG51bWJlcjtcblxuICBARWRpdGFibGUoJ1Njb3JpbmcnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICB0aXRsZTogJ0lTUFJJTUFSWVNDT1JFJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9XG4gIH0pXG4gIGlzQWN0aXZlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCwgdGl0bGU6ICdJU0xJVkUnLCBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9IH0pXG4gIGlzTGl2ZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ1Njb3JpbmcnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5jaGVja2JveCxcbiAgICB0aXRsZTogJ1BFUkNFTlRBR0UnLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH0sXG4gICAgYWR2YW5jZWQ6IHRydWVcbiAgfSlcbiAgaXNQZXJjZW50YWdlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHtcbiAgICB0aXRsZTogJ1RPVEFMJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBjb25kaXRpb246IHNjb3JpbmdDb25kaXRpb25zLmlzUGVyY2VudGFnZSxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9KVxuICBwZXJjZW50YWdlQmFzaXM6IG51bWJlcjtcblxuICBARWRpdGFibGUoJ1Njb3JpbmcnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgdGl0bGU6ICdGSUVMRFMnLFxuICAgIGRpc3BsYXlUeXBlOiAnZm9ybWZpZWxkJ1xuICB9KVxuICBzZWxlY3RlZEZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD47XG59XG4iXX0=