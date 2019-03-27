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
export const MISSION_TYPES_NO_ADMIN = ['mission'];
/** @type {?} */
export const MISSION_TYPES = ['mission', 'service', 'poll', 'todo', 'lesson'];
//'template',, 'memo'
/** @type {?} */
export const MISSION_STATUS = ['booked', 'finished', 'archived', 'scheduled'];
/** @type {?} */
let conditions = {
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
let MissionDescription = class MissionDescription extends IMissionDescription {
};
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
let MissionDescriptionCreate = class MissionDescriptionCreate extends IMissionDescription {
};
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
let MissionDescriptionSchedule = class MissionDescriptionSchedule extends IMissionDescription {
};
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
export { MissionDescriptionSchedule };
if (false) {
    /** @type {?} */
    MissionDescriptionSchedule.prototype.validFrom;
    /** @type {?} */
    MissionDescriptionSchedule.prototype.validUntil;
    /** @type {?} */
    MissionDescriptionSchedule.prototype.duedate;
}
let MissionDescriptionNotifications = class MissionDescriptionNotifications extends IMissionDescription {
};
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
let MissionDescriptionSettings = class MissionDescriptionSettings extends IMissionDescription {
};
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
let scoringConditions = {
    isPercentage: 'isPercentage == 1'
};
let Scoring = class Scoring extends IScoring {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzc2lvbi1kZXNjcmlwdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9taXNzaW9uLWRlc2NyaXB0aW9uL21pc3Npb24tZGVzY3JpcHRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFjLE1BQU0sRUFBeUIsTUFBTSxpQkFBaUIsQ0FBQztBQUUxSCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBYSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ25HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFbEMsTUFBTSxPQUFPLHNCQUFzQixHQUFHLENBQUMsU0FBUyxDQUFDOztBQUNqRCxNQUFNLE9BQU8sYUFBYSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQzs7O0FBQzdFLE1BQU0sT0FBTyxjQUFjLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7O0lBRXpFLFVBQVUsR0FBRztJQUNmLE1BQU0sRUFBRSxnQkFBZ0I7SUFDeEIsU0FBUyxFQUFFLG1CQUFtQjtJQUM5QixPQUFP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bkIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ25CLE9BQU8sQ0F1RG5CO1NBdkRZLE9BQU87OztJQUNsQix3QkFDYzs7SUFFZCw4QkFDb0I7O0lBRXBCLCtCQU1xQjs7SUFFckIsMkJBS2lCOztJQUVqQiwyQkFLa0I7O0lBRWxCLHlCQUNnQjs7SUFFaEIsK0JBTXNCOztJQUV0QixrQ0FNd0I7O0lBRXhCLGlDQU1rQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IElNaXNzaW9uRGVzY3JpcHRpb24sIElTY29yaW5nLCBGb3JtRmllbGRUeXBlLCBJRm9ybUZpZWxkLCBJUm9sZXMsIElSb2xlLCBTZWxlY3Rpb25RdWVyeSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBTbGlkZSB9IGZyb20gJy4uL3NsaWRlL3NsaWRlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgQ29uZGl0aW9uLCBnZXRHcm91cHNUcmFuc2Zvcm0sIFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZPUk1fRklMRVNfSU1BR0VfRklMVEVSIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgcmFuZ2UgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5leHBvcnQgY29uc3QgTUlTU0lPTl9UWVBFU19OT19BRE1JTiA9IFsnbWlzc2lvbiddO1xuZXhwb3J0IGNvbnN0IE1JU1NJT05fVFlQRVMgPSBbJ21pc3Npb24nLCAnc2VydmljZScsICdwb2xsJywgJ3RvZG8nLCAnbGVzc29uJ107IC8vJ3RlbXBsYXRlJywsICdtZW1vJ1xuZXhwb3J0IGNvbnN0IE1JU1NJT05fU1RBVFVTID0gWydib29rZWQnLCAnZmluaXNoZWQnLCAnYXJjaGl2ZWQnLCAnc2NoZWR1bGVkJ107XG5cbmxldCBjb25kaXRpb25zID0ge1xuICBpc1BvbGw6ICd0eXBlID09IFwicG9sbFwiJyxcbiAgaXNNaXNzaW9uOiAndHlwZSA9PSBcIm1pc3Npb25cIicsXG4gIGlzUXVpeno6ICdxdWl6eiA9PSAxJyxcbiAgaXNTZXJ2aWNlOiAndHlwZSA9PSBcInNlcnZpY2VcIicsXG4gIG5vdFNlcnZpY2U6ICdub3QgKHR5cGUgPT0gXCJzZXJ2aWNlXCIpJyxcbiAgbm90UG9sbE9yU2VydmljZTogJ25vdCAodHlwZSA9PSBcInNlcnZpY2VcIikgYW5kIG5vdCAodHlwZSA9PSBcInBvbGxcIiknLFxuICBpc1BvbGxPclNlcnZpY2U6ICd0eXBlPT1cInBvbGxcIiBvciB0eXBlPT1cInNlcnZpY2VcIicgLy8sXG4gIC8vaXNVcGRhdGU6ICdpc051bGxPckVtcHR5KGdldEF0dHJpYnV0ZVZhbHVlKFwiX2VjdFwiKSkgPT0gMCdcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1pc3Npb25EZXNjcmlwdGlvblR5cGVDaGFuZ2UodmFsdWUsIGRhdGEsIGZpZWxkKSB7XG4gIC8vIGlmICh2YWx1ZSAmJiAodmFsdWUgPT09ICdzZXJ2aWNlJyB8fCB2YWx1ZSA9PT0gJ3BvbGwnIHx8IHZhbHVlID09PSAnbGVzc29uJykpIHtcbiAgLy8gICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gICAgIGNvbnRyb2xzLmxhbmd1YWdlLnNldFZhbHVlKGNvbnRyb2xzLmxhbmd1YWdlLmdldFZhbHVlKCkgfHwgVHJhbnNsYXRlLmN1cnJlbnRMYW5ndWFnZSk7XG4gIC8vICAgfSwgMzAwKTtcbiAgLy8gfVxuICAvLyBsZXQgZ3JvdXBJbmRleCA9IGZvcm1EZWZpbml0aW9uLmZpbmRJbmRleChmID0+IGYubmFtZSA9PT0gJ2dyb3VwJyk7XG4gIC8vIGxldCBncm91cCA9IGZvcm1EZWZpbml0aW9uW2dyb3VwSW5kZXhdO1xuICAvLyBpZiAodmFsdWUgPT09ICdzZXJ2aWNlJykge1xuICAvLyAgIGdyb3VwLnRpdGxlID0gJ1NFUlZJQ0VHUk9VUFMnO1xuICAvLyB9IGVsc2Uge1xuICAvLyAgIGdyb3VwLnRpdGxlID0gJ01JU1NJT05HUk9VUFMnO1xuICAvLyB9XG4gIC8vIGZvcm1EZWZpbml0aW9uW2dyb3VwSW5kZXhdID0geyAuLi5ncm91cCB9O1xuICAvLyByZXR1cm4gdHJ1ZTtcbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTWlzc2lvbkRlc2NyaXB0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdtaXNzaW9uZGVzY3JpcHRpb25zJyxcbiAgZmllbGRzOiBbXG4gICAgJ19lY3QnLFxuICAgICdfaWQnLFxuICAgICdfbG10JyxcbiAgICAnX3RlbmFudCcsXG4gICAgJ190ZW5hbnRSZWYnLFxuICAgICdhbGxvd011bHRpcGxlJyxcbiAgICAnYWxsb3dTYW1lVXNlclZhbGlkYXRpb24nLFxuICAgICdhcmNoaXZlZCcsXG4gICAgJ2F1ZGl0JyxcbiAgICAnYXV0b1JlbmV3JyxcbiAgICAnYXV0b1JlbmV3T25Cb29raW5nJyxcbiAgICAnYmFja2dyb3VuZCcsXG4gICAgJ2Jvb2tpbmdEdXJhdGlvbicsIC8vXG4gICAgJ2NhdGVnb3J5JyxcbiAgICAnY2F0ZWdvcnlSZWYnLFxuICAgICdjb3VudCcsXG4gICAgJ2R1cmF0aW9uJyxcbiAgICAnZmluaXNoZWRHcm91cHMnLFxuICAgICdnZW5lcmF0ZVRpdGxlJyxcbiAgICAnZ3JvdXAnLFxuICAgICdpY29uJyxcbiAgICAnbGFuZ3VhZ2UnLFxuICAgICdsb2NhdGlvbk9wdGlvbnMnLFxuICAgICdtaXNzaW9uVGFncycsXG4gICAgJ211bHRpcGxlJyxcbiAgICAnbm90aWZpY2F0aW9uZW1haWwnLFxuICAgICdub3RpZnknLFxuICAgICdub3RpZnlCb2R5JyxcbiAgICAnbm90aWZ5U2NoZWR1bGVkRGF0ZScsXG4gICAgJ3BkZk1vZGUnLFxuICAgICdwcmljZScsXG4gICAgJ3ByaW9yaXR5JyxcbiAgICAncHVibGljJyxcbiAgICAncXVpenonLFxuICAgICdxdWl6ek1vZGUnLFxuICAgICdyZWN1cnJpbmcnLFxuICAgICdzY29yaW5nJyxcbiAgICAnc2hvd0Fuc3dlcnMnLFxuICAgICdza2lwVmFsaWRhdGlvbicsXG4gICAgJ3N1Ym1pdHRleHQnLFxuICAgICdzdWNjZXNzdGV4dCcsXG4gICAgJ3RhZ3MnLFxuICAgICd0ZXh0JyxcbiAgICAndGl0bGUnLFxuICAgICd0eXBlJyxcbiAgICAndmFsaWRGcm9tJyxcbiAgICAndmFsaWRVbnRpbCcsXG4gICAgJ3ZlcnNpb25taW4nLFxuICAgICdzdG9yZXNRdWVyeSdcbiAgXSxcbiAgaW5jbHVkZTogWydfdGVuYW50J10sIC8vJ2NhdGVnb3J5JyxcbiAgaWNvbjogJ3lvLWNhbXBhaWduJ1xufSlcbmV4cG9ydCBjbGFzcyBNaXNzaW9uRGVzY3JpcHRpb24gZXh0ZW5kcyBJTWlzc2lvbkRlc2NyaXB0aW9uIHtcbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIHZpc2libGU6IGZhbHNlLFxuICAgIGZvcmNlRXhwb3J0OiB0cnVlLFxuICAgIGV4cG9ydE9yZGVyOiAxXG4gIH0pXG4gIF9pZD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0aXRsZTogJ1RZUEUnLFxuICAgIHZhbHVlczogTUlTU0lPTl9UWVBFUywgLy9NSVNTSU9OX1RZUEVTX05PX0FETUlOLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGV4cG9ydE9yZGVyOiAzLFxuICAgIGZpbHRlcmFibGU6IHRydWUsXG4gICAgb25DaGFuZ2U6IG9uTWlzc2lvbkRlc2NyaXB0aW9uVHlwZUNoYW5nZVxuICB9KVxuICB0eXBlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb24nLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdUSVRMRScsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGV4cG9ydE9yZGVyOiAyXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb24nKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnREVTQ1JJUFRJT04nLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIGxhbmd1YWdlOiAnaHRtbCdcbiAgfSkgLy9cbiAgdGV4dDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGZpbHRlcnM6IEZPUk1fRklMRVNfSU1BR0VfRklMVEVSLFxuICAgIGZvcmNlTW9kYWw6IHRydWUsXG4gICAgaGlkZGVuRmllbGRzOiBbJ21pbWVUeXBlJ10sXG4gICAgbW9kZTogJ3RpbGUnLFxuICAgIHBhZ2VTaXplOiAyMCxcbiAgICBmaXhlZFBvc2l0aW9uOiB0cnVlLFxuICAgIG1heFdpZHRoOiAxNjAsXG4gICAgbWF4SGVpZ2h0OiAxNjAsXG4gICAgY3JvcDogJ2NpcmNsZScsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgdGl0bGU6ICdJQ09OJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBmbGV4OiA1MCxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZG93bmxvYWRVUkwnIH0sXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIGljb246IGFueTtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbicsIHtcbiAgICB0aXRsZTogJ0NBTVBBSUdOVEFHUycsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgdGFnOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbWlzc2lvbmRlc2NyaXB0aW9ucycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdkZXNjcmlwdGlvblJlZicsIHZhbHVlczogJ19pZCcgfSxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdhcmNoaXZlZCcsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfV1dLFxuICAgIGljb246ICd5by10YWcnLFxuICAgIHNlY29uZGFyeTogdHJ1ZVxuICB9KVxuICB0YWdzOiBBcnJheTxzdHJpbmc+O1xuXG4gIGJhY2tncm91bmQ6IGFueTtcbiAgZ3JvdXA6IEFycmF5PHN0cmluZz47XG4gIHNlcnZpY2VHcm91cHM6IEFycmF5PHN0cmluZz47XG4gIG1pc3Npb25UYWdzOiBBcnJheTxzdHJpbmc+O1xuICBzbGlkZXM6IEFycmF5PFNsaWRlPjtcbiAgcHVibGljOiBib29sZWFuO1xuICBza2lwVmFsaWRhdGlvbjogYm9vbGVhbjtcbiAgYWxsb3dTYW1lVXNlclZhbGlkYXRpb246IGJvb2xlYW47XG4gIGFsbG93TXVsdGlwbGU6IGJvb2xlYW47XG4gIHF1aXp6OiBib29sZWFuO1xuICBxdWl6ek1vZGU6IHN0cmluZztcbiAgc2hvd0Fuc3dlcnM6IGJvb2xlYW47XG4gIGF1ZGl0OiBib29sZWFuO1xuICByZWN1cnJpbmc6IGJvb2xlYW47XG4gIGNhdGVnb3J5OiBNaXNzaW9uRGVzY3JpcHRpb247XG4gIGxhbmd1YWdlOiBzdHJpbmc7XG4gIHN1Ym1pdHRleHQ6IHN0cmluZztcbiAgc3VjY2Vzc3RleHQ6IHN0cmluZztcbiAgdmVyc2lvbm1pbjogc3RyaW5nO1xuICBmaW5pc2hlZEdyb3VwczogQXJyYXk8c3RyaW5nPjtcbiAgcm9sZXM/OiBBcnJheTxJUm9sZT47XG4gIGFyY2hpdmVkOiBib29sZWFuO1xuICBjb3VudDogbnVtYmVyO1xuICBzdG9yZXNRdWVyeT86IFNlbGVjdGlvblF1ZXJ5O1xuICBsYXRlc3Q6IERhdGU7XG4gIF9lY3Q6IGFueTtcbiAgY29uZGl0aW9uczogQXJyYXk8Q29uZGl0aW9uPjtcbiAgc2NvcmluZzogQXJyYXk8U2NvcmluZz47XG4gIF90ZW5hbnQ6IFRlbmFudDtcbiAgX3RlbmFudFJlZj86IHN0cmluZztcblxuICAvL01pc3Npb25EZXNjcmlwdGlvblNjaGVkdWxlXG4gIHZhbGlkRnJvbTogRGF0ZTtcbiAgdmFsaWRVbnRpbDogRGF0ZTtcbiAgZHVlZGF0ZTogRGF0ZTtcblxuICAvL01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnNcbiAgbm90aWZ5PzogYm9vbGVhbjtcbiAgbm90aWZ5Qm9keT86IHN0cmluZztcbiAgbm90aWZ5U2NoZWR1bGVkRGF0ZT86IERhdGU7XG4gIG5vdGlmaWNhdGlvbmVtYWlsPzogQXJyYXk8c3RyaW5nPjtcbiAgZGlzYWJsZUxvY2F0aW9uTm90aWZpY2F0aW9uZW1haWw/OiBib29sZWFuO1xuICBwZGZNb2RlPzogc3RyaW5nO1xufVxuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnXG59KVxuZXhwb3J0IGNsYXNzIE1pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZSBleHRlbmRzIElNaXNzaW9uRGVzY3JpcHRpb24ge1xuICB0eXBlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdUSVRMRScsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGV4cG9ydE9yZGVyOiAyXG4gIH0pXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdERVNDUklQVElPTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgbGFuZ3VhZ2U6ICdodG1sJ1xuICB9KVxuICB0ZXh0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25DcmVhdGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19JTUFHRV9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGZpeGVkUG9zaXRpb246IHRydWUsXG4gICAgbWF4V2lkdGg6IDE2MCxcbiAgICBtYXhIZWlnaHQ6IDE2MCxcbiAgICBjcm9wOiAnY2lyY2xlJyxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2ZpbGVzJyxcbiAgICB0aXRsZTogJ0lDT04nLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ19kb3dubG9hZFVSTCcgfSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2VcbiAgfSlcbiAgaWNvbjogYW55O1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHZhbHVlczogcmFuZ2UoMSwgNSlcbiAgfSlcbiAgcHJpb3JpdHk6IGFueTtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzTWlzc2lvbl0sXG4gICAgdGl0bGU6ICdBVURJVCcsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfVxuICB9KVxuICBhdWRpdDogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzTWlzc2lvbl0sXG4gICAgdGl0bGU6ICdSRUNVUlJJTkcnLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgcmVjdXJyaW5nOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1BvbGwsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfVxuICB9KVxuICBhbGxvd011bHRpcGxlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uQ3JlYXRlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1BvbGwsXG4gICAgdGl0bGU6ICdRVUlaWicsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfVxuICB9KVxuICBxdWl6ejogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNRdWl6eixcbiAgICBmbGV4OiAxMDAsXG4gICAgdGl0bGU6ICdNT0RFJyxcbiAgICB2YWx1ZXM6IFsnQUxMQU5TV0VSU1ZBTElEJywgJ0FMTE9XVU5WQUxJREFOU1dFUlMnLCAnTElWRUFOU1dFUlMnXSxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfVxuICB9KVxuICBxdWl6ek1vZGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNRdWl6eixcbiAgICBmbGV4OiAxMDAsXG4gICAgdGl0bGU6ICdTSE9XQU5TV0VSUycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfVxuICB9KVxuICBzaG93QW5zd2VyczogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMuaXNQb2xsT3JTZXJ2aWNlLFxuICAgIHRpdGxlOiAnTEFOR1VBR0UnLFxuICAgIGZsZXg6IDEwMCxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgdmFsdWVzOiBUcmFuc2xhdGUuYXZhaWxhYmxlc0xhbmd1YWdlQWxsLFxuICAgIGNsZWFyYWJsZTogZmFsc2VcbiAgfSlcbiAgbGFuZ3VhZ2U6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICB0aXRsZTogJ0NBTVBBSUdOVEFHUycsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgdGFnOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbWlzc2lvbmRlc2NyaXB0aW9ucycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdkZXNjcmlwdGlvblJlZicsIHZhbHVlczogJ19pZCcgfSxcbiAgICBpY29uOiAneW8tdGFnJyxcbiAgICBzZWNvbmRhcnk6IHRydWVcbiAgfSlcbiAgdGFnczogQXJyYXk8c3RyaW5nPjtcblxuICBzbGlkZXM6IEFycmF5PFNsaWRlPjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbkNyZWF0ZScsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3RlbmFudHMnLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9XG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcbiAgX3RlbmFudFJlZj86IHN0cmluZztcbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTWlzc2lvbkRlc2NyaXB0aW9uU2NoZWR1bGUnXG59KVxuZXhwb3J0IGNsYXNzIE1pc3Npb25EZXNjcmlwdGlvblNjaGVkdWxlIGV4dGVuZHMgSU1pc3Npb25EZXNjcmlwdGlvbiB7XG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2NoZWR1bGUnLCB7XG4gICAgdGl0bGU6ICdNSVNTSU9OVkFMSURGUk9NVE9PTFRJUCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMubm90U2VydmljZSxcbiAgICBleHRlcm5hbFZhbGlkYXRvcnM6IFt7IGV4dGVybmFsRmllbGROYW1lOiAndmFsaWRVbnRpbCcsIHJ1bGU6ICdsb3dlcicgfV1cbiAgfSlcbiAgdmFsaWRGcm9tOiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2NoZWR1bGUnLCB7XG4gICAgdGl0bGU6ICdNSVNTSU9OVkFMSURVTlRJTFRPT0xUSVAnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm5vdFNlcnZpY2UsXG4gICAgZXh0ZXJuYWxWYWxpZGF0b3JzOiBbeyBleHRlcm5hbEZpZWxkTmFtZTogJ3ZhbGlkRnJvbScsIHJ1bGU6ICdoaWdoZXInIH1dXG4gIH0pXG4gIHZhbGlkVW50aWw6IERhdGU7XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TY2hlZHVsZScsIHtcbiAgICB0aXRsZTogJ01JU1NJT05EVUVEQVRFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5ub3RTZXJ2aWNlXG4gIH0pXG4gIGR1ZWRhdGU6IERhdGU7XG5cbiAgLy8gQEVkaXRhYmxlKCdNaXNzaW9uR2VuZXJhdGUnLCB7XG4gIC8vICAgdGFiSW5kZXg6IDIsXG4gIC8vICAgdGFiOiAnT1BUSU9OUycsXG4gIC8vICAgdHlwZTogRm9ybUZpZWxkVHlwZS5zY2hlZHVsZSxcbiAgLy8gICBoaWRlTGFiZWw6IHRydWUsXG4gIC8vICAgY29uZGl0aW9uOiBjb25kaXRpb25zLmlzU2NoZWR1bGVkLFxuICAvLyAgIGZsZXg6IDEwMFxuICAvLyB9KVxuICAvLyBzY2hlZHVsZTogYm9vbGVhbjtcbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTWlzc2lvbkRlc2NyaXB0aW9uTm90aWZpY2F0aW9ucydcbn0pXG5leHBvcnQgY2xhc3MgTWlzc2lvbkRlc2NyaXB0aW9uTm90aWZpY2F0aW9ucyBleHRlbmRzIElNaXNzaW9uRGVzY3JpcHRpb24ge1xuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm5vdFNlcnZpY2VcbiAgfSlcbiAgbm90aWZ5OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uTm90aWZpY2F0aW9ucycsIHtcbiAgICB0aXRsZTogJ05PVElGSUNBVElPTicsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiAnbm90aWZ5ID09IDEnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWFcbiAgfSlcbiAgbm90aWZ5Qm9keTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uTm90aWZpY2F0aW9ucycsIHtcbiAgICB0aXRsZTogJ1NDSEVEVUxFRERBVEUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBjb25kaXRpb246ICdub3RpZnkgPT0gMScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZVxuICB9KVxuICBub3RpZnlTY2hlZHVsZWREYXRlOiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uTm90aWZpY2F0aW9ucycsIHtcbiAgICB0aXRsZTogJ05PVElGSUNBVElPTkVNQUlMUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5lbWFpbHJlcG9ydCxcbiAgICBzaG93VXNlcnM6IHRydWUsXG4gICAgc3RhdGVmdWw6IGZhbHNlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBub3RpZmljYXRpb25lbWFpbDogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfSxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZVxuICB9KVxuICBkaXNhYmxlTG9jYXRpb25Ob3RpZmljYXRpb25lbWFpbDogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvbk5vdGlmaWNhdGlvbnMnLCB7XG4gICAgdGl0bGU6ICdQREZFWFBPUlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuc2VsZWN0Y2FyZCxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgdmFsdWVzOiBbXG4gICAgICB7IHRpdGxlOiAnUERGQ0xBU1NJQycsIGRlc2NyaXB0aW9uOiAnUERGQ0xBU1NJQ0RFU0NSSVBUSU9OJywgdmFsdWU6ICdQREZDTEFTU0lDJyB9LCAvL1xuICAgICAgeyB0aXRsZTogJ1BERlBIT1RPUkVQT1JUJywgZGVzY3JpcHRpb246ICdQREZQSE9UT1JFUE9SVERFU0NSSVBUSU9OJywgdmFsdWU6ICdQREZQSE9UT1JFUE9SVCcgfSxcbiAgICAgIHsgdGl0bGU6ICdQREZBVURJVEVYUE9SVFMnLCBkZXNjcmlwdGlvbjogJ1BERkFVRElURVhQT1JUU0RFU0NSSVBUSU9OJywgdmFsdWU6ICdQREZBVURJVEVYUE9SVFMnIH0sXG4gICAgICB7IHRpdGxlOiAnUERGQ09OVFJBQ1QnLCBkZXNjcmlwdGlvbjogJ1BERkNPTlRSQUNUREVTQ1JJUFRJT04nLCB2YWx1ZTogJ1BERkNPTlRSQUNUJyB9XG4gICAgXSxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZVxuICB9KVxuICBwZGZNb2RlPzogc3RyaW5nO1xufVxuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncydcbn0pXG5leHBvcnQgY2xhc3MgTWlzc2lvbkRlc2NyaXB0aW9uU2V0dGluZ3MgZXh0ZW5kcyBJTWlzc2lvbkRlc2NyaXB0aW9uIHtcbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ01JU1NJT05HUk9VUFMnLFxuICAgIGhlYWRlcjogJ1BFUk1JU1NJT05TJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnaXNSb2xlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9LCB7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgbWFwVHJhbnNmb3JtOiBnZXRHcm91cHNUcmFuc2Zvcm0sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICBncm91cDogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0aXRsZTogJ01JU1NJT05HUk9VUFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlcnZpY2UsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2VcbiAgfSlcbiAgc2VydmljZUdyb3VwczogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0aXRsZTogJ0ZJTklTSEVER1JPVVBTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb25kaXRpb246IFtjb25kaXRpb25zLmlzTWlzc2lvbl0sXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogdHJ1ZVxuICB9KVxuICBmaW5pc2hlZEdyb3VwczogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGV4cG9ydE9yZGVyOiAxNSxcbiAgICB2YWx1ZXM6IElSb2xlcyxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHJvbGVzPzogQXJyYXk8SVJvbGU+O1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2V0dGluZ3MnLCB7XG4gICAgdGl0bGU6ICdDQVRFR09SSUVTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdtaXNzaW9ucycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdkZXNjcmlwdGlvblJlZicsIHZhbHVlczogJ19pZCcgfSxcbiAgICBpY29uOiAneW8tZmxhZycsXG4gICAgZmlsdGVyYWJsZTogZmFsc2VcbiAgfSlcbiAgbWlzc2lvblRhZ3M6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdNaXNzaW9uRGVzY3JpcHRpb25TZXR0aW5ncycsIHtcbiAgICBoZWFkZXI6ICdDT01QTElBTkNFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICB0aXRsZTogJ1NLSVBWQUxJREFUSU9OJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBza2lwVmFsaWRhdGlvbjogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIHRpdGxlOiAnQUxMT1dTQU1FVVNFUlZBTElEQVRJT04nLFxuICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNNYW5hZ2VyLCBST0xFU19DT05ESVRJT05TLmlzQWRtaW5PckNsaWVudEFkbWluXSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9LFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBhbGxvd1NhbWVVc2VyVmFsaWRhdGlvbjogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIGhlYWRlcjogJ01JU1NJT05TRVRUSU5HUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgY29uZGl0aW9uOiBjb25kaXRpb25zLm5vdFBvbGxPclNlcnZpY2UsXG4gICAgZmxleDogMTAwXG4gIH0pXG4gIGF1dG9SZW5ldzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIGNvbmRpdGlvbjogW2NvbmRpdGlvbnMubm90UG9sbE9yU2VydmljZV1cbiAgfSkgLy8sIHJlYWRvbmx5OiBjb25kaXRpb25zLmlzU2NoZWR1bGVkXG4gIGF1dG9SZW5ld09uQm9va2luZzogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIHRpdGxlOiAnQ0hFQ0snLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnNlbGVjdGNhcmQsXG4gICAgdmFsdWVzOiBbXG4gICAgICB7IHRpdGxlOiAnQVZBSUxBQkxFJywgZGVzY3JpcHRpb246ICdDSEVDS0FWQUlMQUJMRScsIHZhbHVlOiAnQ0hFQ0tBVkFJTEFCTEUnIH0sIC8vXG4gICAgICB7IHRpdGxlOiAnRVhJU1RJTkcnLCBkZXNjcmlwdGlvbjogJ0NIRUNLRVhJU1RJTkcnLCB2YWx1ZTogJ0NIRUNLRVhJU1RJTkcnIH1cbiAgICBdLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICBjb25kaXRpb246IGNvbmRpdGlvbnMubm90UG9sbE9yU2VydmljZVxuICB9KVxuICBsb2NhdGlvbk9wdGlvbnM6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIGhlYWRlcjogJ01JU0MnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0aXRsZTogJ01JU1NJT05EVVJBVElPTicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXJcbiAgfSlcbiAgZHVyYXRpb246IG51bWJlcjtcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlcnZpY2UsXG4gICAgdGl0bGU6ICdTVUJNSVRURVhUJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlXG4gIH0pXG4gIHN1Ym1pdHRleHQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01pc3Npb25EZXNjcmlwdGlvblNldHRpbmdzJywge1xuICAgIGNvbmRpdGlvbjogY29uZGl0aW9ucy5pc1NlcnZpY2UsXG4gICAgdGl0bGU6ICdTVUNDRVNTVEVYVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHNvcnRhYmxlOiBmYWxzZVxuICB9KVxuICBzdWNjZXNzdGV4dDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWlzc2lvbkRlc2NyaXB0aW9uU2V0dGluZ3MnLCB7XG4gICAgdGl0bGU6ICdWRVJTSU9OTUlOJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIGNvbmRpdGlvbjogUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICB2ZXJzaW9ubWluOiBzdHJpbmc7XG59XG5cbmxldCBzY29yaW5nQ29uZGl0aW9ucyA9IHtcbiAgaXNQZXJjZW50YWdlOiAnaXNQZXJjZW50YWdlID09IDEnXG59O1xuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdTY29yaW5nJyB9KVxuZXhwb3J0IGNsYXNzIFNjb3JpbmcgZXh0ZW5kcyBJU2NvcmluZyB7XG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSB9KVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHtcbiAgICB0aXRsZTogJ0lOSVRJQUxTQ09SRScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsXG4gICAgYWR2YW5jZWQ6IHRydWUsXG4gICAgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW5cbiAgfSlcbiAgaW5pdGlhbFZhbHVlOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdTY29yaW5nJywge1xuICAgIHRpdGxlOiAnTUlOU0NPUkVGT1JWQUxJREFUSU9OJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlcixcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBtaW5WYWx1ZTogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIHRpdGxlOiAnSVNQUklNQVJZU0NPUkUnLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH1cbiAgfSlcbiAgaXNBY3RpdmU6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdTY29yaW5nJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LCB0aXRsZTogJ0lTTElWRScsIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH0gfSlcbiAgaXNMaXZlOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIHRpdGxlOiAnUEVSQ0VOVEFHRScsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogODAgfSxcbiAgICBhZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBpc1BlcmNlbnRhZ2U6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdTY29yaW5nJywge1xuICAgIHRpdGxlOiAnVE9UQUwnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLFxuICAgIGNvbmRpdGlvbjogc2NvcmluZ0NvbmRpdGlvbnMuaXNQZXJjZW50YWdlLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIHBlcmNlbnRhZ2VCYXNpczogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnU2NvcmluZycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICB0aXRsZTogJ0ZJRUxEUycsXG4gICAgZGlzcGxheVR5cGU6ICdmb3JtZmllbGQnXG4gIH0pXG4gIHNlbGVjdGVkRmllbGRzOiBBcnJheTxJRm9ybUZpZWxkPjtcbn1cbiJdfQ==